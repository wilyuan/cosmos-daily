// /api/news.js — Fetches headlines, categorizes by celestial transit, returns JSON
// Called by Vercel cron daily + on-demand from frontend

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

// Transit themes for keyword matching
const TRANSIT_KEYWORDS = {
  'saturn-neptune': {
    keywords: ['war', 'iran', 'military', 'strike', 'nato', 'alliance', 'border', 'sanctions', 'currency', 'dollar', 'collapse', 'regime', 'dissolution', 'ceasefire', 'peace talks', 'oil price', 'hormuz', 'brics', 'de-dollarization', 'geopolitical', 'empire', 'institution', 'sovereignty', 'treaty'],
    categories: { war: 'conflict', military: 'conflict', strike: 'conflict', iran: 'conflict', nato: 'geopolitics', alliance: 'geopolitics', border: 'geopolitics', treaty: 'geopolitics', peace: 'geopolitics', ceasefire: 'geopolitics', dollar: 'financial', currency: 'financial', oil: 'energy', hormuz: 'energy', brics: 'financial' }
  },
  'pluto-aquarius': {
    keywords: ['ai regulation', 'artificial intelligence', 'surveillance', 'privacy', 'decentraliz', 'crypto regulation', 'tech power', 'social media ban', 'data law', 'antitrust tech', 'digital rights', 'ai governance', 'deepfake', 'ai safety'],
    categories: { ai: 'tech', artificial: 'tech', surveillance: 'tech', privacy: 'tech', crypto: 'financial', digital: 'tech', deepfake: 'tech', antitrust: 'tech' }
  },
  'blood-moon': {
    keywords: ['health crisis', 'infrastructure fail', 'contamination', 'scandal exposed', 'whistleblower', 'fraud', 'cover-up', 'recall', 'outbreak', 'famine', 'government cuts', 'budget cuts', 'doge cuts'],
    categories: { health: 'exposure', infrastructure: 'exposure', contamination: 'exposure', whistleblower: 'exposure', fraud: 'exposure', outbreak: 'exposure', famine: 'exposure', cuts: 'exposure' }
  },
  'uranus-gemini': {
    keywords: ['quantum', 'ai breakthrough', 'chatgpt', 'openai', 'bitcoin', 'blockchain', 'misinformation', 'deepfake', 'media disruption', 'social media', 'communication', '5g', '6g', 'satellite internet', 'neural', 'brain-computer'],
    categories: { quantum: 'tech', ai: 'tech', chatgpt: 'tech', openai: 'tech', bitcoin: 'financial', blockchain: 'financial', misinformation: 'tech', media: 'tech', neural: 'tech' }
  }
};

function categorizeHeadline(title, description) {
  const text = (title + ' ' + (description || '')).toLowerCase();

  for (const [transit, config] of Object.entries(TRANSIT_KEYWORDS)) {
    for (const keyword of config.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        // Find category
        let cat = 'geopolitics';
        for (const [catKey, catVal] of Object.entries(config.categories)) {
          if (text.includes(catKey.toLowerCase())) {
            cat = catVal;
            break;
          }
        }
        return { transit, cat };
      }
    }
  }
  return null;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  if (!NEWSAPI_KEY) {
    return res.status(500).json({ error: 'NEWSAPI_KEY not configured' });
  }

  try {
    // Fetch top headlines from multiple categories
    const queries = [
      'geopolitics OR war OR NATO OR sanctions',
      'artificial intelligence OR AI regulation OR quantum computing',
      'financial crisis OR bitcoin OR dollar OR BRICS',
      'health crisis OR infrastructure OR whistleblower'
    ];

    const allArticles = [];

    for (const q of queries) {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWSAPI_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.articles) {
        allArticles.push(...data.articles);
      }
    }

    // Deduplicate by title
    const seen = new Set();
    const unique = allArticles.filter(a => {
      if (!a.title || seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });

    // Categorize each article
    const categorized = [];
    for (const article of unique) {
      const match = categorizeHeadline(article.title, article.description);
      if (match) {
        categorized.push({
          text: article.title.replace(/ - .*$/, '').trim(), // Remove source suffix
          cat: match.cat,
          transit: match.transit,
          explain: article.description || article.title,
          source: article.source?.name || '',
          url: article.url || '',
          publishedAt: article.publishedAt || '',
        });
      }
    }

    // Limit to top stories per transit (max 4 each)
    const result = {};
    for (const item of categorized) {
      if (!result[item.transit]) result[item.transit] = [];
      if (result[item.transit].length < 4) {
        result[item.transit].push(item);
      }
    }

    // Flatten to array
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
