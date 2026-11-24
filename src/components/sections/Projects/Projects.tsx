import { useMemo, useState } from 'react'
import { PROJECT_CATEGORIES, siteImages, type Project } from '../../../data/images'
import { cn } from '../../../utils/cn'
import { Reveal } from '../../ui/Reveal'
import { Section } from '../../ui/Section'
import { SectionHeading } from '../../ui/SectionHeading'
import { Lightbox } from './Lightbox'
import { ProjectCard } from './ProjectCard'

const ALL = 'Todos'

/** Solo las categorías que tienen al menos un proyecto (así no hay filtros vacíos). */
const categoriesOf = (projects: readonly Project[]) => [
  ALL,
  ...PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c)),
]

/**
 * Tamaño de cada tarjeta en la cuadrícula tipo "bento" (escritorio):
 * se repite un patrón para dar ritmo visual sin depender del contenido.
 */
const bentoPattern = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:row-span-2', '', 'lg:col-span-2']

export function Projects() {
  const projects = siteImages.projects
  const categories = useMemo(() => categoriesOf(projects), [projects])
  const [filter, setFilter] = useState(ALL)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section id="proyectos" labelledBy="proyectos-title" className="bg-ink-soft">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <SectionHeading
          id="proyectos-title"
          eyebrow="Casos de éxito"
          title={
            <>
              Eventos reales, <em>operados por nuestro equipo</em>
            </>
          }
          intro="Una muestra de eventos, stands y producciones que hemos hecho realidad junto a nuestros clientes."
          className="mb-0 lg:mb-0"
        />

        <div
          role="group"
          aria-label="Filtrar proyectos por categoría"
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={cn(
                'min-h-10 rounded-full border px-4 text-sm transition-colors duration-200',
                filter === category
                  ? 'border-led bg-led text-ink'
                  : 'border-ink-line text-fg-muted hover:border-fg/40 hover:text-fg',
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <ul
        role="list"
        className="mt-12 grid grid-flow-dense auto-rows-[260px] gap-4 sm:grid-cols-2 lg:mt-16 lg:auto-rows-[240px] lg:grid-cols-4"
      >
        {visible.map((project, i) => (
          <Reveal
            as="li"
            key={project.src}
            delay={(i % 4) * 50}
            className={filter === ALL ? bentoPattern[i % bentoPattern.length] : undefined}
          >
            <ProjectCard project={project} onOpen={() => setOpenIndex(i)} />
          </Reveal>
        ))}
      </ul>

      <Lightbox items={visible} index={openIndex} onChange={setOpenIndex} />
    </Section>
  )
}
