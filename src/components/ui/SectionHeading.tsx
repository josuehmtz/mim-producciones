import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface SectionHeadingProps {
  /** id del <h2>, para enlazarlo con `aria-labelledby` de la sección */
  id?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'start'
  className?: string
}

/**
 * Encabezado estándar de sección: rótulo, título y entrada opcional.
 * Envuelve palabras del título en <em> para resaltarlas con el degradado de marca.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'start',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <header
      className={cn(
        'mb-12 grid max-w-[720px] gap-5 lg:mb-16',
        centered && 'mx-auto justify-items-center text-center',
        className,
      )}
    >
      <p className="inline-flex items-center gap-3 eyebrow text-led">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-led shadow-[0_0_10px_var(--color-led)]"
        />
        {eyebrow}
      </p>
      <h2 id={id} className="text-2xl [&_em]:text-brand-gradient [&_em]:not-italic">
        {title}
      </h2>
      {intro && <p className="text-lg text-fg-muted">{intro}</p>}
    </header>
  )
}
