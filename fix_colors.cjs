const fs = require('fs');
let src = fs.readFileSync('make_ppt.cjs', 'utf8');

// Fix runtime concatenations like: tier.color + "18" → replace with solid tints
// The fix: sanitize color in addRect and line options to strip alpha

// Replace addRect fill to strip alpha from color strings
// Strategy: fix the 2 runtime concat lines directly
src = src.replace(
  'addRect(s, ix, iy, 2.15, 0.5, tier.color + "18", tier.color + "60", 0.06);',
  'addRect(s, ix, iy, 2.15, 0.5, tier.color, null, 0.06); s.addShape(pptx.ShapeType.roundRect, { x: ix, y: iy, w: 2.15, h: 0.5, line: { color: tier.color, width: 1 }, rectRadius: 0.06, fill: { type: "none" } });'
);

// Also fix the comparison table runtime concat
src = src.replace(
  'addRect(s, cx, 2.85, 1.4, 0.65, c[2] + "15", c[2], 0.08);',
  'addRect(s, cx, 2.85, 1.4, 0.65, "F0F9F4", c[2], 0.08);'
);

// Fix GREEN + "18" and GREEN + "40" in table rows  
src = src.replace(
  /ci === 5 \? GREEN \+ "18" : rowBg/g,
  'ci === 5 ? "D3F0E3" : rowBg'
);
src = src.replace(
  /ci === 5 \? GREEN \+ "40" : "1E3A5F"/g,
  'ci === 5 ? "88CCA8" : "1E3A5F"'
);

// Now fix all literal 8-digit hex strings in the file
src = src.replace(/"([0-9A-Fa-f]{6})[0-9A-Fa-f]{2}"/g, '"$1"');

fs.writeFileSync('make_ppt.cjs', src, 'utf8');
console.log('Done');
