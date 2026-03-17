export const TYPE_COLORS = {
  eclipse:     '#E84545',
  conjunction: '#C9A96E',
  opposition:  '#E8A545',
  square:      '#5B8FB9',
  retrograde:  '#8B7EC7',
  equinox:     '#7ECBA1',
  ingress:     '#D4A574',
};

export const TYPE_LABELS = {
  eclipse:     'Eclipse',
  conjunction: 'Conjunction',
  opposition:  'Opposition',
  square:      'Square',
  retrograde:  'Retrograde',
  equinox:     'Equinox',
  ingress:     'Ingress',
};

export const TYPE_SYMBOLS = {
  eclipse:     '◑',
  conjunction: '☌',
  opposition:  '☍',
  square:      '□',
  retrograde:  '℞',
  equinox:     '☀',
  ingress:     '→',
};

export const CATEGORY_LABELS = {
  geopolitical: 'Geopolitical',
  financial:    'Financial',
  scientific:   'Scientific',
  cultural:     'Cultural',
  religious:    'Religious',
  pandemic:     'Pandemic',
  deaths:       'Deaths',
};

export const ERA_RANGES = {
  ancient:       { label: 'Ancient',       min: -9999, max: 500  },
  medieval:      { label: 'Medieval',      min: 501,   max: 1400 },
  'early-modern':{ label: 'Early Modern',  min: 1401,  max: 1800 },
  modern:        { label: 'Modern',        min: 1801,  max: 1950 },
  contemporary:  { label: 'Contemporary',  min: 1951,  max: 9999 },
};

export function getTypeColor(celestialType) {
  return TYPE_COLORS[celestialType] || '#C9A96E';
}

export function getEraForYear(year) {
  return Object.entries(ERA_RANGES).find(
    ([, { min, max }]) => year >= min && year <= max
  )?.[0] ?? 'contemporary';
}

export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
