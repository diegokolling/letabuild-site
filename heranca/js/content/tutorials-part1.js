// tutorials-part1.js — Tutorial content for methods: seedCarta and seedSplit
// This is a temporary file that will be merged later.

const TUTORIAL_PART1 = {

  // =====================================================
  // METHOD 1: Seed + Carta (seedCarta) — 8 steps
  // =====================================================
  seedCarta: {
    pt: [
      // Step 1: Pré-requisitos
      {
        title: 'Pré-requisitos',
        content: `
          <p>Este tutorial assume que você já completou o passo mais importante: <strong>você já tem uma seed (as 12 ou 24 palavras) anotada e já possui bitcoin sob autocustódia</strong>. Se ainda não fez isso, volte ao tutorial de autocustódia antes de continuar.</p>

          <p>A seed é a chave mestra que controla todo o seu bitcoin. Sem ela, ninguém pode acessar seus fundos, nem mesmo você. O problema é que essa mesma propriedade que protege você em vida se torna um risco após a sua morte: se ninguém souber que a seed existe ou como usá-la, <strong>seu bitcoin está perdido para sempre</strong>.</p>

          <p>Para este método, você vai precisar de:</p>
          <ul>
            <li><strong>Sua seed já anotada</strong> (as 12 ou 24 palavras que você criou ao configurar sua carteira)</li>
            <li><strong>Caneta</strong> (nunca lápis, que apaga com o tempo)</li>
            <li><strong>Papel de qualidade</strong> ou, de preferência, uma placa de metal para gravar a seed</li>
            <li><strong>Envelope lacrado</strong> para a carta</li>
            <li><strong>Opcional:</strong> cofre residencial resistente a fogo, cofre bancário, ou caixa de segurança</li>
          </ul>

          <p>Este é o método mais simples de herança Bitcoin. Não exige hardware especial, não tem custo, e funciona com qualquer carteira. A ideia é direta: você guarda a seed em um local seguro e escreve uma carta explicando ao herdeiro como recuperar o bitcoin.</p>

          <p>A simplicidade é tanto a maior força quanto a maior fraqueza deste método. Nos próximos passos, vamos montar o plano completo e discutir os riscos envolvidos.</p>
        `,
        tip: 'Se você ainda não tem uma seed anotada, pare aqui. A herança só funciona se a autocustódia já estiver configurada.'
      },

      // Step 2: Trade-offs
      {
        title: 'Trade-offs deste método',
        content: `
          <p>Antes de prosseguir, é fundamental entender <strong>o que você ganha e o que você arrisca</strong> com o método Seed + Carta. Todo plano de herança envolve compromissos entre simplicidade, segurança e robustez.</p>

          <div class="tradeoffs">
            <div class="tradeoffs-pros">
              <h4>✅ Prós</h4>
              <ul>
                <li><strong>Configuração mais simples possível.</strong> Não exige conhecimento técnico avançado nem equipamentos especiais.</li>
                <li><strong>Nenhum hardware necessário.</strong> Funciona com qualquer carteira de software (Blue Wallet, Sparrow, Electrum, etc.).</li>
                <li><strong>Custo zero.</strong> Tudo que você precisa é papel, caneta e um local seguro.</li>
                <li><strong>Compatível com qualquer carteira.</strong> A seed (BIP39) é um padrão universal. O herdeiro pode usar qualquer carteira compatível.</li>
                <li><strong>Fácil para o herdeiro entender.</strong> Uma carta bem escrita com instruções claras é acessível até para quem nunca ouviu falar de Bitcoin.</li>
              </ul>
            </div>
            <div class="tradeoffs-cons">
              <h4>❌ Contras</h4>
              <ul>
                <li><strong>Ponto único de falha.</strong> Se alguém encontrar a seed, pode roubar todo o seu bitcoin. Não há segunda camada de proteção.</li>
                <li><strong>Sem proteção contra roubo.</strong> Diferente de métodos com multisig ou passphrase, a seed sozinha dá acesso total aos fundos.</li>
                <li><strong>Exige confiança absoluta na segurança física.</strong> A segurança do seu bitcoin depende inteiramente de onde e como você guarda o papel.</li>
                <li><strong>Carta e seed devem ficar separadas, mas ambas precisam ser encontradas.</strong> Se o herdeiro encontra a seed mas não a carta (ou vice-versa), o plano pode falhar.</li>
                <li><strong>Sem redundância.</strong> Se a seed for destruída (incêndio, enchente), não há backup. O bitcoin está perdido.</li>
              </ul>
            </div>
          </div>

          <p>Este método é <strong>ideal para quem está começando</strong> a pensar em herança e quer uma solução funcional hoje. Para valores muito altos ou situações familiares complexas, considere evoluir para métodos mais robustos depois.</p>

          <p>O mais importante: <strong>um plano simples executado é infinitamente melhor que um plano perfeito que nunca saiu do papel</strong>. Vamos montar o seu agora.</p>
        `
      },

      // Step 3: Escreva a carta parte 1 — contexto
      {
        title: 'Escreva a carta — Parte 1: Contexto',
        content: `
          <p>A carta é o coração deste método. Ela será lida em um momento difícil: <strong>seu herdeiro provavelmente estará em luto, estressado, e possivelmente sem qualquer conhecimento sobre Bitcoin</strong>. A carta precisa ser escrita com empatia e clareza absoluta.</p>

          <p>Comece pela parte mais importante: <strong>o contexto</strong>. Antes de qualquer instrução técnica, o herdeiro precisa entender o que está acontecendo. Escreva como se estivesse explicando para alguém que nunca ouviu a palavra "Bitcoin".</p>

          <p>Inclua os seguintes pontos na ordem sugerida:</p>

          <ul>
            <li><strong>O que é Bitcoin:</strong> "Bitcoin é um dinheiro digital que existe na internet. Diferente do dinheiro no banco, ele não é controlado por nenhuma empresa ou governo. Ele funciona como ouro digital: é escasso e tem valor."</li>
            <li><strong>Por que você tem Bitcoin:</strong> Explique brevemente sua motivação. Isso dá contexto e legitimidade. Ex.: "Eu comprei Bitcoin como reserva de valor e proteção contra a inflação."</li>
            <li><strong>Como ele é diferente do banco:</strong> "O Bitcoin não está em nenhum banco. Não existe uma agência para ir, nem um gerente para ligar. O acesso é feito através de um conjunto de palavras secretas (chamado seed) que funciona como a chave de um cofre digital."</li>
            <li><strong>A importância da seed:</strong> "Quem tem essas palavras, tem acesso ao bitcoin. Por isso elas precisam ser mantidas em segredo absoluto."</li>
            <li><strong>Valor aproximado (opcional):</strong> Você pode mencionar o valor aproximado ou a quantidade de bitcoin, para que o herdeiro entenda a importância de seguir as instruções com cuidado.</li>
          </ul>

          <p>Use linguagem simples e direta. Evite jargões técnicos. Lembre-se: <strong>esta carta pode ser a única orientação que seu herdeiro terá</strong>. Não economize palavras na explicação.</p>

          <p>Termine esta parte com algo como: "Nas próximas páginas, vou te guiar passo a passo para acessar esse bitcoin. Leia tudo antes de fazer qualquer coisa. Não tenha pressa."</p>
        `,
        tip: 'Escreva a carta à mão se possível. Além de ser mais pessoal, evita que o conteúdo fique armazenado em um computador ou na nuvem.'
      },

      // Step 4: Escreva a carta parte 2 — instruções
      {
        title: 'Escreva a carta — Parte 2: Instruções de Recuperação',
        content: `
          <p>Agora vem a parte prática. O herdeiro precisa de <strong>instruções passo a passo, tão detalhadas que não haja espaço para dúvida</strong>. Pense como um manual de um eletrodoméstico: cada ação deve ser descrita individualmente.</p>

          <p>Inclua as seguintes instruções:</p>

          <p><strong>1. Baixar a carteira (wallet)</strong></p>
          <ul>
            <li>Para celular: <strong>Blue Wallet</strong> — disponível na App Store (iPhone) e Google Play (Android). Site oficial: <strong>bluewallet.io</strong></li>
            <li>Para computador: <strong>Sparrow Wallet</strong> — disponível em <strong>sparrowwallet.com</strong></li>
            <li>Escreva a URL exata na carta. O herdeiro não deve pesquisar no Google, pois pode encontrar sites falsos.</li>
          </ul>

          <p><strong>2. Restaurar a carteira usando a seed</strong></p>
          <ul>
            <li>"Abra o aplicativo e procure a opção 'Importar carteira' ou 'Restaurar carteira' ou 'Import Wallet'."</li>
            <li>"Digite as 24 palavras (ou 12) na ordem exata em que aparecem na folha que você encontrou."</li>
            <li>"Cada palavra deve ser digitada exatamente como está escrita, em letras minúsculas, sem acentos."</li>
            <li>"Após digitar todas as palavras, o aplicativo vai mostrar seu saldo em bitcoin."</li>
          </ul>

          <p><strong>3. O que esperar após a restauração</strong></p>
          <ul>
            <li>"O saldo pode demorar alguns minutos para aparecer enquanto o aplicativo sincroniza."</li>
            <li>"Você verá um valor em BTC (bitcoin). Para ver em reais, procure a opção de mudar moeda no aplicativo."</li>
            <li>"Não se assuste se o valor parecer diferente do que eu mencionei — o preço do bitcoin muda todos os dias."</li>
          </ul>

          <p><strong>4. O que fazer com o bitcoin</strong></p>
          <ul>
            <li>Se o herdeiro quiser vender: explique que ele deve criar conta em uma exchange confiável (ex: Mercado Bitcoin, Binance, Coinbase) e enviar o bitcoin para lá.</li>
            <li>Se quiser manter: explique que basta manter o aplicativo instalado e a seed guardada.</li>
            <li>Mencione o contato de confiança (próximo passo) que pode ajudar nessa decisão.</li>
          </ul>

          <p>Cada instrução deve estar <strong>numerada e em ordem sequencial</strong>. Se possível, inclua descrições de como a tela do aplicativo vai parecer em cada etapa ("você vai ver um botão azul escrito Import...").</p>
        `,
        warning: 'Nunca inclua a seed na mesma carta ou no mesmo local que as instruções. A carta explica O QUE FAZER. A seed está guardada EM OUTRO LUGAR. A carta deve indicar onde a seed está.'
      },

      // Step 5: Escreva a carta parte 3 — avisos de segurança
      {
        title: 'Escreva a carta — Parte 3: Avisos de Segurança',
        content: `
          <p>Esta é possivelmente <strong>a parte mais importante da carta</strong>. Seu herdeiro estará vulnerável: sem experiência com Bitcoin, possivelmente em luto, e exatamente no perfil que golpistas procuram. Você precisa blindá-lo com avisos claros e diretos.</p>

          <p>Inclua na carta, em destaque (pode sublinhar ou escrever em letras maiúsculas):</p>

          <p><strong>REGRA NÚMERO 1: Nunca, em hipótese alguma, compartilhe as 24 palavras com qualquer pessoa que diga ser do "suporte", "atendimento", "equipe técnica" ou qualquer coisa parecida.</strong></p>

          <p>Outras regras essenciais:</p>

          <ul>
            <li><strong>NUNCA digite as palavras em um site que alguém te mandou por email, mensagem, ou WhatsApp.</strong> Nenhum serviço legítimo vai pedir suas palavras online.</li>
            <li><strong>NUNCA tire foto das palavras.</strong> Fotos ficam na nuvem (iCloud, Google Fotos) e podem ser acessadas por hackers.</li>
            <li><strong>NUNCA salve as palavras em um arquivo no computador.</strong> Nem em Word, nem em bloco de notas, nem em email para si mesmo.</li>
            <li><strong>Se alguém pedir suas palavras, é GOLPE. Sem exceção.</strong> Não importa o quão convincente pareça, não importa se a pessoa diz que é do banco, da exchange, da carteira, da polícia.</li>
            <li><strong>NUNCA envie bitcoin para "dobrar" ou para "verificação".</strong> Transações Bitcoin são irreversíveis.</li>
          </ul>

          <p><strong>Contato de confiança:</strong></p>
          <p>Inclua na carta o nome e telefone de pelo menos uma pessoa que entende de Bitcoin e que pode ajudar seu herdeiro no processo. Essa pessoa deve ser alguém de sua confiança, mas que <strong>NÃO tenha acesso à seed</strong>.</p>

          <p>Escreva algo como: "Se você tiver qualquer dúvida, ligue para [Nome]. Ele/ela entende de Bitcoin e pode te ajudar. Mas lembre-se: NUNCA compartilhe as 24 palavras com ele/ela nem com ninguém. Ele/ela pode te guiar sem precisar ver as palavras."</p>

          <p>Essa camada de proteção social é fundamental. O herdeiro terá alguém para consultar sem precisar confiar cegamente em desconhecidos na internet.</p>
        `,
        warning: 'Golpes contra herdeiros de Bitcoin são cada vez mais comuns. Pessoas em luto são alvos fáceis. Os avisos de segurança não são exagero — são necessidade.'
      },

      // Step 6: Onde guardar a seed
      {
        title: 'Onde guardar a seed',
        content: `
          <p>A seed é o ativo mais importante deste plano. Se ela for perdida, roubada ou destruída, <strong>o bitcoin está perdido para sempre</strong>. A escolha do local de armazenamento é uma das decisões mais críticas que você vai tomar.</p>

          <p><strong>Opções de armazenamento físico, da mais simples à mais robusta:</strong></p>

          <p><strong>1. Papel em cofre residencial</strong></p>
          <ul>
            <li>Funcional e acessível, mas vulnerável a incêndio e enchente.</li>
            <li>Se optar por papel, use caneta de tinta permanente e papel de qualidade.</li>
            <li>Coloque em envelope lacrado dentro do cofre.</li>
          </ul>

          <p><strong>2. Placa de metal</strong></p>
          <ul>
            <li>Produtos como <strong>Cryptosteel Capsule</strong>, <strong>Billfodl</strong>, ou <strong>Stackbit</strong> permitem gravar as palavras em aço inoxidável.</li>
            <li>Resiste a fogo (até 1500°C), água e impacto.</li>
            <li>É o padrão-ouro para armazenamento de seeds. Custo entre R$300-800.</li>
            <li>Pode ser fabricado de forma caseira com arruelas de aço e um parafuso, se preferir economizar.</li>
          </ul>

          <p><strong>3. Cofre bancário (safe deposit box)</strong></p>
          <ul>
            <li>Boa proteção física, mas tem desvantagens: acesso limitado ao horário bancário, pode ser lacrado em caso de falecimento até inventário ser concluído, e o banco pode acessar o conteúdo.</li>
            <li>Use apenas como local adicional, nunca como único local.</li>
          </ul>

          <p><strong>Regras de ouro para guardar a seed:</strong></p>
          <ul>
            <li><strong>NUNCA armazene digitalmente.</strong> Nada de fotos, prints, arquivos de texto, emails, Google Drive, iCloud, notas do celular.</li>
            <li><strong>NUNCA guarde junto com a carta de instruções.</strong> Se um ladrão encontra os dois juntos, acabou.</li>
            <li>Se possível, tenha <strong>duas cópias da seed em locais diferentes</strong> (uma em papel no cofre, outra em metal em outro local).</li>
            <li>Certifique-se de que o herdeiro sabe onde a seed está (essa informação vai na carta).</li>
          </ul>

          <p>Lembre-se: a segurança do armazenamento é proporcional ao valor protegido. Para pequenas quantias, um cofre residencial pode ser suficiente. Para valores significativos, invista em uma placa de metal e pense em redundância geográfica.</p>
        `,
        tip: 'Placas de metal são o investimento mais importante que você pode fazer para proteger sua seed. O custo é mínimo comparado ao valor que protegem.'
      },

      // Step 7: Onde guardar a carta
      {
        title: 'Onde guardar a carta',
        content: `
          <p><strong>A carta NUNCA deve ficar no mesmo local que a seed.</strong> Esta é a regra mais importante deste método. Se a seed e as instruções estiverem juntas, qualquer pessoa que encontrar ambas pode roubar seu bitcoin.</p>

          <p>A lógica é simples: a seed sem a carta é um conjunto de palavras sem contexto. A carta sem a seed é um manual sem a chave. <strong>Separados, são inúteis para um ladrão. Juntos, são tudo que ele precisa.</strong></p>

          <p><strong>Opções para guardar a carta:</strong></p>

          <p><strong>1. Com um advogado de confiança</strong></p>
          <ul>
            <li>A opção mais profissional. O advogado pode incluir a carta (ou referência a ela) no testamento ou em documento apartado.</li>
            <li>O advogado não precisa saber o que é Bitcoin ou qual é a seed. Ele apenas guarda um envelope lacrado.</li>
            <li>Vantagem: o processo de inventário naturalmente direciona o herdeiro ao advogado.</li>
          </ul>

          <p><strong>2. Com uma pessoa de confiança</strong></p>
          <ul>
            <li>Um amigo próximo, parente, ou o contato de confiança mencionado na carta.</li>
            <li>Entregue em envelope lacrado com instruções: "Entregar para [nome do herdeiro] em caso de meu falecimento."</li>
            <li>Essa pessoa NÃO deve saber o que tem dentro do envelope.</li>
          </ul>

          <p><strong>3. Em um cofre diferente do cofre da seed</strong></p>
          <ul>
            <li>Se a seed está no cofre de casa, a carta pode estar em um cofre bancário, ou vice-versa.</li>
            <li>O importante é que sejam <strong>locais fisicamente separados</strong>.</li>
          </ul>

          <p><strong>O herdeiro precisa saber onde está a carta OU alguém precisa direcioná-lo.</strong> Existem duas formas de garantir isso:</p>
          <ul>
            <li>Dizer diretamente ao herdeiro: "Se algo acontecer comigo, procure o envelope que está com [pessoa/local]."</li>
            <li>Incluir essa informação no testamento ou em documentos que serão acessados naturalmente durante o inventário.</li>
          </ul>

          <p>Quanto menos elos na cadeia, menor a chance de falha. O cenário ideal tem no máximo 2 passos: herdeiro encontra a carta, carta diz onde está a seed.</p>
        `,
        warning: 'Se a seed e a carta estiverem juntas, você não tem um plano de herança — você tem uma carteira sem proteção que qualquer pessoa pode esvaziar.'
      },

      // Step 8: Testar o plano
      {
        title: 'Teste o plano',
        content: `
          <p>Este é o passo que a maioria das pessoas pula, e é exatamente por isso que a maioria dos planos de herança falha. <strong>Um plano não testado é apenas uma teoria.</strong></p>

          <p><strong>O teste consiste em pedir a alguém de confiança que siga as instruções da carta sem a sua ajuda.</strong></p>

          <p>Como fazer o teste:</p>

          <ol>
            <li><strong>Crie uma carteira de teste</strong> com uma seed nova e envie uma pequena quantia de bitcoin para ela (o equivalente a R$50-100 é suficiente).</li>
            <li><strong>Escreva a carta como se fosse a versão real</strong>, apontando para essa seed de teste.</li>
            <li><strong>Entregue a carta para a pessoa que fará o papel do herdeiro</strong> (pode ser o próprio herdeiro, cônjuge ou filho adulto).</li>
            <li><strong>Peça que ela siga as instruções do início ao fim.</strong> Não ajude. Não explique. Apenas observe.</li>
            <li><strong>Anote tudo que causou confusão ou dúvida.</strong> Onde a pessoa travou? O que não ficou claro? Que pergunta ela fez?</li>
            <li><strong>Reescreva a carta corrigindo os pontos fracos.</strong></li>
          </ol>

          <p>Pontos para observar durante o teste:</p>
          <ul>
            <li>A pessoa conseguiu encontrar e baixar a carteira correta?</li>
            <li>Ela entendeu como digitar as palavras da seed?</li>
            <li>Ela ficou confusa com algum termo técnico?</li>
            <li>Ela se sentiu segura durante o processo?</li>
            <li>Quanto tempo levou do início ao fim?</li>
          </ul>

          <p><strong>Após o teste, faça estas verificações finais:</strong></p>
          <ul>
            <li>A seed real está guardada em local seguro e separado da carta?</li>
            <li>A carta está guardada e acessível para o herdeiro?</li>
            <li>O contato de confiança sabe do seu papel?</li>
            <li>Você tem um lembrete anual para revisar o plano?</li>
          </ul>

          <p><strong>Crie um lembrete anual</strong> (no celular, agenda, ou onde preferir) para revisar o plano. Coisas mudam: carteiras lançam atualizações, você pode mudar de casa, custodiantes podem mudar de telefone. Uma revisão anual garante que o plano continua funcional.</p>
        `,
        warning: 'Se você pular este passo, está confiando que tudo vai funcionar perfeitamente em um momento de crise. Teste agora, enquanto pode corrigir.'
      }
    ],

    en: [
      // Step 1: Prerequisites
      {
        title: 'Prerequisites',
        content: `
          <p>This tutorial assumes you have already completed the most important step: <strong>you already have a seed (your 12 or 24 words) written down and bitcoin under self-custody</strong>. If you haven\\\'t done that yet, go back to the self-custody tutorial before continuing.</p>

          <p>The seed is the master key that controls all your bitcoin. Without it, nobody can access your funds, not even you. The problem is that this same property that protects you while alive becomes a risk after your death: if nobody knows the seed exists or how to use it, <strong>your bitcoin is lost forever</strong>.</p>

          <p>For this method, you will need:</p>
          <ul>
            <li><strong>Your seed already written down</strong> (the 12 or 24 words you created when setting up your wallet)</li>
            <li><strong>Pen</strong> (never pencil, which fades over time)</li>
            <li><strong>Quality paper</strong> or, preferably, a metal plate to engrave the seed</li>
            <li><strong>Sealed envelope</strong> for the letter</li>
            <li><strong>Optional:</strong> fireproof home safe, bank safe deposit box, or security box</li>
          </ul>

          <p>This is the simplest Bitcoin inheritance method. It requires no special hardware, has zero cost, and works with any wallet. The idea is straightforward: you store the seed in a secure location and write a letter explaining to your heir how to recover the bitcoin.</p>

          <p>Simplicity is both the greatest strength and the greatest weakness of this method. In the following steps, we\\\'ll build the complete plan and discuss the risks involved.</p>
        `,
        tip: 'If you don\\\'t have a seed written down yet, stop here. Inheritance only works if self-custody is already set up.'
      },

      // Step 2: Trade-offs
      {
        title: 'Trade-offs of this method',
        content: `
          <p>Before proceeding, it\\\'s essential to understand <strong>what you gain and what you risk</strong> with the Seed + Letter method. Every inheritance plan involves compromises between simplicity, security, and robustness.</p>

          <div class="tradeoffs">
            <div class="tradeoffs-pros">
              <h4>✅ Pros</h4>
              <ul>
                <li><strong>Simplest setup possible.</strong> No advanced technical knowledge or special equipment required.</li>
                <li><strong>No hardware required.</strong> Works with any software wallet (Blue Wallet, Sparrow, Electrum, etc.).</li>
                <li><strong>Zero cost.</strong> All you need is paper, pen, and a secure location.</li>
                <li><strong>Compatible with any wallet.</strong> The seed (BIP39) is a universal standard. The heir can use any compatible wallet.</li>
                <li><strong>Easy for the heir to understand.</strong> A well-written letter with clear instructions is accessible even to someone who has never heard of Bitcoin.</li>
              </ul>
            </div>
            <div class="tradeoffs-cons">
              <h4>❌ Cons</h4>
              <ul>
                <li><strong>Single point of failure.</strong> If someone finds the seed, they can steal all your bitcoin. There is no second layer of protection.</li>
                <li><strong>No theft protection.</strong> Unlike methods with multisig or passphrase, the seed alone gives full access to funds.</li>
                <li><strong>Requires absolute trust in physical security.</strong> Your bitcoin\\\'s safety depends entirely on where and how you store the paper.</li>
                <li><strong>Letter and seed must be separate, but both must be found.</strong> If the heir finds the seed but not the letter (or vice versa), the plan may fail.</li>
                <li><strong>No redundancy.</strong> If the seed is destroyed (fire, flood), there is no backup. The bitcoin is lost.</li>
              </ul>
            </div>
          </div>

          <p>This method is <strong>ideal for those just starting</strong> to think about inheritance and wanting a functional solution today. For very high values or complex family situations, consider evolving to more robust methods later.</p>

          <p>Most importantly: <strong>a simple plan that\\\'s executed is infinitely better than a perfect plan that never left the drawing board</strong>. Let\\\'s build yours now.</p>
        `
      },

      // Step 3: Write the letter part 1 — context
      {
        title: 'Write the letter — Part 1: Context',
        content: `
          <p>The letter is the heart of this method. It will be read at a difficult time: <strong>your heir will likely be grieving, stressed, and possibly with zero knowledge about Bitcoin</strong>. The letter needs to be written with empathy and absolute clarity.</p>

          <p>Start with the most important part: <strong>context</strong>. Before any technical instruction, the heir needs to understand what\\\'s happening. Write as if explaining to someone who has never heard the word "Bitcoin".</p>

          <p>Include the following points in the suggested order:</p>

          <ul>
            <li><strong>What Bitcoin is:</strong> "Bitcoin is a digital money that exists on the internet. Unlike bank money, it is not controlled by any company or government. It works like digital gold: it\\\'s scarce and has value."</li>
            <li><strong>Why you have Bitcoin:</strong> Briefly explain your motivation. This provides context and legitimacy. E.g.: "I bought Bitcoin as a store of value and protection against inflation."</li>
            <li><strong>How it differs from banks:</strong> "Bitcoin is not held in any bank. There\\\'s no branch to visit, no manager to call. Access is done through a set of secret words (called a seed) that works like a key to a digital vault."</li>
            <li><strong>The importance of the seed:</strong> "Whoever has these words has access to the bitcoin. That\\\'s why they must be kept in absolute secrecy."</li>
            <li><strong>Approximate value (optional):</strong> You may mention the approximate value or amount of bitcoin so the heir understands the importance of following instructions carefully.</li>
          </ul>

          <p>Use simple, direct language. Avoid technical jargon. Remember: <strong>this letter may be the only guidance your heir will have</strong>. Don\\\'t economize on words when explaining.</p>

          <p>End this part with something like: "In the following pages, I\\\'ll guide you step by step to access this bitcoin. Read everything before doing anything. Take your time."</p>
        `,
        tip: 'Write the letter by hand if possible. Besides being more personal, it avoids having the content stored on a computer or in the cloud.'
      },

      // Step 4: Write the letter part 2 — instructions
      {
        title: 'Write the letter — Part 2: Recovery Instructions',
        content: `
          <p>Now comes the practical part. The heir needs <strong>step-by-step instructions so detailed there\\\'s no room for doubt</strong>. Think like an appliance manual: each action should be described individually.</p>

          <p>Include the following instructions:</p>

          <p><strong>1. Download the wallet</strong></p>
          <ul>
            <li>For mobile: <strong>Blue Wallet</strong> — available on the App Store (iPhone) and Google Play (Android). Official website: <strong>bluewallet.io</strong></li>
            <li>For desktop: <strong>Sparrow Wallet</strong> — available at <strong>sparrowwallet.com</strong></li>
            <li>Write the exact URL in the letter. The heir should not search on Google, as they may find fake sites.</li>
          </ul>

          <p><strong>2. Restore the wallet using the seed</strong></p>
          <ul>
            <li>"Open the app and look for the option \\\'Import Wallet\\\' or \\\'Restore Wallet\\\'."</li>
            <li>"Enter the 24 words (or 12) in the exact order they appear on the sheet you found."</li>
            <li>"Each word must be typed exactly as written, in lowercase letters, without accents."</li>
            <li>"After entering all the words, the app will show your bitcoin balance."</li>
          </ul>

          <p><strong>3. What to expect after restoration</strong></p>
          <ul>
            <li>"The balance may take a few minutes to appear while the app syncs."</li>
            <li>"You\\\'ll see a value in BTC (bitcoin). To see it in your local currency, look for the currency change option in the app."</li>
            <li>"Don\\\'t be alarmed if the value seems different from what I mentioned — bitcoin\\\'s price changes every day."</li>
          </ul>

          <p><strong>4. What to do with the bitcoin</strong></p>
          <ul>
            <li>If the heir wants to sell: explain they should create an account at a trusted exchange (e.g., Coinbase, Kraken, River) and send the bitcoin there.</li>
            <li>If they want to hold: explain they just need to keep the app installed and the seed stored safely.</li>
            <li>Mention the trusted contact (next step) who can help with this decision.</li>
          </ul>

          <p>Each instruction should be <strong>numbered and in sequential order</strong>. If possible, include descriptions of what the app screen will look like at each step ("you\\\'ll see a blue button that says Import...").</p>
        `,
        warning: 'Never include the seed in the same letter or the same location as the instructions. The letter explains WHAT TO DO. The seed is stored SOMEWHERE ELSE. The letter should indicate where the seed is.'
      },

      // Step 5: Write the letter part 3 — security warnings
      {
        title: 'Write the letter — Part 3: Security Warnings',
        content: `
          <p>This is possibly <strong>the most important part of the letter</strong>. Your heir will be vulnerable: no experience with Bitcoin, possibly grieving, and exactly the profile that scammers target. You need to shield them with clear and direct warnings.</p>

          <p>Include in the letter, highlighted (you can underline or write in capital letters):</p>

          <p><strong>RULE NUMBER 1: Never, under any circumstances, share the 24 words with anyone who claims to be from "support", "customer service", "technical team", or anything similar.</strong></p>

          <p>Other essential rules:</p>

          <ul>
            <li><strong>NEVER enter the words on a website someone sent you via email, message, or text.</strong> No legitimate service will ask for your words online.</li>
            <li><strong>NEVER photograph the words.</strong> Photos end up in the cloud (iCloud, Google Photos) and can be accessed by hackers.</li>
            <li><strong>NEVER save the words in a file on the computer.</strong> Not in Word, not in Notepad, not in an email to yourself.</li>
            <li><strong>If someone asks for your words, it\\\'s a SCAM. No exceptions.</strong> No matter how convincing it seems, no matter if the person says they\\\'re from the bank, the exchange, the wallet, or the police.</li>
            <li><strong>NEVER send bitcoin to "double it" or for "verification".</strong> Bitcoin transactions are irreversible.</li>
          </ul>

          <p><strong>Trusted contact:</strong></p>
          <p>Include in the letter the name and phone number of at least one person who understands Bitcoin and can help your heir through the process. This person should be someone you trust, but who <strong>does NOT have access to the seed</strong>.</p>

          <p>Write something like: "If you have any questions, call [Name]. They understand Bitcoin and can help you. But remember: NEVER share the 24 words with them or anyone else. They can guide you without needing to see the words."</p>

          <p>This layer of social protection is fundamental. The heir will have someone to consult without blindly trusting strangers on the internet.</p>
        `,
        warning: 'Scams targeting Bitcoin heirs are increasingly common. People in mourning are easy targets. The security warnings are not overkill — they are a necessity.'
      },

      // Step 6: Where to store the seed
      {
        title: 'Where to store the seed',
        content: `
          <p>The seed is the most important asset in this plan. If it\\\'s lost, stolen, or destroyed, <strong>the bitcoin is lost forever</strong>. Choosing the storage location is one of the most critical decisions you\\\'ll make.</p>

          <p><strong>Physical storage options, from simplest to most robust:</strong></p>

          <p><strong>1. Paper in a home safe</strong></p>
          <ul>
            <li>Functional and accessible, but vulnerable to fire and flood.</li>
            <li>If you choose paper, use permanent ink pen and quality paper.</li>
            <li>Place in a sealed envelope inside the safe.</li>
          </ul>

          <p><strong>2. Metal plate</strong></p>
          <ul>
            <li>Products like <strong>Cryptosteel Capsule</strong>, <strong>Billfodl</strong>, or <strong>Stackbit</strong> allow you to engrave the words in stainless steel.</li>
            <li>Resistant to fire (up to 1500°C), water, and impact.</li>
            <li>The gold standard for seed storage. Cost ranges from $50-150 USD.</li>
            <li>Can be DIY-made with steel washers and a bolt, if you prefer to save money.</li>
          </ul>

          <p><strong>3. Bank safe deposit box</strong></p>
          <ul>
            <li>Good physical protection, but has drawbacks: access limited to banking hours, may be sealed upon death until probate is completed, and the bank could access the contents.</li>
            <li>Use only as an additional location, never as the only one.</li>
          </ul>

          <p><strong>Golden rules for storing the seed:</strong></p>
          <ul>
            <li><strong>NEVER store digitally.</strong> No photos, screenshots, text files, emails, Google Drive, iCloud, phone notes.</li>
            <li><strong>NEVER store together with the instruction letter.</strong> If a thief finds both together, it\\\'s game over.</li>
            <li>If possible, have <strong>two copies of the seed in different locations</strong> (one on paper in the safe, another on metal in another location).</li>
            <li>Make sure the heir knows where the seed is (this information goes in the letter).</li>
          </ul>

          <p>Remember: storage security should be proportional to the value being protected. For small amounts, a home safe may be sufficient. For significant values, invest in a metal plate and think about geographic redundancy.</p>
        `,
        tip: 'Metal plates are the most important investment you can make to protect your seed. The cost is minimal compared to the value they protect.'
      },

      // Step 7: Where to store the letter
      {
        title: 'Where to store the letter',
        content: `
          <p><strong>The letter must NEVER be in the same location as the seed.</strong> This is the most important rule of this method. If the seed and instructions are together, anyone who finds both can steal your bitcoin.</p>

          <p>The logic is simple: the seed without the letter is a set of words without context. The letter without the seed is a manual without the key. <strong>Separate, they are useless to a thief. Together, they are everything they need.</strong></p>

          <p><strong>Options for storing the letter:</strong></p>

          <p><strong>1. With a trusted lawyer</strong></p>
          <ul>
            <li>The most professional option. The lawyer can include the letter (or a reference to it) in the will or in a separate document.</li>
            <li>The lawyer doesn\\\'t need to know what Bitcoin is or what the seed is. They just hold a sealed envelope.</li>
            <li>Advantage: the probate process naturally directs the heir to the lawyer.</li>
          </ul>

          <p><strong>2. With a trusted person</strong></p>
          <ul>
            <li>A close friend, relative, or the trusted contact mentioned in the letter.</li>
            <li>Hand over in a sealed envelope with instructions: "Deliver to [heir\\\'s name] in case of my death."</li>
            <li>This person should NOT know what\\\'s inside the envelope.</li>
          </ul>

          <p><strong>3. In a different safe from the seed\\\'s safe</strong></p>
          <ul>
            <li>If the seed is in the home safe, the letter can be in a bank deposit box, or vice versa.</li>
            <li>The key point is that they must be in <strong>physically separate locations</strong>.</li>
          </ul>

          <p><strong>The heir needs to know where the letter is, OR someone needs to direct them to it.</strong> There are two ways to ensure this:</p>
          <ul>
            <li>Tell the heir directly: "If something happens to me, look for the envelope that\\\'s with [person/location]."</li>
            <li>Include this information in the will or in documents that will be naturally accessed during probate.</li>
          </ul>

          <p>The fewer links in the chain, the lower the chance of failure. The ideal scenario has at most 2 steps: heir finds the letter, letter says where the seed is.</p>
        `,
        warning: 'If the seed and the letter are together, you don\\\'t have an inheritance plan — you have an unprotected wallet that anyone can empty.'
      },

      // Step 8: Test the plan
      {
        title: 'Test the plan',
        content: `
          <p>This is the step most people skip, and that\\\'s exactly why most inheritance plans fail. <strong>An untested plan is just a theory.</strong></p>

          <p><strong>The test consists of asking someone you trust to follow the letter\\\'s instructions without your help.</strong></p>

          <p>How to run the test:</p>

          <ol>
            <li><strong>Create a test wallet</strong> with a new seed and send a small amount of bitcoin to it (the equivalent of $10-20 USD is enough).</li>
            <li><strong>Write the letter as if it were the real version</strong>, pointing to this test seed.</li>
            <li><strong>Give the letter to the person who will play the heir</strong> (can be the actual heir, spouse, or adult child).</li>
            <li><strong>Ask them to follow the instructions from start to finish.</strong> Don\\\'t help. Don\\\'t explain. Just observe.</li>
            <li><strong>Note everything that caused confusion or doubt.</strong> Where did the person get stuck? What wasn\\\'t clear? What questions did they ask?</li>
            <li><strong>Rewrite the letter fixing the weak points.</strong></li>
          </ol>

          <p>Things to watch during the test:</p>
          <ul>
            <li>Was the person able to find and download the correct wallet?</li>
            <li>Did they understand how to enter the seed words?</li>
            <li>Were they confused by any technical term?</li>
            <li>Did they feel secure during the process?</li>
            <li>How long did it take from start to finish?</li>
          </ul>

          <p><strong>After the test, do these final checks:</strong></p>
          <ul>
            <li>Is the real seed stored in a safe location separate from the letter?</li>
            <li>Is the letter stored and accessible to the heir?</li>
            <li>Does the trusted contact know their role?</li>
            <li>Do you have an annual reminder to review the plan?</li>
          </ul>

          <p><strong>Create an annual reminder</strong> (on your phone, calendar, or wherever you prefer) to review the plan. Things change: wallets release updates, you may move homes, custodians may change phone numbers. An annual review ensures the plan remains functional.</p>
        `,
        warning: 'If you skip this step, you\\\'re trusting that everything will work perfectly in a moment of crisis. Test now, while you can still make corrections.'
      }
    ]
  },

  // =====================================================
  // METHOD 2: Seed Split (seedSplit) — 9 steps
  // =====================================================
  seedSplit: {
    pt: [
      // Step 1: Pré-requisitos
      {
        title: 'Pré-requisitos',
        content: `
          <p>A divisão de seed (Seed Split) é um passo acima em complexidade em relação ao método Seed + Carta. A ideia central é: <strong>em vez de guardar todas as palavras da seed em um único lugar, você divide as palavras em partes e distribui entre diferentes pessoas ou locais</strong>.</p>

          <p>Este método assume que você já tem:</p>
          <ul>
            <li><strong>Uma seed de 24 palavras já anotada</strong> (originada da sua carteira de autocustódia)</li>
            <li><strong>Bitcoin já sob autocustódia</strong> (se ainda não fez isso, volte ao tutorial básico)</li>
          </ul>

          <p>Para executar este método, você vai precisar de:</p>
          <ul>
            <li><strong>Múltiplas folhas de papel de qualidade</strong> ou, preferencialmente, placas de metal</li>
            <li><strong>Envelopes lacrados</strong> (pelo menos 3)</li>
            <li><strong>Caneta de tinta permanente</strong></li>
            <li><strong>2 a 3 pessoas de confiança</strong> que servirão como custodiantes das partes</li>
            <li><strong>Papel separado</strong> para a carta do herdeiro</li>
          </ul>

          <p>O princípio por trás da divisão é criar <strong>redundância com segurança</strong>: nenhuma pessoa ou local isolado tem acesso completo à seed, mas a perda de uma parte não significa perda total. É como dividir a combinação de um cofre entre várias pessoas.</p>

          <p>É importante entender que este método <strong>adiciona segurança contra roubo, mas também adiciona complexidade</strong>. Mais peças significam mais coisas que podem dar errado. Vamos analisar os trade-offs no próximo passo.</p>
        `,
        tip: 'Este método funciona melhor com seeds de 24 palavras. Seeds de 12 palavras também podem ser divididas, mas com menos flexibilidade nos esquemas de sobreposição.'
      },

      // Step 2: Trade-offs
      {
        title: 'Trade-offs deste método',
        content: `
          <p>A divisão de seed oferece um equilíbrio interessante entre segurança e simplicidade. Mas como todo método, tem vantagens e desvantagens que você precisa entender antes de adotar.</p>

          <div class="tradeoffs">
            <div class="tradeoffs-pros">
              <h4>✅ Prós</h4>
              <ul>
                <li><strong>Nenhuma pessoa tem acesso completo sozinha.</strong> Mesmo que um custodiante seja desonesto ou coagido, ele não consegue acessar o bitcoin com apenas uma parte.</li>
                <li><strong>Tolera a perda de uma parte (no esquema 2-de-3).</strong> Se um custodiante perder sua parte, os outros dois ainda podem reconstruir a seed completa.</li>
                <li><strong>Nenhum hardware especial necessário.</strong> Pode ser feito apenas com papel e caneta (ou placas de metal para maior durabilidade).</li>
                <li><strong>Mais seguro que seed única em um local.</strong> Elimina o ponto único de falha do método Seed + Carta.</li>
                <li><strong>Flexível.</strong> Você escolhe quantas partes criar e quantas são necessárias para reconstrução.</li>
              </ul>
            </div>
            <div class="tradeoffs-cons">
              <h4>❌ Contras</h4>
              <ul>
                <li><strong>Reconstrução mais complexa para herdeiros não-técnicos.</strong> O herdeiro precisa entender que precisa juntar partes de pessoas diferentes, na ordem certa.</li>
                <li><strong>Custodiantes podem perder suas partes ao longo dos anos.</strong> Pessoas mudam, se mudam, perdem coisas. Sem manutenção ativa, o plano pode degradar.</li>
                <li><strong>Divisão manual tem fraquezas criptográficas conhecidas.</strong> 16 de 24 palavras já reduzem drasticamente o espaço de busca para um atacante sofisticado. Não é equivalente a Shamir Secret Sharing.</li>
                <li><strong>Exige coordenação contínua com custodiantes.</strong> Você precisa verificar periodicamente se todos ainda têm suas partes e estão acessíveis.</li>
                <li><strong>Se custodiantes conspirarem, podem reconstruir a seed.</strong> Dois custodiantes trabalhando juntos têm acesso total no esquema 2-de-3.</li>
              </ul>
            </div>
          </div>

          <p>A <strong>fraqueza criptográfica da divisão manual</strong> merece destaque: quando você dá 16 de 24 palavras a alguém, as 8 palavras restantes representam um espaço de busca de aproximadamente 2^88 combinações. Parece muito, mas é drasticamente menor que o espaço completo de 2^256. Para valores muito altos, considere métodos com hardware wallet (Shamir Backup do Trezor ou SeedXOR do Coldcard).</p>

          <p>Dito isso, para a grande maioria dos usuários, <strong>a divisão manual oferece uma melhoria significativa de segurança em relação a manter a seed inteira em um único local</strong>. O risco prático de um atacante encontrar 16 palavras e fazer força bruta nas 8 restantes é baixo, especialmente se os custodiantes forem bem escolhidos.</p>
        `
      },

      // Step 3: Como funciona a divisão
      {
        title: 'Como funciona a divisão',
        content: `
          <p>Existem duas abordagens principais para dividir uma seed. Vamos entender ambas para que você possa tomar uma decisão informada.</p>

          <p><strong>Abordagem A: Divisão manual com sobreposição de palavras</strong></p>

          <p>Esta é a abordagem que vamos detalhar neste tutorial, pois não requer hardware especial. A ideia é dividir as 24 palavras em 3 grupos, com sobreposição entre eles, de modo que <strong>qualquer combinação de 2 grupos reconstrói todas as 24 palavras</strong>.</p>

          <p>Funciona assim: cada grupo recebe 16 das 24 palavras. Os grupos se sobrepõem de forma que as 8 palavras que faltam em um grupo estão presentes nos outros dois. Assim:</p>

          <ul>
            <li><strong>Parte A:</strong> Palavras 1 a 16</li>
            <li><strong>Parte B:</strong> Palavras 9 a 24</li>
            <li><strong>Parte C:</strong> Palavras 1 a 8 + Palavras 17 a 24</li>
          </ul>

          <p>Com esse esquema:</p>
          <ul>
            <li>A + B = todas as 24 palavras (A tem 1-16, B tem 9-24, juntas cobrem 1-24)</li>
            <li>A + C = todas as 24 palavras (A tem 1-16, C tem 17-24, juntas cobrem 1-24)</li>
            <li>B + C = todas as 24 palavras (B tem 9-24, C tem 1-8, juntas cobrem 1-24)</li>
            <li>Apenas A = faltam palavras 17-24</li>
            <li>Apenas B = faltam palavras 1-8</li>
            <li>Apenas C = faltam palavras 9-16</li>
          </ul>

          <p><strong>Abordagem B: Shamir Secret Sharing / SeedXOR (menção)</strong></p>

          <p>Para quem tem hardware wallet, existem métodos criptograficamente mais sólidos:</p>
          <ul>
            <li><strong>Shamir Backup (SLIP-39):</strong> disponível na Trezor Model T. Divide a seed em até 16 partes com threshold configurável. Matematicamente seguro: cada parte individual revela zero informação sobre a seed.</li>
            <li><strong>SeedXOR:</strong> disponível no Coldcard. Usa operação XOR para dividir a seed em partes que, quando combinadas, reconstroem a original.</li>
          </ul>

          <p>Esses métodos são superiores à divisão manual em termos de segurança criptográfica, mas exigem hardware wallet específico. Como este tutorial foca em métodos sem hardware, vamos prosseguir com a abordagem manual.</p>
        `,
        warning: 'A divisão manual de palavras NÃO é criptograficamente perfeita. Um atacante com 16 de 24 palavras tem um espaço de busca drasticamente reduzido. Para valores altos, considere métodos com hardware wallet.'
      },

      // Step 4: Escolha o esquema de divisão
      {
        title: 'Escolha o esquema de divisão',
        content: `
          <p>O esquema que recomendamos é o <strong>2-de-3 com sobreposição</strong>. Isso significa: você cria 3 partes, e qualquer combinação de 2 partes é suficiente para reconstruir a seed completa.</p>

          <p><strong>Visualização do esquema 2-de-3:</strong></p>

          <p>Imagine suas 24 palavras divididas em 3 blocos de 8:</p>
          <ul>
            <li>Bloco 1: Palavras 1 a 8</li>
            <li>Bloco 2: Palavras 9 a 16</li>
            <li>Bloco 3: Palavras 17 a 24</li>
          </ul>

          <p>Cada parte recebe 2 dos 3 blocos:</p>

          <table style="width:100%; border-collapse:collapse; margin:1em 0;">
            <tr style="background:#f0f0f0;">
              <th style="border:1px solid #ccc; padding:8px;">Parte</th>
              <th style="border:1px solid #ccc; padding:8px;">Bloco 1 (1-8)</th>
              <th style="border:1px solid #ccc; padding:8px;">Bloco 2 (9-16)</th>
              <th style="border:1px solid #ccc; padding:8px;">Bloco 3 (17-24)</th>
            </tr>
            <tr>
              <td style="border:1px solid #ccc; padding:8px;"><strong>Parte A</strong></td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">✅</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">✅</td>
              <td style="border:1px solid #ccc; padding:8px; background:#f8d7da;">❌</td>
            </tr>
            <tr>
              <td style="border:1px solid #ccc; padding:8px;"><strong>Parte B</strong></td>
              <td style="border:1px solid #ccc; padding:8px; background:#f8d7da;">❌</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">✅</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">✅</td>
            </tr>
            <tr>
              <td style="border:1px solid #ccc; padding:8px;"><strong>Parte C</strong></td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">✅</td>
              <td style="border:1px solid #ccc; padding:8px; background:#f8d7da;">❌</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">✅</td>
            </tr>
          </table>

          <p><strong>Como ler a tabela:</strong></p>
          <ul>
            <li>Parte A tem as palavras 1-16 (Blocos 1 e 2)</li>
            <li>Parte B tem as palavras 9-24 (Blocos 2 e 3)</li>
            <li>Parte C tem as palavras 1-8 e 17-24 (Blocos 1 e 3)</li>
          </ul>

          <p><strong>Por que 2-de-3?</strong></p>
          <ul>
            <li>Se um custodiante morrer, se mudar, ou perder sua parte, os outros dois ainda podem reconstruir tudo.</li>
            <li>Se um custodiante for desonesto, ele não consegue acessar o bitcoin sozinho (só tem 16 de 24 palavras).</li>
            <li>O herdeiro precisa contatar apenas 2 das 3 pessoas, o que facilita a recuperação.</li>
          </ul>

          <p>Outros esquemas são possíveis (3-de-5, por exemplo), mas aumentam a complexidade sem benefício proporcional para a maioria dos casos. <strong>O 2-de-3 é o equilíbrio ideal entre segurança e praticidade.</strong></p>
        `
      },

      // Step 5: Divida as palavras
      {
        title: 'Divida as palavras',
        content: `
          <p>Chegou o momento de colocar a mão na massa. Este passo exige <strong>atenção total e zero distrações</strong>. Um erro em uma única palavra pode tornar toda a parte inútil.</p>

          <p><strong>Preparação:</strong></p>
          <ul>
            <li>Tenha sua seed completa de 24 palavras à frente.</li>
            <li>Prepare 3 folhas de papel limpas (ou 3 placas de metal).</li>
            <li>Use caneta de tinta permanente. Nunca lápis.</li>
            <li>Trabalhe em um local privado, sem câmeras, sem outras pessoas por perto.</li>
          </ul>

          <p><strong>Passo a passo:</strong></p>

          <p><strong>Parte A — Palavras 1 a 16:</strong></p>
          <ol>
            <li>No topo da folha, escreva "PARTE A" e a data.</li>
            <li>Copie as palavras 1 a 16 da sua seed, numerando cada uma.</li>
            <li>Após copiar, <strong>verifique cada palavra três vezes</strong>, comparando com a seed original.</li>
            <li>Preste atenção especial a palavras parecidas (ex: "abandon" vs "about", "letter" vs "liberty").</li>
          </ol>

          <p><strong>Parte B — Palavras 9 a 24:</strong></p>
          <ol>
            <li>No topo da folha, escreva "PARTE B" e a data.</li>
            <li>Copie as palavras 9 a 24, <strong>mantendo a numeração original</strong> (palavra 9 deve ser marcada como "9", não como "1").</li>
            <li>Verifique três vezes.</li>
          </ol>

          <p><strong>Parte C — Palavras 1 a 8 e 17 a 24:</strong></p>
          <ol>
            <li>No topo da folha, escreva "PARTE C" e a data.</li>
            <li>Copie as palavras 1 a 8, depois pule para as palavras 17 a 24. Mantenha a numeração original.</li>
            <li>Verifique três vezes.</li>
          </ol>

          <p><strong>Verificação final (OBRIGATÓRIA):</strong></p>
          <ul>
            <li>Pegue as Partes A e B. Junte-as. Você consegue reconstruir todas as 24 palavras? Se sim, continue.</li>
            <li>Repita com A + C.</li>
            <li>Repita com B + C.</li>
            <li>Se qualquer combinação de 2 partes não produzir as 24 palavras completas, há um erro. Refaça.</li>
          </ul>

          <p>Coloque cada parte em um envelope separado e lacre. <strong>Não escreva "BITCOIN" ou qualquer identificação óbvia no exterior do envelope.</strong> Use um código pessoal ou simplesmente "Documentos importantes - Parte A/B/C".</p>
        `,
        warning: 'Manter a numeração original das palavras é crucial. Se as palavras ficarem fora de ordem, a seed não funciona. Sempre numere cada palavra.'
      },

      // Step 6: Escreva a carta do herdeiro
      {
        title: 'Escreva a carta do herdeiro',
        content: `
          <p>A carta do herdeiro neste método é mais complexa do que no método Seed + Carta, porque o herdeiro precisa entender o processo de reconstrução. <strong>Clareza é absolutamente essencial.</strong></p>

          <p>A carta deve conter os seguintes blocos de informação, nesta ordem:</p>

          <p><strong>Bloco 1: O que é Bitcoin (contexto)</strong></p>
          <p>Mesmo conteúdo do método anterior: explique o que é Bitcoin, por que você tem, e como é diferente de dinheiro no banco. Escreva como se o herdeiro nunca tivesse ouvido falar de Bitcoin.</p>

          <p><strong>Bloco 2: Como a seed foi protegida</strong></p>
          <p>Explique de forma simples: "Para proteger o acesso ao meu bitcoin, dividi a chave (24 palavras) em 3 partes. Nenhuma parte sozinha é suficiente. Você precisa de 2 das 3 partes para recuperar o acesso."</p>

          <p><strong>Bloco 3: Quem tem cada parte</strong></p>
          <p>Liste claramente:</p>
          <ul>
            <li>"Parte A está com: [Nome], [Telefone], [Cidade/Endereço]. Diga que eu pedi para entregar o envelope lacrado a você."</li>
            <li>"Parte B está com: [Nome], [Telefone], [Cidade/Endereço]."</li>
            <li>"Parte C está em: [Local], [Como acessar]."</li>
          </ul>

          <p><strong>Bloco 4: Como reconstruir a seed</strong></p>
          <p>Instruções detalhadas:</p>
          <ol>
            <li>"Colete 2 das 3 partes."</li>
            <li>"Cada parte tem palavras numeradas. Organize todas as palavras em ordem numérica (1 a 24)."</li>
            <li>"Você vai notar que algumas palavras aparecem nas duas partes. Isso é normal — é a sobreposição de segurança."</li>
            <li>"Ao final, você deve ter exatamente 24 palavras, cada uma com seu número, em ordem do 1 ao 24."</li>
          </ol>

          <p><strong>Bloco 5: Instruções de recuperação</strong></p>
          <p>Idêntico ao método anterior: qual carteira baixar (Blue Wallet ou Sparrow), como importar a seed, o que esperar. Inclua URLs exatas.</p>

          <p><strong>Bloco 6: Avisos de segurança</strong></p>
          <p>Mesmos avisos do método anterior: nunca compartilhar as palavras, nunca digitar em sites, contato de confiança que pode ajudar sem ver as palavras.</p>

          <p>Termine a carta com encorajamento: "Sei que isso pode parecer complicado, mas siga os passos com calma. Você consegue."</p>
        `,
        tip: 'Numere os blocos da carta e inclua um índice no início: "1. O que é Bitcoin, 2. Como a chave foi dividida, 3. Com quem estão as partes..." Isso facilita a navegação em um momento estressante.'
      },

      // Step 7: Escolha e instrua os custodiantes
      {
        title: 'Escolha e instrua os custodiantes',
        content: `
          <p>A escolha dos custodiantes é <strong>a decisão mais importante deste método</strong>. Custodiantes mal escolhidos podem comprometer toda a estratégia, seja por negligência (perder a parte), desonestidade (conspirar), ou simplesmente por ficarem inacessíveis ao longo dos anos.</p>

          <p><strong>Critérios para escolher custodiantes:</strong></p>

          <ul>
            <li><strong>Confiança:</strong> Pessoas com quem você tem relação sólida e de longo prazo. Pense em quem você confiaria uma chave da sua casa por 10 anos.</li>
            <li><strong>Diversidade geográfica:</strong> Idealmente, os custodiantes devem morar em cidades ou pelo menos bairros diferentes. Isso protege contra desastres locais (enchente, incêndio) e dificulta conspiração.</li>
            <li><strong>Estabilidade:</strong> Pessoas que provavelmente estarão no mesmo lugar, com o mesmo contato, daqui a 5-10 anos. Evite pessoas que mudam de cidade frequentemente ou que têm estilo de vida instável.</li>
            <li><strong>Improvável que conspirem:</strong> Escolha custodiantes que <strong>não se conhecem entre si</strong>, ou que têm pouquíssimo contato. Dois amigos próximos que saem juntos todo final de semana não é ideal.</li>
            <li><strong>Responsáveis:</strong> Pessoas que levam a sério quando você diz "guarde isso em segurança".</li>
          </ul>

          <p><strong>O que dizer aos custodiantes:</strong></p>
          <ul>
            <li>"Estou te entregando um envelope lacrado com uma informação de segurança importante. Guarde em local seguro."</li>
            <li>"Se eu falecer, entregue para [nome do herdeiro] quando ele/ela entrar em contato."</li>
            <li>"Nunca abra o envelope. Nunca tire foto. Nunca compartilhe com ninguém."</li>
            <li>"De tempos em tempos, vou te perguntar se ainda tem o envelope. Por favor, confirme."</li>
          </ul>

          <p><strong>O que NÃO dizer aos custodiantes:</strong></p>
          <ul>
            <li>Não diga quanto bitcoin você tem.</li>
            <li>Não explique que com duas partes é possível acessar tudo.</li>
            <li>Não revele quem são os outros custodiantes.</li>
            <li>Não entre em detalhes sobre como a divisão funciona.</li>
          </ul>

          <p>Quanto menos cada custodiante souber sobre o contexto geral, menor o risco. Para o custodiante, trata-se apenas de um envelope lacrado que deve ser guardado e entregue quando solicitado.</p>

          <p><strong>Uma opção para o terceiro custodiante:</strong> Nem todas as partes precisam ficar com pessoas. A Parte C pode ficar em um cofre bancário, um cofre residencial, ou outro local seguro que o herdeiro possa acessar. Isso reduz a dependência de uma terceira pessoa.</p>
        `,
        warning: 'Nunca escolha custodiantes que se conhecem bem entre si. Se dois custodiantes forem amigos próximos, a barreira para conspiração é muito baixa.'
      },

      // Step 8: Guarde cada parte em local diferente
      {
        title: 'Guarde cada parte em local diferente',
        content: `
          <p>A diversificação geográfica das partes é o que transforma a divisão de seed em uma estratégia robusta. <strong>Se todas as partes estiverem na mesma cidade, no mesmo prédio, ou pior, na mesma casa, você não está realmente dividindo o risco.</strong></p>

          <p><strong>Princípios de armazenamento distribuído:</strong></p>

          <ul>
            <li><strong>Pelo menos 2 das 3 partes devem estar em prédios/imóveis diferentes.</strong> Isso protege contra incêndio, enchente, arrombamento, e outros eventos localizados.</li>
            <li><strong>Idealmente, pelo menos 2 partes devem estar em cidades diferentes.</strong> Isso protege contra desastres regionais.</li>
            <li><strong>Cada parte deve ter proteção contra fogo e água.</strong> Use envelopes dentro de sacos plásticos com zíper, ou (melhor ainda) placas de metal.</li>
          </ul>

          <p><strong>Exemplos de distribuição:</strong></p>
          <ul>
            <li>Parte A: cofre residencial do custodiante 1 (São Paulo)</li>
            <li>Parte B: cofre residencial do custodiante 2 (Campinas)</li>
            <li>Parte C: cofre bancário ou residencial em outra cidade</li>
          </ul>

          <p><strong>Cuidados com a identificação dos envelopes:</strong></p>
          <ul>
            <li><strong>NUNCA escreva "Bitcoin", "Seed", "Cripto", ou qualquer referência óbvia</strong> no exterior do envelope.</li>
            <li>Use identificações neutras: "Documentos pessoais", "Parte A", ou simplesmente nenhuma identificação.</li>
            <li>O custodiante não precisa saber o que tem dentro. Para ele, é apenas um envelope lacrado.</li>
          </ul>

          <p><strong>Registro para você:</strong></p>
          <p>Mantenha uma nota pessoal (pode ser mental, ou em código que só você entende) de:</p>
          <ul>
            <li>Qual parte está com quem</li>
            <li>Onde cada custodiante guarda a parte</li>
            <li>Contatos atualizados de cada custodiante</li>
          </ul>

          <p>Essas informações também devem estar na carta do herdeiro. A carta é o mapa que conecta todas as peças. Sem ela, o herdeiro pode nunca saber que as partes existem ou com quem estão.</p>

          <p>Considere também o cenário inverso: e se <strong>você</strong> precisar acessar o bitcoin? Tenha certeza de que consegue coletar 2 das 3 partes em um prazo razoável (idealmente menos de 48 horas). Se um custodiante está em outro país e leva semanas para enviar a parte, isso pode ser um problema em caso de emergência.</p>
        `
      },

      // Step 9: Teste a reconstrução
      {
        title: 'Teste a reconstrução',
        content: `
          <p>Este é o passo final e mais crítico. <strong>Se você não testar a reconstrução, está confiando cegamente que tudo foi feito corretamente.</strong> E no momento em que o herdeiro precisar, será tarde demais para corrigir erros.</p>

          <p><strong>O teste de reconstrução:</strong></p>

          <ol>
            <li><strong>Colete 2 das 3 partes.</strong> Comece com A + B. Peça ao custodiante da parte B que lhe entregue temporariamente (ou vá até ele).</li>
            <li><strong>Monte as 24 palavras em ordem.</strong> Usando as duas partes, reconstrua a sequência completa de 1 a 24.</li>
            <li><strong>Verifique com a seed original.</strong> Compare palavra por palavra com sua seed original. Todas devem ser idênticas, na mesma ordem.</li>
            <li><strong>Teste a restauração em uma carteira.</strong> Abra o Blue Wallet ou Sparrow Wallet e importe a seed reconstruída. O saldo e os endereços devem ser idênticos à sua carteira atual.</li>
            <li><strong>Repita com outra combinação.</strong> Se possível, faça o mesmo teste com A + C ou B + C, para garantir que todas as combinações funcionam.</li>
            <li><strong>Devolva as partes aos custodiantes.</strong></li>
          </ol>

          <p><strong>Se algo não funcionar:</strong></p>
          <ul>
            <li>Verifique se houve erro de cópia (palavra errada, ordem errada, numeração errada).</li>
            <li>Verifique se alguma palavra está ilegível.</li>
            <li>Refaça as partes com erro e redistribua.</li>
          </ul>

          <p><strong>Manutenção anual (crie lembretes):</strong></p>
          <ul>
            <li><strong>Check-in com custodiantes:</strong> Uma vez por ano, entre em contato com cada custodiante e pergunte: "Você ainda tem o envelope que te entreguei?" Não precisa de mais detalhes.</li>
            <li><strong>Atualização da carta:</strong> Se qualquer custodiante mudar de endereço, telefone, ou se você trocar um custodiante, atualize a carta do herdeiro.</li>
            <li><strong>Revisão do plano:</strong> Circunstâncias mudam. Se você teve filhos, se divorciou, se mudou de país, se o valor do bitcoin mudou drasticamente, reavalie se este método ainda é o mais adequado.</li>
            <li><strong>Verificação física:</strong> A cada 2-3 anos, considere coletar todas as partes e verificar que estão legíveis e intactas, especialmente se foram guardadas em papel.</li>
          </ul>

          <p>Parabéns. Se você chegou até aqui e completou todos os passos, <strong>você tem um plano de herança funcional para seu bitcoin</strong>. Seu herdeiro não precisará depender de ninguém para acessar o que é dele por direito. E o mais importante: você pode dormir tranquilo sabendo que seu bitcoin não morrerá com você.</p>
        `,
        warning: 'Nunca pule o teste. Uma palavra copiada errada, uma numeração trocada, e o plano inteiro falha. Melhor descobrir agora do que seu herdeiro descobrir no pior momento possível.'
      }
    ],

    en: [
      // Step 1: Prerequisites
      {
        title: 'Prerequisites',
        content: `
          <p>Seed splitting is a step up in complexity from the Seed + Letter method. The core idea is: <strong>instead of storing all seed words in a single location, you divide the words into parts and distribute them among different people or locations</strong>.</p>

          <p>This method assumes you already have:</p>
          <ul>
            <li><strong>A 24-word seed already written down</strong> (from your self-custody wallet)</li>
            <li><strong>Bitcoin already under self-custody</strong> (if you haven\\\'t done this yet, go back to the basic tutorial)</li>
          </ul>

          <p>To execute this method, you will need:</p>
          <ul>
            <li><strong>Multiple sheets of quality paper</strong> or, preferably, metal plates</li>
            <li><strong>Sealed envelopes</strong> (at least 3)</li>
            <li><strong>Permanent ink pen</strong></li>
            <li><strong>2 to 3 trusted people</strong> who will serve as custodians for the parts</li>
            <li><strong>Separate paper</strong> for the heir\\\'s letter</li>
          </ul>

          <p>The principle behind splitting is to create <strong>redundancy with security</strong>: no single person or location has full access to the seed, but losing one part doesn\\\'t mean total loss. It\\\'s like splitting a safe combination among several people.</p>

          <p>It\\\'s important to understand that this method <strong>adds security against theft but also adds complexity</strong>. More pieces mean more things that can go wrong. We\\\'ll analyze the trade-offs in the next step.</p>
        `,
        tip: 'This method works best with 24-word seeds. 12-word seeds can also be split, but with less flexibility in the overlap schemes.'
      },

      // Step 2: Trade-offs
      {
        title: 'Trade-offs of this method',
        content: `
          <p>Seed splitting offers an interesting balance between security and simplicity. But like every method, it has advantages and disadvantages you need to understand before adopting it.</p>

          <div class="tradeoffs">
            <div class="tradeoffs-pros">
              <h4>✅ Pros</h4>
              <ul>
                <li><strong>No single person has full access alone.</strong> Even if a custodian is dishonest or coerced, they cannot access the bitcoin with just one part.</li>
                <li><strong>Tolerates loss of one share (in 2-of-3 scheme).</strong> If one custodian loses their part, the other two can still reconstruct the complete seed.</li>
                <li><strong>No special hardware required.</strong> Can be done with just paper and pen (or metal plates for greater durability).</li>
                <li><strong>More secure than a single seed in one location.</strong> Eliminates the single point of failure of the Seed + Letter method.</li>
                <li><strong>Flexible.</strong> You choose how many parts to create and how many are needed for reconstruction.</li>
              </ul>
            </div>
            <div class="tradeoffs-cons">
              <h4>❌ Cons</h4>
              <ul>
                <li><strong>More complex reconstruction for non-technical heirs.</strong> The heir needs to understand they must gather parts from different people, in the right order.</li>
                <li><strong>Custodians may lose their shares over the years.</strong> People change, move, lose things. Without active maintenance, the plan can degrade.</li>
                <li><strong>Manual splitting has known cryptographic weaknesses.</strong> 16 of 24 words already drastically reduce the search space for a sophisticated attacker. It is not equivalent to Shamir Secret Sharing.</li>
                <li><strong>Requires ongoing coordination with custodians.</strong> You need to periodically verify that everyone still has their parts and is reachable.</li>
                <li><strong>If custodians collude, they can reconstruct the seed.</strong> Two custodians working together have full access in the 2-of-3 scheme.</li>
              </ul>
            </div>
          </div>

          <p>The <strong>cryptographic weakness of manual splitting</strong> deserves special mention: when you give someone 16 of 24 words, the remaining 8 words represent a search space of approximately 2^88 combinations. That sounds like a lot, but it\\\'s drastically smaller than the full space of 2^256. For very high values, consider hardware wallet methods (Trezor\\\'s Shamir Backup or Coldcard\\\'s SeedXOR).</p>

          <p>That said, for the vast majority of users, <strong>manual splitting offers a significant security improvement over keeping the entire seed in a single location</strong>. The practical risk of an attacker finding 16 words and brute-forcing the remaining 8 is low, especially if custodians are well chosen.</p>
        `
      },

      // Step 3: How the split works
      {
        title: 'How the split works',
        content: `
          <p>There are two main approaches to splitting a seed. Let\\\'s understand both so you can make an informed decision.</p>

          <p><strong>Approach A: Manual word overlap splitting</strong></p>

          <p>This is the approach we\\\'ll detail in this tutorial, as it requires no special hardware. The idea is to split the 24 words into 3 groups, with overlap between them, so that <strong>any combination of 2 groups reconstructs all 24 words</strong>.</p>

          <p>Here\\\'s how it works: each group receives 16 of the 24 words. The groups overlap so that the 8 missing words from one group are present in the other two. Like this:</p>

          <ul>
            <li><strong>Part A:</strong> Words 1 to 16</li>
            <li><strong>Part B:</strong> Words 9 to 24</li>
            <li><strong>Part C:</strong> Words 1 to 8 + Words 17 to 24</li>
          </ul>

          <p>With this scheme:</p>
          <ul>
            <li>A + B = all 24 words (A has 1-16, B has 9-24, together they cover 1-24)</li>
            <li>A + C = all 24 words (A has 1-16, C has 17-24, together they cover 1-24)</li>
            <li>B + C = all 24 words (B has 9-24, C has 1-8, together they cover 1-24)</li>
            <li>Only A = missing words 17-24</li>
            <li>Only B = missing words 1-8</li>
            <li>Only C = missing words 9-16</li>
          </ul>

          <p><strong>Approach B: Shamir Secret Sharing / SeedXOR (mention)</strong></p>

          <p>For those with hardware wallets, there are cryptographically sounder methods:</p>
          <ul>
            <li><strong>Shamir Backup (SLIP-39):</strong> available on the Trezor Model T. Splits the seed into up to 16 parts with configurable threshold. Mathematically secure: each individual part reveals zero information about the seed.</li>
            <li><strong>SeedXOR:</strong> available on Coldcard. Uses the XOR operation to split the seed into parts that, when combined, reconstruct the original.</li>
          </ul>

          <p>These methods are superior to manual splitting in terms of cryptographic security, but require specific hardware wallets. Since this tutorial focuses on methods without hardware, we\\\'ll proceed with the manual approach.</p>
        `,
        warning: 'Manual word splitting is NOT cryptographically perfect. An attacker with 16 of 24 words has a drastically reduced search space. For high values, consider hardware wallet methods.'
      },

      // Step 4: Choose the split scheme
      {
        title: 'Choose the split scheme',
        content: `
          <p>The scheme we recommend is the <strong>2-of-3 with overlap</strong>. This means: you create 3 parts, and any combination of 2 parts is sufficient to reconstruct the complete seed.</p>

          <p><strong>2-of-3 scheme visualization:</strong></p>

          <p>Imagine your 24 words divided into 3 blocks of 8:</p>
          <ul>
            <li>Block 1: Words 1 to 8</li>
            <li>Block 2: Words 9 to 16</li>
            <li>Block 3: Words 17 to 24</li>
          </ul>

          <p>Each part receives 2 of the 3 blocks:</p>

          <table style="width:100%; border-collapse:collapse; margin:1em 0;">
            <tr style="background:#f0f0f0;">
              <th style="border:1px solid #ccc; padding:8px;">Part</th>
              <th style="border:1px solid #ccc; padding:8px;">Block 1 (1-8)</th>
              <th style="border:1px solid #ccc; padding:8px;">Block 2 (9-16)</th>
              <th style="border:1px solid #ccc; padding:8px;">Block 3 (17-24)</th>
            </tr>
            <tr>
              <td style="border:1px solid #ccc; padding:8px;"><strong>Part A</strong></td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">Yes</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">Yes</td>
              <td style="border:1px solid #ccc; padding:8px; background:#f8d7da;">No</td>
            </tr>
            <tr>
              <td style="border:1px solid #ccc; padding:8px;"><strong>Part B</strong></td>
              <td style="border:1px solid #ccc; padding:8px; background:#f8d7da;">No</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">Yes</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">Yes</td>
            </tr>
            <tr>
              <td style="border:1px solid #ccc; padding:8px;"><strong>Part C</strong></td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">Yes</td>
              <td style="border:1px solid #ccc; padding:8px; background:#f8d7da;">No</td>
              <td style="border:1px solid #ccc; padding:8px; background:#d4edda;">Yes</td>
            </tr>
          </table>

          <p><strong>How to read the table:</strong></p>
          <ul>
            <li>Part A has words 1-16 (Blocks 1 and 2)</li>
            <li>Part B has words 9-24 (Blocks 2 and 3)</li>
            <li>Part C has words 1-8 and 17-24 (Blocks 1 and 3)</li>
          </ul>

          <p><strong>Why 2-of-3?</strong></p>
          <ul>
            <li>If one custodian dies, moves away, or loses their part, the other two can still reconstruct everything.</li>
            <li>If one custodian is dishonest, they can\\\'t access the bitcoin alone (they only have 16 of 24 words).</li>
            <li>The heir only needs to contact 2 of the 3 people, making recovery easier.</li>
          </ul>

          <p>Other schemes are possible (3-of-5, for example), but they increase complexity without proportional benefit for most cases. <strong>2-of-3 is the ideal balance between security and practicality.</strong></p>
        `
      },

      // Step 5: Split the words
      {
        title: 'Split the words',
        content: `
          <p>Now it\\\'s time to do the actual work. This step requires <strong>total attention and zero distractions</strong>. An error in a single word can render an entire part useless.</p>

          <p><strong>Preparation:</strong></p>
          <ul>
            <li>Have your complete 24-word seed in front of you.</li>
            <li>Prepare 3 clean sheets of paper (or 3 metal plates).</li>
            <li>Use permanent ink pen. Never pencil.</li>
            <li>Work in a private location, no cameras, no other people nearby.</li>
          </ul>

          <p><strong>Step by step:</strong></p>

          <p><strong>Part A — Words 1 to 16:</strong></p>
          <ol>
            <li>At the top of the sheet, write "PART A" and the date.</li>
            <li>Copy words 1 to 16 from your seed, numbering each one.</li>
            <li>After copying, <strong>verify each word three times</strong>, comparing with the original seed.</li>
            <li>Pay special attention to similar words (e.g., "abandon" vs "about", "letter" vs "liberty").</li>
          </ol>

          <p><strong>Part B — Words 9 to 24:</strong></p>
          <ol>
            <li>At the top of the sheet, write "PART B" and the date.</li>
            <li>Copy words 9 to 24, <strong>keeping the original numbering</strong> (word 9 should be marked as "9", not as "1").</li>
            <li>Verify three times.</li>
          </ol>

          <p><strong>Part C — Words 1 to 8 and 17 to 24:</strong></p>
          <ol>
            <li>At the top of the sheet, write "PART C" and the date.</li>
            <li>Copy words 1 to 8, then skip to words 17 to 24. Keep the original numbering.</li>
            <li>Verify three times.</li>
          </ol>

          <p><strong>Final verification (MANDATORY):</strong></p>
          <ul>
            <li>Take Parts A and B. Combine them. Can you reconstruct all 24 words? If yes, continue.</li>
            <li>Repeat with A + C.</li>
            <li>Repeat with B + C.</li>
            <li>If any combination of 2 parts doesn\\\'t produce the complete 24 words, there\\\'s an error. Redo.</li>
          </ul>

          <p>Place each part in a separate envelope and seal it. <strong>Don\\\'t write "BITCOIN" or any obvious identification on the outside of the envelope.</strong> Use neutral labels: "Personal documents", "Part A", or simply no identification.</p>
        `,
        warning: 'Keeping the original word numbering is crucial. If the words are out of order, the seed won\\\'t work. Always number each word.'
      },

      // Step 6: Write the heir\\\'s letter
      {
        title: 'Write the heir\\\'s letter',
        content: `
          <p>The heir\\\'s letter in this method is more complex than in the Seed + Letter method because the heir needs to understand the reconstruction process. <strong>Clarity is absolutely essential.</strong></p>

          <p>The letter should contain the following blocks of information, in this order:</p>

          <p><strong>Block 1: What Bitcoin is (context)</strong></p>
          <p>Same content as the previous method: explain what Bitcoin is, why you have it, and how it\\\'s different from bank money. Write as if the heir had never heard of Bitcoin.</p>

          <p><strong>Block 2: How the seed was protected</strong></p>
          <p>Explain simply: "To protect access to my bitcoin, I split the key (24 words) into 3 parts. No single part is enough. You need 2 of the 3 parts to recover access."</p>

          <p><strong>Block 3: Who has each part</strong></p>
          <p>List clearly:</p>
          <ul>
            <li>"Part A is with: [Name], [Phone], [City/Address]. Tell them I asked for the sealed envelope to be delivered to you."</li>
            <li>"Part B is with: [Name], [Phone], [City/Address]."</li>
            <li>"Part C is at: [Location], [How to access]."</li>
          </ul>

          <p><strong>Block 4: How to reconstruct the seed</strong></p>
          <p>Detailed instructions:</p>
          <ol>
            <li>"Collect 2 of the 3 parts."</li>
            <li>"Each part has numbered words. Arrange all words in numerical order (1 to 24)."</li>
            <li>"You\\\'ll notice some words appear in both parts. This is normal — it\\\'s the security overlap."</li>
            <li>"At the end, you should have exactly 24 words, each with its number, in order from 1 to 24."</li>
          </ol>

          <p><strong>Block 5: Recovery instructions</strong></p>
          <p>Same as the previous method: which wallet to download (Blue Wallet or Sparrow), how to import the seed, what to expect. Include exact URLs.</p>

          <p><strong>Block 6: Security warnings</strong></p>
          <p>Same warnings as the previous method: never share the words, never enter them on websites, trusted contact who can help without seeing the words.</p>

          <p>End the letter with encouragement: "I know this may seem complicated, but follow the steps calmly. You can do this."</p>
        `,
        tip: 'Number the blocks of the letter and include an index at the beginning: "1. What is Bitcoin, 2. How the key was split, 3. Who has the parts..." This makes navigation easier at a stressful moment.'
      },

      // Step 7: Choose and instruct custodians
      {
        title: 'Choose and instruct custodians',
        content: `
          <p>Choosing custodians is <strong>the most important decision in this method</strong>. Poorly chosen custodians can compromise the entire strategy, whether through negligence (losing the part), dishonesty (colluding), or simply becoming unreachable over the years.</p>

          <p><strong>Criteria for choosing custodians:</strong></p>

          <ul>
            <li><strong>Trust:</strong> People with whom you have a solid, long-term relationship. Think about who you would trust with a key to your house for 10 years.</li>
            <li><strong>Geographic diversity:</strong> Ideally, custodians should live in different cities, or at least different neighborhoods. This protects against local disasters (flood, fire) and makes collusion harder.</li>
            <li><strong>Stability:</strong> People who will likely be in the same place, with the same contact information, 5-10 years from now. Avoid people who frequently change cities or have an unstable lifestyle.</li>
            <li><strong>Unlikely to collude:</strong> Choose custodians who <strong>don\\\'t know each other</strong>, or who have very little contact. Two close friends who hang out every weekend is not ideal.</li>
            <li><strong>Responsible:</strong> People who take it seriously when you say "keep this safe."</li>
          </ul>

          <p><strong>What to tell custodians:</strong></p>
          <ul>
            <li>"I\\\'m giving you a sealed envelope with important security information. Keep it in a safe place."</li>
            <li>"If I pass away, deliver it to [heir\\\'s name] when they contact you."</li>
            <li>"Never open the envelope. Never photograph it. Never share it with anyone."</li>
            <li>"From time to time, I\\\'ll ask you if you still have the envelope. Please confirm."</li>
          </ul>

          <p><strong>What NOT to tell custodians:</strong></p>
          <ul>
            <li>Don\\\'t say how much bitcoin you have.</li>
            <li>Don\\\'t explain that two parts together can access everything.</li>
            <li>Don\\\'t reveal who the other custodians are.</li>
            <li>Don\\\'t go into details about how the split works.</li>
          </ul>

          <p>The less each custodian knows about the overall context, the lower the risk. For the custodian, it\\\'s just a sealed envelope that needs to be stored and delivered when requested.</p>

          <p><strong>An option for the third custodian:</strong> Not all parts need to be with people. Part C can be in a bank safe deposit box, a home safe, or another secure location that the heir can access. This reduces dependency on a third person.</p>
        `,
        warning: 'Never choose custodians who know each other well. If two custodians are close friends, the barrier to collusion is very low.'
      },

      // Step 8: Store each part in a different location
      {
        title: 'Store each part in a different location',
        content: `
          <p>Geographic diversification of the parts is what transforms seed splitting into a robust strategy. <strong>If all parts are in the same city, the same building, or worse, the same house, you\\\'re not really splitting the risk.</strong></p>

          <p><strong>Principles of distributed storage:</strong></p>

          <ul>
            <li><strong>At least 2 of the 3 parts should be in different buildings.</strong> This protects against fire, flood, burglary, and other localized events.</li>
            <li><strong>Ideally, at least 2 parts should be in different cities.</strong> This protects against regional disasters.</li>
            <li><strong>Each part should be protected against fire and water.</strong> Use envelopes inside zip-lock bags, or (better yet) metal plates.</li>
          </ul>

          <p><strong>Distribution examples:</strong></p>
          <ul>
            <li>Part A: Custodian 1\\\'s home safe (City A)</li>
            <li>Part B: Custodian 2\\\'s home safe (City B)</li>
            <li>Part C: Bank safe deposit box or home safe in another city</li>
          </ul>

          <p><strong>Envelope labeling precautions:</strong></p>
          <ul>
            <li><strong>NEVER write "Bitcoin", "Seed", "Crypto", or any obvious reference</strong> on the outside of the envelope.</li>
            <li>Use neutral labels: "Personal documents", "Part A", or simply no identification.</li>
            <li>The custodian doesn\\\'t need to know what\\\'s inside. For them, it\\\'s just a sealed envelope.</li>
          </ul>

          <p><strong>Record for yourself:</strong></p>
          <p>Keep a personal note (can be mental, or in a code only you understand) of:</p>
          <ul>
            <li>Which part is with whom</li>
            <li>Where each custodian stores their part</li>
            <li>Updated contact details for each custodian</li>
          </ul>

          <p>This information should also be in the heir\\\'s letter. The letter is the map that connects all the pieces. Without it, the heir may never know the parts exist or who has them.</p>

          <p>Also consider the reverse scenario: what if <strong>you</strong> need to access the bitcoin? Make sure you can collect 2 of the 3 parts within a reasonable timeframe (ideally less than 48 hours). If a custodian is in another country and takes weeks to send their part, this could be a problem in an emergency.</p>
        `
      },

      // Step 9: Test the reconstruction
      {
        title: 'Test the reconstruction',
        content: `
          <p>This is the final and most critical step. <strong>If you don\\\'t test the reconstruction, you\\\'re blindly trusting that everything was done correctly.</strong> And by the time the heir needs it, it will be too late to fix errors.</p>

          <p><strong>The reconstruction test:</strong></p>

          <ol>
            <li><strong>Collect 2 of the 3 parts.</strong> Start with A + B. Ask custodian B to temporarily give you their part (or go to them).</li>
            <li><strong>Assemble the 24 words in order.</strong> Using the two parts, reconstruct the complete sequence from 1 to 24.</li>
            <li><strong>Verify against the original seed.</strong> Compare word by word with your original seed. All should be identical, in the same order.</li>
            <li><strong>Test restoration in a wallet.</strong> Open Blue Wallet or Sparrow Wallet and import the reconstructed seed. The balance and addresses should be identical to your current wallet.</li>
            <li><strong>Repeat with another combination.</strong> If possible, do the same test with A + C or B + C, to ensure all combinations work.</li>
            <li><strong>Return the parts to custodians.</strong></li>
          </ol>

          <p><strong>If something doesn\\\'t work:</strong></p>
          <ul>
            <li>Check for copying errors (wrong word, wrong order, wrong numbering).</li>
            <li>Check if any word is illegible.</li>
            <li>Redo the parts with errors and redistribute.</li>
          </ul>

          <p><strong>Annual maintenance (set reminders):</strong></p>
          <ul>
            <li><strong>Check-in with custodians:</strong> Once a year, contact each custodian and ask: "Do you still have the envelope I gave you?" No further details needed.</li>
            <li><strong>Update the letter:</strong> If any custodian changes address, phone number, or if you replace a custodian, update the heir\\\'s letter.</li>
            <li><strong>Review the plan:</strong> Circumstances change. If you had children, got divorced, moved countries, or the value of your bitcoin changed drastically, reassess whether this method is still the most appropriate.</li>
            <li><strong>Physical verification:</strong> Every 2-3 years, consider collecting all parts and verifying they are legible and intact, especially if stored on paper.</li>
          </ul>

          <p>Congratulations. If you\\\'ve reached this point and completed all steps, <strong>you have a functional inheritance plan for your bitcoin</strong>. Your heir won\\\'t need to depend on anyone to access what is rightfully theirs. And most importantly: you can sleep soundly knowing your bitcoin won\\\'t die with you.</p>
        `,
        warning: 'Never skip the test. One wrong word, one swapped number, and the entire plan fails. Better to find out now than for your heir to find out at the worst possible moment.'
      }
    ]
  }

};
