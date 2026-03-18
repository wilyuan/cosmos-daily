// /api/news.js — Fetches headlines, categorizes by celestial transit, returns JSON
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

// Junk filter — reject articles matching these patterns
const JUNK_PATTERNS = [
  /\bfilm[s]?\b.*\bwatch\b/i, /\bmovie[s]?\b/i, /\bnetflix\b/i, /\bhulu\b/i, /\bdisney\+/i,
  /\bstreaming\b/i, /\bbox office\b/i, /\btrailer\b/i, /\bseason \d/i,
  /\brecipe[s]?\b/i, /\bcooking\b/i, /\brestaurant\b/i, /\bfood\b/i,
  /\bnascar\b/i, /\bnfl\b/i, /\bnba\b/i, /\bmlb\b/i, /\bnhl\b/i, /\bmls\b/i,
  /\bfootball\b/i, /\bsoccer\b/i, /\bcricket\b/i, /\btennis\b/i, /\bgolf\b/i,
  /\bfifa\b/i, /\bworld cup\b/i, /\bolympic/i, /\bsuper bowl\b/i, /\bchampion/i,
  /\bcelebrit/i, /\bentertainment\b/i, /\bgossip\b/i, /\bred carpet\b/i,
  /\bgaming\b/i, /\bvideo game/i, /\bplaystation\b/i, /\bxbox\b/i, /\bnintendo\b/i,
  /\bhoroscope\b/i, /\bzodiac sign\b/i, /\bastrology tip/i,
  /\bweather forecast\b/i, /\btravel deal/i, /\bbest [0-9]+ /i, /\btop [0-9]+ /i,
  /\bhow to\b.*\byour\b/i, /\btips for\b/i, /\breview:/i, /\bopinion:/i,
  /\bfashion\b/i, /\bbeauty\b/i, /\bwedding\b/i, /\bdating\b/i, /\brelationship/i,
  /\breal estate\b/i, /\bmortgage\b/i, /\bhome decor\b/i,
  /\bwordle\b/i, /\bpuzzle\b/i, /\bcrossword\b/i, /\btrivia\b/i,
  /\bstock pick/i, /\bbuy now\b/i, /\bdeal of/i, /\bcoupon/i, /\bdiscount/i,
  /\bobituari/i, /\bin memoriam\b/i,
  /\bpodcast\b/i, /\bepisode\b/i, /\binterview with\b/i,
  /\[\+\d+ chars\]/i, /\[removed\]/i,
  /\boscar\b/i, /\bvanity fair\b/i, /\bparty\b/i, /\bdrunk/i,
  /\bcalled.*nazi\b/i, /\bcelebrity feud/i,
  /\bpage six\b/i, /\btmz\b/i, /\bus weekly\b/i, /\bpeople magazine\b/i,
  /\baward show/i, /\bemmy/i, /\bgrammy/i, /\bgolden globe/i,
  /\bbollywood\b/i, /\bhollywood\b/i,
  /\bkardashian/i, /\btaylor swift\b/i, /\bbeyonc/i,
  /\bsale\b.*\boff\b/i, /\bpromo code\b/i,
];

function isJunk(title, desc) {
  const text = title + ' ' + (desc || '');
  return JUNK_PATTERNS.some(p => p.test(text));
}

// Quality score: articles must meet minimum to pass
// Higher pageSize = more candidates to filter from
const PAGE_SIZE = 20;

