import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthPage.css";

// step: "tabs" → "consent"
const AuthPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab]           = useState("login");   // "login" | "register"
  const [step, setStep]         = useState("form");     // "form" | "consent"
  const [pendingUser, setPending] = useState(null);

  // shared form state
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [errors, setErrors]     = useState({});

  const clearForm = () => {
    setName(""); setEmail(""); setPassword(""); setConfirm(""); setErrors({});
  };

  /* ── Validation ── */
  const validateLogin = () => {
    const e = {};
    if (!name.trim())    e.name  = "Name is required";
    if (!email.trim())   e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password)       e.password = "Password is required";
    return e;
  };

  const validateRegister = () => {
    const e = {};
    if (!name.trim())    e.name  = "Full name is required";
    if (!email.trim())   e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password)       e.password = "Password is required";
    else if (password.length < 6) e.password = "Min 6 characters";
    if (!confirm)        e.confirm = "Please confirm password";
    else if (confirm !== password) e.confirm = "Passwords do not match";
    return e;
  };

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = tab === "login" ? validateLogin() : validateRegister();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setPending({ name, email, password });
    setStep("consent");
  };

  /* ── Consent choice ── */
  const handleConsent = (saveData) => {
    if (tab === "register") {
      register(pendingUser.name, pendingUser.email, pendingUser.password, saveData);
    } else {
      login(pendingUser.name, pendingUser.email, saveData);
    }
    navigate("/");
  };

  /* ── Tab switch ── */
  const switchTab = (t) => {
    setTab(t); clearForm(); setStep("form");
  };

  /* ─────────────────── CONSENT STEP ─────────────────── */
  if (step === "consent") {
    return (
      <div className="auth-root">
        <div className="auth-bg" />
        <div className="auth-card auth-card--in">

          <div className="auth-logo-row">
            <img src="/icons/icon-96.png" alt="TravelEase" className="auth-logo-img" />
            <span className="auth-logo-name">TravelEase</span>
          </div>

          <div className="auth-consent-icon">🔒</div>
          <h2 className="auth-title">Save Your Data?</h2>
          <p className="auth-subtitle">
            Hi <strong>{pendingUser?.name}</strong>! Do you want TravelEase to remember your login after you close the browser?
          </p>

          <div className="auth-consent-box">
            <div className="auth-consent-label">What gets saved:</div>
            <ul className="auth-consent-list">
              <li>✓ Your name &amp; email — stored only in this browser</li>
              <li>✓ No passwords stored anywhere</li>
              <li>✓ No server — 100% local to your device</li>
              <li>✓ You can logout anytime to clear everything</li>
            </ul>
          </div>

          <div className="auth-consent-actions">
            <button className="auth-btn-primary" onClick={() => handleConsent(true)}>
              ✅ Yes, Remember Me
            </button>
            <button className="auth-btn-outline" onClick={() => handleConsent(false)}>
              🚫 No, Just This Session
            </button>
          </div>

          <button className="auth-back-link" onClick={() => setStep("form")}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────────── FORM STEP ─────────────────── */
  return (
    <div className="auth-root">
      <div className="auth-bg" />
      <div className="auth-card auth-card--in">

        {/* Logo */}
        <div className="auth-logo-row">
          <img src="/icons/icon-96.png" alt="TravelEase" className="auth-logo-img" />
          <span className="auth-logo-name">TravelEase</span>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "auth-tab--active" : ""}`}
            onClick={() => switchTab("login")}
          >Login</button>
          <button
            className={`auth-tab ${tab === "register" ? "auth-tab--active" : ""}`}
            onClick={() => switchTab("register")}
          >Register</button>
        </div>

        <h2 className="auth-title">
          {tab === "login" ? "Welcome Back!" : "Create Account"}
        </h2>
        <p className="auth-subtitle">
          {tab === "login"
            ? "Sign in to continue planning your trips"
            : "Join TravelEase — plan smarter, travel better"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder={tab === "login" ? "Your name" : "e.g. Priya Sharma"}
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({...p, name: ""})); }}
              className={errors.name ? "auth-input--error" : ""}
            />
            {errors.name && <span className="auth-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="priya@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
              className={errors.email ? "auth-input--error" : ""}
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder={tab === "register" ? "Min 6 characters" : "Your password"}
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
              className={errors.password ? "auth-input--error" : ""}
            />
            {errors.password && <span className="auth-error">{errors.password}</span>}
          </div>

          {/* Confirm Password — register only */}
          {tab === "register" && (
            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirm}
                onChange={e => { setConfirm(e.target.value); setErrors(p => ({...p, confirm: ""})); }}
                className={errors.confirm ? "auth-input--error" : ""}
              />
              {errors.confirm && <span className="auth-error">{errors.confirm}</span>}
            </div>
          )}

          <button type="submit" className="auth-btn-primary auth-submit">
            {tab === "login" ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        {/* Switch tab hint */}
        <p className="auth-switch">
          {tab === "login"
            ? <>New to TravelEase? <button onClick={() => switchTab("register")}>Register here</button></>
            : <>Already have an account? <button onClick={() => switchTab("login")}>Sign in</button></>
          }
        </p>

        {/* Guest skip */}
        <div className="auth-divider-row"><span>or</span></div>
        <Link to="/" className="auth-guest-btn">Continue as Guest</Link>

      </div>
    </div>
  );
};

export default AuthPage;
