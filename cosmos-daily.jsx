import { useState, useEffect, useRef } from "react";

const CELESTIAL_EVENTS = [
  {
    id: 1,
    type: "eclipse",
    name: "Blood Moon Total Lunar Eclipse",
    date: "March 3, 2026",
    position: "12° Virgo · South Node",
    description:
      "The final Blood Moon in a trilogy of total lunar eclipses since March 2025. Earth's shadow fully engulfs the Moon at 6:33 AM EST, turning it deep crimson for over an hour.",
    significance:
      "In mundane astrology, eclipses on the South Node mark culmination points — the end of cycles that began 18 months prior. Virgo eclipses historically correlate with crises in public health systems, labor movements, and the exposure of institutional flaws. The South Node demands release of what no longer serves.",
    historicalPattern:
      "Previous Virgo eclipse cycles (2015-2017) coincided with the Zika crisis, global refugee movements, and major shifts in healthcare policy. The 2006-2008 Virgo node cycle overlapped with the early signals of the financial crisis.",
    worldEvents: [
      {
        headline: "Iran Intelligence Breach Shakes Middle East",
        source: "Multiple sources",
        detail:
          "Reports surface that Iran's Supreme Leader's location was tracked through advanced intelligence methods, raising questions about surveillance technology and cyber warfare.",
        cosmicLink:
          "Virgo's domain is systems and their vulnerabilities. Eclipses expose what's hidden. The South Node in Virgo suggests a system thought to be secure is revealed as fundamentally flawed — a pattern of exposure that this eclipse series has been building toward since 2025.",
      },
      {
        headline: "Middle East Airspace Disruptions",
        detail:
          "Major flight disruptions across Gulf hubs following escalating regional tensions.",
        source: "Aviation authorities",
        cosmicLink:
          "Mercury (Virgo's ruler) governs transit and communication networks. When an eclipse activates Virgo, disruptions to logistics, travel, and information flow are among the most consistently observed mundane correlations.",
      },
      {
        headline: "Global Health Policy Restructuring Accelerates",
        detail:
          "Multiple nations announce overhauls to pandemic preparedness frameworks, marking a shift from the post-COVID approach.",
        source: "WHO reports",
        cosmicLink:
          "Virgo is the zodiac's healer. This final eclipse in the Virgo-Pisces axis closes a chapter on how institutions approach collective health — demanding practical reform over idealistic promises.",
      },
    ],
    phase: "past",
  },
  {
    id: 2,
    type: "conjunction",
    name: "Venus–Saturn Conjunction",
    date: "March 8, 2026",
    position: "Aries · 1° separation",
    description:
      "Venus and Saturn appear within one degree of each other in the evening sky — visible to the naked eye as two bright points nearly touching above the western horizon.",
    significance:
      "Venus represents value, beauty, and diplomacy. Saturn represents structure, limits, and consequences. Their meeting in Aries — a sign of initiation and conflict — traditionally signals moments when alliances are tested, economic realities confront aspirations, and diplomatic efforts face hard truths.",
    historicalPattern:
      "Venus-Saturn conjunctions in fire signs have coincided with notable economic contractions and diplomatic standoffs. The 2016 conjunction in Sagittarius aligned with Brexit negotiations; the 2019 conjunction in Capricorn preceded the US-China trade war escalation.",
    worldEvents: [
      {
        headline: "Trade Tensions Escalate Between Major Economies",
        detail:
          "New tariff announcements and retaliatory measures signal a hardening of economic boundaries between trading blocs.",
        source: "Financial Times",
        cosmicLink:
          "Venus-Saturn in Aries: the desire for fair exchange (Venus) meets immovable boundaries (Saturn) in a sign that doesn't negotiate (Aries). The astro-economic interpretation suggests value systems are being stress-tested.",
      },
      {
        headline: "Central Banks Signal Policy Divergence",
        detail:
          "Federal Reserve and ECB move in opposite directions on interest rates, creating ripple effects across currency markets.",
        source: "Bloomberg",
        cosmicLink:
          "Saturn constrains what Venus wants to expand. In financial astrology, this conjunction often marks moments where 'easy money' meets 'hard reality' — interest rate decisions, credit tightening, and revaluations of what things are truly worth.",
      },
    ],
    phase: "past",
  },
  {
    id: 3,
    type: "equinox",
    name: "Vernal Equinox · Aries Ingress",
    date: "March 20, 2026",
    position: "Sun enters 0° Aries",
    description:
      "The astronomical start of spring in the Northern Hemisphere. Day and night reach equal length. In mundane astrology, the Aries Ingress chart — cast for the moment the Sun hits 0° Aries — is used to forecast the geopolitical themes of the entire year ahead.",
    significance:
      "The Aries Ingress is considered the 'birth chart of the year' in political astrology. Astrologers cast this chart for national capitals to read the political climate, economic trajectory, and social tensions a country will face. The sign and house placement of Mars in this chart is considered especially telling.",
    historicalPattern:
      "The 2020 Aries Ingress featured Saturn at 0° Aquarius — an exact conjunction marking the beginning of a new 30-year societal cycle. Within days, global lockdowns began. The 2001 Ingress had Mars conjunct Pluto in Sagittarius, months before September 11th reshaped international relations.",
    worldEvents: [
      {
        headline: "UN General Assembly Opens Spring Session",
        detail:
          "Major agenda items include AI governance, climate finance, and Middle East security architecture.",
        source: "UN News",
        cosmicLink:
          "The Ingress chart's angles and planetary positions will be analyzed by mundane astrologers for months. Key questions: Where does Mars fall? Is it angular (suggesting military action) or cadent (suggesting diplomacy)? The Sun's aspects at 0° Aries set the tone.",
      },
    ],
    phase: "present",
  },
  {
    id: 4,
    type: "retrograde",
    name: "Mercury Retrograde in Aries",
    date: "March 29 – April 21, 2026",
    position: "26° Aries → 17° Aries",
    description:
      "Mercury appears to move backward through Aries. While this is an optical illusion caused by orbital mechanics, the cultural and astrological weight of this transit has made it one of the most widely recognized celestial events.",
    significance:
      "In mundane astrology, Mercury retrograde periods correlate with communication breakdowns, technological failures, travel disruptions, and the resurfacing of unresolved issues. In Aries specifically, impulsive decisions made in haste tend to require revision. Contracts signed, deals announced, and systems launched during this window historically face complications.",
    historicalPattern:
      "Mercury retrograde periods have an outsized cultural influence regardless of belief in astrology. A 2023 study found that 30% of Americans consider Mercury retrograde when making decisions. Tech companies have been known to avoid product launches during these windows.",
    worldEvents: [
      {
        headline: "Upcoming: Watch for Tech Rollbacks & Political Walk-Backs",
        detail:
          "Historically, this window sees software outages, diplomatic miscommunications, and revised statements from public figures. Whether correlation, causation, or cultural self-fulfilling prophecy — the pattern persists.",
        source: "Pattern forecast",
        cosmicLink:
          "Mercury rules information, technology, and negotiation. In Aries, communications tend to be fired off without review. The retrograde period asks: what was said too quickly? What contract was signed without reading the fine print? Expect revisions.",
      },
    ],
    phase: "upcoming",
  },
];

