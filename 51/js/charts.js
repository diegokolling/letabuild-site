/**
 * charts.js — Canvas-based charts for the 51% Attack Simulator
 */
const Charts = (() => {

  function getColors() {
    const isDark = !document.documentElement.getAttribute('data-theme')
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : document.documentElement.getAttribute('data-theme') === 'dark';

    return {
      text:       isDark ? '#ffffff' : '#1a2b3c',
      textMuted:  isDark ? '#a0a0a0' : '#7a8a98',
      accent:     '#e08a3a',
      attack:     '#f85149',
      bar:        isDark ? 'rgba(224, 138, 58, 0.6)' : 'rgba(224, 138, 58, 0.5)',
      barBg:      isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
      gridLine:   isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    };
  }

  /**
   * Draw horizontal bar chart comparing attack cost to GDPs.
   */
  function drawGDPChart(canvasId, gdpData, lang) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;

    const items = [];

    // Add countries below
    gdpData.below.forEach(g => {
      const label = (lang === 'en' && g.nameEn) ? g.nameEn : g.name;
      items.push({ label, value: g.usd, isAttack: false });
    });

    // Add attack cost
    const attackLabel = lang === 'en' ? '51% Attack Cost' : 'Custo do Ataque 51%';
    items.push({ label: attackLabel, value: gdpData.attackCost, isAttack: true });

    // Add countries above
    gdpData.above.forEach(g => {
      const label = (lang === 'en' && g.nameEn) ? g.nameEn : g.name;
      items.push({ label, value: g.usd, isAttack: false });
    });

    // Sort by value
    items.sort((a, b) => a.value - b.value);

    const barHeight = 36;
    const barGap = 8;
    const labelWidth = 180;
    const valueWidth = 100;
    const chartLeft = labelWidth + 10;
    const chartRight = width - valueWidth - 10;
    const chartWidth = chartRight - chartLeft;
    const topPad = 10;
    const height = topPad + items.length * (barHeight + barGap);

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = getColors();
    const maxValue = Math.max(...items.map(i => i.value));

    items.forEach((item, i) => {
      const y = topPad + i * (barHeight + barGap);
      const barW = (item.value / maxValue) * chartWidth;

      // Label
      ctx.font = item.isAttack ? '600 13px Inter, sans-serif' : '400 13px Inter, sans-serif';
      ctx.fillStyle = item.isAttack ? colors.attack : colors.text;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, labelWidth, y + barHeight / 2);

      // Bar background
      ctx.fillStyle = colors.barBg;
      ctx.beginPath();
      roundRect(ctx, chartLeft, y + 2, chartWidth, barHeight - 4, 4);
      ctx.fill();

      // Bar
      ctx.fillStyle = item.isAttack ? colors.attack : colors.bar;
      if (barW > 4) {
        ctx.beginPath();
        roundRect(ctx, chartLeft, y + 2, barW, barHeight - 4, 4);
        ctx.fill();
      }

      // Value label
      ctx.font = '500 12px Inter, sans-serif';
      ctx.fillStyle = item.isAttack ? colors.attack : colors.textMuted;
      ctx.textAlign = 'left';
      ctx.fillText(formatUSD(item.value), chartRight + 12, y + barHeight / 2);
    });
  }

  /**
   * Draw horizontal bar chart comparing attack cost to company market caps.
   */
  function drawCompanyChart(canvasId, companyData, lang) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;

    const items = [];

    companyData.below.forEach(c => {
      items.push({ label: c.name, value: c.usd, isAttack: false });
    });

    const attackLabel = lang === 'en' ? '51% Attack Cost' : 'Custo do Ataque 51%';
    items.push({ label: attackLabel, value: companyData.attackCost, isAttack: true });

    companyData.above.forEach(c => {
      items.push({ label: c.name, value: c.usd, isAttack: false });
    });

    items.sort((a, b) => a.value - b.value);

    const barHeight = 36;
    const barGap = 8;
    const labelWidth = 180;
    const valueWidth = 100;
    const chartLeft = labelWidth + 10;
    const chartRight = width - valueWidth - 10;
    const chartWidth = chartRight - chartLeft;
    const topPad = 10;
    const height = topPad + items.length * (barHeight + barGap);

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = getColors();
    const maxValue = Math.max(...items.map(i => i.value));

    items.forEach((item, i) => {
      const y = topPad + i * (barHeight + barGap);
      const barW = (item.value / maxValue) * chartWidth;

      ctx.font = item.isAttack ? '600 13px Inter, sans-serif' : '400 13px Inter, sans-serif';
      ctx.fillStyle = item.isAttack ? colors.attack : colors.text;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, labelWidth, y + barHeight / 2);

      ctx.fillStyle = colors.barBg;
      ctx.beginPath();
      roundRect(ctx, chartLeft, y + 2, chartWidth, barHeight - 4, 4);
      ctx.fill();

      ctx.fillStyle = item.isAttack ? colors.attack : colors.bar;
      if (barW > 4) {
        ctx.beginPath();
        roundRect(ctx, chartLeft, y + 2, barW, barHeight - 4, 4);
        ctx.fill();
      }

      ctx.font = '500 12px Inter, sans-serif';
      ctx.fillStyle = item.isAttack ? colors.attack : colors.textMuted;
      ctx.textAlign = 'left';
      ctx.fillText(formatUSD(item.value), chartRight + 12, y + barHeight / 2);
    });
  }

  /**
   * Draw cost breakdown donut chart.
   */
  function drawBreakdownChart(canvasId, asicCost, energyCost, lang, opts) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(canvas.parentElement.getBoundingClientRect().width, 220);

    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const colors = getColors();
    const total = asicCost + energyCost;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 10;
    const innerRadius = radius * 0.6;

    // ASIC slice
    const asicAngle = (asicCost / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + asicAngle);
    ctx.arc(cx, cy, innerRadius, -Math.PI / 2 + asicAngle, -Math.PI / 2, true);
    ctx.closePath();
    ctx.fillStyle = colors.accent;
    ctx.fill();

    // Energy slice
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI / 2 + asicAngle, -Math.PI / 2 + Math.PI * 2);
    ctx.arc(cx, cy, innerRadius, -Math.PI / 2 + Math.PI * 2, -Math.PI / 2 + asicAngle, true);
    ctx.closePath();
    ctx.fillStyle = colors.attack;
    ctx.fill();

    // Center text
    const asicPct = Math.round((asicCost / total) * 100);
    ctx.font = '700 24px Inter, sans-serif';
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(asicPct + '%', cx, cy - 8);
    ctx.font = '400 11px Inter, sans-serif';
    ctx.fillStyle = colors.textMuted;
    ctx.fillText(opts?.label1 || 'ASICs', cx, cy + 12);
  }

  // Helpers
  function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }

  function formatUSD(value) {
    if (value >= 1e12) return '$' + (value / 1e12).toFixed(1) + 'T';
    if (value >= 1e9)  return '$' + (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6)  return '$' + (value / 1e6).toFixed(1) + 'M';
    return '$' + Math.round(value).toLocaleString('en-US');
  }

  return { drawGDPChart, drawCompanyChart, drawBreakdownChart };
})();
