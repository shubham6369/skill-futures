import { auth, db, 
  collection, query, where, orderBy, limit, getDocs, addDoc, doc, getDoc, setDoc, updateDoc, increment, deleteDoc 
} from './firebase.js';
import { 
  onAuthStateChanged, 
  signOut, 
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

// ─── App State ───────────────────────────────────────────────────────────────

const AppState = {
  view: 'home',
  user: null,
  userData: null,
  isAdmin: false,
  leaderboard: [],
  team: [],
  courses: [],
  userCourses: [],
  allUsers: [],
  allPayouts: [],
  allNotices: [],
  selectedCourseId: null,
  showWelcomeModal: false,
  profileTab: 'details',
  isSidebarVisible: true,
  developerMode: true,
  loading: {
    leaderboard: false,
    team: false,
    courses: false,
    adminUsers: false,
    adminPayouts: false,
    adminSettings: false,
    adminNotices: false
  },
  fetched: {
    adminUsers: false,
    adminPayouts: false,
    adminSettings: false,
    adminNotices: false
  },
  commissionSettings: {
    direct: 400,
    passive: 100
  },
  trainings: [
    { 
      id: 'tr-1', 
      title: 'Affiliate Marketing Masterclass | Complete Success Roadmap', 
      desc: 'Learn the secrets of high-ticket affiliate marketing.', 
      thumb: 'training_thumbnail_1_1774767017754.png' 
    },
    { 
      id: 'tr-2', 
      title: 'Lead Generation Formula | 100+ Leads Daily Strategy', 
      desc: 'How to automate your lead generation process.', 
      thumb: 'training_thumbnail_2_1774767039736.png' 
    },
    { 
      id: 'tr-3', 
      title: 'MLM Leadership Blueprint | Build a Massive Team', 
      desc: 'The psychology of building long-term teams.', 
      thumb: 'training_thumbnail_3_1774767068804.png' 
    },
    { 
      id: 'tr-4', 
      title: 'Sales Closing Secrets | Handle Every Objection', 
      desc: 'Close deals with confidence and authority.', 
      thumb: 'training_thumbnail_1_1774767017754.png' 
    },
    { 
      id: 'tr-5', 
      title: 'Personal Branding | Become an Industry Authority', 
      desc: 'Build a brand that attracts premium clients.', 
      thumb: 'training_thumbnail_2_1774767039736.png' 
    },
    { 
      id: 'tr-6', 
      title: 'Instagram Growth Hack | 10k Followers in 30 Days', 
      desc: 'Algorithm secrets to go viral consistently.', 
      thumb: 'training_thumbnail_3_1774767068804.png' 
    }
  ]
};

// ─── Data Actions ────────────────────────────────────────────────────────────

const fetchUserData = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    AppState.userData = userDoc.data();
    AppState.isAdmin = AppState.userData.role === 'admin';
    render();
  } else {
    // Create initial user doc if missing
    const initialData = {
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
      joinedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', uid), initialData);
    AppState.userData = initialData;
    AppState.isAdmin = false;
    render();
  }
};

