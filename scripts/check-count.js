const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
envContent.split("\n").forEach(line => {
  const [key, ...value] = line.split("=");
  if (key && value) {
    env[key.trim()] = v = value.join("=").trim().replace(/^['"]|['"]$/g, "");
  }
});

if (!admin.apps.length) {
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  })
});
}

admin.firestore().collection("portfolio").get().then(s => {
  console.log("Count:", s.size);
  s.docs.forEach(d => console.log("- ", d.id, d.data().name));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
