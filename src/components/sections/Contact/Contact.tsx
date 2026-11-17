import type { ReactNode } from 'react'
import { contact, social } from '../../../data/site'
import { mailtoUrl, telUrl, whatsappUrl } from '../../../utils/links'
import { Icon, type IconName } from '../../ui/Icon'
import { Reveal } from '../../ui/Reveal'
import { Section } from '../../ui/Section'
import { SectionHeading } from '../../ui/SectionHeading'
import { ContactForm } from './ContactForm'

interface ChannelLinkProps {
  icon: IconName
  label: string
  href?: string
  external?: boolean
  children: ReactNode
}

/** Fila de un medio de contacto (con o sin enlace). */
function ChannelLink({ icon, label, href, external, children }: ChannelLinkProps) {
  const body = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-md border border-led/25 bg-led/10 text-led [&_svg]:size-5">
        <Icon name={icon} />
      </span>
      <span className="grid">
        <span className="text-xs tracking-wide text-fg-subtle uppercase">{label}</span>
        <span className="font-medium [overflow-wrap:anywhere]">{children}</span>
      </span>
    </>
  )
  const className = 'flex items-center gap-4 rounded-lg p-2 -m-2'

  return href ? (
    <a
      href={href}
      className={`${className} transition-colors duration-200 hover:bg-white/[0.04]`}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  )
}

export function Contact() {
  return (
    <Section id="contacto" labelledBy="contacto-title" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 size-[34rem] rounded-full bg-led/10 blur-[140px]"
      />
      <div className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="contacto-title"
            eyebrow="Contacto"
            title={
              <>
                Transformemos tu idea <em>en una experiencia</em>
              </>
            }
            intro="Cuéntanos qué necesitas y te asesoramos sin compromiso."
            className="mb-10 lg:mb-12"
          />

          <ul role="list" className="grid gap-6">
            <li>
              <ChannelLink
                icon="whatsapp"
                label="WhatsApp"
                href={whatsappUrl(contact.whatsappGreeting)}
                external
              >
                {contact.phoneDisplay}
              </ChannelLink>
            </li>
            <li>
              <ChannelLink icon="phone" label="Llámanos" href={telUrl()}>
                {contact.phoneDisplay}
              </ChannelLink>
            </li>
            <li>
              <ChannelLink icon="mail" label="Correo" href={mailtoUrl()}>
                {contact.email}
              </ChannelLink>
            </li>
            <li>
              <ChannelLink icon="pin" label="Ubicación">
                {contact.city} · Servicio en todo México
              </ChannelLink>
            </li>
          </ul>

          <div className="mt-10 flex gap-3">
            {social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-line px-5 text-sm text-fg-muted transition-colors duration-200 hover:border-led hover:text-led [&_svg]:size-4"
              >
                <Icon name={s.icon} /> {s.name}
              </a>
            ))}
          </div>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
