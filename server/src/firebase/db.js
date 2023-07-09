// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { dbConfig } from "./firebaseConfig.js";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(dbConfig);
const db = getFirestore(app);

export { app, db };