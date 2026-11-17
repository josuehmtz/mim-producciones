import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { navItems } from './data/site'

describe('App', () => {
  it('muestra el título principal y todas las secciones del menú', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/trascienden la pantalla/)
    for (const item of navItems) expect(container.querySelector(`#${item.id}`)).not.toBeNull()
  })

  it('tiene un solo h1', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('abre y cierra el menú móvil', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Menú móvil' })).toBeVisible()
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('filtra proyectos por categoría', async () => {
    const user = userEvent.setup()
    render(<App />)
    const section = document.getElementById('proyectos')!
    const all = within(section).getAllByRole('button', { name: /^Ver proyecto/ }).length
    await user.click(within(section).getByRole('button', { name: 'Expo' }))
    const filtered = within(section).getAllByRole('button', { name: /^Ver proyecto/ })
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.length).toBeLessThan(all)
    expect(within(section).getByRole('button', { name: 'Expo' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('valida el formulario y abre WhatsApp con el mensaje', async () => {
    const user = userEvent.setup()
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<App />)
    const form = screen.getByRole('form', { name: 'Solicita tu cotización' })
    const send = within(form).getByRole('button', { name: 'Enviar por WhatsApp' })

    await user.click(send)
    expect(open).not.toHaveBeenCalled()
    expect(within(form).getByLabelText(/Nombre/)).toHaveAttribute('aria-invalid', 'true')

    await user.type(within(form).getByLabelText(/Nombre/), 'Ana')
    await user.selectOptions(within(form).getByLabelText(/Servicio/), 'Compra de pantalla LED')
    await user.click(send)

    expect(open).toHaveBeenCalledOnce()
    const url = String(open.mock.calls[0]?.[0])
    expect(url).toMatch(/^https:\/\/wa\.me\/523322612327\?text=/)
    expect(decodeURIComponent(url)).toContain('Me interesa: Compra de pantalla LED.')
  })
})
