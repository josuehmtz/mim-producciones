/// <reference types="vitest/config" />
import { cpSync, readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'

/**
 * Hash del script inline de la insignia "Powered by Netlify" que Netlify inyecta en
 * los sitios del plan gratuito (/.netlify/scripts/hud). Sin él, la CSP lo bloquea y
 * aparece un error en la consola. Si Netlify cambia ese script, la consola mostrará
 * el nuevo hash ("sha256-…"): reemplázalo aquí.
 */
const NETLIFY_BADGE_SCRIPT_HASH = "'sha256-BkKP2XO6WOEc3kXOiLr2ZoY83hamalKjPY9xBcbXVuw='"

/**
 * Content-Security-Policy del sitio. Va como <meta> solo en build
 * (el modo dev de Vite inyecta scripts inline).
 */
const CSP = [
  "default-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  `script-src 'self' ${NETLIFY_BADGE_SCRIPT_HASH}`,
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

/**
 * Dirección pública del sitio. Netlify define `URL` con el dominio principal
 * del proyecto (p. ej. mimproducciones.netlify.app o el dominio propio).
 */
const SITE_URL = (process.env.URL || 'https://mimproducciones.com').replace(/\/+$/, '')

/**
 * Publica las fotos originales en /assets-src/ para que el panel /admin pueda
 * mostrar la vista previa de cada imagen. El sitio público no las usa
 * (sirve las versiones WebP optimizadas de /images/).
 */
function publishOriginals(): Plugin {
  let outDir = 'dist'
  return {
    name: 'mim-publish-originals',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      cpSync('assets-src', `${outDir}/assets-src`, { recursive: true })
    },
  }
}

/** Genera robots.txt y sitemap.xml con la dirección pública del sitio. */
function seoFiles(): Plugin {
  return {
    name: 'mim-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: [
          'User-agent: *',
          'Allow: /',
          'Disallow: /admin/',
          'Disallow: /assets-src/',
          '',
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          '',
        ].join('\n'),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod></url>`,
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

/**
 * Pone la dirección pública en index.html (canonical, Open Graph, JSON-LD),
 * precarga la imagen del hero (su nombre lleva hash) y agrega la CSP.
 */
function siteHtml(): Plugin {
  return {
    name: 'mim-site-html',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const content = JSON.parse(readFileSync('src/content/images.json', 'utf8'))
        const manifest = JSON.parse(readFileSync('src/generated/images.manifest.json', 'utf8'))
        const hero = manifest[content.hero.src] as { base: string; widths: number[] }
        const srcset = hero.widths.map((w) => `${hero.base}-${w}.webp ${w}w`).join(', ')
        const fallback = `${hero.base}-${hero.widths.find((w) => w >= 960) ?? hero.widths.at(-1)}.webp`

        const tags: HtmlTagDescriptor[] = [
          {
            tag: 'link',
            injectTo: 'head',
            attrs: {
              rel: 'preload',
              as: 'image',
              type: 'image/webp',
              href: fallback,
              imagesrcset: srcset,
              imagesizes: '100vw',
              fetchpriority: 'high',
            },
          },
          ...(ctx.server
            ? []
            : [
                {
                  tag: 'meta',
                  injectTo: 'head-prepend' as const,
                  attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
                },
              ]),
        ]

        return { html: html.replaceAll('__SITE_URL__', SITE_URL), tags }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteHtml(), seoFiles(), publishOriginals()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    restoreMocks: true,
  },
})
