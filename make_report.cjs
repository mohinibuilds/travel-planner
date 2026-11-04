const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Table, TableRow, TableCell, WidthType,
  BorderStyle, PageBreak, NumberingLevel, convertInchesToTwip,
  Header, Footer, PageNumber, UnderlineType, ShadingType,
  TableOfContents
} = require("docx");
const fs = require("fs");

// ── Helpers ──────────────────────────────────────────────────────────────────
const FONT = "Times New Roman";
const FONT_SIZE = 24; // half-points (= 12pt)
const HEADING1_SIZE = 28; // 14pt
const HEADING2_SIZE = 26; // 13pt
const LINE_SPACING = { line: 360, lineRule: "auto" }; // double spacing

function para(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({
      text,
      font: FONT,
      size: opts.size || FONT_SIZE,
      bold: opts.bold || false,
      italics: opts.italic || false,
      underline: opts.underline ? { type: UnderlineType.SINGLE } : undefined,
      color: opts.color || "000000",
    })],
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { after: 200, line: 360, lineRule: "auto", before: opts.before || 0 },
    indent: opts.indent ? { firstLine: convertInchesToTwip(0.5) } : undefined,
  });
}

function heading1(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: HEADING1_SIZE, bold: true })],
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 240 },
  });
}

function heading2(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: HEADING2_SIZE, bold: true })],
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 360, after: 200 },
  });
}

function heading3(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE, bold: true })],
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.LEFT,
    spacing: { before: 280, after: 160 },
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE })],
    bullet: { level },
    spacing: { after: 120, line: 360, lineRule: "auto" },
    indent: { left: convertInchesToTwip(0.5 + level * 0.25) },
  });
}

function numberedPara(num, title, body) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: `${num}.  `, font: FONT, size: FONT_SIZE, bold: true }),
        new TextRun({ text: title, font: FONT, size: FONT_SIZE, bold: true }),
      ],
      spacing: { before: 240, after: 120, line: 360, lineRule: "auto" },
      indent: { left: convertInchesToTwip(0.5) },
    }),
    new Paragraph({
      children: [new TextRun({ text: body, font: FONT, size: FONT_SIZE })],
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 160, line: 360, lineRule: "auto" },
      indent: { left: convertInchesToTwip(0.75) },
    }),
  ];
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function emptyLine() {
  return new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 200 } });
}

function tableCell(text, isHeader = false) {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({
        text,
        font: FONT,
        size: isHeader ? 20 : 18,
        bold: isHeader,
      })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80, before: 80 },
    })],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

function makeTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: headers.map(h => tableCell(h, true)),
        tableHeader: true,
      }),
      ...rows.map(row => new TableRow({
        children: row.map(cell => tableCell(cell, false)),
      })),
    ],
  });
}

function figureCaption(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE, italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 240 },
  });
}

function codeBlock(lines) {
  return lines.map(line => new Paragraph({
    children: [new TextRun({ text: line, font: "Courier New", size: 18 })],
    spacing: { after: 0, line: 280 },
    indent: { left: convertInchesToTwip(0.5) },
    border: {
      left: { style: BorderStyle.SINGLE, size: 6, color: "AAAAAA" },
    },
  }));
}

// ═════════════════════════════════════════════════════════════════════════════
// DOCUMENT STRUCTURE
// ═════════════════════════════════════════════════════════════════════════════

