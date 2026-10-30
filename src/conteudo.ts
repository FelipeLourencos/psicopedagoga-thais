/**
 * CONTEÚDO DO SITE
 * ================
 * Tudo o que é específico do negócio fica neste arquivo: nome, contatos, textos,
 * fotos e cores. Os componentes só leem daqui, então para ajustar o site basta
 * editar este arquivo (veja o COMO-USAR.md).
 *
 * Dicas rápidas
 * - Campos marcados como "opcional" podem ficar vazios ("", [] ou null): a seção ou o
 *   elemento correspondente some do site sem quebrar o layout.
 * - Fotos podem ser um endereço da internet (https://...) ou um arquivo dentro de
 *   public/, escrito a partir da barra. Ex.: public/images/sala.webp vira "/images/sala.webp".
 * - "alt" é a descrição da foto para leitores de tela e para o Google.
 * - Selos e avaliações ficam melhores com número par de itens.
 * - Se faltar algum campo obrigatório, o editor sublinha em vermelho e o
 *   `npm run build` acusa o erro.
 */

// ---------------------------------------------------------------------------
// Tipos (o "formulário" que o conteúdo precisa preencher). Não é preciso mexer aqui.
// ---------------------------------------------------------------------------

/** Uma foto com a sua descrição. */
export type Foto = {
  /** Endereço da imagem: "https://..." ou "/images/arquivo.webp" (dentro de public/). */
  src: string
  /** Descrição curta do que aparece na foto. */
  alt: string
  /** Opcional: versão menor usada em telas de até 767px. */
  srcCelular?: string
}

export type Link = {
  rotulo: string
  /** Endereço completo (https://...) ou id de seção (#duvidas). */
  link: string
}

export type Horario = {
  /** Ex.: "Segunda a quinta". */
  dias: string
  /** Ex.: "9h às 12h". Para dois períodos: "9h às 12h e 19h às 21h". */
  horas: string
}

/** Ícones disponíveis para os selos. */
export type Icone = "estrela" | "avaliacoes" | "escola" | "local"

export type Selo = {
  texto: string
  icone: Icone
}

export type Avaliacao = {
  /** Quem avaliou, ou um rótulo como "Família atendida". Nunca use nome de criança. */
  autor: string
  /** Etiqueta discreta com a origem. Ex.: "Avaliação no Google", "Mensagem de uma família". */
  fonte: string
  /** Mostra as 5 estrelas. Use só em avaliações com nota (Google); mensagens não têm nota. */
  estrelas: boolean
  texto: string
}

export type PerguntaFrequente = {
  pergunta: string
  resposta: string
  /** Opcional: link mostrado depois da resposta. Ex.: { rotulo: "Abrir no Maps", link: "https://..." } */
  link?: Link
}

