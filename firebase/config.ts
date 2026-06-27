import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdfE1pyZBg_idJG-ym3lcQBfAGSLHS38o",
  authDomain: "enterpreneurisimu.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "https://enterpreneurisimu-default-rtdb.firebaseio.com",
  projectId: "enterpreneurisimu",
  storageBucket: "enterpreneurisimu.firebasestorage.app",
  messagingSenderId: "127336173199",
  appId: "1:127336173199:web:2c7dc96ab476b9ae9d6afa",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
