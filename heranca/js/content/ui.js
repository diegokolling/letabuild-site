// ============================================================
// UI Strings — Bilingual interface text (PT/EN)
// ============================================================

const UI_STRINGS = {
  pt: {
    // Landing
    landingTitle: 'Herança Bitcoin',
    landingTitleHighlight: 'Passo a Passo',
    landingSubtitle: 'Aprenda a criar um plano de sucessão para seus bitcoins. Proteja o patrimônio da sua família sem comprometer a segurança das chaves.',
    landingMeta: '6 métodos · 2 níveis · Progresso salvo',
    btnGuide: 'Me guie',
    btnGuideDesc: 'Responda 4 perguntas e descubra o melhor método para você',
    btnBrowse: 'Escolher método',
    btnBrowseDesc: 'Já sabe o que quer? Vá direto ao tutorial',

    // Prerequisites
    prerequisiteTitle: 'Pré-requisitos',
    prerequisiteText: 'Este tutorial assume que você já completou os tutoriais de <strong>geração de seed offline</strong> e <strong>auto-custódia.</strong> Se ainda não fez, comece por lá:',
    prerequisiteLink: 'Ir para o tutorial de auto-custódia',

    // Disclaimer
    disclaimerTitle: 'Aviso Importante',
    disclaimerText: 'Planejamento de herança Bitcoin é uma responsabilidade séria. Um erro no plano pode significar que seus herdeiros <strong>nunca consigam acessar seus bitcoins</strong>. Este guia foi feito com cuidado, mas cada situação familiar é única. <strong>Teste seu plano antes de depender dele.</strong> Comece com valores pequenos e valide cada passo.',
    disclaimerAccept: 'Eu entendo a responsabilidade',

    // Wizard
    wizardTitle: 'Vamos encontrar o melhor método para você',
    wizardQ1: 'Você tem hardware wallet?',
    wizardQ1Opts: [
      { label: 'Não tenho', desc: 'Ainda não comprei nenhum dispositivo', value: 'no' },
      { label: 'Sim, tenho', desc: 'Já possuo uma ou mais hardware wallets', value: 'yes' }
    ],
    wizardQ2: 'Quantos herdeiros você precisa cobrir?',
    wizardQ2Opts: [
      { label: '1 herdeiro', desc: 'Quero deixar tudo para uma pessoa', value: 'one' },
      { label: '2-3 herdeiros', desc: 'Preciso dividir entre poucos herdeiros', value: 'few' },
      { label: '4 ou mais', desc: 'Família grande ou divisão complexa', value: 'many' }
    ],
    wizardQ3: 'Qual sua maior preocupação?',
    wizardQ3Opts: [
      { label: 'Simplicidade', desc: 'Quero o setup mais simples possível', value: 'simplicity' },
      { label: 'Roubo', desc: 'Me preocupo com herdeiro desonesto ou roubo', value: 'theft' },
      { label: 'Perda de acesso', desc: 'Me preocupo que meu herdeiro perca as chaves', value: 'loss' },
      { label: 'Ativação automática', desc: 'Quero algo que funcione mesmo se eu ficar incapacitado', value: 'automation' }
    ],
    wizardQ4: 'Qual seu nível técnico com Bitcoin?',
    wizardQ4Opts: [
      { label: 'Iniciante', desc: 'Fiz auto-custódia básica, ainda estou aprendendo', value: 'beginner' },
      { label: 'Intermediário', desc: 'Uso hardware wallet e entendo o básico de transações', value: 'intermediate' },
      { label: 'Avançado', desc: 'Entendo multisig, PSBTs, descriptors', value: 'advanced' }
    ],
    wizardResult: 'Recomendação para você:',
    wizardStart: 'Começar tutorial',
    wizardChange: 'Mudar respostas',

    // Browse
    browseTitle: 'Escolha um método de herança',
    tiers: {
      'no-hw': 'Sem Hardware Wallet',
      'no-hwDesc': 'Métodos que funcionam apenas com seed no papel. Mais simples, menos seguro.',
      'hw': 'Com Hardware Wallet',
      'hwDesc': 'Métodos que usam hardware wallet. Mais seguro, requer dispositivos.'
    },
    complexityLabels: {
      'low': 'Fácil',
      'medium': 'Médio',
      'high': 'Avançado',
      'very-high': 'Expert'
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
    fundamentalsDesc: 'Conceitos essenciais sobre herança Bitcoin',

    // Completion
    completionTitle: 'Tutorial concluído!',
    completionDesc: 'Parabéns! Você completou todos os passos deste método de herança.',
    completionChecklist: 'O que você fez:',
    completionNext: 'Próximos passos recomendados:',
    completionRetake: 'Refazer tutorial',
    completionHome: 'Voltar ao início',
    downloadPDF: 'Baixar PDF',
    generatingPDF: 'Gerando PDF...',

    // Footer
    credits: 'Conteúdo baseado nos tutoriais de',
    and: 'e',

    // Navigation
    backHome: 'letabuild.com',
    langToggle: 'EN'
  },

  en: {
    landingTitle: 'Bitcoin Inheritance',
    landingTitleHighlight: 'Step by Step',
    landingSubtitle: 'Learn to create a succession plan for your bitcoin. Protect your family\'s wealth without compromising key security.',
    landingMeta: '6 methods · 2 levels · Progress saved',
    btnGuide: 'Guide me',
    btnGuideDesc: 'Answer 4 questions and find the best method for you',
    btnBrowse: 'Choose method',
    btnBrowseDesc: 'Already know what you want? Go straight to the tutorial',

    prerequisiteTitle: 'Prerequisites',
    prerequisiteText: 'This tutorial assumes you have already completed the <strong>offline seed generation</strong> and <strong>self-custody</strong> tutorials.&nbsp;If not, start there:',
    prerequisiteLink: 'Go to the self-custody tutorial',

    disclaimerTitle: 'Important Notice',
    disclaimerText: 'Bitcoin inheritance planning is a serious responsibility. A mistake in the plan can mean your heirs <strong>can never access your bitcoin</strong>. This guide was made with care, but every family situation is unique. <strong>Test your plan before relying on it.</strong> Start with small amounts and validate each step.',
    disclaimerAccept: 'I understand the responsibility',

    wizardTitle: 'Let\'s find the best method for you',
    wizardQ1: 'Do you have a hardware wallet?',
    wizardQ1Opts: [
      { label: 'No', desc: 'I haven\'t bought any device yet', value: 'no' },
      { label: 'Yes', desc: 'I already have one or more hardware wallets', value: 'yes' }
    ],
    wizardQ2: 'How many heirs do you need to cover?',
    wizardQ2Opts: [
      { label: '1 heir', desc: 'I want to leave everything to one person', value: 'one' },
      { label: '2-3 heirs', desc: 'I need to split among a few heirs', value: 'few' },
      { label: '4 or more', desc: 'Large family or complex division', value: 'many' }
    ],
    wizardQ3: 'What is your main concern?',
    wizardQ3Opts: [
      { label: 'Simplicity', desc: 'I want the simplest possible setup', value: 'simplicity' },
      { label: 'Theft', desc: 'I\'m worried about a dishonest heir or theft', value: 'theft' },
      { label: 'Loss of access', desc: 'I\'m worried my heir will lose the keys', value: 'loss' },
      { label: 'Automatic activation', desc: 'I want something that works even if I become incapacitated', value: 'automation' }
    ],
    wizardQ4: 'What is your technical level with Bitcoin?',
    wizardQ4Opts: [
      { label: 'Beginner', desc: 'I\'ve done basic self-custody, still learning', value: 'beginner' },
      { label: 'Intermediate', desc: 'I use a hardware wallet and understand basic transactions', value: 'intermediate' },
      { label: 'Advanced', desc: 'I understand multisig, PSBTs, descriptors', value: 'advanced' }
    ],
    wizardResult: 'Recommendation for you:',
    wizardStart: 'Start tutorial',
    wizardChange: 'Change answers',

    browseTitle: 'Choose an inheritance method',
    tiers: {
      'no-hw': 'Without Hardware Wallet',
      'no-hwDesc': 'Methods that work with seed on paper only. Simpler, less secure.',
      'hw': 'With Hardware Wallet',
      'hwDesc': 'Methods that use hardware wallets. More secure, requires devices.'
    },
    complexityLabels: {
      'low': 'Easy',
      'medium': 'Medium',
      'high': 'Advanced',
      'very-high': 'Expert'
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
    fundamentalsDesc: 'Essential concepts about Bitcoin inheritance',

    completionTitle: 'Tutorial complete!',
    completionDesc: 'Congratulations! You completed all the steps for this inheritance method.',
    completionChecklist: 'What you did:',
    completionNext: 'Recommended next steps:',
    completionRetake: 'Redo tutorial',
    completionHome: 'Back to start',
    downloadPDF: 'Download PDF',
    generatingPDF: 'Generating PDF...',

    credits: 'Content based on tutorials by',
    and: 'and',

    backHome: 'letabuild.com',
    langToggle: 'PT'
  }
};
