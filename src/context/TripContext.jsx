import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripDetails, setTripDetails] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    tripType: "oneway"
  });

  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelNights, setHotelNights] = useState(1);
  const [hotelRooms, setHotelRooms] = useState(1);
  const [distance, setDistance] = useState(0);

  const resetTrip = () => {
    setSelectedTransport(null);
    setSelectedHotel(null);
    setHotelNights(1);
    setHotelRooms(1);
    // NOTE: do NOT reset distance here — it is set by SearchRoutes and used by TransportOptions
  };

  return (
    <TripContext.Provider value={{
      tripDetails, setTripDetails,
      selectedTransport, setSelectedTransport,
      selectedHotel, setSelectedHotel,
      hotelNights, setHotelNights,
      hotelRooms, setHotelRooms,
      distance, setDistance,
      resetTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