// Each transit has its own targeted search query and scoring rules
const TRANSIT_CONFIG = {
  'saturn-neptune': {
    queries: [
      '"Iran war" OR "Iran strikes" OR "Hormuz" OR "Khamenei"',
      '"NATO" AND ("fracture" OR "split" OR "refuse" OR "reject")',
      '"BRICS" AND ("dollar" OR "currency" OR "settlement" OR "de-dollarization")',
      '"Ukraine" AND ("peace talks" OR "ceasefire" OR "negotiations" OR "frozen")',
      '"oil price" AND ("surge" OR "spike" OR "crisis" OR "barrel")',
      '"sanctions" AND ("Iran" OR "Russia" OR "trade war")',
    ],
    keywords: [
      { term: 'iran', weight: 2 }, { term: 'hormuz', weight: 3 }, { term: 'khamenei', weight: 3 },
      { term: 'nato', weight: 2 }, { term: 'alliance', weight: 1 },
      { term: 'sanctions', weight: 2 }, { term: 'ceasefire', weight: 2 },
      { term: 'de-dollarization', weight: 3 }, { term: 'brics', weight: 2 },
      { term: 'oil crisis', weight: 3 }, { term: 'oil price', weight: 2 },
      { term: 'strait of hormuz', weight: 3 },
      { term: 'ukraine', weight: 1 }, { term: 'peace talks', weight: 2 },
      { term: 'geopolitical', weight: 2 }, { term: 'regime', weight: 1 },
      { term: 'institutional collapse', weight: 3 },
    ],
    minWeight: 4,
  },
  'pluto-aquarius': {
    queries: [
      '"AI regulation" OR "AI governance" OR "AI safety" OR "AI act"',
      '"surveillance" AND ("law" OR "government" OR "privacy")',
      '"DOGE" AND ("cuts" OR "government" OR "federal" OR "layoffs")',
      '"antitrust" AND ("Google" OR "Apple" OR "Meta" OR "Amazon" OR "tech")',
      '"data breach" OR "cybersecurity attack" OR "hack"',
      '"digital rights" OR "internet censorship" OR "social media ban"',
    ],
    keywords: [
      { term: 'ai regulation', weight: 3 }, { term: 'ai governance', weight: 3 },
      { term: 'ai safety', weight: 3 }, { term: 'ai act', weight: 3 },
      { term: 'surveillance', weight: 2 }, { term: 'privacy law', weight: 2 },
      { term: 'digital rights', weight: 3 }, { term: 'censorship', weight: 2 },
      { term: 'cybersecurity', weight: 2 }, { term: 'antitrust', weight: 2 },
      { term: 'tech monopol', weight: 3 }, { term: 'doge', weight: 2 },
      { term: 'deepfake law', weight: 3 }, { term: 'data breach', weight: 2 },
    ],
    minWeight: 3,
  },
  'blood-moon': {
    queries: [
      '"health crisis" OR "disease outbreak" OR "contamination" OR "recall"',
      '"whistleblower" OR "fraud exposed" OR "scandal" OR "cover-up"',
      '"infrastructure" AND ("failure" OR "collapse" OR "crisis" OR "crumbling")',
      '"government cuts" AND ("health" OR "safety" OR "workers" OR "hamper")',
      '"water contamination" OR "PFAS" OR "forever chemicals" OR "lead poisoning"',
      '"FDA recall" OR "food safety" OR "drug recall"',
    ],
    keywords: [
      { term: 'health crisis', weight: 3 }, { term: 'outbreak', weight: 2 },
      { term: 'contamination', weight: 3 }, { term: 'infrastructure fail', weight: 3 },
      { term: 'whistleblower', weight: 3 }, { term: 'fraud exposed', weight: 3 },
      { term: 'cover-up', weight: 3 }, { term: 'famine', weight: 3 },
      { term: 'federal workers', weight: 2 }, { term: 'scandal', weight: 2 },
      { term: 'recall', weight: 2 }, { term: 'public health', weight: 2 },
    ],
    minWeight: 3,
  },
  'uranus-gemini': {
    queries: [
      '"quantum computing" OR "quantum processor" OR "qubit"',
      '"OpenAI" OR "ChatGPT" OR "Claude AI" OR "Anthropic"',
      '"bitcoin" AND ("milestone" OR "mining" OR "halving" OR "regulation" OR "record")',
      '"misinformation" OR "disinformation" AND ("election" OR "AI" OR "deepfake")',
      '"Starlink" OR "satellite internet" OR "6G"',
      '"AI" AND ("breakthrough" OR "AGI" OR "superintelligence" OR "frontier model")',
    ],
    keywords: [
      { term: 'quantum comput', weight: 3 }, { term: 'qubit', weight: 3 },
      { term: 'openai', weight: 3 }, { term: 'chatgpt', weight: 3 },
      { term: 'bitcoin', weight: 2 }, { term: 'blockchain', weight: 2 },
      { term: 'misinformation', weight: 2 }, { term: 'disinformation', weight: 2 },
      { term: 'neural', weight: 2 }, { term: 'brain-computer', weight: 3 },
      { term: 'ai breakthrough', weight: 3 }, { term: 'starlink', weight: 2 },
    ],
    minWeight: 3,
  }
};

