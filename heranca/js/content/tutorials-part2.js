// ============================================================
// Tutorials Part 2 — Passphrase + Carta & Multisig Distribuído
// ============================================================

const TUTORIAL_PART2 = {

  // ────────────────────────────────────────────────────────────
  // Method 3: Passphrase + Carta (Tronco e Galhos)
  // ────────────────────────────────────────────────────────────
  passphraseCarta: {
    pt: [
      // Step 1 ─ Pré-requisitos
      {
        title: 'Pré-requisitos',
        content:
          '<p>Antes de começar, você precisa de:</p>' +
          '<ul>' +
            '<li><strong>Hardware wallet com suporte a passphrase</strong> (também chamada de "senha 25a palavra"). Modelos compatíveis: Coldcard, Trezor, Jade, Krux. Verifique no manual do fabricante se o seu modelo suporta.</li>' +
            '<li><strong>Sparrow Wallet</strong> instalado no computador (download em <code>sparrowwallet.com</code>). É o software coordenador que você usará para gerenciar as carteiras.</li>' +
            '<li><strong>Seed phrase já gerada e guardada com segurança</strong> (12 ou 24 palavras). Se ainda não fez, complete primeiro o tutorial de geração de seed offline.</li>' +
            '<li><strong>Entendimento básico de passphrase</strong>: a passphrase é uma palavra ou frase extra que, combinada com a seed, gera uma carteira completamente diferente. Se você ainda não entende esse conceito, volte ao tutorial de auto-custódia.</li>' +
          '</ul>' +
          '<p>Custo estimado: você já deve ter a hardware wallet do seu setup de custódia. Não há custo adicional além de materiais para backup (placa de metal, papel, envelope).</p>'
      },

      // Step 2 ─ O modelo Tronco e Galhos
      {
        title: 'O modelo Tronco e Galhos',
        content:
          '<p>Este é o conceito central deste método, e entendê-lo bem é <strong>a diferença entre um plano que funciona e um desastre</strong>.</p>' +
          '<p>Imagine uma árvore:</p>' +
          '<ul>' +
            '<li>A <strong>seed phrase</strong> (12 ou 24 palavras) é o <strong>tronco</strong> da árvore. É a raiz de tudo.</li>' +
            '<li>Cada <strong>passphrase diferente</strong> que você usa com essa seed cria um <strong>galho</strong> completamente novo. Cada galho é uma carteira independente, com endereços diferentes, saldo diferente, histórico diferente.</li>' +
            '<li>Você pode criar <strong>quantos galhos quiser</strong>. Um tronco suporta infinitos galhos.</li>' +
            '<li>Cada galho não sabe que os outros existem. Quem tem acesso a um galho não consegue ver, acessar ou descobrir os outros.</li>' +
          '</ul>' +
          '<p><strong>Exemplo prático:</strong> João tem 3 filhos: Ana, Pedro e Maria. João tem uma única seed (o tronco). Ele cria 3 passphrases diferentes:</p>' +
          '<ul>' +
            '<li>Passphrase "alphaOmega42sun" gera a carteira da Ana</li>' +
            '<li>Passphrase "betaDelta99moon" gera a carteira do Pedro</li>' +
            '<li>Passphrase "gammaEpsilon77star" gera a carteira da Maria</li>' +
          '</ul>' +
          '<p>Cada filho receberá APENAS sua própria passphrase em uma carta lacrada. Nenhum filho sabe quanto os outros receberam. Nenhum filho consegue acessar a carteira dos irmãos. João distribui os bitcoins entre as 3 carteiras conforme deseja.</p>' +
          '<p><strong>O risco crítico:</strong> se o tronco (seed) for perdido, <strong>TODOS os galhos morrem</strong>. Ana, Pedro e Maria perdem tudo, mesmo tendo suas passphrases. A passphrase sozinha, sem a seed, é inútil. Por isso, proteger a seed é a prioridade número 1 deste método.</p>',
        tip: 'Pense na seed como a raiz da árvore e as passphrases como os galhos. Muitos galhos podem crescer de um único tronco, mas se a raiz morre, toda a árvore morre.'
      },

      // Step 3 ─ Trade-offs
      {
        title: 'Trade-offs deste método',
        content:
          '<p>Antes de prosseguir, entenda os pontos fortes e fracos deste método:</p>' +
          '<div class="tradeoffs">' +
            '<div class="tradeoffs-pros">' +
              '<h4>Pros</h4>' +
              '<ul>' +
                '<li><strong>Uma seed, infinitos herdeiros:</strong> você não precisa de múltiplas hardware wallets nem de setups complexos. Uma única seed serve para toda a família.</li>' +
                '<li><strong>Privacidade entre herdeiros:</strong> cada herdeiro só conhece sua própria passphrase. Ninguém sabe quanto os outros receberam ou se existem outros galhos.</li>' +
                '<li><strong>Negação plausível:</strong> a carteira SEM passphrase (só a seed pura) pode conter um valor pequeno de "isca". Se alguém te forçar a revelar seus bitcoins, você mostra essa carteira.</li>' +
                '<li><strong>Escalável:</strong> precisa adicionar mais um herdeiro? Crie mais uma passphrase. Não afeta nenhum dos galhos existentes.</li>' +
                '<li><strong>Mudar alocação é simples:</strong> quer dar mais para um filho? Basta mover bitcoin entre os galhos. Não muda a estrutura do plano.</li>' +
                '<li><strong>Relativamente simples:</strong> com uma hardware wallet que suporta passphrase, o setup técnico é direto.</li>' +
              '</ul>' +
            '</div>' +
            '<div class="tradeoffs-cons">' +
              '<h4>Contras</h4>' +
              '<ul>' +
                '<li><strong>Ponto único de falha catastrófico:</strong> se a seed (tronco) for perdida, TODOS os herdeiros perdem acesso. Diferente de multisig, não há redundância no tronco.</li>' +
                '<li><strong>Cada passphrase precisa de backup separado:</strong> você precisa criar, armazenar e distribuir uma passphrase diferente para cada herdeiro. Mais herdeiros = mais logística.</li>' +
                '<li><strong>Exige hardware wallet:</strong> não é possível fazer isso com carteiras mobile simples.</li>' +
                '<li><strong>Herdeiros precisam de instruções claras:</strong> cada herdeiro precisa saber como combinar a seed + passphrase para recuperar a carteira. Sem essas instruções, a passphrase sozinha é inútil.</li>' +
                '<li><strong>Passphrase esquecida = fundos perdidos para sempre:</strong> se um herdeiro perder ou esquecer sua passphrase, não há recuperação. Uma passphrase errada não dá erro, simplesmente gera uma carteira diferente e vazia.</li>' +
              '</ul>' +
            '</div>' +
          '</div>'
      },

      // Step 4 ─ Planeje a estrutura
      {
        title: 'Planeje a estrutura',
        content:
          '<p>Antes de tocar na hardware wallet, planeje tudo no papel. Você precisa definir:</p>' +
          '<ol>' +
            '<li><strong>Quantos herdeiros:</strong> liste todos os nomes.</li>' +
            '<li><strong>Quanto para cada um:</strong> defina a alocação percentual ou em BTC/sats para cada galho.</li>' +
            '<li><strong>Uma passphrase para cada:</strong> crie passphrases que sejam seguras mas possíveis de registrar sem erro.</li>' +
          '</ol>' +
          '<p><strong>Regras para criar boas passphrases:</strong></p>' +
          '<ul>' +
            '<li>Mínimo 12 caracteres (quanto mais longa, mais segura)</li>' +
            '<li>Misture letras maiúsculas, minúsculas, números e símbolos</li>' +
            '<li>NUNCA use nomes de familiares, datas de nascimento, nomes de pets ou palavras óbvias</li>' +
            '<li>Cada passphrase deve ser totalmente diferente das outras (não use variações como "senha1", "senha2")</li>' +
            '<li>Evite caracteres que podem ser confundidos: O/0, l/1, I/l</li>' +
          '</ul>' +
          '<p><strong>Exemplo de tabela de planejamento:</strong></p>' +
          '<table>' +
            '<tr><th>Herdeiro</th><th>Passphrase</th><th>Alocação</th><th>Endereço de verificação</th></tr>' +
            '<tr><td>Ana</td><td>alphaOmega42sun!</td><td>40%</td><td>(preencher após criar)</td></tr>' +
            '<tr><td>Pedro</td><td>betaDelta99moon#</td><td>35%</td><td>(preencher após criar)</td></tr>' +
            '<tr><td>Maria</td><td>gammaEpsilon77star$</td><td>25%</td><td>(preencher após criar)</td></tr>' +
          '</table>' +
          '<p>Guarde esta tabela em local seguro. Ela é seu mapa mestre e contém TODAS as passphrases. Nenhum herdeiro deve vê-la.</p>',
        tip: 'Escreva as passphrases a mão, com letras claras e legíveis. Letras maiúsculas e minúsculas importam. Um único caractere errado gera uma carteira completamente diferente.'
      },

      // Step 5 ─ Crie as carteiras na hardware wallet
      {
        title: 'Crie as carteiras na hardware wallet',
        content:
          '<p>Agora você vai criar cada carteira (galho) na hardware wallet. O processo geral é:</p>' +
          '<ol>' +
            '<li><strong>Conecte a hardware wallet</strong> ao computador e abra o Sparrow Wallet.</li>' +
            '<li><strong>Carregue sua seed</strong> na hardware wallet (se ainda não estiver carregada).</li>' +
            '<li><strong>Ative a função passphrase</strong> no menu da hardware wallet. Em cada modelo isso está em um lugar diferente:' +
              '<ul>' +
                '<li>Coldcard: Settings > Passphrase</li>' +
                '<li>Trezor: aparece na tela ao conectar, se habilitado</li>' +
                '<li>Jade/Krux: verificar documentação do fabricante</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>Digite a primeira passphrase</strong> (ex: a da Ana). A hardware wallet agora está operando nessa carteira derivada.</li>' +
            '<li><strong>Conecte ao Sparrow Wallet</strong> e importe a carteira. O Sparrow mostrará os endereços dessa carteira.</li>' +
            '<li><strong>Anote o primeiro endereço de recebimento</strong> (bc1...). Este é o "fingerprint" que você usará para verificar depois que a passphrase está correta.</li>' +
            '<li><strong>Repita</strong> para cada passphrase (Pedro, Maria, etc.). Cada vez, desconecte a carteira anterior no Sparrow e conecte com a nova passphrase.</li>' +
          '</ol>' +
          '<p>No Sparrow, você pode salvar cada carteira com um nome descritivo (ex: "Herança-Ana", "Herança-Pedro"). Isso facilita gerenciar múltiplas carteiras.</p>' +
          '<p><strong>Dica de organização:</strong> preencha a coluna "Endereço de verificação" na sua tabela de planejamento com o primeiro endereço de cada carteira. Esse endereço será usado no próximo passo para confirmar que tudo está correto.</p>'
      },

      // Step 6 ─ Verifique cada carteira
      {
        title: 'Verifique cada carteira',
        content:
          '<p>Este passo é <strong>obrigatório e inegociável</strong>. Você DEVE verificar que cada passphrase gera a carteira correta antes de enviar qualquer bitcoin.</p>' +
          '<p>Para CADA passphrase:</p>' +
          '<ol>' +
            '<li><strong>Desconecte</strong> a carteira atual do Sparrow.</li>' +
            '<li><strong>Na hardware wallet</strong>, insira a seed novamente (ou reinicie o dispositivo).</li>' +
            '<li><strong>Digite a passphrase</strong> exatamente como você anotou, caractere por caractere.</li>' +
            '<li><strong>Conecte ao Sparrow</strong> e verifique: o primeiro endereço de recebimento é <strong>idêntico</strong> ao que você anotou na tabela?</li>' +
            '<li>Se sim: a passphrase está correta. Passe para a próxima.</li>' +
            '<li>Se não: você digitou a passphrase errada. Verifique maiúsculas/minúsculas, espaços, acentos. Tente novamente.</li>' +
          '</ol>' +
          '<p>Faça isso para TODAS as passphrases. Não pule este passo. Uma verificação agora evita um desastre depois.</p>',
        warning: 'Uma passphrase errada não dá erro. Ela simplesmente gera uma carteira diferente e vazia. Se você digitou errado ao criar e enviou bitcoin para lá, só consegue recuperar com a passphrase EXATA que usou. Por isso a verificação é obrigatória.'
      },

      // Step 7 ─ Distribua bitcoins entre os galhos
      {
        title: 'Distribua bitcoins entre os galhos',
        content:
          '<p>Com todas as carteiras criadas e verificadas, chegou a hora de enviar os bitcoins para cada galho.</p>' +
          '<ol>' +
            '<li><strong>Abra a carteira de origem</strong> (onde seus bitcoins estão atualmente) no Sparrow.</li>' +
            '<li><strong>Envie a quantia planejada</strong> para o endereço de recebimento de cada carteira-galho. Use a tabela de planejamento como guia.</li>' +
            '<li><strong>Espere a confirmação</strong> de cada transação (pelo menos 1 confirmação, idealmente 3+).</li>' +
            '<li><strong>Verifique o saldo</strong> em cada carteira-galho conectando ao Sparrow com a respectiva passphrase.</li>' +
          '</ol>' +
          '<p><strong>Estratégia da carteira-isca (negação plausível):</strong></p>' +
          '<p>Considere manter um pequeno saldo na carteira SEM passphrase (apenas a seed pura). Se alguém te forçar a revelar seus bitcoins, você mostra essa carteira. A pessoa verá um saldo pequeno e não terá como saber que existem outras carteiras protegidas por passphrase. Esta é a chamada <strong>negação plausível</strong> (plausible deniability).</p>' +
          '<p>Exemplo: se você tem 1 BTC no total, pode deixar 0.01 BTC na carteira sem passphrase e distribuir 0.99 BTC entre os galhos dos herdeiros.</p>',
        tip: 'Comece enviando valores pequenos para cada carteira-galho como teste. Verifique que consegue ver o saldo conectando com a passphrase correta. Só depois envie os valores maiores.'
      },

      // Step 8 ─ Escreva carta individual para cada herdeiro
      {
        title: 'Escreva carta individual para cada herdeiro',
        content:
          '<p>Cada herdeiro recebe uma <strong>carta personalizada, lacrada e confidencial</strong>. A carta contém apenas as informações que aquele herdeiro específico precisa.</p>' +
          '<p><strong>O que incluir na carta de cada herdeiro:</strong></p>' +
          '<ol>' +
            '<li><strong>A passphrase deste herdeiro</strong> (e SOMENTE esta passphrase). Escrita de forma clara, com distinção explícita entre maiúsculas e minúsculas.</li>' +
            '<li><strong>Instruções sobre como encontrar a seed</strong>: "A seed está guardada em [local]. Você precisará combiná-la com sua passphrase." O herdeiro NAO recebe a seed na carta.</li>' +
            '<li><strong>Instruções de recuperação passo a passo:</strong>' +
              '<ul>' +
                '<li>Baixe o Sparrow Wallet em sparrowwallet.com</li>' +
                '<li>Escolha "New Wallet" > "Import"</li>' +
                '<li>Insira as 12/24 palavras da seed</li>' +
                '<li>No campo "Passphrase", digite exatamente: [passphrase]</li>' +
                '<li>A carteira deve mostrar seu saldo de bitcoin</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>O que NAO fazer:</strong> nunca digitar a seed ou passphrase em sites, nunca compartilhar com "suporte técnico", nunca tirar foto.</li>' +
            '<li><strong>Contato de emergência:</strong> nome de uma pessoa de confiança que pode ajudar tecnicamente (mas que NAO tem a passphrase nem a seed).</li>' +
          '</ol>' +
          '<p><strong>O que NAO incluir na carta:</strong></p>' +
          '<ul>' +
            '<li>A seed phrase (ela está armazenada separadamente)</li>' +
            '<li>Informações sobre outros herdeiros ou outras passphrases</li>' +
            '<li>O valor total do seu patrimônio em bitcoin</li>' +
          '</ul>',
        tip: 'Escreva a carta como se estivesse explicando para alguém que nunca usou Bitcoin. Seu herdeiro pode estar em luto e estressado. Quanto mais claro e simples, melhor.'
      },

      // Step 9 ─ Proteja o tronco (seed)
      {
        title: 'Proteja o tronco (seed)',
        content:
          '<p>A seed é o <strong>ponto mais crítico</strong> de todo o plano. Se ela for perdida, TODOS os herdeiros perdem acesso. Se ela for roubada, quem tiver a seed + qualquer passphrase acessa aquele galho.</p>' +
          '<p><strong>Opções de armazenamento da seed:</strong></p>' +
          '<ul>' +
            '<li><strong>Placa de metal em cofre bancário:</strong> resistente a fogo e água. O cofre bancário adiciona segurança física. Custo: placa de metal (~R$100-300) + aluguel de cofre (~R$200-800/ano).</li>' +
            '<li><strong>Dividida entre locais:</strong> guarde metade das palavras em um local e metade em outro. Isso adiciona redundância geográfica, mas aumenta a complexidade.</li>' +
            '<li><strong>Com advogado em envelope lacrado:</strong> o advogado guarda a seed em um envelope que só pode ser aberto após confirmação de óbito. Isso fornece legitimidade legal.</li>' +
            '<li><strong>Combinação:</strong> placa de metal no cofre + cópia em papel com o advogado. Redundância é o princípio-chave.</li>' +
          '</ul>' +
          '<p><strong>Regras fundamentais:</strong></p>' +
          '<ul>' +
            '<li>A seed e a passphrase <strong>NUNCA devem estar no mesmo local</strong>. Se alguém encontrar os dois juntos, pode acessar a carteira.</li>' +
            '<li>Os herdeiros precisam saber <strong>ONDE</strong> a seed está (ou quem a tem), mas não precisam ter acesso direto a ela em vida.</li>' +
            '<li>Tenha pelo menos <strong>2 cópias</strong> da seed em locais diferentes.</li>' +
            '<li>Instrua pelo menos 2 pessoas de confiança sobre a existência e localização do plano.</li>' +
          '</ul>',
        warning: 'Perder a seed significa perder TODOS os galhos. Não confie em uma única cópia. Redundância é sobrevivência.'
      },

      // Step 10 ─ Teste o plano
      {
        title: 'Teste o plano completo',
        content:
          '<p>Um plano de herança que nunca foi testado não é um plano. É uma esperança. Teste <strong>cada parte</strong> do fluxo.</p>' +
          '<p><strong>Checklist de teste para cada herdeiro:</strong></p>' +
          '<ol>' +
            '<li><strong>O herdeiro consegue encontrar a seed?</strong> Simule o cenário: você morreu. O herdeiro sabe onde ir para obter a seed? Tem acesso ao cofre, ao advogado, ao local?</li>' +
            '<li><strong>O herdeiro consegue encontrar sua passphrase?</strong> A carta está em local acessível? O herdeiro sabe que ela existe?</li>' +
            '<li><strong>O herdeiro consegue restaurar a carteira?</strong> Peça para alguém de confiança (ou o próprio herdeiro, se apropriado) seguir as instruções da carta e restaurar a carteira no Sparrow. Os endereços batem? O saldo aparece?</li>' +
            '<li><strong>As instruções fazem sentido para uma pessoa não-técnica?</strong> Peça para alguém que não entende de Bitcoin ler a carta. Eles entendem o que fazer?</li>' +
          '</ol>' +
          '<p><strong>Teste com valores pequenos:</strong> envie uma quantia simbólica (ex: 10.000 sats) para cada carteira-galho. Tente restaurar. Tente enviar de volta. Se funcionar com pouco, funciona com muito.</p>' +
          '<p><strong>Revisão periódica (mínimo anual):</strong></p>' +
          '<ul>' +
            '<li>A seed ainda está no local esperado e legível?</li>' +
            '<li>As passphrases ainda estão seguras e legíveis?</li>' +
            '<li>Algum herdeiro mudou de endereço, faleceu, ou a relação mudou?</li>' +
            '<li>O software (Sparrow) ainda está disponível e funcional?</li>' +
            '<li>O advogado ou custodiante ainda está ativo e acessível?</li>' +
          '</ul>' +
          '<p>Atualize o plano sempre que algo mudar. Um plano desatualizado é quase tão ruim quanto nenhum plano.</p>'
      }
    ],

    en: [
      // Step 1 ─ Prerequisites
      {
        title: 'Prerequisites',
        content:
          '<p>Before starting, you need:</p>' +
          '<ul>' +
            '<li><strong>Hardware wallet with passphrase support</strong> (also called "25th word" or "extra password"). Compatible models: Coldcard, Trezor, Jade, Krux. Check your manufacturer\'s manual for passphrase support.</li>' +
            '<li><strong>Sparrow Wallet</strong> installed on your computer (download at <code>sparrowwallet.com</code>). This is the coordinator software you\'ll use to manage the wallets.</li>' +
            '<li><strong>Seed phrase already generated and securely stored</strong> (12 or 24 words). If you haven\'t done this yet, complete the offline seed generation tutorial first.</li>' +
            '<li><strong>Basic understanding of passphrase</strong>: a passphrase is an extra word or phrase that, combined with the seed, generates a completely different wallet. If you don\'t understand this concept yet, go back to the self-custody tutorial.</li>' +
          '</ul>' +
          '<p>Estimated cost: you should already have the hardware wallet from your custody setup. No additional cost beyond backup materials (metal plate, paper, envelope).</p>'
      },

      // Step 2 ─ The Trunk and Branches model
      {
        title: 'The Trunk and Branches model',
        content:
          '<p>This is the core concept of this method, and understanding it well is <strong>the difference between a plan that works and a disaster</strong>.</p>' +
          '<p>Imagine a tree:</p>' +
          '<ul>' +
            '<li>The <strong>seed phrase</strong> (12 or 24 words) is the <strong>trunk</strong> of the tree. It\'s the root of everything.</li>' +
            '<li>Each <strong>different passphrase</strong> you use with that seed creates a completely new <strong>branch</strong>. Each branch is an independent wallet with different addresses, different balance, different history.</li>' +
            '<li>You can create <strong>as many branches as you want</strong>. One trunk supports infinite branches.</li>' +
            '<li>Each branch doesn\'t know the others exist. Anyone with access to one branch cannot see, access, or discover the others.</li>' +
          '</ul>' +
          '<p><strong>Practical example:</strong> John has 3 children: Anna, Peter, and Mary. John has a single seed (the trunk). He creates 3 different passphrases:</p>' +
          '<ul>' +
            '<li>Passphrase "alphaOmega42sun" generates Anna\'s wallet</li>' +
            '<li>Passphrase "betaDelta99moon" generates Peter\'s wallet</li>' +
            '<li>Passphrase "gammaEpsilon77star" generates Mary\'s wallet</li>' +
          '</ul>' +
          '<p>Each child will receive ONLY their own passphrase in a sealed letter. No child knows how much the others received. No child can access any other sibling\'s wallet. John distributes the bitcoin among the 3 wallets as he wishes.</p>' +
          '<p><strong>The critical risk:</strong> if the trunk (seed) is lost, <strong>ALL branches die</strong>. Anna, Peter, and Mary lose everything, even though they have their passphrases. A passphrase alone, without the seed, is useless. That\'s why protecting the seed is the number 1 priority of this method.</p>',
        tip: 'Think of the seed as the root of the tree and the passphrases as the branches. Many branches can grow from a single trunk, but if the root dies, the entire tree dies.'
      },

      // Step 3 ─ Trade-offs
      {
        title: 'Trade-offs of this method',
        content:
          '<p>Before proceeding, understand the strengths and weaknesses of this method:</p>' +
          '<div class="tradeoffs">' +
            '<div class="tradeoffs-pros">' +
              '<h4>Pros</h4>' +
              '<ul>' +
                '<li><strong>One seed, infinite heirs:</strong> you don\'t need multiple hardware wallets or complex setups. A single seed serves the entire family.</li>' +
                '<li><strong>Privacy between heirs:</strong> each heir only knows their own passphrase. Nobody knows how much the others received or if other branches exist.</li>' +
                '<li><strong>Plausible deniability:</strong> the wallet WITHOUT passphrase (just the raw seed) can hold a small "decoy" amount. If someone forces you to reveal your bitcoin, you show this wallet.</li>' +
                '<li><strong>Scalable:</strong> need to add another heir? Create another passphrase. It doesn\'t affect any existing branches.</li>' +
                '<li><strong>Easy to change allocation:</strong> want to give more to one child? Just move bitcoin between branches. The plan structure doesn\'t change.</li>' +
                '<li><strong>Relatively simple:</strong> with a hardware wallet that supports passphrase, the technical setup is straightforward.</li>' +
              '</ul>' +
            '</div>' +
            '<div class="tradeoffs-cons">' +
              '<h4>Cons</h4>' +
              '<ul>' +
                '<li><strong>Catastrophic single point of failure:</strong> if the seed (trunk) is lost, ALL heirs lose access. Unlike multisig, there is no redundancy for the trunk.</li>' +
                '<li><strong>Each passphrase needs separate backup:</strong> you need to create, store, and distribute a different passphrase for each heir. More heirs = more logistics.</li>' +
                '<li><strong>Requires hardware wallet:</strong> this cannot be done with simple mobile wallets.</li>' +
                '<li><strong>Heirs need clear instructions:</strong> each heir must know how to combine seed + passphrase to recover the wallet. Without these instructions, the passphrase alone is useless.</li>' +
                '<li><strong>Forgotten passphrase = funds lost forever:</strong> if an heir loses or forgets their passphrase, there is no recovery. A wrong passphrase doesn\'t give an error; it simply generates a different, empty wallet.</li>' +
              '</ul>' +
            '</div>' +
          '</div>'
      },

      // Step 4 ─ Plan the structure
      {
        title: 'Plan the structure',
        content:
          '<p>Before touching the hardware wallet, plan everything on paper. You need to define:</p>' +
          '<ol>' +
            '<li><strong>How many heirs:</strong> list all names.</li>' +
            '<li><strong>How much for each:</strong> define the percentage or BTC/sats allocation for each branch.</li>' +
            '<li><strong>One passphrase for each:</strong> create passphrases that are secure but possible to record without errors.</li>' +
          '</ol>' +
          '<p><strong>Rules for creating good passphrases:</strong></p>' +
          '<ul>' +
            '<li>Minimum 12 characters (the longer, the more secure)</li>' +
            '<li>Mix uppercase, lowercase, numbers, and symbols</li>' +
            '<li>NEVER use family names, birthdays, pet names, or obvious words</li>' +
            '<li>Each passphrase must be completely different from the others (don\'t use variations like "password1", "password2")</li>' +
            '<li>Avoid characters that can be confused: O/0, l/1, I/l</li>' +
          '</ul>' +
          '<p><strong>Example planning table:</strong></p>' +
          '<table>' +
            '<tr><th>Heir</th><th>Passphrase</th><th>Allocation</th><th>Verification address</th></tr>' +
            '<tr><td>Anna</td><td>alphaOmega42sun!</td><td>40%</td><td>(fill after creation)</td></tr>' +
            '<tr><td>Peter</td><td>betaDelta99moon#</td><td>35%</td><td>(fill after creation)</td></tr>' +
            '<tr><td>Mary</td><td>gammaEpsilon77star$</td><td>25%</td><td>(fill after creation)</td></tr>' +
          '</table>' +
          '<p>Keep this table in a secure location. It is your master map and contains ALL passphrases. No heir should ever see it.</p>',
        tip: 'Write the passphrases by hand, with clear, legible letters. Uppercase and lowercase matter. A single wrong character generates a completely different wallet.'
      },

      // Step 5 ─ Create wallets on the hardware wallet
      {
        title: 'Create wallets on the hardware wallet',
        content:
          '<p>Now you\'ll create each wallet (branch) on the hardware wallet. The general process is:</p>' +
          '<ol>' +
            '<li><strong>Connect the hardware wallet</strong> to the computer and open Sparrow Wallet.</li>' +
            '<li><strong>Load your seed</strong> onto the hardware wallet (if not already loaded).</li>' +
            '<li><strong>Activate the passphrase function</strong> in the hardware wallet menu. Each model has it in a different place:' +
              '<ul>' +
                '<li>Coldcard: Settings > Passphrase</li>' +
                '<li>Trezor: appears on screen when connecting, if enabled</li>' +
                '<li>Jade/Krux: check manufacturer documentation</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>Enter the first passphrase</strong> (e.g., Anna\'s). The hardware wallet is now operating on that derived wallet.</li>' +
            '<li><strong>Connect to Sparrow Wallet</strong> and import the wallet. Sparrow will show the addresses for this wallet.</li>' +
            '<li><strong>Write down the first receive address</strong> (bc1...). This is the "fingerprint" you\'ll use to verify later that the passphrase is correct.</li>' +
            '<li><strong>Repeat</strong> for each passphrase (Peter, Mary, etc.). Each time, disconnect the previous wallet in Sparrow and connect with the new passphrase.</li>' +
          '</ol>' +
          '<p>In Sparrow, you can save each wallet with a descriptive name (e.g., "Inheritance-Anna", "Inheritance-Peter"). This makes managing multiple wallets easier.</p>' +
          '<p><strong>Organization tip:</strong> fill in the "Verification address" column in your planning table with the first address from each wallet. This address will be used in the next step to confirm everything is correct.</p>'
      },

      // Step 6 ─ Verify each wallet
      {
        title: 'Verify each wallet',
        content:
          '<p>This step is <strong>mandatory and non-negotiable</strong>. You MUST verify that each passphrase generates the correct wallet before sending any bitcoin.</p>' +
          '<p>For EACH passphrase:</p>' +
          '<ol>' +
            '<li><strong>Disconnect</strong> the current wallet from Sparrow.</li>' +
            '<li><strong>On the hardware wallet</strong>, enter the seed again (or restart the device).</li>' +
            '<li><strong>Enter the passphrase</strong> exactly as you wrote it down, character by character.</li>' +
            '<li><strong>Connect to Sparrow</strong> and verify: is the first receive address <strong>identical</strong> to what you wrote in the table?</li>' +
            '<li>If yes: the passphrase is correct. Move to the next one.</li>' +
            '<li>If no: you entered the passphrase wrong. Check uppercase/lowercase, spaces, accents. Try again.</li>' +
          '</ol>' +
          '<p>Do this for ALL passphrases. Do not skip this step. A verification now prevents a disaster later.</p>',
        warning: 'A wrong passphrase does not give an error. It simply generates a different, empty wallet. If you made a typo when creating it and sent bitcoin there, you can only recover it with the EXACT passphrase you used. That\'s why verification is mandatory.'
      },

      // Step 7 ─ Distribute bitcoin among branches
      {
        title: 'Distribute bitcoin among branches',
        content:
          '<p>With all wallets created and verified, it\'s time to send bitcoin to each branch.</p>' +
          '<ol>' +
            '<li><strong>Open the source wallet</strong> (where your bitcoin currently is) in Sparrow.</li>' +
            '<li><strong>Send the planned amount</strong> to the receive address of each branch wallet. Use the planning table as your guide.</li>' +
            '<li><strong>Wait for confirmation</strong> of each transaction (at least 1 confirmation, ideally 3+).</li>' +
            '<li><strong>Verify the balance</strong> in each branch wallet by connecting to Sparrow with the respective passphrase.</li>' +
          '</ol>' +
          '<p><strong>Decoy wallet strategy (plausible deniability):</strong></p>' +
          '<p>Consider keeping a small balance in the wallet WITHOUT passphrase (seed only). If someone forces you to reveal your bitcoin, you show this wallet. The person will see a small balance and have no way to know that other passphrase-protected wallets exist. This is called <strong>plausible deniability</strong>.</p>' +
          '<p>Example: if you have 1 BTC total, you could leave 0.01 BTC in the no-passphrase wallet and distribute 0.99 BTC among the heir branches.</p>',
        tip: 'Start by sending small amounts to each branch wallet as a test. Verify you can see the balance by connecting with the correct passphrase. Only then send larger amounts.'
      },

      // Step 8 ─ Write individual letter for each heir
      {
        title: 'Write individual letter for each heir',
        content:
          '<p>Each heir receives a <strong>personalized, sealed, and confidential letter</strong>. The letter contains only the information that specific heir needs.</p>' +
          '<p><strong>What to include in each heir\'s letter:</strong></p>' +
          '<ol>' +
            '<li><strong>This heir\'s passphrase</strong> (and ONLY this passphrase). Written clearly, with explicit distinction between uppercase and lowercase.</li>' +
            '<li><strong>Instructions on how to find the seed</strong>: "The seed is stored at [location]. You will need to combine it with your passphrase." The heir does NOT receive the seed in the letter.</li>' +
            '<li><strong>Step-by-step recovery instructions:</strong>' +
              '<ul>' +
                '<li>Download Sparrow Wallet at sparrowwallet.com</li>' +
                '<li>Choose "New Wallet" > "Import"</li>' +
                '<li>Enter the 12/24 seed words</li>' +
                '<li>In the "Passphrase" field, type exactly: [passphrase]</li>' +
                '<li>The wallet should show your bitcoin balance</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>What NOT to do:</strong> never enter the seed or passphrase on websites, never share with "tech support", never take a photo.</li>' +
            '<li><strong>Emergency contact:</strong> name of a trusted person who can help technically (but who does NOT have the passphrase or seed).</li>' +
          '</ol>' +
          '<p><strong>What NOT to include in the letter:</strong></p>' +
          '<ul>' +
            '<li>The seed phrase (it\'s stored separately)</li>' +
            '<li>Information about other heirs or other passphrases</li>' +
            '<li>The total value of your bitcoin holdings</li>' +
          '</ul>',
        tip: 'Write the letter as if you\'re explaining to someone who has never used Bitcoin. Your heir may be grieving and stressed. The clearer and simpler, the better.'
      },

      // Step 9 ─ Protect the trunk (seed)
      {
        title: 'Protect the trunk (seed)',
        content:
          '<p>The seed is the <strong>most critical point</strong> of the entire plan. If it\'s lost, ALL heirs lose access. If it\'s stolen, anyone with the seed + any passphrase can access that branch.</p>' +
          '<p><strong>Seed storage options:</strong></p>' +
          '<ul>' +
            '<li><strong>Metal plate in safe deposit box:</strong> resistant to fire and water. The safe deposit box adds physical security.</li>' +
            '<li><strong>Split between locations:</strong> store half the words in one location and half in another. This adds geographic redundancy but increases complexity.</li>' +
            '<li><strong>With a lawyer in a sealed envelope:</strong> the lawyer keeps the seed in an envelope that can only be opened after death confirmation. This provides legal legitimacy.</li>' +
            '<li><strong>Combination:</strong> metal plate in safe deposit box + paper copy with the lawyer. Redundancy is the key principle.</li>' +
          '</ul>' +
          '<p><strong>Fundamental rules:</strong></p>' +
          '<ul>' +
            '<li>The seed and passphrase <strong>must NEVER be in the same location</strong>. If someone finds both together, they can access the wallet.</li>' +
            '<li>Heirs need to know <strong>WHERE</strong> the seed is (or who has it), but they don\'t need direct access to it while you\'re alive.</li>' +
            '<li>Have at least <strong>2 copies</strong> of the seed in different locations.</li>' +
            '<li>Instruct at least 2 trusted people about the existence and location of the plan.</li>' +
          '</ul>',
        warning: 'Losing the seed means losing ALL branches. Do not rely on a single copy. Redundancy is survival.'
      },

      // Step 10 ─ Test the plan
      {
        title: 'Test the complete plan',
        content:
          '<p>An inheritance plan that has never been tested is not a plan. It\'s a hope. Test <strong>every part</strong> of the flow.</p>' +
          '<p><strong>Test checklist for each heir:</strong></p>' +
          '<ol>' +
            '<li><strong>Can the heir find the seed?</strong> Simulate the scenario: you died. Does the heir know where to go to get the seed? Do they have access to the safe, the lawyer, the location?</li>' +
            '<li><strong>Can the heir find their passphrase?</strong> Is the letter in an accessible location? Does the heir know it exists?</li>' +
            '<li><strong>Can the heir restore the wallet?</strong> Ask a trusted person (or the heir themselves, if appropriate) to follow the letter\'s instructions and restore the wallet in Sparrow. Do the addresses match? Does the balance show up?</li>' +
            '<li><strong>Do the instructions make sense to a non-technical person?</strong> Ask someone who doesn\'t understand Bitcoin to read the letter. Do they understand what to do?</li>' +
          '</ol>' +
          '<p><strong>Test with small amounts:</strong> send a symbolic amount (e.g., 10,000 sats) to each branch wallet. Try to restore. Try to send back. If it works with a little, it works with a lot.</p>' +
          '<p><strong>Periodic review (minimum yearly):</strong></p>' +
          '<ul>' +
            '<li>Is the seed still in the expected location and legible?</li>' +
            '<li>Are the passphrases still secure and legible?</li>' +
            '<li>Has any heir changed address, passed away, or has the relationship changed?</li>' +
            '<li>Is the software (Sparrow) still available and functional?</li>' +
            '<li>Is the lawyer or custodian still active and accessible?</li>' +
          '</ul>' +
          '<p>Update the plan whenever something changes. An outdated plan is almost as bad as no plan at all.</p>'
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // Method 4: Multisig Distribuído
  // ────────────────────────────────────────────────────────────
  multisigHeranca: {
    pt: [
      // Step 1 ─ Pré-requisitos
      {
        title: 'Pré-requisitos',
        content:
          '<p>O multisig para herança é o método mais robusto (entre os que não usam Liana), mas exige mais equipamento e planejamento. Você precisa de:</p>' +
          '<ul>' +
            '<li><strong>2 ou mais hardware wallets de fabricantes diferentes</strong> (ex: Coldcard + Jade, ou Trezor + Coldcard). Usar fabricantes diferentes protege contra falhas de um único fabricante (supply chain attack).</li>' +
            '<li><strong>Sparrow Wallet ou Nunchuk</strong> como software coordenador. O Sparrow é gratuito e roda no computador. O Nunchuk é um app mobile/desktop com foco em multisig e pode simplificar a experiência.</li>' +
            '<li><strong>Entendimento de multisig:</strong> uma carteira que exige M de N assinaturas para gastar (ex: 2-de-3 = qualquer 2 de 3 chaves precisam assinar). Se você não entende multisig, volte ao tutorial de auto-custódia.</li>' +
          '</ul>' +
          '<p>Custo estimado: 2 hardware wallets (R$800-2.500 cada, dependendo do modelo). Este é o método mais caro em termos de equipamento, mas oferece a segurança mais forte.</p>'
      },

      // Step 2 ─ Como funciona multisig para herança
      {
        title: 'Como funciona multisig para herança',
        content:
          '<p>O modelo clássico para herança é o <strong>2-de-3</strong>: existem 3 chaves, e qualquer combinação de 2 delas pode autorizar uma transação. Nenhuma chave sozinha consegue mover os bitcoins.</p>' +
          '<p><strong>Distribuição típica das 3 chaves:</strong></p>' +
          '<ol>' +
            '<li><strong>Chave 1 — O herdeiro:</strong> recebe uma hardware wallet com uma das chaves. Ele pode iniciar uma transação, mas não pode completá-la sozinho.</li>' +
            '<li><strong>Chave 2 — Advogado ou notário:</strong> guarda outra chave. Tem instruções para usar somente após confirmação de óbito ou incapacidade. Fornece legitimidade legal ao processo.</li>' +
            '<li><strong>Chave 3 — Cofre bancário ou terceiro de confiança:</strong> a terceira chave fica em um local seguro (cofre bancário) ou com uma terceira pessoa de confiança. Serve como backup.</li>' +
          '</ol>' +
          '<p><strong>Como isso funciona na prática após sua morte:</strong></p>' +
          '<ul>' +
            '<li>O herdeiro (Chave 1) contacta o advogado (Chave 2).</li>' +
            '<li>O advogado verifica a certidão de óbito e autoriza o uso de sua chave.</li>' +
            '<li>Com 2 das 3 chaves, eles assinam a transação e movem os bitcoins para a carteira do herdeiro.</li>' +
          '</ul>' +
          '<p><strong>Por que isso é seguro:</strong></p>' +
          '<ul>' +
            '<li>Se o herdeiro tentar roubar antes da sua morte, ele só tem 1 chave. Precisa de mais 1.</li>' +
            '<li>Se o advogado tentar roubar, ele só tem 1 chave. Precisa de mais 1.</li>' +
            '<li>Se uma chave for perdida ou roubada, as outras 2 ainda podem mover os fundos (redundância).</li>' +
            '<li>Se uma hardware wallet quebrar, a seed daquela chave pode ser restaurada em um novo dispositivo.</li>' +
          '</ul>'
      },

      // Step 3 ─ Trade-offs
      {
        title: 'Trade-offs deste método',
        content:
          '<p>Entenda os pontos fortes e fracos antes de prosseguir:</p>' +
          '<div class="tradeoffs">' +
            '<div class="tradeoffs-pros">' +
              '<h4>Pros</h4>' +
              '<ul>' +
                '<li><strong>Nenhum ponto único de falha:</strong> diferente do método passphrase (onde a seed é um ponto único), aqui nenhuma chave sozinha pode comprometer os fundos. Perder 1 chave não é catastrófico.</li>' +
                '<li><strong>Tolerância a perda ou roubo:</strong> se 1 das 3 chaves for perdida, roubada ou destruída, as outras 2 ainda conseguem mover os fundos. Você tem tempo para recriar a carteira com uma nova chave.</li>' +
                '<li><strong>Segurança de nível profissional:</strong> multisig é o padrão usado por exchanges, custodiantes institucionais e tesouros corporativos. É o modelo mais testado e comprovado.</li>' +
                '<li><strong>Legitimidade legal:</strong> o envolvimento de um advogado como co-signatário adiciona uma camada de legitimidade que pode ser útil em disputas familiares.</li>' +
                '<li><strong>Funciona mesmo com hardware quebrado:</strong> se uma hardware wallet parar de funcionar, a seed daquela chave pode ser restaurada em outro dispositivo compatível.</li>' +
              '</ul>' +
            '</div>' +
            '<div class="tradeoffs-cons">' +
              '<h4>Contras</h4>' +
              '<ul>' +
                '<li><strong>Setup mais complexo:</strong> entre os métodos que não usam Liana, este é o mais complexo de configurar. Exige coordenar múltiplas hardware wallets e software.</li>' +
                '<li><strong>Custo de equipamento:</strong> você precisa de 2+ hardware wallets de fabricantes diferentes. Isso pode custar R$2.000-5.000+.</li>' +
                '<li><strong>O descriptor é crítico e fácil de esquecer:</strong> o arquivo de configuração da carteira (wallet descriptor) é tão importante quanto as seeds. Sem ele, mesmo com todas as 3 seeds, a reconstrução pode ser impossível ou extremamente difícil.</li>' +
                '<li><strong>Software coordenador precisa estar disponível:</strong> na hora da recuperação, o herdeiro precisa do Sparrow Wallet ou Nunchuk. Se o software não existir mais, a recuperação fica mais difícil (embora não impossível com o descriptor).</li>' +
                '<li><strong>Não escala facilmente para muitos herdeiros:</strong> diferente do método passphrase (1 seed para N herdeiros), cada novo herdeiro em multisig exige uma reestruturação significativa.</li>' +
                '<li><strong>Exige coordenação entre participantes:</strong> todos os detentores de chaves precisam entender seu papel e estar disponíveis quando necessário.</li>' +
                '<li><strong>O descriptor é tão importante quanto as seeds:</strong> perder o descriptor E uma das seeds pode trancar os fundos permanentemente.</li>' +
              '</ul>' +
            '</div>' +
          '</div>'
      },

      // Step 4 ─ Planeje a distribuição de chaves
      {
        title: 'Planeje a distribuição de chaves',
        content:
          '<p>Antes de configurar qualquer coisa, defina <strong>quem guarda cada chave</strong> e onde. Este é o design do seu sistema de segurança.</p>' +
          '<p><strong>Padrões comuns de distribuição (2-de-3):</strong></p>' +
          '<p><strong>Padrão A: Herdeiro + Advogado + Cofre</strong></p>' +
          '<ul>' +
            '<li>Chave 1: Herdeiro (hardware wallet em casa)</li>' +
            '<li>Chave 2: Advogado (seed em placa de metal no escritório)</li>' +
            '<li>Chave 3: Cofre bancário (seed em placa de metal)</li>' +
          '</ul>' +
          '<p><strong>Padrão B: Herdeiro + Cônjuge + Amigo de confiança</strong></p>' +
          '<ul>' +
            '<li>Chave 1: Herdeiro</li>' +
            '<li>Chave 2: Cônjuge/parceiro(a)</li>' +
            '<li>Chave 3: Amigo de longa data ou familiar distante</li>' +
          '</ul>' +
          '<p><strong>Considerações importantes:</strong></p>' +
          '<ul>' +
            '<li><strong>Diversidade geográfica:</strong> não coloque todas as chaves na mesma cidade. Um desastre natural (enchente, incêndio) pode comprometer múltiplas chaves simultaneamente.</li>' +
            '<li><strong>Relações estáveis:</strong> escolha pessoas com quem você espera manter relacionamento por décadas. Amigos de infância, irmãos, advogado de família.</li>' +
            '<li><strong>Conluio:</strong> pense em quais 2 pessoas poderiam se unir contra você. No padrão A, herdeiro + advogado poderiam agir juntos. Mas o advogado tem responsabilidade profissional (pode perder a licença).</li>' +
          '</ul>' +
          '<p><strong>Tabela de distribuição (preencha):</strong></p>' +
          '<table>' +
            '<tr><th>Chave</th><th>Custodiante</th><th>Local físico</th><th>Formato</th></tr>' +
            '<tr><td>Chave 1</td><td>Ex: Filho mais velho</td><td>Casa dele</td><td>Hardware wallet</td></tr>' +
            '<tr><td>Chave 2</td><td>Ex: Dr. Silva (advogado)</td><td>Escritório do advogado</td><td>Placa de metal em cofre</td></tr>' +
            '<tr><td>Chave 3</td><td>Ex: Cofre bancário</td><td>Banco X, agência Y</td><td>Placa de metal</td></tr>' +
          '</table>'
      },

      // Step 5 ─ Crie a carteira multisig
      {
        title: 'Crie a carteira multisig',
        content:
          '<p>Agora você vai criar a carteira multisig 2-de-3 usando o Sparrow Wallet como coordenador.</p>' +
          '<p><strong>Passo a passo:</strong></p>' +
          '<ol>' +
            '<li><strong>Abra o Sparrow Wallet</strong> e clique em "File" > "New Wallet".</li>' +
            '<li><strong>Dê um nome</strong> a carteira (ex: "Herança-Multisig").</li>' +
            '<li><strong>Em "Policy Type"</strong>, selecione "Multi Signature".</li>' +
            '<li><strong>Configure M-de-N:</strong> coloque M=2, N=3 (ou o esquema que você escolheu).</li>' +
            '<li><strong>Script Type:</strong> selecione "Native Segwit (P2WSH)" para taxas mais baixas.</li>' +
            '<li><strong>Para cada cosigner (chave):</strong>' +
              '<ul>' +
                '<li>Conecte a hardware wallet correspondente</li>' +
                '<li>Clique em "Import" para importar a xpub (chave pública estendida) daquela hardware wallet</li>' +
                '<li>O Sparrow mostrará a xpub importada com sucesso</li>' +
                '<li>Repita para cada uma das 3 hardware wallets</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>Clique em "Apply"</strong> para criar a carteira.</li>' +
            '<li><strong>Verifique:</strong> o Sparrow mostrará os primeiros endereços de recebimento. Eles devem começar com "bc1q" (para P2WSH) e serão mais longos que endereços normais.</li>' +
            '<li><strong>Em cada hardware wallet:</strong> verifique que o endereço mostrado no Sparrow bate com o endereço mostrado na tela da hardware wallet. Isso confirma que cada dispositivo reconhece a carteira multisig.</li>' +
          '</ol>' +
          '<p><strong>Importante:</strong> durante este processo, nenhuma chave privada sai da hardware wallet. O Sparrow só importa as chaves públicas (xpubs) para montar a carteira. As chaves privadas ficam sempre no dispositivo.</p>'
      },

      // Step 6 ─ Exporte o descriptor
      {
        title: 'Exporte e faça backup do descriptor',
        content:
          '<p>O <strong>wallet descriptor</strong> (arquivo de configuração da carteira) é a peça mais negligenciada e uma das mais importantes do multisig.</p>' +
          '<p><strong>O que é o descriptor:</strong> é um arquivo que contém as informações de como a carteira multisig foi montada: quais xpubs participam, qual o esquema (2-de-3), o tipo de script, e os caminhos de derivação. Sem ele, reconstruir a carteira exige saber TODOS esses detalhes de cabeça.</p>' +
          '<p><strong>Como exportar do Sparrow:</strong></p>' +
          '<ol>' +
            '<li>Com a carteira multisig aberta, vá em "Settings".</li>' +
            '<li>Clique em "Export" no canto inferior.</li>' +
            '<li>Escolha o formato (o formato do Sparrow ou o "Output Descriptor" universal).</li>' +
            '<li>Salve o arquivo no computador.</li>' +
          '</ol>' +
          '<p><strong>Como fazer backup do descriptor:</strong></p>' +
          '<ul>' +
            '<li><strong>Imprima</strong> em papel e guarde junto com cada cópia de seed (ou pelo menos em 2 locais diferentes).</li>' +
            '<li><strong>Salve em pendrive</strong> (de preferência 2 pendrives em locais separados).</li>' +
            '<li><strong>Copie o texto</strong> do descriptor e grave em placa de metal se quiser durabilidade máxima.</li>' +
            '<li><strong>Dê uma cópia a cada custodiante de chave:</strong> o herdeiro, o advogado e o cofre devem ter cada um uma cópia do descriptor junto com sua seed.</li>' +
          '</ul>',
        warning: 'O descriptor é tão importante quanto as seeds. Se você perder o descriptor E uma das seeds, seus bitcoins podem ficar permanentemente inacessíveis. Faça múltiplas cópias e distribua entre os custodiantes.'
      },

      // Step 7 ─ Backup de cada seed individual
      {
        title: 'Backup de cada seed individual',
        content:
          '<p>Cada uma das 3 chaves do multisig tem sua própria seed phrase. Cada seed precisa de um backup independente e seguro.</p>' +
          '<p><strong>Procedimento para cada seed:</strong></p>' +
          '<ol>' +
            '<li><strong>Anote a seed</strong> (12 ou 24 palavras) gerada pela hardware wallet. Cada hardware wallet gera sua própria seed independente.</li>' +
            '<li><strong>Grave em placa de metal:</strong> isso protege contra fogo, água e degradação do papel. Cada seed vai em uma placa separada.</li>' +
            '<li><strong>Teste a restauração:</strong> antes de distribuir, teste que cada seed restaura corretamente na hardware wallet correspondente e que o Sparrow reconhece a carteira multisig.</li>' +
          '</ol>' +
          '<p><strong>Princípio fundamental:</strong> cada custodiante guarda APENAS sua própria seed. Ninguém deve ter acesso a mais de 1 seed (a menos que seja você, o dono, durante o setup).</p>' +
          '<ul>' +
            '<li>Herdeiro: guarda Seed 1 (na hardware wallet + backup em placa de metal)</li>' +
            '<li>Advogado: guarda Seed 2 (placa de metal em cofre do escritório)</li>' +
            '<li>Cofre bancário: guarda Seed 3 (placa de metal no cofre)</li>' +
          '</ul>' +
          '<p><strong>Lembre-se:</strong> uma seed sozinha não pode mover fundos no multisig 2-de-3. Ela precisa de pelo menos mais 1 seed + o descriptor. Isso é a beleza do multisig: cada peça isolada é inútil.</p>',
        tip: 'Etiquete cada placa de metal claramente: "Chave 1 de 3 — Multisig Herança" para evitar confusão no futuro. Inclua a data de criação.'
      },

      // Step 8 ─ Distribua as chaves
      {
        title: 'Distribua as chaves',
        content:
          '<p>Chegou a hora de entregar fisicamente cada chave ao seu custodiante. Este é um momento que exige cuidado e clareza.</p>' +
          '<p><strong>O que entregar a cada custodiante:</strong></p>' +
          '<ol>' +
            '<li><strong>A hardware wallet OU a seed em placa de metal</strong> (depende do que você planejou para cada um).</li>' +
            '<li><strong>Uma cópia do descriptor</strong> (impressa ou em pendrive). Sem o descriptor, a seed sozinha não permite reconstruir a carteira multisig.</li>' +
            '<li><strong>Uma carta com instruções</strong> específicas para o papel daquela pessoa (detalhado nos próximos passos).</li>' +
          '</ol>' +
          '<p><strong>Ao entregar, explique:</strong></p>' +
          '<ul>' +
            '<li>O que é a peça que eles estão recebendo (uma das 3 chaves de um multisig).</li>' +
            '<li>Que eles <strong>não podem mover fundos sozinhos</strong> com apenas 1 chave.</li>' +
            '<li>Quando e como devem usar a chave (somente após sua morte/incapacidade, em coordenação com outro custodiante).</li>' +
            '<li>Que devem guardar em local seguro e não compartilhar com ninguém.</li>' +
          '</ul>' +
          '<p><strong>Sobre a entrega ao advogado:</strong></p>' +
          '<p>O advogado deve guardar a chave em um local acessível mesmo após décadas. Idealmente em um cofre do próprio escritório, com instruções no testamento ou em um documento formal indicando a função da chave. Se o advogado se aposentar, a chave deve ser transferida ao sucessor.</p>'
      },

      // Step 9 ─ Escreva a carta do herdeiro
      {
        title: 'Escreva a carta do herdeiro',
        content:
          '<p>A carta do herdeiro é o guia completo que ele seguirá após sua morte. Deve ser <strong>autossuficiente</strong>: sem ela, o herdeiro não sabe o que fazer com a hardware wallet e a seed.</p>' +
          '<p><strong>Conteúdo da carta (modelo):</strong></p>' +
          '<ol>' +
            '<li><strong>Introdução:</strong> "Você está recebendo esta carta porque eu faleci ou fiquei incapacitado. Ela contém instruções para acessar seus bitcoins. Siga cada passo com calma."</li>' +
            '<li><strong>O que você tem:</strong> "Você possui uma das 3 chaves de uma carteira multisig 2-de-3. Sua chave sozinha não pode mover os fundos. Você precisa de mais 1 chave."</li>' +
            '<li><strong>Quem tem a segunda chave:</strong> "Contacte o Dr. [Nome] no escritório [Endereço/Telefone]. Ele tem a segunda chave e instruções para ajudá-lo."</li>' +
            '<li><strong>Onde está a terceira chave:</strong> "Caso necessário, a terceira chave está no cofre bancário [Banco, Agência, Número do cofre]. Você precisará do [documento] para acessá-lo."</li>' +
            '<li><strong>Passo a passo para a recuperação:</strong>' +
              '<ul>' +
                '<li>Baixe o Sparrow Wallet em sparrowwallet.com (ou Nunchuk em nunchuk.io)</li>' +
                '<li>Importe o descriptor (arquivo que está junto com esta carta / pendrive / placa)</li>' +
                '<li>O Sparrow mostrará a carteira e o saldo</li>' +
                '<li>Crie uma transação para enviar os bitcoins para sua própria carteira</li>' +
                '<li>Assine com sua hardware wallet (ou seed)</li>' +
                '<li>Leve a transação parcialmente assinada ao advogado para a segunda assinatura</li>' +
                '<li>Após 2 assinaturas, a transação pode ser transmitida</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>Avisos de segurança:</strong> "Nunca digite sua seed ou a do advogado em sites. Nunca compartilhe com \'suporte técnico\'. Não tenha pressa. Se precisar de ajuda técnica, contacte [pessoa de confiança]."</li>' +
          '</ol>',
        tip: 'Inclua na carta o número de telefone e email do advogado, o endereço do cofre bancário, e o nome da pessoa de confiança para suporte técnico. Em momentos de luto, detalhes práticos fazem toda a diferença.'
      },

      // Step 10 ─ Instrua o advogado
      {
        title: 'Instrua o advogado',
        content:
          '<p>O advogado é uma peça essencial do plano, mas ele <strong>não precisa ser especialista em Bitcoin</strong>. Ele precisa entender apenas o seu papel e seguir instruções claras.</p>' +
          '<p><strong>O que o advogado precisa saber:</strong></p>' +
          '<ul>' +
            '<li>Ele guarda <strong>1 de 3 chaves</strong> de uma carteira Bitcoin.</li>' +
            '<li>Com essa chave sozinha, ele <strong>não pode acessar os fundos</strong>. Não há risco de roubo unilateral.</li>' +
            '<li>Ele deve usar a chave <strong>somente quando</strong>:' +
              '<ul>' +
                '<li>Receber certidão de óbito ou laudo de incapacidade do titular</li>' +
                '<li>For contactado pelo herdeiro designado (nome especificado)</li>' +
                '<li>Ambas condições sejam atendidas</li>' +
              '</ul>' +
            '</li>' +
            '<li>Na hora de usar, ele seguirá as instruções do envelope lacrado que recebeu.</li>' +
          '</ul>' +
          '<p><strong>Envelope lacrado para o advogado (conteúdo):</strong></p>' +
          '<ol>' +
            '<li>A seed (12 ou 24 palavras) da chave dele, em placa de metal ou papel.</li>' +
            '<li>Uma cópia do descriptor da carteira multisig.</li>' +
            '<li>Instruções passo a passo para assinar uma transação:' +
              '<ul>' +
                '<li>Baixar Sparrow Wallet</li>' +
                '<li>Importar o descriptor</li>' +
                '<li>Receber a transação parcialmente assinada (PSBT) do herdeiro</li>' +
                '<li>Assinar com a seed dele</li>' +
                '<li>Devolver a transação totalmente assinada ao herdeiro para transmissão</li>' +
              '</ul>' +
            '</li>' +
            '<li>Contato do herdeiro e de uma pessoa de suporte técnico.</li>' +
          '</ol>' +
          '<p><strong>Dica legal:</strong> considere incluir o plano de herança Bitcoin no seu testamento ou em um documento formal com o advogado. Isso evita disputas e dá legitimidade ao processo.</p>'
      },

      // Step 11 ─ Teste uma transação
      {
        title: 'Teste uma transação completa',
        content:
          '<p>O teste final é <strong>o passo mais importante</strong> de todo o setup. Sem ele, você não sabe se o plano realmente funciona.</p>' +
          '<p><strong>Passo a passo do teste:</strong></p>' +
          '<ol>' +
            '<li><strong>Envie um valor pequeno</strong> (ex: 50.000 sats) para a carteira multisig. Verifique que o saldo aparece no Sparrow.</li>' +
            '<li><strong>Crie uma transação de teste</strong> no Sparrow para enviar parte desse valor para outro endereço seu. O Sparrow gerará um PSBT (Partially Signed Bitcoin Transaction).</li>' +
            '<li><strong>Assine com a primeira chave</strong> (ex: a hardware wallet do herdeiro). O Sparrow mostrará "1 of 2 signatures".</li>' +
            '<li><strong>Assine com a segunda chave</strong> (ex: a chave do advogado). Simule o processo real: o herdeiro leva o PSBT (em pendrive ou QR code) ao advogado, que assina com sua chave.</li>' +
            '<li><strong>Transmita a transação</strong> (broadcast). O Sparrow enviará a transação para a rede Bitcoin.</li>' +
            '<li><strong>Verifique a confirmação:</strong> a transação foi confirmada? Os fundos chegaram ao destino?</li>' +
          '</ol>' +
          '<p><strong>O que testar especificamente:</strong></p>' +
          '<ul>' +
            '<li>O herdeiro consegue iniciar a transação com sua chave?</li>' +
            '<li>O advogado consegue assinar seguindo apenas as instruções do envelope?</li>' +
            '<li>O descriptor permite reconstruir a carteira do zero em um computador novo?</li>' +
            '<li>O fluxo faz sentido para pessoas não-técnicas?</li>' +
          '</ul>' +
          '<p><strong>Após o teste bem-sucedido:</strong></p>' +
          '<ul>' +
            '<li>Corrija qualquer problema encontrado.</li>' +
            '<li>Atualize as instruções se algum passo ficou confuso.</li>' +
            '<li>Agora sim, faça o depósito dos valores maiores na carteira multisig.</li>' +
            '<li>Agende revisão anual do plano.</li>' +
          '</ul>' +
          '<p><strong>Revisão anual:</strong></p>' +
          '<ul>' +
            '<li>Todas as 3 seeds ainda estão seguras e acessíveis?</li>' +
            '<li>O descriptor tem múltiplas cópias atualizadas?</li>' +
            '<li>O advogado ainda está ativo? Se aposentou? Mudou de escritório?</li>' +
            '<li>O cofre bancário ainda está ativo?</li>' +
            '<li>O herdeiro mudou de endereço ou situação?</li>' +
            '<li>O software (Sparrow/Nunchuk) ainda está disponível?</li>' +
          '</ul>'
      }
    ],

    en: [
      // Step 1 ─ Prerequisites
      {
        title: 'Prerequisites',
        content:
          '<p>Multisig for inheritance is the most robust method (among those that don\'t use Liana), but it requires more equipment and planning. You need:</p>' +
          '<ul>' +
            '<li><strong>2 or more hardware wallets from different manufacturers</strong> (e.g., Coldcard + Jade, or Trezor + Coldcard). Using different manufacturers protects against single-manufacturer failures (supply chain attacks).</li>' +
            '<li><strong>Sparrow Wallet or Nunchuk</strong> as coordinator software. Sparrow is free and runs on desktop. Nunchuk is a mobile/desktop app focused on multisig that can simplify the experience.</li>' +
            '<li><strong>Understanding of multisig:</strong> a wallet that requires M of N signatures to spend (e.g., 2-of-3 = any 2 of 3 keys must sign). If you don\'t understand multisig, go back to the self-custody tutorial.</li>' +
          '</ul>' +
          '<p>Estimated cost: 2 hardware wallets ($200-500 each, depending on the model). This is the most expensive method in terms of equipment, but offers the strongest security.</p>'
      },

      // Step 2 ─ How multisig works for inheritance
      {
        title: 'How multisig works for inheritance',
        content:
          '<p>The classic model for inheritance is <strong>2-of-3</strong>: there are 3 keys, and any combination of 2 can authorize a transaction. No single key can move the bitcoin.</p>' +
          '<p><strong>Typical distribution of the 3 keys:</strong></p>' +
          '<ol>' +
            '<li><strong>Key 1 — The heir:</strong> receives a hardware wallet with one of the keys. They can initiate a transaction but cannot complete it alone.</li>' +
            '<li><strong>Key 2 — Lawyer or notary:</strong> holds another key. Has instructions to use it only after confirmation of death or incapacitation. Provides legal legitimacy to the process.</li>' +
            '<li><strong>Key 3 — Safe deposit box or trusted third party:</strong> the third key stays in a secure location (safe deposit box) or with a trusted third person. Serves as backup.</li>' +
          '</ol>' +
          '<p><strong>How this works in practice after your death:</strong></p>' +
          '<ul>' +
            '<li>The heir (Key 1) contacts the lawyer (Key 2).</li>' +
            '<li>The lawyer verifies the death certificate and authorizes use of their key.</li>' +
            '<li>With 2 of 3 keys, they sign the transaction and move the bitcoin to the heir\'s wallet.</li>' +
          '</ul>' +
          '<p><strong>Why this is secure:</strong></p>' +
          '<ul>' +
            '<li>If the heir tries to steal before your death, they only have 1 key. They need 1 more.</li>' +
            '<li>If the lawyer tries to steal, they only have 1 key. They need 1 more.</li>' +
            '<li>If one key is lost or stolen, the other 2 can still move the funds (redundancy).</li>' +
            '<li>If a hardware wallet breaks, that key\'s seed can be restored on a new device.</li>' +
          '</ul>'
      },

      // Step 3 ─ Trade-offs
      {
        title: 'Trade-offs of this method',
        content:
          '<p>Understand the strengths and weaknesses before proceeding:</p>' +
          '<div class="tradeoffs">' +
            '<div class="tradeoffs-pros">' +
              '<h4>Pros</h4>' +
              '<ul>' +
                '<li><strong>No single point of failure:</strong> unlike the passphrase method (where the seed is a single point of failure), here no single key can compromise the funds. Losing 1 key is not catastrophic.</li>' +
                '<li><strong>Tolerates loss or theft:</strong> if 1 of 3 keys is lost, stolen, or destroyed, the other 2 can still move the funds. You have time to recreate the wallet with a new key.</li>' +
                '<li><strong>Professional-grade security:</strong> multisig is the standard used by exchanges, institutional custodians, and corporate treasuries. It\'s the most tested and proven model.</li>' +
                '<li><strong>Legal legitimacy:</strong> involving a lawyer as co-signer adds a layer of legitimacy that can be useful in family disputes.</li>' +
                '<li><strong>Works even with broken hardware:</strong> if a hardware wallet stops working, that key\'s seed can be restored on another compatible device.</li>' +
              '</ul>' +
            '</div>' +
            '<div class="tradeoffs-cons">' +
              '<h4>Cons</h4>' +
              '<ul>' +
                '<li><strong>Most complex setup:</strong> among methods that don\'t use Liana, this is the most complex to configure. It requires coordinating multiple hardware wallets and software.</li>' +
                '<li><strong>Equipment cost:</strong> you need 2+ hardware wallets from different manufacturers. This can cost $400-1000+.</li>' +
                '<li><strong>The descriptor is critical and easy to overlook:</strong> the wallet configuration file (wallet descriptor) is as important as the seeds. Without it, even with all 3 seeds, reconstruction may be impossible or extremely difficult.</li>' +
                '<li><strong>Coordinator software must be available:</strong> at recovery time, the heir needs Sparrow Wallet or Nunchuk. If the software no longer exists, recovery becomes harder (though not impossible with the descriptor).</li>' +
                '<li><strong>Doesn\'t scale easily to many heirs:</strong> unlike the passphrase method (1 seed for N heirs), each new heir in multisig requires significant restructuring.</li>' +
                '<li><strong>Requires coordination between participants:</strong> all key holders need to understand their role and be available when needed.</li>' +
                '<li><strong>The descriptor is as important as the seeds:</strong> losing the descriptor AND one of the seeds can permanently lock the funds.</li>' +
              '</ul>' +
            '</div>' +
          '</div>'
      },

      // Step 4 ─ Plan the key distribution
      {
        title: 'Plan the key distribution',
        content:
          '<p>Before configuring anything, define <strong>who holds each key</strong> and where. This is the design of your security system.</p>' +
          '<p><strong>Common distribution patterns (2-of-3):</strong></p>' +
          '<p><strong>Pattern A: Heir + Lawyer + Safe deposit</strong></p>' +
          '<ul>' +
            '<li>Key 1: Heir (hardware wallet at home)</li>' +
            '<li>Key 2: Lawyer (seed on metal plate in office)</li>' +
            '<li>Key 3: Safe deposit box (seed on metal plate)</li>' +
          '</ul>' +
          '<p><strong>Pattern B: Heir + Spouse + Trusted friend</strong></p>' +
          '<ul>' +
            '<li>Key 1: Heir</li>' +
            '<li>Key 2: Spouse/partner</li>' +
            '<li>Key 3: Long-time friend or distant relative</li>' +
          '</ul>' +
          '<p><strong>Important considerations:</strong></p>' +
          '<ul>' +
            '<li><strong>Geographic diversity:</strong> don\'t put all keys in the same city. A natural disaster (flood, fire) could compromise multiple keys simultaneously.</li>' +
            '<li><strong>Stable relationships:</strong> choose people with whom you expect to maintain a relationship for decades. Childhood friends, siblings, family lawyer.</li>' +
            '<li><strong>Collusion:</strong> think about which 2 people could team up against you. In Pattern A, heir + lawyer could act together. But the lawyer has professional responsibility (could lose their license).</li>' +
          '</ul>' +
          '<p><strong>Distribution table (fill in):</strong></p>' +
          '<table>' +
            '<tr><th>Key</th><th>Custodian</th><th>Physical location</th><th>Format</th></tr>' +
            '<tr><td>Key 1</td><td>E.g., Eldest child</td><td>Their home</td><td>Hardware wallet</td></tr>' +
            '<tr><td>Key 2</td><td>E.g., Mr. Smith (lawyer)</td><td>Lawyer\'s office</td><td>Metal plate in safe</td></tr>' +
            '<tr><td>Key 3</td><td>E.g., Safe deposit box</td><td>Bank X, Branch Y</td><td>Metal plate</td></tr>' +
          '</table>'
      },

      // Step 5 ─ Create the multisig wallet
      {
        title: 'Create the multisig wallet',
        content:
          '<p>Now you\'ll create the 2-of-3 multisig wallet using Sparrow Wallet as the coordinator.</p>' +
          '<p><strong>Step by step:</strong></p>' +
          '<ol>' +
            '<li><strong>Open Sparrow Wallet</strong> and click "File" > "New Wallet".</li>' +
            '<li><strong>Name the wallet</strong> (e.g., "Inheritance-Multisig").</li>' +
            '<li><strong>Under "Policy Type"</strong>, select "Multi Signature".</li>' +
            '<li><strong>Configure M-of-N:</strong> set M=2, N=3 (or your chosen scheme).</li>' +
            '<li><strong>Script Type:</strong> select "Native Segwit (P2WSH)" for lower fees.</li>' +
            '<li><strong>For each cosigner (key):</strong>' +
              '<ul>' +
                '<li>Connect the corresponding hardware wallet</li>' +
                '<li>Click "Import" to import the xpub (extended public key) from that hardware wallet</li>' +
                '<li>Sparrow will show the successfully imported xpub</li>' +
                '<li>Repeat for each of the 3 hardware wallets</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>Click "Apply"</strong> to create the wallet.</li>' +
            '<li><strong>Verify:</strong> Sparrow will show the first receive addresses. They should start with "bc1q" (for P2WSH) and will be longer than regular addresses.</li>' +
            '<li><strong>On each hardware wallet:</strong> verify that the address shown in Sparrow matches the address shown on the hardware wallet\'s screen. This confirms each device recognizes the multisig wallet.</li>' +
          '</ol>' +
          '<p><strong>Important:</strong> during this process, no private key leaves the hardware wallet. Sparrow only imports public keys (xpubs) to assemble the wallet. Private keys always stay on the device.</p>'
      },

      // Step 6 ─ Export the descriptor
      {
        title: 'Export and back up the descriptor',
        content:
          '<p>The <strong>wallet descriptor</strong> (wallet configuration file) is the most overlooked yet one of the most important pieces of multisig.</p>' +
          '<p><strong>What the descriptor is:</strong> it\'s a file containing information about how the multisig wallet was assembled: which xpubs participate, what scheme (2-of-3), the script type, and derivation paths. Without it, reconstructing the wallet requires knowing ALL these details from memory.</p>' +
          '<p><strong>How to export from Sparrow:</strong></p>' +
          '<ol>' +
            '<li>With the multisig wallet open, go to "Settings".</li>' +
            '<li>Click "Export" at the bottom.</li>' +
            '<li>Choose the format (Sparrow format or the universal "Output Descriptor").</li>' +
            '<li>Save the file to your computer.</li>' +
          '</ol>' +
          '<p><strong>How to back up the descriptor:</strong></p>' +
          '<ul>' +
            '<li><strong>Print it</strong> on paper and store alongside each seed copy (or at least in 2 different locations).</li>' +
            '<li><strong>Save on USB drives</strong> (preferably 2 drives in separate locations).</li>' +
            '<li><strong>Copy the text</strong> of the descriptor and engrave on a metal plate for maximum durability.</li>' +
            '<li><strong>Give a copy to each key custodian:</strong> the heir, the lawyer, and the safe deposit should each have a copy of the descriptor along with their seed.</li>' +
          '</ul>',
        warning: 'The descriptor is as important as the seeds. If you lose the descriptor AND one of the seeds, your bitcoin may become permanently inaccessible. Make multiple copies and distribute among custodians.'
      },

      // Step 7 ─ Back up each individual seed
      {
        title: 'Back up each individual seed',
        content:
          '<p>Each of the 3 keys in the multisig has its own seed phrase. Each seed needs independent, secure backup.</p>' +
          '<p><strong>Procedure for each seed:</strong></p>' +
          '<ol>' +
            '<li><strong>Write down the seed</strong> (12 or 24 words) generated by the hardware wallet. Each hardware wallet generates its own independent seed.</li>' +
            '<li><strong>Engrave on metal plate:</strong> this protects against fire, water, and paper degradation. Each seed goes on a separate plate.</li>' +
            '<li><strong>Test the restoration:</strong> before distributing, test that each seed correctly restores on the corresponding hardware wallet and that Sparrow recognizes the multisig wallet.</li>' +
          '</ol>' +
          '<p><strong>Fundamental principle:</strong> each custodian stores ONLY their own seed. Nobody should have access to more than 1 seed (unless it\'s you, the owner, during setup).</p>' +
          '<ul>' +
            '<li>Heir: stores Seed 1 (on hardware wallet + metal plate backup)</li>' +
            '<li>Lawyer: stores Seed 2 (metal plate in office safe)</li>' +
            '<li>Safe deposit box: stores Seed 3 (metal plate in vault)</li>' +
          '</ul>' +
          '<p><strong>Remember:</strong> a single seed cannot move funds in a 2-of-3 multisig. It needs at least 1 more seed + the descriptor. This is the beauty of multisig: each isolated piece is useless.</p>',
        tip: 'Label each metal plate clearly: "Key 1 of 3 — Inheritance Multisig" to avoid confusion in the future. Include the creation date.'
      },

      // Step 8 ─ Distribute the keys
      {
        title: 'Distribute the keys',
        content:
          '<p>It\'s time to physically deliver each key to its custodian. This is a moment that requires care and clarity.</p>' +
          '<p><strong>What to deliver to each custodian:</strong></p>' +
          '<ol>' +
            '<li><strong>The hardware wallet OR the seed on a metal plate</strong> (depends on what you planned for each).</li>' +
            '<li><strong>A copy of the descriptor</strong> (printed or on USB drive). Without the descriptor, the seed alone cannot reconstruct the multisig wallet.</li>' +
            '<li><strong>A letter with specific instructions</strong> for that person\'s role (detailed in the next steps).</li>' +
          '</ol>' +
          '<p><strong>When delivering, explain:</strong></p>' +
          '<ul>' +
            '<li>What the piece they\'re receiving is (one of 3 keys in a multisig).</li>' +
            '<li>That they <strong>cannot move funds alone</strong> with just 1 key.</li>' +
            '<li>When and how they should use the key (only after your death/incapacitation, in coordination with another custodian).</li>' +
            '<li>That they must store it securely and not share with anyone.</li>' +
          '</ul>' +
          '<p><strong>About delivering to the lawyer:</strong></p>' +
          '<p>The lawyer should store the key in a location accessible even after decades. Ideally in their own office safe, with instructions in the will or a formal document indicating the key\'s function. If the lawyer retires, the key should be transferred to their successor.</p>'
      },

      // Step 9 ─ Write the heir\'s letter
      {
        title: 'Write the heir\'s letter',
        content:
          '<p>The heir\'s letter is the complete guide they\'ll follow after your death. It must be <strong>self-sufficient</strong>: without it, the heir doesn\'t know what to do with the hardware wallet and seed.</p>' +
          '<p><strong>Letter contents (template):</strong></p>' +
          '<ol>' +
            '<li><strong>Introduction:</strong> "You are receiving this letter because I have passed away or become incapacitated. It contains instructions to access your bitcoin. Follow each step calmly."</li>' +
            '<li><strong>What you have:</strong> "You hold one of 3 keys to a 2-of-3 multisig wallet. Your key alone cannot move the funds. You need 1 more key."</li>' +
            '<li><strong>Who has the second key:</strong> "Contact Mr./Ms. [Name] at [Address/Phone]. They have the second key and instructions to help you."</li>' +
            '<li><strong>Where the third key is:</strong> "If needed, the third key is at the safe deposit box [Bank, Branch, Box number]. You\'ll need [document] to access it."</li>' +
            '<li><strong>Step-by-step recovery:</strong>' +
              '<ul>' +
                '<li>Download Sparrow Wallet at sparrowwallet.com (or Nunchuk at nunchuk.io)</li>' +
                '<li>Import the descriptor (file that came with this letter / USB drive / plate)</li>' +
                '<li>Sparrow will show the wallet and balance</li>' +
                '<li>Create a transaction to send the bitcoin to your own wallet</li>' +
                '<li>Sign with your hardware wallet (or seed)</li>' +
                '<li>Take the partially signed transaction to the lawyer for the second signature</li>' +
                '<li>After 2 signatures, the transaction can be broadcast</li>' +
              '</ul>' +
            '</li>' +
            '<li><strong>Security warnings:</strong> "Never enter your seed or the lawyer\'s on websites. Never share with \'tech support\'. Don\'t rush. If you need technical help, contact [trusted person]."</li>' +
          '</ol>',
        tip: 'Include in the letter the lawyer\'s phone number and email, the safe deposit box address, and the name of the trusted person for technical support. In times of grief, practical details make all the difference.'
      },

      // Step 10 ─ Instruct the lawyer
      {
        title: 'Instruct the lawyer',
        content:
          '<p>The lawyer is an essential piece of the plan, but they <strong>don\'t need to be a Bitcoin expert</strong>. They just need to understand their role and follow clear instructions.</p>' +
          '<p><strong>What the lawyer needs to know:</strong></p>' +
          '<ul>' +
            '<li>They hold <strong>1 of 3 keys</strong> to a Bitcoin wallet.</li>' +
            '<li>With this key alone, they <strong>cannot access the funds</strong>. There is no risk of unilateral theft.</li>' +
            '<li>They should use the key <strong>only when</strong>:' +
              '<ul>' +
                '<li>They receive a death certificate or incapacitation report for the holder</li>' +
                '<li>They are contacted by the designated heir (specified name)</li>' +
                '<li>Both conditions are met</li>' +
              '</ul>' +
            '</li>' +
            '<li>When it\'s time to use it, they\'ll follow the instructions in the sealed envelope they received.</li>' +
          '</ul>' +
          '<p><strong>Sealed envelope for the lawyer (contents):</strong></p>' +
          '<ol>' +
            '<li>The seed (12 or 24 words) for their key, on metal plate or paper.</li>' +
            '<li>A copy of the multisig wallet descriptor.</li>' +
            '<li>Step-by-step instructions for signing a transaction:' +
              '<ul>' +
                '<li>Download Sparrow Wallet</li>' +
                '<li>Import the descriptor</li>' +
                '<li>Receive the partially signed transaction (PSBT) from the heir</li>' +
                '<li>Sign with their seed</li>' +
                '<li>Return the fully signed transaction to the heir for broadcasting</li>' +
              '</ul>' +
            '</li>' +
            '<li>Contact information for the heir and a technical support person.</li>' +
          '</ol>' +
          '<p><strong>Legal tip:</strong> consider including the Bitcoin inheritance plan in your will or in a formal document with the lawyer. This prevents disputes and legitimizes the process.</p>'
      },

      // Step 11 ─ Test a transaction
      {
        title: 'Test a complete transaction',
        content:
          '<p>The final test is <strong>the most important step</strong> of the entire setup. Without it, you don\'t know if the plan actually works.</p>' +
          '<p><strong>Step-by-step test:</strong></p>' +
          '<ol>' +
            '<li><strong>Send a small amount</strong> (e.g., 50,000 sats) to the multisig wallet. Verify the balance shows in Sparrow.</li>' +
            '<li><strong>Create a test transaction</strong> in Sparrow to send part of that amount to another address you own. Sparrow will generate a PSBT (Partially Signed Bitcoin Transaction).</li>' +
            '<li><strong>Sign with the first key</strong> (e.g., the heir\'s hardware wallet). Sparrow will show "1 of 2 signatures".</li>' +
            '<li><strong>Sign with the second key</strong> (e.g., the lawyer\'s key). Simulate the real process: the heir brings the PSBT (on USB drive or QR code) to the lawyer, who signs with their key.</li>' +
            '<li><strong>Broadcast the transaction.</strong> Sparrow will send the transaction to the Bitcoin network.</li>' +
            '<li><strong>Verify confirmation:</strong> was the transaction confirmed? Did the funds arrive at the destination?</li>' +
          '</ol>' +
          '<p><strong>What to test specifically:</strong></p>' +
          '<ul>' +
            '<li>Can the heir initiate the transaction with their key?</li>' +
            '<li>Can the lawyer sign following only the envelope\'s instructions?</li>' +
            '<li>Does the descriptor allow rebuilding the wallet from scratch on a new computer?</li>' +
            '<li>Does the flow make sense for non-technical people?</li>' +
          '</ul>' +
          '<p><strong>After a successful test:</strong></p>' +
          '<ul>' +
            '<li>Fix any issues found.</li>' +
            '<li>Update the instructions if any step was confusing.</li>' +
            '<li>Now deposit larger amounts into the multisig wallet.</li>' +
            '<li>Schedule an annual review of the plan.</li>' +
          '</ul>' +
          '<p><strong>Annual review:</strong></p>' +
          '<ul>' +
            '<li>Are all 3 seeds still secure and accessible?</li>' +
            '<li>Does the descriptor have multiple updated copies?</li>' +
            '<li>Is the lawyer still active? Retired? Changed offices?</li>' +
            '<li>Is the safe deposit box still active?</li>' +
            '<li>Has the heir changed address or circumstances?</li>' +
            '<li>Is the software (Sparrow/Nunchuk) still available?</li>' +
          '</ul>'
      }
    ]
  }

};
