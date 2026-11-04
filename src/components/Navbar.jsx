import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

// Top navigation links (desktop)
const topLinks = [
  { path: "/search",    label: "Plan Trip",    icon: "✈️" },
  { path: "/ai-plan",   label: "AI Planner",   icon: "🤖",  badge: "AI",  badgeColor: "#1A56DB" },
  { path: "/offbeat",   label: "Hidden Gems",  icon: "💎",  badge: "New", badgeColor: "#047857" },
  { path: "/group",     label: "Group Trip",   icon: "👥",  badge: "New", badgeColor: "#7C3AED" },
  { path: "/budget",    label: "Budget",       icon: "💡",  badge: "New", badgeColor: "#D97706" },
  { path: "/in-trip",   label: "In-Trip",      icon: "🧭",  badge: "New", badgeColor: "#0F172A" },
  { path: "/multihop",  label: "Multi-Hop",    icon: "🔗" },
  { path: "/zerofee",   label: "₹0 Fee",       icon: "💚" },
  { path: "/summary",   label: "My Trip",      icon: "📋" },
];

// Bottom navigation tabs (mobile — MakeMyTrip style)
const bottomTabs = [
  { path: "/",          label: "Home",      icon: "🏠",  activeIcon: "🏠" },
  { path: "/search",    label: "Plan",      icon: "✈️",  activeIcon: "✈️" },
  { path: "/ai-plan",   label: "AI",        icon: "🤖",  activeIcon: "🤖" },
  { path: "/offbeat",   label: "Gems",      icon: "💎",  activeIcon: "💎" },
  { path: "/group",     label: "Group",     icon: "👥",  activeIcon: "👥" },
  { path: "/budget",    label: "Budget",    icon: "💡",  activeIcon: "💡" },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: "", email: "" });
  const { user, login, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.name.trim() && loginForm.email.trim()) {
      login(loginForm.name.trim(), loginForm.email.trim());
      setShowLogin(false);
      setLoginForm({ name: "", email: "" });
    }
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      {/* ── Top Navbar ───────────────────────────────────────────────────────── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-icon-wrap">
              <img src="/icons/icon-96.png" alt="TravelEase" className="logo-img" />
            </div>
            <div className="logo-text-wrap">
              <span className="logo-name">TravelEase</span>
              <span className="logo-tagline">Smart India Travel</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {topLinks.map(l => (
              <Link key={l.path} to={l.path}
                className={`nav-link ${isActive(l.path) ? "active" : ""}`}>
                <span className="nl-icon">{l.icon}</span>
                <span className="nl-label">{l.label}</span>
                {l.badge && (
                  <span className="nav-badge" style={{ background: l.badgeColor }}>
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="nav-right">
            <button className="nav-plan-btn" onClick={() => navigate("/search")}>
              Plan Trip ✈️
            </button>

            {/* ── Login Status Badge — Tailwind ── */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 cursor-pointer"
                  onClick={() => logout()}>
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {user.avatar}
                  </div>
                  <span className="text-xs font-semibold text-green-700 hidden sm:inline">{user.name}</span>
                  <span className="text-xs text-green-500 hidden sm:inline">· Logout</span>
                </div>
              </div>
            ) : (
              <button
                className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                onClick={() => setShowLogin(true)}
              >
                <span>👤</span> Login
              </button>
            )}

            <button className="hamburger" onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu">
              <span className={`ham-line ${menuOpen ? "open" : ""}`} />
              <span className={`ham-line ${menuOpen ? "open" : ""}`} />
              <span className={`ham-line ${menuOpen ? "open" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="mobile-menu fade-in">
            <div className="mobile-menu-grid">
              {topLinks.map(l => (
                <Link key={l.path} to={l.path}
                  className={`mobile-link ${isActive(l.path) ? "active" : ""}`}>
                  <span className="ml-icon">{l.icon}</span>
                  <span className="ml-label">{l.label}</span>
                  {l.badge && (
                    <span className="nav-badge" style={{ background: l.badgeColor }}>
                      {l.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Login Modal — Tailwind ──────────────────────────────────────────────── */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowLogin(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4"
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">✈️</div>
              <h2 className="text-xl font-bold text-gray-800">Welcome to TravelEase</h2>
              <p className="text-sm text-gray-500 mt-1">Sign in to track your trips</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Rahul Sharma"
                  value={loginForm.name}
                  onChange={e => setLoginForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="rahul@example.com"
                  value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <button type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                Sign In ✈️
              </button>
            </form>
            <button className="w-full text-center text-xs text-gray-400 mt-4 hover:text-gray-600"
              onClick={() => setShowLogin(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom Tab Bar (Mobile — MakeMyTrip style) ───────────────────────── */}
      <nav className="bottom-nav">
        {bottomTabs.map(t => {
          const active = isActive(t.path);
          return (
            <Link key={t.path} to={t.path}
              className={`bottom-tab ${active ? "active" : ""}`}>
              <span className="bt-icon">{active ? t.activeIcon : t.icon}</span>
              <span className="bt-label">{t.label}</span>
              {active && <span className="bt-indicator" />}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
