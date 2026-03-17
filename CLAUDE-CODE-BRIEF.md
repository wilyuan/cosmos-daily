# Cosmos Daily — Claude Code Project Brief

## What This Is
An interactive web app that maps celestial events (eclipses, conjunctions, oppositions, retrogrades) to major world events throughout history. The interpretive framework is **mundane astrology** — the branch of astrology that maps planetary mechanics to geopolitical events (NOT personal horoscopes).

## Files In This Folder

- **`events-data.json`** — 106 historical events spanning 44 BC to 2026, each with celestial event, world event, category, description, cosmic link, and historical parallel. Ready to import.
- **`cosmos-daily-v1.html`** — The DESIGN REFERENCE. This is the best-looking version. Use its visual DNA as the starting point for the new build. Single HTML file with React via CDN.
- **`cosmos-daily-v3.html`** — Feature-complete but visually broken. Has all the features (filters, categories, calendar view, glossary, today's sky panel) but the UI/UX is poor. Use for feature reference only, NOT design reference.
- **`cosmos-daily-research.md`** — Product research document with market analysis, competitive landscape, audience demographics.

## Tech Stack (Recommended)
- Vite + React (proper project, not CDN)
- TypeScript optional
- CSS Modules or Tailwind
- JSON data file for events (provided)

## Design Direction

### Use v1 as the visual foundation:
- **Background**: Deep dark (#06050A) with subtle gradient, starfield particles, ambient colored orbs with blur
- **Typography**: Source Serif 4 (editorial headings/body) + IBM Plex Mono (data, labels, dates)
- **Cards**: Full-width, left color border accent (4px), dark glass background, generous padding and breathing room
- **Color palette (event types)**:
  - Eclipse: #E84545 (red)
  - Conjunction: #C9A96E (gold)
  - Opposition: #E8A545 (amber)
  - Square: #5B8FB9 (blue)
  - Retrograde: #8B7EC7 (purple)
  - Equinox: #7ECBA1 (green)
  - Ingress: #D4A574 (warm brown)
- **NO center timeline spine** — it was unreadable with many events. Use full-width cards stacked vertically.
- **Accent color used sparingly** — the gold (#C9A96E) is the primary accent. Other colors only appear as subtle left-border indicators on cards, not as backgrounds or large blocks.

### Critical UX feedback from user:
1. "Cards are not readable" — need clear visual hierarchy within each card
2. "Colors are getting confusing" — too many competing colors. Simplify.
3. "Titles have no info" — each card MUST clearly show: (a) the celestial event name, (b) the world event name, (c) the year, (d) the category
4. v1's breathing room and editorial elegance > v3's feature density

### Card information hierarchy (top to bottom):
1. **Year** (large, IBM Plex Mono) + **Celestial Type tag** (small pill with icon)
2. **Celestial Event** (e.g. "Saturn-Pluto Conjunction at 22° Capricorn") — IBM Plex Mono, gold color, smaller
3. **World Event title** (e.g. "COVID-19 Pandemic Emerges") — Source Serif 4, large, white
4. **Category pill** (e.g. "Pandemic") — small tag
5. **Description** — collapsible, shows first 2-3 lines with "Read more"
6. **Cosmic Link** — expandable section explaining the astrological interpretation
7. **Historical Parallel** — expandable section noting similar past patterns

## Features to Build

### Core (Phase 1):
- Event timeline (vertical, reverse chronological — newest first)
- Event cards with expand/collapse
- Filter by: category (7 types), celestial type (7 types), era (Ancient/Medieval/Modern/Contemporary)
- Search across all event text
- Results counter

### Phase 2:
- "Today's Sky" panel — shows current date, planetary positions, active transits
- Calendar/birds-eye view toggle — grid showing events by era
- Stats bar (total events, year span, celestial types, categories)
- Dashboard entry points (clickable category cards that set filters)
- Cosmic Glossary modal (defines astrology terms for beginners)

### Future (Phase 3+):
- Live celestial data via Astronomy Engine JS library
- News integration via GDELT API
- AI interpretation layer connecting current sky to current news
- User accounts and saved views

## Event Data Schema
```json
{
  "year": 2020,
  "date": "2020",
  "celestialEvent": "Saturn-Pluto Conjunction in Capricorn at 22°",
  "celestialType": "conjunction",
  "symbol": "☌",
  "worldEvent": "COVID-19 Pandemic Emerges",
  "category": "pandemic",
  "description": "...",
  "cosmicLink": "...",
  "historicalParallel": "..."
}
```

### Categories: geopolitical, financial, scientific, cultural, religious, pandemic, deaths
### Celestial Types: eclipse, conjunction, opposition, square, retrograde, equinox, ingress
### Symbols: ◑ eclipse, ☌ conjunction, ☍ opposition, □ square, ℞ retrograde, ☀ equinox/ingress

## Inspiration
- **epsteinexposed.com** — dashboard-style homepage with big stats, clear entry points, person cards with tags, sectioned layout, tools grid. Use its information architecture for organizing complex data.
- **v1 of this app** — the editorial dark theme, starfield, ambient orbs, card breathing room.

## Key Principle
This is an editorial product, not a dashboard. Think: beautifully typeset magazine article about the cosmos, not a cluttered data tool. Every pixel of white space is intentional. Let the content breathe.
