# Cosmos Daily — Launch Guide

## 1. NAME IDEAS

"Cosmos Daily" works but sounds like a news publication. Since the site is for everyone — not just astrology pros — the name should instantly communicate "sky + history" without jargon.

### Top Recommendations

| Name | Why it works | Domain to check |
|------|-------------|-----------------|
| **Above & Below** | "As above, so below" — the core idea. Elegant, memorable, invites curiosity | aboveandbelow.com, abovebelow.co |
| **Sky Archive** | Instantly clear. "Sky" is accessible, "Archive" signals serious database | skyarchive.com, skyarchive.co |
| **When Planets Align** | Everyone knows this phrase. It IS the concept of the site | whenplanetsalign.com |
| **Sky Record** | Simple, editorial, implies both documentation and music/vinyl vibes | skyrecord.com, skyrecord.co |
| **Cosmic Record** | Slightly more premium, same idea | cosmicrecord.com |
| **Stars & Wars** | Provocative, memorable. "Stars" = sky, "Wars" = world events | starsandwars.com |
| **Planets & Power** | Directly states the thesis: planetary mechanics → geopolitical power | planetsandpower.com |
| **Sky Meets Earth** | Conversational, accessible, exactly what the site does | skymeetearth.com |

### Also Consider
- **cosmoschronicle.com** — editorial feel
- **skyversusearth.com** — tension-based, catchy
- **celestialrecord.com** — premium but longer
- **abovebelow.app** — short, modern TLD
- **skyarchive.org** — if positioning as public resource (like epsteinexposed)

