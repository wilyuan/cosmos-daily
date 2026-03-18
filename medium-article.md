# I Mapped 177 Astronomical Events to World History Across 5,800 Years. The Patterns Are Hard to Ignore.

*How I built an interactive database connecting eclipses, planetary conjunctions, and oppositions to wars, pandemics, and financial crashes.*

---

In January 2020, Saturn and Pluto aligned at 22 degrees Capricorn for the first time since 1982. Within weeks, a respiratory virus that had been quietly spreading in Wuhan was declared a global pandemic. Over seven million people would die.

That alignment, a Saturn-Pluto conjunction, has occurred five times since 1914. Each time, something broke.

1914: World War I.
1947: The Cold War begins.
1982: The AIDS epidemic is identified.
2001: September 11.
2020: COVID-19.

You can call that coincidence. Most people do, at first. But after spending months cross-referencing NASA ephemeris data with verified historical records across 5,800 years of human history, I stopped being so sure.

The result is Cosmos Daily, a free interactive database that maps 177 major celestial events to the world events they coincided with, from the first recorded eclipse in 3800 BC to the current war with Iran.

This is the story of how it was built, what the data shows, and why it matters.

---

## The Question Nobody Is Asking

For four thousand years, every major civilization on Earth treated the sky as an operating system. Babylonian priests kept meticulous eclipse records on clay tablets and hid their kings during totality. The Egyptians aligned the Great Pyramid to Orion's Belt with a precision that modern surveyors struggle to match. In Rome, no military campaign launched without consulting the augurs. In China, the Mandate of Heaven was literally celestial: a dynasty ruled because the sky permitted it.

Then around the 17th century, we stopped. The Enlightenment split astronomy from astrology. One became rigorous science. The other became horoscope columns and personality quizzes.

We gained extraordinary precision. We can now predict a solar eclipse to the second, centuries in advance. But we lost the question: is there a relationship between what happens above and what happens below?

That question never stopped being relevant. It just stopped being asked by serious people.

The branch of astrology that asks it is called mundane astrology, from the Latin *mundus*, meaning "world." It has nothing to do with your birth chart or daily horoscope. It tracks the movements of slow outer planets (Jupiter, Saturn, Uranus, Neptune, Pluto) and their geometric relationships to each other, then maps those configurations against collective human experience: wars, revolutions, economic cycles, pandemics.

I wanted to see if the patterns held up across thousands of years of data.

---

## The Methodology

Rigor matters. If the correlations are not built on solid data, they are just stories. Here is how the database works.

**Celestial data** comes from NASA JPL ephemeris tables and the Swiss Ephemeris, verified to arc-minute precision. Every planetary position, every eclipse date, every conjunction degree is independently verifiable.

**Historical data** comes from primary sources, academic records, and established reference works. Every world event in the database is documented and sourced.

**The cross-reference** is straightforward: for each major celestial alignment (eclipse, conjunction, opposition, square, retrograde, ingress), I identified whether a significant world event occurred within its activation window. Eclipse windows last approximately six months. Conjunction windows vary by the speed of the planets involved.

There are 177 events in the current database spanning from approximately 3800 BC to 2026. They fall into six celestial categories:

**Eclipse** is the most powerful category. Solar and lunar eclipses historically correlate with the exposure of hidden dynamics and sudden shifts in power. The July 2019 total solar eclipse fell directly on the US natal Sun at 10 degrees Cancer. Four days later, Jeffrey Epstein was arrested.

**Conjunction** marks two planets at the same degree, beginning new cycles. The rarer the conjunction, the more significant the historical shift. Saturn-Pluto conjunctions average 33 to 38 years apart and correlate with civilizational crises.

**Opposition** places planets 180 degrees apart, creating confrontation and culmination. Saturn opposite Pluto was exact on September 11, 2001.

**Square** creates 90 degree tension. The Cuban Missile Crisis of 1962 coincided with a Saturn-Pluto square.

**Retrograde** signals periods where planets appear to move backward. Mercury retrograde in Scorpio was active during Black Monday, the worst single-day stock market crash in history (October 19, 1987).

**Ingress** marks a planet entering a new zodiac sign. Pluto entered Aquarius in November 2024 for the first time since the American and French Revolutions. Power is shifting from centralized institutions to decentralized networks.

Each event is rated 1 to 5 for significance, weighted toward outer planet involvement and cardinal point alignments.

---

## Five Patterns That Stand Out

After building the full database, certain cycles became impossible to unsee.

### 1. The Saturn-Pluto Cycle: Crisis Clock

Saturn-Pluto alignments (conjunctions, oppositions, and squares) form a roughly 33 to 38 year cycle. Every major phase of this cycle since 1914 has coincided with a global crisis.

The conjunctions mark beginnings of new power structures. The oppositions mark their peak confrontation. The squares mark their crisis points. This cycle has coincided with both World Wars, the Cold War, the AIDS epidemic, September 11, and COVID-19.

The next Saturn-Pluto square arrives around 2028 to 2030. Every previous square has coincided with the escalation of existing conflicts.

### 2. The Saturn-Neptune Cycle: Dissolution

Saturn builds structures. Neptune dissolves them. Their conjunction, occurring every 36 years, correlates with moments when institutions and borders evaporate.

1989: Saturn conjunct Neptune in Capricorn. The Berlin Wall falls. The Soviet Union collapses. Communism dissolves across Eastern Europe in months.

