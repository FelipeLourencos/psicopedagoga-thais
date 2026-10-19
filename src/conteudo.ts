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
 * - Selos, passos, cards e avaliações ficam melhores com número par de itens.
 * - Trechos marcados com "A CONFIRMAR" precisam ser validados com a Thais.
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

/** Ícones disponíveis para selos e cards. */
export type Icone =
  | "estrela"
  | "avaliacoes"
  | "escola"
  | "local"
  | "leitura"
  | "alfabetizacao"
  | "atencao"
  | "adaptacao"

export type Selo = {
  texto: string
  icone: Icone
}

export type Passo = {
  titulo: string
  texto: string
}

export type Card = {
  icone: Icone
  titulo: string
  texto: string
}

export type Avaliacao = {
  /** Quem avaliou, ou um rótulo como "Família atendida". */
  autor: string
  /** Onde a avaliação foi feita. Ex.: "Google". */
  fonte: string
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
    /**
     * Opcional: vídeo mudo em loop no fundo do topo, sob uma camada creme. src "" esconde.
     * As versões "Celular" (960px) são usadas em telas de até 767px.
     */
    videoFundo: { src: string; srcCelular: string; poster: string; posterCelular: string }
    /** Opcional: selos abaixo do topo. Use número par. [] esconde. */
    selos: Selo[]
  }

  /** Seção "Sobre". Sem parágrafos, a seção some. */
  sobre: {
    titulo: string
    /** Linha abaixo do título (formação). "" esconde. */
    subtitulo: string
    paragrafos: string[]
    /** Opcional: foto vertical (4:5). null esconde. */
    foto: Foto | null
  }

  /** Passo a passo do atendimento. Sem passos, a seção some. */
  comoFunciona: {
    titulo: string
    /** Opcional: frase abaixo do título. "" esconde. */
    texto: string
    /** Use número par de passos. */
    passos: Passo[]
  }

  /** Situações em que vale procurar ajuda. Sem itens, a seção some. */
  quandoProcurar: {
    titulo: string
    /** Opcional: frase abaixo do título. "" esconde. */
    texto: string
    /** Use número par de cards. */
    itens: Card[]
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
    texto: "Atendimento psicopedagógico na Pompeia, em parceria com a família e a escola.",
    // Vídeo do Pexels (7431749): mão colorindo um mapa com lápis de cor, sem rostos
    videoFundo: {
      src: "/videos/topo.mp4",
      srcCelular: "/videos/topo-mobile.mp4",
      poster: "/videos/topo-poster.webp",
      posterCelular: "/videos/topo-poster-mobile.webp",
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
    titulo: "Thais Oliveira",
    subtitulo: "Pedagoga e psicopedagoga clínica e institucional",
    paragrafos: [
      "Sou pedagoga e psicopedagoga, com atuação clínica e institucional. No consultório da Pompeia, acompanho crianças que estão encontrando dificuldade para aprender, seja na leitura, na escrita, na atenção ou na adaptação à escola.",
      "O trabalho não fica restrito às sessões. Converso com a família e, com a autorização dos pais, com coordenadores e professores, para que todos sigam na mesma direção e a evolução da criança apareça também em sala de aula.",
    ],
    // TROCAR pela foto da Thais (hoje é uma foto do Pexels de uma mesa de atividades)
    foto: {
      src: "/images/mesa-atividades.webp",
      srcCelular: "/images/mesa-atividades-mobile.webp",
      alt: "Mesa branca com jogos e quebra-cabeças de madeira",
    },
  },

  // ===== Como funciona =====
  // A CONFIRMAR: etapas e descrições com a Thais
  comoFunciona: {
    titulo: "Como funciona o acompanhamento",
    texto: "Cada etapa é combinada com os pais antes de começar.",
    passos: [
      {
        titulo: "Primeira conversa com a família",
        texto:
          "Os pais contam o que estão percebendo em casa e o que a escola tem relatado. É o momento de tirar dúvidas e entender se o acompanhamento faz sentido.",
      },
      {
        titulo: "Avaliação psicopedagógica",
        texto:
          "Alguns encontros com a criança, com atividades e jogos, para entender como ela aprende e onde estão as dificuldades. Depois, a família recebe uma devolutiva.",
      },
      {
        titulo: "Acompanhamento semanal",
        texto:
          "Sessões semanais com atividades planejadas para o que a criança precisa desenvolver, e conversas com os pais sobre a evolução.",
      },
      {
        titulo: "Contato com a escola",
        texto:
          "Com a autorização da família, a Thais conversa com coordenadores e professores para alinhar o que é feito no consultório com o que acontece em sala.",
      },
    ],
  },

  // ===== Quando procurar =====
  quandoProcurar: {
    titulo: "Quando procurar uma psicopedagoga",
    texto: "Algumas situações que costumam levar as famílias a buscar ajuda.",
    itens: [
      {
        icone: "leitura",
        titulo: "Dificuldade de leitura e escrita",
        texto:
          "A criança troca ou esquece letras, lê com muito esforço ou evita ler em voz alta, e a escrita fica abaixo do que ela consegue dizer.",
      },
      {
        icone: "alfabetizacao",
        titulo: "Alfabetização",
        texto:
          "Aprender a ler e a escrever está levando mais tempo do que o esperado, ou a escola sinalizou que ela precisa de apoio nessa fase.",
      },
      {
        icone: "atencao",
        titulo: "Dificuldade de atenção e concentração",
        texto:
          "Ela se distrai com facilidade, perde o fio das tarefas e a lição de casa vira uma batalha longa todos os dias.",
      },
      {
        icone: "adaptacao",
        titulo: "Adaptação escolar",
        texto:
          "A entrada na escola, a troca de escola ou a mudança de etapa vem com choro, resistência ou insegurança que não passam com o tempo.",
      },
    ],
  },

  // ===== Avaliações =====
  avaliacoes: {
    titulo: "O que as famílias dizem",
    links: [{ rotulo: "Ver todas as avaliações no Google", link: linkGoogle }],
    rotuloEstrelas: "5 de 5 estrelas",
    itens: [
      {
        autor: "Família atendida",
        fonte: "Google",
        texto:
          "Ela desenvolveu um trabalho muito completo e profundo com a nossa pequena, que foi o que fez a diferença real no desenvolvimento escolar dela. É de destacar o compromisso da Thais em trabalhar junto com a escola, acompanhando passo a passo cada etapa da evolução.",
      },
      {
        autor: "Família atendida",
        fonte: "Google",
        texto:
          "Extremamente atenciosa, dedicada e acolhedora. Sempre demonstra sensibilidade para entender as necessidades da nossa filha, criando um ambiente seguro e de confiança. Desde que iniciamos o acompanhamento, notamos avanços significativos no aprendizado.",
      },
      {
        autor: "Família atendida",
        fonte: "Google",
        texto:
          "A Thais participou de toda a educação infantil da minha filha, desde a adaptação escolar aos 2 anos, que foi muito difícil, até a alfabetização aos 6. Sou eternamente grata por todo o trabalho dela.",
      },
      {
        autor: "Família atendida",
        fonte: "Google",
        texto:
          "Tem um jeito muito especial de falar com as crianças. Elas se encantam com ela e absorvem as orientações de um jeito lúdico e simples.",
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
          "A psicopedagoga investiga como a criança aprende e o que está dificultando esse processo. A partir de uma avaliação, planeja atividades para desenvolver o que precisa de apoio, como leitura, escrita, atenção e organização, e orienta a família e a escola. Como psicopedagoga clínica e institucional, a Thais atende no consultório e trabalha junto com a escola.",
      },
      {
        pergunta: "Quando devo procurar?",
        resposta:
          "Quando uma dificuldade na escola se repete por um tempo e não melhora só com a ajuda de casa: leitura e escrita, alfabetização, atenção e concentração ou adaptação escolar. Às vezes é a própria escola que sugere. Se estiver em dúvida, a primeira conversa serve justamente para entender se o acompanhamento faz sentido para o seu filho.",
      },
      {
        // A CONFIRMAR: formato da primeira conversa (segue o passo 1 do "Como funciona")
        pergunta: "Como é a primeira conversa?",
        resposta:
          "É uma conversa com os pais. Vocês contam o que estão percebendo em casa e o que a escola tem relatado, tiram dúvidas e combinam os próximos passos. Para marcar, é só chamar a Thais no WhatsApp.",
      },
      {
        pergunta: "Precisa de encaminhamento da escola?",
        resposta:
          "Não. Os pais podem entrar em contato diretamente. Se a escola já fez alguma observação ou relatório sobre a criança, vale levar para a primeira conversa, porque ajuda a entender melhor o que está acontecendo.",
      },
      {
        // A CONFIRMAR: se há atendimento online
        pergunta: "Atende online?",
        resposta:
          "O atendimento é presencial, no consultório da Pompeia, na R. Cotoxó, 303. Para saber se o seu caso pode ter encontros online, fale com a Thais pelo WhatsApp.",
        link: { rotulo: "Abrir no Maps", link: linkGoogle },
      },
      {
        pergunta: "Quanto custa?",
        resposta: "Os valores são passados na primeira conversa, pelo WhatsApp.",
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
