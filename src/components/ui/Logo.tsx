import type { CSSProperties } from 'react'
import { cn } from '../../utils/cn'

/**
 * Logotipo de MIM Producciones dibujado en SVG a partir de su matriz de puntos
 * (como los píxeles de una pantalla LED): nítido en cualquier tamaño y animable.
 */
const LETTERS = {
  M: ['1100011', '1110111', '1111111', '1101011', '1100011', '1100011'],
  I: ['1111', '0110', '0110', '0110', '0110', '1111'],
} as const

const WORD = ['M', 'I', 'M'] as const
const PITCH = 10
const RADIUS = 4.2
const ROWS = 6

interface Dot {
  cx: number
  cy: number
}

/** Calcula la posición de cada punto encendido del logotipo. */
function buildDots(): { dots: Dot[]; columns: number } {
  const dots: Dot[] = []
  let offset = 0
  WORD.forEach((letter, i) => {
    const rows = LETTERS[letter]
    rows.forEach((row, y) => {
      ;[...row].forEach((cell, x) => {
        if (cell === '1')
          dots.push({ cx: (offset + x) * PITCH + PITCH / 2, cy: y * PITCH + PITCH / 2 })
      })
    })
    offset += (rows[0]?.length ?? 0) + (i < WORD.length - 1 ? 1 : 0)
  })
  return { dots, columns: offset }
}

const { dots, columns } = buildDots()

interface LogoProps {
  /** Muestra "PRODUCCIONES" debajo de los puntos */
  wordmark?: boolean
  /** Los puntos parpadean suavemente, como una pantalla encendida */
  animated?: boolean
  className?: string
}

export function Logo({ wordmark = true, animated = false, className }: LogoProps) {
  return (
    <span role="img" aria-label="MIM Producciones" className={cn('inline-grid gap-1.5', className)}>
      <svg
        viewBox={`0 0 ${columns * PITCH} ${ROWS * PITCH}`}
        className="h-auto w-full text-led drop-shadow-[0_0_10px_rgb(61_191_240/0.45)]"
        aria-hidden="true"
      >
        {dots.map((dot, i) => (
          <circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r={RADIUS}
            fill="currentColor"
            className={animated ? 'animate-pulse-dot' : undefined}
            style={
              animated ? ({ animationDelay: `${(i * 137) % 2400}ms` } as CSSProperties) : undefined
            }
          />
        ))}
      </svg>
      {wordmark && (
        <span
          aria-hidden="true"
          className="text-center font-display text-[0.62em] leading-none font-medium tracking-[0.2em] text-fg"
        >
          PRODUCCIONES
        </span>
      )}
    </span>
  )
}
