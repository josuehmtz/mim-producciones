import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface MarqueeProps<T> {
  items: readonly T[]
  renderItem: (item: T) => ReactNode
  getKey: (item: T) => string
  /** Etiqueta accesible de la lista */
  label: string
  className?: string
}

/**
 * Carrusel infinito horizontal (solo CSS). La lista se duplica para que el ciclo
 * no tenga cortes; la copia queda oculta para lectores de pantalla.
 * Se pausa al pasar el cursor o al enfocar un elemento.
 */
export function Marquee<T>({ items, renderItem, getKey, label, className }: MarqueeProps<T>) {
  const list = (copy: boolean) => (
    <ul
      role="list"
      aria-label={copy ? undefined : label}
      aria-hidden={copy || undefined}
      className="flex shrink-0 items-center gap-[clamp(2.5rem,5vw,5rem)] pr-[clamp(2.5rem,5vw,5rem)]"
    >
      {items.map((item) => (
        <li key={getKey(item)} className="shrink-0">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cn('group overflow-hidden mask-fade-x', className)}>
      <div className="flex w-max animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
        {list(false)}
        {list(true)}
      </div>
    </div>
  )
}
