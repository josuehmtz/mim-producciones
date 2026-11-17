import { describe, expect, it } from 'vitest'
import { collectRefs } from '../test/collectRefs'
import { imageMeta, siteImages } from './images'

describe('imágenes del sitio', () => {
  const refs = collectRefs(siteImages)

  it('todas las imágenes están optimizadas en el manifiesto', () => {
    for (const ref of refs) expect(() => imageMeta(ref.src)).not.toThrow()
  })

  it('las imágenes de contenido tienen texto alternativo', () => {
    const decorative = new Set([siteImages.ledBackdrop.src])
    for (const ref of refs.filter((r) => !decorative.has(r.src))) {
      expect(ref.alt.trim(), ref.src).not.toBe('')
    }
  })

  it('cada proyecto tiene cliente, descripción y categoría', () => {
    for (const p of siteImages.projects) {
      expect(p.client && p.caption && p.category, p.src).toBeTruthy()
    }
  })
})
