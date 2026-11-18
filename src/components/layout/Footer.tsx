import { contact, CURRENT_YEAR, navItems, social } from '../../data/site'
import { services } from '../../data/services'
import { mailtoUrl, telUrl, whatsappUrl } from '../../utils/links'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'

const linkClass = 'text-fg-muted transition-colors duration-200 hover:text-led-light'

export function Footer() {
  return (
    <footer className="relative border-t border-ink-line bg-ink-soft">
      <div className="wrapper grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="grid content-start gap-5">
          <Logo className="w-[168px]" />
          <p className="max-w-xs text-sm text-fg-muted">
            Pantallas LED, audio, iluminación y producción de eventos desde {contact.city}.
          </p>
          <ul role="list" className="flex gap-3">
            {social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} de MIM Producciones`}
                  className="grid size-10 place-items-center rounded-full border border-ink-line text-fg-muted transition-colors duration-200 hover:border-led hover:text-led [&_svg]:size-[18px]"
                >
                  <Icon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Secciones">
          <h2 className="mb-5 font-body eyebrow text-fg-subtle">Navegación</h2>
          <ul role="list" className="grid gap-3 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-5 font-body eyebrow text-fg-subtle">Servicios</h2>
          <ul role="list" className="grid gap-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`#servicio-${s.id}`} className={linkClass}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 font-body eyebrow text-fg-subtle">Contacto</h2>
          <ul role="list" className="grid gap-3 text-sm">
            <li>
              <a href={telUrl()} className={`${linkClass} inline-flex items-center gap-2.5`}>
                <Icon name="phone" className="size-4 text-led" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(contact.whatsappGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2.5`}
              >
                <Icon name="whatsapp" className="size-4 text-led" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={mailtoUrl()} className={`${linkClass} inline-flex items-center gap-2.5`}>
                <Icon name="mail" className="size-4 text-led" /> {contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-fg-muted">
              <Icon name="pin" className="size-4 text-led" /> {contact.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <p className="wrapper py-6 text-xs text-fg-subtle">
          © {CURRENT_YEAR} MIM Producciones. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
