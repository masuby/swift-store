import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKb10CbEKQM51rxcacvFL-Iq1iDmZ-XRY",
  authDomain: "swift-store-d65c7.firebaseapp.com",
  projectId: "swift-store-d65c7",
  storageBucket: "swift-store-d65c7.appspot.com",
  messagingSenderId: "737102812432",
  appId: "1:737102812432:android:4d4b3ef5a1f09f5da9c195" // Replace with your actual appId from Firebase Console
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();