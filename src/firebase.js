import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-JT-nYJAieyQHEjiR8vWOFIikNBstLLA",
  authDomain: "hb-login-cff74.firebaseapp.com",
  projectId: "hb-login-cff74",
  storageBucket: "hb-login-cff74.firebasestorage.app",
  messagingSenderId: "429216449559",
  appId: "1:429216449559:web:6e126f8c6509d3cf428852",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();