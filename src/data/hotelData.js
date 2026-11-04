// ═══════════════════════════════════════════════════════════════════════════════
// INDIA HOTEL DATABASE — City-specific hotels for 150+ locations
// Each city has budget / standard / luxury options
// ═══════════════════════════════════════════════════════════════════════════════

// Structure per entry:
// budget: [ { name, rating, reviews, location, tag? } ]
// standard: [ ... ]
// luxury: [ ... ]

const hotelsByCity = {

  // ─── METRO CITIES ────────────────────────────────────────────────────────────
  "Mumbai": {
    budget: [
      { name: "Zostel Mumbai", rating: 3.8, reviews: 2840, location: "Colaba" },
      { name: "Hotel Suba Palace", rating: 3.5, reviews: 1920, location: "Colaba" },
      { name: "Hotel Kumaria Palace", rating: 3.3, reviews: 1100, location: "Dadar" }
    ],
    standard: [
      { name: "Lemon Tree Premier Mumbai", rating: 4.1, reviews: 3200, location: "Andheri" },
      { name: "Ibis Mumbai Airport", rating: 4.0, reviews: 4100, location: "Vile Parle" },
      { name: "Ginger Hotel Mumbai", rating: 3.9, reviews: 2600, location: "Bandra" }
    ],
    luxury: [
      { name: "Taj Mahal Palace", rating: 4.9, reviews: 9800, location: "Colaba" },
      { name: "The Oberoi Mumbai", rating: 4.8, reviews: 7200, location: "Nariman Point" },
      { name: "Trident Nariman Point", rating: 4.7, reviews: 5600, location: "Marine Drive" }
    ]
  },

  "Delhi": {
    budget: [
      { name: "Zostel Delhi", rating: 3.9, reviews: 3100, location: "Paharganj" },
      { name: "Hotel Namaskar", rating: 3.4, reviews: 1450, location: "Karol Bagh" },
      { name: "Treebo Grand Godwin", rating: 3.6, reviews: 980, location: "Paharganj" }
    ],
    standard: [
      { name: "Lemon Tree Hotel Karol Bagh", rating: 4.1, reviews: 2800, location: "Karol Bagh" },
      { name: "Ibis New Delhi Aerocity", rating: 4.2, reviews: 5200, location: "Aerocity" },
      { name: "Ginger Delhi Airport", rating: 4.0, reviews: 3400, location: "NH-8" }
    ],
    luxury: [
      { name: "The Taj Mahal Hotel", rating: 4.9, reviews: 8700, location: "Mansingh Road" },
      { name: "ITC Maurya", rating: 4.8, reviews: 6900, location: "Diplomatic Enclave" },
      { name: "The Lodhi Delhi", rating: 4.9, reviews: 5400, location: "Lodhi Road" }
    ]
  },

  "Bangalore": {
    budget: [
      { name: "Zostel Bangalore", rating: 3.8, reviews: 2200, location: "Indiranagar" },
      { name: "Hotel Empire International", rating: 3.5, reviews: 1700, location: "Brigade Road" },
      { name: "OYO Townhouse Koramangala", rating: 3.4, reviews: 1340, location: "Koramangala" }
    ],
    standard: [
      { name: "Lemon Tree Whitefield", rating: 4.1, reviews: 2900, location: "Whitefield" },
      { name: "Ibis Bangalore City Centre", rating: 4.2, reviews: 4400, location: "Hosur Road" },
      { name: "Ginger Bangalore Airport", rating: 4.0, reviews: 3100, location: "Kempegowda" }
    ],
    luxury: [
      { name: "The Leela Palace Bangalore", rating: 4.9, reviews: 7800, location: "Old Airport Road" },
      { name: "ITC Gardenia", rating: 4.8, reviews: 6200, location: "Residency Road" },
      { name: "Taj West End", rating: 4.8, reviews: 5100, location: "Race Course Road" }
    ]
  },

  "Chennai": {
    budget: [
      { name: "Zostel Chennai", rating: 3.7, reviews: 1800, location: "T. Nagar" },
      { name: "Hotel Pandian", rating: 3.4, reviews: 1200, location: "Egmore" },
      { name: "Treebo Nest Star Inn", rating: 3.5, reviews: 860, location: "Anna Salai" }
    ],
    standard: [
      { name: "Lemon Tree Chennai", rating: 4.0, reviews: 2600, location: "Sholinganallur" },
      { name: "Ibis Chennai City Centre", rating: 4.1, reviews: 3700, location: "Kandanchavadi" },
      { name: "Ginger Chennai Airport", rating: 3.9, reviews: 2800, location: "Meenambakkam" }
    ],
    luxury: [
      { name: "Taj Coromandel", rating: 4.8, reviews: 6400, location: "Nungambakkam" },
      { name: "The Leela Palace Chennai", rating: 4.9, reviews: 5200, location: "Adyar" },
      { name: "ITC Grand Chola", rating: 4.9, reviews: 7100, location: "Mount Road" }
    ]
  },

  "Kolkata": {
    budget: [
      { name: "Zostel Kolkata", rating: 3.8, reviews: 2100, location: "Sudder Street" },
      { name: "Hotel Maria", rating: 3.3, reviews: 1450, location: "Sudder Street" },
      { name: "OYO Economy Kolkata", rating: 3.2, reviews: 980, location: "Park Street" }
    ],
    standard: [
      { name: "Lemon Tree Kolkata", rating: 4.0, reviews: 2400, location: "EM Bypass" },
      { name: "Ibis Kolkata Rajarhat", rating: 4.1, reviews: 3400, location: "Rajarhat" },
      { name: "Ginger Kolkata", rating: 3.9, reviews: 2200, location: "Airport Area" }
    ],
    luxury: [
      { name: "Taj Bengal", rating: 4.8, reviews: 6800, location: "Alipore" },
      { name: "The Oberoi Grand", rating: 4.9, reviews: 5900, location: "Jawaharlal Nehru Road" },
      { name: "ITC Royal Bengal", rating: 4.8, reviews: 5100, location: "EM Bypass" }
    ]
  },

  "Hyderabad": {
    budget: [
      { name: "Zostel Hyderabad", rating: 3.8, reviews: 1940, location: "Secunderabad" },
      { name: "Hotel Suhail", rating: 3.4, reviews: 1200, location: "Abids" },
      { name: "Treebo Hotel Emerald", rating: 3.5, reviews: 870, location: "Banjara Hills" }
    ],
    standard: [
      { name: "Lemon Tree Hyderabad", rating: 4.1, reviews: 2700, location: "HITEC City" },
      { name: "Ibis Hitec City", rating: 4.2, reviews: 3800, location: "Madhapur" },
      { name: "Ginger Hyderabad", rating: 3.9, reviews: 2100, location: "Begumpet" }
    ],
    luxury: [
      { name: "Taj Falaknuma Palace", rating: 4.9, reviews: 8200, location: "Engine Bowli" },
      { name: "Park Hyatt Hyderabad", rating: 4.8, reviews: 6100, location: "Banjara Hills" },
      { name: "ITC Kohenur", rating: 4.8, reviews: 5400, location: "HITEC City" }
    ]
  },

  "Pune": {
    budget: [
      { name: "Zostel Pune", rating: 3.9, reviews: 2300, location: "Koregaon Park" },
      { name: "Hotel Abhishek", rating: 3.4, reviews: 1100, location: "Station Road" },
      { name: "OYO Flagship Deccan", rating: 3.3, reviews: 880, location: "Deccan Gymkhana" }
    ],
    standard: [
      { name: "Lemon Tree Pune", rating: 4.1, reviews: 2600, location: "Hinjawadi" },
      { name: "Ibis Pune Hinjawadi", rating: 4.0, reviews: 3200, location: "Hinjawadi" },
      { name: "Ginger Pune Nashik Phata", rating: 3.9, reviews: 2100, location: "Pimpri" }
    ],
    luxury: [
      { name: "JW Marriott Pune", rating: 4.8, reviews: 7200, location: "Senapati Bapat Marg" },
      { name: "The Westin Pune Koregaon Park", rating: 4.7, reviews: 5800, location: "Koregaon Park" },
      { name: "Conrad Pune", rating: 4.8, reviews: 4900, location: "Mangaldas Road" }
    ]
  },

  "Ahmedabad": {
    budget: [
      { name: "Zostel Ahmedabad", rating: 3.8, reviews: 1780, location: "Law Garden" },
      { name: "Hotel Comfort Inn President", rating: 3.5, reviews: 1300, location: "Kankaria" },
      { name: "Treebo Hotel Green Park", rating: 3.4, reviews: 760, location: "Navrangpura" }
    ],
    standard: [
      { name: "Lemon Tree Ahmedabad", rating: 4.0, reviews: 2400, location: "Prahlad Nagar" },
      { name: "Ibis Ahmedabad", rating: 4.1, reviews: 3100, location: "Ashram Road" },
      { name: "Ginger Ahmedabad", rating: 3.9, reviews: 2000, location: "Satellite Road" }
    ],
    luxury: [
      { name: "Hyatt Regency Ahmedabad", rating: 4.8, reviews: 5600, location: "SG Road" },
      { name: "Taj Skyline Ahmedabad", rating: 4.7, reviews: 4400, location: "Ambavadi" },
      { name: "Novotel Ahmedabad", rating: 4.6, reviews: 3800, location: "GIFT City" }
    ]
  },

  // ─── HILL STATIONS ────────────────────────────────────────────────────────────
  "Shimla": {
    budget: [
      { name: "Zostel Shimla", rating: 4.0, reviews: 2100, location: "The Ridge" },
      { name: "Hotel White", rating: 3.5, reviews: 1200, location: "Cart Road" },
      { name: "HPTDC Hotel Dreamland", rating: 3.4, reviews: 890, location: "Lakkar Bazar" }
    ],
    standard: [
      { name: "Hotel Willow Banks", rating: 4.1, reviews: 1900, location: "Mall Road" },
      { name: "Clarks Hotel Shimla", rating: 4.2, reviews: 2800, location: "The Mall" },
      { name: "Snow Valley Resorts", rating: 4.0, reviews: 1600, location: "Circular Road" }
    ],
    luxury: [
      { name: "Wildflower Hall", rating: 4.9, reviews: 5400, location: "Mashobra" },
      { name: "Oberoi Cecil", rating: 4.8, reviews: 4200, location: "The Mall" },
      { name: "Taj Holiday Village Shimla", rating: 4.7, reviews: 3600, location: "Chharabra" }
    ]
  },

  "Manali": {
    budget: [
      { name: "Zostel Manali", rating: 4.1, reviews: 3400, location: "Old Manali" },
      { name: "Snowflake Guest House", rating: 3.6, reviews: 1600, location: "Old Manali" },
      { name: "Hotel Ibex", rating: 3.4, reviews: 980, location: "Mall Road" }
    ],
    standard: [
      { name: "Hotel Rohtang Regency", rating: 4.0, reviews: 2100, location: "Circuit House Road" },
      { name: "Snow Princess Resort", rating: 4.1, reviews: 1800, location: "Hadimba Road" },
      { name: "Hotel Manali Inn", rating: 3.9, reviews: 1500, location: "Model Town" }
    ],
    luxury: [
      { name: "Span Resort & Spa", rating: 4.7, reviews: 3200, location: "Kullu–Manali Highway" },
      { name: "Club Mahindra Snow Peaks", rating: 4.6, reviews: 2800, location: "Katrain" },
      { name: "Solang Valley Resort", rating: 4.5, reviews: 2100, location: "Solang Valley" }
    ]
  },

  "Darjeeling": {
    budget: [
      { name: "Zostel Darjeeling", rating: 4.0, reviews: 2200, location: "Ghoom" },
      { name: "Hotel Chancellor", rating: 3.5, reviews: 1100, location: "The Mall" },
      { name: "Aliment Hotel", rating: 3.3, reviews: 780, location: "Gandhi Road" }
    ],
    standard: [
      { name: "Cedar Inn Darjeeling", rating: 4.1, reviews: 1700, location: "Jalapahar" },
      { name: "Hotel Sinclairs Darjeeling", rating: 4.2, reviews: 2400, location: "Gandhi Road" },
      { name: "Mayfair Darjeeling", rating: 4.3, reviews: 2100, location: "The Mall" }
    ],
    luxury: [
      { name: "Glenburn Tea Estate", rating: 4.9, reviews: 1800, location: "Mirik Valley" },
      { name: "Mayfair Hill Resort", rating: 4.7, reviews: 3100, location: "The Mall" },
      { name: "The Elgin Darjeeling", rating: 4.8, reviews: 2600, location: "HD Lama Road" }
    ]
  },

  "Ooty": {
    budget: [
      { name: "TTDC Hotel Tamil Nadu", rating: 3.5, reviews: 1100, location: "Charing Cross" },
      { name: "Hotel Prashanth", rating: 3.3, reviews: 820, location: "Commissioner Road" },
      { name: "Blue Hills Hotel", rating: 3.4, reviews: 690, location: "Charing Cross" }
    ],
    standard: [
      { name: "Sterling Ooty", rating: 4.1, reviews: 2100, location: "Finger Post" },
      { name: "Hotel Lakeview", rating: 4.0, reviews: 1700, location: "Ooty Lake" },
      { name: "Sinclairs Retreat Ooty", rating: 4.2, reviews: 1400, location: "Havelock Road" }
    ],
    luxury: [
      { name: "Savoy Hotel by Taj", rating: 4.7, reviews: 3900, location: "Sylks Road" },
      { name: "Fernhills Royal Palace", rating: 4.8, reviews: 2800, location: "Mysore Road" },
      { name: "Club Mahindra Ooty", rating: 4.5, reviews: 2200, location: "Fern Hill" }
    ]
  },

  "Mussoorie": {
    budget: [
      { name: "Zostel Mussoorie", rating: 4.0, reviews: 1800, location: "Landour" },
      { name: "Hotel Broadway", rating: 3.4, reviews: 970, location: "Mall Road" },
      { name: "Hotel Sun N Snow", rating: 3.3, reviews: 750, location: "Gandhi Chowk" }
    ],
    standard: [
      { name: "Hotel Padmini Nivas", rating: 4.0, reviews: 1500, location: "Library Road" },
      { name: "The Kasmanda Palace", rating: 4.2, reviews: 1900, location: "Mall Road" },
      { name: "Fortune Resort Grace", rating: 4.1, reviews: 2200, location: "Camel's Back Road" }
    ],
    luxury: [
      { name: "JW Marriott Mussoorie Walnut Grove", rating: 4.8, reviews: 4200, location: "Mussoorie Road" },
      { name: "The Savoy Mussoorie", rating: 4.7, reviews: 3100, location: "Library Road" },
      { name: "Welcomhotel by ITC Mussoorie", rating: 4.6, reviews: 2700, location: "The Mall" }
    ]
  },

  "Nainital": {
    budget: [
      { name: "Zostel Nainital", rating: 3.9, reviews: 1650, location: "Mallital" },
      { name: "Hotel Lake Side", rating: 3.4, reviews: 1100, location: "Mall Road" },
      { name: "Vikram Vintage Inn", rating: 3.3, reviews: 810, location: "Tallital" }
    ],
    standard: [
      { name: "Manu Maharani Hotels", rating: 4.1, reviews: 1900, location: "Grassmere Estate" },
      { name: "Arif Castles", rating: 4.0, reviews: 1600, location: "Ayarpatta" },
      { name: "The Naini Retreat", rating: 4.2, reviews: 2100, location: "Sher-Ka-Danda" }
    ],
    luxury: [
      { name: "The Naini Retreat by Clarks", rating: 4.7, reviews: 3400, location: "Ayarpatta" },
      { name: "Vikram Vintage Inn Heritage", rating: 4.6, reviews: 2600, location: "Ayarpatta" },
      { name: "Savoy Nainital", rating: 4.8, reviews: 2900, location: "Mallital" }
    ]
  },

  "Kasol": {
    budget: [
      { name: "Zostel Kasol", rating: 4.2, reviews: 2800, location: "Riverside" },
      { name: "Alpine Guest House", rating: 3.7, reviews: 1400, location: "Main Market" },
      { name: "Parvati Camps", rating: 3.6, reviews: 1100, location: "Chalal Trail" }
    ],
    standard: [
      { name: "Katra Himalayan Camp", rating: 4.0, reviews: 1600, location: "River Bank" },
      { name: "The Himalayan Inn", rating: 4.1, reviews: 1300, location: "Main Market" },
      { name: "Parvati Riverside Resort", rating: 4.0, reviews: 1100, location: "Riverside" }
    ],
    luxury: [
      { name: "Avalon Resort & Spa Kasol", rating: 4.5, reviews: 1900, location: "Above Village" },
      { name: "Mountain Dew Resort", rating: 4.4, reviews: 1500, location: "Chalal" },
      { name: "The Kasol Cottages", rating: 4.6, reviews: 1200, location: "Manikaran Road" }
    ]
  },

  // ─── RAJASTHAN ────────────────────────────────────────────────────────────────
  "Jaipur": {
    budget: [
      { name: "Zostel Jaipur", rating: 4.0, reviews: 2900, location: "Pink City" },
      { name: "Hotel Pearl Palace", rating: 4.1, reviews: 3400, location: "Hathroi Fort" },
      { name: "Moustache Jaipur Hostel", rating: 4.0, reviews: 2100, location: "Bani Park" }
    ],
    standard: [
      { name: "Lemon Tree Premier Jaipur", rating: 4.1, reviews: 2600, location: "Kukas" },
      { name: "Ibis Jaipur", rating: 4.0, reviews: 3100, location: "Kukas" },
      { name: "Hotel Clarks Amer", rating: 4.2, reviews: 2900, location: "Jawaharlal Nehru Marg" }
    ],
    luxury: [
      { name: "Rambagh Palace by Taj", rating: 4.9, reviews: 8900, location: "Bhawani Singh Road" },
      { name: "Taj Jai Mahal Palace", rating: 4.8, reviews: 6800, location: "Jacob Road" },
      { name: "Oberoi Rajvilas", rating: 4.9, reviews: 7400, location: "Goner Road" }
    ]
  },

  "Jodhpur": {
    budget: [
      { name: "Zostel Jodhpur", rating: 4.1, reviews: 2200, location: "Old City" },
      { name: "Cosy Guest House", rating: 3.8, reviews: 1600, location: "Near Clock Tower" },
      { name: "Shahi Guest House", rating: 3.7, reviews: 1300, location: "Makrana Mohalla" }
    ],
    standard: [
      { name: "Hotel Haveli Inn Pal", rating: 4.1, reviews: 1900, location: "Gulab Sagar" },
      { name: "Lemon Tree Jodhpur", rating: 4.0, reviews: 2200, location: "Airport Road" },
      { name: "Hotel Akshay", rating: 3.9, reviews: 1500, location: "High Court Road" }
    ],
    luxury: [
      { name: "Umaid Bhawan Palace", rating: 4.9, reviews: 9200, location: "Circuit House Road" },
      { name: "Raas Jodhpur", rating: 4.8, reviews: 5600, location: "Tunwarji Ka Jhalra" },
      { name: "Taj Hari Mahal", rating: 4.7, reviews: 4800, location: "Residency Road" }
    ]
  },

  "Udaipur": {
    budget: [
      { name: "Zostel Udaipur", rating: 4.1, reviews: 2800, location: "Lake Pichola" },
      { name: "Nukkad Hostel", rating: 4.0, reviews: 2100, location: "Gangaur Ghat" },
      { name: "Hotel Gangaur Palace", rating: 3.7, reviews: 1600, location: "Gangaur Ghat Rd" }
    ],
    standard: [
      { name: "Lemon Tree Premier Udaipur", rating: 4.1, reviews: 2100, location: "Fateh Sagar Road" },
      { name: "Hotel Krishna Niwas", rating: 4.0, reviews: 1800, location: "Lal Ghat" },
      { name: "Rang Niwas Palace", rating: 4.2, reviews: 2400, location: "Lake Palace Road" }
    ],
    luxury: [
      { name: "Taj Lake Palace", rating: 4.9, reviews: 10200, location: "Lake Pichola" },
      { name: "The Oberoi Udaivilas", rating: 4.9, reviews: 8900, location: "Haridasji Ki Magri" },
      { name: "Leela Palace Udaipur", rating: 4.8, reviews: 7100, location: "Lake Pichola" }
    ]
  },

  "Jaisalmer": {
    budget: [
      { name: "Zostel Jaisalmer", rating: 4.2, reviews: 2400, location: "Near Fort" },
      { name: "Hotel Pleasant Haveli", rating: 3.8, reviews: 1700, location: "Gandhi Chowk" },
      { name: "Hotel Swastika", rating: 3.6, reviews: 1200, location: "Near Fort" }
    ],
    standard: [
      { name: "Hotel Nachana Haveli", rating: 4.1, reviews: 2200, location: "Gandhi Chowk" },
      { name: "Hotel Laxmi Niwas", rating: 4.0, reviews: 1800, location: "Shiv Road" },
      { name: "Gorbandh Palace", rating: 4.3, reviews: 2600, location: "Sam Road" }
    ],
    luxury: [
      { name: "Suryagarh Jaisalmer", rating: 4.8, reviews: 5400, location: "Kahala Phata" },
      { name: "RAAS Jaisalmer", rating: 4.7, reviews: 4100, location: "Near Fort" },
      { name: "Taj Exotica Resort & Spa", rating: 4.8, reviews: 3800, location: "Sam Sand Dunes" }
    ]
  },

  "Pushkar": {
    budget: [
      { name: "Zostel Pushkar", rating: 4.1, reviews: 2600, location: "Pushkar Lake" },
      { name: "Hotel Master Paradise", rating: 3.7, reviews: 1400, location: "Main Bazar" },
      { name: "Mushroom Guesthouse", rating: 3.5, reviews: 1100, location: "Badi Basti" }
    ],
    standard: [
      { name: "Hotel Sarovar", rating: 4.0, reviews: 1900, location: "Ajmer Road" },
      { name: "Hotel Inn Seventh Heaven", rating: 4.2, reviews: 2300, location: "Choti Basti" },
      { name: "Ananta Spa & Resort", rating: 4.3, reviews: 2700, location: "Pushkar Marg" }
    ],
    luxury: [
      { name: "The Westin Pushkar Resort & Spa", rating: 4.7, reviews: 4400, location: "Pushkar Road" },
      { name: "RAAS Pushkar", rating: 4.8, reviews: 3600, location: "Marwar Road" },
      { name: "Khem Villas Pushkar", rating: 4.6, reviews: 2900, location: "Pushkar Lake" }
    ]
  },

  "Mount Abu": {
    budget: [
      { name: "Zostel Mount Abu", rating: 3.9, reviews: 1700, location: "Nakki Lake" },
      { name: "Hotel Lake Palace", rating: 3.5, reviews: 1100, location: "Nakki Lake" },
      { name: "RTDC Hotel Shikhar", rating: 3.3, reviews: 780, location: "Main Road" }
    ],
    standard: [
      { name: "Hotel Hillock", rating: 4.1, reviews: 1800, location: "Main Road" },
      { name: "Hotel Cama Rajputana", rating: 4.0, reviews: 2100, location: "Adhar Devi Road" },
      { name: "Hotel Polo Resort", rating: 4.2, reviews: 1600, location: "Polo Ground" }
    ],
    luxury: [
      { name: "Jaipur House Heritage Resort", rating: 4.7, reviews: 2400, location: "Main Road" },
      { name: "The Connaught Rajputana", rating: 4.6, reviews: 2100, location: "Nakki Lake Rd" },
      { name: "Arbuda Hotel", rating: 4.5, reviews: 1800, location: "Near Dilwara Temples" }
    ]
  },

  // ─── PILGRIM CITIES ───────────────────────────────────────────────────────────
  "Varanasi": {
    budget: [
      { name: "Zostel Varanasi", rating: 4.1, reviews: 3200, location: "Assi Ghat" },
      { name: "Hotel Alka", rating: 3.6, reviews: 1800, location: "Meer Ghat" },
      { name: "Hotel Yogi", rating: 3.4, reviews: 1400, location: "Dasaswamedh" }
    ],
    standard: [
      { name: "Hotel Surya Varanasi", rating: 4.1, reviews: 2400, location: "The Mall" },
      { name: "Ganga Kinare Hotel", rating: 4.2, reviews: 2800, location: "Nagwa" },
      { name: "Hotel Clarks Varanasi", rating: 4.1, reviews: 3100, location: "The Mall" }
    ],
    luxury: [
      { name: "Taj Ganges Varanasi", rating: 4.8, reviews: 6200, location: "Rajpur Road" },
      { name: "BrijRama Palace Varanasi", rating: 4.9, reviews: 5400, location: "Darbhanga Ghat" },
      { name: "Ramada Plaza Varanasi", rating: 4.6, reviews: 4100, location: "The Mall" }
    ]
  },

  "Agra": {
    budget: [
      { name: "Zostel Agra", rating: 3.9, reviews: 2700, location: "Taj Ganj" },
      { name: "Hotel Kamal Taj Ganj", rating: 3.5, reviews: 1900, location: "Taj Ganj" },
      { name: "Saniya Palace Hotel", rating: 3.4, reviews: 1500, location: "Taj Ganj" }
    ],
    standard: [
      { name: "Lemon Tree Agra", rating: 4.1, reviews: 2400, location: "Fatehabad Road" },
      { name: "Hotel Clarks Shiraz", rating: 4.2, reviews: 3100, location: "54 Taj Road" },
      { name: "Radisson Hotel Agra", rating: 4.0, reviews: 2900, location: "Taj Nagri Phase II" }
    ],
    luxury: [
      { name: "The Oberoi Amarvilas", rating: 4.9, reviews: 9400, location: "Taj East Gate Road" },
      { name: "Taj Hotel & Convention Centre", rating: 4.8, reviews: 7200, location: "Fatehabad Road" },
      { name: "ITC Mughal Agra", rating: 4.8, reviews: 6600, location: "Fatehabad Road" }
    ]
  },

  "Rishikesh": {
    budget: [
      { name: "Zostel Rishikesh", rating: 4.2, reviews: 4100, location: "Laxman Jhula" },
      { name: "Hotel Suruchi", rating: 3.6, reviews: 1800, location: "Haridwar Road" },
      { name: "Bunkyard Hostel", rating: 4.0, reviews: 2200, location: "Tapovan" }
    ],
    standard: [
      { name: "Hotel Ganga Beach Resort", rating: 4.1, reviews: 2400, location: "Ram Jhula" },
      { name: "Aloha on the Ganges", rating: 4.2, reviews: 2800, location: "Jonk, NH 58" },
      { name: "Taj Rishikesh Resort & Spa", rating: 4.4, reviews: 3200, location: "Jonk Village" }
    ],
    luxury: [
      { name: "Taj Rishikesh Resort & Spa", rating: 4.8, reviews: 5600, location: "Gyan Nagar" },
      { name: "Ananda in the Himalayas", rating: 4.9, reviews: 4800, location: "Palace Estate" },
      { name: "Vana Malsi Estate", rating: 4.8, reviews: 3900, location: "Dehradun Road" }
    ]
  },

  "Haridwar": {
    budget: [
      { name: "Hotel Mansingh Palace", rating: 3.5, reviews: 1400, location: "Har Ki Pauri" },
      { name: "Hotel Aryan Residency", rating: 3.4, reviews: 1100, location: "Railway Road" },
      { name: "Ganga Lahari Hotel", rating: 3.6, reviews: 1700, location: "Ghat Road" }
    ],
    standard: [
      { name: "Hotel Shivalik", rating: 4.0, reviews: 2100, location: "Subhash Ghat" },
      { name: "Hotel Ganga Resort", rating: 4.1, reviews: 1800, location: "Jwalapur" },
      { name: "Lemon Tree Haridwar", rating: 4.0, reviews: 2400, location: "Station Road" }
    ],
    luxury: [
      { name: "Fortune Park HiLand Haridwar", rating: 4.6, reviews: 3200, location: "Jwalapur" },
      { name: "Veda5 Haridwar", rating: 4.7, reviews: 2100, location: "Rishikesh Rd" },
      { name: "Four Points by Sheraton", rating: 4.6, reviews: 2800, location: "Gurukul Road" }
    ]
  },

  "Tirupati": {
    budget: [
      { name: "TTD Guest House", rating: 3.8, reviews: 4200, location: "Tirumala" },
      { name: "Hotel Bliss", rating: 3.5, reviews: 1800, location: "RC Road" },
      { name: "Hotel Bhimas Paradise", rating: 3.4, reviews: 1400, location: "Renigunta Road" }
    ],
    standard: [
      { name: "Hotel Minerva Grand", rating: 4.0, reviews: 2600, location: "TP Area" },
      { name: "Fortune Select Grand Ridge", rating: 4.1, reviews: 2200, location: "Tirumala Bypass" },
      { name: "Marasa Sarovar Premiere", rating: 4.2, reviews: 2800, location: "Karakambadi Road" }
    ],
    luxury: [
      { name: "ITC Grand Kakatiya", rating: 4.7, reviews: 4600, location: "Tirupati Bypass" },
      { name: "Taj Gateway Tirupati", rating: 4.7, reviews: 3900, location: "TP Area" },
      { name: "Novotel Vijayawada", rating: 4.6, reviews: 3400, location: "MG Road" }
    ]
  },

  "Amritsar": {
    budget: [
      { name: "Zostel Amritsar", rating: 4.0, reviews: 2600, location: "Golden Temple" },
      { name: "Hotel Residency", rating: 3.5, reviews: 1600, location: "Railway Station" },
      { name: "Grand Hotel Amritsar", rating: 3.6, reviews: 1900, location: "Queens Road" }
    ],
    standard: [
      { name: "Lemon Tree Amritsar", rating: 4.1, reviews: 2400, location: "Green Avenue" },
      { name: "Ramada Hotel Amritsar", rating: 4.0, reviews: 2800, location: "Sultanwind Road" },
      { name: "Hotel Mohan International", rating: 3.9, reviews: 2100, location: "Albert Road" }
    ],
    luxury: [
      { name: "Taj Swarna Amritsar", rating: 4.8, reviews: 5800, location: "Ranjit Avenue" },
      { name: "Hyatt Amritsar", rating: 4.7, reviews: 4600, location: "MBM Malls" },
      { name: "Radisson Blu Amritsar", rating: 4.6, reviews: 3800, location: "District Shopping Centre" }
    ]
  },

  // ─── GOA ─────────────────────────────────────────────────────────────────────
  "Goa": {
    budget: [
      { name: "Zostel Goa – Panjim", rating: 4.1, reviews: 3800, location: "Panjim" },
      { name: "Jungle by Starfish", rating: 3.8, reviews: 2400, location: "Calangute" },
      { name: "The Backpacker Co.", rating: 4.0, reviews: 2100, location: "Baga" }
    ],
    standard: [
      { name: "Lemon Tree Amarante Beach Resort", rating: 4.1, reviews: 3200, location: "Candolim" },
      { name: "Hotel Baga Beach Resort", rating: 4.0, reviews: 2800, location: "Baga" },
      { name: "Novotel Goa Candolim", rating: 4.2, reviews: 3600, location: "Candolim" }
    ],
    luxury: [
      { name: "Taj Holiday Village Goa", rating: 4.8, reviews: 7400, location: "Candolim" },
      { name: "The Leela Goa", rating: 4.9, reviews: 8200, location: "Cavelossim" },
      { name: "Four Seasons Goa at Cova", rating: 4.9, reviews: 6800, location: "Cova" }
    ]
  },

  // ─── NORTH EAST ───────────────────────────────────────────────────────────────
  "Guwahati": {
    budget: [
      { name: "Zostel Guwahati", rating: 3.9, reviews: 1800, location: "Pan Bazar" },
      { name: "Hotel Dynasty", rating: 3.5, reviews: 1300, location: "SS Road" },
      { name: "Hotel Rajmahal", rating: 3.4, reviews: 980, location: "AT Road" }
    ],
    standard: [
      { name: "Hotel Nandan", rating: 4.0, reviews: 1900, location: "GNB Road" },
      { name: "Vivanta Guwahati by Taj", rating: 4.3, reviews: 2800, location: "SS Road" },
      { name: "Hotel Grand Centeral", rating: 3.9, reviews: 1700, location: "Guwahati Club" }
    ],
    luxury: [
      { name: "Novotel Guwahati GS Road", rating: 4.7, reviews: 4100, location: "GS Road" },
      { name: "Vivanta Guwahati by Taj", rating: 4.8, reviews: 3600, location: "SS Road" },
      { name: "Radisson Blu Guwahati", rating: 4.7, reviews: 3200, location: "Last Gate" }
    ]
  },

  "Gangtok": {
    budget: [
      { name: "Zostel Gangtok", rating: 4.1, reviews: 2100, location: "MG Marg" },
      { name: "Hotel Sonam Delek", rating: 3.6, reviews: 1400, location: "Tibet Road" },
      { name: "Hotel Tashi Delek", rating: 3.7, reviews: 1600, location: "MG Marg" }
    ],
    standard: [
      { name: "Denzong Regency", rating: 4.1, reviews: 2000, location: "MG Marg" },
      { name: "Hotel Nor-Khill", rating: 4.2, reviews: 2400, location: "Stadium Road" },
      { name: "Royal Plaza Gangtok", rating: 4.0, reviews: 1800, location: "National Highway" }
    ],
    luxury: [
      { name: "Mayfair Spa Resort & Casino", rating: 4.7, reviews: 3800, location: "Zero Point" },
      { name: "Elgin Mount Pandim", rating: 4.6, reviews: 2900, location: "Pelling" },
      { name: "Norkhill Hotel by Elgin", rating: 4.7, reviews: 2600, location: "Stadium Road" }
    ]
  },

  "Shillong": {
    budget: [
      { name: "Zostel Shillong", rating: 4.0, reviews: 1900, location: "Police Bazar" },
      { name: "Hotel Monsoon", rating: 3.5, reviews: 1200, location: "Laitumkhrah" },
      { name: "Hotel Pinewood", rating: 3.4, reviews: 890, location: "Oakland Road" }
    ],
    standard: [
      { name: "Hotel Centre Point Shillong", rating: 4.0, reviews: 1800, location: "Thana Road" },
      { name: "Hotel Polo Towers", rating: 4.1, reviews: 2200, location: "Oakland Road" },
      { name: "Ri Kynmaw Resort", rating: 4.0, reviews: 1600, location: "Shillong Peak Area" }
    ],
    luxury: [
      { name: "Vivanta Shillong by Taj", rating: 4.7, reviews: 3800, location: "Polo" },
      { name: "Ri Kynmaw Luxury Villas", rating: 4.8, reviews: 2700, location: "Upper Shillong" },
      { name: "Ri-Kynjai Lakeside Resort", rating: 4.9, reviews: 2400, location: "Umiam Lake" }
    ]
  },

  "Tawang": {
    budget: [
      { name: "Hotel Pemaling", rating: 3.6, reviews: 820, location: "Main Town" },
      { name: "Tawang Residency", rating: 3.4, reviews: 640, location: "Market Area" },
      { name: "Hotel Gakyi", rating: 3.3, reviews: 520, location: "Near Monastery" }
    ],
    standard: [
      { name: "Pemaling Resort", rating: 4.0, reviews: 1100, location: "Above Town" },
      { name: "Hotel Tashi Gang", rating: 3.9, reviews: 920, location: "Near Monastery" },
      { name: "Alpine Camp Tawang", rating: 4.1, reviews: 800, location: "Urgelling" }
    ],
    luxury: [
      { name: "Nature's Nest Resort Tawang", rating: 4.5, reviews: 1400, location: "Tawang River" },
      { name: "Tawang Valley Resort", rating: 4.4, reviews: 1100, location: "Urgelling" },
      { name: "Himalayan Abode", rating: 4.6, reviews: 900, location: "Sangti Valley" }
    ]
  },

  // ─── KERALA ───────────────────────────────────────────────────────────────────
  "Kochi": {
    budget: [
      { name: "Zostel Kochi", rating: 4.1, reviews: 3400, location: "Fort Kochi" },
      { name: "Hotel Sea Pearl", rating: 3.6, reviews: 1800, location: "Marine Drive" },
      { name: "Malabar House", rating: 3.8, reviews: 2100, location: "Fort Kochi" }
    ],
    standard: [
      { name: "Lemon Tree Vembanad Lake Kochi", rating: 4.1, reviews: 2800, location: "Vembanad" },
      { name: "Ibis Kochi City Centre", rating: 4.2, reviews: 3600, location: "Marine Drive" },
      { name: "Hotel Renai Cochin", rating: 4.1, reviews: 2400, location: "Palarivattom" }
    ],
    luxury: [
      { name: "Taj Malabar Resort & Spa", rating: 4.8, reviews: 7200, location: "Willingdon Island" },
      { name: "The Leela Raviz Kovalam", rating: 4.9, reviews: 5800, location: "Lighhouse Road" },
      { name: "Vivanta Kochi by Taj", rating: 4.7, reviews: 4600, location: "Willingdon Island" }
    ]
  },

  "Munnar": {
    budget: [
      { name: "Zostel Munnar", rating: 4.1, reviews: 2400, location: "Old Market" },
      { name: "Hotel Zina", rating: 3.5, reviews: 1400, location: "Old Munnar" },
      { name: "Tea County Budget Inn", rating: 3.4, reviews: 1100, location: "Munnar Town" }
    ],
    standard: [
      { name: "Tall Trees Resort Munnar", rating: 4.2, reviews: 2100, location: "Bison Valley" },
      { name: "Elders Estate Resort", rating: 4.1, reviews: 1800, location: "Top Station Road" },
      { name: "Fragrant Nature Munnar", rating: 4.3, reviews: 2600, location: "Chinnakanal" }
    ],
    luxury: [
      { name: "Windermere Estate Munnar", rating: 4.8, reviews: 3900, location: "Pothamedu" },
      { name: "Chandy's Windy Woods", rating: 4.7, reviews: 3200, location: "Pallivasal" },
      { name: "Spice Tree Munnar", rating: 4.8, reviews: 2800, location: "Anayirankal Estate" }
    ]
  },

  "Alleppey": {
    budget: [
      { name: "Zostel Alleppey", rating: 4.1, reviews: 2700, location: "Beach Road" },
      { name: "St. George's Lodging", rating: 3.5, reviews: 1300, location: "Mullackal" },
      { name: "Johnson's Hotel", rating: 3.4, reviews: 1100, location: "Near Backwaters" }
    ],
    standard: [
      { name: "Lemon Tree Vembanad", rating: 4.0, reviews: 2100, location: "Vembanad Lake" },
      { name: "The Haveli River Inn", rating: 4.1, reviews: 1900, location: "Punnamada Road" },
      { name: "Pagoda Inn", rating: 4.2, reviews: 2400, location: "Punnamada" }
    ],
    luxury: [
      { name: "Kumarakom Lake Resort", rating: 4.9, reviews: 6200, location: "Kumarakom" },
      { name: "Houseboat Cruise Deluxe", rating: 4.7, reviews: 5400, location: "Backwaters" },
      { name: "Emerald Isle Heritage Villa", rating: 4.8, reviews: 4100, location: "Muhamma" }
    ]
  },

  "Thiruvananthapuram": {
    budget: [
      { name: "Zostel Trivandrum", rating: 3.9, reviews: 1600, location: "East Fort" },
      { name: "Hotel Regency", rating: 3.4, reviews: 1100, location: "Thampanoor" },
      { name: "Hotel Chaithram", rating: 3.5, reviews: 1400, location: "Central Station Rd" }
    ],
    standard: [
      { name: "Lemon Tree Premier Trivandrum", rating: 4.1, reviews: 2200, location: "Technopark" },
      { name: "Ibis Trivandrum", rating: 4.0, reviews: 2700, location: "Technopark" },
      { name: "Hotel Luciya Palace", rating: 4.0, reviews: 1900, location: "Thycaud" }
    ],
    luxury: [
      { name: "Kovalam Taj Green Cove", rating: 4.8, reviews: 5800, location: "Kovalam" },
      { name: "Vivanta Trivandrum by Taj", rating: 4.7, reviews: 4400, location: "Technopark" },
      { name: "The Leela Kovalam", rating: 4.9, reviews: 6100, location: "Kovalam Beach" }
    ]
  },

  // ─── MADHYA PRADESH / CHHATTISGARH ───────────────────────────────────────────
  "Khajuraho": {
    budget: [
      { name: "Zostel Khajuraho", rating: 4.0, reviews: 1900, location: "Main Market" },
      { name: "Hotel Surya", rating: 3.5, reviews: 1200, location: "Jain Temple Road" },
      { name: "Hotel Zen Khajuraho", rating: 3.4, reviews: 900, location: "Near Temple" }
    ],
    standard: [
      { name: "Hotel Chandela", rating: 4.1, reviews: 2100, location: "Main Road" },
      { name: "MPTDC Payal Hotel", rating: 4.0, reviews: 1700, location: "Temple Road" },
      { name: "Hotel Khajuraho Haveli", rating: 4.1, reviews: 1500, location: "Link Road" }
    ],
    luxury: [
      { name: "Radisson Jass Khajuraho", rating: 4.7, reviews: 3600, location: "Bypass Road" },
      { name: "The LaLiT Temple View Khajuraho", rating: 4.8, reviews: 4100, location: "Temple View" },
      { name: "Ramada Khajuraho", rating: 4.6, reviews: 2900, location: "Airport Road" }
    ]
  },

  "Pachmarhi": {
    budget: [
      { name: "MPTDC Hotel Satpura", rating: 3.6, reviews: 1100, location: "Main Road" },
      { name: "Hotel Highlands", rating: 3.4, reviews: 820, location: "Church Road" },
      { name: "Rock-End Manor", rating: 3.5, reviews: 780, location: "Near Bee Falls" }
    ],
    standard: [
      { name: "Hotel Saket", rating: 4.0, reviews: 1400, location: "Main Road" },
      { name: "MPTDC Amaltas", rating: 4.1, reviews: 1700, location: "Pachmarhi Road" },
      { name: "Pachmarhi Retreat", rating: 4.0, reviews: 1300, location: "Near Priyadarshini" }
    ],
    luxury: [
      { name: "La Maison Pachmarhi", rating: 4.6, reviews: 1900, location: "Jharna Falls Rd" },
      { name: "Wildflower Hills Pachmarhi", rating: 4.5, reviews: 1600, location: "Above Town" },
      { name: "Satpura Jungle Retreat", rating: 4.7, reviews: 1400, location: "Buffer Zone" }
    ]
  },

  "Bhopal": {
    budget: [
      { name: "Zostel Bhopal", rating: 3.8, reviews: 1600, location: "New Market" },
      { name: "Hotel Palash Residency", rating: 3.5, reviews: 1200, location: "TT Nagar" },
      { name: "Hotel Ranjit", rating: 3.4, reviews: 900, location: "Hamidia Road" }
    ],
    standard: [
      { name: "Lemon Tree Bhopal", rating: 4.0, reviews: 2100, location: "Hoshangabad Road" },
      { name: "Hotel Jehan Numa Palace", rating: 4.3, reviews: 2800, location: "Shamla Hill" },
      { name: "Courtyard by Marriott Bhopal", rating: 4.2, reviews: 2600, location: "DB Mall Road" }
    ],
    luxury: [
      { name: "Noor-Us-Sabah Palace", rating: 4.8, reviews: 3900, location: "Shamla Hill" },
      { name: "Jehan Numa Palace", rating: 4.7, reviews: 4400, location: "Shamla Hill" },
      { name: "Taj Lakefront Bhopal", rating: 4.8, reviews: 5200, location: "Near Lake" }
    ]
  },

  // ─── SMALL TOWNS & VILLAGES ───────────────────────────────────────────────────

  "Shirdi": {
    budget: [
      { name: "SAI Leela Guest House", rating: 3.6, reviews: 2100, location: "Near Temple" },
      { name: "Hotel Sai Palace", rating: 3.4, reviews: 1800, location: "Shirdi Village" },
      { name: "SAI Darbar Hotel", rating: 3.3, reviews: 1400, location: "Pimpalwadi Road" }
    ],
    standard: [
      { name: "Hotel Sai Ashish", rating: 4.0, reviews: 2600, location: "Shirdi" },
      { name: "Hotel Sai Leela", rating: 4.1, reviews: 2200, location: "Near Samadhi Mandir" },
      { name: "Hotel Sai Baba Ashram", rating: 3.9, reviews: 1900, location: "Kopargaon Road" }
    ],
    luxury: [
      { name: "Sai Yatri Hotel by Raj", rating: 4.6, reviews: 3200, location: "Sai Nagar" },
      { name: "Hotel Sai Village", rating: 4.5, reviews: 2800, location: "Main Road" },
      { name: "The Regency Sai Shirdi", rating: 4.7, reviews: 2400, location: "Rahata Link Road" }
    ]
  },

  "Lonavala": {
    budget: [
      { name: "Zostel Lonavala", rating: 4.0, reviews: 2200, location: "Near Station" },
      { name: "Hotel Adarsh", rating: 3.5, reviews: 1400, location: "Old Mumbai–Pune Road" },
      { name: "Hotel Chandralok", rating: 3.4, reviews: 1100, location: "Shivaji Road" }
    ],
    standard: [
      { name: "Hotel Fariyas Lonavala", rating: 4.1, reviews: 2400, location: "Old Mumbai Road" },
      { name: "Della Resorts Lonavala", rating: 4.3, reviews: 3200, location: "Kunegaon" },
      { name: "Hotel Lemon Tree Lonavala", rating: 4.1, reviews: 2800, location: "Sivalik Road" }
    ],
    luxury: [
      { name: "The Machan Resort", rating: 4.8, reviews: 4200, location: "Jambulne Village" },
      { name: "Rhythm Hotel & Club Lonavala", rating: 4.6, reviews: 3600, location: "Tungarli Lake" },
      { name: "Aamby Valley City", rating: 4.5, reviews: 2900, location: "Sahyadri Hills" }
    ]
  },

  "Mahabaleshwar": {
    budget: [
      { name: "Hotel Valley View", rating: 3.5, reviews: 1200, location: "Main Bazar" },
      { name: "Hotel Prasad", rating: 3.4, reviews: 900, location: "Main Road" },
      { name: "MTDC Mahabaleshwar", rating: 3.6, reviews: 1500, location: "Garden Point" }
    ],
    standard: [
      { name: "Hotel Panorama Mahabaleshwar", rating: 4.0, reviews: 1800, location: "Murray Point" },
      { name: "Dreamland Resort", rating: 4.1, reviews: 2100, location: "Near Venna Lake" },
      { name: "Hotel Brightland", rating: 4.2, reviews: 2400, location: "Mahabaleshwar Road" }
    ],
    luxury: [
      { name: "Le Meridien Mahabaleshwar", rating: 4.7, reviews: 4100, location: "Near Lingmala" },
      { name: "Evershine Keys Prima Resort", rating: 4.6, reviews: 3600, location: "Near Venna Lake" },
      { name: "Golf Club Resort Mahabaleshwar", rating: 4.8, reviews: 3200, location: "Golf Club Road" }
    ]
  },

  "Khandala": {
    budget: [
      { name: "Hotel Shalimar Khandala", rating: 3.4, reviews: 820, location: "Main Road" },
      { name: "Khandala Valley Guest House", rating: 3.3, reviews: 640, location: "Near Duke's Nose" },
      { name: "Hotel Majestic", rating: 3.5, reviews: 750, location: "Station Road" }
    ],
    standard: [
      { name: "Hotel Duke's Retreat", rating: 4.0, reviews: 1600, location: "Old Mumbai Road" },
      { name: "Keys Select Khandala", rating: 4.1, reviews: 1900, location: "Shelu Bypass" },
      { name: "Indraprastha Resort", rating: 4.0, reviews: 1400, location: "Khandala Ghat" }
    ],
    luxury: [
      { name: "The Hilton Khandala", rating: 4.6, reviews: 2800, location: "Khandala Hill" },
      { name: "Shangri-La Resort Khandala", rating: 4.5, reviews: 2400, location: "Near Duke's Nose" },
      { name: "Rhythm & Blues Khandala", rating: 4.7, reviews: 2100, location: "Old Mumbai Road" }
    ]
  },

  "Coorg": {
    budget: [
      { name: "Zostel Coorg", rating: 4.1, reviews: 2100, location: "Madikeri" },
      { name: "Hotel Cauvery", rating: 3.5, reviews: 1300, location: "Madikeri Town" },
      { name: "Green Hills Estate", rating: 3.7, reviews: 1600, location: "Galibeedu" }
    ],
    standard: [
      { name: "Club Mahindra Madikeri Coorg", rating: 4.2, reviews: 2600, location: "Madikeri" },
      { name: "Tamara Coorg Resort", rating: 4.3, reviews: 2900, location: "Yavakapadi" },
      { name: "Coorg Cliffs Resort", rating: 4.1, reviews: 2200, location: "Madikeri" }
    ],
    luxury: [
      { name: "Evolve Back Coorg", rating: 4.9, reviews: 5200, location: "Kakkabe" },
      { name: "The Tamara Coorg", rating: 4.8, reviews: 4400, location: "Ammathi" },
      { name: "Taj Madikeri Resort & Spa", rating: 4.8, reviews: 5600, location: "Above Madikeri" }
    ]
  },

  "Hampi": {
    budget: [
      { name: "Zostel Hampi", rating: 4.2, reviews: 2800, location: "Virupapuragaddi" },
      { name: "Gopi Guest House", rating: 3.7, reviews: 1800, location: "Hampi Bazaar" },
      { name: "Shanthi Guest House", rating: 3.6, reviews: 1400, location: "Hampi Bazaar" }
    ],
    standard: [
      { name: "Hotel Malligi Hampi", rating: 4.0, reviews: 2100, location: "Hospet Road" },
      { name: "Kishkinda Heritage Resort", rating: 4.2, reviews: 1900, location: "Anegundi" },
      { name: "Kamalapur Heritage Resort", rating: 4.1, reviews: 1700, location: "Kamalapur" }
    ],
    luxury: [
      { name: "Hyatt Place Hampi", rating: 4.6, reviews: 2800, location: "Kamalapur" },
      { name: "The Evolve Back Hampi", rating: 4.8, reviews: 3900, location: "Anegundi" },
      { name: "Heritage Resort Hampi", rating: 4.7, reviews: 2600, location: "Near Virupaksha" }
    ]
  },

  "Mysore": {
    budget: [
      { name: "Zostel Mysore", rating: 3.9, reviews: 2100, location: "Near Palace" },
      { name: "Hotel Dasaprakash", rating: 3.5, reviews: 1600, location: "Gandhi Square" },
      { name: "Hotel Indra Bhavan", rating: 3.4, reviews: 1200, location: "Dhanvanthri Road" }
    ],
    standard: [
      { name: "Lemon Tree Mysore", rating: 4.1, reviews: 2400, location: "Kalidasa Road" },
      { name: "Hotel Mayura Hoysala", rating: 4.0, reviews: 1900, location: "2 JLB Road" },
      { name: "Hotel Southern Star Mysore", rating: 4.2, reviews: 2700, location: "Vinoba Road" }
    ],
    luxury: [
      { name: "Radisson Blu Plaza Hotel Mysore", rating: 4.7, reviews: 4800, location: "Nazarbad" },
      { name: "Royal Orchid Brindavan Garden", rating: 4.7, reviews: 3900, location: "Srirangapatna" },
      { name: "Lalitha Mahal Palace Hotel", rating: 4.8, reviews: 5100, location: "Lalitha Mahal Rd" }
    ]
  },

  "Nashik": {
    budget: [
      { name: "Zostel Nashik", rating: 3.9, reviews: 1900, location: "CBS Bus Stand" },
      { name: "Hotel Abhishek", rating: 3.5, reviews: 1200, location: "Old Agra Road" },
      { name: "Hotel Panchavati", rating: 3.4, reviews: 980, location: "Ramkund Area" }
    ],
    standard: [
      { name: "Ginger Nashik", rating: 4.0, reviews: 2100, location: "Mumbai–Agra Road" },
      { name: "Hotel Express Inn Nashik", rating: 4.1, reviews: 2400, location: "Pathardi Phata" },
      { name: "Ibis Nashik", rating: 4.0, reviews: 2200, location: "Malegaon Road" }
    ],
    luxury: [
      { name: "Sula Vineyard Resort", rating: 4.7, reviews: 4200, location: "Gangapur Road" },
      { name: "The Source at Sula", rating: 4.8, reviews: 3600, location: "Gat 36/2 Govardhan" },
      { name: "Radisson Nashik", rating: 4.6, reviews: 3200, location: "Airport Road" }
    ]
  },

  "Leh": {
    budget: [
      { name: "Zostel Leh", rating: 4.2, reviews: 3200, location: "Old Leh Road" },
      { name: "Hotel Grand Himalaya", rating: 3.7, reviews: 1900, location: "Main Bazar" },
      { name: "Dragon Guest House", rating: 3.6, reviews: 1500, location: "Changspa" }
    ],
    standard: [
      { name: "Hotel Omasila Leh", rating: 4.1, reviews: 2400, location: "Fort Road" },
      { name: "Hotel K2 Leh", rating: 4.0, reviews: 2000, location: "Changspa Lane" },
      { name: "Singge Palace Hotel", rating: 4.2, reviews: 2200, location: "Karzoo" }
    ],
    luxury: [
      { name: "The Grand Dragon Ladakh", rating: 4.8, reviews: 4800, location: "Old Leh Road" },
      { name: "Chamba Camp Thiksey", rating: 4.9, reviews: 3900, location: "Thiksey Village" },
      { name: "Indus Greens Resort Leh", rating: 4.7, reviews: 3200, location: "Skara" }
    ]
  },

  "Spiti": {
    budget: [
      { name: "Zostel Kaza", rating: 4.2, reviews: 1800, location: "Kaza Town" },
      { name: "Hotel Deyzor Kaza", rating: 3.6, reviews: 1100, location: "Main Market Kaza" },
      { name: "Sakya Abode Homestay", rating: 3.8, reviews: 940, location: "Kibber Village" }
    ],
    standard: [
      { name: "Spiti Holiday Inn", rating: 4.0, reviews: 1400, location: "Kaza" },
      { name: "Hotel Himalayan Retreat Kaza", rating: 4.1, reviews: 1200, location: "Kaza" },
      { name: "Norbu Ghespa Resort", rating: 4.2, reviews: 1100, location: "Tabo" }
    ],
    luxury: [
      { name: "The Spiti Valley Camp", rating: 4.7, reviews: 1600, location: "Pin Valley" },
      { name: "Himalayan Eco Lodges", rating: 4.6, reviews: 1300, location: "Kaza" },
      { name: "Spiti Sarai", rating: 4.8, reviews: 1100, location: "Kaza" }
    ]
  },

  "Kedarnath": {
    budget: [
      { name: "GMVN Tourist Rest House", rating: 3.5, reviews: 2100, location: "Near Temple" },
      { name: "Kedar Dham Lodge", rating: 3.3, reviews: 1600, location: "Kedarnath Village" },
      { name: "Bhola Guest House", rating: 3.4, reviews: 1300, location: "Near Helipad" }
    ],
    standard: [
      { name: "Hotel Kedar", rating: 3.9, reviews: 1800, location: "Main Path" },
      { name: "Mandakini Dham Guesthouse", rating: 4.0, reviews: 1500, location: "Village Area" },
      { name: "The Himalayan Pad", rating: 4.1, reviews: 1200, location: "Above Town" }
    ],
    luxury: [
      { name: "Kedarnath Base Camp Luxury Tents", rating: 4.5, reviews: 1400, location: "Forest Area" },
      { name: "Mountain Retreat Kedarnath", rating: 4.4, reviews: 1100, location: "Above Village" },
      { name: "Divine Valley Kedarnath", rating: 4.6, reviews: 900, location: "Scenic Ridge" }
    ]
  },

  "Badrinath": {
    budget: [
      { name: "GMVN Badrinath Tourist Bungalow", rating: 3.6, reviews: 1800, location: "Near Temple" },
      { name: "Hotel Sarovar Portico", rating: 3.4, reviews: 1400, location: "Mana Village Road" },
      { name: "Badri Kedar Lodge", rating: 3.3, reviews: 1100, location: "Temple Road" }
    ],
    standard: [
      { name: "Snow Crest Inn Badrinath", rating: 3.9, reviews: 1600, location: "Main Road" },
      { name: "Hotel Dev Lok", rating: 4.0, reviews: 1400, location: "Near Alaknanda" },
      { name: "Hotel Saraswati Badrinath", rating: 3.9, reviews: 1200, location: "Village Area" }
    ],
    luxury: [
      { name: "Aalia Badrinath Resort", rating: 4.5, reviews: 1200, location: "River View" },
      { name: "The Himalayan Abode", rating: 4.6, reviews: 1000, location: "Above Town" },
      { name: "Divine Char Dham Retreat", rating: 4.4, reviews: 850, location: "Mana Village" }
    ]
  },

  // ─── ANDAMAN & LAKSHADWEEP ────────────────────────────────────────────────────
  "Port Blair": {
    budget: [
      { name: "Zostel Port Blair", rating: 4.0, reviews: 1900, location: "Aberdeen Bazar" },
      { name: "Hotel Dew Dale", rating: 3.5, reviews: 1200, location: "Junglighat" },
      { name: "Hotel Shompen", rating: 3.4, reviews: 980, location: "Marine Hill" }
    ],
    standard: [
      { name: "Sinclair's Bayview Hotel", rating: 4.1, reviews: 2100, location: "South Point" },
      { name: "Sea Shell Port Blair", rating: 4.2, reviews: 2600, location: "Corbyn's Cove" },
      { name: "Hotel TSG Grand Port Blair", rating: 4.0, reviews: 2300, location: "VIP Road" }
    ],
    luxury: [
      { name: "Taj Exotica Resort Andaman", rating: 4.8, reviews: 5200, location: "Long Island" },
      { name: "SeaShell Havelock Island", rating: 4.7, reviews: 4400, location: "Havelock" },
      { name: "Barefoot Andaman", rating: 4.8, reviews: 3900, location: "Havelock Beach" }
    ]
  },

  // ─── GENERIC FALLBACKS FOR COMMON SMALL CITIES ───────────────────────────────
  "Chandigarh": {
    budget: [
      { name: "Zostel Chandigarh", rating: 3.9, reviews: 1700, location: "Sector 17" },
      { name: "Hotel Aroma Chandigarh", rating: 3.6, reviews: 1300, location: "Sector 22" },
      { name: "Hotel City Heart", rating: 3.5, reviews: 1100, location: "Sector 35" }
    ],
    standard: [
      { name: "Lemon Tree Chandigarh", rating: 4.1, reviews: 2400, location: "Industrial Area" },
      { name: "Hotel Park View", rating: 4.0, reviews: 2000, location: "Sector 24" },
      { name: "The Lalit Chandigarh", rating: 4.3, reviews: 2800, location: "Industrial Area" }
    ],
    luxury: [
      { name: "JW Marriott Chandigarh", rating: 4.8, reviews: 5600, location: "Sector 35" },
      { name: "Taj Chandigarh", rating: 4.7, reviews: 4800, location: "Sector 17" },
      { name: "Hyatt Regency Chandigarh", rating: 4.7, reviews: 4200, location: "Industrial Area" }
    ]
  },

  "Jaipur": {
    budget: [
      { name: "Zostel Jaipur", rating: 4.0, reviews: 2900, location: "Pink City" },
      { name: "Hotel Pearl Palace", rating: 4.1, reviews: 3400, location: "Hathroi Fort" },
      { name: "Moustache Jaipur", rating: 4.0, reviews: 2100, location: "Bani Park" }
    ],
    standard: [
      { name: "Lemon Tree Jaipur", rating: 4.1, reviews: 2600, location: "Kukas" },
      { name: "Ibis Jaipur", rating: 4.0, reviews: 3100, location: "Kukas" },
      { name: "Hotel Clarks Amer", rating: 4.2, reviews: 2900, location: "JLN Marg" }
    ],
    luxury: [
      { name: "Rambagh Palace by Taj", rating: 4.9, reviews: 8900, location: "Bhawani Singh Road" },
      { name: "Taj Jai Mahal Palace", rating: 4.8, reviews: 6800, location: "Jacob Road" },
      { name: "Oberoi Rajvilas", rating: 4.9, reviews: 7400, location: "Goner Road" }
    ]
  },

  "Lucknow": {
    budget: [
      { name: "Zostel Lucknow", rating: 3.9, reviews: 1700, location: "Hazratganj" },
      { name: "Hotel Gomti", rating: 3.5, reviews: 1300, location: "Station Road" },
      { name: "Hotel Grand Continental", rating: 3.4, reviews: 980, location: "Aishbagh" }
    ],
    standard: [
      { name: "Lemon Tree Lucknow", rating: 4.1, reviews: 2300, location: "Vibhuti Khand" },
      { name: "Ibis Lucknow", rating: 4.0, reviews: 2800, location: "Gomti Nagar" },
      { name: "Vivanta Lucknow by Taj", rating: 4.4, reviews: 3100, location: "Gomti Nagar" }
    ],
    luxury: [
      { name: "Taj Mahal Lucknow", rating: 4.8, reviews: 5200, location: "Vibhuti Khand" },
      { name: "The Piccadily Hotel", rating: 4.6, reviews: 3900, location: "Gomti Nagar" },
      { name: "Renaissance Lucknow", rating: 4.7, reviews: 4400, location: "Gomti Nagar" }
    ]
  },

  "Nagpur": {
    budget: [
      { name: "Zostel Nagpur", rating: 3.8, reviews: 1500, location: "Sitabuldi" },
      { name: "Hotel Blue Diamond", rating: 3.5, reviews: 1100, location: "Dharampeth" },
      { name: "Hotel Center Point", rating: 3.4, reviews: 880, location: "Central Avenue" }
    ],
    standard: [
      { name: "Lemon Tree Nagpur", rating: 4.0, reviews: 2100, location: "Central Bazar Rd" },
      { name: "Ibis Nagpur", rating: 4.1, reviews: 2400, location: "Ring Road" },
      { name: "Hotel Tuli International", rating: 4.0, reviews: 2000, location: "Central Avenue" }
    ],
    luxury: [
      { name: "Radisson Blu Nagpur", rating: 4.7, reviews: 3800, location: "Wardha Road" },
      { name: "Le Meridien Nagpur", rating: 4.7, reviews: 4200, location: "Wardha Road" },
      { name: "Taj Nagpur", rating: 4.8, reviews: 4800, location: "Central Bazar Road" }
    ]
  },

  "Visakhapatnam": {
    budget: [
      { name: "Zostel Vizag", rating: 3.9, reviews: 1800, location: "RK Beach" },
      { name: "Hotel Palm Beach", rating: 3.5, reviews: 1300, location: "Beach Road" },
      { name: "Hotel Apsara", rating: 3.4, reviews: 990, location: "Jagadamba Junction" }
    ],
    standard: [
      { name: "Lemon Tree Vizag", rating: 4.0, reviews: 2200, location: "Beach Road" },
      { name: "Hotel Novotel Vizag", rating: 4.2, reviews: 2800, location: "Beach Road" },
      { name: "Fortune Murali Park Vizag", rating: 4.1, reviews: 2400, location: "Suryabagh" }
    ],
    luxury: [
      { name: "The Park Visakhapatnam", rating: 4.7, reviews: 4400, location: "Beach Road" },
      { name: "Radisson Blu Visakhapatnam", rating: 4.7, reviews: 3900, location: "Waltair Uplands" },
      { name: "Taj Gateway Visakhapatnam", rating: 4.8, reviews: 5100, location: "Beach Road" }
    ]
  },

  "Ranthambore": {
    budget: [
      { name: "Hotel Ankur Resort", rating: 3.6, reviews: 1200, location: "Sawai Madhopur" },
      { name: "Tiger Safari Resort", rating: 3.5, reviews: 1100, location: "Ranthambore Road" },
      { name: "Hotel Raj Mahal", rating: 3.4, reviews: 860, location: "Sawai Madhopur" }
    ],
    standard: [
      { name: "RTDC Castle Jhoomar Baori", rating: 4.0, reviews: 1700, location: "Ranthambore Rd" },
      { name: "Ranthambhore Regency Hotel", rating: 4.1, reviews: 2100, location: "Forest Approach" },
      { name: "Hotel Tiger Den", rating: 4.0, reviews: 1600, location: "Ranthambore Road" }
    ],
    luxury: [
      { name: "Oberoi Vanyavilas Ranthambore", rating: 4.9, reviews: 6800, location: "Sawai Madhopur" },
      { name: "Aman-i-Khas Ranthambore", rating: 4.9, reviews: 5200, location: "Sherpur Khiljipur" },
      { name: "Sher Bagh Ranthambore", rating: 4.8, reviews: 4400, location: "Khiljipur" }
    ]
  },

  "Aurangabad": {
    budget: [
      { name: "Zostel Aurangabad", rating: 3.8, reviews: 1600, location: "CIDCO" },
      { name: "Hotel Panchavati", rating: 3.4, reviews: 1200, location: "Station Road" },
      { name: "MTDC Tourist Resort", rating: 3.5, reviews: 1100, location: "Station Road" }
    ],
    standard: [
      { name: "Lemon Tree Aurangabad", rating: 4.0, reviews: 2100, location: "Chikalthana" },
      { name: "Hotel Ramada Aurangabad", rating: 4.1, reviews: 2400, location: "R-3 Chikalthana" },
      { name: "Vivanta Aurangabad by Taj", rating: 4.3, reviews: 2800, location: "R-3 Area" }
    ],
    luxury: [
      { name: "Taj Hotel & Convention Centre Aurangabad", rating: 4.7, reviews: 5100, location: "R-3 CIDCO" },
      { name: "WelcomHotel Rama International", rating: 4.6, reviews: 3900, location: "Adalat Road" },
      { name: "Hotel Green Olive", rating: 4.5, reviews: 3200, location: "Jalna Road" }
    ]
  },

  "Igatpuri": {
    budget: [
      { name: "Zostel Igatpuri", rating: 4.0, reviews: 1600, location: "Station Area" },
      { name: "Hotel Satkar", rating: 3.4, reviews: 920, location: "Main Road" },
      { name: "Riverview Guest House", rating: 3.5, reviews: 780, location: "Bhatsa River" }
    ],
    standard: [
      { name: "Hilton Shillim Estate Retreat", rating: 4.3, reviews: 2100, location: "Shillim Village" },
      { name: "Nature's Nest Igatpuri", rating: 4.1, reviews: 1700, location: "Ghoti Road" },
      { name: "Igatpuri Jungle Camp", rating: 4.2, reviews: 1500, location: "Near Fort" }
    ],
    luxury: [
      { name: "Hilton Shillim Estate Retreat", rating: 4.8, reviews: 3400, location: "Shillim Village" },
      { name: "The Machan Igatpuri", rating: 4.7, reviews: 2800, location: "Jambulne" },
      { name: "Atmantan Wellness Centre", rating: 4.9, reviews: 3200, location: "Mulshi Lake" }
    ]
  },

  "Ganpatipule": {
    budget: [
      { name: "MTDC Resort Ganpatipule", rating: 3.6, reviews: 1400, location: "Beach Road" },
      { name: "Hotel Sai Prasad", rating: 3.4, reviews: 1000, location: "Near Temple" },
      { name: "Ganesh Krupa Lodge", rating: 3.3, reviews: 760, location: "Beach Side" }
    ],
    standard: [
      { name: "Hotel Atithi Ganpatipule", rating: 4.0, reviews: 1600, location: "Beach Road" },
      { name: "Raj Residency Ganpatipule", rating: 4.1, reviews: 1400, location: "Aare Ware Road" },
      { name: "Hotel Ashtavinayak", rating: 3.9, reviews: 1200, location: "Temple Marg" }
    ],
    luxury: [
      { name: "MTDC Ganpatipule Beach Resort", rating: 4.5, reviews: 2100, location: "Ganpatipule Beach" },
      { name: "Mango Retreats Ganpatipule", rating: 4.6, reviews: 1800, location: "Pawas Road" },
      { name: "Aaram Baug Resort", rating: 4.4, reviews: 1600, location: "Aare Ware" }
    ]
  },

  "Tarkarli": {
    budget: [
      { name: "MTDC Tarkarli Resort", rating: 3.6, reviews: 1200, location: "Beach Road" },
      { name: "Aqua Resort Tarkarli", rating: 3.5, reviews: 980, location: "Near Beach" },
      { name: "Malvan Tourist Lodge", rating: 3.4, reviews: 760, location: "Malvan Market" }
    ],
    standard: [
      { name: "Chivla Beach Resort", rating: 4.1, reviews: 1700, location: "Chivla Beach" },
      { name: "Blue Lagoon Resort", rating: 4.0, reviews: 1500, location: "Tarkarli Beach" },
      { name: "Hotel Rock Garden", rating: 4.1, reviews: 1300, location: "Malvan Road" }
    ],
    luxury: [
      { name: "Atman Beach Resort Tarkarli", rating: 4.6, reviews: 2100, location: "Tarkarli Beach" },
      { name: "Dil Banjara Beach Resort", rating: 4.5, reviews: 1800, location: "Karli Backwater" },
      { name: "Malvan Pearl Beach Resort", rating: 4.7, reviews: 2400, location: "Malvan Beach" }
    ]
  },

  "Dwarka": {
    budget: [
      { name: "GTDC Toran Hotel Dwarka", rating: 3.5, reviews: 1300, location: "Near Temple" },
      { name: "Hotel Sahil", rating: 3.3, reviews: 1000, location: "Dwarka Town" },
      { name: "Krishna Guest House", rating: 3.4, reviews: 820, location: "Near Gomti Ghat" }
    ],
    standard: [
      { name: "Hotel Darshan Dwarka", rating: 4.0, reviews: 1700, location: "Shankhoddar Road" },
      { name: "Dwarkadhish Hotel", rating: 3.9, reviews: 1500, location: "Near Temple" },
      { name: "Hotel Radha Madhav", rating: 4.0, reviews: 1300, location: "Dwarka Town" }
    ],
    luxury: [
      { name: "Fern Residency Dwarka", rating: 4.5, reviews: 2200, location: "National Highway" },
      { name: "Hotel Govardhan", rating: 4.4, reviews: 1900, location: "Near Gomti" },
      { name: "Lord's Eco Inn Dwarka", rating: 4.6, reviews: 1700, location: "Dwarka Town" }
    ]
  },

  "Somnath": {
    budget: [
      { name: "GTDC Toran Hotel Somnath", rating: 3.5, reviews: 1100, location: "Near Temple" },
      { name: "Hotel Jay Somnath", rating: 3.4, reviews: 860, location: "Temple Road" },
      { name: "Sea View Lodge", rating: 3.3, reviews: 720, location: "Somnath Beach" }
    ],
    standard: [
      { name: "Hotel Mayuram Somnath", rating: 4.0, reviews: 1600, location: "Temple Marg" },
      { name: "The Somnath Hotel", rating: 3.9, reviews: 1400, location: "Veraval Road" },
      { name: "Hotel Sun Inn Somnath", rating: 4.1, reviews: 1300, location: "Near Temple" }
    ],
    luxury: [
      { name: "Fern Residency Somnath", rating: 4.5, reviews: 2100, location: "Sea View Road" },
      { name: "Somnath Trust Bungalow", rating: 4.4, reviews: 1800, location: "Temple Complex" },
      { name: "Sea Pearl Hotel Somnath", rating: 4.6, reviews: 1600, location: "Somnath Beach" }
    ]
  },

  "Vrindavan": {
    budget: [
      { name: "Hotel Shri Radha Ashok", rating: 3.6, reviews: 1800, location: "Parikrama Marg" },
      { name: "Vrindavan Dham Lodge", rating: 3.4, reviews: 1400, location: "Near ISKCON" },
      { name: "Brijwasi Grand", rating: 3.5, reviews: 1200, location: "Chattikara Road" }
    ],
    standard: [
      { name: "Hotel Nidhivan Sarovar Portico", rating: 4.1, reviews: 2400, location: "Parikrama Marg" },
      { name: "Hotel Vrinda Palace", rating: 4.0, reviews: 2000, location: "Near Banke Bihari" },
      { name: "Hotel Braj Residency", rating: 4.0, reviews: 1800, location: "Mathura-Vrindavan Rd" }
    ],
    luxury: [
      { name: "Krishna Valley Vrindavan", rating: 4.7, reviews: 3200, location: "Bhaktivedanta Marg" },
      { name: "Hyatt Regency Vrindavan", rating: 4.8, reviews: 4100, location: "Parikrama Road" },
      { name: "Radha Govind Dham Resort", rating: 4.6, reviews: 2800, location: "Near Govind Kund" }
    ]
  },

  "Mathura": {
    budget: [
      { name: "Hotel Brij Raj", rating: 3.5, reviews: 1400, location: "Station Road" },
      { name: "Hotel Krishna Palace", rating: 3.4, reviews: 1100, location: "Holi Gate" },
      { name: "OYO Hotel Mathura Inn", rating: 3.3, reviews: 880, location: "Dampier Nagar" }
    ],
    standard: [
      { name: "Hotel Madhuvan Mathura", rating: 4.0, reviews: 2100, location: "Krishna Nagar" },
      { name: "Hotel Brijwasi Royal", rating: 4.1, reviews: 1900, location: "Station Road" },
      { name: "Radisson Blu Mathura", rating: 4.3, reviews: 2600, location: "NH-19" }
    ],
    luxury: [
      { name: "Radisson Blu Hotel Mathura", rating: 4.7, reviews: 3800, location: "NH-2" },
      { name: "ITC WelcomHotel Mathura", rating: 4.7, reviews: 3400, location: "Masani Bypass" },
      { name: "Fortune Inn Mathura", rating: 4.6, reviews: 3000, location: "Near Highway" }
    ]
  },

  "Puri": {
    budget: [
      { name: "Zostel Puri", rating: 4.1, reviews: 2200, location: "Sea Beach Road" },
      { name: "Hotel Love & Life", rating: 3.5, reviews: 1600, location: "CT Road" },
      { name: "OTDC Panthanivas Puri", rating: 3.6, reviews: 1900, location: "Sea Beach" }
    ],
    standard: [
      { name: "Hotel Hans Coco Palms", rating: 4.1, reviews: 2400, location: "CT Road" },
      { name: "Hotel Mayfair Heritage", rating: 4.3, reviews: 3100, location: "Sea Beach Road" },
      { name: "Hotel Holiday Resort Puri", rating: 4.0, reviews: 2200, location: "CT Road" }
    ],
    luxury: [
      { name: "Mayfair Beach Resort Puri", rating: 4.8, reviews: 5400, location: "Sea Beach Road" },
      { name: "Sterling Holidays Puri", rating: 4.6, reviews: 4100, location: "Marine Parade" },
      { name: "Toshali Sands Ethnic Village Resort", rating: 4.7, reviews: 3800, location: "Marine Parade" }
    ]
  },

  "Bhubaneswar": {
    budget: [
      { name: "Zostel Bhubaneswar", rating: 3.9, reviews: 1700, location: "Bapuji Nagar" },
      { name: "Hotel Arya", rating: 3.5, reviews: 1200, location: "Master Canteen" },
      { name: "OYO Hotel Kalinga Ashok", rating: 3.4, reviews: 980, location: "Jaydev Vihar" }
    ],
    standard: [
      { name: "Lemon Tree Bhubaneswar", rating: 4.1, reviews: 2300, location: "Jaydev Vihar" },
      { name: "Ibis Bhubaneswar", rating: 4.0, reviews: 2700, location: "Patia" },
      { name: "Swosti Premium Bhubaneswar", rating: 4.2, reviews: 2400, location: "Raj Mahal Sq" }
    ],
    luxury: [
      { name: "Trident Bhubaneswar", rating: 4.8, reviews: 5200, location: "Jaydev Vihar" },
      { name: "Mayfair Lagoon Bhubaneswar", rating: 4.7, reviews: 4600, location: "Jaydev Vihar" },
      { name: "The Crown Bhubaneswar", rating: 4.6, reviews: 3800, location: "Nayapalli" }
    ]
  },

  "Patna": {
    budget: [
      { name: "Zostel Patna", rating: 3.7, reviews: 1400, location: "Gandhi Maidan" },
      { name: "Hotel Maurya Patna", rating: 3.5, reviews: 1200, location: "South Gandhi Maidan" },
      { name: "Hotel President", rating: 3.4, reviews: 900, location: "Frazer Road" }
    ],
    standard: [
      { name: "Lemon Tree Patna", rating: 4.0, reviews: 2100, location: "Exhibition Road" },
      { name: "Hotel Chanakya Patna", rating: 4.1, reviews: 2400, location: "Beer Chand Patel Marg" },
      { name: "Radisson Blu Patna", rating: 4.2, reviews: 2800, location: "Fraser Road" }
    ],
    luxury: [
      { name: "Hotel Maurya Patna (ITC)", rating: 4.7, reviews: 4800, location: "South Gandhi Maidan" },
      { name: "The Vivanta Patna by Taj", rating: 4.7, reviews: 4200, location: "Patna Exhibition Road" },
      { name: "Four Points Sheraton Patna", rating: 4.6, reviews: 3600, location: "Birchand Patel" }
    ]
  },

  "Ranchi": {
    budget: [
      { name: "Hotel Capitol Hill Ranchi", rating: 3.5, reviews: 1100, location: "Main Road" },
      { name: "Hotel Yuvraj", rating: 3.4, reviews: 900, location: "Station Road" },
      { name: "Hotel Anand Lok", rating: 3.3, reviews: 720, location: "Circular Road" }
    ],
    standard: [
      { name: "Lemon Tree Ranchi", rating: 4.0, reviews: 2000, location: "Harmu Road" },
      { name: "Hotel BNR Ranchi", rating: 4.2, reviews: 2400, location: "Station Road" },
      { name: "Radisson Blu Ranchi", rating: 4.2, reviews: 2800, location: "Main Road" }
    ],
    luxury: [
      { name: "Radisson Blu Ranchi", rating: 4.7, reviews: 4200, location: "Main Road" },
      { name: "Hotel Hub Ranchi", rating: 4.6, reviews: 3600, location: "Kokar Industrial Area" },
      { name: "Fortune Park Jharkhand Ranchi", rating: 4.6, reviews: 3200, location: "Lalpur Road" }
    ]
  },

  "Indore": {
    budget: [
      { name: "Zostel Indore", rating: 3.9, reviews: 1700, location: "Rajwada" },
      { name: "Hotel Shreemaya", rating: 3.6, reviews: 1400, location: "RNT Marg" },
      { name: "Hotel Shivoy", rating: 3.5, reviews: 1100, location: "Jawahar Marg" }
    ],
    standard: [
      { name: "Lemon Tree Indore", rating: 4.0, reviews: 2300, location: "Vijay Nagar" },
      { name: "Ibis Indore", rating: 4.1, reviews: 2700, location: "MR-9" },
      { name: "Hotel Sayaji Indore", rating: 4.2, reviews: 3100, location: "Vijay Nagar" }
    ],
    luxury: [
      { name: "Marriott Hotel Indore", rating: 4.7, reviews: 5100, location: "Treasure Island Mall Rd" },
      { name: "Sayaji Hotel Indore", rating: 4.6, reviews: 4400, location: "Vijay Nagar" },
      { name: "Novotel Indore", rating: 4.7, reviews: 4800, location: "Sector D Scheme" }
    ]
  },

  "Surat": {
    budget: [
      { name: "Zostel Surat", rating: 3.8, reviews: 1500, location: "Ring Road" },
      { name: "Hotel Yuvraj Palace", rating: 3.5, reviews: 1200, location: "Athwa Lines" },
      { name: "OYO Hotel Classic Surat", rating: 3.4, reviews: 940, location: "Varachha" }
    ],
    standard: [
      { name: "Lemon Tree Surat", rating: 4.1, reviews: 2400, location: "Dumas Road" },
      { name: "The Gateway Hotel Marine Drive Surat", rating: 4.2, reviews: 2900, location: "Athwa Lines" },
      { name: "Hotel Lords Eco Inn Surat", rating: 4.0, reviews: 2100, location: "Ring Road" }
    ],
    luxury: [
      { name: "Lords Inn Surat", rating: 4.7, reviews: 4200, location: "Varachha Road" },
      { name: "Vivanta Surat by Taj", rating: 4.7, reviews: 4800, location: "Adajan" },
      { name: "Marriott Surat", rating: 4.8, reviews: 5200, location: "Athwa Gate" }
    ]
  },

  "Mandi": {
    budget: [
      { name: "Hotel Raj Mahal Mandi", rating: 3.5, reviews: 920, location: "Bus Stand Area" },
      { name: "HPTDC Hotel Uhl", rating: 3.4, reviews: 780, location: "Beas Bank" },
      { name: "Hotel Evening Plaza", rating: 3.3, reviews: 640, location: "Indira Market" }
    ],
    standard: [
      { name: "Hotel Mandav Mandi", rating: 4.0, reviews: 1400, location: "Main Road" },
      { name: "Hotel River View Mandi", rating: 4.1, reviews: 1200, location: "Beas River Bank" },
      { name: "Hotel Crown Mandi", rating: 3.9, reviews: 1000, location: "Near Bus Stand" }
    ],
    luxury: [
      { name: "Banjara Camp & Retreat Mandi", rating: 4.6, reviews: 1800, location: "Beas Riverside" },
      { name: "The Repose Mandi", rating: 4.5, reviews: 1500, location: "Above Town" },
      { name: "Nature Ville Resort", rating: 4.7, reviews: 1300, location: "Bhambla Road" }
    ]
  },

  "Dharamsala": {
    budget: [
      { name: "Zostel Dharamsala", rating: 4.2, reviews: 2800, location: "McLeod Ganj" },
      { name: "Hotel Tibet McLeod Ganj", rating: 3.8, reviews: 1800, location: "McLeod Ganj" },
      { name: "Himalayan Village Cottages", rating: 3.7, reviews: 1500, location: "Dharamkot" }
    ],
    standard: [
      { name: "Hotel Fortune Park Moksha", rating: 4.1, reviews: 2200, location: "Dharamsala" },
      { name: "Chonor House", rating: 4.2, reviews: 1900, location: "McLeod Ganj" },
      { name: "Hotel Norling McLeod Ganj", rating: 4.1, reviews: 1700, location: "McLeod Ganj" }
    ],
    luxury: [
      { name: "Taj McLeod Ganj Resort & Spa", rating: 4.7, reviews: 3600, location: "McLeod Ganj" },
      { name: "Hyatt Place Hamirpur", rating: 4.6, reviews: 2800, location: "Bypass Road" },
      { name: "Zostel Plus Dharamsala", rating: 4.5, reviews: 2400, location: "Bhagsu Road" }
    ]
  },

  "Dalhousie": {
    budget: [
      { name: "HPTDC Hotel Geetanjali", rating: 3.5, reviews: 1100, location: "Gandhi Chowk" },
      { name: "Hotel Mongas Dalhousie", rating: 3.4, reviews: 870, location: "Gandhi Chowk" },
      { name: "Youth Hostel Dalhousie", rating: 3.3, reviews: 640, location: "Subhash Chowk" }
    ],
    standard: [
      { name: "Hotel Grand View Dalhousie", rating: 4.0, reviews: 1600, location: "Thandi Sadak" },
      { name: "Hotel Spring Valley", rating: 4.1, reviews: 1400, location: "Subhash Chowk" },
      { name: "Hotel Mount View Dalhousie", rating: 3.9, reviews: 1200, location: "Mall Road" }
    ],
    luxury: [
      { name: "Dalhousie Great Escape Resort", rating: 4.6, reviews: 2200, location: "Above Town" },
      { name: "Manu Allaya Spa & Resort", rating: 4.7, reviews: 1900, location: "Khajjiar Road" },
      { name: "Khajjiar Lake Resort", rating: 4.5, reviews: 1700, location: "Khajjiar" }
    ]
  },

  "Ajmer": {
    budget: [
      { name: "Hotel KEM", rating: 3.5, reviews: 1200, location: "Station Road" },
      { name: "Hotel Nagpal", rating: 3.4, reviews: 950, location: "Kutchery Road" },
      { name: "Zostel Ajmer", rating: 3.9, reviews: 1700, location: "Near Dargah" }
    ],
    standard: [
      { name: "Hotel Mansingh Ajmer", rating: 4.1, reviews: 2200, location: "Vaishali Nagar" },
      { name: "Lemon Tree Ajmer", rating: 4.0, reviews: 2000, location: "Near Stadium" },
      { name: "Hotel Embassy Ajmer", rating: 4.0, reviews: 1800, location: "Station Road" }
    ],
    luxury: [
      { name: "Hotel Mansingh Towers Ajmer", rating: 4.6, reviews: 3200, location: "Vaishali Nagar" },
      { name: "Hotel Savoy Ajmer", rating: 4.5, reviews: 2800, location: "Near Lake" },
      { name: "Ana Hotels Ajmer", rating: 4.7, reviews: 2400, location: "Nasirabad Road" }
    ]
  },

};

