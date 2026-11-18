import { useSpotlight } from '../../hooks/useSpotlight'
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
  // Un reflector de luz cian sigue al cursor dentro de la tarjeta
  const ref = useSpotlight<HTMLElement>()

  return (
    <article
      ref={ref}
      className={cn(
        'group spotlight grid h-full content-start gap-4 overflow-hidden card-surface p-7 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-led/40',
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-md border border-led/25 bg-led/10 text-led transition-[box-shadow,background-color] duration-300 group-hover:bg-led/20 group-hover:shadow-[0_0_24px_rgb(61_191_240/0.45)] [&_svg]:size-6">
        <Icon name={icon} />
      </span>
      <Heading className="text-xl">{title}</Heading>
      <p className="text-fg-muted">{description}</p>
    </article>
  )
}
