import React, { useState } from "react";
import "./BudgetOptimizer.css";

const destinations = [
  { name: "Goa",          minBudget: 5000,  tags: ["Beach", "Party"],       transport: "bus/train", hotel: "budget",   days: 3 },
  { name: "Manali",       minBudget: 6000,  tags: ["Mountains", "Snow"],     transport: "bus",       hotel: "budget",   days: 4 },
  { name: "Jaipur",       minBudget: 4000,  tags: ["Forts", "History"],      transport: "train",     hotel: "budget",   days: 2 },
  { name: "Rishikesh",    minBudget: 3500,  tags: ["Yoga", "River"],         transport: "bus",       hotel: "budget",   days: 3 },
  { name: "Darjeeling",   minBudget: 5500,  tags: ["Tea", "Hills"],          transport: "train",     hotel: "budget",   days: 3 },
  { name: "Udaipur",      minBudget: 5000,  tags: ["Lakes", "Palace"],       transport: "train",     hotel: "budget",   days: 3 },
  { name: "Munnar",       minBudget: 7000,  tags: ["Tea Gardens", "Cool"],   transport: "bus/train", hotel: "standard", days: 4 },
  { name: "Hampi",        minBudget: 4500,  tags: ["History", "Ruins"],      transport: "train",     hotel: "budget",   days: 2 },
  { name: "Spiti Valley", minBudget: 12000, tags: ["Adventure", "Remote"],   transport: "bus",       hotel: "budget",   days: 6 },
  { name: "Andaman",      minBudget: 15000, tags: ["Beach", "Diving"],       transport: "flight",    hotel: "standard", days: 5 },
  { name: "Varanasi",     minBudget: 3000,  tags: ["Ghats", "Spiritual"],    transport: "train",     hotel: "budget",   days: 2 },
  { name: "Ooty",         minBudget: 5000,  tags: ["Cool", "Gardens"],       transport: "train",     hotel: "budget",   days: 3 },
  { name: "Coorg",        minBudget: 6000,  tags: ["Coffee", "Forest"],      transport: "bus",       hotel: "standard", days: 3 },
  { name: "Shimla",       minBudget: 5500,  tags: ["Snow", "Colonial"],      transport: "train/bus", hotel: "budget",   days: 3 },
  { name: "Rann of Kutch",minBudget: 8000,  tags: ["Desert", "Festival"],    transport: "bus",       hotel: "standard", days: 3 },
];

