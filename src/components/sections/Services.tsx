import { services, useCases, type Service } from '../../data/services'
import { cn } from '../../utils/cn'
import { whatsappUrl } from '../../utils/links'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { IconCard } from '../ui/IconCard'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1
  const titleId = `servicio-${service.id}-title`

  return (
    <article
      id={`servicio-${service.id}`}
      aria-labelledby={titleId}
      className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal className={cn('relative', reversed && 'lg:order-2')}>
        <div className="group relative overflow-hidden rounded-xl border border-ink-line">
          <ResponsiveImage
            image={service.image}
            sizes="(min-width: 60rem) 600px, 100vw"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 font-display text-[5rem] leading-none font-bold text-white/10">
            0{index + 1}
          </span>
        </div>
      </Reveal>

      <Reveal delay={80} className="grid gap-6">
        <p className="inline-flex items-center gap-3 eyebrow text-led">
          <span className="grid size-9 place-items-center rounded-md bg-led/10 [&_svg]:size-5">
            <Icon name={service.icon} />
          </span>
          {service.eyebrow}
        </p>
        <h3 id={titleId} className="text-2xl">
          {service.title}
        </h3>
        <p className="text-lg text-fg-muted">{service.description}</p>
        <ul role="list" className="grid gap-3 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm">
              <Icon name="check" className="mt-0.5 size-4 shrink-0 text-led" />
              {feature}
            </li>
          ))}
        </ul>
        <div>
          <Button
            href={whatsappUrl(service.whatsappMessage)}
            external
            variant="outline"
            trailingIcon="arrowUpRight"
          >
            Cotizar este servicio
          </Button>
        </div>
      </Reveal>
    </article>
  )
}

export function Services() {
  return (
    <Section id="servicios" labelledBy="servicios-title">
      <SectionHeading
        id="servicios-title"
        eyebrow="Servicios"
        title={
          <>
            Rentamos, vendemos y producimos <em>con equipo propio</em>
          </>
        }
        intro="Renta, venta y producción integral: un solo proveedor para que tu evento se vea y se escuche como lo imaginaste."
      />

      <div className="grid gap-24 lg:gap-32">
        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

      <div className="mt-section">
        <SectionHeading
          eyebrow="Casos de uso"
          title={
            <>
              Del congreso al estadio, <em>lo hacemos posible</em>
            </>
          }
          className="mb-10 lg:mb-12"
        />
        <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, i) => (
            <Reveal as="li" key={useCase.title} delay={(i % 3) * 60}>
              <IconCard {...useCase} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
