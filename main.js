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
    alert("Copied to clipboard!");
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
    { title: "Sales Mastery", img: "https://futurefiix.com/assets/images/courses/sales.jpg" },
    { title: "Lead Generation", img: "https://futurefiix.com/assets/images/courses/lead.jpg" },
    { title: "Affiliate Marketing", img: "https://futurefiix.com/assets/images/courses/affiliate.jpg" },
    { title: "Video Editing", img: "https://futurefiix.com/assets/images/courses/video.jpg" },
    { title: "Instagram Mastery", img: "https://futurefiix.com/assets/images/courses/insta.jpg" },
    { title: "Canva Mastery", img: "https://futurefiix.com/assets/images/courses/canva.jpg" },
    { title: "Google AdSense", img: "https://futurefiix.com/assets/images/courses/google.jpg" },
    { title: "YouTube Mastery", img: "https://futurefiix.com/assets/images/courses/youtube.jpg" },
    { title: "Facebook Ads", img: "https://futurefiix.com/assets/images/courses/fb.jpg" },
    { title: "Instagram Theme Page", img: "https://futurefiix.com/assets/images/courses/theme.jpg" },
    { title: "WordPress Development", img: "https://futurefiix.com/assets/images/courses/wp.jpg" },
    { title: "Communication Skills", img: "https://futurefiix.com/assets/images/courses/comm.jpg" },
    { title: "Digital Marketing", img: "https://futurefiix.com/assets/images/courses/digital.jpg" },
    { title: "Drop Shipping", img: "https://futurefiix.com/assets/images/courses/drop.jpg" },
    { title: "Chat GPT Mastery", img: "https://futurefiix.com/assets/images/courses/gpt.jpg" },
    { title: "Stock Market", img: "https://futurefiix.com/assets/images/courses/stock.jpg" }
  ]
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

// ─── Components ──────────────────────────────────────────────────────────────

const Sidebar = () => `
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 5px;">
        <img src="/logo.png" alt="Logo" style="height: 40px;"/>
        <div style="font-size: 1.8rem; font-weight: 800; color: #4338ca; letter-spacing: -1px;">SkillFutures</div>
      </div>
      <div style="font-size: 0.75rem; color: #64748b; font-weight: 600; padding-left: 52px; margin-top: -10px;">"Crafting Careers, Creating Incomes."</div>
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
        <div class="metric-card card-today">
          <div class="metric-info">
            <h3>₹ ${m.todayEarnings || 0} /-</h3>
            <span>Today's Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-weekly">
          <div class="metric-info">
            <h3>₹ ${m.weeklyEarnings || 0} /-</h3>
            <span>Weekly Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-monthly">
          <div class="metric-info">
            <h3>₹ ${m.monthlyEarnings || 0} /-</h3>
            <span>Monthly Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-alltime">
          <div class="metric-info">
            <h3>₹ ${m.allTimeEarnings || 0} /-</h3>
            <span>All Time Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-passive">
          <div class="metric-info">
            <h3>₹ ${m.passiveEarnings || 0} /-</h3>
            <span>Total Passive Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-industry">
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
  <section class="main-content">
    <h1 style="margin-bottom: 3rem;">Leaderboard</h1>
    <div class="chart-container">
      <table style="width: 100%; border-collapse: collapse; color: white;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid var(--card-border);">
            <th style="padding: 1rem;">Rank</th>
            <th style="padding: 1rem;">User</th>
            <th style="padding: 1rem;">Total Earnings</th>
          </tr>
        </thead>
        <tbody>
          ${AppState.leaderboard.map((user, i) => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 1rem;">#${i + 1}</td>
              <td style="padding: 1rem; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 35px; height: 35px; background: #2a2a2a; border-radius: 50%;"></div>
                ${user.name}
              </td>
              <td style="padding: 1rem; color: #4ade80; font-weight: 700;">₹ ${user.allTimeEarnings}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
`;

const TeamView = () => `
  <section class="main-content">
    <h1 style="margin-bottom: 3rem;">My Team</h1>
    <div class="chart-container">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid var(--card-border);">
            <th style="padding: 1rem;">Name</th>
            <th style="padding: 1rem;">Email</th>
            <th style="padding: 1rem;">Joined At</th>
          </tr>
        </thead>
        <tbody>
          ${AppState.team.map(member => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 1rem;">${member.name}</td>
              <td style="padding: 1rem;">${member.email}</td>
              <td style="padding: 1rem;">${new Date(member.joinedAt).toLocaleDateString()}</td>
            </tr>
          `).join('')}
          ${AppState.team.length === 0 ? '<tr><td colspan="3" style="padding: 2rem; text-align: center; color: var(--text-dim);">No team members yet.</td></tr>' : ''}
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
    <h1 style="margin-bottom: 3rem;">Courses</h1>
    <div class="course-grid">
      ${AppState.courses.map(course => `
        <div class="course-card">
          <img src="${course.img}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;"/>
          <h3>${course.title}</h3>
          <button class="btn-start">START NOW</button>
        </div>
      `).join('')}
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
    app.innerHTML = `<div class="dashboard-container">${Sidebar()}<div id="main-view" style="flex-grow: 1; overflow-y: auto;">
      ${AppState.view === 'dashboard' ? DashboardView() : ''}
      ${AppState.view === 'courses' ? CourseListView() : ''}
      ${AppState.view === 'affiliate-link' ? AffiliateLinkView() : ''}
      ${AppState.view === 'leaderboard' ? LeaderboardView() : ''}
      ${AppState.view === 'team' ? TeamView() : ''}
      ${AppState.view === 'wallet' ? WalletRequestView() : ''}
      ${AppState.view === 'profile' ? `
        <section class="main-content">
          <h1>My Profile</h1>
          <div class="chart-container">
            <p>Name: <strong>${AppState.userData?.name}</strong></p>
            <p>Email: ${AppState.user.email}</p>
            <p style="margin-top: 1rem;">KYC Status: <strong style="color: #4ade80;">APPROVED ✅</strong></p>
          </div>
        </section>
      ` : ''}
      ${['upgrade', 'reports', 'training', 'webinars', 'offers', 'earning-target', 'create-account'].includes(AppState.view) ? `
        <section class="main-content">
          <h1>${AppState.view.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</h1>
          <div class="chart-container" style="text-align: center; padding: 5rem;">
            <i class="fas fa-tools" style="font-size: 4rem; color: #6366f1; margin-bottom: 2rem;"></i>
            <h2>Section Under Development</h2>
            <p style="color: #64748b;">We are working hard to bring this feature to your dashboard very soon!</p>
          </div>
        </section>
      ` : ''}
      ${Footer()}
    </div></div>`;
    
    // Auto-fetch data on view change
    if (AppState.view === 'leaderboard' && AppState.leaderboard.length === 0) fetchLeaderboard();
    if (AppState.view === 'team' && AppState.team.length === 0) fetchTeam();
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

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = () => copyToClipboard(btn.dataset.text);
  });
  
  const toSignUp = document.querySelector('#toSignUp');
  if (toSignUp) toSignUp.onclick = () => { AppState.view = 'signup'; render(); };
  const toSignIn = document.querySelector('#toSignIn');
  if (toSignIn) toSignIn.onclick = () => { AppState.view = 'login'; render(); };

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
    if (['home', 'login', 'signup'].includes(AppState.view)) AppState.view = 'dashboard';
  } else {
    AppState.userData = null;
    if (!['login', 'signup'].includes(AppState.view)) AppState.view = 'home';
  }
  render();
});
