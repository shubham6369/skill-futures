import { auth, db, 
  collection, query, where, orderBy, limit, getDocs, addDoc, doc, getDoc, setDoc, updateDoc, increment 
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
  leaderboard: [],
  team: [],
  courses: [
    { id: '1', title: "Sales Mastery", img: "https://futurefiix.com/assets/images/courses/sales.jpg" },
    { id: '2', title: "Lead Generation", img: "https://futurefiix.com/assets/images/courses/lead.jpg" },
    { id: '3', title: "Affiliate Marketing", img: "https://futurefiix.com/assets/images/courses/affiliate.jpg" },
    { id: '4', title: "Video Editing", img: "https://futurefiix.com/assets/images/courses/video.jpg" }
  ],
  userCourses: [],
  selectedCourseId: null,
  showWelcomeModal: false,
  profileTab: 'details',
  isSidebarVisible: true
};

// ─── Data Actions ────────────────────────────────────────────────────────────

const fetchUserData = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    AppState.userData = userDoc.data();
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
      referralCode: `FF-${uid.substring(0, 5).toUpperCase()}`,
      joinedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', uid), initialData);
    AppState.userData = initialData;
    render();
  }
};

const fetchLeaderboard = async () => {
  const q = query(collection(db, 'users'), orderBy('allTimeEarnings', 'desc'), limit(10));
  const querySnapshot = await getDocs(q);
  AppState.leaderboard = querySnapshot.docs.map(doc => doc.data());
  render();
};

const fetchTeam = async () => {
  const q = query(collection(db, 'users'), where('referrerId', '==', AppState.user.uid));
  const querySnapshot = await getDocs(q);
  AppState.team = querySnapshot.docs.map(doc => doc.data());
  render();
};

