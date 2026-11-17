import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../utils/cn'
import { Icon } from './Icon'

export interface VideoSource {
  src: string
  type: 'video/webm' | 'video/mp4'
}

interface VideoPlayerProps {
  sources: readonly VideoSource[]
  poster?: string
  /** Descripción del contenido del video para lectores de pantalla */
  label: string
  className?: string
}

/**
 * Video silencioso en bucle con botón de pausa (WCAG 2.2.2).
 * Si el sistema pide reducir el movimiento, inicia en pausa.
 */
export function VideoPlayer({ sources, poster, label, className }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = usePrefersReducedMotion()
  const [playing, setPlaying] = useState(!reduced)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (playing) video.play().catch(() => setPlaying(false))
    else video.pause()
  }, [playing])

  return (
    <div className={cn('relative', className)}>
      <video
        ref={ref}
        className="size-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload="metadata"
        aria-label={label}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pausar video' : 'Reproducir video'}
        className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full border border-white/20 bg-ink/60 text-fg backdrop-blur-md transition-colors duration-200 hover:border-led hover:text-led [&_svg]:size-4"
      >
        <Icon name={playing ? 'pause' : 'play'} />
      </button>
    </div>
  )
}
