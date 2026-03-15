// ============================================================
// Wizard — Guided path for inheritance method selection
// 4 questions with inline warnings between questions
// ============================================================

const Wizard = (function () {
  let answers = {};

  function reset() {
    answers = {};
  }

  function setAnswer(question, value) {
    answers[question] = value;
  }

  function getAnswer(question) {
    return answers[question] || null;
  }

  // ── Inline warnings ──────────────────────────────────────

  function getWarningsAfterQ1(lang) {
    var hw = answers.hardware;
    var warnings = [];

    if (hw === 'no') {
      warnings.push(lang === 'pt'
        ? {
            title: 'Sem hardware wallet, suas opções são limitadas',
            text: 'Sem hardware wallet, você só pode usar métodos baseados em <strong>seed no papel</strong>. Esses métodos funcionam, mas oferecem menos segurança:',
            points: [
              '<strong>Seed + Carta</strong> e <strong>Seed Split</strong> são suas opções. Ambos dependem de papel/metal bem guardado.',
              'Para valores maiores, <strong>recomendamos fortemente</strong> adquirir uma hardware wallet. Ela protege contra malware e adiciona uma camada física de segurança.',
              'Se quiser usar passphrase, multisig, ou timelocks (Liana), você <strong>precisará de hardware wallet</strong>.'
            ],
            recommendation: 'O tutorial vai continuar com os métodos disponíveis. Quando estiver pronto para investir em hardware wallet, volte e explore as opções avançadas.'
          }
        : {
            title: 'Without a hardware wallet, your options are limited',
            text: 'Without a hardware wallet, you can only use methods based on <strong>seed on paper</strong>. These methods work but offer less security:',
            points: [
              '<strong>Seed + Letter</strong> and <strong>Seed Split</strong> are your options. Both rely on well-stored paper/metal.',
              'For larger amounts, we <strong>strongly recommend</strong> getting a hardware wallet. It protects against malware and adds a physical security layer.',
              'If you want to use passphrase, multisig, or timelocks (Liana), you <strong>will need a hardware wallet</strong>.'
            ],
            recommendation: 'The tutorial will continue with available methods. When you\'re ready to invest in a hardware wallet, come back and explore the advanced options.'
          }
      );
    }

    return warnings;
  }

  function getWarningsAfterQ2(lang) {
    return [];
  }

  function getWarningsAfterQ3(lang) {
    var hw = answers.hardware;
    var concern = answers.concern;
    var warnings = [];

    if (concern === 'automation' && hw === 'no') {
      warnings.push(lang === 'pt'
        ? {
            title: 'Ativação automática requer hardware wallet + Liana',
            text: 'A única forma de ter herança com <strong>ativação automática</strong> (sem depender de ninguém "acionar" o plano) é usando a <strong>Liana Wallet com timelocks</strong>:',
            points: [
              'Timelocks são travas de tempo nativas do Bitcoin. A chave do herdeiro só funciona após meses de inatividade sua.',
              'Isso exige hardware wallets para as chaves primária (sua) e de recuperação (herdeiro).',
              'Sem hardware wallet, você pode fazer Seed + Carta ou Seed Split, mas eles <strong>dependem de alguém encontrar a carta</strong>.'
            ],
            recommendation: 'Se ativação automática é importante, considere adquirir hardware wallets. Caso contrário, vamos prosseguir com os métodos mais simples.'
          }
        : {
            title: 'Automatic activation requires hardware wallet + Liana',
            text: 'The only way to have inheritance with <strong>automatic activation</strong> (without depending on anyone to "trigger" the plan) is using <strong>Liana Wallet with timelocks</strong>:',
            points: [
              'Timelocks are native Bitcoin time locks. The heir\'s key only works after months of your inactivity.',
              'This requires hardware wallets for the primary (yours) and recovery (heir) keys.',
              'Without a hardware wallet, you can do Seed + Letter or Seed Split, but they <strong>depend on someone finding the letter</strong>.'
            ],
            recommendation: 'If automatic activation is important, consider getting hardware wallets. Otherwise, let\'s proceed with simpler methods.'
          }
      );
    }

    return warnings;
  }

  function getWarningsAfterQ4(lang) {
    var level = answers.level;
    var warnings = [];

    // Advanced method recommended but beginner level
    var rec = recommend();
    if ((rec === 'liana-decaying' || rec === 'multisig-heranca') && level === 'beginner') {
      warnings.push(lang === 'pt'
        ? {
            title: 'Método avançado para seu nível atual',
            text: 'Baseado nas suas respostas, o método ideal seria avançado. Mas como você está no <strong>nível iniciante</strong>:',
            points: [
              'O tutorial vai explicar tudo passo a passo, mas a configuração pode ser desafiadora.',
              'Considere começar com um método mais simples (Seed + Carta ou Passphrase) para ganhar confiança.',
              'Você sempre pode voltar e fazer o método avançado depois.'
            ],
            recommendation: 'O tutorial vai prosseguir com a recomendação. Se sentir dificuldade, volte e escolha um método mais simples.'
          }
        : {
            title: 'Advanced method for your current level',
            text: 'Based on your answers, the ideal method would be advanced. But since you\'re at a <strong>beginner level</strong>:',
            points: [
              'The tutorial will explain everything step by step, but setup can be challenging.',
              'Consider starting with a simpler method (Seed + Letter or Passphrase) to build confidence.',
              'You can always come back and do the advanced method later.'
            ],
            recommendation: 'The tutorial will proceed with the recommendation. If you find it difficult, come back and choose a simpler method.'
          }
      );
    }

    return warnings;
  }

  // ── Recommendation ─────────────────────────────────────────
  function recommend() {
    var hw = answers.hardware || 'no';
    var heirs = answers.heirs || 'one';
    var concern = answers.concern || 'simplicity';
    var level = answers.level || 'beginner';

    // No hardware wallet
    if (hw === 'no') {
      if (concern === 'simplicity') return 'seed-carta';
      return 'seed-split'; // theft, loss, automation all → seed-split for no-hw
    }

    // Multiple heirs → passphrase (trunk-branch)
    if (heirs === 'few' || heirs === 'many') {
      return 'passphrase-carta';
    }

    // Automation → Liana
    if (concern === 'automation') {
      if (level === 'advanced') return 'liana-decaying';
      return 'liana-timelock';
    }

    // Theft concern → multisig
    if (concern === 'theft') {
      if (level === 'beginner') return 'passphrase-carta';
      return 'multisig-heranca';
    }

    // Loss concern → Liana (auto-activation)
    if (concern === 'loss') {
      if (level === 'beginner') return 'passphrase-carta';
      return 'liana-timelock';
    }

    // Simplicity + hw + 1 heir
    if (concern === 'simplicity') {
      return 'passphrase-carta';
    }

    // Default
    return 'passphrase-carta';
  }

  function getRecommendation(lang) {
    var tutorialId = recommend();
    var meta = TUTORIALS[tutorialId];
    var method = METHODS.find(function (m) { return m.id === meta.method; });
    var ui = UI_STRINGS[lang];

    return {
      tutorialId: tutorialId,
      methodName: method.name[lang],
      methodIcon: method.icon,
      tier: ui.tiers[meta.tier],
      tierKey: meta.tier,
      complexity: ui.complexityLabels[method.complexity],
      methodDescription: method.description[lang]
    };
  }

  return {
    reset: reset,
    setAnswer: setAnswer,
    getAnswer: getAnswer,
    recommend: recommend,
    getRecommendation: getRecommendation,
    getWarningsAfterQ1: getWarningsAfterQ1,
    getWarningsAfterQ2: getWarningsAfterQ2,
    getWarningsAfterQ3: getWarningsAfterQ3,
    getWarningsAfterQ4: getWarningsAfterQ4
  };
})();
