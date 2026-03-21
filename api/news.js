// /api/news.js — Single broad query, sorted into editorial tags locally
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

// Hard junk filter
const JUNK_RE = /\b(film|movie|netflix|hulu|disney|streaming|box office|trailer|season \d|recipe|cooking|restaurant|nascar|nfl|nba|mlb|nhl|mls|football|soccer|cricket|tennis|golf|fifa|world cup|olympic|super bowl|champion|celebrity|entertainment|gossip|red carpet|gaming|video game|playstation|xbox|nintendo|horoscope|zodiac sign|astrology tip|weather forecast|travel deal|fashion|beauty|wedding|dating|relationship|real estate|mortgage|home decor|wordle|puzzle|crossword|trivia|stock pick|buy now|coupon|discount|obituar|in memoriam|podcast|episode|oscar|vanity fair|grammy|golden globe|bollywood|hollywood|kardashian|taylor swift|beyonc|tmz|page six|daily mail|tiktok dance|influencer|makeup|skincare|diet|weight loss|workout)\b/i;

// Each editorial tag: match keywords + transit mapping
const TAGS = {
  'iran':           { transit: 'saturn-neptune', match: ['iran', 'tehran', 'irgc', 'khamenei', 'persian gulf'] },
  'hormuz':         { transit: 'saturn-neptune', match: ['hormuz', 'oil price', 'barrel', 'energy crisis', 'opec', 'crude oil'] },
  'energy-markets': { transit: 'saturn-neptune', match: ['qatar', 'lng', 'natural gas', 'opec', 'energy market', 'pipeline', 'saudi', 'oil deal'] },
  'nato':           { transit: 'saturn-neptune', match: ['nato', 'european allies', 'atlantic alliance', 'military alliance'] },
  'brics':          { transit: 'saturn-neptune', match: ['brics', 'dollar', 'yuan', 'de-dollarization', 'reserve currency'] },
  'ukraine':        { transit: 'saturn-neptune', match: ['ukraine', 'kyiv', 'zelensky', 'donbas', 'donetsk', 'crimea'] },
  'gasoline':       { transit: 'saturn-neptune', match: ['gasoline', 'gas price', 'pump', 'fuel cost', 'gallon'] },
  'trade-tariffs':  { transit: 'saturn-neptune', match: ['tariff', 'trade war', 'sanctions', 'trade deal', 'import duty', 'protectionism'] },
  'diplomacy':      { transit: 'saturn-neptune', match: ['summit', 'bilateral', 'diplomatic', 'prime minister', 'foreign minister', 'state visit'] },
  'ai-regulation':  { transit: 'pluto-aquarius', match: ['ai regulation', 'ai governance', 'ai safety', 'ai law', 'ai act', 'regulate ai'] },
  'eu-ai':          { transit: 'pluto-aquarius', match: ['eu ai', 'european ai', 'ai act', 'ai compliance'] },
  'doge-cuts':      { transit: 'blood-moon', match: ['doge', 'federal workers', 'government cuts', 'layoffs', 'elon musk'] },
  'health':         { transit: 'blood-moon', match: ['health crisis', 'outbreak', 'contamination', 'disease', 'epidemic', 'recall'] },
  'quantum':        { transit: 'uranus-gemini', match: ['quantum', 'qubit', 'processor', 'supercomputing'] },
  'bitcoin':        { transit: 'uranus-gemini', match: ['bitcoin', 'btc', 'crypto', 'blockchain'] },
};

// Source credibility
const TRUSTED = ['reuters', 'associated press', 'bbc', 'al jazeera', 'guardian', 'financial times', 'bloomberg', 'economist', 'foreign policy', 'new york times', 'washington post', 'wall street journal', 'politico', 'npr', 'techcrunch', 'ars technica', 'wired', 'the verge', 'mit technology review', 'nature', 'science', 'new scientist'];

function isJunk(title, desc) {
  return JUNK_RE.test(title + ' ' + (desc || ''));
}

function matchScore(text, matchTerms) {
  const lower = text.toLowerCase();
  let score = 0;
  for (const term of matchTerms) {
    if (lower.includes(term)) score += 2;
  }
  return score;
}

function isSimilar(a, b) {
  const wa = new Set(a.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 3));
  const wb = new Set(b.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 3));
  let overlap = 0;
  wa.forEach(w => { if (wb.has(w)) overlap++; });
  return overlap >= Math.min(wa.size, wb.size) * 0.6;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Cache for 12 hours on CDN, serve stale for 24h while revalidating
  res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate=86400');

  if (!NEWSAPI_KEY) {
    return res.status(500).json({ error: 'NEWSAPI_KEY not configured' });
  }

  try {
    // ONE broad query instead of 15 separate ones
    const query = 'Iran OR NATO OR Ukraine OR BRICS OR tariff OR "oil price" OR OPEC OR Qatar OR "trade war" OR sanctions OR summit OR "AI regulation" OR DOGE OR "health crisis" OR quantum OR bitcoin OR crypto';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=100&apiKey=${NEWSAPI_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'error') {
      return res.status(200).json({
        updated: new Date().toISOString(),
        count: 0, stories: [], byTag: {},
        debug: { error: data.message || data.code },
      });
    }

    if (!data.articles || !data.articles.length) {
      return res.status(200).json({
        updated: new Date().toISOString(),
        count: 0, stories: [], byTag: {},
        debug: { error: 'No articles returned', totalResults: data.totalResults },
      });
    }

    // Sort each article into matching tags
    const allResults = {};
    const globalUsed = [];

    // Clean articles first
    const clean = data.articles
      .filter(a => a.title && a.title !== '[Removed]')
      .map(a => {
        const cleanTitle = a.title.replace(/\s*[-–—|].{0,30}$/, '').trim();
        return { ...a, cleanTitle };
      })
      .filter(a => a.cleanTitle.length >= 20)
      .filter(a => !isJunk(a.cleanTitle, a.description));

    // For each tag, find matching articles
    for (const [tagKey, config] of Object.entries(TAGS)) {
      const tagStories = [];

      for (const article of clean) {
        const text = article.cleanTitle + ' ' + (article.description || '');
        const relevance = matchScore(text, config.match);
        if (relevance < 2) continue;

        // Dedup globally
        if (globalUsed.some(t => isSimilar(t, article.cleanTitle))) continue;

        // Source boost
        const src = (article.source?.name || '').toLowerCase();
        const srcBonus = TRUSTED.some(t => src.includes(t)) ? 3 : 0;

        tagStories.push({
          text: article.cleanTitle,
          score: relevance + srcBonus,
          transit: config.transit,
          tag: tagKey,
          explain: (article.description || '').slice(0, 300),
          source: article.source?.name || '',
          url: article.url || '',
          publishedAt: article.publishedAt || '',
        });
      }

      // Sort by score, take top 3 per tag
      tagStories.sort((a, b) => b.score - a.score);
      const top = tagStories.slice(0, 3);
      top.forEach(s => globalUsed.push(s.text));
      if (top.length) allResults[tagKey] = top;
    }

    const stories = Object.values(allResults).flat();

    return res.status(200).json({
      updated: new Date().toISOString(),
      count: stories.length,
      stories,
      byTag: allResults,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
