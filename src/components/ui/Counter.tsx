import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  /** Duración de la animación en milisegundos */
  duration?: number
  className?: string
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/** Número que cuenta desde 0 hasta `value` la primera vez que se ve en pantalla. */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 900,
  className,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const reduced = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCurrent(Math.round(easeOutCubic(progress) * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, value, duration])

  const shown = reduced ? value : current

  return (
    <span ref={ref} className={className}>
      {/* El valor final se anuncia una sola vez; la animación es solo visual */}
      <span aria-hidden="true">
        {prefix}
        {shown}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  )
}
