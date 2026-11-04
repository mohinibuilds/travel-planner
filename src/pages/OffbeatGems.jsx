import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import "./OffbeatGems.css";

const regions = ["All", "Himalayas", "Rajasthan", "Western Ghats", "Northeast India", "Coastal", "Central India"];

const gems = [
  {
    name: "Chopta, Uttarakhand",
    tag: "🌿 Nature",
    region: "Himalayas",
    desc: "Uttarakhand's 'Mini Switzerland'. Home to Tungnath temple — the world's highest Shiva shrine. Almost no crowds.",
    food: "Aloo Paratha + Chai at a local dhaba",
    guide: "Ramji Guide, ₹800/day",
    dist: "200 km from Rishikesh",
    vibe: ["❄️ Snow", "🦅 Birds", "🕌 Temple"],
    img: "🏔️",
    hidden: true,
  },
  {
    name: "Ziro Valley, Arunachal",
    tag: "🎭 Culture",
    region: "Northeast India",
    desc: "UNESCO Tentative Site. Unique Apatani tribal culture. Ziro Music Festival held every September.",
    food: "Apong (Rice Beer) + Pika Pila curry",
    guide: "Local Apatani guide, ₹600/day",
    dist: "115 km from Itanagar",
    vibe: ["🌾 Paddy fields", "🎵 Music", "👘 Traditional"],
    img: "🌾",
    hidden: true,
  },
  {
    name: "Gokarna, Karnataka",
    tag: "🏖️ Beach",
    region: "Coastal",
    desc: "Quieter than Goa. Om Beach and Half Moon Beach — reachable only by trek. Far fewer tourists.",
    food: "Fresh seafood + coconut water at a beach shack",
    guide: "Easy to explore solo",
    dist: "140 km from Goa",
    vibe: ["🌊 Waves", "🧘 Yoga", "🌅 Sunset"],
    img: "🏖️",
    hidden: false,
  },
  {
    name: "Mawlynnong, Meghalaya",
    tag: "🌿 Nature",
    region: "Northeast India",
    desc: "Asia's Cleanest Village. Famous Living Root Bridges are located here.",
    food: "Jadoh (Red Rice + Pork) — home-cooked meal",
    guide: "Khasi guide, ₹500/day",
    dist: "90 km from Shillong",
    vibe: ["🌧️ Rain", "🌉 Root Bridge", "🧹 Cleanliness"],
    img: "🌿",
    hidden: true,
  },
  {
    name: "Jawai, Rajasthan",
    tag: "🦁 Wildlife",
    region: "Rajasthan",
    desc: "Famous for leopards. Far fewer crowds than Ranthambore. Watch leopards on granite boulders.",
    food: "Laal Maas + Bajre ki Roti — home dining in the village",
    guide: "Hemraj Safari Guide, ₹1200/safari",
    dist: "100 km from Jodhpur",
    vibe: ["🐆 Leopard", "🌵 Desert", "🌙 Stargazing"],
    img: "🐆",
    hidden: true,
  },
  {
    name: "Khajjiar, Himachal",
    tag: "🌿 Nature",
    region: "Himalayas",
    desc: "Known as India's 'Mini Switzerland'. A lake sits in the middle of a lush green meadow.",
    food: "Sidu (HP bread) + Dham thali",
    guide: "Easily paired with Dalhousie base",
    dist: "24 km from Dalhousie",
    vibe: ["🌲 Deodar", "⛷️ Snow", "🐴 Horse ride"],
    img: "🏞️",
    hidden: false,
  },
  {
    name: "Agumbe, Karnataka",
    tag: "🌧️ Monsoon",
    region: "Western Ghats",
    desc: "India's Cherrapunji. Home to Rainforest Research Station. Famous for King Cobra. Malgudi Days filmed here.",
    food: "Kundapur Chicken Curry + Neer Dosa",
    guide: "ARRS Forest Guide, ₹700/day",
    dist: "55 km from Udupi",
    vibe: ["🌧️ Rain", "🐍 Cobra", "🌳 Forest"],
    img: "🌧️",
    hidden: true,
  },
  {
    name: "Orchha, Madhya Pradesh",
    tag: "🏛️ Historical",
    region: "Central India",
    desc: "Town on the Betwa river, famous for 16th-century palaces and temples. On the Agra–Khajuraho route.",
    food: "Bundelkhandi Dal Bafla + Gujia",
    guide: "ASI Certified Guide, ₹600/day",
    dist: "16 km from Jhansi",
    vibe: ["🏯 Palace", "🛶 Boating", "🦅 Vultures"],
    img: "🏯",
    hidden: false,
  },
];

