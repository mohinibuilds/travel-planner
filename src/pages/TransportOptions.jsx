import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { transportModes, calculateTransportCost, getAvailableModes, getModeUnavailableReason, hasAirport } from "../data/travelData";
import "./TransportOptions.css";

const TransportOptions = () => {
  const navigate = useNavigate();
  const { tripDetails, distance, selectedTransport, setSelectedTransport } = useTrip();

  if (!tripDetails.from || !tripDetails.to) {
    return (
      <div className="page-container">
        <div className="empty-state card">
          <div className="empty-icon">🗺️</div>
          <h3>No Trip Selected</h3>
          <p>Please search for a route first</p>
          <button className="btn-primary" onClick={() => navigate("/search")}>Go to Search</button>
        </div>
      </div>
    );
  }

  const isRoundTrip = tripDetails.tripType === "roundtrip";
  const availableModes = getAvailableModes(tripDetails.from, tripDetails.to, distance);

  // Determine if neither city has an airport → bus becomes the recommended mode
  const noAirportRoute = !hasAirport(tripDetails.from) || !hasAirport(tripDetails.to);
  const noAirportCity = !hasAirport(tripDetails.from)
    ? tripDetails.from
    : !hasAirport(tripDetails.to)
    ? tripDetails.to
    : null;

  // Format duration nicely
  const formatDuration = (hours) => {
    if (!hours || hours === 0) return "—";
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (h === 0) return `${m}m`;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="page-container fade-in">
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className="step completed"><span>✓</span> Route</div>
        <div className="step-arrow">›</div>
        <div className="step active"><span>2</span> Transport</div>
        <div className="step-arrow">›</div>
        <div className="step"><span>3</span> Hotel</div>
        <div className="step-arrow">›</div>
        <div className="step"><span>4</span> Summary</div>
      </div>

      {/* Route Header */}
      <div className="route-header card">
        <div className="route-info">
          <div className="route-display">
            <div className="city-box">
              <div className="city-label">From</div>
              <div className="city-name">{tripDetails.from}</div>
            </div>
            <div className="route-line">
              <div className="route-dot" />
              <div className="route-track">
                <span className="route-dist">{distance} km</span>
              </div>
              <div className="route-dot" />
            </div>
            <div className="city-box">
              <div className="city-label">To</div>
              <div className="city-name">{tripDetails.to}</div>
            </div>
          </div>
        </div>
        <div className="trip-meta">
          <div className="meta-item">📅 {tripDetails.departDate}</div>
          {isRoundTrip && <div className="meta-item">↩️ {tripDetails.returnDate}</div>}
          <div className="meta-item">👥 {tripDetails.passengers} Passenger{tripDetails.passengers > 1 ? "s" : ""}</div>
          <div className="meta-item badge" style={{
            background: isRoundTrip ? "#DCFCE7" : "#EFF6FF",
            color: isRoundTrip ? "#16A34A" : "#2563EB"
          }}>
            {isRoundTrip ? "⇄ Round Trip" : "→ One Way"}
          </div>
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: 28 }}>Choose Transport Mode</h2>
      <p className="section-subtitle">
        {availableModes.length} mode{availableModes.length !== 1 ? "s" : ""} available for this route
      </p>

      {/* No-airport notice */}
      {noAirportRoute && (
        <div className="no-airport-notice">
          <span className="no-airport-icon">🚌</span>
          <div>
            <strong>{noAirportCity} has no airport.</strong>
            {" "}Bus and Car are the primary options for this route.
            {" "}For a multi-leg journey via a nearby airport city, try the{" "}
            <a href="/multihop" style={{ color: "inherit", fontWeight: 600 }}>
              Multi-Hop Optimizer
            </a>.
          </div>
        </div>
      )}

      {/* Transport Cards */}
      <div className="transport-grid">
        {Object.entries(transportModes).map(([key, mode]) => {
          const isAvailable = availableModes.includes(key);
          const unavailableReason = !isAvailable
            ? getModeUnavailableReason(key, tripDetails.from, tripDetails.to, distance)
            : null;
          const costs = isAvailable
            ? calculateTransportCost(key, distance, tripDetails.passengers)
            : null;
          const totalWithReturn = costs
            ? (isRoundTrip ? costs.totalCost * 2 : costs.totalCost)
            : null;
          const isSelected = selectedTransport?.key === key;

          // Mark bus as recommended when there is no airport at either end
          const isRecommended = key === "bus" && noAirportRoute && isAvailable;

          return (
            <div
              key={key}
              className={`transport-card card
                ${isSelected ? "selected" : ""}
                ${!isAvailable ? "unavailable" : ""}
                ${isRecommended ? "recommended" : ""}
              `}
              onClick={() => {
                if (isAvailable) setSelectedTransport({ key, mode, costs, totalWithReturn });
              }}
              style={{ "--mode-color": mode.color }}
            >
              {isSelected && <div className="selected-badge">✓ Selected</div>}
              {isRecommended && !isSelected && (
                <div className="recommended-badge">🚌 Recommended for this route</div>
              )}
              {!isAvailable && (
                <div className="unavailable-badge">
                  {key === "flight" ? "✈️ No Airport"
                    : key === "bike" ? "🏍️ Too Far"
                    : "🚂 No Railway"}
                </div>
              )}

              <div className="transport-header">
                <div className="transport-emoji" style={{ opacity: isAvailable ? 1 : 0.4 }}>
                  {mode.icon}
                </div>
                <div>
                  <div className="transport-name" style={{ opacity: isAvailable ? 1 : 0.5 }}>
                    {mode.name}
                  </div>
                  {isAvailable ? (
                    <div className="transport-duration">
                      ⏱ {formatDuration(costs.durationHours)}
                      {isRoundTrip && ` (× 2 = ${formatDuration(costs.durationHours * 2)} total)`}
                    </div>
                  ) : (
                    <div className="transport-unavail-reason">🚫 {unavailableReason}</div>
                  )}
                </div>
              </div>

              {isAvailable ? (
                <>
                  <div className="price-section">
                    <div className="price-row">
                      <span>Per Person:</span>
                      <span className="price-val">₹{costs.costPerPerson.toLocaleString()}</span>
                    </div>
                    <div className="price-row">
                      <span>All {tripDetails.passengers} Passenger{tripDetails.passengers > 1 ? "s" : ""}:</span>
                      <span className="price-val">₹{costs.totalCost.toLocaleString()}</span>
                    </div>
                    {isRoundTrip && (
                      <div className="price-row total">
                        <span>Round Trip Total:</span>
                        <span className="price-val highlight">₹{totalWithReturn.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="features-list">
                    {mode.features.map((f, i) => (
                      <span key={i} className="feature-chip">✓ {f}</span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="unavail-body">
                  <div className="unavail-msg">{unavailableReason}</div>
                  <div className="unavail-suggest">
                    {key === "flight"
                      ? noAirportRoute
                        ? `💡 ${noAirportCity} has no airport — Bus or Car are the best options for this route`
                        : "💡 Use Multi-Hop Optimizer to find the nearest airport connection"
                      : key === "bike"
                      ? "💡 Bike trips are recommended for routes under 500 km"
                      : "💡 Bus or Car is available for this route"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Availability Summary */}
      <div className="availability-summary card">
        <div className="avail-title">📊 Route Availability Summary</div>
        <div className="avail-grid">
          {Object.entries(transportModes).map(([key, mode]) => {
            const isAvail = availableModes.includes(key);
            return (
              <div key={key} className={`avail-item ${isAvail ? "avail-yes" : "avail-no"}`}>
                <span>{mode.icon}</span>
                <span>{mode.name}</span>
                <span className={`avail-badge ${isAvail ? "badge-yes" : "badge-no"}`}>
                  {isAvail ? "✓ Available" : "✗ Not Available"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-actions">
        <button className="btn-secondary" onClick={() => navigate("/search")}>← Back</button>
        {selectedTransport ? (
          <button className="btn-primary" onClick={() => navigate("/hotels")}>
            Continue to Hotels →
          </button>
        ) : (
          <div className="select-hint">👆 Select an available transport mode to continue</div>
        )}
      </div>
    </div>
  );
};

export default TransportOptions;
