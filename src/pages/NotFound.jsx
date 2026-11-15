import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-4">✈️</div>
      <h1 className="text-6xl font-black text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-600 mb-3">Page Not Found</h2>
      <p className="text-gray-500 text-sm max-w-sm mb-8">
        Looks like this route doesn't exist. Let's get you back on track!
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          onClick={() => navigate("/")}
        >
          🏠 Go Home
        </button>
        <button
          className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors"
          onClick={() => navigate("/search")}
        >
          ✈️ Plan a Trip
        </button>
      </div>
    </div>
  );
};

export default NotFound;
