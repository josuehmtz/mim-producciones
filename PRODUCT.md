# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: corporate and brand clients.** Marketing, trade, and event managers at companies (the
kind already in the portfolio: Mercedes-Benz Star Patria, Subaru, Genové, PromoOpción) who need a
launch, conference, expo stand, brand experience, or live broadcast to work flawlessly. They are
evaluating whether MIM can be trusted with a high-visibility event, usually under a deadline, and
their job is to get a credible quote and hand the technical side to someone reliable.

Secondary audiences served by the same site: agencies/organizers subcontracting equipment,
private clients for weddings and celebrations, and businesses buying a permanent LED screen. They
should find what they need, but the corporate buyer is who the site is tuned for first.

## Product Purpose

Public one-page website for **MIM Producciones**, an audiovisual production company founded in
Guadalajara in 2012. It presents three service lines (renta de equipo audiovisual, venta de
pantallas LED, producción de eventos audiovisuales), shows real work, and turns visitors into
quote requests. Success is a qualified corporate lead starting a conversation, mainly on WhatsApp.

## Positioning

- **Equipo propio:** MIM owns its equipment and keeps it in optimal condition; it does not depend
  on subrenting.
- **Servicio 360°:** one team from concept, render, and equipment plan through setup, on-site
  operation during the whole event, and dismantling.
- **Trayectoria y marcas:** operating since 2012, with leading brands as clients.

## Operating Context

- Service is **national**: MIM travels to events across Mexico, with its base in Guadalajara,
  Jalisco.
- **WhatsApp is the primary inbound channel** (+52 33 2261 2327, prefilled per-service messages);
  email (contacto@mimproducciones.com) and the contact form are secondary. The form composes a
  message and sends it through WhatsApp or email.
- Process the client goes through: Escuchamos → Diseñamos → Montamos → Operamos → Desmontamos.
- Media (photos, projects, client logos, showreel) is managed by non-developers through the
  Decap CMS panel at `/admin`; text content lives in `src/data/*.ts`.

## Capabilities and Constraints

- Stack: React 19 + TypeScript + Vite + Tailwind CSS v4, deployed on Netlify (with CSP in
  `netlify.toml`). Content is separated from presentation (`src/data`, `src/content/images.json`).
- Image pipeline generates responsive WebP from `assets-src/` via sharp; the CMS uploads there.
- Language: Spanish, `es-MX`. Single page with anchor sections (Servicios, Proyectos, Nosotros,
  Proceso, Contacto) plus a floating WhatsApp button.
- LED offering facts: indoor and outdoor models, pixel pitch 2.5 mm, 3.9 mm and more, installation
  and training included, warranty up to 3 years.
- Not stated on the site and not to be invented: pricing, package tiers, equipment inventory
  counts, team size, specific cities served outside Jalisco.

## Brand Commitments

- Name: **MIM Producciones**. Logo in `assets-brand/logo.png` (also an LED-style SVG `Logo`
  component). Social: Facebook `MIMProduccionesMX`, Instagram `mimproduccionesmx`.
- Voice: Spanish, warm and confident, first-person plural ("Convertimos ideas en emociones que
  trascienden la pantalla"), addressing the client as "tú".

## Evidence on Hand

- Real project photos with client and category in `src/content/images.json` (`assets-src/`).
- 16 client logos in `assets-src/clients/`.
- Showreel video at `public/videos/showreel.mp4`.
- Company history, mission, vision, and values in `src/data/about.ts`.
- **Absent:** testimonials, quotes from clients, case-study metrics, press, certifications.
  Future work must not fabricate any of these.

## Product Principles

1. **Earn corporate trust fast.** Real work, real brands, and owned equipment are the proof;
   lead with evidence, not adjectives.
2. **One team, start to finish.** Every surface should reinforce that MIM handles the whole event,
   not just drops off gear.
3. **WhatsApp is the front door.** Starting a conversation must always be one obvious step away,
   with context prefilled where possible.
4. **Content stays editable by the client.** Changes must keep text in `src/data` and media in the
   CMS-managed JSON, so the team can update the site without a developer.
5. **Fast on a phone.** Many visitors arrive from WhatsApp and social links on mobile; performance
   and responsive images are not optional.

## Accessibility & Inclusion

No product-specific standard was established. The existing code already respects
`prefers-reduced-motion`, uses an accessible mobile menu and labelled form fields; keep at least
that baseline (WCAG 2.1 AA as a working target).
