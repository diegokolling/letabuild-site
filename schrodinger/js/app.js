/**
 * app.js — Orchestration for the Schrodinger Bitcoin Valuation Model
 */
const App = (() => {

  let scenariosData = null;
  let currentScenario = 'base';
  let currentAssets = [];
  let currentDiscountRate = 0.12;
  let currentLang = 'pt';
  let btcPrice = 0;
  let assetColors = {};
  let isCustom = false;

  function init() {
    // Detect saved language
    const saved = localStorage.getItem('letabuild-lang');
    if (saved === 'en') currentLang = 'en';

    fetchData();
    bindEvents();

    // Listen for language changes
    window.addEventListener('langchange', (e) => {
      currentLang = e.detail?.lang || 'pt';
      rebuildAssetCards();
      recalculate();
    });

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      Charts.destroy();
      recalculate();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  function fetchData() {
    // Fetch scenarios and BTC price in parallel
    Promise.all([
      fetch('data/scenarios.json?' + Date.now()).then(r => r.json()),
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(r => r.json())
        .then(d => d.bitcoin.usd)
        .catch(() => 84000) // fallback
    ]).then(([data, price]) => {
      scenariosData = data;
      assetColors = data.assetColors || {};
      btcPrice = price;

      // Update price display
      setText('live-btc-price', '$' + Number(price).toLocaleString('en-US'));
      setText('live-btc-mcap', '$' + formatCompactT(price * Model.BTC_SUPPLY));
      setText('live-btc-supply', Number(Model.BTC_SUPPLY).toLocaleString('en-US', { maximumFractionDigits: 0 }));

      loadScenario('base');
    }).catch(err => {
      console.error('Failed to load data:', err);
    });
  }

  function loadScenario(id) {
    if (!scenariosData) return;
    const scenario = scenariosData.scenarios[id];
    if (!scenario) return;

    currentScenario = id;
    isCustom = false;
    currentDiscountRate = scenario.discountRate;
    currentAssets = JSON.parse(JSON.stringify(scenario.assets)); // deep clone

    // Update discount rate slider
    const slider = document.getElementById('input-discount-rate');
    const display = document.getElementById('display-discount-rate');
    if (slider) slider.value = (currentDiscountRate * 100).toFixed(0);
    if (display) display.textContent = (currentDiscountRate * 100).toFixed(0) + '%';

    // Update scenario buttons
    document.querySelectorAll('.scenario-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scenario === id);
    });
    const customPill = document.getElementById('pill-custom');
    if (customPill) customPill.classList.remove('active');

    rebuildAssetCards();
    recalculate();
  }

  function markCustom() {
    if (isCustom) return;
    isCustom = true;
    document.querySelectorAll('.scenario-pill').forEach(btn => btn.classList.remove('active'));
    const customPill = document.getElementById('pill-custom');
    if (customPill) customPill.classList.add('active');
  }

  function rebuildAssetCards() {
    const container = document.getElementById('asset-cards');
    if (!container) return;
    container.innerHTML = '';

    currentAssets.forEach((asset, idx) => {
      const name = currentLang === 'en' ? asset.nameEn : asset.namePt;
      const color = assetColors[asset.id] || '#888';

      const card = document.createElement('div');
      card.className = 'asset-card';
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="asset-header" data-index="${idx}">
          <div class="asset-header-left">
            <span class="asset-dot" style="background:${color}"></span>
            <span class="asset-name">${name}</span>
          </div>
          <div class="asset-header-right">
            <span class="asset-contribution" id="contrib-${idx}">$0</span>
            <span class="asset-chevron">&#9660;</span>
          </div>
        </div>
        <div class="asset-body" id="body-${idx}">
          <div class="asset-field">
            <label data-pt="Market Cap (trilhões USD)" data-en="Market Cap (USD trillions)">
              ${currentLang === 'en' ? 'Market Cap (USD trillions)' : 'Market Cap (trilhões USD)'}
            </label>
            <input type="number" class="asset-input" data-index="${idx}" data-field="mcapT"
              value="${asset.mcapT}" min="0" step="0.1" inputmode="decimal">
          </div>
          <div class="asset-field">
            <label data-pt="Prêmio Monetário (%)" data-en="Monetary Premium (%)">
              ${currentLang === 'en' ? 'Monetary Premium (%)' : 'Prêmio Monetário (%)'}
            </label>
            <div class="input-row">
              <input type="range" class="asset-slider" data-index="${idx}" data-field="monetaryPremium"
                min="0" max="100" value="${(asset.monetaryPremium * 100).toFixed(0)}" step="1">
              <span class="slider-value" id="sv-premium-${idx}">${(asset.monetaryPremium * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div class="asset-field">
            <label data-pt="Probabilidade de Captura (%)" data-en="Capture Probability (%)">
              ${currentLang === 'en' ? 'Capture Probability (%)' : 'Probabilidade de Captura (%)'}
            </label>
            <div class="input-row">
              <input type="range" class="asset-slider" data-index="${idx}" data-field="captureProb"
                min="0" max="100" value="${(asset.captureProb * 100).toFixed(0)}" step="1">
              <span class="slider-value" id="sv-capture-${idx}">${(asset.captureProb * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div class="asset-field">
            <label data-pt="Horizonte (anos)" data-en="Time Horizon (years)">
              ${currentLang === 'en' ? 'Time Horizon (years)' : 'Horizonte (anos)'}
            </label>
            <div class="input-row">
              <input type="range" class="asset-slider" data-index="${idx}" data-field="years"
                min="1" max="30" value="${asset.years}" step="1">
              <span class="slider-value" id="sv-years-${idx}">${asset.years}</span>
            </div>
          </div>
        </div>
      `;

      // Color accent on the card
      card.style.borderLeftColor = color;
      container.appendChild(card);
    });

    // Apply language to newly created elements
    if (window.letabuildLang) window.letabuildLang.apply(currentLang);

    // Rebind asset card events
    bindAssetEvents();
  }

  function bindEvents() {
    // Scenario pills
    document.querySelectorAll('.scenario-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.scenario;
        if (id && id !== 'custom') loadScenario(id);
      });
    });

    // Discount rate slider
    const drSlider = document.getElementById('input-discount-rate');
    const drDisplay = document.getElementById('display-discount-rate');
    if (drSlider) {
      drSlider.addEventListener('input', () => {
        currentDiscountRate = Number(drSlider.value) / 100;
        if (drDisplay) drDisplay.textContent = drSlider.value + '%';
        markCustom();
        recalculate();
      });
    }
  }

  function bindAssetEvents() {
    // Accordion toggle
    document.querySelectorAll('.asset-header').forEach(header => {
      header.addEventListener('click', () => {
        const idx = header.dataset.index;
        const body = document.getElementById('body-' + idx);
        const card = header.closest('.asset-card');
        const wasOpen = card.classList.contains('open');

        // Close all
        document.querySelectorAll('.asset-card').forEach(c => c.classList.remove('open'));
        document.querySelectorAll('.asset-body').forEach(b => b.style.maxHeight = '0');

        // Toggle this one
        if (!wasOpen) {
          card.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });

    // Asset inputs
    document.querySelectorAll('.asset-input').forEach(input => {
      input.addEventListener('input', () => {
        const idx = Number(input.dataset.index);
        const field = input.dataset.field;
        const val = parseFloat(input.value);
        if (!isNaN(val) && val >= 0) {
          currentAssets[idx][field] = val;
          markCustom();
          recalculate();
        }
      });
    });

    // Asset sliders
    document.querySelectorAll('.asset-slider').forEach(slider => {
      slider.addEventListener('input', () => {
        const idx = Number(slider.dataset.index);
        const field = slider.dataset.field;
        const rawVal = Number(slider.value);

        if (field === 'monetaryPremium' || field === 'captureProb') {
          currentAssets[idx][field] = rawVal / 100;
          const displayId = field === 'monetaryPremium' ? `sv-premium-${idx}` : `sv-capture-${idx}`;
          setText(displayId, rawVal + '%');
        } else if (field === 'years') {
          currentAssets[idx][field] = rawVal;
          setText(`sv-years-${idx}`, rawVal.toString());
        }

        markCustom();
        recalculate();
      });
    });
  }

  function recalculate() {
    if (!currentAssets.length) return;

    const result = Model.calculateFairValue(currentAssets, currentDiscountRate);

    // Update main results
    setText('result-fair-value', formatUSD(result.pricePerBTC));
    setText('result-mcap', formatUSD(result.totalFairValue));

    // Multiplier
    const mult = btcPrice > 0 ? result.pricePerBTC / btcPrice : 0;
    const multEl = document.getElementById('result-multiplier');
    if (multEl) {
      multEl.textContent = mult >= 1 ? mult.toFixed(1) + 'x' : (mult * 100).toFixed(0) + '%';
      multEl.style.color = mult >= 1 ? 'var(--success)' : 'var(--danger)';
    }

    // Update contribution on each card header
    result.contributions.forEach((c, i) => {
      const contribEl = document.getElementById('contrib-' + i);
      if (contribEl) {
        const perBtc = c.contribution / Model.BTC_SUPPLY;
        contribEl.textContent = formatUSD(perBtc);
      }
    });

    // Charts
    const nonZero = result.contributions.filter(c => c.contribution > 0);
    Charts.drawDoughnut('chart-doughnut', nonZero, assetColors, currentLang);

    const path = Model.calculateMonetizationPath(currentAssets, currentDiscountRate);
    const assetNames = {};
    currentAssets.forEach(a => {
      assetNames[a.id] = { pt: a.namePt, en: a.nameEn };
    });
    Charts.drawArea('chart-area', path, assetColors, assetNames, btcPrice, currentLang);

    // Implied probability table
    updateImpliedTable(result);
  }

  function updateImpliedTable() {
    const tbody = document.getElementById('implied-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    currentAssets.forEach(asset => {
      const impliedProb = Model.calculateImpliedProbability(btcPrice, asset, currentDiscountRate);
      const name = currentLang === 'en' ? asset.nameEn : asset.namePt;
      const color = assetColors[asset.id] || '#888';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><span class="implied-dot" style="background:${color}"></span>${name}</td>
        <td>$${(asset.mcapT).toFixed(1)}T</td>
        <td>${(asset.monetaryPremium * 100).toFixed(0)}%</td>
        <td style="font-weight:600;color:${color}">${(impliedProb * 100).toFixed(1)}%</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Helpers
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function formatUSD(n) {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9)  return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6)  return '$' + (n / 1e6).toFixed(0) + 'M';
    if (n >= 1e3)  return '$' + Math.round(n).toLocaleString('en-US');
    return '$' + n.toFixed(2);
  }

  function formatCompactT(n) {
    if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9)  return (n / 1e9).toFixed(2) + 'B';
    return Math.round(n).toLocaleString('en-US');
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
