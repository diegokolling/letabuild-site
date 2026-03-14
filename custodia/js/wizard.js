// ============================================================
// Wizard — Opinionated guided path with inline education
// Shows warnings BETWEEN questions when user picks bad combos
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

  // ── Inline warnings: triggered between questions ────────
  // Returns array of warning objects to show BEFORE advancing
  // Called after Q1 answer, after Q2 answer, after Q3 answer

  function getWarningsAfterQ1(lang) {
    // No warnings after Q1 alone — need combo
    return [];
  }

  function getWarningsAfterQ2(lang) {
    var level = answers.level;
    var device = answers.device;
    var warnings = [];

    // Multisig + mobile
    if (level === 'multisig' && device === 'mobile') {
      warnings.push(lang === 'pt'
        ? {
            title: 'Multisig no celular não é recomendado',
            text: 'Para proteger patrimônio e herança com multisig, você precisa de um <strong>computador desktop</strong>. Eis por quê:',
            points: [
              '<strong>Configuração inicial</strong> exige conectar e parear múltiplas hardware wallets — processo delicado que precisa de tela grande e atenção total.',
              '<strong>Verificação de xpubs e descriptors</strong> é crítica. Um erro aqui significa perder acesso aos fundos. Em tela de celular, é muito fácil errar.',
              '<strong>Sparrow Wallet</strong> é a ferramenta mais completa para multisig e só roda em desktop (Windows, Mac, Linux).',
              '<strong>Depois de configurado</strong>, o gerenciamento diário pode sim ser feito via Nunchuk no celular. Mas o setup inicial precisa ser no desktop.'
            ],
            recommendation: 'Recomendação: use um computador desktop para a configuração. O tutorial vai guiá-lo pelo Sparrow Wallet ou Nunchuk Desktop.'
          }
        : {
            title: 'Multisig on mobile is not recommended',
            text: 'To protect wealth and inheritance with multisig, you need a <strong>desktop computer</strong>. Here\'s why:',
            points: [
              '<strong>Initial setup</strong> requires connecting and pairing multiple hardware wallets — a delicate process that needs a large screen and full attention.',
              '<strong>Verifying xpubs and descriptors</strong> is critical. A mistake here means losing access to funds. On a phone screen, it\'s too easy to make errors.',
              '<strong>Sparrow Wallet</strong> is the most complete tool for multisig and only runs on desktop (Windows, Mac, Linux).',
              '<strong>After setup</strong>, daily management can be done via Nunchuk on mobile. But initial setup needs to be on desktop.'
            ],
            recommendation: 'Recommendation: use a desktop computer for setup. The tutorial will guide you through Sparrow Wallet or Nunchuk Desktop.'
          }
      );
    }

    // Passphrase + mobile
    if (level === 'passphrase' && device === 'mobile') {
      warnings.push(lang === 'pt'
        ? {
            title: 'Passphrase no celular não é seguro',
            text: 'Passphrase deve ser digitada <strong>exclusivamente na hardware wallet</strong> — nunca em software puro no celular. Eis por quê:',
            points: [
              '<strong>A passphrase é seu segundo fator de segurança.</strong> Se você digitá-la em um app no celular, malware pode capturá-la. A hardware wallet tem tela e teclado próprios, isolados da internet.',
              '<strong>O fluxo correto:</strong> você digita a passphrase na hardware wallet (Coldcard, Jade) → conecta ao Sparrow Wallet no desktop → gerencia a carteira.',
              '<strong>O celular é ótimo para custódia simples</strong> (Blue Wallet com seed de 12 palavras), mas para passphrase você precisa de hardware wallet + desktop.'
            ],
            recommendation: 'Recomendação: adquira uma hardware wallet (Coldcard ou Jade) e use um computador com Sparrow Wallet. Se ainda não tem hardware wallet, comece pelo tutorial de custódia simples no celular e evolua depois.'
          }
        : {
            title: 'Passphrase on mobile is not secure',
            text: 'Passphrase must be typed <strong>exclusively on the hardware wallet</strong> — never in software on a phone. Here\'s why:',
            points: [
              '<strong>The passphrase is your second security factor.</strong> If you type it in a phone app, malware can capture it. The hardware wallet has its own screen and keyboard, isolated from the internet.',
              '<strong>The correct flow:</strong> you type the passphrase on the hardware wallet (Coldcard, Jade) → connect to Sparrow Wallet on desktop → manage the wallet.',
              '<strong>Mobile is great for simple custody</strong> (Blue Wallet with 12-word seed), but for passphrase you need hardware wallet + desktop.'
            ],
            recommendation: 'Recommendation: get a hardware wallet (Coldcard or Jade) and use a computer with Sparrow Wallet. If you don\'t have a hardware wallet yet, start with the simple custody tutorial on mobile and level up later.'
          }
      );
    }

    return warnings;
  }

  function getWarningsAfterQ3(lang) {
    var level = answers.level;
    var hw = answers.hardware;
    var warnings = [];

    // Passphrase or Multisig + no hardware
    if ((level === 'passphrase' || level === 'multisig') && hw === 'none') {
      if (level === 'multisig') {
        warnings.push(lang === 'pt'
          ? {
              title: 'Você precisa de hardware wallets para multisig',
              text: 'Multisig 2-de-3 exige <strong>pelo menos 2 hardware wallets de fabricantes diferentes</strong>. Isso não é opcional — é a base da segurança multisig.',
              points: [
                '<strong>Por que fabricantes diferentes?</strong> Se um fabricante tiver uma vulnerabilidade no firmware, as chaves dos outros fabricantes protegem seus bitcoins. Usar 3 dispositivos iguais anula a vantagem do multisig.',
                '<strong>Combinação recomendada:</strong> Coldcard (coldcard.com) + Blockstream Jade (blockstream.com/jade). São de fabricantes diferentes, ambos são Bitcoin-only e open-source.',
                '<strong>Onde comprar:</strong> sempre direto do site oficial do fabricante. Nunca em marketplaces (Mercado Livre, Amazon terceiros, eBay). Dispositivos de terceiros podem vir comprometidos.',
                '<strong>Custo estimado:</strong> Coldcard Q (~$240 USD) + Jade (~$65 USD). É um investimento em segurança proporcional ao patrimônio que você quer proteger.'
              ],
              recommendation: 'Adquira os dispositivos antes de começar o tutorial. Enquanto espera a entrega, você pode começar pelo tutorial de custódia simples com Blue Wallet para se familiarizar com auto-custódia.'
            }
          : {
              title: 'You need hardware wallets for multisig',
              text: 'Multisig 2-of-3 requires <strong>at least 2 hardware wallets from different manufacturers</strong>. This is not optional — it\'s the foundation of multisig security.',
              points: [
                '<strong>Why different manufacturers?</strong> If one manufacturer has a firmware vulnerability, keys from other manufacturers protect your bitcoin. Using 3 identical devices negates the advantage of multisig.',
                '<strong>Recommended combination:</strong> Coldcard (coldcard.com) + Blockstream Jade (blockstream.com/jade). Different manufacturers, both Bitcoin-only and open-source.',
                '<strong>Where to buy:</strong> always from the official manufacturer website. Never from marketplaces (Amazon third-party, eBay). Third-party devices may come compromised.',
                '<strong>Estimated cost:</strong> Coldcard Q (~$240 USD) + Jade (~$65 USD). It\'s a security investment proportional to the wealth you want to protect.'
              ],
              recommendation: 'Acquire the devices before starting the tutorial. While waiting for delivery, you can start with the Blue Wallet simple custody tutorial to familiarize yourself with self-custody.'
            }
        );
      } else {
        // Passphrase + no hardware
        warnings.push(lang === 'pt'
          ? {
              title: 'Passphrase exige hardware wallet',
              text: 'A passphrase é um recurso de segurança que <strong>só deve ser usada em hardware wallets</strong>. Digitar a passphrase em software no celular ou computador expõe ela a malware.',
              points: [
                '<strong>Como funciona:</strong> a hardware wallet tem tela e teclado próprios, isolados. Você digita a passphrase diretamente no dispositivo — ela nunca passa pelo computador ou celular.',
                '<strong>Recomendação para iniciantes:</strong> Coldcard Q (coldcard.com) ou Blockstream Jade (blockstream.com/jade). Ambas suportam passphrase nativamente.',
                '<strong>Compre apenas do fabricante.</strong> Nunca em marketplace ou de vendedores terceiros. Verifique a embalagem lacrada ao receber.'
              ],
              recommendation: 'Adquira uma hardware wallet antes de começar. Enquanto espera, recomendamos fazer o tutorial de custódia simples com Blue Wallet — é o melhor ponto de partida.'
            }
          : {
              title: 'Passphrase requires a hardware wallet',
              text: 'Passphrase is a security feature that <strong>should only be used with hardware wallets</strong>. Typing the passphrase in software on a phone or computer exposes it to malware.',
              points: [
                '<strong>How it works:</strong> the hardware wallet has its own isolated screen and keyboard. You type the passphrase directly on the device — it never passes through your computer or phone.',
                '<strong>Beginner recommendation:</strong> Coldcard Q (coldcard.com) or Blockstream Jade (blockstream.com/jade). Both support passphrase natively.',
                '<strong>Buy only from the manufacturer.</strong> Never from marketplaces or third-party sellers. Check for sealed packaging when you receive it.'
              ],
              recommendation: 'Get a hardware wallet before starting. While waiting, we recommend the Blue Wallet simple custody tutorial — it\'s the best starting point.'
            }
        );
      }
    }

    // Ledger selected — show Recover warning
    if (hw === 'ledger') {
      warnings.push(lang === 'pt'
        ? {
            title: 'Aviso importante sobre a Ledger',
            text: 'A Ledger é uma hardware wallet popular, mas há uma <strong>controvérsia de segurança</strong> que você precisa conhecer antes de usar:',
            points: [
              '<strong>Ledger Recover (2023):</strong> a Ledger adicionou um recurso que permite exportar fragmentos criptografados da sua seed phrase para terceiros (Ledger, Coincover, EscrowTech).',
              '<strong>O problema:</strong> isso prova que o firmware da Ledger <strong>é capaz de extrair a seed</strong> do secure element. Antes, acreditava-se que a seed nunca saía do chip.',
              '<strong>Risco teórico:</strong> um firmware malicioso ou uma ordem judicial poderia forçar a extração da seed, mesmo sem você ativar o Ledger Recover.',
              '<strong>Nunca ative o Ledger Recover.</strong> Mesmo com o recurso desativado, o risco existe no firmware. Para valores maiores, considere Coldcard ou Jade como alternativas.'
            ],
            recommendation: 'A Ledger continua funcional para custódia simples com valores menores. Para multisig, ela pode ser uma das chaves (a diversidade de fabricantes mitiga o risco). O tutorial vai prosseguir normalmente.'
          }
        : {
            title: 'Important warning about Ledger',
            text: 'Ledger is a popular hardware wallet, but there\'s a <strong>security controversy</strong> you need to know before using it:',
            points: [
              '<strong>Ledger Recover (2023):</strong> Ledger added a feature that exports encrypted fragments of your seed phrase to third parties (Ledger, Coincover, EscrowTech).',
              '<strong>The problem:</strong> this proves Ledger\'s firmware <strong>is capable of extracting the seed</strong> from the secure element. Previously, it was believed the seed never left the chip.',
              '<strong>Theoretical risk:</strong> malicious firmware or a court order could force seed extraction, even without Ledger Recover activated.',
              '<strong>Never activate Ledger Recover.</strong> Even with the feature disabled, the risk exists in the firmware. For larger amounts, consider Coldcard or Jade as alternatives.'
            ],
            recommendation: 'Ledger remains functional for simple custody with smaller amounts. For multisig, it can be one of the keys (manufacturer diversity mitigates the risk). The tutorial will proceed normally.'
          }
      );
    }

    // Simple custody + has hardware wallet: nudge toward passphrase
    if (answers.level === 'simple' && hw !== 'none' && hw !== 'other') {
      var hwName = { coldcard: 'Coldcard', trezor: 'Trezor', ledger: 'Ledger', jade: 'Jade', krux: 'Krux' }[hw] || hw;
      warnings.push(lang === 'pt'
        ? {
            title: 'Você já tem uma ' + hwName + '!',
            text: 'Como você já possui uma hardware wallet, considere ir <strong>direto para o nível de passphrase</strong>:',
            points: [
              '<strong>Passphrase</strong> adiciona uma camada extra de segurança usando uma senha que gera uma carteira completamente diferente.',
              'Se alguém roubar sua seed de 12/24 palavras mas não souber a passphrase, <strong>não consegue acessar seus bitcoins</strong>.',
              'Se você quer fazer custódia simples primeiro para entender o básico, tudo bem — é uma decisão válida.'
            ],
            recommendation: 'O tutorial vai seguir para custódia simples como você escolheu. Mas lembre-se: quando se sentir seguro, o próximo passo natural é passphrase.'
          }
        : {
            title: 'You already have a ' + hwName + '!',
            text: 'Since you already own a hardware wallet, consider going <strong>straight to passphrase level</strong>:',
            points: [
              '<strong>Passphrase</strong> adds an extra security layer using a password that generates a completely different wallet.',
              'If someone steals your 12/24-word seed but doesn\'t know the passphrase, <strong>they can\'t access your bitcoin</strong>.',
              'If you want to do simple custody first to understand the basics, that\'s fine — it\'s a valid decision.'
            ],
            recommendation: 'The tutorial will proceed with simple custody as you chose. But remember: when you feel confident, the natural next step is passphrase.'
          }
      );
    }

    return warnings;
  }

  // ── Recommendation ─────────────────────────────────────
  function recommend() {
    var level = answers.level || 'simple';
    var device = answers.device || 'mobile';
    var hw = answers.hardware || 'none';

    if (level === 'multisig') {
      if (device === 'mobile') return 'nunchuk-multisig';
      return 'sparrow-multisig';
    }

    if (level === 'passphrase') {
      if (hw === 'coldcard') return 'coldcard-passphrase';
      if (hw === 'jade') return 'jade-passphrase';
      if (hw === 'krux') return 'krux-passphrase';
      if (hw === 'trezor') return 'trezor-passphrase';
      if (hw === 'ledger') return 'ledger-passphrase';
      return 'coldcard-passphrase';
    }

    if (hw === 'coldcard') return 'coldcard-simple';
    if (hw === 'krux') return 'krux-simple';
    if (hw === 'trezor') return 'trezor-simple';
    if (hw === 'ledger') return 'ledger-simple';
    if (hw === 'jade') return 'jade-passphrase';

    if (device === 'mobile') return 'bluewallet-simple';
    return 'sparrow-simple';
  }

  function getRecommendation(lang) {
    var tutorialId = recommend();
    var meta = TUTORIALS[tutorialId];
    var wallet = WALLETS.find(function (w) { return w.id === meta.wallet; });
    var ui = UI_STRINGS[lang];

    return {
      tutorialId: tutorialId,
      walletName: wallet.name,
      walletIcon: wallet.icon,
      level: ui.levels[meta.level],
      levelKey: meta.level,
      walletDescription: wallet.description[lang]
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
    getWarningsAfterQ3: getWarningsAfterQ3
  };
})();
