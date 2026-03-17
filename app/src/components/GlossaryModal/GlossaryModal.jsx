import { useEffect } from 'react';
import { TYPE_COLORS, TYPE_LABELS, TYPE_SYMBOLS, CATEGORY_LABELS } from '../../utils/colors.js';
import './GlossaryModal.css';

const CELESTIAL_TERMS = [
  {
    type: 'conjunction',
    def: 'Two or more planets occupy the same degree of the zodiac. Energy merges and amplifies — themes of both planets combine and intensify. Often marks beginnings of new cycles.',
  },
  {
    type: 'opposition',
    def: 'Planets sit 180° apart, facing each other across the zodiac. Tension between opposing forces reaches maximum visibility. Often correlates with crises, revelations, and culminations.',
  },
  {
    type: 'square',
    def: 'Planets sit 90° apart, creating friction and conflict. The most dynamic and challenging aspect — forces in conflict demanding resolution. Correlates with wars, crashes, and upheaval.',
  },
  {
    type: 'eclipse',
    def: 'The Sun (identity, leadership) or Moon (the public, emotions) is temporarily obscured. Eclipses accelerate change, end eras, and force events into the open. Effects last months.',
  },
  {
    type: 'retrograde',
    def: 'A planet appears to move backward from Earth\'s vantage point. Associated with revision, return, and reconsideration of that planet\'s themes. Mercury retrograde affects communication; Saturn retrograde, structures.',
  },
  {
    type: 'equinox',
    def: 'The Sun crosses the celestial equator, marking seasonal turning points. Spring equinox (0° Aries) is the astrological new year and the "world axis" — considered especially potent in mundane astrology.',
  },
  {
    type: 'ingress',
    def: 'A planet enters a new zodiac sign for the first time in years (or decades). Shifts the archetypal theme of that planet into the qualities of the new sign. Uranus ingresses take 84 years to complete.',
  },
];

const ASTROLOGICAL_CONCEPTS = [
  {
    term: 'Mundane Astrology',
    def: 'The branch of astrology mapping celestial cycles to world events — politics, economics, natural disasters, pandemics — rather than personal birth charts. Practiced since ancient Babylon.',
  },
  {
    term: 'Planetary Cycle',
    def: 'The time it takes two planets to complete a full loop from conjunction to conjunction. Saturn-Pluto: ~35 years. Saturn-Neptune: ~36 years. Jupiter-Saturn: ~20 years.',
  },
  {
    term: 'World Axis (0° Aries)',
    def: 'The first degree of Aries — the spring equinox point. Considered the most sensitive degree in mundane astrology. Any planet at 0° Aries is thought to affect global events directly.',
  },
  {
    term: 'Orb',
    def: 'The degree of allowable separation between two planets for an aspect to be considered active. Tighter orbs = more precise correlations. Major historical events often coincide with aspects within 1–2°.',
  },
];

export default function GlossaryModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="glossary-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Cosmic Glossary"
    >
      <div className="glossary-panel">
        <div className="glossary-header">
          <div>
            <p className="glossary-header-title">Cosmic Glossary</p>
            <p className="glossary-header-sub">A field guide to celestial mechanics</p>
          </div>
          <button className="glossary-close" onClick={onClose} aria-label="Close glossary">
            ✕
          </button>
        </div>

        <div className="glossary-body">
          {/* Celestial event types */}
          <section className="glossary-section">
            <h3 className="glossary-section-title">Celestial Event Types</h3>
            <div className="glossary-terms">
              {CELESTIAL_TERMS.map(({ type, def }) => (
                <div
                  key={type}
                  className="glossary-term-item"
                  style={{ '--term-color': TYPE_COLORS[type] }}
                >
                  <div className="glossary-term-label">
                    <span className="glossary-term-symbol">{TYPE_SYMBOLS[type]}</span>
                    <span className="glossary-term-name">{TYPE_LABELS[type]}</span>
                  </div>
                  <p className="glossary-term-def">{def}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Astrological concepts */}
          <section className="glossary-section">
            <h3 className="glossary-section-title">Key Concepts</h3>
            <div className="glossary-terms">
              {ASTROLOGICAL_CONCEPTS.map(({ term, def }) => (
                <div key={term} className="glossary-term-item">
                  <div className="glossary-term-label">
                    <span className="glossary-term-name">{term}</span>
                  </div>
                  <p className="glossary-term-def">{def}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="glossary-section">
            <h3 className="glossary-section-title">Event Categories</h3>
            <div className="glossary-categories">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <span key={key} className="glossary-cat">{label}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
