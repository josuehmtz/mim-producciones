import { siteImages } from '../../data/images'
import { quoteUrl } from '../../utils/links'
import { Button } from '../ui/Button'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'

/** Llamado a la acción a todo lo ancho, sobre la textura de pantalla LED. */
export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" className="py-section">
      <Reveal className="wrapper">
        <div className="relative isolate overflow-hidden rounded-xl border border-led/20 px-6 py-16 text-center sm:px-12 lg:py-24">
          <ResponsiveImage
            image={siteImages.ledBackdrop}
            alt=""
            sizes="(min-width: 80rem) 1240px, 100vw"
            className="absolute inset-0 -z-10 size-full object-cover opacity-45"
          />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(5_7_12/0.55),rgb(5_7_12/0.95))]" />

          <h2 id="cta-title" className="mx-auto max-w-3xl text-2xl">
            ¿Tienes un evento en puerta?{' '}
            <span className="text-brand-gradient">Hagámoslo brillar.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-fg-muted">
            Cuéntanos qué necesitas y te asesoramos sin compromiso. Respondemos el mismo día.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={quoteUrl()} external icon="whatsapp" size="lg">
              Cotizar por WhatsApp
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
