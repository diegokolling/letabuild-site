// ============================================================
// Fundamentals — Shared concepts shown before inheritance tutorials
// ============================================================

const FUNDAMENTALS = {

  // ── What your heir needs to know ───────────────────────────
  heir_knowledge: {
    pt: [
      {
        id: 'heir-what-is-bitcoin',
        title: 'Seu herdeiro pode não saber nada sobre Bitcoin',
        icon: '👨‍👩‍👧‍👦',
        content: 'Não assuma que seu herdeiro entende Bitcoin. Muitos pais criam planos de herança sofisticados, mas esquecem que o filho pode não saber nem o que é uma seed phrase. <strong>Sua carta precisa começar do zero:</strong> o que é Bitcoin, por que você tem, por que é diferente de dinheiro no banco, e por que não existe "suporte técnico" que possa ajudar.'
      },
      {
        id: 'heir-no-support',
        title: 'Não existe recuperação de senha',
        icon: '🚫',
        content: 'Se seu herdeiro perder a seed phrase, passphrase ou chaves, <strong>ninguém no mundo pode recuperar os bitcoins</strong>. Não existe suporte, não existe tribunal, não existe hack. Isso é radicalmente diferente de dinheiro no banco, onde o herdeiro pode ir ao cartório com uma certidão de óbito. Seu plano de herança precisa ser à prova de falhas humanas.'
      },
      {
        id: 'heir-timeline',
        title: 'O que acontece após sua morte ou incapacidade',
        icon: '⏳',
        content: 'Pense no cenário real: você morre ou fica incapacitado. Seu herdeiro está em luto, estressado, e precisa lidar com inventário, contas, e agora Bitcoin. <strong>Quanto mais simples e claro for seu plano, maior a chance de funcionar.</strong> Não é hora de exigir conhecimento técnico avançado. O plano deve funcionar para uma pessoa emocionalmente abalada seguindo instruções passo a passo.'
      }
    ],
    en: [
      {
        id: 'heir-what-is-bitcoin',
        title: 'Your heir may know nothing about Bitcoin',
        icon: '👨‍👩‍👧‍👦',
        content: 'Don\'t assume your heir understands Bitcoin. Many parents create sophisticated inheritance plans but forget that their child may not even know what a seed phrase is. <strong>Your letter needs to start from zero:</strong> what Bitcoin is, why you have it, why it\'s different from bank money, and why there\'s no "tech support" that can help.'
      },
      {
        id: 'heir-no-support',
        title: 'There is no password recovery',
        icon: '🚫',
        content: 'If your heir loses the seed phrase, passphrase, or keys, <strong>nobody in the world can recover the bitcoin</strong>. There is no support, no court, no hack. This is radically different from bank money, where the heir can go to court with a death certificate. Your inheritance plan needs to be failure-proof.'
      },
      {
        id: 'heir-timeline',
        title: 'What happens after your death or incapacitation',
        icon: '⏳',
        content: 'Think about the real scenario: you die or become incapacitated. Your heir is grieving, stressed, dealing with probate, bills, and now Bitcoin. <strong>The simpler and clearer your plan, the higher the chance it works.</strong> This is not the time to require advanced technical knowledge. The plan must work for an emotionally shaken person following step-by-step instructions.'
      }
    ]
  },

  // ── How to divide information securely ─────────────────────
  info_security: {
    pt: [
      {
        id: 'separation-principle',
        title: 'O princípio da separação',
        icon: '🔐',
        content: '<strong>Nenhuma pessoa ou local deve ter TODAS as informações necessárias para acessar seus bitcoins.</strong> Isso é a base de qualquer plano de herança seguro. Se uma única pessoa pode acessar tudo, ela pode roubar. Se tudo está em um único local, um incêndio ou roubo compromete tudo. Separe: seed em um lugar, passphrase ou instruções em outro, carta com uma terceira pessoa.'
      },
      {
        id: 'bus-factor',
        title: 'O fator ônibus',
        icon: '🚌',
        content: 'Pergunte-se: <strong>e se a pessoa que guarda parte das minhas informações também morrer?</strong> Seu plano precisa de redundância. Se você confia uma parte da seed ao seu irmão e ele morre antes de você, o plano falha. Sempre tenha pelo menos duas pessoas ou locais para cada peça crítica de informação.'
      },
      {
        id: 'redundancy-vs-security',
        title: 'Redundância vs. segurança',
        icon: '⚖️',
        content: 'Cada cópia é uma faca de dois gumes: <strong>protege contra perda, mas aumenta o risco de roubo</strong>. Se você faz 5 cópias da seed e distribui entre 5 pessoas, qualquer uma delas pode roubar seus bitcoins. Se você faz apenas 1 cópia e ela se perde, você perde tudo. O equilíbrio ideal depende do seu cenário. Regra geral: 2-3 cópias em locais separados e seguros.'
      }
    ],
    en: [
      {
        id: 'separation-principle',
        title: 'The separation principle',
        icon: '🔐',
        content: '<strong>No single person or location should have ALL the information needed to access your bitcoin.</strong> This is the foundation of any secure inheritance plan. If a single person can access everything, they can steal. If everything is in one place, a fire or theft compromises it all. Separate: seed in one place, passphrase or instructions in another, letter with a third person.'
      },
      {
        id: 'bus-factor',
        title: 'The bus factor',
        icon: '🚌',
        content: 'Ask yourself: <strong>what if the person holding part of my information also dies?</strong> Your plan needs redundancy. If you trust a seed share to your brother and he dies before you, the plan fails. Always have at least two people or locations for each critical piece of information.'
      },
      {
        id: 'redundancy-vs-security',
        title: 'Redundancy vs. security',
        icon: '⚖️',
        content: 'Each copy is a double-edged sword: <strong>it protects against loss but increases theft risk</strong>. If you make 5 copies of the seed and distribute among 5 people, any of them can steal your bitcoin. If you make only 1 copy and it\'s lost, you lose everything. The ideal balance depends on your scenario. General rule: 2-3 copies in separate, secure locations.'
      }
    ]
  },

  // ── Letter template ────────────────────────────────────────
  letter_template: {
    pt: [
      {
        id: 'letter-overview',
        title: 'Por que você precisa de uma carta',
        icon: '✉️',
        content: 'A carta é o componente mais importante do seu plano de herança. Sem ela, mesmo que seu herdeiro tenha a seed phrase, ele pode não saber o que fazer com ela. <strong>A carta deve ser escrita em linguagem simples</strong>, como se você estivesse explicando para alguém que nunca ouviu falar de Bitcoin. Escreva à mão ou imprima. Guarde separada da seed.'
      },
      {
        id: 'letter-template',
        title: 'Modelo de carta para copiar e adaptar',
        icon: '📋',
        content: '<strong>CARTA DE INSTRUÇÕES PARA HERANÇA BITCOIN</strong><br><br><strong>Para:</strong> [nome do herdeiro]<br><strong>De:</strong> [seu nome]<br><strong>Data:</strong> [data de criação]<br><br><strong>1. O que é isso?</strong><br>Eu possuo Bitcoin, uma moeda digital que existe fora do sistema bancário. Diferente de dinheiro no banco, não existe gerente, suporte ou senha para recuperar. O acesso depende de informações que deixei para você.<br><br><strong>2. O que você precisa</strong><br>[Adapte conforme seu método: seed phrase / passphrase / hardware wallet / chaves multisig]<br>- A seed phrase está guardada em: [local]<br>- A passphrase está guardada em: [local, se aplicável]<br>- A hardware wallet está em: [local, se aplicável]<br><br><strong>3. Passo a passo para recuperar</strong><br>[Adapte conforme seu método. Exemplo para seed simples:]<br>1. Baixe a carteira [nome] do site oficial [URL]<br>2. Escolha "Recuperar carteira" ou "Import wallet"<br>3. Digite as [12/24] palavras na ordem exata<br>4. Seus bitcoins aparecerão na tela<br>5. Para converter em reais, envie para uma exchange confiável<br><br><strong>4. AVISOS DE SEGURANÇA</strong><br>- NUNCA compartilhe estas palavras com ninguém<br>- NUNCA digite em sites que alguém te enviou por email ou mensagem<br>- NUNCA fotografe este papel<br>- Se alguém diz que é "suporte" e pede suas palavras, é GOLPE<br>- Na dúvida, vá ao site oficial da carteira digitando o endereço você mesmo<br><br><strong>5. Se precisar de ajuda</strong><br>- [Nome de pessoa de confiança]: [contato] (sabe sobre meu Bitcoin mas NÃO tem acesso às chaves)<br>- Comunidade Bitcoinheiros: bitcoinheiros.com<br>- NUNCA peça ajuda em grupos de Telegram ou Discord enviando suas chaves<br><br><strong>Atualizações:</strong> Esta carta foi criada em [data]. Se você encontrar uma versão mais recente, use a mais recente.'
      }
    ],
    en: [
      {
        id: 'letter-overview',
        title: 'Why you need a letter',
        icon: '✉️',
        content: 'The letter is the most important component of your inheritance plan. Without it, even if your heir has the seed phrase, they may not know what to do with it. <strong>The letter must be written in simple language</strong>, as if you were explaining to someone who has never heard of Bitcoin. Write by hand or print. Store separately from the seed.'
      },
      {
        id: 'letter-template',
        title: 'Letter template to copy and adapt',
        icon: '📋',
        content: '<strong>BITCOIN INHERITANCE INSTRUCTIONS</strong><br><br><strong>To:</strong> [heir\'s name]<br><strong>From:</strong> [your name]<br><strong>Date:</strong> [creation date]<br><br><strong>1. What is this?</strong><br>I own Bitcoin, a digital currency that exists outside the banking system. Unlike bank money, there is no manager, support, or password recovery. Access depends on information I have left for you.<br><br><strong>2. What you need</strong><br>[Adapt according to your method: seed phrase / passphrase / hardware wallet / multisig keys]<br>- The seed phrase is stored at: [location]<br>- The passphrase is stored at: [location, if applicable]<br>- The hardware wallet is at: [location, if applicable]<br><br><strong>3. Step by step to recover</strong><br>[Adapt according to your method. Example for simple seed:]<br>1. Download [wallet name] from the official website [URL]<br>2. Choose "Recover wallet" or "Import wallet"<br>3. Type the [12/24] words in the exact order<br>4. Your bitcoin will appear on screen<br>5. To convert to fiat, send to a trusted exchange<br><br><strong>4. SECURITY WARNINGS</strong><br>- NEVER share these words with anyone<br>- NEVER type them into sites someone sent you by email or message<br>- NEVER photograph this paper<br>- If someone says they are "support" and asks for your words, it\'s a SCAM<br>- When in doubt, go to the official wallet website by typing the address yourself<br><br><strong>5. If you need help</strong><br>- [Trusted person\'s name]: [contact] (knows about my Bitcoin but does NOT have access to keys)<br>- Community: bitcoinheiros.com<br>- NEVER ask for help in Telegram or Discord groups by sharing your keys<br><br><strong>Updates:</strong> This letter was created on [date]. If you find a more recent version, use the most recent one.'
      }
    ]
  },

  // ── Prerequisites ──────────────────────────────────────────
  prerequisites: {
    pt: [
      {
        id: 'prereq-check',
        title: 'Antes de começar: você já fez autocustódia?',
        icon: '✅',
        content: 'Este tutorial assume que você já completou os pré-requisitos:<br><br>• <strong>Geração de seed offline</strong> — você sabe gerar e guardar uma seed phrase com segurança<br>• <strong>Autocustódia básica</strong> — você já tem bitcoins sob sua própria custódia (não em exchange)<br><br>Se ainda não fez, <a href="/custodia/">comece pelo tutorial de autocustódia</a>. Herança sem autocustódia é como fazer testamento sem ter patrimônio.'
      }
    ],
    en: [
      {
        id: 'prereq-check',
        title: 'Before starting: have you done self-custody?',
        icon: '✅',
        content: 'This tutorial assumes you have already completed the prerequisites:<br><br>• <strong>Offline seed generation</strong> — you know how to generate and store a seed phrase securely<br>• <strong>Basic self-custody</strong> — you already have bitcoin under your own custody (not on an exchange)<br><br>If not, <a href="/custodia/">start with the self-custody tutorial</a>. Inheritance without self-custody is like making a will without having assets.'
      }
    ]
  }
};

// ── Helper: get relevant fundamentals for a tutorial path ────
function getFundamentalsForPath(tier, methodId) {
  return ['prerequisites', 'heir_knowledge', 'info_security', 'letter_template'];
}
