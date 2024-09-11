import admin from 'firebase-admin';
import { FireSQL } from 'firesql';
import 'firebase/firestore';
export declare const fireSQL: FireSQL;
export declare const auth: import("firebase-admin/lib/auth/auth").Auth;
export declare const db: admin.firestore.Firestore;
export declare const rtDb: import("firebase-admin/lib/database/database").Database;
export declare const storage: import("firebase-admin/lib/storage/storage").Storage;
