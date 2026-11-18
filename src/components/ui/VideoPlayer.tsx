import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../utils/cn'
import { Icon, type IconName } from './Icon'

export interface VideoSource {
  src: string
  /** Tipo MIME, p. ej. `video/mp4` */
  type: string
}

export interface VideoState {
  playing: boolean
  muted: boolean
}

interface VideoPlayerProps {
  sources: readonly VideoSource[]
  poster?: string
  /** Descripción del contenido del video para lectores de pantalla */
  label: string
  /** Muestra el botón para activar el sonido (el video siempre inicia en silencio) */
  withSound?: boolean
  /** Contenido sobrepuesto que depende del estado (p. ej. un ecualizador) */
  overlay?: (state: VideoState) => ReactNode
  className?: string
}

const controlClass =
  'grid size-10 place-items-center rounded-full border border-white/20 bg-ink/60 text-fg backdrop-blur-md transition-colors duration-200 hover:border-led hover:text-led [&_svg]:size-4'

function ControlButton(props: { icon: IconName; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={props.onClick} aria-label={props.label} className={controlClass}>
      <Icon name={props.icon} />
    </button>
  )
}

/**
 * Video en bucle con controles accesibles de pausa (WCAG 2.2.2) y sonido.
 * Inicia en silencio (requisito de los navegadores para la reproducción automática)
 * y en pausa si el sistema pide reducir el movimiento.
 */
export function VideoPlayer({
  sources,
  poster,
  label,
  withSound = false,
  overlay,
  className,
}: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = usePrefersReducedMotion()
  const [playing, setPlaying] = useState(!reduced)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (playing) video.play().catch(() => setPlaying(false))
    else video.pause()
  }, [playing])

  useEffect(() => {
    if (ref.current) ref.current.muted = muted
  }, [muted])

  const toggleSound = () => {
    setMuted((m) => !m)
    // Activar el sonido de un video en pausa también lo reproduce
    if (muted) setPlaying(true)
  }

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

      {overlay?.({ playing, muted })}

      <div className="absolute right-3 bottom-3 flex gap-2">
        {withSound && (
          <ControlButton
            icon={muted ? 'volumeOff' : 'volume'}
            label={muted ? 'Activar sonido' : 'Silenciar'}
            onClick={toggleSound}
          />
        )}
        <ControlButton
          icon={playing ? 'pause' : 'play'}
          label={playing ? 'Pausar video' : 'Reproducir video'}
          onClick={() => setPlaying((p) => !p)}
        />
      </div>
    </div>
  )
}
