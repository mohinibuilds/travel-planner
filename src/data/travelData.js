// ─── Indian Cities ─────────────────────────────────────────────────────────
export const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Surat", "Kochi", "Chandigarh", "Bhopal", "Indore",
  "Nagpur", "Visakhapatnam", "Agra", "Varanasi", "Goa",
  "Shimla", "Manali", "Darjeeling", "Mysore", "Amritsar",
  "Udaipur", "Jodhpur", "Rishikesh", "Haridwar", "Leh"
];

// ─── Cities WITH Airports (operational airports in India) ─────────────────────
export const citiesWithAirport = new Set([
  // Metro & Major airports
  "Mumbai","Delhi","Bangalore","Chennai","Kolkata","Hyderabad","Ahmedabad",
  "Pune","Kochi","Goa","Srinagar","Leh",
  // Tier-2 airports
  "Jaipur","Lucknow","Bhopal","Indore","Nagpur","Bhubaneswar","Patna",
  "Raipur","Vadodara","Surat","Rajkot","Coimbatore","Madurai","Trichy",
  "Visakhapatnam","Vijayawada","Tirupati","Rajahmundry","Warangal",
  "Amritsar","Chandigarh","Dehradun","Shimla","Kullu","Dharamsala",
  "Jammu","Leh","Srinagar","Udaipur","Jodhpur","Jaisalmer","Bikaner","Ajmer",
  "Varanasi","Allahabad","Gorakhpur","Agra","Kanpur","Bareilly",
  "Ranchi","Deoghar","Jharsuguda","Bokaro",
  "Guwahati","Agartala","Imphal","Dibrugarh","Jorhat","Dimapur","Aizawl",
  "Silchar","Tezpur","Lilabari","Rupsi","Pasighat","Tezu","Itanagar","Shillong",
  "Bagdogra","Siliguri","Gangtok area","Pakyong","Kolasib",
  "Hubli","Belgaum","Mangalore","Mysore","Bellary","Bidar","Kalaburagi",
  "Salem","Tirunelveli","Thoothukudi","Vellore","Tiruvannamalai",
  "Thiruvananthapuram","Kozhikode","Kannur","Thrissur",
  "Aurangabad","Nashik","Kolhapur","Nanded","Solapur","Jalgaon","Ratnagiri",
  "Akola","Amravati","Nandurbar","Osmanabad","Chandrapur","Gondia",
  "Port Blair","Kavaratti","Agatti",
  "Panaji","Dabolim",
  // Hill / special airports
  "Kullu Manali","Gauchar","Shimla","Kargil","Ziro","Tawang area",
  "Munsiyari","Pithoragarh","Chinyalisaur",
  // Additional operational
  "Bhavnagar","Jamnagar","Porbandar","Kandla","Mundra","Bhuj",
  "Rewa","Satna","Gwalior","Jabalpur","Khajuraho",
  "Jharsuguda","Korba","Bilaspur",
  "Bikaner","Kishangarh","Sri Ganganagar","Udaipur",
  "Darbhanga","Muzaffarpur","Gaya","Bhagalpur",
  "Hubli","Bijapur","Karwar",
  "Nellore","Kakinada","Ongole",
  "Kadapa","Kurnool","Anantapur",
  "Nizamabad","Karimnagar","Khammam","Mahbubnagar",
  "Satna","Rewa","Chhindwara",
  "Deoghar","Bokaro","Dhanbad",
]);

