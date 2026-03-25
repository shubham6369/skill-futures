(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const l=document.querySelector("#app");l.innerHTML=`
  <header>
    <nav class="navbar">
      <div class="logo">
        <img src="/logo.png" alt="Skill Future Logo" />
        <span>Skill Future</span>
      </div>
      <ul class="nav-links">
        <li>Home</li>
        <li>About Us</li>
        <li>Courses</li>
        <li>Contact Us</li>
      </ul>
      <button class="btn btn-outline" id="loginBtn">Log in</button>
    </nav>
  </header>
  <main id="main-content"></main>
`;const n=()=>{const t=document.querySelector("#main-content");t.innerHTML=`
    <div class="ticker-container">
      <div class="ticker-content">
        <span>STOCK MARKET ★</span>
        <span>INSTAGRAM THEME PAGE GROWTH ★</span>
        <span>DIGITAL MARKETING ★</span>
        <span>AFFILIATE MARKETING ★</span>
        <span>FINANCIAL PLANNING ★</span>
        <span>STOCK MARKET ★</span>
        <span>INSTAGRAM THEME PAGE GROWTH ★</span>
      </div>
    </div>

    <section class="hero">
      <h1>Crafting Careers,<br>Creating Incomes.</h1>
      <p>Unlocking your true potential with expert-led courses and professional certification.</p>
      <div class="hero-btns">
        <button class="btn btn-primary">Enroll Now</button>
        <button class="btn btn-outline" style="border-color: white; color: white;">Learn More</button>
      </div>
    </section>

    <section class="packages">
      <h2>Explore Our Course Packages</h2>
      <div class="package-grid">
        <div class="package-card">
          <h3>Prime Package</h3>
          <p class="price">₹1,499</p>
          <ul>
            <li>Core Foundations</li>
            <li>Basic Marketing</li>
            <li>Community Access</li>
          </ul>
          <button class="btn btn-primary">Choose Plan</button>
        </div>
        <div class="package-card" style="border-top-color: var(--primary-gold);">
          <h3>Premium Package</h3>
          <p class="price">₹2,999</p>
          <ul>
            <li>Advanced Strategies</li>
            <li>Direct Mentorship</li>
            <li>Certification Included</li>
          </ul>
          <button class="btn btn-primary">Choose Plan</button>
        </div>
        <div class="package-card">
          <h3>Finance Package</h3>
          <p class="price">₹4,999</p>
          <ul>
            <li>Financial Planning</li>
            <li>Investment Mastery</li>
            <li>Wealth Management</li>
          </ul>
          <button class="btn btn-primary">Choose Plan</button>
        </div>
      </div>
    </section>

    <section class="mission">
      <div class="mission-content">
        <h2>Our Mission</h2>
        <p>Hi, I'm Kabir Pathan, the founder of Skill Future. We are built to empower individuals with real skills, proven systems, and unlimited earning potential through online business and affiliate marketing.</p>
        <br>
        <p>Over the past few years, we've helped thousands of people — from students to professionals — take their first successful steps into the digital world. Our mission is to create a community where people grow together with practical training and tested tools.</p>
        <br>
        <button class="btn btn-outline">Read More</button>
      </div>
      <div class="mission-image">
        <div style="background: #ccc; height: 400px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #666;">Founder Photo</div>
      </div>
    </section>

    <section class="testimonials">
      <h2>Words From Our Students</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card">
          <p>"Skill Future changed my perspective on digital marketing. The support team is amazing!"</p>
          <div class="testimonial-author">
            <strong>Aasmeen Ansari</strong>
          </div>
        </div>
        <div class="testimonial-card">
          <p>"The Premium package was worth every rupee. I started earning within the first month."</p>
          <div class="testimonial-author">
            <strong>Karan Singh</strong>
          </div>
        </div>
        <div class="testimonial-card">
          <p>"Step-by-step guidance and practical tools. Best decision for my career."</p>
          <div class="testimonial-author">
            <strong>Umme Salma</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="team">
      <h2>Our Instructors</h2>
      <div class="team-grid">
        <div class="team-card">
          <div class="team-avatar">👨‍🏫</div>
          <h3>Sajid Ali</h3>
          <p>Sales Strategist</p>
        </div>
        <div class="team-card">
          <div class="team-avatar">👨‍💻</div>
          <h3>Soheb Gori</h3>
          <p>Support Specialist</p>
        </div>
        <div class="team-card">
          <div class="team-avatar">👩‍💼</div>
          <h3>Zoya Khan</h3>
          <p>Marketing Head</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Skill Future</h4>
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
            <li>Email: support@skillfuture.in</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: Jaipur, India</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 Skill Future. All Rights Reserved. Crafted for Success.
      </div>
    </footer>
  `},c=()=>{const t=document.querySelector("#main-content");t.innerHTML=`
    <div class="login-view">
      <div class="login-card">
        <h2>Welcome Back</h2>
        <p>Log in to access your learning dashboard</p>
        <form id="loginForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
        <div class="login-footer">
          Don't have an account? <a href="#">Create Account</a>
        </div>
      </div>
    </div>
  `};n();document.querySelector("#loginBtn").addEventListener("click",c);document.querySelector(".logo").addEventListener("click",n);console.log("Skill Future App Initialized");
