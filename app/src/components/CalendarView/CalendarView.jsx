import { useMemo } from 'react';
import { ERA_RANGES, TYPE_COLORS, TYPE_SYMBOLS, CATEGORY_LABELS, hexToRgb } from '../../utils/colors.js';
import './CalendarView.css';

export default function CalendarView({ events, onSelectEvent }) {
  const byEra = useMemo(() => {
    return Object.entries(ERA_RANGES).map(([eraKey, { label, min, max }]) => {
      const eraEvents = events
        .filter(e => e.year >= min && e.year <= max)
        .sort((a, b) => b.year - a.year);
      return { eraKey, label, min, max, events: eraEvents };
    }).filter(era => era.events.length > 0);
  }, [events]);

  if (byEra.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        No events match your current filters.
      </div>
    );
  }

  return (
    <div className="calendar-view">
      {byEra.map(({ eraKey, label, min, max, events: eraEvents }) => (
        <div key={eraKey} className="calendar-era">
          <div className="era-header">
            <span className="era-name">{label}</span>
            <span className="era-range">
              {min < 0 ? `${Math.abs(min)} BC` : min} – {max > 2500 ? 'present' : max}
            </span>
            <span className="era-count">{eraEvents.length} event{eraEvents.length !== 1 ? 's' : ''}</span>
          </div>

          {eraEvents.length > 0 ? (
            <div className="era-grid">
              {eraEvents.map((event, i) => {
                const accent = TYPE_COLORS[event.celestialType] ?? '#C9A96E';
                const symbol = event.symbol || (TYPE_SYMBOLS[event.celestialType] ?? '');
                const catLabel = CATEGORY_LABELS[event.category] ?? event.category;

                return (
                  <div
                    key={i}
                    className="cal-card"
                    style={{ '--accent': accent }}
                    onClick={() => onSelectEvent?.(event)}
                    title={event.worldEvent}
                  >
                    <div className="cal-year">
                      <span className="cal-symbol">{symbol}</span>
                      {event.year < 0 ? `${Math.abs(event.year)} BC` : event.year}
                    </div>
                    <p className="cal-title">{event.worldEvent}</p>
                    <p className="cal-category">{catLabel}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="era-empty">No events in this era match your filters.</p>
          )}
        </div>
      ))}
    </div>
  );
}
