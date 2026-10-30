// Converte as fotos da Thais (pasta "fotos-thais", ao lado do projeto) para WebP,
// com uma versão para computador e outra menor para celular.
// Uso: node scripts/fotos-thais.mjs
//
// O recorte usa a estratégia "attention" do sharp (procura a área mais marcante da foto).
// Quando ela tira o rosto do quadro, "recorte" limita antes a área da foto original
// (1279x1600 ou 1200x1600) em que ela pode escolher.
import sharp from "sharp"

const origem = "../fotos-thais/"
const arquivo = (nome) => `${origem}WhatsApp Image 2026-10-26 at ${nome}.jpeg`

const fotos = [
  {
    // Topo: segurando quatro canetinhas (verde, amarela, vermelha, azul)
    nome: "thais-canetas",
    arquivo: arquivo("22.08.26 (3)"),
    versoes: [
      { sufixo: "", largura: 880, altura: 1100 },
      { sufixo: "-mobile", largura: 720, altura: 720, recorte: { left: 0, top: 380, width: 1279, height: 1060 } },
    ],
  },
  {
    // Sobre: folheando um livro infantil
    nome: "thais-livro",
    arquivo: arquivo("22.08.26 (1)"),
    versoes: [
      { sufixo: "", largura: 880, altura: 1100 },
      { sufixo: "-mobile", largura: 720, altura: 600, recorte: { left: 0, top: 260, width: 1279, height: 1160 } },
    ],
  },
  {
    // Como funciona: de mãos dadas com uma mãe, na mesa do consultório
    nome: "thais-maos",
    arquivo: arquivo("22.08.26 (2)"),
    versoes: [
      { sufixo: "", largura: 880, altura: 1100 },
      { sufixo: "-mobile", largura: 720, altura: 600, recorte: { left: 0, top: 300, width: 1279, height: 1100 } },
    ],
  },
  {
    // Galeria (destaque): sentada no chão com letras móveis e dinossauros
    nome: "thais-chao",
    arquivo: arquivo("22.09.28"),
    versoes: [
      { sufixo: "", largura: 880, altura: 1100 },
      { sufixo: "-mobile", largura: 600, altura: 600, recorte: { left: 0, top: 150, width: 1200, height: 1300 } },
    ],
  },
  {
    // Galeria: mesa com livro de leitura e escrita, labirinto, lápis e régua de formas
    nome: "mesa-materiais",
    arquivo: arquivo("22.08.54"),
    versoes: [
      { sufixo: "", largura: 1100, altura: 660 },
      { sufixo: "-mobile", largura: 600, altura: 600 },
    ],
  },
  {
    // Galeria: apoiada numa pilha de jogos de tabuleiro
    nome: "thais-jogos",
    arquivo: arquivo("22.08.53"),
    versoes: [
      { sufixo: "", largura: 560, altura: 700, recorte: { left: 0, top: 250, width: 1279, height: 1350 } },
      { sufixo: "-mobile", largura: 600, altura: 600, recorte: { left: 0, top: 220, width: 1279, height: 1080 } },
    ],
  },
  {
    // Galeria: segurando um labirinto em esfera
    nome: "thais-labirinto",
    arquivo: arquivo("22.08.26 (5)"),
    versoes: [
      { sufixo: "", largura: 560, altura: 700, recorte: { left: 0, top: 80, width: 1279, height: 1300 } },
      { sufixo: "-mobile", largura: 600, altura: 600, recorte: { left: 60, top: 160, width: 1219, height: 1000 } },
    ],
  },
]

for (const { nome, arquivo, versoes } of fotos) {
  for (const { sufixo, largura, altura, recorte } of versoes) {
    let img = sharp(arquivo).rotate()
    if (recorte) img = sharp(await img.extract(recorte).toBuffer())
    const out = await img
      .resize(largura, altura, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 80 })
      .toFile(`public/images/${nome}${sufixo}.webp`)
    console.log("ok", `${nome}${sufixo}`, `${out.width}x${out.height}`, `${Math.round(out.size / 1024)} KB`)
  }
}
