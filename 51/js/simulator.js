/**
 * simulator.js — Calculation engine for the 51% Attack Simulator
 * Pure math, no DOM manipulation.
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

  /**
   * Calculate attack cost and requirements.
   * @param {Object} params
   * @param {number} params.networkHashrateEH - Network hashrate in EH/s
   * @param {number} params.attackPercent - % of network to control (51-100)
   * @param {number} params.durationHours - Duration of attack in hours
   * @param {number} params.energyCostKWh - Cost per kWh in USD
   * @param {string} params.asicModelId - ASIC model ID
   * @returns {Object} Calculated results
   */
  function calculate(params) {
    const asic = ASIC_MODELS.find(m => m.id === params.asicModelId) || ASIC_MODELS[1];

    // Convert network hashrate to TH/s (1 EH = 1,000,000 TH)
    const attackHashrateEH = params.networkHashrateEH * (params.attackPercent / 100);
    const attackHashrateTH = attackHashrateEH * 1_000_000;

    // ASICs needed
    const asicsNeeded = Math.ceil(attackHashrateTH / asic.hashrate);

    // Cost of ASICs
    const asicCostUSD = asicsNeeded * asic.price;

    // Power consumption
    const totalPowerW  = asicsNeeded * asic.power;
    const totalPowerKW = totalPowerW / 1_000;
    const totalPowerMW = totalPowerKW / 1_000;
    const totalPowerGW = totalPowerMW / 1_000;

    // Energy consumed over the attack duration
    const energyMWh = totalPowerMW * params.durationHours;
    const energyGWh = energyMWh / 1_000;
    const energyTWh = energyGWh / 1_000;

    // Energy cost
    const energyCostUSD = totalPowerKW * params.energyCostKWh * params.durationHours;

    // Total cost
    const totalCostUSD = asicCostUSD + energyCostUSD;

    // Weight (each S21 Pro ~ 15kg)
    const totalWeightKg = asicsNeeded * 15;
    const totalWeightTons = totalWeightKg / 1_000;

    return {
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
    };
  }

  return { calculate, ASIC_MODELS };
})();
