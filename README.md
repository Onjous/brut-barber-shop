# BRUT — Barber Studio

Concept website for a **fictional** barbershop in Kraków, built as a portfolio piece.
All public-facing copy is in Polish.

> **Projekt demonstracyjny — fikcyjna marka stworzona na potrzeby portfolio.**
> BRUT does not exist. Prices, reviews, the address, phone number and e-mail are
> demo content and are labelled as such on the page.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 (CSS-first config in `src/app/globals.css`) |
| Animation | Motion 14 (`motion/react`) via `LazyMotion` and CSS keyframes |
| Icons | lucide-react |
| Fonts | Archivo (variable, `wdth` axis), Manrope, JetBrains Mono, self-hosted by `next/font` |

There's no database, backend, analytics or cookies, and no third-party requests at runtime.

## Getting started

Requires Node.js ≥ 20.9.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all routes are prerendered as static) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `next typegen && tsc --noEmit` (generates route types first, so it works on a fresh clone) |

Optional environment variable (see `.env.example`):

- `NEXT_PUBLIC_SITE_URL`: the canonical URL used for metadata, Open Graph, `sitemap.xml` and
  `robots.txt`. On Vercel it falls back to the project's production URL automatically.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. The framework preset is
   detected as Next.js, and no build settings need changing.
3. (Optional) Add `NEXT_PUBLIC_SITE_URL` under **Settings → Environment Variables** once a custom
   domain is connected.
4. Deploy. Every route is static, so the site is served from the edge CDN.

The CLI works too: `npx vercel` for a preview deployment, `npx vercel --prod` for production.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, JSON-LD (WebSite only), header/footer
│   ├── page.tsx                # homepage: composes the sections
│   ├── globals.css             # design tokens (@theme), utilities, keyframes
│   ├── polityka-prywatnosci/   # privacy policy (demo wording, accurate for this build)
│   ├── not-found.tsx
│   ├── sitemap.ts, robots.ts
│   ├── icon.svg                # favicon
│   └── opengraph-image.jpg     # social share image (+ .alt.txt)
├── assets/images/              # locally stored, optimised by next/image
├── components/
│   ├── layout/                 # SiteHeader (sticky nav + mobile menu), SiteFooter, PageIntro
│   ├── sections/               # Hero, Intro, Services, Team, Gallery, Reviews, Booking, Contact
│   ├── providers/Providers.tsx # LazyMotion + MotionConfig + shared booking state
│   └── ui/                     # Button, SectionLabel/DemoTag, Reveal/RevealHeading, Parallax
├── content/                    # ← all editable content, typed
│   ├── types.ts
│   ├── site.ts                 # brand, contact, opening hours, socials, nav, integration URLs
│   ├── about.ts, services.ts, team.ts, gallery.ts, reviews.ts
└── lib/
    ├── booking.ts              # demo calendar: days, time slots, simulated availability
    ├── site-url.ts
    └── utils.ts
