import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import './TodaysSky.css';

/* ===================================================================
   CONSTANTS (matching date-lookup.html)
   =================================================================== */

const ZODIAC_NAMES = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const ZODIAC_SYMBOLS = ['\u2648','\u2649','\u264A','\u264B','\u264C','\u264D','\u264E','\u264F','\u2650','\u2651','\u2652','\u2653'];
const ELEMENT_MAP = ['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Single ring — natal chart style
const PLANET_RING_FRAC = 0.78;

const PLANET_SIZES = {
  Sun: 9, Moon: 7.5,
  Mercury: 5, Venus: 5.5, Mars: 5.5,
  Jupiter: 6.5, Saturn: 6,
  Uranus: 4.5, Neptune: 4.5, Pluto: 4
};

const PLANET_COLORS = {
  Sun: '#FFD700', Moon: '#C0C0C0',
  Mercury: '#A0A0A0', Venus: '#E8D5A0', Mars: '#E84545',
  Jupiter: '#C9A96E', Saturn: '#8B7EC7',
  Uranus: '#4A90D9', Neptune: '#5B8FB9', Pluto: '#6B9E9E'
};

const PLANET_DESCRIPTIONS = {
  Sun:     'Core identity and vitality. The conscious self.',
  Moon:    'Emotional nature, instincts, the unconscious.',
  Mercury: 'Communication, thinking, perception.',
  Venus:   'Love, beauty, values, attraction.',
  Mars:    'Drive, aggression, conflict, action.',
  Jupiter: 'Expansion, growth, opportunity, excess.',
  Saturn:  'Structure, authority, limits, time. Governments and institutions.',
  Uranus:  'Revolution, disruption, sudden change, innovation.',
  Neptune: 'Dissolution, dreams, illusion, spirituality.',
  Pluto:   'Power, transformation, death and rebirth, the underworld.'
};

const SIGN_KEYWORDS = {
  'Aries': 'action, initiative, courage',
  'Taurus': 'stability, beauty, endurance',
  'Gemini': 'communication, curiosity, duality',
  'Cancer': 'nurture, memory, emotional depth',
  'Leo': 'expression, vitality, leadership',
  'Virgo': 'precision, service, discernment',
  'Libra': 'harmony, partnership, justice',
  'Scorpio': 'intensity, transformation, depth',
  'Sagittarius': 'expansion, truth, adventure',
  'Capricorn': 'ambition, structure, endurance',
  'Aquarius': 'innovation, independence, vision',
  'Pisces': 'intuition, compassion, transcendence'
};

const ASPECT_TYPES = {
  conjunction: { angle: 0, orb: 10, symbol: '\u260C', name: 'Conjunction', color: '#C9A96E' },
  opposition:  { angle: 180, orb: 8, symbol: '\u260D', name: 'Opposition', color: '#E84545' },
  square:      { angle: 90, orb: 8, symbol: '\u25A1', name: 'Square', color: '#8B7EC7' },
  trine:       { angle: 120, orb: 8, symbol: '\u25B3', name: 'Trine', color: '#7ECBA1' },
  sextile:     { angle: 60, orb: 6, symbol: '\u2739', name: 'Sextile', color: '#4A90D9' },
};

const ASPECT_EXPLANATIONS = {
  conjunction: 'Two planets at the same degree. Energies merge and amplify.',
  opposition:  'Two planets 180\u00B0 apart. Peak tension and confrontation.',
  square:      'Two planets 90\u00B0 apart. Friction that forces growth.',
  trine:       'Two planets 120\u00B0 apart. Natural harmony and flow.',
  sextile:     'Two planets 60\u00B0 apart. Opportunity and openings.',
};

const ASPECT_MEANINGS = {
  'Neptune-Saturn': { conjunction: 'Reality and illusion collide. Institutions dissolve. The 37-year cycle that brought down the Berlin Wall returns at the world axis \u2014 0\u00B0 Aries.' },
  'Saturn-Neptune': { conjunction: 'Reality and illusion collide. Institutions dissolve. The 37-year cycle that brought down the Berlin Wall returns at the world axis \u2014 0\u00B0 Aries.' },
  'Pluto-Uranus': { trine: 'Evolutionary transformation flows with revolutionary energy. Deep structural change meets sudden innovation.' },
  'Uranus-Pluto': { trine: 'Evolutionary transformation flows with revolutionary energy. Deep structural change meets sudden innovation.' },
  'Jupiter-Saturn': { square: 'Ambition meets the limits of what is possible. Growth versus responsibility.' },
  'Saturn-Jupiter': { square: 'Ambition meets the limits of what is possible. Growth versus responsibility.' },
  'Neptune-Jupiter': { square: 'Idealism collides with reality. Grand visions face practical limits.' },
  'Jupiter-Neptune': { square: 'Idealism collides with reality. Grand visions face practical limits.' },
};

/* ===================================================================
   PLANET POSITION CALCULATOR
   =================================================================== */

function dateToJD(year, month, day) {
  let y = year, m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
}

function getSunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const L0 = (280.46646 + 36000.76983 * T) % 360;
  const M = (357.52911 + 35999.05029 * T) % 360;
  const Mrad = M * Math.PI / 180;
  const C = (1.9146 - 0.004817 * T) * Math.sin(Mrad) + 0.019993 * Math.sin(2 * Mrad);
  return ((L0 + C) % 360 + 360) % 360;
}

function getMoonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const L = (218.3165 + 481267.8813 * T) % 360;
  const M = (134.963 + 477198.8676 * T) % 360;
  const Mrad = M * Math.PI / 180;
  return ((L + 6.29 * Math.sin(Mrad)) % 360 + 360) % 360;
}

function getPositions(year, month, day) {
  const jd = dateToJD(year, month, day);
  const T = (jd - 2451545.0) / 365.25;

  const defs = [
    { name: 'Mercury', symbol: '\u263F', period: 0.2408467, lon0: 252.25 },
    { name: 'Venus',   symbol: '\u2640', period: 0.61519726, lon0: 181.98 },
    { name: 'Mars',    symbol: '\u2642', period: 1.8808158, lon0: 355.43 },
    { name: 'Jupiter', symbol: '\u2643', period: 11.862, lon0: 34.35 },
    { name: 'Saturn',  symbol: '\u2644', period: 29.457, lon0: 50.08 },
    { name: 'Uranus',  symbol: '\u2645', period: 84.011, lon0: 314.06 },
    { name: 'Neptune', symbol: '\u2646', period: 164.8, lon0: 304.35 },
    { name: 'Pluto',   symbol: '\u2647', period: 247.7, lon0: 238.96 },
  ];

  function makePlanet(name, symbol, lon) {
    const l = ((lon % 360) + 360) % 360;
    const signIdx = Math.floor(l / 30);
    return {
      name, symbol, longitude: l,
      sign: ZODIAC_NAMES[signIdx], signSymbol: ZODIAC_SYMBOLS[signIdx],
      degree: Math.floor(l % 30), color: PLANET_COLORS[name],
    };
  }

  const sunLon = getSunLongitude(jd);
  const moonLon = getMoonLongitude(jd);

  return [
    makePlanet('Sun',  '\u2609', sunLon),
    makePlanet('Moon', '\u263D', moonLon),
    ...defs.map(p => {
      const lon = ((p.lon0 + (360 / p.period) * T) % 360 + 360) % 360;
      return makePlanet(p.name, p.symbol, lon);
    }),
  ];
}

/* ===================================================================
   ASPECT DETECTION — only significant (outer planet) aspects
   =================================================================== */

function detectAspects(bodies) {
  const aspects = [];
  const seen = new Set();
  const isOuter = n => ['Jupiter','Saturn','Uranus','Neptune','Pluto'].includes(n);
  const isLuminary = n => ['Sun','Moon'].includes(n);

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i], b = bodies[j];
      let diff = Math.abs(a.longitude - b.longitude);
      if (diff > 180) diff = 360 - diff;

      for (const [key, asp] of Object.entries(ASPECT_TYPES)) {
        const orb = Math.abs(diff - asp.angle);
        if (orb <= asp.orb) {
          const pairKey = [a.name, b.name].sort().join('-');
          const aspectKey = pairKey + '-' + key;
          if (seen.has(aspectKey)) continue;
          seen.add(aspectKey);

          const significance = (isOuter(a.name) && isOuter(b.name)) ? 3
            : (isLuminary(a.name) && isOuter(b.name)) || (isOuter(a.name) && isLuminary(b.name)) ? 2
            : (isLuminary(a.name) && isLuminary(b.name)) ? 2
            : 1;

          if (significance >= 2) {
            const customMeaning = ASPECT_MEANINGS[pairKey]?.[key] || ASPECT_MEANINGS[[b.name, a.name].join('-')]?.[key] || '';
            aspects.push({
              body1: a.name, body2: b.name,
              type: key, ...asp, orb: Math.round(orb * 10) / 10,
              customMeaning, significance,
            });
          }
        }
      }
    }
  }
  return aspects.sort((a, b) => b.significance - a.significance);
}

