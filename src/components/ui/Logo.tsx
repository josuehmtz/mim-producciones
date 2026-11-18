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

const WIDTH = columns * PITCH
const DOTS_HEIGHT = ROWS * PITCH
/** "PRODUCCIONES" va dentro del mismo SVG para escalar en proporción exacta con los puntos */
const WORDMARK = { gap: 7, size: 14.5, capHeight: 10.6 }
const WORDMARK_HEIGHT = WORDMARK.gap + WORDMARK.size

interface LogoProps {
  /** Muestra "PRODUCCIONES" debajo de los puntos */
  wordmark?: boolean
  /** Los puntos parpadean suavemente, como una pantalla encendida */
  animated?: boolean
  /** Brillo cian alrededor de los puntos */
  glow?: boolean
  /** Decorativo (marca de agua): se oculta a lectores de pantalla */
  decorative?: boolean
  className?: string
}

/** El ancho se controla con `className` (p. ej. `w-32`); el alto es proporcional. */
export function Logo({
  wordmark = true,
  animated = false,
  glow = true,
  decorative = false,
  className,
}: LogoProps) {
  const height = DOTS_HEIGHT + (wordmark ? WORDMARK_HEIGHT : 0)

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className={cn('block h-auto', className)}
      {...(decorative
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': 'MIM Producciones' })}
    >
      <g
        fill="var(--color-led)"
        className={glow ? 'drop-shadow-[0_0_6px_rgb(61_191_240/0.55)]' : undefined}
      >
        {dots.map((dot) => (
          <circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r={RADIUS}
            className={animated ? 'led-dot' : undefined}
            // Encendido en barrido diagonal: de izquierda a derecha y de arriba abajo
            style={
              animated
                ? ({ '--d': `${Math.round(dot.cx * 4 + dot.cy * 3)}ms` } as CSSProperties)
                : undefined
            }
          />
        ))}
      </g>
      {wordmark && (
        <text
          x={WIDTH / 2}
          y={DOTS_HEIGHT + WORDMARK.gap + WORDMARK.capHeight}
          textAnchor="middle"
          textLength={WIDTH - 2}
          lengthAdjust="spacingAndGlyphs"
          fontSize={WORDMARK.size}
          fill="var(--color-fg)"
          className="font-display font-medium"
        >
          PRODUCCIONES
        </text>
      )}
    </svg>
  )
}
