import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
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
import WelcomeScreen from "./pages/WelcomeScreen";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import "./App.css";

// Pages that should NOT show the Navbar (full-screen pages)
const NO_NAVBAR_PATHS = ["/welcome", "/auth"];

function AppInner() {
  const { hasSeenWelcome } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // On first ever visit → redirect to /welcome
  useEffect(() => {
    const isAuthPath = NO_NAVBAR_PATHS.includes(location.pathname);
    if (!hasSeenWelcome && !isAuthPath) {
      navigate("/welcome", { replace: true });
    }
  }, []); // runs once on mount

  const showNavbar = !NO_NAVBAR_PATHS.includes(location.pathname);

  return (
    <div className="app">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "main-content" : ""}>
        <Routes>
          {/* Auth flow */}
          <Route path="/welcome"   element={<WelcomeScreen />} />
          <Route path="/auth"      element={<AuthPage />} />

          {/* Main app */}
          <Route path="/"          element={<Home />} />
          <Route path="/search"    element={<SearchRoutes />} />
          <Route path="/transport" element={<TransportOptions />} />
          <Route path="/hotels"    element={<HotelBooking />} />
          <Route path="/summary"   element={<TripSummary />} />
          <Route path="/multihop"  element={<MultiHop />} />
          <Route path="/itinerary" element={<MicroItinerary />} />
          <Route path="/zerofee"   element={<ZeroFeePayment />} />
          <Route path="/ai-plan"   element={<AIItinerary />} />
          <Route path="/offbeat"   element={<OffbeatGems />} />
          <Route path="/group"     element={<GroupTrip />} />
          <Route path="/budget"    element={<BudgetOptimizer />} />
          <Route path="/in-trip"   element={<InTripAssistant />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return <AppInner />;
}

export default App;
