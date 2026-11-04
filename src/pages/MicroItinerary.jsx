import React, { useState, useEffect, useCallback } from "react";
import { allCities, citiesByState } from "../data/multiHopData.js";
import { microItineraryTemplates, disruptionScenarios } from "../data/multiHopData.js";
import "./MicroItinerary.css";

const typeIcon  = { transit:"🚌", food:"🍽️", sightseeing:"🏛️", activity:"🎯" };
const typeColor = { transit:"#6B7280", food:"#F59E0B", sightseeing:"#3B82F6", activity:"#10B981" };
const severityColor = { low:"#10B981", medium:"#F59E0B", high:"#EF4444" };

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE TRAVEL RISK SIMULATOR — India-specific, terrain-aware
// ═══════════════════════════════════════════════════════════════════════════════

// ── Classify destination terrain ──────────────────────────────────────────────
const classifyTerrain = (dest) => {
  if (!dest) return {};
  const d = dest.toLowerCase();
  const isHill    = /shimla|manali|darjeeling|ooty|kodaikanal|mussoorie|nainital|kasol|kaza|tabo|chitkul|leh|kargil|gulmarg|pahalgam|sonamarg|kedarnath|badrinath|gangotri|yamunotri|auli|chopta|tungnath|munsiyari|kausani|ranikhet|binsar|chaukori|dharamsala|mcleod|dalhousie|khajjiar|coorg|chikmagalur|mahabaleshwar|panchgani|lonavala|khandala|igatpuri|matheran|sakleshpur|vagamon|ponmudi|yercaud|valparai|coonoor|munnar|spiti|lahaul|rohtang/.test(d);
  const isRemote  = /leh|kargil|nubra|pangong|tso moriri|hanle|zanskar|padum|tawang|ziro|mechuka|gurudongmar|chitkul|sangla|tabo|kaza|kheerganga|hemkund|valley of flowers|milam|pindari|munsiyari/.test(d);
  const isBeach   = /goa|kovalam|varkala|tarkarli|malvan|ganpatipule|puri|gopalpur|digha|gokarna|murudeshwar|havelock|neil island|kavaratti|rameswaram|kanyakumari|mahabalipuram|pondicherry|puducherry|mandvi|diu|somnath|dwarka|bekal|kasaragod/.test(d);
  const isPilgrim = /varanasi|rishikesh|haridwar|tirupati|shirdi|ajmer|pushkar|kedarnath|badrinath|gangotri|yamunotri|trimbakeshwar|vrindavan|mathura|ayodhya|kashi|somnath|dwarka|kanyakumari|amritsar|bodh gaya|ujjain|omkareshwar|maheshwar|chitrakoot|orchha/.test(d);
  const isDesert  = /jaisalmer|bikaner|barmer|osian|khimsar|sam sand|thar/.test(d);
  const isForest  = /ranthambore|bandhavgarh|kanha|pench|corbett|satpura|nagarhole|wayanad|kaziranga|sundarbans|periyar|dudhwa|sariska|gir/.test(d);
  const isMetro   = /mumbai|delhi|bangalore|chennai|kolkata|hyderabad|pune|ahmedabad/.test(d);
  const isNE      = /guwahati|shillong|tawang|ziro|kaziranga|majuli|cherrapunji|mawlynnong|dawki|imphal|aizawl|kohima|agartala|itanagar/.test(d);

  // Overall risk level
  let overallRisk = "moderate";
  if (isRemote) overallRisk = "high";
  else if (isHill || isNE) overallRisk = "elevated";
  else if (isMetro) overallRisk = "low";

  return { isHill, isRemote, isBeach, isPilgrim, isDesert, isForest, isMetro, isNE, overallRisk };
};

// ── Risk probability labels ────────────────────────────────────────────────────
// probability: 0-100 (realistic % chance per trip)
// impact: low / moderate / high / critical
// category: transport / weather / health / safety / natural / crowd / infrastructure

