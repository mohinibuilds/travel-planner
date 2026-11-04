import React, { useState } from "react";
import "./InTripAssistant.css";

const localTransport = {
  "Jaipur":  [
    { mode: "Auto Rickshaw", from: "₹20", note: "Always insist on meter" },
    { mode: "City Bus",      from: "₹10", note: "RSRTC — goes to Hawa Mahal" },
    { mode: "E-Rickshaw",    from: "₹15", note: "Popular in the old bazaar area" },
  ],
  "Manali":  [
    { mode: "Local Bus",  from: "₹15",       note: "Manali – Solang Valley route" },
    { mode: "Taxi",       from: "₹500",      note: "To Rohtang (shared: ₹150)" },
    { mode: "Bike Rent",  from: "₹400/day",  note: "Available near most hotels" },
  ],
  "Goa":     [
    { mode: "Scooter Rent", from: "₹300/day", note: "Best option — explore freely" },
    { mode: "Auto",         from: "₹50",      note: "Bargaining required" },
    { mode: "Taxi",         from: "₹200",     note: "OLA/Uber available" },
  ],
  "Varanasi": [
    { mode: "Auto Rickshaw",   from: "₹30",       note: "Avoid solo travel at night" },
    { mode: "Cycle Rickshaw",  from: "₹20",       note: "Popular near the Ghats" },
    { mode: "Boat (Naav)",     from: "₹100/hour", note: "Ganga river cruise" },
  ],
  "Mumbai":  [
    { mode: "Local Train", from: "₹10", note: "Fastest — avoid rush hour" },
    { mode: "BEST Bus",    from: "₹5",  note: "AC: ₹15" },
    { mode: "Auto",        from: "₹30", note: "Meter is mandatory" },
  ],
  "Default": [
    { mode: "Auto/Rickshaw", from: "₹20–50", note: "Negotiate fare before boarding" },
    { mode: "City Bus",      from: "₹5–20",  note: "Cheap but can be crowded" },
    { mode: "OLA/Uber",      from: "₹80+",   note: "Safe and transparent pricing" },
  ],
};

const offlineItems = [
  { icon: "🗺️", title: "Offline Map",         desc: "Google Maps → 'Offline Maps' → Download your area", size: "~50MB" },
  { icon: "📋", title: "Trip Plan",            desc: "Save this page as PDF / Screenshot", size: "~1MB" },
  { icon: "🏨", title: "Hotel Booking",        desc: "Save booking confirmation screenshot", size: "~100KB" },
  { icon: "🚂", title: "Ticket PDF",           desc: "Download IRCTC / Flight ticket PDF", size: "~200KB" },
  { icon: "📞", title: "Emergency Numbers",    desc: "Police: 100, Ambulance: 108, Tourist Helpline: 1363", size: "—" },
  { icon: "💊", title: "First Aid Info",       desc: "Learn to recognise AMS symptoms at high altitude", size: "—" },
];

const fraudTips = [
  { icon: "🚗", title: "Taxi Scam",       tip: "Never board an Auto/Taxi without agreeing on the meter or fare first. OLA/Uber is the safest option." },
  { icon: "🏨", title: "Hotel Switch",    tip: "'That hotel is closed' — this is almost always false. Call the hotel directly before believing anyone." },
  { icon: "💎", title: "Gem Store Scam", tip: "If the driver suggests 'my friend's shop', politely decline. It is almost always a commission scam." },
  { icon: "📸", title: "Photo Scam",     tip: "At Agra, photographers may demand money after snapping your photo — clarify upfront." },
  { icon: "🎫", title: "Fake Tickets",   tip: "Buy tickets only from official ASI / government counters. Never from touts." },
];

