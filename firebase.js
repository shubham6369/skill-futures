import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAit3eL37pTaeVW5O4uzaSWqcwjzNGOzfc",
  authDomain: "skillfuture-9ce01.firebaseapp.com",
  projectId: "skillfuture-9ce01",
  storageBucket: "skillfuture-9ce01.firebasestorage.app",
  messagingSenderId: "572586687847",
  appId: "1:572586687847:web:da088da422ae058343c3c2",
  measurementId: "G-Q5KCHHHXEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
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
  increment,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

export default app;