2026: Saturn conjunct Neptune at 0 degrees Aries, the first degree of the zodiac. This is happening right now. It is the defining transit of the decade, and astrologers consider it one of the most significant alignments in modern history.

### 3. Eclipse Corridors: Exposure Windows

Eclipses operate as cosmic spotlights, exposing what was hidden. The data shows a pattern: events that occur between two eclipses (in the corridor) tend to involve revelation, exposure, or sudden visibility of hidden dynamics.

The Oklahoma City bombing (1995) occurred exactly between a lunar eclipse on April 15 and a solar eclipse on April 29. The Ghislaine Maxwell trial (2021) unfolded between the November 19 lunar eclipse and the December 4 solar eclipse.

### 4. Jupiter-Pluto: Pandemics

Jupiter amplifies whatever it touches. Pluto governs mass transformation and death. Their conjunctions, occurring every 12 to 13 years, show a striking correlation with disease outbreaks at civilizational scale.

1345: Triple conjunction of Saturn, Jupiter, and Mars in Aquarius. The medical faculty at the University of Paris formally blames this conjunction for the Black Death.

2020: Jupiter conjunct Pluto in Capricorn. COVID-19.

The University of Paris attribution is particularly notable because it represents institutional recognition of the celestial correlation in real time.

### 5. Uranus Ingresses: Technological Revolution

When Uranus enters a new sign (every 7 years), the technological and cultural landscape shifts. Uranus entered Gemini (communication, information, technology) in 2025 for the first time in 84 years. The last time it was in Gemini: 1941 to 1942, when radio became a weapon of total war.

Now AI, quantum computing, and digital infrastructure are being radically transformed.

---

## Building the Visualization

The data alone is compelling, but I wanted people to see the patterns, not just read about them. So I built two visualization layers.

**The Chronicle** is the main interface. A vertical timeline of 177 events in reverse chronological order, each card showing the year, the celestial event (with its degree and sign), the world event, and a significance rating. Cards expand to reveal a full analysis: the cosmic interpretation, the historical context, and parallel events from other centuries that shared similar configurations. The event cards are color-coded by celestial type: gold for conjunctions, red for eclipses, orange for oppositions, violet for squares, blue for retrogrades, green for ingresses.

**The Celestial Map** is a radial spiral visualization where all 177 events orbit outward from the center of recorded history. Ancient events sit near the core. Modern events populate the outer rings. Each dot is color-coded by celestial type, sized by significance, and connected by faint lines showing cyclical relationships between events sharing the same planetary configuration.

The effect is immediate. You can see that certain regions of the spiral are dense with red (eclipses) and gold (conjunctions), and those dense clusters correspond to the most turbulent periods in human history. The 20th century outer ring is by far the densest, partly because we have better records, but also because the 1914 to 2020 period contained an unusual concentration of slow-planet alignments.

The entire thing is built as a single-page web application. HTML, CSS, and vanilla JavaScript. No frameworks, no backend, no database server. The event data lives as a JSON array in the page itself. The celestial map uses SVG with custom positioning algorithms to distribute events along the spiral.

Design choices were deliberate. Dark background (#07060D) to evoke the night sky. Source Serif 4 for editorial body text. IBM Plex Mono for data labels and dates. The color palette draws from the visual tradition of astronomical charts: golds, deep reds, muted violets.

The site loads in under two seconds and works on mobile. There is no signup. There are no ads. There is no paywall. The archive is free and open.

---

## What Is Happening Right Now

The reason this project exists now, and not five years ago, is that 2025 to 2026 contains an unusual concentration of significant transits occurring simultaneously.

**Saturn-Neptune conjunction at 0 degrees Aries** is the headline. This is the first Saturn-Neptune conjunction at the "world axis" (the first degree of the zodiac) in modern history. The last Saturn-Neptune conjunction (1989) coincided with the fall of the Berlin Wall and the dissolution of the Soviet Union. Astrologers expect institutional dissolution on a similar or greater scale.

**Pluto in Aquarius** began in November 2024 and continues for 20 years. The last time Pluto was in Aquarius: 1778 to 1798, the era of the American and French Revolutions.

**Uranus in Gemini** began in 2025. The last time: 1941 to 1949, the era of World War II and the birth of the atomic age.

**A Blood Moon total lunar eclipse in Virgo** occurred in March 2026, activating themes of systemic exposure and institutional health failures.

These are not happening sequentially. They are happening simultaneously. The database gives historical context for each transit individually. The reader can draw their own conclusions about what happens when they converge.

---

## The Honest Disclaimer

I am not predicting the future. I am not claiming that planets cause events. Causation is a strong word, and I am not using it.

What I am doing is presenting documented correlations between verified celestial data and verified historical data, and letting the patterns speak for themselves. The database includes instances where major alignments corresponded with quiet periods, and instances where significant world events occurred during unremarkable skies. Intellectual honesty requires the full picture, not just the hits.

Whether you interpret these patterns as causation, correlation, synchronicity, or pure coincidence is entirely your call. The data is the same either way.

But after mapping 177 events across 5,800 years, I will say this: the patterns are harder to dismiss than I expected when I started. And the sky right now looks like 1989.

Maybe it is time to look up again.

---

**Explore the full archive at [cosmosdaily.co](https://cosmosdaily.co)**

**Interactive celestial map at [cosmosdaily.co/celestial-map.html](https://cosmosdaily.co/celestial-map.html)**

---

*Tags: data visualization, history, astronomy, astrology, mundane astrology, planetary conjunctions, eclipses, world events, interactive database, data science*
