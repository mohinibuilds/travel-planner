import React, { useState } from "react";
import { allCities, buildMultiHopRoutes } from "../data/multiHopData.js";
import "./MultiHop.css";

const modeIcon  = { flight:"✈️", train:"🚂", bus:"🚌", jeep:"🛻", auto:"🛺", cab:"🚗" };
const modeColor = { flight:"#3B82F6", train:"#10B981", bus:"#F59E0B", jeep:"#8B5CF6", auto:"#EC4899", cab:"#6B7280" };
const modeLabel = { flight:"Flight", train:"Train", bus:"Bus / ST", jeep:"Shared Jeep", auto:"Auto", cab:"Cab" };

const today = new Date().toISOString().split("T")[0];

export default function MultiHop() {
  const [from, setFrom]         = useState("");
  const [to, setTo]             = useState("");
  const [passengers, setPass]   = useState(1);
  const [date, setDate]         = useState("");
  const [routes, setRoutes]     = useState(null);
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!from) e.from = "Select departure";
    if (!to)   e.to   = "Select destination";
    if (from === to && from) e.to = "Must differ from departure";
    if (!date) e.date = "Select travel date";
    return e;
  };

  const handleSearch = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    const result = buildMultiHopRoutes(from, to, passengers);
    setRoutes(result);
    setSelected(null);
    setSearched(true);
  };

  const formatDur = (h) => {
    const hrs  = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    return mins ? `${hrs}h ${mins}m` : `${hrs}h`;
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div className="mh-header">
        <div className="mh-badge">✨ Feature 1</div>
        <h2 className="section-title">Smart Multi-Hop Route Optimizer</h2>
        <p className="section-subtitle">
          Chains regional buses, local trains & express services into one seamless itinerary.
          Finds the cheapest path even for smaller towns not directly connected.
        </p>
      </div>

      {/* Search Panel */}
      <div className="mh-search card">
        <div className="mh-search-grid">
          <div className="form-group">
            <label>📍 From</label>
            <select value={from} onChange={e => { setFrom(e.target.value); setErrors(p=>({...p,from:""})); }}
              className={errors.from ? "error" : ""}>
              <option value="">Select city / town</option>
              {allCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.from && <span className="error-msg">{errors.from}</span>}
          </div>

          <div className="mh-swap-wrap">
            <button className="swap-btn" onClick={() => { setFrom(to); setTo(from); }}>⇄</button>
          </div>

          <div className="form-group">
            <label>📍 To</label>
            <select value={to} onChange={e => { setTo(e.target.value); setErrors(p=>({...p,to:""})); }}
              className={errors.to ? "error" : ""}>
              <option value="">Select city / town</option>
              {allCities.filter(c => c !== from).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.to && <span className="error-msg">{errors.to}</span>}
          </div>

          <div className="form-group">
            <label>📅 Date</label>
            <input type="date" value={date} min={today}
              onChange={e => { setDate(e.target.value); setErrors(p=>({...p,date:""})); }}
              className={errors.date ? "error" : ""} />
            {errors.date && <span className="error-msg">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label>👥 Passengers</label>
            <div className="passenger-control">
              <button onClick={() => setPass(p => Math.max(1, p-1))}>−</button>
              <span>{passengers}</span>
              <button onClick={() => setPass(p => Math.min(10, p+1))}>+</button>
            </div>
          </div>
        </div>

        <button className="btn-primary mh-search-btn" onClick={handleSearch}>
          🔍 Find All Routes
        </button>
      </div>

      {/* Info Banner */}
      {!searched && (
        <div className="mh-info-banner">
          <div className="mib-item">
            <span>🏘️</span>
            <div><strong>75+ Cities & Towns</strong><br/>Including regional & tier-3 towns</div>
          </div>
          <div className="mib-item">
            <span>🔗</span>
            <div><strong>Multi-Mode Chaining</strong><br/>Bus + Train + Jeep combined</div>
          </div>
          <div className="mib-item">
            <span>💰</span>
            <div><strong>Lowest Cost First</strong><br/>Jan Shatabdi + ST Bus combos</div>
          </div>
          <div className="mib-item">
            <span>🗺️</span>
            <div><strong>Junction Routing</strong><br/>Via Manmad, Nashik, Nagpur hubs</div>
          </div>
        </div>
      )}

      {/* Results */}
      {searched && routes && (
        <>
          <div className="mh-results-header">
            <h3>Routes found: <strong>{from} → {to}</strong></h3>
            <span className="mh-count">{routes.length} options</span>
          </div>

          {routes.length === 0 && (
            <div className="card mh-empty">
              <div style={{fontSize:48}}>🗺️</div>
              <p>No multi-hop routes found. Try a different city pair.</p>
            </div>
          )}

          <div className="mh-routes-grid">
            {routes.map((route, ri) => (
              <div key={route.id}
                className={`mh-route-card card ${selected?.id === route.id ? "mh-selected" : ""} ${route.lowestCost ? "mh-cheapest" : ""}`}
                onClick={() => setSelected(selected?.id === route.id ? null : route)}>

                {route.lowestCost && <div className="mh-best-badge">💰 Lowest Cost</div>}
                {route.alternative && <div className="mh-alt-badge">🔄 Alternative</div>}

                {/* Route summary row */}
                <div className="mh-route-summary">
                  <div className="mh-route-title">{route.label}</div>
                  <div className="mh-route-meta">
                    <div className="mh-meta-item">⏱ {formatDur(route.totalDuration)}</div>
                    <div className="mh-meta-item mh-transfers">
                      🔄 {route.transfers} transfer{route.transfers !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>

                {/* Leg pills */}
                <div className="mh-leg-pills">
                  {route.legs.map((leg, li) => (
                    <React.Fragment key={li}>
                      <div className="mh-leg-pill" style={{ "--leg-color": modeColor[leg.mode] || "#6B7280" }}>
                        <span>{modeIcon[leg.mode] || "🚀"}</span>
                        <span>{modeLabel[leg.mode] || leg.mode}</span>
                        <span className="mh-leg-dur">{formatDur(leg.duration)}</span>
                      </div>
                      {li < route.legs.length - 1 && (
                        <div className="mh-connector">
                          <span className="mh-connector-arrow">→</span>
                          {leg.layover > 0 && (
                            <span className="mh-layover">{formatDur(leg.layover)} wait</span>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Cost */}
                <div className="mh-cost-row">
                  <div>
                    <div className="mh-total-cost">₹{route.totalCost.toLocaleString()}</div>
                    <div className="mh-per-person">₹{route.costPerPerson.toLocaleString()} per person</div>
                  </div>
                  <button className="mh-expand-btn">
                    {selected?.id === route.id ? "▲ Hide" : "▼ Details"}
                  </button>
                </div>

                {/* Expanded leg details */}
                {selected?.id === route.id && (
                  <div className="mh-leg-details fade-in">
                    <div className="mh-leg-timeline">
                      {route.legs.map((leg, li) => (
                        <div key={li} className="mh-timeline-item">
                          <div className="mh-tl-dot" style={{ background: modeColor[leg.mode] || "#6B7280" }} />
                          <div className="mh-tl-line" style={{ background: li < route.legs.length-1 ? "#E2E8F0" : "transparent" }} />
                          <div className="mh-tl-content">
                            <div className="mh-tl-route">
                              <strong>{leg.from}</strong>
                              <span className="mh-tl-arrow"> → </span>
                              <strong>{leg.to}</strong>
                            </div>
                            <div className="mh-tl-meta">
                              <span className="mh-tl-mode" style={{ background: modeColor[leg.mode]+"22", color: modeColor[leg.mode] }}>
                                {modeIcon[leg.mode]} {modeLabel[leg.mode] || leg.mode}
                              </span>
                              {leg.train && <span className="mh-tl-train">🚂 {leg.train}</span>}
                              <span>📏 {leg.dist} km</span>
                              <span>⏱ {formatDur(leg.duration)}</span>
                              <span className="mh-tl-cost">₹{leg.cost.toLocaleString()}</span>
                            </div>
                            {leg.layover > 0 && (
                              <div className="mh-tl-layover">
                                ⏳ {formatDur(leg.layover)} layover at {leg.to}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="mh-timeline-item">
                        <div className="mh-tl-dot mh-tl-final" />
                        <div className="mh-tl-line" style={{ background: "transparent" }} />
                        <div className="mh-tl-content">
                          <div className="mh-tl-route"><strong>🏁 {to} — Arrived</strong></div>
                        </div>
                      </div>
                    </div>

                    {/* Cost breakdown */}
                    <div className="mh-cost-breakdown">
                      {route.legs.map((leg, li) => (
                        <div key={li} className="mh-cb-row">
                          <span>{modeIcon[leg.mode]} {leg.from} → {leg.to}</span>
                          <span>₹{leg.cost.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="mh-cb-total">
                        <span>Total ({passengers} pax)</span>
                        <span>₹{route.totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