// Trusted sources get a score boost
const TRUSTED_SOURCES = [
  'reuters', 'associated press', 'bbc', 'al jazeera', 'the guardian',
  'financial times', 'bloomberg', 'the economist', 'foreign policy',
  'the new york times', 'washington post', 'wall street journal',
  'politico', 'abc news', 'cnn', 'nbc news', 'cbs news', 'npr',
  'techcrunch', 'ars technica', 'wired', 'the verge', 'mit technology review',
  'nature', 'science', 'new scientist', 'human rights watch', 'amnesty',
];

const TABLOID_SOURCES = [
  'page six', 'tmz', 'daily mail', 'the sun', 'new york post',
  'buzzfeed', 'huffpost', 'salon', 'breitbart', 'infowars',
];

function scoreArticle(title, description, config, sourceName) {
  const text = (title + ' ' + (description || '')).toLowerCase();
  let totalWeight = 0;
  for (const kw of config.keywords) {
    if (text.includes(kw.term.toLowerCase())) {
      totalWeight += kw.weight;
    }
  }

  // Source quality modifier
  const src = (sourceName || '').toLowerCase();
  if (TRUSTED_SOURCES.some(t => src.includes(t))) totalWeight += 2;
  if (TABLOID_SOURCES.some(t => src.includes(t))) totalWeight -= 3;

  return totalWeight;
}

// Fuzzy dedup — compare first 8 words
function isSimilar(a, b) {
  const wa = a.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).slice(0, 8).join(' ');
  const wb = b.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).slice(0, 8).join(' ');
  if (wa === wb) return true;
  // Check if one contains most of the other's words
  const setA = new Set(wa.split(' '));
  const setB = new Set(wb.split(' '));
  let overlap = 0;
  setA.forEach(w => { if (setB.has(w)) overlap++; });
  return overlap >= Math.min(setA.size, setB.size) * 0.75;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  if (!NEWSAPI_KEY) {
    return res.status(500).json({ error: 'NEWSAPI_KEY not configured' });
  }

  try {
    const allStories = {};
    const usedTitles = []; // Global dedup across transits

    for (const [transit, config] of Object.entries(TRANSIT_CONFIG)) {
      const transitStories = [];

      for (const q of config.queries) {
        try {
          const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=relevancy&pageSize=${PAGE_SIZE}&apiKey=${NEWSAPI_KEY}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.articles) {
            for (const article of data.articles) {
              if (!article.title || article.title === '[Removed]') continue;
              if (isJunk(article.title, article.description)) continue;

              const cleanTitle = article.title.replace(/\s*[-–—|].{0,30}$/, '').trim();
              if (cleanTitle.length < 20) continue;

              // Check if similar to already used title (across ALL transits)
              if (usedTitles.some(t => isSimilar(t, cleanTitle))) continue;

              const score = scoreArticle(article.title, article.description, config, article.source?.name);
              if (score >= config.minWeight) {
                transitStories.push({
                  text: cleanTitle,
                  score,
                  cat: transit === 'saturn-neptune' ? 'conflict' : transit === 'blood-moon' ? 'exposure' : 'tech',
                  transit,
                  explain: (article.description || '').slice(0, 300),
                  source: article.source?.name || '',
                  url: article.url || '',
                  publishedAt: article.publishedAt || '',
                });
                usedTitles.push(cleanTitle);
              }
            }
          }
        } catch (e) { /* skip failed query */ }
      }

      // Sort by score descending, take top 4
      transitStories.sort((a, b) => b.score - a.score);
      allStories[transit] = transitStories.slice(0, 4);
    }

    const stories = Object.values(allStories).flat();

    return res.status(200).json({
      updated: new Date().toISOString(),
      count: stories.length,
      stories
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
