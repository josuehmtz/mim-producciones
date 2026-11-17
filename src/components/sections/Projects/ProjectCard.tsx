import type { Project } from '../../../data/images'
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
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver proyecto: ${project.client}. ${project.caption}`}
      className={cn(
        'group relative block size-full overflow-hidden rounded-lg border border-ink-line text-left',
        className,
      )}
    >
      <ResponsiveImage
        image={project}
        alt=""
        sizes="(min-width: 60rem) 420px, (min-width: 40rem) 50vw, 100vw"
        className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 grid gap-1 p-5">
        <span className="eyebrow text-[0.65rem] text-led">{project.category}</span>
        <span className="font-display text-lg leading-tight font-semibold">{project.client}</span>
        <span className="text-sm text-fg-muted">{project.caption}</span>
      </div>
      <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-ink/60 text-fg opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [&_svg]:size-4">
        <Icon name="expand" />
      </span>
    </button>
  )
}