const buildRiskScenarios = (destination) => {
  const t = classifyTerrain(destination);

  const risks = [];

  // ── 1. TRANSPORT DISRUPTIONS ─────────────────────────────────────────────────
  risks.push({
    id: "train-delay",
    category: "transport",
    icon: "🚂",
    statusIcon: "⏰",
    label: "Train Delayed 2+ Hours",
    description: "Indian Railways delays are common due to fog, freight priority, or signal failures.",
    probability: t.isRemote ? 20 : t.isHill ? 30 : 45,
    impact: "moderate",
    severity: "medium",
    delayHours: 2,
    realFact: "IR operates 13,000+ trains daily; avg delay rate is ~15–20% on many routes.",
    affectedMode: "train",
    alternatives: t.isHill ? [
      { action: `Private cab via hill road to ${destination}`, addedCost: 600, addedTime: 0.5, icon: "🚗", tip: "Book Ola Outstation or local taxi app" },
      { action: "Shared jeep / Sumo with other passengers", addedCost: 180, addedTime: 1.0, icon: "🛻", tip: "Wait near station — jeeps fill quickly" },
      { action: "Wait for train; skip first activity, rearrange", addedCost: 0, addedTime: 2, icon: "⏳", tip: "Use NTES app to track live train location" },
    ] : t.isBeach ? [
      { action: "Coastal government bus (KSRTC/MSRTC)", addedCost: 60, addedTime: 0.5, icon: "🚌", tip: "Cheaper and frequent on coastal routes" },
      { action: "Shared auto / cab from nearest station", addedCost: 150, addedTime: 0.25, icon: "🛺", tip: "OLA/UBER often available near coastal towns" },
      { action: "Wait; use extra time to explore the station town", addedCost: 0, addedTime: 2, icon: "⏳", tip: "Check NTES app for real-time ETA" },
    ] : [
      { action: "Next available express or ST bus", addedCost: 80, addedTime: 0.5, icon: "🚌", tip: "RedBus / APSRTC apps for availability" },
      { action: "Shared cab — split with co-passengers", addedCost: 300, addedTime: 0, icon: "🚗", tip: "Ask railway inquiry for prepaid cab desk" },
      { action: "Rearrange schedule; skip one sightseeing stop", addedCost: 0, addedTime: 2, icon: "⏳", tip: "NTES app, 139 helpline for updates" },
    ]
  });

  risks.push({
    id: "bus-cancel",
    category: "transport",
    icon: "🚌",
    statusIcon: "❌",
    label: "Bus Service Cancelled / Strike",
    description: t.isRemote
      ? "Remote mountain areas have limited bus frequency — 1 per day is common. Breakdowns or weather can cancel the only bus."
      : "State transport strikes or breakdowns can leave travellers stranded unexpectedly.",
    probability: t.isRemote ? 25 : t.isHill ? 20 : 15,
    impact: t.isRemote ? "high" : "moderate",
    severity: t.isRemote ? "high" : "medium",
    delayHours: t.isRemote ? 5 : 2,
    realFact: t.isRemote
      ? "In Spiti & Ladakh, the single daily bus is the lifeline. Road closures can strand travellers for days."
      : "State transport strikes occur 4–6 times a year in many states.",
    affectedMode: "bus",
    alternatives: t.isRemote ? [
      { action: "Join another group's vehicle or hitch with locals", addedCost: 200, addedTime: 1, icon: "🛻", tip: "Ask at tea stalls — most locals help stranded travellers" },
      { action: "Hire local guide with horse/mule for trekking route", addedCost: 600, addedTime: 3.0, icon: "🧭", tip: "ITBP checkposts can assist in emergencies" },
      { action: "Wait for next government jeep (may be next day)", addedCost: 0, addedTime: 8, icon: "⏳", tip: "Always carry 2 days extra provisions in remote areas" },
    ] : t.isHill ? [
      { action: "Shared Jeep / Sumo up the hill route", addedCost: 200, addedTime: 0.5, icon: "🛻", tip: "Jeeps usually wait near the bus stand" },
      { action: "Private cab — negotiate fixed fare", addedCost: 400, addedTime: 0, icon: "🚗", tip: "Fix price before boarding to avoid overcharging" },
      { action: "Wait 3h for next HRTC / private operator bus", addedCost: 0, addedTime: 3, icon: "🚌", tip: "Check HRTC app for schedule" },
    ] : [
      { action: "Auto-rickshaw / e-rickshaw to train station", addedCost: 120, addedTime: 0.5, icon: "🛺", tip: "Use Rapido or local auto for short distances" },
      { action: "Shared cab — OLA / Uber outstation", addedCost: 250, addedTime: 0.25, icon: "🚗", tip: "Split cost with co-travellers" },
      { action: "Wait for next state transport bus", addedCost: 0, addedTime: 3, icon: "🚌", tip: "Call state transport helpline for updates" },
    ]
  });

  risks.push({
    id: "flight-cancel",
    category: "transport",
    icon: "✈️",
    statusIcon: "❌",
    label: "Flight Cancelled / Severe Delay",
    description: "Flights to/from small-town airports (Shimla, Kullu, Dibrugarh, etc.) cancel frequently due to fog, low visibility, or low load factor.",
    probability: t.isRemote ? 35 : t.isHill ? 40 : 12,
    impact: "high",
    severity: "high",
    delayHours: 4,
    realFact: "Shimla & Kullu airports have ~30–40% cancellation rates due to mountain fog and low cloud ceiling.",
    affectedMode: "flight",
    alternatives: [
      { action: "Rebook on next available flight (airline duty of care)", addedCost: 0, addedTime: 4, icon: "✈️", tip: "Airline must provide meals if delay > 2h — know your rights (DGCA)" },
      { action: t.isHill ? "Overnight Volvo bus (Himachal/HRTC)" : "Rajdhani / Shatabdi Express train", addedCost: t.isHill ? 800 : -1500, addedTime: t.isRemote ? 18 : 8, icon: "🚂", tip: "Book on IRCTC immediately — seats fill fast after cancellations" },
      { action: t.isPilgrim ? "Pilgrimage group shared bus" : "Outstation cab / cab aggregator", addedCost: t.isPilgrim ? 600 : 2800, addedTime: t.isPilgrim ? 2 : 6, icon: "🚗", tip: "Savaari / Zoomcar for outstation cab booking" },
    ]
  });

  // ── 2. WEATHER & NATURAL HAZARDS ─────────────────────────────────────────────
  if (t.isHill || t.isRemote) {
    risks.push({
      id: "landslide",
      category: "natural",
      icon: "⛰️",
      statusIcon: "🚧",
      label: "Landslide / Road Blocked",
      description: "Monsoon landslides are extremely common in the Himalayas (Jun–Sep). NH-3, NH-5, Rohtang Pass, Zoji-La are frequently blocked.",
      probability: 55,
      impact: "critical",
      severity: "high",
      delayHours: t.isRemote ? 12 : 4,
      realFact: "In 2023, Himachal Pradesh recorded 300+ landslides blocking highways during July–August monsoon.",
      affectedMode: "road",
      alternatives: [
        { action: "BRO-maintained alternate route (longer but safer)", addedCost: 200, addedTime: 2.5, icon: "🛻", tip: "Follow BRO Twitter / HRTC updates for road clearance" },
        { action: `Stay overnight at nearest guesthouse — wait for clearance`, addedCost: 700, addedTime: 24, icon: "🏠", tip: "NDMA Helpline: 1078 | HP Disaster: 1077" },
        { action: "Helicopter service if available (Pawan Hans)", addedCost: 4000, addedTime: 0, icon: "🚁", tip: "Pawan Hans operates emergency heli services in Uttarakhand/HP" },
      ]
    });

    risks.push({
      id: "altitude-sickness",
      category: "health",
      icon: "🏔️",
      statusIcon: "🤒",
      label: "Acute Mountain Sickness (AMS)",
      description: "Altitude above 2500m can cause headache, nausea, shortness of breath. Above 3500m (Leh, Spiti, Kedarnath) risk is significant.",
      probability: t.isRemote ? 50 : 30,
      impact: "high",
      severity: t.isRemote ? "high" : "medium",
      delayHours: t.isRemote ? 24 : 6,
      realFact: "~25% of travellers to Leh (3524m) show AMS symptoms. Diamox is commonly prescribed but needs doctor advice.",
      affectedMode: "health",
      alternatives: [
        { action: "Acclimatize 24–48h — rest, no exertion, stay hydrated", addedCost: 0, addedTime: 24, icon: "🛏️", tip: "Do NOT fly directly to Leh without 1-day rest on arrival" },
        { action: "Descend 300–500m to lower altitude immediately", addedCost: 300, addedTime: 2, icon: "🛻", tip: "Descent is the most effective treatment for severe AMS" },
        { action: "Visit SNM Hospital Leh / local clinic for Diamox", addedCost: 200, addedTime: 1, icon: "🏥", tip: "SNM Hospital Leh: 01982-252014 | Keep Diamox in first-aid kit" },
      ]
    });

    risks.push({
      id: "flash-flood",
      category: "natural",
      icon: "🌊",
      statusIcon: "⚠️",
      label: "Flash Flood / Cloudburst",
      description: "Cloudbursts in Himalayan valleys cause sudden flash floods. The 2021 Uttarakhand & 2023 Himachal floods displaced thousands.",
      probability: 30,
      impact: "critical",
      severity: "high",
      delayHours: 24,
      realFact: "Cloudbursts dump 100mm+ rain in under an hour — rivers can rise 3–4 metres in minutes.",
      affectedMode: "all",
      alternatives: [
        { action: "Move immediately to high ground — never camp near rivers", addedCost: 0, addedTime: 0, icon: "⛰️", tip: "NEVER camp on riverbanks in monsoon season" },
        { action: "Stay at current accommodation until NDMA clearance", addedCost: 600, addedTime: 24, icon: "🏠", tip: "Call NDMA: 1078 | District Collector emergency number" },
        { action: "Request evacuation via Pawan Hans / Army helicopter", addedCost: 0, addedTime: 3, icon: "🚁", tip: "Army assists in major disaster zones — register with district SP" },
      ]
    });
  }

  if (t.isBeach) {
    risks.push({
      id: "cyclone",
      category: "weather",
      icon: "🌀",
      statusIcon: "⚠️",
      label: "Cyclone / Coastal Storm Warning",
      description: "Bay of Bengal and Arabian Sea generate 4–6 cyclones per year. IMD issues colour-coded warnings 3–5 days in advance.",
      probability: 18,
      impact: "critical",
      severity: "high",
      delayHours: 24,
      realFact: "Cyclone season: May–June & Oct–Dec. Odisha, AP, TN and Gujarat coasts are most affected.",
      affectedMode: "all",
      alternatives: [
        { action: "Evacuate to designated cyclone shelter immediately", addedCost: 0, addedTime: 0, icon: "🏗️", tip: "Follow IMD warnings: imd.gov.in | Colour alerts: Green/Yellow/Orange/Red" },
        { action: "Move 50km+ inland — book hotel away from coast", addedCost: 1200, addedTime: 3, icon: "🏨", tip: "Avoid low-lying coastal areas during Red/Orange alert" },
        { action: "Postpone trip — rebook flights post-clearance", addedCost: 500, addedTime: 48, icon: "✈️", tip: "Airlines often waive rescheduling fees during cyclone alerts" },
      ]
    });

    risks.push({
      id: "rip-current",
      category: "safety",
      icon: "🏊",
      statusIcon: "⚠️",
      label: "Rip Current / Unsafe Sea Conditions",
      description: "Rip currents kill ~100+ people on Indian beaches annually. Red-flag beaches should never be entered.",
      probability: 22,
      impact: "high",
      severity: "high",
      delayHours: 0,
      realFact: "Goa, Maharashtra, and Odisha beaches report frequent rip current fatalities especially in monsoon (Jun–Sep).",
      affectedMode: "activity",
      alternatives: [
        { action: "Check beach flag status — swim only on Green-flag beaches", addedCost: 0, addedTime: 0, icon: "🚩", tip: "Red = dangerous, Yellow = caution, Green = safe" },
        { action: "Visit calmer backwater / lagoon instead of open sea", addedCost: 50, addedTime: 0.5, icon: "🚣", tip: "Backwater kayaking/boating is safe in most weather" },
        { action: "Hire NDRF-certified beach lifeguard for water activities", addedCost: 300, addedTime: 0, icon: "🛟", tip: "Ask hotel/resort to arrange certified water sports" },
      ]
    });

    risks.push({
      id: "jellyfish",
      category: "health",
      icon: "🪼",
      statusIcon: "⚠️",
      label: "Jellyfish / Marine Creature Stings",
      description: "Jellyfish blooms peak in Goa & Kerala Nov–Mar. Box jellyfish in Andaman waters are potentially dangerous.",
      probability: 20,
      impact: "moderate",
      severity: "medium",
      delayHours: 1,
      realFact: "Andaman's box jellyfish can cause severe pain, welts, and in rare cases cardiac arrest. Wear a rash guard.",
      affectedMode: "activity",
      alternatives: [
        { action: "Wear full-body rash guard + reef shoes while swimming", addedCost: 400, addedTime: 0, icon: "🩴", tip: "Most beach shops sell rash guards for ₹300–500" },
        { action: "Ask locals or lifeguards about jellyfish presence before entering", addedCost: 0, addedTime: 0, icon: "💬", tip: "If stung: remove tentacles with card (not hands), rinse with salt water" },
        { action: "Shift to pool/backwater activities — avoid open sea that day", addedCost: 0, addedTime: 0, icon: "🏊", tip: "Hotel pool or lagoon boat ride are excellent alternatives" },
      ]
    });
  }

  if (t.isDesert) {
    risks.push({
      id: "heat-wave",
      category: "weather",
      icon: "☀️",
      statusIcon: "🌡️",
      label: "Extreme Heat / Heat Wave",
      description: "Rajasthan desert temperatures reach 48–50°C in April–June. Heat stroke kills hundreds annually across India.",
      probability: 60,
      impact: "high",
      severity: "high",
      delayHours: 0,
      realFact: "IMD declares a Heat Wave when max temperature crosses 40°C in plains or 30°C in hilly areas.",
      affectedMode: "activity",
      alternatives: [
        { action: "Sightseeing only before 9 AM and after 5 PM — rest midday", addedCost: 0, addedTime: 0, icon: "🌅", tip: "Carry ORS sachets, minimum 3L water/person/day" },
        { action: "Replace outdoor activities with fort / museum / palace interiors", addedCost: 100, addedTime: 0, icon: "🏰", tip: "Most Rajasthan palaces/forts have shaded courtyards" },
        { action: "Stay in AC hotel room 12–4 PM — reschedule desert safari to evening", addedCost: 0, addedTime: 0, icon: "🏨", tip: "Desert safaris at sunset are more scenic anyway" },
      ]
    });

    risks.push({
      id: "sandstorm",
      category: "weather",
      icon: "🌪️",
      statusIcon: "⚠️",
      label: "Dust Storm / Sandstorm",
      description: "Andhi (dust storms) in Rajasthan and western UP hit without warning and reduce visibility to near zero.",
      probability: 25,
      impact: "moderate",
      severity: "medium",
      delayHours: 2,
      realFact: "Jaisalmer and Barmer experience 10–15 major dust storms per year, mainly pre-monsoon (Apr–Jun).",
      affectedMode: "all",
      alternatives: [
        { action: "Shelter indoors immediately — cover mouth/nose with wet cloth", addedCost: 0, addedTime: 2, icon: "🏠", tip: "Storms typically last 1–3 hours — wait it out at hotel" },
        { action: "Postpone desert safari / camel ride to next day", addedCost: 0, addedTime: 0, icon: "🐪", tip: "Cancellation policies are flexible during weather disruptions" },
        { action: "Carry sealed goggles, N95 mask, and full-sleeve clothing", addedCost: 200, addedTime: 0, icon: "🥽", tip: "These are standard equipment for desert travellers" },
      ]
    });
  }

  if (t.isForest) {
    risks.push({
      id: "wildlife",
      category: "safety",
      icon: "🐅",
      statusIcon: "⚠️",
      label: "Wildlife Encounter / Safari Hazard",
      description: "Tiger reserves and elephant corridors require strict protocols. Safari rules violations can be life-threatening.",
      probability: 15,
      impact: "high",
      severity: "high",
      delayHours: 1,
      realFact: "Ranthambore & Corbett report 3–5 human-wildlife conflict incidents annually. Always use licensed guides.",
      affectedMode: "activity",
      alternatives: [
        { action: "Only enter forest with certified naturalist — never off-road", addedCost: 500, addedTime: 0, icon: "🧑‍🌿", tip: "Licensed guides are mandatory; book through Forest Dept website" },
        { action: "If encounter occurs: stay silent, no sudden movements, back away slowly", addedCost: 0, addedTime: 0, icon: "🤫", tip: "Never run from a tiger — maintain eye contact and back away" },
        { action: "Skip deep forest zones — visit museum / nature centre instead", addedCost: 0, addedTime: 0, icon: "🏛️", tip: "Tiger reserves have excellent interpretation centres" },
      ]
    });

    risks.push({
      id: "jungle-fever",
      category: "health",
      icon: "🦟",
      statusIcon: "🤒",
      label: "Malaria / Dengue Risk",
      description: "Forest fringes and tribal areas in Madhya Pradesh, Jharkhand, Odisha and NE India are malaria-endemic zones.",
      probability: 20,
      impact: "high",
      severity: "medium",
      delayHours: 0,
      realFact: "India accounts for ~2% of global malaria cases. Odisha, Chhattisgarh, and Jharkhand are high-burden states.",
      affectedMode: "health",
      alternatives: [
        { action: "Start antimalarial prophylaxis before trip (consult doctor)", addedCost: 300, addedTime: 0, icon: "💊", tip: "Doxycycline / Chloroquine — start 2 days before entry into endemic zone" },
        { action: "Use DEET repellent, sleep under permethrin-treated net", addedCost: 150, addedTime: 0, icon: "🛡️", tip: "Peak mosquito activity: dawn and dusk — cover up fully" },
        { action: "If fever develops: visit nearest PHC or Mission Hospital immediately", addedCost: 200, addedTime: 3, icon: "🏥", tip: "Rapid diagnostic test available at all primary health centres" },
      ]
    });
  }

  if (t.isNE) {
    risks.push({
      id: "permit-restriction",
      category: "infrastructure",
      icon: "📋",
      statusIcon: "🚫",
      label: "Permit / ILP Restriction",
      description: "Arunachal Pradesh, Manipur, Mizoram, and Nagaland require Inner Line Permits (ILP) for non-residents. Tawang requires additional military permit.",
      probability: 70,
      impact: "high",
      severity: "high",
      delayHours: 0,
      realFact: "ILP violations can result in detention and deportation back to state border. Apply online 15 days in advance.",
      affectedMode: "entry",
      alternatives: [
        { action: "Apply for ILP online at ilp.arunachal.gov.in before trip", addedCost: 100, addedTime: 0, icon: "📱", tip: "Processing takes 1–3 working days — apply 15 days early" },
        { action: "Hire registered local tour operator — they handle all permits", addedCost: 2000, addedTime: 0, icon: "🧑‍💼", tip: "Tour operators in Tezpur/Guwahati can arrange permits in 24h" },
        { action: "If permit denied, visit Meghalaya or Assam (no ILP needed)", addedCost: 0, addedTime: 0, icon: "🗺️", tip: "Meghalaya: Shillong, Cherrapunji, Mawlynnong — no permit required" },
      ]
    });

    risks.push({
      id: "political-unrest",
      category: "safety",
      icon: "⚠️",
      statusIcon: "🚫",
      label: "Bandh / Political Unrest / Road Block",
      description: "North-eastern states experience frequent bandh (shutdowns) and road blockades due to ethnic or political disputes.",
      probability: 30,
      impact: "moderate",
      severity: "medium",
      delayHours: 6,
      realFact: "Manipur and Nagaland average 20–30 bandh days per year. Always check MHA/state advisory before travel.",
      affectedMode: "all",
      alternatives: [
        { action: "Check MHA travel advisory and state police website before departure", addedCost: 0, addedTime: 0, icon: "📰", tip: "Ministry of Home Affairs: mha.gov.in/travel-advisory" },
        { action: "Stay at hotel — do not venture out during bandh hours", addedCost: 0, addedTime: 6, icon: "🏨", tip: "Bandhs typically end by evening — plan indoor activities" },
        { action: "Hire local guide who knows current ground situation", addedCost: 800, addedTime: 0, icon: "🧑‍🌿", tip: "Local guides can navigate safely during sensitive periods" },
      ]
    });
  }

  // ── 3. HEALTH & MEDICAL ───────────────────────────────────────────────────────
  risks.push({
    id: "food-poisoning",
    category: "health",
    icon: "🍽️",
    statusIcon: "🤢",
    label: "Food Poisoning / Delhi Belly",
    description: "Travellers' diarrhoea is the most common travel health issue in India — affects ~30–40% of foreign visitors and 10–15% of domestic travellers.",
    probability: t.isPilgrim ? 35 : t.isRemote ? 25 : 20,
    impact: "moderate",
    severity: "medium",
    delayHours: t.isRemote ? 12 : 4,
    realFact: "Street food stalls with high turnover are generally safer than empty restaurants. Avoid pre-cut fruit and water ice.",
    affectedMode: "health",
    alternatives: [
      { action: "Rest at hotel, hydrate with ORS — avoid spicy food 24h", addedCost: 100, addedTime: 6, icon: "💧", tip: "ORS > sports drinks. Coconut water is excellent for hydration" },
      { action: "Visit nearest govt hospital / pharmacy for ORS + Norflox", addedCost: 200, addedTime: 2, icon: "🏥", tip: "Norfloxacin 400mg is standard treatment; carry in travel kit" },
      { action: "Reschedule outdoor activities to next day — rest fully", addedCost: 0, addedTime: 12, icon: "🛏️", tip: "Prevent: wash hands, avoid tap water, eat at busy stalls" },
    ]
  });

  risks.push({
    id: "medical-emergency",
    category: "health",
    icon: "🚑",
    statusIcon: "🆘",
    label: "Medical Emergency / Accident",
    description: "Remote areas have limited medical infrastructure. Response times to tier-3 cities and villages can exceed 2 hours.",
    probability: t.isRemote ? 15 : t.isHill ? 10 : 5,
    impact: "critical",
    severity: t.isRemote ? "high" : "medium",
    delayHours: t.isRemote ? 6 : 2,
    realFact: "National Emergency Number: 112. Ambulance: 108. Air evacuation in Himalayas via Pawan Hans: 011-24610480.",
    affectedMode: "health",
    alternatives: [
      { action: "Call 112 (national emergency) or 108 (ambulance) immediately", addedCost: 0, addedTime: 0, icon: "📞", tip: "108 is free, 24/7, covers all states. Save it before travel" },
      { action: t.isRemote ? "Helicopter evacuation via Pawan Hans (011-24610480)" : "Nearest district hospital emergency — ask locals", addedCost: t.isRemote ? 12000 : 500, addedTime: 1, icon: "🚁", tip: "Travel insurance with medical evacuation is ESSENTIAL for remote areas" },
      { action: "Contact nearest ITBP / Army post for emergency assistance", addedCost: 0, addedTime: 0.5, icon: "🪖", tip: "Army and ITBP posts assist civilians in genuine medical emergencies" },
    ]
  });

  // ── 4. INFRASTRUCTURE & CROWD ─────────────────────────────────────────────────
  risks.push({
    id: "hotel-overbooking",
    category: "infrastructure",
    icon: "🏨",
    statusIcon: "❌",
    label: "Hotel Overbooking / Booking Failure",
    description: "Peak season overbooking is common in popular tourist destinations. Festival seasons (Diwali, Holi, New Year) cause 100% occupancy.",
    probability: t.isPilgrim ? 45 : t.isBeach ? 35 : 20,
    impact: "moderate",
    severity: "medium",
    delayHours: 2,
    realFact: "Consumer Forum India receives 50,000+ hotel/booking complaints per year. Always get booking confirmation in writing.",
    affectedMode: "accommodation",
    alternatives: [
      { action: "Ask hotel to arrange alternative property at same or better rate", addedCost: 0, addedTime: 1, icon: "📞", tip: "Under Consumer Protection Act, hotel must compensate or arrange equivalent" },
      { action: "Book on MakeMyTrip / Booking.com with instant confirmation", addedCost: 200, addedTime: 0.5, icon: "📱", tip: "Choose properties with 'Free Cancellation' and confirmed rooms" },
      { action: "Ask local tourist office for emergency accommodation list", addedCost: 0, addedTime: 1, icon: "🗺️", tip: "MTDC/RTDC/HPTDC state tourism offices maintain emergency lists" },
    ]
  });

  if (t.isPilgrim) {
    risks.push({
      id: "crowd-stampede",
      category: "crowd",
      icon: "👥",
      statusIcon: "⚠️",
      label: "Crowd Surge / Stampede Risk",
      description: "Major religious gatherings (Kumbh Mela, Rath Yatra, Tirupati) see 2–5 lakh pilgrims daily. Stampede risk is real.",
      probability: 25,
      impact: "critical",
      severity: "high",
      delayHours: 2,
      realFact: "Hathras stampede 2024 killed 121. Tirupati manages entries with time-slot tokens. Kumbh 2025 had 500+ crore footfalls.",
      affectedMode: "activity",
      alternatives: [
        { action: "Visit temple early morning (4–6 AM) to avoid peak crowds", addedCost: 0, addedTime: 0, icon: "🌅", tip: "Most temples offer darshan with 80% fewer crowds before 7 AM" },
        { action: "Book online paid darshan slot — guaranteed entry, no queue", addedCost: 300, addedTime: 0, icon: "📱", tip: "Tirupati: ttdsevaonline.com | Shirdi: shridisaibaba.in" },
        { action: "Avoid festival dates — visit 2 weeks before or after major festivals", addedCost: 0, addedTime: 0, icon: "📅", tip: "Avoid: Navratri, Diwali ±3 days, Rath Yatra, Kumbh peak bathing dates" },
      ]
    });
  }

  // ── 5. CONNECTIVITY & POWER ───────────────────────────────────────────────────
  risks.push({
    id: "network-outage",
    category: "infrastructure",
    icon: "📡",
    statusIcon: "❌",
    label: "Mobile Network / Internet Outage",
    description: t.isRemote
      ? "Ladakh, Spiti, and many border areas have NO mobile connectivity for 100km+ stretches. BSNL is the only operator in some zones."
      : "Power outages and network outages affect smaller towns. 4G coverage is patchy in rural India.",
    probability: t.isRemote ? 80 : t.isHill ? 50 : 25,
    impact: t.isRemote ? "high" : "moderate",
    severity: t.isRemote ? "high" : "medium",
    delayHours: 0,
    realFact: "Jammu & Kashmir and Ladakh experience the highest network disruptions — often due to security protocols.",
    affectedMode: "communication",
    alternatives: [
      { action: t.isRemote ? "Carry BSNL SIM — only network in Leh/Spiti/border areas" : "Carry offline maps (OsmAnd / MapsMe) and downloaded guides", addedCost: 200, addedTime: 0, icon: "📱", tip: t.isRemote ? "Buy BSNL SIM at Leh airport. Airtel works in Manali. Jio is poor past Rohtang." : "Download maps for entire trip before departing" },
      { action: "Pre-book all hotels and transports offline — carry paper copies", addedCost: 0, addedTime: 0, icon: "🗒️", tip: "Screenshot all bookings, QR codes, and contact numbers before leaving city" },
      { action: t.isRemote ? "Rent satellite phone / walkie-talkie for remote trekking" : "Note down key contact numbers on paper (police, hospital, hotel)", addedCost: t.isRemote ? 1200 : 0, addedTime: 0, icon: "📻", tip: t.isRemote ? "Inreach satellite communicators available on rent in Manali/Leh" : "Physical backup of critical info is underrated" },
    ]
  });

  // ── 6. GENERAL SAFETY ─────────────────────────────────────────────────────────
  risks.push({
    id: "theft-scam",
    category: "safety",
    icon: "👜",
    statusIcon: "⚠️",
    label: "Petty Theft / Tourist Scam",
    description: t.isPilgrim || t.isMetro
      ? "High pilgrim/tourist density means pickpockets are active. Taxi overcharging, gem scams, and fake tours are common."
      : "Isolated rural areas may have opportunistic theft, especially of unattended luggage.",
    probability: t.isMetro ? 20 : t.isPilgrim ? 30 : 15,
    impact: "moderate",
    severity: "medium",
    delayHours: 1,
    realFact: "Top scam destinations: Agra gem shops, Varanasi boat rides, Delhi tourist offices. Always use official pre-paid cabs.",
    affectedMode: "safety",
    alternatives: [
      { action: "Use pre-paid taxi / Ola-Uber — fixed fare, GPS tracked", addedCost: 0, addedTime: 0, icon: "🚕", tip: "Never accept unsolicited help with luggage at stations" },
      { action: "Use hotel safe — carry minimal cash, digital payments preferred", addedCost: 0, addedTime: 0, icon: "🔐", tip: "UPI works at most stalls now. Split cash across bags" },
      { action: "Report to Tourist Police (Tourism helpline: 1800-111-363)", addedCost: 0, addedTime: 1, icon: "👮", tip: "File FIR immediately for passport/card theft — insurance needs it" },
    ]
  });

  // Determine overall risk score (0-100)
  const overallScore = risks.reduce((sum, r) => sum + r.probability, 0) / risks.length;

  return { risks, overallRisk: t.overallRisk, overallScore: Math.round(overallScore), terrain: t };
};

