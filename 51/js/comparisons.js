/**
 * comparisons.js — Reference data for visual comparisons
 */
const Comparisons = (() => {

  // Energy consumption reference points (in MW — continuous power draw)
  // Each ref has a specific real-world source for credibility
  const ENERGY_REFS = [
    { id: 'shopping',  pt: 'Shopping Center grande (ex: Iguatemi SP)',   en: 'Large Shopping Mall (e.g. Mall of America)',  mw: 7.5,    icon: '🏬' },
    { id: 'stadium',   pt: 'Estádio de Futebol à Noite (ex: Maracanã)', en: 'Football Stadium at Night (e.g. Wembley)',    mw: 10,     icon: '🏟️' },
    { id: 'city100k',  pt: 'Cidade de 100 mil hab. (ex: Angra dos Reis)', en: 'City of 100k People',                      mw: 50,     icon: '🏙️' },
    { id: 'angra2',    pt: 'Angra 2 (maior usina nuclear do Brasil)',    en: 'Angra 2 (Brazil\'s largest nuclear plant)',   mw: 1350,   icon: '☢️' },
    { id: 'itaipu',    pt: 'Itaipu (maior hidrelétrica do mundo)',       en: 'Itaipu Dam (world\'s largest hydroelectric)', mw: 14000,  icon: '🇧🇷' },
    { id: 'portugal',  pt: 'Todo o Portugal',                           en: 'All of Portugal',                             mw: 7000,   icon: '🇵🇹' },
    { id: 'uk',        pt: 'Todo o Reino Unido',                        en: 'All of United Kingdom',                       mw: 35000,  icon: '🇬🇧' },
  ];

  // GDP data (annual, USD, approximate 2025)
  const GDPS = [
    { name: 'Tuvalu',         usd: 63e6 },
    { name: 'Palau',          usd: 280e6 },
    { name: 'Tonga',          usd: 500e6 },
    { name: 'Belize',         usd: 2.1e9 },
    { name: 'Maldivas',       usd: 6.6e9 },
    { name: 'Montenegro',     usd: 7e9 },
    { name: 'Islândia',       nameEn: 'Iceland', usd: 30e9 },
    { name: 'Paraguai',       nameEn: 'Paraguay', usd: 42e9 },
    { name: 'Croácia',        nameEn: 'Croatia', usd: 78e9 },
    { name: 'Quênia',         nameEn: 'Kenya', usd: 113e9 },
    { name: 'Hungria',        nameEn: 'Hungary', usd: 188e9 },
    { name: 'Portugal',       usd: 268e9 },
    { name: 'Chile',          usd: 335e9 },
    { name: 'Noruega',        nameEn: 'Norway', usd: 485e9 },
    { name: 'Argentina',      usd: 640e9 },
    { name: 'Suíça',          nameEn: 'Switzerland', usd: 885e9 },
    { name: 'Holanda',        nameEn: 'Netherlands', usd: 1.09e12 },
    { name: 'Austrália',      nameEn: 'Australia', usd: 1.72e12 },
    { name: 'Brasil',         nameEn: 'Brazil', usd: 2.13e12 },
    { name: 'Reino Unido',    nameEn: 'United Kingdom', usd: 3.33e12 },
    { name: 'Alemanha',       nameEn: 'Germany', usd: 4.46e12 },
    { name: 'Japão',          nameEn: 'Japan', usd: 4.23e12 },
    { name: 'China',          usd: 18.5e12 },
    { name: 'EUA',            nameEn: 'USA', usd: 27.4e12 },
  ];

  // Company market caps (approximate 2025, USD)
  const COMPANIES = [
    { name: 'Petrobras',         usd: 90e9 },
    { name: 'Nike',              usd: 110e9 },
    { name: 'Goldman Sachs',     usd: 160e9 },
    { name: 'McDonald\'s',       usd: 210e9 },
    { name: 'Coca-Cola',         usd: 270e9 },
    { name: 'JPMorgan',          usd: 600e9 },
    { name: 'Visa',              usd: 550e9 },
    { name: 'Tesla',             usd: 900e9 },
    { name: 'Berkshire Hathaway',usd: 900e9 },
    { name: 'Meta',              usd: 1.5e12 },
    { name: 'Amazon',            usd: 2.0e12 },
    { name: 'Google',            usd: 2.1e12 },
    { name: 'NVIDIA',            usd: 2.7e12 },
    { name: 'Microsoft',         usd: 3.1e12 },
    { name: 'Apple',             usd: 3.4e12 },
  ];

  // Other fun cost comparisons (USD)
  const COST_REFS = [
    { pt: 'Telescópio James Webb',      en: 'James Webb Telescope',          usd: 10e9,  icon: '🔭' },
    { pt: 'Porta-aviões Gerald Ford',   en: 'Aircraft Carrier Gerald Ford',  usd: 13e9,  icon: '🚢' },
    { pt: 'Programa Apollo (ajustado)', en: 'Apollo Program (adjusted)',     usd: 257e9, icon: '🚀' },
    { pt: 'Estação Espacial ISS',       en: 'International Space Station',   usd: 150e9, icon: '🛰️' },
    { pt: 'Copa do Mundo Qatar 2022',   en: 'FIFA World Cup Qatar 2022',     usd: 220e9, icon: '⚽' },
  ];

  /**
   * Find GDP comparisons near the attack cost.
   * Returns countries smaller and larger than the cost.
   */
  function findNearestGDPs(costUSD) {
    const sorted = [...GDPS].sort((a, b) => a.usd - b.usd);
    const results = [];

    // Find the crossover point
    let crossIdx = sorted.findIndex(g => g.usd >= costUSD);
    if (crossIdx === -1) crossIdx = sorted.length;

    // Take 2-3 below and 2-3 above
    const below = sorted.slice(Math.max(0, crossIdx - 3), crossIdx);
    const above = sorted.slice(crossIdx, crossIdx + 3);

    return { below, above, attackCost: costUSD };
  }

  /**
   * Calculate energy comparisons.
   * @param {number} powerMW - Total continuous power in MW
   * @returns {Array} Comparison objects with count
   */
  function calcEnergyComparisons(powerMW) {
    return ENERGY_REFS.map(ref => ({
      ...ref,
      count: powerMW / ref.mw,
      display: formatCount(powerMW / ref.mw),
    }));
  }

  /**
   * Find the nearest company market cap for comparison.
   */
  function findNearestCompanies(costUSD) {
    const sorted = [...COMPANIES].sort((a, b) => a.usd - b.usd);
    let crossIdx = sorted.findIndex(c => c.usd >= costUSD);
    if (crossIdx === -1) crossIdx = sorted.length;

    const below = sorted.slice(Math.max(0, crossIdx - 2), crossIdx);
    const above = sorted.slice(crossIdx, crossIdx + 2);

    return { below, above, attackCost: costUSD };
  }

  /**
   * Find relevant cost reference comparisons.
   */
  function findCostRefs(costUSD) {
    return COST_REFS.map(ref => ({
      ...ref,
      multiple: costUSD / ref.usd,
      display: formatCount(costUSD / ref.usd),
    })).filter(r => r.multiple >= 0.1);
  }

  function formatCount(n) {
    if (n >= 1000) return Math.round(n).toLocaleString('en-US');
    if (n >= 100)  return Math.round(n).toString();
    if (n >= 10)   return n.toFixed(1);
    if (n >= 1)    return n.toFixed(1);
    return n.toFixed(2);
  }

  return {
    findNearestGDPs,
    calcEnergyComparisons,
    findNearestCompanies,
    findCostRefs,
    ENERGY_REFS,
    GDPS,
    COMPANIES,
    COST_REFS,
  };
})();
