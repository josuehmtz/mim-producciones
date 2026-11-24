import { useEffect, useState } from 'react'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import { quoteUrl } from '../../utils/links'
import { Icon } from './Icon'

/**
 * `true` mientras el formulario de contacto está en pantalla. Ahí el formulario ya
 * ofrece WhatsApp, y en móvil el botón flotante taparía sus botones de envío.
 */
function useContactFormOnScreen() {
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    const form = document.querySelector('#contacto form')
    if (!form || !('IntersectionObserver' in globalThis)) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting))
    observer.observe(form)
    return () => observer.disconnect()
  }, [])
  return onScreen
}

/** Botón flotante de WhatsApp; aparece al bajar un poco en la página. */
export function WhatsAppFab() {
  const scrolled = useScrolled(400)
  const formOnScreen = useContactFormOnScreen()
  const visible = scrolled && !formOnScreen
  return (
    <a
      href={quoteUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      className={cn(
        // bottom-20: deja libre la esquina para la insignia de Netlify (plan gratuito)
        'fixed right-4 bottom-20 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)] transition-[translate,opacity,scale] duration-500 ease-out hover:scale-105 sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  )
}