// ─── Cities WITH Railway Stations ─────────────────────────────────────────────
// Excludes very remote villages, islands, and some hill areas with no rail access
export const citiesWithRailway = new Set([
  // Major junctions — all have trains
  "Mumbai","Delhi","Bangalore","Chennai","Kolkata","Hyderabad","Pune","Ahmedabad",
  "Jaipur","Lucknow","Bhopal","Indore","Nagpur","Surat","Vadodara","Rajkot",
  "Kochi","Kozhikode","Thiruvananthapuram","Thrissur","Palakkad","Kannur",
  "Visakhapatnam","Vijayawada","Tirupati","Guntur","Warangal","Nizamabad",
  "Coimbatore","Madurai","Trichy","Salem","Vellore","Tirunelveli","Chennai",
  "Varanasi","Allahabad","Gorakhpur","Kanpur","Agra","Mathura","Bareilly","Meerut",
  "Patna","Gaya","Muzaffarpur","Darbhanga","Bhagalpur","Katihar",
  "Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh",
  "Amritsar","Jalandhar","Ludhiana","Chandigarh","Patiala","Bathinda",
  "Dehradun","Haridwar","Rishikesh","Roorkee","Haldwani","Ramnagar",
  "Shimla","Kalka","Solan","Mandi","Pathankot",
  "Jammu","Udhampur","Kathua","Samba",
  "Guwahati","Silchar","Dibrugarh","Jorhat","Tinsukia",
  "Agartala","Sabroom","Udaipur Tripura",
  "Bhubaneswar","Puri","Cuttack","Rourkela","Sambalpur","Berhampur","Balasore",
  "Raipur","Bilaspur","Durg","Rajnandgaon","Raigarh",
  "Kolhapur","Sangli","Satara","Solapur","Nashik","Manmad","Aurangabad",
  "Nanded","Latur","Jalgaon","Bhusawal","Akola","Amravati","Wardha",
  "Nagpur","Chandrapur","Gondia","Yavatmal",
  "Jodhpur","Udaipur","Jaisalmer","Ajmer","Kota","Bikaner","Chittorgarh",
  "Sikar","Alwar","Bharatpur","Sawai Madhopur","Sri Ganganagar","Hanumangarh",
  "Gwalior","Jabalpur","Indore","Ujjain","Ratlam","Khandwa","Bhopal",
  "Satna","Rewa","Katni","Sagar","Damoh","Chhindwara","Itarsi",
  "Howrah","Sealdah","Kharagpur","Asansol","Durgapur","Bardhaman","Siliguri",
  "Malda","Murshidabad","Krishnanagar","Berhampore",
  "Darjeeling","Kurseong","Ghum",   // Toy train only — very slow
  "Hyderabad","Secunderabad","Warangal","Nizamabad","Karimnagar","Khammam",
  "Mysore","Hubli","Dharwad","Belgaum","Mangalore","Davanagere","Shimoga",
  "Hassan","Tumkur","Kolar","Raichur","Bellary","Gulbarga","Bidar","Hospet",
  "Lonavala","Karjat","Panvel","Thane","Kalyan","Nashik Road","Igatpuri",
  "Shirdi","Kopargaon","Dhule","Nandurbar",
  "Kolhapur","Miraj","Karad","Satara","Wai","Lonand",
  "Vadodara","Anand","Bharuch","Surat","Navsari","Valsad","Vapi",
  "Mehsana","Patan","Sabarmati","Gandhinagar",
  "Bhuj","Gandhidham","Mundra","Rajkot","Junagadh","Veraval","Porbandar",
  "Gorakhpur","Varanasi","Ayodhya","Faizabad","Gonda","Bahraich",
  "Sitapur","Hardoi","Unnao","Rae Bareli","Sultanpur","Jaunpur",
  "Mathura","Vrindavan","Agra","Firozabad","Etawah","Kanpur",
  "Allahabad","Chitrakoot","Mirzapur","Robertsganj",
  "Ludhiana","Ferozepur","Firozpur","Kapurthala","Hoshiarpur","Gurdaspur",
  "Ajmer","Pushkar","Nasirabad","Phulera","Kuchaman",
  "Bokaro","Koderma","Hazaribagh","Ramgarh","Lohardaga","Khalari",
  "Nainital","Kathgodam","Haldwani","Lalkuan","Rudrapur","Kashipur",
  "Bhopal","Habibganj","Vidisha","Sehore","Hoshangabad","Itarsi","Betul",
  // Northeast lines
  "Guwahati","Kamakhya","New Guwahati","Lumding","Mariani","Furkating",
  "Dimapur","Halflong","Badarpur","New Bongaigaon","Rangiya",
  "Siliguri","New Jalpaiguri","Jalpaiguri","Malda Town",
  "Cooch Behar","Alipurduar","New Cooch Behar",
  // Andaman — NO trains at all (island)
  // Lakshadweep — NO trains
  // Ladakh — NO trains (only road)
]);

