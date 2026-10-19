// Gera o ícone da aba: quatro traços de lápis (verde, amarelo, vermelho, azul) sobre um círculo lilás claro.
// Uso: node scripts/favicon.mjs
import sharp from "sharp"

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="31" fill="#efe9f8"/>
  <g fill="none" stroke-linecap="round" stroke-width="5.5">
    <path d="M15 22 C 24 18, 38 17, 49 20" stroke="#5fa463"/>
    <path d="M14 30 C 25 27, 38 27, 50 29" stroke="#eebd3c"/>
    <path d="M14 38 C 26 36, 38 36, 49 38" stroke="#de5f58"/>
    <path d="M16 46 C 26 45, 37 44, 47 46" stroke="#4a86c8"/>
  </g>
</svg>`

await sharp(Buffer.from(svg)).resize(64, 64).png().toFile("public/favicon.png")
await sharp(Buffer.from(svg)).resize(180, 180).flatten({ background: "#efe9f8" }).png().toFile("public/apple-touch-icon.png")
console.log("ok")
