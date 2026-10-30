import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  AtSign,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageSquareHeart,
  PencilLine,
  School,
  Star,
  type LucideIcon,
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_EDITORIAL } from "@/lib/motion"
import { conteudo, type Foto, type Icone } from "@/conteudo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Todo o texto, contato e foto vem de src/conteudo.ts
const {
  negocio,
  horarios,
  diasFechados,
  botoes,
  cabecalho,
  topo,
  sobre,
  recursos,
  comoFunciona,
  quandoProcurar,
  avaliacoes,
  perguntas,
  agenda,
  rodape,
} = conteudo

/** Seções e botões só existem quando o conteudo.ts traz dados para eles. */
const temSobre = sobre.paragrafos.length > 0
const temRecursos = recursos.fotos.length > 0
const temComoFunciona = comoFunciona.passos.length > 0
const temQuandoProcurar = quandoProcurar.itens.length > 0
const temAvaliacoes = avaliacoes.itens.length > 0
const temPerguntas = perguntas.itens.length > 0
const temWhatsapp = negocio.whatsapp !== ""

const WHATSAPP_URL = `https://wa.me/${negocio.whatsapp}${
  negocio.mensagemWhatsapp ? `?text=${encodeURIComponent(negocio.mensagemWhatsapp)}` : ""
}`

/** Links do menu que dependem de seções opcionais. */
const secaoVisivel: Record<string, boolean> = {
  "#sobre": temSobre,
  "#como-funciona": temComoFunciona,
  "#quando-procurar": temQuandoProcurar,
  "#avaliacoes": temAvaliacoes,
  "#duvidas": temPerguntas,
}

const ICONES: Record<Icone, LucideIcon> = {
  estrela: Star,
  avaliacoes: MessageSquareHeart,
  escola: School,
  local: MapPin,
}

/** Os quatro lápis da foto de perfil da Thais, na ordem em que aparecem. */
const LAPIS = ["var(--lapis-verde)", "var(--lapis-amarelo)", "var(--lapis-vermelho)", "var(--lapis-azul)"]

/** Medidas comuns: mesma largura e mesmo respiro em todas as seções. */
const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-8"
const SECAO = "py-20 sm:py-28"

const externo = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}

/** Une a última palavra à anterior, para nenhuma linha terminar com uma palavra sozinha. */
const semPalavraSolta = (texto: string) => texto.replace(/ (\S+)$/, " $1")

/** Botão cheio (principal) ou de contorno. */
function Botao({
  href,
  children,
  variante = "cheio",
  className,
}: {
  href: string
  children: React.ReactNode
  variante?: "cheio" | "contorno"
  className?: string
}) {
  return (
    <a
      href={href}
      {...externo(href)}
      className={cn(
        "inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-7 text-[1rem] font-semibold whitespace-nowrap transition-[background-color,color,border-color] duration-200",
        variante === "cheio"
          ? "bg-primary text-primary-foreground hover:bg-tinta"
          : "border-[1.5px] border-tinta/25 text-foreground hover:border-tinta/60 hover:bg-white/60",
        className
      )}
    >
      {children}
    </a>
  )
}

function BotaoWhatsapp({ className }: { className?: string }) {
  if (!temWhatsapp) return null
  return (
    <Botao href={WHATSAPP_URL} className={className}>
      <FaWhatsapp className="size-[1.2rem]" aria-hidden /> {botoes.principal}
    </Botao>
  )
}

function Estrelas({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-lapis-amarelo", className)} role="img" aria-label={avaliacoes.rotuloEstrelas}>
      {Array.from({ length: 5 }).map((_, k) => (
        <Star key={k} className="size-4 fill-current" aria-hidden />
      ))}
    </span>
  )
}

/**
 * Filtro SVG que dá aos traços a textura granulada de lápis de cor.
 * Fica uma vez só na página; os traços usam filter="url(#grao-lapis)".
 */
function FiltroLapis() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="grao-lapis" x="-5%" y="-30%" width="110%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="ruido" />
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="2.5" result="borda" />
        <feColorMatrix
          in="ruido"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2 1.8"
          result="grao"
        />
        <feComposite in="borda" in2="grao" operator="in" />
      </filter>
    </svg>
  )
}

