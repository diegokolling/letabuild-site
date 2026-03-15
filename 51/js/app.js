/**
 * app.js — Orchestration for the 51% Attack Simulator
 */
const App = (() => {

  // Default network data (overwritten by fetch)
  let networkData = {
    hashrate_eh: 958.9,
    difficulty_t: 145.0,
    btc_price_usd: 71550,
    last_updated: '2026-03-15',
  };

  // Current simulation params
  let params = {
    networkHashrateEH: 958.9,
    attackPercent: 51,
    durationHours: 1,
    energyCostKWh: 0.05,
    asicModelId: 's21pro',
    scenario: 'external',
    btcPriceUSD: 71550,
  };

  let currentLang = 'pt';

  function init() {
    fetchNetworkData();
    buildASICDropdown();
    bindEvents();
    recalculate();

    // Listen for language changes
    document.addEventListener('langchange', (e) => {
      currentLang = e.detail?.lang || 'pt';
      recalculate();
    });

    // Listen for theme changes
    const observer = new MutationObserver(() => recalculate());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Detect initial language
    const saved = localStorage.getItem('letabuild-lang');
    if (saved === 'en') currentLang = 'en';
  }

  function fetchNetworkData() {
    fetch('data/network.json?' + Date.now())
      .then(r => r.json())
      .then(data => {
        networkData = data;
        params.networkHashrateEH = data.hashrate_eh;
        params.btcPriceUSD = data.btc_price_usd;

        // Update network info cards
        setTextById('net-hashrate', formatNumber(data.hashrate_eh) + ' EH/s');
        setTextById('net-difficulty', formatNumber(data.difficulty_t) + ' T');
        setTextById('net-btcprice', '$' + Number(data.btc_price_usd).toLocaleString('en-US'));
        setTextById('net-updated', data.last_updated);

        // Update hashrate input
        const hrInput = document.getElementById('input-hashrate');
        if (hrInput) hrInput.value = data.hashrate_eh;

        recalculate();
      })
      .catch(() => {
        recalculate();
      });
  }

  function buildASICDropdown() {
    const select = document.getElementById('input-asic');
    if (!select) return;
    select.innerHTML = '';
    Simulator.ASIC_MODELS.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.name} (${m.hashrate} TH/s, ${(m.power / 1000).toFixed(1)} kW, $${m.price.toLocaleString()})`;
      if (m.id === params.asicModelId) opt.selected = true;
      select.appendChild(opt);
    });
  }

  function bindEvents() {
    // Scenario toggle
    document.querySelectorAll('input[name="scenario"]').forEach(radio => {
      radio.addEventListener('change', () => {
        params.scenario = radio.value;
        // Toggle active class on labels
        document.querySelectorAll('.scenario-option').forEach(l => l.classList.remove('active'));
        radio.closest('.scenario-option').classList.add('active');
        updateScenarioUI();
        recalculate();
      });
    });

    // Sliders
    bindSlider('input-attack-pct', 'display-attack-pct', v => {
      params.attackPercent = Number(v);
    });

    bindSlider('input-duration', 'display-duration', v => {
      params.durationHours = Number(v);
    });

    bindSlider('input-energy-cost', 'display-energy-cost', v => {
      params.energyCostKWh = Number(v);
    });

    // Hashrate input
    const hrInput = document.getElementById('input-hashrate');
    if (hrInput) {
      hrInput.addEventListener('input', () => {
        const v = parseFloat(hrInput.value);
        if (v > 0) {
          params.networkHashrateEH = v;
          recalculate();
        }
      });
    }

    // ASIC dropdown
    const asicSelect = document.getElementById('input-asic');
    if (asicSelect) {
      asicSelect.addEventListener('change', () => {
        params.asicModelId = asicSelect.value;
        recalculate();
      });
    }

    // Set initial UI state
    updateScenarioUI();
  }

  function updateScenarioUI() {
    const isCollusion = params.scenario === 'collusion';

    // Show/hide relevant result cards
    document.querySelectorAll('.external-only').forEach(el => {
      el.style.display = isCollusion ? 'none' : '';
    });
    document.querySelectorAll('.collusion-only').forEach(el => {
      el.style.display = isCollusion ? '' : 'none';
    });

    // Update scenario description
    const descEl = document.getElementById('scenario-description');
    if (descEl) {
      if (isCollusion) {
        descEl.setAttribute('data-pt', 'Mineradores existentes com 51%+ do hashrate decidem atacar. Já possuem o hardware. O custo real é o que perdem: recompensas de bloco, valor dos seus BTC, e valor da frota de ASICs (caso o ataque seja bem sucedido).');
        descEl.setAttribute('data-en', 'Existing miners with 51%+ of hashrate decide to attack. They already own the hardware. The real cost is what they lose: block rewards, value of their BTC holdings, and ASIC fleet value (if the attack succeeds).');
        descEl.textContent = currentLang === 'en'
          ? descEl.getAttribute('data-en')
          : descEl.getAttribute('data-pt');
      } else {
        descEl.setAttribute('data-pt', 'Um atacante externo precisa comprar todas as ASICs do zero e pagar pela energia. O cenário mais caro e mais frequentemente citado.');
        descEl.setAttribute('data-en', 'An external attacker must buy all ASICs from scratch and pay for energy. The most expensive and most commonly cited scenario.');
        descEl.textContent = currentLang === 'en'
          ? descEl.getAttribute('data-en')
          : descEl.getAttribute('data-pt');
      }
    }
  }

  function bindSlider(sliderId, displayId, setter) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    if (!slider) return;

    slider.addEventListener('input', () => {
      if (display) display.textContent = formatSliderValue(sliderId, slider.value);
      setter(slider.value);
      recalculate();
    });

    if (display) display.textContent = formatSliderValue(sliderId, slider.value);
  }

  function formatSliderValue(id, val) {
    if (id === 'input-attack-pct') return val + '%';
    if (id === 'input-duration') {
      const h = Number(val);
      if (h < 24) return h + 'h';
      const days = Math.floor(h / 24);
      const rem = h % 24;
      return rem > 0 ? days + 'd ' + rem + 'h' : days + 'd';
    }
    if (id === 'input-energy-cost') return '$' + Number(val).toFixed(2);
    return val;
  }

  function recalculate() {
    const results = Simulator.calculate(params);
    updateResults(results);
    updateComparisons(results);
    updateCharts(results);
  }

  function updateResults(r) {
    const isCollusion = r.scenario === 'collusion';

    // Common results
    setTextById('result-asics', formatBigNumber(r.asicsNeeded));
    setTextById('result-power', formatPower(r.totalPowerMW));
    setTextById('result-energy', formatEnergy(r.energyMWh));
    setTextById('result-weight', formatWeight(r.totalWeightTons));

    // External-only
    setTextById('result-asic-cost', formatUSD(r.asicCostUSD));
    setTextById('result-energy-cost', formatUSD(r.energyCostUSD));

    // Collusion-only
    setTextById('result-opportunity', formatUSD(r.opportunityCostUSD));
    setTextById('result-btc-foregone', formatBTC(r.btcForegone));
    setTextById('result-value-destruction', formatUSD(r.estimatedValueDestructionUSD));
    setTextById('result-fleet-value', formatUSD(r.asicFleetValueUSD));

    // Total
    setTextById('result-total', formatUSD(r.totalCostUSD));
  }

  function updateComparisons(r) {
    // Energy comparisons grid
    const energyGrid = document.getElementById('energy-comparisons');
    if (energyGrid) {
      const comps = Comparisons.calcEnergyComparisons(r.totalPowerMW);
      energyGrid.innerHTML = comps.map(c => {
        const label = currentLang === 'en' ? c.en : c.pt;
        const countText = c.count >= 1
          ? c.display + 'x'
          : (c.count * 100).toFixed(1) + '%';
        const subtitle = c.count >= 1
          ? (currentLang === 'en' ? 'Equivalent to' : 'Equivalente a')
          : (currentLang === 'en' ? 'of capacity' : 'da capacidade');
        return `
          <div class="comp-card">
            <div class="comp-icon">${c.icon}</div>
            <div class="comp-count">${countText}</div>
            <div class="comp-subtitle">${subtitle}</div>
            <div class="comp-label">${label}</div>
          </div>
        `;
      }).join('');
    }

    // Cost reference comparisons
    const costRefs = document.getElementById('cost-comparisons');
    if (costRefs) {
      const refs = Comparisons.findCostRefs(r.totalCostUSD);
      costRefs.innerHTML = refs.map(ref => {
        const label = currentLang === 'en' ? ref.en : ref.pt;
        const mult = ref.multiple;
        const text = mult >= 1
          ? mult.toFixed(1) + 'x'
          : (mult * 100).toFixed(0) + '%';
        return `
          <div class="comp-card">
            <div class="comp-icon">${ref.icon}</div>
            <div class="comp-count">${text}</div>
            <div class="comp-subtitle">${mult >= 1
              ? (currentLang === 'en' ? 'the cost of' : 'o custo de')
              : (currentLang === 'en' ? 'of the cost of' : 'do custo de')}</div>
            <div class="comp-label">${label}</div>
          </div>
        `;
      }).join('');
    }
  }

  function updateCharts(r) {
    const gdpData = Comparisons.findNearestGDPs(r.totalCostUSD);
    Charts.drawGDPChart('chart-gdp', gdpData, currentLang);

    const companyData = Comparisons.findNearestCompanies(r.totalCostUSD);
    Charts.drawCompanyChart('chart-companies', companyData, currentLang);

    if (r.scenario === 'collusion') {
      Charts.drawBreakdownChart('chart-breakdown', r.opportunityCostUSD, r.estimatedValueDestructionUSD, currentLang,
        { label1: currentLang === 'en' ? 'Opportunity' : 'Oportunidade' });
    } else {
      Charts.drawBreakdownChart('chart-breakdown', r.asicCostUSD, r.energyCostUSD, currentLang);
    }
  }

  // Formatting helpers
  function formatBigNumber(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return Math.round(n).toLocaleString('en-US');
    return n.toString();
  }

  function formatUSD(n) {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + ' T';
    if (n >= 1e9)  return '$' + (n / 1e9).toFixed(2) + ' B';
    if (n >= 1e6)  return '$' + (n / 1e6).toFixed(2) + ' M';
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function formatBTC(n) {
    if (n >= 1000) return Math.round(n).toLocaleString('en-US') + ' BTC';
    if (n >= 1) return n.toFixed(2) + ' BTC';
    return n.toFixed(4) + ' BTC';
  }

  function formatPower(mw) {
    if (mw >= 1000) return (mw / 1000).toFixed(2) + ' GW';
    return mw.toFixed(1) + ' MW';
  }

  function formatEnergy(mwh) {
    if (mwh >= 1e6) return (mwh / 1e6).toFixed(2) + ' TWh';
    if (mwh >= 1000) return (mwh / 1000).toFixed(2) + ' GWh';
    return mwh.toFixed(1) + ' MWh';
  }

  function formatWeight(tons) {
    if (tons >= 1000) return (tons / 1000).toFixed(1) + 'k t';
    return Math.round(tons).toLocaleString('en-US') + ' t';
  }

  function formatNumber(n) {
    return Number(n).toLocaleString('en-US');
  }

  function setTextById(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
