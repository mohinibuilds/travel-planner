import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useTrip } from "../context/TripContext";
import { hotelCategories } from "../data/travelData";
import { getHotelsForDestination, getCityCentre, isVerifiedCity } from "../data/cityHotelDatabase";
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
  const verified = isVerifiedCity(destinationCity);

  // Dynamic hotel data filtered for THIS city (null = no verified data)
  const [cityHotels, setCityHotels] = useState(() => getHotelsForDestination(destinationCity));
  const [mapCentre,  setMapCentre]  = useState(() => getCityCentre(destinationCity));
  const [activeMarker, setActiveMarker] = useState(null);

  // Re-fetch whenever destination changes
  useEffect(() => {
    const hotels = getHotelsForDestination(destinationCity);
    setCityHotels(hotels);
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
  const allHotelsFlat = cityHotels
    ? Object.entries(hotelCategories).flatMap(([catKey]) =>
        (cityHotels[catKey] || [])
          .filter(h => h.lat && h.lng)
          .map((h, idx) => {
            const count = (cityHotels[catKey] || []).length;
            const { price } = calcPrice(catKey, idx, count, hotelNights, hotelRooms);
            return { ...h, catKey, idx, count, price };
          })
      )
    : [];

  // ── No verified hotels: show blank alert state ──────────────────────────
  if (!cityHotels) {
    return (
      <div className="page-container fade-in">
        <div className="step-indicator">
          <div className="step completed"><span>✓</span> Route</div>
          <div className="step-arrow">›</div>
          <div className="step completed"><span>✓</span> Transport</div>
          <div className="step-arrow">›</div>
          <div className="step active"><span>3</span> Hotel</div>
          <div className="step-arrow">›</div>
          <div className="step"><span>4</span> Summary</div>
        </div>

        {/* ── Blank fallback alert — Tailwind ── */}
        <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-8 text-center">
          <div className="text-5xl mb-4">🏨</div>
          <h2 className="text-xl font-bold text-amber-800 mb-2">
            No Verified Hotels Found for "{destinationCity}"
          </h2>
          <p className="text-amber-700 text-sm mb-1">
            This city / town / village does not yet have verified hotel information in our database.
          </p>
          <p className="text-amber-600 text-xs mb-6">
            We only show real, verified hotel data — we never display unconfirmed listings.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
              onClick={() => navigate("/transport")}
            >
              ← Back to Transport
            </button>
            <button
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
              onClick={() => navigate("/summary")}
            >
              Skip Hotel → View Summary
            </button>
          </div>
          <p className="mt-5 text-xs text-amber-500">
            Verified cities include: Jalna · Deulgaon Raja · Jafrabad · Bhokardan · Aurangabad · Mumbai · Pune · Delhi + more
          </p>
        </div>

        <div className="nav-actions mt-6">
          <button className="btn-secondary" onClick={() => navigate("/transport")}>← Back</button>
        </div>
      </div>
    );
  }

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

      {/* Verified badge */}
      <div className="flex items-center gap-2 mb-2">
        <h2 className="section-title mb-0">Book Your Hotel</h2>
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          ✓ Verified Data
        </span>
      </div>
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
                      {/* Star rating — Tailwind */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex">
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(hotel.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{hotel.rating}</span>
                        <span className="text-xs text-gray-400">({hotel.reviews.toLocaleString()})</span>
                        <span className="ml-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded px-1.5 py-0.5 font-medium">✓ Verified</span>
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