// ─── Cities WITHOUT any train service ─────────────────────────────────────────
// These locations are accessible only by road (bus/car)
const roadOnlyLocations = new Set([
  // Ladakh & Remote Himalayas
  "Leh","Kargil","Nubra Valley","Pangong Tso","Tso Moriri","Hanle","Zanskar",
  "Padum","Lamayuru","Alchi","Hemis","Diskit","Hunder","Khardung La",
  "Rohtang Pass","Solang Valley","Lahaul","Spiti","Kaza","Tabo","Kibber",
  "Langza","Hikkim","Chitkul","Sangla","Sarahan","Kalpa","Reckong Peo",
  // Kashmir hill areas  
  "Gulmarg","Pahalgam","Sonamarg","Yusmarg","Doodhpathri","Bhaderwah",
  // Uttarakhand high altitude
  "Kedarnath","Badrinath","Gangotri","Yamunotri","Valley of Flowers",
  "Hemkund Sahib","Auli","Chopta","Tungnath","Chandrashila",
  "Munsiyari","Milam","Pindari","Kausani","Ranikhet","Binsar","Chaukori",
  "Tehri Lake","Harsil","Barkot","Ukhimath","Guptkashi","Triyuginarayan",
  // HP remote
  "Kasol","Kheerganga","Manikaran","Jibhi","Jalori Pass","Shoja","Barot",
  "Tirthan Valley","Tabo","Kaza","Kibber","Dalhousie","Khajjiar",
  // NE remote
  "Tawang","Mechuka","Ziro","Along","Bomdila","Dirang","Seppa",
  "Dzukou Valley","Mawlynnong","Mawsynram","Cherrapunji","Dawki",
  "Gurudongmar Lake","Lachung","Lachen","Tsomgo Lake","Nathula Pass",
  "Yuksom","Pelling","Ravangla","Namchi",
  // Islands
  "Havelock Island","Neil Island","Baratang","Diglipur","Long Island",
  "Ross Island","Car Nicobar","Nancowry","Kavaratti","Agatti","Minicoy",
  "Bangaram","Kalpeni","Andrott","Amini",
  // Maharashtra remote
  "Chikhaldara","Amboli","Matheran",  // Matheran has toy train but no broad gauge
  // Hill stations road only
  "Pachmarhi","Daringbadi","Netarhat","Agumbe","Bisle Ghat",
  // Rajasthan sand dunes
  "Sam Sand Dunes","Khimsar","Kuldhara",
]);

// ─── Check if a city has an airport ──────────────────────────────────────────
export const hasAirport = (city) => citiesWithAirport.has(city);

// ─── Check if a city has a railway station ───────────────────────────────────
export const hasRailway = (city) => {
  if (roadOnlyLocations.has(city)) return false;
  return citiesWithRailway.has(city);
};

// ─── Get available transport modes for a city PAIR ───────────────────────────
export const getAvailableModes = (from, to, distance) => {
  const modes = [];

  // Flight: both cities must have airports AND min distance 150km
  if (hasAirport(from) && hasAirport(to) && distance >= 150) {
    modes.push("flight");
  }

  // Train: both cities must have railway stations
  if (hasRailway(from) && hasRailway(to)) {
    modes.push("train");
  }

  // Bus: always available for any road-accessible locations
  // (Islands may need ferry but we show bus as proxy for surface transport)
  const isIsland = (c) =>
    ["Havelock Island","Neil Island","Baratang","Diglipur","Long Island",
     "Ross Island","Car Nicobar","Kavaratti","Agatti","Minicoy","Bangaram"].includes(c);
  if (!isIsland(from) && !isIsland(to)) {
    modes.push("bus");
  }

  // Car: always available except for islands or pure air-only
  if (!isIsland(from) && !isIsland(to)) {
    modes.push("car");
  }

  // Bike: available for road-accessible routes up to 500 km
  if (!isIsland(from) && !isIsland(to) && distance <= 500) {
    modes.push("bike");
  }

  // Always ensure at least bus+car
  if (!modes.includes("bus")) modes.push("bus");
  if (!modes.includes("car")) modes.push("car");

  return modes;
};

