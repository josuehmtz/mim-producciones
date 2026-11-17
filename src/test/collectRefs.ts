import type { ImageRef } from '../data/images'

/** Recorre un objeto y devuelve todas las referencias de imagen ({ src, alt }). */
export function collectRefs(node: unknown, found: ImageRef[] = []): ImageRef[] {
  if (Array.isArray(node)) node.forEach((n) => collectRefs(n, found))
  else if (node && typeof node === 'object') {
    if ('src' in node && 'alt' in node) found.push(node as ImageRef)
    else Object.values(node).forEach((n) => collectRefs(n, found))
  }
  return found
}
