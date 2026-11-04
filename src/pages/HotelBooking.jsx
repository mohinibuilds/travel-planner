import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useTrip } from "../context/TripContext";
import { hotelCategories } from "../data/travelData";
import { getHotelsForDestination, getCityCentre } from "../data/cityHotelDatabase";
import "leaflet/dist/leaflet.css";
import "./HotelBooking.css";

// Fix Leaflet default marker icon (broken in Vite/Webpack builds)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom selected marker (blue pin)
const selectedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

// Custom default marker (grey)
const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

// Helper: fly map to new city centre when destination changes
const MapFlyTo = ({ centre }) => {
  const map = useMap();
  useEffect(() => {
    if (centre?.lat && centre?.lng) {
      map.flyTo([centre.lat, centre.lng], centre.zoom || 13, { duration: 1.2 });
    }
  }, [centre, map]);
  return null;
};

// ── Price helper ─────────────────────────────────────────────────────────────
const calcPrice = (catKey, idx, count, nights, rooms) => {
  const cat = hotelCategories[catKey];
  const { min, max } = cat.pricePerNight;
  const step = count > 1 ? (max - min) / (count - 1) : 0;
  const price = Math.round(min + step * idx);
  return { price, total: price * nights * rooms };
};

// ── Main Component ────────────────────────────────────────────────────────────
const HotelBooking = () => {
  const navigate  = useNavigate();
  const {
    tripDetails, selectedTransport,
    selectedHotel, setSelectedHotel,
    hotelNights, setHotelNights,
    hotelRooms,  setHotelRooms,
  } = useTrip();

  const destinationCity = tripDetails.to;

  // Dynamic hotel data filtered for THIS city
  const [cityHotels, setCityHotels] = useState(() => getHotelsForDestination(destinationCity));
  const [mapCentre,  setMapCentre]  = useState(() => getCityCentre(destinationCity));
  const [activeMarker, setActiveMarker] = useState(null); // { lat, lng, name }

  // Re-fetch whenever destination changes
  useEffect(() => {
    setCityHotels(getHotelsForDestination(destinationCity));
    setMapCentre(getCityCentre(destinationCity));
    setActiveMarker(null);
    setSelectedHotel(null);
  }, [destinationCity]);

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

  // Nights / rooms change handlers
  const handleNightsChange = (val) => {
    setHotelNights(val);
    if (selectedHotel) {
      const p = selectedHotel.costs.pricePerNight;
      setSelectedHotel(prev => ({ ...prev, costs: { pricePerNight: p, totalCost: p * val * hotelRooms }, nights: val }));
    }
  };
  const handleRoomsChange = (val) => {
    setHotelRooms(val);
    if (selectedHotel) {
      const p = selectedHotel.costs.pricePerNight;
      setSelectedHotel(prev => ({ ...prev, costs: { pricePerNight: p, totalCost: p * hotelNights * val }, rooms: val }));
    }
  };

  // Collect all hotels with real coordinates for map markers
  const allHotelsFlat = Object.entries(hotelCategories).flatMap(([catKey]) =>
    (cityHotels[catKey] || [])
      .filter(h => h.lat && h.lng)
      .map((h, idx) => {
        const count = (cityHotels[catKey] || []).length;
        const { price } = calcPrice(catKey, idx, count, hotelNights, hotelRooms);
        return { ...h, catKey, idx, count, price };
      })
  );

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
      <p className="section-subtitle">Showing real hotels in <strong>{destinationCity}</strong></p>

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

      {/* ── Interactive Map ─────────────────────────────────────────────────── */}
      <div className="hotel-map-wrapper card">
        <div className="hotel-map-title">
          🗺️ Hotel Locations in {destinationCity}
          {activeMarker && (
            <span className="map-active-label">📍 {activeMarker.name}</span>
          )}
        </div>
        <MapContainer
          center={[mapCentre.lat, mapCentre.lng]}
          zoom={mapCentre.zoom}
          style={{ height: 320, borderRadius: 10 }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFlyTo centre={mapCentre} />
          {allHotelsFlat.map((h, i) => {
            const isActive = activeMarker?.name === h.name;
            return (
              <Marker
                key={i}
                position={[h.lat, h.lng]}
                icon={isActive ? selectedIcon : defaultIcon}
                eventHandlers={{
                  click: () => setActiveMarker({ lat: h.lat, lng: h.lng, name: h.name }),
                }}
              >
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <strong>{h.name}</strong><br />
                    ⭐ {h.rating} · {h.catKey}<br />
                    <small>{h.address}</small><br />
                    <span style={{ color: "#1A56DB", fontWeight: 700 }}>₹{h.price.toLocaleString()}/night</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        {allHotelsFlat.length === 0 && (
          <div className="map-no-coords">📍 Map coordinates not available for {destinationCity} — hotel list is shown below</div>
        )}
      </div>

      {/* ── Hotel Category Cards ────────────────────────────────────────────── */}
      {Object.entries(hotelCategories).map(([catKey, category]) => {
        const hotels = cityHotels[catKey] || [];
        const { min, max } = category.pricePerNight;

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
                const { price, total } = calcPrice(catKey, idx, hotels.length, hotelNights, hotelRooms);
                const isSelected = selectedHotel?.hotel?.name === hotel.name;
                const isMapActive = activeMarker?.name === hotel.name;

                return (
                  <div
                    key={idx}
                    className={`hotel-card card ${isSelected ? "selected" : ""} ${isMapActive ? "map-highlighted" : ""}`}
                    onClick={() => {
                      setSelectedHotel({
                        categoryKey: catKey, category, hotel,
                        costs: { pricePerNight: price, totalCost: total },
                        nights: hotelNights, rooms: hotelRooms,
                      });
                      // Fly map to this hotel if it has coords
                      if (hotel.lat && hotel.lng) {
                        setMapCentre({ lat: hotel.lat, lng: hotel.lng, zoom: 16 });
                        setActiveMarker({ lat: hotel.lat, lng: hotel.lng, name: hotel.name });
                      }
                    }}
                  >
                    {isSelected   && <div className="h-selected-badge">✓ Selected</div>}
                    {isMapActive && !isSelected && <div className="h-map-badge">📍 On Map</div>}

                    <div className="hotel-card-header">
                      <div className="hotel-card-name">{hotel.name}</div>
                      <div className="hotel-card-rating">
                        ⭐ {hotel.rating}
                        <span className="hotel-reviews">({hotel.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>

                    <div className="hotel-card-location">
                      📍 {hotel.address || hotel.location}
                    </div>

                    <div className="hotel-card-price">
                      <div>
                        <span className="per-night">₹{price.toLocaleString()}</span>
                        <span className="per-night-label">/night/room</span>
                      </div>
                      <div className="total-stay">Total: ₹{total.toLocaleString()}</div>
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
