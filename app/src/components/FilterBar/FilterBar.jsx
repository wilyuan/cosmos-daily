import {
  TYPE_COLORS, TYPE_LABELS, TYPE_SYMBOLS,
  CATEGORY_LABELS, ERA_RANGES, hexToRgb,
} from '../../utils/colors.js';
import './FilterBar.css';

const TYPES       = Object.keys(TYPE_LABELS);
const CATEGORIES  = Object.keys(CATEGORY_LABELS);
const ERAS        = Object.keys(ERA_RANGES);

export default function FilterBar({
  search, onSearch,
  activeCategory, onCategory,
  activeType, onType,
  activeEra, onEra,
  viewMode, onViewMode,
  totalCount, filteredCount,
  onReset,
}) {
  const hasFilters = search || activeCategory || activeType || activeEra;

  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="filter-search">
        <span className="filter-search-icon" aria-hidden="true">⌕</span>
        <input
          className="filter-search-input"
          type="search"
          placeholder="Search events, descriptions, historical parallels…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Category filter */}
      <div className="filter-group">
        <span className="filter-group-label">Category</span>
        <div className="filter-pills">
          <button
            className={`filter-pill${!activeCategory ? ' is-active-all' : ''}`}
            onClick={() => onCategory(null)}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-pill${activeCategory === cat ? ' is-active' : ''}`}
              style={activeCategory === cat ? {
                '--pill-color':  '#C9A96E',
                '--pill-bg':     'rgba(201,169,110,0.12)',
                '--pill-border': 'rgba(201,169,110,0.4)',
              } : {}}
              onClick={() => onCategory(activeCategory === cat ? null : cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Celestial type filter */}
      <div className="filter-group">
        <span className="filter-group-label">Celestial Type</span>
        <div className="filter-pills">
          <button
            className={`filter-pill${!activeType ? ' is-active-all' : ''}`}
            onClick={() => onType(null)}
          >
            All
          </button>
          {TYPES.map(type => {
            const color   = TYPE_COLORS[type];
            const rgb     = hexToRgb(color);
            const isActive = activeType === type;
            return (
              <button
                key={type}
                className={`filter-pill${isActive ? ' is-active' : ''}`}
                style={isActive ? {
                  '--pill-color':  color,
                  '--pill-bg':     `rgba(${rgb}, 0.12)`,
                  '--pill-border': `rgba(${rgb}, 0.4)`,
                } : {}}
                onClick={() => onType(isActive ? null : type)}
              >
                <span className="pill-symbol">{TYPE_SYMBOLS[type]}</span>
                {TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Era filter */}
      <div className="filter-group">
        <span className="filter-group-label">Era</span>
        <div className="filter-pills">
          <button
            className={`filter-pill${!activeEra ? ' is-active-all' : ''}`}
            onClick={() => onEra(null)}
          >
            All time
          </button>
          {ERAS.map(era => (
            <button
              key={era}
              className={`filter-pill${activeEra === era ? ' is-active-all' : ''}`}
              onClick={() => onEra(activeEra === era ? null : era)}
            >
              {ERA_RANGES[era].label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count + view toggle + reset */}
      <div className="filter-results-row">
        <span className="filter-results-count">
          Showing <strong>{filteredCount}</strong> of {totalCount} events
        </span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {hasFilters && (
            <button className="filter-reset" onClick={onReset}>
              Clear filters
            </button>
          )}
          <div className="view-toggle">
            <button
              className={`view-btn${viewMode === 'timeline' ? ' is-active' : ''}`}
              onClick={() => onViewMode('timeline')}
            >
              Timeline
            </button>
            <button
              className={`view-btn${viewMode === 'calendar' ? ' is-active' : ''}`}
              onClick={() => onViewMode('calendar')}
            >
              Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