const fetchCourses = async () => {
  const querySnapshot = await getDocs(collection(db, 'courses'));
  AppState.courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

const Sidebar = () => `
  <aside class="sidebar ${!AppState.isSidebarVisible ? 'collapsed' : ''}">
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
      <li class="sidebar-item ${AppState.view === 'training' ? 'active' : ''}" data-route="training">
        <i class="fas fa-video"></i> Training
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
        <div style="height: 300px; display: flex; align-items: flex-end; gap: 10%; padding: 0 2rem; border-bottom: 1px solid var(--card-border);">
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

const CourseListView = () => `
  <section class="main-content">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h1>Courses</h1>
      <span style="background: rgba(67, 56, 202, 0.1); color: #4338ca; padding: 6px 12px; border-radius: 20px; font-weight: 700; font-size: 0.8rem;">
        ${AppState.courses.length} Available
      </span>
    </div>
    <div class="course-grid">
      ${AppState.courses.map(course => `
        <div class="course-card-v2">
          <img src="${course.img || '/logo.png'}" class="course-img-v2" alt="${course.title}" onerror="this.src='/logo.png'"/>
          <h3>${course.title || 'Untitled Course'}</h3>
          <button class="btn-start-course" onclick="event.stopPropagation(); window.enrollInCourse('${course.id}')">
            START NOW
          </button>
        </div>
      `).join('')}
      ${AppState.courses.length === 0 ? `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; background: white; border-radius: 20px; border: 2px dashed #e2e8f0;">
          <i class="fas fa-book-open" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1.5rem;"></i>
          <h2 style="color: #64748b; margin-bottom: 0.5rem;">No Courses Found</h2>
          <p style="color: #94a3b8;">It seems like the course library is empty. Please check back later.</p>
        </div>
      ` : ''}
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
          <li><a>Privacy Policy</a></li>
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
      <div class="developed-by">Developed by <span>Bizfunnel</span></div>
    </div>
    
    <div class="scroll-top" id="scrollTopBtn">
      <i class="fas fa-chevron-up"></i>
    </div>
  </footer>
`;

// ─── Core Orchestration ──────────────────────────────────────────────────────

const render = () => {
  const app = document.querySelector('#app');
  if (AppState.user) {
    app.innerHTML = `
      ${WelcomeModal()}
      <div class="dashboard-container ${!AppState.isSidebarVisible ? 'sidebar-hidden' : ''}">
        ${Sidebar()}
        <div id="main-view" style="flex-grow: 1; overflow-y: auto;">
          ${AppState.view === 'dashboard' ? DashboardView() : ''}
          ${AppState.view === 'courses' ? CourseListView() : ''}
          ${AppState.view === 'affiliate-link' ? AffiliateLinkView() : ''}
          ${AppState.view === 'leaderboard' ? LeaderboardView() : ''}
          ${AppState.view === 'team' ? TeamView() : ''}
          ${AppState.view === 'wallet' ? WalletRequestView() : ''}
          ${AppState.view === 'profile' ? ProfileView() : ''}
          ${AppState.view === 'training' ? (() => {
            const course = AppState.courses.find(c => c.id === AppState.selectedCourseId) || AppState.courses[0] || {};
            const enrollment = AppState.userCourses.find(uc => uc.courseId === course.id) || {};
            const completed = enrollment.completedLessons || [];
            
            return `
              <section class="main-content animate-fade">
                <h1 style="margin-bottom: 0.5rem;">${course.title || 'Course Training'}</h1>
                <p style="color: #64748b; margin-bottom: 2rem;">Master your skills with ${course.title}</p>
                
                <div class="metrics-grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
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
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                </div>
              </section>
            `;
          })() : ''}
          ${AppState.view === 'webinars' ? `
            <section class="main-content animate-fade">
              <h1 style="margin-bottom: 2rem;">Live Webinars</h1>
              <div class="metrics-grid">
                <div class="chart-container" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: white; border: none;">
                  <div style="font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Next Session</div>
                  <h2>Strategic Scaling & Passive Income</h2>
                  <p style="margin: 1rem 0; opacity: 0.9;">Join us this Sunday for an exclusive session with top earners.</p>
                  <div style="display: flex; gap: 20px; font-weight: 700;">
                    <div>24h : 12m : 44s</div>
                  </div>
                  <button class="btn" style="background: white; color: #4338ca; margin-top: 2rem; width: 100%;">Set Reminder</button>
                </div>
                <div class="chart-container">
                  <h3>Recent Recordings</h3>
                  <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                      <span>Sales Psychology 101</span>
                      <i class="fas fa-play-circle" style="color: #4338ca; font-size: 1.2rem;"></i>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                      <span>Lead Magnet Optimization</span>
                      <i class="fas fa-play-circle" style="color: #4338ca; font-size: 1.2rem;"></i>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ` : ''}
          ${['upgrade', 'reports', 'offers', 'earning-target', 'create-account'].includes(AppState.view) ? `
            <section class="main-content animate-fade-up">
              <h1>${AppState.view.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</h1>
              <div class="chart-container" style="text-align: center; padding: 5rem;">
                <i class="fas fa-tools" style="font-size: 4rem; color: #6366f1; margin-bottom: 2rem;"></i>
                <h2>Section Under Development</h2>
                <p style="color: #64748b;">We are working hard to bring this feature to your dashboard very soon!</p>
              </div>
            </section>
          ` : ''}
          ${Footer()}
        </div>
      </div>
    `;
    
    if (AppState.view === 'leaderboard' && AppState.leaderboard.length === 0) fetchLeaderboard();
    if (AppState.view === 'team' && AppState.team.length === 0) fetchTeam();
    if (AppState.view === 'courses' && AppState.courses.length === 0) {
      fetchCourses();
      fetchUserCourses();
    }
  } else {
    app.innerHTML = `<header style="padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--card-border);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="/logo.png" alt="Logo" style="height: 35px;"/>
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent);">SkillFutures</div>
      </div>
      <nav>${AppState.view === 'home' ? `<button class="btn btn-primary" data-route="signup">Join Now</button><button class="btn btn-outline" data-route="login" style="margin-left:1rem;">Login</button>` : ''}</nav>
    </header>
    <main>${AppState.view === 'home' ? HomeView() : (AppState.view === 'login' ? AuthView('login') : AuthView('signup'))}</main>
    ${Footer()}`;
    
    if (AppState.view === 'signup') {
      const p = getQueryParams();
      if (p.ref) {
        const input = document.querySelector('#signupReferral');
        if (input) input.value = p.ref;
      }
    }
  }
  attachEvents();
};

const attachEvents = () => {
  document.querySelectorAll('[data-route]').forEach(el => {
    el.onclick = () => { AppState.view = el.dataset.route; render(); };
  });

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
            todayEarnings: increment(400),
            weeklyEarnings: increment(400),
            monthlyEarnings: increment(400),
            allTimeEarnings: increment(400)
          });

          // Passive Commission (Next Level) - Lookup referrer's referrer
          const referrerDoc = await getDoc(doc(db, 'users', referrerUid));
          if (referrerDoc.exists() && referrerDoc.data().referrerId) {
            const indirectId = referrerDoc.data().referrerId;
            await updateDoc(doc(db, 'users', indirectId), {
              passiveEarnings: increment(100),
              allTimeEarnings: increment(100)
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

  // Scroll to Top Logic
  const scrollTopBtn = document.querySelector('#scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    window.onscroll = () => {
      if (window.scrollY > 300) scrollTopBtn.style.display = 'flex';
      else scrollTopBtn.style.display = 'none';
    };
    scrollTopBtn.style.display = 'none'; // Initial state
  }
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