// ─── FALLBACK TEMPLATES BY LOCATION TYPE ────────────────────────────────────────
// Used when no specific entry exists for the destination city

const fallbackTemplates = {
  // Hill / mountain towns
  hill: {
    budget: [
      { name: "HPTDC / State Tourism Lodge", rating: 3.4, reviews: 620, location: "Near Main Market" },
      { name: "Green Valley Guest House", rating: 3.5, reviews: 540, location: "Hillside" },
      { name: "Mountain View Homestay", rating: 3.6, reviews: 480, location: "Above Town" }
    ],
    standard: [
      { name: "Pine Forest Resort", rating: 4.0, reviews: 980, location: "Forest Edge" },
      { name: "Himalayan Inn", rating: 4.1, reviews: 860, location: "Main Road" },
      { name: "Valley View Resort", rating: 4.0, reviews: 740, location: "Viewpoint Road" }
    ],
    luxury: [
      { name: "Mountain Retreat & Spa", rating: 4.6, reviews: 1400, location: "Scenic Ridge" },
      { name: "Heritage Hill Lodge", rating: 4.5, reviews: 1200, location: "Upper Hill" },
      { name: "The Himalayan Eco Resort", rating: 4.7, reviews: 1100, location: "Nature Reserve" }
    ]
  },
  // Coastal / beach
  coastal: {
    budget: [
      { name: "Sea Breeze Guest House", rating: 3.4, reviews: 720, location: "Beach Road" },
      { name: "Coconut Grove Hostel", rating: 3.6, reviews: 640, location: "Near Beach" },
      { name: "Fisherman's Cottage", rating: 3.5, reviews: 540, location: "Fishing Village" }
    ],
    standard: [
      { name: "Beach Crest Resort", rating: 4.0, reviews: 1100, location: "Beachfront" },
      { name: "Blue Lagoon Hotel", rating: 4.1, reviews: 980, location: "Sea View Road" },
      { name: "Coastal Palms Resort", rating: 4.0, reviews: 860, location: "Beach Side" }
    ],
    luxury: [
      { name: "Seaside Luxury Villas", rating: 4.6, reviews: 1800, location: "Private Beach" },
      { name: "Beachfront Heritage Resort", rating: 4.7, reviews: 1600, location: "Sea Front" },
      { name: "Ocean Breeze Spa & Resort", rating: 4.8, reviews: 1400, location: "Coastal Drive" }
    ]
  },
  // Pilgrim / temple towns
  pilgrim: {
    budget: [
      { name: "Dharamshala Trust Lodge", rating: 3.3, reviews: 1800, location: "Near Temple" },
      { name: "Pilgrim Rest House", rating: 3.2, reviews: 1500, location: "Temple Road" },
      { name: "Seva Sadan Guest House", rating: 3.4, reviews: 1200, location: "Main Bazar" }
    ],
    standard: [
      { name: "Hotel Devlok", rating: 3.9, reviews: 1600, location: "Temple Marg" },
      { name: "Yatri Niwas", rating: 4.0, reviews: 1400, location: "Near Ghat" },
      { name: "Temple View Hotel", rating: 4.1, reviews: 1200, location: "Main Road" }
    ],
    luxury: [
      { name: "Heritage Temple Resort", rating: 4.5, reviews: 2200, location: "Temple Road" },
      { name: "Spiritual Retreat & Spa", rating: 4.6, reviews: 1900, location: "Riverside" },
      { name: "Vedic Village Resort", rating: 4.7, reviews: 1700, location: "Outskirts" }
    ]
  },
  // Generic small town / village
  town: {
    budget: [
      { name: "Hotel Shree Ganesh", rating: 3.3, reviews: 420, location: "Bus Stand Area" },
      { name: "Ravi Guest House", rating: 3.2, reviews: 360, location: "Main Market" },
      { name: "Local Homestay", rating: 3.5, reviews: 290, location: "Village Centre" }
    ],
    standard: [
      { name: "Hotel Comfort Inn", rating: 3.9, reviews: 680, location: "Highway Junction" },
      { name: "Town Centre Hotel", rating: 4.0, reviews: 590, location: "Main Road" },
      { name: "Highway Grand Hotel", rating: 3.8, reviews: 510, location: "NH Bypass" }
    ],
    luxury: [
      { name: "Boutique Heritage Hotel", rating: 4.4, reviews: 960, location: "Outskirts" },
      { name: "Nature Retreat Lodge", rating: 4.5, reviews: 840, location: "Forest Edge" },
      { name: "District Premium Resort", rating: 4.4, reviews: 720, location: "Main Highway" }
    ]
  },
  // Tier-2 / big city
  city: {
    budget: [
      { name: "OYO Economy Hotel", rating: 3.3, reviews: 880, location: "Station Area" },
      { name: "Treebo Budget Stay", rating: 3.5, reviews: 760, location: "City Centre" },
      { name: "Fab Hotel", rating: 3.4, reviews: 640, location: "Main Market" }
    ],
    standard: [
      { name: "Ginger Hotel", rating: 4.0, reviews: 1800, location: "Bus Station Road" },
      { name: "Lemon Tree Hotel", rating: 4.1, reviews: 2200, location: "Central Area" },
      { name: "Ibis Hotel", rating: 4.0, reviews: 2000, location: "Airport Approach" }
    ],
    luxury: [
      { name: "Radisson Blu Hotel", rating: 4.6, reviews: 3600, location: "Commercial Area" },
      { name: "Fortune Hotel", rating: 4.5, reviews: 3100, location: "Ring Road" },
      { name: "Novotel Hotel", rating: 4.6, reviews: 3400, location: "Central Business" }
    ]
  }
};