const TYPE_CONFIG = {
  eclipse: {
    icon: "◑",
    color: "#E84545",
    label: "ECLIPSE",
    glow: "rgba(232,69,69,0.2)",
  },
  conjunction: {
    icon: "☌",
    color: "#C9A96E",
    label: "CONJUNCTION",
    glow: "rgba(201,169,110,0.2)",
  },
  equinox: {
    icon: "☀",
    color: "#7ECBA1",
    label: "EQUINOX",
    glow: "rgba(126,203,161,0.2)",
  },
  retrograde: {
    icon: "℞",
    color: "#8B7EC7",
    label: "RETROGRADE",
    glow: "rgba(139,126,199,0.2)",
  },
  opposition: {
    icon: "☍",
    color: "#E8A545",
    label: "OPPOSITION",
    glow: "rgba(232,165,69,0.2)",
  },
};

const PHASE_LABELS = {
  past: "OCCURRED",
  present: "ACTIVE NOW",
  upcoming: "APPROACHING",
};

function Starfield() {
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))
  );
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.opacity,
            animation: `twinkle 4s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

function WorldEventCard({ event, typeColor }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 10,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onClick={() => setOpen(!open)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 15,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            {event.headline}
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
              marginTop: 4,
              letterSpacing: 0.5,
            }}
          >
            {event.source}
          </div>
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: 14,
            marginLeft: 12,
            marginTop: 2,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          ▾
        </div>
      </div>
      {open && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 13.5,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              margin: "12px 0",
            }}
          >
            {event.detail}
          </p>
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              background: `linear-gradient(135deg, rgba(0,0,0,0.3), ${typeColor}08)`,
              borderLeft: `2px solid ${typeColor}55`,
              borderRadius: "0 8px 8px 0",
            }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                letterSpacing: 2,
                color: typeColor,
                marginBottom: 8,
                opacity: 0.7,
              }}
            >
              ✦ ASTROLOGICAL INTERPRETATION
            </div>
            <p
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: 13.5,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.65,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {event.cosmicLink}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function CelestialEventCard({ event, index }) {
  const [expanded, setExpanded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const config = TYPE_CONFIG[event.type];

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        animation: `fadeSlideUp 0.6s ease ${index * 0.1}s both`,
      }}
    >
      {/* Timeline spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 40,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${config.glow}, transparent)`,
            border: `1.5px solid ${config.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: config.color,
            boxShadow:
              event.phase === "present"
                ? `0 0 16px ${config.glow}`
                : "none",
          }}
        >
          {config.icon}
        </div>
        <div
          style={{
            width: 1,
            flex: 1,
            minHeight: 40,
            background: `linear-gradient(to bottom, ${config.color}33, transparent)`,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: 32 }}>
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              letterSpacing: 2,
              color: config.color,
              padding: "3px 8px",
              border: `1px solid ${config.color}33`,
              borderRadius: 4,
            }}
          >
            {config.label}
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              letterSpacing: 1.5,
              color:
                event.phase === "present"
                  ? "#7ECBA1"
                  : "rgba(255,255,255,0.25)",
              padding: "3px 8px",
              borderRadius: 4,
              background:
                event.phase === "present"
                  ? "rgba(126,203,161,0.1)"
                  : "transparent",
              border:
                event.phase === "present"
                  ? "1px solid rgba(126,203,161,0.2)"
                  : "none",
            }}
          >
            {PHASE_LABELS[event.phase]}
          </span>
        </div>

        {/* Date & position */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 6,
            letterSpacing: 0.5,
          }}
        >
          {event.date} · {event.position}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 24,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 10px 0",
            lineHeight: 1.3,
            letterSpacing: 0.3,
          }}
        >
          {event.name}
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 14.5,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.65,
            margin: "0 0 14px 0",
          }}
        >
          {event.description}
        </p>

        {/* Expandable: Astrological significance */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10.5,
            letterSpacing: 1,
            color: config.color,
            opacity: 0.75,
            transition: "opacity 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.75)}
        >
          <span
            style={{
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              display: "inline-block",
            }}
          >
            →
          </span>
          MUNDANE ASTROLOGY READING
        </button>

        {expanded && (
          <div style={{ animation: "fadeIn 0.3s ease", marginTop: 12 }}>
            <div
              style={{
                padding: "16px 18px",
                borderRadius: 10,
                background: `linear-gradient(160deg, rgba(0,0,0,0.4), ${config.glow}10)`,
                border: `1px solid ${config.color}15`,
              }}
            >
              <p
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {event.significance}
              </p>

              {/* Historical pattern toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHistory(!showHistory);
                }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: "8px 12px",
                  cursor: "pointer",
                  marginTop: 14,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 1,
                  color: "rgba(255,255,255,0.4)",
                  transition: "all 0.2s",
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                }}
              >
                {showHistory ? "▾" : "▸"} HISTORICAL PATTERN
              </button>

              {showHistory && (
                <p
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.65,
                    margin: "10px 0 0 0",
                    fontStyle: "italic",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  {event.historicalPattern}
                </p>
              )}
            </div>
          </div>
        )}

        {/* World events section */}
        {event.worldEvents.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                letterSpacing: 2.5,
                color: "rgba(255,255,255,0.2)",
                marginBottom: 10,
              }}
            >
              WORLD EVENTS IN THIS WINDOW
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {event.worldEvents.map((we, i) => (
                <WorldEventCard
                  key={i}
                  event={we}
                  typeColor={config.color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CosmosDaily() {
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const filtered =
    filter === "all"
      ? CELESTIAL_EVENTS
      : CELESTIAL_EVENTS.filter((e) => e.phase === filter);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(175deg, #06050A 0%, #0A0814 30%, #0D0B18 60%, #07060C 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.7} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes headerGlow { 0%,100%{text-shadow:0 0 40px rgba(201,169,110,0.1)} 50%{text-shadow:0 0 60px rgba(201,169,110,0.15)} }
        @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.02)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        ::selection { background: rgba(201,169,110,0.3); }
      `}</style>

      <Starfield />

      {/* Ambient orbs */}
      <div
        style={{
          position: "fixed",
          top: "-15%",
          right: "-8%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,69,69,0.06), transparent 70%)",
          animation: "orbFloat 12s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          left: "-5%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,126,199,0.06), transparent 70%)",
          animation: "orbFloat 15s ease-in-out 3s infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header */}
        <header
          style={{
            paddingTop: 52,
            paddingBottom: 16,
            textAlign: "center",
            animation: loaded ? "fadeSlideUp 0.7s ease" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9.5,
              letterSpacing: 4,
              color: "rgba(255,255,255,0.2)",
              marginBottom: 16,
            }}
          >
            CELESTIAL MECHANICS × WORLD EVENTS
          </div>
          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: 4,
              margin: 0,
              color: "#fff",
              animation: "headerGlow 6s ease-in-out infinite",
            }}
          >
            COSMOS DAILY
          </h1>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.18)",
              letterSpacing: 2,
              marginTop: 10,
            }}
          >
            {new Date()
              .toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase()}
          </div>
        </header>

        {/* Manifesto line */}
        <div
          style={{
            textAlign: "center",
            padding: "20px 32px 32px",
            animation: loaded
              ? "fadeSlideUp 0.7s ease 0.15s both"
              : "none",
          }}
        >
          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 15.5,
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.7,
              fontStyle: "italic",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Tracking the movements above. Mapping the events below.
            <br />
            Exploring the oldest framework humans have used to read the
            world.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            margin: "0 0 28px 0",
          }}
        />

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            marginBottom: 36,
            flexWrap: "wrap",
            animation: loaded
              ? "fadeSlideUp 0.7s ease 0.25s both"
              : "none",
          }}
        >
          {[
            { key: "all", label: "All Events" },
            { key: "past", label: "Occurred" },
            { key: "present", label: "Active Now" },
            { key: "upcoming", label: "Approaching" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                letterSpacing: 1,
                border:
                  filter === f.key
                    ? "1px solid rgba(201,169,110,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                background:
                  filter === f.key
                    ? "rgba(201,169,110,0.08)"
                    : "transparent",
                color:
                  filter === f.key
                    ? "#C9A96E"
                    : "rgba(255,255,255,0.25)",
                transition: "all 0.25s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Current sky briefing */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(126,203,161,0.12)",
            borderRadius: 12,
            padding: "18px 20px",
            marginBottom: 36,
            animation: loaded
              ? "fadeSlideUp 0.7s ease 0.3s both"
              : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              letterSpacing: 2.5,
              color: "rgba(126,203,161,0.5)",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ animation: "pulse 2s ease-in-out infinite" }}>
              ●
            </span>
            CURRENT SKY — MARCH 15, 2026
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 12,
            }}
          >
            {[
              { label: "Sun", value: "24° Pisces" },
              { label: "Moon", value: "Waning · Sagittarius" },
              { label: "Mercury", value: "22° Aries (pre-shadow)" },
              { label: "Venus", value: "14° Aries" },
              { label: "Mars", value: "8° Leo" },
              { label: "Saturn", value: "1° Aries" },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 9,
                    letterSpacing: 1.5,
                    color: "rgba(255,255,255,0.2)",
                    marginBottom: 3,
                  }}
                >
                  {p.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {p.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div
          style={{
            animation: loaded
              ? "fadeSlideUp 0.7s ease 0.4s both"
              : "none",
          }}
        >
          {filtered.map((event, i) => (
            <CelestialEventCard
              key={event.id}
              event={event}
              index={i}
            />
          ))}
        </div>

        {/* Disclaimer footer */}
        <div
          style={{
            textAlign: "center",
            padding: "48px 20px 40px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.2)",
              lineHeight: 1.7,
              maxWidth: 460,
              margin: "0 auto 12px",
              fontStyle: "italic",
            }}
          >
            Astrology is a lens, not a law. We present celestial events
            alongside world events as a framework for reflection — not as
            causal claims or predictions.
          </p>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              letterSpacing: 3,
              color: "rgba(255,255,255,0.1)",
            }}
          >
            COSMOS DAILY · FOR EXPLORATION & PERSPECTIVE
          </div>
        </div>
      </div>
    </div>
  );
}