import { buildStats, contact, hero } from '../../data/site'
import { siteImages } from '../../data/images'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { whatsappUrl } from '../../utils/links'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { VideoPlayer, type VideoSource } from '../ui/VideoPlayer'

const showreel: VideoSource[] = [
  { src: '/videos/showreel.webm', type: 'video/webm' },
  { src: '/videos/showreel.mp4', type: 'video/mp4' },
]

const stats = buildStats(siteImages.clients.length)

export function Hero() {
  // El video solo se monta en escritorio: en el teléfono ahorra datos
  const isDesktop = useMediaQuery('(min-width: 60rem)')

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-header"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ResponsiveImage
          image={siteImages.hero}
          alt=""
          priority
          className="size-full scale-105 object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="absolute inset-0 bg-led-grid mask-[linear-gradient(180deg,#000,transparent_70%)] opacity-40" />
        {/* Brillo de color detrás del título */}
        <div className="absolute top-1/4 -left-40 size-[36rem] rounded-full bg-led/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-violet/20 blur-[120px]" />
      </div>

      <div className="wrapper grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="grid max-w-3xl gap-8">
          <p className="inline-flex w-fit animate-rise items-center gap-3 rounded-full border border-led/30 bg-led/10 px-4 py-2 eyebrow text-led-light">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-led opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-led" />
            </span>
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="animate-rise text-3xl font-semibold [animation-delay:120ms]"
          >
            {hero.title} <span className="text-brand-gradient">{hero.highlight}</span>
          </h1>

          <p className="max-w-xl animate-rise text-lg text-fg-muted [animation-delay:240ms]">
            {hero.intro}
          </p>

          <div className="flex animate-rise flex-wrap gap-3 [animation-delay:360ms]">
            <Button href={whatsappUrl(contact.whatsappGreeting)} external size="lg" icon="whatsapp">
              Cotiza tu evento
            </Button>
            <Button href="#proyectos" variant="outline" size="lg" trailingIcon="arrow">
              Ver proyectos
            </Button>
          </div>
        </div>

        {isDesktop && (
          <div className="relative mx-auto w-full max-w-[300px] animate-rise [animation-delay:300ms]">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-ink shadow-glow">
              <VideoPlayer
                sources={showreel}
                label="Fragmento de un evento producido por MIM Producciones"
                className="aspect-[9/16]"
              />
              <span className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1.5 eyebrow text-[0.65rem] text-fg backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-danger" /> Showreel
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="relative border-t border-ink-line bg-ink/40 backdrop-blur-md">
        <dl className="wrapper grid grid-cols-2 gap-x-6 gap-y-8 py-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="grid gap-1">
              <dt className="order-2 text-sm text-fg-muted">{stat.label}</dt>
              <dd className="order-1 font-display text-stat leading-none font-semibold tracking-tight">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
