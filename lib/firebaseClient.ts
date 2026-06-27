import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
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
export const authClient = getAuth(app);
export const dbClient = getDatabase(app);
export const storageClient = getStorage(app);