const priceHistory = {
  flight: [6200,5800,6500,5200,4800,5100,5600,6000,5500,4900,5300,5700],
  train:  [890, 920, 850, 800, 780, 810, 870, 900, 840, 770, 800, 830],
  hotel:  [1800,1600,2000,1500,1400,1550,1700,1900,1650,1380,1500,1620],
};
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const BudgetOptimizer = () => {
  const [budget, setBudget] = useState(10000);
  const [days, setDays]     = useState(3);
  const [from, setFrom]     = useState("Mumbai");
  const [results, setResults] = useState(null);
  const [priceAlert, setPriceAlert] = useState(null);

  const handleFind = () => {
    const found = destinations.filter(d => {
      const transportCost = d.transport.includes("flight") ? 4500 :
                            d.transport.includes("train")  ? 800  : 600;
      const hotelCost = d.hotel === "luxury" ? 4000 * d.days :
                        d.hotel === "standard" ? 2500 * d.days : 1200 * d.days;
      const totalEst = (transportCost * 2) + hotelCost + (800 * d.days);
      return totalEst <= budget;
    }).map(d => {
      const transportCost = d.transport.includes("flight") ? 4500 :
                            d.transport.includes("train")  ? 800  : 600;
      const hotelCost = d.hotel === "standard" ? 2500 * Math.min(days, d.days) : 1200 * Math.min(days, d.days);
      const foodMisc  = 800 * Math.min(days, d.days);
      const total     = (transportCost * 2) + hotelCost + foodMisc;
      const saving    = budget - total;
      return { ...d, estimated: total, saving, recDays: Math.min(days, d.days), transportCost };
    }).sort((a, b) => b.saving - a.saving);
    setResults(found);
  };

  const findCheapMonth = (type) => {
    const data = priceHistory[type];
    const minVal = Math.min(...data);
    const minIdx = data.indexOf(minVal);
    const maxVal = Math.max(...data);
    const maxIdx = data.indexOf(maxVal);
    setPriceAlert({ type, minMonth: months[minIdx], minVal, maxMonth: months[maxIdx], maxVal });
  };

  return (
    <div className="page-container fade-in">
      {/* Hero */}
      <div className="bud-hero">
        <div className="bud-hero-badge">💡 Smart Budgeting</div>
        <h1 className="bud-hero-title">Budget Optimizer</h1>
        <p className="bud-hero-sub">Enter your budget — AI tells you where you can go and when it's cheapest to travel</p>
      </div>

      {/* Input */}
      <div className="bud-form card">
        <div className="bud-form-grid">
          <div className="ai-field">
            <label>💰 My Total Budget (₹)</label>
            <input
              type="number"
              value={budget}
              min={1000}
              step={500}
              onChange={e => setBudget(Number(e.target.value))}
            />
            <div className="bud-slider-row">
              {[3000,5000,10000,15000,25000,50000].map(v => (
                <button
                  key={v}
                  className={`bud-preset ${budget === v ? "active" : ""}`}
                  onClick={() => setBudget(v)}
                >₹{(v/1000).toFixed(0)}k</button>
              ))}
            </div>
          </div>
          <div className="ai-field">
            <label>📅 How many days?</label>
            <div className="ai-counter">
              <button onClick={() => setDays(d => Math.max(1, d - 1))}>−</button>
              <span>{days} days</span>
              <button onClick={() => setDays(d => Math.min(14, d + 1))}>+</button>
            </div>
          </div>
          <div className="ai-field">
            <label>📍 Departing from?</label>
            <input value={from} onChange={e => setFrom(e.target.value)} placeholder="Your city..." />
          </div>
        </div>
        <button className="btn-primary bud-find-btn" onClick={handleFind}>
          🔍 Where can I go within my budget?
        </button>
      </div>

      {/* Results */}
      {results !== null && (
        <>
          <h2 className="section-title" style={{ marginTop: 28 }}>
            {results.length > 0
              ? `✅ ${results.length} destinations possible within ₹${budget.toLocaleString()}`
              : "😔 No destinations found in this budget — try increasing it"}
          </h2>
          <div className="bud-results-grid">
            {results.map((d, i) => (
              <div key={i} className={`bud-dest-card card ${i === 0 ? "best-pick" : ""}`}>
                {i === 0 && <div className="best-badge">🏆 Best Pick</div>}
                <div className="bud-dest-name">{d.name}</div>
                <div className="bud-tags">
                  {d.tags.map((t, j) => <span key={j} className="bud-tag">{t}</span>)}
                </div>
                <div className="bud-cost-breakdown">
                  <div className="bcb-row">
                    <span>🚌 Transport (return)</span>
                    <span>₹{(d.transportCost * 2).toLocaleString()}</span>
                  </div>
                  <div className="bcb-row">
                    <span>🏨 Hotel ({d.recDays} nights)</span>
                    <span>₹{(d.estimated - (d.transportCost * 2) - (800 * d.recDays)).toLocaleString()}</span>
                  </div>
                  <div className="bcb-row">
                    <span>🍽️ Food + Miscellaneous</span>
                    <span>₹{(800 * d.recDays).toLocaleString()}</span>
                  </div>
                  <div className="bcb-row total">
                    <span>Estimated Total</span>
                    <span>₹{d.estimated.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bud-saving">
                  💚 Savings: ₹{d.saving.toLocaleString()} left over
                </div>
                <button className="btn-primary bud-plan-btn">✈️ Plan This Trip</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Price Prediction */}
      <div className="price-pred card">
        <div className="section-title">📈 Price Drop Prediction</div>
        <p className="section-subtitle">Flight, Train or Hotel — see which month gives the cheapest rates</p>
        <div className="pred-btns">
          <button className="pred-btn" onClick={() => findCheapMonth("flight")}>✈️ Flight</button>
          <button className="pred-btn" onClick={() => findCheapMonth("train")}>🚂 Train</button>
          <button className="pred-btn" onClick={() => findCheapMonth("hotel")}>🏨 Hotel</button>
        </div>

        {priceAlert && (
          <div className="pred-result fade-in">
            <div className="pred-highlight">
              <span className="pred-cheap">📉 Cheapest: <strong>{priceAlert.minMonth}</strong> — ₹{priceAlert.minVal.toLocaleString()}</span>
              <span className="pred-exp">📈 Most Expensive: <strong>{priceAlert.maxMonth}</strong> — ₹{priceAlert.maxVal.toLocaleString()}</span>
            </div>
            <div className="price-chart">
              {priceHistory[priceAlert.type].map((v, i) => {
                const max = Math.max(...priceHistory[priceAlert.type]);
                const min = Math.min(...priceHistory[priceAlert.type]);
                const h = Math.round(((v - min) / (max - min)) * 60) + 20;
                const isMin = v === min, isMax = v === max;
                return (
                  <div key={i} className="price-bar-col">
                    <div
                      className={`price-bar ${isMin ? "bar-cheap" : isMax ? "bar-exp" : ""}`}
                      style={{ height: h }}
                      title={`₹${v}`}
                    />
                    <span className="price-bar-month">{months[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOptimizer;
