import content from '../content/images.json'
import manifest from '../generated/images.manifest.json'

/**
 * Multimedia del sitio. `src/content/images.json` lo edita el panel /admin
 * (Decap CMS); este módulo le da tipos y lo expone al resto de la app.
 */

/** Una imagen tal como se declara en `src/content/images.json`. */
export interface ImageRef {
  src: string
  alt: string
}

/**
 * Categorías de proyectos (filtros de la sección Proyectos).
 * Deben coincidir con las opciones del panel en `public/admin/config.yml`;
 * una prueba lo verifica.
 */
export const PROJECT_CATEGORIES = [
  'Corporativo',
  'Experiencia de marca',
  'Expo',
  'Social',
  'Transmisión',
  'Venta',
] as const

export interface Project extends ImageRef {
  client: string
  caption: string
  category: string
}

/** Video del hero. La ruta es pública (archivo en `public/videos/`). */
export interface Showreel {
  video: string
}

const VIDEO_TYPES: Record<string, string> = { mp4: 'video/mp4', webm: 'video/webm' }

/** Tipo MIME a partir de la extensión (para el atributo `type` de <source>). */
export const videoType = (path: string) =>
  VIDEO_TYPES[path.split('.').pop()?.toLowerCase() ?? ''] ?? 'video/mp4'

export interface ImageMeta {
  /** Ruta pública sin ancho ni extensión, p. ej. `/images/8785-ab12cd34` */
  base: string
  width: number
  height: number
  widths: number[]
  placeholder: string
}

interface SiteImages {
  hero: ImageRef
  showreel: Showreel
  about: ImageRef
  aboutAccent: ImageRef
  ledBackdrop: ImageRef
  services: Record<'rental' | 'ledSales' | 'production', ImageRef>
  projects: Project[]
  clients: ImageRef[]
}

export const siteImages: SiteImages = content

const metaBySrc: Record<string, ImageMeta | undefined> = manifest

export function imageMeta(src: string): ImageMeta {
  const meta = metaBySrc[src]
  if (!meta) throw new Error(`Imagen sin optimizar: ${src}. Ejecuta "npm run images".`)
  return meta
}

/** URL de la versión WebP de una imagen en un ancho dado. */
export const imageUrl = (src: string, width: number) => `${imageMeta(src).base}-${width}.webp`

export const srcSetFor = (src: string) =>
  imageMeta(src)
    .widths.map((w) => `${imageUrl(src, w)} ${w}w`)
    .join(', ')

/** Versión de mayor resolución disponible (para el visor de proyectos). */
export function largestSrc(src: string) {
  const { widths } = imageMeta(src)
  return imageUrl(src, widths.at(-1) ?? 960)
}

/** Versión mediana para el atributo `src` de respaldo. */
export function defaultSrc(src: string) {
  const { widths } = imageMeta(src)
  return imageUrl(src, widths.find((w) => w >= 960) ?? widths.at(-1) ?? 960)
}
