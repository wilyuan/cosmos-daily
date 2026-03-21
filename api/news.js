// /api/news.js — Fetches headlines, matches to specific editorial tags
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

// Hard junk filter
const JUNK_RE = /\b(film|movie|netflix|hulu|disney|streaming|box office|trailer|season \d|recipe|cooking|restaurant|nascar|nfl|nba|mlb|nhl|mls|football|soccer|cricket|tennis|golf|fifa|world cup|olympic|super bowl|champion|celebrity|entertainment|gossip|red carpet|gaming|video game|playstation|xbox|nintendo|horoscope|zodiac sign|astrology tip|weather forecast|travel deal|fashion|beauty|wedding|dating|relationship|real estate|mortgage|home decor|wordle|puzzle|crossword|trivia|stock pick|buy now|coupon|discount|obituar|in memoriam|podcast|episode|oscar|vanity fair|grammy|golden globe|bollywood|hollywood|kardashian|taylor swift|beyonc|tmz|page six|daily mail|tiktok dance|influencer|makeup|skincare|diet|weight loss|workout)\b/i;

// Each editorial tag has its own search terms for matching news
const TAG_SEARCHES = {
  // Saturn-Neptune tags
  'iran': { query: '"Iran" AND ("strike" OR "war" OR "attack" OR "military")', transit: 'saturn-neptune', match: ['iran', 'tehran', 'irgc', 'khamenei', 'persian gulf'] },
  'hormuz': { query: '"Strait of Hormuz" OR "oil crisis" OR "oil supply" OR "energy crisis"', transit: 'saturn-neptune', match: ['hormuz', 'oil price', 'barrel', 'energy crisis', 'opec', 'crude'] },
  'nato': { query: '"NATO" AND ("split" OR "fracture" OR "refuse" OR "reject" OR "alliance")', transit: 'saturn-neptune', match: ['nato', 'european allies', 'atlantic alliance', 'military alliance'] },
  'brics': { query: '"BRICS" OR "de-dollarization" OR "dollar decline" OR "yuan"', transit: 'saturn-neptune', match: ['brics', 'dollar', 'yuan', 'de-dollarization', 'reserve currency'] },
  'ukraine': { query: '"Ukraine" AND ("peace" OR "ceasefire" OR "negotiations" OR "war")', transit: 'saturn-neptune', match: ['ukraine', 'kyiv', 'zelensky', 'donbas', 'donetsk'] },
  'gasoline': { query: '"gasoline price" OR "gas prices" OR "fuel cost" OR "pump price"', transit: 'saturn-neptune', match: ['gasoline', 'gas price', 'pump', 'fuel cost', 'gallon'] },
  'energy-markets': { query: '"energy market" OR "Qatar" OR "LNG" OR "natural gas" OR "OPEC" AND ("deal" OR "supply" OR "crisis")', transit: 'saturn-neptune', match: ['qatar', 'lng', 'natural gas', 'opec', 'energy market', 'pipeline', 'saudi'] },
  'trade-tariffs': { query: '"tariff" OR "trade war" OR "sanctions" OR "trade deal" OR "import duty"', transit: 'saturn-neptune', match: ['tariff', 'trade war', 'sanctions', 'trade deal', 'import', 'export', 'protectionism'] },
  'diplomacy': { query: '"summit" OR "diplomatic" OR "bilateral" OR "foreign minister" OR "prime minister" AND ("talks" OR "meeting" OR "agreement")', transit: 'saturn-neptune', match: ['summit', 'bilateral', 'diplomatic', 'prime minister', 'foreign minister', 'state visit', 'talks'] },
  // Pluto-Aquarius tags
  'ai-regulation': { query: '"AI regulation" OR "AI governance" OR "AI safety" OR "AI law"', transit: 'pluto-aquarius', match: ['ai regulation', 'ai governance', 'ai safety', 'ai law', 'ai act', 'regulate ai'] },
  'eu-ai': { query: '"EU AI Act" OR "European AI" OR "AI compliance"', transit: 'pluto-aquarius', match: ['eu ai', 'european ai', 'ai act', 'ai compliance', 'brussels'] },
  // Blood Moon tags
  'doge-cuts': { query: '"DOGE" AND ("cuts" OR "layoffs" OR "federal" OR "government")', transit: 'blood-moon', match: ['doge', 'federal workers', 'government cuts', 'layoffs', 'elon musk'] },
  'health': { query: '"public health crisis" OR "disease outbreak" OR "contamination" OR "health emergency"', transit: 'blood-moon', match: ['health crisis', 'outbreak', 'contamination', 'disease', 'epidemic', 'recall', 'pfas', 'forever chemicals'] },
  // Uranus-Gemini tags
  'quantum': { query: '"quantum computing" OR "quantum processor" OR "qubit" OR "quantum breakthrough"', transit: 'uranus-gemini', match: ['quantum', 'qubit', 'processor', 'supercomputing'] },
  'bitcoin': { query: '"bitcoin" AND ("price" OR "mining" OR "milestone" OR "regulation" OR "crypto")', transit: 'uranus-gemini', match: ['bitcoin', 'btc', 'crypto', 'blockchain', 'mining'] },
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
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  if (!NEWSAPI_KEY) {
    return res.status(500).json({ error: 'NEWSAPI_KEY not configured' });
  }

  try {
    const allResults = {};
    const globalUsed = []; // Prevent same story across tags
    const debug = { queries: 0, totalArticles: 0, filtered: 0, matched: 0, errors: [] };

    for (const [tagKey, config] of Object.entries(TAG_SEARCHES)) {
      try {
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(config.query)}&language=en&sortBy=relevancy&pageSize=15&apiKey=${NEWSAPI_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        debug.queries++;

        if (data.status === 'error') {
          debug.errors.push({ tag: tagKey, error: data.message || data.code });
          continue;
        }

        if (!data.articles) continue;
        debug.totalArticles += data.articles.length;

        const tagStories = [];
        for (const article of data.articles) {
          if (!article.title || article.title === '[Removed]') continue;

          const cleanTitle = article.title.replace(/\s*[-–—|].{0,30}$/, '').trim();
          if (cleanTitle.length < 20) continue;
          if (isJunk(cleanTitle, article.description)) continue;

          // Must match tag-specific keywords
          const relevance = matchScore(cleanTitle + ' ' + (article.description || ''), config.match);
          if (relevance < 2) continue;

          // Dedup globally
          if (globalUsed.some(t => isSimilar(t, cleanTitle))) continue;

          // Source boost
          const src = (article.source?.name || '').toLowerCase();
          const srcBonus = TRUSTED.some(t => src.includes(t)) ? 3 : 0;

          tagStories.push({
            text: cleanTitle,
            score: relevance + srcBonus,
            transit: config.transit,
            tag: tagKey,
            explain: (article.description || '').slice(0, 300),
            source: article.source?.name || '',
            url: article.url || '',
            publishedAt: article.publishedAt || '',
          });
        }

        // Sort by score, take top 3 unique per tag
        tagStories.sort((a, b) => b.score - a.score);
        const top = tagStories.slice(0, 3);
        top.forEach(s => globalUsed.push(s.text));
        if (top.length) allResults[tagKey] = top;

      } catch (e) { debug.errors.push({ tag: tagKey, error: e.message }); }
    }

    // Flatten all stories
    const stories = Object.values(allResults).flat();

    return res.status(200).json({
      updated: new Date().toISOString(),
      count: stories.length,
      stories,
      byTag: allResults,
      debug,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
