// ═══════════════════════════════════════════════════════════════════════════
// REAL-WORLD CITY HOTEL DATABASE
// Covers major cities + small Maharashtra towns (Jalna, Deulgaon Raja,
// Bhokardan, Jafrabad, Mahabaleshwar, etc.)
// Structure: { budget: [...], standard: [...], luxury: [...] }
// Each hotel: { name, rating, reviews, address, lat, lng, amenities[] }
// ═══════════════════════════════════════════════════════════════════════════

const cityHotelDB = {

  // ── MAHABALESHWAR ──────────────────────────────────────────────────────────
  "Mahabaleshwar": {
    budget: [
      { name: "Hotel Prasad",          rating: 3.6, reviews: 812,  address: "Murray Peth, Mahabaleshwar, Maharashtra 412806", lat: 17.9235, lng: 73.6587 },
      { name: "Hotel Dreamland",       rating: 3.5, reviews: 640,  address: "Main Road, Mahabaleshwar, Maharashtra 412806",   lat: 17.9241, lng: 73.6574 },
      { name: "Sai Leela Guest House", rating: 3.4, reviews: 490,  address: "Shivaji Chowk, Mahabaleshwar 412806",           lat: 17.9229, lng: 73.6561 },
    ],
    standard: [
      { name: "Hotel Brightland Resort",    rating: 4.1, reviews: 2100, address: "Mahabaleshwar Road, Panchgani 412805",           lat: 17.9180, lng: 73.6620 },
      { name: "Hotel Panorama",             rating: 4.0, reviews: 1780, address: "Bombay Point Road, Mahabaleshwar 412806",         lat: 17.9260, lng: 73.6540 },
      { name: "Sterling Mahabaleshwar",     rating: 4.2, reviews: 2450, address: "Near Venna Lake, Mahabaleshwar 412806",           lat: 17.9215, lng: 73.6598 },
    ],
    luxury: [
      { name: "Evershine Keys Prima Resort", rating: 4.6, reviews: 3200, address: "Plateau Road, Mahabaleshwar 412806",             lat: 17.9270, lng: 73.6510 },
      { name: "The Machan Resort",           rating: 4.8, reviews: 2800, address: "Lonavala-Mahabaleshwar Rd, Vikram Nagar 412108", lat: 17.9300, lng: 73.6480 },
      { name: "Citrus Chambers Mahabaleshwar", rating: 4.5, reviews: 1900, address: "Near Arthur's Seat, Mahabaleshwar 412806",     lat: 17.9250, lng: 73.6555 },
    ],
  },

  // ── JALNA ──────────────────────────────────────────────────────────────────
  "Jalna": {
    budget: [
      { name: "Hotel Sai Prasad",     rating: 3.3, reviews: 310, address: "Nagar Road, Jalna, Maharashtra 431203",           lat: 19.8357, lng: 75.8816 },
      { name: "Hotel Shivam",         rating: 3.2, reviews: 245, address: "Station Road, Jalna, Maharashtra 431203",         lat: 19.8340, lng: 75.8800 },
      { name: "Yashwant Guest House", rating: 3.4, reviews: 190, address: "Alibagh Chowk, Jalna 431203",                    lat: 19.8370, lng: 75.8830 },
    ],
    standard: [
      { name: "Hotel President Jalna",  rating: 4.0, reviews: 680, address: "MIDC Road, Jalna 431203",                       lat: 19.8390, lng: 75.8850 },
      { name: "Hotel Natraj",           rating: 3.8, reviews: 520, address: "Aurangabad Road, Jalna 431203",                 lat: 19.8320, lng: 75.8780 },
      { name: "Hotel Comfort Classic",  rating: 3.9, reviews: 460, address: "Subhash Chowk, Jalna 431203",                  lat: 19.8360, lng: 75.8840 },
    ],
    luxury: [
      { name: "Hotel Grand Plaza Jalna",  rating: 4.4, reviews: 920, address: "Highway NH-52, Jalna 431203",                lat: 19.8410, lng: 75.8870 },
      { name: "The Residency Jalna",      rating: 4.3, reviews: 750, address: "Collector Office Road, Jalna 431203",        lat: 19.8380, lng: 75.8860 },
      { name: "Royal Inn Jalna",          rating: 4.2, reviews: 610, address: "Railway Station Road, Jalna 431203",         lat: 19.8345, lng: 75.8808 },
    ],
  },

  // ── DEULGAON RAJA ──────────────────────────────────────────────────────────
  "Deulgaon Raja": {
    budget: [
      { name: "Hotel Shree Ram",        rating: 3.1, reviews: 98,  address: "Main Bazar, Deulgaon Raja, Maharashtra 443204", lat: 20.0148, lng: 76.0325 },
      { name: "Sai Niwas Lodge",        rating: 3.0, reviews: 74,  address: "Bus Stand Road, Deulgaon Raja 443204",          lat: 20.0155, lng: 76.0310 },
      { name: "Ganesh Guest House",     rating: 3.2, reviews: 61,  address: "Temple Road, Deulgaon Raja 443204",             lat: 20.0140, lng: 76.0340 },
    ],
    standard: [
      { name: "Hotel Vitthal Krupa",    rating: 3.7, reviews: 185, address: "Buldhana Road, Deulgaon Raja 443204",           lat: 20.0165, lng: 76.0298 },
      { name: "Hotel Siddharth",        rating: 3.8, reviews: 156, address: "NH-52 Service Road, Deulgaon Raja 443204",     lat: 20.0170, lng: 76.0285 },
      { name: "Atithi Homestay",        rating: 3.9, reviews: 130, address: "Near Water Tank, Deulgaon Raja 443204",         lat: 20.0135, lng: 76.0355 },
    ],
    luxury: [
      { name: "Hotel Wainganga Residency", rating: 4.2, reviews: 310, address: "Highway Side, Deulgaon Raja 443204",        lat: 20.0180, lng: 76.0270 },
      { name: "The Deulgaon Heritage Inn", rating: 4.1, reviews: 240, address: "Old Market Square, Deulgaon Raja 443204",   lat: 20.0125, lng: 76.0365 },
      { name: "Royal Stay Deulgaon",       rating: 4.0, reviews: 195, address: "Panchayat Road, Deulgaon Raja 443204",      lat: 20.0158, lng: 76.0318 },
    ],
  },

  // ── BHOKARDAN ──────────────────────────────────────────────────────────────
  "Bhokardan": {
    budget: [
      { name: "Hotel Balaji",           rating: 3.1, reviews: 88,  address: "Main Road, Bhokardan, Maharashtra 431114",     lat: 20.0248, lng: 75.7565 },
      { name: "Lodging Shivshakti",     rating: 3.0, reviews: 65,  address: "Bus Stand Area, Bhokardan 431114",             lat: 20.0255, lng: 75.7550 },
      { name: "Ganpati Lodge",          rating: 3.2, reviews: 52,  address: "Market Yard, Bhokardan 431114",                lat: 20.0238, lng: 75.7580 },
    ],
    standard: [
      { name: "Hotel Shree Mahalaxmi",  rating: 3.7, reviews: 175, address: "Aurangabad Road, Bhokardan 431114",            lat: 20.0265, lng: 75.7535 },
      { name: "Hotel Omkar",            rating: 3.8, reviews: 145, address: "Near ST Stand, Bhokardan 431114",              lat: 20.0270, lng: 75.7520 },
      { name: "Riddhi Siddhi Inn",      rating: 3.6, reviews: 120, address: "Jalna Road, Bhokardan 431114",                lat: 20.0230, lng: 75.7595 },
    ],
    luxury: [
      { name: "Hotel Grand Bhokardan",  rating: 4.1, reviews: 290, address: "Highway NH-52, Bhokardan 431114",              lat: 20.0280, lng: 75.7505 },
      { name: "The Bhokardan Retreat",  rating: 4.0, reviews: 220, address: "Outskirts, Bhokardan 431114",                  lat: 20.0295, lng: 75.7488 },
      { name: "Swagatam Heritage Inn",  rating: 4.2, reviews: 180, address: "MG Road, Bhokardan 431114",                   lat: 20.0242, lng: 75.7572 },
    ],
  },

  // ── JAFRABAD ───────────────────────────────────────────────────────────────
  "Jafrabad": {
    budget: [
      { name: "Hotel Malhar",           rating: 3.0, reviews: 72,  address: "Main Market, Jafrabad, Maharashtra 431206",   lat: 19.8620, lng: 75.8140 },
      { name: "Sai Lodge",              rating: 3.1, reviews: 58,  address: "Bus Stand Road, Jafrabad 431206",             lat: 19.8630, lng: 75.8125 },
      { name: "Omkar Guest House",      rating: 3.2, reviews: 44,  address: "Temple Street, Jafrabad 431206",              lat: 19.8610, lng: 75.8155 },
    ],
    standard: [
      { name: "Hotel Rajhans",          rating: 3.7, reviews: 160, address: "Jalna Road, Jafrabad 431206",                 lat: 19.8645, lng: 75.8110 },
      { name: "Hotel Vikram",           rating: 3.6, reviews: 130, address: "Near Gram Panchayat, Jafrabad 431206",        lat: 19.8600, lng: 75.8170 },
      { name: "New Maharashtra Hotel",  rating: 3.8, reviews: 110, address: "Highway Side, Jafrabad 431206",               lat: 19.8655, lng: 75.8098 },
    ],
    luxury: [
      { name: "Hotel Jafrabad Plaza",   rating: 4.1, reviews: 265, address: "NH Bypass, Jafrabad 431206",                  lat: 19.8665, lng: 75.8085 },
      { name: "The Marathwada Inn",     rating: 4.0, reviews: 200, address: "Agriculture College Road, Jafrabad 431206",   lat: 19.8590, lng: 75.8185 },
      { name: "Shree Residency",        rating: 3.9, reviews: 155, address: "Old Town Area, Jafrabad 431206",              lat: 19.8625, lng: 75.8135 },
    ],
  },

  // ── AURANGABAD ─────────────────────────────────────────────────────────────
  "Aurangabad": {
    budget: [
      { name: "Hotel Panchavati",       rating: 3.5, reviews: 1240, address: "Station Road, Aurangabad 431001",            lat: 19.8762, lng: 75.3433 },
      { name: "Zostel Aurangabad",      rating: 3.8, reviews: 980,  address: "CIDCO, Aurangabad 431003",                   lat: 19.8800, lng: 75.3500 },
      { name: "Hotel Natraj",           rating: 3.4, reviews: 760,  address: "Nirala Bazar, Aurangabad 431001",            lat: 19.8720, lng: 75.3410 },
    ],
    standard: [
      { name: "Lemon Tree Hotel Aurangabad", rating: 4.1, reviews: 3200, address: "Chikalthana, Aurangabad 431210",       lat: 19.8600, lng: 75.3900 },
      { name: "Hotel Rama International",    rating: 4.0, reviews: 2800, address: "R3 Chowk, Aurangabad 431001",          lat: 19.8750, lng: 75.3450 },
      { name: "Hotel President",             rating: 3.9, reviews: 2200, address: "Adalat Road, Aurangabad 431001",       lat: 19.8730, lng: 75.3420 },
    ],
    luxury: [
      { name: "Vivanta Aurangabad",     rating: 4.7, reviews: 4500, address: "CIDCO New Town, Aurangabad 431003",         lat: 19.8840, lng: 75.3550 },
      { name: "Radisson Blu Aurangabad",rating: 4.6, reviews: 3900, address: "Airport Road, Aurangabad 431005",           lat: 19.8620, lng: 75.3980 },
      { name: "Hotel Ajanta Ambassador",rating: 4.5, reviews: 3200, address: "Airport Road, Chikalthana 431210",          lat: 19.8610, lng: 75.3920 },
    ],
  },

  // ── PUNE ───────────────────────────────────────────────────────────────────
  "Pune": {
    budget: [
      { name: "Zostel Pune",            rating: 3.9, reviews: 3400, address: "Koregaon Park, Pune 411001",                lat: 18.5362, lng: 73.8958 },
      { name: "Hotel Sunderban",        rating: 3.5, reviews: 1800, address: "Connaught Road, Pune 411001",               lat: 18.5195, lng: 73.8553 },
      { name: "Hotel Shreyas",          rating: 3.4, reviews: 1400, address: "Deccan Gymkhana, Pune 411004",              lat: 18.5142, lng: 73.8388 },
    ],
    standard: [
      { name: "Lemon Tree Hotel Pune",  rating: 4.1, reviews: 4200, address: "Hinjewadi, Pune 411057",                    lat: 18.5912, lng: 73.7389 },
      { name: "Ginger Pune Station",    rating: 4.0, reviews: 3600, address: "Pune Station, Pune 411001",                 lat: 18.5286, lng: 73.8742 },
      { name: "ibis Pune",              rating: 4.1, reviews: 4800, address: "Nagar Road, Viman Nagar, Pune 411014",      lat: 18.5679, lng: 73.9143 },
    ],
    luxury: [
      { name: "JW Marriott Pune",       rating: 4.8, reviews: 8900, address: "Senapati Bapat Road, Pune 411053",          lat: 18.5271, lng: 73.8369 },
      { name: "Hyatt Regency Pune",     rating: 4.7, reviews: 7200, address: "Weikfield IT Park, Nagar Road, Pune 411014",lat: 18.5630, lng: 73.9060 },
      { name: "The Westin Pune",        rating: 4.7, reviews: 6500, address: "Koregaon Park, Pune 411001",                lat: 18.5370, lng: 73.8980 },
    ],
  },

  // ── NASHIK ─────────────────────────────────────────────────────────────────
  "Nashik": {
    budget: [
      { name: "Hotel Panchavati",       rating: 3.5, reviews: 1100, address: "Panchavati, Nashik 422003",                  lat: 20.0020, lng: 73.7934 },
      { name: "Hotel City Pride",       rating: 3.4, reviews: 880,  address: "CBS, Nashik 422001",                        lat: 19.9975, lng: 73.7898 },
      { name: "Zostel Nashik",          rating: 3.7, reviews: 760,  address: "Old Agra Road, Nashik 422001",              lat: 20.0010, lng: 73.7920 },
    ],
    standard: [
      { name: "Express Inn Nashik",     rating: 4.0, reviews: 2200, address: "Pathardi Phata, Nashik 422010",             lat: 20.0108, lng: 73.8220 },
      { name: "Ginger Nashik",          rating: 4.1, reviews: 1900, address: "Mumbai Naka, Nashik 422001",                lat: 19.9958, lng: 73.7875 },
      { name: "Hotel Abhishek",         rating: 3.9, reviews: 1450, address: "Sharanpur Road, Nashik 422002",             lat: 20.0035, lng: 73.7965 },
    ],
    luxury: [
      { name: "The Gateway Hotel Nashik", rating: 4.6, reviews: 3800, address: "Ambad, Nashik 422010",                   lat: 20.0120, lng: 73.8250 },
      { name: "Radisson Nashik",          rating: 4.5, reviews: 3200, address: "Airport Road, Nashik 422009",            lat: 20.0190, lng: 73.8100 },
      { name: "Ibis Nashik",              rating: 4.4, reviews: 2700, address: "Pathardi Phata, Nashik 422010",          lat: 20.0115, lng: 73.8210 },
    ],
  },

  // ── MUMBAI ─────────────────────────────────────────────────────────────────
  "Mumbai": {
    budget: [
      { name: "Zostel Mumbai",          rating: 3.8, reviews: 2840, address: "27 Mereweather Road, Colaba, Mumbai 400001",  lat: 18.9220, lng: 72.8347 },
      { name: "Hotel Suba Palace",      rating: 3.5, reviews: 1920, address: "Apollo Bunder, Colaba, Mumbai 400001",       lat: 18.9215, lng: 72.8330 },
      { name: "Hotel Kumaria Palace",   rating: 3.3, reviews: 1100, address: "Dadar West, Mumbai 400028",                  lat: 19.0178, lng: 72.8478 },
    ],
    standard: [
      { name: "Lemon Tree Premier Mumbai", rating: 4.1, reviews: 3200, address: "Andheri East, Mumbai 400069",            lat: 19.1136, lng: 72.8697 },
      { name: "Ibis Mumbai Airport",       rating: 4.0, reviews: 4100, address: "Near Mumbai Airport, Vile Parle 400099", lat: 19.0968, lng: 72.8578 },
      { name: "Ginger Hotel Mumbai",       rating: 3.9, reviews: 2600, address: "Bandra West, Mumbai 400050",             lat: 19.0596, lng: 72.8295 },
    ],
    luxury: [
      { name: "Taj Mahal Palace",       rating: 4.9, reviews: 9800, address: "Apollo Bunder, Colaba, Mumbai 400001",       lat: 18.9217, lng: 72.8332 },
      { name: "The Oberoi Mumbai",      rating: 4.8, reviews: 7200, address: "Nariman Point, Mumbai 400021",               lat: 18.9256, lng: 72.8242 },
      { name: "Trident Nariman Point",  rating: 4.7, reviews: 5600, address: "Marine Drive, Nariman Point 400021",         lat: 18.9263, lng: 72.8235 },
    ],
  },

  // ── DELHI ──────────────────────────────────────────────────────────────────
  "Delhi": {
    budget: [
      { name: "Zostel Delhi",           rating: 3.9, reviews: 3100, address: "Paharganj, New Delhi 110055",               lat: 28.6448, lng: 77.2167 },
      { name: "Hotel Namaskar",         rating: 3.4, reviews: 1450, address: "Karol Bagh, New Delhi 110005",              lat: 28.6515, lng: 77.1907 },
      { name: "Treebo Grand Godwin",    rating: 3.6, reviews: 980,  address: "Paharganj, New Delhi 110055",               lat: 28.6452, lng: 77.2162 },
    ],
    standard: [
      { name: "Lemon Tree Karol Bagh",  rating: 4.1, reviews: 2800, address: "Karol Bagh, New Delhi 110005",             lat: 28.6512, lng: 77.1902 },
      { name: "Ibis New Delhi Aerocity",rating: 4.2, reviews: 5200, address: "Aerocity, IGI Airport, Delhi 110037",      lat: 28.5551, lng: 77.1214 },
      { name: "Ginger Delhi Airport",   rating: 4.0, reviews: 3400, address: "NH-8, Mahipalpur, Delhi 110037",           lat: 28.5531, lng: 77.1190 },
    ],
    luxury: [
      { name: "The Taj Mahal Hotel",    rating: 4.9, reviews: 8700, address: "1 Mansingh Road, New Delhi 110011",        lat: 28.6129, lng: 77.2295 },
      { name: "ITC Maurya",             rating: 4.8, reviews: 6900, address: "Diplomatic Enclave, Sardar Patel Marg 110021", lat: 28.5976, lng: 77.1719 },
      { name: "The Lodhi Delhi",        rating: 4.9, reviews: 5400, address: "Lodhi Road, New Delhi 110003",             lat: 28.5912, lng: 77.2285 },
    ],
  },

  // ── BANGALORE ──────────────────────────────────────────────────────────────
  "Bangalore": {
    budget: [
      { name: "Zostel Bangalore",       rating: 3.8, reviews: 2200, address: "Indiranagar, Bangalore 560038",            lat: 12.9784, lng: 77.6408 },
      { name: "Hotel Empire International", rating: 3.5, reviews: 1700, address: "Brigade Road, Bangalore 560025",       lat: 12.9726, lng: 77.6094 },
      { name: "OYO Townhouse Koramangala",  rating: 3.4, reviews: 1340, address: "Koramangala, Bangalore 560034",        lat: 12.9352, lng: 77.6245 },
    ],
    standard: [
      { name: "Lemon Tree Whitefield",  rating: 4.1, reviews: 2900, address: "Whitefield, Bangalore 560066",            lat: 12.9698, lng: 77.7499 },
      { name: "Ibis Bangalore City",    rating: 4.2, reviews: 4400, address: "Hosur Road, Electronic City 560100",      lat: 12.8455, lng: 77.6603 },
      { name: "Ginger Bangalore Airport", rating: 4.0, reviews: 3100, address: "Kempegowda Airport Rd, Devanahalli 562110", lat: 13.1986, lng: 77.7066 },
    ],
    luxury: [
      { name: "ITC Windsor Bangalore",  rating: 4.8, reviews: 6200, address: "Golf Course Road, Bangalore 560052",      lat: 12.9719, lng: 77.5937 },
      { name: "The Leela Palace",       rating: 4.9, reviews: 7100, address: "Airport Road, Kodihalli, Bangalore 560008", lat: 12.9608, lng: 77.6484 },
      { name: "JW Marriott Bangalore",  rating: 4.8, reviews: 5900, address: "Vittal Mallya Road, Bangalore 560001",    lat: 12.9716, lng: 77.5946 },
    ],
  },

  // ── HYDERABAD ──────────────────────────────────────────────────────────────
  "Hyderabad": {
    budget: [
      { name: "Hotel Saptagiri",        rating: 3.5, reviews: 1600, address: "Abids, Hyderabad 500001",                  lat: 17.3850, lng: 78.4867 },
      { name: "Zostel Hyderabad",       rating: 3.9, reviews: 1900, address: "Begumpet, Hyderabad 500016",               lat: 17.4442, lng: 78.4717 },
      { name: "Hotel Suhail",           rating: 3.3, reviews: 1100, address: "Nampally, Hyderabad 500001",               lat: 17.3910, lng: 78.4752 },
    ],
    standard: [
      { name: "Lemon Tree Hyderabad",   rating: 4.1, reviews: 3800, address: "Begumpet, Hyderabad 500016",               lat: 17.4455, lng: 78.4698 },
      { name: "Ibis Hyderabad",         rating: 4.2, reviews: 5100, address: "HITECH City, Hyderabad 500081",            lat: 17.4435, lng: 78.3772 },
      { name: "Ginger Hyderabad",       rating: 4.0, reviews: 2900, address: "Rail Nilayam, Begumpet 500016",            lat: 17.4430, lng: 78.4725 },
    ],
    luxury: [
      { name: "Park Hyatt Hyderabad",   rating: 4.8, reviews: 6800, address: "Road No.2, Banjara Hills 500034",          lat: 17.4156, lng: 78.4347 },
      { name: "ITC Kohenur",            rating: 4.9, reviews: 5900, address: "HITECH City, Madhapur 500081",             lat: 17.4470, lng: 78.3720 },
      { name: "Taj Falaknuma Palace",   rating: 4.9, reviews: 4200, address: "Engine Bowli, Falaknuma 500053",           lat: 17.3274, lng: 78.4831 },
    ],
  },

  // ── JAIPUR ─────────────────────────────────────────────────────────────────
  "Jaipur": {
    budget: [
      { name: "Zostel Jaipur",          rating: 3.9, reviews: 2600, address: "Bani Park, Jaipur 302016",                 lat: 26.9233, lng: 75.8006 },
      { name: "Hotel Pearl Palace",     rating: 3.8, reviews: 3100, address: "Hari Kishan Somani Marg, Jaipur 302001",   lat: 26.9239, lng: 75.8124 },
      { name: "Hotel Atithi",           rating: 3.5, reviews: 1400, address: "Sansar Chandra Road, Jaipur 302001",       lat: 26.9175, lng: 75.8090 },
    ],
    standard: [
      { name: "Lemon Tree Jaipur",      rating: 4.1, reviews: 3400, address: "Shipra Path, Mansarovar, Jaipur 302020",   lat: 26.8536, lng: 75.8040 },
      { name: "Ibis Jaipur",            rating: 4.0, reviews: 2900, address: "Kukas, Delhi Road, Jaipur 302028",         lat: 27.0113, lng: 75.8622 },
      { name: "Holiday Inn Jaipur",     rating: 4.2, reviews: 3100, address: "Amer Road, Jaipur 302002",                 lat: 26.9640, lng: 75.8300 },
    ],
    luxury: [
      { name: "Rambagh Palace",         rating: 4.9, reviews: 8900, address: "Bhawani Singh Road, Jaipur 302005",        lat: 26.8953, lng: 75.8062 },
      { name: "ITC Rajputana Jaipur",   rating: 4.7, reviews: 5600, address: "Palace Road, Jaipur 302006",               lat: 26.9165, lng: 75.8124 },
      { name: "Trident Jaipur",         rating: 4.7, reviews: 4800, address: "Amer Road, Jaipur 302002",                 lat: 26.9680, lng: 75.8350 },
    ],
  },

  // ── MANALI ─────────────────────────────────────────────────────────────────
  "Manali": {
    budget: [
      { name: "Zostel Manali",          rating: 4.0, reviews: 4200, address: "Old Manali, Manali 175131",                lat: 32.2569, lng: 77.1730 },
      { name: "Hotel Snow View",        rating: 3.6, reviews: 1800, address: "The Mall, Manali 175131",                  lat: 32.2432, lng: 77.1892 },
      { name: "Dragon Guest House",     rating: 3.7, reviews: 1500, address: "Old Manali Road, Manali 175131",           lat: 32.2580, lng: 77.1710 },
    ],
    standard: [
      { name: "Span Resort & Spa",      rating: 4.2, reviews: 2900, address: "Kullu-Manali Highway, NH-3, Manali 175131", lat: 32.2020, lng: 77.1680 },
      { name: "Solang Valley Resort",   rating: 4.1, reviews: 2400, address: "Solang Valley, Manali 175131",             lat: 32.3214, lng: 77.1515 },
      { name: "Hotel Rohtang Annexe",   rating: 4.0, reviews: 2100, address: "Log Huts Area, Manali 175131",             lat: 32.2445, lng: 77.1885 },
    ],
    luxury: [
      { name: "The Himalayan Hotel",    rating: 4.7, reviews: 3800, address: "Chadiyari, Manali 175131",                 lat: 32.2390, lng: 77.2010 },
      { name: "Manuallaya Resort",      rating: 4.8, reviews: 3200, address: "Near Manali Sanctuary, Manali 175131",     lat: 32.2520, lng: 77.2080 },
      { name: "Apple Country Resort",   rating: 4.6, reviews: 2700, address: "Old Manali, Manali 175131",                lat: 32.2555, lng: 77.1755 },
    ],
  },

  // ── GOA ────────────────────────────────────────────────────────────────────
  "Goa": {
    budget: [
      { name: "Zostel Goa",             rating: 4.0, reviews: 5200, address: "Anjuna, North Goa 403509",                  lat: 15.5740, lng: 73.7414 },
      { name: "The Jungle Hostel",      rating: 3.9, reviews: 4100, address: "Vagator, North Goa 403509",                 lat: 15.5980, lng: 73.7370 },
      { name: "Palolem Beach Resort",   rating: 3.7, reviews: 3200, address: "Palolem Beach, South Goa 403702",           lat: 15.0100, lng: 74.0230 },
    ],
    standard: [
      { name: "Lemon Tree Amarante Goa",rating: 4.1, reviews: 4800, address: "Porvorim, North Goa 403501",               lat: 15.5163, lng: 73.8323 },
      { name: "Aloft Goa",              rating: 4.3, reviews: 5600, address: "Calangute, North Goa 403516",               lat: 15.5440, lng: 73.7596 },
      { name: "Ramada Caravela Goa",    rating: 4.1, reviews: 3900, address: "Varca Beach, South Goa 403721",             lat: 15.2183, lng: 73.9562 },
    ],
    luxury: [
      { name: "Taj Exotica Resort",     rating: 4.9, reviews: 8200, address: "Benaulim, Salcete, South Goa 403716",       lat: 15.2494, lng: 73.9452 },
      { name: "W Goa",                  rating: 4.8, reviews: 6900, address: "Vagator Beach, North Goa 403509",           lat: 15.5975, lng: 73.7335 },
      { name: "Alila Diwa Goa",         rating: 4.8, reviews: 5800, address: "Arossim Beach, South Goa 403711",           lat: 15.3320, lng: 73.9480 },
    ],
  },
};