### How to Check Availability
Go to **instantdomainsearch.com** — type a name and it shows availability in real time across all TLDs. Or use **namecheap.com/domains/domain-name-search/** for pricing.

---

## 2. WHAT YOU NEED TO LAUNCH

Your site is static HTML files (cosmos-daily-v5.html, about.html, celestial-map.html, images/). This is the simplest possible deployment — no server, no database, no backend. You need exactly two things:

### A. Domain Name (~$10/year)
- **Where to buy**: Cloudflare Registrar (cheapest — at-cost pricing, no markup), Namecheap ($10-12/year), or Porkbun ($11/year)
- **Get .com** — it's the default and most trusted
- **Cost: ~$10-12/year**

### B. Static Hosting (FREE)
Your entire site is HTML + CSS + JS + images. All of these host static sites for free:

| Platform | Free Tier | Best For | Deploy Method |
|----------|-----------|----------|---------------|
| **Cloudflare Pages** (Recommended) | Unlimited bandwidth, 500 builds/month | Performance + free custom domain SSL | Git push or drag-and-drop |
| **Netlify** | 100GB bandwidth/month, 300 build min | Easiest setup | Git push or drag-and-drop |
| **Vercel** | 100GB bandwidth/month | React/Next.js projects | Git push |
| **GitHub Pages** | 100GB soft limit | Simplest possible | Git push |

### Recommended Stack: Cloudflare Pages + Cloudflare Registrar
Why: Buy domain and host in the same place. At-cost domain pricing. Unlimited free bandwidth. Global CDN. Free SSL. One dashboard for everything.

---

## 3. LAUNCH COST BREAKDOWN

### Year 1 Total: $10-12

| Item | Cost | Notes |
|------|------|-------|
| Domain (.com) | $10-12/year | Cloudflare or Namecheap |
| Hosting | $0 | Cloudflare Pages free tier |
| SSL Certificate | $0 | Included with Cloudflare |
| CDN | $0 | Included with Cloudflare |
| Analytics | $0 | Cloudflare Web Analytics (free, privacy-friendly) or Plausible free tier |
| Donation system | $0 | Buy Me a Coffee (free), Ko-fi (free), or GitHub Sponsors |
| Email (optional) | $0 | Cloudflare Email Routing (free — forward yourdomain.com to Gmail) |
| **TOTAL** | **~$10-12/year** | |

### Optional Upgrades (Later)
| Item | Cost | When |
|------|------|------|
| Custom email (hello@yourdomain.com) | $6/month (Google Workspace) | When it looks professional enough to matter |
| Plausible Analytics (self-hosted or paid) | $9/month | When you want detailed visitor data |
| Cloudflare Pro | $20/month | If you exceed free tier (unlikely for static site) |

---

## 4. STEP-BY-STEP LAUNCH CHECKLIST

1. **Pick a name** — Check availability at instantdomainsearch.com
2. **Buy the domain** — Cloudflare Registrar or Namecheap
3. **Create a Cloudflare account** — cloudflare.com (free)
4. **Set up Cloudflare Pages**:
   - Option A (easiest): Dashboard → Pages → Upload Assets → drag your folder
   - Option B (better): Push to GitHub → connect repo to Cloudflare Pages → auto-deploys on every push
5. **Connect your domain** — In Cloudflare Pages, add your custom domain
6. **Set up donations** — Add Buy Me a Coffee or Ko-fi widget (see Section 6)
7. **Add analytics** — Enable Cloudflare Web Analytics (one toggle in dashboard)
8. **Set up email forwarding** — Cloudflare Email Routing → forward contact@yourdomain.com to your Gmail
9. **Test everything** — Check on mobile, different browsers, share link with friends
10. **Seed on Reddit** — See Section 5

---

## 5. MARKETING PLAN — REDDIT & X SEEDING STRATEGY

### What EpsteinExposed.com Did Right

EpsteinExposed launched in early February 2026 and hit 10M+ views rapidly. Key patterns:

**Their playbook:**
- **Built by one person, positioned as a public service** — "free, ad-free, built by one person, supported by thousands." This framing is critical. It's not a product pitch, it's a gift to the community.
- **Rode a massive wave** — The Epstein files were THE topic on Reddit in late 2025 / early 2026. Reddit sleuths were already deep in the documents. EpsteinExposed gave them a tool they desperately needed.
- **Launched where the audience already was** — r/conspiracy, r/Epstein, and related subreddits were ground zero. The creator didn't need to find an audience — the audience was already assembled and hungry for exactly this tool.
- **The site solved a real pain point** — Thousands of Reddit users were manually sifting through PDFs. EpsteinExposed made 2.1M+ documents searchable. The value was immediately obvious.
- **Community-first, not self-promotion** — The framing was "I built this for us" not "check out my website." Reddit despises self-promotion but loves community tools.

### Your Reddit Seeding Strategy

**Phase 1: Pre-Launch Seeding (1-2 weeks before launch)**

Post genuinely interesting content in target subreddits WITHOUT linking your site. Build credibility first.

Example posts (text posts, not links):
- r/astrology: "I mapped every Saturn-Pluto conjunction since 44 BC against major world events. The pattern is insane."
- r/conspiracy: "Every major pandemic in the last 700 years happened within 2 years of a Jupiter-Pluto conjunction. Here's the data."
- r/history: "The celestial events behind history's biggest turning points — a data-driven analysis"
- r/dataisbeautiful: Create a visualization of planetary cycles vs world events (this sub LOVES original data viz)

These posts provide value on their own. If they gain traction, people will ask "where can I see more?"

**Phase 2: Launch Post**

When the site is live, post in your strongest-performing subreddit from Phase 1:

**Title format**: "I built a free database mapping 2,000 years of celestial events to world history — from Julius Caesar's assassination to COVID"

**Post body template:**
```
I spent [X weeks/months] building this because I couldn't find anything like it.

[Your site name] maps 100+ major world events — wars, pandemics, assassinations,
revolutions, financial crashes — against the celestial events that were happening
at the exact same time.

Some patterns I found:
- Every Saturn-Pluto conjunction since 1914 coincided with a global crisis
  (WWI, WWII, 9/11, COVID)
- The Berlin Wall fell during a Saturn-Neptune conjunction. The next one is
  happening right now (2026).
- The Black Death, Spanish Flu, and COVID all happened near Jupiter-Pluto
  conjunctions.

It's free, no ads, no signup required.

[link]

Whether you think it's astrology, coincidence, or just cool data visualization —
the patterns are worth looking at.
```

**Key principles:**
- Lead with the data/patterns, not the site
- "Free, no ads, no signup" — magic words on Reddit
- Acknowledge skeptics ("whether you think it's astrology or coincidence")
- Don't oversell. Undersell. Let the site speak for itself.

**Phase 3: Cross-posting (days 2-7)**

After the initial post gains traction, post to adjacent communities with slightly different angles:

| Subreddit | Angle | Tone |
|-----------|-------|------|
| r/astrology (2.5M) | Mundane astrology perspective, Saturn-Pluto cycles | Enthusiast |
| r/conspiracy (2.2M) | "The sky doesn't lie — every crash, war, and pandemic follows a pattern" | Conspiratorial curiosity |
| r/history (18M) | Data-driven historical analysis, no astrology framing needed | Academic |
| r/dataisbeautiful (22M) | Create a chart/infographic showing the correlations | Visual, data-first |
| r/Futurology (20M) | "What the Saturn-Neptune conjunction of 2026 might mean" | Forward-looking |
| r/occult (400K) | Deep mundane astrology analysis | Esoteric |
| r/InternetIsBeautiful (17M) | "A beautifully designed interactive database of 2,000 years of celestial events mapped to world history" | Design appreciation |
| r/AskHistorians (2M) | Answer existing questions about historical events with celestial data as a bonus angle | Expert voice |
| r/collapse (500K) | Historical precedent for civilizational crises mapped to planetary cycles | Doomer-curious |
| r/WebDev (1M) | "I built a single-page interactive history database — here's the tech stack" | Developer showcase |

**Phase 4: Ongoing Content Marketing**

Every time a major world event happens, post an analysis connecting it to current celestial events. This is your infinite content engine:
- New war breaks out → "Here's what the sky looked like when this happened — and the last 5 times it looked the same"
- Financial crash → "Every market crash since 1929 happened during [X] — and we're in one right now"
- Leader dies → "Saturn was doing [X] the last 3 times a major world leader died under similar circumstances"

### X (Twitter) Strategy

**Handle**: Match your domain name. Keep it clean and short.

**Bio**: "Mapping 2,000 years of celestial events to world history. Free, open database. 106+ events from 44 BC to 2026."

**Content pillars:**
1. **"On this day" posts** — "On this day in 2001, Saturn opposed Pluto at 12° Gemini-Sagittarius. Hours later, two planes hit the World Trade Center." (Include screenshot from your site)
2. **Pattern threads** — "THREAD: Every time Saturn and Pluto align, the world breaks. Here's 2,000 years of proof." (These go viral)
3. **Current sky updates** — "Today's sky: Mars square Saturn. The last 3 times this happened: [historical events]." (This is your daily content)
4. **React to news** — When anything major happens, immediately connect it to current transits

**Growth tactics:**
- Quote-tweet astrology accounts with your historical data
- Reply to news tweets with "here's what the sky looked like" takes
- Use hashtags: #astrology #mundaneastrology #asabovesobelow #history
- Pin a thread showing your 3 most compelling correlations

### TikTok / Instagram Reels (Optional but high ROI)

Short-form video with dark aesthetic matching your site:
- "The sky on 9/11" — show the Saturn-Pluto opposition, then the event
- "Every pandemic in 700 years happened during THIS" — Jupiter-Pluto conjunction pattern
- "The sky is doing something it hasn't done since 1989" — Saturn-Neptune 2026

These formats crush on astrology TikTok (which is massive — millions of views per post).

---

## 6. DONATION BOX OPTIONS

### Option A: Buy Me a Coffee (Recommended)
- **Cost**: Free (they take 5% of donations)
- **Setup**: Create account at buymeacoffee.com → get a widget embed code → add to your site
- **Embed code** (add to your HTML):
```html
<script data-name="BMC-Widget" data-cfasync="false"
  src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
  data-id="YOUR_USERNAME" data-description="Support Cosmos Daily"
  data-message="Help keep this free and ad-free" data-color="#C9A96E"
  data-position="Right" data-x_margin="18" data-y_margin="18">
</script>
```

### Option B: Ko-fi
- **Cost**: Free (0% commission on donations — they make money on premium features)
- **Setup**: Similar to BMC, create account → get embed/button code
- **Better if**: You want 0% taken from donations

### Option C: Custom Stripe Checkout (More Work, More Control)
- **Cost**: Stripe takes 2.9% + $0.30 per transaction
- **Setup**: Create Stripe account → use Stripe Payment Links (no code needed)
- **Better if**: You want full branding control and don't want a third-party logo

### Recommendation
Start with **Ko-fi** (0% commission) or **Buy Me a Coffee** (more recognizable brand, 5% cut). You can always switch later. Both give you a floating button or embedded widget with zero coding.

---

## 7. DOMAIN AVAILABILITY — CHECK THESE NOW

Go to **instantdomainsearch.com** and check these in order of recommendation:

### Tier 1 (Best — accessible, memorable, communicates the concept)
1. aboveandbelow.com / .co / .org
2. skyarchive.com / .co / .org
3. whenplanetsalign.com
4. skyrecord.com

### Tier 2 (Strong alternatives)
5. cosmicrecord.com
6. starsandwars.com
7. planetsandpower.com
8. skymeetearth.com
9. cosmoschronicle.com
10. abovebelow.app

### Tier 3 (If all above taken)
11. skyversusearth.com
12. celestialrecord.com
13. cosmicarchive.co
14. theskyrecord.com
15. skyandhistory.com

### If .com is taken, try:
- **.co** — clean, modern, cheap (~$10/year)
- **.org** — positions as public resource (like epsteinexposed)
- **.app** — modern, tech-forward ($14/year)

---

## 8. QUICK LAUNCH TIMELINE

| Day | Action |
|-----|--------|
| Today | Check domain availability, pick a name, buy domain |
| Today | Sign up for Cloudflare, set up Pages, deploy site |
| Today | Set up Ko-fi or Buy Me a Coffee, add widget to site |
| Day 2 | Test everything (mobile, links, donation flow) |
| Day 2 | Write Reddit seed posts (Phase 1 — value posts, no links) |
| Day 3-5 | Post Phase 1 content on 2-3 subreddits |
| Day 5-7 | Launch post with site link |
| Day 7+ | Cross-post to adjacent subreddits, start X account |

**You can be live on the internet within the next hour for $10.**
