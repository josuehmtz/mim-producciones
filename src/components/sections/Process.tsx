import { processSteps } from '../../data/about'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  return (
    <Section id="proceso" labelledBy="proceso-title" className="overflow-hidden bg-ink-soft">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-led-grid mask-[radial-gradient(ellipse_at_center,#000,transparent_70%)] opacity-50"
      />
      <div className="relative">
        <SectionHeading
          id="proceso-title"
          align="center"
          eyebrow="Cómo trabajamos"
          title={
            <>
              Del concepto al desmontaje, <em>sin preocupaciones</em>
            </>
          }
          intro="Un solo equipo responsable de cada etapa, con técnicos en sitio de principio a fin."
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative">
              <div className="grid h-full content-start gap-3 card-surface p-6">
                <span
                  aria-hidden="true"
                  className="text-brand-gradient font-display text-[2.75rem] leading-none font-bold"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg">{step.title}</h3>
                <p className="text-sm text-fg-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
