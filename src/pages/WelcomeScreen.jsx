import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./WelcomeScreen.css";

const WelcomeScreen = () => {
  const { markWelcomeSeen, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimDone(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleGetStarted = () => {
    markWelcomeSeen();
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    markWelcomeSeen();
    navigate("/");
  };

  return (
    <div className="welcome-root">
      {/* Background pattern */}
      <div className="welcome-bg" />

      <div className={`welcome-card ${animDone ? "welcome-card--in" : ""}`}>

        {/* Logo */}
        <div className="welcome-logo-wrap">
          <img src="/icons/icon-96.png" alt="TravelEase" className="welcome-logo-img" />
        </div>

        {/* Brand */}
        <h1 className="welcome-brand">TravelEase</h1>
        <p className="welcome-tagline">India's Smart Travel Planner</p>

        {/* Divider */}
        <div className="welcome-divider" />

        {/* Features list */}
        <ul className="welcome-features">
          <li><span className="wf-icon">✈️</span> Flights · Trains · Buses · Cars</li>
          <li><span className="wf-icon">🔗</span> Multi-Hop Route Optimizer</li>
          <li><span className="wf-icon">🏨</span> Real Hotel Booking with Map</li>
          <li><span className="wf-icon">₹0</span> Zero Platform Fee — Always</li>
          <li><span className="wf-icon">🤖</span> AI Trip Planner + Risk Simulator</li>
        </ul>

        {/* CTA */}
        <button className="welcome-btn-primary" onClick={handleGetStarted}>
          Get Started →
        </button>
        <button className="welcome-btn-skip" onClick={handleSkip}>
          Continue as Guest
        </button>

        {/* Footer note */}
        <p className="welcome-note">
          700+ Locations · 28 States · Free Forever
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
