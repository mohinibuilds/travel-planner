import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import "./TripSummary.css";

const TripSummary = () => {
  const navigate = useNavigate();
  const printRef = useRef();
  const {
    tripDetails, selectedTransport, selectedHotel,
    distance, resetTrip, setTripDetails
  } = useTrip();

  const isEmpty = !tripDetails.from || !tripDetails.to;
  const hasTransport = !!selectedTransport;
  const hasHotel = !!selectedHotel;

  // Cost calculations
  const transportCost = hasTransport ? selectedTransport.totalWithReturn : 0;
  const hotelCost = hasHotel ? selectedHotel.costs.totalCost : 0;
  const miscCost = hasTransport ? Math.round((transportCost + hotelCost) * 0.05) : 0;
  const totalCost = transportCost + hotelCost + miscCost;

  const handlePrint = () => window.print();

  const handleReset = () => {
    resetTrip();
    setTripDetails({ from: "", to: "", departDate: "", returnDate: "", passengers: 1, tripType: "oneway" });
    navigate("/");
  };

  if (isEmpty) {
    return (
      <div className="page-container">
        <div className="empty-state card">
          <div className="empty-icon">📋</div>
          <h3>No Trip Planned Yet</h3>
          <p>Start planning your trip to see the summary here</p>
          <button className="btn-primary" onClick={() => navigate("/search")}>Plan a Trip</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" ref={printRef}>
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className="step completed"><span>✓</span> Route</div>
        <div className="step-arrow">›</div>
        <div className="step completed"><span>✓</span> Transport</div>
        <div className="step-arrow">›</div>
        <div className="step completed"><span>✓</span> Hotel</div>
        <div className="step-arrow">›</div>
        <div className="step active"><span>4</span> Summary</div>
      </div>

      {/* Header */}
      <div className="summary-header">
        <div>
          <h2 className="section-title">Trip Summary</h2>
          <p className="section-subtitle">Complete cost breakdown for your trip</p>
        </div>
        <div className="summary-actions">
          <button className="btn-secondary" onClick={handlePrint}>🖨️ Print / Save PDF</button>
          <button className="btn-secondary" onClick={handleReset}>🔄 New Trip</button>
        </div>
      </div>

      <div className="summary-layout">
        {/* Left Column */}
        <div className="summary-left">

          {/* Trip Details Card */}
          <div className="summary-card card">
            <div className="sc-header">
              <span className="sc-icon">🗺️</span>
              <h3>Trip Details</h3>
            </div>
            <div className="sc-body">
              <div className="detail-row">
                <span className="detail-label">Route</span>
                <span className="detail-value route-val">
                  {tripDetails.from} <span className="arrow-sep">→</span> {tripDetails.to}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Distance</span>
                <span className="detail-value">{distance} km</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Trip Type</span>
                <span className="detail-value">
                  {tripDetails.tripType === "roundtrip" ? "⇄ Round Trip" : "→ One Way"}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Departure</span>
                <span className="detail-value">{tripDetails.departDate}</span>
              </div>
              {tripDetails.returnDate && (
                <div className="detail-row">
                  <span className="detail-label">Return</span>
                  <span className="detail-value">{tripDetails.returnDate}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Passengers</span>
                <span className="detail-value">👥 {tripDetails.passengers}</span>
              </div>
            </div>
          </div>

          {/* Transport Card */}
          {hasTransport ? (
            <div className="summary-card card">
              <div className="sc-header">
                <span className="sc-icon">{selectedTransport.mode.icon}</span>
                <h3>Transport — {selectedTransport.mode.name}</h3>
              </div>
              <div className="sc-body">
                <div className="detail-row">
                  <span className="detail-label">Per Person</span>
                  <span className="detail-value">₹{selectedTransport.costs.costPerPerson.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">× {tripDetails.passengers} Passengers</span>
                  <span className="detail-value">₹{selectedTransport.costs.totalCost.toLocaleString()}</span>
                </div>
                {tripDetails.tripType === "roundtrip" && (
                  <div className="detail-row">
                    <span className="detail-label">× 2 (Round Trip)</span>
                    <span className="detail-value">₹{selectedTransport.totalWithReturn.toLocaleString()}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">⏱ {selectedTransport.costs.durationHours}h</span>
                </div>
                <div className="detail-row highlight-row">
                  <span className="detail-label">Transport Total</span>
                  <span className="detail-value cost-highlight">₹{transportCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="summary-card card incomplete-card">
              <div className="sc-header">
                <span className="sc-icon">🚀</span>
                <h3>Transport</h3>
              </div>
              <div className="sc-body">
                <div className="incomplete-notice">
                  ⚠️ No transport selected
                  <button className="link-btn" onClick={() => navigate("/transport")}>Select Transport →</button>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Card */}
          {hasHotel ? (
            <div className="summary-card card">
              <div className="sc-header">
                <span className="sc-icon">{selectedHotel.category.icon}</span>
                <h3>Hotel — {selectedHotel.hotel.name}</h3>
              </div>
              <div className="sc-body">
                <div className="detail-row">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">{selectedHotel.category.name} {selectedHotel.category.rating}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">📍 {selectedHotel.hotel.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Per Night / Room</span>
                  <span className="detail-value">₹{selectedHotel.costs.pricePerNight.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Rooms × Nights</span>
                  <span className="detail-value">{selectedHotel.rooms} room{selectedHotel.rooms > 1 ? "s" : ""} × {selectedHotel.nights} night{selectedHotel.nights > 1 ? "s" : ""}</span>
                </div>
                <div className="detail-row highlight-row">
                  <span className="detail-label">Hotel Total</span>
                  <span className="detail-value cost-highlight">₹{hotelCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="summary-card card incomplete-card">
              <div className="sc-header">
                <span className="sc-icon">🏨</span>
                <h3>Hotel</h3>
              </div>
              <div className="sc-body">
                <div className="incomplete-notice">
                  ⚠️ No hotel selected
                  <button className="link-btn" onClick={() => navigate("/hotels")}>Select Hotel →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Cost Summary */}
        <div className="summary-right">
          <div className="cost-card card">
            <div className="cost-card-header gradient-bg">
              <div className="cost-title">💰 Total Trip Cost</div>
              <div className="cost-amount">₹{totalCost.toLocaleString()}</div>
              <div className="cost-subtitle">
                For {tripDetails.passengers} person{tripDetails.passengers > 1 ? "s" : ""}
                {tripDetails.tripType === "roundtrip" ? " (round trip)" : " (one way)"}
              </div>
            </div>

            <div className="cost-breakdown">
              <div className="cost-row">
                <div className="cost-item-info">
                  <span className="cost-item-icon">{hasTransport ? selectedTransport.mode.icon : "✈️"}</span>
                  <span>Transport ({hasTransport ? selectedTransport.mode.name : "not selected"})</span>
                </div>
                <span className="cost-item-val">₹{transportCost.toLocaleString()}</span>
              </div>

              <div className="cost-row">
                <div className="cost-item-info">
                  <span className="cost-item-icon">{hasHotel ? selectedHotel.category.icon : "🏨"}</span>
                  <span>Hotel ({hasHotel ? `${selectedHotel.nights}N × ${selectedHotel.rooms}R` : "not selected"})</span>
                </div>
                <span className="cost-item-val">₹{hotelCost.toLocaleString()}</span>
              </div>

              <div className="cost-row">
                <div className="cost-item-info">
                  <span className="cost-item-icon">🍽️</span>
                  <span>Miscellaneous (meals, local travel ~5%)</span>
                </div>
                <span className="cost-item-val">₹{miscCost.toLocaleString()}</span>
              </div>

              <div className="cost-divider" />

              <div className="cost-row total-row">
                <div className="cost-item-info">
                  <span className="cost-item-icon">💰</span>
                  <strong>Grand Total</strong>
                </div>
                <strong className="grand-total">₹{totalCost.toLocaleString()}</strong>
              </div>

              <div className="per-person-row">
                Per person: <strong>₹{Math.round(totalCost / tripDetails.passengers).toLocaleString()}</strong>
              </div>
            </div>

            {/* Savings Tips */}
            <div className="savings-section">
              <h4>💡 Cost Saving Tips</h4>
              <ul>
                <li>Book train tickets 90 days in advance for Tatkal savings</li>
                <li>Travel on weekdays for cheaper flights</li>
                <li>Book hotel directly to avoid platform fees</li>
                <li>Consider IRCTC packages for bundled discounts</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="cost-actions">
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handlePrint}>
                🖨️ Download / Print Summary
              </button>
              <button
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
                onClick={handleReset}
              >
                🔄 Plan Another Trip
              </button>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="stats-card card">
            <h4>📊 Trip Stats</h4>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-box-num">{distance}</div>
                <div className="stat-box-label">km Distance</div>
              </div>
              <div className="stat-box">
                <div className="stat-box-num">{tripDetails.passengers}</div>
                <div className="stat-box-label">Passengers</div>
              </div>
              <div className="stat-box">
                <div className="stat-box-num">{hasHotel ? selectedHotel.nights : 0}</div>
                <div className="stat-box-label">Nights</div>
              </div>
              <div className="stat-box">
                <div className="stat-box-num">{hasHotel ? selectedHotel.rooms : 0}</div>
                <div className="stat-box-label">Rooms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
