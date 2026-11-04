const PptxGenJS = require("pptxgenjs");
const pptx = new PptxGenJS();

// â”€â”€ Brand colors â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BLUE      = "1A56DB";
const DARK_BLUE = "0A1628";
const LIGHT_BG  = "EEF3FF";
const WHITE     = "FFFFFF";
const GOLD      = "FBBF24";
const GREEN     = "05A660";
const PURPLE    = "7C3AED";
const CYAN      = "06B6D4";
const PINK      = "E84393";
const ORANGE    = "FF6B00";
const GRAY      = "64748B";
const TEXT_DARK = "1A1A2E";

pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 inches

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Helper: gradient background slide
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function addGradSlide(title) {
  const slide = pptx.addSlide();
  slide.background = { color: DARK_BLUE };
  // decorative top bar
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.12, fill: { color: BLUE } });
  return slide;
}

function addCleanSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: "F0F4FF" };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.12, fill: { color: BLUE } });
  return slide;
}

function sectionTag(slide, text, color = BLUE) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4, y: 0.22, w: 2.4, h: 0.32,
    fill: { color: color  },
    line: { color, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText(text, {
    x: 0.4, y: 0.22, w: 2.4, h: 0.32,
    fontSize: 10, bold: true, color,
    align: "center", valign: "middle",
  });
}

function slideTitle(slide, text, dark = false) {
  slide.addText(text, {
    x: 0.4, y: 0.62, w: 12.5, h: 0.6,
    fontSize: 28, bold: true,
    color: dark ? TEXT_DARK : WHITE,
    fontFace: "Calibri",
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.4, y: 1.28, w: 0.7, h: 0.06,
    fill: { color: dark ? BLUE : GOLD },
  });
}

function card(slide, x, y, w, h, fillColor = WHITE, lineColor = "E2E8F0") {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: fillColor },
    line: { color: lineColor, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 3, angle: 45, color: "E8EFF8" },
    rectRadius: 0.14,
  });
}