// ─────────────────────────────────────────────────────────────────────────────
export default function MicroItinerary() {
  const [destination, setDestination] = useState("");
  const [days, setDays]               = useState(1);
  const [budget, setBudget]           = useState("medium");
  const [itinerary, setItinerary]     = useState(null);
  const [activeDisruption, setDisruption] = useState(null);
  const [chosenAlt, setChosenAlt]     = useState(null);
  const [disrupted, setDisrupted]     = useState(null);
  const [simRunning, setSimRunning]   = useState(false);
  const [simDone, setSimDone]         = useState(false);
  const [searchText, setSearchText]   = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const budgetMultiplier = { low: 0.6, medium: 1.0, high: 1.8 };

  // ── Build itinerary helper ──────────────────────────────────────────────────
  const buildItinerary = useCallback((dest, d, bdg) => {
    if (!dest) return;
    const template = microItineraryTemplates[dest] || microItineraryTemplates["default"];
    const mult = budgetMultiplier[bdg];
    const items = [];
    for (let day = 0; day < d; day++) {
      items.push(...template.map((item, i) => ({
        ...item,
        cost: Math.round(item.cost * mult),
        day: day + 1,
        id: `${day}-${i}`
      })));
    }
    return items;
  }, []);

  // ── Auto-rebuild when destination, days, or budget changes ─────────────────
  useEffect(() => {
    if (!destination) { setItinerary(null); return; }
    const items = buildItinerary(destination, days, budget);
    setItinerary(items);
    // Reset simulator state on any change
    setDisruption(null);
    setChosenAlt(null);
    setDisrupted(null);
    setSimDone(false);
    setSimRunning(false);
  }, [destination, days, budget, buildItinerary]);

  // ── Location-aware disruption scenarios ────────────────────────────────────
  const riskData = destination ? buildRiskScenarios(destination) : null;
  const currentScenarios = riskData ? riskData.risks : [];
  const filteredScenarios = activeCategory === "all"
    ? currentScenarios
    : currentScenarios.filter(r => r.category === activeCategory);

  const categories = riskData
    ? [...new Set(riskData.risks.map(r => r.category))]
    : [];

  const totalBudget = itinerary
    ? itinerary.reduce((sum, i) => sum + i.cost, 0)
    : 0;

  const runSimulator = (scenario) => {
    setDisruption(scenario);
    setSimRunning(true);
    setSimDone(false);
    setChosenAlt(null);
    setTimeout(() => setSimRunning(false), 1000);
  };

  const applyAlternative = (alt) => {
    setChosenAlt(alt);
    setDisrupted(activeDisruption);
    setSimDone(true);
  };

  const dayGroups = itinerary
    ? [...new Set(itinerary.map(i => i.day))].map(d => ({
        day: d,
        items: itinerary.filter(i => i.day === d)
      }))
    : [];

  // ── Filtered city list for search ─────────────────────────────────────────
  const filteredStates = Object.entries(citiesByState).reduce((acc, [state, locs]) => {
    const filtered = locs.filter(c =>
      c.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filtered.length) acc[state] = filtered;
    return acc;
  }, {});

  const hasCustomTemplate = destination && microItineraryTemplates[destination];

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div className="mi-header">
        <div className="mi-badge">✨ Feature 2</div>
        <h2 className="section-title">Micro-Itinerary Builder</h2>
        <p className="section-subtitle">
          Select a destination — the day plan, budget, and disruption simulator all
          update automatically. Change any option to instantly see the new plan.
        </p>
      </div>

      {/* Builder Form */}
      <div className="mi-form card">
        <h3 className="mi-form-title">📅 Build Your Day Plan</h3>
        <div className="mi-form-grid">

          {/* Destination with search */}
          <div className="form-group mi-dest-group">
            <label>📍 Destination (700+ locations)</label>
            <div className="mi-dest-wrapper">
              <input
                className="mi-search-input"
                type="text"
                placeholder="🔍 Search city / town / village..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <select
                value={destination}
                onChange={e => {
                  setDestination(e.target.value);
                  setSearchText("");
                }}
                size={searchText ? 8 : 1}
                className={`mi-dest-select ${searchText ? "mi-dest-open" : ""}`}
              >
                <option value="">— Select destination —</option>
                {Object.entries(filteredStates).map(([state, locs]) => (
                  <optgroup key={state} label={`📍 ${state}`}>
                    {locs.map(c => <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            {destination && (
              <div className="mi-dest-selected">
                ✅ <strong>{destination}</strong>
                {hasCustomTemplate
                  ? " — Detailed itinerary available"
                  : " — Using general itinerary template"}
                <button className="mi-clear-dest" onClick={() => { setDestination(""); setSearchText(""); }}>✕ Change</button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>🌙 Number of Days</label>
            <div className="passenger-control">
              <button onClick={() => setDays(d => Math.max(1, d - 1))}>−</button>
              <span>{days} day{days > 1 ? "s" : ""}</span>
              <button onClick={() => setDays(d => Math.min(7, d + 1))}>+</button>
            </div>
          </div>

          <div className="form-group">
            <label>💰 Budget Level</label>
            <div className="budget-btns">
              {[["low","🪙 Low"],["medium","💳 Medium"],["high","💎 High"]].map(([val, lbl]) => (
                <button key={val}
                  className={`budget-btn ${budget === val ? "active" : ""}`}
                  onClick={() => setBudget(val)}>{lbl}</button>
              ))}
            </div>
            <div className="mi-budget-hint">
              {budget === "low"    && "Street food, shared transport, dorms"}
              {budget === "medium" && "Mid-range stays, regular restaurants"}
              {budget === "high"   && "Premium hotels, fine dining, private cabs"}
            </div>
          </div>
        </div>

        {!destination && (
          <div className="mi-empty-hint">
            👆 Search and select a destination above to auto-generate the itinerary
          </div>
        )}
      </div>

      {/* Itinerary Display */}
      {itinerary && destination && (
        <div className="mi-main fade-in">
          {/* Live-update notice */}
          <div className="mi-live-notice">
            ⚡ Plan updates automatically — change destination, days or budget above
          </div>

          <div className="mi-layout">
            {/* Left: Day plan */}
            <div className="mi-left">
              <div className="mi-plan-header">
                <h3>📍 {destination} — {days}-Day Plan</h3>
                <div className="mi-total-budget">
                  💰 Est. Budget:&nbsp;
                  <strong>₹{totalBudget.toLocaleString()}</strong>
                  {chosenAlt && chosenAlt.addedCost !== 0 && (
                    <span className="mi-extra">
                      &nbsp;{chosenAlt.addedCost > 0 ? `+ ₹${chosenAlt.addedCost}` : `− ₹${Math.abs(chosenAlt.addedCost)}`} (disruption)
                      &nbsp;= <strong>₹{(totalBudget + chosenAlt.addedCost).toLocaleString()}</strong>
                    </span>
                  )}
                </div>
              </div>

              {dayGroups.map(group => (
                <div key={group.day} className="mi-day-block">
                  <div className="mi-day-label">Day {group.day}</div>
                  <div className="mi-timeline">
                    {group.items.map((item, idx) => {
                      const isDisruptedItem =
                        disrupted &&
                        item.type === "transit" &&
                        idx === 0 &&
                        group.day === 1;
                      return (
                        <div key={item.id} className={`mi-item ${isDisruptedItem ? "mi-disrupted" : ""}`}>
                          <div className="mi-item-time">{item.time}</div>
                          <div className="mi-item-dot" style={{ background: typeColor[item.type] }} />
                          <div className="mi-item-content">
                            <div className="mi-item-icon">{typeIcon[item.type]}</div>
                            <div className="mi-item-body">
                              <div className="mi-item-activity">
                                {isDisruptedItem && <span className="mi-disrupted-badge">⚠️ Disrupted</span>}
                                {item.activity}
                              </div>
                              <div className="mi-item-meta">
                                <span className="mi-type-chip"
                                  style={{ background: typeColor[item.type]+"22", color: typeColor[item.type] }}>
                                  {item.type}
                                </span>
                                {item.cost > 0 && <span className="mi-item-cost">₹{item.cost}</span>}
                                {item.cost === 0 && <span className="mi-item-free">FREE</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Applied Alternative Banner */}
              {simDone && chosenAlt && (
                <div className="mi-alt-applied fade-in">
                  <div className="mi-alt-icon">{chosenAlt.icon}</div>
                  <div>
                    <div className="mi-alt-title">✅ Alternative Applied: {chosenAlt.action}</div>
                    <div className="mi-alt-details">
                      {chosenAlt.addedTime > 0 && <span>+{chosenAlt.addedTime}h added to journey</span>}
                      {chosenAlt.addedTime === 0 && <span>No extra travel time</span>}
                      {chosenAlt.addedCost > 0 && <span> • +₹{chosenAlt.addedCost} extra cost</span>}
                      {chosenAlt.addedCost < 0 && <span> • Saved ₹{Math.abs(chosenAlt.addedCost)}</span>}
                      {chosenAlt.addedCost === 0 && <span> • No extra cost</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Disruption Simulator */}
            <div className="mi-right">
              <div className="mi-sim-card card">
                <div className="mi-sim-header">
                  <h3>⚡ Travel Risk Simulator</h3>
                  <p>
                    Real risks for&nbsp;<strong>{destination}</strong> — click any risk to see alternatives.
                  </p>
                </div>

                {/* Overall Risk Meter */}
                {riskData && (
                  <div className="mi-risk-meter">
                    <div className="mi-risk-meter-row">
                      <span className="mi-risk-label">Overall Trip Risk</span>
                      <span className={`mi-risk-badge mi-risk-${riskData.overallRisk}`}>
                        {riskData.overallRisk === "low" && "🟢 Low Risk"}
                        {riskData.overallRisk === "moderate" && "🟡 Moderate Risk"}
                        {riskData.overallRisk === "elevated" && "🟠 Elevated Risk"}
                        {riskData.overallRisk === "high" && "🔴 High Risk"}
                      </span>
                    </div>
                    <div className="mi-risk-bar-bg">
                      <div
                        className="mi-risk-bar-fill"
                        style={{
                          width: `${Math.min(100, riskData.overallScore)}%`,
                          background: riskData.overallScore > 60 ? "#EF4444"
                            : riskData.overallScore > 40 ? "#F59E0B"
                            : riskData.overallScore > 20 ? "#F97316"
                            : "#10B981"
                        }}
                      />
                    </div>
                    <div className="mi-risk-score-row">
                      <span className="mi-risk-score-label">Risk Score: {riskData.overallScore}/100</span>
                      <span className="mi-risk-count">{currentScenarios.length} risks identified</span>
                    </div>

                    {/* Terrain flags */}
                    <div className="mi-terrain-flags">
                      {riskData.terrain.isRemote  && <span className="mi-flag mi-flag-red">🏔️ Remote</span>}
                      {riskData.terrain.isHill     && <span className="mi-flag mi-flag-orange">⛰️ Hill</span>}
                      {riskData.terrain.isBeach    && <span className="mi-flag mi-flag-blue">🌊 Coastal</span>}
                      {riskData.terrain.isPilgrim  && <span className="mi-flag mi-flag-yellow">🙏 Pilgrimage</span>}
                      {riskData.terrain.isDesert   && <span className="mi-flag mi-flag-sand">🏜️ Desert</span>}
                      {riskData.terrain.isForest   && <span className="mi-flag mi-flag-green">🌿 Forest/Wildlife</span>}
                      {riskData.terrain.isNE       && <span className="mi-flag mi-flag-purple">🌏 North-East</span>}
                      {riskData.terrain.isMetro    && <span className="mi-flag mi-flag-gray">🏙️ Metro</span>}
                    </div>
                  </div>
                )}

                {/* Category Filter */}
                {categories.length > 1 && (
                  <div className="mi-cat-filter">
                    <button
                      className={`mi-cat-btn ${activeCategory === "all" ? "active" : ""}`}
                      onClick={() => setActiveCategory("all")}
                    >All</button>
                    {categories.map(cat => (
                      <button key={cat}
                        className={`mi-cat-btn ${activeCategory === cat ? "active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {cat === "transport" ? "🚌" : cat === "weather" ? "🌦️"
                          : cat === "health" ? "🏥" : cat === "safety" ? "🛡️"
                          : cat === "natural" ? "⛰️" : cat === "crowd" ? "👥"
                          : cat === "infrastructure" ? "🏗️" : "📋"}
                        {" "}{cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Scenario List */}
                <div className="mi-scenarios">
                  {filteredScenarios.map(scenario => (
                    <button key={scenario.id}
                      className={`mi-scenario-btn ${activeDisruption?.id === scenario.id ? "active" : ""}`}
                      onClick={() => runSimulator(scenario)}>
                      <div className="mi-sc-icon-wrap">
                        <span className="mi-sc-icon">{scenario.icon}</span>
                        <span className="mi-sc-status">{scenario.statusIcon}</span>
                      </div>
                      <div className="mi-sc-info">
                        <div className="mi-sc-label">{scenario.label}</div>
                        <div className="mi-sc-row2">
                          <span className="mi-sc-severity" style={{ color: severityColor[scenario.severity] }}>
                            ● {scenario.severity} severity
                          </span>
                          <span className="mi-sc-prob">{scenario.probability}% chance</span>
                        </div>
                      </div>
                      <div className="mi-sc-impact" style={{
                        background: scenario.impact === "critical" ? "#FEE2E2"
                          : scenario.impact === "high" ? "#FEF3C7"
                          : "#F0FDF4",
                        color: scenario.impact === "critical" ? "#DC2626"
                          : scenario.impact === "high" ? "#B45309"
                          : "#15803D"
                      }}>
                        {scenario.impact}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Loading */}
                {simRunning && (
                  <div className="mi-sim-loading">
                    <div className="mi-sim-spinner" />
                    <span>Analyzing risks for <strong>{destination}</strong>...</span>
                  </div>
                )}

                {/* Risk Detail + Alternatives */}
                {!simRunning && activeDisruption && !simDone && (
                  <div className="mi-sim-result fade-in">
                    <div className="mi-sim-alert"
                      style={{
                        borderColor: severityColor[activeDisruption.severity],
                        background: severityColor[activeDisruption.severity]+"11"
                      }}>
                      <div className="mi-sim-alert-icon">{activeDisruption.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div className="mi-sim-alert-title">{activeDisruption.label}</div>
                        <div className="mi-sim-alert-sub">{activeDisruption.description}</div>
                        <div className="mi-sim-fact">
                          📌 <em>{activeDisruption.realFact}</em>
                        </div>
                        <div className="mi-sim-stats">
                          <span>📊 Probability: <strong>{activeDisruption.probability}%</strong></span>
                          <span>⚠️ Impact: <strong>{activeDisruption.impact}</strong></span>
                          {activeDisruption.delayHours > 0 &&
                            <span>⏱ Delay: <strong>~{activeDisruption.delayHours}h</strong></span>}
                        </div>
                      </div>
                    </div>

                    <div className="mi-alternatives-label">🔄 Recommended Alternatives:</div>
                    <div className="mi-alternatives">
                      {activeDisruption.alternatives.map((alt, i) => (
                        <button key={i} className="mi-alt-btn" onClick={() => applyAlternative(alt)}>
                          <span className="mi-alt-btn-icon">{alt.icon}</span>
                          <div className="mi-alt-btn-info">
                            <div className="mi-alt-btn-action">{alt.action}</div>
                            <div className="mi-alt-tip">💡 {alt.tip}</div>
                            <div className="mi-alt-btn-meta">
                              {alt.addedTime > 0
                                ? <span>+{alt.addedTime}h travel time</span>
                                : <span>No extra time</span>}
                              {alt.addedCost > 0 && <span className="mi-cost-extra"> • +₹{alt.addedCost}</span>}
                              {alt.addedCost < 0 && <span className="mi-cost-save"> • Save ₹{Math.abs(alt.addedCost)}</span>}
                              {alt.addedCost === 0 && <span> • Free</span>}
                            </div>
                          </div>
                          <span className="mi-alt-select">Apply →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Done */}
                {simDone && chosenAlt && (
                  <div className="mi-sim-done fade-in">
                    <div className="mi-sim-done-icon">✅</div>
                    <div>
                      <div className="mi-sim-done-title">Plan Updated!</div>
                      <div className="mi-sim-done-sub">
                        {chosenAlt.action}
                      </div>
                    </div>
                    <button className="mi-reset-sim" onClick={() => {
                      setDisruption(null); setChosenAlt(null);
                      setDisrupted(null); setSimDone(false);
                    }}>
                      Try Another
                    </button>
                  </div>
                )}

                {/* Budget Breakdown — always visible */}
                <div className="mi-budget-breakdown">
                  <h4>💰 Budget Breakdown</h4>
                  {["transit","food","sightseeing","activity"].map(type => {
                    const sum = itinerary
                      .filter(i => i.type === type)
                      .reduce((s, i) => s + i.cost, 0);
                    if (!sum) return null;
                    const pct = Math.round((sum / (totalBudget || 1)) * 100);
                    return (
                      <div key={type} className="mi-bb-row">
                        <div className="mi-bb-label">
                          {typeIcon[type]} {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                        <div className="mi-bb-bar-wrap">
                          <div className="mi-bb-bar" style={{ width: `${pct}%`, background: typeColor[type] }} />
                        </div>
                        <div className="mi-bb-val">₹{sum}</div>
                      </div>
                    );
                  })}
                  <div className="mi-bb-total">
                    <span>Total ({days} day{days > 1 ? "s" : ""})</span>
                    <span>₹{totalBudget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
