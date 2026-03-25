/**
 * Skill Futures - Main App
 * Professional Web Application v3 (FutureFiix Mirror)
 */

// ─── App State ───────────────────────────────────────────────────────────────

const AppState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  view: 'home', // 'home', 'login', 'dashboard', 'courses', 'profile'
  user: {
    name: 'Kabir Pathan',
    email: 'wkhan381701@gmail.com',
    earnings: {
      today: '₹1,200',
      weekly: '₹8,500',
      monthly: '₹32,000',
      allTime: '₹1,45,000'
    },
    enrolledCourses: [
      { id: 1, title: 'Sales Mastery', progress: 85, img: 'hero-graphic.png' },
      { id: 2, title: 'Lead Generation', progress: 40, img: 'hero-graphic.png' }
    ]
  }
};

// ─── Shared Components ───────────────────────────────────────────────────────

const Header = () => `
  <header>
    <nav class="navbar">
      <div class="logo nav-link" data-view="home" style="cursor: pointer;">
        <img src="logo.png" alt="Skill Futures Logo" />
        <span>Skill Futures</span>
      </div>
      <ul class="nav-links">
        <li class="nav-link" data-view="home">Home</li>
        <li>About Us</li>
        <li>Courses</li>
        <li>Contact Us</li>
      </ul>
      <div class="nav-actions">
        ${AppState.isLoggedIn 
          ? `<button id="dashboardBtn" class="btn btn-primary">Dashboard</button>`
          : `<button id="loginBtn" class="btn btn-primary">Log in</button>`
        }
      </div>
    </nav>
  </header>
`;

const Sidebar = () => `
  <aside class="sidebar">
    <div class="sidebar-logo nav-link" data-view="home" style="cursor: pointer;">
      <img src="logo.png" alt="Logo" />
      <span>Skill Futures</span>
    </div>
    <ul class="sidebar-nav">
      <li class="nav-link ${AppState.view === 'dashboard' ? 'active' : ''}" data-view="dashboard">
        Dashboard
      </li>
      <li class="nav-link ${AppState.view === 'courses' ? 'active' : ''}" data-view="courses">
        My Courses
      </li>
      <li class="nav-link ${AppState.view === 'profile' ? 'active' : ''}" data-view="profile">
        My Profile
      </li>
      <li class="nav-link" data-view="affiliate">
        Affiliate Links
      </li>
    </ul>
    <div style="margin-top: auto;">
      <button id="logoutBtn" class="btn btn-outline" style="width: 100%;">Logout</button>
    </div>
  </aside>
`;

const Footer = () => `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Skill Futures</h4>
        <ul>
          <li>About Us</li>
          <li>Mission</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div class="footer-col">
          <h4>Contact</h4>
          <p style="color: var(--text-dim); font-size: 0.9rem;">
            Village karanpur barki madayye sarkara khas<br>
            District Moradabad (244001) (UP)<br>
            Phone: +91 9548797492
          </p>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2026 Skill Futures. All Rights Reserved.
    </div>
  </footer>
`;

// ─── View Templates ──────────────────────────────────────────────────────────

const HomeView = () => `
  <section class="hero">
    <div class="hero-content">
      <h1>Crafting Careers, <span class="accent">Creating Incomes</span></h1>
      <p>Unlock premium skills in digital marketing and affiliate business. Your journey to mastery starts here.</p>
      <div class="hero-actions">
        <button class="btn btn-primary">Explore Courses</button>
      </div>
    </div>
    <div class="hero-graphic">
      <img src="hero-graphic.png" alt="Hero Illustration" />
    </div>
  </section>
  <div class="ticker-wrapper">
    <div class="ticker">
      <span>Digital Marketing</span> • <span>Sales Mastery</span> • <span>Lead Generation Mastery</span> • <span>Affiliate Marketing</span> • <span>Video Editing</span>
    </div>
  </div>
`;

const LoginView = () => `
  <div style="display: flex; justify-content: center; align-items: center; min-height: 80vh;">
    <div class="course-card" style="max-width: 400px; width: 100%; text-align: left;">
      <h2 style="margin-bottom: 1rem; text-align: left; font-size: 2rem;">Login</h2>
      <p style="color: var(--text-dim); margin-bottom: 2rem;">Access your dashboard and courses.</p>
      <form id="loginForm">
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem;">Email ID</label>
          <input type="email" value="wkhan381701@gmail.com" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: white;"/>
        </div>
        <div style="margin-bottom: 2rem;">
          <label style="display: block; margin-bottom: 0.5rem;">Password</label>
          <input type="password" value="1234@1" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: white;"/>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
      </form>
    </div>
  </div>
`;

