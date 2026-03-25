(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const l=`
  <section class="hero">
    <h1>Crafting Careers, <span class="accent">Creating Incomes</span></h1>
    <p>Unlock premium skills in digital marketing, finance, and online business. Join thousands of successful students globally.</p>
    <div class="hero-actions">
      <button class="btn btn-primary">Explore Courses</button>
      <button class="btn btn-white">Join Community</button>
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
      <div class="course-card card-prime">
        <h3>Prime Package</h3>
        <p class="price">₹1,499</p>
        <p class="description">Essential digital foundation for starters.</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
      <div class="course-card card-premium">
        <h3>Premium Package</h3>
        <p class="price">₹4,999</p>
        <p class="description">Advanced strategies & direct mentorship.</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
      <div class="course-card card-finance">
        <h3>Finance Mastery</h3>
        <p class="price">₹9,999</p>
        <p class="description">Master the markets and high-ticket sales.</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
    </div>
  </section>

  <section class="mission">
    <div class="mission-content">
      <h2>Our Mission</h2>
      <p>Hi, I'm Kabir Pathan, the founder of Skill Futures. We are built to empower individuals with real skills, proven systems, and unlimited earning potential through online business and affiliate marketing.</p>
      <br>
      <p>Over the past few years, we've helped thousands of people — from students to professionals — take their first successful steps into the digital world. Our mission is to create a community where people grow together with practical training and tested tools.</p>
      <br>
      <p>Join us, and let's craft your career together.</p>
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

  <section class="instructors">
    <h2>Learn From The Best</h2>
    <div class="instructor-grid">
      <div class="instructor-card">
        <div class="instructor-img"></div>
        <h4>Kabir Pathan</h4>
        <p>Founder & Lead Mentor</p>
      </div>
      <div class="instructor-card">
        <div class="instructor-img"></div>
        <h4>Arun Pratap</h4>
        <p>Technical Specialist</p>
      </div>
      <div class="instructor-card">
        <div class="instructor-img"></div>
        <h4>Deepak Saini</h4>
        <p>Success Manager</p>
      </div>
    </div>
  </section>
`,d=`
  <div class="login-view">
    <div class="login-card">
      <div class="logo">
        <img src="/logo.png" alt="Skill Futures Logo" />
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
`,u=()=>{const s=document.querySelector("#app");s.innerHTML=`
    \${Header}
    <main id="main-content"></main>
    \${Footer}
  `,a()},a=()=>{const s=document.querySelector("#main-content");s.innerHTML=l,window.scrollTo(0,0),c()},p=()=>{const s=document.querySelector("#main-content");s.innerHTML=d,window.scrollTo(0,0),c()},c=()=>{const s=document.querySelector("#loginBtn");s&&(s.onclick=p),document.querySelectorAll(".nav-home, .logo, #backToHome").forEach(i=>{i&&(i.onclick=a)});const r=document.querySelector(".login-form");r&&(r.onsubmit=i=>{i.preventDefault(),alert("Login functionality will be integrated in Phase 3.")})};u();
