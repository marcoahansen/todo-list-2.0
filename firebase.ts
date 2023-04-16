import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "thebesttodo-71d65.firebaseapp.com",
  projectId: "thebesttodo-71d65",
  storageBucket: "thebesttodo-71d65.appspot.com",
  messagingSenderId: "1057047864361",
  appId: "1:1057047864361:web:a59c66831422438032a838",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
