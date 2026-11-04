import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { hotelCategories } from "../data/travelData";
import { getHotelsForCity } from "../data/hotelData";
import "./HotelBooking.css";

const HotelBooking = () => {
  const navigate = useNavigate();
  const {
    tripDetails, selectedTransport,
    selectedHotel, setSelectedHotel,
    hotelNights, setHotelNights,
    hotelRooms, setHotelRooms
  } = useTrip();

  if (!selectedTransport) {
    return (
      <div className="page-container">
        <div className="empty-state card">
          <div className="empty-icon">🚀</div>
          <h3>No Transport Selected</h3>
          <p>Please select a transport option first</p>
          <button className="btn-primary" onClick={() => navigate("/transport")}>Go to Transport</button>
        </div>
      </div>
    );
  }

  // Get hotels specific to the destination city
  const cityHotels = getHotelsForCity(tripDetails.to);

  // Recalculate when nights/rooms change using the already-selected hotel's own price
  const handleNightsChange = (val) => {
    setHotelNights(val);
    if (selectedHotel) {
      const price = selectedHotel.costs.pricePerNight;
      setSelectedHotel(prev => ({
        ...prev,
        costs: { pricePerNight: price, totalCost: price * val * hotelRooms },
        nights: val,
      }));
    }
  };

  const handleRoomsChange = (val) => {
    setHotelRooms(val);
    if (selectedHotel) {
      const price = selectedHotel.costs.pricePerNight;
      setSelectedHotel(prev => ({
        ...prev,
        costs: { pricePerNight: price, totalCost: price * hotelNights * val },
        rooms: val,
      }));
    }
  };

  return (
    <div className="page-container fade-in">
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className="step completed"><span>✓</span> Route</div>
        <div className="step-arrow">›</div>
        <div className="step completed"><span>✓</span> Transport</div>
        <div className="step-arrow">›</div>
        <div className="step active"><span>3</span> Hotel</div>
        <div className="step-arrow">›</div>
        <div className="step"><span>4</span> Summary</div>
      </div>

      <h2 className="section-title">Book Your Hotel</h2>
      <p className="section-subtitle">in {tripDetails.to}</p>

      {/* Stay Duration Controls */}
      <div className="stay-controls card">
        <div className="stay-item">
          <label>🌙 Number of Nights</label>
          <div className="count-control">
            <button onClick={() => handleNightsChange(Math.max(1, hotelNights - 1))}>−</button>
            <span>{hotelNights} Night{hotelNights > 1 ? "s" : ""}</span>
            <button onClick={() => handleNightsChange(Math.min(30, hotelNights + 1))}>+</button>
          </div>
        </div>
        <div className="stay-divider" />
        <div className="stay-item">
          <label>🛏️ Number of Rooms</label>
          <div className="count-control">
            <button onClick={() => handleRoomsChange(Math.max(1, hotelRooms - 1))}>−</button>
            <span>{hotelRooms} Room{hotelRooms > 1 ? "s" : ""}</span>
            <button onClick={() => handleRoomsChange(Math.min(10, hotelRooms + 1))}>+</button>
          </div>
        </div>
      </div>

      {/* Hotel Category Cards */}
      {Object.entries(hotelCategories).map(([catKey, category]) => {
        const hotels = cityHotels[catKey];
        // Spread prices across the category range based on each hotel's position in the list
        const { min, max } = category.pricePerNight;
        const step = hotels.length > 1 ? (max - min) / (hotels.length - 1) : 0;

        return (
          <div key={catKey} className="hotel-section">
            <div className="hotel-section-header">
              <div>
                <h3 className="hotel-cat-title">{category.icon} {category.name} Hotels</h3>
                <div className="hotel-cat-meta">
                  {category.rating} • ₹{min.toLocaleString()}–₹{max.toLocaleString()} per night
                </div>
              </div>
            </div>

            <div className="amenities-row">
              {category.amenities.map((a, i) => (
                <span key={i} className="amenity-chip">✓ {a}</span>
              ))}
            </div>

            <div className="hotels-grid">
              {hotels.map((hotel, idx) => {
                // Each hotel gets its own price within the category range
                const hotelPrice = Math.round(min + step * idx);
                const hotelTotal = hotelPrice * hotelNights * hotelRooms;
                const isSelected = selectedHotel?.categoryKey === catKey && selectedHotel?.hotel?.name === hotel.name;
                return (
                  <div
                    key={idx}
                    className={`hotel-card card ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedHotel({
                        categoryKey: catKey,
                        category,
                        hotel,
                        costs: { pricePerNight: hotelPrice, totalCost: hotelTotal },
                        nights: hotelNights,
                        rooms: hotelRooms,
                      });
                    }}
                  >
                    {isSelected && <div className="h-selected-badge">✓ Selected</div>}
                    <div className="hotel-card-header">
                      <div className="hotel-card-name">{hotel.name}</div>
                      <div className="hotel-card-rating">
                        ⭐ {hotel.rating}
                        <span className="hotel-reviews">({hotel.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>
                    <div className="hotel-card-location">📍 {hotel.location}</div>
                    <div className="hotel-card-price">
                      <div>
                        <span className="per-night">₹{hotelPrice.toLocaleString()}</span>
                        <span className="per-night-label">/night/room</span>
                      </div>
                      <div className="total-stay">
                        Total: ₹{hotelTotal.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Navigation */}
      <div className="nav-actions">
        <button className="btn-secondary" onClick={() => navigate("/transport")}>← Back</button>
        {selectedHotel ? (
          <button className="btn-primary" onClick={() => navigate("/summary")}>
            View Trip Summary →
          </button>
        ) : (
          <div className="select-hint">👆 Select a hotel to continue</div>
        )}
      </div>
    </div>
  );
};

export default HotelBooking;
