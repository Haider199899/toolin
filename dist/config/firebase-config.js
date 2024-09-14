"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.rtDb = exports.db = exports.auth = exports.fireSQL = exports.firebase_admin = void 0;
const firebase_admin_1 = require("firebase-admin");
const dotenv = require("dotenv");
const firesql_1 = require("firesql");
require("firebase/firestore");
dotenv.config();
exports.firebase_admin = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: 'https://(default).firebaseio.com',
});
exports.fireSQL = new firesql_1.FireSQL(exports.firebase_admin.firestore());
exports.auth = firebase_admin_1.default.auth();
exports.db = firebase_admin_1.default.firestore();
exports.rtDb = firebase_admin_1.default.database();
exports.storage = firebase_admin_1.default.storage();
//# sourceMappingURL=firebase-config.js.map