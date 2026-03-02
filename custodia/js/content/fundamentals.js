// ============================================================
// Best Practices — Comprehensive guide shown before tutorials
// Organized by topic, contextual to the user's chosen path
// ============================================================

const BEST_PRACTICES = {

  // ── CORE: shown to everyone ─────────────────────────────
  core: {
    pt: [
      {
        id: 'what-is-custody',
        title: 'O que é auto-custódia?',
        icon: '🏦',
        content: 'Quando seus bitcoins estão em uma exchange, quem controla as chaves é a exchange — não você. Se ela quebrar, for hackeada ou congelar sua conta, você perde acesso. <strong>"Not your keys, not your coins"</strong> é o princípio mais importante do Bitcoin. Auto-custódia significa que você, e somente você, controla suas chaves privadas.'
      },
      {
        id: 'what-is-seed',
        title: 'O que é uma seed phrase?',
        icon: '🌱',
        content: 'Uma seed phrase é um conjunto de <strong>12 ou 24 palavras</strong> (do padrão BIP39) que codificam sua chave privada. Com essas palavras, você recupera seus bitcoins em qualquer carteira compatível, em qualquer lugar do mundo, a qualquer momento. A seed phrase não é um "backup da carteira" — ela <strong>é a sua carteira</strong>. Quem tem a seed, tem os bitcoins.'
      },
      {
        id: 'seed-rules',
        title: 'Regras de ouro da seed phrase',
        icon: '⚠️',
        content: '<strong>1. Nunca fotografe ou faça screenshot.</strong> Fotos sincronizam com a nuvem automaticamente. Um hacker que acesse seu iCloud/Google Photos tem acesso aos seus bitcoins.<br><br><strong>2. Nunca digite em sites ou apps desconhecidos.</strong> Nenhum serviço legítimo vai pedir sua seed. Se alguém pediu, é golpe.<br><br><strong>3. Nunca armazene digitalmente.</strong> Nem em email, nem em notas do celular, nem em arquivo de texto, nem em gerenciador de senhas. Qualquer formato digital é vulnerável.<br><br><strong>4. Escreva à mão, em papel ou placa de metal.</strong> Papel é aceitável para começar. Para valores maiores, use placa de metal (resiste a fogo e água).<br><br><strong>5. Nunca compartilhe com ninguém.</strong> Nenhum suporte técnico legítimo de nenhuma carteira vai pedir sua seed. Se pediram, você está sendo roubado.'
      },
      {
        id: 'proof-of-work',
        title: 'Auto-custódia é prova de trabalho',
        icon: '⛏️',
        content: 'Não existe atalho. Não existe "recuperar senha". Não existe suporte técnico que desbloqueie sua carteira. Se você perder sua seed phrase e não tiver backup, seus bitcoins estão <strong>perdidos para sempre</strong>. Isso parece assustador — e deve parecer. É exatamente essa responsabilidade que torna o Bitcoin poderoso: ninguém pode confiscá-lo, censurá-lo ou congelá-lo se você guardar suas chaves com cuidado. O esforço que você investe agora para aprender é a segurança dos seus bitcoins no futuro.'
      }
    ],
    en: [
      {
        id: 'what-is-custody',
        title: 'What is self-custody?',
        icon: '🏦',
        content: 'When your bitcoin is on an exchange, the exchange controls the keys — not you. If it goes bankrupt, gets hacked, or freezes your account, you lose access. <strong>"Not your keys, not your coins"</strong> is Bitcoin\'s most important principle. Self-custody means you, and only you, control your private keys.'
      },
      {
        id: 'what-is-seed',
        title: 'What is a seed phrase?',
        icon: '🌱',
        content: 'A seed phrase is a set of <strong>12 or 24 words</strong> (from the BIP39 standard) that encode your private key. With these words, you can recover your bitcoin on any compatible wallet, anywhere in the world, at any time. The seed phrase is not a "wallet backup" — it <strong>is your wallet</strong>. Whoever has the seed, has the bitcoin.'
      },
      {
        id: 'seed-rules',
        title: 'Golden rules for seed phrases',
        icon: '⚠️',
        content: '<strong>1. Never photograph or screenshot.</strong> Photos sync to the cloud automatically. A hacker who accesses your iCloud/Google Photos has access to your bitcoin.<br><br><strong>2. Never type into unknown sites or apps.</strong> No legitimate service will ask for your seed. If someone asks, it\'s a scam.<br><br><strong>3. Never store digitally.</strong> Not in email, not in phone notes, not in a text file, not in a password manager. Any digital format is vulnerable.<br><br><strong>4. Write by hand, on paper or metal plate.</strong> Paper is acceptable to start. For larger amounts, use a metal plate (resistant to fire and water).<br><br><strong>5. Never share with anyone.</strong> No legitimate wallet support will ever ask for your seed. If they ask, you\'re being robbed.'
      },
      {
        id: 'proof-of-work',
        title: 'Self-custody is proof of work',
        icon: '⛏️',
        content: 'There are no shortcuts. There is no "reset password". There is no support team that can unlock your wallet. If you lose your seed phrase and have no backup, your bitcoin is <strong>gone forever</strong>. This sounds scary — and it should. That\'s exactly what makes Bitcoin powerful: nobody can confiscate, censor, or freeze it if you guard your keys carefully. The effort you invest now in learning is the security of your bitcoin in the future.'
      }
    ]
  },

  // ── DEVICE CHOICE: when to use what ─────────────────────
  devices: {
    pt: [
      {
        id: 'when-mobile',
        title: 'Quando usar uma carteira no celular',
        icon: '📱',
        content: 'Carteiras mobile (como Blue Wallet) são ideais para:<br><br>• <strong>Valores pequenos</strong> que você usa no dia a dia<br>• <strong>Aprender</strong> como funciona auto-custódia pela primeira vez<br>• <strong>Receber pagamentos</strong> rápidos via Lightning Network<br><br>Pense na carteira mobile como a <strong>carteira do bolso</strong>: você não anda com todo seu patrimônio nela. Para valores maiores, use hardware wallet.'
      },
      {
        id: 'when-hardware',
        title: 'Quando usar uma hardware wallet',
        icon: '🔐',
        content: 'Uma hardware wallet é um dispositivo físico que mantém suas chaves <strong>isoladas da internet</strong>. Mesmo que seu computador tenha malware, a hardware wallet impede o roubo das chaves.<br><br>Use hardware wallet quando:<br>• O valor armazenado é <strong>significativo para você</strong> (não existe valor mínimo universal)<br>• Você quer <strong>segurança de longo prazo</strong> (poupança, reserva, herança)<br>• Você quer <strong>assinar transações offline</strong> (air-gapped)<br><br>Se você tiver R$500 em Bitcoin e perder dói, já vale usar hardware wallet.'
      },
      {
        id: 'desktop-vs-mobile',
        title: 'Por que desktop é mais seguro que mobile para gerenciar',
        icon: '🖥️',
        content: 'Para <strong>gerenciar</strong> hardware wallets, passphrase e multisig, use um computador desktop com o Sparrow Wallet. Motivos:<br><br>• <strong>Tela maior</strong> para verificar endereços e transações com calma<br>• <strong>Menos distrações</strong> que um celular (reduz erros)<br>• <strong>Mais controle</strong> sobre conexão de rede e verificação de software<br>• <strong>Sparrow Wallet</strong> é a ferramenta mais completa e só roda em desktop<br><br>O celular pode ser usado como carteira mobile simples. Mas para operações avançadas (passphrase, multisig), desktop é o padrão.'
      },
      {
        id: 'buy-hardware',
        title: 'Como comprar uma hardware wallet com segurança',
        icon: '🛒',
        content: '<strong>Sempre compre diretamente do fabricante ou revendedores autorizados.</strong> Nunca compre hardware wallet usada, de marketplace (Mercado Livre, eBay) ou de vendedores desconhecidos.<br><br>Razão: um dispositivo comprometido pode vir com seed pré-gerada pelo atacante. Você deposita, ele saca.<br><br>Ao receber, verifique:<br>• <strong>Embalagem lacrada</strong> (sinais de violação = devolva)<br>• <strong>O dispositivo gera uma seed nova</strong> na primeira inicialização<br>• Se o dispositivo já veio com seed anotada em um papel dentro da caixa, <strong>é golpe</strong>. Devolva imediatamente.'
      }
    ],
    en: [
      {
        id: 'when-mobile',
        title: 'When to use a mobile wallet',
        icon: '📱',
        content: 'Mobile wallets (like Blue Wallet) are ideal for:<br><br>• <strong>Small amounts</strong> you use day to day<br>• <strong>Learning</strong> how self-custody works for the first time<br>• <strong>Receiving payments</strong> quickly via Lightning Network<br><br>Think of a mobile wallet as your <strong>pocket wallet</strong>: you don\'t carry your entire net worth in it. For larger amounts, use a hardware wallet.'
      },
      {
        id: 'when-hardware',
        title: 'When to use a hardware wallet',
        icon: '🔐',
        content: 'A hardware wallet is a physical device that keeps your keys <strong>isolated from the internet</strong>. Even if your computer has malware, the hardware wallet prevents key theft.<br><br>Use a hardware wallet when:<br>• The stored value is <strong>significant to you</strong> (there\'s no universal minimum)<br>• You want <strong>long-term security</strong> (savings, reserve, inheritance)<br>• You want to <strong>sign transactions offline</strong> (air-gapped)<br><br>If you have $200 in Bitcoin and losing it would hurt, a hardware wallet is already worth it.'
      },
      {
        id: 'desktop-vs-mobile',
        title: 'Why desktop is more secure than mobile for management',
        icon: '🖥️',
        content: 'To <strong>manage</strong> hardware wallets, passphrase, and multisig, use a desktop computer with Sparrow Wallet. Reasons:<br><br>• <strong>Larger screen</strong> to verify addresses and transactions carefully<br>• <strong>Fewer distractions</strong> than a phone (reduces errors)<br>• <strong>More control</strong> over network connection and software verification<br>• <strong>Sparrow Wallet</strong> is the most complete tool and only runs on desktop<br><br>Your phone can be used as a simple mobile wallet. But for advanced operations (passphrase, multisig), desktop is the standard.'
      },
      {
        id: 'buy-hardware',
        title: 'How to buy a hardware wallet safely',
        icon: '🛒',
        content: '<strong>Always buy directly from the manufacturer or authorized resellers.</strong> Never buy a used hardware wallet, from marketplaces (Amazon third-party, eBay) or unknown sellers.<br><br>Reason: a compromised device can come with a seed pre-generated by the attacker. You deposit, they withdraw.<br><br>When you receive it, check:<br>• <strong>Sealed packaging</strong> (signs of tampering = return it)<br>• <strong>The device generates a new seed</strong> on first initialization<br>• If the device came with a seed already written on a paper inside the box, <strong>it\'s a scam</strong>. Return it immediately.'
      }
    ]
  },

  // ── BACKUP: proper backup practices ─────────────────────
  backup: {
    pt: [
      {
        id: 'backup-locations',
        title: 'Onde guardar o backup da seed',
        icon: '📍',
        content: 'Seu backup precisa sobreviver a:<br><br>• <strong>Roubo:</strong> não guarde junto com o dispositivo (celular/hardware wallet)<br>• <strong>Incêndio/inundação:</strong> papel queima e molha — placa de metal é mais resistente<br>• <strong>Você esquecer onde colocou:</strong> precisa ser encontrável por você<br><br>Para valores maiores, considere <strong>distribuir cópias em locais diferentes</strong> (casa + cofre do banco + casa de familiar de confiança). Mas cuidado: cada cópia é um ponto de vulnerabilidade.'
      },
      {
        id: 'backup-test',
        title: 'Sempre teste a recuperação ANTES de depositar',
        icon: '🧪',
        content: 'Depois de anotar a seed e guardar o backup:<br><br>1. <strong>Delete a carteira</strong> do dispositivo<br>2. <strong>Restaure a carteira</strong> usando apenas as palavras do papel<br>3. <strong>Verifique</strong> que o endereço gerado é o mesmo de antes<br>4. <strong>Só então</strong> deposite valores<br><br>Esse teste prova que seu backup funciona. Se você pular esse passo e seu backup tiver um erro, vai descobrir tarde demais.'
      },
      {
        id: 'backup-metal',
        title: 'Backup em placa de metal',
        icon: '🔩',
        content: 'Para valores significativos, grave sua seed em <strong>placa de metal</strong> (aço inoxidável ou titânio). Existem vários produtos no mercado:<br><br>• <strong>Stackbit</strong> (marca brasileira) — sistema de furos que mapeia para palavras BIP39<br>• <strong>Cryptosteel</strong>, <strong>Billfodl</strong> — placas internacionais<br><br>Vantagens: resiste a fogo (até 1.500°C), água, impacto e corrosão. Papel não sobrevive a um incêndio. Metal sim.'
      },
      {
        id: 'backup-separation',
        title: 'Nunca guarde a seed junto com o dispositivo',
        icon: '🚫',
        content: 'Se um ladrão entra na sua casa e encontra a hardware wallet E a seed no mesmo lugar, ele rouba tudo. A seed é o acesso final. O dispositivo é só a interface.<br><br><strong>Regra:</strong> dispositivo em um lugar, backup em outro. Se possível, em locais fisicamente separados (casa vs. cofre, por exemplo).'
      }
    ],
    en: [
      {
        id: 'backup-locations',
        title: 'Where to store your seed backup',
        icon: '📍',
        content: 'Your backup needs to survive:<br><br>• <strong>Theft:</strong> don\'t store it with the device (phone/hardware wallet)<br>• <strong>Fire/flood:</strong> paper burns and gets wet — metal plate is more resistant<br>• <strong>You forgetting where you put it:</strong> it needs to be findable by you<br><br>For larger amounts, consider <strong>distributing copies in different locations</strong> (home + bank safe + trusted family member\'s home). But careful: each copy is a vulnerability point.'
      },
      {
        id: 'backup-test',
        title: 'Always test recovery BEFORE depositing',
        icon: '🧪',
        content: 'After writing down the seed and storing the backup:<br><br>1. <strong>Delete the wallet</strong> from the device<br>2. <strong>Restore the wallet</strong> using only the words from paper<br>3. <strong>Verify</strong> that the generated address is the same as before<br>4. <strong>Only then</strong> deposit funds<br><br>This test proves your backup works. If you skip this step and your backup has an error, you\'ll find out too late.'
      },
      {
        id: 'backup-metal',
        title: 'Metal plate backup',
        icon: '🔩',
        content: 'For significant amounts, engrave your seed on a <strong>metal plate</strong> (stainless steel or titanium). Several products exist:<br><br>• <strong>Cryptosteel</strong>, <strong>Billfodl</strong> — popular options<br>• <strong>Stackbit</strong> (Brazilian brand) — hole-punch system mapping to BIP39 words<br><br>Advantages: resists fire (up to 1,500°C), water, impact, and corrosion. Paper doesn\'t survive a house fire. Metal does.'
      },
      {
        id: 'backup-separation',
        title: 'Never store the seed with the device',
        icon: '🚫',
        content: 'If a thief enters your home and finds the hardware wallet AND the seed in the same place, they steal everything. The seed is the ultimate access. The device is just the interface.<br><br><strong>Rule:</strong> device in one place, backup in another. If possible, in physically separate locations (home vs. safe deposit box, for example).'
      }
    ]
  },

  // ── VERIFICATION: don't trust, verify ───────────────────
  verification: {
    pt: [
      {
        id: 'verify-address',
        title: 'Sempre verifique o endereço no dispositivo',
        icon: '🔍',
        content: 'Malware pode trocar o endereço de destino na tela do computador sem você perceber (ataque de clipboard hijacking).<br><br><strong>Antes de enviar Bitcoin:</strong><br>• Compare o endereço na tela do computador com o endereço na tela da hardware wallet<br>• Confira pelo menos os <strong>primeiros 6 e últimos 6 caracteres</strong><br>• Se os endereços não coincidirem, <strong>pare imediatamente</strong> — seu computador pode estar comprometido'
      },
      {
        id: 'verify-software',
        title: 'Verifique a assinatura do software antes de instalar',
        icon: '✅',
        content: 'Sempre baixe carteiras do <strong>site oficial</strong> e, quando possível, verifique a assinatura GPG do arquivo. Isso confirma que o software não foi adulterado.<br><br>• <strong>Sparrow:</strong> sparrowwallet.com (verificar assinatura PGP)<br>• <strong>Blue Wallet:</strong> App Store / Play Store (verificar desenvolvedor)<br>• <strong>Hardware wallets:</strong> site oficial do fabricante apenas<br><br>Se alguém te mandar um link "atualizado" por email, Telegram ou Discord, <strong>ignore</strong>. Vá direto ao site oficial.'
      }
    ],
    en: [
      {
        id: 'verify-address',
        title: 'Always verify the address on the device',
        icon: '🔍',
        content: 'Malware can swap the destination address on your computer screen without you noticing (clipboard hijacking attack).<br><br><strong>Before sending Bitcoin:</strong><br>• Compare the address on the computer screen with the address on the hardware wallet screen<br>• Check at least the <strong>first 6 and last 6 characters</strong><br>• If the addresses don\'t match, <strong>stop immediately</strong> — your computer may be compromised'
      },
      {
        id: 'verify-software',
        title: 'Verify software signatures before installing',
        icon: '✅',
        content: 'Always download wallets from the <strong>official website</strong> and, when possible, verify the GPG signature of the file. This confirms the software hasn\'t been tampered with.<br><br>• <strong>Sparrow:</strong> sparrowwallet.com (verify PGP signature)<br>• <strong>Blue Wallet:</strong> App Store / Play Store (verify developer)<br>• <strong>Hardware wallets:</strong> official manufacturer website only<br><br>If someone sends you an "updated" link via email, Telegram, or Discord, <strong>ignore it</strong>. Go directly to the official website.'
      }
    ]
  },

  // ── OPSEC: operational security ─────────────────────────
  opsec: {
    pt: [
      {
        id: 'dont-tell',
        title: 'Não conte quanto Bitcoin você tem',
        icon: '🤫',
        content: 'Quanto mais pessoas sabem que você tem Bitcoin (e quanto), mais você se torna um alvo. Isso vale para:<br><br>• <strong>Redes sociais</strong> — não poste saldos, prints de carteira ou transações<br>• <strong>Conversas pessoais</strong> — seja vago sobre valores ("tenho um pouco")<br>• <strong>Encontros presenciais</strong> — nunca mostre saldos em público<br><br>Ataques físicos (wrench attack) são reais. A melhor proteção é ninguém saber que você é um alvo.'
      },
      {
        id: 'common-scams',
        title: 'Golpes mais comuns',
        icon: '🎣',
        content: '<strong>1. Suporte falso:</strong> alguém no Telegram/Discord/Twitter fingindo ser "suporte da carteira" e pedindo sua seed.<br><br><strong>2. Phishing:</strong> site falso idêntico ao oficial que rouba sua seed quando você "recupera" a carteira.<br><br><strong>3. Airdrop/promoção:</strong> "envie 0.1 BTC e receba 1 BTC de volta" — sempre golpe.<br><br><strong>4. Hardware wallet adulterada:</strong> dispositivo comprado de terceiros que vem com seed pré-gerada.<br><br><strong>5. Atualização urgente falsa:</strong> email pedindo para atualizar o firmware "urgentemente" com link malicioso.<br><br><strong>Regra geral:</strong> se parece bom demais para ser verdade, é golpe.'
      }
    ],
    en: [
      {
        id: 'dont-tell',
        title: 'Don\'t tell people how much Bitcoin you have',
        icon: '🤫',
        content: 'The more people know you have Bitcoin (and how much), the more you become a target. This applies to:<br><br>• <strong>Social media</strong> — don\'t post balances, wallet screenshots, or transactions<br>• <strong>Personal conversations</strong> — be vague about amounts ("I have a little")<br>• <strong>In-person meetings</strong> — never show balances in public<br><br>Physical attacks (wrench attack) are real. The best protection is nobody knowing you\'re a target.'
      },
      {
        id: 'common-scams',
        title: 'Most common scams',
        icon: '🎣',
        content: '<strong>1. Fake support:</strong> someone on Telegram/Discord/Twitter pretending to be "wallet support" and asking for your seed.<br><br><strong>2. Phishing:</strong> fake website identical to the official one that steals your seed when you "recover" your wallet.<br><br><strong>3. Airdrop/giveaway:</strong> "send 0.1 BTC and receive 1 BTC back" — always a scam.<br><br><strong>4. Tampered hardware wallet:</strong> device bought from third parties that comes with a pre-generated seed.<br><br><strong>5. Fake urgent update:</strong> email asking you to update firmware "urgently" with a malicious link.<br><br><strong>General rule:</strong> if it seems too good to be true, it\'s a scam.'
      }
    ]
  },

  // ── LEVEL-SPECIFIC: shown based on chosen path ──────────
  passphrase_info: {
    pt: [
      {
        id: 'what-is-passphrase',
        title: 'O que é passphrase (a "13ª/25ª palavra")',
        icon: '🔑',
        content: 'Uma passphrase (às vezes chamada de "13ª palavra" ou "25ª palavra") é uma <strong>senha adicional</strong> que, combinada com sua seed phrase, gera uma carteira completamente diferente.<br><br>• Seed de 12 palavras sem passphrase → Carteira A<br>• Seed de 12 palavras + passphrase "minhaSenha" → Carteira B (totalmente diferente)<br><br><strong>Usos:</strong><br>• Proteção extra contra roubo físico da seed (o ladrão precisa da seed E da passphrase)<br>• "Plausible deniability": mantenha um valor pequeno na carteira sem passphrase e o valor real na carteira com passphrase'
      },
      {
        id: 'passphrase-risks',
        title: 'Riscos da passphrase',
        icon: '⚠️',
        content: '<strong>Se você esquecer a passphrase, perde acesso à carteira.</strong> Não existe recuperação. A passphrase não é armazenada em nenhum lugar — ela existe apenas na sua memória ou no seu backup.<br><br>Recomendações:<br>• <strong>Nunca guarde a passphrase junto com a seed.</strong> São dois fatores — separe-os.<br>• <strong>Faça backup da passphrase</strong> em local diferente da seed<br>• <strong>Teste</strong> a recuperação (seed + passphrase) antes de depositar valores<br>• <strong>Use hardware wallet</strong> para gerenciar passphrase — nunca digite em software puro'
      }
    ],
    en: [
      {
        id: 'what-is-passphrase',
        title: 'What is a passphrase (the "13th/25th word")',
        icon: '🔑',
        content: 'A passphrase (sometimes called the "13th word" or "25th word") is an <strong>additional password</strong> that, combined with your seed phrase, generates a completely different wallet.<br><br>• 12-word seed without passphrase → Wallet A<br>• 12-word seed + passphrase "myPassword" → Wallet B (completely different)<br><br><strong>Uses:</strong><br>• Extra protection against physical seed theft (the thief needs the seed AND the passphrase)<br>• "Plausible deniability": keep a small amount in the wallet without passphrase and the real amount in the wallet with passphrase'
      },
      {
        id: 'passphrase-risks',
        title: 'Passphrase risks',
        icon: '⚠️',
        content: '<strong>If you forget the passphrase, you lose access to the wallet.</strong> There is no recovery. The passphrase is not stored anywhere — it exists only in your memory or your backup.<br><br>Recommendations:<br>• <strong>Never store the passphrase with the seed.</strong> They are two factors — separate them.<br>• <strong>Back up the passphrase</strong> in a different location from the seed<br>• <strong>Test</strong> recovery (seed + passphrase) before depositing funds<br>• <strong>Use a hardware wallet</strong> to manage passphrase — never type it in software only'
      }
    ]
  },

  multisig_info: {
    pt: [
      {
        id: 'what-is-multisig',
        title: 'O que é multisig?',
        icon: '🗝️',
        content: 'Multisig (multi-assinatura) é um esquema onde <strong>mais de uma chave é necessária</strong> para autorizar uma transação. O formato mais comum é <strong>2-de-3</strong>: existem 3 chaves, e qualquer 2 delas podem assinar.<br><br><strong>Vantagens:</strong><br>• Se uma chave for roubada ou perdida, seus bitcoins continuam seguros<br>• Nenhum ponto único de falha<br>• Ideal para herança e proteção patrimonial<br><br><strong>Desvantagem:</strong> é mais complexo de configurar e gerenciar. Por isso você está aqui.'
      },
      {
        id: 'multisig-diversity',
        title: 'Use hardware wallets de fabricantes diferentes',
        icon: '🏭',
        content: 'Em um multisig 2-de-3, use dispositivos de <strong>fabricantes diferentes</strong>. Exemplo: Coldcard + Jade + Trezor.<br><br><strong>Por quê?</strong> Se um fabricante tiver uma vulnerabilidade no firmware ou no hardware, as outras chaves de fabricantes diferentes protegem seus bitcoins. Se você usar 3 Coldcards e a Coldcard tiver um bug, todas as 3 chaves estão comprometidas.<br><br>Diversidade de fabricantes é a base da segurança multisig.'
      },
      {
        id: 'multisig-coordinator',
        title: 'O que é o coordenador (Sparrow / Nunchuk)',
        icon: '🧩',
        content: 'O coordenador é o <strong>software que gerencia a carteira multisig</strong>. Ele combina as chaves públicas, gera os endereços e prepara as transações para assinatura. O coordenador <strong>não tem acesso às chaves privadas</strong> — ele só organiza.<br><br>• <strong>Sparrow Wallet</strong> (desktop): mais controle, mais técnico<br>• <strong>Nunchuk</strong> (mobile/desktop): interface mais amigável, ideal para iniciantes em multisig<br><br>Ambos são open-source e confiáveis.'
      },
      {
        id: 'multisig-desktop-required',
        title: 'Multisig requer desktop para configuração',
        icon: '🖥️',
        content: 'Embora o Nunchuk funcione no celular para uso diário, a <strong>configuração inicial do multisig</strong> é melhor feita em um computador desktop. Motivos:<br><br>• Você precisa conectar/parear múltiplas hardware wallets<br>• A tela maior ajuda a verificar xpubs e descriptors sem erro<br>• O processo de backup é mais complexo (múltiplas seeds + configuração da carteira)<br><br>Depois de configurado, o gerenciamento do dia a dia pode ser feito no celular via Nunchuk.'
      }
    ],
    en: [
      {
        id: 'what-is-multisig',
        title: 'What is multisig?',
        icon: '🗝️',
        content: 'Multisig (multi-signature) is a scheme where <strong>more than one key is needed</strong> to authorize a transaction. The most common format is <strong>2-of-3</strong>: there are 3 keys, and any 2 of them can sign.<br><br><strong>Advantages:</strong><br>• If one key is stolen or lost, your bitcoin remains safe<br>• No single point of failure<br>• Ideal for inheritance and wealth protection<br><br><strong>Disadvantage:</strong> it\'s more complex to set up and manage. That\'s why you\'re here.'
      },
      {
        id: 'multisig-diversity',
        title: 'Use hardware wallets from different manufacturers',
        icon: '🏭',
        content: 'In a 2-of-3 multisig, use devices from <strong>different manufacturers</strong>. Example: Coldcard + Jade + Trezor.<br><br><strong>Why?</strong> If one manufacturer has a firmware or hardware vulnerability, the keys from different manufacturers protect your bitcoin. If you use 3 Coldcards and Coldcard has a bug, all 3 keys are compromised.<br><br>Manufacturer diversity is the foundation of multisig security.'
      },
      {
        id: 'multisig-coordinator',
        title: 'What is the coordinator (Sparrow / Nunchuk)',
        icon: '🧩',
        content: 'The coordinator is the <strong>software that manages the multisig wallet</strong>. It combines public keys, generates addresses, and prepares transactions for signing. The coordinator <strong>does not have access to private keys</strong> — it only organizes.<br><br>• <strong>Sparrow Wallet</strong> (desktop): more control, more technical<br>• <strong>Nunchuk</strong> (mobile/desktop): friendlier interface, ideal for multisig beginners<br><br>Both are open-source and trustworthy.'
      },
      {
        id: 'multisig-desktop-required',
        title: 'Multisig requires desktop for setup',
        icon: '🖥️',
        content: 'Although Nunchuk works on mobile for daily use, the <strong>initial multisig setup</strong> is best done on a desktop computer. Reasons:<br><br>• You need to connect/pair multiple hardware wallets<br>• The larger screen helps verify xpubs and descriptors without errors<br>• The backup process is more complex (multiple seeds + wallet configuration)<br><br>After setup, day-to-day management can be done on mobile via Nunchuk.'
      }
    ]
  },

  // ── LEDGER WARNING ──────────────────────────────────────
  ledger_warning: {
    pt: [
      {
        id: 'ledger-recover',
        title: 'Aviso sobre Ledger Recover',
        icon: '⚠️',
        content: 'Em 2023, a Ledger lançou o recurso <strong>"Ledger Recover"</strong>, que permite exportar fragmentos criptografados da sua seed phrase para terceiros (Ledger, Coincover e EscrowTech) como serviço de recuperação.<br><br><strong>Por que isso preocupa:</strong><br>• Antes, acreditava-se que a seed nunca saía do secure element do dispositivo<br>• O Recover prova que o firmware <strong>pode</strong> extrair a seed — mesmo que você não ative o serviço<br>• Um firmware malicioso (ou uma ordem judicial) poderia, teoricamente, extrair sua seed<br><br><strong>Recomendação:</strong> Se você usa Ledger, <strong>nunca ative o Ledger Recover</strong>. Considere usar a Ledger apenas para custódia simples com valores menores, e prefira Coldcard ou Jade para valores maiores. Para multisig, a Ledger pode ser uma das chaves (a diversidade de fabricantes mitiga o risco).'
      }
    ],
    en: [
      {
        id: 'ledger-recover',
        title: 'Warning about Ledger Recover',
        icon: '⚠️',
        content: 'In 2023, Ledger launched <strong>"Ledger Recover"</strong>, a feature that allows exporting encrypted fragments of your seed phrase to third parties (Ledger, Coincover, and EscrowTech) as a recovery service.<br><br><strong>Why this is concerning:</strong><br>• Previously, it was believed the seed never left the device\'s secure element<br>• Recover proves the firmware <strong>can</strong> extract the seed — even if you don\'t activate the service<br>• A malicious firmware update (or court order) could, theoretically, extract your seed<br><br><strong>Recommendation:</strong> If you use Ledger, <strong>never activate Ledger Recover</strong>. Consider using Ledger only for simple custody with smaller amounts, and prefer Coldcard or Jade for larger amounts. For multisig, Ledger can be one of the keys (manufacturer diversity mitigates the risk).'
      }
    ]
  }
};

// ── Helper: get relevant practices for a tutorial path ────
function getBestPracticesForPath(level, walletId) {
  var sections = ['core', 'devices', 'backup', 'verification', 'opsec'];

  if (level === 'passphrase') sections.push('passphrase_info');
  if (level === 'multisig') sections.push('multisig_info');
  if (walletId === 'ledger') sections.push('ledger_warning');

  return sections;
}