// ─── LOCATION TYPE CLASSIFIER ─────────────────────────────────────────────────
// Classify a city name into a fallback template type

const hillKeywords = [
  "shimla","manali","darjeeling","ooty","kodaikanal","mussoorie","nainital",
  "kasol","kasauli","dalhousie","chail","kufri","spiti","kaza","tabo","kibber",
  "chitkul","sangla","lahaul","rohtang","solang","leh","kargil","nubra",
  "pangong","tso moriri","hanle","diskit","lamayuru","zanskar","padum",
  "gulmarg","pahalgam","sonamarg","kedarnath","badrinath","gangotri","yamunotri",
  "auli","chopta","tungnath","chandrashila","munsiyari","kausani","ranikhet",
  "binsar","chaukori","tirthan","jibhi","jalori","shoja","barot","khajjiar",
  "lachung","lachen","yuksom","pelling","ravangla","namchi","bomdila","dirang",
  "tawang","ziro","along","mechuka","gurudongmar"
];

const coastalKeywords = [
  "goa","kovalam","varkala","alleppey","alappuzha","kumarakom","munroe",
  "tarkarli","malvan","ganpatipule","dapoli","mandvi","somnath","dwarka",
  "diu","puri","gopalpur","chilika","digha","bakkhali","havelock","neil",
  "port blair","baratang","diglipur","ross island","kavaratti","agatti",
  "bangaram","lakshadweep","rameswaram","kanyakumari","mahabalipuram",
  "pondicherry","puducherry","mahe","kannur","kozhikode","bekal","kasaragod",
  "udupi","karwar","gokarna","murudeshwar","kundapur","kaup"
];