const OffbeatGems = () => {
  const navigate = useNavigate();
  const { setTripDetails } = useTrip();
  const [activeRegion, setActiveRegion] = useState("All");
  const [showHidden, setShowHidden] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const planTrip = (gemName) => {
    // Extract city name (before comma if present)
    const city = gemName.split(",")[0].trim();
    setTripDetails(prev => ({ ...prev, to: city }));
    navigate("/search");
  };

  const filtered = gems.filter(g => {
    if (showHidden && !g.hidden) return false;
    if (activeRegion !== "All" && g.region !== activeRegion) return false;
    return true;
  });

  return (
    <div className="page-container fade-in">
      <div className="ob-hero">
        <div className="ob-hero-badge">💎 Hidden Gems</div>
        <h1 className="ob-hero-title">Offbeat & Hidden Gems</h1>
        <p className="ob-hero-sub">Secret spots known only to locals — not easily found on Google, with local food & guide info</p>
      </div>

      <div className="ob-filters">
        <div className="region-chips">
          {regions.map(r => (
            <button
              key={r}
              className={`region-chip ${activeRegion === r ? "active" : ""}`}
              onClick={() => setActiveRegion(r)}
            >{r}</button>
          ))}
        </div>
        <button
          className={`hidden-toggle ${showHidden ? "active" : ""}`}
          onClick={() => setShowHidden(h => !h)}
        >
          🔒 {showHidden ? "Show All" : "Secret Places Only"}
        </button>
      </div>

      <div className="gems-grid">
        {filtered.map((gem, i) => (
          <div
            key={i}
            className={`gem-card card ${expanded === i ? "expanded" : ""}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            {gem.hidden && <div className="gem-secret-badge">🔒 Hidden Gem</div>}
            <div className="gem-emoji">{gem.img}</div>
            <div className="gem-tag">{gem.tag}</div>
            <div className="gem-name">{gem.name}</div>
            <div className="gem-region">📍 {gem.region} • {gem.dist}</div>
            <div className="gem-vibes">
              {gem.vibe.map((v, j) => <span key={j} className="vibe-chip">{v}</span>)}
            </div>
            <p className="gem-desc">{gem.desc}</p>

            {expanded === i && (
              <div className="gem-details fade-in">
                <div className="gem-detail-row">
                  <span className="gd-icon">🍽️</span>
                  <div>
                    <div className="gd-label">Local Food</div>
                    <div className="gd-val">{gem.food}</div>
                  </div>
                </div>
                <div className="gem-detail-row">
                  <span className="gd-icon">🧭</span>
                  <div>
                    <div className="gd-label">Local Guide</div>
                    <div className="gd-val">{gem.guide}</div>
                  </div>
                </div>
                <button className="btn-primary gem-plan-btn" onClick={(e) => { e.stopPropagation(); planTrip(gem.name); }}>✈️ Plan a Trip Here</button>
              </div>
            )}

            <div className="gem-expand-hint">{expanded === i ? "▲ Show less" : "▼ More info"}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state card">
          <div className="empty-icon">🔍</div>
          <h3>No places found</h3>
          <p>Try a different filter</p>
        </div>
      )}
    </div>
  );
};

export default OffbeatGems;
