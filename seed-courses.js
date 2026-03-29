import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAit3eL37pTaeVW5O4uzaSWqcwjzNGOzfc",
  authDomain: "skillfuture-9ce01.firebaseapp.com",
  projectId: "skillfuture-9ce01",
  storageBucket: "skillfuture-9ce01.firebasestorage.app",
  messagingSenderId: "572586687847",
  appId: "1:572586687847:web:da088da422ae058343c3c2",
  measurementId: "G-Q5KCHHHXEE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const courses = [
  { title: "Sales Mastery", img: "https://futurefiix.com/assets/images/courses/sales.jpg", category: "Premium", totalLessons: 12 },
  { title: "Lead Generation", img: "https://futurefiix.com/assets/images/courses/lead.jpg", category: "Premium", totalLessons: 8 },
  { title: "Affiliate Marketing", img: "https://futurefiix.com/assets/images/courses/affiliate.jpg", category: "Premium", totalLessons: 15 },
  { title: "Video Editing", img: "https://futurefiix.com/assets/images/courses/video.jpg", category: "Premium", totalLessons: 10 },
  { title: "Instagram Mastery", img: "https://futurefiix.com/assets/images/courses/insta.jpg", category: "Premium", totalLessons: 9 },
  { title: "Canva Mastery", img: "https://futurefiix.com/assets/images/courses/canva.jpg", category: "Premium", totalLessons: 7 },
  { title: "Google AdSense", img: "https://futurefiix.com/assets/images/courses/google.jpg", category: "Premium", totalLessons: 11 },
  { title: "YouTube Mastery", img: "https://futurefiix.com/assets/images/courses/youtube.jpg", category: "Premium", totalLessons: 14 },
  { title: "Facebook Ads", img: "https://futurefiix.com/assets/images/courses/fb.jpg", category: "Premium", totalLessons: 13 },
  { title: "Instagram Theme Page", img: "https://futurefiix.com/assets/images/courses/theme.jpg", category: "Premium", totalLessons: 6 },
  { title: "WordPress Development", img: "https://futurefiix.com/assets/images/courses/wp.jpg", category: "Premium", totalLessons: 18 },
  { title: "Communication Skills", img: "https://futurefiix.com/assets/images/courses/comm.jpg", category: "Premium", totalLessons: 5 },
  { title: "Digital Marketing", img: "https://futurefiix.com/assets/images/courses/digital.jpg", category: "Premium", totalLessons: 20 },
  { title: "Drop Shipping", img: "https://futurefiix.com/assets/images/courses/drop.jpg", category: "Premium", totalLessons: 12 },
  { title: "Chat GPT Mastery", img: "https://futurefiix.com/assets/images/courses/gpt.jpg", category: "Premium", totalLessons: 4 },
  { title: "Stock Market", img: "https://futurefiix.com/assets/images/courses/stock.jpg", category: "Premium", totalLessons: 16 }
];

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
