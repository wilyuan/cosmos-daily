// /api/news.js — Fetches headlines, categorizes by celestial transit, returns JSON
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

// Junk filter — reject articles matching these patterns
const JUNK_PATTERNS = [
  /\bfilm[s]?\b.*\bwatch\b/i, /\bmovie[s]?\b/i, /\bnetflix\b/i, /\bstreaming\b/i,
  /\brecipe[s]?\b/i, /\bcooking\b/i, /\bsport[s]?\b/i, /\bnascar\b/i, /\bnfl\b/i,
  /\bnba\b/i, /\bmlb\b/i, /\bfootball\b/i, /\bsoccer\b/i, /\bcricket\b/i,
  /\bcelebrit/i, /\bentertainment\b/i, /\bgossip\b/i, /\bred carpet\b/i,
  /\bgaming\b/i, /\bvideo game/i, /\bplaystation\b/i, /\bxbox\b/i,
  /\bhoroscope\b/i, /\bzodiac sign\b/i, /\bastrology tip/i,
  /\bweather forecast\b/i, /\btravel deal/i, /\bbest [0-9]+ /i,
  /\bhow to\b.*\byour\b/i, /\btips for\b/i, /\breview:/i,
];

// Require at least 2 keyword matches for saturn-neptune (too many false positives with single 'war')
const TRANSIT_RULES = {
  'saturn-neptune': {
    keywords: [
      { term: 'iran', weight: 3 }, { term: 'hormuz', weight: 3 }, { term: 'khamenei', weight: 3 },
      { term: 'nato', weight: 2 }, { term: 'alliance fracture', weight: 3 },
      { term: 'sanctions', weight: 2 }, { term: 'ceasefire', weight: 2 }, { term: 'peace talks', weight: 2 },
      { term: 'de-dollarization', weight: 3 }, { term: 'brics', weight: 2 },
      { term: 'oil price', weight: 2 }, { term: 'oil crisis', weight: 3 },
      { term: 'dollar', weight: 1 }, { term: 'currency', weight: 1 },
      { term: 'regime', weight: 1 }, { term: 'military strike', weight: 2 },
      { term: 'geopolitical', weight: 2 }, { term: 'sovereignty', weight: 2 },
      { term: 'border', weight: 1 }, { term: 'treaty', weight: 2 },
      { term: 'institutional collapse', weight: 3 }, { term: 'empire', weight: 1 },
      { term: 'ukraine', weight: 2 }, { term: 'russia', weight: 1 },
    ],
    minWeight: 3,
    cat: 'conflict'
  },
  'pluto-aquarius': {
    keywords: [
      { term: 'ai regulation', weight: 3 }, { term: 'ai governance', weight: 3 },
      { term: 'artificial intelligence', weight: 2 }, { term: 'ai safety', weight: 3 },
      { term: 'surveillance', weight: 2 }, { term: 'privacy law', weight: 2 },
      { term: 'data law', weight: 2 }, { term: 'digital rights', weight: 3 },
      { term: 'antitrust', weight: 2 }, { term: 'tech monopol', weight: 3 },
      { term: 'crypto regulation', weight: 3 }, { term: 'decentraliz', weight: 2 },
      { term: 'deepfake', weight: 2 }, { term: 'censorship', weight: 2 },
      { term: 'cybersecurity', weight: 2 }, { term: 'doge', weight: 2 },
    ],
    minWeight: 3,
    cat: 'tech'
  },
  'blood-moon': {
    keywords: [
      { term: 'health crisis', weight: 3 }, { term: 'outbreak', weight: 2 },
      { term: 'contamination', weight: 3 }, { term: 'infrastructure fail', weight: 3 },
      { term: 'whistleblower', weight: 3 }, { term: 'fraud exposed', weight: 3 },
      { term: 'cover-up', weight: 3 }, { term: 'recall', weight: 2 },
      { term: 'famine', weight: 3 }, { term: 'budget cuts', weight: 2 },
      { term: 'government cuts', weight: 2 }, { term: 'federal workers', weight: 2 },
      { term: 'scandal', weight: 2 }, { term: 'exposed', weight: 1 },
    ],
    minWeight: 3,
    cat: 'exposure'
  },
  'uranus-gemini': {
    keywords: [
      { term: 'quantum comput', weight: 3 }, { term: 'quantum', weight: 2 },
      { term: 'openai', weight: 3 }, { term: 'chatgpt', weight: 3 },
      { term: 'bitcoin', weight: 2 }, { term: 'blockchain', weight: 2 },
      { term: 'misinformation', weight: 2 }, { term: 'disinformation', weight: 2 },
      { term: 'neural', weight: 2 }, { term: 'brain-computer', weight: 3 },
      { term: 'satellite internet', weight: 3 }, { term: 'starlink', weight: 2 },
      { term: 'media disruption', weight: 3 }, { term: 'ai breakthrough', weight: 3 },
    ],
    minWeight: 3,
    cat: 'tech'
  }
};

