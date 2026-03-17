import { useState, useMemo } from 'react';
import rawEvents from './data/events.json';
import { ERA_RANGES, CATEGORY_LABELS, getEraForYear } from './utils/colors.js';

import Starfield        from './components/Starfield/Starfield.jsx';
import EventCard        from './components/EventCard/EventCard.jsx';
import FilterBar        from './components/FilterBar/FilterBar.jsx';
import TodaysSky        from './components/TodaysSky/TodaysSky.jsx';
import GlossaryModal    from './components/GlossaryModal/GlossaryModal.jsx';
import CalendarView     from './components/CalendarView/CalendarView.jsx';

import './App.css';

// Deduplicate & sort descending by year
const ALL_EVENTS = rawEvents
  .map((e, i) => ({ ...e, _id: i }))
  .sort((a, b) => b.year - a.year);

// Derived stats
const TOTAL_COUNT    = ALL_EVENTS.length;
const YEAR_SPAN      = Math.abs(ALL_EVENTS[0].year - ALL_EVENTS[ALL_EVENTS.length - 1].year);
const UNIQUE_TYPES   = [...new Set(ALL_EVENTS.map(e => e.celestialType))].length;
const UNIQUE_CATS    = [...new Set(ALL_EVENTS.map(e => e.category))].length;

function matchesSearch(event, query) {
  const q = query.toLowerCase();
  return (
    event.worldEvent?.toLowerCase().includes(q) ||
    event.celestialEvent?.toLowerCase().includes(q) ||
    event.description?.toLowerCase().includes(q) ||
    event.historicalParallel?.toLowerCase().includes(q) ||
    String(event.year).includes(q)
  );
}

function categoryCountMap(events) {
  const map = {};
  events.forEach(e => {
    map[e.category] = (map[e.category] ?? 0) + 1;
  });
  return map;
}

export default function App() {
  const [search,          setSearch]         = useState('');
  const [activeCategory,  setActiveCategory]  = useState(null);
  const [activeType,      setActiveType]      = useState(null);
  const [activeEra,       setActiveEra]       = useState(null);
  const [showGlossary,    setShowGlossary]    = useState(false);
  const [viewMode,        setViewMode]        = useState('timeline');

  const filteredEvents = useMemo(() => {
    return ALL_EVENTS
      .filter(e => !activeCategory || e.category === activeCategory)
      .filter(e => !activeType     || e.celestialType === activeType)
      .filter(e => {
        if (!activeEra) return true;
        const { min, max } = ERA_RANGES[activeEra];
        return e.year >= min && e.year <= max;
      })
      .filter(e => !search || matchesSearch(e, search));
  }, [search, activeCategory, activeType, activeEra]);

  const catCounts = useMemo(() => categoryCountMap(ALL_EVENTS), []);

  function resetFilters() {
    setSearch('');
    setActiveCategory(null);
    setActiveType(null);
    setActiveEra(null);
  }

  // When a CalendarView card is clicked, switch to timeline + scroll to top
  function handleSelectEvent(event) {
    setViewMode('timeline');
    setActiveCategory(event.category);
    setActiveEra(getEraForYear(event.year));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-bg">
      <Starfield />
      <div className="orb orb-red"   aria-hidden="true" />
      <div className="orb orb-purple" aria-hidden="true" />

      <div className="app-content">

        {/* ── Header ── */}
        <header className="header">
          <p className="header-eyebrow">Mundane Astrology · Historical Record</p>
          <h1 className="header-title">Cosmos Daily</h1>
          <p className="header-tagline">
            When the sky moves, history follows. {TOTAL_COUNT} celestial events mapped
            across {YEAR_SPAN.toLocaleString()} years of human history.
          </p>
          <div className="header-divider" />
        </header>

        {/* ── Stats bar ── */}
        <div className="stats-bar" role="region" aria-label="Collection statistics">
          <div className="stat-item">
            <span className="stat-number">{TOTAL_COUNT}</span>
            <span className="stat-label">Events</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{YEAR_SPAN.toLocaleString()}</span>
            <span className="stat-label">Years spanned</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{UNIQUE_TYPES}</span>
            <span className="stat-label">Celestial types</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{UNIQUE_CATS}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>

        {/* ── Today's Sky ── */}
        <TodaysSky events={ALL_EVENTS} />

        {/* ── Category dashboard chips ── */}
        <div className="category-dash" role="region" aria-label="Browse by category">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={`cat-chip${activeCategory === key ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(prev => prev === key ? null : key)}
              aria-pressed={activeCategory === key}
            >
              <span className="cat-chip-count">{catCounts[key] ?? 0}</span>
              <span className="cat-chip-label">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Glossary trigger ── */}
        <div className="glossary-trigger">
          <button className="glossary-btn" onClick={() => setShowGlossary(true)}>
            ✦ Cosmic Glossary
          </button>
        </div>

        {/* ── Filter bar ── */}
        <FilterBar
          search={search}              onSearch={setSearch}
          activeCategory={activeCategory} onCategory={setActiveCategory}
          activeType={activeType}         onType={setActiveType}
          activeEra={activeEra}           onEra={setActiveEra}
          viewMode={viewMode}             onViewMode={setViewMode}
          totalCount={TOTAL_COUNT}
          filteredCount={filteredEvents.length}
          onReset={resetFilters}
        />

        {/* ── Main content ── */}
        <p className="section-heading">
          {viewMode === 'timeline' ? 'Event Timeline' : 'Era Overview'}
        </p>

        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">◌</div>
            <p className="empty-state-text">No events match your filters.</p>
            <p className="empty-state-sub">Try clearing some filters to see more results.</p>
          </div>
        ) : viewMode === 'timeline' ? (
          <div className="timeline">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <CalendarView
            events={filteredEvents}
            onSelectEvent={handleSelectEvent}
          />
        )}

        {/* ── Footer ── */}
        <footer className="footer">
          <p className="footer-disclaimer">
            Cosmos Daily presents correlations between celestial mechanics and world events
            through the lens of mundane astrology. This is a research and pattern-recognition
            tool — not predictive or causal. Correlation is not causation.
          </p>
          <p className="footer-credit">Cosmos Daily · Celestial Mechanics × World Events</p>
        </footer>

      </div>

      <GlossaryModal isOpen={showGlossary} onClose={() => setShowGlossary(false)} />
    </div>
  );
}
