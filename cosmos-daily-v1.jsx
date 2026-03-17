import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, BookOpen, X, Filter } from 'lucide-react';

const CosmosDailyApp = () => {
  // ===== STATE MANAGEMENT =====
  const [selectedDecade, setSelectedDecade] = useState('All');
  const [selectedCycle, setSelectedCycle] = useState('All Cycles');
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showGlossary, setShowGlossary] = useState(false);

  // ===== HISTORICAL EVENTS DATABASE =====
  const eventsDatabase = [
    {
      id: 1,
      year: 1965,
      date: 'June 1965',
      worldEvent: 'Vietnam War Escalation & Cultural Revolution',
      worldEventDetail: 'Operation Rolling Thunder begins sustained bombing campaign. Mao launches Cultural Revolution in China, creating ideological upheaval across Asia and inspiring global youth movements.',
      celestialEvent: 'Saturn square Pluto (with Uranus-Pluto conjunction)',
      celestialType: 'square',
      position: '15° Virgo-Sagittarius',
      cycle: 'Saturn-Pluto',
      cosmicLink: 'Saturn-Pluto squares represent power structures under stress. Combined with Uranus-Pluto conjunction (the generational revolution aspect), this creates maximum tension: authority figures attempting control while youth demand radical transformation. The square is the friction point where the old order fights back hardest.',
      historicalPattern: 'Previous Saturn-Pluto cycle: 1930s Great Depression + rise of fascism. Next: 1982 Saturn conjunct Pluto = AIDS/recession (destructive). Pattern: every cycle marks a seismic shift in geopolitical power.',
      decade: '1960s'
    },
    {
      id: 2,
      year: 1969,
      date: 'July 20, 1969',
      worldEvent: 'Moon Landing (Apollo 11)',
      worldEventDetail: 'Humanity achieves the first crewed lunar landing. Neil Armstrong becomes the first human to set foot on the Moon, marking the apex of the Space Race and a profound moment of human achievement during the Cold War.',
      celestialEvent: 'Jupiter conjunct Uranus in Libra',
      celestialType: 'conjunction',
      position: '20° Libra',
      cycle: 'Jupiter-Saturn',
      cosmicLink: 'Jupiter-Uranus conjunctions expand human possibility and break old boundaries. Jupiter amplifies whatever Uranus touches — technology, disruption, the future. Landing on the Moon exemplifies this: the most advanced technology of the era achieving what was once "impossible." Uranus rules sudden breakthroughs; Jupiter gives them scale and historical significance.',
      historicalPattern: 'Jupiter-Uranus conjunctions recur roughly every 14 years and consistently mark technological leaps: electricity grid expansion (1900s), jet engine/atomic era (1954), space exploration (1969), internet acceleration (1997). They are the "possibility windows" of history.',
      decade: '1960s'
    },
    {
      id: 3,
      year: 1982,
      date: 'January 1982',
      worldEvent: 'AIDS Epidemic Identified & Worst Recession Since Great Depression',
      worldEventDetail: 'First cases of what will become AIDS are documented in Los Angeles. Simultaneously, global economy enters severe recession with unemployment surging and major corporations failing. The two crises create a sense of civilizational breakdown.',
      celestialEvent: 'Saturn conjunct Pluto in Libra',
      celestialType: 'conjunction',
      position: '27° Libra',
      cycle: 'Saturn-Pluto',
      cosmicLink: 'Saturn-Pluto conjunctions end old power structures and expose hidden threats. Saturn = hard reality, limits, time. Pluto = invisible forces, transformation, death. Together they conjoin every 33-38 years to mark the START of a new geopolitical/biological era. AIDS was invisible for years; the recession destroyed decades-old business models. Both are classic Pluto themes: what was hidden emerges; what seemed permanent dissolves.',
      historicalPattern: 'Previous Saturn-Pluto conjunction: 1947 (nuclear age begins, Cold War starts). Next: 2020 (COVID-19 pandemic in Capricorn). Pattern: each conjunction begins a ~35-year era defined by the crisis it reveals.',
      decade: '1980s'
    },
    {
      id: 4,
      year: 1986,
      date: 'April 26, 1986',
      worldEvent: 'Chernobyl Nuclear Disaster',
      worldEventDetail: 'The worst nuclear accident in history occurs at the Chernobyl Nuclear Power Plant in Soviet Ukraine. Massive radiation release contaminates Eastern Europe; the disaster accelerates the Soviet Union\'s decline and reframes nuclear safety globally.',
      celestialEvent: 'Saturn square Uranus',
      celestialType: 'square',
      position: '18° Sagittarius-Pisces',
      cycle: 'Other',
      cosmicLink: 'Saturn-Uranus squares create sudden structural failures. Saturn rules infrastructure and safety systems; Uranus is the sudden rupture. The combination is "catastrophic breakdown of established systems." Chernobyl exposed the fragility of Soviet technology and safety culture — Saturn\'s harsh lesson delivered through Uranus\'s shocking disruption.',
      historicalPattern: 'Saturn-Uranus squares recur every ~45 years and consistently coincide with infrastructure collapses: NYC blackout (1965), Three Mile Island (1979), Chernobyl (1986), Fukushima (2011 — not a square but Uranus opposition). These are reality checks on technological hubris.',
      decade: '1980s'
    },
    {
      id: 5,
      year: 1989,
      date: 'November 1989',
      worldEvent: 'Berlin Wall Falls & Tiananmen Square Massacre',
      worldEventDetail: 'The Berlin Wall falls on November 9, symbolizing the collapse of Soviet control in Eastern Europe and the end of the Cold War. Days earlier, on June 4, the Chinese government crushed pro-democracy protests at Tiananmen Square, revealing ideological fractures in the communist world.',
      celestialEvent: 'Saturn conjunct Neptune in Capricorn',
      celestialType: 'conjunction',
      position: '11° Capricorn',
      cycle: 'Saturn-Neptune',
      cosmicLink: 'Saturn-Neptune conjunctions dissolve old illusions and impose hard reality on idealistic structures. Saturn = the constraints that end things. Neptune = dreams, ideology, the bonds that hold systems together. When they conjoin, belief systems crumble and reality replaces fantasy. The Berlin Wall was literally the boundary between ideology (communism) and reality (capitalism). Tiananmen was the CCP defending ideology against grassroots reality. Both events: ideological boundaries breaking down under Saturn\'s weight.',
      historicalPattern: 'Previous Saturn-Neptune conjunction: 1953 (Soviet succession crisis, Korean War armistice = end of one Cold War phase). Next: 2026 (predicted disruptions in global institutions). Pattern: each conjunction marks when "the dream dies and something harder begins."',
      decade: '1980s'
    },
    {
      id: 6,
      year: 1993,
      date: 'February 26, 1993',
      worldEvent: 'First World Trade Center Bombing',
      worldEventDetail: 'A truck bomb explodes in the basement of the World Trade Center, killing six and wounding over 1,000. The attack marks the beginning of a domestic terrorism era and, retrospectively, the first act in a larger WTC saga that continues through 9/11.',
      celestialEvent: 'Saturn square Pluto (waxing)',
      celestialType: 'square',
      position: '20° Aquarius-Taurus',
      cycle: 'Saturn-Pluto',
      cosmicLink: 'The waxing Saturn-Pluto square (1993-1995) occurs roughly 13-14 years after the 1982 conjunction — the "building friction" phase of the cycle. Saturn\'s structures are challenged by hidden Pluto forces. This attack exposed vulnerabilities in American security infrastructure and launched a 25-year cycle of escalating terrorism threats. The WTC becomes, unconsciously, the focal point of power struggles to come.',
      historicalPattern: 'Saturn-Pluto squares appear ~13 years after conjunctions and ~13 years before the next major aspect. 1993 is followed by 2008 waning square (financial system collapse) and 2001 opposition (9/11). The pattern: crisis deepens through the cycle.',
      decade: '1990s'
    },
    {
      id: 7,
      year: 1995,
      date: 'March 20, 1995',
      worldEvent: 'Tokyo Subway Sarin Attack',
      worldEventDetail: 'The doomsday cult Aum Shinrikyo releases sarin nerve gas in the Tokyo subway system, killing 13 and injuring thousands. The attack demonstrates the emerging threat of non-state actors wielding weapons of mass destruction.',
      celestialEvent: 'Saturn square Pluto (waxing)',
      celestialType: 'square',
      position: '23° Aquarius-Taurus',
      cycle: 'Saturn-Pluto',
      cosmicLink: 'Still in the waxing Saturn-Pluto square crisis window. This attack, like 1993, reflects the same theme: hidden destructive forces (Pluto) breaking through established security structures (Saturn). The 1990s accumulate terrorist incidents as this square orb tightens — a building crescendo toward the 2001 opposition.',
      historicalPattern: 'The early 1990s waxing square period (1993-1995) sees repeated incidents that foreshadow larger crises. Each is a warning that current structures cannot contain emerging threats.',
      decade: '1990s'
    },
    {
      id: 8,
      year: 1999,
      date: 'August 11, 1999',
      worldEvent: 'Great Solar Eclipse Over Europe & Kosovo War Escalation',
      worldEventDetail: 'A total solar eclipse crosses Europe during the Kosovo War. The eclipse over the Balkans coincides with escalating NATO bombing campaigns and humanitarian crisis, making it one of the most historically charged eclipse events of the century.',
      celestialEvent: 'Total Solar Eclipse at 28° Leo (Grand Cross formation)',
      celestialType: 'eclipse',
      position: '28° Leo',
      cycle: 'Eclipse',
      cosmicLink: 'Solar eclipses at 28° Leo (the fixed royal sign) in a Grand Cross configuration create maximum tension and exposure. Leo rules government and authority. This eclipse, visible from the epicenter of European geopolitical conflict, supercharged the visibility of war and forced the world\'s attention on power structures at their breaking point. Eclipses expose what was hidden; they made the Kosovo atrocities undeniable.',
      historicalPattern: 'Eclipses at 28° Leo return approximately every 18-19 years. Previous: 1981 (Reagan/Thatcher era begins). Next: 2017 (Great American Eclipse, peak polarization before Trump chaos unfolds). Leo eclipses consistently mark turning points in state power and public reckoning.',
      decade: '1990s'
    },
    {
      id: 9,
      year: 2000,
      date: 'March-April 2000',
      worldEvent: 'Dot-Com Bubble Bursts',
      worldEventDetail: 'The tech stock boom collapses, wiping out trillions in market value. Companies with no earnings vanish overnight. The crash ends the 1990s euphoria and begins a decade of correction, setting the stage for the 2008 financial crisis.',
      celestialEvent: 'Jupiter conjunct Saturn in Taurus',
      celestialType: 'conjunction',
      position: '23° Taurus',
      cycle: 'Jupiter-Saturn',
      cosmicLink: 'Jupiter-Saturn conjunctions (every ~20 years) mark generational economic resets. Jupiter expands and inflates; Saturn brings reality and contraction. When they conjoin, whatever was inflated pops. Taurus rules value, money, and material resources. The dot-com bubble was pure Jupiter (unlimited expansion, irrational exuberance); the conjunction was Saturn saying "no." This marks the START of a ~20-year financial correction cycle ending around 2020.',
      historicalPattern: 'Jupiter-Saturn conjunctions: 1961 (stock market stabilizes after WWII), 1981 (neoliberal financial era begins), 2000 (tech correction), 2020 (pandemic + bond market chaos). Each marks a 20-year economic shift.',
      decade: '2000s'
    },
    {
      id: 10,
      year: 2001,
      date: 'September 11, 2001',
      worldEvent: 'September 11 Terrorist Attacks',
      worldEventDetail: 'Coordinated terrorist attacks kill nearly 3,000 people, triggering two decades of war in the Middle East. The attacks reshape global geopolitics, surveillance, and security infrastructure, defining the early 21st century.',
      celestialEvent: 'Saturn opposite Pluto (Saturn in Gemini, Pluto in Sagittarius)',
      celestialType: 'opposition',
      position: '12° Gemini-Sagittarius',
      cycle: 'Saturn-Pluto',
      cosmicLink: 'Saturn-Pluto oppositions occur roughly 16-17 years after the conjunction — the maximum crisis/exposure point of the cycle. Saturn and Pluto face each other in full tension: authority structures (Saturn in Gemini = communication/information systems) directly opposite hidden destructive forces (Pluto in Sagittarius = foreign ideologies, beliefs). The attacks exploited information gaps in the system and exposed the fragility of American security. An opposition is always a reckoning: what was hidden becomes impossible to ignore.',
      historicalPattern: 'Saturn-Pluto oppositions: 1966 (Vietnam escalation + cultural revolution reaching peak), 2001 (9/11 + wars begin), 2036 (predicted: major geopolitical reckoning). Oppositions are the "peak crisis" moment of the ~35-year cycle.',
      decade: '2000s'
    },
    {
      id: 11,
      year: 2006,
      date: 'January 2006',
      worldEvent: 'Housing Bubble Peak & Credit Expansion Peaks',
      worldEventDetail: 'U.S. housing prices reach their peak as subprime lending expands to maximum. Credit derivatives proliferate unchecked. The bubble is fully inflated before the inevitable collapse begins in 2007-2008.',
      celestialEvent: 'Saturn opposite Neptune',
      celestialType: 'opposition',
      position: '24° Leo-Aquarius',
      cycle: 'Saturn-Neptune',
      cosmicLink: 'Saturn-Neptune oppositions are the dissolution/deception peak. Neptune rules illusions, financial abstractions, and credit fantasies. Saturn is reality and limits. When opposite, the fantasy reaches maximum before collapsing into hard truth. The housing bubble was pure Neptune: phantom wealth, fraudulent mortgage products, everyone believing they could flip houses forever. Saturn-Neptune opposition says "the illusion dies now." Within two years, the collapse is undeniable.',
      historicalPattern: 'Saturn-Neptune oppositions: 1972 (Watergate scandal begins — political illusions dissolving), 2006 (financial illusions peak before collapse), 2042 (next major dissolution event predicted). These mark the peak of whatever bubble is inflating.',
      decade: '2000s'
    },
    {
      id: 12,
      year: 2008,
      date: 'September 2008',
      worldEvent: 'Global Financial Crisis & Great Recession',
      worldEventDetail: 'The collapse of Lehman Brothers triggers a global financial meltdown. Credit markets freeze; trillions in wealth evaporate. The crisis begins a decade-long recession and fundamentally destabilizes established financial institutions.',
      celestialEvent: 'Saturn square Pluto (waning)',
      celestialType: 'square',
      position: '2° Virgo-Sagittarius',
      cycle: 'Saturn-Pluto',
      cosmicLink: 'The waning Saturn-Pluto square (2008-2010) occurs roughly 26 years after the 1982 conjunction — the "breaking down of the old order" phase before renewal. This square often brings systemic collapse as the cycle exhausts itself. The financial system, built on 1982\'s assumptions about deregulation and securitization, finally breaks under its own contradictions. Pluto transforms what was thought permanent; Saturn enforces the harsh consequences.',
      historicalPattern: 'Waning Saturn-Pluto squares (26 years post-conjunction) consistently coincide with system breakdowns: 1956 (Cold War tensions peak), 2008 (financial system collapse), 2044 (predicted: next major structural failure). The pattern: the old order dies so the new can be born.',
      decade: '2000s'
    },
    {
      id: 13,
      year: 2011,
      date: 'January-December 2011',
      worldEvent: 'Arab Spring & Occupy Wall Street Movements',
      worldEventDetail: 'Uprisings spread across the Middle East and North Africa, toppling dictators. Simultaneously, Occupy Wall Street launches in the U.S., challenging corporate power. Both movements demand fundamental restructuring of authority.',
      celestialEvent: 'Uranus square Pluto (first hit)',
      celestialType: 'square',
      position: '6° Aries-Capricorn',
      cycle: 'Uranus-Pluto',
      cosmicLink: 'Uranus-Pluto squares (occurring roughly every 127 years) are the signature of revolutionary upheaval. Uranus = sudden disruption, technology, the people\'s will. Pluto = power, transformation, hidden forces exposed. The 2011-2016 Uranus-Pluto square defines the decade: revolutions everywhere, power structures challenged, technology as catalyst (social media), established hierarchies questioned globally. Both Arab Spring and OWS used social media (Uranus) to overthrow or challenge power (Pluto).',
      historicalPattern: 'Uranus-Pluto squares: 1932-1934 (rise of fascism AS reaction to revolutionary threat), 1960s conjunction (counterculture revolution), 2011-2016 (Arab Spring, Occupy, global populism). Each square/conjunction marks an era when ordinary people demand power redistribution.',
      decade: '2010s'
    },
    {
      id: 14,
      year: 2015,
      date: 'December 2015',
      worldEvent: 'Paris Climate Agreement Signed & ISIS Terror Peak',
      worldEventDetail: 'Nations agree to the Paris Climate Accord, committing to carbon reduction. Simultaneously, ISIS terror attacks in Paris highlight the tension between idealistic global cooperation and violent ideological conflict.',
      celestialEvent: 'Uranus square Pluto (waning, final hits)',
      celestialType: 'square',
      position: '15° Aries-Capricorn',
      cycle: 'Uranus-Pluto',
      cosmicLink: 'The waning Uranus-Pluto square (2015-2016) as the aspect separates marks the pivotal moment where revolutionary demands meet entrenched power. The Paris Agreement represents idealistic Uranus vision (global climate cooperation); ISIS attacks represent Pluto\'s shadow — those refusing transformation and clinging to fundamentalist power. By 2016, Uranus-Pluto separates and electoral shocks occur (Brexit, Trump) as the square\'s energy releases.',
      historicalPattern: 'The full 2011-2016 Uranus-Pluto square period produces maximum tension and forced choice: evolve (Uranus) or die (Pluto). By the time the square separates, major political realignments have occurred.',
      decade: '2010s'
    },
    {
      id: 15,
      year: 2017,
      date: 'August 21, 2017',
      worldEvent: 'Great American Eclipse & Political Polarization Peak',
      worldEventDetail: 'A total solar eclipse crosses the entire continental United States at 28° Leo. The event occurs during peak political polarization: Trump presidency, civil rights debates, and the rise of polarized media.',
      celestialEvent: 'Total Solar Eclipse at 28° Leo',
      celestialType: 'eclipse',
      position: '28° Leo',
      cycle: 'Eclipse',
      cosmicLink: 'The 2017 eclipse repeats the 1999 Leo eclipse degree (28° Leo), but now the fixed royal sign Leo energy impacts the American heartland. Leo rules government, authority, pride, and the will to power. A total eclipse here creates maximum exposure: whatever was hidden in power structures becomes visible. The eclipse coincides with maximum American political division — the nation\'s authority structures (Leo) are under questioning, exposed, polarized.',
      historicalPattern: '28° Leo eclipses: 1981 (Reagan power ascends), 1999 (Kosovo War exposure), 2017 (American authority under siege). Aries-Leo eclipse axis (every 18-19 years) consistently marks turning points in how societies relate to authority and power.',
      decade: '2010s'
    },
    {
      id: 16,
      year: 2020,
      date: 'January 12, 2020',
      worldEvent: 'COVID-19 Pandemic Begins (first confirmations)',
      worldEventDetail: 'The first confirmed death from COVID-19 occurs in Wuhan, China. The virus begins its global spread, triggering a pandemic that kills millions, reshapes economies, and forces unprecedented global lockdowns. The exact Saturn-Pluto conjunction occurs just days before the first death confirmation.',
      celestialEvent: 'Saturn conjunct Pluto in Capricorn',
      celestialType: 'conjunction',
      position: '22° Capricorn',
      cycle: 'Saturn-Pluto',
      cosmicLink: 'Saturn-Pluto conjunctions (every 33-38 years) mark the START of a new geopolitical era. This conjunction in Capricorn (the sign of structures, governments, and time itself) begins a pandemic that restructures everything: economies contract (Saturn), hidden biological forces transform civilization (Pluto), governments are exposed as fragile (Capricorn). This is the third major Saturn-Pluto conjunction event: 1947 (nuclear age), 1982 (AIDS), 2020 (COVID). Each creates a ~35-year era.',
      historicalPattern: 'Saturn-Pluto conjunctions: 1947 (nuclear age begins), 1982 (AIDS era begins), 2020 (pandemic restructuring begins). Each conjunction launches a multi-decade era defined by the crisis it births.',
      decade: '2020s'
    },
    {
      id: 17,
      year: 2020,
      date: 'December 21, 2020',
      worldEvent: 'COVID Vaccine Rollout Begins & Great Conjunction (Great Mutation)',
      worldEventDetail: 'The first COVID vaccines are authorized and distribution begins globally on the winter solstice. Simultaneously, Jupiter and Saturn conjoin at 0° Aquarius — the first Great Conjunction in Air signs in 200 years, marking the "Great Mutation" into a new era.',
      celestialEvent: 'Jupiter conjunct Saturn at 0° Aquarius (Great Conjunction/Great Mutation)',
      celestialType: 'conjunction',
      position: '0° Aquarius',
      cycle: 'Jupiter-Saturn',
      cosmicLink: 'Jupiter-Saturn conjunctions every ~20 years mark economic and social eras. This one at 0° Aquarius is historic: the first conjunction in Air signs in 200 years (previous 200 years were Earth sign conjunctions). Aquarius rules technology, collective humanity, and innovation. The conjunction + vaccine rollout on the solstice creates a massive symbolic pivot: from pandemic (Saturn-Pluto boundary) to technological solution (Jupiter-Aquarius expansion). This begins a 20-year era of technological acceleration and collective reorganization.',
      historicalPattern: 'Jupiter-Saturn conjunctions: 1961, 1981, 2000, 2020, 2040. Each marks a 20-year era. The 2020 conjunction in Aquarius begins 20 years of tech-driven transformation and collective reorganization.',
      decade: '2020s'
    },
    {
      id: 18,
      year: 2024,
      date: 'April 8, 2024',
      worldEvent: 'Total Solar Eclipse Across North America',
      worldEventDetail: 'A total solar eclipse crosses Mexico, the United States, and Canada at 19° Aries. The event is widely observed and generates significant media attention and public engagement with astronomical phenomena.',
      celestialEvent: 'Total Solar Eclipse at 19° Aries',
      celestialType: 'eclipse',
      position: '19° Aries',
      cycle: 'Eclipse',
      cosmicLink: 'Aries eclipses (ruled by Mars) create action, initiation, and new beginnings. At 19° Aries, this eclipse supercharges the planet of war, courage, and breaking through. Combined with the cycle of crisis (still in Saturn-Pluto Capricorn era, still in Jupiter-Saturn Aquarius era), the Aries eclipse pushes for action and change. It makes invisible forces visible and can correlate with conflict escalation or decisive action in world affairs.',
      historicalPattern: 'Aries eclipses occur roughly every 18-19 years and consistently mark moments of action, initiation, and conflict. This 19° Aries eclipse falls in an era of increasing global tensions and tech-driven change.',
      decade: '2020s'
    },
    {
      id: 19,
      year: 2026,
      date: 'March 3, 2026',
      worldEvent: 'Blood Moon Eclipse (predicted event context)',
      worldEventDetail: 'A lunar eclipse (Blood Moon) occurs at 12° Virgo. Lunar eclipses expose hidden matters and create culminations. This eclipse falls during a predicted period of intelligence community disruptions and information breaches globally.',
      celestialEvent: 'Lunar Eclipse (Blood Moon) at 12° Virgo',
      celestialType: 'eclipse',
      position: '12° Virgo',
      cycle: 'Eclipse',
      cosmicLink: 'Virgo eclipses rule details, analysis, systems, and information. A lunar eclipse here illuminates hidden data, secrets, and information systems. The predicted timing suggests this eclipse correlates with exposure of classified information or intelligence breaches — Virgo\'s detail-oriented energy making hidden information visible and undeniable.',
      historicalPattern: 'Virgo lunar eclipses occur roughly every 18-19 years and consistently coincide with information exposure and system scrutiny. This eclipse falls in the era of maximum cybersecurity threats and information warfare.',
      decade: '2020s'
    },
    {
      id: 20,
      year: 2026,
      date: 'March 8, 2026',
      worldEvent: 'Predicted Trade Tensions Escalation (Venus-Saturn conjunction context)',
      worldEventDetail: 'Trade tensions predicted to escalate globally as tariff wars intensify and economic relationships between major powers strain. This reflects broader restructuring of global economic alliances.',
      celestialEvent: 'Venus conjunct Saturn in Aries',
      celestialType: 'conjunction',
      position: '8° Aries',
      cycle: 'Other',
      cosmicLink: 'Venus rules value, money, and relationships. Saturn in Aries is harsh, combative limitation. When Venus conjuncts Saturn, values are tested, financial relationships contract, and what was previously valued is reassessed. In the context of global trade (Venus = value exchange), this conjunction coincides with economic contraction and relationship breakdown in trade relationships. Aries (martial, competitive) sharpens the conflict.',
      historicalPattern: 'Venus-Saturn conjunctions occur roughly every 20 years and consistently mark periods of financial contraction and relationship renegotiation. This one in Aries (the warrior sign) suggests aggressive trade posturing.',
      decade: '2020s'
    },
    {
      id: 21,
      year: 2026,
      date: 'March 20, 2026',
      worldEvent: 'Vernal Equinox (Spring Aries Ingress)',
      worldEventDetail: 'The spring equinox marks the Sun\'s ingress into Aries at 0° — a traditional astrological New Year. This reset point symbolically restarts annual and cyclical processes across hemispheres.',
      celestialEvent: 'Sun at 0° Aries (Vernal Equinox)',
      celestialType: 'equinox',
      position: '0° Aries',
      cycle: 'Other',
      cosmicLink: 'The Aries Ingress is the astrological New Year and marks the initiation point of the annual solar cycle. At 0° Aries, the Sun moves from the final sign (Pisces = endings, dissolution) into the first sign (Aries = beginnings, action, war). This spring 2026 equinox begins a new annual cycle under maximum Mars energy — suggesting an action-oriented, conflict-prone year ahead globally.',
      historicalPattern: 'Vernal equinoxes at 0° Aries reset the annual astrological calendar. The qualities of that year\'s Aries Ingress chart (planetary placements, aspects) predict the year\'s themes. A Mars-dominant year (Aries rules Mars) suggests increased conflict, action, and initiation.',
      decade: '2020s'
    },
    {
      id: 22,
      year: 1975,
      date: 'April 30, 1975',
      worldEvent: 'Fall of Saigon (Vietnam War Ends)',
      worldEventDetail: 'North Vietnamese forces capture Saigon as the South Vietnamese government collapses. The Vietnam War ends with communist victory, reshaping American foreign policy and marking a generational trauma for the U.S.',
      celestialEvent: 'Saturn square Uranus (waning)',
      celestialType: 'square',
      position: '19° Cancer-Libra',
      cycle: 'Other',
      cosmicLink: 'Saturn-Uranus squares (occurring every ~45 years) create tension between established structures (Saturn) and revolutionary forces (Uranus). The waning square (separating) marks the moment when the revolutionary forces have won and structures are forced to adapt. Saigon\'s fall is Uranus (revolutionary communism) defeating Saturn (American military structure). The square waning means the old order must now accept the new reality.',
      historicalPattern: 'Saturn-Uranus aspects: 1965 Uranus conjunct Pluto (revolution begins), 1975 Saturn square Uranus waning (revolution succeeds, old order forced to yield), 1986 Saturn square Uranus (Chernobyl catastrophe of old order), 2011 continues the revolutionary theme (Arab Spring).',
      decade: '1970s'
    },
    {
      id: 23,
      year: 1978,
      date: 'October 16, 1978',
      worldEvent: 'First Test-Tube Baby Born (Louise Brown)',
      worldEventDetail: 'Louise Brown becomes the first human conceived through in vitro fertilization. The birth represents a breakthrough in reproductive technology and marks the beginning of the biotechnology era.',
      celestialEvent: 'Uranus sextile Saturn',
      celestialType: 'conjunction',
      position: '12° Scorpio-Virgo',
      cycle: 'Other',
      cosmicLink: 'Uranus-Saturn sextiles (harmonious 60° aspect) allow technological innovation (Uranus) to integrate with practical structures (Saturn). The first IVF baby is Uranus\'s futuristic science meeting Saturn\'s medical establishment in cooperation. This marks technology not as disruptive but as integrated into institutions — the beginning of biotechnology as mainstream science.',
      historicalPattern: 'Uranus-Saturn harmonious aspects consistently mark moments when radical new technologies gain institutional acceptance and integration. This begins the biotech era that accelerates through 2000s-2020s.',
      decade: '1970s'
    },
    {
      id: 24,
      year: 1981,
      date: 'January 20, 1981',
      worldEvent: 'Ronald Reagan Elected & Neoliberal Era Begins',
      worldEventDetail: 'Ronald Reagan is inaugurated as U.S. president. His election marks the beginning of the neoliberal era: deregulation, union busting, military expansion, and the final Cold War surge. The political realignment reshapes the next 40 years.',
      celestialEvent: 'Jupiter conjunct Saturn in Libra (Great Conjunction)',
      celestialType: 'conjunction',
      position: '6° Libra',
      cycle: 'Jupiter-Saturn',
      cosmicLink: 'Jupiter-Saturn conjunctions mark 20-year economic/social eras. Libra rules balance, law, and social structures. The 1981 conjunction in Libra at Reagan\'s election begins a 20-year era of legal/structural deregulation (Saturn = removal of limits, Jupiter = expansion without constraint). The neoliberal era (1981-2000) is defined by this conjunction: free markets, financial expansion, and the collapse of mid-century structures.',
      historicalPattern: 'Great Conjunctions: 1961 (post-WWII stabilization), 1981 (neoliberal expansion begins), 2000 (tech correction), 2020 (Aquarius mutation). The 1981 conjunction launches deregulation that ultimately bubbles and crashes in 2000-2008.',
      decade: '1980s'
    },
    {
      id: 25,
      year: 1987,
      date: 'October 19, 1987',
      worldEvent: 'Black Monday Stock Crash',
      worldEventDetail: 'The U.S. stock market experiences its worst single day, plummeting 22% in one session. The crash triggers global market drops and tests the newly installed circuit-breaker systems. It marks a reality check on the 1980s boom.',
      celestialEvent: 'Saturn square Uranus (waxing)',
      celestialType: 'square',
      position: '29° Sagittarius-Pisces',
      cycle: 'Other',
      cosmicLink: 'Saturn-Uranus waxing squares create sudden constraints on expansion. The 1980s are peak Uranus deregulation and Jupiter expansion (1981 conjunction). By 1987, Saturn is saying "no" — sudden market disruption, limits imposed. The Black Monday crash is a warning that expansion (Uranus-Jupiter) must be constrained (Saturn), but the market recovers and continues upward through 2000, ignoring Saturn\'s warning.',
      historicalPattern: 'Saturn-Uranus waxing squares: 1956 (Eisenhower brake on growth), 1987 (Black Monday but temporary), 2021-2023 (inflation caps and rate hikes). They create temporary pauses in expansion cycles.',
      decade: '1980s'
    },
    {
      id: 26,
      year: 2011,
      date: 'August 2, 2011',
      worldEvent: 'U.S. Debt Ceiling Crisis & S&P Downgrade',
      worldEventDetail: 'Congress reaches a political stalemate over raising the debt ceiling. The crisis is resolved at the last moment, but Standard & Poor\'s downgrades U.S. debt for the first time in history. Markets plunge and confidence in American financial stability is shaken.',
      celestialEvent: 'Uranus square Pluto (waxing towards peak)',
      celestialType: 'square',
      position: '5° Aries-Capricorn',
      cycle: 'Uranus-Pluto',
      cosmicLink: 'The waxing Uranus-Pluto square (2011-2015) creates maximum tension: revolutionary forces (Uranus) directly challenging power structures (Pluto). The debt ceiling crisis is Uranus: political disruption, refusing to cooperate within old frameworks. Pluto in Capricorn reveals the fragility of supposedly stable structures (government, credit ratings). The S&P downgrade is Pluto exposing hidden weaknesses in American power.',
      historicalPattern: 'Waxing Uranus-Pluto squares (2011-2015) accumulate crises that force structural change. By 2016, the square separates and major political realignments occur (Trump, Brexit). The square period itself is maximum disruption.',
      decade: '2010s'
    },
    {
      id: 27,
      year: 1997,
      date: 'July 1997',
      worldEvent: 'Hong Kong Handover & Asian Financial Crisis Begins',
      worldEventDetail: 'Hong Kong is returned to China from British control after 156 years, symbolizing the end of colonialism in Asia. Weeks later, the Asian financial crisis begins in Thailand, spreading rapidly through emerging markets and triggering global contagion.',
      celestialEvent: 'Uranus conjunct Pluto waning (final orb)',
      celestialType: 'conjunction',
      position: '6° Libra',
      cycle: 'Uranus-Pluto',
      cosmicLink: 'The 1960s Uranus-Pluto conjunction in Virgo began the counterculture revolution. By 1997 (36 years later), the cycle is completing: the old colonial order (symbolized by Hong Kong handover) finally dissolves, and simultaneously, global financial structures (built on post-colonial assumptions) begin to fail. As the conjunction separates, Pluto exposes vulnerabilities (Asian Tigers weren\'t as stable as assumed) and Uranus disrupts orderly markets.',
      historicalPattern: 'The 1960s Uranus-Pluto conjunction (Virgo) defined 40 years (1960-2000). By the late 1990s, its energy is separating and releasing: revolutions succeed, old orders collapse, and new crises emerge from the transformation.',
      decade: '1990s'
    },
    {
      id: 28,
      year: 2023,
      date: 'March 10, 2023',
      worldEvent: 'Silicon Valley Bank Collapse & Banking Sector Stress',
      worldEventDetail: 'Silicon Valley Bank, focused on tech startups and venture capital, suddenly collapses due to deposit flight and interest rate pressure. The collapse triggers regional banking stress and requires emergency Fed intervention to prevent broader financial system failure.',
      celestialEvent: 'Pluto conjunct South Node in Capricorn (final weeks before Aquarius ingress)',
      celestialType: 'conjunction',
      position: '27° Capricorn',
      cycle: 'Other',
      cosmicLink: 'Pluto at 27° Capricorn (in its final weeks before moving to Aquarius) is the culmination of the Saturn-Pluto 2020 conjunction era in Capricorn. Capricorn rules banks, government, and structures. Pluto here exposes hidden systemic fragility. The SVB collapse is Pluto revealing that the post-2008 financial system is still fundamentally unstable despite apparent recovery. As Pluto prepares to leave Capricorn, it one last time exposes structural weakness.',
      historicalPattern: 'Pluto in Capricorn (2008-2024) consistently exposed and transformed government, banking, and institutional structures. SVB collapse is the final Pluto-Capricorn lesson before Pluto moves into Aquarius (2024-2044) and transforms tech/collective structures instead.',
      decade: '2020s'
    }
  ];

  // ===== FILTER CATEGORIES =====
  const decades = ['All', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
  const cycles = [
    'All Cycles',
    'Saturn-Pluto',
    'Saturn-Neptune',
    'Jupiter-Saturn',
    'Uranus-Pluto',
    'Eclipse',
    'Other'
  ];
  const eventTypes = [
    { label: 'All', value: 'All' },
    { label: 'Conjunction', value: 'conjunction', color: '#C9A96E' },
    { label: 'Opposition', value: 'opposition', color: '#E8A545' },
    { label: 'Square', value: 'square', color: '#5B8FB9' },
    { label: 'Eclipse', value: 'eclipse', color: '#E84545' },
    { label: 'Retrograde', value: 'retrograde', color: '#8B7EC7' },
    { label: 'Equinox', value: 'equinox', color: '#7ECBA1' }
  ];

  // ===== GLOSSARY CONTENT =====
  const glossaryContent = {
    eventTypes: {
      'Conjunction (☌)': 'Two planets meet at the same point in the sky. Think of it as a cosmic handshake — a new cycle begins between whatever those two planets represent. Conjunctions are "birth" moments.',
      'Opposition (☍)': 'Two planets face each other from opposite sides of the sky (180° apart). Maximum tension. Whatever cycle started at the conjunction now reaches its crisis point — like a full moon is the "opposition" of the Sun and Moon.',
      'Square (□)': 'Two planets are 90° apart — friction, forced action. The cycle hits a turning point where something has to change. Often coincides with breaking points in long-running situations.',
      'Eclipse (◑)': 'The Sun, Moon, and Earth align precisely enough to block light. Eclipses supercharge whatever sign they fall in and tend to expose hidden things. They come in pairs (solar + lunar) and run in ~18-month cycles.',
      'Retrograde (℞)': 'A planet appears to move backward in the sky (it\'s an optical illusion from orbital mechanics). The planet\'s themes tend to go haywire — miscommunications, delays, things from the past resurfacing.',
      'Equinox': 'The moment when day and night are equal length as the Sun crosses the celestial equator. Equinoxes mark seasonal turning points and reset points in the annual cycle.'
    },
    planets: {
      Saturn: 'Structure, limits, authority, consequences, time, government. "The planet of hard reality." Saturn builds things but also tears them down when they\'ve outlived their purpose.',
      Pluto: 'Power, transformation, death/rebirth, secrets, the unconscious. "What\'s hidden beneath the surface." Pluto rules what\'s invisible but potent — bacteria, shadow psychology, nuclear power.',
      Jupiter: 'Expansion, belief, law, fortune, excess. "The amplifier — makes everything bigger." Whatever Jupiter touches grows, for better or worse.',
      Neptune: 'Dreams, illusion, spirituality, dissolution, deception. "The dissolver of boundaries." Neptune dissolves what is solid, makes invisible things visible, and collapses certainty.',
      Uranus: 'Revolution, disruption, technology, sudden change. "The lightning bolt." Uranus breaks things so they can be rebuilt. It\'s the future crashing into the present.',
      Mars: 'Action, conflict, aggression, energy. "The warrior." Mars initiates, fights, and builds through force.',
      Venus: 'Value, beauty, diplomacy, money, relationships. "What we desire." Venus shows what\'s valuable to us and how we relate.',
      Mercury: 'Communication, technology, travel, information. "The messenger." Mercury moves ideas around, connects people, and transmits data.',
      Sun: 'Identity, leadership, vitality. "The king." The Sun shows who we are at our core and what we\'re meant to do.',
      Moon: 'Emotions, the public, instinct, home. "The people." The Moon rules what the public cares about and how people feel.'
    },
    cycles: {
      'Saturn-Pluto (~33-38 years)': 'The cycle of power structures being built and destroyed. Every conjunction starts a new geopolitical era. WWI, Cold War, AIDS/recession, COVID — all began at Saturn-Pluto conjunctions. This is the "power cycle" that defines eras.',
      'Saturn-Neptune (~36 years)': 'The cycle of idealism meeting reality. When they conjoin, illusions collapse and new dreams emerge. The Berlin Wall fell 4 days before the exact conjunction in 1989. This is the "reality check" cycle.',
      'Jupiter-Saturn (~20 years, "Great Conjunction")': 'The "Great Conjunction" — marks generational shifts in economics and social order. The 2020 conjunction at 0° Aquarius was called the "Great Mutation" — the first in Air signs in 200 years.',
      'Uranus-Pluto (~113-141 years for conjunction, ~80 years for square)': 'The cycle of revolution. The 1960s conjunction = counterculture revolution. The 2010s square = Arab Spring, Occupy, global populist movements. This is the "upheaval" cycle.'
    }
  };

  // ===== FILTERED EVENTS =====
  const filteredEvents = useMemo(() => {
    return eventsDatabase.filter(event => {
      const decadeMatch = selectedDecade === 'All' || event.decade === selectedDecade;
      const cycleMatch = selectedCycle === 'All Cycles' || event.cycle === selectedCycle;
      const typeMatch = selectedEventType === 'All' || event.celestialType === selectedEventType;
      const searchMatch = !searchQuery ||
        event.worldEvent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.worldEventDetail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.celestialEvent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.cosmicLink.toLowerCase().includes(searchQuery.toLowerCase());

      return decadeMatch && cycleMatch && typeMatch && searchMatch;
    });
  }, [selectedDecade, selectedCycle, selectedEventType, searchQuery]);

  // ===== COLOR MAPPING =====
  const getEventTypeColor = (type) => {
    const colorMap = {
      eclipse: '#E84545',
      conjunction: '#C9A96E',
      opposition: '#E8A545',
      square: '#5B8FB9',
      retrograde: '#8B7EC7',
      equinox: '#7ECBA1'
    };
    return colorMap[type] || '#C9A96E';
  };

  // ===== ANIMATIONS =====
  const keyframesStyle = `
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes glow {
      0%, 100% { text-shadow: 0 0 10px rgba(201, 169, 110, 0.5), 0 0 20px rgba(201, 169, 110, 0.3); }
      50% { text-shadow: 0 0 20px rgba(201, 169, 110, 0.8), 0 0 30px rgba(201, 169, 110, 0.5); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(20px); }
    }
    .fade-slide-up {
      animation: fadeSlideUp 0.6s ease-out;
    }
    .fade-in {
      animation: fadeIn 0.8s ease-out;
    }
  `;

  // ===== FLOATING ORBS COMPONENT =====
  const FloatingOrbs = () => (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0
    }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${['#E84545', '#C9A96E', '#7ECBA1', '#8B7EC7', '#E8A545', '#5B8FB9'][i]}22, transparent)`,
            filter: 'blur(40px)',
            left: `${15 + i * 15}%`,
            top: `${10 + i * 12}%`,
            animation: `float ${8 + i * 2}s ease-in-out infinite`,
            opacity: 0.4
          }}
        />
      ))}
    </div>
  );

  // ===== HEADER =====
  const Header = () => (
    <div style={{
      position: 'relative',
      zIndex: 10,
      padding: '60px 40px 40px',
      textAlign: 'center',
      borderBottom: '1px solid rgba(201, 169, 110, 0.15)',
      background: 'linear-gradient(175deg, #06050A 0%, #0A0814 30%, #0D0B18 60%, #07060C 100%)'
    }}>
      <h1 style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: '56px',
        fontWeight: 600,
        margin: '0 0 8px 0',
        color: '#E8D4B8',
        animation: 'glow 4s ease-in-out infinite',
        letterSpacing: '2px'
      }}>
        COSMOS DAILY
      </h1>
      <p style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '11px',
        letterSpacing: '3px',
        color: '#C9A96E',
        margin: '8px 0 16px 0',
        textTransform: 'uppercase'
      }}>
        CELESTIAL MECHANICS × WORLD EVENTS
      </p>
      <p style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: '14px',
        lineHeight: 1.6,
        color: '#B8A890',
        maxWidth: '700px',
        margin: '0 auto',
        fontStyle: 'italic'
      }}>
        Sixty years of planetary alignments mapped against the events that shaped the world. Explore the oldest pattern-recognition framework in human history.
      </p>
    </div>
  );

  // ===== EVENT CARD =====
  const EventCard = ({ event }) => {
    const isExpanded = expandedEventId === event.id;
    const eventColor = getEventTypeColor(event.celestialType);

    return (
      <div
        key={event.id}
        style={{
          background: 'linear-gradient(135deg, rgba(13, 11, 24, 0.8) 0%, rgba(10, 8, 20, 0.6) 100%)',
          border: `1px solid ${eventColor}33`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          animation: 'fadeSlideUp 0.6s ease-out'
        }}
        onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
      >
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: '32px',
              fontWeight: 600,
              margin: 0,
              color: '#E8D4B8',
              minWidth: '80px'
            }}>
              {event.year}
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                padding: '6px 12px',
                backgroundColor: eventColor,
                color: '#06050A',
                borderRadius: '20px',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '1px'
              }}>
                {event.celestialType}
              </span>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                padding: '6px 12px',
                backgroundColor: 'rgba(201, 169, 110, 0.2)',
                color: '#C9A96E',
                borderRadius: '20px',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '1px'
              }}>
                {event.cycle}
              </span>
            </div>
          </div>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: eventColor,
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.2s'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setExpandedEventId(isExpanded ? null : event.id);
            }}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* World Event Title */}
        <h3 style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: '20px',
          fontWeight: 500,
          margin: '0 0 8px 0',
          color: '#E8D4B8',
          lineHeight: 1.4
        }}>
          {event.worldEvent}
        </h3>

        {/* Celestial Event Info */}
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          color: '#8B7EC7',
          margin: '8px 0 0 0',
          letterSpacing: '0.5px'
        }}>
          {event.celestialEvent} · {event.position}
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: `1px solid ${eventColor}33`,
            animation: 'fadeIn 0.4s ease-out'
          }}>
            {/* World Event Detail */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#C9A96E',
                textTransform: 'uppercase',
                margin: '0 0 8px 0',
                fontWeight: 600
              }}>
                World Event
              </h4>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#B8A890',
                margin: 0
              }}>
                {event.worldEventDetail}
              </p>
            </div>

            {/* Cosmic Link */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '2px',
                color: eventColor,
                textTransform: 'uppercase',
                margin: '0 0 8px 0',
                fontWeight: 600
              }}>
                Cosmic Link
              </h4>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#B8A890',
                margin: 0
              }}>
                {event.cosmicLink}
              </p>
            </div>

            {/* Cycle Context */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#7ECBA1',
                textTransform: 'uppercase',
                margin: '0 0 8px 0',
                fontWeight: 600
              }}>
                Cycle Context
              </h4>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#B8A890',
                margin: 0
              }}>
                {event.historicalPattern}
              </p>
            </div>

            {/* Metadata */}
            <div style={{
              display: 'flex',
              gap: '24px',
              fontSize: '12px',
              fontFamily: "'IBM Plex Mono', monospace",
              color: '#8B7EC7'
            }}>
              <div>
                <span style={{ color: '#C9A96E', fontWeight: 600 }}>Date:</span> {event.date}
              </div>
              <div>
                <span style={{ color: '#C9A96E', fontWeight: 600 }}>Position:</span> {event.position}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ===== GLOSSARY MODAL =====
  const GlossaryModal = () => (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(13, 11, 24, 0.95) 0%, rgba(10, 8, 20, 0.95) 100%)',
        border: '1px solid rgba(201, 169, 110, 0.2)',
        borderRadius: '12px',
        maxWidth: '800px',
        maxHeight: '80vh',
        overflow: 'auto',
        padding: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: '32px',
            fontWeight: 600,
            color: '#E8D4B8',
            margin: 0
          }}>
            Cosmic Glossary
          </h2>
          <button
            onClick={() => setShowGlossary(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#C9A96E',
              cursor: 'pointer',
              fontSize: '24px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Event Types */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            letterSpacing: '2px',
            color: '#C9A96E',
            textTransform: 'uppercase',
            margin: '0 0 16px 0'
          }}>
            Celestial Aspects
          </h3>
          {Object.entries(glossaryContent.eventTypes).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '12px' }}>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#E8D4B8',
                margin: '0 0 4px 0'
              }}>
                {key}
              </p>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#B8A890',
                margin: 0
              }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Planets */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            letterSpacing: '2px',
            color: '#7ECBA1',
            textTransform: 'uppercase',
            margin: '0 0 16px 0'
          }}>
            Planets (What They Rule)
          </h3>
          {Object.entries(glossaryContent.planets).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '12px' }}>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#E8D4B8',
                margin: '0 0 4px 0'
              }}>
                {key}
              </p>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#B8A890',
                margin: 0
              }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Cycles */}
        <div>
          <h3 style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            letterSpacing: '2px',
            color: '#E8A545',
            textTransform: 'uppercase',
            margin: '0 0 16px 0'
          }}>
            Major Cycles
          </h3>
          {Object.entries(glossaryContent.cycles).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '12px' }}>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#E8D4B8',
                margin: '0 0 4px 0'
              }}>
                {key}
              </p>
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#B8A890',
                margin: 0
              }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ===== RENDER =====
  return (
    <div style={{
      background: 'linear-gradient(175deg, #06050A 0%, #0A0814 30%, #0D0B18 60%, #07060C 100%)',
      color: '#E8D4B8',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{keyframesStyle}</style>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }
      </style>

      <FloatingOrbs />

      <div style={{ position: 'relative', zIndex: 5 }}>
        <Header />

        {/* Controls Bar */}
        <div style={{
          padding: '32px 40px',
          borderBottom: '1px solid rgba(201, 169, 110, 0.15)',
          background: 'linear-gradient(175deg, rgba(6, 5, 10, 0.9) 0%, rgba(10, 8, 20, 0.8) 100%)'
        }}>
          {/* Decade Tabs */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              letterSpacing: '2px',
              color: '#C9A96E',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
              fontWeight: 600
            }}>
              Decades
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {decades.map(decade => (
                <button
                  key={decade}
                  onClick={() => setSelectedDecade(decade)}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s',
                    backgroundColor: selectedDecade === decade ? '#C9A96E' : 'rgba(201, 169, 110, 0.15)',
                    color: selectedDecade === decade ? '#06050A' : '#C9A96E'
                  }}
                >
                  {decade}
                </button>
              ))}
            </div>
          </div>

          {/* Cycle Filter */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              letterSpacing: '2px',
              color: '#C9A96E',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
              fontWeight: 600
            }}>
              Planetary Cycles
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {cycles.map(cycle => (
                <button
                  key={cycle}
                  onClick={() => setSelectedCycle(cycle)}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s',
                    backgroundColor: selectedCycle === cycle ? '#7ECBA1' : 'rgba(126, 203, 161, 0.15)',
                    color: selectedCycle === cycle ? '#06050A' : '#7ECBA1'
                  }}
                >
                  {cycle}
                </button>
              ))}
            </div>
          </div>

          {/* Event Type Filter */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              letterSpacing: '2px',
              color: '#C9A96E',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
              fontWeight: 600
            }}>
              Aspect Type
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {eventTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setSelectedEventType(type.value)}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s',
                    backgroundColor: selectedEventType === type.value
                      ? (type.color || '#C9A96E')
                      : `${type.color || '#C9A96E'}22`,
                    color: selectedEventType === type.value ? '#06050A' : (type.color || '#C9A96E')
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#C9A96E',
                textTransform: 'uppercase',
                margin: '0 0 8px 0',
                fontWeight: 600
              }}>
                Search
              </p>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Search size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  color: '#8B7EC7'
                }} />
                <input
                  type="text"
                  placeholder="Search events, celestial aspects, cycles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid rgba(201, 169, 110, 0.2)',
                    background: 'rgba(13, 11, 24, 0.6)',
                    color: '#E8D4B8',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '13px',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#C9A96E';
                    e.target.style.background = 'rgba(13, 11, 24, 0.9)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(201, 169, 110, 0.2)';
                    e.target.style.background = 'rgba(13, 11, 24, 0.6)';
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowGlossary(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(201, 169, 110, 0.3)',
                background: 'rgba(201, 169, 110, 0.1)',
                color: '#C9A96E',
                cursor: 'pointer',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(201, 169, 110, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(201, 169, 110, 0.1)';
              }}
            >
              <BookOpen size={16} />
              Glossary
            </button>
          </div>

          {/* Results Count */}
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: '#8B7EC7',
            margin: 0
          }}>
            Showing <span style={{ color: '#C9A96E', fontWeight: 600 }}>{filteredEvents.length}</span> of <span style={{ color: '#C9A96E', fontWeight: 600 }}>{eventsDatabase.length}</span> events
          </p>
        </div>

        {/* Events Grid */}
        <div style={{
          padding: '40px',
          maxWidth: '1000px'
        }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px'
            }}>
              <Filter size={48} style={{
                color: '#8B7EC7',
                marginBottom: '16px',
                opacity: 0.5
              }} />
              <p style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '18px',
                color: '#B8A890',
                margin: 0
              }}>
                No events found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '40px',
          textAlign: 'center',
          borderTop: '1px solid rgba(201, 169, 110, 0.15)',
          background: 'linear-gradient(175deg, rgba(6, 5, 10, 0.9) 0%, rgba(10, 8, 20, 0.8) 100%)'
        }}>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: '12px',
            lineHeight: 1.6,
            color: '#8B7EC7',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <strong>Disclaimer:</strong> Astrology is a lens, not a law. The interpretations presented here use classical astrological principles to explore potential correlations between celestial configurations and world events. This is speculative analysis, not causal claim or scientific prediction. History is complex; astrology is one framework among many for finding meaning in patterns. Use this tool for curiosity and contemplation, not certainty.
          </p>
        </div>
      </div>

      {showGlossary && <GlossaryModal />}
    </div>
  );
};

export default CosmosDailyApp;
