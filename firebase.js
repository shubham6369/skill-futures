import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAarvatCyv8BeBDPIy8PRX3mjbhfgNz4mM",
  authDomain: "skillfutures.firebaseapp.com",
  projectId: "skillfutures",
  storageBucket: "skillfutures.firebasestorage.app",
  messagingSenderId: "664365808157",
  appId: "1:664365808157:web:8f716ec491dc0f963ee4f4",
  measurementId: "G-M22THXJBJ8"
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
