import { imageMeta, imageUrl, siteImages } from '../../data/images'
import { Marquee } from '../ui/Marquee'

/** Carrusel de logotipos de clientes. */
export function Clients() {
  return (
    <section aria-labelledby="clientes-title" className="border-b border-ink-line py-14">
      <h2
        id="clientes-title"
        className="wrapper mb-10 text-center font-body eyebrow text-fg-subtle"
      >
        Trayectoria con grandes marcas
      </h2>
      <Marquee
        label="Clientes de MIM Producciones"
        items={siteImages.clients}
        getKey={(c) => c.src}
        renderItem={(client) => {
          const meta = imageMeta(client.src)
          return (
            <img
              src={imageUrl(client.src, meta.widths.at(-1) ?? meta.width)}
              alt={client.alt}
              width={meta.width}
              height={meta.height}
              loading="lazy"
              decoding="async"
              // Los logotipos son oscuros: se convierten a blanco para el fondo negro
              className="h-10 w-auto opacity-55 brightness-0 invert transition-opacity duration-300 hover:opacity-100 sm:h-12"
            />
          )
        }}
      />
    </section>
  )
}
