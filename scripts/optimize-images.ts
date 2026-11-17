/**
 * Optimiza las imágenes referenciadas en `src/content/images.json` y genera:
 *   - public/images/<nombre>-<hash>-<ancho>.webp  (versiones responsivas)
 *   - src/generated/images.manifest.json          (dimensiones + placeholder borroso)
 *   - public/og-image.jpg y public/apple-touch-icon.png
 *
 * El hash del contenido en el nombre permite caché inmutable: si se reemplaza
 * una foto, cambia su URL. Si una imagen referenciada no existe, el proceso
 * falla y Netlify no publica.
 *
 * Uso: npm run images  (se ejecuta solo antes de dev, test y build)
 */
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const contentPath = path.join(root, 'src', 'content', 'images.json')
const outDir = path.join(root, 'public', 'images')
const manifestPath = path.join(root, 'src', 'generated', 'images.manifest.json')

const WIDTHS = [480, 960, 1600]
const MAX_WIDTH = 1920
const QUALITY = 74

interface ImageMeta {
  base: string
  width: number
  height: number
  widths: number[]
  placeholder: string
}

/** Recorre el JSON y devuelve todas las rutas `src` de imágenes. */
function collectSources(node: unknown, found = new Set<string>()): Set<string> {
  if (Array.isArray(node)) node.forEach((n) => collectSources(n, found))
  else if (node && typeof node === 'object') {
    const { src } = node as { src?: unknown }
    if (typeof src === 'string' && src) found.add(src)
    Object.values(node).forEach((n) => collectSources(n, found))
  }
  return found
}

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'imagen'

/** Anchos a generar: los estándar menores al original, más el original (con tope). */
const widthsFor = (width: number) =>
  [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, MAX_WIDTH)])].sort(
    (a, b) => a - b,
  )

async function optimize(src: string, keep: Set<string>): Promise<ImageMeta> {
  const buffer = await readFile(path.join(root, src))
  const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 8)
  const base = `${slugify(path.parse(src).name)}-${hash}`

  // `.rotate()` aplica la orientación EXIF (fotos de celular)
  const input = sharp(buffer).rotate()
  const meta = await input.metadata()
  const swap = (meta.orientation ?? 1) >= 5
  const width = swap ? meta.height : meta.width
  const height = swap ? meta.width : meta.height
  if (!width || !height) throw new Error(`No se pudieron leer las dimensiones de ${src}`)

  const widths = widthsFor(width)
  for (const w of widths) {
    const name = `${base}-${w}.webp`
    keep.add(name)
    const target = path.join(outDir, name)
    if (existsSync(target)) continue // mismo contenido = mismo hash: ya existe
    await input.clone().resize({ width: w }).webp({ quality: QUALITY }).toFile(target)
  }

  const blur = await input.clone().resize({ width: 24 }).webp({ quality: 40 }).toBuffer()
  return {
    base: `/images/${base}`,
    width,
    height,
    widths,
    placeholder: `data:image/webp;base64,${blur.toString('base64')}`,
  }
}

const content = JSON.parse(await readFile(contentPath, 'utf8')) as { hero: { src: string } }
const sources = [...collectSources(content)]

const missing = sources.filter((src) => !existsSync(path.join(root, src)))
if (missing.length) {
  console.error('✗ Imágenes referenciadas que no existen:\n  ' + missing.join('\n  '))
  process.exit(1)
}

await mkdir(outDir, { recursive: true })
const keep = new Set<string>()
const manifest: Record<string, ImageMeta> = {}
for (const src of sources) manifest[src] = await optimize(src, keep)

// Imagen para compartir en redes sociales: la del hero
await sharp(path.join(root, content.hero.src))
  .rotate()
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80 })
  .toFile(path.join(root, 'public', 'og-image.jpg'))

// Ícono para iOS a partir del logotipo
await sharp(path.join(root, 'assets-brand', 'logo.png'))
  .resize(180, 180, { fit: 'contain', background: '#ffffff' })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(path.join(root, 'public', 'apple-touch-icon.png'))

// Elimina versiones de imágenes que ya no se usan
for (const f of await readdir(outDir)) {
  if (!keep.has(f)) await rm(path.join(outDir, f))
}

await mkdir(path.dirname(manifestPath), { recursive: true })
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`✓ ${sources.length} imágenes optimizadas → public/images`)
