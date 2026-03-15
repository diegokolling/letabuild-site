// ============================================================
// App — Main orchestration for inheritance tutorial
// ============================================================

(function () {
  let lang = (window.letabuildLang && window.letabuildLang.get()) || 'pt';
  let pendingTutorialId = null;

  // ── DOM ─────────────────────────────────────────────────
  const $ = function (id) { return document.getElementById(id); };

  const screens = {
    landing:      $('screenLanding'),
    wizard:       $('screenWizard'),
    browse:       $('screenBrowse'),
    practices:    $('screenPractices'),
    tutorial:     $('screenTutorial'),
    completion:   $('screenCompletion')
  };

  // ── Screen Management ───────────────────────────────────
  function showScreen(name) {
    Object.values(screens).forEach(function (s) { s.classList.remove('active'); });
    screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Language ────────────────────────────────────────────
  function setLanguage(newLang) {
    lang = newLang;
    var ui = UI_STRINGS[lang];

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = ui.landingTitle + ' — ' + ui.landingTitleHighlight;

    // Landing
    $('landingTitle').innerHTML = lang === 'pt'
      ? 'Herança <span class="highlight">Bitcoin</span>'
      : 'Bitcoin <span class="highlight">Inheritance</span>';
    $('landingSubtitle').textContent = ui.landingSubtitle;
    $('landingMeta').textContent = ui.landingMeta;
    $('btnGuideLabel').textContent = ui.btnGuide;
    $('btnGuideDesc').textContent = ui.btnGuideDesc;
    $('btnBrowseLabel').textContent = ui.btnBrowse;
    $('btnBrowseDesc').textContent = ui.btnBrowseDesc;

    // Prerequisites banner
    $('prereqTitle').textContent = ui.prerequisiteTitle;
    $('prereqText').innerHTML = ui.prerequisiteText;
    $('prereqLink').innerHTML = ui.prerequisiteLink + ' &rarr;';

    // Disclaimer
    $('disclaimerTitle').textContent = ui.disclaimerTitle;
    $('disclaimerText').innerHTML = ui.disclaimerText;
    $('btnDisclaimer').textContent = ui.disclaimerAccept;

    // Wizard
    $('wizardTitle').textContent = ui.wizardTitle;

    // PDF button
    $('btnDownloadPDFText').textContent = ui.downloadPDF;

    // Footer
    $('footerCredits').textContent = ui.credits + ' ';
    $('footerAnd').textContent = ' ' + ui.and + ' ';
  }

  // ── Disclaimer ──────────────────────────────────────────
  function showDisclaimer(callback) {
    var overlay = $('disclaimerOverlay');
    overlay.classList.add('show');

    function onAccept() {
      overlay.classList.remove('show');
      $('btnDisclaimer').removeEventListener('click', onAccept);
      if (callback) callback();
    }

    $('btnDisclaimer').addEventListener('click', onAccept);
  }

  // ── Wizard Rendering ───────────────────────────────────
  // Panel order: Q1(0), Warning1(1), Q2(2), Q3(3), Warning3(4), Q4(5), Warning4(6), Result(7)
  var wizardStep = 0;
  var allWizardPanels = [
    'wizQ1', 'wizInlineWarning1',
    'wizQ2', 'wizQ3', 'wizInlineWarning3',
    'wizQ4', 'wizInlineWarning4',
    'wizResult'
  ];

  function showWizardPanel(stepIndex) {
    wizardStep = stepIndex;
    allWizardPanels.forEach(function (id, i) {
      $(id).classList.toggle('active', i === stepIndex);
    });
    $('screenWizard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderWizard() {
    var ui = UI_STRINGS[lang];

    $('wizQ1Title').textContent = ui.wizardQ1;
    renderWizardOptions('wizQ1Options', ui.wizardQ1Opts, 'hardware');

    $('wizQ2Title').textContent = ui.wizardQ2;
    renderWizardOptions('wizQ2Options', ui.wizardQ2Opts, 'heirs');

    $('wizQ3Title').textContent = ui.wizardQ3;
    renderWizardOptions('wizQ3Options', ui.wizardQ3Opts, 'concern');

    $('wizQ4Title').textContent = ui.wizardQ4;
    renderWizardOptions('wizQ4Options', ui.wizardQ4Opts, 'level');

    $('wizResultLabel').textContent = ui.wizardResult;
    $('btnWizardBackText').textContent = ui.wizardChange;
    $('btnWizardStartText').textContent = ui.wizardStart;

    Wizard.reset();
    showWizardPanel(0);
  }

  function renderWizardOptions(containerId, opts, questionKey) {
    var container = $(containerId);
    container.innerHTML = '';

    opts.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'wizard-option';
      btn.innerHTML =
        '<span class="opt-label">' + opt.label + '</span>' +
        '<span class="opt-desc">' + opt.desc + '</span>';

      btn.addEventListener('click', function () {
        container.querySelectorAll('.wizard-option').forEach(function (b) {
          b.classList.remove('selected');
        });
        btn.classList.add('selected');

        Wizard.setAnswer(questionKey, opt.value);

        setTimeout(function () {
          advanceWizard(questionKey);
        }, 250);
      });

      container.appendChild(btn);
    });
  }

  function advanceWizard(justAnswered) {
    var warnings = [];

    if (justAnswered === 'hardware') {
      // After Q1 → check warnings → Q2
      warnings = Wizard.getWarningsAfterQ1(lang);
      if (warnings.length > 0) {
        showInlineWarnings('wizInlineWarning1', 'btnInlineWarning1Continue', warnings, 2);
        showWizardPanel(1);
      } else {
        showWizardPanel(2); // Q2
      }
    } else if (justAnswered === 'heirs') {
      // After Q2 → Q3 (no warnings after Q2)
      showWizardPanel(3); // Q3
    } else if (justAnswered === 'concern') {
      // After Q3 → check warnings → Q4
      warnings = Wizard.getWarningsAfterQ3(lang);
      if (warnings.length > 0) {
        showInlineWarnings('wizInlineWarning3', 'btnInlineWarning3Continue', warnings, 5);
        showWizardPanel(4);
      } else {
        showWizardPanel(5); // Q4
      }
    } else if (justAnswered === 'level') {
      // After Q4 → check warnings → Result
      warnings = Wizard.getWarningsAfterQ4(lang);
      if (warnings.length > 0) {
        showInlineWarnings('wizInlineWarning4', 'btnInlineWarning4Continue', warnings, 7);
        showWizardResult();
        showWizardPanel(6);
      } else {
        showWizardResult();
        showWizardPanel(7); // Result
      }
    }
  }

  function showInlineWarnings(warningPanelId, btnId, warnings, nextPanelIndex) {
    var contentId = warningPanelId + 'Content';
    var html = '';
    warnings.forEach(function (w) {
      html += '<div class="wizard-warning-full">';
      html += '<div class="wizard-warning-full-title">&#9888; ' + w.title + '</div>';
      html += '<div class="wizard-warning-full-text">' + w.text + '</div>';

      if (w.points && w.points.length > 0) {
        html += '<ul class="wizard-warning-points">';
        w.points.forEach(function (p) {
          html += '<li>' + p + '</li>';
        });
        html += '</ul>';
      }

      if (w.recommendation) {
        html += '<div class="wizard-warning-rec">' + w.recommendation + '</div>';
      }
      html += '</div>';
    });

    $(contentId).innerHTML = html;

    var btnText = lang === 'pt' ? 'Entendi, continuar' : 'I understand, continue';
    $(btnId).innerHTML = btnText + ' &rarr;';

    $(btnId).onclick = function () {
      showWizardPanel(nextPanelIndex);
    };
  }

  function showWizardResult() {
    var rec = Wizard.getRecommendation(lang);

    $('wizResultIcon').innerHTML = '<span style="font-size:48px">' + rec.methodIcon + '</span>';
    $('wizResultName').textContent = rec.methodName;
    $('wizResultLevel').textContent = rec.tier + ' · ' + rec.complexity;
    $('wizResultDesc').textContent = rec.methodDescription;
  }

  // ── Browse Rendering ───────────────────────────────────
  function renderBrowse() {
    var ui = UI_STRINGS[lang];
    $('browseTitle').textContent = ui.browseTitle;

    var tiers = ['no-hw', 'hw'];
    var html = '';
    var summary = Progress.getSummary();

    tiers.forEach(function (tier) {
      var tierName = ui.tiers[tier];
      var tierDesc = ui.tiers[tier + 'Desc'];
      var badgeClass = 'level-badge-' + tier;

      html += '<div class="level-section">';
      html += '<div class="level-header">';
      html += '<span class="level-badge ' + badgeClass + '">' + tierName + '</span>';
      html += '<span class="level-desc">' + tierDesc + '</span>';
      html += '</div>';
      html += '<div class="wallet-grid">';

      METHODS.forEach(function (m) {
        if (m.tier !== tier) return;

        var tutorialId = m.tutorials[0];
        var prog = summary[tutorialId];
        var progressHtml = '';
        if (prog && prog.completed) {
          progressHtml = '<div class="wallet-card-progress">&#10003; ' +
            (lang === 'pt' ? 'Concluido' : 'Completed') + '</div>';
        } else if (prog && prog.started) {
          progressHtml = '<div class="wallet-card-progress" style="color:var(--accent)">&#9654; ' +
            (lang === 'pt' ? 'Em andamento' : 'In progress') + '</div>';
        }

        var complexityLabel = ui.complexityLabels[m.complexity];

        html += '<div class="wallet-card" data-tutorial="' + tutorialId + '">';
        html += '<div class="wallet-card-header">';
        html += '<span class="method-card-icon">' + m.icon + '</span>';
        html += '<div>';
        html += '<div class="wallet-card-name">' + m.name[lang] + '</div>';
        html += '<div class="wallet-card-type">' + complexityLabel + '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="wallet-card-desc">' + m.description[lang] + '</div>';
        html += progressHtml;
        html += '</div>';
      });

      html += '</div></div>';
    });

    $('browseContent').innerHTML = html;

    $('browseContent').querySelectorAll('.wallet-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var tid = card.getAttribute('data-tutorial');
        startTutorial(tid);
      });
    });
  }

  // ── Fundamentals Rendering ──────────────────────────────
  function renderPractices(tutorialId) {
    var meta = TUTORIALS[tutorialId];
    var method = METHODS.find(function (m) { return m.id === meta.method; });
    var sections = getFundamentalsForPath(meta.tier, meta.method);

    var titleEl = $('practicesTitle');
    var subtitleEl = $('practicesSubtitle');
    var contentEl = $('practicesContent');
    var progressEl = $('practicesProgress');

    titleEl.textContent = lang === 'pt' ? 'Fundamentos' : 'Fundamentals';
    subtitleEl.textContent = lang === 'pt'
      ? 'Leia com atencao antes de comecar: ' + method.name[lang]
      : 'Read carefully before starting: ' + method.name[lang];

    var allItems = [];
    var sectionLabels = {
      prerequisites: { pt: 'Pré-requisitos', en: 'Prerequisites' },
      heir_knowledge: { pt: 'O que seu herdeiro precisa saber', en: 'What your heir needs to know' },
      info_security: { pt: 'Como dividir informação', en: 'How to divide information' },
      letter_template: { pt: 'Modelo de carta', en: 'Letter template' }
    };

    sections.forEach(function (sectionKey) {
      var section = FUNDAMENTALS[sectionKey];
      if (section && section[lang]) {
        section[lang].forEach(function (item) {
          allItems.push({ item: item, section: sectionKey });
        });
      }
    });

    var html = '';
    var currentSection = '';
    allItems.forEach(function (entry, i) {
      if (entry.section !== currentSection) {
        currentSection = entry.section;
        var label = sectionLabels[currentSection] || {};
        html += '<div class="practices-section-label">' + (label[lang] || currentSection) + '</div>';
      }

      html += '<div class="fund-card">';
      html += '<div class="fund-card-header">';
      html += '<span class="fund-icon">' + entry.item.icon + '</span>';
      html += '<span class="fund-title">' + entry.item.title + '</span>';
      html += '</div>';
      html += '<div class="fund-content">' + entry.item.content + '</div>';
      html += '</div>';
    });

    contentEl.innerHTML = html;
    progressEl.textContent = allItems.length + (lang === 'pt' ? ' topicos' : ' topics');

    var btnText = lang === 'pt'
      ? 'Li tudo. Comecar tutorial de ' + method.name[lang]
      : 'I\'ve read everything. Start ' + method.name[lang] + ' tutorial';
    $('btnPracticesContinue').innerHTML = btnText + ' &rarr;';
  }

  // ── Tutorial Rendering ─────────────────────────────────
  function startTutorial(tutorialId) {
    pendingTutorialId = tutorialId;

    if (!Progress.fundamentalsRead()) {
      renderPractices(tutorialId);
      showScreen('practices');
      return;
    }

    loadTutorial(tutorialId);
  }

  function loadTutorial(tutorialId) {
    if (!Tutorial.load(tutorialId, lang)) return;

    var ui = UI_STRINGS[lang];
    var method = Tutorial.getMethod();
    var meta = Tutorial.getMeta();

    $('tutorialIcon').innerHTML = '<span style="font-size:28px">' + method.icon + '</span>';
    $('tutorialName').textContent = method.name[lang];

    var badge = $('tutorialBadge');
    badge.textContent = ui.tiers[meta.tier];
    badge.className = 'tutorial-level-badge level-badge-' + meta.tier;

    renderStepDots();
    renderStep();
    showScreen('tutorial');
  }

  function renderStepDots() {
    var total = Tutorial.getTotalSteps();
    var current = Tutorial.getStepIndex();
    var progress = Tutorial.getProgress();
    var dotsContainer = $('stepDots');
    dotsContainer.innerHTML = '';

    for (var i = 0; i < total; i++) {
      var dot = document.createElement('span');
      dot.className = 'step-dot';
      if (i === current) dot.classList.add('current');
      else if (progress.completedSteps.includes(i)) dot.classList.add('completed');

      (function (idx) {
        dot.addEventListener('click', function () {
          Tutorial.goToStep(idx);
          renderStep();
          renderStepDots();
        });
      })(i);

      dotsContainer.appendChild(dot);
    }
  }

  function renderStep() {
    var ui = UI_STRINGS[lang];
    var step = Tutorial.getCurrentStep();
    var idx = Tutorial.getStepIndex();
    var total = Tutorial.getTotalSteps();

    if (!step) return;

    $('tutorialProgressCount').textContent = ui.step + ' ' + (idx + 1) + ' ' + ui.of + ' ' + total;
    $('tutorialProgressFill').style.width = ((idx + 1) / total * 100) + '%';
    $('tutorialSaved').textContent = ui.progressSaved;

    $('stepNumber').textContent = ui.step + ' ' + (idx + 1);
    $('stepTitle').textContent = step.title;
    $('stepContent').innerHTML = step.content;

    if (step.warning) {
      $('stepWarning').innerHTML =
        '<div class="step-warning">' +
        '<span class="step-warning-icon">&#9888;</span>' +
        '<span class="step-warning-text">' + step.warning + '</span>' +
        '</div>';
    } else {
      $('stepWarning').innerHTML = '';
    }

    if (step.tip) {
      $('stepTip').innerHTML =
        '<div class="step-tip">' +
        '<span class="step-tip-icon">&#9889;</span>' +
        '<span class="step-tip-text">' + step.tip + '</span>' +
        '</div>';
    } else {
      $('stepTip').innerHTML = '';
    }

    if (step.video) {
      $('stepVideo').innerHTML =
        '<a class="step-video" href="' + step.video.url + '" target="_blank" rel="noopener noreferrer">' +
        '&#9654; ' + step.video.label +
        '</a>';
    } else {
      $('stepVideo').innerHTML = '';
    }

    $('btnStepPrev').style.display = Tutorial.isFirst() ? 'none' : '';
    $('btnStepPrevText').textContent = ui.prev;

    if (Tutorial.isLast()) {
      $('btnStepNext').className = 'btn-step btn-step-finish';
      $('btnStepNextText').textContent = ui.finish;
    } else {
      $('btnStepNext').className = 'btn-step btn-step-next';
      $('btnStepNextText').textContent = ui.next;
    }

    var saved = $('tutorialSaved');
    saved.classList.add('show');
    setTimeout(function () { saved.classList.remove('show'); }, 2000);

    var card = $('stepCard');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'fadeIn 0.3s ease';

    renderStepDots();
  }

  // ── Completion Rendering ───────────────────────────────
  function renderCompletion() {
    var ui = UI_STRINGS[lang];
    var method = Tutorial.getMethod();
    var meta = Tutorial.getMeta();
    var steps = Tutorial.getSteps();

    $('completionTitle').textContent = ui.completionTitle;
    $('completionDesc').textContent = ui.completionDesc;

    $('completionChecklistTitle').textContent = ui.completionChecklist;
    var checkHtml = '';
    steps.forEach(function (step) {
      checkHtml += '<div class="checklist-item">' +
        '<span class="checklist-check">&#10003;</span>' +
        '<span>' + step.title + '</span>' +
        '</div>';
    });
    $('completionChecklistContent').innerHTML = checkHtml;

    $('completionNextTitle').textContent = ui.completionNext;
    var nextHtml = '';

    // Suggest other methods based on current tier
    if (meta.tier === 'no-hw') {
      nextHtml += '<div class="next-item" data-tutorial="passphrase-carta">' +
        '🌳 ' + (lang === 'pt' ? 'Explore o método Tronco e Galhos (requer hardware wallet)' : 'Explore the Trunk and Branches method (requires hardware wallet)') +
        '</div>';
    } else if (meta.method !== 'liana-timelock' && meta.method !== 'liana-decaying') {
      nextHtml += '<div class="next-item" data-tutorial="liana-timelock">' +
        '⏱️ ' + (lang === 'pt' ? 'Explore herança automática com Liana Timelock' : 'Explore automatic inheritance with Liana Timelock') +
        '</div>';
    }

    nextHtml += '<div class="next-item" data-action="browse">' +
      '📋 ' + (lang === 'pt' ? 'Ver todos os métodos' : 'See all methods') +
      '</div>';

    nextHtml += '<div class="next-item" data-action="custodia">' +
      '🔐 ' + (lang === 'pt' ? 'Voltar ao tutorial de auto-custodia' : 'Back to self-custody tutorial') +
      '</div>';

    $('completionNextContent').innerHTML = nextHtml;

    $('completionNextContent').querySelectorAll('.next-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var tid = item.getAttribute('data-tutorial');
        var action = item.getAttribute('data-action');
        if (tid) startTutorial(tid);
        else if (action === 'browse') { renderBrowse(); showScreen('browse'); }
        else if (action === 'custodia') { window.location.href = '/custodia/'; }
      });
    });

    $('btnRetakeText').textContent = ui.completionRetake;
    $('btnBackHomeText').textContent = ui.completionHome;
    $('btnDownloadPDFText').textContent = ui.downloadPDF;
  }

  // ── PDF Generation ────────────────────────────────────
  function generatePDF() {
    var ui = UI_STRINGS[lang];
    var method = Tutorial.getMethod();
    var meta = Tutorial.getMeta();
    var steps = Tutorial.getSteps();
    var tierLabel = ui.tiers[meta.tier];

    var btn = $('btnDownloadPDF');
    var btnText = $('btnDownloadPDFText');
    var originalText = btnText.textContent;
    btnText.textContent = ui.generatingPDF;
    btn.disabled = true;

    var html = '';
    html += '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif; color: #1a1a1a; padding: 0 24px;">';

    html += '<div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 2px solid #f7931a;">';
    html += '<span style="font-size: 20px; font-weight: 700;">' + method.name[lang] + '</span>';
    html += '<span style="font-size: 11px; color: #f7931a; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-left: 10px;">' + tierLabel + '</span>';
    html += '</div>';

    steps.forEach(function (step, i) {
      html += '<div style="margin-bottom: 16px;">';
      html += '<div style="font-size: 10px; font-weight: 600; color: #f7931a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">' + ui.step + ' ' + (i + 1) + '</div>';
      html += '<div style="font-size: 15px; font-weight: 700; margin-bottom: 8px;">' + step.title + '</div>';
      html += '<div style="font-size: 12px; color: #444; line-height: 1.7;">' + step.content + '</div>';

      if (step.warning) {
        html += '<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 6px; padding: 8px 12px; margin-top: 8px; font-size: 11px; color: #b91c1c; line-height: 1.5;">';
        html += '<strong>&#9888; ' + ui.warning + ':</strong> ' + step.warning;
        html += '</div>';
      }

      if (step.tip) {
        html += '<div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 8px 12px; margin-top: 8px; font-size: 11px; color: #166534; line-height: 1.5;">';
        html += '<strong>&#9889; ' + ui.tip + ':</strong> ' + step.tip;
        html += '</div>';
      }

      html += '</div>';
    });

    var today = new Date();
    var dateStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    html += '<div style="text-align: center; margin-top: 24px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 10px; color: #888;">';
    html += 'letabuild.com/heranca &middot; ' + dateStr;
    html += '</div>';

    html += '</div>';

    var filename = 'Herança-' + method.name[lang].replace(/\s+/g, '-').replace(/[()]/g, '') + '.pdf';

    var opt = {
      margin: [8, 3, 8, 3],
      filename: filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css'] }
    };

    function cleanup() {
      btnText.textContent = originalText;
      btn.disabled = false;
    }

    html2pdf().set(opt).from(html, 'string').save().then(cleanup).catch(cleanup);
  }

  // ── Event Handlers ─────────────────────────────────────
  function init() {
    setLanguage(lang);

    window.addEventListener('langchange', function (e) {
      if (e.detail && e.detail.lang && e.detail.lang !== lang) {
        lang = e.detail.lang;
        setLanguage(lang);
        if (screens.browse.classList.contains('active')) renderBrowse();
        if (screens.wizard.classList.contains('active')) renderWizard();
        if (screens.practices.classList.contains('active') && pendingTutorialId) renderPractices(pendingTutorialId);
        if (screens.tutorial.classList.contains('active')) {
          Tutorial.load(Tutorial.getTutorialId(), lang);
          renderStep();
        }
      }
    });

    // Landing
    $('btnGuide').addEventListener('click', function () {
      showDisclaimer(function () { renderWizard(); showScreen('wizard'); });
    });

    $('btnBrowse').addEventListener('click', function () {
      showDisclaimer(function () { renderBrowse(); showScreen('browse'); });
    });

    // Wizard
    $('btnWizardStart').addEventListener('click', function () {
      var rec = Wizard.recommend();
      startTutorial(rec);
    });

    $('btnWizardBack').addEventListener('click', function () {
      Wizard.reset();
      renderWizard();
    });

    // Best practices continue
    $('btnPracticesContinue').addEventListener('click', function () {
      Progress.markFundamentalsRead();
      if (pendingTutorialId) loadTutorial(pendingTutorialId);
    });

    // Tutorial back to browse
    $('btnTutorialBack').addEventListener('click', function () {
      renderBrowse();
      showScreen('browse');
    });

    // Tutorial navigation
    $('btnStepNext').addEventListener('click', function () {
      if (Tutorial.isLast()) {
        Tutorial.finishTutorial();
        renderCompletion();
        showScreen('completion');
      } else {
        Tutorial.goNext();
        renderStep();
      }
    });

    $('btnStepPrev').addEventListener('click', function () {
      Tutorial.goPrev();
      renderStep();
    });

    // Completion
    $('btnRetake').addEventListener('click', function () {
      Progress.resetTutorial(Tutorial.getTutorialId());
      loadTutorial(Tutorial.getTutorialId());
    });

    $('btnBackHome').addEventListener('click', function () {
      showScreen('landing');
    });

    $('btnDownloadPDF').addEventListener('click', function () {
      generatePDF();
    });

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (!screens.tutorial.classList.contains('active')) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') $('btnStepNext').click();
      if (e.key === 'ArrowLeft' && !Tutorial.isFirst()) $('btnStepPrev').click();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