const fetchLeaderboard = async () => {
  if (AppState.loading.leaderboard) return;
  AppState.loading.leaderboard = true;
  const q = query(collection(db, 'users'), orderBy('allTimeEarnings', 'desc'), limit(10));
  const querySnapshot = await getDocs(q);
  AppState.leaderboard = querySnapshot.docs.map(doc => doc.data());
  AppState.loading.leaderboard = false;
  render();
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

const fetchCourses = async () => {
  if (AppState.loading.courses) return;
  AppState.loading.courses = true;
  const querySnapshot = await getDocs(collection(db, 'courses'));
  const dbCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Merge with dummy data or just use DB data
  AppState.courses = dbCourses.length > 0 ? dbCourses : AppState.courses;
  AppState.loading.courses = false;
  render();
};

const fetchUserCourses = async () => {
  const q = query(collection(db, 'userCourses'), where('userId', '==', AppState.user.uid));
  const querySnapshot = await getDocs(q);
  AppState.userCourses = querySnapshot.docs.map(doc => doc.data());
  render();
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

const requestPayout = async (amount, upi) => {
  const available = (AppState.userData.allTimeEarnings - AppState.userData.paidEarnings);
  if (amount > available) return alert("Insufficient balance!");
  
  await addDoc(collection(db, 'payoutRequests'), {
    userId: AppState.user.uid,
    userName: AppState.userData.name,
    amount: amount,
    upi: upi,
    status: 'pending',
    createdAt: new Date().toISOString()
  });
  
  alert("Payout request submitted successfully!");
  AppState.view = 'dashboard';
  render();
};

// ─── Admin Actions ───────────────────────────────────────────────────────────

const fetchAdminUsers = async () => {
  if (!AppState.isAdmin || AppState.loading.adminUsers) return;
  AppState.loading.adminUsers = true;
  try {
    const q = query(collection(db, 'users'), orderBy('joinedAt', 'desc'));
    const snap = await getDocs(q);
    AppState.allUsers = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    AppState.fetched.adminUsers = true;
  } catch (err) {
    console.error("Error fetching users:", err);
  }
  AppState.loading.adminUsers = false;
  render();
};

const fetchAdminSettings = async () => {
  if (!AppState.isAdmin || AppState.loading.adminSettings) return;
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
  if (!AppState.isAdmin || AppState.loading.adminPayouts) return;
  AppState.loading.adminPayouts = true;
  try {
    const q = query(collection(db, 'payoutRequests'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    AppState.allPayouts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    AppState.fetched.adminPayouts = true;
  } catch (err) {
    console.error("Error fetching payouts:", err);
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
    if (courseData.id) {
      const { id, ...data } = courseData;
      await updateDoc(doc(db, 'courses', id), data);
    } else {
      await addDoc(collection(db, 'courses'), courseData);
    }
    alert("Course saved successfully!");
    await fetchCourses();
    AppState.adminModal = null;
    render();
  } catch (err) {
    alert("Error saving course: " + err.message);
  }
};

const fetchAdminNotices = async () => {
  if (!AppState.isAdmin || AppState.loading.adminNotices) return;
  AppState.loading.adminNotices = true;
  try {
    const snap = await getDocs(collection(db, 'notices'));
    AppState.allNotices = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    AppState.fetched.adminNotices = true;
  } catch (err) {
    console.error("Error fetching notices:", err);
  }
  AppState.loading.adminNotices = false;
  render();
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
                <label>Cover Image URL</label>
                <input type="url" id="courseImg" class="form-input-styled" value="${data?.img || ''}" required placeholder="https://images.unsplash.com/...">
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Total Lessons</label>
                <input type="number" id="courseLessons" class="form-input-styled" value="${data?.totalLessons || 12}" required>
              </div>

              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; border-radius: 12px;">
                  <i class="fas fa-save"></i> COMMITTING CHANGES
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

  return '';
};

const ProfileView = () => {
  const ud = AppState.userData || {};
  const walletBalance = ud.allTimeEarnings - ud.paidEarnings || 0;
  
  return `
    <section class="main-content animate-fade">
      <h1 style="margin-bottom: 2rem;">My Profile</h1>
      
      <div class="profile-section-container">
        <!-- Left Card -->
        <div class="profile-card card-left">
          <div class="profile-overview-header">
            <img src="${ud.profilePic || 'https://via.placeholder.com/150'}" class="profile-image-large" alt="Profile">
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
      <button class="btn btn-auth" style="width: auto; padding: 0.8rem 1.5rem;" onclick="window.showCourseModal()">
        <i class="fas fa-plus"></i> Add New Course
      </button>
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
          <img src="${course.img || 'https://via.placeholder.com/300x200?text=SkillFutures'}" class="course-img-v2" alt="${course.title}"/>
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

const AdminSidebar = () => `
  <div class="mobile-overlay ${AppState.isSidebarVisible ? 'active' : ''}" id="adminMobileOverlay"></div>
  <aside class="sidebar ${!AppState.isSidebarVisible ? 'collapsed' : ''} ${AppState.isSidebarVisible ? 'mobile-active' : ''}" style="background: #0f172a; border-right: 1px solid #1e293b;">
    <div class="sidebar-logo" style="border-bottom: 1px solid #1e293b;">
      <div class="logo-content" style="${!AppState.isSidebarVisible ? 'display: none;' : ''}">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="/logo.png" alt="Logo" style="height: 32px; flex-shrink: 0; filter: brightness(0) invert(1);"/>
          <div style="font-size: 1.3rem; font-weight: 800; color: #6366f1; letter-spacing: -0.5px; white-space: nowrap;">SkillAdmin</div>
        </div>
        <div style="font-size: 0.6rem; color: #94a3b8; font-weight: 600; padding-left: 40px; margin-top: -4px;">"Platform Control Center"</div>
      </div>
      <button id="sidebarToggle" class="sidebar-toggle-btn" style="color: #94a3b8; border-color: #1e293b;">
        <i class="fas fa-bars"></i>
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
  <aside class="sidebar ${!AppState.isSidebarVisible ? 'collapsed' : ''} ${AppState.isSidebarVisible ? 'mobile-active' : ''}">
    <div class="sidebar-logo">
      <div class="logo-content" style="${!AppState.isSidebarVisible ? 'display: none;' : ''}">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="/logo.png" alt="Logo" style="height: 32px; flex-shrink: 0;"/>
          <div style="font-size: 1.3rem; font-weight: 800; color: #4338ca; letter-spacing: -0.5px; white-space: nowrap;">SkillFutures</div>
        </div>
        <div style="font-size: 0.6rem; color: #64748b; font-weight: 600; padding-left: 40px; margin-top: -4px;">"Crafting Careers, Creating Incomes."</div>
      </div>
      <button id="sidebarToggle" class="sidebar-toggle-btn">
        <i class="fas fa-bars"></i>
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
        <i class="fas fa-link"></i> Affiliate Link
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
      <button id="logoutBtn" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: #fee2e2; color: #ef4444; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
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

const LeaderboardView = () => `
  <section class="main-content animate-fade-up">
    <h1 style="margin-bottom: 3rem;">Leaderboard</h1>
    <div class="chart-container" style="background: white; border: 1px solid #f1f5f9;">
      <table style="width: 100%; border-collapse: collapse; color: #0f172a;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <th style="padding: 1.2rem;">Rank</th>
            <th style="padding: 1.2rem;">User</th>
            <th style="padding: 1.2rem;">Total Earnings</th>
          </tr>
        </thead>
        <tbody>
          ${AppState.leaderboard.map((user, i) => `
            <tr style="border-bottom: 1px solid #f8fafc; transition: background 0.2s;" class="animate-fade stagger-${(i % 6) + 1}">
              <td style="padding: 1.2rem; font-weight: 800; color: ${i < 3 ? '#fbbf24' : '#64748b'};">#${i + 1}</td>
              <td style="padding: 1.2rem; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 35px; height: 35px; background: #e2e8f0; border-radius: 50%;"></div>
                <span style="font-weight: 600;">${user.name}</span>
              </td>
              <td style="padding: 1.2rem; color: #16a34a; font-weight: 700;">₹ ${user.allTimeEarnings}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
`;

const TrainingsView = () => `
  <section class="main-content animate-fade">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3rem;">
      <h1>Trainings 🎓</h1>
      <p style="color: #64748b; font-weight: 500;">Access exclusive sessions & webinars</p>
    </div>

    <div class="training-grid">
      ${AppState.trainings.map((t, i) => `
        <div class="training-card animate-fade-up stagger-${(i % 6) + 1}">
          <div class="training-thumb-container">
            <img src="${t.thumb}" alt="${t.title}" class="training-thumb" loading="lazy">
            <div class="play-overlay">
              <div class="play-icon">
                <i class="fas fa-play"></i>
              </div>
            </div>
          </div>
          <div class="training-info">
            <h3 class="training-title">${t.title}</h3>
            <div class="training-desc">
              <span>Exclusive Session</span>
              <span>•</span>
              <span>HD Mastery</span>
            </div>
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
  const balance = (m.allTimeEarnings || 0) - (m.paidEarnings || 0);
  return `
    <section class="main-content">
      <h1 style="margin-bottom: 3rem;">Wallet Request</h1>
      <div class="metrics-grid" style="grid-template-columns: 1fr;">
        <div class="metric-card card-industry" style="height: 150px;">
          <div class="metric-info">
            <h3>₹ ${balance} /-</h3>
            <span>Available for Withdrawal</span>
          </div>
          <div class="metric-icon">💰</div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Submit Payout Request</h3>
        <form id="payoutForm" style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dim);">Withdrawal Amount (₹)</label>
            <input type="number" id="payoutAmount" value="${balance}" max="${balance}" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--card-border); background: rgba(0,0,0,0.3); color: white;"/>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dim);">UPI ID / Bank Details</label>
            <textarea id="payoutUpi" required placeholder="example@upi or Bank: Name, A/C, IFSC" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--card-border); background: rgba(0,0,0,0.3); color: white; height: 100px;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit Request</button>
        </form>
      </div>
    </section>
  `;
};

const AffiliateLinkView = () => {
  const m = AppState.userData || {};
  const refCode = m.referralCode || 'FF-GUEST';
  const baseUrl = window.location.origin;
  
  return `
    <section class="main-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
        <h1>Refer & Earn</h1>
        <div style="background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 10px 20px; border-radius: 50px; border: 1px solid rgba(74, 222, 128, 0.2); font-weight: 600;">
          Active Affiliate Account
        </div>
      </div>

      <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 3rem;">
        <div class="metric-card card-today">
          <div class="metric-info">
            <h3>₹ 400 /-</h3>
            <span>Direct Commission</span>
          </div>
        </div>
        <div class="metric-card card-passive">
          <div class="metric-info">
            <h3>₹ 100 /-</h3>
            <span>Passive Commission</span>
          </div>
        </div>
      </div>

      <div class="chart-container" style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1.5rem;">Your Unique Referral Hub</h3>
        <p style="color: var(--text-dim); margin-bottom: 2rem;">Share your code with friends and earn on every successful referral.</p>
        
        <label style="color: var(--text-dim); display: block; margin-bottom: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Unique Referral Code</label>
        <div style="display: flex; gap: 1rem; margin-bottom: 2.5rem; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 12px; border: 1px dashed var(--accent);">
          <input type="text" value="${refCode}" readonly style="flex-grow: 1; background: transparent; border: none; color: white; padding: 12px; font-size: 1.2rem; font-weight: 700; letter-spacing: 2px;"/>
          <button class="btn btn-primary copy-btn" data-text="${refCode}" style="padding: 0 30px;">Copy Code</button>
        </div>

        <label style="color: var(--text-dim); display: block; margin-bottom: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Direct Signup Link</label>
        <div style="display: flex; gap: 1rem; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 12px; border: 1px solid var(--card-border);">
          <input type="text" value="${baseUrl}/?ref=${refCode}" readonly style="flex-grow: 1; background: transparent; border: none; color: white; padding: 12px; font-size: 0.9rem;"/>
          <button class="btn btn-outline copy-btn" data-text="${baseUrl}/?ref=${refCode}" style="border-radius: 8px;">Copy Link</button>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%); padding: 2rem; border-radius: 20px; border: 1px solid rgba(147, 51, 234, 0.2);">
        <h4 style="color: var(--accent); margin-bottom: 1rem;">How it works?</h4>
        <ul style="color: var(--text-dim); line-height: 1.8; font-size: 0.95rem;">
          <li>1. Copy your unique referral link or code.</li>
          <li>2. Share it with your audience or friends.</li>
          <li>3. When they sign up, you get <strong>₹400</strong> instantly.</li>
          <li>4. When your team makes a sale, you get <strong>₹100</strong> passive income!</li>
        </ul>
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

const HomeView = () => `
  <div class="hero">
    <img src="/logo.png" alt="SkillFutures Logo" style="height: 80px; margin-bottom: 2rem;">
    <h1>SkillFutures</h1>
    <h2>Empower Your Digital Journey</h2>
    <p style="font-size: 1.2rem; color: var(--text-dim); max-width: 600px; margin: 0 auto 2rem;">
      The ultimate platform to master digital skills and build a sustainable affiliate income.
    </p>
    <button class="btn btn-primary" data-route="signup">Start Your Journey</button>
  </div>
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
            <input type="text" id="signupReferral" class="auth-input" placeholder="Referral Code">
          </div>
        ` : ''}
        
        <button type="submit" class="btn-auth">
          ${type === 'login' ? 'Sign In' : 'Sign Up'} <i class="fas fa-arrow-right"></i>
        </button>
      </form>
      
      <div class="auth-footer">
        ${type === 'login' ? `Don't have an account? <span id="toSignUp" style="color: #5e5ce6; font-weight: 700; cursor: pointer;">Sign Up</span>` : `Already have an account? <span id="toSignIn" style="color: #5e5ce6; font-weight: 700; cursor: pointer;">Login</span>`}
      </div>
    </div>
  </div>
`;

const Footer = () => `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col" style="flex: 1.5;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
          <img src="/logo.png" alt="Logo" style="height: 40px;"/>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent);">SkillFutures</div>
        </div>
        <div style="font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">"Empower Your Digital Journey"</div>
        <p class="footer-description">
          SkillFutures is an E-learning platform. this platform helps people to make own personal brand on social media and create passive income.
        </p>
        <div class="footer-socials">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      
      <div class="footer-col">
        <h3>Course/Packages</h3>
        <ul class="footer-links">
          <li><a>Grow package</a></li>
          <li><a>Creator package</a></li>
          <li><a>Finance Package</a></li>
          <li><a>Prime Package</a></li>
          <li><a>Premium Package</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h3>Quick Links</h3>
        <ul class="footer-links">
          <li><a>Contact Us</a></li>
          <li><a>Disclaimer</a></li>
          <li><a data-route="privacy-policy" style="cursor: pointer;">Privacy Policy</a></li>
          <li><a>Refund Policy</a></li>
          <li><a>Terms & Conditions</a></li>
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
        <div class="footer-contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>Village karanpur barki madayye sarkara khas District Moradabad (244001) (Uttar pradesh) Near by KGN hospital 🏥</span>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div>Copyright © 2026 SkillFutures. All rights reserved.</div>
      <div data-route="admin-dashboard" style="color: #ef4444; font-weight: 800; cursor: pointer; font-size: 0.75rem; letter-spacing: 1px; margin-left: 1rem;">[ ADMIN PANEL ]</div>
    </div>
  </footer>
`;

// ─── Core Orchestration ──────────────────────────────────────────────────────

const render = () => {
  const app = document.querySelector('#app');
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
      case 'admin-dashboard': content = AdminDashboardView(); break;
      case 'admin-users': content = AdminUsersView(); break;
      case 'admin-courses': content = AdminCoursesView(); break;
      case 'admin-payouts': content = AdminPayoutsView(); break;
      case 'admin-notices': content = AdminNoticesView(); break;
      case 'admin-settings': content = AdminSettingsView(); break;
      case 'training': content = (() => {
          const course = AppState.courses.find(c => c.id === AppState.selectedCourseId) || AppState.courses[0] || {};
          const enrollment = AppState.userCourses.find(uc => uc.courseId === course.id) || {};
          const completed = enrollment.completedLessons || [];
          return `
            <section class="main-content animate-fade">
              <h1 style="margin-bottom: 0.5rem;">${course.title || 'Course Training'}</h1>
              <p style="color: #64748b; margin-bottom: 2rem;">Master your skills with ${course.title}</p>
              <div class="metrics-grid training-player-grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
                <div class="chart-container" style="padding: 0; overflow: hidden; background: black; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
                  <div style="aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; background: #1e1b4b;">
                    <i class="fas fa-play-circle" style="font-size: 5rem; color: #4338ca; cursor: pointer;"></i>
                  </div>
                </div>
                <div class="chart-container" style="overflow-y: auto; max-height: 500px; display: flex; flex-direction: column;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0;">Course Modules</h3>
                    <span style="font-size: 0.8rem; font-weight: 700; color: #16a34a;">${enrollment.progress || 0}% Complete</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${Array.from({ length: course.totalLessons || 5 }).map((_, i) => {
                      const lessonId = `L${i+1}`;
                      const isDone = completed.includes(lessonId);
                      return `
                        <div class="training-module ${isDone ? 'completed' : ''}" 
                             onclick="window.updateProgress('${course.id}', '${lessonId}')"
                             style="padding: 1.2rem; background: ${isDone ? '#f0fdf4' : 'white'}; border-radius: 12px; border: 1px solid ${isDone ? '#bcf0da' : '#f1f5f9'}; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s;">
                          <div style="width: 24px; height: 24px; border-radius: 50%; background: ${isDone ? '#22c55e' : '#f1f5f9'}; display: flex; align-items: center; justify-content: center; color: ${isDone ? 'white' : '#94a3b8'};">
                            ${isDone ? '<i class="fas fa-check" style="font-size: 0.7rem;"></i>' : i+1}
                          </div>
                          <span style="font-weight: 600; color: ${isDone ? '#166534' : '#1e293b'}; flex-grow: 1;">Lesson ${i+1}: Module Title</span>
                          ${!isDone ? '<i class="fas fa-play" style="font-size: 0.8rem; color: #4338ca;"></i>' : ''}
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
        if (['upgrade', 'reports', 'offers', 'earning-target', 'create-account'].includes(AppState.view)) {
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
    } else {
      app.innerHTML = `
        ${WelcomeModal ? WelcomeModal() : ''}
        <div class="dashboard-container ${!AppState.isSidebarVisible ? 'sidebar-hidden' : ''}">
          ${Sidebar()}
          <div id="main-view" style="flex-grow: 1; overflow-y: auto;">
            ${content}
            ${Footer()}
          </div>
        </div>
      `;
    }

    if (AppState.view === 'leaderboard' && AppState.leaderboard.length === 0 && !AppState.loading.leaderboard) fetchLeaderboard();
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
          <img src="/logo.png" alt="Logo" style="height: 35px;"/>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent);">SkillFutures</div>
        </div>
        <nav>${AppState.view === 'home' ? `<button class="btn btn-primary" data-route="signup">Join Now</button><button class="btn btn-outline" data-route="login" style="margin-left:1rem;">Login</button>` : ''}</nav>
      </header>
      <main>${AppState.view === 'home' ? HomeView() : (AppState.view === 'privacy-policy' ? PrivacyPolicyView() : (AppState.view === 'login' ? AuthView('login') : AuthView('signup')))}</main>
      ${Footer()}
    `;
  }
  attachEvents();
};

const attachEvents = () => {
  document.querySelectorAll('[data-route]').forEach(el => {
    el.onclick = () => { 
      AppState.view = el.dataset.route; 
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

  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.querySelector('#loginEmail').value;
      const pass = document.querySelector('#loginPassword').value;
      try { await signInWithEmailAndPassword(auth, email, pass); } catch (e) { alert(e.message); }
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
          name, email, todayEarnings: 0, weeklyEarnings: 0, monthlyEarnings: 0,
          allTimeEarnings: 0, passiveEarnings: 0, industryEarnings: 0, paidEarnings: 0,
          referralCode: `FF-${cred.user.uid.substring(0, 5).toUpperCase()}`,
          referrerId: referrerUid,
          joinedAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', cred.user.uid), initialData);

        // --- Award Commission ---
        if (referrerUid) {
          // Direct Commission (₹400)
          await updateDoc(doc(db, 'users', referrerUid), {
            todayEarnings: increment(AppState.commissionSettings.direct),
            weeklyEarnings: increment(AppState.commissionSettings.direct),
            monthlyEarnings: increment(AppState.commissionSettings.direct),
            allTimeEarnings: increment(AppState.commissionSettings.direct)
          });

          // Passive Commission (Next Level) - Lookup referrer's referrer
          const referrerDoc = await getDoc(doc(db, 'users', referrerUid));
          if (referrerDoc.exists() && referrerDoc.data().referrerId) {
            const indirectId = referrerDoc.data().referrerId;
            await updateDoc(doc(db, 'users', indirectId), {
              passiveEarnings: increment(AppState.commissionSettings.passive),
              allTimeEarnings: increment(AppState.commissionSettings.passive)
            });
          }
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


  // Admin Window Helpers
  window.showCourseModal = (courseId) => {
    const data = courseId ? AppState.courses.find(c => c.id === courseId) : null;
    AppState.adminModal = { type: 'course', data };
    render();
    
    const form = document.querySelector('#adminCourseForm');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        saveCourse({
          id: document.querySelector('#courseId').value,
          title: document.querySelector('#courseTitle').value,
          img: document.querySelector('#courseImg').value,
          category: document.querySelector('#courseCategory').value,
          totalLessons: Number(document.querySelector('#courseLessons').value)
        });
      };
    }
  };

  window.filterAdminUsers = (query) => {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('admin-users tbody tr'); // This might need a better selector
    // Actually, it's easier to just re-render with a filtered list if I wanted to be clean, 
    // but for simple search, I can just hide/show rows.
    document.querySelectorAll('tbody tr').forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  };

  window.updatePayoutStatus = updatePayoutStatus;
  window.deleteCourse = deleteCourse;

  window.showUserEditModal = (userId) => {
    const data = AppState.allUsers.find(u => u.id === userId);
    AppState.adminModal = { type: 'user-edit', data };
    render();
    const form = document.querySelector('#adminUserEditForm');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        saveUser(userId, {
          name: document.querySelector('#editUserName').value,
          role: document.querySelector('#editUserRole').value,
          allTimeEarnings: Number(document.querySelector('#editUserEarnings').value),
          paidEarnings: Number(document.querySelector('#editUserPaid').value)
        });
      };
    }
  };

  const settingsForm = document.querySelector('#adminSettingsForm');
  if (settingsForm) {
    settingsForm.onsubmit = (e) => {
      e.preventDefault();
      saveAdminSettings({
        direct: Number(document.querySelector('#directComm').value),
        passive: Number(document.querySelector('#passiveComm').value)
      });
    };
  }
  
  window.showNoticeModal = () => {
    AppState.adminModal = { type: 'notice', data: null };
    render();
    const form = document.querySelector('#adminNoticeForm');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        saveNotice({
          title: document.querySelector('#noticeTitle').value,
          message: document.querySelector('#noticeMessage').value
        });
        AppState.adminModal = null;
        render();
      };
    }
  };
  
  window.deleteNotice = deleteNotice;
};

onAuthStateChanged(auth, (user) => {
  AppState.user = user;
  if (user) {
    fetchUserData(user.uid);
    if (['home', 'login', 'signup'].includes(AppState.view)) {
      AppState.view = 'dashboard';
      
      // Check if we should show the welcome modal
      const hideUntil = localStorage.getItem('hideWelcomeModalUntil');
      const now = new Date().getTime();
      if (!hideUntil || now > parseInt(hideUntil)) {
        AppState.showWelcomeModal = true;
      }
    }
  } else {
    AppState.userData = null;
    if (!['login', 'signup'].includes(AppState.view)) AppState.view = 'home';
  }
  render();
});