```

## Editing content / CMS readiness

All content lives in `src/content/*.ts` and is typed in `src/content/types.ts`. Components only
read from these modules, so:

- **Changing a price, service, barber or opening hours** means editing one file. Opening hours
  drive the hero, contact section, footer and the booking calendar's available days and slots.
- **Moving to a headless CMS** (Sanity, Payload, etc.) means mapping CMS documents to the existing
  types and replacing the static imports with fetches in the server components. Images are
  currently `StaticImageData` (giving blur placeholders and intrinsic sizes). For remote CMS
  images, widen `ImageAsset.src` to `string` with `width`/`height` and add the CMS host to
  `images.remotePatterns` in `next.config.ts`.
- The gallery grid layout is positional (`LAYOUT` in `GalleryGrid.tsx`), so the order of items in
  `gallery.ts` matters. It's tuned for 8 images.

## Design system

**Direction:** editorial and urban. Condensed, heavy uppercase display type set against calm
body copy, hard edges (no rounded corners), real photography with a muted warm treatment, and
a restrained accent.

**Colour tokens** (`globals.css → @theme`):

| Token | Hex | Use |
| --- | --- | --- |
| `bone` | `#F2EFE8` | Main light background, text on dark |
| `bone-2` | `#E7E3D9` | Gallery background, disabled slots |
| `ink` | `#191919` | Text, dark sections, primary buttons |
| `olive` / `olive-deep` | `#727765` / `#5E6353` | Brand accent. `olive-deep` is the Reviews background and small labels on light (5.4:1) |
| `stone` / `stone-deep` | `#A7A49D` / `#6B6862` | Muted text: `stone` on dark only (7:1), `stone-deep` on light (4.8:1) |
| `rust` | `#B45D3D` | Accent: heading full stops, focus ring, hover lines |
| `rust-deep` | `#9E4E32` | Button hover fill and demo tags on light (5.1:1 with bone) |
| `rust-soft` | `#D4835F` | Small rust text on dark (6:1) |

The base palette values (olive, rust, stone) don't reach AA for small text on light
backgrounds, so the `-deep`/`-soft` variants exist for exactly those cases.

**Typography:**
- Display: *Archivo* at width 66, weight 800, uppercase (`font-condensed` utility). Headings end
  with a rust-coloured full stop as the brand's typographic signature.
- Body: *Manrope*.
- Labels: *JetBrains Mono*, small caps-style uppercase (`eyebrow` utility) for section numbers,
  durations and metadata.
- All three are loaded with the `latin-ext` subset, so Polish diacritics are fully supported.

**Layout:** a 12-column grid with a 120rem max width and 20/40/56px gutters. Sections alternate
light and dark (hero, light, ink, light, bone-2, olive, ink, light, ink footer), and each uses a
different composition: a split with an overlapping inset, a sticky heading beside a price list,
staggered portraits, an asymmetric 12×6 gallery, a quote carousel, and a form panel.

**Motion:**
- Hero reveals are pure CSS keyframes, so they start on first paint, before hydration.
- Section headings slide up line by line from a mask, content fades up on scroll, and there is
  subtle parallax on imagery. The mobile menu opens with a clip-path wipe and staggered links.
- Under `prefers-reduced-motion: reduce`, Motion animations reduce to opacity changes (via
  `MotionConfig`), parallax is disabled, and CSS animations and transitions are neutralised.

## Demo features vs. real integrations

| Feature | In this build | What a real launch needs |
| --- | --- | --- |
| Booking | Frontend-only demo: service, barber, day and time (availability simulated), validated contact fields, and a summary that states nothing was saved or sent | A booking provider account (e.g. Booksy). Set `site.bookingUrl` to show a "Rezerwuj przez system online" button, or replace `BookingForm` with the provider's widget or API |
| Price-list "Zarezerwuj" links | Working: preselect the service in the booking form | — |
| Address and map | Fictional address, illustrated placeholder map | Real address, then set `site.directionsUrl` (enables the "Wyznacz trasę" button). Optionally embed a map, which will need a cookie/consent review |
| Phone and e-mail | `+48 000 000 000`, `kontakt@brut.example` (reserved domain), shown as plain text | Real details, then turn them into `tel:` and `mailto:` links |
| Social media | Labels marked "wkrótce", no links | Set `href` on each entry in `site.socials` |
| Reviews | 4 fictional reviews, labelled as demo | Real reviews with the customers' consent. Don't invent ratings or add `Review` schema without real data |
| Structured data | `WebSite` only | Add `LocalBusiness`/`HairSalon` JSON-LD once the business details are real |
| Privacy policy | Accurate for this demo (no cookies, analytics or data transfer) | A policy prepared for the actual data controller (GDPR/RODO), covering the booking provider |
| Team and photos | Fictional barbers, Unsplash photos | The studio's own photography of its real team and work |

## Image credits

All photographs come from [Unsplash](https://unsplash.com) and are used under the
[Unsplash License](https://unsplash.com/license): free for commercial and non-commercial use,
no permission or attribution required. Photos showing third-party shop branding were excluded.
The people pictured aren't associated with this fictional brand.

| File | Unsplash photo ID |
| --- | --- |
| `hero-razor-shave.jpg` | `photo-1503951914875-452162b0f3f1` |
| `studio-interior.jpg` | `photo-1585747860715-2ba37e788b70` |
| `detail-tools.jpg` | `photo-1621605815971-fbc98d665033` |
| `service-fade.jpg` | `photo-1593702275687-f8b402bf1fb5` |
| `team-kuba.jpg` | `photo-1570295999919-56ceb5ecca61` |
| `team-michal.jpg` | `photo-1552058544-f2b08422138a` |
| `team-adam.jpg` | `photo-1542909168-82c3e7fdca5c` |
| `gallery-skin-fade.jpg` | `photo-1514336937476-a5b961020a5c` |
| `gallery-beard-line.jpg` | `photo-1599351431202-1e0f0137899a` |
| `gallery-chair.jpg` | `photo-1512690459411-b9245aed614b` |
| `gallery-clipper-detail.jpg` | `photo-1493256338651-d82f7acb2b38` |
| `gallery-cutting.jpg` | `photo-1567894340315-735d7c361db0` |
| `gallery-beard-trim.jpg` | `photo-1532710093739-9470acff878f` |
| `gallery-texture-cut.jpg` | `photo-1622286342621-4bd786c2447c` |
| `gallery-beard-brush.jpg` | `photo-1596728325488-58c87691e9af` |

Original files are at `https://images.unsplash.com/<photo ID>`.

## QA report

Checked against a production build (`next build` + `next start`), using headless Chromium
(Playwright) and Lighthouse 12.

- **Build, types and lint:** `next build`, `tsc --noEmit` and `eslint` all pass with no errors
  or warnings. All routes prerender as static.
- **Responsive layout:** checked at 360, 390, 768, 1024, 1440 and 1920 px. There is no
  horizontal overflow at any width (checked programmatically), and layouts were reviewed
  section by section in screenshots at mobile and desktop widths.
- **Images:** no broken images, no 4xx requests, and no console errors or warnings on the
  homepage or the privacy page.
- **Interactions** (automated):
  - Mobile menu: opens, makes the rest of the page `inert`, locks scrolling, closes on Escape
    with focus returned to the toggle, and its links scroll to the right section.
  - Gallery lightbox: opens from the keyboard with focus on "Zamknij"; arrow keys navigate, the
    counter updates, Escape closes and focus returns to the thumbnail. Swipe is supported on
    touch screens.
  - Booking: a price-list link preselects the service; submitting empty shows field errors and
    focuses the first invalid field; a valid submission shows the demo summary with focus moved
    to its heading.
  - Reduced motion: hero content renders immediately without transforms.
- **Lighthouse** (homepage):

  | | Performance | Accessibility | Best practices | SEO |
  | --- | --- | --- | --- | --- |
  | Desktop | 99 | 97 | 100 | 100 |
  | Mobile (simulated) | 86 | 97 | 100 | 100 |

  - The only accessibility flag is the oversized decorative "BRUT." wordmark in the footer:
    tone-on-tone by design and `aria-hidden`.
  - Mobile CLS is 0.001.
  - Lighthouse's simulated mobile LCP (~4 s) overstates the effect of the hero text reveal.
    Measured directly in Chromium with 4× CPU and slow-4G throttling, LCP is about 1.4 s
    (0.9 s with the animation disabled).
- **Not tested:** real iOS Safari and Android devices, and screen readers (VoiceOver/NVDA).
  These should be checked by hand before a client presentation.
