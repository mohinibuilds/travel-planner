import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import "./AIItinerary.css";

const interests = [
  { key: "nature",     label: "Nature",     icon: "🌿" },
  { key: "history",    label: "Historical", icon: "🏛️" },
  { key: "trekking",   label: "Trekking",   icon: "⛰️" },
  { key: "beach",      label: "Beach",      icon: "🏖️" },
  { key: "food",       label: "Food Tour",  icon: "🍽️" },
  { key: "spiritual",  label: "Spiritual",  icon: "🕌" },
  { key: "adventure",  label: "Adventure",  icon: "🪂" },
  { key: "culture",    label: "Art & Culture", icon: "🎭" },
];

const weatherIcons = { sunny: "☀️", rainy: "🌧️", cloudy: "⛅" };

const samplePlans = {
  nature: [
    { time: "06:00", activity: "Morning jungle safari / nature walk", type: "outdoor", alt: "🏞️ Nature museum visit" },
    { time: "08:30", activity: "Fresh breakfast at a local dhaba", type: "food", alt: "🏠 Breakfast at the hotel" },
    { time: "10:00", activity: "Waterfall / riverside walk", type: "outdoor", alt: "🎬 Documentary screening" },
    { time: "13:00", activity: "Lunch + rest", type: "food", alt: "🍽️ Lunch + rest" },
    { time: "15:00", activity: "Bird watching / trail hike", type: "outdoor", alt: "🖼️ Local art gallery" },
    { time: "18:00", activity: "Sunset viewpoint", type: "outdoor", alt: "☕ Evening at a café" },
    { time: "20:00", activity: "Campfire + stargazing", type: "outdoor", alt: "🍛 Dinner" },
  ],
  history: [
    { time: "07:00", activity: "Fort / temple — morning visit", type: "outdoor", alt: "📚 Heritage museum" },
    { time: "09:30", activity: "Museum + archaeological site", type: "indoor", alt: "📚 Heritage museum" },
    { time: "12:30", activity: "Lunch in the historic market", type: "food", alt: "🍽️ Lunch at a nearby restaurant" },
    { time: "14:00", activity: "Guided heritage walk", type: "outdoor", alt: "🎬 Heritage documentary" },
    { time: "17:00", activity: "Sunset photo at the fort", type: "outdoor", alt: "☕ Café + magazine reading" },
    { time: "19:00", activity: "Light & sound show", type: "indoor", alt: "🍛 Dinner + rest" },
    { time: "21:00", activity: "Night stroll in the old city", type: "outdoor", alt: "🛌 Rest" },
  ],
  trekking: [
    { time: "05:00", activity: "Trek begins — base camp", type: "outdoor", alt: "🏕️ Stay at camp" },
    { time: "08:00", activity: "Mid-point stop + energy snack", type: "food", alt: "🥪 Packed breakfast" },
    { time: "11:00", activity: "Reach summit / viewpoint", type: "outdoor", alt: "🔭 Scenic viewpoint" },
    { time: "13:00", activity: "Lunch at the summit (packed)", type: "food", alt: "🍱 Packed lunch" },
    { time: "15:00", activity: "Return trek", type: "outdoor", alt: "🚐 Vehicle return" },
    { time: "18:00", activity: "Rest + massage / spa", type: "indoor", alt: "🛌 Rest at hotel" },
    { time: "20:00", activity: "Dinner at a trekkers café", type: "food", alt: "🍛 Dinner at hotel" },
  ],
};

const defaultPlan = samplePlans.nature;

const generatePlan = (interest, days, budget, weather) => {
  const base = samplePlans[interest] || defaultPlan;
  return Array.from({ length: days }, (_, d) => ({
    day: d + 1,
    weather: weather[d] || "sunny",
    activities: base.map(a => ({
      ...a,
      activity: weather[d] === "rainy" && a.type === "outdoor" ? a.alt : a.activity,
    })),
  }));
};