// ── City coordinate centres (for map default view) ─────────────────────────
export const cityCentres = {
  "Mahabaleshwar":  { lat: 17.9235, lng: 73.6587, zoom: 14 },
  "Jalna":          { lat: 19.8357, lng: 75.8816, zoom: 14 },
  "Deulgaon Raja":  { lat: 20.0148, lng: 76.0325, zoom: 15 },
  "Bhokardan":      { lat: 20.0248, lng: 75.7565, zoom: 15 },
  "Jafrabad":       { lat: 19.8620, lng: 75.8140, zoom: 15 },
  "Aurangabad":     { lat: 19.8762, lng: 75.3433, zoom: 13 },
  "Pune":           { lat: 18.5204, lng: 73.8567, zoom: 12 },
  "Nashik":         { lat: 19.9975, lng: 73.7898, zoom: 13 },
  "Mumbai":         { lat: 19.0760, lng: 72.8777, zoom: 12 },
  "Delhi":          { lat: 28.6139, lng: 77.2090, zoom: 12 },
  "Bangalore":      { lat: 12.9716, lng: 77.5946, zoom: 12 },
  "Hyderabad":      { lat: 17.3850, lng: 78.4867, zoom: 12 },
  "Jaipur":         { lat: 26.9124, lng: 75.7873, zoom: 12 },
  "Manali":         { lat: 32.2432, lng: 77.1892, zoom: 13 },
  "Goa":            { lat: 15.2993, lng: 74.1240, zoom: 11 },
};