export type Conteudo = {
  /** Dados do negócio */
  negocio: {
    nome: string
    /** Formação, mostrada abaixo do nome no cabeçalho e no rodapé. */
    profissao: string
    /** Versão curta da profissão, para o cabeçalho no celular. */
    profissaoCurta: string
    bairro: string
    /** Endereço em duas linhas. */
    endereco: { linha1: string; linha2: string }
    /** Link do perfil no Google (avaliações e mapa). "" esconde. */
    linkGoogle: string
    /** Opcional: endereço do mapa incorporado (Google Maps com output=embed). "" esconde o mapa. */
    mapaIncorporado: string
    /** WhatsApp só com números: 55 + DDD + número. "" esconde os botões de WhatsApp. */
    whatsapp: string
    /** Mensagem que já vem escrita quando a pessoa abre o WhatsApp. */
    mensagemWhatsapp: string
    instagram: {
      /** Nome de usuário, sem @. */
      usuario: string
      /** Endereço do perfil. "" esconde. */
      link: string
    }
  }

  /** Dias e horários de atendimento, na ordem em que devem aparecer. */
  horarios: Horario[]
  /** Opcional: linha extra com os dias fechados. "" esconde. */
  diasFechados: string

  /** Descrição para o Google e cor da barra do navegador (o título da aba fica no index.html). */
  seo: {
    titulo: string
    descricao: string
    /** Cor da barra do navegador no celular (hex). */
    corTema: string
  }

  /** Botões usados em várias seções */
  botoes: {
    /** WhatsApp: topo, cabeçalho e final. */
    principal: string
    /** Botão secundário do topo, que leva às avaliações. "" esconde. */
    secundario: string
    /** Texto lido por leitores de tela no botão flutuante do WhatsApp (só no celular). "" esconde o botão. */
    flutuante: string
  }

  /** Cabeçalho (menu do topo) */
  cabecalho: {
    /** Links do menu ("#id" da seção). Links de seções vazias somem sozinhos. */
    links: Link[]
  }

  /** Topo (primeira tela) */
  topo: {
    titulo: string
    /** Opcional: uma linha de apoio abaixo do título. "" esconde. */
    texto: string
    /** Opcional: foto vertical ao lado do título (4:5 no computador, quadrada no celular). null esconde. */
    foto: Foto | null
    /** Opcional: selos abaixo do topo. Use número par. [] esconde. */
    selos: Selo[]
  }

  /** Seção "Sobre". Sem parágrafos, a seção some. */
  sobre: {
    titulo: string
    paragrafos: string[]
    /** Opcional: frase em destaque, grande e na cor principal, depois do primeiro parágrafo. "" esconde. */
    destaque: string
    /** Opcional: foto vertical (4:5 no computador, 6:5 no celular). null esconde. */
    foto: Foto | null
  }

  /** Galeria dos jogos e materiais. Sem fotos, a seção some. */
  recursos: {
    titulo: string
    /** Opcional: frase abaixo do título. "" esconde. */
    texto: string
    /**
     * Quatro fotos, nesta ordem: destaque (4:5), horizontal (5:3) e duas verticais (4:5).
     * No celular, todas viram quadradas (grade 2x2).
     */
    fotos: Foto[]
  }

  /** Passo a passo do atendimento (numerado na ordem da lista). Sem passos, a seção some. */
  comoFunciona: {
    titulo: string
    passos: string[]
    /** Opcional: foto vertical ao lado dos passos. null esconde. */
    foto: Foto | null
  }

  /** Quando vale procurar ajuda. Sem itens, a seção some. */
  quandoProcurar: {
    titulo: string
    /** Opcional: parágrafo de introdução. "" esconde. */
    texto: string
    /** Frase que abre a lista. */
    subtitulo: string
    /** Sinais, um por item da lista. */
    itens: string[]
    /** Opcional: observação em caixa clara depois da lista. "" esconde. */
    nota: string
    /** Opcional: texto ao lado do botão do WhatsApp, no fim da seção. "" esconde. */
    fechamento: string
  }

  /** Avaliações. Sem itens, a seção some. */
  avaliacoes: {
    titulo: string
    /** Opcional: links para ver todas as avaliações. [] esconde. */
    links: Link[]
    /** Texto lido por leitores de tela no lugar das 5 estrelas. */
    rotuloEstrelas: string
    /** Use número par de avaliações. */
    itens: Avaliacao[]
  }

  /** Perguntas frequentes. Sem itens, a seção some. */
  perguntas: {
    titulo: string
    itens: PerguntaFrequente[]
  }

  /** Chamada final, com horários e mapa */
  agenda: {
    titulo: string
    texto: string
    /** Texto do link abaixo do mapa (abre o negocio.linkGoogle). */
    abrirMapa: string
  }

  /** Rodapé */
  rodape: {
    /** Linha final, depois do "© ano". */
    direitos: string
    /** Opcional: aviso de site de demonstração. "" esconde. */
    avisoDemonstracao: string
  }

  /**
   * Cores do tema, em hex. Todo o site deriva delas. Confira o contraste WCAG AA (4,5:1)
   * de "tinta", "tintaSuave" e "principalForte" sobre os fundos.
   */
  cores: {
    /** Fundo principal (creme rosado). */
    fundo: string
    /** Fundo das seções lilás claras. */
    fundoLilas: string
    /** Fundo das seções azul piscina claras. */
    fundoPiscina: string
    /** Texto principal e fundo do rodapé. */
    tinta: string
    /** Texto secundário. */
    tintaSuave: string
    /** Cor principal da marca (lilás): ícones, detalhes e títulos grandes. */
    principal: string
    /** Lilás mais escuro, para botões e links (texto branco por cima). */
    principalForte: string
    /** Cor de apoio (azul piscina): selos e marcações. */
    apoio: string
  }
}

