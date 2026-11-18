import { contact } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import { whatsappUrl } from '../../utils/links'
import { Icon } from './Icon'

/** Botón flotante de WhatsApp; aparece al bajar un poco en la página. */
export function WhatsAppFab() {
  const visible = useScrolled(400)
  return (
    <a
      href={whatsappUrl(contact.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className={cn(
        // bottom-20: deja libre la esquina para la insignia de Netlify (plan gratuito)
        'fixed right-4 bottom-20 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)] transition-[translate,opacity,scale] duration-500 ease-out hover:scale-105 sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
      tabIndex={visible ? undefined : -1}
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  )
}
