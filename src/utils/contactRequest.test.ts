import { describe, expect, it } from 'vitest'
import {
  buildContactMessage,
  formatDate,
  MAX_MESSAGE_LENGTH,
  validateContact,
  type ContactRequest,
} from './contactRequest'

const now = new Date(2026, 10, 17) // 17 nov 2026, hora local
const valid: ContactRequest = { name: 'Ana', service: 'Compra de pantalla LED' }

describe('validateContact', () => {
  it('acepta una solicitud mínima válida', () => {
    expect(validateContact(valid, now)).toEqual({})
  })

  it('exige nombre y servicio', () => {
    expect(validateContact({ name: ' ', service: '' }, now)).toEqual({
      name: expect.any(String),
      service: expect.any(String),
    })
  })

  it('rechaza fechas pasadas y acepta hoy', () => {
    expect(validateContact({ ...valid, date: '2026-11-16' }, now).date).toBeDefined()
    expect(validateContact({ ...valid, date: '2026-11-17' }, now).date).toBeUndefined()
  })

  it('limita la longitud del mensaje', () => {
    const message = 'a'.repeat(MAX_MESSAGE_LENGTH + 1)
    expect(validateContact({ ...valid, message }, now).message).toBeDefined()
  })
})

describe('formatDate', () => {
  it('formatea en español sin desfase de zona horaria', () => {
    expect(formatDate('2026-12-05')).toBe('5 de diciembre de 2026')
  })

  it('devuelve el texto original si no es una fecha', () => {
    expect(formatDate('mañana')).toBe('mañana')
  })
})

describe('buildContactMessage', () => {
  it('incluye empresa, fecha y mensaje cuando existen', () => {
    const text = buildContactMessage({
      name: ' Ana ',
      company: 'Acme',
      service: 'Producción integral de evento',
      date: '2026-12-05',
      message: ' 300 asistentes ',
    })
    expect(text).toBe(
      [
        'Hola, soy Ana de Acme.',
        'Me interesa: Producción integral de evento.',
        'Fecha del evento: 5 de diciembre de 2026.',
        '',
        '300 asistentes',
      ].join('\n'),
    )
  })

  it('omite los campos opcionales vacíos', () => {
    expect(buildContactMessage(valid)).toBe('Hola, soy Ana.\nMe interesa: Compra de pantalla LED.')
  })
})
