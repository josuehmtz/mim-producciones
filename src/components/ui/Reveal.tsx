import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../utils/cn'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** Retraso en milisegundos (para escalonar elementos de una lista) */
  delay?: number
  className?: string
}

/** Envuelve contenido para que aparezca suavemente al entrar en pantalla. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
