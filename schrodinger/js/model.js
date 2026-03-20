/**
 * model.js — Pure calculation engine for the Schrodinger Bitcoin Valuation Model
 * No DOM manipulation. All values in USD trillions internally, output in USD.
 */
const Model = (() => {

  const BTC_SUPPLY = 20_999_999.9769;

  /**
   * Calculate the present-value contribution of a single asset class.
   * Formula: (mcap_T * 1e12 * monetaryPremium * captureProb) / (1 + discountRate)^years
   */
  function calculateAssetContribution(asset, discountRate) {
    const nominalValue = asset.mcapT * 1e12 * asset.monetaryPremium * asset.captureProb;
    const discountFactor = Math.pow(1 + discountRate, asset.years);
    return nominalValue / discountFactor;
  }

  /**
   * Calculate total fair value and price per BTC.
   * @param {Array} assets — array of asset objects
   * @param {number} discountRate — e.g. 0.12 for 12%
   * @returns {{ totalFairValue, pricePerBTC, contributions[] }}
   */
  function calculateFairValue(assets, discountRate) {
    const contributions = assets.map(asset => {
      const value = calculateAssetContribution(asset, discountRate);
      return { ...asset, contribution: value };
    });

    const totalFairValue = contributions.reduce((sum, c) => sum + c.contribution, 0);
    const pricePerBTC = totalFairValue / BTC_SUPPLY;

    return { totalFairValue, pricePerBTC, contributions };
  }

  /**
   * Given the current BTC price, calculate the implied capture probability
   * for a single asset (holding all others at zero).
   * Reverse of: price = (mcap * premium * prob) / ((1+r)^y * supply)
   * => prob = price * supply * (1+r)^y / (mcap * premium)
   */
  function calculateImpliedProbability(currentPrice, asset, discountRate) {
    const denominator = asset.mcapT * 1e12 * asset.monetaryPremium;
    if (denominator === 0) return 0;
    const numerator = currentPrice * BTC_SUPPLY * Math.pow(1 + discountRate, asset.years);
    const prob = numerator / denominator;
    return Math.min(prob, 1); // cap at 100%
  }

  /**
   * Calculate the monetization path year-by-year for the stacked area chart.
   * For each year t from 0 to maxYears, sum the PV of each asset's contribution
   * using min(t, asset.years) as the elapsed time.
   * This shows how value accrues over time.
   * @returns {{ years: number[], series: { id, values[] }[] }}
   */
  function calculateMonetizationPath(assets, discountRate) {
    const maxYears = Math.max(...assets.map(a => a.years));
    const years = [];
    for (let t = 0; t <= maxYears; t++) years.push(t);

    const series = assets.map(asset => {
      const values = years.map(t => {
        if (t === 0) return 0;
        // How much of this asset's value has been "captured" by year t
        const progress = Math.min(t / asset.years, 1);
        const nominalValue = asset.mcapT * 1e12 * asset.monetaryPremium * asset.captureProb * progress;
        const discountFactor = Math.pow(1 + discountRate, Math.min(t, asset.years));
        return (nominalValue / discountFactor) / BTC_SUPPLY;
      });
      return { id: asset.id, values };
    });

    return { years, series };
  }

  return {
    BTC_SUPPLY,
    calculateAssetContribution,
    calculateFairValue,
    calculateImpliedProbability,
    calculateMonetizationPath,
  };
})();