const DashboardView = () => `
  <div class="main-dashboard">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
      <h1>Hello, ${AppState.user.name} 👋</h1>
      <div class="btn btn-outline">Referral Code: FF-1751</div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-title">Today's Earnings</div>
        <div class="metric-value">${AppState.user.earnings.today}</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Weekly Earnings</div>
        <div class="metric-value">${AppState.user.earnings.weekly}</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Monthly Earnings</div>
        <div class="metric-value">${AppState.user.earnings.monthly}</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">All Time Earnings</div>
        <div class="metric-value">${AppState.user.earnings.allTime}</div>
      </div>
    </div>

    <h2>7 Days Sales Graph</h2>
    <div class="chart-placeholder">
      <p style="color: var(--text-dim);">Performance Chart Integration Loading...</p>
    </div>

    <div class="course-grid">
      <div class="course-card">
        <img src="hero-graphic.png" style="width: 100%; border-radius: 12px; margin-bottom: 1.5rem;"/>
        <h3>Webinar Training</h3>
        <p>Join our weekly session on advanced affiliate strategies.</p>
        <button class="btn btn-primary">Join Now</button>
      </div>
    </div>
  </div>
`;

const CourseListView = () => `
  <div class="main-dashboard">
    <h1 style="margin-bottom: 3rem;">My Enrolled Courses</h1>
    <div class="course-grid">
      ${AppState.user.enrolledCourses.map(course => `
        <div class="course-card">
          <img src="${course.img}" style="width: 100%; border-radius: 12px; margin-bottom: 1.5rem;"/>
          <h3>${course.title}</h3>
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; margin: 1rem 0;">
            <div style="width: ${course.progress}%; height: 100%; background: var(--accent); border-radius: 4px;"></div>
          </div>
          <p>${course.progress}% Completed</p>
          <button class="btn btn-primary">Continue Learning</button>
        </div>
      `).join('')}
    </div>
  </div>
`;

const ProfileView = () => `
  <div class="main-dashboard">
    <h1 style="margin-bottom: 3rem;">My Profile</h1>
    <div class="course-card" style="text-align: left;">
      <div style="display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2rem;">
        <img src="founder-avatar.png" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid var(--primary-blue);"/>
        <div>
          <h2>${AppState.user.name}</h2>
          <p style="color: var(--text-dim);">${AppState.user.email}</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <label style="color: var(--text-dim); font-size: 0.8rem;">KYC Status</label>
          <p style="color: #4ade80; font-weight: 700;">APPROVED ✅</p>
        </div>
        <div>
          <label style="color: var(--text-dim); font-size: 0.8rem;">Current Package</label>
          <p>Premium Package (Gold)</p>
        </div>
        <div>
          <label style="color: var(--text-dim); font-size: 0.8rem;">Sponsor</label>
          <p>Juned khan</p>
        </div>
        <div>
          <label style="color: var(--text-dim); font-size: 0.8rem;">Join Date</label>
          <p>March 12, 2026</p>
        </div>
      </div>
    </div>
  </div>
`;

// ─── Core Logic ─────────────────────────────────────────────────────────────

const render = () => {
  const app = document.querySelector('#app');
  if (!app) return;

  if (AppState.isLoggedIn && AppState.view !== 'home') {
    // Render Dashboard Layout
    app.innerHTML = `
      <div class="dashboard-layout">
        ${Sidebar()}
        <div id="dashboard-content">
          ${AppState.view === 'dashboard' ? DashboardView() : ''}
          ${AppState.view === 'courses' ? CourseListView() : ''}
          ${AppState.view === 'profile' ? ProfileView() : ''}
        </div>
      </div>
    `;
  } else {
    // Render Landing Layout
    app.innerHTML = `
      ${Header()}
      <main id="main-content">
        ${AppState.view === 'home' ? HomeView() : ''}
        ${AppState.view === 'login' ? LoginView() : ''}
      </main>
      ${Footer()}
    `;
  }
  
  attachEvents();
  window.scrollTo(0, 0);
};

const attachEvents = () => {
  // Navigation Links
  document.querySelectorAll('.nav-link').forEach(el => {
    el.onclick = (e) => {
      const view = el.getAttribute('data-view');
      if (view) {
        AppState.view = view;
        render();
      }
    };
  });

  // Action Buttons
  const loginBtn = document.querySelector('#loginBtn');
  if (loginBtn) loginBtn.onclick = () => { AppState.view = 'login'; render(); };

  const dashboardBtn = document.querySelector('#dashboardBtn');
  if (dashboardBtn) dashboardBtn.onclick = () => { AppState.view = 'dashboard'; render(); };

  const logoutBtn = document.querySelector('#logoutBtn');
  if (logoutBtn) logoutBtn.onclick = () => {
    AppState.isLoggedIn = false;
    AppState.view = 'home';
    localStorage.removeItem('isLoggedIn');
    render();
  };

  // Forms
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      AppState.isLoggedIn = true;
      AppState.view = 'dashboard';
      localStorage.setItem('isLoggedIn', 'true');
      render();
    };
  }
};

// Initial Render
render();
