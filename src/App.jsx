import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchRoutes from "./pages/SearchRoutes";
import TransportOptions from "./pages/TransportOptions";
import HotelBooking from "./pages/HotelBooking";
import TripSummary from "./pages/TripSummary";
import MultiHop from "./pages/MultiHop";
import MicroItinerary from "./pages/MicroItinerary";
import ZeroFeePayment from "./pages/ZeroFeePayment";
import AIItinerary from "./pages/AIItinerary";
import OffbeatGems from "./pages/OffbeatGems";
import GroupTrip from "./pages/GroupTrip";
import BudgetOptimizer from "./pages/BudgetOptimizer";
import InTripAssistant from "./pages/InTripAssistant";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/search"     element={<SearchRoutes />} />
          <Route path="/transport"  element={<TransportOptions />} />
          <Route path="/hotels"     element={<HotelBooking />} />
          <Route path="/summary"    element={<TripSummary />} />
          <Route path="/multihop"   element={<MultiHop />} />
          <Route path="/itinerary"  element={<MicroItinerary />} />
          <Route path="/zerofee"    element={<ZeroFeePayment />} />
          <Route path="/ai-plan"    element={<AIItinerary />} />
          <Route path="/offbeat"    element={<OffbeatGems />} />
          <Route path="/group"      element={<GroupTrip />} />
          <Route path="/budget"     element={<BudgetOptimizer />} />
          <Route path="/in-trip"    element={<InTripAssistant />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
