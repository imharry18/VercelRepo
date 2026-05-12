const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Manually load .env.local for this script
const envContent = fs.readFileSync(path.join(__dirname, "../.env.local"), "utf8");
const env = {};
envContent.split("\n").forEach(line => {
  const [key, ...value] = line.split("=");
  if (key && value) {
    env[key.trim()] = value.join("=").trim().replace(/^['"]|['"]$/g, "");
  }
});

const projectId = env.FIREBASE_PROJECT_ID;
const clientEmail = env.FIREBASE_CLIENT_EMAIL;
const privateKey = env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey || clientEmail.includes("xxxxx")) {
  console.error("❌ Missing or incomplete Firebase Admin credentials in .env.local");
  console.error("Please ensure FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are correctly set.");
  process.exit(1);
}

// Initialize Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, "\n")
  })
});

const db = admin.firestore();

async function migrate() {
  console.log("🚀 Starting migration to Firestore...");

  // 1. Migrate Portfolio
  try {
    const portfolioPath = path.join(__dirname, "../src/data/portfolio.json");
    if (fs.existsSync(portfolioPath)) {
      const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, "utf8"));
      console.log(`📦 Migrating ${portfolioData.length} portfolio items...`);
      
      const batch = db.batch();
      portfolioData.forEach((item) => {
        // Use the item id as the document id if available, else auto-gen
        const docId = item.id || db.collection("portfolio").doc().id;
        const docRef = db.collection("portfolio").doc(docId);
        batch.set(docRef, item);
      });
      await batch.commit();
      console.log("✅ Portfolio migrated successfully.");
    }
  } catch (error) {
    console.error("❌ Error migrating portfolio:", error);
  }

  // 2. Migrate Team
  try {
    const teamPath = path.join(__dirname, "../src/data/team.json");
    if (fs.existsSync(teamPath)) {
      const teamData = JSON.parse(fs.readFileSync(teamPath, "utf8"));
      console.log(`👥 Migrating ${teamData.length} team members...`);
      
      const batch = db.batch();
      teamData.forEach((item) => {
        const docId = item.id || db.collection("team").doc().id;
        const docRef = db.collection("team").doc(docId);
        batch.set(docRef, item);
      });
      await batch.commit();
      console.log("✅ Team migrated successfully.");
    }
  } catch (error) {
    console.error("❌ Error migrating team:", error);
  }

  console.log("🎉 Migration Complete!");
  process.exit(0);
}

migrate();
