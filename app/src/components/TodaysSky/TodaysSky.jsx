import { useMemo } from 'react';
import { TYPE_COLORS, TYPE_SYMBOLS, CATEGORY_LABELS } from '../../utils/colors.js';
import './TodaysSky.css';

const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();

function formatDate(d) {
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function TodaysSky({ events }) {
  // Pull events from the current and previous year as "active" transits
  const activeTransits = useMemo(() => {
    return events
      .filter(e => e.year >= CURRENT_YEAR - 1 && e.year <= CURRENT_YEAR + 1)
      .slice(0, 4);
  }, [events]);

  if (activeTransits.length === 0) return null;

  return (
    <section className="todays-sky">
      <div className="sky-header">
        <span className="sky-title">
          <span className="sky-live-dot" aria-hidden="true" />
          Active Sky
        </span>
        <span className="sky-date">{formatDate(TODAY)}</span>
      </div>

      <div className="sky-transits">
        {activeTransits.map((event, i) => {
          const color  = TYPE_COLORS[event.celestialType] ?? '#C9A96E';
          const symbol = event.symbol || (TYPE_SYMBOLS[event.celestialType] ?? '');
          return (
            <div
              key={i}
              className="sky-transit"
              style={{ '--transit-color': color }}
            >
              <span className="transit-symbol" aria-hidden="true">{symbol}</span>
              <div className="transit-body">
                <p className="transit-celestial">{event.celestialEvent}</p>
                <p className="transit-world">{event.worldEvent}</p>
                <span className="transit-tag">
                  {CATEGORY_LABELS[event.category] ?? event.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="sky-note">
        These transits are active in the current sky. Mundane astrology interprets
        planetary positions as correlating with — not causing — world events.
      </p>
    </section>
  );
}
