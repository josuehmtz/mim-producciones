/**
 * Lógica del formulario de contacto, separada de la interfaz para poder
 * probarla y reutilizarla (WhatsApp, correo o un backend en el futuro).
 */

export const serviceOptions = [
  'Renta de equipo audiovisual',
  'Compra de pantalla LED',
  'Producción integral de evento',
  'Stand para exposición',
  'Otro',
] as const

export interface ContactRequest {
  name: string
  company?: string
  service: string
  date?: string
  message?: string
}

export type ContactField = 'name' | 'service' | 'date' | 'message'
export type ContactErrors = Partial<Record<ContactField, string>>

/** Fecha local de hoy en formato YYYY-MM-DD (mismo formato que <input type="date">). */
export const todayISO = (now = new Date()) => now.toLocaleDateString('en-CA')

export const MAX_MESSAGE_LENGTH = 800

export function validateContact(data: ContactRequest, now = new Date()): ContactErrors {
  const errors: ContactErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Escribe tu nombre.'
  if (!data.service) errors.service = 'Selecciona el servicio que te interesa.'
  if (data.date && data.date < todayISO(now)) errors.date = 'Elige una fecha a partir de hoy.'
  if ((data.message?.length ?? 0) > MAX_MESSAGE_LENGTH)
    errors.message = `Máximo ${MAX_MESSAGE_LENGTH} caracteres.`
  return errors
}

/** Convierte "2026-12-05" en "5 de diciembre de 2026" sin depender de la zona horaria. */
export function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}

/** Texto del mensaje que recibe MIM Producciones. */
export function buildContactMessage(req: ContactRequest): string {
  const company = req.company?.trim()
  const lines = [
    `Hola, soy ${req.name.trim()}${company ? ` de ${company}` : ''}.`,
    `Me interesa: ${req.service}.`,
  ]
  if (req.date) lines.push(`Fecha del evento: ${formatDate(req.date)}.`)
  if (req.message?.trim()) lines.push('', req.message.trim())
  return lines.join('\n')
}
