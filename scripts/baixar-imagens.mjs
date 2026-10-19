// Baixa as fotos do Pexels, recorta e salva em WebP, com uma versão menor para celular.
// Uso: node scripts/baixar-imagens.mjs
// TROCAR pelas fotos reais da Thais quando chegarem (pasta "fotos-thais").
import sharp from "sharp"

const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`

// recorte: área da foto original (2400x1600) que fica, antes de redimensionar
// (A foto do topo saiu: o fundo do topo agora é o vídeo em public/videos/.)
const fotos = [
  {
    // Mesa branca com jogos e quebra-cabeças de madeira
    nome: "mesa-atividades",
    id: 7296635,
    versoes: [
      { sufixo: "", recorte: { left: 300, top: 0, width: 1280, height: 1600 }, largura: 1000, altura: 1250 },
      { sufixo: "-mobile", recorte: { left: 300, top: 0, width: 1280, height: 1600 }, largura: 640, altura: 800 },
    ],
  },
]

for (const { nome, id, versoes } of fotos) {
  const r = await fetch(pexels(id))
  if (!r.ok) { console.log("FALHOU", nome, r.status); continue }
  // Normaliza para 2400x1600 antes, para os recortes valerem mesmo se o Pexels mudar o tamanho
  const buf = await sharp(Buffer.from(await r.arrayBuffer())).rotate().resize(2400, 1600, { fit: "cover" }).toBuffer()
  for (const { sufixo, recorte, largura, altura } of versoes) {
    const out = await sharp(buf)
      .extract(recorte)
      .resize(largura, altura)
      .webp({ quality: 82 })
      .toFile(`public/images/${nome}${sufixo}.webp`)
    console.log("ok", `${nome}${sufixo}`, `${out.width}x${out.height}`, `${Math.round(out.size / 1024)} KB`)
  }
}
