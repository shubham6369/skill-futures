import { auth, db, googleProvider, storage,
  collection, query, where, orderBy, limit, getDocs, addDoc, doc, getDoc, setDoc, updateDoc, increment, deleteDoc, onSnapshot
} from './firebase.js';
import { courses as seedData } from './courses-data.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';

// ─── Utilities ───────────────────────────────────────────────────────────────

const getQueryParams = () => {
  const params = {};
  window.location.search.substring(1).split('&').forEach(pair => {
    if (pair === "") return;
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });
  return params;
};

// --- Capture Referral Logic ---
const captureReferralLink = () => {
  const { ref } = getQueryParams();
  if (ref) {
    sessionStorage.setItem('referralCode', ref.trim().toUpperCase());
    // Remove ref from URL for clean state
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
};
captureReferralLink();

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div');
    toast.className = 'animate-fade';
    toast.style.cssText = 'position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #4ade80; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 700; z-index: 9999; box-shadow: 0 10px 20px rgba(0,0,0,0.1);';
    toast.innerHTML = '<i class="fas fa-check-circle"></i> Linked Copied Successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  });
};

const getYoutubeEmbedUrl = (url) => {
  if (!url) return '';
  const trimmedUrl = url.trim();
  // Robust YouTube URL regex for Standard, youtu.be, Shorts, Live, and Embed formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/|live\/)([^#&?]*).*/;
  const match = trimmedUrl.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  
  if (videoId) {
    // modestbranding=1 (removes logo), rel=0 (related from same channel), iv_load_policy=3 (no annotations)
    // Removed deprecated showinfo=0
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&iv_load_policy=3`;
  }
  
  console.warn("YouTube ID extraction failed for URL:", trimmedUrl);
  return trimmedUrl;
};

// ─── App State ───────────────────────────────────────────────────────────────

const AppState = {
  view: 'home',
  user: null,
  userData: null,
  isAdmin: false,
  leaderboardToday: [],
  leaderboardWeekly: [],
  leaderboardMonthly: [],
  activeLeaderboardTab: 'today',
  team: [],
  courses: [],
  userCourses: [],
  allUsers: [],
  allPayouts: [],
  allNotices: [],
  userPayouts: [],
  selectedCourseId: null,
  activeLessonId: null,
  playingCourseId: null,
  uploadingProfile: false,
  showWelcomeModal: false,
  profileTab: 'details',
  isSidebarVisible: true,
  developerMode: false,
  selectedPackage: null, // Track package selection during onboarding
  loading: {
    leaderboard: false,
    team: false,
    courses: false,
    userPayouts: false,
    adminUsers: false,
    adminPayouts: false,
    adminSettings: false,
    adminNotices: false
  },
  fetched: {
    userPayouts: false,
    adminUsers: false,
    adminPayouts: false,
    adminSettings: false,
    adminNotices: false
  },
  commissionSettings: {
    direct: 400,
    passive: 100,
    referralDiscount: 100
  },
  trainings: []
};

// ─── Data Actions ────────────────────────────────────────────────────────────

/**
 * Common Reward Logic for Referrals
 * Adds commissions to referrer and indirect referrer.
 */
const awardReferralCommissions = async (referrerUid) => {
  if (!referrerUid) return;

  try {
    // 1. Direct Commission (₹400)
    await updateDoc(doc(db, 'users', referrerUid), {
      todayEarnings: increment(AppState.commissionSettings.direct),
      weeklyEarnings: increment(AppState.commissionSettings.direct),
      monthlyEarnings: increment(AppState.commissionSettings.direct),
      allTimeEarnings: increment(AppState.commissionSettings.direct)
    });

    // 2. Passive Commission (₹100) - Award to Referrer's Referrer
    const referrerDoc = await getDoc(doc(db, 'users', referrerUid));
    if (referrerDoc.exists() && referrerDoc.data().referrerId) {
      const indirectId = referrerDoc.data().referrerId;
      await updateDoc(doc(db, 'users', indirectId), {
        passiveEarnings: increment(AppState.commissionSettings.passive),
        allTimeEarnings: increment(AppState.commissionSettings.passive)
      });
    }
  } catch (e) {
    console.error("Error awarding commissions:", e);
  }
};

const signInWithGoogle = async () => {
  try {
    console.log("Starting Google Sign-In popup...");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In Success:", result.user.email);
  } catch (e) {
    console.error("Google Sign-In Error:", e);
    if (e.code !== 'auth/popup-closed-by-user') {
      alert(e.message);
    }
  }
};

let _userDataUnsub = null;
const fetchUserData = async (uid) => {
  if (_userDataUnsub) _userDataUnsub();
  _userDataUnsub = onSnapshot(doc(db, 'users', uid), async (userDoc) => {
    let userData = null;
    if (userDoc.exists()) {
      userData = userDoc.data();
      AppState.userData = userData;
      AppState.isAdmin = userData.role === 'admin' || auth.currentUser?.email === 'shubham67257@gmail.com';
    } else {
      // Create initial user doc if missing (e.g., after Google Sign-In or new account)
      let referrerId = null;
      const refCode = sessionStorage.getItem('referralCode');
      
      if (refCode) {
        try {
          const q = query(collection(db, 'users'), where('referralCode', '==', refCode.trim().toUpperCase()), limit(1));
          const snap = await getDocs(q);
          if (!snap.empty) {
            referrerId = snap.docs[0].id;
            await awardReferralCommissions(referrerId);
          }
          sessionStorage.removeItem('referralCode');
        } catch (e) {
          console.error("Referral Lookup Error:", e);
        }
      }

      userData = {
        name: AppState.user.displayName || 'Learner',
        email: AppState.user.email,
        todayEarnings: 0,
        weeklyEarnings: 0,
        monthlyEarnings: 0,
        allTimeEarnings: 0,
        passiveEarnings: 0,
        industryEarnings: 0,
        paidEarnings: 0,
        role: 'user',
        referralCode: `FF-${uid.substring(0, 5).toUpperCase()}`,
        referrerId: referrerId,
        joinedAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', uid), userData);
      AppState.userData = userData;
      AppState.isAdmin = false;
    }

    // --- Onboarding Logic ---
    // If the user arrives at home, login, or signup while authenticated,
    // we guide them to the appropriate next stop.
    if (['home', 'login', 'signup', 'admin-login'].includes(AppState.view)) {
      if (AppState.isAdmin || AppState.developerMode) {
        AppState.view = 'admin-dashboard';
      } else if (!userData.package) {
        AppState.view = 'select-package';
      } else {
        AppState.view = 'dashboard';
      }
    }
    
    // Check if we should show the welcome modal (only on dashboard)
    if (AppState.view === 'dashboard' && !AppState.showWelcomeModal) {
      const hideUntil = localStorage.getItem('hideWelcomeModalUntil');
      if (!hideUntil || new Date().getTime() > parseInt(hideUntil)) {
        AppState.showWelcomeModal = true;
      }
    }

    render();
  });
};

let _leaderboardUnsubs = [];
const fetchLeaderboard = async () => {
  if (_leaderboardUnsubs.length > 0) return;
  const qToday = query(collection(db, 'users'), orderBy('todayEarnings', 'desc'), limit(10));
  const qWeekly = query(collection(db, 'users'), orderBy('weeklyEarnings', 'desc'), limit(10));
  const qMonthly = query(collection(db, 'users'), orderBy('monthlyEarnings', 'desc'), limit(10));
  
  _leaderboardUnsubs.push(onSnapshot(qToday, (snap) => {
    AppState.leaderboardToday = snap.docs.map(doc => doc.data());
    if (AppState.activeLeaderboardTab === 'today') render();
  }));
  _leaderboardUnsubs.push(onSnapshot(qWeekly, (snap) => {
    AppState.leaderboardWeekly = snap.docs.map(doc => doc.data());
    if (AppState.activeLeaderboardTab === 'weekly') render();
  }));
  _leaderboardUnsubs.push(onSnapshot(qMonthly, (snap) => {
    AppState.leaderboardMonthly = snap.docs.map(doc => doc.data());
    if (AppState.activeLeaderboardTab === 'monthly') render();
  }));
};

const fetchTeam = async () => {
  if (AppState.loading.team) return;
  AppState.loading.team = true;
  const q = query(collection(db, 'users'), where('referrerId', '==', AppState.user.uid));
  const querySnapshot = await getDocs(q);
  AppState.team = querySnapshot.docs.map(doc => doc.data());
  AppState.loading.team = false;
  render();
};

let _coursesUnsub = null;
const fetchCourses = async () => {
  if (_coursesUnsub) return;
  _coursesUnsub = onSnapshot(collection(db, 'courses'), (querySnapshot) => {
    const dbCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    AppState.courses = dbCourses;
    render();
  });
};

const fetchUserCourses = async () => {
  const q = query(collection(db, 'userCourses'), where('userId', '==', AppState.user.uid));
  const querySnapshot = await getDocs(q);
  AppState.userCourses = querySnapshot.docs.map(doc => doc.data());
  render();
};

let _trainingsUnsub = null;
const fetchTrainings = async () => {
  if (_trainingsUnsub) return;
  _trainingsUnsub = onSnapshot(collection(db, 'trainings'), (snap) => {
    AppState.trainings = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    render();
  });
};

const enrollInCourse = async (courseId) => {
  const existing = AppState.userCourses.find(c => c.courseId === courseId);
  if (existing) {
    AppState.selectedCourseId = courseId;
    AppState.view = 'training';
    render();
    return;
  }

  await addDoc(collection(db, 'userCourses'), {
    userId: AppState.user.uid,
    courseId: courseId,
    enrolledAt: new Date().toISOString(),
    progress: 0,
    status: 'active',
    completedLessons: []
  });
  
  await fetchUserCourses();
  AppState.selectedCourseId = courseId;
  AppState.view = 'training';
  render();
};

const updateProgress = async (courseId, lessonId) => {
  const enrollment = AppState.userCourses.find(uc => uc.courseId === courseId);
  if (!enrollment) return;

  const completed = enrollment.completedLessons || [];
  if (completed.includes(lessonId)) return;

  const newCompleted = [...completed, lessonId];
  const course = AppState.courses.find(c => c.id === courseId);
  const total = course?.totalLessons || 1;
  const progress = Math.round((newCompleted.length / total) * 100);

  // We need the doc ID for the userCourses entry. Let's update fetchUserCourses to include doc ID.
  const q = query(collection(db, 'userCourses'), 
    where('userId', '==', AppState.user.uid),
    where('courseId', '==', courseId),
    limit(1)
  );
  const snap = await getDocs(q);
  if (!snap.empty) {
    await updateDoc(doc(db, 'userCourses', snap.docs[0].id), {
      completedLessons: newCompleted,
      progress: progress
    });
    await fetchUserCourses();
  }
};

const fetchUserPayouts = async () => {
  if (!AppState.user || AppState.loading.userPayouts) return;
  AppState.loading.userPayouts = true;
  try {
    const q = query(
      collection(db, 'payoutRequests'),
      where('userId', '==', AppState.user.uid),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    AppState.userPayouts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    AppState.fetched.userPayouts = true;
  } catch (err) {
    console.error("Error fetching user payouts:", err);
  }
  AppState.loading.userPayouts = false;
  render();
};

const requestPayout = async (amount, upi) => {
  const m = AppState.userData;
  const available = (m.allTimeEarnings || 0) - (m.paidEarnings || 0);
  if (amount <= 0) return alert("Please enter a valid amount.");
  if (amount < 100) return alert("Minimum withdrawal amount is \u20b9100.");
  if (amount > available) return alert("Insufficient balance! You only have \u20b9" + available + " available.");
  if (!upi || upi.trim().length < 3) return alert("Please enter valid UPI ID or bank details.");

  // Check for pending requests
  const pending = AppState.userPayouts.find(p => p.status === 'pending');
  if (pending) return alert("You already have a pending withdrawal request. Please wait for it to be processed.");
  
  try {
    await addDoc(collection(db, 'payoutRequests'), {
      userId: AppState.user.uid,
      userName: AppState.userData.name,
      userEmail: AppState.user.email,
      amount: amount,
      upi: upi.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    alert("\u2705 Withdrawal request of \u20b9" + amount + " submitted successfully! You will be notified once it is processed.");
    AppState.fetched.userPayouts = false;
    await fetchUserPayouts();
  } catch (err) {
    alert("Error submitting request: " + err.message);
  }
};

window.uploadProfileImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size should be less than 5MB");
    return;
  }

  AppState.uploadingProfile = true;
  render();

  try {
    const fileRef = ref(storage, `users/${AppState.user.uid}/profile_${Date.now()}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {}, 
      (error) => {
        console.error("Upload failed:", error);
        alert("Upload failed. Ensure Firebase Storage is configured.");
        AppState.uploadingProfile = false;
        render();
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, 'users', AppState.user.uid), {
          profileImage: downloadURL
        });
        AppState.userData.profileImage = downloadURL;
        AppState.uploadingProfile = false;
        render();
      }
    );
  } catch(err) {
    console.error("Error initiating upload:", err);
    alert("Upload error.");
    AppState.uploadingProfile = false;
    render();
  }
};

// ─── Admin Actions ───────────────────────────────────────────────────────────

const fetchAdminUsers = async () => {
  if ((!AppState.isAdmin && !AppState.developerMode) || AppState.loading.adminUsers) return;
  AppState.loading.adminUsers = true;
  try {
    const q = query(collection(db, 'users'), orderBy('joinedAt', 'desc'));
    const snap = await getDocs(q);
    AppState.allUsers = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    AppState.fetched.adminUsers = true;
  } catch (err) {
    console.error("Error fetching users:", err);
    AppState.fetched.adminUsers = true;
  }
  AppState.loading.adminUsers = false;
  render();
};

const fetchAdminSettings = async () => {
  if ((!AppState.isAdmin && !AppState.developerMode) || AppState.loading.adminSettings) return;
  AppState.loading.adminSettings = true;
  try {
    const sDoc = await getDoc(doc(db, 'settings', 'commissions'));
    if (sDoc.exists()) {
      AppState.commissionSettings = sDoc.data();
    } else {
      await setDoc(doc(db, 'settings', 'commissions'), AppState.commissionSettings);
    }
    AppState.fetched.adminSettings = true;
  } catch (err) {
    console.error("Error fetching settings:", err);
    AppState.fetched.adminSettings = true;
  }
  AppState.loading.adminSettings = false;
  render();
};

const saveAdminSettings = async (settings) => {
  try {
    await setDoc(doc(db, 'settings', 'commissions'), settings);
    AppState.commissionSettings = settings;
    alert("System settings updated successfully!");
    render();
  } catch (err) {
    alert("Error saving settings: " + err.message);
  }
};

const saveUser = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, 'users', id), updatedData);
    alert("User profile updated successfully!");
    await fetchAdminUsers();
    AppState.adminModal = null;
    render();
  } catch (err) {
    alert("Error saving user: " + err.message);
  }
};