// ─── Get reason why a mode is unavailable ────────────────────────────────────
export const getModeUnavailableReason = (mode, from, to, distance) => {
  if (mode === "flight") {
    if (!hasAirport(from) && !hasAirport(to))
      return `Neither ${from} nor ${to} has an airport`;
    if (!hasAirport(from))
      return `${from} does not have an airport`;
    if (!hasAirport(to))
      return `${to} does not have an airport`;
    if (distance < 150)
      return `Distance too short for flight (${distance} km < 150 km)`;
  }
  if (mode === "train") {
    if (!hasRailway(from) && !hasRailway(to))
      return `Neither ${from} nor ${to} has a railway station`;
    if (!hasRailway(from))
      return `${from} does not have a railway station (road-only)`;
    if (!hasRailway(to))
      return `${to} does not have a railway station (road-only)`;
  }
  if (mode === "bike") {
    if (distance > 500)
      return `Distance too long for bike ride (${distance} km > 500 km)`;
  }
  return null;
};

// ─── Transport Modes ──────────────────────────────────────────────────────────
export const transportModes = {
  flight: {
    name: "Flight",
    icon: "✈️",
    basePricePerKm: 6.5,
    minPrice: 2500,
    speedKmh: 800,
    features: ["Fastest", "Meals included", "Baggage allowance", "AC"],
    color: "#3B82F6"
  },
  train: {
    name: "Train",
    icon: "🚂",
    basePricePerKm: 1.2,
    minPrice: 300,
    speedKmh: 120,
    features: ["Sleeper available", "Pantry car", "Scenic views", "Economical"],
    color: "#10B981"
  },
  bus: {
    name: "Bus",
    icon: "🚌",
    basePricePerKm: 1.8,
    minPrice: 200,
    speedKmh: 60,
    features: ["Sleeper/AC options", "Frequent routes", "Door pickup", "Budget friendly"],
    color: "#F59E0B"
  },
  car: {
    name: "Car",
    icon: "🚗",
    basePricePerKm: 4.0,
    minPrice: 500,
    speedKmh: 80,
    features: ["Flexible timing", "Private", "Door to door", "Family friendly"],
    color: "#8B5CF6"
  },
  bike: {
    name: "Bike",
    icon: "🏍️",
    basePricePerKm: 2.5,
    minPrice: 300,
    speedKmh: 70,
    maxDistance: 500,
    features: ["Adventurous", "Fuel efficient", "Easy parking", "Solo/duo friendly"],
    color: "#EF4444"
  }
};

// ─── Hotel Data ──────────────────────────────────────────────────────────────
export const hotelCategories = {
  budget: {
    name: "Budget",
    icon: "🏨",
    pricePerNight: { min: 500, max: 1500 },
    rating: "2-3 ★",
    amenities: ["WiFi", "AC", "Breakfast (optional)", "24/7 reception"],
    color: "#6B7280"
  },
  standard: {
    name: "Standard",
    icon: "🏩",
    pricePerNight: { min: 1500, max: 4000 },
    rating: "3-4 ★",
    amenities: ["WiFi", "AC", "Breakfast included", "Swimming pool", "Gym"],
    color: "#3B82F6"
  },
  luxury: {
    name: "Luxury",
    icon: "🏰",
    pricePerNight: { min: 4000, max: 15000 },
    rating: "4-5 ★",
    amenities: ["WiFi", "AC", "All meals", "Spa", "Pool", "Concierge", "Airport transfer"],
    color: "#F59E0B"
  }
};

// ─── City Distance Matrix (approx km) ────────────────────────────────────────
export const cityDistances = {
  "Mumbai-Delhi": 1415,
  "Mumbai-Bangalore": 984,
  "Mumbai-Chennai": 1338,
  "Mumbai-Kolkata": 1968,
  "Mumbai-Hyderabad": 711,
  "Mumbai-Pune": 148,
  "Mumbai-Goa": 594,
  "Mumbai-Ahmedabad": 524,
  "Mumbai-Jaipur": 1153,
  "Delhi-Bangalore": 2150,
  "Delhi-Chennai": 2180,
  "Delhi-Kolkata": 1472,
  "Delhi-Hyderabad": 1575,
  "Delhi-Jaipur": 268,
  "Delhi-Agra": 204,
  "Delhi-Lucknow": 555,
  "Delhi-Chandigarh": 243,
  "Delhi-Amritsar": 452,
  "Delhi-Shimla": 340,
  "Bangalore-Chennai": 346,
  "Bangalore-Hyderabad": 575,
  "Bangalore-Kochi": 540,
  "Bangalore-Mysore": 143,
  "Chennai-Hyderabad": 625,
  "Chennai-Kochi": 684,
  "Kolkata-Darjeeling": 595,
  "Jaipur-Udaipur": 405,
  "Jaipur-Jodhpur": 335,
  "Jaipur-Agra": 232,
  "Varanasi-Agra": 565,
  "Rishikesh-Haridwar": 24,
  "Delhi-Manali": 540,
  "Delhi-Leh": 1000,
  "Delhi-Rishikesh": 238,
  "Amritsar-Chandigarh": 229
};