// ---------------------------------------------------------------------------
// Conteúdo da Thais Oliveira. Edite daqui para baixo.
// ---------------------------------------------------------------------------

const linkGoogle =
  "https://www.google.com/maps/search/?api=1&query=Thais+Oliveira+Psicopedagoga&query_place_id=ChIJ8R_6bYFXzpQRVGKzekPIqiE"

// ===== Dados do negócio =====
const negocio: Conteudo["negocio"] = {
  nome: "Thais Oliveira",
  profissao: "Pedagoga e Psicopedagoga Clínica e Institucional",
  profissaoCurta: "Psicopedagoga",
  bairro: "Pompeia",
  endereco: { linha1: "R. Cotoxó, 303, conj. 24", linha2: "Pompeia, São Paulo - SP, 05021-000" },
  linkGoogle,
  mapaIncorporado:
    "https://www.google.com/maps?q=R.+Cotox%C3%B3,+303+-+Pompeia,+S%C3%A3o+Paulo+-+SP,+05021-000&output=embed",
  whatsapp: "5511988564325",
  mensagemWhatsapp: "Olá, Thais! Vim pelo site e gostaria de saber mais sobre o acompanhamento.",
  instagram: {
    usuario: "psicopedagogathaiso",
    link: "https://www.instagram.com/psicopedagogathaiso/",
  },
}

