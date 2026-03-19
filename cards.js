const CARDS = [
  {
    topic: "Aquecimento Global",
    aliases: ["aquecimento global", "aquecimento"],
    hints: [
      "Sou um fenômeno climático de escala planetária.",
      "Minha existência é acelerada pela Revolução Industrial.",
      "Causo o branqueamento e a morte de recifes de corais.",
      "Sou consequência da intensificação do efeito estufa.",
      "Minha principal evidência é o aumento da temperatura média da Terra.",
      "Sou o tema central de reuniões internacionais chamadas COPs.",
      "Provoco a elevação do nível do mar, ameaçando cidades costeiras.",
      "Altero o regime de chuvas e a intensidade de furacões.",
      "O Acordo de Paris tenta limitar meu avanço a 1,5°C.",
      "Sou frequentemente chamado de 'crise climática'."
    ]
  },
  {
    topic: "Gás Metano",
    aliases: ["gas metano", "metano"],
    hints: [
      "Sou o principal componente do gás natural.",
      "Sou produzido pela decomposição de matéria orgânica na ausência de oxigênio.",
      "Sou liberado naturalmente por áreas alagadas, como pântanos.",
      "Sou um subproduto do processo de digestão de como bois e ovelhas.",
      "Sou capturado em aterros sanitários para ser transformado em energia.",
      "Sou um dos três gases do efeito estufa mais importantes.",
      "Grandes quantidades de mim estão presas no solo congelado do Ártico, o permafrost.",
      "Sou considerado um poluente de vida curta, pois permaneço 'pouco' tempo na atmosfera.",
      "Sou o segundo gás que mais contribui para o aquecimento global causado pelo homem.",
      "Sou incolor e sem cheiro, mas sou inflamável."
    ]
  },
  {
    topic: "Combustível Fóssil",
    aliases: ["combustivel fossil", "combustiveis fosseis", "combustível fóssil"],
    hints: [
      "Sou formado pela decomposição de matéria orgânica.",
      "Sou extraído tanto em terra firme quanto em plataformas no meio do oceano.",
      "Sou a principal fonte de emissão de Dióxido de Carbono (CO2) no planeta.",
      "Representei cerca de 80% da matriz energética mundial atual.",
      "Minhas reservas são finitas e não se regeneram no tempo de vida humano.",
      "Sou a matéria-prima de quase tudo o que é feito de plástico.",
      "Sou encontrado em rochas sedimentares profundas.",
      "Minha utilização em larga escala foi o motor da primeira Revolução Industrial.",
      "Meus três tipos principais são o carvão, o petróleo e o gás natural.",
      "Sou uma fonte de energia primária não renovável."
    ]
  },
  {
    topic: "Crédito de Carbono",
    aliases: ["credito de carbono", "credito carbono", "crédito carbono"],
    hints: [
      "Nasci oficialmente com o Protocolo de Kyoto em 1997.",
      "Represento a não emissão (ou a captura) de gases de efeito estufa.",
      "Sou o pilar do chamado 'Mercado de Carbono'.",
      "Posso ser gerado através de projetos de reflorestamento ou energias renováveis.",
      "Empresas que não conseguem atingir suas metas de redução podem me comprar.",
      "Sou criticado por alguns que me chamam de 'licença para poluir'.",
      "Ajudo a transferir recursos financeiros de países desenvolvidos para países em desenvolvimento.",
      "Ajudo a dar um valor econômico para a preservação das florestas em pé.",
      "Sou um instrumento financeiro criado para ajudar a reduzir o aquecimento global.",
      "Funciono sob a lógica de que 'quem polui mais, paga; quem polui menos, recebe'."
    ]
  },
  {
    topic: "Descarbonização",
    aliases: ["descarbonizacao", "descarbonização"],
    hints: [
      "Sou o processo estratégico para reduzir ou eliminar as emissões de CO2.",
      "Sou o objetivo principal de governos que declararam 'Emergência Climática'.",
      "Minha meta final é atingir o estado de 'Net Zero' ou Neutralidade Climática.",
      "Exijo uma mudança profunda na forma como o mundo produz e consome energia.",
      "No setor de transportes, foco no uso de veículos elétricos e biocombustíveis.",
      "Sou a solução para 'limpar' a matriz energética de um país.",
      "É o oposto do que aconteceu durante a Revolução Industrial.",
      "Sem mim, é impossível cumprir as metas estabelecidas no Acordo de Paris.",
      "Sou o ato de 'tirar o carbono' das atividades humanas.",
      "Na indústria, envolvo a eletrificação de processos que antes usavam carvão ou gás."
    ]
  },
  {
    topic: "Agropecuária",
    aliases: ["agropecuaria", "agropecuária"],
    hints: [
      "Atualmente, ocupo cerca de 38% da área terrestre total do planeta.",
      "Sou responsável por cerca de 25% das emissões globais de gases de efeito estufa.",
      "Sou uma grande consumidora de recursos hídricos, representando 70% do uso de água doce no mundo.",
      "Envolvo tanto o cultivo de plantas quanto a criação de animais.",
      "Sou fundamental para a economia brasileira.",
      "Minha forma 'extensiva' exige grandes áreas de terra, enquanto a 'intensiva' foca em tecnologia e produtividade.",
      "Minha expansão é a principal causa do desmatamento em biomas como a Amazônia e o Cerrado.",
      "Minha pegada hídrica é a maior entre todas as atividades econômicas humanas.",
      "Sou a atividade que mais gera resíduos orgânicos que podem ser transformados em bioenergia.",
      "Minha produção é frequentemente negociada em bolsas de valores como 'Commodities'."
    ]
  },
  {
    topic: "Desmatamento",
    aliases: ["desmatamento", "desflorestamento"],
    hints: [
      "Sou uma prática humana que altera radicalmente a paisagem natural.",
      "Sou o principal responsável pela perda de habitats e pela extinção de espécies.",
      "No Brasil, sou historicamente a maior fonte de emissões de gases de efeito estufa.",
      "Sou frequentemente o primeiro passo para a conversão da terra em pastagens ou lavouras de soja.",
      "Muitas vezes sou acompanhado por queimadas.",
      "Provoquei o desaparecimento de quase toda a Mata Atlântica original.",
      "Sou combatido através de fiscalização, multas ambientais e criação de Unidades de Conservação.",
      "Quando aconteço, o solo fica exposto à erosão e perde sua capacidade de reter água.",
      "Sou um dos grandes vilões da preservação da biodiversidade mundial.",
      "Posso ocorrer de forma legal (com autorização) ou ilegal (em áreas protegidas)."
    ]
  },
  {
    topic: "Elevação do Nível do Mar",
    aliases: ["elevacao do nivel do mar", "nivel do mar", "aumento do nivel do mar"],
    hints: [
      "Sou uma das consequências mais visíveis e mensuráveis do aquecimento global.",
      "Sou monitorada constantemente por satélites e estações de medição de marés.",
      "Uma das minhas causas é o derretimento de geleiras.",
      "Uma das minhas causas é a expansão térmica da água.",
      "Ameaço quase todas as grandes metrópoles costeiras do mundo.",
      "Sou a causa direta do aumento de erosões nas praias e da destruição de manguezais.",
      "No Brasil, cidades como Recife e Santos estão entre as mais vulneráveis à minha ação.",
      "Sou motivo de preocupação por trás do termo 'Refugiados Climáticos' do futuro.",
      "Ameaço a infraestrutura de quase todas as grandes metrópoles costeiras do mundo.",
      "Mesmo que parássemos todas as emissões hoje, eu continuaria acontecendo por séculos devido à inércia dos oceanos."
    ]
  },
  {
    topic: "Desertificação",
    aliases: ["desertificacao", "desertificação"],
    hints: [
      "Sou um processo de degradação ambiental que ocorre em áreas secas, subúmidas ou semiáridas.",
      "Sou considerada uma das maiores ameaças ambientais para a segurança alimentar do século XXI.",
      "Reduzo drasticamente a produtividade biológica e econômica das terras.",
      "O desmatamento da vegetação nativa (como a Caatinga) acelera meu aparecimento.",
      "Transformo solos férteis em terrenos arenosos e secos.",
      "Causo a perda de nutrientes essenciais do solo, tornando o cultivo impossível.",
      "Sou um fenômeno que contribui diretamente para o aumento da pobreza e da migração rural.",
      "Minha ocorrência faz com que o solo perca a capacidade de absorver a água da chuva.",
      "Meu nome deriva de uma paisagem natural onde quase não há água ou vegetação.",
      "Sou o processo que faz a terra virar um deserto por causa do mau uso e do calor."
    ]
  },
  {
    topic: "Onda de Calor",
    aliases: ["onda de calor", "ondas de calor"],
    hints: [
      "Sou um período prolongado de tempo excessivamente quente, que pode ser acompanhado por alta umidade.",
      "Minha definição técnica varia de acordo com a temperatura média histórica de cada região.",
      "Criei uma espécie de 'cúpula de calor' que comprime o ar quente próximo ao solo.",
      "Sou particularmente perigosa para idosos, crianças e trabalhadores ao ar livre.",
      "Sou um dos principais gatilhos para incêndios florestais espontâneos em vegetações secas.",
      "O aquecimento global me tornou dez vezes mais provável e muito mais intensa do que há 50 anos.",
      "Sou o fenômeno que faz os termômetros baterem recordes históricos de temperatura.",
      "Sou uma massa de ar quente que dura por vários dias.",
      "Sou o nome dado ao calor extremo e sufocante que dura muito mais do que um dia normal de sol.",
      "Nas grandes cidades, meu efeito é intensificado pelo fenômeno das 'Ilhas de Calor'."
    ]
  },
  {
    topic: "Acidificação dos Oceanos",
    aliases: ["acidificacao dos oceanos", "acidificação dos oceanos", "acidificacao"],
    hints: [
      "Sou uma mudança química invisível, mas profunda, que ocorre em escala global.",
      "Meu nome refere-se à queda do pH das águas marinhas.",
      "Sou um processo que ocorre de fora para dentro: da superfície da água para as profundidades.",
      "Minha ocorrência atual é a mais rápida dos últimos 300 milhões de anos.",
      "Sou uma sentença de morte para os recifes de corais, que se dissolvem sob minha influência.",
      "Coloco em risco a indústria pesqueira mundial e a segurança alimentar de milhões de pessoas.",
      "Minha ocorrência reduz a capacidade do oceano de continuar absorvendo calor e gases.",
      "Sou o que acontece quando a água do mar reage com o gás carbônico e forma ácido carbônico.",
      "Sou um fenômeno que depende da composição do ar.",
      "Posso afetar o comportamento de peixes."
    ]
  },
  {
    topic: "Atividade Industrial",
    aliases: ["atividade industrial", "industria", "indústria"],
    hints: [
      "Sou o conjunto de processos que transforma matéria-prima em produtos acabados.",
      "Meu nascimento marcou o início da era do uso intensivo de combustíveis fósseis.",
      "Sou responsável pela transição da humanidade de uma vida rural para uma vida urbana.",
      "Consumo um terço da energia produzida no planeta.",
      "Sou a maior fonte de emissão de gases poluentes através de chaminés e queima de carvão.",
      "Sou o setor que mais utiliza o aço e o alumínio, processos altamente intensivos em carbono.",
      "Sou o setor que gera a maior quantidade de resíduos químicos e efluentes que precisam de tratamento.",
      "Enfrentei hoje o desafio da 'Economia Circular', onde meus resíduos voltam a ser matéria-prima.",
      "Sou o setor secundário da economia.",
      "Sem a minha 'descarbonização', as metas de conter o aquecimento global não podem ser atingidas."
    ]
  },
  {
    topic: "Queimadas",
    aliases: ["queimadas", "queimada", "incendios florestais", "incêndios florestais"],
    hints: [
      "Posso ocorrer de forma natural, através de raios, ou ser provocada pela ação humana.",
      "Sou utilizada há milênios para a limpeza de terrenos e renovação de pastagens.",
      "Libero instantaneamente na atmosfera o carbono que as plantas levaram décadas para estocar.",
      "Sou causa da poluição do ar e de problemas respiratórios em diversas regiões durante a seca.",
      "Sou monitorada por satélites.",
      "Destruo micro-organismos essenciais do solo, reduzindo sua fertilidade a longo prazo.",
      "Sou responsável pela morte direta de milhões de animais silvestres todos os anos.",
      "Sou o método mais barato e rápido (porém o mais destrutivo) de 'limpar' uma área de mata.",
      "Em biomas como o Cerrado, faço parte do ciclo natural, mas minha frequência atual é predatória.",
      "Aqueço o planeta, tornando florestas mais secas."
    ]
  },
  {
    topic: "Gás Carbônico",
    aliases: ["gas carbonico", "co2", "dioxido de carbono", "gás carbônico"],
    hints: [
      "Sou o principal resíduo da respiração de quase todos os seres vivos aeróbicos.",
      "Embora eu seja essencial para a vida, sou o maior contribuinte individual para o efeito estufa.",
      "Sou o 'alimento' das plantas durante a fotossíntese.",
      "Posso permanecer na atmosfera por centenas ou até milhares de anos.",
      "Sou liberado em quantidades massivas pela queima de carvão, petróleo e gás natural.",
      "Sou o principal gás poluente responsável pelo aquecimento global.",
      "É o gás que sai das bolhas nos refrigerantes.",
      "Sou capturado naturalmente por florestas e oceanos.",
      "Sou o produto final da combustão completa de qualquer matéria orgânica.",
      "Minhas emissões são o foco principal das 'COP' (Conferências das Nações Unidas sobre Mudanças Climáticas)."
    ]
  },
  {
    topic: "Camada de Ozônio",
    aliases: ["camada de ozonio", "camada ozonio", "ozonio"],
    hints: [
      "Sou uma região da atmosfera terrestre que contém uma alta concentração de um gás azul com cheiro.",
      "Funciono como um escudo gigante para o planeta.",
      "Minha principal função é absorver a maior parte da radiação ultravioleta (UV) do Sol.",
      "Sem mim a vida na Terra seria impossível.",
      "Minha destruição aumenta os casos de câncer de pele.",
      "Graças à proibição global de certos gases, estou em um lento processo de recuperação.",
      "Minha recuperação total é esperada apenas para meados de 2066, devido à longa vida dos gases que me atacam.",
      "O termo 'buraco' em mim é, na verdade, um afinamento severo da minha densidade.",
      "Me localizo na estratosfera.",
      "Sou sensível a erupções vulcânicas que podem lançar partículas que aceleram minha destruição."
    ]
  },
  {
    topic: "Efeito Estufa",
    aliases: ["efeito estufa"],
    hints: [
      "Sou um processo físico natural que ocorre na atmosfera de vários planetas, não apenas na Terra.",
      "Funciono como um cobertor térmico que mantém o planeta aquecido.",
      "Sou causado por gases específicos que têm a capacidade de absorver e reemitir calor.",
      "Sem mim a vida na Terra seria impossível.",
      "Sem mim, a Terra teria uma temperatura média abaixo de zero.",
      "Meu nome é uma analogia a uma construção de vidro usada para cultivar plantas em regiões frias.",
      "O vapor de água é meu maior aliado natural.",
      "Vênus é o planeta onde sou mais extremo.",
      "O metano e o gás carbônico são favoritos para mim.",
      "Graças a mim, o gelo dos polos não avança até a linha do Equador."
    ]
  },
  {
    topic: "Reflorestamento",
    aliases: ["reflorestamento", "reflorestar"],
    hints: [
      "Sou essencial para criar 'corredores ecológicos' que permitem o trânsito de animais entre matas isoladas.",
      "Evito que o solo sofra com erosão e deslizamentos.",
      "Ajudo a restaurar a fertilidade do solo e a regular o ciclo da água.",
      "Sou uma das formas mais baratas e eficazes de combater o aquecimento global em larga escala.",
      "Minha prática aumenta a umidade do ar.",
      "Sou o oposto direto do desmatamento.",
      "Sou uma das estratégias para o cumprimento das metas brasileiras no Acordo de Paris.",
      "Quando planejado, ajudo a diminuir a temperatura local em até 2°C ou 3°C.",
      "Ajudo a 'sequestrar' e estocar CO2 do ar.",
      "Ajudo ainda as bacias hidrográficas para manter os rios cheios o ano todo."
    ]
  },
  {
    topic: "Energia Eólica",
    aliases: ["energia eolica", "eolica", "eólica"],
    hints: [
      "Sou uma fonte de energia renovável e inesgotável que utiliza a força da natureza.",
      "Transformo a energia cinética (movimento) em energia elétrica.",
      "Sou considerada uma 'energia limpa' porque não emito gases de efeito estufa durante a operação.",
      "Posso ser instalada em terra firme (onshore) ou dentro do mar (offshore).",
      "O Brasil é um dos líderes na minha produção.",
      "Sou criticada por vezes pelo impacto visual e pelo ruído sonoro.",
      "Posso representar um risco para aves e morcegos se as torres forem instaladas em rotas migratórias.",
      "Possuo baixo custo de manutenção.",
      "Sou uma fonte de energia que não consome água durante o processo de geração.",
      "Existo também em modelos pequenos para uso residencial ou em barcos."
    ]
  },
  {
    topic: "Energia Solar",
    aliases: ["energia solar", "solar"],
    hints: [
      "Sou considerada a fonte de energia mais abundante da Terra.",
      "Sou uma fonte de energia limpa, pois não emito poluentes ou gases de efeito estufa durante a operação.",
      "Permito que residências produzam sua própria eletricidade no telhado.",
      "Sou a tecnologia que alimenta satélites espaciais e a Estação Espacial Internacional (ISS) há décadas.",
      "Sou silenciosa e exijo baixíssima manutenção.",
      "A China é atualmente a maior produtora mundial dos equipamentos que me captam.",
      "Meu processo principal se chama efeito fotovoltaico.",
      "Possuo baixo custo de manutenção.",
      "Sou a solução número um para levar luz a comunidades onde os fios da rede não chegam.",
      "Não faço nenhum barulho para funcionar."
    ]
  },
  {
    topic: "Biodiversidade",
    aliases: ["biodiversidade"],
    hints: [
      "Represento a variedade de seres vivos do planeta.",
      "O Brasil é considerado o país com a maior concentração de mim no mundo.",
      "Quanto maior eu for em um ambiente, mais resiliente e resistente a doenças esse lugar será.",
      "Sou ameaçada pelo desmatamento, pela caça ilegal e pela introdução de espécies invasoras.",
      "O 'Hotspot' é um termo usado para áreas que possuem muita concentração de mim.",
      "Sou ameaçada pelo tráfico de animais silvestres.",
      "No mar, meus maiores tesouros são os recifes de coral.",
      "A Mata Atlântica e o Cerrado são meus dois maiores 'pontos críticos' (hotspots) no Brasil.",
      "Sou composta tanto pela fauna (animais) quanto pela flora (plantas), fungos e microrganismos.",
      "Sou o maior patrimônio natural de um país."
    ]
  },
  {
    topic: "Pegada de Carbono",
    aliases: ["pegada de carbono", "pegada carbono"],
    hints: [
      "Sou uma métrica utilizada para medir o impacto das atividades humanas no aquecimento global.",
      "Expresso a quantidade total de gases de efeito estufa emitidos por uma pessoa, organização ou produto.",
      "Sou o 'rastro' invisível de poluição que deixamos enquanto vivemos nossa rotina.",
      "Empresas usam meu cálculo para tentar atingir o status de 'Carbono Zero'.",
      "Posso ser compensada através do plantio de árvores (reflorestamento) ou compra de créditos de carbono.",
      "Sou a medida das suas emissões de carbono.",
      "Diminuo quando você anda de bicicleta em vez de carro.",
      "Sou calculada levando em conta o ciclo de vida completo de um objeto.",
      "Represento o peso que cada indivíduo coloca sobre o clima da Terra.",
      "Meço o impacto climático de um produto."
    ]
  },
  {
    topic: "Biomassa",
    aliases: ["biomassa"],
    hints: [
      "Sou toda matéria orgânica de origem vegetal ou animal que pode ser usada para produzir energia.",
      "Sou uma das fontes de energia mais antigas.",
      "No Brasil, sou muito forte através do bagaço da cana-de-açúcar nas usinas.",
      "Posso ser gerada a partir de restos de madeira, cascas de arroz, serragem e até esterco de animais.",
      "Sou a base para a criação dos biocombustíveis, como o etanol.",
      "Dou um destino útil ao lixo orgânico e gero eletricidade.",
      "Sou uma alternativa estratégica para diminuir a dependência do petróleo e do carvão mineral.",
      "Sou a lenha, o álcool e o biogás.",
      "Diferente do sol e do vento, eu posso ser armazenada e usada a qualquer momento, sem depender do clima.",
      "Sou considerada 'carbono neutro' pela ciência."
    ]
  },
  {
    topic: "Pegada Hídrica",
    aliases: ["pegada hidrica", "pegada hídrica"],
    hints: [
      "Meço o volume total de água doce utilizada para produzir os bens e serviços que você consome.",
      "Não considero apenas a água que sai da torneira, mas toda a água envolvida no processo.",
      "Posso ser calculada para um indivíduo, para uma empresa ou até para um país inteiro.",
      "Sou uma ferramenta para calcular o impacto real da exportação de alimentos.",
      "Sou dividida em três cores: azul, verde e cinza.",
      "Sou uma ferramenta estratégica para garantir a Segurança Hídrica de uma região.",
      "Sou um dos principais critérios para a concessão de selos de sustentabilidade na indústria.",
      "Posso ser usada para planejar a adaptação de indústrias em zonas de estresse hídrico.",
      "Permito comparar o impacto ambiental de diferentes dietas e estilos de vida no planeta.",
      "Mostro que economizar água não é apenas fechar a torneira, mas repensar toda a cadeia de produção."
    ]
  },
  {
    topic: "Hidrelétrica",
    aliases: ["hidreletrica", "hidrelétrica", "energia hidrelétrica", "energia hidreletrica"],
    hints: [
      "Utilizo o movimento das águas para girar turbinas pesadas.",
      "Meu funcionamento depende diretamente do ciclo hidrológico e da gravidade.",
      "Sou considerada uma fonte de energia renovável, pois uso um recurso que se recompõe.",
      "Para me construir, é necessário alagar vastas áreas de florestas e ecossistemas.",
      "Sou responsável pela fragmentação de habitats e pela interrupção da migração de peixes.",
      "Sou uma fonte limpa de emissões na operação, mas minha construção tem uma pegada de carbono alta.",
      "Sou a principal fonte da matriz elétrica brasileira, gerando mais de 60% da energia do país.",
      "Ajudei o Brasil a ter uma das matrizes elétricas mais limpas entre as grandes economias.",
      "Sou movida a água e sofro com a falta de chuva.",
      "Sofro com o assoreamento dos rios, que diminui a minha capacidade de armazenar água."
    ]
  },
  {
    topic: "Energia Nuclear",
    aliases: ["energia nuclear", "nuclear"],
    hints: [
      "Libero energia através da divisão do núcleo de átomos pesados e instáveis.",
      "Meu processo principal é chamado de Fissão Nuclear.",
      "Minha tecnologia é a mesma utilizada para a criação de armas de destruição em massa.",
      "Minhas famosas torres de resfriamento liberam apenas vapor d'água puro na atmosfera.",
      "Meu maior problema é o que fazer com os meus resíduos, que permanecem perigosos por milênios.",
      "Exijo um grande volume de água para resfriar meus reatores, o que pode afetar a vida marinha local.",
      "Meus acidentes podem tornar áreas inteiras inabitáveis por anos devido à radiação.",
      "No Brasil, estou concentrada no município de Angra dos Reis, no Rio de Janeiro.",
      "Utilizo o elemento químico Urânio-235 como meu principal combustível.",
      "Utilizo o calor de reação para ferver água e gerar o vapor que move as turbinas."
    ]
  },
  {
    topic: "Acordo de Paris",
    aliases: ["acordo de paris", "acordo paris"],
    hints: [
      "Substituí o antigo Protocolo de Kyoto, tornando-me o principal tratado climático do mundo.",
      "Minha assinatura aconteceu na sede da ONU, em Nova York, no Dia da Terra.",
      "Fui o primeiro pacto global a unir quase todas as nações em uma causa ambiental única.",
      "Sou fruto de décadas de negociações iniciadas na Rio-92.",
      "Represento o consenso de que a crise climática é um problema que nenhum país resolve sozinho.",
      "Faço um esforço diplomático para que o aumento da temperatura não ultrapasse 1,5°C.",
      "Baseio minhas metas nos relatórios científicos do IPCC.",
      "Promovo a resiliência climática, preparando as cidades para eventos extremos.",
      "Estabeleci o princípio das 'Responsabilidades Comuns, porém Diferenciadas'.",
      "Incentivo o uso de mercados de carbono para facilitar o cumprimento das metas."
    ]
  },
  {
    topic: "ODS (Objetivos de Desenvolvimento Sustentável)",
    aliases: ["ods", "objetivos de desenvolvimento sustentavel", "objetivos desenvolvimento sustentavel", "objetivo de desenvolvimento sustentavel"],
    hints: [
      "Sou um conjunto de 17 metas globais estabelecidas pela Assembleia Geral das Nações Unidas.",
      "Fui assinado por todos os 193 Estados-membros da ONU.",
      "Sou o coração de um documento maior conhecido como Agenda 2030.",
      "Sou representado visualmente por um círculo colorido onde cada cor é um objetivo diferente.",
      "Além dos 17 grandes temas, possuo 169 metas específicas e detalhadas.",
      "Minha data limite para ser cumprida é o ano de 2030.",
      "No Brasil, sofro grandes desafios devido às desigualdades sociais e ao desmatamento.",
      "Sou usada por empresas brasileiras para guiar seus relatórios de ESG.",
      "Minha data limite para ser cumprida é o ano de 2030.",
      "Sou baseada em cinco pilares, conhecidos como os '5 Ps': Pessoas, Planeta, Prosperidade, Paz e Parcerias."
    ]
  },
  {
    topic: "IPCC (Painel Intergovernamental sobre Mudanças Climáticas)",
    aliases: ["ipcc", "painel intergovernamental", "painel intergovernamental sobre mudancas climaticas"],
    hints: [
      "Sou uma organização intergovernamental da ONU, criada em 1988.",
      "Não faço pesquisas originais; eu reviso e resumo toda a ciência climática já produzida no mundo.",
      "Meu objetivo é fornecer avaliações científicas periódicas sobre as mudanças do clima.",
      "Meus relatórios são a base para as decisões tomadas em conferências como o Acordo de Paris.",
      "Sou formado por milhares de cientistas voluntários de quase todos os países do globo.",
      "Meus relatórios passam por várias rodadas de revisão por outros cientistas e pelo governo.",
      "Divido meu trabalho em três grupos: a ciência física, os impactos/adaptação e a mitigação.",
      "Avalio cenários futuros chamados de 'Trajetórias Socioeconômicas Compartilhadas' (SSPs).",
      "Meus avisos tornaram-se cada vez mais alarmantes e urgentes nos últimos dez anos.",
      "Sou o mediador entre o laboratório do cientista e a mesa do político."
    ]
  },
  {
    topic: "Mineração",
    aliases: ["mineracao", "mineração"],
    hints: [
      "Sou uma das atividades econômicas mais antigas da humanidade, essencial desde a Idade do Bronze.",
      "Sou considerada uma atividade do Setor Primário da economia.",
      "Forneço a matéria-prima básica para quase tudo o que você usa: do celular ao prédio onde mora.",
      "No Brasil, sou um dos pilares da balança comercial e das exportações.",
      "Sem mim, não haveria transição energética, pois forneço o Lítio e o Cobre para carros elétricos.",
      "Sou uma atividade extrativista de recursos não renováveis.",
      "Causo alterações profundas e irreversíveis no relevo e na paisagem local.",
      "Produzo uma quantidade gigantesca de resíduos líquidos conhecidos como rejeitos.",
      "Minha pegada de carbono é alta devido ao uso de maquinário pesado e explosivos.",
      "Sou uma das maiores causadoras de desmatamento e perda de biodiversidade em áreas preservadas."
    ]
  },
  {
    topic: "Chuva Ácida",
    aliases: ["chuva acida", "chuva ácida"],
    hints: [
      "Sou o resultado da mistura de gases poluentes com o vapor d'água na atmosfera.",
      "Sou intensificada pela queima de combustíveis fósseis em fábricas, termelétricas e escapamentos de carros.",
      "Minhas reações químicas ocorrem enquanto as massas de ar transportam os poluentes por centenas de quilômetros.",
      "Sou um exemplo de poluição secundária.",
      "Provoco a queda prematura das folhas e destruo os tecidos protetores das árvores.",
      "Causo a morte de peixes e outros organismos aquáticos ao alterar o pH de lagos e rios.",
      "Sou famosa por corroer estátuas de mármore e monumentos históricos ao redor do mundo.",
      "No Brasil, fui um problema crítico na cidade de Cubatão (SP) durante a década de 1980.",
      "Diminuo a produtividade agrícola.",
      "Embora tenha diminuído em países ricos devido a filtros, continuo crescendo em países em rápida industrialização."
    ]
  },
  {
    topic: "Economia Circular",
    aliases: ["economia circular"],
    hints: [
      "Sou o oposto do modelo 'Extrair, Produzir, Descartar' da Revolução Industrial.",
      "Baseio-me na ideia de que os resíduos não existem; eles são apenas recursos no lugar errado.",
      "Sou um pilar fundamental para atingir os Objetivos de Desenvolvimento Sustentável (ODS) da ONU.",
      "Divido os materiais em dois ciclos: o biológico (que volta à terra) e o técnico (que volta à indústria).",
      "Minha implementação exige uma mudança na mentalidade de consumidores e empresários.",
      "Sou contra a Obsolescência Programada, quero que as coisas durem o máximo possível.",
      "Utilizo a Logística Reversa para garantir que o produto volte à fábrica após o uso.",
      "Promovo a Remanufatura, onde peças usadas são recuperadas para novos produtos.",
      "Sou uma das maiores ferramentas para reduzir a Pegada de Carbono das indústrias.",
      "Posso gerar milhões de novos empregos no setor de reparação, triagem e inovação."
    ]
  },
  {
    topic: "Biocombustíveis",
    aliases: ["biocombustiveis", "biocombustivel", "biocombustível", "biocombustíveis"],
    hints: [
      "Sou uma fonte de energia derivada de biomassa.",
      "Sou considerado um combustível renovável, pois meu ciclo de produção é muito curto.",
      "Meus principais exemplos líquidos são o Biodiesel e o Etanol.",
      "Posso ser produzido a partir de açúcares, amidos, óleos vegetais ou gordura animal.",
      "O Brasil é o pioneiro mundial no meu uso em larga escala, graças ao programa Proálcool de 1975.",
      "Minha principal matéria-prima no Brasil é a cana-de-açúcar.",
      "Nos Estados Unidos, sou produzido majoritariamente a partir do milho.",
      "Sou uma peça-chave na meta brasileira do Acordo de Paris para reduzir emissões.",
      "Se eu for produzido através do desmatamento de florestas, minha pegada de carbono deixa de ser positiva.",
      "Sou uma solução de transição, pois ainda dependo de motores a combustão para funcionar."
    ]
  },
  {
    topic: "Microplásticos",
    aliases: ["microplasticos", "microplásticos", "microplastico"],
    hints: [
      "Sou definido como qualquer partícula de plástico com menos de 5 milímetros de tamanho.",
      "Minha origem pode estar nas suas roupas, como no poliéster.",
      "Posso ser transportado pelo vento, pela chuva e pelo mar.",
      "Sou facilmente ingerido por organismos na base da cadeia alimentar, como pequenos peixes.",
      "Já fui encontrado nas fossas mais profundas do oceano e no topo das montanhas mais altas.",
      "Posso liberar 'disruptores endócrinos', que bagunçam os hormônios dos animais.",
      "Cientistas já me detectaram no sangue humano, no pulmão e até na placenta de bebês.",
      "Sou um dos grandes argumentos para a proibição de plásticos de uso único (canudos, copos e talheres).",
      "Sou o símbolo da 'poluição invisível': o perigo que não vemos, mas que está em todo lugar.",
      "Atuo como uma 'esponja química', absorvendo poluentes tóxicos da água ao meu redor."
    ]
  },
  {
    topic: "Mudança Climática",
    aliases: ["mudanca climatica", "mudanças climaticas", "mudancas climaticas", "mudança climática"],
    hints: [
      "Sou a alteração persistente nos padrões do clima global por longos períodos.",
      "Posso ser causada por fatores da própria natureza ao longo de milênios.",
      "A ideia de 'aquecimento global' é apenas uma das minhas facetas.",
      "Não aconteço em um dia, mas ao longo de décadas ou séculos.",
      "Embora eu possa ser natural, o que preocupa hoje é a minha velocidade inédita.",
      "A Revolução Industrial foi o 'gatilho' para a minha aceleração artificial.",
      "'Aquecimento Global' e 'Efeito Estufa' são palavras que sempre me acompanham.",
      "Sou um grande desafio do século XXI.",
      "Sou a alteração de todos os padrões meteorológicos do planeta: correntes marítimas, chuvas, ventos e umidade.",
      "Sou o termo mais completo, englobando muito mais do que apenas o calor."
    ]
  },
  {
    topic: "Energia Geotérmica",
    aliases: ["energia geotermica", "geotermica", "geotérmica"],
    hints: [
      "Utilizo o calor proveniente do interior do planeta para gerar eletricidade.",
      "Sou considerada uma fonte de energia renovável.",
      "Utilizo poços profundos para trazer o vapor ou água quente para cima.",
      "Ofereço Energia de Base: opero 24 horas por dia, 7 dias por semana, sem interrupções.",
      "Minha eficiência é altíssima porque não preciso queimar combustível para gerar calor.",
      "Posso ser combinada com tecnologias de dessalinização para produzir água potável.",
      "Sou uma solução estratégica para a independência energética de ilhas vulcânicas.",
      "A Islândia é o maior exemplo mundial: muitas casas lá são aquecidas por mim.",
      "Funciono melhor em regiões de limites de placas tectônicas, onde o calor está mais próximo da superfície.",
      "Aproveito reservatórios de água e vapor sob alta pressão encontrados no subsolo."
    ]
  },
  {
    topic: "Eutrofização",
    aliases: ["eutrofizacao", "eutrofização"],
    hints: [
      "Sou um processo de poluição em ecossistemas aquáticos, como lagos, rios e represas.",
      "Começo com o acúmulo excessivo de nutrientes na água, principalmente Nitrogênio e Fósforo.",
      "Minha principal causa humana é o despejo de esgoto doméstico sem tratamento.",
      "Provoco o aumento explosivo de populações de algas e cianobactérias na superfície.",
      "Sou mais comum em águas lentas ou paradas (lênticas), onde os nutrientes não se dispersam.",
      "Algumas algas que crescem comigo podem liberar toxinas perigosas para animais e humanos.",
      "Reduzo drasticamente a biodiversidade.",
      "Sou agravada pelo desmatamento da mata ciliar, que deixa de filtrar os nutrientes que iriam para o rio.",
      "Também sou causada pelo escoamento de fertilizantes agrícolas lavados pela chuva.",
      "Sou um fenômeno que altera a cor da água, deixando-a esverdeada ou turva."
    ]
  },
  {
    topic: "Unidades de Conservação (UCs)",
    aliases: ["unidades de conservacao", "unidades conservacao", "ucs", "unidade de conservação"],
    hints: [
      "Tenho como objetivo garantir a preservação da biodiversidade e dos recursos genéticos.",
      "Represento a soberania nacional sobre os recursos genéticos e a riqueza natural.",
      "No grupo de Proteção Integral, o objetivo é manter a natureza intocada, permitindo apenas uso indireto.",
      "No grupo de Uso Sustentável, busco conciliar a conservação com o uso de parte dos recursos.",
      "Sou gerida, no nível federal, por dois órgãos principais: o ICMBio e o Ibama.",
      "Na categoria mais firme, também posso proteger ambientes marinhos e costeiros.",
      "Sou uma das principais ferramentas do Brasil para cumprir metas internacionais de conservação.",
      "Protejo os 'corredores ecológicos', permitindo que as espécies migrem para fugir do aquecimento global.",
      "Ao conservar vegetação, garanto sumidouro de carbono, estocando toneladas de CO2 na biomassa e no solo.",
      "Ajudo a manter o equilíbrio do ciclo hidrológico, protegendo as nascentes que abastecem as cidades."
    ]
  },
  {
    topic: "Coleta Seletiva",
    aliases: ["coleta seletiva", "reciclagem"],
    hints: [
      "Sou um sistema de recolhimento de resíduos descartados separadamente por fonte geradora.",
      "Sou fundamental para o sucesso da Logística Reversa nas empresas.",
      "Ajudo a aumentar a vida útil dos Aterros Sanitários, evitando que fiquem superlotados.",
      "Evito que resíduos perigosos, como pilhas e baterias, contaminem o solo e a água.",
      "Sou a base da Economia Circular, garantindo que o resíduo vire recurso.",
      "Sou o primeiro passo para que a cidade consiga diminuir o impacto do seu próprio consumo.",
      "Sou uma das principais formas de inclusão social e renda para os Catadores de Materiais Recicláveis.",
      "Sou um dever compartilhado entre cidadãos, empresas e o governo.",
      "Diminuo a poluição visual e os odores desagradáveis nas áreas urbanas.",
      "Exijo educação ambiental constante para que a população não misture o lixo incorretamente."
    ]
  },
  {
    topic: "Segurança Energética",
    aliases: ["seguranca energetica", "segurança energética"],
    hints: [
      "Sou a capacidade de um país garantir o fornecimento ininterrupto de energia a um preço acessível.",
      "Sou o motivo de muitos conflitos e guerras ao longo da história, especialmente por causa de petróleo.",
      "Devo me encaixar em curto prazo (capacidade de resposta a choques) e longo prazo (investimentos futuros).",
      "Envolvo a criação de 'Reservas Estratégicas' (estoques de combustível para emergências).",
      "Sou diretamente afetada por sanções econômicas e bloqueios comerciais entre nações.",
      "Quanto mais fontes nacionais um país possui, maior será minha estabilidade.",
      "As mudanças climáticas são a nova grande ameaça à minha estabilidade.",
      "Sou afetada pela 'Pobreza Energética', quando a população não consegue pagar pela luz e pelo calor.",
      "Sou o equilíbrio delicado entre três fatores: Sustentabilidade, Preço e Disponibilidade.",
      "Sou o escudo contra apagões e crises internacionais de combustíveis."
    ]
  },
  {
    topic: "Extinção de Espécies",
    aliases: ["extincao de especies", "extinção de espécies", "extincao", "extinção"],
    hints: [
      "Sou o desaparecimento definitivo de todos os indivíduos de uma espécie na Terra.",
      "Minha causa principal hoje é a perda e fragmentação de habitats.",
      "Sou acelerada pela introdução de espécies invasoras que competem com as nativas.",
      "A caça e a pesca predatórias são formas diretas de me causar.",
      "Comigo, a humanidade perde potenciais curas para doenças que poderiam estar em plantas ou venenos de animais.",
      "Reduzo a estabilidade dos ecossistemas, tornando-os mais frágeis a pragas e doenças.",
      "A criação de Unidades de Conservação é uma forma de me combater.",
      "Minha prevenção custa muito menos do que tentar recuperar um ecossistema degradado.",
      "Sou irreversível.",
      "O tráfico de animais silvestres é um motor econômico ilegal que me alimenta."
    ]
  }
];
