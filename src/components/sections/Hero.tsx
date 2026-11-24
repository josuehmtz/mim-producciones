import type { CSSProperties } from 'react'
import { buildStats, hero } from '../../data/site'
import { siteImages, videoType } from '../../data/images'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useSpotlight } from '../../hooks/useSpotlight'
import { quoteUrl } from '../../utils/links'
import { AnimatedWords } from '../ui/AnimatedWords'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { Equalizer } from '../ui/Equalizer'
import { Logo } from '../ui/Logo'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { VideoPlayer, type VideoSource } from '../ui/VideoPlayer'

/** El video se cambia desde el panel /admin */
const showreel: VideoSource[] = [
  { src: siteImages.showreel.video, type: videoType(siteImages.showreel.video) },
]

const stats = buildStats(siteImages.clients.length)

/** Coreografía de entrada (ms): primero enciende el logotipo, luego entra el mensaje */
const TIMING = { title: 450, intro: 1000, actions: 1150, reel: 700 }

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties

export function Hero() {
  // El video solo se monta en escritorio: en el teléfono ahorra datos
  const isDesktop = useMediaQuery('(min-width: 60rem)')
  // Reflector que sigue al cursor sobre la rejilla LED
  const spotlightRef = useSpotlight<HTMLElement>()

  return (
    <section
      ref={spotlightRef}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-header"
      style={{ '--mx': '-1000px', '--my': '-1000px' } as CSSProperties}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ResponsiveImage
          image={siteImages.hero}
          alt=""
          priority
          className="size-full animate-kenburns object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="absolute inset-0 bg-led-grid mask-[linear-gradient(180deg,#000,transparent_70%)] opacity-40" />
        {/* La rejilla se "enciende" bajo el cursor, como un reflector sobre la pantalla */}
        <div className="absolute inset-0 bg-[radial-gradient(rgb(158_227_255/0.9)_1.2px,transparent_1.8px)] mask-[radial-gradient(240px_circle_at_var(--mx)_var(--my),#000,transparent_75%)] bg-size-[18px_18px]" />
        <div className="absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),rgb(61_191_240/0.14),transparent_70%)]" />
        {/* Brillo de color detrás del título */}
        <div className="absolute top-1/4 -left-40 size-[36rem] rounded-full bg-led/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-violet/20 blur-[120px]" />
        {/* Marca de agua: la matriz de puntos del logotipo a gran escala */}
        <Logo
          decorative
          wordmark={false}
          glow={false}
          className="absolute top-1/2 -right-[12%] w-[min(1100px,120vw)] -translate-y-1/2 opacity-[0.07] max-lg:top-[38%]"
        />
        {/* Línea de barrido, como el refresco de una pantalla LED */}
        <div className="absolute inset-x-0 top-0 h-32 animate-scan bg-linear-to-b from-transparent via-led/[0.07] to-transparent" />
      </div>

      <div className="wrapper grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="grid max-w-[46rem] gap-6">
          {/* Firma de la marca: el logotipo se enciende píxel por píxel */}
          <div className="grid gap-4">
            <Logo animated className="w-[180px] sm:w-[220px]" />
            <p className="inline-flex animate-rise items-center gap-3 eyebrow text-led-light [animation-delay:300ms]">
              <Equalizer className="text-led" />
              {hero.eyebrow}
            </p>
          </div>

          <h1 id="hero-title" className="text-hero font-semibold">
            <AnimatedWords text={hero.title} delay={TIMING.title} />{' '}
            <AnimatedWords
              text={hero.highlight}
              delay={TIMING.title + hero.title.split(' ').length * 70}
              wordClassName="text-shimmer"
            />
          </h1>

          <p className="max-w-xl animate-rise text-lg text-fg-muted" style={delay(TIMING.intro)}>
            {hero.intro}
          </p>

          <div className="flex animate-rise flex-wrap gap-3" style={delay(TIMING.actions)}>
            <Button href={quoteUrl()} external size="lg" icon="whatsapp">
              Cotizar por WhatsApp
            </Button>
            <Button href="#proyectos" variant="outline" size="lg" trailingIcon="arrow">
              Ver proyectos
            </Button>
          </div>
        </div>

        {isDesktop && (
          <div className="animate-rise" style={delay(TIMING.reel)}>
            {/* Ancho limitado por el alto de la pantalla para que el video siempre quepa */}
            <div className="relative w-[min(290px,calc(56svh*9/16))] animate-float">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-ink shadow-glow">
                <VideoPlayer
                  sources={showreel}
                  label="Fragmento de un evento producido por MIM Producciones"
                  className="aspect-[9/16]"
                  overlay={({ playing }) => (
                    <span className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1.5 eyebrow text-[0.65rem] text-fg backdrop-blur-md">
                      <Equalizer playing={playing} className="h-2.5 text-led" /> Showreel
                    </span>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative border-t border-ink-line bg-ink/40 backdrop-blur-md">
        <dl className="wrapper grid grid-cols-2 gap-x-6 gap-y-6 py-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="grid gap-1">
              <dt className="order-2 text-sm text-fg-muted">{stat.label}</dt>
              <dd className="order-1 font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] leading-none font-semibold tracking-tight">
                {'text' in stat ? (
                  stat.text
                ) : (
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
