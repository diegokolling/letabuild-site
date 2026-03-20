/**
 * charts.js — Chart.js-based charts for the Schrodinger Model
 */
const Charts = (() => {

  let doughnutChart = null;
  let areaChart = null;

  function getColors() {
    const isDark = !document.documentElement.getAttribute('data-theme')
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : document.documentElement.getAttribute('data-theme') === 'dark';

    return {
      text:      isDark ? '#ffffff' : '#1a2b3c',
      textMuted: isDark ? '#a0a0a0' : '#7a8a98',
      gridLine:  isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      tooltipBg: isDark ? '#1e1812' : '#ffffff',
      tooltipBorder: isDark ? 'rgba(224,138,58,0.3)' : 'rgba(0,0,0,0.1)',
    };
  }

  /**
   * Draw/update the doughnut chart showing contribution by asset class.
   */
  function drawDoughnut(canvasId, contributions, assetColors, lang) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const colors = getColors();
    const labels = contributions.map(c => lang === 'en' ? (c.nameEn || c.id) : (c.namePt || c.id));
    const data = contributions.map(c => c.contribution);
    const bgColors = contributions.map(c => assetColors[c.id] || '#888');

    if (doughnutChart) {
      doughnutChart.data.labels = labels;
      doughnutChart.data.datasets[0].data = data;
      doughnutChart.data.datasets[0].backgroundColor = bgColors;
      doughnutChart.options.plugins.legend.labels.color = colors.textMuted;
      doughnutChart.options.plugins.tooltip.backgroundColor = colors.tooltipBg;
      doughnutChart.options.plugins.tooltip.titleColor = colors.text;
      doughnutChart.options.plugins.tooltip.bodyColor = colors.textMuted;
      doughnutChart.options.plugins.tooltip.borderColor = colors.tooltipBorder;
      doughnutChart.update();
      return;
    }

    doughnutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors,
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: colors.textMuted,
              padding: 16,
              usePointStyle: true,
              pointStyleWidth: 12,
              font: { family: 'Inter, sans-serif', size: 12 },
            }
          },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.text,
            bodyColor: colors.textMuted,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            titleFont: { family: 'Inter, sans-serif', weight: '600' },
            bodyFont: { family: 'Inter, sans-serif' },
            callbacks: {
              label: function(ctx) {
                const val = ctx.raw;
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct = ((val / total) * 100).toFixed(1);
                return ` ${ctx.label}: ${formatUSD(val)} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }

  /**
   * Draw/update the stacked area chart showing monetization path.
   */
  function drawArea(canvasId, pathData, assetColors, assetNames, currentBtcPrice, lang) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const colors = getColors();
    const yearLabels = pathData.years.map(y => lang === 'en' ? `Year ${y}` : `Ano ${y}`);

    const datasets = pathData.series.map((s, i) => {
      const name = lang === 'en' ? (assetNames[s.id]?.en || s.id) : (assetNames[s.id]?.pt || s.id);
      return {
        label: name,
        data: s.values,
        backgroundColor: hexToRgba(assetColors[s.id] || '#888', 0.5),
        borderColor: assetColors[s.id] || '#888',
        borderWidth: 1,
        fill: true,
        pointRadius: 0,
        tension: 0.3,
      };
    });

    // Annotation: current BTC price line
    const priceLinePlugin = {
      id: 'priceLine',
      afterDraw(chart) {
        if (!currentBtcPrice) return;
        const yScale = chart.scales.y;
        const xScale = chart.scales.x;
        const yPixel = yScale.getPixelForValue(currentBtcPrice);
        if (yPixel < yScale.top || yPixel > yScale.bottom) return;

        const ctx = chart.ctx;
        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = '#f85149';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xScale.left, yPixel);
        ctx.lineTo(xScale.right, yPixel);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillStyle = '#f85149';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'right';
        const labelText = lang === 'en' ? `Current: $${formatCompact(currentBtcPrice)}` : `Atual: $${formatCompact(currentBtcPrice)}`;
        ctx.fillText(labelText, xScale.right - 4, yPixel - 6);
        ctx.restore();
      }
    };

    if (areaChart) {
      areaChart.data.labels = yearLabels;
      areaChart.data.datasets = datasets;
      areaChart.options.scales.x.ticks.color = colors.textMuted;
      areaChart.options.scales.y.ticks.color = colors.textMuted;
      areaChart.options.scales.y.grid.color = colors.gridLine;
      areaChart.options.scales.x.grid.color = colors.gridLine;
      areaChart.options.plugins.legend.labels.color = colors.textMuted;
      areaChart.options.plugins.tooltip.backgroundColor = colors.tooltipBg;
      areaChart.options.plugins.tooltip.titleColor = colors.text;
      areaChart.options.plugins.tooltip.bodyColor = colors.textMuted;
      areaChart.options.plugins.tooltip.borderColor = colors.tooltipBorder;
      // Update price line reference
      areaChart._currentBtcPrice = currentBtcPrice;
      areaChart._lang = lang;
      areaChart.update();
      return;
    }

    // Register a custom plugin for THIS chart instance
    const pricePlugin = {
      id: 'priceLineSchrodinger',
      afterDraw(chart) {
        const price = chart._currentBtcPrice;
        if (!price) return;
        const yScale = chart.scales.y;
        const xScale = chart.scales.x;
        const yPixel = yScale.getPixelForValue(price);
        if (yPixel < yScale.top || yPixel > yScale.bottom) return;

        const ctx = chart.ctx;
        const cLang = chart._lang || 'pt';
        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = '#f85149';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xScale.left, yPixel);
        ctx.lineTo(xScale.right, yPixel);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillStyle = '#f85149';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'right';
        const labelText = cLang === 'en' ? `Current: $${formatCompact(price)}` : `Atual: $${formatCompact(price)}`;
        ctx.fillText(labelText, xScale.right - 4, yPixel - 6);
        ctx.restore();
      }
    };

    areaChart = new Chart(canvas, {
      type: 'line',
      data: { labels: yearLabels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: {
            grid: { color: colors.gridLine },
            ticks: {
              color: colors.textMuted,
              font: { family: 'Inter, sans-serif', size: 11 },
            }
          },
          y: {
            stacked: true,
            grid: { color: colors.gridLine },
            ticks: {
              color: colors.textMuted,
              font: { family: 'Inter, sans-serif', size: 11 },
              callback: function(value) { return '$' + formatCompact(value); }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: colors.textMuted,
              padding: 12,
              usePointStyle: true,
              pointStyleWidth: 12,
              font: { family: 'Inter, sans-serif', size: 12 },
            }
          },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.text,
            bodyColor: colors.textMuted,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            titleFont: { family: 'Inter, sans-serif', weight: '600' },
            bodyFont: { family: 'Inter, sans-serif' },
            callbacks: {
              label: function(ctx) {
                return ` ${ctx.dataset.label}: $${formatCompact(ctx.raw)}`;
              }
            }
          }
        }
      },
      plugins: [pricePlugin]
    });
    areaChart._currentBtcPrice = currentBtcPrice;
    areaChart._lang = lang;
  }

  function destroy() {
    if (doughnutChart) { doughnutChart.destroy(); doughnutChart = null; }
    if (areaChart) { areaChart.destroy(); areaChart = null; }
  }

  // Helpers
  function formatUSD(n) {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9)  return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6)  return '$' + (n / 1e6).toFixed(2) + 'M';
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function formatCompact(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'k';
    return Math.round(n).toLocaleString('en-US');
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  return { drawDoughnut, drawArea, destroy };
})();
