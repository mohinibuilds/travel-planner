import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { popularRoutes } from "../data/travelData";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { setTripDetails } = useTrip();

  const [activeTab, setActiveTab] = useState("flights");

  const quickServices = [
    { icon: "✈️", label: "Flights",    tab: "flights",  color: "#1A56DB" },
    { icon: "🚂", label: "Trains",     tab: "trains",   color: "#10B981" },
    { icon: "🚌", label: "Buses",      tab: "buses",    color: "#F59E0B" },
    { icon: "🏨", label: "Hotels",     tab: "hotels",   color: "#E84393" },
    { icon: "🔗", label: "Multi-Hop",  tab: "multihop", color: "#7C3AED" },
    { icon: "🗓️", label: "Itinerary", tab: "itinerary",color: "#06B6D4" },
    { icon: "₹0", label: "Zero Fee",   tab: "zerofee",  color: "#05A660" },
    { icon: "📊", label: "My Trip",    tab: "mytrip",   color: "#64748B" },
  ];

  const handleService = (tab) => {
    const routes = {
      flights: "/search", trains: "/search", buses: "/search",
      hotels: "/hotels", multihop: "/multihop",
      itinerary: "/itinerary", zerofee: "/zerofee", mytrip: "/summary"
    };
    navigate(routes[tab] || "/search");
  };

  const handlePopularRoute = (route) => {
    setTripDetails(prev => ({ ...prev, from: route.from, to: route.to }));
    navigate("/search");
  };

  const offers = [
    { icon: "✈️", title: "FLAT 30% OFF", subtitle: "On first flight booking", code: "FIRST30", color: "#1A56DB", bg: "#EEF3FF" },
    { icon: "🏨", title: "Hotels @ ₹499", subtitle: "Budget stays across India", code: "HOTEL499", color: "#E84393", bg: "#FFF0F7" },
    { icon: "🚂", title: "Train Booking", subtitle: "Zero convenience fee", code: "ZEROTRAIN", color: "#10B981", bg: "#F0FDF4" },
    { icon: "🔗", title: "Multi-Hop Routes", subtitle: "Reach any village in India", code: "MULTIHOP", color: "#7C3AED", bg: "#F5F3FF" },
  ];

  const whyUs = [
    { icon: "₹0", title: "Zero Platform Fee", desc: "Unlike MakeMyTrip's ₹149–499 fee, we charge nothing. Payment goes directly to providers.", color: "#05A660" },
    { icon: "🔗", title: "Multi-Hop Smart Routes", desc: "Chains buses, trains & auto for towns not directly connected by any single mode.", color: "#7C3AED" },
    { icon: "⚡", title: "Real-Time Risk Simulator", desc: "Simulates 15+ travel disruptions and gives instant alternatives with cost impact.", color: "#0EA5E9" },
    { icon: "700+", title: "Locations Covered", desc: "Cities, towns, villages, hill stations, pilgrim spots — all 28 states + UTs.", color: "#E84393" },
  ];

  const stats = [
    { num: "700+", label: "Locations" },
    { num: "4",    label: "Transport Modes" },
    { num: "28",   label: "States" },
    { num: "₹0",   label: "Platform Fee" },
  ];

  return (
    <div className="home">

      {/* ── Hero Banner (MMT style) ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-tag">🇮🇳 India's Smartest Travel Planner</div>
          <h1 className="hero-title">
            Where Do You Want<br />
            <span className="hero-highlight">To Go Today?</span>
          </h1>
          <p className="hero-sub">
            Flights · Trains · Buses · Hotels · Multi-Hop routes<br />
            <strong>Zero platform fee. Zero middleman.</strong>
          </p>

          {/* Quick Search Card */}
          <div className="hero-search-card">
            {/* Service Tabs */}
            <div className="hs-tabs">
              {[
                { id: "flights", icon: "✈️", label: "Flights" },
                { id: "trains",  icon: "🚂", label: "Trains" },
                { id: "buses",   icon: "🚌", label: "Buses" },
                { id: "hotels",  icon: "🏨", label: "Hotels" },
              ].map(t => (
                <button key={t.id}
                  className={`hs-tab ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setActiveTab(t.id)}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>

            {/* Search Row */}
            <div className="hs-search-row">
              <div className="hs-field">
                <div className="hs-field-label">FROM</div>
                <div className="hs-field-value" onClick={() => navigate("/search")}>
                  <span className="hs-dot from" />
                  Select City
                </div>
              </div>
              <button className="hs-swap" onClick={() => navigate("/search")}>⇄</button>
              <div className="hs-field">
                <div className="hs-field-label">TO</div>
                <div className="hs-field-value" onClick={() => navigate("/search")}>
                  <span className="hs-dot to" />
                  Select City
                </div>
              </div>
              <div className="hs-field hs-date">
                <div className="hs-field-label">DATE</div>
                <div className="hs-field-value" onClick={() => navigate("/search")}>
                  📅 Select Date
                </div>
              </div>
              <button className="hs-search-btn" onClick={() => navigate("/search")}>
                🔍 Search
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="hero-stats">
            {stats.map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="stat-div" />}
                <div className="stat-item">
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Service Icons (MMT style grid) ────────────────────────────── */}
      <section className="services-section">
        <div className="page-container" style={{ paddingBottom: 0 }}>
          <div className="services-grid">
            {quickServices.map((s, i) => (
              <button key={i} className="service-btn" onClick={() => handleService(s.tab)}>
                <div className="service-icon-wrap" style={{ background: s.color + "18", color: s.color }}>
                  <span className="service-icon">{s.icon}</span>
                </div>
                <span className="service-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offers / Deals (MMT style cards) ────────────────────────────────── */}
      <section className="offers-section">
        <div className="page-container" style={{ paddingTop: 20, paddingBottom: 0 }}>
          <div className="section-header-row">
            <h2 className="section-title">🔥 Exclusive Deals</h2>
            <button className="see-all-btn" onClick={() => navigate("/search")}>See All →</button>
          </div>
          <div className="offers-scroll">
            {offers.map((o, i) => (
              <div key={i} className="offer-card" style={{ background: o.bg, borderColor: o.color + "40" }}
                onClick={() => navigate("/search")}>
                <div className="offer-icon" style={{ color: o.color }}>{o.icon}</div>
                <div className="offer-info">
                  <div className="offer-title" style={{ color: o.color }}>{o.title}</div>
                  <div className="offer-sub">{o.subtitle}</div>
                  <div className="offer-code">USE: <strong>{o.code}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Routes ───────────────────────────────────────────────────── */}
      <section className="popular-section">
        <div className="page-container" style={{ paddingTop: 20, paddingBottom: 0 }}>
          <div className="section-header-row">
            <h2 className="section-title">🌟 Popular Routes</h2>
            <button className="see-all-btn" onClick={() => navigate("/search")}>View All →</button>
          </div>
          <div className="routes-scroll">
            {popularRoutes.slice(0, 8).map((route, i) => (
              <div key={i} className="route-card" onClick={() => handlePopularRoute(route)}>
                <div className="route-tag-pill">{route.tag}</div>
                <div className="route-cities">
                  <div className="route-city-from">{route.from}</div>
                  <div className="route-arrow-wrap">
                    <div className="route-line-dot" />
                    <div className="route-dashed" />
                    <span className="route-plane">✈️</span>
                    <div className="route-dashed" />
                    <div className="route-line-dot" />
                  </div>
                  <div className="route-city-to">{route.to}</div>
                </div>
                <div className="route-cta">Plan This Trip →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why TravelEase ───────────────────────────────────────────────────── */}
      <section className="why-section">
        <div className="page-container" style={{ paddingTop: 28 }}>
          <div className="why-header">
            <div className="why-badge">🎓 Final Year Project</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Why TravelEase Beats MakeMyTrip
            </h2>
            <p className="section-subtitle" style={{ textAlign: "center" }}>
              4 features no commercial app offers today
            </p>
          </div>
          <div className="why-grid">
            {whyUs.map((w, i) => (
              <div key={i} className="why-card card">
                <div className="why-icon" style={{ background: w.color + "18", color: w.color }}>
                  {w.icon}
                </div>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </div>
            ))}
          </div>

          {/* 3 Innovations */}
          <div className="innovations">
            {[
              {
                num: "01", icon: "🔗", color: "#7C3AED",
                title: "Multi-Hop Optimizer",
                desc: "Chains local buses + trains for towns like Jalna → Igatpuri via Nashik automatically.",
                path: "/multihop", badge: "Smart Algorithm"
              },
              {
                num: "02", icon: "⚡", color: "#1A56DB",
                title: "Risk Simulator",
                desc: "15+ real India travel risks. Click any disruption to get instant alternatives.",
                path: "/itinerary", badge: "Real-time AI"
              },
              {
                num: "03", icon: "₹0", color: "#05A660",
                title: "Zero-Fee UPI",
                desc: "Direct UPI to IRCTC/MSRTC/Airline. No ₹149–499 convenience fee ever.",
                path: "/zerofee", badge: "Zero Fee"
              }
            ].map((inn, i) => (
              <div key={i} className="inn-card" style={{ "--c": inn.color }}>
                <div className="inn-num" style={{ color: inn.color }}>{inn.num}</div>
                <div className="inn-badge-pill" style={{ background: inn.color + "18", color: inn.color }}>
                  {inn.badge}
                </div>
                <div className="inn-icon">{inn.icon}</div>
                <h3 className="inn-title">{inn.title}</h3>
                <p className="inn-desc">{inn.desc}</p>
                <button className="inn-btn" style={{ background: inn.color }}
                  onClick={() => navigate(inn.path)}>
                  Try Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-icon">🚀</div>
          <h2>Plan Your Dream Trip Now</h2>
          <p>600+ destinations · Compare transport · Book hotels · Zero fee</p>
          <div className="cta-btns">
            <button className="cta-btn-primary" onClick={() => navigate("/search")}>
              ✈️ Start Planning
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate("/multihop")}>
              🔗 Multi-Hop Routes
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="home-footer">
        <div className="footer-logo">
          <img src="/icons/icon-96.png" alt="TravelEase" className="footer-logo-img" />
          <div>
            <div className="footer-brand">TravelEase</div>
            <div className="footer-tagline">Smart India Travel Planner</div>
          </div>
        </div>
        <div className="footer-links">
          <a href="/search">Plan Trip</a>
          <a href="/multihop">Multi-Hop</a>
          <a href="/itinerary">Itinerary</a>
          <a href="/zerofee">Zero Fee</a>
          <a href="/summary">My Trip</a>
        </div>
        <div className="footer-copy">
          © 2025 TravelEase — Final Year Project &nbsp;|&nbsp;
          Built with React · Zero Platform Fee
        </div>
      </footer>

    </div>
  );
};

export default Home;
