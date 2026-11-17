# MIM Producciones — sitio web

Sitio one-page, responsive y de alto rendimiento para **MIM Producciones** (pantallas LED, audio,
iluminación y producción de eventos en Guadalajara). Construido con **React 19 + TypeScript + Vite**
y **Tailwind CSS v4**, listo para desplegar en **Netlify**.

## Requisitos

- **Node.js ≥ 22.18** (recomendado 24 LTS; ver `.nvmrc`). Los scripts `.ts` se ejecutan directo con Node.

## Scripts

| Comando           | Descripción                                                   |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en http://localhost:5173               |
| `npm run build`   | Typecheck + build de producción en `dist/`                    |
| `npm run preview` | Sirve el build de producción localmente                       |
| `npm test`        | Pruebas unitarias y de componentes (Vitest + Testing Library) |
| `npm run lint`    | Lint con Oxlint (reglas de React, hooks y TypeScript)         |
| `npm run format`  | Formatea con Prettier (ordena clases de Tailwind)             |
| `npm run images`  | Optimiza las fotos de `src/content/images.json` (automático)  |
| `npm run check`   | Lint + formato + pruebas (lo que corre CI y Netlify)          |

## Estructura

```
assets-src/                Fotografías originales y logotipos de clientes
assets-brand/              Logotipo original (genera el apple-touch-icon)
public/videos/             Showreel (WebM + MP4)
public/images/             ⚙️  WebP responsivos generados con hash (no se versionan)
scripts/optimize-images.ts Pipeline de imágenes con sharp
src/
  components/
    layout/                Header (menú móvil accesible), Footer
    sections/              Hero, Clients, Services, About, Process, CtaBanner
      Projects/            Projects (filtros) + ProjectCard + Lightbox (visor)
      Contact/             Contact + ContactForm
    ui/                    Componentes reutilizables: Button, Icon, Logo (LED en SVG),
                           Section, SectionHeading, IconCard, FormField, Counter,
                           Marquee, VideoPlayer, ResponsiveImage, Reveal, WhatsAppFab
  content/images.json      🖼️  Qué foto va en cada sección, proyectos y clientes
  data/
    site.ts                ✏️  Contacto, redes, menú, textos del hero
    services.ts            ✏️  Servicios y casos de uso
    about.ts               ✏️  Historia, misión/visión/valores y proceso
    images.ts              Tipos y rutas WebP (srcset)
  hooks/                   useInView, useScrolled, useActiveSection, useMediaQuery…
  styles/global.css        🎨 Tema de Tailwind (paleta, tipografía, espaciado) y utilidades
  utils/                   Enlaces (WhatsApp, correo, teléfono), validación del formulario, cn
```

## Principios de diseño del código

- **Contenido separado de la presentación:** los textos y datos viven en `src/data` y
  `src/content`; los componentes solo los muestran. Cambiar un teléfono o un servicio no toca JSX.
- **Componentes pequeños y reutilizables** (responsabilidad única): `Button` sirve como enlace o
  botón con las mismas variantes; `FormField` conecta etiqueta, ayuda y error de forma accesible
  para cualquier control; `IconCard` se usa en casos de uso y valores.
- **Abierto a extensión:** el formulario envía por un mapa de canales (`whatsapp`, `email`);
  agregar otro canal no modifica la lógica del formulario. La validación y el armado del mensaje
  son funciones puras probadas por separado (`utils/contactRequest.ts`).
- **Tipado estricto** (`strict`, `noUncheckedIndexedAccess`) y design tokens en `@theme`.

## Cómo editar contenido

- **Textos, teléfono, correo, redes:** `src/data/site.ts`.
- **Servicios y casos de uso:** `src/data/services.ts`.
- **Historia, valores y proceso:** `src/data/about.ts`.
- **Fotos, proyectos y logotipos de clientes:** coloca el archivo en `assets-src/` y referencia su
  ruta en `src/content/images.json` (con su `alt`). Se optimiza solo al correr `dev` o `build`.
- **Colores y tipografía:** el bloque `@theme` de `src/styles/global.css`.

## Rendimiento, accesibilidad y SEO

- Imágenes WebP responsivas (480/960/1600/1920 px) con hash para caché inmutable,
  placeholder borroso y precarga de la imagen principal.
- Fuentes auto-alojadas (Sora + Inter), sin peticiones a terceros.
- El showreel solo se carga en escritorio, con botón de pausa; respeta `prefers-reduced-motion`.
- Navegación con teclado, enlace "Saltar al contenido", menú y visor con manejo de foco.
- Open Graph, JSON-LD (`LocalBusiness`), `robots.txt` y `sitemap.xml` generados en el build.
- Cabeceras de seguridad y Content-Security-Policy.

## Despliegue en Netlify

1. Sube el proyecto a un repositorio de GitHub.
2. En Netlify: **Add new site → Import an existing project** y elige el repositorio.
   `netlify.toml` ya define el comando (`npm run check && npm run build`), la carpeta `dist`
   y Node 24, así que no hay que configurar nada más.
3. Conecta el dominio `mimproducciones.com` en **Domain management**. El sitio toma la URL
   principal de Netlify (`URL`) para el canonical, Open Graph y el sitemap.

Las páginas del sitio anterior (`/quienes-somos`, `/contacto`, `/venta-de-pantallas-led`, etc.)
redirigen con 301 a la sección equivalente para no perder posicionamiento ni enlaces.
