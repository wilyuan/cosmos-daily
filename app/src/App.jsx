import { useState } from 'react';
import rawEvents from './data/events.json';

import Starfield        from './components/Starfield/Starfield.jsx';
import TodaysSky        from './components/TodaysSky/TodaysSky.jsx';
import GlossaryModal    from './components/GlossaryModal/GlossaryModal.jsx';

import './App.css';

const ALL_EVENTS = rawEvents
  .map((e, i) => ({ ...e, _id: i }))
  .sort((a, b) => b.year - a.year);

const TOTAL_COUNT = ALL_EVENTS.length;
const YEAR_SPAN   = Math.abs(ALL_EVENTS[0].year - ALL_EVENTS[ALL_EVENTS.length - 1].year);

export default function App() {
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="app-bg">
      <Starfield />
      <div className="orb orb-red"   aria-hidden="true" />
      <div className="orb orb-purple" aria-hidden="true" />

      <div className="app-content">

        {/* Header */}
        <header className="header">
          <p className="header-eyebrow">Mundane Astrology</p>
          <h1 className="header-title">Cosmos Daily</h1>
          <p className="header-tagline">
            When the sky moves, history follows. {TOTAL_COUNT} celestial events mapped
            across {YEAR_SPAN.toLocaleString()} years of human history.
          </p>
        </header>

        {/* Celestial Map */}
        <TodaysSky />

        {/* Footer */}
        <footer className="footer">
          <p className="footer-disclaimer">
            Cosmos Daily presents correlations between celestial mechanics and world events
            through the lens of mundane astrology. Correlation is not causation.
          </p>
          <p className="footer-credit">Cosmos Daily</p>
        </footer>

      </div>

      <GlossaryModal isOpen={showGlossary} onClose={() => setShowGlossary(false)} />
    </div>
  );
}