/** Quatro traços de lápis (verde, amarelo, vermelho, azul), desenhados uma vez no carregamento. */
function TracosTopo({ className }: { className?: string }) {
  const menosMovimento = useReducedMotion()
  const tracos = [
    "M10 24 C 62 14, 150 10, 236 17 S 300 22, 312 19",
    "M26 50 C 92 41, 176 38, 250 44 S 306 47, 318 45",
    "M6 76 C 70 69, 150 66, 228 70 S 284 74, 300 72",
    "M30 102 C 96 96, 180 92, 258 97 S 304 100, 314 98",
  ]

  return (
    <svg viewBox="0 0 324 120" fill="none" aria-hidden className={className}>
      <g filter="url(#grao-lapis)" strokeLinecap="round" strokeWidth="8.5">
        {tracos.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke={LAPIS[i]}
            initial={menosMovimento ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.55 + i * 0.16, ease: EASE_EDITORIAL }}
          />
        ))}
      </g>
    </svg>
  )
}

/** Um traço curto de lápis, usado sob os números dos passos e no rodapé. */
function Risco({ cor, className }: { cor: string; className?: string }) {
  return (
    <svg viewBox="0 0 80 14" fill="none" aria-hidden className={cn("h-3.5 w-20", className)}>
      <path
        d="M4 8 C 22 4, 46 4, 76 7"
        stroke={cor}
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#grao-lapis)"
      />
    </svg>
  )
}

function Header() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = cabecalho.links.filter(({ link }) => secaoVisivel[link] ?? true)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        rolou ? "border-border bg-papel/92 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className={cn(CONTAINER, "flex h-[4.5rem] items-center justify-between gap-6 lg:h-20")}>
        <a href="#topo" className="flex flex-col leading-none">
          <span className="titulo-item text-[1.3rem] sm:text-[1.4rem]">{negocio.nome}</span>
          <span className="mt-1 text-sm text-tinta-suave">{negocio.profissaoCurta}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map(({ rotulo, link }) => (
            <a
              key={link}
              href={link}
              className="text-[0.98rem] text-tinta-suave transition-colors hover:text-foreground"
            >
              {rotulo}
            </a>
          ))}
        </nav>

        {temWhatsapp && (
          <Botao href={WHATSAPP_URL} className="hidden h-11 gap-2 px-5 text-[0.95rem] sm:inline-flex">
            <FaWhatsapp className="size-[1.1rem]" aria-hidden /> {botoes.principal}
          </Botao>
        )}
      </div>
    </header>
  )
}

/** Foto com a versão menor para celular (até 767px), quando houver. */
function Imagem({
  foto,
  className,
  prioridade = false,
}: {
  foto: Foto
  className?: string
  prioridade?: boolean
}) {
  return (
    <picture className="contents">
      {foto.srcCelular && <source media="(max-width: 767px)" srcSet={foto.srcCelular} />}
      <img
        src={foto.src}
        alt={foto.alt}
        className={className}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : undefined}
      />
    </picture>
  )
}

/** Única animação automática da página: a entrada do topo, em sequência, com os traços de lápis. */
const entrada = (ordem: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.1 + ordem * 0.12, ease: EASE_EDITORIAL },
})

