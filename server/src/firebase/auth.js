import admin from 'firebase-admin';
import { authConfig } from './firebaseConfig.js';

const app = admin.initializeApp({
    credential: admin.credential.cert(authConfig),
    databaseURL: 'https://closetgenie-69c4c.firebaseio.com'
});

const auth = app.auth();

export { auth };