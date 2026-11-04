import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { getCityCoords } from "../data/cityCoords";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icons (broken in Vite builds)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Inner component that fits the map to the route bounds
const FitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions && positions.length >= 2) {
      map.fitBounds(positions, { padding: [40, 40] });
    }
  }, [positions, map]);
  return null;
};

const RouteMap = ({ fromCity, toCity }) => {
  const [routePositions, setRoutePositions] = useState(null); // [[lat,lng], ...]
  const [routeInfo, setRouteInfo]       = useState(null);     // { distance, duration }
  const [error, setError]               = useState(null);
  const [loading, setLoading]           = useState(false);

  const fromCoords = getCityCoords(fromCity);
  const toCoords   = getCityCoords(toCity);

  useEffect(() => {
    if (!fromCoords || !toCoords) {
      setRoutePositions(null);
      setRouteInfo(null);
      setError(!fromCity || !toCity ? null : "Coordinates not found for one or both cities.");
      return;
    }

    // Straight-line fallback helper
    const useStraightLine = () => {
      setRoutePositions([
        [fromCoords.lat, fromCoords.lng],
        [toCoords.lat,   toCoords.lng],
      ]);
      setRouteInfo(null);
    };

    setLoading(true);
    setError(null);

    const url = `https://router.project-osrm.org/route/v1/driving/` +
      `${fromCoords.lng},${fromCoords.lat};${toCoords.lng},${toCoords.lat}` +
      `?overview=full&geometries=geojson`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.code !== "Ok" || !data.routes?.length) {
          useStraightLine();
          return;
        }
        const route = data.routes[0];
        // GeoJSON coords are [lng, lat] — flip to [lat, lng] for Leaflet
        const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRoutePositions(coords);
        const distKm  = (route.distance / 1000).toFixed(0);
        const durMins = Math.round(route.duration / 60);
        const hours   = Math.floor(durMins / 60);
        const mins    = durMins % 60;
        const durStr  = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
        setRouteInfo({ distance: `${distKm} km`, duration: durStr });
      })
      .catch(() => useStraightLine())
      .finally(() => setLoading(false));
  }, [fromCity, toCity]);

  if (!fromCoords || !toCoords) {
    return (
      <div className="route-map-placeholder">
        <div className="route-map-hint">
          🗺️ Select both cities to see the route map
        </div>
      </div>
    );
  }

  const center = [
    (fromCoords.lat + toCoords.lat) / 2,
    (fromCoords.lng + toCoords.lng) / 2,
  ];

  return (
    <div className="route-map-wrapper">
      {loading && <div className="route-map-loading">Loading route…</div>}
      {error   && <div className="route-map-error">{error}</div>}

      {routeInfo && (
        <div className="route-map-badge">
          <span>📍 {fromCity} → {toCity}</span>
          <span>🛣️ {routeInfo.distance}</span>
          <span>⏱️ {routeInfo.duration}</span>
        </div>
      )}

      <MapContainer center={center} zoom={6} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routePositions && (
          <>
            <FitBounds positions={routePositions} />
            <Polyline
              positions={routePositions}
              pathOptions={{ color: "#3b82f6", weight: 5, opacity: 0.85 }}
            />
            <Marker position={[fromCoords.lat, fromCoords.lng]}>
              <Popup>{fromCity} (Departure)</Popup>
            </Marker>
            <Marker position={[toCoords.lat, toCoords.lng]}>
              <Popup>{toCity} (Destination)</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default RouteMap;