export const conteudo: Conteudo = {
  negocio,

  // ===== Horários de atendimento =====
  horarios: [
    { dias: "Segunda a quinta", horas: "9h às 12h" },
    { dias: "Sexta", horas: "9h às 12h e 19h às 21h" },
    { dias: "Sábado", horas: "9h às 11h e 13h às 14h" },
  ],
  diasFechados: "Domingo, fechado",

  // ===== Google =====
  seo: {
    titulo: "Thais Oliveira | Psicopedagoga na Pompeia",
    descricao:
      "Thais Oliveira, pedagoga e psicopedagoga clínica e institucional na Pompeia, São Paulo. Acompanhamento de crianças com dificuldades de aprendizagem, em parceria com a família e a escola.",
    corTema: "#fcf5f2",
  },

  // ===== Botões =====
  botoes: {
    principal: "Agendar uma conversa",
    secundario: "Ver avaliações",
    flutuante: "Conversar com a Thais no WhatsApp",
  },

  // ===== Cabeçalho =====
  cabecalho: {
    links: [
      { rotulo: "Sobre", link: "#sobre" },
      { rotulo: "Como funciona", link: "#como-funciona" },
      { rotulo: "Avaliações", link: "#avaliacoes" },
      { rotulo: "Dúvidas", link: "#duvidas" },
    ],
  },

  // ===== Topo =====
  topo: {
    titulo: "Ajudo seu filho a superar desafios de aprendizagem.",
    texto: "Atendimento Psicopedagógico Clínico",
    foto: {
      src: "/images/thais-canetas.webp",
      srcCelular: "/images/thais-canetas-mobile.webp",
      alt: "Thais Oliveira sorrindo, segurando canetinhas verde, amarela, vermelha e azul",
    },
    selos: [
      { texto: "5 estrelas no Google", icone: "estrela" },
      { texto: "26 avaliações de famílias", icone: "avaliacoes" },
      { texto: "Parceria com a escola", icone: "escola" },
      { texto: "Atendimento na Pompeia", icone: "local" },
    ],
  },

  // ===== Sobre =====
  sobre: {
    titulo: "Olá, sou Thais Oliveira!",
    paragrafos: [
      "Sou formada em Pedagogia, pós-graduada em Psicopedagogia e especialista em Neurociências Aplicadas à Educação. Atuo na área da educação há mais de 10 anos e, ao longo dessa trajetória, uma convicção se tornou cada vez mais forte: toda criança é capaz de aprender.",
      "Para que isso aconteça, é fundamental olhar com atenção para suas necessidades, conhecer seu perfil de aprendizagem e compreender quais caminhos e estratégias podem ajudá-la a desenvolver suas potencialidades.",
      "Sabe aquela criança que muitas vezes é chamada de “preguiçosa” porque evita as tarefas ou parece não se esforçar? Esse comportamento pode ser uma forma de mostrar que algo está difícil e que ela precisa de ajuda. Por isso, acredito na importância de olhar além das dificuldades, sem rotular a criança.",
      "No consultório, realizo avaliação e intervenção psicopedagógica com crianças que apresentam dificuldades na leitura, na escrita e na matemática e transtornos do neurodesenvolvimento. Também trabalho com a intervenção cognitiva, buscando desenvolver habilidades que sustentam a aprendizagem, como atenção, memória, planejamento, flexibilidade cognitiva, entre outros.",
      "Os jogos e os recursos lúdicos fazem parte desse processo. Por meio deles, a criança pode experimentar, criar estratégias e aprender de uma maneira significativa e envolvente.",
      "Acredito, ainda, que o acompanhamento se fortalece quando família e escola caminham juntas. Por isso, mantenho um diálogo constante com os responsáveis, professores e coordenadores, para que possamos compartilhar orientações e favorecer o desenvolvimento da criança em diferentes contextos.",
    ],
    destaque: "Toda criança é capaz de aprender.",
    foto: {
      src: "/images/thais-livro.webp",
      srcCelular: "/images/thais-livro-mobile.webp",
      alt: "Thais Oliveira sorrindo enquanto folheia um livro infantil ilustrado",
    },
  },

  // ===== Aprender brincando =====
  recursos: {
    titulo: "Aprender brincando",
    texto: "Os jogos e os recursos lúdicos fazem parte desse processo.",
    fotos: [
      {
        src: "/images/thais-chao.webp",
        srcCelular: "/images/thais-chao-mobile.webp",
        alt: "Thais sentada no chão do consultório, brincando com dinossauros e letras móveis coloridas",
      },
      {
        src: "/images/mesa-materiais.webp",
        srcCelular: "/images/mesa-materiais-mobile.webp",
        alt: "Mesa com livro de atividades de leitura e escrita, labirinto em esfera, lápis de cor e régua de formas",
      },
      {
        src: "/images/thais-jogos.webp",
        srcCelular: "/images/thais-jogos-mobile.webp",
        alt: "Thais apoiada numa pilha de jogos de tabuleiro",
      },
      {
        src: "/images/thais-labirinto.webp",
        srcCelular: "/images/thais-labirinto-mobile.webp",
        alt: "Thais segurando um labirinto em esfera",
      },
    ],
  },

  // ===== Como funciona =====
  comoFunciona: {
    titulo: "Como funciona o atendimento",
    passos: [
      "Entrevista contratual e anamnese com os pais",
      "Avaliação psicopedagógica",
      "Relatórios e devolutivas para os pais e a equipe escolar",
      "Alinhamento de estratégias e direcionamento do plano de intervenção",
    ],
    foto: {
      src: "/images/thais-maos.webp",
      srcCelular: "/images/thais-maos-mobile.webp",
      alt: "Thais Oliveira sorrindo e segurando as mãos de uma mãe, na mesa do consultório",
    },
  },

  // ===== Quando procurar =====
  quandoProcurar: {
    titulo: "Quando procurar uma psicopedagoga",
    texto:
      "Cada criança tem a sua maneira de aprender e pode precisar de diferentes tipos de apoio ao longo de sua trajetória escolar. Em alguns momentos, porém, as dificuldades persistem ou começam a afetar sua confiança, sua motivação e sua relação com a aprendizagem, além de provocar baixo desempenho escolar e social.",
    subtitulo: "A avaliação psicopedagógica pode ser indicada quando a criança:",
    itens: [
      "Apresenta dificuldades na leitura, na escrita ou na matemática;",
      "Tem dificuldade para compreender o que lê ou para registrar suas ideias por escrito;",
      "Precisa de muito apoio para iniciar, organizar ou concluir as atividades;",
      "Apresenta dificuldades para manter a atenção ou lembrar informações necessárias para realizar uma tarefa;",
      "Evita atividades escolares, demonstra frustração ou diz que “não consegue aprender”;",
      "Dedica tempo aos estudos, mas ainda encontra dificuldades para acompanhar as propostas escolares;",
      "Demonstra desmotivação com as tarefas escolares;",
      "Tem desempenho escolar abaixo do esperado em relação às outras crianças da mesma idade.",
    ],
    nota:
      "Esses sinais podem aparecer de formas diferentes em cada criança e não indicam, por si só, um diagnóstico. A avaliação ajuda a compreender como ela aprende, identificar suas potencialidades e necessidades e orientar os próximos passos.",
    fechamento:
      "Se você tem dúvidas sobre a aprendizagem do seu filho ou recebeu alguma observação da escola, podemos conversar. Juntos, vamos buscar caminhos para apoiá-lo e ajudá-lo a superar seus desafios!",
  },

  // ===== Avaliações =====
  avaliacoes: {
    titulo: "O que as famílias dizem",
    links: [{ rotulo: "Ver todas as avaliações no Google", link: linkGoogle }],
    rotuloEstrelas: "5 de 5 estrelas",
    itens: [
      {
        autor: "Família atendida",
        fonte: "Avaliação no Google",
        estrelas: true,
        texto:
          "Ela desenvolveu um trabalho muito completo e profundo com a nossa pequena, que foi o que fez a diferença real no desenvolvimento escolar dela. É de destacar o compromisso da Thais em trabalhar junto com a escola, acompanhando passo a passo cada etapa da evolução.",
      },
      {
        autor: "Família atendida",
        fonte: "Avaliação no Google",
        estrelas: true,
        texto:
          "Extremamente atenciosa, dedicada e acolhedora. Sempre demonstra sensibilidade para entender as necessidades da nossa filha, criando um ambiente seguro e de confiança. Desde que iniciamos o acompanhamento, notamos avanços significativos no aprendizado.",
      },
      {
        autor: "Família atendida",
        fonte: "Avaliação no Google",
        estrelas: true,
        texto:
          "A Thais participou de toda a educação infantil da minha filha, desde a adaptação escolar aos 2 anos, que foi muito difícil, até a alfabetização aos 6. Sou eternamente grata por todo o trabalho dela.",
      },
      {
        autor: "Família atendida",
        fonte: "Avaliação no Google",
        estrelas: true,
        texto:
          "Tem um jeito muito especial de falar com as crianças. Elas se encantam com ela e absorvem as orientações de um jeito lúdico e simples.",
      },
      {
        autor: "Família atendida",
        fonte: "Avaliação no Google",
        estrelas: true,
        texto:
          "Excelente profissional! Atualizada, dedicada, comprometida e com foco no desenvolvimento integral das crianças. Suas orientações são claras e objetivas, baseadas no olhar sensível que tem por cada criança.",
      },
      {
        autor: "Família atendida",
        fonte: "Mensagem de uma família",
        estrelas: false,
        texto:
          "Olá! Passando aqui para compartilhar o progress report [da nossa filha], gente, que alegria, muitos A e B e somente 1 C. Thaís, gratidão por todo o trabalho, empenho e dedicação desde sempre.",
      },
      {
        autor: "Família atendida",
        fonte: "Mensagem de uma família",
        estrelas: false,
        texto:
          "Hoje está sendo a minha GRATIDÃO por tudo que está acontecendo com [ela]. Obrigada pela profissional de excelência que está sendo para ela no aprendizado. Gratidão!",
      },
      {
        autor: "Família atendida",
        fonte: "Mensagem de uma família",
        estrelas: false,
        texto:
          "Gostaria de agradecer formalmente pela parceria, pelo profissionalismo e pelas orientações tão assertivas que nos deu nos últimos meses. O seu trabalho psicopedagógico foi um divisor de águas. Ele nos deu as ferramentas certas para compreender e apoiar as necessidades de desenvolvimento da nossa filha, integrando de forma leve a escola e a rotina de estudos. Parabéns pelo trabalho tão nobre e essencial. Nossa eterna gratidão!",
      },
    ],
  },

  // ===== Perguntas frequentes =====
  perguntas: {
    titulo: "Perguntas frequentes",
    itens: [
      {
        pergunta: "O que faz uma psicopedagoga?",
        resposta:
          "A psicopedagoga busca compreender como a criança aprende, quais são suas potencialidades e quais dificuldades podem estar interferindo nesse processo. Por meio da avaliação psicopedagógica, investiga diferentes aspectos da aprendizagem, como leitura, escrita, matemática, atenção, memória e organização. A partir dessa compreensão, planeja intervenções e utiliza jogos e recursos lúdicos para ajudar a criança a desenvolver habilidades e construir estratégias para aprender.",
      },
      {
        pergunta: "Qual a diferença entre avaliação e intervenção psicopedagógica?",
        resposta:
          "Na avaliação, são identificadas as principais dificuldades cognitivas e pedagógicas da criança. Em um segundo momento, é elaborado um plano de intervenção personalizado de acordo com as necessidades dela, a partir das dificuldades identificadas na avaliação.",
      },
      {
        pergunta: "A partir de qual idade as crianças são atendidas?",
        resposta:
          "Realizo atendimento com crianças de 6 a 10 anos.",
      },
      {
        pergunta: "Quanto tempo duram as sessões?",
        resposta:
          "Cada sessão tem a duração de 50 minutos. Ao longo do acompanhamento psicopedagógico, são realizados também atendimentos com a família e a equipe escolar para alinhar objetivos e estratégias para apoiar o desenvolvimento da criança.",
      },
      {
        pergunta: "Como é a primeira conversa?",
        resposta:
          "É uma conversa com os pais. Vocês contam o que estão percebendo em casa e o que a escola tem relatado, tiram dúvidas e combinam os próximos passos.",
      },
    ],
  },

  // ===== Chamada final =====
  agenda: {
    titulo: "Vamos conversar sobre o seu filho?",
    texto:
      "Pelo WhatsApp você conta o que está acontecendo e combina um horário para a primeira conversa.",
    abrirMapa: "Abrir no Google Maps",
  },

  // ===== Rodapé =====
  rodape: {
    direitos: `${negocio.nome}.`,
    avisoDemonstracao: "",
  },

  // ===== Cores =====
  cores: {
    fundo: "#fcf5f2",
    fundoLilas: "#f0ebf8",
    fundoPiscina: "#e6f3f4",
    tinta: "#2f2942",
    tintaSuave: "#5d5672",
    principal: "#8e7cc3",
    principalForte: "#5f4d9c",
    apoio: "#a8d5d8",
  },
}