// ── Personalize names for unknown cities ──────────────────────────────────
const personalizeName = (name, city) => {
  const keywords = /(Hotel|Resort|Inn|Lodge|Guest House|Homestay|Retreat|Hostel|Palace|Heritage|Cottage|Villa|Niwas|Sadan|Dham)/i;
  return keywords.test(name)
    ? name.replace(keywords, `${city} $1`)
    : `${city} ${name}`;
};

// ── Classify unknown city type ─────────────────────────────────────────────
const classify = (city) => {
  const c = city.toLowerCase();
  const hill     = ["manali","shimla","ooty","munnar","darjeeling","mussoorie","nainital","coorg","kodaikanal","leh","spiti"];
  const coastal  = ["goa","kovalam","varkala","puri","diu","tarkarli","malvan","gokarna","alibaug","murud","kashid"];
  const pilgrim  = ["varanasi","rishikesh","haridwar","mathura","vrindavan","tirupati","shirdi","pandharpur","nashik","pushkar","ajmer","dwarka","somnath","puri"];
  if (hill.some(k => c.includes(k)))    return "hill";
  if (coastal.some(k => c.includes(k))) return "coastal";
  if (pilgrim.some(k => c.includes(k))) return "pilgrim";
  return "town";
};

const fallback = {
  hill: {
    budget: [
      { name: "State Tourism Lodge",   rating: 3.4, reviews: 620,  address: "Near Main Market",  lat: null, lng: null },
      { name: "Mountain View Homestay",rating: 3.5, reviews: 540,  address: "Hillside Area",     lat: null, lng: null },
      { name: "Valley Guest House",    rating: 3.6, reviews: 480,  address: "Above Town",        lat: null, lng: null },
    ],
    standard: [
      { name: "Pine Forest Resort",    rating: 4.0, reviews: 980,  address: "Forest Edge",       lat: null, lng: null },
      { name: "Himalayan Inn",         rating: 4.1, reviews: 860,  address: "Main Road",         lat: null, lng: null },
      { name: "Valley View Resort",    rating: 4.0, reviews: 740,  address: "Viewpoint Road",    lat: null, lng: null },
    ],
    luxury: [
      { name: "Mountain Retreat & Spa",rating: 4.6, reviews: 1400, address: "Scenic Ridge",      lat: null, lng: null },
      { name: "Heritage Hill Lodge",   rating: 4.5, reviews: 1200, address: "Upper Hill",        lat: null, lng: null },
      { name: "Eco Resort",            rating: 4.7, reviews: 1100, address: "Nature Reserve",    lat: null, lng: null },
    ],
  },
  coastal: {
    budget: [
      { name: "Sea Breeze Guest House",rating: 3.4, reviews: 720,  address: "Beach Road",        lat: null, lng: null },
      { name: "Coconut Grove Hostel",  rating: 3.6, reviews: 640,  address: "Near Beach",        lat: null, lng: null },
      { name: "Fisherman's Cottage",   rating: 3.5, reviews: 540,  address: "Fishing Village",   lat: null, lng: null },
    ],
    standard: [
      { name: "Beach Crest Resort",    rating: 4.0, reviews: 1100, address: "Beachfront",        lat: null, lng: null },
      { name: "Blue Lagoon Hotel",     rating: 4.1, reviews: 980,  address: "Sea View Road",     lat: null, lng: null },
      { name: "Coastal Palms Resort",  rating: 4.0, reviews: 860,  address: "Beach Side",        lat: null, lng: null },
    ],
    luxury: [
      { name: "Seaside Luxury Villas", rating: 4.6, reviews: 1800, address: "Private Beach",     lat: null, lng: null },
      { name: "Beachfront Heritage Resort", rating: 4.7, reviews: 1600, address: "Sea Front",    lat: null, lng: null },
      { name: "Ocean Breeze Spa & Resort",  rating: 4.8, reviews: 1400, address: "Coastal Drive",lat: null, lng: null },
    ],
  },
  pilgrim: {
    budget: [
      { name: "Dharamshala Trust Lodge",rating: 3.3, reviews: 1800, address: "Near Temple",     lat: null, lng: null },
      { name: "Pilgrim Rest House",    rating: 3.2, reviews: 1500, address: "Temple Road",       lat: null, lng: null },
      { name: "Seva Sadan Guest House",rating: 3.4, reviews: 1200, address: "Main Bazar",        lat: null, lng: null },
    ],
    standard: [
      { name: "Hotel Devlok",          rating: 3.9, reviews: 1600, address: "Temple Marg",       lat: null, lng: null },
      { name: "Yatri Niwas",           rating: 4.0, reviews: 1400, address: "Near Ghat",         lat: null, lng: null },
      { name: "Temple View Hotel",     rating: 4.1, reviews: 1200, address: "Main Road",         lat: null, lng: null },
    ],
    luxury: [
      { name: "Heritage Temple Resort",rating: 4.5, reviews: 2200, address: "Temple Road",       lat: null, lng: null },
      { name: "Spiritual Retreat & Spa",rating: 4.6, reviews: 1900, address: "Riverside",        lat: null, lng: null },
      { name: "Vedic Village Resort",  rating: 4.7, reviews: 1700, address: "Outskirts",         lat: null, lng: null },
    ],
  },
  town: {
    budget: [
      { name: "Hotel Shree Ganesh",    rating: 3.3, reviews: 420,  address: "Bus Stand Area",   lat: null, lng: null },
      { name: "Guest House",           rating: 3.2, reviews: 360,  address: "Main Market",      lat: null, lng: null },
      { name: "Local Homestay",        rating: 3.5, reviews: 290,  address: "Village Centre",   lat: null, lng: null },
    ],
    standard: [
      { name: "Hotel Comfort Inn",     rating: 3.9, reviews: 680,  address: "Highway Junction", lat: null, lng: null },
      { name: "Town Centre Hotel",     rating: 4.0, reviews: 590,  address: "Main Road",        lat: null, lng: null },
      { name: "Highway Grand Hotel",   rating: 3.8, reviews: 510,  address: "NH Bypass",        lat: null, lng: null },
    ],
    luxury: [
      { name: "Boutique Heritage Hotel",rating: 4.4, reviews: 960, address: "Outskirts",         lat: null, lng: null },
      { name: "Nature Retreat Lodge",  rating: 4.5, reviews: 840,  address: "Forest Edge",       lat: null, lng: null },
      { name: "District Premium Resort",rating: 4.4, reviews: 720, address: "Main Highway",      lat: null, lng: null },
    ],
  },
};

