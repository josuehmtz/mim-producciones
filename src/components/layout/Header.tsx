import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { navItems } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import { quoteUrl } from '../../utils/links'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

const sectionIds = navItems.map((item) => item.id)
const DESKTOP_QUERY = '(min-width: 60rem)'

export function Header() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Menú móvil: bloquea el scroll, se cierra con Escape y devuelve el foco al botón
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onDesktop = () => mql.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mql.addEventListener('change', onDesktop)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onDesktop)
      toggle?.focus()
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-out',
        // Con el menú abierto el fondo es sólido: backdrop-filter crearía un
        // containing block que rompería el panel fijo del menú móvil.
        open && 'bg-ink',
        !open && scrolled && 'bg-ink/75 backdrop-blur-xl backdrop-saturate-150',
        (scrolled || open) && 'shadow-[0_1px_0_var(--color-ink-line)]',
      )}
    >
      <div className="wrapper flex h-header items-center gap-8">
        <a
          href="#inicio"
          aria-label="MIM Producciones, ir al inicio"
          className={cn(
            'mr-auto py-2 transition-[opacity,translate] duration-500 ease-out focus-visible:translate-y-0 focus-visible:opacity-100',
            // Arriba de todo el logotipo grande del hero ya firma la página;
            // al bajar, este toma el relevo para que la marca siempre esté visible.
            scrolled || open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
          )}
        >
          <Logo decorative className="w-[112px] sm:w-[128px]" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul role="list" className="flex gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  className="rounded-full px-4 py-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg aria-[current]:bg-white/[0.06] aria-[current]:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* El contenedor oculta el botón en móvil (el botón ya define su propio `display`) */}
        <div className="hidden lg:block">
          <Button href={quoteUrl()} external size="sm">
            Cotizar por WhatsApp
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-11 place-items-center rounded-full border border-ink-line lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Hamburguesa: dos líneas que se convierten en una X */}
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={cn(
                'absolute left-0 h-0.5 w-5 rounded bg-current transition-[top,rotate] duration-300 ease-out',
                open ? 'top-[5px] rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 h-0.5 rounded bg-current transition-[top,rotate,width] duration-300 ease-out',
                open ? 'top-[5px] w-5 -rotate-45' : 'top-[10px] w-3.5',
              )}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-header bottom-0 flex animate-fade-in flex-col justify-between bg-ink bg-led-grid px-gutter pt-10 pb-12 lg:hidden"
      >
        <nav aria-label="Menú móvil">
          <ul role="list" className="grid gap-2">
            {navItems.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as CSSProperties}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex animate-rise items-baseline gap-4 py-2 font-display text-[2.25rem] font-semibold tracking-tight [animation-delay:calc(var(--i)*60ms+60ms)] hover:text-led-light"
                >
                  <span className="font-body text-xs font-normal text-led">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={quoteUrl()} external icon="whatsapp" size="lg">
          Cotizar por WhatsApp
        </Button>
      </div>
    </header>
  )
}
