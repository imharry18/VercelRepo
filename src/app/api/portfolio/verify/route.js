import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { getDb, hasFirebaseAdminConfig } from "@/lib/firebaseAdmin";

const dataFilePath = path.join(process.cwd(), "src", "data", "portfolio.json");

export async function POST(request) {
  try {
    const { id, password } = await request.json();

    if (!id || !password) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!hasFirebaseAdminConfig()) {
      const fileContents = fs.readFileSync(dataFilePath, "utf8");
      const data = JSON.parse(fileContents);
      const company = data.find((item) => item.id === id);

      if (!company) {
        return NextResponse.json({ success: false }, { status: 404 });
      }

      if (company.passwordHash) {
        const isValid = await bcrypt.compare(password, company.passwordHash);
        return NextResponse.json({ success: isValid }, { status: isValid ? 200 : 401 });
      }

      if (company.password && password === company.password) {
        const newHash = await bcrypt.hash(password, 10);
        const updated = data.map((item) =>
          item.id === id
            ? { ...item, passwordHash: newHash, password: undefined }
            : item
        );
        fs.writeFileSync(dataFilePath, JSON.stringify(updated, null, 2), "utf8");
        return NextResponse.json({ success: true });
      }

      return NextResponse.json({ success: false }, { status: 401 });
    }

    const db = getDb();
    const docRef = db.collection("portfolio").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const data = doc.data() || {};
    const passwordHash = data.passwordHash;
    const legacyPassword = data.password;

    console.log("---- VERIFY PORTAL ----");
    console.log("Doc Exists:", doc.exists);
    console.log("ID:", id);
    console.log("Password entered:", password);
    console.log("Loaded Hash:", passwordHash);

    const safePassword = typeof password === "string" ? password.trim() : "";

    if (passwordHash) {
      const isValid = await bcrypt.compare(safePassword, passwordHash);
      console.log("IsValid:", isValid);
      return NextResponse.json({ success: isValid }, { status: isValid ? 200 : 401 });
    }

    if (legacyPassword && password === legacyPassword) {
      const newHash = await bcrypt.hash(password, 10);
      await docRef.set({ passwordHash: newHash, password: admin.firestore.FieldValue.delete() }, { merge: true });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
