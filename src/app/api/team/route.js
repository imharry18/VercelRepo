import crypto from "crypto";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getDb, hasFirebaseAdminConfig } from "@/lib/firebaseAdmin";
import { isAdminRequest } from "@/lib/adminAuth";

const dataFilePath = path.join(process.cwd(), "src", "data", "team.json");

export async function GET() {
  try {
    if (!hasFirebaseAdminConfig()) {
      const fileContents = fs.readFileSync(dataFilePath, "utf8");
      const data = JSON.parse(fileContents);
      return NextResponse.json(data);
    }

    const db = getDb();
    const snapshot = await db.collection("team").get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Team GET failed:", error);
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
      const updated = newData.map((item) => ({ ...item, id: item.id || crypto.randomUUID() }));
      fs.writeFileSync(dataFilePath, JSON.stringify(updated, null, 2), "utf8");
      return NextResponse.json({ success: true, message: "Team updated successfully" });
    }

    const db = getDb();
    const snapshot = await db.collection("team").get();
    const existingDocs = new Map(
      snapshot.docs.map((doc) => [doc.id, doc.data()])
    );

    const incomingIds = new Set();
    const batch = db.batch();

    for (const item of newData) {
      const id = item.id || crypto.randomUUID();
      incomingIds.add(id);

      const docData = { ...item, id };
      batch.set(db.collection("team").doc(id), docData, { merge: true });
    }

    for (const [id] of existingDocs) {
      if (!incomingIds.has(id)) {
        batch.delete(db.collection("team").doc(id));
      }
    }

    await batch.commit();

    return NextResponse.json({ success: true, message: "Team updated successfully" });
  } catch (error) {
    console.error("Team POST failed:", error);
    return NextResponse.json({ error: "Failed to write data" }, { status: 500 });
  }
}
