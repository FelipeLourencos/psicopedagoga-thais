# Site da Thais Oliveira, psicopedagoga

Este projeto foi copiado do modelo `barbearia-jc` e adaptado. Todo o conteúdo (nome, contatos,
textos, fotos e cores) fica em um único arquivo: **`src/conteudo.ts`**.

Trechos que ainda precisam ser validados com a Thais estão marcados com `A CONFIRMAR` no
`conteudo.ts`. Para listar todos: procure por "A CONFIRMAR" no editor.

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
| `topo` | título, linha de apoio, foto, vídeo de fundo (`videoFundo`, src "" desliga) e selos |
| `sobre` | título, formação, parágrafos e foto |
| `comoFunciona` | passos do atendimento (numerados na ordem da lista) |
| `quandoProcurar` | cards com ícone, título e texto |
| `avaliacoes` | avaliações do Google e link para ver todas |
| `perguntas` | perguntas frequentes (com link opcional) |
| `agenda` | chamada final, ao lado dos horários e do mapa |
| `rodape` | linha de direitos e aviso opcional |
| `cores` | paleta do tema |

Ícones disponíveis para selos e cards: `"estrela"`, `"avaliacoes"`, `"escola"`, `"local"`,
`"leitura"`, `"alfabetizacao"`, `"atencao"`, `"adaptacao"`.

Use número par de selos, passos, cards e avaliações.

## Fotos

As fotos de hoje são do Pexels (materiais pedagógicos, sem crianças). Para trocar pelas fotos reais:

1. Coloque as fotos em `public/images/` em WebP, com uma versão menor para celular
   (ex.: `sobre.webp` e `sobre-mobile.webp`).
2. Aponte o `src` e o `srcCelular` no `conteudo.ts` para os arquivos novos.

O script `scripts/baixar-imagens.mjs` mostra como recortar e converter com o sharp.
Nunca use foto de criança com o rosto visível.

- Foto do topo: quadrada no computador e 4:3 no celular.
- Foto do "Sobre": vertical (4:5).

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
