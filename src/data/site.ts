/**
 * Textos y datos de contacto del sitio. Para cambiar teléfonos, redes
 * o el menú, edita solo este archivo.
 */

export const contact = {
  /** Número en formato internacional sin "+" ni espacios (para wa.me y tel:) */
  whatsapp: '523322612327',
  phoneDisplay: '+52 33 2261 2327',
  email: 'contacto@mimproducciones.com',
  city: 'Guadalajara, Jalisco',
  /** Mensaje con el que se abre WhatsApp desde cualquier botón de cotizar */
  quoteMessage: 'Hola, me gustaría cotizar un evento con MIM Producciones.',
} as const

export const social = [
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/MIMProduccionesMX' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/mimproduccionesmx/' },
] as const

export interface NavItem {
  id: string
  label: string
}

/** Secciones de la página, en orden. El `id` es el ancla (#id) de cada sección. */
export const navItems: readonly NavItem[] = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'contacto', label: 'Contacto' },
]

export const FOUNDING_YEAR = 2012
/** Año actual (se evalúa una vez al cargar la página, no en cada render). */
export const CURRENT_YEAR = new Date().getFullYear()
export const YEARS_OF_EXPERIENCE = CURRENT_YEAR - FOUNDING_YEAR

export const hero = {
  eyebrow: `Producción audiovisual en Guadalajara desde ${FOUNDING_YEAR}`,
  title: 'Convertimos ideas en emociones que',
  highlight: 'trascienden la pantalla',
  intro:
    'Pantallas LED, audio, iluminación y producción integral para eventos corporativos, sociales y exposiciones en todo México. Equipo propio, operado por técnicos que viven el escenario.',
} as const

/** Cifra animada (`value`) o dato en texto (`text`), con su etiqueta. */
export type Stat =
  | { value: number; prefix?: string; suffix?: string; label: string }
  | { text: string; label: string }

/** Cifras del hero. Se calculan para que no queden desactualizadas. */
export const buildStats = (clientCount: number, now = new Date()): Stat[] => [
  { value: now.getFullYear() - FOUNDING_YEAR, prefix: '+', label: `años desde ${FOUNDING_YEAR}` },
  { value: clientCount, prefix: '+', label: 'marcas líderes confían en nosotros' },
  { text: 'Equipo propio', label: 'sin subrentas' },
  { text: 'Nacional', label: 'viajamos a todo México' },
]