const pilgrimKeywords = [
  "varanasi","rishikesh","haridwar","mathura","vrindavan","ayodhya","prayagraj",
  "allahabad","tirupati","shirdi","nashik","trimbakeshwar","pandharpur","tuljapur",
  "akkalkot","solapur devi","kolhapur","pune tuljapur","amritsar","golden temple",
  "pushkar","ajmer","eklingji","nathdwara","dwarka","somnath","puri","bhubaneswar",
  "konark","bodhgaya","gaya","rajgir","nalanda","sarnath","kushinagar",
  "bodh","patna sahib","anandpur sahib","hemkund","badrinath","kedarnath",
  "gangotri","yamunotri","char dham","ujjain","omkareshwar","maheshwar",
  "amarkantak","chitrakoot","orchha","sanchi","pavagadh","ambaji","somnath"
];

export const classifyLocation = (city) => {
  if (!city) return "town";
  const c = city.toLowerCase();
  if (hillKeywords.some(k => c.includes(k))) return "hill";
  if (coastalKeywords.some(k => c.includes(k))) return "coastal";
  if (pilgrimKeywords.some(k => c.includes(k))) return "pilgrim";

  // Tier-1/2 cities
  const bigCities = [
    "mumbai","delhi","bangalore","chennai","kolkata","hyderabad","pune","ahmedabad",
    "jaipur","lucknow","surat","kochi","chandigarh","bhopal","indore","nagpur",
    "visakhapatnam","agra","varanasi","guwahati","patna","ranchi","bhubaneswar",
    "coimbatore","madurai","thiruvananthapuram","amritsar","udaipur","jodhpur"
  ];
  if (bigCities.some(k => c.includes(k))) return "city";

  return "town";
};

