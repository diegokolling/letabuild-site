// ============================================================
// Tutorial Content — Part 3: Liana Timelock & Liana Decaying
// Methods 5 and 6 (to be merged into TUTORIAL_CONTENT)
// ============================================================

const TUTORIAL_PART3 = {

  // ── Method 5: Liana Timelock ─────────────────────────────────
  lianaTimelock: {
    pt: [
      // Step 1: Pré-requisitos
      {
        title: 'Pré-requisitos',
        content: '<p>Antes de começar, você precisa de:</p>' +
          '<ul>' +
          '<li><strong>Liana wallet</strong> instalada no seu computador (Windows, macOS ou Linux). Baixe em <strong>wizardsardine.com</strong></li>' +
          '<li><strong>2 hardware wallets</strong>: uma para você (chave primária) e outra para o herdeiro (chave de recuperação). Hardware wallets compatíveis: Ledger, Coldcard, Jade, BitBox02, Specter DIY</li>' +
          '<li>Um computador com conexão a internet para a configuração inicial</li>' +
          '</ul>' +
          '<p>A hardware wallet do herdeiro deve ser armazenada em um local seguro e acessível ao herdeiro após sua morte (cofre bancário, cofre residencial, envelope lacrado com advogado). O herdeiro não precisa saber a senha do dispositivo agora, apenas precisa ter acesso físico a ele quando necessário.</p>' +
          '<p>Se você ainda não tem uma segunda hardware wallet, compre de um fabricante diferente da sua (diversificação de risco). Por exemplo: se você usa Coldcard, compre uma Jade ou BitBox02 para o herdeiro.</p>'
      },
      // Step 2: O que e timelock no Bitcoin
      {
        title: 'O que é timelock no Bitcoin',
        content: '<p>O Bitcoin possui <strong>travas de tempo nativas no protocolo</strong>. Isso não é um recurso de terceiros ou de um aplicativo. É uma funcionalidade do próprio Bitcoin, existente desde o início.</p>' +
          '<p>A Liana utiliza especificamente o <strong>OP_CSV (CheckSequenceVerify)</strong>, que mede o tempo desde a última vez que uma moeda foi movida. Usando uma tecnologia chamada <strong>Miniscript</strong>, a Liana cria uma carteira com duas regras de gasto:</p>' +
          '<ul>' +
          '<li><strong>Sua chave (primária)</strong>: funciona SEMPRE, sem restrições. Você pode gastar seus bitcoins a qualquer momento.</li>' +
          '<li><strong>Chave do herdeiro (recuperação)</strong>: só funciona DEPOIS de X blocos de inatividade. Se você não mover seus bitcoins por, digamos, 6 meses, a chave do herdeiro se ativa automaticamente.</li>' +
          '</ul>' +
          '<p>Essa regra é aplicada pelo próprio protocolo Bitcoin. Não há intermediário, não há empresa, não há ponto de falha. Cada minerador e cada nó da rede valida essa regra.</p>' +
          '<p><strong>IMPORTANTE: A Liana NÃO trava seus bitcoins.</strong> Você pode gastar livremente a qualquer momento usando sua chave primária. O timelock apenas adiciona um SEGUNDO caminho de gasto que se ativa após um período de inatividade. Pense assim: sua porta da frente está sempre aberta para você. Após 6 meses sem você entrar, uma porta dos fundos se destrava para seu herdeiro.</p>',
        video: { url: 'https://www.youtube.com/watch?v=Y9zUOmqGDgw', label: 'Bitcoinheiros: Herança Bitcoin com Liana' }
      },
      // Step 3: Trade-offs
      {
        title: 'Trade-offs: Prós e Contras',
        content: '<div class="tradeoffs">' +
          '<div class="tradeoffs-pros">' +
          '<h4>\u2705 Pros</h4>' +
          '<ul>' +
          '<li><strong>Ativação automática:</strong> Ninguém precisa "acionar" a herança. A inatividade é o gatilho. Se você morrer, basta o herdeiro esperar o período do timelock.</li>' +
          '<li><strong>Separação limpa entre uso e herança:</strong> Você usa a carteira normalmente no dia a dia. O mecanismo de herança é invisível até ser necessário.</li>' +
          '<li><strong>Zero confiança em terceiros:</strong> Nenhuma empresa, advogado ou servico precisa ser confiavel. O protocolo Bitcoin aplica as regras.</li>' +
          '<li><strong>O herdeiro não precisa saber da sua morte:</strong> A inatividade sozinha é suficiente. Se você desaparecer, ficar incapacitado ou morrer, o fluxo é o mesmo.</li>' +
          '<li><strong>Privacidade:</strong> Nenhum terceiro sabe que você tem esse plano de herança. Tudo é on-chain é auto-soberano.</li>' +
          '</ul>' +
          '</div>' +
          '<div class="tradeoffs-cons">' +
          '<h4>\u274C Contras</h4>' +
          '<ul>' +
          '<li><strong>Refresh obrigatório:</strong> Você DEVE movimentar seus bitcoins (enviar para si mesmo) antes do timelock expirar, ou a chave de recuperação se ativa enquanto você está vivo. Esqueceu? O herdeiro pode gastar.</li>' +
          '<li><strong>Timelock máximo limitado:</strong> O OP_CSV permite no máximo ~65.535 blocos (~15 meses). Se você quer intervalos maiores, não e possível com esse método.</li>' +
          '<li><strong>Software mais novo:</strong> A Liana é menos testada em batalha do que carteiras como Sparrow ou Electrum. E de código aberto, mas tem menos anos de uso em produção.</li>' +
          '<li><strong>Desktop apenas:</strong> Não há versão mobile. Você precisa de um computador (existe a versão web LianaLite, mas é mais limitada).</li>' +
          '<li><strong>Dependência do herdeiro:</strong> O herdeiro precisará de: Liana instalada + descriptor da carteira + hardware wallet de recuperação. Se faltar qualquer um desses, ele não consegue acessar.</li>' +
          '<li><strong>Risco de esquecimento:</strong> Se você não fizer refresh e o timelock expirar, qualquer pessoa com a chave de recuperação pode mover seus bitcoins.</li>' +
          '</ul>' +
          '</div>' +
          '</div>',
        warning: 'O refresh é OBRIGATÓRIO. Se você esquecer de refrescar e o timelock expirar, qualquer pessoa com a chave de recuperação pode mover seus bitcoins. Configure lembretes no calendário. Isso não é opcional.'
      },
      // Step 4: Instale a Liana
      {
        title: 'Instale a Liana',
        content: '<p>Acesse <strong>wizardsardine.com</strong> e baixe a versão mais recente da Liana para seu sistema operacional (Windows, macOS ou Linux).</p>' +
          '<ul>' +
          '<li>Se possível, verifique a assinatura do download (o site fornece instruções de verificação GPG)</li>' +
          '<li>Instale normalmente seguindo o assistente do sistema operacional</li>' +
          '<li>Na primeira execução, a Liana oferece duas opções: <strong>"Create a new wallet"</strong> ou <strong>"Recover a wallet"</strong>. Escolha "Create a new wallet"</li>' +
          '<li>A Liana inclui o Bitcoin Core embutido para verificação completa dos blocos. Na primeira execução, pode levar algum tempo para sincronizar (a Liana mostrará o progresso)</li>' +
          '</ul>' +
          '<p>Se você prefere testar antes sem baixar nada, pode usar a versão web <strong>LianaLite</strong> (mais limitada, mas funcional para entender a interface).</p>',
        tip: 'A Liana é software de código aberto. Todo o código esta disponível no GitHub da Wizardsardine para auditoria. Se você tem conhecimento técnico, pode compilar a partir do código-fonte para máxima segurança.'
      },
      // Step 5: Configure a chave primária
      {
        title: 'Configure a chave primária',
        content: '<p>A chave primária é a SUA chave. Ela permite gastar bitcoins a qualquer momento, sem restrições.</p>' +
          '<ul>' +
          '<li>Conecte <strong>sua hardware wallet</strong> ao computador via USB</li>' +
          '<li>Na Liana, selecione o modelo da sua hardware wallet na lista de dispositivos suportados</li>' +
          '<li>A Liana pedirá para exportar a chave pública (xpub) do dispositivo. Confirme na tela da hardware wallet</li>' +
          '<li>Essa chave pública será usada para gerar os endereços da carteira. Sua hardware wallet continua armazenando a chave privada, que nunca sai do dispositivo</li>' +
          '<li>Após a importação, a Liana mostrará a chave como <strong>"Primary key"</strong> (chave primária)</li>' +
          '</ul>' +
          '<p>Com essa chave configurada, você pode gastar qualquer bitcoin na carteira a qualquer momento, sem esperar, sem timelock. Esse e o comportamento normal de uma carteira Bitcoin.</p>'
      },
      // Step 6: Configure a chave de recuperação
      {
        title: 'Configure a chave de recuperação',
        content: '<p>A chave de recuperação é a chave do <strong>herdeiro</strong>. Ela só funcionará após o período de timelock expirar.</p>' +
          '<ul>' +
          '<li>Conecte a <strong>hardware wallet do herdeiro</strong> ao computador</li>' +
          '<li>Repita o processo de importação de chave pública (xpub)</li>' +
          '<li>A Liana registrará essa chave como <strong>"Recovery key"</strong> (chave de recuperação)</li>' +
          '<li>Após a configuração, <strong>desconecte a hardware wallet do herdeiro e guarde-a em local seguro</strong></li>' +
          '</ul>' +
          '<p>Locais recomendados para guardar a hardware wallet do herdeiro:</p>' +
          '<ul>' +
          '<li>Cofre bancário (acessível ao herdeiro com procuração ou inventario)</li>' +
          '<li>Cofre residencial à prova de fogo</li>' +
          '<li>Com o advogado da família, em envelope lacrado</li>' +
          '<li>Dividido: dispositivo em um local, PIN em outro (segurança extra)</li>' +
          '</ul>' +
          '<p><strong>O herdeiro não precisa saber a senha da hardware wallet agora.</strong> Ele precisará do dispositivo + o descriptor da carteira + a Liana instalada quando chegar a hora.</p>',
        warning: 'A hardware wallet de recuperação precisa estar fisicamente acessível ao herdeiro. Se ela estiver trancada em um cofre cujo código só você sabe, o plano falha. Pense em como o herdeiro acessara o dispositivo.'
      },
      // Step 7: Escolha o período do timelock
      {
        title: 'Escolha o período do timelock',
        content: '<p>O timelock é medido em <strong>blocos Bitcoin</strong>, não em tempo do calendário. Em média, um bloco é minerado a cada ~10 minutos, mas isso varia.</p>' +
          '<p>Tabela de referência:</p>' +
          '<ul>' +
          '<li><strong>3 meses</strong> ≈ 13.140 blocos</li>' +
          '<li><strong>6 meses</strong> ≈ 26.280 blocos (recomendado como ponto de partida)</li>' +
          '<li><strong>9 meses</strong> ≈ 39.420 blocos</li>' +
          '<li><strong>12 meses</strong> ≈ 52.560 blocos</li>' +
          '<li><strong>15 meses</strong> ≈ 65.535 blocos (máximo possível com OP_CSV)</li>' +
          '</ul>' +
          '<p>Como escolher:</p>' +
          '<ul>' +
          '<li><strong>Timelock mais curto</strong> (3-6 meses): Mais refresh necessário, mas herdeiro acessa mais rápido. Bom se você interage com seus bitcoins regularmente.</li>' +
          '<li><strong>Timelock mais longo</strong> (9-15 meses): Menos refresh, mas herdeiro espera mais tempo. Bom se você e do tipo "comprar e esquecer".</li>' +
          '</ul>' +
          '<p>Recomendação: <strong>6 a 12 meses</strong> e o equilíbrio ideal para a maioria das pessoas. Curto o suficiente para o herdeiro não esperar demais, longo o suficiente para você não ter que refrescar toda semana.</p>',
        tip: 'Considere sua disciplina pessoal. Se você é esquecido, escolha um timelock mais longo para ter mais margem. Se você verifica seus bitcoins regularmente, um timelock mais curto é seguro.'
      },
      // Step 8: Crie a carteira na Liana
      {
        title: 'Crie a carteira na Liana',
        content: '<p>Com ambas as chaves configuradas e o timelock definido, é hora de criar a carteira:</p>' +
          '<ul>' +
          '<li>Na Liana, selecione o template <strong>"Simple Inheritance"</strong> (Herança Simples)</li>' +
          '<li>Confirme as configurações: chave primária (você), chave de recuperação (herdeiro), período do timelock</li>' +
          '<li>A Liana gerará a carteira usando Miniscript, criando endereços com as duas condições de gasto embutidas</li>' +
          '<li>A Liana exibirá o <strong>descriptor da carteira</strong>. Este descriptor é um texto que descreve a estrutura completa da carteira</li>' +
          '</ul>' +
          '<p><strong>CRÍTICO: Faça backup do descriptor.</strong></p>' +
          '<ul>' +
          '<li>Anote o descriptor em papel (ou grave em metal, como faria com uma seed)</li>' +
          '<li>Guarde pelo menos 2 cópias em locais separados</li>' +
          '<li>O herdeiro precisará desse descriptor para recuperar os fundos. Sem ele, mesmo com a hardware wallet, o herdeiro não consegue reconstruir a carteira</li>' +
          '<li>O descriptor NÃO permite gastar bitcoins sozinho. Ele apenas descreve a estrutura da carteira</li>' +
          '</ul>',
        warning: 'O descriptor é tão importante quanto a seed phrase. Sem o descriptor, seu herdeiro não poderá reconstruir a carteira, mesmo com a hardware wallet correta. Faça múltiplas cópias e guarde em locais seguros e separados.'
      },
      // Step 9: Teste no Signet primeiro
      {
        title: 'Teste no Signet primeiro',
        content: '<p>A Liana suporta o <strong>Bitcoin Signet</strong>, uma rede de testes que funciona exatamente como o Bitcoin real, mas com moedas sem valor. Você pode (e deve) testar todo o ciclo antes de usar dinheiro real.</p>' +
          '<p>Passo a passo para teste:</p>' +
          '<ol>' +
          '<li>Crie uma carteira na Liana usando a rede Signet (opção disponível na criação)</li>' +
          '<li>Use um timelock curto para teste (100-200 blocos, que leva algumas horas)</li>' +
          '<li>Receba bitcoins de teste (faucets Signet gratuitos disponíveis online)</li>' +
          '<li>Faça uma transação de refresh (envie para si mesmo)</li>' +
          '<li>Espere o timelock expirar</li>' +
          '<li>Tente gastar com a chave de recuperação (herdeiro). Deve funcionar após o timelock</li>' +
          '<li>Faça outro refresh e tente gastar com a chave de recuperação antes do timelock expirar. Não deve funcionar</li>' +
          '</ol>' +
          '<p>Se tudo funcionou como esperado, você validou o fluxo completo. Agora pode replicar na mainnet (rede real) com confiança.</p>',
        tip: 'O Signet permite testar todo o fluxo sem arriscar bitcoin real. Use timelocks curtos (100-200 blocos) para ver o ciclo completo em algumas horas. Isso é o equivalente a um "ensaio geral" antes do plano real.'
      },
      // Step 10: Entenda o refresh obrigatório
      {
        title: 'Entenda o refresh obrigatório',
        content: '<p>O refresh é o mecanismo que <strong>reseta o relógio do timelock</strong>. Sem ele, a chave de recuperação se ativa e qualquer pessoa com ela pode gastar seus bitcoins.</p>' +
          '<p><strong>O que o refresh faz:</strong></p>' +
          '<ul>' +
          '<li>Envia todos os seus bitcoins de volta para você mesmo, na mesma carteira Liana</li>' +
          '<li>Como as moedas foram "movidas", o OP_CSV reseta a contagem de blocos para zero</li>' +
          '<li>A chave de recuperação volta a ficar inativa pelo período completo do timelock</li>' +
          '</ul>' +
          '<p><strong>Quando fazer refresh:</strong></p>' +
          '<ul>' +
          '<li>A Liana mostra no dashboard o <strong>tempo restante</strong> até a ativação do path de recuperação</li>' +
          '<li>Faça refresh antes de 90% do timelock expirar. A Liana exibe alertas automáticos</li>' +
          '<li>Exemplo: se o timelock e de 6 meses, faça refresh a cada 4-5 meses no máximo</li>' +
          '</ul>' +
          '<p><strong>O que acontece se você NÃO fizer refresh:</strong></p>' +
          '<ul>' +
          '<li>O path de recuperação se ativa</li>' +
          '<li>Qualquer pessoa com a chave de recuperação + o descriptor pode gastar seus bitcoins</li>' +
          '<li>Isso é intencional para herança (herdeiro acessa após sua morte), mas é um risco se a chave de recuperação for comprometida</li>' +
          '</ul>' +
          '<p>O botão de refresh na interface da Liana faz todo o processo automaticamente. Basta clicar, confirmar na hardware wallet, e pronto.</p>',
        warning: 'Se você não fizer refresh e o timelock expirar, qualquer pessoa com a chave de recuperação pode gastar seus bitcoins. Isso é intencional para herança, mas é um risco se a chave de recuperação for comprometida. Trate o refresh como uma obrigação periódica inegociável.',
        video: { url: 'https://www.youtube.com/watch?v=rTId6hfiRm0', label: 'BTC Sessions: Liana Wallet Tutorial' }
      },
      // Step 11: Escreva a carta do herdeiro
      {
        title: 'Escreva a carta do herdeiro',
        content: '<p>A carta para o herdeiro no método Liana Timelock é específica. Ela precisa explicar o mecanismo de inatividade e detalhar os passos de recuperação.</p>' +
          '<p><strong>A carta deve conter:</strong></p>' +
          '<ol>' +
          '<li><strong>Explicação do mecanismo:</strong> "Após [X] meses da minha última atividade na carteira, sua chave será automaticamente ativada pelo protocolo Bitcoin. Você não precisa fazer nada além de esperar."</li>' +
          '<li><strong>O que o herdeiro precisa ter:</strong>' +
          '<ul>' +
          '<li>A Liana wallet instalada (baixar em wizardsardine.com)</li>' +
          '<li>O descriptor da carteira (localizado em [informar local])</li>' +
          '<li>A hardware wallet de recuperação (localizada em [informar local])</li>' +
          '<li>O PIN da hardware wallet: [informar ou indicar onde encontrar]</li>' +
          '</ul></li>' +
          '<li><strong>Passos de recuperação:</strong>' +
          '<ol>' +
          '<li>Baixe e instale a Liana em wizardsardine.com</li>' +
          '<li>Escolha "Recover a wallet" e importe o descriptor</li>' +
          '<li>Conecte a hardware wallet de recuperação</li>' +
          '<li>Aguarde a Liana sincronizar e mostrar o saldo</li>' +
          '<li>Na aba "Recovery", verifique se o status mostra "Available" (disponível). Se mostrar "Locked", águarde o tempo restante indicado</li>' +
          '<li>Quando disponível, crie uma transação de recuperação e envie os bitcoins para sua própria carteira</li>' +
          '</ol></li>' +
          '</ol>' +
          '<p><strong>Inclua também:</strong> contato de alguém técnico que possa ajudar o herdeiro (sem dar acesso as chaves), e uma explicação básica de o que e Bitcoin e por que você tem.</p>',
        tip: 'Inclua capturas de tela da Liana na carta, mostrando onde ficam os botoes e menus relevantes. Uma imagem vale mais que mil palavras para alguém que nunca usou o software.'
      },
      // Step 12: Configure lembretes de refresh
      {
        title: 'Configure lembretes de refresh',
        content: '<p>O refresh é o ponto de falha mais provavel deste método. Se você esquecer, o plano de herança se ativa prematuramente. Configure lembretes rigorosos:</p>' +
          '<p><strong>Calendário de lembretes sugerido (para timelock de 6 meses):</strong></p>' +
          '<ul>' +
          '<li><strong>Mensal:</strong> Lembrete para verificar o dashboard da Liana. Rápido, 2 minutos. Apenas confira o tempo restante.</li>' +
          '<li><strong>Aos 3 meses (50% do timelock):</strong> Lembrete para considerar fazer refresh. Não é urgente ainda, mas e bom ter em mente.</li>' +
          '<li><strong>Aos 4 meses (67%):</strong> Faça o refresh. Margem confortavel.</li>' +
          '<li><strong>Aos 5 meses (83%):</strong> URGENTE. Se ainda não fez, faça AGORA. Sem desculpas.</li>' +
          '</ul>' +
          '<p><strong>Ferramentas para lembretes:</strong></p>' +
          '<ul>' +
          '<li>Google Calendar / Apple Calendar com alertas repetitivos</li>' +
          '<li>Um lembrete físico (nota no cofre, na agenda)</li>' +
          '<li>Alarme no celular com recorrência</li>' +
          '</ul>' +
          '<p><strong>Cenário de incapacidade (mas não morte):</strong></p>' +
          '<p>Se você ficar hospitalizado, em coma, ou incapacitado por meses mas <strong>não morrer</strong>, o timelock ainda expirara e o herdeiro poderá gastar. Considere compartilhar a informação sobre o refresh com uma pessoa de extrema confiança (cônjuge, por exemplo) que possa fazer o refresh em seu nome caso você estejá vivo mas incapacitado.</p>' +
          '<p>Com essa configuração, seu plano de herança via Liana Timelock está completo. Seus bitcoins serão usáveis por você no dia a dia e automaticamente acessiveis ao herdeiro após um período de inatividade, sem depender de ninguém.</p>',
        warning: 'Se você viajá com frequência para lugares sem internet ou tem períodos longos de inatividade digital, considere um timelock mais longo ou designe alguém de confiança que possa fazer o refresh em seu nome.'
      }
    ],

    en: [
      // Step 1: Prerequisites
      {
        title: 'Prerequisites',
        content: '<p>Before starting, you will need:</p>' +
          '<ul>' +
          '<li><strong>Liana wallet</strong> installed on your computer (Windows, macOS, or Linux). Download from <strong>wizardsardine.com</strong></li>' +
          '<li><strong>2 hardware wallets</strong>: one for you (primary key) and one for the heir (recovery key). Compatible hardware wallets: Ledger, Coldcard, Jade, BitBox02, Specter DIY</li>' +
          '<li>A computer with internet access for the initial setup</li>' +
          '</ul>' +
          '<p>The heir\'s hardware wallet should be stored in a secure location accessible to the heir after your death (bank safe deposit box, home safe, sealed envelope with a lawyer). The heir does not need to know the device password now; they just need physical access to it when the time comes.</p>' +
          '<p>If you don\'t have a second hardware wallet yet, buy one from a different manufacturer than yours (risk diversification). For example: if you use a Coldcard, buy a Jade or BitBox02 for the heir.</p>'
      },
      // Step 2: What is timelock in Bitcoin
      {
        title: 'What is timelock in Bitcoin',
        content: '<p>Bitcoin has <strong>native time locks built into the protocol</strong>. This is not a third-party feature or an app feature. It is a capability of Bitcoin itself, present since the beginning.</p>' +
          '<p>Liana specifically uses <strong>OP_CSV (CheckSequenceVerify)</strong>, which measures time since a coin was last moved. Using a technology called <strong>Miniscript</strong>, Liana creates a wallet with two spending rules:</p>' +
          '<ul>' +
          '<li><strong>Your key (primary)</strong>: works ALWAYS, with no restrictions. You can spend your bitcoin at any time.</li>' +
          '<li><strong>Heir\'s key (recovery)</strong>: only works AFTER X blocks of inactivity. If you don\'t move your bitcoin for, say, 6 months, the heir\'s key activates automatically.</li>' +
          '</ul>' +
          '<p>This rule is enforced by the Bitcoin protocol itself. There is no intermediary, no company, no single point of failure. Every miner and every node on the network validates this rule.</p>' +
          '<p><strong>IMPORTANT: Liana does NOT lock your bitcoin.</strong> You can spend freely at any time using your primary key. The timelock only adds a SECOND spending path that activates after a period of inactivity. Think of it this way: your front door is always open for you. After 6 months without you entering, a back door unlocks for your heir.</p>',
        video: { url: 'https://www.youtube.com/watch?v=edATC_qC7NE', label: 'Sovereign Money: Liana Timelock' }
      },
      // Step 3: Trade-offs
      {
        title: 'Trade-offs: Pros and Cons',
        content: '<div class="tradeoffs">' +
          '<div class="tradeoffs-pros">' +
          '<h4>\u2705 Pros</h4>' +
          '<ul>' +
          '<li><strong>Automatic activation:</strong> Nobody needs to "trigger" the inheritance. Inactivity is the trigger. If you die, the heir just waits for the timelock period.</li>' +
          '<li><strong>Clean separation between use and inheritance:</strong> You use the wallet normally day-to-day. The inheritance mechanism is invisible until needed.</li>' +
          '<li><strong>Zero third-party trust:</strong> No company, lawyer, or service needs to be trusted. The Bitcoin protocol enforces the rules.</li>' +
          '<li><strong>Heir doesn\'t need to know about your death:</strong> Inactivity alone is sufficient. Whether you disappear, become incapacitated, or die, the flow is the same.</li>' +
          '<li><strong>Privacy:</strong> No third party knows you have this inheritance plan. Everything is on-chain and self-sovereign.</li>' +
          '</ul>' +
          '</div>' +
          '<div class="tradeoffs-cons">' +
          '<h4>\u274C Cons</h4>' +
          '<ul>' +
          '<li><strong>Mandatory refresh:</strong> You MUST move your bitcoin (send to yourself) before the timelock expires, or the recovery key activates while you\'re alive. Forgot? The heir can spend.</li>' +
          '<li><strong>Maximum timelock is limited:</strong> OP_CSV allows a maximum of ~65,535 blocks (~15 months). If you want longer intervals, this method won\'t work.</li>' +
          '<li><strong>Newer software:</strong> Liana is less battle-tested than wallets like Sparrow or Electrum. It\'s open-source, but has fewer years of production use.</li>' +
          '<li><strong>Desktop only:</strong> No mobile version. You need a computer (the LianaLite web version exists but is more limited).</li>' +
          '<li><strong>Heir dependency:</strong> The heir will need: Liana installed + wallet descriptor + recovery hardware wallet. If any of these is missing, they cannot access the funds.</li>' +
          '<li><strong>Forgetfulness risk:</strong> If you don\'t refresh and the timelock expires, anyone with the recovery key can move your bitcoin.</li>' +
          '</ul>' +
          '</div>' +
          '</div>',
        warning: 'The refresh is MANDATORY. If you forget to refresh and the timelock expires, anyone with the recovery key can move your bitcoin. Set calendar reminders. This is not optional.'
      },
      // Step 4: Install Liana
      {
        title: 'Install Liana',
        content: '<p>Go to <strong>wizardsardine.com</strong> and download the latest version of Liana for your operating system (Windows, macOS, or Linux).</p>' +
          '<ul>' +
          '<li>If possible, verify the download signature (the site provides GPG verification instructions)</li>' +
          '<li>Install normally following the OS installer</li>' +
          '<li>On first run, Liana offers two options: <strong>"Create a new wallet"</strong> or <strong>"Recover a wallet"</strong>. Choose "Create a new wallet"</li>' +
          '<li>Liana bundles Bitcoin Core for full block verification. On first run, it may take some time to sync (Liana will show progress)</li>' +
          '</ul>' +
          '<p>If you prefer to try before downloading, you can use the web version <strong>LianaLite</strong> (more limited, but functional for understanding the interface).</p>',
        tip: 'Liana is open-source software. All code is available on Wizardsardine\'s GitHub for auditing. If you have technical skills, you can compile from source for maximum security.'
      },
      // Step 5: Configure the primary key
      {
        title: 'Configure the primary key',
        content: '<p>The primary key is YOUR key. It allows spending bitcoin at any time, with no restrictions.</p>' +
          '<ul>' +
          '<li>Connect <strong>your hardware wallet</strong> to the computer via USB</li>' +
          '<li>In Liana, select your hardware wallet model from the list of supported devices</li>' +
          '<li>Liana will ask to export the public key (xpub) from the device. Confirm on the hardware wallet screen</li>' +
          '<li>This public key will be used to generate wallet addresses. Your hardware wallet continues to store the private key, which never leaves the device</li>' +
          '<li>After import, Liana will display the key as <strong>"Primary key"</strong></li>' +
          '</ul>' +
          '<p>With this key configured, you can spend any bitcoin in the wallet at any time, without waiting, without timelock. This is the normal behavior of a Bitcoin wallet.</p>'
      },
      // Step 6: Configure the recovery key
      {
        title: 'Configure the recovery key',
        content: '<p>The recovery key is the <strong>heir\'s</strong> key. It will only work after the timelock period expires.</p>' +
          '<ul>' +
          '<li>Connect the <strong>heir\'s hardware wallet</strong> to the computer</li>' +
          '<li>Repeat the public key (xpub) import process</li>' +
          '<li>Liana will register this key as <strong>"Recovery key"</strong></li>' +
          '<li>After setup, <strong>disconnect the heir\'s hardware wallet and store it in a secure location</strong></li>' +
          '</ul>' +
          '<p>Recommended locations for storing the heir\'s hardware wallet:</p>' +
          '<ul>' +
          '<li>Bank safe deposit box (accessible to heir with power of attorney or probate)</li>' +
          '<li>Fireproof home safe</li>' +
          '<li>With the family lawyer, in a sealed envelope</li>' +
          '<li>Split: device in one location, PIN in another (extra security)</li>' +
          '</ul>' +
          '<p><strong>The heir does not need to know the hardware wallet password now.</strong> They will need the device + wallet descriptor + Liana installed when the time comes.</p>',
        warning: 'The recovery hardware wallet must be physically accessible to the heir. If it\'s locked in a safe whose code only you know, the plan fails. Think about how the heir will access the device.'
      },
      // Step 7: Choose the timelock period
      {
        title: 'Choose the timelock period',
        content: '<p>The timelock is measured in <strong>Bitcoin blocks</strong>, not calendar time. On average, a block is mined every ~10 minutes, but this varies.</p>' +
          '<p>Reference table:</p>' +
          '<ul>' +
          '<li><strong>3 months</strong> ≈ 13,140 blocks</li>' +
          '<li><strong>6 months</strong> ≈ 26,280 blocks (recommended as starting point)</li>' +
          '<li><strong>9 months</strong> ≈ 39,420 blocks</li>' +
          '<li><strong>12 months</strong> ≈ 52,560 blocks</li>' +
          '<li><strong>15 months</strong> ≈ 65,535 blocks (maximum possible with OP_CSV)</li>' +
          '</ul>' +
          '<p>How to choose:</p>' +
          '<ul>' +
          '<li><strong>Shorter timelock</strong> (3-6 months): More refreshes needed, but heir gets access faster. Good if you interact with your bitcoin regularly.</li>' +
          '<li><strong>Longer timelock</strong> (9-15 months): Fewer refreshes, but heir waits longer. Good if you\'re the "buy and forget" type.</li>' +
          '</ul>' +
          '<p>Recommendation: <strong>6 to 12 months</strong> is the ideal balance for most people. Short enough so the heir doesn\'t wait too long, long enough so you don\'t have to refresh every week.</p>',
        tip: 'Consider your personal discipline. If you\'re forgetful, choose a longer timelock for more margin. If you check your bitcoin regularly, a shorter timelock is safe.'
      },
      // Step 8: Create the wallet in Liana
      {
        title: 'Create the wallet in Liana',
        content: '<p>With both keys configured and the timelock defined, it\'s time to create the wallet:</p>' +
          '<ul>' +
          '<li>In Liana, select the <strong>"Simple Inheritance"</strong> template</li>' +
          '<li>Confirm the settings: primary key (you), recovery key (heir), timelock period</li>' +
          '<li>Liana will generate the wallet using Miniscript, creating addresses with both spending conditions embedded</li>' +
          '<li>Liana will display the <strong>wallet descriptor</strong>. This descriptor is a text string that describes the complete wallet structure</li>' +
          '</ul>' +
          '<p><strong>CRITICAL: Back up the descriptor.</strong></p>' +
          '<ul>' +
          '<li>Write the descriptor on paper (or engrave in metal, as you would with a seed)</li>' +
          '<li>Keep at least 2 copies in separate locations</li>' +
          '<li>The heir will need this descriptor to recover the funds. Without it, even with the hardware wallet, the heir cannot reconstruct the wallet</li>' +
          '<li>The descriptor does NOT allow spending bitcoin by itself. It only describes the wallet structure</li>' +
          '</ul>',
        warning: 'The descriptor is as important as the seed phrase. Without the descriptor, your heir cannot reconstruct the wallet, even with the correct hardware wallet. Make multiple copies and store them in separate secure locations.'
      },
      // Step 9: Test on Signet first
      {
        title: 'Test on Signet first',
        content: '<p>Liana supports <strong>Bitcoin Signet</strong>, a test network that works exactly like real Bitcoin but with valueless coins. You can (and should) test the full lifecycle before using real money.</p>' +
          '<p>Step-by-step testing:</p>' +
          '<ol>' +
          '<li>Create a wallet in Liana using the Signet network (option available during creation)</li>' +
          '<li>Use a short timelock for testing (100-200 blocks, which takes a few hours)</li>' +
          '<li>Receive test bitcoin (free Signet faucets available online)</li>' +
          '<li>Perform a refresh transaction (send to yourself)</li>' +
          '<li>Wait for the timelock to expire</li>' +
          '<li>Try spending with the recovery key (heir). Should work after timelock</li>' +
          '<li>Do another refresh and try spending with recovery key before timelock expires. Should NOT work</li>' +
          '</ol>' +
          '<p>If everything worked as expected, you\'ve validated the complete flow. Now you can replicate on mainnet (real network) with confidence.</p>',
        tip: 'Signet lets you test the entire flow without risking real bitcoin. Use short timelocks (100-200 blocks) to see the complete cycle in a few hours. This is the equivalent of a "dress rehearsal" before the real plan.'
      },
      // Step 10: Understand the mandatory refresh
      {
        title: 'Understand the mandatory refresh',
        content: '<p>The refresh is the mechanism that <strong>resets the timelock clock</strong>. Without it, the recovery key activates and anyone holding it can spend your bitcoin.</p>' +
          '<p><strong>What refresh does:</strong></p>' +
          '<ul>' +
          '<li>Sends all your bitcoin back to yourself, in the same Liana wallet</li>' +
          '<li>Since the coins were "moved," OP_CSV resets the block count to zero</li>' +
          '<li>The recovery key becomes inactive again for the full timelock period</li>' +
          '</ul>' +
          '<p><strong>When to refresh:</strong></p>' +
          '<ul>' +
          '<li>Liana shows on the dashboard the <strong>time remaining</strong> until the recovery path activates</li>' +
          '<li>Refresh before 90% of the timelock expires. Liana displays automatic alerts</li>' +
          '<li>Example: if the timelock is 6 months, refresh every 4-5 months at most</li>' +
          '</ul>' +
          '<p><strong>What happens if you DON\'T refresh:</strong></p>' +
          '<ul>' +
          '<li>The recovery path activates</li>' +
          '<li>Anyone with the recovery key + descriptor can spend your bitcoin</li>' +
          '<li>This is intentional for inheritance (heir accesses after your death), but is a risk if the recovery key is compromised</li>' +
          '</ul>' +
          '<p>The refresh button in the Liana interface handles the entire process automatically. Just click, confirm on the hardware wallet, and done.</p>',
        warning: 'If you don\'t refresh and the timelock expires, anyone with the recovery key can spend your bitcoin. This is intentional for inheritance, but is a risk if the recovery key is compromised. Treat the refresh as a non-negotiable periodic obligation.',
        video: { url: 'https://www.youtube.com/watch?v=rTId6hfiRm0', label: 'BTC Sessions: Liana Wallet Tutorial' }
      },
      // Step 11: Write the heir letter
      {
        title: 'Write the heir letter',
        content: '<p>The heir letter for the Liana Timelock method is specific. It needs to explain the inactivity mechanism and detail the recovery steps.</p>' +
          '<p><strong>The letter should contain:</strong></p>' +
          '<ol>' +
          '<li><strong>Mechanism explanation:</strong> "After [X] months of my last wallet activity, your key will be automatically activated by the Bitcoin protocol. You don\'t need to do anything except wait."</li>' +
          '<li><strong>What the heir needs to have:</strong>' +
          '<ul>' +
          '<li>Liana wallet installed (download from wizardsardine.com)</li>' +
          '<li>The wallet descriptor (located at [specify location])</li>' +
          '<li>The recovery hardware wallet (located at [specify location])</li>' +
          '<li>The hardware wallet PIN: [specify or indicate where to find]</li>' +
          '</ul></li>' +
          '<li><strong>Recovery steps:</strong>' +
          '<ol>' +
          '<li>Download and install Liana from wizardsardine.com</li>' +
          '<li>Choose "Recover a wallet" and import the descriptor</li>' +
          '<li>Connect the recovery hardware wallet</li>' +
          '<li>Wait for Liana to sync and show the balance</li>' +
          '<li>In the "Recovery" tab, check if the status shows "Available." If it shows "Locked," wait for the remaining time indicated</li>' +
          '<li>When available, create a recovery transaction and send the bitcoin to your own wallet</li>' +
          '</ol></li>' +
          '</ol>' +
          '<p><strong>Also include:</strong> contact information for someone technical who can help the heir (without giving them key access), and a basic explanation of what Bitcoin is and why you hold it.</p>',
        tip: 'Include screenshots of Liana in the letter, showing where the relevant buttons and menus are. A picture is worth a thousand words for someone who has never used the software.'
      },
      // Step 12: Set up refresh reminders
      {
        title: 'Set up refresh reminders',
        content: '<p>The refresh is the most likely failure point of this method. If you forget, the inheritance plan activates prematurely. Set rigorous reminders:</p>' +
          '<p><strong>Suggested reminder schedule (for a 6-month timelock):</strong></p>' +
          '<ul>' +
          '<li><strong>Monthly:</strong> Reminder to check the Liana dashboard. Quick, 2 minutes. Just confirm the remaining time.</li>' +
          '<li><strong>At 3 months (50% of timelock):</strong> Reminder to consider refreshing. Not urgent yet, but good to keep in mind.</li>' +
          '<li><strong>At 4 months (67%):</strong> Do the refresh. Comfortable margin.</li>' +
          '<li><strong>At 5 months (83%):</strong> URGENT. If you haven\'t done it yet, do it NOW. No excuses.</li>' +
          '</ul>' +
          '<p><strong>Reminder tools:</strong></p>' +
          '<ul>' +
          '<li>Google Calendar / Apple Calendar with recurring alerts</li>' +
          '<li>A physical reminder (note in the safe, in your planner)</li>' +
          '<li>Phone alarm with recurrence</li>' +
          '</ul>' +
          '<p><strong>Incapacitation scenario (not death):</strong></p>' +
          '<p>If you\'re hospitalized, in a coma, or incapacitated for months but <strong>don\'t die</strong>, the timelock will still expire and the heir can spend. Consider sharing the refresh information with a highly trusted person (spouse, for example) who can perform the refresh on your behalf if you\'re alive but incapacitated.</p>' +
          '<p>With this setup, your Liana Timelock inheritance plan is complete. Your bitcoin will be usable by you day-to-day and automatically accessible to the heir after a period of inactivity, without depending on anyone.</p>',
        warning: 'If you travel frequently to places without internet or have long periods of digital inactivity, consider a longer timelock or designate a trusted person who can refresh on your behalf.'
      }
    ]
  },

  // ── Method 6: Liana Decaying Multisig ────────────────────────
  lianaDecaying: {
    pt: [
      // Step 1: Pré-requisitos
      {
        title: 'Pré-requisitos',
        content: '<p>Este é o método mais complexo de todos. Antes de começar, você precisa de:</p>' +
          '<ul>' +
          '<li><strong>Liana wallet</strong> instalada (wizardsardine.com)</li>' +
          '<li><strong>3 hardware wallets de fabricantes diferentes</strong> (diversificação de risco de supply chain). Exemplo: Coldcard + Jade + BitBox02, ou Ledger + Trezor + Specter DIY</li>' +
          '<li>Um computador com Windows, macOS ou Linux</li>' +
          '<li><strong>Entendimento avançado de multisig:</strong> você deve estar confortavel com o conceito de múltiplas chaves assinando uma transação</li>' +
          '</ul>' +
          '<p><strong>Por que fabricantes diferentes?</strong> Se um fabricante tiver uma vulnerabilidade (bug de firmware, supply chain attack), as outras chaves de fabricantes diferentes não serão afetadas. Isso e o princípio de diversificação aplicado a hardware.</p>' +
          '<p>Este método combina multisig (proteção contra roubo) com timelock (herança automática). É a solução mais completa, mas também a mais exigente em termos de setup e manutenção.</p>'
      },
      // Step 2: O que e decaying multisig
      {
        title: 'O que é decaying multisig',
        content: '<p>Um "decaying multisig" é uma carteira que <strong>comeca com segurança rigorosa e gradualmente relaxa as condições de gasto</strong> ao longo do tempo.</p>' +
          '<p>Imagine uma fechadura que exige duas chaves para abrir. Após 12 meses sem uso, ela aceita qualquer combinação de duas chaves de um conjunto de tres. A segurança "decai" (decay) com o tempo, permitindo recuperação.</p>' +
          '<p><strong>Exemplo prático:</strong></p>' +
          '<ul>' +
          '<li><strong>Dia a dia (path primário):</strong> Você + cônjuge devem assinar juntos (2-de-2 multisig). Nenhum dos dois sozinho pode gastar. Proteção contra roubo, sequestro, ou erro.</li>' +
          '<li><strong>Após 12 meses de inatividade (path de recuperação):</strong> Qualquer 2 de 3 chaves podem assinar (2-de-3). As tres chaves sao: você, cônjuge, herdeiro. Isso significa que cônjuge + herdeiro podem recuperar os fundos se você morrer.</li>' +
          '</ul>' +
          '<p><strong>Por que isso é poderoso?</strong></p>' +
          '<ul>' +
          '<li>Durante sua vida: máxima segurança. Dois adultos precisam concordar para gastar</li>' +
          '<li>Após sua morte: o cônjuge e o herdeiro podem juntos acessar os fundos, sem precisar da sua assinatura</li>' +
          '<li>Se o cônjuge também morrer: após outro período de inatividade, o herdeiro + qualquer outra chave pode acessar</li>' +
          '</ul>' +
          '<p>Tudo isso é aplicado pelo protocolo Bitcoin via Miniscript na Liana. Zero intermediários.</p>',
        video: { url: 'https://www.youtube.com/watch?v=Y9zUOmqGDgw', label: 'Bitcoinheiros: Herança Bitcoin com Liana' }
      },
      // Step 3: Trade-offs
      {
        title: 'Trade-offs: Prós e Contras',
        content: '<div class="tradeoffs">' +
          '<div class="tradeoffs-pros">' +
          '<h4>\u2705 Pros</h4>' +
          '<ul>' +
          '<li><strong>Melhor dos dois mundos:</strong> Segurança multisig durante sua vida + herança automática por timelock. Protege contra TANTO roubo quanto perda.</li>' +
          '<li><strong>Múltiplos caminhos de recuperação:</strong> Se uma chave for perdida, o timelock eventualmente oferece um caminho alternativo. Não é um ponto único de falha.</li>' +
          '<li><strong>Co-assinante como segurança extra:</strong> No dia a dia, um co-assinante (cônjuge/parceiro) previne gastos impulsivos, sequestro, ou roubo de uma chave.</li>' +
          '<li><strong>Flexibilidade de recuperação:</strong> Após o timelock, várias combinações de 2 chaves funcionam (você + herdeiro, cônjuge + herdeiro, etc.).</li>' +
          '<li><strong>Sem confiança em terceiros:</strong> Tudo no protocolo Bitcoin. Nenhuma empresa precisa existir para o plano funcionar.</li>' +
          '</ul>' +
          '</div>' +
          '<div class="tradeoffs-cons">' +
          '<h4>\u274C Contras</h4>' +
          '<ul>' +
          '<li><strong>Setup mais complexo:</strong> 3 hardware wallets, 3 pessoas envolvidas, configuração detalhada. Erro no setup pode ser catastrófico.</li>' +
          '<li><strong>3 hardware wallets de fabricantes diferentes:</strong> Custo significativo (R$ 1.500-4.000+ no total). Logística de compra e armazenamento.</li>' +
          '<li><strong>Coordenação de refresh com co-assinante:</strong> Não e só você que precisa estar disponível. O co-assinante também precisa para transações diarias.</li>' +
          '<li><strong>Dependência do software Liana:</strong> Se a Liana descontinuar o projeto, você precisará de outro software compatível com Miniscript para gerenciar a carteira.</li>' +
          '<li><strong>Menos documentação na comunidade:</strong> Por ser a abordagem mais nova, há menos tutoriais, relatos de uso, e suporte na comunidade.</li>' +
          '<li><strong>Co-assinante indisponível = espera:</strong> Se o co-assinante ficar indisponível (viagem, briga, morte), você precisa esperar o timelock expirar para usar um caminho alternativo.</li>' +
          '</ul>' +
          '</div>' +
          '</div>',
        warning: 'Este é o método mais complexo deste guia. Se você não está confortável com multisig, comece pelo Método 5 (Liana Timelock simples) e evolua para este depois de ganhar experiência.'
      },
      // Step 4: Instale a Liana
      {
        title: 'Instale a Liana',
        content: '<p>Acesse <strong>wizardsardine.com</strong> e baixe a versão mais recente da Liana para seu sistema operacional.</p>' +
          '<ul>' +
          '<li>Verifique a assinatura do download se possível (instruções GPG no site)</li>' +
          '<li>Instale normalmente</li>' +
          '<li>Na primeira execução, escolha <strong>"Create a new wallet"</strong></li>' +
          '<li>A Liana inclui Bitcoin Core embutido para verificação completa. A primeira sincronização pode levar um tempo</li>' +
          '</ul>' +
          '<p>Se você já tem a Liana instalada do Método 5, pode usar a mesma instalação. Você criará uma carteira nova com configuração diferente.</p>',
        tip: 'Se você já fez o Método 5 (Liana Timelock simples), a interface já é famíliar. A diferença aqui e a configuração de múltiplas chaves e paths de gasto.'
      },
      // Step 5: Planeje a estrutura de chaves
      {
        title: 'Planeje a estrutura de chaves',
        content: '<p>Antes de tocar em qualquer hardware wallet, planeje a estrutura de chaves no papel:</p>' +
          '<p><strong>Definição de papéis:</strong></p>' +
          '<ul>' +
          '<li><strong>Chave 1 (você)</strong>: Sua hardware wallet pessoal. Uso diario.</li>' +
          '<li><strong>Chave 2 (co-assinante)</strong>: Hardware wallet do cônjuge/parceiro. Co-assina transações do dia a dia.</li>' +
          '<li><strong>Chave 3 (recuperação)</strong>: Hardware wallet do herdeiro (ou guardada com advogado). Ativada pelo timelock.</li>' +
          '</ul>' +
          '<p><strong>Paths de gasto:</strong></p>' +
          '<ul>' +
          '<li><strong>Path primário (imediato):</strong> 2-de-2 (Chave 1 + Chave 2). Você e o co-assinante devem concordar. Máxima segurança no dia a dia.</li>' +
          '<li><strong>Path de recuperação (após timelock):</strong> 2-de-3 (qualquer 2 de Chave 1, Chave 2, Chave 3). Após X meses de inatividade, qualquer combinação de 2 chaves funciona.</li>' +
          '</ul>' +
          '<p><strong>O que isso significa na prática:</strong></p>' +
          '<ul>' +
          '<li>Você morreu: cônjuge (Chave 2) + herdeiro (Chave 3) = acesso aos fundos</li>' +
          '<li>Você e cônjuge morreram: se o herdeiro tiver acesso a qualquer outra chave + a dele, pode recuperar</li>' +
          '<li>Você está vivo mas co-assinante sumiu: após o timelock, você (Chave 1) + herdeiro (Chave 3) = acesso</li>' +
          '</ul>',
        tip: 'Desenhe um diagrama com as 3 chaves e os 2 paths antes de começar a configuração. Isso evita confusao durante o setup.'
      },
      // Step 6: Configure o path primário (2-de-2)
      {
        title: 'Configure o path primário (2-de-2)',
        content: '<p>O path primário é o que você usará no dia a dia. Requer ambas as assinaturas: a sua e a do co-assinante.</p>' +
          '<ul>' +
          '<li>Conecte <strong>sua hardware wallet (Chave 1)</strong> ao computador</li>' +
          '<li>Na Liana, importe a chave pública (xpub) do seu dispositivo</li>' +
          '<li>Desconecte sua hardware wallet</li>' +
          '<li>Conecte a <strong>hardware wallet do co-assinante (Chave 2)</strong></li>' +
          '<li>Importe a chave pública do dispositivo do co-assinante</li>' +
          '<li>Configure essas duas chaves como o <strong>path primário: 2-de-2</strong></li>' +
          '</ul>' +
          '<p>A partir de agora, qualquer transação desta carteira precisará de:</p>' +
          '<ol>' +
          '<li>Você inicia a transação e assina com sua hardware wallet</li>' +
          '<li>O co-assinante conecta a hardware wallet dele e assina também</li>' +
          '<li>Só após ambas as assinaturas a transação e válida</li>' +
          '</ol>' +
          '<p>Isso oferece proteção contra: roubo de uma única chave, sequestro (o atacante precisa de ambos), e gastos impulsivos (requer acordo mutuo).</p>',
        warning: 'O co-assinante precisa estar disponível para CADA transação que você fizer no dia a dia. Se o co-assinante viajar, ficar doente ou ficar indisponível, você não poderá gastar até o timelock expirar e o path de recuperação se ativar. Escolha alguém confiavel E disponível.'
      },
      // Step 7: Configure o path de recuperação (2-de-3 + timelock)
      {
        title: 'Configure o path de recuperação (2-de-3 + timelock)',
        content: '<p>O path de recuperação é o que ativara a herança. Ele adiciona a terceira chave (herdeiro) e define o timelock.</p>' +
          '<ul>' +
          '<li>Conecte a <strong>hardware wallet do herdeiro (Chave 3)</strong></li>' +
          '<li>Importe a chave pública (xpub) do dispositivo</li>' +
          '<li>Configure o path de recuperação: <strong>2-de-3</strong> (qualquer combinação de 2 das 3 chaves)</li>' +
          '<li>Defina o <strong>período do timelock</strong> (proximo passo detalha como escolher)</li>' +
          '</ul>' +
          '<p>Após o timelock expirar (inatividade), as seguintes combinações podem gastar:</p>' +
          '<ul>' +
          '<li>Chave 1 (você) + Chave 2 (co-assinante) — mesmo que o path primário</li>' +
          '<li>Chave 1 (você) + Chave 3 (herdeiro) — util se co-assinante sumiu</li>' +
          '<li><strong>Chave 2 (co-assinante) + Chave 3 (herdeiro)</strong> — o cenário de herança: você morreu, cônjuge + herdeiro recuperam</li>' +
          '</ul>' +
          '<p>Desconecte a hardware wallet do herdeiro e guarde-a em local seguro. O herdeiro só precisará dela quando o timelock expirar após sua morte.</p>'
      },
      // Step 8: Escolha o período do timelock
      {
        title: 'Escolha o período do timelock',
        content: '<p>As considerações sao as mesmas do Método 5, com uma adição importante: <strong>coordenação com o co-assinante</strong>.</p>' +
          '<p>Tabela de referência:</p>' +
          '<ul>' +
          '<li><strong>3 meses</strong> ≈ 13.140 blocos</li>' +
          '<li><strong>6 meses</strong> ≈ 26.280 blocos (recomendado)</li>' +
          '<li><strong>9 meses</strong> ≈ 39.420 blocos</li>' +
          '<li><strong>12 meses</strong> ≈ 52.560 blocos</li>' +
          '<li><strong>15 meses</strong> ≈ 65.535 blocos (máximo)</li>' +
          '</ul>' +
          '<p><strong>Consideração extra para decaying multisig:</strong></p>' +
          '<ul>' +
          '<li>O refresh aqui requer <strong>ambas as chaves do path primário</strong> (você + co-assinante). Não e só você que precisa lembrar.</li>' +
          '<li>Combine com o co-assinante um calendário fixo de refresh (ex: todo dia 1 de janeiro e 1 de julho)</li>' +
          '<li>Se o co-assinante não estiver disponível para o refresh, você precisará esperar o timelock expirar para usar o path de recuperação</li>' +
          '</ul>' +
          '<p>Recomendação: <strong>6 a 12 meses</strong>. Tempo suficiente para não ser um incômodo constante, mas curto o suficiente para que o herdeiro não espere anos.</p>',
        tip: 'Combine com o co-assinante um "dia do refresh" fixo (ex: aniversario de casamento, ano novo). Isso transforma uma obrigação técnica em algo fácil de lembrar.'
      },
      // Step 9: Crie a carteira na Liana
      {
        title: 'Crie a carteira na Liana',
        content: '<p>Com todas as chaves configuradas e o timelock definido, crie a carteira:</p>' +
          '<ul>' +
          '<li>Na Liana, selecione o template <strong>"Expanding Multisig"</strong> (ou configure manualmente os paths)</li>' +
          '<li>Confirme a configuração:' +
          '<ul>' +
          '<li>Path primário: 2-de-2 (Chave 1 + Chave 2)</li>' +
          '<li>Path de recuperação: 2-de-3 (Chave 1, Chave 2, Chave 3) após [X] blocos</li>' +
          '</ul></li>' +
          '<li>A Liana gerará a carteira usando Miniscript</li>' +
          '<li>Exporte e faça backup do <strong>descriptor da carteira</strong></li>' +
          '</ul>' +
          '<p><strong>Backup do descriptor (CRÍTICO):</strong></p>' +
          '<ul>' +
          '<li>O descriptor deste método é mais complexo que o do Método 5. Ele contem informações sobre os 3 participantes, o threshold, e o timelock</li>' +
          '<li>Faça pelo menos 3 cópias em locais separados: uma com você, uma com o co-assinante, uma em local neutro (cofre bancário)</li>' +
          '<li>Considere gravar em metal (placa de aço) para resistir a incêndio e água</li>' +
          '<li>Sem o descriptor, NINGUÉM consegue reconstruir a carteira, mesmo com todas as 3 hardware wallets</li>' +
          '</ul>',
        warning: 'O descriptor deste método é AINDA MAIS critico que no Método 5. Sem ele, 3 hardware wallets se tornam inúteis. Trate o descriptor com o mesmo nível de segurança das seed phrases.'
      },
      // Step 10: Teste no Signet
      {
        title: 'Teste no Signet',
        content: '<p>Teste o ciclo completo no Signet antes de usar bitcoin real. Com decaying multisig, ha mais cenários para válidar:</p>' +
          '<p><strong>Cenários de teste obrigatórios:</strong></p>' +
          '<ol>' +
          '<li><strong>Transação normal (path primário):</strong> Receba bitcoin de teste, gaste usando Chave 1 + Chave 2. Deve funcionar imediatamente.</li>' +
          '<li><strong>Tentativa de gasto com path de recuperação antes do timelock:</strong> Tente gastar com qualquer combinação de 2-de-3 antes do timelock expirar. NÃO deve funcionar.</li>' +
          '<li><strong>Refresh:</strong> Envie os bitcoins de volta para si mesmo (usando path primário). Verifique que o timelock resetou.</li>' +
          '<li><strong>Espere o timelock expirar:</strong> Não faça refresh e espere o período configurado.</li>' +
          '<li><strong>Recuperação com co-assinante + herdeiro:</strong> Após o timelock, gaste usando Chave 2 + Chave 3 (cenário de herança). Deve funcionar.</li>' +
          '<li><strong>Recuperação com você + herdeiro:</strong> Após o timelock, gaste usando Chave 1 + Chave 3 (cenário de co-assinante indisponível). Deve funcionar.</li>' +
          '</ol>' +
          '<p>Use timelocks curtos no Signet (100-200 blocos) para completar todos os testes em algumas horas.</p>',
        tip: 'Documente cada teste: o que fez, o que esperava, o que aconteceu. Se algum cenário não funcionar como esperado, identifique o problema antes de ir para o mainnet. Nunca pule essa etapa.'
      },
      // Step 11: Financie no mainnet
      {
        title: 'Financie no mainnet',
        content: '<p>Após todos os testes no Signet passarem, replique a mesma carteira no mainnet (rede real):</p>' +
          '<ol>' +
          '<li>Crie a carteira na Liana com as mesmas configurações, mas na rede <strong>mainnet</strong></li>' +
          '<li>Verifique que os paths e o timelock estão identicos ao testado</li>' +
          '<li>Envie uma <strong>quantia pequena</strong> primeiro (o equivalente a R$ 50-100)</li>' +
          '<li>Faça uma transação de teste com o path primário (Chave 1 + Chave 2) para confirmar que funciona</li>' +
          '<li>Se tudo funcionar, envie quantias maiores gradualmente</li>' +
          '</ol>' +
          '<p><strong>Não coloque todos os seus bitcoins de uma vez.</strong> Comece com pouco, valide, e va aumentando. A confiança no sistema se constrói com a prática.</p>' +
          '<p>Após financiar, o dashboard da Liana mostrará o saldo e o timer do timelock. Você usará a carteira normalmente no dia a dia, com a segurança do multisig, sabendo que a herança está configurada automaticamente em segundo plano.</p>',
        warning: 'Envie quantias pequenas primeiro e faça transações de teste. Não transfira todo o seu patrimônio em Bitcoin para uma carteira recém-configurada. Construa confiança gradualmente.'
      },
      // Step 12: Escreva a carta do herdeiro
      {
        title: 'Escreva a carta do herdeiro',
        content: '<p>A carta para o método decaying multisig precisa explicar DOIS caminhos de acesso e ser mais detalhada:</p>' +
          '<p><strong>Seção 1: Caminho normal (você + co-assinante)</strong></p>' +
          '<p>Explique que, no dia a dia, a carteira e usada por você e pelo co-assinante juntos (2-de-2). O herdeiro não participa dessas transações.</p>' +
          '<p><strong>Seção 2: Caminho de recuperação (após timelock)</strong></p>' +
          '<p>Explique: "Após [X] meses da minha última atividade na carteira, um segundo caminho de gasto se ativa. Nesse caminho, qualquer combinação de 2 das 3 chaves pode gastar. Você (herdeiro) pode se juntar ao co-assinante [nome] para recuperar os fundos."</p>' +
          '<p><strong>O que incluir na carta:</strong></p>' +
          '<ul>' +
          '<li>Nome e contato do co-assinante</li>' +
          '<li>Instrução para o herdeiro procurar o co-assinante após a morte</li>' +
          '<li>Localização da hardware wallet de recuperação (Chave 3)</li>' +
          '<li>Localização do descriptor da carteira</li>' +
          '<li>PIN da hardware wallet de recuperação</li>' +
          '<li>Passos de recuperação:' +
          '<ol>' +
          '<li>Baixar e instalar a Liana (wizardsardine.com)</li>' +
          '<li>Importar o descriptor da carteira</li>' +
          '<li>Aguardar o timelock expirar (verificar na aba Recovery)</li>' +
          '<li>Coordenar com o co-assinante: um inicia a transação, o outro assina</li>' +
          '<li>Enviar os bitcoins para uma carteira própria</li>' +
          '</ol></li>' +
          '</ul>',
        tip: 'Faça uma reunião com o co-assinante e explique o plano de herança completo. O co-assinante precisa entender seu papel e estar preparado para ajudar o herdeiro quando chegar a hora.'
      },
      // Step 13: Agenda de refresh e coordenação
      {
        title: 'Agenda de refresh e coordenação',
        content: '<p>O refresh no decaying multisig requer coordenação entre você e o co-assinante. Sem planejamento, este se torna o ponto de falha mais provavel.</p>' +
          '<p><strong>Quem faz o refresh?</strong></p>' +
          '<ul>' +
          '<li>Você inicia a transação de refresh na Liana</li>' +
          '<li>O co-assinante conecta a hardware wallet dele e co-assina</li>' +
          '<li>Ambos precisam estar disponíveis no mesmo momento (ou usam PSBTs, transações parcialmente assinadas, passadas por arquivo)</li>' +
          '</ul>' +
          '<p><strong>Calendário sugerido (timelock de 6 meses):</strong></p>' +
          '<ul>' +
          '<li><strong>Mensal:</strong> Verificação do dashboard da Liana por você</li>' +
          '<li><strong>A cada 4 meses:</strong> Sessão de refresh coordenada com co-assinante</li>' +
          '<li><strong>Aos 5 meses (83%):</strong> URGENTE se não fez refresh ainda</li>' +
          '</ul>' +
          '<p><strong>Cenários de contingência:</strong></p>' +
          '<ul>' +
          '<li><strong>Co-assinante indisponível por tempo prolongado:</strong> Após o timelock, você pode usar Chave 1 + Chave 3 (herdeiro) para mover fundos. Considere migrar para uma nova carteira com novo co-assinante.</li>' +
          '<li><strong>Você incapacitado (mas vivo):</strong> O co-assinante pode monitorar o dashboard. Após o timelock, co-assinante + herdeiro podem mover os fundos para segurança se necessário.</li>' +
          '<li><strong>Divorcio/ruptura com co-assinante:</strong> Faça refresh e crie uma nova carteira com novo co-assinante antes que o timelock expire. A segurança da carteira atual depende da confiança no co-assinante.</li>' +
          '</ul>' +
          '<p><strong>Discussao de sucessao com o co-assinante:</strong></p>' +
          '<p>Tenha uma conversa franca com o co-assinante sobre: o que acontece se você morrer, o que acontece se ele morrer, é o que acontece se ambos ficarem indisponíveis. Documente essas contingências na carta do herdeiro.</p>' +
          '<p>Com essa configuração, você tem o nível mais alto de segurança possível em auto-custódia Bitcoin: proteção multisig contra roubo no dia a dia e herança automática por timelock em caso de morte ou incapacidade. É complexo, mas para quem tem patrimônio significativo em Bitcoin, a tranquilidade justifica o esforço.</p>',
        warning: 'Se sua relação com o co-assinante mudar (divorcio, briga, distanciamento), migre seus fundos para uma nova carteira IMEDIATAMENTE. Um co-assinante hostil pode se recusar a assinar transações, forcando você a esperar o timelock expirar.'
      }
    ],

    en: [
      // Step 1: Prerequisites
      {
        title: 'Prerequisites',
        content: '<p>This is the most complex method of all. Before starting, you will need:</p>' +
          '<ul>' +
          '<li><strong>Liana wallet</strong> installed (wizardsardine.com)</li>' +
          '<li><strong>3 hardware wallets from different manufacturers</strong> (supply chain risk diversification). Example: Coldcard + Jade + BitBox02, or Ledger + Trezor + Specter DIY</li>' +
          '<li>A computer with Windows, macOS, or Linux</li>' +
          '<li><strong>Advanced understanding of multisig concepts:</strong> you should be comfortable with the idea of multiple keys signing a transaction</li>' +
          '</ul>' +
          '<p><strong>Why different manufacturers?</strong> If one manufacturer has a vulnerability (firmware bug, supply chain attack), the keys from other manufacturers won\'t be affected. This is the diversification principle applied to hardware.</p>' +
          '<p>This method combines multisig (theft protection) with timelock (automatic inheritance). It is the most complete solution, but also the most demanding in terms of setup and maintenance.</p>'
      },
      // Step 2: What is decaying multisig
      {
        title: 'What is decaying multisig',
        content: '<p>A "decaying multisig" is a wallet that <strong>starts with strict security and gradually relaxes the spending conditions</strong> over time.</p>' +
          '<p>Imagine a lock that requires two keys to open. After 12 months without use, it accepts any combination of two keys from a set of three. The security "decays" over time, allowing recovery.</p>' +
          '<p><strong>Practical example:</strong></p>' +
          '<ul>' +
          '<li><strong>Day-to-day (primary path):</strong> You + spouse must sign together (2-of-2 multisig). Neither can spend alone. Protection against theft, kidnapping, or error.</li>' +
          '<li><strong>After 12 months of inactivity (recovery path):</strong> Any 2 of 3 keys can sign (2-of-3). The three keys are: you, spouse, heir. This means spouse + heir can recover funds if you die.</li>' +
          '</ul>' +
          '<p><strong>Why is this powerful?</strong></p>' +
          '<ul>' +
          '<li>During your lifetime: maximum security. Two adults must agree to spend</li>' +
          '<li>After your death: the spouse and heir can together access the funds without needing your signature</li>' +
          '<li>If the spouse also dies: after another period of inactivity, the heir + any other key can access</li>' +
          '</ul>' +
          '<p>All of this is enforced by the Bitcoin protocol via Miniscript in Liana. Zero intermediaries.</p>',
        video: { url: 'https://www.youtube.com/watch?v=edATC_qC7NE', label: 'Sovereign Money: Liana Timelock' }
      },
      // Step 3: Trade-offs
      {
        title: 'Trade-offs: Pros and Cons',
        content: '<div class="tradeoffs">' +
          '<div class="tradeoffs-pros">' +
          '<h4>\u2705 Pros</h4>' +
          '<ul>' +
          '<li><strong>Best of both worlds:</strong> Multisig security during your lifetime + automatic inheritance via timelock. Protects against BOTH theft AND loss.</li>' +
          '<li><strong>Multiple recovery paths:</strong> If one key is lost, the timelock eventually provides an alternative path. No single point of failure.</li>' +
          '<li><strong>Co-signer as extra security:</strong> Day-to-day, a co-signer (spouse/partner) prevents impulsive spending, kidnapping, or single-key theft.</li>' +
          '<li><strong>Recovery flexibility:</strong> After the timelock, various 2-key combinations work (you + heir, spouse + heir, etc.).</li>' +
          '<li><strong>No third-party trust:</strong> Everything on the Bitcoin protocol. No company needs to exist for the plan to work.</li>' +
          '</ul>' +
          '</div>' +
          '<div class="tradeoffs-cons">' +
          '<h4>\u274C Cons</h4>' +
          '<ul>' +
          '<li><strong>Most complex setup:</strong> 3 hardware wallets, 3 people involved, detailed configuration. A setup error can be catastrophic.</li>' +
          '<li><strong>3 hardware wallets from different manufacturers:</strong> Significant cost ($300-800+ total). Purchasing and storage logistics.</li>' +
          '<li><strong>Refresh coordination with co-signer:</strong> It\'s not just you who needs to be available. The co-signer also needs to be present for daily transactions.</li>' +
          '<li><strong>Liana software dependency:</strong> If Liana discontinues the project, you\'ll need another Miniscript-compatible software to manage the wallet.</li>' +
          '<li><strong>Less community documentation:</strong> Being the newest approach, there are fewer tutorials, usage reports, and community support.</li>' +
          '<li><strong>Unavailable co-signer = waiting:</strong> If the co-signer becomes unavailable (travel, dispute, death), you must wait for the timelock to expire to use an alternative path.</li>' +
          '</ul>' +
          '</div>' +
          '</div>',
        warning: 'This is the most complex method in this guide. If you are not comfortable with multisig, start with Method 5 (simple Liana Timelock) and evolve to this one after gaining experience.'
      },
      // Step 4: Install Liana
      {
        title: 'Install Liana',
        content: '<p>Go to <strong>wizardsardine.com</strong> and download the latest version of Liana for your operating system.</p>' +
          '<ul>' +
          '<li>Verify the download signature if possible (GPG instructions on the site)</li>' +
          '<li>Install normally</li>' +
          '<li>On first run, choose <strong>"Create a new wallet"</strong></li>' +
          '<li>Liana bundles Bitcoin Core for full block verification. The first sync may take some time</li>' +
          '</ul>' +
          '<p>If you already have Liana installed from Method 5, you can use the same installation. You will create a new wallet with a different configuration.</p>',
        tip: 'If you already completed Method 5 (simple Liana Timelock), the interface is already familiar. The difference here is configuring multiple keys and spending paths.'
      },
      // Step 5: Plan the key structure
      {
        title: 'Plan the key structure',
        content: '<p>Before touching any hardware wallet, plan the key structure on paper:</p>' +
          '<p><strong>Role definitions:</strong></p>' +
          '<ul>' +
          '<li><strong>Key 1 (you)</strong>: Your personal hardware wallet. Daily use.</li>' +
          '<li><strong>Key 2 (co-signer)</strong>: Spouse/partner\'s hardware wallet. Co-signs daily transactions.</li>' +
          '<li><strong>Key 3 (recovery)</strong>: Heir\'s hardware wallet (or stored with lawyer). Activated by the timelock.</li>' +
          '</ul>' +
          '<p><strong>Spending paths:</strong></p>' +
          '<ul>' +
          '<li><strong>Primary path (immediate):</strong> 2-of-2 (Key 1 + Key 2). You and the co-signer must agree. Maximum daily security.</li>' +
          '<li><strong>Recovery path (after timelock):</strong> 2-of-3 (any 2 of Key 1, Key 2, Key 3). After X months of inactivity, any combination of 2 keys works.</li>' +
          '</ul>' +
          '<p><strong>What this means in practice:</strong></p>' +
          '<ul>' +
          '<li>You died: spouse (Key 2) + heir (Key 3) = fund access</li>' +
          '<li>You and spouse died: if the heir can access any other key + theirs, they can recover</li>' +
          '<li>You\'re alive but co-signer disappeared: after timelock, you (Key 1) + heir (Key 3) = access</li>' +
          '</ul>',
        tip: 'Draw a diagram with the 3 keys and 2 paths before starting the setup. This prevents confusion during configuration.'
      },
      // Step 6: Configure the primary path (2-of-2)
      {
        title: 'Configure the primary path (2-of-2)',
        content: '<p>The primary path is what you will use day-to-day. It requires both signatures: yours and the co-signer\'s.</p>' +
          '<ul>' +
          '<li>Connect <strong>your hardware wallet (Key 1)</strong> to the computer</li>' +
          '<li>In Liana, import the public key (xpub) from your device</li>' +
          '<li>Disconnect your hardware wallet</li>' +
          '<li>Connect the <strong>co-signer\'s hardware wallet (Key 2)</strong></li>' +
          '<li>Import the co-signer\'s public key</li>' +
          '<li>Configure these two keys as the <strong>primary path: 2-of-2</strong></li>' +
          '</ul>' +
          '<p>From now on, any transaction from this wallet will require:</p>' +
          '<ol>' +
          '<li>You initiate the transaction and sign with your hardware wallet</li>' +
          '<li>The co-signer connects their hardware wallet and signs too</li>' +
          '<li>Only after both signatures is the transaction valid</li>' +
          '</ol>' +
          '<p>This offers protection against: single-key theft, kidnapping (attacker needs both), and impulsive spending (requires mutual agreement).</p>',
        warning: 'The co-signer must be available for EVERY transaction you make day-to-day. If the co-signer travels, gets sick, or becomes unavailable, you cannot spend until the timelock expires and the recovery path activates. Choose someone trustworthy AND available.'
      },
      // Step 7: Configure the recovery path (2-of-3 + timelock)
      {
        title: 'Configure the recovery path (2-of-3 + timelock)',
        content: '<p>The recovery path is what enables the inheritance. It adds the third key (heir) and defines the timelock.</p>' +
          '<ul>' +
          '<li>Connect the <strong>heir\'s hardware wallet (Key 3)</strong></li>' +
          '<li>Import the public key (xpub) from the device</li>' +
          '<li>Configure the recovery path: <strong>2-of-3</strong> (any combination of 2 of the 3 keys)</li>' +
          '<li>Set the <strong>timelock period</strong> (next step details how to choose)</li>' +
          '</ul>' +
          '<p>After the timelock expires (inactivity), the following combinations can spend:</p>' +
          '<ul>' +
          '<li>Key 1 (you) + Key 2 (co-signer) — same as the primary path</li>' +
          '<li>Key 1 (you) + Key 3 (heir) — useful if the co-signer disappeared</li>' +
          '<li><strong>Key 2 (co-signer) + Key 3 (heir)</strong> — the inheritance scenario: you died, spouse + heir recover</li>' +
          '</ul>' +
          '<p>Disconnect the heir\'s hardware wallet and store it securely. The heir will only need it when the timelock expires after your death.</p>'
      },
      // Step 8: Choose the timelock period
      {
        title: 'Choose the timelock period',
        content: '<p>The considerations are the same as Method 5, with an important addition: <strong>coordination with the co-signer</strong>.</p>' +
          '<p>Reference table:</p>' +
          '<ul>' +
          '<li><strong>3 months</strong> ≈ 13,140 blocks</li>' +
          '<li><strong>6 months</strong> ≈ 26,280 blocks (recommended)</li>' +
          '<li><strong>9 months</strong> ≈ 39,420 blocks</li>' +
          '<li><strong>12 months</strong> ≈ 52,560 blocks</li>' +
          '<li><strong>15 months</strong> ≈ 65,535 blocks (maximum)</li>' +
          '</ul>' +
          '<p><strong>Extra consideration for decaying multisig:</strong></p>' +
          '<ul>' +
          '<li>The refresh here requires <strong>both primary path keys</strong> (you + co-signer). It\'s not just you who needs to remember.</li>' +
          '<li>Agree with the co-signer on a fixed refresh schedule (e.g., every January 1st and July 1st)</li>' +
          '<li>If the co-signer isn\'t available for the refresh, you\'ll need to wait for the timelock to expire to use the recovery path</li>' +
          '</ul>' +
          '<p>Recommendation: <strong>6 to 12 months</strong>. Enough time to not be a constant nuisance, but short enough that the heir doesn\'t wait years.</p>',
        tip: 'Agree with the co-signer on a "refresh day" (e.g., wedding anniversary, New Year\'s). This turns a technical obligation into something easy to remember.'
      },
      // Step 9: Create the wallet in Liana
      {
        title: 'Create the wallet in Liana',
        content: '<p>With all keys configured and the timelock defined, create the wallet:</p>' +
          '<ul>' +
          '<li>In Liana, select the <strong>"Expanding Multisig"</strong> template (or configure paths manually)</li>' +
          '<li>Confirm the configuration:' +
          '<ul>' +
          '<li>Primary path: 2-of-2 (Key 1 + Key 2)</li>' +
          '<li>Recovery path: 2-of-3 (Key 1, Key 2, Key 3) after [X] blocks</li>' +
          '</ul></li>' +
          '<li>Liana will generate the wallet using Miniscript</li>' +
          '<li>Export and back up the <strong>wallet descriptor</strong></li>' +
          '</ul>' +
          '<p><strong>Descriptor backup (CRITICAL):</strong></p>' +
          '<ul>' +
          '<li>The descriptor for this method is more complex than Method 5. It contains information about all 3 participants, the threshold, and the timelock</li>' +
          '<li>Make at least 3 copies in separate locations: one with you, one with the co-signer, one in a neutral location (bank safe)</li>' +
          '<li>Consider engraving on metal (steel plate) to survive fire and water</li>' +
          '<li>Without the descriptor, NOBODY can reconstruct the wallet, even with all 3 hardware wallets</li>' +
          '</ul>',
        warning: 'The descriptor for this method is EVEN MORE critical than in Method 5. Without it, 3 hardware wallets become useless. Treat the descriptor with the same level of security as seed phrases.'
      },
      // Step 10: Test on Signet
      {
        title: 'Test on Signet',
        content: '<p>Test the complete lifecycle on Signet before using real bitcoin. With decaying multisig, there are more scenarios to validate:</p>' +
          '<p><strong>Mandatory test scenarios:</strong></p>' +
          '<ol>' +
          '<li><strong>Normal transaction (primary path):</strong> Receive test bitcoin, spend using Key 1 + Key 2. Should work immediately.</li>' +
          '<li><strong>Attempted spend via recovery path before timelock:</strong> Try spending with any 2-of-3 combination before timelock expires. Should NOT work.</li>' +
          '<li><strong>Refresh:</strong> Send bitcoin back to yourself (using primary path). Verify the timelock reset.</li>' +
          '<li><strong>Wait for timelock to expire:</strong> Don\'t refresh and wait for the configured period.</li>' +
          '<li><strong>Recovery with co-signer + heir:</strong> After timelock, spend using Key 2 + Key 3 (inheritance scenario). Should work.</li>' +
          '<li><strong>Recovery with you + heir:</strong> After timelock, spend using Key 1 + Key 3 (co-signer unavailable scenario). Should work.</li>' +
          '</ol>' +
          '<p>Use short timelocks on Signet (100-200 blocks) to complete all tests in a few hours.</p>',
        tip: 'Document each test: what you did, what you expected, what happened. If any scenario doesn\'t work as expected, identify the problem before going to mainnet. Never skip this step.'
      },
      // Step 11: Fund on mainnet
      {
        title: 'Fund on mainnet',
        content: '<p>After all Signet tests pass, replicate the same wallet on mainnet (real network):</p>' +
          '<ol>' +
          '<li>Create the wallet in Liana with the same settings, but on the <strong>mainnet</strong> network</li>' +
          '<li>Verify that paths and timelock are identical to what was tested</li>' +
          '<li>Send a <strong>small amount</strong> first (equivalent to $10-20)</li>' +
          '<li>Do a test transaction with the primary path (Key 1 + Key 2) to confirm it works</li>' +
          '<li>If everything works, gradually send larger amounts</li>' +
          '</ol>' +
          '<p><strong>Don\'t put all your bitcoin at once.</strong> Start small, validate, and increase. Confidence in the system is built through practice.</p>' +
          '<p>After funding, the Liana dashboard will show the balance and the timelock timer. You\'ll use the wallet normally day-to-day, with multisig security, knowing that inheritance is automatically configured in the background.</p>',
        warning: 'Send small amounts first and do test transactions. Don\'t transfer your entire Bitcoin holdings to a newly configured wallet. Build confidence gradually.'
      },
      // Step 12: Write the heir letter
      {
        title: 'Write the heir letter',
        content: '<p>The letter for the decaying multisig method needs to explain BOTH access paths and be more detailed:</p>' +
          '<p><strong>Section 1: Normal path (you + co-signer)</strong></p>' +
          '<p>Explain that day-to-day, the wallet is used by you and the co-signer together (2-of-2). The heir does not participate in these transactions.</p>' +
          '<p><strong>Section 2: Recovery path (after timelock)</strong></p>' +
          '<p>Explain: "After [X] months of my last wallet activity, a second spending path activates. In this path, any combination of 2 of the 3 keys can spend. You (heir) can team up with the co-signer [name] to recover the funds."</p>' +
          '<p><strong>What to include in the letter:</strong></p>' +
          '<ul>' +
          '<li>Co-signer\'s name and contact information</li>' +
          '<li>Instruction for the heir to reach out to the co-signer after the death</li>' +
          '<li>Location of the recovery hardware wallet (Key 3)</li>' +
          '<li>Location of the wallet descriptor</li>' +
          '<li>Recovery hardware wallet PIN</li>' +
          '<li>Recovery steps:' +
          '<ol>' +
          '<li>Download and install Liana (wizardsardine.com)</li>' +
          '<li>Import the wallet descriptor</li>' +
          '<li>Wait for the timelock to expire (check in the Recovery tab)</li>' +
          '<li>Coordinate with the co-signer: one initiates the transaction, the other signs</li>' +
          '<li>Send the bitcoin to their own wallet</li>' +
          '</ol></li>' +
          '</ul>',
        tip: 'Have a meeting with the co-signer and explain the full inheritance plan. The co-signer needs to understand their role and be prepared to help the heir when the time comes.'
      },
      // Step 13: Refresh schedule and coordination
      {
        title: 'Refresh schedule and coordination',
        content: '<p>The refresh in decaying multisig requires coordination between you and the co-signer. Without planning, this becomes the most likely failure point.</p>' +
          '<p><strong>Who does the refresh?</strong></p>' +
          '<ul>' +
          '<li>You initiate the refresh transaction in Liana</li>' +
          '<li>The co-signer connects their hardware wallet and co-signs</li>' +
          '<li>Both need to be available at the same time (or use PSBTs, partially signed Bitcoin transactions, passed via file)</li>' +
          '</ul>' +
          '<p><strong>Suggested schedule (6-month timelock):</strong></p>' +
          '<ul>' +
          '<li><strong>Monthly:</strong> Dashboard check by you</li>' +
          '<li><strong>Every 4 months:</strong> Coordinated refresh session with co-signer</li>' +
          '<li><strong>At 5 months (83%):</strong> URGENT if refresh hasn\'t been done yet</li>' +
          '</ul>' +
          '<p><strong>Contingency scenarios:</strong></p>' +
          '<ul>' +
          '<li><strong>Co-signer unavailable for extended time:</strong> After the timelock, you can use Key 1 + Key 3 (heir) to move funds. Consider migrating to a new wallet with a new co-signer.</li>' +
          '<li><strong>You incapacitated (but alive):</strong> The co-signer can monitor the dashboard. After the timelock, co-signer + heir can move funds to safety if needed.</li>' +
          '<li><strong>Divorce/breakup with co-signer:</strong> Refresh and create a new wallet with a new co-signer before the timelock expires. The current wallet\'s security depends on trust in the co-signer.</li>' +
          '</ul>' +
          '<p><strong>Succession discussion with the co-signer:</strong></p>' +
          '<p>Have a frank conversation with the co-signer about: what happens if you die, what happens if they die, and what happens if both become unavailable. Document these contingencies in the heir letter.</p>' +
          '<p>With this setup, you have the highest level of security possible in Bitcoin self-custody: multisig protection against theft in daily life and automatic inheritance via timelock in case of death or incapacitation. It\'s complex, but for those with significant Bitcoin holdings, the peace of mind justifies the effort.</p>',
        warning: 'If your relationship with the co-signer changes (divorce, dispute, estrangement), migrate your funds to a new wallet IMMEDIATELY. A hostile co-signer can refuse to sign transactions, forcing you to wait for the timelock to expire.'
      }
    ]
  }
};
