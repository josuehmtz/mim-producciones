import { cn } from '../../utils/cn'
import { Icon, type IconName } from './Icon'

interface IconCardProps {
  icon: IconName
  title: string
  description: string
  /** Nivel del título según la jerarquía de la sección */
  headingLevel?: 'h3' | 'h4'
  className?: string
}

/** Tarjeta con ícono, título y descripción (casos de uso, valores, etc.). */
export function IconCard({
  icon,
  title,
  description,
  headingLevel: Heading = 'h3',
  className,
}: IconCardProps) {
  return (
    <article
      className={cn(
        'group relative grid h-full content-start gap-4 overflow-hidden card-surface p-7 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-led/40',
        className,
      )}
    >
      {/* Halo que aparece al pasar el cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-led/0 blur-3xl transition-colors duration-500 group-hover:bg-led/25"
      />
      <span className="grid size-12 place-items-center rounded-md border border-led/25 bg-led/10 text-led [&_svg]:size-6">
        <Icon name={icon} />
      </span>
      <Heading className="text-xl">{title}</Heading>
      <p className="text-fg-muted">{description}</p>
    </article>
  )
}