function Topo() {
  return (
    <section id="topo" className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-16">
      <div
        className={cn(
          CONTAINER,
          "grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16"
        )}
      >
        <div>
          <motion.h1
            {...entrada(0)}
            className="titulo-display text-[2.55rem] sm:text-6xl lg:text-[4.1rem]"
          >
            {semPalavraSolta(topo.titulo)}
          </motion.h1>
          {topo.texto && (
            <motion.p
              {...entrada(1)}
              className="mt-6 text-[1.2rem] font-semibold text-lilas-forte sm:text-[1.35rem]"
            >
              {topo.texto}
            </motion.p>
          )}
          <motion.div {...entrada(2)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotaoWhatsapp />
            {botoes.secundario && temAvaliacoes && (
              <Botao href="#avaliacoes" variante="contorno">
                {botoes.secundario}
              </Botao>
            )}
          </motion.div>
        </div>

        {topo.foto && (
          <motion.div
            {...entrada(1.5)}
            className="relative mx-auto w-full max-w-[26rem] lg:mr-0"
          >
            <Imagem
              foto={topo.foto}
              prioridade
              className="aspect-square w-full rounded-[2rem] object-cover object-[50%_30%] md:aspect-[4/5]"
            />
            {/* Os traços saem da mesa da foto, nas cores das canetinhas que a Thais segura */}
            <TracosTopo className="absolute -bottom-7 -left-3 w-40 -rotate-3 sm:w-48 lg:-bottom-9 lg:-left-16 lg:w-60" />
          </motion.div>
        )}
      </div>

      {topo.selos.length > 0 && (
        <div className={CONTAINER}>
          <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-border pt-8 sm:mt-20 md:grid-cols-4">
            {topo.selos.map(({ texto, icone }) => {
              const Icon = ICONES[icone]
              return (
                <li key={texto} className="flex items-center gap-3 text-[0.98rem] leading-snug">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-papel-piscina text-lilas-forte">
                    <Icon className={cn("size-[1.1rem]", icone === "estrela" && "fill-current")} aria-hidden />
                  </span>
                  {texto}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}

function Sobre() {
  if (!temSobre) return null
  const [primeiro, ...demais] = sobre.paragrafos

  return (
    <section id="sobre" className={cn("bg-papel-lilas", SECAO)}>
      <div className={cn(CONTAINER, "grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20")}>
        {sobre.foto && (
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Imagem
              foto={sobre.foto}
              className="aspect-[6/5] w-full rounded-[2rem] object-cover object-[60%_30%] md:aspect-[4/5]"
            />
          </div>
        )}
        <div>
          <h2 className="titulo-secao text-[2.25rem] sm:text-5xl">{sobre.titulo}</h2>
          <div className="mt-7 max-w-[60ch] space-y-5 text-[1.08rem] leading-relaxed">
            <p>{primeiro}</p>
            {sobre.destaque && (
              // A frase já está no primeiro parágrafo; o destaque é só visual
              <div aria-hidden className="py-6 sm:py-8">
                <p className="titulo-display max-w-[15ch] text-[2.15rem] text-lilas-forte sm:text-[2.9rem]">
                  {sobre.destaque}
                </p>
                <div className="mt-5 flex gap-1">
                  {LAPIS.map((cor) => (
                    <Risco key={cor} cor={cor} className="h-3 w-10" />
                  ))}
                </div>
              </div>
            )}
            {demais.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Galeria em mosaico. No computador: a primeira foto grande à esquerda, a segunda
 * horizontal em cima à direita e as duas últimas lado a lado embaixo. No celular: 2x2.
 */
function AprenderBrincando() {
  if (!temRecursos) return null
  // A grande ocupa duas linhas; a altura das linhas vem da horizontal (8:5) e das verticais (4:5)
  const lugar = [
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-2 lg:aspect-[8/5]",
    "lg:aspect-[4/5]",
    "lg:aspect-[4/5]",
  ]

  return (
    <section id="aprender-brincando" className={SECAO}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao text-[2.25rem] sm:text-5xl">{recursos.titulo}</h2>
        {recursos.texto && <p className="mt-4 max-w-[50ch] text-lg text-tinta-suave">{recursos.texto}</p>}

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
          {recursos.fotos.map((foto, i) => (
            <li
              key={foto.src}
              className={cn("relative aspect-square overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] lg:aspect-auto", lugar[i])}
            >
              <Imagem foto={foto} className="absolute inset-0 size-full object-cover object-[50%_25%]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ComoFunciona() {
  if (!temComoFunciona) return null

  return (
    <section id="como-funciona" className={cn("bg-papel-piscina", SECAO)}>
      <div className={cn(CONTAINER, "grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20")}>
        {comoFunciona.foto && (
          <div className="lg:order-last">
            <Imagem
              foto={comoFunciona.foto}
              className="aspect-[6/5] w-full rounded-[2rem] object-cover object-[60%_30%] md:aspect-[4/5]"
            />
          </div>
        )}
        <div>
          <h2 className="titulo-secao max-w-[20ch] text-[2.25rem] sm:text-5xl">{comoFunciona.titulo}</h2>

          <ol className="mt-10 border-t border-tinta/15 sm:mt-12">
            {comoFunciona.passos.map((passo, i) => (
              <li key={passo} className="flex items-start gap-5 border-b border-tinta/15 py-6 sm:gap-7">
                <span className="w-14 shrink-0 sm:w-16" aria-hidden>
                  <span className="titulo-display block text-[2.75rem] leading-none text-lilas-forte sm:text-[3.25rem]">
                    {i + 1}
                  </span>
                  <Risco cor={LAPIS[i % LAPIS.length]} className="mt-1.5 h-3 w-12" />
                </span>
                <h3 className="titulo-item pt-1 text-[1.25rem] sm:pt-2 sm:text-[1.4rem]">
                  <span className="sr-only">Passo {i + 1}: </span>
                  {passo}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function QuandoProcurar() {
  if (!temQuandoProcurar) return null

  return (
    <section id="quando-procurar" className={cn("bg-papel-lilas", SECAO)}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao max-w-[20ch] text-[2.25rem] sm:text-5xl">{quandoProcurar.titulo}</h2>
        {quandoProcurar.texto && (
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-tinta-suave">{quandoProcurar.texto}</p>
        )}

        <h3 className="titulo-item mt-12 max-w-[34ch] text-[1.35rem] sm:mt-14 sm:text-[1.55rem]">
          {quandoProcurar.subtitulo}
        </h3>
        <ul className="mt-8 grid gap-x-12 gap-y-5 md:grid-cols-2">
          {quandoProcurar.itens.map((item) => (
            <li key={item} className="flex gap-4 leading-relaxed">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-lilas-forte">
                <PencilLine className="size-[1.05rem]" aria-hidden />
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ul>

        {quandoProcurar.nota && (
          <p className="mt-12 max-w-[75ch] rounded-2xl bg-white/75 px-6 py-5 text-[0.98rem] leading-relaxed text-tinta-suave">
            {quandoProcurar.nota}
          </p>
        )}

        {(quandoProcurar.fechamento || temWhatsapp) && (
          <div className="mt-12 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            {quandoProcurar.fechamento && (
              <p className="max-w-[56ch] text-[1.15rem] leading-relaxed text-pretty">{quandoProcurar.fechamento}</p>
            )}
            <BotaoWhatsapp className="self-start lg:self-auto" />
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Grade de 2 colunas no computador. No celular (até 767px) a mesma lista vira um
 * carrossel deslizante, com setas e bolinhas, para a seção não ficar comprida demais.
 */
function Avaliacoes() {
  const lista = useRef<HTMLUListElement>(null)
  const [atual, setAtual] = useState(0)
  const menosMovimento = useReducedMotion()
  const total = avaliacoes.itens.length

  if (!temAvaliacoes) return null

  const aoRolar = () => {
    const el = lista.current
    const primeiro = el?.firstElementChild as HTMLElement | null
    if (!el || !primeiro) return
    const passo = primeiro.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0")
    const noFim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    setAtual(noFim ? total - 1 : Math.round(el.scrollLeft / passo))
  }

  const irPara = (i: number) => {
    const el = lista.current
    const item = el?.children[i] as HTMLElement | undefined
    if (!el || !item) return
    setAtual(i)
    el.scrollTo({ left: item.offsetLeft, behavior: menosMovimento ? "auto" : "smooth" })
  }

  const seta =
    "flex size-11 items-center justify-center rounded-full border-[1.5px] border-tinta/25 transition-[border-color,opacity] hover:border-tinta/60 disabled:pointer-events-none disabled:opacity-35"

  return (
    <section id="avaliacoes" className={SECAO}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao text-[2.25rem] sm:text-5xl">{avaliacoes.titulo}</h2>

        <ul
          ref={lista}
          onScroll={aoRolar}
          className="relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] sm:mt-16 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {avaliacoes.itens.map((a, i) => (
            <li key={`${a.autor}-${i}`} className="w-[88%] shrink-0 snap-start md:w-auto">
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-white p-6 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  {a.estrelas && <Estrelas />}
                  <span className="rounded-full bg-papel-lilas px-3 py-1 text-[0.8rem] text-tinta-suave">
                    {a.fonte}
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 text-[1.1rem] leading-relaxed text-pretty">
                  <p>“{a.texto}”</p>
                </blockquote>
                <figcaption className="mt-6 text-[0.95rem] text-tinta-suave">{a.autor}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {total > 1 && (
          // Alinhado à esquerda: à direita fica o botão flutuante do WhatsApp
          <div className="mt-6 flex items-center gap-1 md:hidden">
            <button type="button" onClick={() => irPara(atual - 1)} disabled={atual === 0} aria-label="Avaliação anterior" className={seta}>
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <div className="flex">
              {avaliacoes.itens.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => irPara(i)}
                  aria-label={`Mostrar avaliação ${i + 1} de ${total}`}
                  aria-current={i === atual ? "true" : undefined}
                  className="flex size-5 items-center justify-center"
                >
                  <span
                    className={cn(
                      "size-2 rounded-full transition-colors",
                      i === atual ? "bg-lilas-forte" : "bg-tinta/20"
                    )}
                  />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => irPara(atual + 1)} disabled={atual === total - 1} aria-label="Próxima avaliação" className={seta}>
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        )}

        {avaliacoes.links.length > 0 && (
          <p className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
            {avaliacoes.links.map(({ rotulo, link }) => (
              <a
                key={rotulo}
                href={link}
                {...externo(link)}
                className="inline-flex items-center gap-1.5 font-semibold text-lilas-forte underline decoration-current/35 underline-offset-4 transition-colors hover:text-tinta"
              >
                {rotulo} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}

function Duvidas() {
  if (!temPerguntas) return null

  return (
    <section id="duvidas" className={cn("bg-papel-lilas", SECAO)}>
      <div className={cn(CONTAINER, "grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16")}>
        <h2 className="titulo-secao text-[2.25rem] sm:text-5xl">{perguntas.titulo}</h2>
        <Accordion defaultValue={["faq-0"]} className="border-t border-tinta/15">
          {perguntas.itens.map((item, i) => (
            <AccordionItem key={item.pergunta} value={`faq-${i}`} className="border-b border-tinta/15">
              <AccordionTrigger className="py-5 text-left text-[1.12rem] font-semibold hover:no-underline sm:text-[1.2rem]">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[1.05rem] leading-relaxed text-tinta-suave">
                <p className="max-w-[60ch]">{item.resposta}</p>
                {item.link && (
                  <a
                    href={item.link.link}
                    {...externo(item.link.link)}
                    className="mt-3 inline-flex items-center gap-1.5 font-semibold text-lilas-forte underline underline-offset-4"
                  >
                    <MapPin className="size-4" aria-hidden /> {item.link.rotulo}
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function Contato() {
  return (
    <section id="contato" className={SECAO}>
      <div className={cn(CONTAINER, "grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16")}>
        <div>
          <h2 className="titulo-display max-w-[16ch] text-[2.4rem] sm:text-6xl">{agenda.titulo}</h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-tinta-suave">{agenda.texto}</p>
          <BotaoWhatsapp className="mt-9" />
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-semibold">
            <Clock className="size-4 text-lilas-forte" aria-hidden /> Horários de atendimento
          </h3>
          <dl className="mt-4">
            {horarios.map((h) => (
              <div key={h.dias} className="flex justify-between gap-4 border-b border-border py-3">
                <dt className="text-tinta-suave">{h.dias}</dt>
                <dd className="text-right tabular-nums">{h.horas}</dd>
              </div>
            ))}
          </dl>
          {diasFechados && <p className="mt-3 text-tinta-suave">{diasFechados}</p>}

          <h3 className="mt-7 flex items-center gap-2 font-semibold">
            <MapPin className="size-4 text-lilas-forte" aria-hidden /> Endereço
          </h3>
          <p className="mt-2 text-tinta-suave">
            {negocio.endereco.linha1}
            <br />
            {negocio.endereco.linha2}
          </p>
        </div>

        {negocio.mapaIncorporado && (
          <div className="lg:col-span-2">
            <iframe
              src={negocio.mapaIncorporado}
              title={`Mapa do consultório de ${negocio.nome}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[340px] w-full rounded-3xl border-0 bg-papel-lilas sm:h-[380px]"
            />
            {negocio.linkGoogle && (
              <a
                href={negocio.linkGoogle}
                {...externo(negocio.linkGoogle)}
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-lilas-forte underline decoration-current/35 underline-offset-4 transition-colors hover:text-tinta"
              >
                <MapPin className="size-4" aria-hidden /> {agenda.abrirMapa}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/** Botão flutuante do WhatsApp, só no celular e no tablet. */
function WhatsappFlutuante() {
  // Aparece depois do topo, onde o botão de WhatsApp já está à vista
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!temWhatsapp || !botoes.flutuante) return null

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={botoes.flutuante}
      className={cn(
        "fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_28px_-8px_oklch(from_var(--tinta)_l_c_h/0.55)] transition-[opacity,scale] duration-300 sm:right-6 sm:bottom-6 lg:hidden",
        !visivel && "pointer-events-none scale-90 opacity-0"
      )}
      tabIndex={visivel ? undefined : -1}
    >
      <FaWhatsapp className="size-7" aria-hidden />
    </a>
  )
}

function Rodape() {
  const titulo = "mb-3 font-semibold text-foreground"
  const link = "flex items-center gap-2 transition-colors hover:text-foreground"

  return (
    <footer className="secao-escura">
      <div className={cn(CONTAINER, "grid gap-10 pt-16 pb-14 text-muted-foreground sm:grid-cols-2 lg:grid-cols-4")}>
        <div>
          <p className="titulo-item text-2xl text-foreground">{negocio.nome}</p>
          <p className="mt-2 max-w-[26ch]">{negocio.profissao}</p>
          <div className="mt-5 flex gap-1">
            {LAPIS.map((cor) => (
              <Risco key={cor} cor={cor} className="h-3 w-10" />
            ))}
          </div>
        </div>
        <div>
          <p className={titulo}>Endereço</p>
          <p className="flex gap-2">
            <MapPin className="mt-1 size-4 shrink-0" aria-hidden />
            <span>
              {negocio.endereco.linha1}
              <br />
              {negocio.endereco.linha2}
            </span>
          </p>
        </div>
        <div>
          <p className={titulo}>Horários</p>
          <dl className="space-y-1.5">
            {horarios.map((h) => (
              <div key={h.dias}>
                <dt className="inline">{h.dias}: </dt>
                <dd className="inline">{h.horas}</dd>
              </div>
            ))}
          </dl>
          {diasFechados && <p className="mt-1.5">{diasFechados}</p>}
        </div>
        <div className="space-y-2.5">
          <p className={titulo}>Contato</p>
          {temWhatsapp && (
            <a href={WHATSAPP_URL} {...externo(WHATSAPP_URL)} className={link}>
              <FaWhatsapp className="size-4" aria-hidden /> WhatsApp
            </a>
          )}
          {negocio.instagram.link && (
            <a href={negocio.instagram.link} {...externo(negocio.instagram.link)} className={link}>
              <AtSign className="size-4" aria-hidden /> {negocio.instagram.usuario}
            </a>
          )}
          {negocio.linkGoogle && (
            <a href={negocio.linkGoogle} {...externo(negocio.linkGoogle)} className={link}>
              <Star className="size-4" aria-hidden /> Avaliações no Google
            </a>
          )}
        </div>
      </div>
      <div className={CONTAINER}>
        <p className="border-t border-border py-6 pr-20 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {rodape.direitos}
          {rodape.avisoDemonstracao && <> {rodape.avisoDemonstracao}</>}
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    // reducedMotion="user": quem pediu menos movimento no sistema não vê a entrada animada
    <MotionConfig reducedMotion="user">
      <div className="min-h-svh overflow-x-clip">
        <FiltroLapis />
        <Header />
        <main>
          <Topo />
          <Sobre />
          <AprenderBrincando />
          <ComoFunciona />
          <QuandoProcurar />
          <Avaliacoes />
          <Duvidas />
          <Contato />
        </main>
        <Rodape />
        <WhatsappFlutuante />
      </div>
    </MotionConfig>
  )
}
