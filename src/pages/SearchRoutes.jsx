import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { getDistance } from "../data/travelData";
import { allCities, citiesByState } from "../data/multiHopData.js";
import "./SearchRoutes.css";

const SearchRoutes = () => {
  const navigate = useNavigate();
  const { tripDetails, setTripDetails, setDistance, resetTrip } = useTrip();
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field, value) => {
    setTripDetails(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!tripDetails.from) e.from = "Please select departure city";
    if (!tripDetails.to) e.to = "Please select destination city";
    if (tripDetails.from === tripDetails.to && tripDetails.from) e.to = "Destination must be different from departure";
    if (!tripDetails.departDate) e.departDate = "Please select travel date";
    if (tripDetails.tripType === "roundtrip" && !tripDetails.returnDate) e.returnDate = "Please select return date";
    if (tripDetails.tripType === "roundtrip" && tripDetails.returnDate <= tripDetails.departDate) {
      e.returnDate = "Return date must be after departure date";
    }
    if (!tripDetails.passengers || tripDetails.passengers < 1) e.passengers = "At least 1 passenger required";
    return e;
  };

  const handleSearch = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const dist = getDistance(tripDetails.from, tripDetails.to);
    resetTrip();        // clears transport/hotel selections only
    setDistance(dist);  // set AFTER reset so it is never wiped
    navigate("/transport");
  };

  const swapCities = () => {
    setTripDetails(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

  return (
    <div className="page-container fade-in">
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className="step active"><span>1</span> Search Route</div>
        <div className="step-arrow">›</div>
        <div className="step"><span>2</span> Transport</div>
        <div className="step-arrow">›</div>
        <div className="step"><span>3</span> Hotel</div>
        <div className="step-arrow">›</div>
        <div className="step"><span>4</span> Summary</div>
      </div>

      <h2 className="section-title">Plan Your Trip</h2>
      <p className="section-subtitle">Enter your travel details to get started</p>

      <div className="search-layout">
        {/* Search Form */}
        <div className="search-form card">
          {/* Trip Type */}
          <div className="trip-type-row">
            <label>Trip Type</label>
            <div className="trip-type-btns">
              {["oneway", "roundtrip"].map(type => (
                <button
                  key={type}
                  className={`trip-type-btn ${tripDetails.tripType === type ? "active" : ""}`}
                  onClick={() => handleChange("tripType", type)}
                >
                  {type === "oneway" ? "→ One Way" : "⇄ Round Trip"}
                </button>
              ))}
            </div>
          </div>

          {/* City Selection */}
          <div className="city-row">
            <div className="form-group">
              <label>📍 From (Departure City / Town / Village)</label>
              <select
                value={tripDetails.from}
                onChange={e => handleChange("from", e.target.value)}
                className={errors.from ? "error" : ""}
              >
                <option value="">— Select from 700+ locations —</option>
                {Object.entries(citiesByState).map(([state, locs]) => (
                  <optgroup key={state} label={`📍 ${state}`}>
                    {locs.map(c => <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                ))}
              </select>
              {errors.from && <span className="error-msg">{errors.from}</span>}
            </div>

            <button className="swap-btn" onClick={swapCities} title="Swap cities">⇄</button>

            <div className="form-group">
              <label>📍 To (Destination City / Town / Village)</label>
              <select
                value={tripDetails.to}
                onChange={e => handleChange("to", e.target.value)}
                className={errors.to ? "error" : ""}
              >
                <option value="">— Select from 700+ locations —</option>
                {Object.entries(citiesByState).map(([state, locs]) => (
                  <optgroup key={state} label={`📍 ${state}`}>
                    {locs.filter(c => c !== tripDetails.from).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.to && <span className="error-msg">{errors.to}</span>}
            </div>
          </div>

          {/* Dates & Passengers */}
          <div className="dates-row">
            <div className="form-group">
              <label>📅 Departure Date</label>
              <input
                type="date"
                value={tripDetails.departDate}
                min={today}
                onChange={e => handleChange("departDate", e.target.value)}
                className={errors.departDate ? "error" : ""}
              />
              {errors.departDate && <span className="error-msg">{errors.departDate}</span>}
            </div>

            {tripDetails.tripType === "roundtrip" && (
              <div className="form-group">
                <label>📅 Return Date</label>
                <input
                  type="date"
                  value={tripDetails.returnDate}
                  min={tripDetails.departDate || today}
                  onChange={e => handleChange("returnDate", e.target.value)}
                  className={errors.returnDate ? "error" : ""}
                />
                {errors.returnDate && <span className="error-msg">{errors.returnDate}</span>}
              </div>
            )}

            <div className="form-group">
              <label>👥 Passengers</label>
              <div className="passenger-control">
                <button onClick={() => handleChange("passengers", Math.max(1, tripDetails.passengers - 1))}>−</button>
                <span>{tripDetails.passengers}</span>
                <button onClick={() => handleChange("passengers", Math.min(10, tripDetails.passengers + 1))}>+</button>
              </div>
              {errors.passengers && <span className="error-msg">{errors.passengers}</span>}
            </div>
          </div>

          <button className="btn-primary search-btn" onClick={handleSearch}>
            🔍 Search Routes & Transport
          </button>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <div className="card info-card">
            <h3>🚀 Transport Options Available</h3>
            <div className="transport-list">
              {[
                { icon: "✈️", name: "Flight", note: "Fastest option" },
                { icon: "🚂", name: "Train", note: "Economical & scenic" },
                { icon: "🚌", name: "Bus", note: "Budget friendly" },
                { icon: "🚗", name: "Car", note: "Private & flexible" }
              ].map((t, i) => (
                <div key={i} className="transport-item">
                  <span className="t-icon">{t.icon}</span>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-note">{t.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card info-card mt16">
            <h3>🏨 Hotel Categories</h3>
            <div className="hotel-list">
              {[
                { icon: "🏨", name: "Budget", price: "₹500–₹1,500/night", stars: "2-3 ★" },
                { icon: "🏩", name: "Standard", price: "₹1,500–₹4,000/night", stars: "3-4 ★" },
                { icon: "🏰", name: "Luxury", price: "₹4,000–₹15,000/night", stars: "4-5 ★" }
              ].map((h, i) => (
                <div key={i} className="hotel-item">
                  <span className="h-icon">{h.icon}</span>
                  <div>
                    <div className="h-name">{h.name} <span className="h-stars">{h.stars}</span></div>
                    <div className="h-price">{h.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRoutes;
