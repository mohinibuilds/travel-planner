import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

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
