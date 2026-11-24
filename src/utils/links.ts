import { contact } from '../data/site'

/** Enlace a WhatsApp, opcionalmente con un mensaje prellenado. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${contact.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** Enlace `mailto:` con asunto y cuerpo prellenados. */
export function mailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  // URLSearchParams codifica espacios como "+", que los clientes de correo no interpretan
  const query = params.toString().replaceAll('+', '%20')
  return `mailto:${contact.email}${query ? `?${query}` : ''}`
}

export const telUrl = () => `tel:+${contact.whatsapp}`

/** WhatsApp con el mensaje de cotización: el destino de todos los botones de cotizar. */
export const quoteUrl = () => whatsappUrl(contact.quoteMessage)
