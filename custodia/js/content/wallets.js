// ============================================================
// Wallets — Registry of all wallets with metadata
// ============================================================

const WALLETS = [
  {
    id: 'bluewallet',
    name: 'Blue Wallet',
    icon: 'assets/wallets/bluewallet.png',
    type: 'mobile',
    supports: ['simple'],
    description: {
      pt: 'Carteira mobile open-source para iOS e Android. Ideal para quem está começando.',
      en: 'Open-source mobile wallet for iOS and Android. Ideal for beginners.'
    },
    website: 'https://bluewallet.io',
    tutorials: ['bluewallet-simple']
  },
  {
    id: 'sparrow',
    name: 'Sparrow Wallet',
    icon: 'assets/wallets/sparrow.png',
    type: 'desktop',
    supports: ['simple', 'passphrase', 'multisig'],
    description: {
      pt: 'Carteira desktop completa. Suporta todas as formas de custódia. A mais versátil.',
      en: 'Complete desktop wallet. Supports all custody types. The most versatile.'
    },
    website: 'https://sparrowwallet.com',
    tutorials: ['sparrow-simple', 'coldcard-passphrase', 'jade-passphrase', 'nunchuk-multisig', 'sparrow-multisig']
  },
  {
    id: 'coldcard',
    name: 'Coldcard Q / MK4',
    icon: 'assets/wallets/coldcard.png',
    type: 'hardware',
    supports: ['simple', 'passphrase', 'multisig'],
    description: {
      pt: 'Hardware wallet air-gapped da Coinkite. Padrão-ouro em segurança Bitcoin.',
      en: 'Air-gapped hardware wallet by Coinkite. Gold standard in Bitcoin security.'
    },
    website: 'https://coldcard.com',
    tutorials: ['coldcard-simple', 'coldcard-passphrase', 'nunchuk-multisig', 'sparrow-multisig']
  },
  {
    id: 'trezor',
    name: 'Trezor',
    icon: 'assets/wallets/trezor.svg',
    type: 'hardware',
    supports: ['simple', 'passphrase'],
    description: {
      pt: 'A primeira hardware wallet do mercado. Interface simples, boa para iniciantes.',
      en: 'The first hardware wallet on the market. Simple interface, good for beginners.'
    },
    website: 'https://trezor.io',
    tutorials: ['trezor-simple', 'trezor-passphrase']
  },
  {
    id: 'ledger',
    name: 'Ledger',
    icon: 'assets/wallets/ledger.png',
    type: 'hardware',
    supports: ['simple', 'passphrase'],
    description: {
      pt: 'Hardware wallet popular com secure element. Veja o aviso sobre Ledger Recover.',
      en: 'Popular hardware wallet with secure element. See the Ledger Recover warning.'
    },
    website: 'https://www.ledger.com',
    tutorials: ['ledger-simple', 'ledger-passphrase']
  },
  {
    id: 'jade',
    name: 'Blockstream Jade',
    icon: 'assets/wallets/jade.svg',
    type: 'hardware',
    supports: ['passphrase', 'multisig'],
    description: {
      pt: 'Hardware wallet open-source da Blockstream. Air-gapped via câmera QR.',
      en: 'Open-source hardware wallet by Blockstream. Air-gapped via QR camera.'
    },
    website: 'https://blockstream.com/jade/',
    tutorials: ['jade-passphrase', 'nunchuk-multisig', 'sparrow-multisig']
  },
  {
    id: 'nunchuk',
    name: 'Nunchuk',
    icon: 'assets/wallets/nunchuk.png',
    type: 'mobile',
    supports: ['multisig'],
    description: {
      pt: 'Coordenador de multisig mais amigável. Mobile e desktop.',
      en: 'Most user-friendly multisig coordinator. Mobile and desktop.'
    },
    website: 'https://nunchuk.io',
    tutorials: ['nunchuk-multisig']
  }
];

// Tutorial metadata — maps tutorial IDs to their content modules
const TUTORIALS = {
  'bluewallet-simple':      { wallet: 'bluewallet', level: 'simple',     contentKey: 'bluewallet' },
  'sparrow-simple':         { wallet: 'sparrow',    level: 'simple',     contentKey: 'sparrowSingle' },
  'coldcard-simple':        { wallet: 'coldcard',   level: 'simple',     contentKey: 'coldcardSingle' },
  'trezor-simple':          { wallet: 'trezor',     level: 'simple',     contentKey: 'trezorSingle' },
  'ledger-simple':          { wallet: 'ledger',     level: 'simple',     contentKey: 'ledgerSingle' },
  'coldcard-passphrase':    { wallet: 'coldcard',   level: 'passphrase', contentKey: 'coldcardPassphrase' },
  'jade-passphrase':        { wallet: 'jade',       level: 'passphrase', contentKey: 'jadePassphrase' },
  'trezor-passphrase':      { wallet: 'trezor',     level: 'passphrase', contentKey: 'trezorPassphrase' },
  'ledger-passphrase':      { wallet: 'ledger',     level: 'passphrase', contentKey: 'ledgerPassphrase' },
  'nunchuk-multisig':       { wallet: 'nunchuk',    level: 'multisig',   contentKey: 'nunchukMultisig' },
  'sparrow-multisig':       { wallet: 'sparrow',    level: 'multisig',   contentKey: 'sparrowMultisig' }
};
