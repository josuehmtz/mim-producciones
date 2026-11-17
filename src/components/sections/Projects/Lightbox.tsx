import { useEffect, useRef, type KeyboardEvent, type TouchEvent } from 'react'
import { largestSrc, type Project } from '../../../data/images'
import { Icon } from '../../ui/Icon'

interface LightboxProps {
  items: readonly Project[]
  index: number | null
  onChange: (index: number | null) => void
}

const SWIPE_THRESHOLD = 50

const roundButton =
  'absolute grid size-12 place-items-center rounded-full border border-white/15 bg-ink/60 text-fg backdrop-blur-md transition-colors duration-200 hover:border-led hover:text-led [&_svg]:size-[22px]'
// En celular las flechas bajan junto al pie de foto para no tapar la imagen
const sideButton = `${roundButton} top-1/2 -translate-y-1/2 max-sm:top-auto max-sm:bottom-4 max-sm:translate-y-0`

/**
 * Visor de proyectos basado en <dialog> nativo: trampa de foco, Escape,
 * flechas del teclado y deslizar en táctil, sin librerías externas.
 */
export function Lightbox({ items, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const isOpen = index !== null
  const item = isOpen ? items[index] : undefined

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const go = (step: number) => {
    if (index === null) return
    onChange((index + step + items.length) % items.length)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current
    const end = e.changedTouches[0]?.clientX
    touchX.current = null
    if (start == null || end == null) return
    const delta = end - start
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Visor de proyectos"
      className="size-full max-h-full max-w-full border-0 bg-transparent p-0 text-fg backdrop:bg-ink/95 backdrop:backdrop-blur-sm open:animate-fade-in"
      onClose={() => onChange(null)}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
    >
      {item && index !== null && (
        <div
          className="pointer-events-none relative grid size-full place-items-center px-4 pt-20 pb-8 *:pointer-events-auto max-sm:pb-24"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <figure className="grid max-h-full max-w-[min(1200px,100%)] justify-items-center gap-4">
            <img
              key={item.src}
              src={largestSrc(item.src)}
              alt={item.alt}
              className="h-auto max-h-[calc(100dvh-12rem)] w-auto max-w-full animate-zoom rounded-lg object-contain shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]"
            />
            <figcaption className="grid justify-items-center gap-1 text-center">
              <span className="font-display text-lg font-semibold">{item.client}</span>
              <span className="text-sm text-fg-muted">
                {item.caption}{' '}
                <span className="ml-2 text-xs text-led">
                  {index + 1} / {items.length}
                </span>
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${sideButton} left-4`}
            onClick={() => go(-1)}
            aria-label="Proyecto anterior"
          >
            <Icon name="chevronLeft" />
          </button>
          <button
            type="button"
            className={`${sideButton} right-4`}
            onClick={() => go(1)}
            aria-label="Proyecto siguiente"
          >
            <Icon name="chevronRight" />
          </button>
          <button
            type="button"
            className={`${roundButton} top-4 right-4`}
            onClick={() => onChange(null)}
            aria-label="Cerrar visor"
            autoFocus
          >
            <Icon name="close" />
          </button>
        </div>
      )}
    </dialog>
  )
}