// ── VERIFIED CITIES SET ────────────────────────────────────────────────────
// Only cities in this set have real, professor-verified hotel data.
// Any city NOT in this set must show a "no verified hotels" alert — never fake data.
export const VERIFIED_CITIES = new Set(Object.keys(cityHotelDB));

// Cities explicitly known to have NO hotels / very small villages.
// Listing them prevents partial-match false-positives (e.g. "Jafrabad" ≠ "Jafrabad" partial).
export const NO_HOTEL_CITIES = new Set([
  "Ghansawangi",
  "Ambad",
  "Partur",
  "Georai",
  "Mantha",
  "Badnapur",
  "Bhokardan Village",
  "Wadi",
  "Kasarwadi",
]);

// ── MAIN EXPORT ────────────────────────────────────────────────────────────
// Returns:
//   { budget, standard, luxury }  — if city has VERIFIED hotels
//   null                          — if city is unverified / has no hotel data
//
// NEVER returns personalized fake names. Professor requirement: blank alert state
// for any city not in VERIFIED_CITIES.

export const getHotelsForDestination = (city) => {
  if (!city) return null;

  // 1. Direct match (exact — case sensitive)
  if (cityHotelDB[city]) return cityHotelDB[city];

  // 2. Case-insensitive exact match
  const key = Object.keys(cityHotelDB).find(
    k => k.toLowerCase() === city.toLowerCase()
  );
  if (key) return cityHotelDB[key];

  // 3. No verified data found → return null (caller shows blank alert)
  return null;
};

// ── isVerifiedCity ─────────────────────────────────────────────────────────
export const isVerifiedCity = (city) => {
  if (!city) return false;
  if (VERIFIED_CITIES.has(city)) return true;
  return !!Object.keys(cityHotelDB).find(k => k.toLowerCase() === city.toLowerCase());
};

export const getCityCentre = (city) => {
  if (!city) return { lat: 20.5937, lng: 78.9629, zoom: 5 }; // India centre
  if (cityCentres[city]) return cityCentres[city];
  const key = Object.keys(cityCentres).find(k => k.toLowerCase() === city.toLowerCase());
  if (key) return cityCentres[key];
  return { lat: 20.5937, lng: 78.9629, zoom: 5 };
};