function isJunk(title) {
  return JUNK_PATTERNS.some(p => p.test(title));
}

function categorizeHeadline(title, description) {
  if (isJunk(title)) return null;
  const text = (title + ' ' + (description || '')).toLowerCase();

  let bestTransit = null;
  let bestWeight = 0;
  let bestCat = 'geopolitics';

  for (const [transit, config] of Object.entries(TRANSIT_RULES)) {
    let totalWeight = 0;
    for (const kw of config.keywords) {
      if (text.includes(kw.term.toLowerCase())) {
        totalWeight += kw.weight;
      }
    }
    if (totalWeight >= config.minWeight && totalWeight > bestWeight) {
      bestWeight = totalWeight;
      bestTransit = transit;
      bestCat = config.cat;
    }
  }

  return bestTransit ? { transit: bestTransit, cat: bestCat } : null;
}

// Deduplicate similar titles (Levenshtein-like check)
function isSimilar(a, b) {
  const wordsA = a.toLowerCase().split(/\s+/).slice(0, 6).join(' ');
  const wordsB = b.toLowerCase().split(/\s+/).slice(0, 6).join(' ');
  return wordsA === wordsB;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  if (!NEWSAPI_KEY) {
    return res.status(500).json({ error: 'NEWSAPI_KEY not configured' });
  }

  try {
    const queries = [
      'Iran war OR Hormuz OR NATO OR sanctions OR BRICS OR de-dollarization',
      'AI regulation OR AI governance OR quantum computing OR OpenAI',
      'health crisis OR infrastructure failure OR whistleblower OR fraud exposed',
      'bitcoin OR quantum computing OR misinformation OR AI breakthrough'
    ];

    const allArticles = [];
    for (const q of queries) {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${NEWSAPI_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) allArticles.push(...data.articles);
    }

    // Deduplicate
    const seen = [];
    const unique = allArticles.filter(a => {
      if (!a.title || a.title === '[Removed]') return false;
      if (seen.some(s => isSimilar(s, a.title))) return false;
      seen.push(a.title);
      return true;
    });

    // Categorize
    const categorized = [];
    for (const article of unique) {
      const match = categorizeHeadline(article.title, article.description);
      if (match) {
        const cleanTitle = article.title.replace(/ [-–—|].*$/, '').trim();
        if (cleanTitle.length < 15) continue; // Skip very short titles
        categorized.push({
          text: cleanTitle,
          cat: match.cat,
          transit: match.transit,
          explain: (article.description || '').slice(0, 300),
          source: article.source?.name || '',
          url: article.url || '',
          publishedAt: article.publishedAt || '',
        });
      }
    }

    // Max 3 per transit
    const result = {};
    for (const item of categorized) {
      if (!result[item.transit]) result[item.transit] = [];
      if (result[item.transit].length < 3) {
        result[item.transit].push(item);
      }
    }

    const stories = Object.values(result).flat();
    return res.status(200).json({
      updated: new Date().toISOString(),
      count: stories.length,
      stories
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
