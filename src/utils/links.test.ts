import { describe, expect, it } from 'vitest'
import { mailtoUrl, telUrl, whatsappUrl } from './links'

describe('links', () => {
  it('genera el enlace de WhatsApp con el texto codificado', () => {
    expect(whatsappUrl()).toBe('https://wa.me/523322612327')
    expect(whatsappUrl('Hola & adiós')).toBe(
      'https://wa.me/523322612327?text=Hola%20%26%20adi%C3%B3s',
    )
  })

  it('genera mailto con espacios como %20 (no "+")', () => {
    expect(mailtoUrl()).toBe('mailto:contacto@mimproducciones.com')
    expect(mailtoUrl('Hola mundo', 'a b')).toBe(
      'mailto:contacto@mimproducciones.com?subject=Hola%20mundo&body=a%20b',
    )
  })

  it('genera el enlace telefónico internacional', () => {
    expect(telUrl()).toBe('tel:+523322612327')
  })
})
