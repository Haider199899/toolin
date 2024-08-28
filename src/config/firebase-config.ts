import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: 'https://(default).firebaseio.com',
});

export const auth = admin.auth();
export const db = admin.firestore();
export const rtDb = admin.database();
export const storage = admin.storage();
