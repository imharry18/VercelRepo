import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getDb, hasFirebaseAdminConfig } from "@/lib/firebaseAdmin";
import { isAdminRequest } from "@/lib/adminAuth";

const dataFilePath = path.join(process.cwd(), "src", "data", "portfolio.json");

export async function GET() {
  try {
    if (!hasFirebaseAdminConfig()) {
      const fileContents = fs.readFileSync(dataFilePath, "utf8");
      const data = JSON.parse(fileContents);
      return NextResponse.json(data);
    }

    const db = getDb();
    const snapshot = await db.collection("portfolio").get();

    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      const { password, passwordHash, ...safeData } = docData;
      return { id: doc.id, ...safeData };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Portfolio GET failed:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newData = await request.json();
    if (!Array.isArray(newData)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!hasFirebaseAdminConfig()) {
      const updated = [];

      for (const item of newData) {
        const id = item.id || crypto.randomUUID();
        let passwordHash = item.passwordHash || "";

        if (item.password) {
          const cleanPasswordFallback = String(item.password).trim();
          passwordHash = await bcrypt.hash(cleanPasswordFallback, 10);
        }

        const { password, ...rest } = item;
        const docData = { ...rest, id };
        if (passwordHash) {
          docData.passwordHash = passwordHash;
        }

        updated.push(docData);
      }

      fs.writeFileSync(dataFilePath, JSON.stringify(updated, null, 2), "utf8");
      return NextResponse.json({ success: true, message: "Portfolio updated successfully" });
    }

    const db = getDb();
    const snapshot = await db.collection("portfolio").get();
    const existingDocs = new Map(
      snapshot.docs.map((doc) => [doc.id, doc.data()])
    );

    const incomingIds = new Set();
    const batch = db.batch();

    for (const item of newData) {
      const id = item.id || crypto.randomUUID();
      incomingIds.add(id);

      const existing = existingDocs.get(id) || {};
      let passwordHash = item.passwordHash || existing.passwordHash || "";

      if (item.password) {
        const cleanPassword = String(item.password).trim();
        passwordHash = await bcrypt.hash(cleanPassword, 10);
      }

      const { password, ...rest } = item;
      const docData = {
        ...rest,
        id
      };

      if (passwordHash) {
        docData.passwordHash = passwordHash;
      }

      batch.set(db.collection("portfolio").doc(id), docData, { merge: true });
    }

    for (const [id] of existingDocs) {
      if (!incomingIds.has(id)) {
        batch.delete(db.collection("portfolio").doc(id));
      }
    }

    await batch.commit();

    return NextResponse.json({ success: true, message: "Portfolio updated successfully" });
  } catch (error) {
    console.error("Portfolio POST failed:", error);
    return NextResponse.json({ error: "Failed to write data" }, { status: 500 });
  }
}