const fetchAdminPayouts = async () => {
  if ((!AppState.isAdmin && !AppState.developerMode) || AppState.loading.adminPayouts) return;
  AppState.loading.adminPayouts = true;
  try {
    const q = query(collection(db, 'payoutRequests'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    AppState.allPayouts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    AppState.fetched.adminPayouts = true;
  } catch (err) {
    console.error("Error fetching payouts:", err);
    AppState.fetched.adminPayouts = true;
  }
  AppState.loading.adminPayouts = false;
  render();
};

const updatePayoutStatus = async (requestId, userId, amount, status) => {
  try {
    const pRef = doc(db, 'payoutRequests', requestId);
    await updateDoc(pRef, { status });
    
    if (status === 'approved') {
      const uRef = doc(db, 'users', userId);
      await updateDoc(uRef, {
        paidEarnings: increment(amount)
      });
    }
    
    alert(`Payout ${status} successfully!`);
    await fetchAdminPayouts();
  } catch (err) {
    alert("Error updating payout: " + err.message);
  }
};

const deleteCourse = async (courseId) => {
  if (!confirm("Are you sure you want to delete this course?")) return;
  console.log("Attempting to delete course:", courseId);
  try {
    await deleteDoc(doc(db, 'courses', courseId));
    alert("Course deleted!");
    await fetchCourses();
  } catch (err) {
    alert("Error deleting course: " + err.message);
  }
};

const saveCourse = async (courseData) => {
  try {
    const { id, ...data } = courseData;
    if (id) {
      await updateDoc(doc(db, 'courses', id), data);
    } else {
      await addDoc(collection(db, 'courses'), data);
    }
    alert("Course saved successfully!");
    await fetchCourses();
    AppState.adminModal = null;
    render();
  } catch (err) {
    alert("Error saving course: " + err.message);
  }
};

const deleteTraining = async (id) => {
  if (!confirm("Are you sure you want to delete this training session?")) return;
  try {
    await deleteDoc(doc(db, 'trainings', id));
    alert("Training deleted!");
    // fetchTrainings is real-time via snapshot
  } catch (err) {
    alert("Error deleting training: " + err.message);
  }
};

const saveTraining = async (trainingData) => {
  try {
    const { id, ...data } = trainingData;
    if (id) {
      await updateDoc(doc(db, 'trainings', id), data);
    } else {
      await addDoc(collection(db, 'trainings'), {
        ...data,
        createdAt: new Date().toISOString()
      });
    }
    alert("Training saved successfully!");
    AppState.adminModal = null;
    render();
  } catch (err) {
    alert("Error saving training: " + err.message);
  }
};

let _adminNoticesUnsub = null;
const fetchAdminNotices = async () => {
  if (!AppState.isAdmin && !AppState.developerMode) return;
  if (_adminNoticesUnsub) return;
  _adminNoticesUnsub = onSnapshot(collection(db, 'notices'), (snap) => {
    AppState.allNotices = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    AppState.fetched.adminNotices = true;
    render();
  }, (err) => {
    console.error("Error fetching notices:", err);
    AppState.fetched.adminNotices = true;
    _adminNoticesUnsub = null;
  });
};

const saveNotice = async (notice) => {
  try {
    await addDoc(collection(db, 'notices'), {
      ...notice,
      createdAt: new Date().toISOString()
    });
    alert("Notice posted!");
    fetchAdminNotices();
  } catch (err) {
    alert("Error posting notice: " + err.message);
  }
};

const deleteNotice = async (id) => {
  if (!confirm("Delete this notice?")) return;
  await deleteDoc(doc(db, 'notices', id));
  fetchAdminNotices();
};

const WelcomeModal = () => {
  if (!AppState.showWelcomeModal) return '';
  return `
    <div class="modal-overlay" id="welcomeModalOverlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Follow Us</h2>
          <button class="modal-close" id="closeWelcomeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="video-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/vNdteWdkweM?autoplay=1" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
        <div class="modal-footer">
          <label class="checkbox-label">
            <input type="checkbox" id="doNotShowCheckbox"> 
            Do not show again for next 24 hours.
          </label>
        </div>
      </div>
    </div>
  `;
};

const AdminModal = () => {
  if (!AppState.adminModal) return '';
  const { type, data } = AppState.adminModal;
  if (type === 'course') {
    return `
      <div class="modal-overlay" id="adminModalOverlay">
        <div class="modal-container" style="max-width: 550px;">
          <div class="modal-header">
            <h2><i class="fas fa-graduation-cap"></i> ${data?.id ? 'Reference Node Editor' : 'Create New Course'}</h2>
            <button class="modal-close" onclick="AppState.adminModal = null; render();">&times;</button>
          </div>
          <div class="modal-body">
            <form id="adminCourseForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <input type="hidden" id="courseId" value="${data?.id || ''}">
              
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Course Title</label>
                <input type="text" id="courseTitle" class="form-input-styled" value="${data?.title || ''}" required placeholder="e.g. High-Ticket Sales Mastery">
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Course Image URL</label>
                <input type="text" id="courseImg" class="form-input-styled" value="${data?.img || '/course-default.png'}" placeholder="https://images.unsplash.com/photo-...">
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Category</label>
                  <input type="text" id="courseCategory" class="form-input-styled" value="${data?.category || 'Premium'}" required>
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Price (₹)</label>
                  <input type="number" id="coursePrice" class="form-input-styled" value="${data?.price || 599}" required>
                </div>
              </div>



              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Total Lessons</label>
                <input type="number" id="courseLessons" class="form-input-styled" value="${data.lessons?.length || data.totalLessons || 0}" required readonly>
                <small style="color: #64748b;">(Auto-calculated from lesson list below)</small>
              </div>

              <div class="form-group" style="margin-bottom: 2rem; border-top: 1px solid #f1f5f9; padding-top: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <label style="font-weight: 700; color: #1e1b4b;"><i class="fas fa-video"></i> Video Lessons (${data.lessons?.length || 0})</label>
                  <button type="button" class="btn btn-auth" style="width: auto; padding: 0.4rem 0.8rem; font-size: 0.75rem; background: #6366f1;" onclick="window.addAdminLesson()">
                    <i class="fas fa-plus"></i> Add Lesson
                  </button>
                </div>
                
                <div id="lessonList" style="display: flex; flex-direction: column; gap: 1rem; max-height: 250px; overflow-y: auto; padding-right: 5px;">
                  ${(data.lessons || []).map((lesson, i) => `
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; position: relative;" class="lesson-row">
                      <button type="button" onclick="window.removeAdminLesson(${i})" style="position: absolute; top: -8px; right: -8px; width: 22px; height: 22px; border-radius: 50%; background: #ef4444; color: white; border: none; font-size: 0.6rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 2;">&times;</button>
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <input type="text" class="lesson-title-input form-input-styled" style="padding: 10px; font-size: 0.85rem;" value="${lesson.title}" placeholder="Lesson Title (e.g. Introduction to Sales)" required/>
                        <input type="text" class="lesson-url-input form-input-styled" style="padding: 10px; font-size: 0.85rem;" value="${lesson.videoUrl}" placeholder="Video Link (YouTube/Direct)" required/>
                      </div>
                    </div>
                  `).join('')}
                  ${!data.lessons || data.lessons.length === 0 ? '<div style="text-align: center; padding: 2rem; color: #94a3b8; font-size: 0.85rem; background: #f8fafc; border: 1.5px dashed #e2e8f0; border-radius: 12px;">No lessons added yet. Click "Add Lesson" to start.</div>' : ''}
                </div>
              </div>

              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; border-radius: 12px;">
                  <i class="fas fa-save"></i> SYNC WITH DATABASE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  if (type === 'notice') {
    return `
      <div class="modal-overlay" id="adminModalOverlay">
        <div class="modal-container" style="max-width: 500px;">
          <div class="modal-header">
            <h2><i class="fas fa-bullhorn"></i> Broadcast Systems</h2>
            <button class="modal-close" onclick="AppState.adminModal = null; render();">&times;</button>
          </div>
          <div class="modal-body">
            <form id="adminNoticeForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Subject</label>
                <input type="text" id="noticeTitle" class="form-input-styled" required placeholder="e.g. Server Maintenance or New Promo">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Message Content</label>
                <textarea id="noticeMessage" class="form-input-styled" style="height: 120px; resize: none;" required placeholder="Type your broadcast message here..."></textarea>
              </div>
              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; background: #f59e0b; border-radius: 12px;">
                  <i class="fas fa-paper-plane"></i> DEPLOY BROADCAST
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'user-edit') {
    return `
      <div class="modal-overlay" id="adminModalOverlay">
        <div class="modal-container" style="max-width: 500px;">
          <div class="modal-header">
            <h2><i class="fas fa-user-edit"></i> Edit User Profile</h2>
            <button class="modal-close" onclick="AppState.adminModal = null; render();">&times;</button>
          </div>
          <div class="modal-body">
            <form id="adminUserEditForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <input type="hidden" id="editUserId" value="${data?.id || ''}" />
              
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="editUserName" class="form-input-styled" value="${data?.name || ''}" required />
              </div>

              <div class="form-group">
                <label>Platform Role</label>
                <select id="editUserRole" class="form-input-styled" style="width: 100%; appearance: none; padding-right: 2rem; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right%200.7rem%20top%2050%25; background-size: 0.65rem%20auto;">
                  <option value="user" ${data?.role === 'user' ? 'selected' : ''}>Standard User</option>
                  <option value="admin" ${data?.role === 'admin' ? 'selected' : ''}>Administrator</option>
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label>Earnings (All Time)</label>
                  <input type="number" id="editUserEarnings" class="form-input-styled" value="${data?.allTimeEarnings || 0}" required />
                </div>
                <div class="form-group">
                  <label>Paid (₹)</label>
                  <input type="number" id="editUserPaid" class="form-input-styled" value="${data?.paidEarnings || 0}" required />
                </div>
              </div>

              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; border-radius: 12px;">
                  <i class="fas fa-check-circle"></i> UPDATE IDENTITY
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'training') {
    return `
      <div class="modal-overlay" id="adminModalOverlay">
        <div class="modal-container" style="max-width: 500px;">
          <div class="modal-header">
            <h2><i class="fas fa-video"></i> ${data?.id ? 'Edit Training Session' : 'Create New Training'}</h2>
            <button class="modal-close" onclick="AppState.adminModal = null; render();">&times;</button>
          </div>
          <div class="modal-body">
            <form id="adminTrainingForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <input type="hidden" id="trainingId" value="${data?.id || ''}">
              
              <div class="form-group">
                <label>Training Title</label>
                <input type="text" id="trainingTitle" class="form-input-styled" value="${data?.title || ''}" required placeholder="e.g. Weekly Strategy Call">
              </div>

              <div class="form-group">
                <label>YouTube Link</label>
                <input type="text" id="trainingUrl" class="form-input-styled" value="${data?.videoUrl || ''}" required placeholder="https://youtube.com/watch?v=...">
              </div>

              <div class="form-group">
                <label>Thumbnail Image URL (Optional)</label>
                <input type="text" id="trainingThumb" class="form-input-styled" value="${data?.thumb || '/course-default.png'}" placeholder="https://...">
                <small style="color: #64748b;">Defaults to course-default.png if left empty</small>
              </div>

              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; border-radius: 12px; background: #6366f1;">
                   <i class="fas fa-save"></i> SAVE TRAINING SESSION
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  return '';
};

/* ─── Basic Package Detail Modal ─── */
const BasicPackageDetailModal = () => `
  <div id="basicDetailModal" style="display:none; position:fixed; inset:0; background:rgba(15,23,42,0.7); z-index:9999; align-items:center; justify-content:center; padding:1rem; backdrop-filter:blur(6px);" onclick="if(event.target===this)this.style.display='none'">
    <div style="background:#fff; border-radius:24px; max-width:760px; width:100%; max-height:90vh; overflow-y:auto; box-shadow:0 50px 100px rgba(0,0,0,0.30); position:relative; animation:slideUpFade 0.35s ease;">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#4338ca 0%,#6366f1 100%); padding:2rem 2.5rem; border-radius:24px 24px 0 0; position:relative;">
        <button onclick="document.getElementById('basicDetailModal').style.display='none'" style="position:absolute; top:1.2rem; right:1.5rem; background:rgba(255,255,255,0.2); border:none; color:white; width:36px; height:36px; border-radius:50%; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center;"><i class="fas fa-times"></i></button>
        <div style="font-size:0.8rem; font-weight:700; color:#c7d2fe; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">Basic Package</div>
        <h2 style="color:white; font-size:1.8rem; font-weight:900; margin:0;">📚 Learning Modules</h2>
        <p style="color:#c7d2fe; margin:0.5rem 0 0; font-size:0.95rem;">Everything included in your Basic package</p>
      </div>

      <!-- Modules -->
      <div style="padding:2rem 2.5rem; display:flex; flex-direction:column; gap:1.75rem;">

        <!-- Module 1 -->
        <div style="border:1.5px solid #e0e7ff; border-radius:16px; overflow:hidden;">
          <div style="background:#eef2ff; padding:1.2rem 1.5rem; display:flex; align-items:center; gap:14px;">
            <div style="width:42px; height:42px; background:linear-gradient(135deg,#4338ca,#6366f1); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">1️⃣</div>
            <div>
              <div style="font-size:0.72rem; font-weight:700; color:#6366f1; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:2px;">Module 1</div>
              <h3 style="margin:0; font-size:1.1rem; font-weight:800; color:#1e1b4b;">🔹 Affiliate Marketing System</h3>
            </div>
          </div>
          <div style="padding:1.25rem 1.5rem; color:#475569; font-size:0.95rem; line-height:1.7;">
            <p style="margin:0 0 0.6rem;">Gain a clear and practical understanding of how digital products are promoted and monetized in today's online ecosystem.</p>
            <p style="margin:0;">Learn structured and beginner-friendly methods to generate consistent online income and build a strong earning foundation.</p>
          </div>
        </div>

        <!-- Module 2 -->
        <div style="border:1.5px solid #e0e7ff; border-radius:16px; overflow:hidden;">
          <div style="background:#eef2ff; padding:1.2rem 1.5rem; display:flex; align-items:center; gap:14px;">
            <div style="width:42px; height:42px; background:linear-gradient(135deg,#4338ca,#6366f1); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">2️⃣</div>
            <div>
              <div style="font-size:0.72rem; font-weight:700; color:#6366f1; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:2px;">Module 2</div>
              <h3 style="margin:0; font-size:1.1rem; font-weight:800; color:#1e1b4b;">🗣️ English Speaking Course</h3>
            </div>
          </div>
          <div style="padding:1.25rem 1.5rem; color:#475569; font-size:0.95rem; line-height:1.7;">
            <p style="margin:0 0 0.8rem; font-weight:600; color:#1e293b;">Speak Confidently &amp; Communicate Like a Pro!</p>
            <p style="margin:0 0 1rem;">Enhance your English speaking skills and communicate effectively in professional and personal environments. Perfect for beginners who want to speak fluently, gain confidence, and leave a lasting impression.</p>
            <div style="font-weight:700; color:#1e293b; margin-bottom:0.6rem; font-size:0.9rem;">What You Will Learn:</div>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem;">
              ${['Basic English conversation skills','Daily communication phrases and practice','Improve clarity, pronunciation, and confidence','Professional interaction tips for real-life scenarios'].map(item => `
              <li style="display:flex; align-items:flex-start; gap:10px; font-size:0.9rem;">
                <span style="color:#6366f1; font-size:1rem; flex-shrink:0;">✅</span> ${item}
              </li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Module 3 -->
        <div style="border:1.5px solid #e0e7ff; border-radius:16px; overflow:hidden;">
          <div style="background:#eef2ff; padding:1.2rem 1.5rem; display:flex; align-items:center; gap:14px;">
            <div style="width:42px; height:42px; background:linear-gradient(135deg,#4338ca,#6366f1); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">3️⃣</div>
            <div>
              <div style="font-size:0.72rem; font-weight:700; color:#6366f1; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:2px;">Module 3</div>
              <h3 style="margin:0; font-size:1.1rem; font-weight:800; color:#1e1b4b;">📈 Affiliate Marketing Course</h3>
            </div>
          </div>
          <div style="padding:1.25rem 1.5rem; color:#475569; font-size:0.95rem; line-height:1.7;">
            <p style="margin:0 0 1rem;">Learn the art of promoting digital products and earning online. This course gives beginners a structured approach to understand affiliate marketing, create campaigns, and generate income. Perfect for anyone who wants to start their online earning journey.</p>
            <div style="font-weight:700; color:#1e293b; margin-bottom:0.6rem; font-size:0.9rem;">What You Will Learn:</div>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem;">
              ${['How affiliate marketing works and how to get started','Practical strategies to promote products online','Steps to generate consistent online income','Build a strong foundation for future digital earnings'].map(item => `
              <li style="display:flex; align-items:flex-start; gap:10px; font-size:0.9rem;">
                <span style="color:#6366f1; font-size:1rem; flex-shrink:0;">✅</span> ${item}
              </li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- CTA -->
        <button class="btn btn-primary" style="width:100%; height:52px; border-radius:14px; font-weight:800; font-size:1rem;" onclick="document.getElementById('basicDetailModal').style.display='none'; alert('Redirecting to secure payment for Basic package...')">
          Get Basic Package — ₹1599 <i class="fas fa-arrow-right" style="margin-left:8px;"></i>
        </button>
      </div>
    </div>
  </div>
`;

const ProfileView = () => {
  const ud = AppState.userData || {};
  const walletBalance = ud.allTimeEarnings - ud.paidEarnings || 0;
  
  return `
    <section class="main-content animate-fade">
      <h1 style="margin-bottom: 2rem;">My Profile</h1>
      
      <div class="profile-section-container">
        <!-- Left Card -->
        <div class="profile-card card-left">
          <div class="profile-overview-header" style="position: relative;">
            <label for="profileImageInput" style="cursor: pointer; display: inline-block; position: relative; margin: 0 auto;">
              <img src="${ud.profileImage || ud.profilePic || 'https://via.placeholder.com/150'}" class="profile-image-large" alt="Profile" style="opacity: ${AppState.uploadingProfile ? '0.5' : '1'};">
              ${AppState.uploadingProfile ? '<div style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); color: white; font-size: 1.5rem;"><i class="fas fa-spinner fa-spin"></i></div>' : '<div style="position: absolute; bottom: 0; right: 0; background: var(--accent); color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 2px solid white; font-size: 0.9rem;"><i class="fas fa-camera"></i></div>'}
            </label>
            <input type="file" id="profileImageInput" accept="image/*" style="display: none;" onchange="window.uploadProfileImage(event)">
            <h3>${ud.name || 'Learner'}</h3>
            <p>${AppState.user.email}</p>
          </div>
          
          <div class="profile-details-list">
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-id-badge"></i> Ref Code</span>
              <span class="detail-value">${ud.referralCode || 'N/A'} <i class="fas fa-copy copy-btn" data-text="${ud.referralCode}"></i></span>
            </div>
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-box"></i> Package</span>
              <span class="detail-value">${ud.package || 'Premium Package'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-check-circle"></i> KYC Status</span>
              <span class="detail-value" style="color: #14b8a6;">${ud.kycStatus || 'approved'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-user-friends"></i> Sponsor</span>
              <span class="detail-value">${ud.sponsor || 'Juned khan (N)'}</span>
            </div>
          </div>
          
          <div class="wallet-mini-grid">
            <div class="wallet-mini-card">
              <h4>${walletBalance}</h4>
              <span>Wallet Balance</span>
            </div>
            <div class="wallet-mini-card">
              <h4>${ud.pendingWithdrawal || 0}</h4>
              <span>Pending Withdrawal</span>
            </div>
          </div>
          
          <div class="profile-actions">
            <button class="btn btn-profile-action btn-withdraw" onclick="AppState.view='wallet'; render();">Withdraw Amount</button>
            <button class="btn btn-profile-action btn-history">Payout History</button>
          </div>
        </div>

        <!-- Right Card (Editor) -->
        <div class="profile-card card-right">
          <div class="editor-tabs">
            <button class="tab-btn ${AppState.profileTab === 'details' ? 'active' : ''}" data-tab="details">Profile Details</button>
            <button class="tab-btn ${AppState.profileTab === 'kyc' ? 'active' : ''}" data-tab="kyc">Kyc Details</button>
            <button class="tab-btn ${AppState.profileTab === 'password' ? 'active' : ''}" data-tab="password">Change Password</button>
          </div>
          
          <div class="editor-content">
            ${AppState.profileTab === 'details' ? `
              <form id="profileDetailsForm">
                <div class="form-group">
                  <label>Profile Picture</label>
                  <div class="file-input-wrapper">
                    <span class="custom-file-btn">Choose File</span>
                    <span style="color: #64748b; font-size: 0.9rem;">No file chosen</span>
                  </div>
                  <p class="upload-hint">Upload profile in size (1:1) for proper fit.</p>
                </div>
                
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" class="form-input-styled" id="editName" value="${ud.name || ''}" placeholder="Enter your name">
                </div>
                
                <div class="form-group">
                  <label>Phone</label>
                  <input type="text" class="form-input-styled" id="editPhone" value="${ud.phone || ''}" placeholder="Enter phone number">
                </div>
                
                <div class="form-group">
                  <label>Email ID</label>
                  <input type="email" class="form-input-styled form-input-readonly" value="${AppState.user.email}" readonly>
                </div>
                
                <button type="submit" class="btn btn-save">SAVE CHANGES</button>
              </form>
            ` : ''}
            
            ${AppState.profileTab === 'kyc' ? `
              <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-university" style="font-size: 3rem; color: #4f46e5; margin-bottom: 1rem;"></i>
                <h3>KYC and Bank Details</h3>
                <p style="color: #64748b;">Submit your banking and ID details for payouts.</p>
                <button class="btn btn-save" style="margin-top: 1.5rem;">UPDATE KYC</button>
              </div>
            ` : ''}
            
            ${AppState.profileTab === 'password' ? `
              <form id="changePasswordForm">
                <div class="form-group">
                  <label>Current Password</label>
                  <input type="password" class="form-input-styled" placeholder="••••••••">
                </div>
                <div class="form-group">
                  <label>New Password</label>
                  <input type="password" class="form-input-styled" placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-save">UPDATE PASSWORD</button>
              </form>
            ` : ''}
          </div>
        </div>
      </div>
    </section>
  `;
};

// ─── Components ──────────────────────────────────────────────────────────────

// ─── Admin Views ─────────────────────────────────────────────────────────────

const AdminDashboardView = () => {
  const totalUsers = AppState.allUsers.length;
  const pendingPayouts = AppState.allPayouts.filter(p => p.status === 'pending').length;
  const totalCourses = AppState.courses.length;
  const totalNotices = AppState.allNotices.length;
  
  return `
    <section class="main-content animate-fade">
      <div class="admin-section-header">
        <h1>Admin Control Center</h1>
        <div class="badge-admin status-badge"><i class="fas fa-shield-alt"></i> Systems Online</div>
      </div>

      <div class="metrics-grid">
        <div class="admin-card-metric">
          <span class="label">User Base</span>
          <div class="value">${totalUsers}</div>
          <div class="trend trend-up"><i class="fas fa-arrow-up"></i> 12% growth</div>
        </div>
        <div class="admin-card-metric">
          <span class="label">Pending Review</span>
          <div class="value">${pendingPayouts}</div>
          <span class="label" style="font-size: 0.7rem; color: #f43f5e;">Action Required</span>
        </div>
        <div class="admin-card-metric">
          <span class="label">Total Courses</span>
          <div class="value">${totalCourses}</div>
          <div class="trend"><i class="fas fa-book-open"></i> Catalog Size</div>
        </div>
        <div class="admin-card-metric">
          <span class="label">Active Notices</span>
          <div class="value">${totalNotices}</div>
          <div class="trend"><i class="fas fa-bullhorn"></i> Broadcasts</div>
        </div>
      </div>
      
      <div class="chart-container" style="margin-top: 2rem;">
        <h3 style="margin-bottom: 1.5rem;">Quick Management</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
          <button class="btn btn-auth" style="padding: 1rem;" onclick="AppState.view='admin-courses'; render();">
            <i class="fas fa-edit"></i> Manage Courses
          </button>
          <button class="btn btn-auth" style="padding: 1rem; background: #10b981;" onclick="AppState.view='admin-payouts'; render();">
            <i class="fas fa-check-double"></i> Review Payouts
          </button>
          <button class="btn btn-auth" style="padding: 1rem; background: #f59e0b;" onclick="AppState.view='admin-notices'; render();">
            <i class="fas fa-bullhorn"></i> Post Notice
          </button>
          <button class="btn btn-auth" style="padding: 1rem; background: #64748b;" onclick="AppState.view='admin-users'; render();">
            <i class="fas fa-users-cog"></i> User Audit
          </button>
          <button class="btn btn-auth" style="padding: 1rem; background: #818cf8;" onclick="AppState.view='admin-trainings'; render();">
            <i class="fas fa-video"></i> Manage Trainings
          </button>
        </div>
      </div>
    </section>
  `;
};

const AdminUsersView = () => `
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>User Management</h1>
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.6rem 1.2rem; display: flex; align-items: center; gap: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <i class="fas fa-search" style="color: #94a3b8;"></i>
        <input type="text" placeholder="Search by name, email, or ref..." style="border: none; outline: none; font-size: 0.95rem; width: 250px;" oninput="window.filterAdminUsers(this.value)"/>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>User Identity</th>
            <th>Referral Details</th>
            <th>Earnings Profile</th>
            <th>Platform Access</th>
            <th style="text-align: right;">Operations</th>
          </tr>
        </thead>
        <tbody>
          ${AppState.allUsers.length === 0 ? `
            <tr>
              <td colspan="5">
                <div class="empty-state-container">
                  <i class="fas fa-users-slash empty-state-icon"></i>
                  <h3>No users found</h3>
                  <p>Check back later as new users join the platform.</p>
                </div>
              </td>
            </tr>
          ` : AppState.allUsers.map(user => `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 40px; height: 40px; border-radius: 10px; background: #eef2ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;">
                    ${(user.name || 'U').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-weight: 700; color: #0f172a;">${user.name || 'Unnamed User'}</div>
                    <div style="font-size: 0.8rem; color: #64748b;">${user.email}</div>
                    <div style="font-size: 0.7rem; color: #94a3b8; font-family: monospace;">ID: ${user.id}</div>
                  </div>
                </div>
              </td>
              <td style="font-family: monospace; font-size: 0.85rem; color: #4338ca;">
                ${user.referralCode}
              </td>
              <td>
                <div style="font-weight: 800; color: #10b981;">₹ ${(user.allTimeEarnings || 0).toLocaleString()}</div>
                <div style="font-size: 0.75rem; color: #64748b;">Paid: ₹ ${(user.paidEarnings || 0).toLocaleString()}</div>
              </td>
              <td>
                <span class="status-badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}">
                  ${user.role === 'admin' ? '<i class="fas fa-user-shield"></i>' : '<i class="fas fa-user"></i>'}
                  ${user.role || 'user'}
                </span>
              </td>
              <td style="text-align: right;">
                <button class="admin-action-btn" title="Edit User" onclick="window.showUserEditModal('${user.id}')">
                   <i class="fas fa-user-edit"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
`;

const AdminCoursesView = () => `
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>Course Catalog</h1>
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-auth" style="width: auto; padding: 0.8rem 1.5rem; background: var(--secondary);" onclick="window.seedAllCourses()">
          <i class="fas fa-magic"></i> Seed Catalog
        </button>
        <button class="btn btn-auth" style="width: auto; padding: 0.8rem 1.5rem;" onclick="window.showCourseModal()">
          <i class="fas fa-plus"></i> Add New Course
        </button>
      </div>
    </div>
    <div class="course-grid">
      ${AppState.courses.length === 0 ? `
        <div style="grid-column: 1/-1;">
          <div class="empty-state-container">
            <i class="fas fa-book-open empty-state-icon"></i>
            <h3>The catalog is empty</h3>
            <button class="btn btn-primary" onclick="window.showCourseModal()">Add your first course</button>
          </div>
        </div>
      ` : AppState.courses.map(course => `
        <div class="course-card-v2">
          <img src="${course.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800'}" class="course-img-v2" alt="${course.title}"/>
          <div style="padding: 0.5rem 0.75rem 0.25rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem;">${course.category || 'Premium'}</div>
            <h3 style="margin-bottom: 1.25rem; font-size: 1.1rem; text-align: left;">${course.title}</h3>
            <div style="display: flex; gap: 8px;">
              <button class="admin-action-btn" title="Edit Course" onclick="window.showCourseModal('${course.id}')"><i class="fas fa-pen"></i></button>
              <button class="admin-action-btn btn-danger" title="Delete Course" onclick="window.deleteCourse('${course.id}')"><i class="fas fa-trash"></i></button>
              <div style="margin-left: auto; text-align: right;">
                <div style="font-weight: 800; color: #0f172a;">₹ ${course.price || 599}</div>
                <div style="font-size: 0.7rem; color: #64748b;">${course.totalLessons || 12} Lessons</div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`;

const AdminPayoutsView = () => `
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>Financial Queue</h1>
      <div class="badge-pending status-badge"><i class="fas fa-clock"></i> Action Items</div>
    </div>
    
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Payout Amount</th>
            <th>UPI Address</th>
            <th>Current Status</th>
            <th style="text-align: right;">Operations</th>
          </tr>
        </thead>
        <tbody>
          ${AppState.allPayouts.length === 0 ? `
            <tr>
              <td colspan="5">
                <div class="empty-state-container">
                  <i class="fas fa-wallet empty-state-icon"></i>
                  <h3>No payout requests</h3>
                  <p>All clear! There are no pending requests at the moment.</p>
                </div>
              </td>
            </tr>
          ` : AppState.allPayouts.map(p => `
            <tr>
              <td>
                <div style="font-weight: 700; color: #0f172a;">${p.userName}</div>
                <div style="font-size: 0.75rem; color: #64748b;">${new Date(p.createdAt).toLocaleDateString()}</div>
              </td>
              <td style="color: #10b981; font-weight: 800; font-size: 1.1rem;">₹ ${p.amount.toLocaleString()}</td>
              <td style="font-family: monospace; font-size: 0.9rem; color: #475569;">${p.upi}</td>
              <td>
                <span class="status-badge ${p.status === 'pending' ? 'badge-pending' : (p.status === 'approved' ? 'badge-approved' : 'badge-rejected')}">
                  <i class="fas ${p.status === 'pending' ? 'fa-hourglass-start' : (p.status === 'approved' ? 'fa-check-circle' : 'fa-times-circle')}"></i>
                  ${p.status}
                </span>
              </td>
              <td style="text-align: right;">
                ${p.status === 'pending' ? `
                  <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button class="btn btn-auth" style="padding: 0.5rem 1rem; font-size: 0.75rem; background: #10b981;" onclick="window.updatePayoutStatus('${p.id}', '${p.userId}', ${p.amount}, 'approved')">
                      Approve
                    </button>
                    <button class="btn btn-auth" style="padding: 0.5rem 1rem; font-size: 0.75rem; background: #ef4444;" onclick="window.updatePayoutStatus('${p.id}', '${p.userId}', ${p.amount}, 'rejected')">
                      Reject
                    </button>
                  </div>
                ` : '<span style="color: #94a3b8; font-size: 0.8rem; font-weight: 700;">PROCESSED</span>'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
`;

const AdminNoticesView = () => `
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>Platform Notices</h1>
      <button class="btn btn-auth" style="width: auto; padding: 0.8rem 1.5rem; background: #f59e0b;" onclick="window.showNoticeModal()">
        <i class="fas fa-bullhorn"></i> New Broadcast
      </button>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem;">
        ${AppState.allNotices.length === 0 ? `
          <div style="grid-column: 1/-1;">
            <div class="empty-state-container">
              <i class="fas fa-scroll empty-state-icon"></i>
              <h3>No active notices</h3>
              <p>Keep your users informed about updates or maintenance.</p>
            </div>
          </div>
        ` : AppState.allNotices.map(n => `
          <div style="padding: 1.75rem; background: white; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 4px 15px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; position: relative;">
            <div class="badge-admin status-badge" style="position: absolute; top: 1rem; right: 1rem; font-size: 0.6rem;">Broadcast</div>
            <div>
              <h3 style="margin-bottom: 0.75rem; color: #1e293b; font-weight: 800; font-size: 1.2rem;">${n.title}</h3>
              <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6;">${n.message}</p>
            </div>
            <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid #f1f5f9;">
              <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fas fa-clock"></i> ${new Date(n.createdAt).toLocaleDateString()}</span>
              <button class="admin-action-btn btn-danger" onclick="window.deleteNotice('${n.id}')">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        `).join('')}
    </div>
  </section>
`;

const AdminSettingsView = () => {
  const settings = AppState.commissionSettings;
  return `
    <section class="main-content animate-fade">
      <div class="admin-section-header">
        <h1>Global System Configuration</h1>
        <div class="badge-admin status-badge" style="background: #f59e0b;"><i class="fas fa-cog"></i> Advanced Settings</div>
      </div>

      <div class="chart-container" style="max-width: 600px;">
        <h3 style="margin-bottom: 2rem;"><i class="fas fa-percentage"></i> Commission Architecture</h3>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 2.5rem;">Configure the payout amounts for referrals and passive income. Any changes here will be applied immediately to all new affiliate registrations.</p>
        
        <form id="adminSettingsForm" style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="form-group">
            <label style="font-weight: 700; color: #1e293b;">Direct Referral Commission (₹)</label>
            <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px;">
               <div style="background: rgba(99, 102, 241, 0.1); color: #4338ca; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800;">₹</div>
               <input type="number" id="directComm" class="form-input-styled" value="${settings.direct}" required style="font-size: 1.2rem; font-weight: 800;">
            </div>
            <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 8px;">The fixed amount awarded to the direct referrer of a new premium signup.</p>
          </div>

          <div class="form-group">
            <label style="font-weight: 700; color: #1e293b;">Passive Team Commission (₹)</label>
            <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px;">
               <div style="background: rgba(16, 185, 129, 0.1); color: #059669; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800;">₹</div>
               <input type="number" id="passiveComm" class="form-input-styled" value="${settings.passive}" required style="font-size: 1.2rem; font-weight: 800;">
            </div>
            <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 8px;">The indirect commission awarded to the sponsor of the referrer.</p>
          </div>

          <div class="form-group">
            <label style="font-weight: 700; color: #1e293b;">Referral Discount for New Users (₹)</label>
            <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px;">
               <div style="background: rgba(245, 158, 11, 0.1); color: #b45309; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800;">₹</div>
               <input type="number" id="referralDiscount" class="form-input-styled" value="${settings.referralDiscount || 100}" required style="font-size: 1.2rem; font-weight: 800;">
            </div>
            <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 8px;">The discount amount given to a new user if they join via a referral link.</p>
          </div>

          <div style="margin-top: 1rem; padding-top: 2rem; border-top: 1px solid #f1f5f9;">
            <button type="submit" class="btn btn-save" style="width: 100%; height: 55px; border-radius: 15px; background: #0f172a; font-size: 1rem; letter-spacing: 0.5px;">
              <i class="fas fa-shield-check"></i> SYNC SYSTEM CONFIGURATION
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
};
const AdminTrainingsView = () => {
  return `
    <section class="main-content animate-fade">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 2.5rem; font-weight: 800; color: #1e293b; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Manage Training Videos 🎥</h1>
          <p style="color: #64748b; font-size: 1.1rem;">Add or edit high-quality training sessions for your affiliates</p>
        </div>
        <button class="btn btn-primary" onclick="window.showTrainingModal()">
          <i class="fas fa-plus" style="margin-right: 8px;"></i> Add New Training
        </button>
      </div>

      <div class="chart-container" style="padding: 0; overflow: hidden; background: white; border: 1px solid #f1f5f9; border-radius: 20px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="text-align: left; border-bottom: 2px solid #f1f5f9; background: #f8fafc;">
              <th style="padding: 1.5rem; color: #475569; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Thumbnail</th>
              <th style="padding: 1.5rem; color: #475569; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Title</th>
              <th style="padding: 1.5rem; color: #475569; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Video Link</th>
              <th style="padding: 1.5rem; color: #475569; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.trainings.length === 0 ? '<tr><td colspan="4" style="padding: 5rem; text-align: center; color: #94a3b8;"><div style="font-size: 3rem; margin-bottom: 1rem;">📭</div><p style="font-size: 1.1rem; font-weight: 500;">No trainings found. Click "Add New Training" to start.</p></td></tr>' : 
              AppState.trainings.map((t, i) => `
              <tr style="border-bottom: 1px solid #f8fafc; transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" class="animate-fade stagger-${(i % 6) + 1}">
                <td style="padding: 1.2rem;">
                  <img src="${t.thumb || '/course-default.png'}" style="width: 100px; height: 56px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                </td>
                <td style="padding: 1.2rem; font-weight: 700; color: #1e293b; font-size: 1.05rem;">${t.title}</td>
                <td style="padding: 1.2rem; color: #6366f1; font-weight: 600; font-size: 0.9rem;">
                   <a href="${t.videoUrl}" target="_blank" style="color: inherit; text-decoration: none; display: flex; align-items: center; gap: 6px;">
                     Watch on YouTube <i class="fas fa-external-link-alt" style="font-size:0.7rem;"></i>
                   </a>
                </td>
                <td style="padding: 1.2rem; text-align: right;">
                   <div style="display: flex; gap: 10px; justify-content: flex-end;">
                     <button class="btn btn-outline" style="padding: 8px 16px; font-size: 0.85rem; border-color: #6366f1; color: #6366f1; border-radius: 10px;" onclick="window.showTrainingModal('${t.id}')">
                       <i class="fas fa-edit" style="margin-right: 4px;"></i> Edit
                     </button>
                     <button class="btn btn-outline" style="padding: 8px 16px; font-size: 0.85rem; border-color: #ef4444; color: #ef4444; border-radius: 10px;" onclick="window.deleteTraining('${t.id}')">
                       <i class="fas fa-trash" style="margin-right: 4px;"></i> Delete
                     </button>
                   </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
};

const AdminSidebar = () => `
  <div class="mobile-overlay ${AppState.isSidebarVisible ? 'active' : ''}" id="adminMobileOverlay"></div>
  <button id="sidebarToggle" class="sidebar-toggle-btn floating-toggle" style="color: #94a3b8; border-color: #1e293b; background: #0f172a; ${AppState.isSidebarVisible ? 'display: none;' : ''}">
    <i class="fas fa-bars"></i>
  </button>
  <aside class="sidebar ${!AppState.isSidebarVisible ? 'collapsed' : ''} ${AppState.isSidebarVisible ? 'mobile-active' : ''}" style="background: #0f172a; border-right: 1px solid #1e293b;">
    <div class="sidebar-logo" style="border-bottom: 1px solid #1e293b;">
      <div class="logo-content" style="${!AppState.isSidebarVisible ? 'display: none;' : ''}">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="/logo.png" alt="Logo" style="height: 64px; flex-shrink: 0; filter: brightness(0) invert(1);"/>
        </div>
        <div style="font-size: 0.6rem; color: #94a3b8; font-weight: 600; padding-left: 0px; margin-top: 4px;">"Platform Control Center"</div>
      </div>
      <button id="sidebarToggleClose" class="sidebar-toggle-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <ul class="sidebar-nav">
      <li style="padding: 1.5rem 1.5rem 0.5rem; font-size: 0.7rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1px;">Main Dashboard</li>
      <li class="sidebar-item ${AppState.view === 'dashboard' ? 'active' : ''}" data-route="dashboard" style="color: #94a3b8;">
        <i class="fas fa-arrow-left"></i> Back to User Site
      </li>
      
      <li style="padding: 1.5rem 1.5rem 0.5rem; font-size: 0.7rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1px;">Management</li>
      <li class="sidebar-item ${AppState.view === 'admin-dashboard' ? 'active' : ''}" data-route="admin-dashboard" style="color: #94a3b8;">
        <i class="fas fa-chart-pie"></i> Admin Overview
      </li>
      <li class="sidebar-item ${AppState.view === 'admin-users' ? 'active' : ''}" data-route="admin-users" style="color: #94a3b8;">
        <i class="fas fa-users-gear"></i> Manage Users
      </li>
      <li class="sidebar-item ${AppState.view === 'admin-courses' ? 'active' : ''}" data-route="admin-courses" style="color: #94a3b8;">
        <i class="fas fa-layer-group"></i> Manage Courses
      </li>
      <li class="sidebar-item ${AppState.view === 'admin-trainings' ? 'active' : ''}" data-route="admin-trainings" style="color: #94a3b8;">
        <i class="fas fa-video"></i> Manage Trainings
      </li>
      <li class="sidebar-item ${AppState.view === 'admin-payouts' ? 'active' : ''}" data-route="admin-payouts" style="color: #94a3b8;">
        <i class="fas fa-hand-holding-dollar"></i> Payout Requests
      </li>
      <li class="sidebar-item ${AppState.view === 'admin-notices' ? 'active' : ''}" data-route="admin-notices" style="color: #94a3b8;">
        <i class="fas fa-bullhorn"></i> Global Notices
      </li>
      <li class="sidebar-item ${AppState.view === 'admin-settings' ? 'active' : ''}" data-route="admin-settings" style="color: #94a3b8;">
        <i class="fas fa-cog"></i> Global Settings
      </li>
    </ul>

    <div style="padding: 1.5rem; border-top: 1px solid #1e293b; margin-top: auto;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; padding: 0.5rem;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">AD</div>
        <div style="${!AppState.isSidebarVisible ? 'display: none;' : ''}">
          <div style="font-size: 0.8rem; font-weight: 700; color: white;">Admin User</div>
          <div style="font-size: 0.6rem; color: #64748b;">Super Admin</div>
        </div>
      </div>
      <button id="logoutBtn" style="width: 100%; padding: 0.7rem; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.85rem;">
        <i class="fas fa-power-off"></i> Logout
      </button>
    </div>
  </aside>
`;

const Sidebar = () => `
  <div class="mobile-overlay ${AppState.isSidebarVisible ? 'active' : ''}" id="mobileOverlay"></div>
  <button id="sidebarToggle" class="sidebar-toggle-btn floating-toggle" style="${AppState.isSidebarVisible ? 'display: none;' : ''}">
    <i class="fas fa-bars"></i>
  </button>
  <aside class="sidebar ${!AppState.isSidebarVisible ? 'collapsed' : ''} ${AppState.isSidebarVisible ? 'mobile-active' : ''}">
    <div class="sidebar-logo">
      <div class="logo-content" style="${!AppState.isSidebarVisible ? 'display: none;' : ''}">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="/logo.png" alt="Logo" style="height: 200px; flex-shrink: 0;"/>
        </div>

      </div>
      <button id="sidebarToggleClose" class="sidebar-toggle-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-item ${AppState.view === 'dashboard' ? 'active' : ''}" data-route="dashboard">
        <i class="fas fa-desktop"></i> Affiliate Dashboard
      </li>
      <li class="sidebar-item ${AppState.view === 'profile' ? 'active' : ''}" data-route="profile">
        <i class="fas fa-user"></i> My Profile
      </li>
      <li class="sidebar-item ${AppState.view === 'trainings' ? 'active' : ''}" data-route="trainings">
        <i class="fas fa-video"></i> Trainings
      </li>
      <li class="sidebar-item ${AppState.view === 'affiliate-link' ? 'active' : ''}" data-route="affiliate-link">
        <i class="fas fa-link"></i> Refer & Earn
      </li>
      <li class="sidebar-item ${AppState.view === 'courses' ? 'active' : ''}" data-route="courses">
        <i class="fas fa-tablet-screen-button"></i> My Courses
      </li>
      <li class="sidebar-item ${AppState.view === 'upgrade' ? 'active' : ''}" data-route="upgrade">
        <i class="fas fa-chart-line"></i> Upgrade
      </li>
      <li class="sidebar-item ${AppState.view === 'leaderboard' ? 'active' : ''}" data-route="leaderboard">
        <i class="fas fa-chart-bar"></i> Leaderboard
      </li>
      <li class="sidebar-item ${AppState.view === 'team' ? 'active' : ''}" data-route="team">
        <i class="fas fa-users"></i> My Team
      </li>
      <li class="sidebar-item ${AppState.view === 'reports' ? 'active' : ''}" data-route="reports">
        <i class="fas fa-file-alt"></i> Reports <i class="fas fa-chevron-right arrow"></i>
      </li>
      <li class="sidebar-item ${AppState.view === 'trainings' ? 'active' : ''}" data-route="trainings">
        <i class="fas fa-video"></i> Trainings
      </li>
      <li class="sidebar-item ${AppState.view === 'webinars' ? 'active' : ''}" data-route="webinars">
        <i class="fas fa-video"></i> Webinars
      </li>
      <li class="sidebar-item ${AppState.view === 'offers' ? 'active' : ''}" data-route="offers">
        <i class="fas fa-bullseye"></i> Offers
      </li>
      <li class="sidebar-item ${AppState.view === 'earning-target' ? 'active' : ''}" data-route="earning-target">
        <i class="fas fa-dollar-sign"></i> Earning Target
      </li>
      <li class="sidebar-item ${AppState.view === 'wallet' ? 'active' : ''}" data-route="wallet">
        <i class="fas fa-user-check"></i> Wallet Request
      </li>
      <li class="sidebar-item ${AppState.view === 'create-account' ? 'active' : ''}" data-route="create-account">
        <i class="fas fa-user-plus"></i> Create Account
      </li>
    </ul>
    
    <div style="padding: 1.5rem; border-top: 1px solid #f1f5f9; margin-top: auto;">
      <button id="logoutBtn" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: #f9a8a8; color: #a81c1c; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  </aside>
`;

const AdminLayout = (content) => `
  <div class="dashboard-container admin-layout ${!AppState.isSidebarVisible ? 'sidebar-hidden' : ''}" style="background: #f8fafc;">
    ${AdminSidebar()}
    <div id="main-view" style="flex-grow: 1; overflow-y: auto; background: #f8fafc;">
      ${content}
    </div>
  </div>
`;


const DashboardView = () => {
  const m = AppState.userData || {};
  return `
    <section class="main-content">
      <div class="profile-banner">
        <div class="profile-avatar"></div>
        <div>
          <h2 style="font-size: 1.8rem;">Welcome back, ${m.name || 'Learner'} !</h2>
          <div style="background: var(--accent); display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; margin-top: 0.5rem;">
            Premium Package
          </div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card card-today animate-fade-up stagger-1">
          <div class="metric-info">
            <h3>₹ ${m.todayEarnings || 0} /-</h3>
            <span>Today's Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-weekly animate-fade-up stagger-2">
          <div class="metric-info">
            <h3>₹ ${m.weeklyEarnings || 0} /-</h3>
            <span>Weekly Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-monthly animate-fade-up stagger-3">
          <div class="metric-info">
            <h3>₹ ${m.monthlyEarnings || 0} /-</h3>
            <span>Monthly Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-alltime animate-fade-up stagger-4">
          <div class="metric-info">
            <h3>₹ ${m.allTimeEarnings || 0} /-</h3>
            <span>All Time Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-passive animate-fade-up stagger-5">
          <div class="metric-info">
            <h3>₹ ${m.passiveEarnings || 0} /-</h3>
            <span>Total Passive Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-industry animate-fade-up stagger-6">
          <div class="metric-info">
            <h3>₹ ${m.industryEarnings || 0} /-</h3>
            <span>Industry Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
      </div>

      <div class="chart-container">
        <h3 style="margin-bottom: 2rem;">7 Days Sales Graph</h3>
        <div style="height: 300px; display: flex; align-items: flex-end; gap: clamp(10px, 5vw, 2rem); padding: 0 1rem; border-bottom: 1px solid var(--card-border);">
          <div style="flex: 1; height: 10%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 15%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 5%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 20%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 12%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 8%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 30%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
        </div>
      </div>
    </section>
  `;
};

window.switchLeaderboardTab = (tab) => {
  AppState.activeLeaderboardTab = tab;
  render();
};

const LeaderboardView = () => {
  let activeList = [];
  let tabLabel = '';
  if (AppState.activeLeaderboardTab === 'weekly') {
    activeList = AppState.leaderboardWeekly;
    tabLabel = 'weeklyEarnings';
  } else if (AppState.activeLeaderboardTab === 'monthly') {
    activeList = AppState.leaderboardMonthly;
    tabLabel = 'monthlyEarnings';
  } else {
    activeList = AppState.leaderboardToday;
    tabLabel = 'todayEarnings';
  }

  return `
  <section class="main-content animate-fade-up">
    <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem;">
      <h1 style="margin-bottom: 1.5rem;">Leaderboard 🏆</h1>
      <div style="background: #e2e8f0; padding: 4px; border-radius: 12px; display: flex; gap: 4px; overflow-x: auto; width: 100%; max-width: 500px;">
        <button onclick="window.switchLeaderboardTab('today')" style="flex: 1; padding: 12px 16px; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; transition: 0.2s; background: ${AppState.activeLeaderboardTab === 'today' ? 'white' : 'transparent'}; color: ${AppState.activeLeaderboardTab === 'today' ? '#0f172a' : '#64748b'}; box-shadow: ${AppState.activeLeaderboardTab === 'today' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'};">1 Day</button>
        <button onclick="window.switchLeaderboardTab('weekly')" style="flex: 1; padding: 12px 16px; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; transition: 0.2s; background: ${AppState.activeLeaderboardTab === 'weekly' ? 'white' : 'transparent'}; color: ${AppState.activeLeaderboardTab === 'weekly' ? '#0f172a' : '#64748b'}; box-shadow: ${AppState.activeLeaderboardTab === 'weekly' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'};">7 Days</button>
        <button onclick="window.switchLeaderboardTab('monthly')" style="flex: 1; padding: 12px 16px; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; transition: 0.2s; background: ${AppState.activeLeaderboardTab === 'monthly' ? 'white' : 'transparent'}; color: ${AppState.activeLeaderboardTab === 'monthly' ? '#0f172a' : '#64748b'}; box-shadow: ${AppState.activeLeaderboardTab === 'monthly' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'};">30 Days</button>
      </div>
    </div>
    <div class="chart-container" style="background: white; border: 1px solid #f1f5f9;">
      <table style="width: 100%; border-collapse: collapse; color: #0f172a;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <th style="padding: 1.2rem;">Rank</th>
            <th style="padding: 1.2rem;">User</th>
            <th style="padding: 1.2rem;">Earnings</th>
          </tr>
        </thead>
        <tbody>
          ${activeList.length === 0 ? `<tr><td colspan="3" style="text-align:center; padding: 2rem; color: #64748b;">No earnings recorded yet.</td></tr>` : activeList.map((user, i) => `
            <tr style="border-bottom: 1px solid #f8fafc; transition: background 0.2s;" class="animate-fade stagger-${(i % 6) + 1}">
              <td style="padding: 1.2rem; font-weight: 800; color: ${i === 0 ? '#fbbf24' : (i === 1 ? '#94a3b8' : (i===2 ? '#b45309' : '#64748b'))};">#${i + 1}</td>
              <td style="padding: 1.2rem; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 35px; height: 35px; background: #e2e8f0; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                  ${user.profileImage ? `<img src="${user.profileImage}" alt="pfp" style="width:100%; height:100%; object-fit:cover;">` : '<i class="fas fa-user" style="color:#94a3b8;"></i>'}
                </div>
                <span style="font-weight: 600;">${user.name || 'Anonymous'}</span>
              </td>
              <td style="padding: 1.2rem; color: #16a34a; font-weight: 700;">₹ ${user[tabLabel] || 0}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
`;
};

// Global function to play a course video embedded on the card
window.playCourseVideo = (courseId) => {
  const course = AppState.courses.find(c => c.id === courseId);
  if (!course) return;
  
  const videoUrl = course.lessons?.[0]?.videoUrl;
  if (!videoUrl) {
    alert('No video link available for this course.');
    return;
  }
  
  // Toggle: if already playing this course, stop it
  if (AppState.playingCourseId === courseId) {
    AppState.playingCourseId = null;
  } else {
    AppState.playingCourseId = courseId;
  }
  render();
};

const CourseListView = () => {
  return `
    <section class="main-content animate-fade">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3rem;">
        <h1>My Courses 📚</h1>
        <p style="color: #64748b; font-weight: 500;">Your learning journey at a glance</p>
      </div>

      <div class="course-grid">
        ${AppState.courses.length === 0 ? `
          <div style="grid-column: 1/-1;">
            <div class="empty-state-container">
              <i class="fas fa-book-open empty-state-icon"></i>
              <h3>No courses available yet</h3>
              <p>New courses are being added regularly. Check back soon!</p>
            </div>
          </div>
        ` : AppState.courses.map((course, i) => {
          const isPlaying = AppState.playingCourseId === course.id;
          const videoUrl = course.lessons?.[0]?.videoUrl;
          const embedUrl = videoUrl ? getYoutubeEmbedUrl(videoUrl) : '';
          
          return `
          <div class="course-card-v2 animate-fade-up stagger-${(i % 6) + 1}" style="cursor: pointer;" onclick="AppState.selectedCourseId='${course.id}'; AppState.view='training'; render();">
            
            ${isPlaying && embedUrl ? `
              <div style="aspect-ratio: 16/9; width: 100%; position: relative; background: #000; border-radius: 16px 16px 0 0; overflow: hidden;">
                <iframe 
                  src="${embedUrl}&autoplay=1" 
                  title="${course.title || 'Video Player'}"
                  style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  loading="lazy">
                </iframe>
              </div>
            ` : `
              <img src="${course.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800'}" class="course-img-v2" alt="${course.title}"/>
            `}
            
            <div style="padding: 1.25rem;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem;">${course.category || 'Premium'}</div>
              <h3 style="margin-bottom: 1.25rem; font-size: 1.1rem; text-align: left; color: #1e293b;">${course.title}</h3>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #f1f5f9;">
                <div style="font-size: 0.8rem; color: #64748b; font-weight: 600;">
                  <i class="fas fa-play-circle" style="color: var(--accent); margin-right: 4px;"></i> ${course.lessons?.length || course.totalLessons || 0} Lessons
                </div>
              </div>
              
              <button class="btn ${isPlaying ? 'btn-outline' : 'btn-primary'}" style="width: 100%; margin-top: 1.25rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="event.stopPropagation(); window.playCourseVideo('${course.id}');">
                <i class="fas fa-${isPlaying ? 'stop' : 'play'}"></i> ${isPlaying ? 'Stop Video' : 'Play Course'}
              </button>
            </div>
          </div>
        `}).join('')}
      </div>
    </section>
  `;
};

const TrainingsView = () => `
  <section class="main-content animate-fade">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3rem;">
      <h1>Trainings 🎓</h1>
      <p style="color: #64748b; font-weight: 500;">Access exclusive sessions & webinars</p>
    </div>

    <div class="training-grid">
      ${AppState.trainings.map((t, i) => `
        <div class="training-card animate-fade-up stagger-${(i % 6) + 1}">

          <!-- Thumbnail -->
          <div class="training-thumb-container">
            <img src="${t.thumb || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800'}" alt="${t.title}" class="training-thumb" loading="lazy">

            <!-- Live badge -->
            <div class="training-live-badge">
              <span class="live-dot"></span> Live
            </div>

            <!-- Play overlay -->
            <div class="play-overlay">
              <div class="play-icon">
                <i class="fas fa-play"></i>
              </div>
            </div>

            <!-- Slide-up hover info -->
            <div class="training-hover-info">
              <div class="hover-label">Exclusive Session</div>
              <div class="hover-cta">
                Watch Now <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <!-- Card body -->
          <div class="training-info">
            <h3 class="training-title">${t.title}</h3>
            <div class="training-desc">
              <span class="training-desc-tag tag-exclusive">
                <i class="fas fa-crown" style="font-size:0.6rem;"></i> Exclusive
              </span>
              <span class="training-desc-tag tag-hd">
                <i class="fas fa-film" style="font-size:0.6rem;"></i> HD
              </span>
            </div>
            
            <button class="btn btn-primary" style="width: 100%; margin-top: 1.25rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="window.open('${t.videoUrl}', '_blank')">
              <i class="fas fa-play"></i> Play Training
            </button>
          </div>

        </div>
      `).join('')}
    </div>

  </section>
`;

const TeamView = () => `
  <section class="main-content animate-fade-up">
    <h1 style="margin-bottom: 3rem;">My Team</h1>
    <div class="chart-container" style="background: white; border: 1px solid #f1f5f9;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <th style="padding: 1.2rem;">Name</th>
            <th style="padding: 1.2rem;">Email</th>
            <th style="padding: 1.2rem;">Joined At</th>
          </tr>
        </thead>
        <tbody>
          ${AppState.team.map((member, i) => `
            <tr style="border-bottom: 1px solid #f8fafc;" class="animate-fade stagger-${(i % 6) + 1}">
              <td style="padding: 1.2rem; font-weight: 600;">${member.name}</td>
              <td style="padding: 1.2rem; color: #64748b;">${member.email}</td>
              <td style="padding: 1.2rem; color: #64748b;">${new Date(member.joinedAt).toLocaleDateString()}</td>
            </tr>
          `).join('')}
          ${AppState.team.length === 0 ? '<tr><td colspan="3" style="padding: 3rem; text-align: center; color: var(--text-dim);">No team members yet. Start sharing your link!</td></tr>' : ''}
        </tbody>
      </table>
    </div>
  </section>
`;

const WalletRequestView = () => {
  const m = AppState.userData || {};
  const totalEarned = m.allTimeEarnings || 0;
  const totalWithdrawn = m.paidEarnings || 0;
  const pendingAmount = AppState.userPayouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + (p.amount || 0), 0);
  const available = totalEarned - totalWithdrawn;
  const hasPending = AppState.userPayouts.some(p => p.status === 'pending');

  return `
    <section class="main-content animate-fade">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="margin-bottom: 0.25rem;">Wallet & Withdrawals</h1>
          <p style="color: #64748b; font-size: 0.9rem;">Manage your earnings and request payouts</p>
        </div>
        ${hasPending ? '<div style="background: #fef3c7; color: #92400e; padding: 8px 18px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; border: 1px solid #fde68a;"><i class="fas fa-clock"></i> Pending Request Active</div>' : ''}
      </div>

      <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem;">
        <div class="metric-card animate-fade-up stagger-1" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">&#8377;${totalEarned.toLocaleString()}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Total Earned</span>
          </div>
          <div class="metric-icon" style="color: rgba(255,255,255,0.3); font-size: 2.5rem;"><i class="fas fa-coins"></i></div>
        </div>
        <div class="metric-card animate-fade-up stagger-2" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">&#8377;${available.toLocaleString()}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Available Balance</span>
          </div>
          <div class="metric-icon" style="color: rgba(255,255,255,0.3); font-size: 2.5rem;"><i class="fas fa-wallet"></i></div>
        </div>
        <div class="metric-card animate-fade-up stagger-3" style="background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">&#8377;${totalWithdrawn.toLocaleString()}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Total Withdrawn</span>
          </div>
          <div class="metric-icon" style="color: rgba(255,255,255,0.3); font-size: 2.5rem;"><i class="fas fa-arrow-up-from-bracket"></i></div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; align-items: start;">
        <div class="chart-container animate-fade-up stagger-4" style="position: sticky; top: 2rem;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
            <div style="width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #4338ca, #6366f1); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-paper-plane"></i></div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem;">Request Withdrawal</h3>
              <p style="margin: 0; font-size: 0.75rem; color: #94a3b8;">Min. &#8377;100 | Processed within 24-48 hrs</p>
            </div>
          </div>
          
          ${hasPending ? `
            <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 12px; padding: 1.25rem; text-align: center;">
              <i class="fas fa-hourglass-half" style="font-size: 2rem; color: #f59e0b; margin-bottom: 0.75rem;"></i>
              <p style="color: #92400e; font-weight: 600; font-size: 0.9rem; margin: 0;">You have a pending withdrawal of &#8377;${pendingAmount.toLocaleString()}. Please wait for it to be processed.</p>
            </div>
          ` : `
            <form id="payoutForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1e293b; font-size: 0.85rem;">Withdrawal Amount</label>
                <div style="position: relative;">
                  <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-weight: 800; color: #4338ca; font-size: 1.1rem;">&#8377;</span>
                  <input type="number" id="payoutAmount" value="${available}" min="100" max="${available}" required style="width: 100%; padding: 14px 14px 14px 36px; border-radius: 12px; border: 2px solid #e2e8f0; background: #f8fafc; color: #0f172a; font-size: 1.2rem; font-weight: 800; outline: none; transition: border 0.2s;" onfocus="this.style.borderColor='#6366f1'" onblur="this.style.borderColor='#e2e8f0'"/>
                </div>
                <p style="margin: 6px 0 0; font-size: 0.75rem; color: #94a3b8;">Available: &#8377;${available.toLocaleString()} | Min: &#8377;100</p>
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1e293b; font-size: 0.85rem;">UPI ID / Bank Details</label>
                <textarea id="payoutUpi" required placeholder="yourname@upi or Bank: Name, A/C, IFSC" style="width: 100%; padding: 14px; border-radius: 12px; border: 2px solid #e2e8f0; background: #f8fafc; color: #0f172a; height: 100px; resize: none; font-size: 0.9rem; outline: none; transition: border 0.2s; font-family: inherit;" onfocus="this.style.borderColor='#6366f1'" onblur="this.style.borderColor='#e2e8f0'"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%; height: 50px; border-radius: 12px; font-size: 0.95rem; font-weight: 700; background: linear-gradient(135deg, #4338ca, #6366f1); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(99,102,241,0.4)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                <i class="fas fa-paper-plane"></i> Submit Withdrawal Request
              </button>
            </form>
          `}
        </div>

        <div class="chart-container animate-fade-up stagger-5">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="margin: 0;"><i class="fas fa-receipt" style="color: #6366f1; margin-right: 8px;"></i>Transaction History</h3>
            <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">${AppState.userPayouts.length} transactions</span>
          </div>
          ${AppState.loading.userPayouts ? `
            <div style="text-align: center; padding: 3rem; color: #94a3b8;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i><p style="margin-top: 1rem;">Loading transactions...</p></div>
          ` : AppState.userPayouts.length === 0 ? `
            <div style="text-align: center; padding: 3rem;">
              <i class="fas fa-inbox" style="font-size: 3rem; color: #e2e8f0; margin-bottom: 1rem;"></i>
              <h4 style="color: #94a3b8; font-weight: 600;">No transactions yet</h4>
              <p style="color: #cbd5e1; font-size: 0.85rem;">Your withdrawal requests will appear here</p>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px; max-height: 500px; overflow-y: auto;">
              ${AppState.userPayouts.map((p, i) => {
                const statusColors = {
                  pending: { bg: '#fef3c7', text: '#92400e', icon: 'fa-clock' },
                  approved: { bg: '#dcfce7', text: '#166534', icon: 'fa-check-circle' },
                  rejected: { bg: '#fee2e2', text: '#991b1b', icon: 'fa-times-circle' }
                };
                const s = statusColors[p.status] || statusColors.pending;
                return `
                  <div style="padding: 1.25rem; background: #fafbfc; border-radius: 14px; border: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; gap: 1rem; transition: all 0.2s;" class="animate-fade stagger-${(i % 6) + 1}">
                    <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                      <div style="width: 42px; height: 42px; border-radius: 12px; background: ${s.bg}; display: flex; align-items: center; justify-content: center; color: ${s.text}; flex-shrink: 0;">
                        <i class="fas ${s.icon}"></i>
                      </div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 700; color: #0f172a; font-size: 1rem;">&#8377;${p.amount.toLocaleString()}</div>
                        <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.upi}</div>
                      </div>
                    </div>
                    <div style="text-align: right; flex-shrink: 0;">
                      <div style="background: ${s.bg}; color: ${s.text}; padding: 4px 12px; border-radius: 50px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                        <i class="fas ${s.icon}" style="margin-right: 4px;"></i>${p.status}
                      </div>
                      <div style="font-size: 0.7rem; color: #cbd5e1; margin-top: 6px;">${new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    </section>
  `;
};


const AffiliateLinkView = () => {
  const m = AppState.userData || {};
  const refCode = m.referralCode || 'FF-GUEST';
  const baseUrl = window.location.origin;
  const directComm = AppState.commissionSettings.direct;
  const passiveComm = AppState.commissionSettings.passive;
  const friendDiscount = AppState.commissionSettings.referralDiscount;
  
  return `
    <section class="main-content animate-fade">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
        <div>
          <h1 style="margin-bottom: 0.5rem;">Refer & Earn 🚀</h1>
          <p style="color: #64748b;">Invite friends and earn rewards as they grow.</p>
        </div>
        <div style="background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 12px 24px; border-radius: 50px; border: 1px solid rgba(74, 222, 128, 0.2); font-weight: 700; font-size: 0.9rem;">
          <i class="fas fa-certificate" style="margin-right: 8px;"></i> Verified Affiliate Account
        </div>
      </div>

      <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <div class="metric-card" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">₹${directComm}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Direct Earning</span>
          </div>
        </div>
        <div class="metric-card" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">₹${passiveComm}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Passive Earning</span>
          </div>
        </div>
        <div class="metric-card" style="background: linear-gradient(135deg, #b45309 0%, #f59e0b 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">₹${friendDiscount}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Friend's Discount</span>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; margin-bottom: 3rem;">
        <div class="chart-container" style="margin-bottom: 0;">
          <h3 style="margin-bottom: 1.5rem;"><i class="fas fa-share-nodes" style="color: #6366f1; margin-right: 12px;"></i>Your Referral Hub</h3>
          <p style="color: #64748b; margin-bottom: 2.5rem; line-height: 1.6;">Use the tools below to share your unique link. When someone joins through you, they get an instant <strong>₹${friendDiscount} discount</strong>, and you earn <strong>₹${directComm}</strong>!</p>
          
          <div style="margin-bottom: 2rem;">
            <label style="color: #64748b; display: block; margin-bottom: 0.75rem; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Direct Affiliate Link</label>
            <div style="display: flex; gap: 10px; background: #f8fafc; padding: 8px; border-radius: 12px; border: 1px solid #e2e8f0; align-items: center;">
              <code style="flex-grow: 1; padding: 10px; color: #1e293b; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${baseUrl}/?ref=${refCode}</code>
              <button class="btn btn-primary copy-btn" data-text="${baseUrl}/?ref=${refCode}" style="padding: 10px 20px; font-size: 0.9rem; border-radius: 8px; flex-shrink: 0;">
                <i class="fas fa-copy"></i> Copy Link
              </button>
            </div>
          </div>

          <div>
            <label style="color: #64748b; display: block; margin-bottom: 0.75rem; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Personal Referral Code</label>
            <div style="display: flex; gap: 10px; background: #f8fafc; padding: 8px; border-radius: 12px; border: 1px dashed #6366f1; align-items: center;">
              <div style="flex-grow: 1; padding: 10px; color: #6366f1; font-weight: 800; font-size: 1.4rem; letter-spacing: 2px;">${refCode}</div>
              <button class="btn btn-outline copy-btn" data-text="${refCode}" style="padding: 10px 20px; font-size: 0.9rem; border-radius: 8px; border-color: #6366f1; color: #6366f1; flex-shrink: 0;">
                <i class="fas fa-copy"></i> Copy Code
              </button>
            </div>
          </div>
        </div>

        <div class="chart-container" style="margin-bottom: 0; background: #0f172a; color: white;">
          <h4 style="color: white; margin-bottom: 2rem; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-info-circle" style="color: #4ade80;"></i> How it works?
          </h4>
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">1</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">Share your link</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">People signup using your unique affiliate URL or code.</div>
              </div>
            </div>
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">2</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">Friend gets discount</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">They receive an instant ₹${friendDiscount} discount on any package they buy.</div>
              </div>
            </div>
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">3</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">You get paid</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">You earn ₹${directComm} direct commission per signup!</div>
              </div>
            </div>
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">4</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">Passive earnings</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">Earn ₹${passiveComm} for every sale made by your direct referrals.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(to right, #f8fafc, #eff6ff); border-radius: 20px; padding: 2rem; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="width: 60px; height: 60px; background: white; border-radius: 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05); font-size: 1.5rem;">🏆</div>
          <div>
            <h4 style="margin-bottom: 4px;">Top Affiliate Program</h4>
            <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Be a part of our elite community and earn globally.</p>
          </div>
        </div>
        <button class="btn btn-outline" style="border-radius: 10px;">View Affiliate Policy</button>
      </div>
    </section>
  `;
};

const UpgradeView = () => {
  const ud = AppState.userData || {};
  const isReferred = !!ud.referrerId;
  const discount = AppState.commissionSettings.referralDiscount || 100;
  
  const packages = [
    { name: 'Basic', badge: 'Best for Beginners', img: '/basic-package.png', price: 1599, features: ['Social Media Basics', 'Profile Optimization', 'Basics of Affiliate'] },
    { name: 'Advance', badge: 'Financial Mastery', img: '/advance-package.png', price: 2399, features: ['Advanced Sales Funnels', 'Meta Ads Mastery', 'Personal Branding', '1-on-1 Mentorship'], best: true },
    { name: 'Creator', badge: 'Creator Skills', img: '/creator-package.png', price: 4310, features: ['Video Editing', 'Content Strategy', 'Canva Design Mastery'] },
    { name: 'Global', badge: 'High-Income Skills', img: '/global-package.png', price: 7260, features: ['Global Market Insights', 'E-commerce Automation', 'Advanced Networking'] },
    { name: 'Premium', badge: 'Elite Pro', img: '/premium-package.png', price: 9999, features: ['Master Franchise Rights', 'VIP Support', 'Lifetime Course Access'] }
  ];

  return `
    <section class="main-content animate-fade">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: #0f172a;">Upgrade Your Journey 🚀</h1>
        <p style="color: #64748b; font-size: 1.1rem; max-width: 700px; margin: 0 auto;">Select a premium package to unlock high-income skills and accelerate your digital entrepreneurship journey.</p>
        ${isReferred ? `
          <div style="margin-top: 2rem; display: inline-flex; align-items: center; gap: 10px; background: #ecfdf5; color: #059669; padding: 12px 24px; border-radius: 50px; border: 1px solid #10b981; font-weight: 700; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);">
            <i class="fas fa-gift"></i> Special Referral Discount Applied: -₹${discount}
          </div>
        ` : ''}
      </div>

      <div class="package-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; max-width: 1400px; margin: 0 auto; padding-bottom: 4rem;">
        ${packages.map(p => {
          const finalPrice = isReferred ? p.price - discount : p.price;
          return `
            <div class="package-card upgrade-card ${p.best ? 'featured-upgrade' : ''}" style="display: flex; flex-direction: column; background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
              <div class="package-badge" style="position: absolute; top: 20px; right: 20px; background: ${p.best ? '#6366f1' : '#4338ca'}; color: white; padding: 6px 16px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; z-index: 10;">${p.badge}</div>
              <img src="${p.img}" alt="${p.name} Package" style="width: 100%; height: auto; border-bottom: 1px solid #f1f5f9;">
              <div style="padding: 2.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                <h3 style="font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-bottom: 1rem;">${p.name} Package</h3>
                <div style="margin-bottom: 2rem;">
                  <span style="font-size: 2.5rem; font-weight: 900; color: #0f172a;">₹${finalPrice}</span>
                  ${isReferred ? `<span style="text-decoration: line-through; color: #94a3b8; font-weight: 600; margin-left: 8px;">₹${p.price}</span>` : ''}
                </div>
                <ul style="list-style: none; padding: 0; margin-bottom: 2.5rem; flex-grow: 1;">
                  ${p.features.map(f => `<li style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; font-size: 1rem; color: #475569; font-weight: 500;"><i class="fas fa-check-circle" style="color: #6366f1;"></i> ${f}</li>`).join('')}
                </ul>
                <button class="btn btn-primary" style="width: 100%; height: 55px; border-radius: 12px; font-weight: 800; font-size: 1rem; transition: all 0.2s;" onclick="alert('Redirecting to secure payment for ${p.name} package...')">Get Started Now <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></button>
                ${p.name === 'Basic' ? `
                <button onclick="document.getElementById('basicDetailModal').style.display='flex'" style="width: 100%; height: 46px; margin-top: 0.75rem; border-radius: 12px; border: 2px solid #6366f1; background: transparent; color: #6366f1; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s;" onmouseover="this.style.background='#eef2ff'" onmouseout="this.style.background='transparent'">
                  <i class="fas fa-book-open"></i> View Course Details
                </button>` : ''}

              </div>
            </div>
          `;
        }).join('')}
      </div>
      
      <div style="background: #eef2ff; border-radius: 20px; padding: 3rem; text-align: center; border: 1px dashed #6366f1; margin: 0 auto; max-width: 900px;">
        <h3 style="color: #1e1b4b; font-size: 1.5rem; font-weight: 800;">Custom Upgrade Needed?</h3>
        <p style="color: #2e1065; font-weight: 500; margin: 0.8rem 0 2rem; font-size: 1.1rem;">For team licenses or specialized training bundles, connect directly with our support team.</p>
        <div style="display: flex; justify-content: center; gap: 1.5rem;">
          <button class="btn btn-primary" style="background: #4338ca; border-radius: 12px; padding: 1rem 2rem;">Contact Support</button>
          <button class="btn btn-outline" style="border: 2px solid #4338ca; color: #4338ca; border-radius: 12px; padding: 1rem 2rem;">Chat with Us</button>
        </div>
      </div>
    </section>
  `;
};


const PrivacyPolicyView = () => `
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Privacy Policy 🛡️</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Your trust is our priority. Learn how we handle your data with care at Skill Futures.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(99, 102, 241, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid #6366f1; margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #4338ca;">Welcome to Skill Futures 🚀</h2>
          <p>We are delighted to welcome you to Skill Futures, a platform dedicated to empowering individuals through skills, learning, and growth. Your trust is extremely important to us, and we are committed to protecting your privacy while providing you with a safe and valuable learning experience.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">1. Introduction</h3>
            <p style="color: #475569;">At Skill Futures, we value your trust and are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, protect, and manage your data in a transparent and responsible manner.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. Information We Collect</h3>
            <p style="color: #475569;">When you use our website or services, we may collect basic information such as your name, contact details, and your activity on our platform. This information is collected only to the extent necessary to provide you with a better and more personalized experience.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Use of Your Information</h3>
            <p style="color: #475569;">Your information is used strictly to enhance your experience. This includes recommending relevant courses, sending important updates, and understanding your needs. We do not misuse your data for any unethical or unauthorized purposes.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Secure Transactions</h3>
            <p style="color: #475569;">All payments made on our platform are processed through secure and trusted payment gateways. We do not store your financial information, ensuring complete safety of your transactions.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Data Protection & Security</h3>
            <p style="color: #475569;">We implement advanced security measures to protect your personal data from unauthorized access, misuse, or disclosure. However, due to the nature of the internet, we also encourage users to remain cautious and protect their personal information.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">6. Use of Cookies</h3>
            <p style="color: #475569;">We use cookies to analyze user behavior and improve website performance. Cookies help us make the platform faster, smoother, and more user-friendly. You have full control over whether to accept or disable cookies.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">7. Data Sharing Policy</h3>
            <p style="color: #475569;">We respect your privacy and do not sell your personal information. Your data may only be shared with trusted partners when necessary for essential services such as payment processing or technical support.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">8. User Rights</h3>
            <p style="color: #475569;">You have full control over your data. You can access, update, or request deletion of your personal information at any time. We ensure that all such requests are handled promptly and responsibly.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">9. Third-Party Links</h3>
            <p style="color: #475569;">Our platform may contain links to external websites. Once you leave our platform, your privacy will be governed by the policies of those respective websites. We recommend reviewing their policies carefully.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">10. Policy Updates</h3>
            <p style="color: #475569;">We may update this Privacy Policy from time to time as our services evolve. All updates will be clearly communicated on this page to keep you informed.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">11. Contact & Support</h3>
            <p style="color: #475569;">If you have any questions, concerns, or requests regarding your privacy, you can contact us anytime. We are always here to support and assist you.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">12. Data Retention</h3>
            <p style="color: #475569;">We retain your personal information only for as long as necessary to provide services or comply with legal obligations. Once the data is no longer needed, it is securely deleted.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">13. Automated Systems & Tracking</h3>
            <p style="color: #475569;">We may use automated tools to analyze user behavior, such as tracking page visits and engagement. This helps us improve our services and user experience without compromising your privacy.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">14. Children’s Privacy</h3>
            <p style="color: #475569;">Our services are not specifically intended for individuals under the age of 18. We do not knowingly collect data from minors. If such data is identified, it will be removed immediately.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">15. Misuse Protection</h3>
            <p style="color: #475569;">To maintain a safe environment, we monitor activities on our platform. Any suspicious or harmful behavior may result in temporary or permanent account suspension.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">16. Learning Eligibility</h3>
            <p style="color: #475569;">Our platform is open to anyone who is willing to learn and grow. However, users under the age of 18 are advised to use our services under parental or guardian guidance.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">17. User Conduct & Legal Action</h3>
            <p style="color: #475569;">We maintain a strict policy against misconduct, abusive behavior, fraud, or misleading activities. Any violation may lead to strict actions including account suspension, permanent ban, or legal proceedings if required.</p>
          </article>
        </div>

        <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #f1f5f9; text-align: center;">
          <h3 style="color: #1e1b4b;">Final Agreement</h3>
          <p style="color: #64748b;">By accessing and using Skill Futures, you agree to this Privacy Policy. We are committed to maintaining transparency, trust, and a secure environment for all our users.</p>
          
          <div style="margin-top: 2rem;">
            <div style="color: #4338ca; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.5rem;">🌟 Our Mission</div>
            <p style="color: #64748b;">To empower individuals with skills, knowledge, and opportunities that transform their future.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const RefundPolicyView = () => `
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Refund & Return Policy 💳</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Clear, fair, and transparent policies for your peace of mind.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(14, 165, 233, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid var(--accent); margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #0284c7;">1. Overview</h2>
          <p>At Skill Futures, we aim to provide high-quality digital learning experiences to all our users. We believe in transparency and fairness, and our refund policy is designed to ensure a smooth and trustworthy experience.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. Refund Window</h3>
            <p style="color: #475569;">We offer a <strong>3-day refund window</strong> from the date of purchase. Users can request a refund within this period if they are not satisfied with their purchase.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Eligibility Criteria</h3>
            <ul style="color: #475569; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li>The request must be made within 3 days of purchase.</li>
              <li>The course/service should not be significantly accessed or completed.</li>
              <li>Valid purchase details or proof must be provided.</li>
            </ul>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Affiliate / Referral Purchases</h3>
            <p style="color: #475569;">In case of purchases made through any affiliate or referral link, refund requests are still accepted within the 3-day window. However, once the allowed time period has passed, no refund requests will be considered.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Processing Charges</h3>
            <p style="color: #475569;">For all approved refunds, a <strong>2% processing fee</strong> will be deducted from the total paid amount. The remaining amount will be refunded to the original payment method.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">6. Refund Process</h3>
            <p style="color: #475569;">Once a refund request is submitted, our team will review and verify the request. You will be notified via email regarding the approval or rejection. If approved, the refund will be processed within 5–7 business days.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">7. Late or Missing Refunds</h3>
            <p style="color: #475569;">If you haven’t received your refund, please check your bank account or contact your payment provider. If needed, reaching out to our support team is always an option.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">8. How to Request a Refund</h3>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="margin-bottom: 1rem; font-weight: 700;">Please provide these details:</p>
              <ul style="list-style: none; color: #475569; display: flex; flex-direction: column; gap: 0.4rem;">
                <li>📍 Full Name</li>
                <li>📧 Registered Email ID</li>
                <li>📅 Date of Purchase</li>
                <li>🎓 Course Name</li>
                <li>💡 Reason for Refund</li>
              </ul>
              <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dotted #cbd5e1;">
                <p><strong>Contact Support:</strong> skillfuturessupport@gmail.com</p>
                <p><strong>WhatsApp:</strong> +91 8923938520</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
`;

const DisclaimerView = () => `
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Website Disclaimer ⚖️</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Important information regarding our services and your success journey.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(99, 102, 241, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid #6366f1; margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #4338ca;">Welcome to Skill Futures 🚀</h2>
          <p>We are glad to have you here. At Skill Futures, our mission is to guide you with the right knowledge, practical skills, and continuous support so you can grow and achieve your personal and professional goals with confidence.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">1. Educational Purposes Only</h3>
            <p style="color: #475569;">All information, courses, and services provided on this website are intended for educational and informational purposes only. Our goal is to provide you with the right direction and essential skills to achieve your goals effectively.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. Results May Vary</h3>
            <p style="color: #475569;">Any examples related to earnings, digital marketing, or affiliate marketing shared on our platform are for educational and motivational purposes only. Actual results depend on individual effort, learning ability, consistency, and implementation.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Personal Responsibility</h3>
            <p style="color: #475569;">Any decisions or actions you take based on the information provided on this platform involve your active participation and responsibility. We encourage you to make informed and thoughtful decisions.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Our Commitment</h3>
            <p style="color: #475569;">At Skill Futures, we are committed to providing you with the right guidance and continuous support. Our team and founder sincerely work towards helping you grow and move forward confidently towards your goals.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Safe Learning Environment</h3>
            <p style="color: #475569;">Our objective is to create a positive, safe, and supportive learning environment for everyone. Your trust is extremely important to us, and we are committed to maintaining it with honesty and dedication.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">Need Help?</h3>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="margin-bottom: 1rem; color: #475569;">For any information or support, our team is here to assist you:</p>
              <div style="display: flex; flex-direction: column; gap: 0.8rem; font-weight: 600;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fas fa-envelope" style="color: #6366f1;"></i>
                  <span>skillfuturessupport@gmail.com</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fab fa-whatsapp" style="color: #25d366;"></i>
                  <span>8923938520</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
`;

const TermsView = () => `
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Terms & Conditions 📜</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Please read these terms carefully before using our platform.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(14, 165, 233, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid var(--accent); margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #0284c7;">Welcome to Skill Futures</h2>
          <p>By accessing and using our platform, you agree to follow the guidelines mentioned below. Our platform is intended for educational and skill development purposes, providing you with the right knowledge, guidance, and support to help you grow effectively.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">1. Performance & Results</h3>
            <p style="color: #475569;">Results achieved through our platform may vary from person to person, as they depend on individual effort, consistency, and implementation. We provide the tools, but your success is in your hands.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. User Conduct</h3>
            <p style="color: #475569;">Users are expected to maintain respectful and positive behavior at all times. Any activity that negatively affects other users or the platform environment may lead to restricted or removed access.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Commitment & Responsibility</h3>
            <p style="color: #475569;">Skill Futures promotes transparency and responsibility. If any user is involved in commitments related to services, it is expected that they act honestly and deliver as promised.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Intellectual Property</h3>
            <p style="color: #475569;">All content available on this platform, including text, videos, and materials, belongs to Skill Futures. Unauthorized use, copying, or distribution is strictly prohibited.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Service Improvements</h3>
            <p style="color: #475569;">Skill Futures may update or improve its services, content, or policies at any time to enhance the user experience and maintain the highest quality of education.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">Need Help?</h3>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="margin-bottom: 0.5rem; color: #475569;">If you have any questions, reach out to us:</p>
              <div style="display: flex; align-items: center; gap: 10px; font-weight: 600;">
                <i class="fas fa-envelope" style="color: var(--accent);"></i>
                <span>skillfuturessupport@gmail.com</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
`;

const HomeView = () => `
  ${PackagesSection()}
  ${FounderSection()}
`;

const FounderSection = () => `
  <section class="founder-section animate-fade-up" style="padding: 4rem 2rem; background: #fff; text-align: center;">
    <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center;">
      
      <div style="margin-bottom: 2rem; position: relative;">
        <img src="founder-avatar.png" alt="Mohammed Faizan" style="width: 250px; height: 250px; border-radius: 50%; object-fit: cover; border: 6px solid #e0e7ff; box-shadow: 0 15px 35px rgba(67, 56, 202, 0.15);">
        <div style="position: absolute; bottom: 0; right: 20px; background: #f59e0b; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 800; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">CEO</div>
      </div>

      <h2 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 2.5rem; line-height: 1.3;">Meet Our Founder – Mohammed Faizan 🚀</h2>

      <div style="background: #f8fafc; padding: 2.5rem; border-radius: 20px; border: 1px solid #e2e8f0; text-align: left;">
        <p style="color: #334155; font-size: 1.15rem; line-height: 1.8; margin-bottom: 1.5rem;">
          <strong style="color: #0f172a;">Mohammed Faizan</strong>, Founder & CEO of Skill Futures, is a visionary leader in the digital space, committed to empowering individuals with future-ready skills. With 2–3 years of experience, he has successfully guided <strong style="color: #4338ca;">500+ individuals</strong> to build strong and sustainable income opportunities alongside their studies or work. 💼
        </p>
        <p style="color: #334155; font-size: 1.15rem; line-height: 1.8; margin-bottom: 1.5rem;">
          With a deep understanding of the affiliate industry, he has designed result-oriented systems focused on real growth, clarity, and long-term success. ⚡
        </p>
        <p style="color: #334155; font-size: 1.15rem; line-height: 1.8; margin: 0;">
          Driven by the belief that skills are the true power, his mission is to uplift individuals from struggle, provide the right direction, and help them become self-dependent.
        </p>
      </div>
    </div>
  </section>
`;

const PackagesSection = () => `
  <section class="packages-section animate-fade-up">
    <h2>Our Exclusive Packages</h2>
    <p>Empower your journey with our carefully curated digital skill development packages.</p>
    <div class="package-grid" style="grid-template-columns: 1fr; max-width: 400px; margin: 0 auto;">
      <div class="package-card" data-route="signup" style="transform: none !important;">
        <div class="package-badge">Best for Beginners</div>
        <img src="/basic-package.png" alt="Basic Package">
        <div class="package-info">
          <h3>Basic Package</h3>
          <p>₹1599</p>
        </div>
      </div>
    </div>
  </section>
`;

const AuthView = (type) => `
  <div class="auth-wrapper">
    <div class="auth-card">
      <h2 class="auth-title">${type === 'login' ? 'Login Account' : 'Create Account'}</h2>
      <p class="auth-subtitle">
        ${type === 'login' ? "Hey there! Ready to log in? Just enter your email and password below and you'll be back in action in no time. Let's go!" : 'Join our community of digital entrepreneurs and start building your future today.'}
      </p>
      
      <form id="${type}Form">
        ${type === 'signup' ? `
          <div class="form-field">
            <label class="form-label">Full Name</label>
            <input type="text" id="signupName" class="auth-input" placeholder="Full Name" required>
          </div>
        ` : ''}
        
        <div class="form-field">
          <label class="form-label">Email</label>
          <input type="email" id="${type}Email" class="auth-input" placeholder="Email" required>
        </div>
        
        <div class="form-field">
          <label class="form-label">Password</label>
          <div class="password-container">
            <input type="password" id="${type}Password" class="auth-input" placeholder="Password" required>
            <i class="fas fa-eye visibility-toggle" onclick="const p = document.getElementById('${type}Password'); p.type = p.type === 'password' ? 'text' : 'password'; this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');"></i>
          </div>
        </div>
        
        <div class="auth-options">
          <label class="remember-me">
            <input type="checkbox"> Remember me
          </label>
          <a href="#" class="forgot-link">Forgot Password?</a>
        </div>
        
        ${type === 'signup' ? `
          <div class="form-field">
            <label class="form-label">Referral Code (Optional)</label>
            <input type="text" id="signupReferral" class="auth-input" placeholder="Referral Code" value="${sessionStorage.getItem('referralCode') || ''}">
            ${sessionStorage.getItem('referralCode') ? '<p style="font-size: 0.75rem; color: #4ade80; font-weight: 600; margin-top: 4px;"><i class="fas fa-check-circle"></i> Referral Applied!</p>' : ''}
          </div>
        ` : ''}
        
        <button type="submit" class="btn-auth">
          ${type === 'login' ? 'Sign In' : 'Sign Up'} <i class="fas fa-arrow-right"></i>
        </button>
      </form>

      <div class="auth-divider">
        <span>OR</span>
      </div>

      <button class="btn-google" id="googleSignInBtn">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google">
        Continue with Google
      </button>
      
      <div class="auth-footer">
        ${type === 'login' ? `Don't have an account? <span data-route="signup" style="color: #4338ca; font-weight: 700; cursor: pointer;">Sign Up</span>` : `Already have an account? <span data-route="login" style="color: #4338ca; font-weight: 700; cursor: pointer;">Login</span>`}
      </div>
    </div>
  </div>
`;

const AdminLoginView = () => `
  <div class="admin-auth-container animate-fade">
    <div class="admin-glass-card">
      <div style="text-align: center; margin-bottom: 3rem;">
        <img src="/logo.png" alt="Skill Futures Admin" style="height: 100px; margin-bottom: 1.5rem; filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.4));">
        <h2 style="color: white; font-size: 2.25rem; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 0.5rem;">Admin Portal</h2>
        <p style="color: var(--admin-accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px;">SECURE ACCESS ONLY</p>
      </div>
      
      <form id="adminLoginForm">
        <div class="admin-input-group">
          <label style="display: block; color: #94a3b8; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.75rem; text-transform: uppercase;">Identity Verification</label>
          <div style="position: relative;">
            <i class="fas fa-envelope" style="position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: #475569;"></i>
            <input type="email" id="adminLoginEmail" class="admin-input" placeholder="admin@skillfutures.in" style="padding-left: 3.5rem;" required>
          </div>
        </div>
        
        <div class="admin-input-group" style="margin-bottom: 2.5rem;">
          <label style="display: block; color: #94a3b8; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.75rem; text-transform: uppercase;">Security Key</label>
          <div style="position: relative;">
            <i class="fas fa-lock" style="position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: #475569;"></i>
            <input type="password" id="adminLoginPassword" class="admin-input" placeholder="••••••••" style="padding-left: 3.5rem;" required>
            <i class="fas fa-eye visibility-toggle" style="color: #475569; right: 1.25rem;" onclick="const p = document.getElementById('adminLoginPassword'); p.type = p.type === 'password' ? 'text' : 'password'; this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');"></i>
          </div>
        </div>
        
        <button type="submit" class="admin-btn">
          Authenticate System <i class="fas fa-shield-alt"></i>
        </button>
      </form>
      
      <div style="margin-top: 3rem; text-align: center; border-top: 1px solid var(--admin-border); padding-top: 2rem;">
        <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 1.5rem;">Unauthorized access to this portal is strictly prohibited and monitored.</p>
        <div data-route="home" style="display: inline-flex; align-items: center; gap: 8px; color: white; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.color='var(--admin-accent)'" onmouseout="this.style.color='white'">
          <i class="fas fa-arrow-left"></i> Return to Main Website
        </div>
      </div>
    </div>
  </div>
`;

const SignupView = () => `
  <div class="signup-page-wrapper animate-fade" style="justify-content: center; align-items: center; background: #f8fafc;">
    <div class="signup-content-side" style="flex: initial; width: 100%; max-width: 600px; padding: 2rem;">
      <div class="signup-form-card">
        <h2 class="auth-title">Create Account</h2>
        <p class="auth-subtitle">Fill in your details to get started with Skill Futures.</p>
        
        <form id="signupForm">
          <div class="form-field">
            <label class="form-label">Full Name</label>
            <input type="text" id="signupName" class="auth-input" placeholder="Enter your full name" required>
          </div>
          
          <div class="form-field">
            <label class="form-label">Email Address</label>
            <input type="email" id="signupEmail" class="auth-input" placeholder="name@example.com" required>
          </div>
          
          <div class="form-field">
            <label class="form-label">Create Password</label>
            <div class="password-container">
              <input type="password" id="signupPassword" class="auth-input" placeholder="Min. 8 characters" required>
              <i class="fas fa-eye visibility-toggle" onclick="const p = document.getElementById('signupPassword'); p.type = p.type === 'password' ? 'text' : 'password'; this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');"></i>
            </div>
          </div>
          
          <div class="form-field">
            <label class="form-label">Referral Code (Optional)</label>
            <input type="text" id="signupReferral" class="auth-input" placeholder="Referral Code" value="${sessionStorage.getItem('referralCode') || ''}">
            ${sessionStorage.getItem('referralCode') ? '<p style="font-size: 0.85rem; color: #16a34a; font-weight: 700; margin-top: 8px; display: flex; align-items: center; gap: 6px;"><i class="fas fa-check-circle"></i> Referral Applied Successfully!</p>' : ''}
          </div>
          
          <button type="submit" class="btn-auth">
            Create My Account <i class="fas fa-arrow-right"></i>
          </button>
        </form>

        <div class="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <button class="btn-google" id="googleSignInBtn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google">
          Sign up with Google
        </button>
        
        <div class="auth-footer" style="text-align: left; margin-top: 2rem;">
          Already have an account? <span data-route="login" style="color: #4338ca; font-weight: 800; cursor: pointer;">Sign In</span>
        </div>
      </div>
    </div>
  </div>
`;

const Footer = () => `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col" style="flex: 1.5;">
        <div class="footer-socials">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      
      <div class="footer-col">
        <h3>Course/Packages</h3>
        <ul class="footer-links">
          <li><a>Basic package</a></li>
          <li><a>Advance Package</a></li>
          <li><a>Creator package</a></li>
          <li><a>Global Package</a></li>
          <li><a>Premium Package</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h3>Quick Links</h3>
        <ul class="footer-links">
          <li><a>Contact Us</a></li>
          <li><a data-route="disclaimer" style="cursor: pointer;">Disclaimer</a></li>
          <li><a data-route="privacy-policy" style="cursor: pointer;">Privacy Policy</a></li>
          <li><a data-route="refund-policy" style="cursor: pointer;">Refund Policy</a></li>
          <li><a data-route="terms" style="cursor: pointer;">Terms & Conditions</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Get In Touch</h3>
        <p class="footer-description" style="margin-top: 0;">We are always open to questions and feedback</p>
        <div class="footer-contact-item">
          <i class="fas fa-phone"></i>
          <span>9548797492</span>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-envelope"></i>
          <span>skillfuturessupport@gmail.com</span>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div>Copyright © 2026. All rights reserved.</div>
      <div data-route="admin-login" style="color: #ef4444; font-weight: 800; cursor: pointer; font-size: 0.75rem; letter-spacing: 1px; margin-left: 1rem;">[ ADMIN PANEL ]</div>
    </div>
  </footer>
`;

// ─── Select Package Flow ───────────────────────────────────────────────────

const SelectPackageView = () => {
  const ud = AppState.userData || {};
  const isReferred = !!ud.referrerId;
  const discount = AppState.commissionSettings.referralDiscount || 100;

  const packages = [
    { id: 'grow', name: 'Basic', badge: 'Best for Beginners', price: 1599, features: ['Social Media Basics', 'Profile Optimization', 'Basics of Affiliate'] }
  ];

  // Default to Basic
  if (!AppState.selectedPackage) {
    AppState.selectedPackage = packages[0];
  }

  const p = AppState.selectedPackage;
  const finalPrice = isReferred ? p.price - discount : p.price;

  return `
    <div class="select-package-page animate-fade" style="min-height: 100vh; background: #f8fafc; padding: 2rem; display: flex; align-items: center; justify-content: center;">
      <div class="onboarding-card" style="width: 100%; max-width: 900px; background: white; border-radius: 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08); overflow: hidden; display: grid; grid-template-columns: 1.2fr 1fr; border: 1px solid #e2e8f0;">
        
        <!-- Left Side: Selection -->
        <div style="padding: 3.5rem; border-right: 1px solid #f1f5f9;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 2rem;">
            <img src="/logo-new.png" alt="Skill Futures" style="height: 90px;">
          </div>
          
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; line-height: 1.2;">Select Your Journey 🚀</h1>
          <p style="color: #64748b; font-size: 1.05rem; line-height: 1.6; margin-bottom: 2.5rem;">Choose the package that fits your goals. You can always upgrade later as you grow.</p>
          
          <div class="form-field">
            <label class="form-label" style="font-weight: 700; color: #1e293b; margin-bottom: 0.75rem; display: block;">Choose Package</label>
            <div class="custom-select-wrapper" style="position: relative;">
              <select id="packageDropdown" class="auth-input" style="appearance: none; padding-right: 3rem; cursor: pointer; border-width: 2px; font-weight: 700; height: 60px; font-size: 1.1rem;">
                ${packages.map(pkg => `
                  <option value="${pkg.id}" ${AppState.selectedPackage.id === pkg.id ? 'selected' : ''}>
                    ${pkg.name} Package — ₹${isReferred ? pkg.price - discount : pkg.price}
                  </option>
                `).join('')}
              </select>
              <i class="fas fa-chevron-down" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #4338ca;"></i>
            </div>
          </div>

          <div style="margin-top: 3rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
              <div>
                <span style="color: #64748b; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Selected Plan</span>
                <h3 style="margin: 4px 0 0; font-size: 1.5rem; color: #1e293b; font-weight: 800;">${p.name} Package</h3>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 2.25rem; font-weight: 900; color: #4338ca;">₹${finalPrice}</div>
                ${isReferred ? `<div style="font-size: 0.85rem; color: #10b981; font-weight: 700;">Special Referral Discount Applied</div>` : ''}
              </div>
            </div>

            <button id="proceedToPaymentBtn" class="btn-auth" style="width: 100%; height: 65px; font-size: 1.15rem; box-shadow: 0 10px 25px rgba(67, 56, 202, 0.25);">
              Proceed to Payment <i class="fas fa-credit-card" style="margin-left: 10px;"></i>
            </button>
            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: #94a3b8;">
              <i class="fas fa-lock"></i> Secure 256-bit SSL Encrypted Payment
            </p>
          </div>
        </div>

        <!-- Right Side: Details -->
        <div style="background: #f8fafc; padding: 3.5rem; display: flex; flex-direction: column;">
          <div style="background: white; padding: 6px 16px; border-radius: 50px; display: inline-block; font-size: 0.75rem; font-weight: 800; color: #4338ca; border: 1px solid #e0e7ff; margin-bottom: 1.5rem; align-self: flex-start;">
            ${p.badge}
          </div>
          
          <h4 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 2rem;">What's included:</h4>
          
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1.25rem; flex-grow: 1;">
            ${p.features.map(f => `
              <li style="display: flex; align-items: center; gap: 14px; font-weight: 600; color: #475569; font-size: 1.05rem;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i class="fas fa-check" style="font-size: 0.7rem;"></i>
                </div>
                ${f}
              </li>
            `).join('')}
          </ul>

          <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
             <div style="display: flex; align-items: center; gap: 15px;">
                <div style="width: 50px; height: 50px; border-radius: 12px; background: white; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🔥</div>
                <div>
                   <p style="margin: 0; font-size: 0.85rem; color: #64748b; font-weight: 600;">Active Learners</p>
                   <p style="margin: 0; font-size: 1rem; color: #1e293b; font-weight: 800;">15,000+ Students</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

// ─── Core Orchestration ──────────────────────────────────────────────────────

let _renderTimer = null;
const render = () => {
  if (_renderTimer) clearTimeout(_renderTimer);
  _renderTimer = setTimeout(_renderNow, 50);
};

const _renderNow = () => {
  const app = document.querySelector('#app');
  
  // Standalone Admin Portal Layout
  if (AppState.view === 'admin-login') {
    app.innerHTML = AdminLoginView();
    attachEvents();
    return;
  }

  if (AppState.user) {
    const isAdminView = AppState.view.startsWith('admin-') && (AppState.isAdmin || AppState.developerMode);
    
    // Fallback if trying to access admin view without permission
    if (AppState.view.startsWith('admin-') && !AppState.isAdmin && !AppState.developerMode) {
      alert('⚠️ Access Denied: Admin role required.');
      AppState.view = 'dashboard';
      render();
      return;
    }

    // Determine current view content
    let content = '';
    switch(AppState.view) {
      case 'dashboard': content = DashboardView(); break;
      case 'trainings': content = TrainingsView(); break;
      case 'courses': content = CourseListView(); break;
      case 'affiliate-link': content = AffiliateLinkView(); break;
      case 'leaderboard': content = LeaderboardView(); break;
      case 'team': content = TeamView(); break;
      case 'wallet': content = WalletRequestView(); break;
      case 'profile': content = ProfileView(); break;
      case 'privacy-policy': content = PrivacyPolicyView(); break;
      case 'refund-policy': content = RefundPolicyView(); break;
      case 'disclaimer': content = DisclaimerView(); break;
      case 'terms': content = TermsView(); break;
      case 'upgrade': content = UpgradeView(); break;
      case 'select-package': content = SelectPackageView(); break;
      case 'admin-dashboard': content = AdminDashboardView(); break;
      case 'admin-users': content = AdminUsersView(); break;
      case 'admin-courses': content = AdminCoursesView(); break;
      case 'admin-payouts': content = AdminPayoutsView(); break;
      case 'admin-notices': content = AdminNoticesView(); break;
      case 'admin-settings': content = AdminSettingsView(); break;
      case 'admin-trainings': content = AdminTrainingsView(); break;
      case 'training': content = (() => {
          const course = AppState.courses.find(c => c.id === AppState.selectedCourseId) || AppState.courses[0] || {};
          const enrollment = AppState.userCourses.find(uc => uc.courseId === course.id) || {};
          const completed = enrollment.completedLessons || [];
          const lessons = course.lessons || [];
          
          // Default to first lesson if none active
          if (!AppState.activeLessonId && lessons.length > 0) {
            AppState.activeLessonId = lessons[0].title;
          }
          
          const currentLesson = lessons.find(l => l.title === AppState.activeLessonId) || lessons[0] || {};

          return `
            <section class="main-content animate-fade">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem;">
                <div>
                  <h1 style="margin: 0;">${course.title || 'Course Training'}</h1>
                  <p style="color: #64748b; margin-top: 0.5rem;">${currentLesson.title ? `Currently Watching: ${currentLesson.title}` : 'Master your skills'}</p>
                </div>
                <button onclick="AppState.view='courses'; render();" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                  <i class="fas fa-arrow-left"></i> Back to Courses
                </button>
              </div>

              <div class="metrics-grid training-player-grid" style="grid-template-columns: 2fr 1fr; gap: 2rem; align-items: start;">
                <div class="chart-container" style="padding: 0; overflow: hidden; background: #000; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid #1e293b;">
                  <div style="aspect-ratio: 16/9; width: 100%; position: relative; background: #000;">
                    ${(() => {
                      if (!currentLesson.videoUrl) return `
                        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; gap: 1rem;">
                          <i class="fas fa-play-circle" style="font-size: 5rem; color: #334155;"></i>
                          <p>Select a lesson to start watching</p>
                        </div>`;
                      
                      const embedUrl = getYoutubeEmbedUrl(currentLesson.videoUrl);
                      console.log("Playing video with embed URL:", embedUrl);

                      return `
                        <iframe 
                          src="${embedUrl}" 
                          title="${currentLesson.title || 'Video Player'}"
                          style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen
                          loading="lazy">
                        </iframe>`;
                    })()}
                  </div>
                  <div style="padding: 1.5rem; background: white; border-top: 1px solid #f1f5f9;">
                    <h2 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${currentLesson.title || 'Welcome'}</h2>
                    <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">${course.description || 'Welcome to this specialized training session. Follow along and take notes for the best results.'}</p>
                  </div>
                </div>

                <!-- lesson sidebar -->
                <div class="chart-container" style="padding: 1.5rem; border-radius: 20px; display: flex; flex-direction: column; overflow: hidden;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #f1f5f9;">
                    <h3 style="margin: 0; font-size: 1.1rem;">Course Content</h3>
                    <span style="font-size: 0.8rem; font-weight: 800; color: #16a34a; background: #f0fdf4; padding: 4px 10px; border-radius: 50px;">${enrollment.progress || 0}% Done</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 10px; max-height: 600px; overflow-y: auto; padding-right: 4px;">
                    ${lessons.length === 0 ? `
                      <div style="text-align: center; padding: 3rem; color: #94a3b8;">
                         <i class="fas fa-video-slash" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                         <p>No lessons uploaded yet.</p>
                      </div>
                    ` : lessons.map((l, i) => {
                      const isActive = AppState.activeLessonId === l.title;
                      const isDone = completed.includes(l.title);
                      return `
                        <div class="training-module ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" 
                             onclick="window.playLesson('${l.title}', '${course.id}')"
                             style="padding: 1rem; background: ${isActive ? 'var(--accent)' : 'white'}; border-radius: 12px; border: 1.5px solid ${isActive ? 'var(--accent)' : '#f1f5f9'}; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s; position: relative;">
                          <div style="width: 28px; height: 28px; border-radius: 8px; background: ${isActive ? 'white' : (isDone ? '#dcfce7' : '#f8fafc')}; display: flex; align-items: center; justify-content: center; color: ${isActive ? 'var(--accent)' : (isDone ? '#16a34a' : '#94a3b8')}; flex-shrink: 0; font-weight: 800; font-size: 0.8rem;">
                            ${isDone ? '<i class="fas fa-check"></i>' : i+1}
                          </div>
                          <div style="flex-grow: 1; min-width: 0;">
                            <div style="font-weight: 700; color: ${isActive ? 'white' : '#1e293b'}; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${l.title}</div>
                            <div style="font-size: 0.7rem; color: ${isActive ? 'rgba(255,255,255,0.8)' : '#94a3b8'};">Standard Lesson</div>
                          </div>
                          ${isActive ? '<div class="lesson-active-dot"></div>' : ''}
                        </div>`;
                    }).join('')}
                  </div>
                </div>
              </div>
            </section>`;
        })(); break;
      case 'webinars': content = `
          <section class="main-content animate-fade">
            <h1 style="margin-bottom: 2rem;">Live Webinars</h1>
            <div class="metrics-grid">
              <div class="chart-container" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: white; border: none;">
                <div style="font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Next Session</div>
                <h2>Strategic Scaling & Passive Income</h2>
                <p style="margin: 1rem 0; opacity: 0.9;">Join us this Sunday for an exclusive session with top earners.</p>
                <div style="display: flex; gap: 20px; font-weight: 700;"><div>24h : 12m : 44s</div></div>
                <button class="btn" style="background: white; color: #4338ca; margin-top: 2rem; width: 100%;">Set Reminder</button>
              </div>
              <div class="chart-container"><h3>Recent Recordings</h3></div>
            </div>
          </section>`; break;
      default:
        if (['reports', 'offers', 'earning-target'].includes(AppState.view)) {
          content = `
            <section class="main-content animate-fade-up">
              <h1>${AppState.view.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</h1>
              <div class="chart-container" style="text-align: center; padding: 5rem;">
                <i class="fas fa-tools" style="font-size: 4rem; color: #6366f1; margin-bottom: 2rem;"></i>
                <h2>Section Under Development</h2>
                <p style="color: #64748b;">We are working hard to bring this feature to your dashboard very soon!</p>
              </div>
            </section>`;
        } else {
          content = DashboardView();
        }
    }

    if (isAdminView) {
      app.innerHTML = `
        ${AdminModal ? AdminModal() : ''}
        ${AdminLayout(content)}
      `;
    } else if (AppState.view === 'select-package') {
      // Full screen onboarding without sidebar
      app.innerHTML = `
        ${WelcomeModal ? WelcomeModal() : ''}
        <div id="main-view" style="width: 100%; height: 100vh; overflow-y: auto; background: #f8fafc;">
          ${content}
        </div>
      `;
    } else {
      app.innerHTML = `
        ${WelcomeModal ? WelcomeModal() : ''}
        ${BasicPackageDetailModal()}
        <div class="dashboard-container ${!AppState.isSidebarVisible ? 'sidebar-hidden' : ''}">
          ${Sidebar()}
          <div id="main-view" style="flex-grow: 1; overflow-y: auto;">
            ${content}
            ${Footer()}
          </div>
        </div>
      `;
    }

    if (AppState.view === 'wallet' && !AppState.fetched.userPayouts && !AppState.loading.userPayouts) fetchUserPayouts();
    if (AppState.view === 'leaderboard' && AppState.leaderboardToday.length === 0 && !AppState.loading.leaderboard) fetchLeaderboard();
    if (AppState.view === 'team' && AppState.team.length === 0 && !AppState.loading.team) fetchTeam();
    if (AppState.view === 'courses' && AppState.courses.length === 0 && !AppState.loading.courses) {
      fetchCourses();
      fetchUserCourses();
    }
    if (AppState.view === 'admin-dashboard') {
      if (!AppState.fetched.adminUsers && !AppState.loading.adminUsers) fetchAdminUsers();
      if (!AppState.fetched.adminPayouts && !AppState.loading.adminPayouts) fetchAdminPayouts();
      if (!AppState.fetched.adminNotices && !AppState.loading.adminNotices) fetchAdminNotices();
    }
    if (AppState.view === 'admin-users' && !AppState.fetched.adminUsers && !AppState.loading.adminUsers) fetchAdminUsers();
    if (AppState.view === 'admin-payouts' && !AppState.fetched.adminPayouts && !AppState.loading.adminPayouts) fetchAdminPayouts();
    if (AppState.view === 'admin-notices' && !AppState.fetched.adminNotices && !AppState.loading.adminNotices) fetchAdminNotices();
    if (AppState.view === 'admin-settings' && !AppState.fetched.adminSettings && !AppState.loading.adminSettings) fetchAdminSettings();
  } else {
    app.innerHTML = `
      <header style="padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--card-border);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="/logo.png" alt="Logo" style="height: 70px;"/>
        </div>
        <nav>${AppState.view === 'home' ? `<button class="btn btn-primary" data-route="signup">Join Now</button><button class="btn btn-outline" data-route="login" style="margin-left:1rem;">Login</button>` : ''}</nav>
      </header>
      <main>${
        AppState.view === 'home' ? HomeView() : 
        AppState.view === 'privacy-policy' ? PrivacyPolicyView() : 
        AppState.view === 'refund-policy' ? RefundPolicyView() :
        AppState.view === 'disclaimer' ? DisclaimerView() :
        AppState.view === 'terms' ? TermsView() :
        AppState.view === 'login' ? AuthView('login') : SignupView()
      }</main>
      ${Footer()}
    `;
  }
  attachEvents();
};

const attachEvents = () => {
  document.querySelectorAll('[data-route]').forEach(el => {
    el.onclick = () => { 
      let route = el.dataset.route;
      if (route === 'admin-login' && AppState.user) {
        if (AppState.isAdmin || AppState.developerMode) route = 'admin-dashboard';
        else {
          alert('You are currently signed in as a regular user. Please sign out first to access the Admin Portal.');
          return;
        }
      }
      AppState.view = route; 
      if (window.innerWidth <= 768) {
        AppState.isSidebarVisible = false;
      }
      render(); 
    };
  });

  const overlay = document.querySelector('#mobileOverlay') || document.querySelector('#adminMobileOverlay');
  if (overlay) {
    overlay.onclick = () => {
      AppState.isSidebarVisible = false;
      render();
    };
  }

  const logoutBtn = document.querySelector('#logoutBtn');
  if (logoutBtn) logoutBtn.onclick = () => signOut(auth);

  const sidebarToggle = document.querySelector('#sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.onclick = () => {
      AppState.isSidebarVisible = !AppState.isSidebarVisible;
      render();
    };
  }

  const sidebarToggleClose = document.querySelector('#sidebarToggleClose');
  if (sidebarToggleClose) {
    sidebarToggleClose.onclick = () => {
      AppState.isSidebarVisible = false;
      render();
    };
  }

  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.querySelector('#loginEmail').value;
      const pass = document.querySelector('#loginPassword').value;
      try { 
        await signInWithEmailAndPassword(auth, email, pass); 
      } catch (e) { 
        alert(e.message); 
      }
    };
  }

  const adminLoginForm = document.querySelector('#adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.querySelector('#adminLoginEmail').value;
      const pass = document.querySelector('#adminLoginPassword').value;
      
      // Hardcoded Admin Bypass check
      if (email === 'shubham67257@gmail.com' && pass === 'Shubham@18552025') {
        console.log("Master Admin Authenticated");
        AppState.isAdmin = true;
        AppState.view = 'admin-dashboard';
        render();
        return;
      }

      try { 
        await signInWithEmailAndPassword(auth, email, pass); 
      } catch (err) { 
        alert(err.message); 
      }
    };
  }

  document.querySelectorAll('.btn-google').forEach(btn => {
    btn.onclick = signInWithGoogle;
  });

  // Package Selection Events
  const pkgDropdown = document.querySelector('#packageDropdown');
  if (pkgDropdown) {
    pkgDropdown.onchange = (e) => {
      const packages = [
        { id: 'grow', name: 'Basic', badge: 'Best for Beginners', price: 1599, features: ['Social Media Basics', 'Profile Optimization', 'Basics of Affiliate'] },
        { id: 'advance', name: 'Advance', badge: 'Financial Mastery', price: 2399, features: ['Advanced Sales Funnels', 'Meta Ads Mastery', 'Personal Branding', '1-on-1 Mentorship'], best: true },
        { id: 'creator', name: 'Creator', badge: 'Creator Skills', price: 4310, features: ['Video Editing', 'Content Strategy', 'Canva Design Mastery'] },
        { id: 'global', name: 'Global', badge: 'High-Income Skills', price: 7260, features: ['Global Market Insights', 'E-commerce Automation', 'Advanced Networking'] },
        { id: 'premium', name: 'Premium', badge: 'Elite Pro', price: 9999, features: ['Master Franchise Rights', 'VIP Support', 'Lifetime Course Access'] }
      ];
      AppState.selectedPackage = packages.find(p => p.id === e.target.value);
      render();
    };
  }

  const proceedBtn = document.querySelector('#proceedToPaymentBtn');
  if (proceedBtn) {
    proceedBtn.onclick = () => {
      const p = AppState.selectedPackage;
      alert(`🚀 Redirecting to Payment Gateway for ${p.name} Package...\nTotal Amount: ₹${AppState.userData.referrerId ? p.price - (AppState.commissionSettings.referralDiscount || 100) : p.price}`);
    };
  }

  const signupForm = document.querySelector('#signupForm');
  if (signupForm) {
    signupForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.querySelector('#signupEmail').value;
      const pass = document.querySelector('#signupPassword').value;
      const name = document.querySelector('#signupName').value;
      const refCode = document.querySelector('#signupReferral').value;
      
      try {
        let referrerUid = null;
        if (refCode) {
          const q = query(collection(db, 'users'), where('referralCode', '==', refCode.trim().toUpperCase()), limit(1));
          const snap = await getDocs(q);
          if (!snap.empty) {
            referrerUid = snap.docs[0].id;
          }
        }

        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const initialData = {
          name, 
          email, 
          todayEarnings: 0, 
          weeklyEarnings: 0, 
          monthlyEarnings: 0,
          allTimeEarnings: 0, 
          passiveEarnings: 0, 
          industryEarnings: 0, 
          paidEarnings: 0,
          role: 'user',
          referralCode: `FF-${cred.user.uid.substring(0, 5).toUpperCase()}`,
          referrerId: referrerUid,
          joinedAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', cred.user.uid), initialData);

        // Award Commission if referrer exists
        if (referrerUid) {
          await awardReferralCommissions(referrerUid);
          sessionStorage.removeItem('referralCode');
        }
      } catch (e) { 
        console.error(e);
        alert(e.message);
      }
    };
  }

  const payoutForm = document.querySelector('#payoutForm');
  if (payoutForm) {
    payoutForm.onsubmit = (e) => {
      e.preventDefault();
      requestPayout(Number(document.querySelector('#payoutAmount').value), document.querySelector('#payoutUpi').value);
    };
  }

  window.enrollInCourse = enrollInCourse;
  window.updateProgress = updateProgress;

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = () => copyToClipboard(btn.dataset.text);
  });
  
  const toSignUp = document.querySelector('#toSignUp');
  if (toSignUp) toSignUp.onclick = () => { AppState.view = 'signup'; render(); };
  const toSignIn = document.querySelector('#toSignIn');
  if (toSignIn) toSignIn.onclick = () => { AppState.view = 'login'; render(); };

  // Profile Tab Switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      AppState.profileTab = btn.dataset.tab;
      render();
    };
  });

  // Save Profile Logic
  const profileForm = document.querySelector('#profileDetailsForm');
  if (profileForm) {
    profileForm.onsubmit = async (e) => {
      e.preventDefault();
      const newName = document.querySelector('#editName').value;
      const newPhone = document.querySelector('#editPhone').value;
      
      try {
        await updateDoc(doc(db, 'users', AppState.user.uid), {
          name: newName,
          phone: newPhone
        });
        AppState.userData.name = newName;
        AppState.userData.phone = newPhone;
        alert('Profile updated successfully! ✅');
        render();
      } catch (err) {
        alert('Error updating profile: ' + err.message);
      }
    };
  }

  // Welcome Modal Logic
  const welcomeOverlay = document.querySelector('#welcomeModalOverlay');
  if (welcomeOverlay) {
    const closeBtn = document.querySelector('#closeWelcomeModal');
    const checkbox = document.querySelector('#doNotShowCheckbox');
    
    const closeModal = () => {
      if (checkbox && checkbox.checked) {
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
        localStorage.setItem('hideWelcomeModalUntil', expiry);
      }
      AppState.showWelcomeModal = false;
      render();
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    welcomeOverlay.onclick = (e) => {
      if (e.target === welcomeOverlay) closeModal();
    };
  }



  
  // window helpers moved to top level
  
  // window helpers moved to top level
  
  // window helpers moved to top level

  // --- Admin Form Handlers ---
  const adminCourseForm = document.querySelector('#adminCourseForm');
  if (adminCourseForm) {
    adminCourseForm.onsubmit = (e) => {
      e.preventDefault();
      const lessons = Array.from(document.querySelectorAll('.lesson-row')).map(row => ({
        title: row.querySelector('.lesson-title-input').value.trim(),
        videoUrl: row.querySelector('.lesson-url-input').value.trim()
      })).filter(l => l.title || l.videoUrl);

      saveCourse({
        id: document.querySelector('#courseId')?.value,
        title: document.querySelector('#courseTitle').value,
        img: document.querySelector('#courseImg').value,
        category: document.querySelector('#courseCategory').value,
        price: Number(document.querySelector('#coursePrice').value) || 599,
        totalLessons: lessons.length,
        lessons: lessons
      });
    };
  }

  const adminUserEditForm = document.querySelector('#adminUserEditForm');
  if (adminUserEditForm) {
    adminUserEditForm.onsubmit = (e) => {
      e.preventDefault();
      const userId = AppState.adminModal?.data?.id;
      if (!userId) return;
      saveUser(userId, {
        name: document.querySelector('#editUserName').value,
        role: document.querySelector('#editUserRole').value,
        allTimeEarnings: Number(document.querySelector('#editUserEarnings').value),
        paidEarnings: Number(document.querySelector('#editUserPaid').value)
      });
    };
  }

  const adminNoticeForm = document.querySelector('#adminNoticeForm');
  if (adminNoticeForm) {
    adminNoticeForm.onsubmit = (e) => {
      e.preventDefault();
      saveNotice({
        title: document.querySelector('#noticeTitle').value,
        message: document.querySelector('#noticeMessage').value
      });
      AppState.adminModal = null;
      render();
    };
  }

  const adminTrainingForm = document.querySelector('#adminTrainingForm');
  if (adminTrainingForm) {
    adminTrainingForm.onsubmit = (e) => {
      e.preventDefault();
      saveTraining({
        id: document.querySelector('#trainingId').value,
        title: document.querySelector('#trainingTitle').value,
        videoUrl: document.querySelector('#trainingUrl').value,
        thumb: document.querySelector('#trainingThumb').value || '/course-default.png'
      });
    };
  }

  const adminSettingsForm = document.querySelector('#adminSettingsForm');
  if (adminSettingsForm) {
    adminSettingsForm.onsubmit = (e) => {
      e.preventDefault();
      saveAdminSettings({
        direct: Number(document.querySelector('#directComm').value),
        passive: Number(document.querySelector('#passiveComm').value),
        referralDiscount: Number(document.querySelector('#referralDiscount').value)
      });
    };
  }
};

// ─── Global Event Bindings ───────────────────────────────────────────────────

window.showCourseModal = (courseId) => {
  let data;
  if (courseId) {
    data = AppState.courses.find(c => c.id === courseId);
  } else {
    data = { 
      lessons: [], 
      img: '/course-default.png',
      category: 'Premium',
      price: 599
    };
  }
  if (!data && courseId) data = { title: 'Unknown Course', id: courseId, lessons: [] };
  if (data && !data.lessons) data.lessons = [];
  AppState.adminModal = { type: 'course', data };
  render();
};

window.deleteCourse = deleteCourse;
window.saveCourse = saveCourse;
window.enrollInCourse = enrollInCourse;
window.updateProgress = updateProgress;
window.updatePayoutStatus = updatePayoutStatus;
window.deleteNotice = deleteNotice;

window.showUserEditModal = (userId) => {
  const data = AppState.allUsers.find(u => u.id === userId);
  AppState.adminModal = { type: 'user-edit', data };
  render();
};

window.showNoticeModal = () => {
  AppState.adminModal = { type: 'notice', data: null };
  render();
};

window.addAdminLesson = () => {
  if (AppState.adminModal && AppState.adminModal.type === 'course') {
    AppState.adminModal.data.lessons.push({ title: '', videoUrl: '' });
    render();
  }
};

window.removeAdminLesson = (index) => {
  if (AppState.adminModal && AppState.adminModal.type === 'course') {
    AppState.adminModal.data.lessons.splice(index, 1);
    render();
  }
};

window.playLesson = (lessonTitle, courseId) => {
  AppState.activeLessonId = lessonTitle;
  render();
  window.updateProgress(courseId, lessonTitle);
};

window.showTrainingModal = (trainingId) => {
  let data;
  if (trainingId) {
    data = AppState.trainings.find(t => t.id === trainingId);
  } else {
    data = { title: '', videoUrl: '', thumb: '/course-default.png' };
  }
  AppState.adminModal = { type: 'training', data };
  render();
};

window.deleteTraining = deleteTraining;
window.saveTraining = saveTraining;

window.filterAdminUsers = (query) => {
  const q = query.toLowerCase();
  document.querySelectorAll('tbody tr').forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
};

onAuthStateChanged(auth, (user) => {
  AppState.user = user;
  fetchCourses(); // ENSURE GLOBAL SYNC
  fetchTrainings(); // ENSURE GLOBAL SYNC
  if (user) {
    // Just fetch data. The fetchUserData onSnapshot will handle view redirection.
    fetchUserData(user.uid);
  } else {
    // Cleanup and return to Home for guests
    AppState.userData = null;
    AppState.isAdmin = false;
    if (!['login', 'signup'].includes(AppState.view)) {
      AppState.view = 'home';
    }
  }
  render();
});

  window.seedAllCourses = async () => {
    if (!confirm(`Are you sure you want to seed ${seedData.length} courses from the library? Existing titles will be skipped.`)) return;
    
    let count = 0;
    try {
      for (const course of seedData) {
        const docId = course.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const exists = AppState.courses.find(c => c.title === course.title);
        
        if (!exists) {
          await setDoc(doc(db, 'courses', docId), {
            ...course,
            price: course.price || 599,
            category: course.category || "Premium",
            lessons: course.lessons || [],
            totalLessons: course.lessons ? course.lessons.length : (course.totalLessons || 0),
            createdAt: new Date()
          });
          count++;
        }
      }
      alert(`Successfully seeded ${count} new courses! 🎉`);
      render();
    } catch (e) {
      alert('Seeding error: ' + e.message);
    }
  };
