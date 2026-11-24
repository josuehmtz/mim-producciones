import type { ReactNode } from 'react'
import { contact } from '../../../data/site'
import { mailtoUrl, quoteUrl, telUrl } from '../../../utils/links'
import { Icon, type IconName } from '../../ui/Icon'
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
                Cuéntanos de tu evento, <em>te respondemos el mismo día</em>
              </>
            }
            intro="Te asesoramos sin compromiso, por WhatsApp o por correo."
            className="mb-10 lg:mb-12"
          />

          <ul role="list" className="grid gap-6">
            <li>
              <ChannelLink icon="whatsapp" label="WhatsApp o llamada">
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <a
                    href={quoteUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-led-light hover:underline"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={telUrl()}
                    className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm text-fg-muted underline-offset-4 hover:text-led-light hover:underline [&_svg]:size-3.5"
                  >
                    <Icon name="phone" />
                    Llamar
                  </a>
                </span>
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
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
