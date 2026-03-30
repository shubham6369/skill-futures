import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, setDoc, query, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAit3eL37pTaeVW5O4uzaSWqcwjzNGOzfc",
  authDomain: "skillfuture-9ce01.firebaseapp.com",
  projectId: "skillfuture-9ce01",
  storageBucket: "skillfuture-9ce01.firebasestorage.app",
  messagingSenderId: "572586687847",
  appId: "1:572586687847:web:da088da422ae058343c3c2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Fetching first user to assign teammates to...");
  const usersRef = collection(db, 'users');
  const userDocs = await getDocs(query(usersRef, limit(1)));
  
  if (userDocs.empty) {
    console.log("No users found in the database. Please create a user first.");
    process.exit(1);
  }
  
  const parentId = userDocs.docs[0].id;
  console.log(`Assigning teammates to user ID: ${parentId}`);
  
  const dummyTeammates = [
    {
      name: "Rahul Sharma",
      email: "rahul@dummy.com",
      phone: "9876543210",
      profileImage: "https://i.pravatar.cc/150?img=11",
      allTimeEarnings: 1200,
      todayEarnings: 0,
      weeklyEarnings: 400,
      monthlyEarnings: 1200,
      passiveEarnings: 200,
      industryEarnings: 1200,
      paidEarnings: 1000,
      role: 'user',
      referrerId: parentId,
      joinedAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
    },
    {
      name: "Priya Singh",
      email: "priya@dummy.com",
      phone: "9876543211",
      profileImage: "https://i.pravatar.cc/150?img=5",
      allTimeEarnings: 3500,
      todayEarnings: 500,
      weeklyEarnings: 1500,
      monthlyEarnings: 3500,
      passiveEarnings: 500,
      industryEarnings: 3500,
      paidEarnings: 3000,
      role: 'user',
      referrerId: parentId,
      joinedAt: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
    },
    {
      name: "Amit Patel",
      email: "amit@dummy.com",
      phone: "9876543212",
      profileImage: "https://i.pravatar.cc/150?img=33",
      allTimeEarnings: 800,
      todayEarnings: 0,
      weeklyEarnings: 0,
      monthlyEarnings: 800,
      passiveEarnings: 100,
      industryEarnings: 800,
      paidEarnings: 800,
      role: 'user',
      referrerId: parentId,
      joinedAt: new Date(Date.now() - 86400000 * 15).toISOString() // 15 days ago
    }
  ];
  
  for (const t of dummyTeammates) {
    const dummyRef = await addDoc(usersRef, t);
    // Add referral code based on generated id
    await setDoc(dummyRef, { referralCode: `FF-${dummyRef.id.substring(0, 5).toUpperCase()}` }, { merge: true });
    console.log(`Added dummy teammate: ${t.name}`);
  }
  
  console.log("Successfully seeded teammates!");
  process.exit(0);
}

seed().catch(console.error);
