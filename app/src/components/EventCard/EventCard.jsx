import { useState } from 'react';
import { TYPE_COLORS, TYPE_LABELS, TYPE_SYMBOLS, CATEGORY_LABELS, hexToRgb } from '../../utils/colors.js';
import './EventCard.css';

export default function EventCard({ event }) {
  const [expanded, setExpanded] = useState(false);

  const {
    year, date, celestialEvent, celestialType, symbol,
    worldEvent, category, description, cosmicLink, historicalParallel,
  } = event;

  const accent      = TYPE_COLORS[celestialType]  ?? '#C9A96E';
  const typeLabel   = TYPE_LABELS[celestialType]  ?? celestialType;
  const typeSym     = symbol || (TYPE_SYMBOLS[celestialType] ?? '');
  const catLabel    = CATEGORY_LABELS[category]   ?? category;
  const rgb         = hexToRgb(accent);

  const cssVars = {
    '--accent':        accent,
    '--accent-bg':     `rgba(${rgb}, 0.12)`,
    '--accent-border': `rgba(${rgb}, 0.35)`,
  };

  return (
    <article
      className={`event-card${expanded ? ' is-expanded' : ''}`}
      style={cssVars}
      onClick={() => setExpanded(e => !e)}
      role="button"
      aria-expanded={expanded}
    >
      {/* Top row: year + type badge + chevron */}
      <div className="card-top">
        <div className="card-year-row">
          <span className="card-year">{year < 0 ? `${Math.abs(year)} BC` : year}</span>
          <span className="card-type-badge">
            <span className="badge-symbol">{typeSym}</span>
            {typeLabel}
          </span>
        </div>
        <span className="card-chevron" aria-hidden="true">▾</span>
      </div>

      {/* Celestial event name */}
      <p className="card-celestial">{celestialEvent}</p>

      {/* World event title — the headline */}
      <h2 className="card-title">{worldEvent}</h2>

      {/* Category */}
      <span className="card-category">{catLabel}</span>

      {/* Description — clamped until expanded */}
      {description && (
        <div>
          <p className={`card-description${expanded ? '' : ' is-clamped'}`}>
            {description}
          </p>
          {!expanded && <span className="card-read-more">Read more ▾</span>}
        </div>
      )}

      {/* Expanded content */}
      {expanded && (
        <div className="card-expanded" onClick={e => e.stopPropagation()}>
          {cosmicLink && (
            <div className="expanded-section">
              <div className="cosmic-link-block">
                <span className="expanded-label">Cosmic Link</span>
                <p className="expanded-text">{cosmicLink}</p>
              </div>
            </div>
          )}

          {historicalParallel && (
            <div className="expanded-section">
              <span className="expanded-label">Historical Parallel</span>
              <p className="expanded-text">{historicalParallel}</p>
            </div>
          )}

          {date && date !== String(year) && (
            <p className="card-date">{date}</p>
          )}
        </div>
      )}
    </article>
  );
}