const doc = new Document({
  numbering: {
    config: [{
      reference: "toc-numbering",
      levels: [{
        level: 0,
        format: "decimal",
        text: "%1.",
        alignment: AlignmentType.LEFT,
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(1),
          right: convertInchesToTwip(1),
          bottom: convertInchesToTwip(1),
          left: convertInchesToTwip(1.25),
        },
      },
    },
    children: [
      // ══════════════════════════════════════════════════════════════════════
      // TITLE PAGE
      // ══════════════════════════════════════════════════════════════════════
      emptyLine(), emptyLine(), emptyLine(),
      new Paragraph({
        children: [new TextRun({ text: "TRAVELEASE", font: FONT, size: 48, bold: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "SMART INDIA TRAVEL PLANNER", font: FONT, size: 36, bold: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "A Final Year Project Report", font: FONT, size: 28, italics: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 400 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Submitted in partial fulfilment of the requirements", font: FONT, size: FONT_SIZE })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "for the award of the degree of", font: FONT, size: FONT_SIZE })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Bachelor of Engineering / Bachelor of Technology", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "in Computer Science and Engineering", font: FONT, size: FONT_SIZE })],
        alignment: AlignmentType.CENTER, spacing: { after: 400 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Submitted By:", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Student Name (Roll No: XXXXXXXX)", font: FONT, size: FONT_SIZE })],
        alignment: AlignmentType.CENTER, spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Under the Guidance of:", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Prof. [Guide Name]", font: FONT, size: FONT_SIZE })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Department of Computer Science and Engineering", font: FONT, size: FONT_SIZE })],
        alignment: AlignmentType.CENTER, spacing: { after: 400 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "[COLLEGE NAME]", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "[University Name], [City]", font: FONT, size: FONT_SIZE })],
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Academic Year: 2024–25", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER, spacing: { after: 200 },
      }),
      pageBreak(),

      // ══════════════════════════════════════════════════════════════════════
      // TABLE OF CONTENTS
      // ══════════════════════════════════════════════════════════════════════
      heading1("TABLE OF CONTENTS"),
      makeTable(
        ["Chapter", "Title", "Page No."],
        [
          ["1", "Introduction", "1"],
          ["1.1", "Introduction", "1"],
          ["1.2", "Problem Statement", "5"],
          ["1.3", "Purpose of the Project", "7"],
          ["1.4", "Advantages of the Project", "9"],
          ["1.5", "Scope of the Project", "12"],
          ["2", "Literature Survey", "14"],
          ["3", "System Development", "16"],
          ["3.1", "Introduction", "16"],
          ["3.2", "System Requirement", "17"],
          ["3.3", "Block Diagram", "18"],
          ["3.4", "System Architecture", "19"],
          ["3.5", "UML & Data Flow Diagrams", "20"],
          ["3.6", "System Implementation", "21"],
          ["3.7", "Database Schema", "24"],
          ["3.8", "System Output", "25"],
          ["4", "Conclusion", "26"],
          ["5", "Future Scope", "27"],
          ["6", "References", "29"],
        ]
      ),
      pageBreak(),

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 1 — INTRODUCTION
      // ══════════════════════════════════════════════════════════════════════
      heading1("1 INTRODUCTION"),
      heading2("1.1 INTRODUCTION"),

      para("The contemporary travel planning paradigm across the Indian subcontinent has fundamentally evolved past depending on fragmented, offline, and manual booking mechanisms. Modern domestic tourism, pilgrimage travel, business commuting, and leisure exploration demand that travellers possess robust route knowledge alongside extreme precision in comparing multi-modal transport options, identifying cost-optimized paths, and navigating the dense and highly heterogeneous geography of India's 700+ cities, towns, and villages. The travel booking layer represents the definitive operational bottleneck where these blended informational requirements converge under real-world time and budget constraints. Despite the proliferation of smartphones and digital literacy, a vast segment of Indian travellers — particularly those originating from or travelling to tier-2, tier-3 cities, and rural areas — find themselves systematically underserved by existing commercial platforms.", { indent: true }),

      para("This failure is frequently independent of the traveller's intent or budget availability; rather, it manifests from platform-side architectural gaps: commercial systems optimize for high-margin metro routes while completely ignoring the 65% of India's population residing in smaller settlements not directly connected by air or express rail infrastructure. Consequently, high-potential travel demand from rural and semi-urban populations remains unaddressed through conventional booking pathways.", { indent: true }),

      para("To fix these limitations, traditional solutions rely on either walk-in travel agents, fragmented government transport websites, or large commercial platforms like MakeMyTrip and Yatra that concentrate exclusively on tier-1 city corridors. While commercial platforms are somewhat useful for metropolitan travellers, they exhibit significant structural limitations: they impose convenience fees ranging from ₹149 to ₹499 per booking, route all payments through proprietary payment gateways rather than directly to transport providers, and fundamentally fail to serve travellers whose journeys require multi-modal chaining through regional buses, local trains, and shared jeep services. As a result, the average traveller from smaller Indian towns lacks access to a scalable, comprehensive, and fee-free travel planning platform.", { indent: true }),

      para("The development of the TravelEase Smart India Travel Planner resolves this structural gap. By leveraging modern client-side computational layers, intelligent route chaining algorithms, automated hotel classification pipelines, and a real-time travel risk simulation engine, this system acts as an autonomous, expert-level travel planning assistant that updates dynamically based on the specific origin, destination, and constraint inputs provided by the traveller.", { indent: true }),

      para("In today's rapidly expanding digital India ecosystem, travel demand has become highly competitive and geography-diverse. Organizations operating in tourism, hospitality, religious travel, and corporate commuting are not only seeking digital-first booking experiences but also intelligent systems that can handle the extreme geographic complexity of a country spanning 3.3 million square kilometres across 28 states and 8 union territories. As a result, smart travel planning has become one of the most strategically important segments in India's digital economy.", { indent: true }),

      para("However, many students, independent travellers, senior citizens, and first-time domestic tourists struggle to plan effective journeys due to lack of platform coverage for their specific origin-destination pairs, prohibitive convenience fees, insufficient practical route data for rural connections, and limited access to professional travel guidance. Traditional travel planning methods such as calling travel agents, visiting state transport offices, consulting printed timetables, and relying on peer recommendations often fail to provide accurate multi-modal combinations and realistic cost estimates.", { indent: true }),

      para("With the advancement of React-based Single Page Application architectures, client-side graph algorithms, and Progressive Web Application (PWA) technologies, intelligent systems are now capable of simulating expert travel consultation, processing complex multi-hop route graphs, classifying hotels by geographic terrain type, and evaluating real-time travel disruption scenarios — all without requiring a backend server or cloud infrastructure. These technologies have opened new possibilities in the field of travel technology, specifically for the underserved majority of Indian travellers.", { indent: true }),

      para("AI-assisted client-side systems can provide personalized route recommendations, automated transport availability filtering, continuous cost calculations, and risk scenario simulations — making the travel planning process more efficient, inclusive, and accessible for every Indian, regardless of their origin city's size.", { indent: true }),

      para("The TravelEase Smart India Travel Planner is designed to help users plan complete end-to-end journeys through an intelligent, multi-step planning workflow encompassing route search, transport mode selection, hotel booking, and total cost estimation. The system acts as a virtual travel consultant that presents route options, filters transport availability based on each city's actual infrastructure (airport, railway station, or road-only access), recommends location-specific hotels, and simulates real-world travel disruption scenarios with actionable alternative plans.", { indent: true }),

      para("One of the major advantages of this system is its geographic comprehensiveness. The platform covers 700+ Indian locations across all 28 states and 8 union territories, including remote hill stations, desert villages, coastal hamlets, pilgrimage towns, forest edge settlements, and North-Eastern border areas. It helps users understand transport constraints through transparent availability indicators and specific contextual explanations.", { indent: true }),

      para("Additionally, the system eliminates the dependency on human travel agents and commercial platform intermediaries, allowing users to plan journeys anytime and anywhere through a Progressive Web Application installable directly on mobile device home screens. This makes travel planning more affordable — with absolutely zero platform fees — scalable across any device, and accessible to the broadest possible spectrum of Indian travellers.", { indent: true }),

      pageBreak(),

      // ──────────────────────────────────────────────────────────────────────
      heading2("1.2 PROBLEM STATEMENT"),

      para("Domestic travellers across India experience systemic planning friction due to the absence of comprehensive, fee-free, and geographically inclusive travel planning platforms. In today's competitive travel booking market, many travellers — particularly from tier-2, tier-3 cities and villages — struggle to plan journeys effectively due to incomplete route coverage on commercial platforms, prohibitive convenience fees, no multi-modal route chaining for indirect connections, and zero risk planning guidance for real-world disruptions.", { indent: true }),

      para("Traditional travel planning methods often require human travel agents, multiple disconnected government transport websites, and significant cross-referencing effort. Most existing commercial systems provide only metro-to-metro direct routes and lack multi-hop optimization, personalized hotel recommendations by city type, real-time transport availability filtering, and intelligent evaluation of disruption scenarios.", { indent: true }),

      para("Travellers also face difficulties identifying their specific transport options when originating from or travelling to cities without airports, railway stations, or express highway connections. The specific core issues are defined below:", { indent: true }),

      ...numberedPara("1", "Geographic Exclusion of Small Towns and Villages:", "Commercial platforms like MakeMyTrip, Yatra, and Goibibo concentrate on fewer than 50 major Indian cities, completely ignoring the 5,000+ towns and villages that constitute the majority of India's travel demand. There is no system capable of routing a traveller from Jalna (Maharashtra) to Igatpuri through regional bus connections via Nashik junction."),

      ...numberedPara("2", "Prohibitive Platform Fees:", "Every commercial booking platform imposes convenience fees of ₹149–₹499 per transaction. For a family of four booking transport and hotels for a week-long trip, these fees can exceed ₹3,000–₹8,000 purely in platform charges that provide zero incremental value to the traveller."),

      ...numberedPara("3", "No Multi-Modal Route Chaining:", "India's transport network requires multi-modal journeys for the majority of non-metro origin-destination pairs. No existing commercial system chains local State Transport buses with Jan Shatabdi trains, shared jeeps, and auto-rickshaws into a single optimized itinerary with cost and duration calculations."),

      ...numberedPara("4", "Absence of Travel Risk Planning:", "Not a single commercial travel platform prepares users for common real-world disruptions: train delays, landslides, cyclone warnings, flight cancellations at hill station airports, altitude sickness in Himalayan destinations, or political bandh events in North-Eastern states."),

      ...numberedPara("5", "Generic Hotel Recommendations:", "Existing platforms show the same branded hotel chains regardless of destination. A traveller to Kedarnath is shown Marriott properties; a backpacker heading to Kasol sees ITC hotel recommendations. There is no system providing geographically appropriate, terrain-aware hotel options."),

      new Paragraph({
        children: [new TextRun({ text: "❖  The proposed system aims to:", font: FONT, size: FONT_SIZE, bold: true })],
        spacing: { before: 240, after: 120 },
      }),
      bullet("Provide comprehensive route planning for 700+ Indian locations across all states"),
      bullet("Enable intelligent multi-hop route optimization for indirect connections"),
      bullet("Offer transport availability filtering based on actual city infrastructure"),
      bullet("Deliver city-specific, terrain-aware hotel recommendations"),
      bullet("Simulate 15+ real India-specific travel disruptions with actionable alternatives"),
      bullet("Eliminate all platform convenience fees through direct UPI payment architecture"),
      bullet("Function as an installable Progressive Web Application on any mobile device"),

      pageBreak(),

      // ──────────────────────────────────────────────────────────────────────
      heading2("1.3 PURPOSE OF THE PROJECT"),

      para("The structural objective of this project is to democratize high-fidelity travel planning systems by creating a highly scalable, real-time, client-side web application requiring zero backend infrastructure. The main purpose of the TravelEase Smart India Travel Planner is to help travellers plan complete journeys using intelligent algorithms and comprehensive geographic data. The project aims to provide an efficient, interactive, and personalized platform for route discovery, transport comparison, hotel selection, and risk preparation.", { indent: true }),

      heading3("1. Comprehensive Route Coverage"),
      para("The system helps users plan journeys across all geographic zones of India:"),
      bullet("Metro cities and tier-1 hubs (Mumbai, Delhi, Bangalore, Chennai)"),
      bullet("Tier-2 and tier-3 district headquarters (Nashik, Aurangabad, Jalgaon)"),
      bullet("Hill stations, beach destinations, and pilgrim towns"),
      bullet("Remote Himalayan valleys, desert villages, and forest-edge locations"),
      bullet("North-Eastern states requiring Inner Line Permits (ILP)"),

      heading3("2. Multi-Modal Transport Comparison"),
      para("The project creates an intelligent transport selection environment where users can:"),
      bullet("Compare Flight, Train, Bus, and Car options for any route"),
      bullet("Understand why specific modes are unavailable (no airport, no railway)"),
      bullet("View accurate per-person and total costs for all passengers"),
      bullet("See realistic travel durations based on actual mode speed constants"),

      heading3("3. Multi-Hop Route Optimization"),
      para("The algorithm-based routing engine:"),
      bullet("Chains local buses + regional trains + shared jeeps into single itineraries"),
      bullet("Covers towns not directly connected by any single transport mode"),
      bullet("Returns up to 4 route options sorted by lowest total cost"),
      bullet("Calculates layovers, transfers, and total journey duration at each hub"),

      heading3("4. Zero Platform Fee Architecture"),
      para("The payment system demonstrates:"),
      bullet("Direct UPI-to-Provider payment flow bypassing intermediary wallets"),
      bullet("Elimination of all convenience fees charged by commercial platforms"),
      bullet("Savings of ₹300–₹1,500 per booking compared to competitors"),
      bullet("Transparent per-transaction cost comparison against MakeMyTrip and IRCTC"),

      pageBreak(),

      // ──────────────────────────────────────────────────────────────────────
      heading2("1.4 ADVANTAGES OF THE PROJECT"),

      para("The TravelEase Smart India Travel Planner provides significant improvements over commercial platforms and manual travel planning methods:", { indent: true }),

      ...numberedPara("1", "Continuous 24/7 Operational Availability:", "Eliminates dependency on travel agents' office hours by allowing travellers to complete end-to-end trip planning on demand through a mobile-installable Progressive Web Application without requiring any login or registration."),

      ...numberedPara("2", "Geographic Comprehensiveness:", "Covers 700+ Indian locations through a hierarchical data architecture combining a curated city database with state-organized dropdowns, hub-distance matrices for route calculation, and terrain classification algorithms. No commercial platform covers more than 80 cities."),

      ...numberedPara("3", "Zero Convenience Fee:", "Unlike every commercial booking platform charging ₹149–₹499 per transaction, TravelEase demonstrates a direct UPI-to-provider payment architecture that completely eliminates the intermediary fee layer, saving ₹2,000–₹8,000 per family trip."),

      ...numberedPara("4", "Multi-Hop Route Intelligence:", "The BFS-based multi-hop optimization engine maps small-town travellers to their nearest transport hubs and chains multiple legs into a single cost-optimized itinerary — a capability that does not exist in any commercial Indian travel platform."),

      ...numberedPara("5", "Transport Availability Transparency:", "The system maintains three separate data sets — cities with airports (150+), cities with railway stations (200+), and road-only locations — and explains exactly why specific transport modes are unavailable for a given route with specific, honest messaging."),

      ...numberedPara("6", "Terrain-Aware Hotel Intelligence:", "The hotel recommendation engine classifies every destination into one of five terrain types (hill, coastal, pilgrim, desert, town/city) and returns geographically appropriate hotel properties matching the destination's character and infrastructure."),

      ...numberedPara("7", "Real-Time Disruption Preparedness:", "The Travel Risk Simulator generates 10–15 location-specific risk scenarios with real India statistics, probability scores, and actionable alternatives including government helpline numbers, recommended mobile apps, and specific practical instructions."),

      ...numberedPara("8", "Progressive Web Application (PWA):", "The application is installable on Android and iOS home screens through standard browser prompts. The PWA manifest includes icons in 8 sizes from 72×72 to 512×512 pixels with a branded TravelEase icon featuring a gradient blue airplane design."),

      ...numberedPara("9", "Offline-Ready Architecture:", "All route data, hotel information, city distances, and risk scenario logic is embedded within the client-side JavaScript bundle. The application functions in low-connectivity environments common in rural India without requiring active internet for core planning operations."),

      ...numberedPara("10", "Complete Trip Cost Estimation:", "The system calculates and displays the complete trip cost including transport (single or round-trip for all passengers), hotel accommodation (per room per night for selected nights), and provides a final summary with per-person breakdown."),

      ...numberedPara("11", "Production-Grade UI/UX Design:", "The platform is designed with a MakeMyTrip-inspired visual architecture featuring a dark gradient hero section, horizontal-scroll offer cards, icon-grid service navigation, bottom tab bar for mobile navigation, and a comprehensive step indicator for the booking wizard."),

      ...numberedPara("12", "Cross-Device Accessibility:", "The responsive CSS grid layout and mobile-first design approach ensure the application functions seamlessly across mobile phones (320px width), tablets, and desktop monitors — supported by a dedicated bottom navigation bar on mobile."),

      pageBreak(),

      // ──────────────────────────────────────────────────────────────────────
      heading2("1.5 SCOPE OF THE PROJECT"),

      para("The operational and deployment boundaries of this project encompass the following modules:", { indent: true }),

      new Paragraph({
        children: [new TextRun({ text: "➢  Core Deliverables:", font: FONT, size: FONT_SIZE, bold: true }), new TextRun({ text: " A comprehensive geographic route database, an intelligent multi-hop route optimizer, a transport availability filtering engine, a terrain-aware hotel recommendation system, a real-time travel risk simulator, and a zero-fee UPI payment demonstration module.", font: FONT, size: FONT_SIZE })],
        spacing: { after: 160, line: 360, lineRule: "auto" },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [new TextRun({ text: "➢  Functional Limits:", font: FONT, size: FONT_SIZE, bold: true }), new TextRun({ text: " All 28 Indian states and 8 union territories across 700+ locations. The system operates entirely client-side without requiring server infrastructure, database connections, or external API calls.", font: FONT, size: FONT_SIZE })],
        spacing: { after: 160, line: 360, lineRule: "auto" },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [new TextRun({ text: "➢  Multi-Hop Route Optimizer:", font: FONT, size: FONT_SIZE, bold: true }), new TextRun({ text: " A standalone route chaining engine covering indirect connections through up to 3 transport legs, returning itineraries with full cost, duration, layover, and transfer information.", font: FONT, size: FONT_SIZE })],
        spacing: { after: 160, line: 360, lineRule: "auto" },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [new TextRun({ text: "➢  City-Specific Hotel Database:", font: FONT, size: FONT_SIZE, bold: true }), new TextRun({ text: " A comprehensive accommodation engine covering 50+ cities with real hotel names and 650+ additional locations through terrain-based classification, providing Budget, Standard, and Luxury options.", font: FONT, size: FONT_SIZE })],
        spacing: { after: 160, line: 360, lineRule: "auto" },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [new TextRun({ text: "➢  Travel Risk Simulator:", font: FONT, size: FONT_SIZE, bold: true }), new TextRun({ text: " A destination-aware disruption scenario engine that classifies each location into terrain types, generates 10–15 specific risk scenarios with real probability data, and provides 3 actionable alternatives per scenario.", font: FONT, size: FONT_SIZE })],
        spacing: { after: 160, line: 360, lineRule: "auto" },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [new TextRun({ text: "❖  FUNCTIONAL SCOPE", font: FONT, size: FONT_SIZE, bold: true })],
        spacing: { before: 240, after: 160 },
      }),

      heading3("1. Route Search Module"),
      para("The system enables origin and destination selection from 700+ locations:"),
      bullet("State-organized dropdown menus for intuitive navigation"),
      bullet("One-way and round-trip journey planning"),
      bullet("Multi-passenger cost calculation (up to 10 passengers)"),
      bullet("Real-time distance computation through multi-level lookup algorithms"),

      heading3("2. Transport Mode Engine"),
      para("Evaluation parameters for mode availability:"),
      bullet("Airport availability — citiesWithAirport Set (150+ cities)"),
      bullet("Railway station availability — citiesWithRailway Set (200+ cities)"),
      bullet("Road-only location identification — roadOnlyLocations Set"),
      bullet("Minimum distance threshold verification (150km for flights)"),

      heading3("3. Hotel Booking Module"),
      para("The accommodation system provides:"),
      bullet("City-specific hotel lookup with exact real property names"),
      bullet("Terrain classification fallback for unmatched cities"),
      bullet("Night and room count configuration with real-time cost recalculation"),
      bullet("Three-tier options: Budget (₹500–₹1,500), Standard (₹1,500–₹4,000), Luxury (₹4,000–₹15,000)"),

      pageBreak(),

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 2 — LITERATURE SURVEY
      // ══════════════════════════════════════════════════════════════════════
      heading1("LITERATURE SURVEY"),

      para("Travel planning system design has evolved significantly alongside advancements in web technologies, mobile computing, and geographic information systems. Early iterations of digital travel booking platforms during the late 1990s relied strictly on static database lookups against fixed route tables. These primitive frameworks scanned pre-defined origin-destination pairs stored in relational databases; any city pair not explicitly listed in the routing table returned no results, regardless of the actual geographic proximity of the two locations or the existence of connecting transport services between them. These systems were incapable of constructing multi-modal journeys, managing real-time availability, or evaluating complex geographic connectivity for smaller settlements.", { indent: true }),

      para("The introduction of graph-based routing algorithms allowed for a more flexible approach to route computation. In this paradigm, cities are modelled as nodes in a weighted directed graph, with transport connections represented as edges carrying distance, cost, and duration attributes. This allowed platforms to calculate shortest-path solutions between any two connected nodes using algorithms such as Dijkstra's algorithm and A* search. While this marked a major shift away from rigid table lookups, graph-based systems remained computationally expensive for large-scale geographic networks and required centralized server infrastructure for real-time computation — a dependency that excluded mobile-first, offline-capable deployments.", { indent: true }),

      para("The development of client-side JavaScript frameworks — particularly React's component architecture introduced in 2013 — fundamentally altered the web application development domain. By replacing server-side rendering with component-driven state management, these architectures allowed developers to build complex, interactive travel planning interfaces that respond to user inputs without full-page reloads. React's virtual DOM diffing algorithm ensures that only the specific UI components affected by a state change are re-rendered, enabling the kind of fluid, real-time cost calculation and filter-updating behaviour required in a travel planning wizard.", { indent: true }),

      para("Progressive Web Application (PWA) standards, formalized by Google in 2015, further transformed travel technology by enabling web applications to be installed on mobile device home screens, operate in offline or low-connectivity environments, and receive push notifications — capabilities previously exclusive to native mobile applications requiring App Store distribution. The Web App Manifest specification allows developers to define application icons, display modes, theme colors, and shortcut links that configure the browser's installation prompt, providing a seamless native-app-equivalent experience for travellers in low-connectivity regions.", { indent: true }),

      para("Vite's build system, introduced in 2020 as a successor to Webpack, significantly reduced JavaScript bundle compilation times through native ES module hot replacement. This optimization is particularly relevant for data-heavy travel applications where geographic datasets, distance matrices, hotel databases, and route classification logic must be compiled into efficient production bundles without creating excessive load times on mobile networks.", { indent: true }),

      para("More recently, client-side state management through React Context API has transformed multi-step booking wizards by providing a centralized state store accessible to all component layers without prop-drilling or external state management libraries. Rather than requiring Redux or MobX for managing complex booking state, React Context provides a clean, dependency-free architecture that preserves booking state across route navigation while allowing selective resets when new searches are initiated.", { indent: true }),

      para("Current research efforts in Indian travel technology focus on bridging the digital divide between metropolitan platform coverage and rural travel demand, reducing the cost burden of convenience fees on middle and lower-income travellers, and developing terrain-aware intelligent systems capable of providing contextually appropriate travel guidance for geographically diverse destinations. This system applies these modern developments, integrating a client-side graph routing engine with a comprehensive geographic dataset and a terrain-classification risk simulator to deliver an accessible, production-ready travel planning tool designed for India's broadest possible traveller demographic.", { indent: true }),

      pageBreak(),

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 3 — SYSTEM DEVELOPMENT
      // ══════════════════════════════════════════════════════════════════════
      heading1("SYSTEM DEVELOPMENT"),
      heading2("3.1 INTRODUCTION"),

      para("The system development stage implements the theoretical design principles within an operational software framework built entirely on client-side React architecture. The platform is built following a component-driven Single Page Application pattern, completely isolating the user interface presentation layer from the business logic data layer and the state management layer. This clear separation of concerns ensures modular stability: individual data files, components, or page modules can be updated or extended without risking broader system destabilization.", { indent: true }),

      para("The development of the TravelEase Smart India Travel Planner is centered around creating a responsive, highly intuitive, and modular Progressive Web Application. The primary engineering objective is to replace traditional, fragmented travel planning methods — involving multiple disconnected government transport websites, commercial booking platforms, and manual cost calculations — with a unified, multi-step planning pipeline that customizes the route, transport options, hotel recommendations, and risk scenarios based on the specific origin-destination pair selected by the user.", { indent: true }),

      para("The system utilizes a component-driven architecture to manage multi-step routing states smoothly, ensuring a premium user experience with zero page-reload latency. The development architecture relies on a Centralized State-Driven Flow managed through React Context API. Instead of traditional multi-page navigation with browser reloads, the application uses React Router v6's client-side route matching to mount and unmount page components based on user progression through the booking wizard, preserving complete state continuity across all four planning steps.", { indent: true }),

      pageBreak(),
      heading2("3.2 SYSTEM REQUIREMENT"),

      para("The platform minimizes local computing demands by processing all route calculation, hotel lookup, and risk simulation logic within the browser's JavaScript engine. This enables deployment across standard consumer hardware configurations without requiring any server-side processing or cloud API calls.", { indent: true }),

      new Paragraph({
        children: [new TextRun({ text: "Table 3.1: Minimum Hardware Requirements Matrix", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 160 },
      }),

      makeTable(
        ["COMPONENT TYPE", "CLIENT HARDWARE MINIMUMS", "SERVER DEPLOYMENT TARGET"],
        [
          ["Processor Core", "Intel i3 Gen 6 / AMD Ryzen 3", "Not Required (Static Hosting)"],
          ["System Memory", "2.00 Gigabytes RAM", "512 MB RAM (Static Host)"],
          ["Storage Unit", "50 Megabytes Free Space", "10 GB SSD (Vercel / Netlify)"],
          ["Network", "2 Mbps Internet Connection", "Standard CDN Distribution"],
          ["Display", "320px Minimum Width Screen", "Not Applicable"],
          ["Browser", "Chrome 90+ / Safari 14+ / Firefox 88+", "Not Applicable"],
        ]
      ),
      emptyLine(),

      new Paragraph({
        children: [new TextRun({ text: "Table 3.2: Software Stack Configuration", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 160 },
      }),

      makeTable(
        ["LAYER SEGMENT", "TECHNOLOGY SELECTED", "VERSION", "PURPOSE"],
        [
          ["Development Base", "Node.js Runtime", "v18.x LTS", "Build toolchain execution"],
          ["Build Engine", "Vite", "v5.4.x", "Fast HMR + production bundling"],
          ["UI Framework", "React", "v18.x", "Component-driven SPA architecture"],
          ["Routing", "React Router", "v6.x", "Client-side multi-step navigation"],
          ["Styling", "CSS3 Modules", "Native", "Component-scoped style isolation"],
          ["State Management", "React Context API", "Built-in", "Centralized booking state"],
          ["PWA", "Web App Manifest", "W3C Standard", "Mobile installability"],
          ["Icon Generation", "Sharp", "v0.33.x", "SVG-to-PNG icon generation"],
          ["Package Manager", "npm", "v10.x", "Dependency management"],
        ]
      ),
      emptyLine(),

      pageBreak(),
      heading2("3.3 BLOCK DIAGRAM"),

      para("The core system flows sequentially from the user's city and date inputs, through the intelligent route calculation and filtering logic layers, down to the persistent React Context state store and the client-side data files containing geographic, transport, and hotel information.", { indent: true }),

      ...codeBlock([
        "┌─────────────────────────────────────────────────────────┐",
        "│  USER INPUT LAYER                                        │",
        "│  City Selection → Date/Passengers → Trip Type           │",
        "└─────────────────────┬───────────────────────────────────┘",
        "                      ↓",
        "┌─────────────────────────────────────────────────────────┐",
        "│  ROUTE CALCULATION ENGINE                                │",
        "│  getDistance() → Distance Matrix → Hub Lookup           │",
        "└─────────────────────┬───────────────────────────────────┘",
        "                      ↓",
        "┌─────────────────────────────────────────────────────────┐",
        "│  TRANSPORT FILTER ENGINE                                 │",
        "│  hasAirport() → hasRailway() → getAvailableModes()      │",
        "└─────────────────────┬───────────────────────────────────┘",
        "                      ↓",
        "┌─────────────────────────────────────────────────────────┐",
        "│  HOTEL RECOMMENDATION ENGINE                             │",
        "│  getHotelsForCity() → Direct Match → Terrain Class      │",
        "└─────────────────────┬───────────────────────────────────┘",
        "                      ↓",
        "┌─────────────────────────────────────────────────────────┐",
        "│  RISK SIMULATION ENGINE                                  │",
        "│  classifyTerrain() → buildRiskScenarios() → Alternatives│",
        "└─────────────────────┬───────────────────────────────────┘",
        "                      ↓",
        "┌─────────────────────────────────────────────────────────┐",
        "│  TRIP SUMMARY & PAYMENT                                  │",
        "│  Cost Aggregation → Per-Person Breakdown → UPI Demo     │",
        "└─────────────────────────────────────────────────────────┘",
      ]),
      figureCaption("Figure 3.1: Block Diagram — TravelEase System Data Flow"),

      heading2("3.4 SYSTEM ARCHITECTURE"),

      para("The platform implements a Three-Tier Client-Side Architecture model to preserve complete operational independence between the visual presentation components, the processing logic functions, and the data storage files.", { indent: true }),

      ...codeBlock([
        "┌──────────────────────────────────────────────────────────┐",
        "│ PRESENTATION TIER: React JSX Components, CSS Modules    │",
        "│ Home · SearchRoutes · TransportOptions · HotelBooking   │",
        "│ TripSummary · MultiHop · MicroItinerary · ZeroFee       │",
        "├──────────────────────────────────────────────────────────┤",
        "│        ↕ (React Context State via useTrip hook)         │",
        "├──────────────────────────────────────────────────────────┤",
        "│ APPLICATION LOGIC TIER: Business Logic Functions        │",
        "│ getDistance() · getAvailableModes() · calculateCost()   │",
        "│ buildMultiHopRoutes() · buildRiskScenarios()            │",
        "├──────────────────────────────────────────────────────────┤",
        "│        ↕ (ES Module named exports / imports)            │",
        "├──────────────────────────────────────────────────────────┤",
        "│ DATA TIER: Static JavaScript Data Files                 │",
        "│ travelData.js · hotelData.js · multiHopData.js          │",
        "│ City Sets · Distance Matrices · Hotel Maps · Hub Tables │",
        "└──────────────────────────────────────────────────────────┘",
      ]),
      figureCaption("Figure 3.2: Detailed System Architecture Layout"),

      pageBreak(),
      heading2("3.5 UML & DATA FLOW DIAGRAMS"),

      para("System data movement and functional operations are defined through structured Data Flow Diagrams alongside sequential system interaction roadmaps.", { indent: true }),

      ...codeBlock([
        "[APPLICATION MASTER LOGIC]",
        "├── Search Module: City Handler → Distance Calculator → Context Updater",
        "├── Transport Module: Availability Filter → Cost Engine → Card Renderer",
        "├── Hotel Module: City Lookup Engine → Terrain Classifier → Hotel Cards",
        "├── Multi-Hop Module: Hub Mapper → BFS Route Builder → Route Cards",
        "├── Risk Module: Terrain Detector → Scenario Builder → Alternatives",
        "└── Summary Module: Cost Aggregator → Breakdown Renderer → UPI Demo",
      ]),
      figureCaption("Figure 3.3: Functional Module Control Chart"),

      emptyLine(),

      para("Use Case Flow — Main Booking Wizard:"),
      ...codeBlock([
        "User                    System",
        " │                        │",
        " ├─ Select Origin ──────► │ Load citiesByState → render dropdowns",
        " ├─ Select Destination ─► │ Filter same city → compute getDistance()",
        " ├─ Set Date/Passengers ► │ Validate inputs → store in TripContext",
        " ├─ Click Search ───────► │ resetTrip() → setDistance() → /transport",
        " │                        │",
        " ├─ View Transport ─────► │ getAvailableModes() → 4 mode cards",
        " ├─ Select Mode ────────► │ setSelectedTransport() → enable Continue",
        " │                        │",
        " ├─ View Hotels ────────► │ getHotelsForCity(to) → 3 tier sections",
        " ├─ Select Hotel ───────► │ setSelectedHotel() → enable View Summary",
        " │                        │",
        " └─ View Summary ───────► │ Aggregate costs → complete breakdown",
      ]),
      figureCaption("Figure 3.4: Sequential Use Case Flow Diagram"),

      pageBreak(),
      heading2("3.6 SYSTEM IMPLEMENTATION"),

      para("The system deployment encapsulates operational modules into distinct execution layers organized under the src/ directory. All data operations run through pure function calls against static JavaScript Set and Map objects to guarantee zero injection risks, while React Context state management preserves continuous booking context across page navigation without performance overhead.", { indent: true }),

      heading3("Application Entry Point (src/main.jsx)"),
      para("The application mounts a React root with an Error Boundary wrapper containing the Router, TripProvider context, and App component. The Error Boundary catches any runtime JavaScript exceptions and renders a recovery screen with a 'Go to Home' button rather than displaying a blank white page — critical for mobile users on unstable network connections.", { indent: true }),

      heading3("Navigation Architecture (src/components/Navbar.jsx)"),
      para("The navigation system implements a dual-mode navigation pattern:", { indent: true }),
      bullet("Desktop Mode: A fixed top navbar (64px height) with the TravelEase logo, navigation links with active underline indicators, and a 'Plan Trip' CTA button"),
      bullet("Mobile Mode: A bottom tab bar (64px height) with 5 tabs, a blue top-border indicator on the active tab, and safe-area padding for modern notch phones"),
      bullet("The hamburger menu on mobile triggers a 2-column grid dropdown with icon and badge indicators"),

      heading3("Route Search Module (src/pages/SearchRoutes.jsx)"),
      para("The search interface renders city selection dropdowns organized by state using citiesByState from multiHopData.js, covering 700+ locations grouped into 28 state sections. On form submission:", { indent: true }),
      bullet("validate() checks all required fields with specific error messages"),
      bullet("getDistance(from, to) computes route distance through a 4-level lookup chain"),
      bullet("resetTrip() clears transport/hotel selections while preserving the new distance"),
      bullet("setDistance(dist) stores the computed distance in TripContext"),
      bullet("navigate('/transport') mounts the TransportOptions component"),

      heading3("Transport Options Module (src/pages/TransportOptions.jsx)"),
      para("The transport selection page calls getAvailableModes(from, to, distance) to determine which of the four transport modes (Flight, Train, Bus, Car) are available for the selected city pair:", { indent: true }),
      bullet("Available modes render as selectable cards showing per-person cost, total cost, travel duration, and feature chips"),
      bullet("Unavailable modes render as greyed-out cards with specific unavailability reasons and appropriate suggestions"),
      bullet("A yellow banner alerts users when either city lacks an airport with bus highlighted as recommended"),

      heading3("Multi-Hop Route Optimizer (src/pages/MultiHop.jsx)"),
      para("The standalone multi-hop optimizer calls buildMultiHopRoutes(from, to, passengers) implementing a three-path routing algorithm:", { indent: true }),
      bullet("Path A: Direct connection (both major hub cities) — generates flight, train, and bus options"),
      bullet("Path B: Small town via hub (one or both ends are small towns) — chains local + long-distance legs"),
      bullet("Path C: Alternative junction routing via nearby major station"),

      heading3("Hotel Booking Module (src/pages/HotelBooking.jsx)"),
      para("The hotel selection page calls getHotelsForCity(tripDetails.to) performing a four-level lookup:", { indent: true }),
      bullet("Level 1: Direct match against the hotelsByCity object (50+ cities)"),
      bullet("Level 2: Case-insensitive match for capitalization variations"),
      bullet("Level 3: Partial string match (e.g., 'New Delhi' matches 'Delhi')"),
      bullet("Level 4: Terrain classification fallback using classifyLocation() keyword detection"),

      heading3("Travel Risk Simulator (src/pages/MicroItinerary.jsx)"),
      para("The risk simulator calls buildRiskScenarios(destination) which classifies terrain and constructs location-specific risks:", { indent: true }),
      bullet("classifyTerrain() uses regex pattern matching against 8 terrain type keywords"),
      bullet("Base transport disruption risks applied to all destinations (train delay, bus cancel, flight cancel)"),
      bullet("Terrain-specific risks conditionally added: landslide + AMS + flash flood (hill/remote)"),
      bullet("Cyclone + rip current + jellyfish (coastal), heat wave + sandstorm (desert)"),
      bullet("Wildlife + malaria (forest), ILP permits + bandh (North-East), crowd surge (pilgrim)"),

      pageBreak(),
      heading2("3.7 DATABASE SCHEMA"),

      para("Since TravelEase operates as a fully client-side application with no persistent user database, the 'database' consists of JavaScript static data structures embedded in four module files.", { indent: true }),

      new Paragraph({
        children: [new TextRun({ text: "Table 4.1: Data Structure Schema", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 160 },
      }),

      makeTable(
        ["DATA MODULE", "STRUCTURE TYPE", "KEY FIELDS", "SIZE"],
        [
          ["travelData.js", "ES6 Set + Object Map", "cityDistances, citiesWithAirport, citiesWithRailway, transportModes", "~600 lines"],
          ["multiHopData.js", "Nested Object + Array", "citiesByState, allCities[], townToHub{}, hubDistances{}", "~1,200 lines"],
          ["hotelData.js", "Nested Object Map", "hotelsByCity{ budget, standard, luxury }, fallbackTemplates{}", "~800 lines"],
          ["indiaLocations.js", "State-keyed Object", "indiaLocationsByState{ state: [districts] }", "~2,000 lines"],
        ]
      ),
      emptyLine(),

      new Paragraph({
        children: [new TextRun({ text: "Table 4.2: TripContext State Schema", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 160 },
      }),

      makeTable(
        ["STATE FIELD", "DATA TYPE", "DEFAULT", "PURPOSE"],
        [
          ["tripDetails.from", "String", "\"\"", "Origin city name"],
          ["tripDetails.to", "String", "\"\"", "Destination city name"],
          ["tripDetails.departDate", "String (ISO)", "\"\"", "Departure date"],
          ["tripDetails.passengers", "Integer", "1", "Number of passengers"],
          ["tripDetails.tripType", "Enum", "\"oneway\"", "oneway or roundtrip"],
          ["distance", "Number", "0", "Computed route distance (km)"],
          ["selectedTransport", "Object", "null", "{ key, mode, costs, totalWithReturn }"],
          ["selectedHotel", "Object", "null", "{ categoryKey, category, hotel, costs }"],
          ["hotelNights", "Integer", "1", "Number of hotel nights"],
          ["hotelRooms", "Integer", "1", "Number of hotel rooms"],
        ]
      ),
      emptyLine(),

      pageBreak(),
      heading2("3.8 SYSTEM OUTPUT"),

      heading3("Home Page — MakeMyTrip-style Landing"),
      para("The home page renders a dark gradient hero section with a quick search card containing Flights/Trains/Buses/Hotels tabs, a horizontal-scroll service icon grid (8 icons), deal offer cards with discount codes, popular route cards with dashed route line visualization, and a 'Why TravelEase' comparison section. The bottom tab bar is visible on mobile with active blue top-border indicators.", { indent: true }),
      figureCaption("Figure 3.5: Home Page — MakeMyTrip-style Design"),

      heading3("Transport Options — Filtered Mode Cards"),
      para("Four transport mode cards are rendered for every route. For a Mumbai → Manali route, the Flight card displays the 'No Airport' badge with the message 'Manali has no airport — Bus and Car are the best options for this route', while Bus and Car cards are highlighted as available with a yellow 'Recommended for this route' badge on Bus.", { indent: true }),
      figureCaption("Figure 3.6: Transport Options with No-Airport Warning"),

      heading3("Multi-Hop Optimizer — Route Visualization"),
      para("For Jalna → Igatpuri, the optimizer returns 3–4 route cards showing leg pills (ST Bus → Train), total cost ₹320–₹480, total duration 7–9 hours, with expandable cost breakdowns showing per-leg costs and layover times at Nashik junction.", { indent: true }),
      figureCaption("Figure 3.7: Multi-Hop Route Cards with Leg Pills"),

      heading3("Risk Simulator — Destination-Aware Scenarios"),
      para("For Leh (Ladakh), the simulator shows a '🔴 High Risk' overall meter with terrain flags 'Remote' and 'Hill'. Risk cards include Altitude Sickness (30% probability), Landslide (55%), Flash Flood (30%), Mobile Network Outage (80%), Flight Cancelled (35%), and Medical Emergency (15%). Each card expands to show 3 alternatives with practical tips and emergency helpline numbers.", { indent: true }),
      figureCaption("Figure 3.8: Risk Simulator — Leh Destination Scenario Cards"),

      pageBreak(),

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 4 — CONCLUSION
      // ══════════════════════════════════════════════════════════════════════
      heading1("4. CONCLUSION"),

      para("The deployment of the TravelEase Smart India Travel Planner demonstrates the practical application of client-side graph algorithms, geographic information systems, and Progressive Web Application technologies to enhance domestic travel planning accessibility across India's diverse geographic landscape. By bridging the gap between theoretical route connectivity data and real-time multi-modal journey planning, the framework offers a highly scalable, fee-free, and geographically comprehensive alternative to commercial booking platforms that systematically exclude 65% of India's traveller population.", { indent: true }),

      para("Through robust client-side data architecture and intelligent terrain classification algorithms, the application creates an interactive planning environment that closely replicates the capabilities of human travel agents with deep India geographic knowledge. System testing confirms that the multi-hop routing engine correctly identifies hub connections for small-town origin-destination pairs, the transport availability filters accurately reflect real airport and railway station infrastructure, the hotel recommendation engine returns geographically appropriate properties for all terrain types, and the risk simulator generates contextually relevant disruption scenarios with actionable guidance.", { indent: true }),

      para("This software delivers a strategic asset for India's underserved traveller demographic — the 600+ million Indians living in tier-2, tier-3, and rural areas whose travel planning needs are completely ignored by every commercial platform operating today.", { indent: true }),

      para("The TravelEase Smart India Travel Planner successfully helps users plan complete journeys using pure client-side intelligence. The project improves planning accuracy, reduces booking costs, and increases travel preparedness for India's most geographically diverse destinations. The system provides a fee-free and technically comprehensive planning solution.", { indent: true }),

      para("The development and deployment of TravelEase demonstrates that production-quality travel technology does not require expensive cloud backend infrastructure, proprietary API integrations, or commercial platform intermediaries. By utilizing efficient JavaScript data structures, React's component architecture, and intelligent algorithmic design, the application successfully plans real-world Indian journeys entirely within the browser.", { indent: true }),

      para("This provides travellers with an accessible, on-demand alternative to commercial platforms that charge fees, exclude small towns, and provide no disruption guidance. Testing verified that the platform accurately filters transport options based on real city infrastructure data, returns correct multi-hop routes for indirect connections, and generates terrain-appropriate risk scenarios with genuine India-specific statistics.", { indent: true }),

      para("Ultimately, this project demonstrates how integrating intelligent client-side algorithms with comprehensive geographic datasets can make professional travel planning more accessible and equitable — providing India's broadest possible traveller demographic with a technically accurate, culturally contextual, and financially transparent journey planning tool.", { indent: true }),

      pageBreak(),

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 5 — FUTURE SCOPE
      // ══════════════════════════════════════════════════════════════════════
      heading1("5 FUTURE SCOPE"),

      para("While the current system architecture provides a strong foundation for client-side route planning, transport filtering, hotel recommendation, and risk simulation, future updates can introduce several key capabilities to extend the platform's utility:", { indent: true }),

      ...numberedPara("1", "Backend Integration & Real-Time Data:", "Node.js + Express REST API for live transport availability, MongoDB database for user profiles and trip history storage, real IRCTC, RedBus, and airline API integrations for actual seat availability, and live train position tracking through RailwayAPI.com integration."),

      ...numberedPara("2", "Advanced AI/ML Route Intelligence:", "Price prediction models using historical fare data (LSTM neural networks), personalized route recommendations based on user travel history, natural language trip planning ('Plan a 5-day budget trip to Rajasthan'), and sentiment analysis of user reviews for hotel quality scoring."),

      ...numberedPara("3", "Live Disruption Intelligence:", "Real-time train delay integration via National Train Enquiry System (NTES) API, IMD weather alert integration for destination-specific weather warnings, Google Maps Platform integration for real-time road condition data, and social media monitoring for bandh/strike early warnings in North-Eastern states."),

      heading3("4. Advanced Multimodal Input (Voice & Multilingual)"),
      bullet("Speech-to-Text Integration: Web Speech API for hands-free city selection and booking"),
      bullet("Text-to-Speech Feedback: Accessibility compliance for visually impaired travellers"),
      bullet("Regional Language Support: Hindi, Marathi, Tamil, Telugu, Bengali interfaces"),
      bullet("Voice-Guided Navigation: Complete booking wizard operable without screen interaction"),

      heading3("5. Live Dynamic Map Integration"),
      bullet("Interactive Leaflet.js maps showing origin, destination, and multi-hop waypoints"),
      bullet("Real-time traffic overlay for road journey duration estimation"),
      bullet("Hotel location pins with walking distance to key landmarks"),
      bullet("Risk zone visualization overlays (cyclone tracks, landslide-prone highways)"),

      heading3("6. User Authentication & Trip History"),
      bullet("OTP-based mobile authentication (no password required)"),
      bullet("Persistent trip history across devices via cloud synchronization"),
      bullet("Trip sharing functionality via WhatsApp and email"),
      bullet("Favourite routes and saved hotel preferences"),

      heading3("7. Enterprise & B2B Features"),
      bullet("Corporate travel management portal for company trip planning"),
      bullet("Group booking optimization for wedding and event travel coordination"),
      bullet("Tour operator API for package tour construction"),
      bullet("Government tourism department integration for state-specific travel advisories"),

      heading3("8. Expanded Geographic Coverage"),
      bullet("SAARC region expansion (Nepal, Sri Lanka, Bhutan, Bangladesh)"),
      bullet("Ferry route integration for Andaman, Lakshadweep, and coastal connections"),
      bullet("International flight connection suggestions for Indian diaspora travel"),
      bullet("Real-time Himalayan pass status (Rohtang, Zoji-La, Nathu-La)"),

      heading3("9. Sustainability Features"),
      bullet("Carbon footprint calculation per transport mode"),
      bullet("Eco-friendly route suggestions prioritizing rail over air"),
      bullet("Responsible tourism guidelines for sensitive ecosystems"),
      bullet("Local community homestay recommendations for rural destinations"),

      heading3("10. Analytics & Insights Dashboard"),
      bullet("Admin panel showing most-searched routes and destinations"),
      bullet("Seasonal travel pattern analysis for Indian holiday periods"),
      bullet("Price trend visualization for advance booking optimization"),
      bullet("Geographic heatmap of platform usage across Indian districts"),

      pageBreak(),

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 6 — REFERENCES
      // ══════════════════════════════════════════════════════════════════════
      heading1("6 REFERENCES"),

      new Paragraph({
        children: [
          new TextRun({ text: "1.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Indian Railways Official Website — National Train Enquiry System. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://www.indianrail.gov.in/enquiry/NTES/NTESHome.html", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "2.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Airport Authority of India — Operational Airports. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://www.aai.aero/en/airports/operational-airports", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "3.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "React Official Documentation — Context API and Hooks. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://react.dev/reference/react/useContext", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "4.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Vite Official Documentation — Build Optimization for Production. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://vitejs.dev/guide/build", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "5.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Web App Manifest — W3C Progressive Web Application Standard. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://www.w3.org/TR/appmanifest/", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "6.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "National Disaster Management Authority India — Emergency Helplines. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://ndma.gov.in/Resources/Helplines", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "7.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Indian Meteorological Department — Cyclone Alert System. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://mausam.imd.gov.in", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "8.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "React Router v6 Official Documentation — Client-Side Navigation. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://reactrouter.com/en/main", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "9.  ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Tourism Statistics India — Ministry of Tourism Annual Report 2023. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://tourism.gov.in", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "10. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Sharp Image Processing Library — Node.js SVG to PNG Conversion. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://sharp.pixelplumbing.com", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "11. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "IRCTC Official Portal — Train Booking Architecture. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://www.irctc.co.in", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "12. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "Border Roads Organisation — Road Condition Updates. ", font: FONT, size: FONT_SIZE }),
          new TextRun({ text: "https://bro.gov.in", font: FONT, size: FONT_SIZE, color: "1A56DB" }),
        ],
        spacing: { after: 160, line: 360 },
        indent: { left: convertInchesToTwip(0.5) },
      }),

      emptyLine(), emptyLine(),
      new Paragraph({
        children: [new TextRun({ text: "— END OF REPORT —", font: FONT, size: FONT_SIZE, bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 240 },
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("TravelEase_Project_Report.docx", buffer);
  console.log("✅  TravelEase_Project_Report.docx created successfully!");
  console.log("📄  File size:", (buffer.length / 1024).toFixed(1), "KB");
}).catch(err => {
  console.error("Error:", err.message);
});