const InTripAssistant = () => {
  const [city, setCity]     = useState("Jaipur");
  const [activeTab, setTab] = useState("transport");
  const [downloaded, setDl] = useState([]);

  const transport = localTransport[city] || localTransport["Default"];

  const toggleDownload = (title) => {
    setDl(d => d.includes(title) ? d.filter(x => x !== title) : [...d, title]);
  };

  return (
    <div className="page-container fade-in">
      {/* Hero */}
      <div className="itr-hero">
        <div className="itr-hero-badge">🧭 In-Trip Assistant</div>
        <h1 className="itr-hero-title">In-Trip Help</h1>
        <p className="itr-hero-sub">Offline plan, local transport guide, scam prevention tips — everything in one place</p>
      </div>

      {/* City Selector */}
      <div className="itr-city-row card">
        <label>📍 Which city are you currently in?</label>
        <div className="itr-city-chips">
          {Object.keys(localTransport).filter(k => k !== "Default").map(c => (
            <button
              key={c}
              className={`city-chip ${city === c ? "active" : ""}`}
              onClick={() => setCity(c)}
            >{c}</button>
          ))}
          <button
            className={`city-chip ${!Object.keys(localTransport).includes(city) || city === "Default" ? "active" : ""}`}
            onClick={() => setCity("Default")}
          >Other</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="itr-tabs">
        {[
          { key: "transport", label: "🚌 Local Transport" },
          { key: "offline",   label: "📥 Offline Plan" },
          { key: "fraud",     label: "⚠️ Avoid Scams" },
        ].map(t => (
          <button
            key={t.key}
            className={`itr-tab ${activeTab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >{t.label}</button>
        ))}
      </div>

      {/* Transport Tab */}
      {activeTab === "transport" && (
        <div className="itr-panel fade-in">
          <div className="itr-panel-title">🚌 {city} — Local Transport Guide</div>
          <div className="transport-guide-list">
            {transport.map((t, i) => (
              <div key={i} className="tg-item card">
                <div className="tg-mode">{t.mode}</div>
                <div className="tg-fare">💰 Starting from: <strong>{t.from}</strong></div>
                <div className="tg-note">💡 {t.note}</div>
              </div>
            ))}
          </div>
          <div className="fraud-tip-box">
            <span>⚠️</span>
            <div>
              <strong>Tip:</strong> Always negotiate or confirm the fare before boarding.
              Confirm your destination and price before sitting in any Auto/Cab.
              Avoid travelling alone late at night.
            </div>
          </div>
        </div>
      )}

      {/* Offline Tab */}
      {activeTab === "offline" && (
        <div className="itr-panel fade-in">
          <div className="itr-panel-title">📥 Offline Download Checklist</div>
          <p className="itr-panel-sub">Download these before you travel — useful when there is no network</p>
          <div className="offline-list">
            {offlineItems.map((item, i) => (
              <div key={i} className={`offline-item card ${downloaded.includes(item.title) ? "done" : ""}`}>
                <span className="oi-icon">{item.icon}</span>
                <div className="oi-content">
                  <div className="oi-title">{item.title}</div>
                  <div className="oi-desc">{item.desc}</div>
                  {item.size !== "—" && <div className="oi-size">📦 {item.size}</div>}
                </div>
                <button
                  className={`oi-btn ${downloaded.includes(item.title) ? "done" : ""}`}
                  onClick={() => toggleDownload(item.title)}
                >
                  {downloaded.includes(item.title) ? "✓ Done" : "↓ Save"}
                </button>
              </div>
            ))}
          </div>
          <div className="dl-progress">
            <div className="dp-label">{downloaded.length}/{offlineItems.length} ready</div>
            <div className="dp-track">
              <div className="dp-fill" style={{ width: `${(downloaded.length / offlineItems.length) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Fraud Tab */}
      {activeTab === "fraud" && (
        <div className="itr-panel fade-in">
          <div className="itr-panel-title">⚠️ Common Scams & How to Avoid Them</div>
          <p className="itr-panel-sub">The most frequent scams targeting tourists and how to stay safe</p>
          <div className="fraud-list">
            {fraudTips.map((f, i) => (
              <div key={i} className="fraud-item card">
                <span className="fi-icon">{f.icon}</span>
                <div>
                  <div className="fi-title">{f.title}</div>
                  <div className="fi-tip">{f.tip}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="emergency-box">
            <div className="em-title">🆘 Emergency Numbers</div>
            <div className="em-grid">
              {[["Police", "100"], ["Ambulance", "108"], ["Fire", "101"], ["Tourist Helpline", "1363"], ["Women Helpline", "1091"], ["Highway Patrol", "1033"]].map(([l, n]) => (
                <div key={l} className="em-item">
                  <div className="em-label">{l}</div>
                  <div className="em-number">{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InTripAssistant;
