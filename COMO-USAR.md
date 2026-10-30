# Site da Thais Oliveira, psicopedagoga

Este projeto foi copiado do modelo `barbearia-jc` e adaptado. Todo o conteúdo (nome, contatos,
textos, fotos e cores) fica em um único arquivo: **`src/conteudo.ts`**.

## Rodar no computador

```bash
npm install
npm run dev
```

Antes de publicar, confirme que o build passa sem erros: `npm run build`.

## O que fica em `src/conteudo.ts`

| Bloco | O que tem |
| --- | --- |
| `negocio` | nome, profissão, endereço, link do Google, mapa incorporado, WhatsApp e mensagem, Instagram |
| `horarios` / `diasFechados` | dias e horários de atendimento (aceita dois períodos no mesmo dia) |
| `seo` | descrição para o Google e cor da barra do navegador (o título da aba fica no `index.html`) |
| `botoes` | "Agendar uma conversa" (WhatsApp), "Ver avaliações" e o texto do botão flutuante |
| `cabecalho` | links do menu |
| `topo` | título, linha de apoio, foto e selos |
| `sobre` | título, parágrafos, frase em destaque e foto |
| `recursos` | "Aprender brincando": título, frase e as quatro fotos da galeria |
| `comoFunciona` | passos do atendimento (numerados na ordem da lista) e foto |
| `quandoProcurar` | introdução, lista de sinais, nota e texto final ao lado do WhatsApp |
| `avaliacoes` | avaliações do Google e link para ver todas |
| `perguntas` | perguntas frequentes (com link opcional) |
| `agenda` | chamada final, ao lado dos horários e do mapa |
| `rodape` | linha de direitos e aviso opcional |
| `cores` | paleta do tema |

Ícones disponíveis para os selos: `"estrela"`, `"avaliacoes"`, `"escola"`, `"local"`.

Use número par de selos e avaliações.

## Fotos

As fotos são da Thais e ficam em `public/images/` em WebP, com uma versão menor para celular
(ex.: `thais-livro.webp` e `thais-livro-mobile.webp`). Os originais estão na pasta
`fotos-thais`, ao lado do projeto; `node scripts/fotos-thais.mjs` refaz os recortes com o sharp.
Para trocar uma foto, gere os arquivos novos e aponte o `src` e o `srcCelular` no `conteudo.ts`.
Nunca use foto de criança com o rosto visível.

- Topo: 4:5 no computador, quadrada no celular.
- "Sobre" e "Como funciona": 4:5 no computador, 6:5 no celular.
- Galeria: destaque e verticais em 4:5, a horizontal em 5:3; no celular, todas quadradas.

**Ícone da aba (favicon)**: `node scripts/favicon.mjs` gera `public/favicon.png` e
`public/apple-touch-icon.png` (quatro traços de lápis coloridos).

## Visual

- Cores: definidas em `cores` no `conteudo.ts` e aplicadas em `src/main.tsx` como variáveis CSS.
  As cores dos quatro lápis (verde, amarelo, vermelho, azul) ficam em `src/index.css`.
- Fontes: Fraunces com o eixo SOFT (títulos arredondados) e Atkinson Hyperlegible Next (texto).
- Os traços de lápis são SVG com o filtro `#grao-lapis` (em `src/App.tsx`), que dá a textura
  granulada.

## Publicar

O `name` do `wrangler.jsonc` já é `psicopedagoga-thais`.

```bash
npm run build
npx wrangler deploy
```

Depois da aprovação da Thais, remova a tag `noindex` do `index.html` (marcada com comentário).