/* ===================================================================
   HELPERS
   =================================================================== */

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function bodyHash(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h << 5) - h) + name.charCodeAt(i);
  return h;
}

function daysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}

/* ===================================================================
   CANVAS RENDERER — matches date-lookup.html drawDayMap()
   =================================================================== */

function drawChart(ctx, w, h, bodies, aspects, stars, selectedPlanet, hoveredPlanet, time) {
  const cx = w / 2, cy = h / 2;
  const baseR = Math.min(cx, cy) - 20;

  ctx.clearRect(0, 0, w, h);

  // Starfield
  stars.forEach(st => {
    st.alpha += st.delta;
    if (st.alpha <= 0.03 || st.alpha >= 0.4) st.delta *= -1;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232,230,240,${st.alpha})`;
    ctx.fill();
  });

  // Zodiac ring (12 segments with element tints)
  const outerR = baseR;
  const signBandW = Math.max(28, baseR * 0.09);
  const signR = outerR - signBandW;

  for (let i = 0; i < 12; i++) {
    const startAngle = (i * 30 - 90) * Math.PI / 180;
    const endAngle = ((i + 1) * 30 - 90) * Math.PI / 180;

    const elem = ELEMENT_MAP[i];
    const elemAlpha = elem === 'fire' ? 0.035 : elem === 'water' ? 0.03 : 0.025;
    const elemColor = elem === 'fire' ? '232,69,69' : elem === 'earth' ? '126,203,161' : elem === 'air' ? '139,126,199' : '74,144,217';

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, endAngle);
    ctx.arc(cx, cy, signR, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = `rgba(${elemColor},${elemAlpha})`;
    ctx.fill();

    // Divider
    const lx1 = cx + signR * Math.cos(startAngle);
    const ly1 = cy + signR * Math.sin(startAngle);
    const lx2 = cx + outerR * Math.cos(startAngle);
    const ly2 = cy + outerR * Math.sin(startAngle);
    ctx.beginPath();
    ctx.moveTo(lx1, ly1);
    ctx.lineTo(lx2, ly2);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Sign symbol in band
    const midAngle = ((i * 30 + 15) - 90) * Math.PI / 180;
    const symbolMidR = (outerR + signR) / 2;
    const fontSize = Math.max(11, Math.min(15, w * 0.024));
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ZODIAC_SYMBOLS[i], cx + symbolMidR * Math.cos(midAngle), cy + symbolMidR * Math.sin(midAngle));

    // Sign name rotated on outer edge
    if (w > 500) {
      const nameR = outerR + 14;
      const nameSize = Math.max(7, Math.min(9, w * 0.014));
      ctx.save();
      ctx.font = `500 ${nameSize}px 'IBM Plex Mono', monospace`;
      ctx.fillStyle = 'rgba(232,230,240,0.12)';
      const nx = cx + nameR * Math.cos(midAngle);
      const ny = cy + nameR * Math.sin(midAngle);
      ctx.translate(nx, ny);
      ctx.rotate(midAngle + Math.PI / 2);
      ctx.fillText(ZODIAC_NAMES[i].toUpperCase(), 0, 0);
      ctx.restore();
    }
  }

  // Ring borders
  ctx.beginPath(); ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(201,169,110,0.1)'; ctx.lineWidth = 0.8; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, signR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5; ctx.stroke();

  // Radial guides (compass rose)
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx + 30 * Math.cos(a), cy + 30 * Math.sin(a));
    ctx.lineTo(cx + signR * Math.cos(a), cy + signR * Math.sin(a));
    ctx.strokeStyle = `rgba(232,230,240,${i % 3 === 0 ? 0.035 : 0.015})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Planet ring circle
  const planetR = signR * PLANET_RING_FRAC;
  ctx.beginPath(); ctx.arc(cx, cy, planetR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(201,169,110,0.06)'; ctx.lineWidth = 0.5; ctx.stroke();

  function lonToXY(lon, r) {
    const angle = (lon - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  // Aspect lines (double-pass glow)
  const aspColors = { conjunction: '#C9A96E', opposition: '#E84545', square: '#8B7EC7', trine: '#7ECBA1', sextile: '#4A90D9' };

  if (aspects?.length) {
    aspects.forEach(asp => {
      const b1 = bodies.find(b => b.name === asp.body1);
      const b2 = bodies.find(b => b.name === asp.body2);
      if (!b1 || !b2) return;

      const isRelevant = !selectedPlanet || asp.body1 === selectedPlanet || asp.body2 === selectedPlanet;
      const p1 = lonToXY(b1.longitude, planetR);
      const p2 = lonToXY(b2.longitude, planetR);

      const maxOrb = ASPECT_TYPES[asp.type]?.orb || 10;
      const tightness = 1 - asp.orb / maxOrb;
      const baseOpacity = Math.max(0.06, 0.35 * tightness);
      const color = aspColors[asp.type] || '#C9A96E';
      const dim = isRelevant ? 1 : 0.15;

      // Glow pass
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = hexToRgba(color, baseOpacity * 0.4 * dim);
      ctx.lineWidth = 4; ctx.setLineDash([]); ctx.stroke();

      // Bright pass
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = hexToRgba(color, baseOpacity * dim);
      ctx.lineWidth = asp.type === 'conjunction' ? 1.4 : 1;
      if (asp.type === 'opposition') ctx.setLineDash([6, 4]);
      else if (asp.type === 'sextile') ctx.setLineDash([3, 3]);
      else ctx.setLineDash([]);
      ctx.stroke(); ctx.setLineDash([]);
    });
  }

  // Collision displacement for clustered planets
  const sorted = [...bodies].sort((a, b) => a.longitude - b.longitude);
  const displaced = {};
  const minSep = 12;
  for (let i = 0; i < sorted.length; i++) {
    displaced[sorted[i].name] = 0;
    for (let j = 0; j < i; j++) {
      let diff = Math.abs(sorted[i].longitude - sorted[j].longitude);
      if (diff > 180) diff = 360 - diff;
      if (diff < minSep) displaced[sorted[i].name] = (displaced[sorted[j].name] || 0) + 18;
    }
  }

  // Planet nodes (twinkling, with glow halos)
  bodies.forEach(body => {
    const disp = displaced[body.name] || 0;
    const r = planetR + disp;
    const pos = lonToXY(body.longitude, r);
    const size = PLANET_SIZES[body.name] || 5;
    const isHov = hoveredPlanet === body.name;
    const isSel = selectedPlanet === body.name;

    const isRelevant = !selectedPlanet || isSel ||
      aspects.some(a => (a.body1 === selectedPlanet || a.body2 === selectedPlanet) &&
        (a.body1 === body.name || a.body2 === body.name));
    const dim = isRelevant ? 1 : 0.25;

    const twinkle = 0.7 + 0.3 * Math.sin(time * 0.003 + bodyHash(body.name));
    const ds = size * (isHov ? 1.5 : 1);

    // Tick line from ring to displaced position
    if (disp > 0) {
      const ringPos = lonToXY(body.longitude, planetR);
      ctx.beginPath(); ctx.moveTo(ringPos.x, ringPos.y); ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = hexToRgba(body.color, 0.15); ctx.lineWidth = 0.5; ctx.stroke();
    }

    // Glow halo
    const glowR = ds * (isHov ? 6 : 3.5) * twinkle;
    const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowR);
    glow.addColorStop(0, hexToRgba(body.color, ((isHov ? 0.3 : 0.12) * dim) * twinkle));
    glow.addColorStop(1, hexToRgba(body.color, 0));
    ctx.beginPath(); ctx.arc(pos.x, pos.y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = glow; ctx.fill();

    // Node body
    ctx.beginPath(); ctx.arc(pos.x, pos.y, ds, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(body.color, 0.85 * twinkle * dim); ctx.fill();

    // Center pip
    ctx.beginPath(); ctx.arc(pos.x, pos.y, ds * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(body.color, 0.95 * twinkle * dim); ctx.fill();

    // Selection ring
    if (isSel) {
      ctx.beginPath(); ctx.arc(pos.x, pos.y, ds + 5, 0, Math.PI * 2);
      ctx.strokeStyle = body.color; ctx.lineWidth = 1.5; ctx.stroke();
    }

    // Symbol label
    const labelR = r + ds + 12;
    const labelPos = lonToXY(body.longitude, labelR);
    ctx.font = `${Math.max(11, Math.min(15, w * 0.024))}px serif`;
    ctx.fillStyle = hexToRgba(body.color, 0.7 * twinkle * dim);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(body.symbol, labelPos.x, labelPos.y);

    // Store for hit testing
    body._sx = pos.x; body._sy = pos.y; body._sr = ds;
  });

  // Center glow
  const pulse = 0.7 + 0.3 * Math.sin(time * 0.002);
  const coreR = 10 * pulse;
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 4);
  coreGrad.addColorStop(0, `rgba(201,169,110,${0.2 * pulse})`);
  coreGrad.addColorStop(0.3, `rgba(201,169,110,${0.06 * pulse})`);
  coreGrad.addColorStop(1, 'rgba(201,169,110,0)');
  ctx.beginPath(); ctx.arc(cx, cy, coreR * 4, 0, Math.PI * 2);
  ctx.fillStyle = coreGrad; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(201,169,110,${0.5 * pulse})`; ctx.fill();

  // Watermark
  ctx.font = `500 ${Math.max(7, Math.min(9, w * 0.015))}px 'IBM Plex Mono', monospace`;
  ctx.fillStyle = `rgba(201,169,110,${0.12 * pulse})`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('COSMOS DAILY', cx, cy + 18);
}

/* ===================================================================
   MAIN COMPONENT
   =================================================================== */

export default function TodaysSky() {
  const canvasRef = useRef(null);
  const starsRef = useRef(null);
  const stateRef = useRef({ w: 0, h: 0, hoveredPlanet: null });
  const animRef = useRef(null);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [day, setDay] = useState(now.getDate());
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Derived data
  const bodies = useMemo(() => getPositions(year, month, day), [year, month, day]);
  const aspects = useMemo(() => detectAspects(bodies), [bodies]);

  const dateLabel = useMemo(() => {
    try {
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return `${MONTH_NAMES[month - 1]} ${day}, ${year}`; }
  }, [year, month, day]);

  const maxDay = daysInMonth(year, month);

  // Canvas setup + animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      const dw = canvas.clientWidth, dh = canvas.clientHeight;
      if (!dw || !dh) return;
      canvas.width = dw * dpr; canvas.height = dh * dpr;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starsRef.current = Array.from({ length: 180 }, () => ({
        x: Math.random() * dw, y: Math.random() * dh,
        r: Math.random() * 1.0 + 0.2, alpha: Math.random() * 0.35 + 0.05,
        delta: (Math.random() - 0.5) * 0.003,
      }));
      stateRef.current.w = dw; stateRef.current.h = dh;
    }

    setup();
    const ro = new ResizeObserver(() => setup());
    ro.observe(canvas);

    function loop(time) {
      const ctx = canvas.getContext('2d');
      const { w, h, hoveredPlanet } = stateRef.current;
      if (w && h && starsRef.current) {
        drawChart(ctx, w, h, bodies, aspects, starsRef.current, selectedPlanet, hoveredPlanet, time);
      }
      animRef.current = requestAnimationFrame(loop);
    }
    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [bodies, aspects, selectedPlanet]);

  // Mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function hitTest(mx, my) {
      let closest = null, closestDist = Infinity;
      for (const body of bodies) {
        if (body._sx == null) continue;
        const dx = mx - body._sx, dy = my - body._sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hitR = Math.max((body._sr || 5) + 8, 14);
        if (dist < hitR && dist < closestDist) { closest = body; closestDist = dist; }
      }
      return closest;
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const hit = hitTest(mx, my);
      stateRef.current.hoveredPlanet = hit?.name || null;
      canvas.style.cursor = hit ? 'pointer' : 'default';

      const tip = document.getElementById('sky-tooltip');
      if (tip && hit) {
        const si = Math.floor(hit.longitude / 30);
        tip.innerHTML = `<span style="color:${hit.color}">${hit.symbol} ${hit.name}</span> <span class="tip-sign">${hit.degree}\u00B0 ${ZODIAC_SYMBOLS[si]} ${ZODIAC_NAMES[si]}</span>`;
        tip.classList.add('visible');
        let tx = e.clientX - rect.left + 16, ty = e.clientY - rect.top - 10;
        if (tx + 200 > rect.width) tx = e.clientX - rect.left - 210;
        if (ty < 10) ty = 10;
        tip.style.left = tx + 'px'; tip.style.top = ty + 'px';
      } else if (tip) tip.classList.remove('visible');
    }

    function onLeave() {
      stateRef.current.hoveredPlanet = null;
      const tip = document.getElementById('sky-tooltip');
      if (tip) tip.classList.remove('visible');
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
      setSelectedPlanet(prev => {
        const name = hit?.name || null;
        return prev === name ? null : name;
      });
    }

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onClick);
    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [bodies]);

  // Date handlers
  function setToday() {
    const n = new Date();
    setYear(n.getFullYear()); setMonth(n.getMonth() + 1); setDay(n.getDate());
    setSelectedPlanet(null);
  }

  function setRandom() {
    const y = Math.floor(Math.random() * 300) + 1726;
    const m = Math.floor(Math.random() * 12) + 1;
    const d = Math.floor(Math.random() * daysInMonth(y, m)) + 1;
    setYear(y); setMonth(m); setDay(d);
    setSelectedPlanet(null);
  }

  // Planet panel data
  const planet = bodies.find(b => b.name === selectedPlanet);
  const planetAspects = aspects.filter(a => a.body1 === selectedPlanet || a.body2 === selectedPlanet);
  const aspColors = { conjunction: '#C9A96E', opposition: '#E84545', square: '#8B7EC7', trine: '#7ECBA1', sextile: '#4A90D9' };

  return (
    <section className="sky-section">

      {/* Date input panel */}
      <div className="sky-input-panel">
        <div className="sky-input-row">
          <div className="sky-input-group">
            <label>Year</label>
            <input
              type="number" min="1" max="9999" value={year}
              onChange={e => { setYear(+e.target.value); setSelectedPlanet(null); }}
            />
          </div>
          <div className="sky-input-group">
            <label>Month</label>
            <select value={month} onChange={e => { setMonth(+e.target.value); setSelectedPlanet(null); }}>
              {MONTH_NAMES.map((n, i) => <option key={i} value={i + 1}>{n}</option>)}
            </select>
          </div>
          <div className="sky-input-group">
            <label>Day</label>
            <select value={Math.min(day, maxDay)} onChange={e => { setDay(+e.target.value); setSelectedPlanet(null); }}>
              {Array.from({ length: maxDay }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            </select>
          </div>
        </div>
        <div className="sky-btn-row">
          <button className="sky-btn-today" onClick={setToday}>Today</button>
          <button className="sky-btn-random" onClick={setRandom}>Surprise Me</button>
        </div>
      </div>

      {/* Date banner */}
      <div className="sky-date-banner">
        <span className="sky-date-label">Your Sky On</span>
        <div className="sky-date-value">{dateLabel}</div>
      </div>

      {/* Canvas map + floating panel */}
      <div className="sky-map-wrap">
        <canvas ref={canvasRef} className="sky-canvas" />
        <div id="sky-tooltip" className="sky-tooltip" />

        {/* Planet info panel — floating overlay */}
        {planet && (
          <div className="sky-panel open">
            <button className="sky-panel-close" onClick={() => setSelectedPlanet(null)}>&times;</button>
            <div className="sky-panel-accent" style={{ background: planet.color }} />
            <div className="sky-panel-name">{planet.symbol} {planet.name}</div>
            <div className="sky-panel-sign" style={{ color: planet.color }}>
              {planet.degree}{'\u00B0'} {planet.signSymbol} {planet.sign}
            </div>
            <div className="sky-panel-section">
              <div className="sky-panel-label">This Planet</div>
              <div className="sky-panel-text">{PLANET_DESCRIPTIONS[planet.name]}</div>
            </div>
            <div className="sky-panel-section sky-panel-interp">
              <div className="sky-panel-label">{planet.name} in {planet.sign}</div>
              <div className="sky-panel-text">
                {PLANET_DESCRIPTIONS[planet.name]?.split('.')[0]} is colored by {SIGN_KEYWORDS[planet.sign]}.
              </div>
            </div>
            {planetAspects.length > 0 && (
              <div className="sky-panel-section">
                <div className="sky-panel-label">Aspects</div>
                {planetAspects.map((asp, i) => {
                  const other = asp.body1 === planet.name ? asp.body2 : asp.body1;
                  const color = aspColors[asp.type] || '#C9A96E';
                  const explanation = asp.customMeaning || ASPECT_EXPLANATIONS[asp.type] || '';
                  return (
                    <div key={i} className="sky-panel-aspect" style={{ borderLeftColor: color }}>
                      <div className="sky-panel-aspect-title" style={{ color }}>
                        {asp.symbol} {asp.name} to {other}
                        <span className="sky-panel-aspect-orb">{asp.orb}{'\u00B0'} orb</span>
                      </div>
                      <div className="sky-panel-aspect-desc">{explanation}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="sky-footnote">
        Click any planet to see its sign and aspects. Only significant outer-planet
        aspects are shown. Positions are approximate (mean-motion model).
      </p>
    </section>
  );
}
