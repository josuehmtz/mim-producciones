import type { IconName } from '../components/ui/Icon'
import { siteImages, type ImageRef } from './images'

export interface Service {
  id: string
  icon: IconName
  eyebrow: string
  title: string
  description: string
  features: string[]
  image: ImageRef
  /** Mensaje con el que se abre WhatsApp al pedir información de este servicio */
  whatsappMessage: string
}

export const services: Service[] = [
  {
    id: 'renta',
    icon: 'speaker',
    eyebrow: 'Equipos de última generación',
    title: 'Renta de equipo audiovisual',
    description:
      'Soluciones completas de sonido, iluminación y pantallas LED para eventos sociales, corporativos y exposiciones, con soporte técnico antes y durante el evento.',
    features: [
      'Audio profesional line array y monitoreo',
      'Iluminación robótica, arquitectónica y ambiental',
      'Pantallas LED indoor y outdoor',
      'Planes flexibles según tu evento',
    ],
    image: siteImages.services.rental,
    whatsappMessage: 'Hola, me interesa rentar equipo audiovisual para un evento.',
  },
  {
    id: 'venta',
    icon: 'screen',
    eyebrow: 'Garantía de hasta 3 años',
    title: 'Venta de pantallas LED',
    description:
      'Pantallas LED de alta resolución para publicidad, eventos y proyectos permanentes, en interior y exterior, con instalación y capacitación incluidas.',
    features: [
      'Pixel pitch de 2.5 mm, 3.9 mm y más',
      'Modelos para interior y exterior',
      'Capacitación en instalación y operación',
      'Garantía de hasta 3 años',
    ],
    image: siteImages.services.ledSales,
    whatsappMessage: 'Hola, me interesa cotizar la compra de una pantalla LED.',
  },
  {
    id: 'produccion',
    icon: 'spark',
    eyebrow: 'Producción de experiencias',
    title: 'Producción de eventos audiovisuales',
    description:
      'Planificación, diseño y ejecución de eventos de alto impacto. Integramos tecnología y creatividad en conferencias, lanzamientos, espectáculos en vivo y transmisiones.',
    features: [
      'Conceptualización y diseño de producción',
      'Diseño de escenarios y stands',
      'Grabación y transmisión en vivo',
      'Coordinación técnica de principio a fin',
    ],
    image: siteImages.services.production,
    whatsappMessage: 'Hola, me interesa la producción integral de un evento.',
  },
]

export interface UseCase {
  icon: IconName
  title: string
  description: string
}

export const useCases: UseCase[] = [
  {
    icon: 'mic',
    title: 'Conferencias y congresos',
    description: 'Escenarios, podios y contenidos que mantienen a la audiencia conectada.',
  },
  {
    icon: 'rocket',
    title: 'Lanzamientos de marca',
    description: 'Revelaciones de producto con pantalla, luz y sonido sincronizados.',
  },
  {
    icon: 'music',
    title: 'Conciertos y espectáculos',
    description: 'Audio de alto rendimiento e iluminación para shows en vivo.',
  },
  {
    icon: 'stadium',
    title: 'Eventos deportivos',
    description: 'Transmisiones y repeticiones en pantalla gigante, en interior o estadio.',
  },
  {
    icon: 'heart',
    title: 'Bodas y celebraciones',
    description: 'Producción audiovisual completa para que cada momento se sienta único.',
  },
  {
    icon: 'grid',
    title: 'Ferias y exposiciones',
    description: 'Stands con pantallas, estructura y mobiliario que atraen visitantes.',
  },
]
