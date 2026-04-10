import * as admin from "firebase-admin";

function getFirebaseAdminConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  return { projectId, clientEmail, privateKey };
}

export function hasFirebaseAdminConfig() {
  const { projectId, clientEmail, privateKey } = getFirebaseAdminConfig();
  return Boolean(projectId && clientEmail && privateKey);
}

function getFirebaseAdminApp() {
  if (!admin.apps.length) {
    const { projectId, clientEmail, privateKey } = getFirebaseAdminConfig();

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error("Missing Firebase admin credentials.");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n")
      })
    });
  }

  return admin.apps[0];
}

export function getDb() {
  getFirebaseAdminApp();
  return admin.firestore();
}
