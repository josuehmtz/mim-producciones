import type { CSSProperties } from 'react'
import { cn } from '../../utils/cn'

interface AnimatedWordsProps {
  text: string
  /** Retraso inicial en milisegundos */
  delay?: number
  /** Retraso entre una palabra y la siguiente */
  stagger?: number
  /** Clases aplicadas a cada palabra (p. ej. un degradado) */
  wordClassName?: string
}

/**
 * Muestra un texto palabra por palabra, de desenfocado a nítido (como un enfoque de cámara).
 * Los lectores de pantalla leen la frase completa una sola vez.
 */
export function AnimatedWords({
  text,
  delay = 0,
  stagger = 70,
  wordClassName,
}: AnimatedWordsProps) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span
              className={cn('inline-block animate-word-in', wordClassName)}
              style={{ animationDelay: `${delay + i * stagger}ms` } as CSSProperties}
            >
              {word}
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </>
  )
}
