/**
 * simulator.js — Calculation engine for the 51% Attack Simulator
 * Pure math, no DOM manipulation.
 *
 * Two scenarios:
 *   'external'  — Attacker must buy all ASICs from scratch
 *   'collusion' — Existing miners already own the hashrate
 */
const Simulator = (() => {

  const ASIC_MODELS = [
    // MicroBT
    { id: 'm60s',     name: 'MicroBT M60S',         hashrate: 184, power: 3404, price: 1500 },
    { id: 'm70s',     name: 'MicroBT M70S',         hashrate: 242, power: 3270, price: 4500 },
    // Bitmain — Air
    { id: 's21',      name: 'Antminer S21',          hashrate: 200, power: 3500, price: 2000 },
    { id: 's21pro',   name: 'Antminer S21 Pro',      hashrate: 234, power: 3510, price: 2800 },
    { id: 's21xp',    name: 'Antminer S21 XP',       hashrate: 270, power: 3645, price: 3335 },
    { id: 's23',      name: 'Antminer S23',           hashrate: 318, power: 3498, price: 6000 },
    // Canaan
    { id: 'a16xp',    name: 'Canaan A16 XP',         hashrate: 300, power: 3840, price: 5000 },
    // Hydro/Immersion (alto desempenho)
    { id: 's21xphyd', name: 'Antminer S21 XP Hyd',   hashrate: 473, power: 5676, price: 10000 },
    { id: 's23hyd',   name: 'Antminer S23 Hyd',      hashrate: 580, power: 5510, price: 12000 },
    { id: 's23hyd3u', name: 'Antminer S23 Hyd 3U',   hashrate: 1160, power: 11020, price: 24000 },
  ];

  // Bitcoin constants
  const BLOCKS_PER_HOUR = 6;                // ~10 min per block
  const BLOCK_REWARD_BTC = 3.125;           // post-halving 2024
  const BLOCK_FEES_BTC = 0.25;              // average tx fees per block (conservative)
  const REVENUE_PER_BLOCK_BTC = BLOCK_REWARD_BTC + BLOCK_FEES_BTC;

  /**
   * Calculate attack cost and requirements.
   * @param {Object} params
   * @param {number}  params.networkHashrateEH
   * @param {number}  params.attackPercent      — % of network to control (51-100)
   * @param {number}  params.durationHours
   * @param {number}  params.energyCostKWh
   * @param {string}  params.asicModelId
   * @param {string}  params.scenario           — 'external' | 'collusion'
   * @param {number}  params.btcPriceUSD        — current BTC price
   * @returns {Object}
   */
  function calculate(params) {
    const asic = ASIC_MODELS.find(m => m.id === params.asicModelId) || ASIC_MODELS[1];
    const isCollusion = params.scenario === 'collusion';

    // Hashrate math
    const attackHashrateEH = params.networkHashrateEH * (params.attackPercent / 100);
    const attackHashrateTH = attackHashrateEH * 1_000_000;
    const asicsNeeded = Math.ceil(attackHashrateTH / asic.hashrate);

    // Hardware cost
    const asicCostUSD = isCollusion ? 0 : asicsNeeded * asic.price;

    // Power
    const totalPowerW  = asicsNeeded * asic.power;
    const totalPowerKW = totalPowerW / 1_000;
    const totalPowerMW = totalPowerKW / 1_000;
    const totalPowerGW = totalPowerMW / 1_000;

    // Energy
    const energyMWh = totalPowerMW * params.durationHours;
    const energyGWh = energyMWh / 1_000;
    const energyTWh = energyGWh / 1_000;
    const energyCostUSD = totalPowerKW * params.energyCostKWh * params.durationHours;

    // Weight
    const totalWeightTons = (asicsNeeded * 15) / 1_000;

    // ─── Collusion-specific: opportunity cost ───
    // Blocks the colluding miners WOULD have mined honestly during the attack
    const blocksInDuration = BLOCKS_PER_HOUR * params.durationHours;
    // Their share of blocks (proportional to their hashrate)
    const attackShareOfNetwork = params.attackPercent / 100;
    const blocksLost = blocksInDuration * attackShareOfNetwork;
    const btcForegone = blocksLost * REVENUE_PER_BLOCK_BTC;
    const opportunityCostUSD = btcForegone * (params.btcPriceUSD || 0);

    // ─── Collusion-specific: value destruction ───
    // Estimated BTC holdings at risk for miners controlling this much hashrate
    // Conservative: miners typically hold 1-3 months of revenue
    const monthlyRevenueBTC = BLOCKS_PER_HOUR * 24 * 30 * attackShareOfNetwork * REVENUE_PER_BLOCK_BTC;
    const estimatedHoldingsBTC = monthlyRevenueBTC * 2; // ~2 months average
    const holdingsValueUSD = estimatedHoldingsBTC * (params.btcPriceUSD || 0);
    // A successful attack would likely crash BTC price by 50-80%
    const estimatedValueDestructionUSD = holdingsValueUSD * 0.7; // assume 70% crash

    // ─── Future revenue destroyed ───
    // If Bitcoin dies, their ASICs become paperweights
    const asicFleetValueUSD = asicsNeeded * asic.price;

    // Total cost depends on scenario
    let totalCostUSD;
    if (isCollusion) {
      // Opportunity cost + energy cost + BTC holdings value destruction
      totalCostUSD = opportunityCostUSD + energyCostUSD + estimatedValueDestructionUSD;
    } else {
      totalCostUSD = asicCostUSD + energyCostUSD;
    }

    return {
      scenario: params.scenario,
      asic,
      attackHashrateEH,
      asicsNeeded,
      asicCostUSD,
      totalPowerW,
      totalPowerKW,
      totalPowerMW,
      totalPowerGW,
      energyMWh,
      energyGWh,
      energyTWh,
      energyCostUSD,
      totalCostUSD,
      totalWeightTons,
      durationHours: params.durationHours,
      // Collusion extras
      blocksLost,
      btcForegone,
      opportunityCostUSD,
      estimatedHoldingsBTC,
      holdingsValueUSD,
      estimatedValueDestructionUSD,
      asicFleetValueUSD,
    };
  }

  return { calculate, ASIC_MODELS };
})();
