import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  AtSign,
  Backpack,
  BookOpen,
  Clock,
  Focus,
  MapPin,
  MessageCircle,
  MessageSquareHeart,
  PencilLine,
  School,
  Star,
  type LucideIcon,
} from "lucide-react"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_EDITORIAL } from "@/lib/motion"
import { conteudo, type Icone } from "@/conteudo"
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
  comoFunciona,
  quandoProcurar,
  avaliacoes,
  perguntas,
  agenda,
  rodape,
} = conteudo

/** Seções e botões só existem quando o conteudo.ts traz dados para eles. */
const temSobre = sobre.paragrafos.length > 0
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
  leitura: BookOpen,
  alfabetizacao: PencilLine,
  atencao: Focus,
  adaptacao: Backpack,
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
      <MessageCircle className="size-[1.15rem]" aria-hidden /> {botoes.principal}
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
          <Botao href={WHATSAPP_URL} className="hidden h-11 px-5 text-[0.95rem] sm:inline-flex">
            {botoes.principal}
          </Botao>
        )}
      </div>
    </header>
  )
}

/** Única animação automática da página: a entrada do topo, em sequência, com os traços de lápis. */
const entrada = (ordem: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.1 + ordem * 0.12, ease: EASE_EDITORIAL },
})

/** Escolhe a versão do vídeo uma vez, no carregamento: 960px no celular, 1920px no computador. */
const celular = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

/**
 * Vídeo mudo em loop atrás do topo, coberto por uma camada creme só o bastante para o
 * título continuar legível. Com "reduzir movimento" ativado, fica só o poster parado.
 */
function VideoFundoTopo() {
  const menosMovimento = useReducedMotion()
  const { src, srcCelular, poster, posterCelular } = topo.videoFundo
  if (!src) return null

  const video = celular && srcCelular ? srcCelular : src
  const imagem = celular && posterCelular ? posterCelular : poster
  // Mão e mapa ficam à direita do quadro, longe do título
  const enquadramento = "size-full object-cover object-[62%_center]"

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {menosMovimento ? (
        <img src={imagem} alt="" className={enquadramento} />
      ) : (
        <video
          src={video}
          poster={imagem}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={enquadramento}
        />
      )}
      {/* Mais forte atrás do texto; embaixo, funde com a cor do papel */}
      <div className="absolute inset-0 bg-papel/72 lg:bg-transparent lg:bg-linear-to-r lg:from-papel/88 lg:via-papel/62 lg:to-papel/15" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-papel" />
    </div>
  )
}

function Topo() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[88svh] flex-col justify-center pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-16"
    >
      <VideoFundoTopo />
      <div className={CONTAINER}>
        <div className="max-w-[40rem]">
          <TracosTopo className="mb-6 w-36 sm:w-44" />
          <motion.h1
            {...entrada(0)}
            className="titulo-display text-[2.55rem] sm:text-6xl lg:text-[4.35rem]"
          >
            {semPalavraSolta(topo.titulo)}
          </motion.h1>
          {topo.texto && (
            <motion.p
              {...entrada(1)}
              className="mt-6 max-w-[42ch] text-[1.15rem] leading-relaxed text-pretty text-tinta-suave sm:text-xl"
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
      </div>

      {topo.selos.length > 0 && (
        <div className={CONTAINER}>
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-border pt-8 sm:mt-16 md:grid-cols-4">
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

  return (
    <section id="sobre" className={cn("bg-papel-lilas", SECAO)}>
      <div className={cn(CONTAINER, "grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20")}>
        {sobre.foto && (
          <picture>
            {sobre.foto.srcCelular && <source media="(max-width: 767px)" srcSet={sobre.foto.srcCelular} />}
            <img
              src={sobre.foto.src}
              alt={sobre.foto.alt}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover object-[50%_75%] max-lg:max-h-[26rem] sm:max-lg:aspect-[4/3]"
              loading="lazy"
            />
          </picture>
        )}
        <div>
          <h2 className="titulo-secao text-[2.25rem] sm:text-5xl">{sobre.titulo}</h2>
          {sobre.subtitulo && <p className="mt-3 text-lg font-semibold text-lilas-forte">{sobre.subtitulo}</p>}
          <div className="mt-7 max-w-[58ch] space-y-5 text-[1.08rem] leading-relaxed">
            {sobre.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ComoFunciona() {
  if (!temComoFunciona) return null

  return (
    <section id="como-funciona" className={SECAO}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao max-w-[20ch] text-[2.25rem] sm:text-5xl">{comoFunciona.titulo}</h2>
        {comoFunciona.texto && <p className="mt-4 max-w-[50ch] text-lg text-tinta-suave">{comoFunciona.texto}</p>}

        <ol className="mt-12 grid gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {comoFunciona.passos.map((passo, i) => (
            <li key={passo.titulo}>
              <span className="titulo-display block text-[3.25rem] leading-none text-lilas" aria-hidden>
                {i + 1}
              </span>
              <Risco cor={LAPIS[i % LAPIS.length]} className="mt-2" />
              <h3 className="titulo-item mt-5 text-[1.3rem]">
                <span className="sr-only">Passo {i + 1}: </span>
                {passo.titulo}
              </h3>
              <p className="mt-3 leading-relaxed text-tinta-suave">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function QuandoProcurar() {
  if (!temQuandoProcurar) return null

  return (
    <section id="quando-procurar" className={cn("bg-papel-piscina", SECAO)}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao max-w-[20ch] text-[2.25rem] sm:text-5xl">{quandoProcurar.titulo}</h2>
        {quandoProcurar.texto && (
          <p className="mt-4 max-w-[50ch] text-lg text-tinta-suave">{quandoProcurar.texto}</p>
        )}

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
          {quandoProcurar.itens.map(({ icone, titulo, texto }) => {
            const Icon = ICONES[icone]
            return (
              <li key={titulo} className="flex flex-col gap-4 rounded-3xl bg-white p-6 sm:flex-row sm:gap-5 sm:p-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-papel-lilas text-lilas-forte">
                  <Icon className="size-[1.35rem]" aria-hidden />
                </span>
                <div>
                  <h3 className="titulo-item text-[1.3rem]">{titulo}</h3>
                  <p className="mt-2.5 leading-relaxed text-tinta-suave">{texto}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {temWhatsapp && (
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <BotaoWhatsapp />
            <p className="text-tinta-suave">Ficou em dúvida se é o caso do seu filho? Vale conversar.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function Avaliacoes() {
  if (!temAvaliacoes) return null

  return (
    <section id="avaliacoes" className={SECAO}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao text-[2.25rem] sm:text-5xl">{avaliacoes.titulo}</h2>

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
          {avaliacoes.itens.map((a, i) => (
            <li key={`${a.autor}-${i}`}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-white p-7 sm:p-9">
                <Estrelas />
                <blockquote className="mt-5 flex-1 text-[1.1rem] leading-relaxed text-pretty">
                  <p>“{a.texto}”</p>
                </blockquote>
                <figcaption className="mt-6 text-[0.95rem] text-tinta-suave">
                  {a.autor} · {a.fonte}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

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
      <MessageCircle className="size-6" aria-hidden />
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
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
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
