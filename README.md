# ✈️ TravelEase — Smart Travel Planner
### Final Year College Project

## 🚀 How to Run

```bash
npm install
npm run dev
```
Open: http://localhost:3000

## 📦 Tech Stack
- **React 18** with React Router v6
- **Vite** (build tool)
- Pure CSS (no UI framework)

## 🗺️ Features

### 1. Route Search
- 30+ Indian cities
- One-way & Round-trip
- Passenger count selection
- Travel date picker

### 2. Transport Options (4 Modes)
| Mode    | Speed   | Price/km |
|---------|---------|----------|
| ✈️ Flight | 800 km/h | ₹6.50   |
| 🚂 Train  | 120 km/h | ₹1.20   |
| 🚌 Bus    | 60 km/h  | ₹1.80   |
| 🚗 Car    | 80 km/h  | ₹4.00   |

### 3. Hotel Booking
- **Budget**: ₹500–₹1,500/night (2-3★)
- **Standard**: ₹1,500–₹4,000/night (3-4★)
- **Luxury**: ₹4,000–₹15,000/night (4-5★)
- Configurable rooms & nights

### 4. Trip Summary
- Complete cost breakdown
- Transport + Hotel + Miscellaneous
- Grand Total per person
- Print/Save as PDF

## 📁 Project Structure
```
src/
├── context/TripContext.jsx    # Global trip state
├── data/travelData.js         # Cities, transport, hotel data
├── components/Navbar.jsx      # Navigation bar
└── pages/
    ├── Home.jsx               # Landing page
    ├── SearchRoutes.jsx       # Step 1: Route search
    ├── TransportOptions.jsx   # Step 2: Transport selection
    ├── HotelBooking.jsx       # Step 3: Hotel selection
    └── TripSummary.jsx        # Step 4: Final summary & cost
```
