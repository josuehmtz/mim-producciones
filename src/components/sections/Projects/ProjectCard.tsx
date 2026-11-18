import type { CSSProperties } from 'react'
import type { Project } from '../../../data/images'
import { useSpotlight } from '../../../hooks/useSpotlight'
import { cn } from '../../../utils/cn'
import { Icon } from '../../ui/Icon'
import { ResponsiveImage } from '../../ui/ResponsiveImage'

interface ProjectCardProps {
  project: Project
  onOpen: () => void
  className?: string
}

/** Miniatura de proyecto; al activarla abre el visor. */
export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  // Reflector que sigue al cursor sobre la foto
  const ref = useSpotlight<HTMLButtonElement>()

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`Ver proyecto: ${project.client}. ${project.caption}`}
      style={{ '--spot-size': '320px', '--spot-strength': 0.22 } as CSSProperties}
      className={cn(
        'group spotlight block size-full overflow-hidden rounded-lg border border-ink-line text-left transition-[border-color,box-shadow] duration-500 hover:border-led/50 hover:shadow-[0_0_40px_-12px_rgb(61_191_240/0.6)]',
        className,
      )}
    >
      <ResponsiveImage
        image={project}
        alt=""
        sizes="(min-width: 60rem) 420px, (min-width: 40rem) 50vw, 100vw"
        className="size-full object-cover saturate-[0.85] transition-[scale,filter] duration-[1.2s] ease-out group-hover:scale-105 group-hover:saturate-[1.15]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 z-[2] grid translate-y-2 gap-1 p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <span className="eyebrow text-[0.65rem] text-led">{project.category}</span>
        <span className="font-display text-lg leading-tight font-semibold">{project.client}</span>
        <span className="text-sm text-fg-muted">{project.caption}</span>
      </div>
      <span className="absolute top-4 right-4 z-[2] grid size-10 scale-75 place-items-center rounded-full bg-ink/60 text-fg opacity-0 backdrop-blur-md transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 [&_svg]:size-4">
        <Icon name="expand" />
      </span>
    </button>
  )
}
