import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const portfolioPath = path.join(process.cwd(), "src", "data", "portfolio.json");
const teamPath = path.join(process.cwd(), "src", "data", "team.json");
const envPath = path.join(process.cwd(), ".env.local");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!key) continue;
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(envPath);

function getFirebaseAdminConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase admin credentials.");
  }

  return { projectId, clientEmail, privateKey };
}

function initAdmin() {
  if (!getApps().length) {
    const { projectId, clientEmail, privateKey } = getFirebaseAdminConfig();
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n")
      })
    });
  }

  return getFirestore();
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

async function migratePortfolio(db) {
  const portfolio = readJson(portfolioPath);
  const batch = db.batch();

  for (const item of portfolio) {
    const id = item.id || getFirestore().collection("portfolio").doc().id;
    const { password, ...rest } = item;
    const docData = { ...rest, id };

    if (password) {
      docData.passwordHash = await bcrypt.hash(password, 10);
    }

    const ref = db.collection("portfolio").doc(id);
    batch.set(ref, docData, { merge: true });
  }

  await batch.commit();
}

async function migrateTeam(db) {
  const team = readJson(teamPath);
  const batch = db.batch();

  for (const item of team) {
    const id = item.id || getFirestore().collection("team").doc().id;
    const docData = { ...item, id };
    const ref = db.collection("team").doc(id);
    batch.set(ref, docData, { merge: true });
  }

  await batch.commit();
}

async function run() {
  const db = initAdmin();
  await migratePortfolio(db);
  await migrateTeam(db);
  console.log("Migration complete.");
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
