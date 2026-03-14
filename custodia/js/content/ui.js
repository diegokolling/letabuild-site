// ============================================================
// UI Strings — Bilingual interface text (PT/EN)
// ============================================================

const UI_STRINGS = {
  pt: {
    // Landing
    landingTitle: 'Auto-Custódia Bitcoin',
    landingTitleHighlight: 'Passo a Passo',
    landingSubtitle: 'Aprenda a proteger seus bitcoins com segurança. Do básico ao avançado, no seu ritmo.',
    landingMeta: '7 wallets · 3 níveis · Progresso salvo',
    btnGuide: 'Me guie',
    btnGuideDesc: 'Responda 3 perguntas e descubra por onde começar',
    btnBrowse: 'Escolher carteira',
    btnBrowseDesc: 'Já sabe o que quer? Vá direto ao tutorial',

    // Disclaimer
    disclaimerTitle: 'Aviso Importante',
    disclaimerText: 'Auto-custódia é uma responsabilidade séria. Se você perder sua seed phrase, <strong>ninguém pode recuperar seus bitcoins</strong> — nem nós, nem a carteira, nem o governo. Este guia foi feito com cuidado, mas erros podem acontecer. <strong>Sempre verifique as informações</strong> e nunca confie em uma única fonte. Comece com valores pequenos até se sentir seguro.',
    disclaimerAccept: 'Eu entendo a responsabilidade',

    // Wizard
    wizardTitle: 'Vamos encontrar seu caminho',
    wizardQ1: 'Quanto Bitcoin você quer proteger?',
    wizardQ1Opts: [
      { label: 'Primeiros sats', desc: 'Estou começando, quero aprender com valores pequenos', value: 'simple' },
      { label: 'Valor significativo', desc: 'Já tenho um valor que me preocupo em perder', value: 'passphrase' },
      { label: 'Patrimônio / herança', desc: 'Preciso da máxima segurança possível', value: 'multisig' }
    ],
    wizardQ2: 'Prefere usar celular ou computador?',
    wizardQ2Opts: [
      { label: 'Celular', desc: 'Quero acessar pelo celular (iOS ou Android)', value: 'mobile' },
      { label: 'Computador', desc: 'Prefiro usar desktop (Windows, Mac ou Linux)', value: 'desktop' }
    ],
    wizardQ3: 'Já tem hardware wallet?',
    wizardQ3Opts: [
      { label: 'Não tenho', desc: 'Ainda não comprei nenhum dispositivo', value: 'none' },
      { label: 'Coldcard', desc: 'Coldcard Q ou MK4', value: 'coldcard' },
      { label: 'Trezor', desc: 'Qualquer modelo Trezor', value: 'trezor' },
      { label: 'Ledger', desc: 'Qualquer modelo Ledger', value: 'ledger' },
      { label: 'Jade', desc: 'Blockstream Jade', value: 'jade' },
      { label: 'Krux', desc: 'Signing device open-source em hardware genérico', value: 'krux' },
      { label: 'Outra', desc: 'Tenho outra hardware wallet', value: 'other' }
    ],
    wizardResult: 'Recomendação para você:',
    wizardStart: 'Começar tutorial',
    wizardChange: 'Mudar respostas',

    // Browse
    browseTitle: 'Escolha uma carteira',
    browseFilter: 'Filtrar por:',
    filterAll: 'Todas',
    filterMobile: 'Mobile',
    filterDesktop: 'Desktop',
    filterHardware: 'Hardware',
    walletTypes: {
      mobile: 'Mobile',
      desktop: 'Desktop',
      hardware: 'Hardware'
    },
    walletSupports: {
      simple: 'Custódia simples',
      passphrase: 'Passphrase',
      multisig: 'Multisig'
    },

    // Tutorial
    step: 'Passo',
    of: 'de',
    prev: 'Anterior',
    next: 'Próximo',
    finish: 'Concluir',
    warning: 'Atenção',
    tip: 'Dica',
    videoRef: 'Ver tutorial em vídeo',
    progressSaved: 'Progresso salvo',
    fundamentals: 'Fundamentos',
    fundamentalsDesc: 'Conceitos essenciais antes de começar',

    // Completion
    completionTitle: 'Tutorial concluído!',
    completionDesc: 'Parabéns! Você completou todos os passos.',
    completionChecklist: 'O que você fez:',
    completionNext: 'Próximos passos recomendados:',
    completionRetake: 'Refazer tutorial',
    completionHome: 'Voltar ao início',
    downloadPDF: 'Baixar PDF',
    generatingPDF: 'Gerando PDF...',

    // Levels
    levels: {
      simple: 'Custódia Simples',
      simpleDesc: 'Uma seed, uma carteira. O ponto de partida.',
      passphrase: 'Passphrase',
      passphraseDesc: 'Segurança extra com a 13ª/25ª palavra.',
      multisig: 'Multisig',
      multisigDesc: 'Múltiplas chaves. Máxima segurança.'
    },

    // Footer
    credits: 'Conteúdo baseado nos tutoriais de',
    and: 'e',

    // Navigation
    backHome: 'letabuild.com',
    langToggle: 'EN'
  },

  en: {
    landingTitle: 'Bitcoin Self-Custody',
    landingTitleHighlight: 'Step by Step',
    landingSubtitle: 'Learn to secure your bitcoin safely. From basics to advanced, at your own pace.',
    landingMeta: '7 wallets · 3 levels · Progress saved',
    btnGuide: 'Guide me',
    btnGuideDesc: 'Answer 3 questions and find out where to start',
    btnBrowse: 'Choose wallet',
    btnBrowseDesc: 'Already know what you want? Go straight to the tutorial',

    disclaimerTitle: 'Important Notice',
    disclaimerText: 'Self-custody is a serious responsibility. If you lose your seed phrase, <strong>nobody can recover your bitcoin</strong> — not us, not the wallet, not the government. This guide was made with care, but mistakes can happen. <strong>Always verify information</strong> and never trust a single source. Start with small amounts until you feel confident.',
    disclaimerAccept: 'I understand the responsibility',

    wizardTitle: 'Let\'s find your path',
    wizardQ1: 'How much Bitcoin do you want to protect?',
    wizardQ1Opts: [
      { label: 'First sats', desc: 'I\'m starting out, I want to learn with small amounts', value: 'simple' },
      { label: 'Significant amount', desc: 'I have an amount I\'d worry about losing', value: 'passphrase' },
      { label: 'Wealth / inheritance', desc: 'I need maximum security possible', value: 'multisig' }
    ],
    wizardQ2: 'Do you prefer phone or computer?',
    wizardQ2Opts: [
      { label: 'Phone', desc: 'I want to use my phone (iOS or Android)', value: 'mobile' },
      { label: 'Computer', desc: 'I prefer desktop (Windows, Mac or Linux)', value: 'desktop' }
    ],
    wizardQ3: 'Do you already have a hardware wallet?',
    wizardQ3Opts: [
      { label: 'No', desc: 'I haven\'t bought any device yet', value: 'none' },
      { label: 'Coldcard', desc: 'Coldcard Q or MK4', value: 'coldcard' },
      { label: 'Trezor', desc: 'Any Trezor model', value: 'trezor' },
      { label: 'Ledger', desc: 'Any Ledger model', value: 'ledger' },
      { label: 'Jade', desc: 'Blockstream Jade', value: 'jade' },
      { label: 'Krux', desc: 'Open-source signing device on generic hardware', value: 'krux' },
      { label: 'Other', desc: 'I have another hardware wallet', value: 'other' }
    ],
    wizardResult: 'Recommendation for you:',
    wizardStart: 'Start tutorial',
    wizardChange: 'Change answers',

    browseTitle: 'Choose a wallet',
    browseFilter: 'Filter by:',
    filterAll: 'All',
    filterMobile: 'Mobile',
    filterDesktop: 'Desktop',
    filterHardware: 'Hardware',
    walletTypes: {
      mobile: 'Mobile',
      desktop: 'Desktop',
      hardware: 'Hardware'
    },
    walletSupports: {
      simple: 'Simple custody',
      passphrase: 'Passphrase',
      multisig: 'Multisig'
    },

    step: 'Step',
    of: 'of',
    prev: 'Previous',
    next: 'Next',
    finish: 'Complete',
    warning: 'Warning',
    tip: 'Tip',
    videoRef: 'Watch video tutorial',
    progressSaved: 'Progress saved',
    fundamentals: 'Fundamentals',
    fundamentalsDesc: 'Essential concepts before you start',

    completionTitle: 'Tutorial complete!',
    completionDesc: 'Congratulations! You completed all the steps.',
    completionChecklist: 'What you did:',
    completionNext: 'Recommended next steps:',
    completionRetake: 'Redo tutorial',
    completionHome: 'Back to start',
    downloadPDF: 'Download PDF',
    generatingPDF: 'Generating PDF...',

    levels: {
      simple: 'Simple Custody',
      simpleDesc: 'One seed, one wallet. The starting point.',
      passphrase: 'Passphrase',
      passphraseDesc: 'Extra security with the 13th/25th word.',
      multisig: 'Multisig',
      multisigDesc: 'Multiple keys. Maximum security.'
    },

    credits: 'Content based on tutorials by',
    and: 'and',

    backHome: 'letabuild.com',
    langToggle: 'PT'
  }
};