const AIItinerary = () => {
  const navigate = useNavigate();
  const { setTripDetails } = useTrip();
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(10000);
  const [selected, setSelected] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherSim] = useState(["sunny", "rainy", "sunny", "cloudy", "sunny", "rainy", "sunny"]);

  const toggleInterest = (key) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleGenerate = () => {
    if (!destination || selected.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      const primary = selected[0];
      setPlan(generatePlan(primary, days, budget, weatherSim));
      setLoading(false);
      setStep(2);
    }, 1800);
  };

  const budgetPerDay = Math.round(budget / days);

  return (
    <div className="page-container fade-in">
      <div className="ai-hero">
        <div className="ai-hero-badge">🤖 AI-Powered</div>
        <h1 className="ai-hero-title">Smart Trip Planner</h1>
        <p className="ai-hero-sub">Enter your budget, days & interests — AI builds your complete hourly itinerary in one click</p>
      </div>

      {step === 1 && (
        <div className="ai-form card">
          <div className="ai-field">
            <label>📍 Where do you want to go?</label>
            <input
              type="text"
              placeholder="e.g. Manali, Goa, Jaipur..."
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
          </div>

          <div className="ai-row">
            <div className="ai-field">
              <label>📅 How many days?</label>
              <div className="ai-counter">
                <button onClick={() => setDays(d => Math.max(1, d - 1))}>−</button>
                <span>{days} days</span>
                <button onClick={() => setDays(d => Math.min(14, d + 1))}>+</button>
              </div>
            </div>
            <div className="ai-field">
              <label>💰 Total Budget (₹)</label>
              <input
                type="number"
                min={1000}
                step={500}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
              />
              <span className="ai-hint">≈ ₹{budgetPerDay.toLocaleString()} per day</span>
            </div>
          </div>

          <div className="ai-field">
            <label>❤️ Select your interests (one or more)</label>
            <div className="interest-grid">
              {interests.map(i => (
                <button
                  key={i.key}
                  className={`interest-chip ${selected.includes(i.key) ? "active" : ""}`}
                  onClick={() => toggleInterest(i.key)}
                >
                  <span>{i.icon}</span>
                  <span>{i.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="weather-notice">
            <span>🌦️</span>
            <div>
              <strong>Real-time weather adaptation:</strong> If it rains, AI will automatically suggest indoor alternatives.
              <span className="weather-sim-chips">
                {weatherSim.slice(0, days).map((w, i) => (
                  <span key={i} className={`wsim wsim-${w}`}>{weatherIcons[w]} Day {i + 1}</span>
                ))}
              </span>
            </div>
          </div>

          <button
            className="btn-primary ai-generate-btn"
            onClick={handleGenerate}
            disabled={!destination || selected.length === 0}
          >
            {loading ? "🤖 AI is building your plan..." : "✨ Generate One-Click Plan"}
          </button>
        </div>
      )}

      {loading && (
        <div className="ai-loading card">
          <div className="ai-spinner" />
          <p>AI is creating your {days}-day {destination} itinerary...</p>
        </div>
      )}

      {step === 2 && plan && (
        <>
          <div className="plan-header card">
            <div className="plan-title">📍 {destination} — {days}-Day Plan</div>
            <div className="plan-meta">
              <span>💰 Budget: ₹{budget.toLocaleString()}</span>
              <span>🎯 {selected.map(s => interests.find(i => i.key === s)?.label).join(", ")}</span>
              <button className="btn-secondary plan-back-btn" onClick={() => setStep(1)}>✏️ Edit</button>
            </div>
          </div>

          {plan.map(day => (
            <div key={day.day} className="day-card card">
              <div className="day-header">
                <div className="day-number">Day {day.day}</div>
                <div className={`day-weather weather-${day.weather}`}>
                  {weatherIcons[day.weather]}{" "}
                  {day.weather === "rainy" ? "Rainy — indoor alternatives active"
                    : day.weather === "cloudy" ? "Cloudy weather"
                    : "Clear sunny day"}
                </div>
              </div>
              <div className="timeline">
                {day.activities.map((a, i) => (
                  <div key={i} className={`timeline-item ${day.weather === "rainy" && a.type === "food" || a.type === "indoor" ? "indoor-item" : ""}`}>
                    <div className="tl-time">{a.time}</div>
                    <div className="tl-dot" />
                    <div className="tl-content">
                      <div className="tl-activity">{a.activity}</div>
                      {day.weather === "rainy" && (
                        <span className="tl-badge indoor-badge">🏠 Indoor alternative</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="plan-actions-row" style={{ display:"flex", gap:12, marginBottom:16 }}>
            <button className="btn-primary" onClick={() => { setTripDetails(prev => ({...prev, to: destination})); navigate("/search"); }}>
              ✈️ Book This Trip
            </button>
            <button className="btn-secondary" onClick={() => setStep(1)}>✏️ Change Plan</button>
          </div>

          <div className="budget-breakdown card">
            <div className="section-title">💰 Budget Breakdown</div>
            <div className="budget-bars">
              {[
                { label: "🏨 Hotel",      pct: 40, color: "#1A56DB" },
                { label: "🚌 Transport",  pct: 25, color: "#05A660" },
                { label: "🍽️ Food",       pct: 20, color: "#F59E0B" },
                { label: "🎯 Activities", pct: 15, color: "#E84393" },
              ].map(b => (
                <div key={b.label} className="budget-bar-row">
                  <span className="bb-label">{b.label}</span>
                  <div className="bb-track">
                    <div className="bb-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                  </div>
                  <span className="bb-amount">₹{Math.round(budget * b.pct / 100).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIItinerary;
