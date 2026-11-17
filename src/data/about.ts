import type { IconName } from '../components/ui/Icon'

export interface Milestone {
  year: string
  title: string
  description: string
}

export const milestones: Milestone[] = [
  {
    year: '2012',
    title: 'Nuestros inicios',
    description:
      'Nacemos en Guadalajara ante la creciente demanda de tecnología de calidad en eventos, ofreciendo sonido e iluminación.',
  },
  {
    year: 'Crecimiento',
    title: 'Diversificamos la oferta',
    description:
      'Incorporamos la renta de pantallas LED y equipos audiovisuales de alta tecnología.',
  },
  {
    year: 'Hoy',
    title: 'Proveedor integral',
    description:
      'Servicios especializados para eventos sociales, corporativos y exposiciones: un referente en el sector.',
  },
]

export interface Value {
  icon: IconName
  title: string
  description: string
}

export const values: Value[] = [
  {
    icon: 'target',
    title: 'Misión',
    description:
      'Dedicar nuestro talento y tecnología a crear experiencias y servicios superiores que contribuyan al desarrollo de nuestros clientes.',
  },
  {
    icon: 'eye',
    title: 'Visión',
    description:
      'Ser un socio comercial de nivel nacional, apoyado siempre en tecnología innovadora, creatividad y diversidad.',
  },
  {
    icon: 'spark',
    title: 'Compromiso',
    description: 'Desarrollar ideas innovadoras que diferencien a cada marca de su competencia.',
  },
  {
    icon: 'badge',
    title: 'Calidad',
    description:
      'Servicios y productos de primer nivel, con equipo propio y en óptimas condiciones.',
  },
  {
    icon: 'shield',
    title: 'Seguridad',
    description:
      'Que contratar con nosotros se sienta libre de riesgo, de la cotización al cierre.',
  },
]

export interface ProcessStep {
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Escuchamos',
    description: 'Entendemos tu objetivo, audiencia, sede y presupuesto en una llamada o visita.',
  },
  {
    title: 'Diseñamos',
    description: 'Proponemos la solución técnica y creativa: render, plano de equipo y cotización.',
  },
  {
    title: 'Montamos',
    description: 'Nuestro equipo instala, calibra y prueba todo antes de que llegue el público.',
  },
  {
    title: 'Operamos',
    description: 'Técnicos en sitio durante todo el evento para que solo te ocupes de disfrutar.',
  },
  {
    title: 'Desmontamos',
    description: 'Retiramos el equipo de forma ordenada y segura, cuidando la sede.',
  },
]
