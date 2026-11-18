import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { collectRefs } from '../test/collectRefs'
import { imageMeta, PROJECT_CATEGORIES, siteImages, videoType } from './images'

/**
 * Protegen el contenido editado desde /admin: si algo queda mal (foto sin optimizar,
 * sin descripción, video inexistente…), la verificación falla y Netlify no publica.
 */
const root = path.resolve(import.meta.dirname, '../..')
const MAX_VIDEO_MB = 25

describe('multimedia del sitio (src/content/images.json)', () => {
  const refs = collectRefs(siteImages)

  it('todas las imágenes están optimizadas en el manifiesto', () => {
    for (const ref of refs) expect(() => imageMeta(ref.src)).not.toThrow()
  })

  it('las imágenes de contenido tienen texto alternativo', () => {
    // Portada y fondo del llamado a la acción son decorativas
    const decorative = new Set([siteImages.hero.src, siteImages.ledBackdrop.src])
    for (const ref of refs.filter((r) => !decorative.has(r.src))) {
      expect(ref.alt.trim(), `Falta la descripción de ${ref.src}`).not.toBe('')
    }
  })

  it('cada proyecto tiene cliente, descripción y una categoría válida', () => {
    expect(siteImages.projects.length).toBeGreaterThan(0)
    for (const p of siteImages.projects) {
      expect(p.client.trim(), p.src).not.toBe('')
      expect(p.caption.trim(), p.src).not.toBe('')
      expect(PROJECT_CATEGORIES, p.src).toContain(p.category)
    }
  })

  it('hay al menos un logotipo de cliente', () => {
    expect(siteImages.clients.length).toBeGreaterThan(0)
  })

  it(`el showreel existe, es MP4/WebM y pesa menos de ${MAX_VIDEO_MB} MB`, () => {
    const { video } = siteImages.showreel
    const file = path.join(root, 'public', video)
    expect(existsSync(file), `No existe public${video}`).toBe(true)
    expect(['video/mp4', 'video/webm']).toContain(videoType(video))
    expect(statSync(file).size / 1024 ** 2).toBeLessThan(MAX_VIDEO_MB)
  })

  it('las categorías del panel /admin coinciden con las del sitio', () => {
    const config = readFileSync(path.join(root, 'public/admin/config.yml'), 'utf8')
    const block = config.match(/name: category[\s\S]*?options: \[([^\]]*)\]/)?.[1] ?? ''
    const options = block.split(',').map((o: string) => o.trim().replace(/^'|'$/g, ''))
    expect(options).toEqual([...PROJECT_CATEGORIES])
  })
})
