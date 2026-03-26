import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Skill Futures (SkillBazzar) Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSCNq6CfGbzb5ZZh1jZEQ8B0ULFA40A-g",
  authDomain: "skillbazzar-f25a5.firebaseapp.com",
  projectId: "skillbazzar-f25a5",
  storageBucket: "skillbazzar-f25a5.firebasestorage.app",
  messagingSenderId: "293298225357",
  appId: "1:293298225357:web:a258a7d26c7fdc18de6984",
  measurementId: "G-S3DF7M0NY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment 
} from 'firebase/firestore';

export default app;
