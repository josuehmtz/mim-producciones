import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface SectionProps {
  id: string
  /** id del título que nombra la sección (para lectores de pantalla) */
  labelledBy?: string
  className?: string
  /** Clases del contenedor interno (ancho máximo y márgenes) */
  innerClassName?: string
  children: ReactNode
}

/** Sección de la página con espaciado vertical y contenedor estándar. */
export function Section({ id, labelledBy, className, innerClassName, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative py-section', className)}>
      <div className={cn('wrapper', innerClassName)}>{children}</div>
    </section>
  )
}
