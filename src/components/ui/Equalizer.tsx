import type { CSSProperties } from 'react'
import { cn } from '../../utils/cn'

/** Duración de cada barra: valores distintos para que el movimiento no se vea repetitivo */
const BARS = [0.9, 0.62, 1.1, 0.75, 0.98]

interface EqualizerProps {
  /** Las barras se mueven (p. ej. mientras suena el video) o quedan quietas */
  playing?: boolean
  className?: string
}

/** Pequeño ecualizador animado: el guiño de "audio" de la marca. Decorativo. */
export function Equalizer({ playing = true, className }: EqualizerProps) {
  return (
    <span aria-hidden="true" className={cn('inline-flex h-3.5 items-end gap-[2px]', className)}>
      {BARS.map((duration, i) => (
        <span
          key={i}
          className={cn(
            'h-full w-[3px] origin-bottom rounded-full bg-current',
            playing ? 'animate-eq' : 'scale-y-[0.3]',
          )}
          style={
            { animationDuration: `${duration}s`, animationDelay: `${i * -0.2}s` } as CSSProperties
          }
        />
      ))}
    </span>
  )
}
