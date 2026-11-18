/**
 * Elimina las fotos de `assets-src/` (incluidos los logotipos de `assets-src/clients/`)
 * y los videos de `public/videos/` que ya no usa `src/content/images.json`.
 * Pasa cuando en el panel /admin se reemplaza o se quita un archivo: Decap CMS
 * sube el nuevo, pero no borra el anterior.
 *
 * Lo ejecuta GitHub Actions después de cada cambio de contenido
 * (.github/workflows/clean-media.yml); también se puede correr a mano.
 * Los archivos borrados siguen en el historial de git por si hiciera falta recuperarlos.
 *
 * Uso: npm run media:clean             (borra)
 *      npm run media:clean -- --dry-run  (solo lista)
 */
import { readFile, readdir, rm } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const contentPath = path.join(root, 'src', 'content', 'images.json')
const dryRun = process.argv.includes('--dry-run')

/** Recorre el JSON y devuelve los valores de las claves indicadas (rutas de archivos). */
function collectPaths(node: unknown, keys: readonly string[], found = new Set<string>()) {
  if (Array.isArray(node)) node.forEach((n) => collectPaths(n, keys, found))
  else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (keys.includes(key) && typeof value === 'string' && value) found.add(value)
      else collectPaths(value, keys, found)
    }
  }
  return found
}

/** Normaliza a una ruta relativa a la raíz del repositorio (los videos viven en public/). */
const toRepoPath = (p: string) =>
  p.startsWith('/') ? path.posix.join('public', p) : path.posix.normalize(p)

/** Archivos (no ocultos) de una carpeta y sus subcarpetas, como rutas del repositorio. */
async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries
      .filter((e) => !e.name.startsWith('.'))
      .map((e) => {
        const rel = path.posix.join(dir, e.name)
        return e.isDirectory() ? listFiles(rel) : Promise.resolve([rel])
      }),
  )
  return nested.flat()
}

const content = JSON.parse(await readFile(contentPath, 'utf8'))
const used = new Set([...collectPaths(content, ['src', 'video'])].map(toRepoPath))

const candidates = [...(await listFiles('assets-src')), ...(await listFiles('public/videos'))]
const orphans = candidates.filter((file) => !used.has(file))

if (!orphans.length) {
  console.log('✓ No hay archivos multimedia sin usar')
} else {
  for (const file of orphans) {
    if (!dryRun) await rm(path.join(root, file))
    console.log(`${dryRun ? '•' : '✗'} ${dryRun ? 'Sin usar' : 'Eliminado'}: ${file}`)
  }
}
