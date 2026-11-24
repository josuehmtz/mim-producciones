import { milestones, values } from '../../data/about'
import { siteImages } from '../../data/images'
import { FOUNDING_YEAR, YEARS_OF_EXPERIENCE } from '../../data/site'
import { IconCard } from '../ui/IconCard'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <Section id="nosotros" labelledBy="nosotros-title">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative pb-16 sm:pr-16">
          <ResponsiveImage
            image={siteImages.about}
            sizes="(min-width: 60rem) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-xl border border-ink-line object-cover"
          />
          <ResponsiveImage
            image={siteImages.aboutAccent}
            sizes="220px"
            className="absolute right-0 bottom-0 aspect-[3/4] w-[42%] max-w-[240px] rounded-lg border-4 border-ink object-cover shadow-glow"
          />
          <div className="absolute top-6 -left-3 rounded-lg border border-led/30 bg-ink/80 px-5 py-4 backdrop-blur-md sm:-left-6">
            <p className="text-brand-gradient font-display text-stat leading-none font-semibold">
              +{YEARS_OF_EXPERIENCE}
            </p>
            <p className="text-xs text-fg-muted">años de experiencia</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="nosotros-title"
            eyebrow="Quiénes somos"
            title={
              <>
                Desde {FOUNDING_YEAR} en el escenario, <em>hoy en todo México</em>
              </>
            }
            intro={`Somos una empresa mexicana con sede en Guadalajara, Jalisco. Desde ${FOUNDING_YEAR} subimos el nivel de cada evento con tecnología de vanguardia y un equipo apasionado por el escenario, y viajamos a eventos en todo el país.`}
            className="mb-10 lg:mb-10"
          />

          <ol className="relative grid gap-8 border-l border-ink-line pl-8">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 50} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[37px] size-[9px] rounded-full bg-led shadow-[0_0_0_4px_var(--color-ink),0_0_14px_var(--color-led)]"
                />
                <p className="eyebrow text-led">{m.year}</p>
                <h3 className="mt-1 text-lg">{m.title}</h3>
                <p className="mt-1 text-fg-muted">{m.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <h3 className="sr-only">Nuestros valores</h3>
      <ul
        role="list"
        className="mt-section grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {values.map((value, i) => (
          <Reveal as="li" key={value.title} delay={i * 40}>
            <IconCard {...value} headingLevel="h4" className="p-6" />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
