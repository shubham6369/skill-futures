import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAarvatCyv8BeBDPIy8PRX3mjbhfgNz4mM",
  authDomain: "skillfutures.firebaseapp.com",
  projectId: "skillfutures",
  storageBucket: "skillfutures.firebasestorage.app",
  messagingSenderId: "664365808157",
  appId: "1:664365808157:web:8f716ec491dc0f963ee4f4",
  measurementId: "G-M22THXJBJ8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { courses } from './courses-data.js';

async function seed() {
  console.log("Seeding courses...");
  const colRef = collection(db, 'courses');
  
  // Clear existing (optional, but good for clean state)
  const existing = await getDocs(colRef);
  for (const d of existing.docs) {
    await deleteDoc(doc(db, 'courses', d.id));
  }

  for (const course of courses) {
    await addDoc(colRef, course);
    console.log(`Added: ${course.title}`);
  }
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);