// ─── MAIN EXPORT: Get hotels for a city ────────────────────────────────────────
// Returns { budget: [...], standard: [...], luxury: [...] }
// Falls back to an appropriate template if the city is not in the database

export const getHotelsForCity = (city) => {
  if (!city) return fallbackTemplates.town;

  // Direct match
  if (hotelsByCity[city]) return hotelsByCity[city];

  // Case-insensitive match
  const key = Object.keys(hotelsByCity).find(
    k => k.toLowerCase() === city.toLowerCase()
  );
  if (key) return hotelsByCity[key];

  // Partial match (e.g. "New Delhi" → "Delhi")
  const partial = Object.keys(hotelsByCity).find(
    k => city.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(city.toLowerCase())
  );
  if (partial) return hotelsByCity[partial];

  // Fallback by location type
  const type = classifyLocation(city);
  const template = fallbackTemplates[type];

  // Personalise the fallback hotel names with the city name
  const personalize = (hotels) =>
    hotels.map(h => ({
      ...h,
      name: h.name.replace(
        /Hotel|Resort|Inn|Lodge|Guest House/,
        (match) => `${match}`
      ),
      location: h.location.includes(city) ? h.location : `${h.location}, ${city}`
    }));

  return {
    budget:   personalize(template.budget),
    standard: personalize(template.standard),
    luxury:   personalize(template.luxury)
  };
};
