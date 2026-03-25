/**
 * Skill Futures - Main JS
 * Premium Overhaul v2
 */

// ─── Shared Components ───────────────────────────────────────────────────────

const Header = `
  <header>
    <nav class="navbar">
      <div class="logo nav-home" style="cursor: pointer;">
        <img src="logo.png" alt="Skill Futures Logo" />
        <span>Skill Futures</span>
      </div>
      <ul class="nav-links">
        <li class="nav-home">Home</li>
        <li>About Us</li>
        <li>Courses</li>
        <li>Contact Us</li>
      </ul>
      <div class="nav-actions">
        <button id="loginBtn" class="btn btn-primary">Log in</button>
      </div>
    </nav>
  </header>
`;

const Footer = `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Skill Futures</h4>
        <ul>
          <li>About Us</li>
          <li>Mission</li>
          <li>Success Stories</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li>Refund Policy</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Get In Touch</h4>
        <ul>
          <li>Email: skillfuturessupport@gmail.com</li>
          <li>Phone: +91 9548797492</li>
          <li>Location: Moradabad, Uttar Pradesh, India</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2026 Skill Futures. All Rights Reserved. Crafted for Success.
    </div>
  </footer>
`;

// ─── Home View ───────────────────────────────────────────────────────────────

const HomeContent = `
  <section class="hero">
    <div class="hero-content">
      <h1>Crafting Careers, <span class="accent">Creating Incomes</span></h1>
      <p>Unlock premium skills in digital marketing, finance, and online business. Join thousands of successful students globally.</p>
      <div class="hero-actions">
        <button class="btn btn-primary">Explore Courses</button>
        <button class="btn btn-outline" style="margin-left: 1rem;">Join Community</button>
      </div>
    </div>
    <div class="hero-graphic">
      <img src="hero-graphic.png" alt="Skill Futures Hero Illustration" />
    </div>
  </section>

  <div class="ticker-wrapper">
    <div class="ticker">
      <span>Digital Marketing</span> • <span>Affiliate Marketing</span> • <span>E-Commerce</span> • <span>Stock Market</span> • <span>Freelancing</span> • <span>SEO Mastery</span> • <span>AdSense</span> • <span>Business Strategy</span>
    </div>
  </div>

  <section class="courses">
    <h2>Our Featured Packages</h2>
    <div class="course-grid">
      <div class="course-card">
        <h3>Prime Package</h3>
        <p class="price">₹1,499</p>
        <p>Essential digital foundation for starters.</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
      <div class="course-card">
        <h3>Premium Package</h3>
        <p class="price">₹4,999</p>
        <p>Advanced strategies & direct mentorship.</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
      <div class="course-card">
        <h3>Finance Mastery</h3>
        <p class="price">₹9,999</p>
        <p>Master the markets and high-ticket sales.</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
    </div>
  </section>

  <section class="mission">
    <div class="mission-image">
      <img src="founder-avatar.png" alt="Kabir Pathan - Founder" />
    </div>
    <div class="mission-content">
      <h2>Our Mission</h2>
      <p>Hi, I am <strong>Kabir Pathan</strong>, the founder of Skill Futures. We are built to empower individuals with real skills, proven systems, and unlimited earning potential through online business and affiliate marketing.</p>
      <br>
      <p>Over the past few years, we've helped thousands of people — from students to professionals — take their first successful steps into the digital world. Our mission is to create a community where people grow together with practical training and tested tools.</p>
    </div>
  </section>

  <section class="instructors">
    <h2>Learn From The Best</h2>
    <div class="instructor-grid">
      <div class="instructor-card">
        <div class="instructor-image">
           <img src="founder-avatar.png" alt="Kabir Pathan" />
        </div>
        <h4>Kabir Pathan</h4>
        <p>Founder & Lead Mentor</p>
      </div>
      <div class="instructor-card">
        <div class="instructor-image">
           <img src="technical-avatar.png" alt="Arun Pratap" />
        </div>
        <h4>Arun Pratap</h4>
        <p>Technical Specialist</p>
      </div>
      <div class="instructor-card">
        <div class="instructor-image">
           <img src="technical-avatar.png" alt="Deepak Saini" />
        </div>
        <h4>Deepak Saini</h4>
        <p>Success Manager</p>
      </div>
    </div>
  </section>

  <section class="testimonials">
    <h2>Words From Our Students</h2>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <p>"Skill Futures changed my perspective on digital marketing. The support team is amazing!"</p>
        <div class="testimonial-author"><strong>Aasmeen Ansari</strong></div>
      </div>
      <div class="testimonial-card">
        <p>"The best investment I've made. The Prime package gave me exactly what I needed to start."</p>
        <div class="testimonial-author"><strong>Vinay Kumar</strong></div>
      </div>
    </div>
  </section>
`;

// ─── Login View ──────────────────────────────────────────────────────────────

const LoginContent = `
  <div class="login-view">
    <div class="login-card">
      <div class="logo">
        <img src="logo.png" alt="Skill Futures Logo" />
      </div>
      <h2>Welcome Back</h2>
      <p>Login to your Skill Futures Account</p>
      <form class="login-form">
        <div class="form-group">
          <label>Email ID</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary btn-full">Submit</button>
      </form>
      <div class="login-links">
        <a href="#">Forgot Password?</a>
        <span>Don't have an account? <a href="#" id="backToHome">Sign Up</a></span>
      </div>
    </div>
  </div>
`;

// ─── App Logic ───────────────────────────────────────────────────────────────

const initApp = () => {
  const app = document.querySelector('#app');
  if (!app) return;
  
  app.innerHTML = `
    ${Header}
    <main id="main-content"></main>
    ${Footer}
  `;
  renderHome();
};

const renderHome = () => {
  const mainContent = document.querySelector('#main-content');
  if (mainContent) {
    mainContent.innerHTML = HomeContent;
    window.scrollTo(0, 0);
    attachEvents();
  }
};

const renderLogin = () => {
  const mainContent = document.querySelector('#main-content');
  if (mainContent) {
    mainContent.innerHTML = LoginContent;
    window.scrollTo(0, 0);
    attachEvents();
  }
};

const attachEvents = () => {
  const loginBtn = document.querySelector('#loginBtn');
  if (loginBtn) loginBtn.onclick = renderLogin;

  const homeLinks = document.querySelectorAll('.nav-home, .logo, #backToHome');
  homeLinks.forEach(el => {
    if (el) el.onclick = renderHome;
  });

  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      alert('Login functionality will be integrated in Phase 3.');
    };
  }
};

// Initialize
initApp();