function iconCircle(slide, x, y, r, color, emoji) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w: r, h: r,
    fill: { color: color  },
    line: { color, width: 1.5 },
  });
  slide.addText(emoji, { x, y, w: r, h: r, fontSize: 18, align: "center", valign: "middle" });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 1 â€” TITLE / COVER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = pptx.addSlide();
  s.background = { color: DARK_BLUE };

  // gradient overlay shapes
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%",
    fill: { type: "gradient", gradientType: "linear",
      stops: [{ position: 0, color: "0A1628" }, { position: 60, color: "1A56DB" }, { position: 100, color: "06B6D4" }],
      angle: 135 } });

  // Dot grid pattern simulation
  for (let col = 0; col < 26; col++) {
    for (let row = 0; row < 15; row++) {
      s.addShape(pptx.ShapeType.ellipse, {
        x: 0.5 * col, y: 0.5 * row, w: 0.06, h: 0.06,
        fill: { color: "F8FAFF" }, line: { color: "FFFFFF" }
      });
    }
  }

  // plane emoji large
  s.addText("âœˆï¸", { x: 0.5, y: 0.4, w: 1.8, h: 1.8, fontSize: 64, align: "center", valign: "middle" });

  // Title
  s.addText("TravelEase", {
    x: 2.1, y: 0.55, w: 9, h: 1.1,
    fontSize: 60, bold: true, color: WHITE, fontFace: "Calibri",
  });

  // Subtitle
  s.addText("Smart India Travel Planner", {
    x: 2.1, y: 1.7, w: 9, h: 0.55,
    fontSize: 22, color: "A5C8F8", fontFace: "Calibri",
  });

  // Gold divider
  s.addShape(pptx.ShapeType.rect, { x: 2.1, y: 2.32, w: 2.2, h: 0.07, fill: { color: GOLD } });

  // Tagline
  s.addText("Final Year Project  Â·  B.Tech Computer Science", {
    x: 2.1, y: 2.52, w: 9, h: 0.4,
    fontSize: 14, color: "94B8E0", italic: true,
  });

  // Stats row
  const stats = [
    { num: "700+", lbl: "Locations" },
    { num: "4",    lbl: "Transport Modes" },
    { num: "28",   lbl: "States Covered" },
    { num: "â‚¹0",   lbl: "Platform Fee" },
  ];
  stats.forEach((st, i) => {
    const bx = 0.5 + i * 3.25;
    s.addShape(pptx.ShapeType.roundRect, {
      x: bx, y: 3.15, w: 3.0, h: 0.9,
      fill: { color: "E8EFFF" }, line: { color: "C8DCFF" }, rectRadius: 0.1,
    });
    s.addText(st.num, { x: bx, y: 3.2, w: 3.0, h: 0.45, fontSize: 22, bold: true, color: GOLD, align: "center" });
    s.addText(st.lbl, { x: bx, y: 3.65, w: 3.0, h: 0.3, fontSize: 11, color: "94B8E0", align: "center" });
  });

  // tech stack
  s.addText("Built with  React  Â·  Vite  Â·  React Router  Â·  CSS3  Â·  PWA", {
    x: 0, y: 4.25, w: "100%", h: 0.38,
    fontSize: 12, color: "5B8FBF", align: "center",
  });

  // bottom bar
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.15, w: "100%", h: 0.35,
    fill: { color: "EEF3FF" } });
  s.addText("Presented by: Your Name  |  Department of Computer Science  |  2024â€“25", {
    x: 0, y: 7.17, w: "100%", h: 0.3,
    fontSize: 10, color: "7BAAD4", align: "center",
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 2 â€” PROBLEM STATEMENT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addCleanSlide();
  sectionTag(s, "ðŸ“‹  PROBLEM STATEMENT", BLUE);
  slideTitle(s, "What Problem Does TravelEase Solve?", true);

  const problems = [
    { icon: "ðŸ’¸", title: "High Platform Fees",         desc: "MakeMyTrip, Yatra, Goibibo charge â‚¹149â€“â‚¹499 convenience fee per booking. Adds up for families.", color: PINK },
    { icon: "ðŸ˜ï¸", title: "Small Towns Ignored",         desc: "700 million Indians live in towns & villages with no direct air or rail links â€” skipped by all apps.", color: PURPLE },
    { icon: "âš ï¸", title: "No Risk Planning",            desc: "No app tells you what to do when your train is delayed, bus is cancelled, or road is blocked.", color: ORANGE },
    { icon: "ðŸ”—", title: "No Multi-Hop Routing",        desc: "Travelling Jalna â†’ Igatpuri via Nashik? No app chains local buses + trains into one itinerary.", color: CYAN },
  ];

  problems.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = 0.4 + col * 6.5;
    const by = 1.55 + row * 2.5;
    card(s, bx, by, 6.2, 2.2, WHITE, p.color );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: 0.12, h: 2.2,
      fill: { color: p.color }, rectRadius: 0.06 });
    s.addText(p.icon, { x: bx + 0.25, y: by + 0.3, w: 0.9, h: 0.9, fontSize: 30, align: "center" });
    s.addText(p.title, { x: bx + 1.2, y: by + 0.28, w: 4.8, h: 0.42,
      fontSize: 15, bold: true, color: TEXT_DARK });
    s.addText(p.desc, { x: bx + 1.2, y: by + 0.75, w: 4.8, h: 1.2,
      fontSize: 12, color: GRAY, wrap: true });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 3 â€” SOLUTION OVERVIEW
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addGradSlide();
  sectionTag(s, "ðŸ’¡  OUR SOLUTION", CYAN);
  slideTitle(s, "TravelEase â€” One App. All of India.", false);

  s.addText("A smart, zero-fee travel planner covering 700+ Indian locations with multi-modal transport, hotel booking, AI-style risk simulation, and direct UPI payments.", {
    x: 0.4, y: 1.45, w: 12.5, h: 0.7,
    fontSize: 14, color: "A5C8F8", wrap: true,
  });

  const features = [
    { icon: "âœˆï¸", label: "All Transport",  sub: "FlightÂ·TrainÂ·BusÂ·Car", col: BLUE },
    { icon: "ðŸ¨", label: "700+ Hotels",    sub: "Budget to Luxury",     col: PINK },
    { icon: "ðŸ”—", label: "Multi-Hop",      sub: "Chain any route",      col: PURPLE },
    { icon: "âš¡", label: "Risk Simulator", sub: "15+ disruptions",      col: CYAN },
    { icon: "â‚¹0", label: "Zero Fee",       sub: "Direct UPI",           col: GREEN },
    { icon: "ðŸ“", label: "700+ Locations", sub: "All 28 states",        col: GOLD },
  ];

  features.forEach((f, i) => {
    const bx = 0.4 + (i % 3) * 4.3;
    const by = 2.4 + Math.floor(i / 3) * 2.2;
    card(s, bx, by, 4.0, 1.9, "EEF3FF", f.col );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: 4.0, h: 0.08, fill: { color: f.col } });
    s.addText(f.icon, { x: bx + 0.15, y: by + 0.25, w: 0.9, h: 0.9, fontSize: 28, align: "center" });
    s.addText(f.label, { x: bx + 1.1, y: by + 0.28, w: 2.7, h: 0.45,
      fontSize: 15, bold: true, color: WHITE });
    s.addText(f.sub, { x: bx + 1.1, y: by + 0.75, w: 2.7, h: 0.35,
      fontSize: 12, color: "94B8E0" });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 4 â€” APP ARCHITECTURE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addCleanSlide();
  sectionTag(s, "ðŸ—ï¸  ARCHITECTURE", BLUE);
  slideTitle(s, "System Architecture â€” Frontend Only (No Backend)", true);

  // Architecture diagram boxes
  const layers = [
    { label: "USER INTERFACE (React JSX)", color: BLUE,   y: 1.55, desc: "Home Â· SearchRoutes Â· TransportOptions Â· HotelBooking Â· TripSummary Â· MultiHop Â· MicroItinerary Â· ZeroFeePayment" },
    { label: "STATE MANAGEMENT (React Context API)",  color: PURPLE, y: 2.8,  desc: "TripContext â€” tripDetails Â· selectedTransport Â· selectedHotel Â· hotelNights Â· hotelRooms Â· distance" },
    { label: "BUSINESS LOGIC & DATA LAYER",           color: GREEN,  y: 4.05, desc: "travelData.js Â· hotelData.js Â· multiHopData.js Â· indiaLocations.js â€” Pure JS, no API calls" },
    { label: "ROUTING (React Router v6)",             color: CYAN,   y: 5.3,  desc: "/ Â· /search Â· /transport Â· /hotels Â· /summary Â· /multihop Â· /itinerary Â· /zerofee" },
  ];

  layers.forEach((l) => {
    card(s, 0.4, l.y, 12.5, 1.0, WHITE, l.color );
    s.addShape(pptx.ShapeType.rect, { x: 0.4, y: l.y, w: 12.5, h: 0.07, fill: { color: l.color } });
    s.addText(l.label, { x: 0.55, y: l.y + 0.12, w: 12.2, h: 0.35,
      fontSize: 12, bold: true, color: l.color });
    s.addText(l.desc, { x: 0.55, y: l.y + 0.5, w: 12.2, h: 0.42,
      fontSize: 11, color: GRAY });
    // arrow down
    if (l.y < 5.3) {
      s.addShape(pptx.ShapeType.rect, { x: 6.55, y: l.y + 1.02, w: 0.22, h: 0.2, fill: { color: l.color  } });
    }
  });

  // Tech stack chips
  const chips = ["React 18", "Vite 5", "React Router 6", "CSS Modules", "PWA Manifest", "No Redux", "No Backend", "100% Client-side"];
  chips.forEach((c, i) => {
    const cx = 0.4 + (i % 4) * 3.2;
    const cy = 6.55 + Math.floor(i / 4) * 0.4;
    s.addShape(pptx.ShapeType.roundRect, { x: cx, y: cy, w: 3.0, h: 0.28,
      fill: { color: BLUE  }, line: { color: BLUE  }, rectRadius: 0.06 });
    s.addText(c, { x: cx, y: cy, w: 3.0, h: 0.28, fontSize: 10, bold: true, color: BLUE, align: "center" });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 5 â€” INNOVATION 1: MULTI-HOP OPTIMIZER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addGradSlide();
  sectionTag(s, "âœ¨  INNOVATION  01  /  03", PURPLE);
  slideTitle(s, "Smart Multi-Hop Route Optimizer", false);

  s.addText("Chains regional buses, local trains & shared jeeps into one seamless itinerary for small towns not connected directly.", {
    x: 0.4, y: 1.45, w: 12.5, h: 0.55,
    fontSize: 13, color: "A5C8F8",
  });

  // Route flow diagram
  const nodes = [
    { label: "Jalna", sub: "Small Town", icon: "ðŸ“", color: PURPLE },
    { label: "Bus", sub: "ST Bus\n2h Â· â‚¹80", icon: "ðŸšŒ", color: ORANGE, arrow: true },
    { label: "Nashik", sub: "Hub City", icon: "ðŸ™ï¸", color: CYAN },
    { label: "Train", sub: "Express\n4h Â· â‚¹180", icon: "ðŸš‚", color: GREEN, arrow: true },
    { label: "Igatpuri", sub: "Destination", icon: "ðŸ”ï¸", color: PINK },
  ];

  let nx = 0.5;
  nodes.forEach((n) => {
    if (n.arrow) {
      s.addShape(pptx.ShapeType.rect, { x: nx, y: 2.5, w: 1.5, h: 0.06, fill: { color: "B3CFFF" } });
      s.addShape(pptx.ShapeType.rect, { x: nx + 1.3, y: 2.4, w: 0, h: 0,
        fill: { color: "FFFFFF" } });
      s.addText(n.icon, { x: nx + 0.2, y: 2.2, w: 1.1, h: 0.5, fontSize: 16, align: "center" });
      s.addText(n.sub, { x: nx + 0.05, y: 2.72, w: 1.4, h: 0.5, fontSize: 9, color: "94B8E0", align: "center" });
      nx += 1.6;
    } else {
      card(s, nx, 2.0, 1.8, 1.2, "E2EDFF", n.color );
      s.addShape(pptx.ShapeType.rect, { x: nx, y: 2.0, w: 1.8, h: 0.08, fill: { color: n.color } });
      s.addText(n.icon, { x: nx, y: 2.1, w: 1.8, h: 0.55, fontSize: 24, align: "center" });
      s.addText(n.label, { x: nx, y: 2.65, w: 1.8, h: 0.3,
        fontSize: 12, bold: true, color: WHITE, align: "center" });
      s.addText(n.sub, { x: nx, y: 2.95, w: 1.8, h: 0.22,
        fontSize: 9, color: "94B8E0", align: "center" });
      nx += 2.0;
    }
  });

  // Key points
  const pts = [
    "ðŸ”  BFS/graph algorithm explores all hub combinations",
    "ðŸ“  700+ towns mapped to nearest railway/bus hubs",
    "ðŸ’°  Returns up to 4 routes sorted by lowest cost",
    "â±ï¸  Total duration, layovers, transfers all calculated",
    "ðŸš€  Works 100% offline â€” no API needed",
  ];
  pts.forEach((p, i) => {
    card(s, 0.4 + (i % 2) * 6.5, 3.55 + Math.floor(i / 2) * 1.05,
      6.2, 0.85, "EEF3FF", PURPLE );
    s.addText(p, { x: 0.6 + (i % 2) * 6.5, y: 3.65 + Math.floor(i / 2) * 1.05,
      w: 5.9, h: 0.65, fontSize: 13, color: WHITE, valign: "middle" });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 6 â€” INNOVATION 2: RISK SIMULATOR
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addCleanSlide();
  sectionTag(s, "âœ¨  INNOVATION  02  /  03", CYAN);
  slideTitle(s, "Real-Time Travel Risk Simulator", true);

  s.addText("Simulates 15+ real India-specific travel disruptions and gives instant actionable alternatives with cost & time impact.", {
    x: 0.4, y: 1.45, w: 12.5, h: 0.5,
    fontSize: 13, color: GRAY,
  });

  const risks = [
    { icon: "ðŸš‚", label: "Train Delay",       prob: "45%", sev: "Medium", color: ORANGE },
    { icon: "ðŸŒ€", label: "Cyclone Warning",    prob: "18%", sev: "Critical", color: PINK },
    { icon: "â›°ï¸", label: "Landslide / Road",   prob: "55%", sev: "Critical", color: "DC2626" },
    { icon: "ðŸ”ï¸", label: "Altitude Sickness",  prob: "30%", sev: "High",    color: PURPLE },
    { icon: "â˜€ï¸", label: "Extreme Heat",        prob: "60%", sev: "High",    color: ORANGE },
    { icon: "ðŸ…", label: "Wildlife Encounter", prob: "15%", sev: "High",    color: GREEN },
    { icon: "ðŸ“‹", label: "ILP Permit Issue",    prob: "70%", sev: "High",    color: BLUE },
    { icon: "ðŸ‘œ", label: "Theft / Scam",        prob: "20%", sev: "Medium",  color: GRAY },
  ];

  risks.forEach((r, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const bx = 0.4 + col * 3.2;
    const by = 2.1 + row * 2.0;
    card(s, bx, by, 3.0, 1.7, WHITE, r.color );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: 3.0, h: 0.07, fill: { color: r.color } });
    s.addText(r.icon, { x: bx + 0.1, y: by + 0.12, w: 0.8, h: 0.7, fontSize: 24, align: "center" });
    s.addText(r.label, { x: bx + 0.95, y: by + 0.15, w: 1.9, h: 0.4, fontSize: 12, bold: true, color: TEXT_DARK });
    s.addShape(pptx.ShapeType.roundRect, { x: bx + 0.95, y: by + 0.58, w: 0.8, h: 0.26,
      fill: { color: r.color  }, line: { color: r.color, width: 0.8 }, rectRadius: 0.06 });
    s.addText(r.prob, { x: bx + 0.95, y: by + 0.58, w: 0.8, h: 0.26,
      fontSize: 10, bold: true, color: r.color, align: "center" });
    s.addText(r.sev, { x: bx + 1.82, y: by + 0.58, w: 1.0, h: 0.26,
      fontSize: 10, color: GRAY, align: "center" });
    // bar
    const barW = (parseInt(r.prob) / 100) * 2.6;
    s.addShape(pptx.ShapeType.rect, { x: bx + 0.2, y: by + 1.3, w: 2.6, h: 0.12,
      fill: { color: "E2E8F0" }, rectRadius: 0.04 });
    s.addShape(pptx.ShapeType.rect, { x: bx + 0.2, y: by + 1.3, w: barW, h: 0.12,
      fill: { color: r.color }, rectRadius: 0.04 });
  });

  s.addText("Each risk provides: Real India statistics Â· Exact alternatives Â· Government helplines Â· Apps to use", {
    x: 0.4, y: 6.25, w: 12.5, h: 0.4,
    fontSize: 12, color: BLUE, align: "center", bold: true,
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 7 â€” INNOVATION 3: ZERO FEE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addGradSlide();
  sectionTag(s, "âœ¨  INNOVATION  03  /  03", GREEN);
  slideTitle(s, "Zero-Fee Direct UPI Payment Architecture", false);

  // Comparison table
  s.addText("COMPETITOR COMPARISON", {
    x: 0.4, y: 1.45, w: 12.5, h: 0.35,
    fontSize: 11, bold: true, color: "7BAAD4", letterSpacing: 2,
  });

  const headers = ["Platform", "Convenience Fee", "Payment Route", "Hidden Charges", "Our Edge"];
  const rows = [
    ["MakeMyTrip",  "â‚¹149 â€“ â‚¹499", "MMT â†’ Bank â†’ Airline", "Yes (dynamic)", "âŒ"],
    ["Yatra",       "â‚¹99 â€“ â‚¹299",  "Yatra â†’ Gateway â†’ Provider", "Yes", "âŒ"],
    ["Goibibo",     "â‚¹149 â€“ â‚¹399", "Goibibo â†’ Payment GW", "Yes", "âŒ"],
    ["IRCTC",       "â‚¹15 â€“ â‚¹35",   "IRCTC â†’ Bank", "Minimal", "âš ï¸"],
    ["TravelEase âœ…","â‚¹0  â€” ZERO", "UPI â†’ Direct Provider", "NONE", "âœ…"],
  ];

  const colW = [2.6, 2.4, 3.4, 2.2, 1.7];
  const startX = 0.4;
  let ty = 1.92;
  // header row
  headers.forEach((h, i) => {
    const cx = startX + colW.slice(0, i).reduce((a, b) => a + b, 0);
    s.addShape(pptx.ShapeType.rect, { x: cx, y: ty, w: colW[i], h: 0.42, fill: { color: "DBE8FF" } });
    s.addText(h, { x: cx + 0.05, y: ty, w: colW[i] - 0.1, h: 0.42,
      fontSize: 11, bold: true, color: GOLD, valign: "middle", align: "center" });
  });
  ty += 0.44;
  rows.forEach((row, ri) => {
    const isUs = ri === 4;
    row.forEach((cell, ci) => {
      const cx = startX + colW.slice(0, ci).reduce((a, b) => a + b, 0);
      s.addShape(pptx.ShapeType.rect, { x: cx, y: ty, w: colW[ci], h: 0.42,
        fill: { color: isUs ? GREEN  : "F8FAFF" },
        line: { color: isUs ? GREEN : "E8EFFF", width: isUs ? 1.5 : 0.5 } });
      s.addText(cell, { x: cx + 0.05, y: ty, w: colW[ci] - 0.1, h: 0.42,
        fontSize: isUs ? 12 : 11, bold: isUs,
        color: isUs ? WHITE : (ri % 2 === 0 ? "D0E8FF" : "A5C8F8"),
        valign: "middle", align: "center" });
    });
    ty += 0.44;
  });

  // Savings callout
  card(s, 0.4, 5.45, 5.5, 1.5, "E8EFFF", GREEN );
  s.addText("ðŸ’°", { x: 0.5, y: 5.55, w: 1.0, h: 1.0, fontSize: 36, align: "center" });
  s.addText("Average Saving Per Trip", { x: 1.55, y: 5.6, w: 4.2, h: 0.4, fontSize: 13, color: "A5C8F8" });
  s.addText("â‚¹300 â€“ â‚¹1,500", { x: 1.55, y: 6.0, w: 4.2, h: 0.55, fontSize: 26, bold: true, color: GREEN });

  card(s, 6.3, 5.45, 6.1, 1.5, "E8EFFF", CYAN );
  s.addText("ðŸ”’", { x: 6.4, y: 5.55, w: 1.0, h: 1.0, fontSize: 36, align: "center" });
  s.addText("UPI Architecture", { x: 7.45, y: 5.6, w: 4.8, h: 0.4, fontSize: 13, color: "A5C8F8" });
  s.addText("User UPI  â†’  IRCTC / MSRTC / Airline\nNo intermediate wallet. No token storage.", {
    x: 7.45, y: 5.98, w: 4.8, h: 0.75, fontSize: 11, color: WHITE });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 8 â€” HOTEL DATABASE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addCleanSlide();
  sectionTag(s, "ðŸ¨  HOTEL SYSTEM", PINK);
  slideTitle(s, "City-Specific Hotel Database", true);

  s.addText("Hotels are NOT generic â€” every destination has real, location-specific properties across 3 tiers.", {
    x: 0.4, y: 1.45, w: 12.5, h: 0.45, fontSize: 13, color: GRAY,
  });

  const tiers = [
    {
      name: "Budget", icon: "ðŸ¨", color: GRAY,
      ex: ["Zostel Backpackers (Mumbai, Manali, Jaisalmer)", "MTDC/HPTDC State Tourism Lodges", "Dharamshala Guest Houses (Pilgrim towns)", "GMVN Tourist Rest House (Kedarnath)"],
      price: "â‚¹500 â€“ â‚¹1,500/night"
    },
    {
      name: "Standard", icon: "ðŸ©", color: BLUE,
      ex: ["Lemon Tree Hotels (30+ cities)", "Ginger Hotels (metro cities)", "Ibis Hotels (tier-1 cities)", "Heritage Resorts (Rajasthan, Coorg)"],
      price: "â‚¹1,500 â€“ â‚¹4,000/night"
    },
    {
      name: "Luxury", icon: "ðŸ°", color: GOLD,
      ex: ["Taj Hotels (Mumbai, Delhi, Udaipur, Agra)", "Oberoi Resorts (Rajasthan, Ladakh)", "Wildflower Hall (Shimla mountains)", "Ananda in the Himalayas (Rishikesh)"],
      price: "â‚¹4,000 â€“ â‚¹15,000/night"
    },
  ];

  tiers.forEach((t, i) => {
    const bx = 0.4 + i * 4.3;
    card(s, bx, 2.1, 4.0, 4.6, WHITE, t.color );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: 2.1, w: 4.0, h: 0.1, fill: { color: t.color } });
    s.addText(t.icon, { x: bx + 0.1, y: 2.25, w: 0.9, h: 0.8, fontSize: 28, align: "center" });
    s.addText(t.name + " Hotels", { x: bx + 1.05, y: 2.28, w: 2.8, h: 0.45,
      fontSize: 16, bold: true, color: t.color });
    s.addText(t.price, { x: bx + 1.05, y: 2.75, w: 2.8, h: 0.3,
      fontSize: 11, color: GRAY, italic: true });
    t.ex.forEach((e, j) => {
      s.addShape(pptx.ShapeType.ellipse, { x: bx + 0.2, y: 3.25 + j * 0.72 + 0.12, w: 0.12, h: 0.12, fill: { color: t.color } });
      s.addText(e, { x: bx + 0.42, y: 3.2 + j * 0.72, w: 3.4, h: 0.55,
        fontSize: 11, color: TEXT_DARK, wrap: true });
    });
  });

  s.addText("ðŸ“Š  50+ cities with real hotels  Â·  Smart fallback classifies every other city as: Hill / Coastal / Pilgrim / Desert / Town", {
    x: 0.4, y: 6.85, w: 12.5, h: 0.38,
    fontSize: 12, color: BLUE, align: "center", bold: true,
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 9 â€” UI / UX SCREENS OVERVIEW
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addGradSlide();
  sectionTag(s, "ðŸ“±  UI / UX", CYAN);
  slideTitle(s, "MakeMyTrip-Inspired App Design", false);

  const screens = [
    { name: "Home Page",          icon: "ðŸ ", desc: "Hero search Â· Service icons Â· Deals Â· Popular routes", color: BLUE },
    { name: "Plan Trip",          icon: "ðŸ”", desc: "700+ city dropdown by state Â· Date Â· Passengers", color: GREEN },
    { name: "Transport Options",  icon: "âœˆï¸", desc: "Flight/Train/Bus/Car cards Â· Availability badges Â· No-airport warning", color: PURPLE },
    { name: "Hotel Booking",      icon: "ðŸ¨", desc: "City-specific real hotels Â· Budget/Standard/Luxury", color: PINK },
    { name: "Multi-Hop Optimizer",icon: "ðŸ”—", desc: "Route cards Â· Leg pills Â· Cost breakdown Â· Transfers", color: ORANGE },
    { name: "Risk Simulator",     icon: "âš¡", desc: "Risk meter Â· Terrain flags Â· 15+ scenarios Â· Alternatives", color: CYAN },
    { name: "Trip Summary",       icon: "ðŸ“‹", desc: "Full cost breakdown Â· Download / Share trip", color: GOLD },
    { name: "Zero Fee Payment",   icon: "â‚¹0", desc: "UPI QR code Â· Provider-direct payment flow", color: GREEN },
  ];

  screens.forEach((sc, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const bx = 0.3 + col * 3.2;
    const by = 1.6 + row * 2.35;
    card(s, bx, by, 3.0, 2.1, "EEF3FF", sc.color );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: 3.0, h: 0.09, fill: { color: sc.color } });
    s.addText(sc.icon, { x: bx + 0.1, y: by + 0.15, w: 0.9, h: 0.75, fontSize: 26, align: "center" });
    s.addText(sc.name, { x: bx + 1.05, y: by + 0.18, w: 1.82, h: 0.42,
      fontSize: 12, bold: true, color: WHITE });
    s.addText(sc.desc, { x: bx + 0.15, y: by + 0.85, w: 2.75, h: 1.0,
      fontSize: 10, color: "94B8E0", wrap: true });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 10 â€” DATA LAYER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addCleanSlide();
  sectionTag(s, "ðŸ’¾  DATA LAYER", GREEN);
  slideTitle(s, "Data Architecture â€” No Backend Required", true);

  const files = [
    {
      file: "travelData.js",
      color: BLUE, icon: "âœˆï¸",
      items: ["Cities with/without airports (150+ cities)", "Railway station set (200+ cities)", "Road-only locations (Leh, Spiti, etc.)", "getAvailableModes() â€” flight/train/bus filtering", "calculateTransportCost() â€” per-km pricing", "Distance matrix â€” 300+ city pairs + hub routing", "popularRoutes[] â€” trending trip pairs"],
    },
    {
      file: "hotelData.js",
      color: PINK, icon: "ðŸ¨",
      items: ["50+ cities with real specific hotels", "Budget / Standard / Luxury per city", "getHotelsForCity() â€” smart lookup + fallback", "classifyLocation() â€” hill/coastal/pilgrim/desert/town", "Personalised fallback with city name injection"],
    },
    {
      file: "multiHopData.js",
      color: PURPLE, icon: "ðŸ”—",
      items: ["700+ locations in citiesByState (all 28 states)", "allCities[] flat array for search dropdowns", "townToHub{} â€” maps small towns to nearest hub", "hubDistances{} â€” distances between major hubs", "buildMultiHopRoutes() â€” BFS + cost optimiser", "microItineraryTemplates{} â€” 20+ city day plans"],
    },
    {
      file: "indiaLocations.js",
      color: CYAN, icon: "ðŸ“",
      items: ["Full India district + taluka taxonomy", "2000+ location entries", "28 states + 8 UTs coverage", "Used for comprehensive city dropdown"],
    },
  ];

  files.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = 0.4 + col * 6.55;
    const by = 1.6 + row * 2.7;
    card(s, bx, by, 6.2, 2.5, WHITE, f.color );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: 6.2, h: 0.1, fill: { color: f.color } });
    s.addText(f.icon + "  " + f.file, { x: bx + 0.15, y: by + 0.14, w: 5.9, h: 0.42,
      fontSize: 14, bold: true, color: f.color });
    f.items.forEach((it, j) => {
      if (j >= 5) return;
      s.addShape(pptx.ShapeType.ellipse, { x: bx + 0.2, y: by + 0.72 + j * 0.35 + 0.09, w: 0.1, h: 0.1, fill: { color: f.color } });
      s.addText(it, { x: bx + 0.4, y: by + 0.68 + j * 0.35, w: 5.6, h: 0.32, fontSize: 11, color: TEXT_DARK });
    });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 11 â€” COMPARISON WITH COMPETITORS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addGradSlide();
  sectionTag(s, "ðŸ“Š  COMPETITIVE ANALYSIS", GOLD);
  slideTitle(s, "TravelEase vs MakeMyTrip vs IRCTC", false);

  const features = [
    "700+ Small Town Coverage",
    "Multi-Hop Route Optimizer",
    "Real-Time Risk Simulator",
    "City-Specific Hotel Database",
    "Zero Convenience Fee",
    "Direct UPI to Provider",
    "Offline Capable (PWA)",
    "No Login Required",
    "Open Source / Free",
    "AI-Style Disruption Alternatives",
  ];
  const apps = ["MakeMyTrip", "IRCTC", "Goibibo", "TravelEase âœ…"];
  const checks = [
    // MMT   IRCTC   Goibibo   TravelEase
    ["âŒ", "âŒ", "âŒ", "âœ…"],
    ["âŒ", "âŒ", "âŒ", "âœ…"],
    ["âŒ", "âŒ", "âŒ", "âœ…"],
    ["âš ï¸", "âŒ", "âš ï¸", "âœ…"],
    ["âŒ", "âš ï¸", "âŒ", "âœ…"],
    ["âŒ", "âœ…", "âŒ", "âœ…"],
    ["âŒ", "âŒ", "âŒ", "âœ…"],
    ["âŒ", "âš ï¸", "âŒ", "âœ…"],
    ["âŒ", "âŒ", "âŒ", "âœ…"],
    ["âŒ", "âŒ", "âŒ", "âœ…"],
  ];

  // Header
  const hx = [3.5, 5.5, 7.5, 9.5, 11.3];
  apps.forEach((a, i) => {
    const isUs = i === 3;
    s.addShape(pptx.ShapeType.roundRect, { x: hx[i+1] - 0.1, y: 1.52, w: 1.8, h: 0.45,
      fill: { color: isUs ? GREEN  : "E8EFFF" },
      line: { color: isUs ? GREEN : "DBE8FF" }, rectRadius: 0.08 });
    s.addText(a, { x: hx[i+1] - 0.1, y: 1.52, w: 1.8, h: 0.45,
      fontSize: isUs ? 11 : 10, bold: isUs, color: isUs ? WHITE : "A5C8F8",
      align: "center", valign: "middle" });
  });

  features.forEach((f, r) => {
    const ry = 2.1 + r * 0.48;
    const even = r % 2 === 0;
    s.addShape(pptx.ShapeType.rect, { x: 0.3, y: ry, w: 13.1, h: 0.46,
      fill: { color: even ? "F8FAFF" : "F8FAFF" } });
    s.addText(f, { x: 0.4, y: ry, w: 3.0, h: 0.46,
      fontSize: 12, color: "C5D9F0", valign: "middle" });
    checks[r].forEach((c, ci) => {
      const isUs = ci === 3;
      s.addShape(pptx.ShapeType.rect, { x: hx[ci+1] - 0.1, y: ry, w: 1.8, h: 0.46,
        fill: { color: isUs && c === "âœ…" ? GREEN  : "F0F4FF" } });
      s.addText(c, { x: hx[ci+1] - 0.1, y: ry, w: 1.8, h: 0.46,
        fontSize: 16, align: "center", valign: "middle" });
    });
  });

  s.addText("âœ… = Full support   âš ï¸ = Partial   âŒ = Not available", {
    x: 0, y: 7.0, w: "100%", h: 0.35,
    fontSize: 11, color: "7BAAD4", align: "center",
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 12 â€” TECHNICAL HIGHLIGHTS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addCleanSlide();
  sectionTag(s, "âš™ï¸  TECHNICAL HIGHLIGHTS", PURPLE);
  slideTitle(s, "Engineering Behind TravelEase", true);

  const highlights = [
    { icon: "ðŸ”", title: "Smart Distance Algorithm",   color: BLUE,
      desc: "4-level lookup: direct table â†’ extended hub table â†’ townToHub chaining â†’ deterministic hash fallback. Always returns a valid distance for any city pair." },
    { icon: "ðŸŒ²", title: "BFS Multi-Hop Routing",      color: PURPLE,
      desc: "Builds routes via: Direct (both major cities) â†’ Via 1 Hub (small town) â†’ Via 2 Hubs (both towns) â†’ Alt Junction routing. Up to 4 routes returned, sorted by cost." },
    { icon: "ðŸ“¡", title: "PWA â€” Install as App",       color: CYAN,
      desc: "Full Web App Manifest with 8 icon sizes (72â€“512px). Works on Android home screen and iOS Safari 'Add to Home Screen'. Offline-ready architecture." },
    { icon: "ðŸŽ¯", title: "Context API State Machine",  color: GREEN,
      desc: "TripContext manages: tripDetails â†’ distance â†’ selectedTransport â†’ selectedHotel â†’ hotelNights â†’ hotelRooms. resetTrip() intentionally preserves distance." },
    { icon: "ðŸ›¡ï¸", title: "Transport Availability Engine", color: ORANGE,
      desc: "citiesWithAirport Set (150+) + citiesWithRailway Set (200+) + roadOnlyLocations Set. getAvailableModes() produces correct mode list for any 700+ city pair." },
    { icon: "âš¡", title: "Terrain-Aware Risk Engine",  color: PINK,
      desc: "classifyTerrain() uses regex against 8 terrain types. buildRiskScenarios() generates 10â€“15 location-specific risks with real India statistics & probability scores." },
  ];

  highlights.forEach((h, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = 0.4 + col * 6.55;
    const by = 1.58 + row * 1.85;
    card(s, bx, by, 6.2, 1.65, WHITE, h.color );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: 0.1, h: 1.65, fill: { color: h.color } });
    s.addText(h.icon, { x: bx + 0.2, y: by + 0.3, w: 0.75, h: 0.75, fontSize: 24, align: "center" });
    s.addText(h.title, { x: bx + 1.05, y: by + 0.18, w: 5.0, h: 0.42,
      fontSize: 13, bold: true, color: h.color });
    s.addText(h.desc, { x: bx + 1.05, y: by + 0.62, w: 5.0, h: 0.95,
      fontSize: 11, color: GRAY, wrap: true });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 13 â€” FUTURE SCOPE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = addGradSlide();
  sectionTag(s, "ðŸš€  FUTURE SCOPE", GOLD);
  slideTitle(s, "Roadmap â€” What's Next for TravelEase", false);

  const phases = [
    {
      phase: "Phase 1 â€” Backend", color: BLUE, icon: "ðŸ”§",
      items: ["Node.js + Express REST API", "MongoDB hotel & route database", "Real IRCTC / Airline API integration", "User authentication (OTP-based)"],
    },
    {
      phase: "Phase 2 â€” AI/ML", color: PURPLE, icon: "ðŸ¤–",
      items: ["Price prediction model (LSTM)", "Personalised recommendations", "Natural language trip planning", "Live disruption detection (Twitter/X API)"],
    },
    {
      phase: "Phase 3 â€” Mobile App", color: GREEN, icon: "ðŸ“±",
      items: ["React Native cross-platform app", "Push notifications for delays", "Offline route maps (Mapbox)", "AR camera for landmark recognition"],
    },
    {
      phase: "Phase 4 â€” Monetisation", color: GOLD, icon: "ðŸ’°",
      items: ["B2B API for small tour operators", "Affiliate hotel partnerships", "Enterprise fleet transport module", "Rural tourism government tie-up"],
    },
  ];

  phases.forEach((p, i) => {
    const bx = 0.4 + (i % 2) * 6.55;
    const by = 1.6 + Math.floor(i / 2) * 2.65;
    card(s, bx, by, 6.2, 2.4, "EEF3FF", p.color );
    s.addShape(pptx.ShapeType.rect, { x: bx, y: by, w: 6.2, h: 0.1, fill: { color: p.color } });
    s.addText(p.icon, { x: bx + 0.1, y: by + 0.15, w: 0.9, h: 0.75, fontSize: 28, align: "center" });
    s.addText(p.phase, { x: bx + 1.1, y: by + 0.2, w: 5.0, h: 0.42,
      fontSize: 13, bold: true, color: p.color });
    p.items.forEach((it, j) => {
      s.addShape(pptx.ShapeType.ellipse, { x: bx + 0.2, y: by + 0.82 + j * 0.38 + 0.1, w: 0.1, h: 0.1, fill: { color: p.color } });
      s.addText(it, { x: bx + 0.4, y: by + 0.8 + j * 0.38, w: 5.6, h: 0.35,
        fontSize: 11, color: "C5D9F0" });
    });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SLIDE 14 â€” CONCLUSION / THANK YOU
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
{
  const s = pptx.addSlide();
  s.background = { color: DARK_BLUE };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%",
    fill: { type: "gradient", gradientType: "linear",
      stops: [{ position: 0, color: "0A1628" }, { position: 60, color: "1A56DB" }, { position: 100, color: "06B6D4" }],
      angle: 145 } });

  // Big checkmark
  s.addShape(pptx.ShapeType.ellipse, { x: 5.75, y: 0.4, w: 1.8, h: 1.8,
    fill: { color: GREEN  }, line: { color: GREEN, width: 2 } });
  s.addText("âœ…", { x: 5.75, y: 0.4, w: 1.8, h: 1.8, fontSize: 44, align: "center", valign: "middle" });

  s.addText("Project Demonstrated", {
    x: 0, y: 2.35, w: "100%", h: 0.5,
    fontSize: 13, color: "7BAAD4", align: "center", bold: true, letterSpacing: 3,
  });

  s.addText("TravelEase", {
    x: 0, y: 2.85, w: "100%", h: 0.95,
    fontSize: 52, bold: true, color: WHITE, align: "center", fontFace: "Calibri",
  });

  // Summary chips
  const summaries = ["700+ Locations", "Multi-Hop Optimizer", "15+ Risk Scenarios", "Zero Platform Fee", "City-Specific Hotels", "PWA App", "React + Vite", "No Backend Needed"];
  summaries.forEach((sm, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const bx = 1.1 + col * 2.85;
    const by = 4.0 + row * 0.55;
    s.addShape(pptx.ShapeType.roundRect, { x: bx, y: by, w: 2.6, h: 0.4,
      fill: { color: "E2EDFF" }, line: { color: "C8DCFF" }, rectRadius: 0.1 });
    s.addText(sm, { x: bx, y: by, w: 2.6, h: 0.4,
      fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle" });
  });

  s.addText("Thank You for Watching  ðŸ™", {
    x: 0, y: 5.28, w: "100%", h: 0.55,
    fontSize: 24, bold: true, color: GOLD, align: "center",
  });

  s.addText("Questions & Discussion Welcome", {
    x: 0, y: 5.85, w: "100%", h: 0.38,
    fontSize: 14, color: "94B8E0", align: "center",
  });

  s.addShape(pptx.ShapeType.rect, { x: 3.5, y: 6.35, w: 6.4, h: 0.04, fill: { color: "C8DCFF" } });

  s.addText("Presented by: Your Name  Â·  Department of Computer Science  Â·  2024â€“25", {
    x: 0, y: 6.55, w: "100%", h: 0.35,
    fontSize: 11, color: "5B8FBF", align: "center",
  });

  s.addText("http://172.28.117.82:3001  (Live Demo)", {
    x: 0, y: 6.95, w: "100%", h: 0.3,
    fontSize: 11, color: CYAN, align: "center", underline: true,
  });
}

// â”€â”€ Write file â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
pptx.writeFile({ fileName: "TravelEase_Project_Presentation.pptx" })
  .then(() => console.log("âœ…  TravelEase_Project_Presentation.pptx created!"))
  .catch(e => console.error("Error:", e));


