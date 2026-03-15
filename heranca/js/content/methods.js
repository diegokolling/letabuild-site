// ============================================================
// Methods — Registry of all inheritance methods with metadata
// ============================================================

const METHODS = [
  {
    id: 'seed-carta',
    icon: '📝',
    tier: 'no-hw',
    complexity: 'low',
    name: {
      pt: 'Seed + Carta',
      en: 'Seed + Letter'
    },
    description: {
      pt: 'O mais simples. Escreva instruções detalhadas para seu herdeiro e guarde a seed em local seguro. Sem custo, sem equipamento extra.',
      en: 'The simplest. Write detailed instructions for your heir and store the seed in a safe place. No cost, no extra equipment.'
    },
    tutorials: ['seed-carta']
  },
  {
    id: 'seed-split',
    icon: '✂️',
    tier: 'no-hw',
    complexity: 'medium',
    name: {
      pt: 'Seed Split',
      en: 'Seed Split'
    },
    description: {
      pt: 'Divida as palavras da seed entre pessoas de confiança. Ninguém sozinho tem acesso total. Mais seguro que seed única.',
      en: 'Split the seed words among trusted people. No single person has full access. More secure than a single seed.'
    },
    tutorials: ['seed-split']
  },
  {
    id: 'passphrase-carta',
    icon: '🌳',
    tier: 'hw',
    complexity: 'medium',
    name: {
      pt: 'Passphrase + Carta (Tronco e Galhos)',
      en: 'Passphrase + Letter (Trunk and Branches)'
    },
    description: {
      pt: 'Uma seed (tronco), infinitas passphrases (galhos). Cada herdeiro recebe sua própria passphrase. Ideal para vários filhos.',
      en: 'One seed (trunk), infinite passphrases (branches). Each heir gets their own passphrase. Ideal for multiple children.'
    },
    tutorials: ['passphrase-carta']
  },
  {
    id: 'multisig-heranca',
    icon: '🗝️',
    tier: 'hw',
    complexity: 'high',
    name: {
      pt: 'Multisig Distribuído',
      en: 'Distributed Multisig'
    },
    description: {
      pt: 'Chaves distribuídas entre herdeiro, advogado e cofre. Nenhuma pessoa sozinha pode mover os fundos. Segurança profissional.',
      en: 'Keys distributed among heir, lawyer and safe. No single person can move funds. Professional-grade security.'
    },
    tutorials: ['multisig-heranca']
  },
  {
    id: 'liana-timelock',
    icon: '⏱️',
    tier: 'hw',
    complexity: 'medium',
    name: {
      pt: 'Liana Timelock',
      en: 'Liana Timelock'
    },
    description: {
      pt: 'A chave do herdeiro se ativa automaticamente após meses de inatividade. Sem terceiros, sem confiança. O Bitcoin se destrava sozinho.',
      en: 'The heir\'s key activates automatically after months of inactivity. No third parties, no trust. Bitcoin unlocks itself.'
    },
    tutorials: ['liana-timelock']
  },
  {
    id: 'liana-decaying',
    icon: '🛡️',
    tier: 'hw',
    complexity: 'very-high',
    name: {
      pt: 'Liana Decaying Multisig',
      en: 'Liana Decaying Multisig'
    },
    description: {
      pt: 'Multisig no dia a dia + herança automática por timelock. A segurança máxima possível: protege contra roubo E perda.',
      en: 'Multisig for daily use + automatic inheritance via timelock. Maximum possible security: protects against theft AND loss.'
    },
    tutorials: ['liana-decaying']
  }
];

// Tutorial metadata — maps tutorial IDs to their content modules
const TUTORIALS = {
  'seed-carta':        { method: 'seed-carta',        tier: 'no-hw', contentKey: 'seedCarta' },
  'seed-split':        { method: 'seed-split',        tier: 'no-hw', contentKey: 'seedSplit' },
  'passphrase-carta':  { method: 'passphrase-carta',  tier: 'hw',    contentKey: 'passphraseCarta' },
  'multisig-heranca':  { method: 'multisig-heranca',  tier: 'hw',    contentKey: 'multisigHeranca' },
  'liana-timelock':    { method: 'liana-timelock',     tier: 'hw',    contentKey: 'lianaTimelock' },
  'liana-decaying':    { method: 'liana-decaying',     tier: 'hw',    contentKey: 'lianaDecaying' }
};