// ─── Popular Routes ──────────────────────────────────────────────────────────
export const popularRoutes = [
  { from: "Mumbai", to: "Goa", tag: "Beach Trip" },
  { from: "Delhi", to: "Jaipur", tag: "Heritage Tour" },
  { from: "Delhi", to: "Agra", tag: "Taj Mahal" },
  { from: "Bangalore", to: "Mysore", tag: "Royal Trip" },
  { from: "Delhi", to: "Manali", tag: "Mountain Escape" },
  { from: "Kolkata", to: "Darjeeling", tag: "Hill Station" }
];

// ─── Calculate Distance between two cities ──────────────────────────────────
// Imports extended hub distances and town-to-hub mappings for 700+ locations
import { hubDistances as extHubDistances, townToHub } from "./multiHopData.js";

export const getDistance = (city1, city2) => {
  if (!city1 || !city2 || city1 === city2) return 0;

  const k1 = `${city1}-${city2}`;
  const k2 = `${city2}-${city1}`;

  // 1. Direct lookup in original small table
  if (cityDistances[k1]) return cityDistances[k1];
  if (cityDistances[k2]) return cityDistances[k2];

  // 2. Direct lookup in extended hub distances table
  if (extHubDistances[k1]) return extHubDistances[k1];
  if (extHubDistances[k2]) return extHubDistances[k2];

  // 3. One city is a small town — route via its hub
  const h1 = townToHub[city1];
  const h2 = townToHub[city2];

  if (h1 && !h2) {
    // city1 is small town, city2 is a major city
    const hk1 = `${h1.hub}-${city2}`;
    const hk2 = `${city2}-${h1.hub}`;
    const hubDist = extHubDistances[hk1] || extHubDistances[hk2]
                 || cityDistances[hk1]   || cityDistances[hk2];
    if (hubDist) return h1.distToHub + hubDist;
  }

  if (!h1 && h2) {
    // city2 is small town, city1 is a major city
    const hk1 = `${city1}-${h2.hub}`;
    const hk2 = `${h2.hub}-${city1}`;
    const hubDist = extHubDistances[hk1] || extHubDistances[hk2]
                 || cityDistances[hk1]   || cityDistances[hk2];
    if (hubDist) return h2.distToHub + hubDist;
  }

  // 4. Both are small towns — chain via both hubs
  if (h1 && h2) {
    const hk1 = `${h1.hub}-${h2.hub}`;
    const hk2 = `${h2.hub}-${h1.hub}`;
    const hubDist = extHubDistances[hk1] || extHubDistances[hk2]
                 || cityDistances[hk1]   || cityDistances[hk2];
    if (hubDist) return h1.distToHub + hubDist + h2.distToHub;
    // hubs exist but no distance between them — use sum of hub distances as estimate
    return h1.distToHub + h2.distToHub + 250;
  }

  // 5. Deterministic fallback — consistent for same pair, avoids 0
  const hash = [...(city1 + "|" + city2)]
    .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffff, 0);
  return 300 + (hash % 700);
};

// ─── Calculate Transport Cost ────────────────────────────────────────────────
export const calculateTransportCost = (mode, distance, passengers) => {
  const transport = transportModes[mode];
  const baseCost = Math.max(transport.minPrice, distance * transport.basePricePerKm);
  const totalCost = baseCost * passengers;
  const durationHours = (distance / transport.speedKmh).toFixed(1);
  return {
    costPerPerson: Math.round(baseCost),
    totalCost: Math.round(totalCost),
    durationHours: parseFloat(durationHours)
  };
};

// ─── Calculate Hotel Cost ────────────────────────────────────────────────────
export const calculateHotelCost = (category, nights, rooms) => {
  const hotel = hotelCategories[category];
  const avgPrice = Math.floor((hotel.pricePerNight.min + hotel.pricePerNight.max) / 2);
  const totalCost = avgPrice * nights * rooms;
  return {
    pricePerNight: avgPrice,
    totalCost: Math.round(totalCost)
  };
};
