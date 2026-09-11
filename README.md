# Abdul Rehman — Portfolio

Personal portfolio for **Abdul Rehman**, Software Engineer & Sr. Angular Developer.
Built with Angular 20 (standalone components, signals, zoneless change detection) and
server-side rendering with full static prerendering.

## Highlights

- **Single-page portfolio** — hero, about, skills, experience timeline, project showcase,
  strengths and a contact form.
- **Dark / light theme** with system preference detection, `localStorage` persistence and a
  no-flash inline script in `index.html`.
- **Scroll-spy navigation** — active section highlighting, condensing header, reading-progress
  bar and back-to-top button, all driven by one rAF-throttled scroll listener.
- **Reveal-on-scroll** animations via `IntersectionObserver`, disabled automatically for
  `prefers-reduced-motion` and never applied to server-rendered markup (content is visible
  without JavaScript).
- **SEO ready** — title/meta/Open Graph tags plus `Person` JSON-LD, emitted into the
  prerendered HTML.
- **Accessible** — landmarks, skip link, focus-visible styles, `aria-*` on nav, drawer and form.
- **Zero UI dependencies** — no component library, no icon package; icons are inline SVG.

## Project structure

```
src/
├─ styles/                      global design system (tokens, base, layout, components, motion)
├─ index.html                   fonts, meta, no-flash theme bootstrap
└─ app/
   ├─ core/
   │  ├─ data/portfolio.data.ts  ← ALL CV CONTENT LIVES HERE
   │  ├─ models/                 typed domain models
   │  └─ services/               theme, scroll-spy, SEO
   ├─ shared/
   │  ├─ components/icon/        inline SVG icon set
   │  └─ directives/reveal       scroll reveal directive
   ├─ layout/                    header (nav, theme toggle, drawer) + footer
   └─ features/home/
      ├─ home.ts                 page shell, section registration
      └─ sections/               hero, about, skills, experience, projects, strengths, contact
```

## Editing the content

Everything on the page comes from [`src/app/core/data/portfolio.data.ts`](src/app/core/data/portfolio.data.ts) —
profile, stats, skills, jobs, projects, education and contact channels. Update that file and the
whole site follows; no template edits needed.

Theme colours, spacing and type scale live in [`src/styles/_tokens.scss`](src/styles/_tokens.scss).

## Assets

| File | Used for |
| --- | --- |
| `public/profile.jpg` | Hero portrait — 840×1050 (4:5), ~95 kB |
| `public/Abdul_Rehman.pdf` | Resume / "Download CV" buttons (all three) |
| `public/favicon.svg` | "AR" monogram tab icon (`favicon.ico` is the fallback) |
| `design/pic.png` | Original 1024×1536 portrait — source only, **not** published |

File names are set in `PROFILE.avatar` / `PROFILE.resumeUrl`. The CV saves to the visitor's
machine as `Abdul-Rehman-CV.pdf` regardless of the stored name (`PROFILE.resumeFileName`).

To regenerate the portrait from a new source image, crop it to 4:5 and export around 840×1050
as JPEG — anything in `public/` ships as-is, so keep large originals in `design/`.

## Commands

```bash
npm start          # dev server on http://localhost:4200
npm run build      # production build + prerender into dist/codex-admin
npm run serve:ssr:codex-admin   # run the SSR/Express server from dist
```

## Deployment

The production build prerenders the page to static HTML, so it can be hosted either way:

- **Static hosting** (Netlify, Vercel, GitHub Pages, Firebase Hosting): publish
  `dist/codex-admin/browser`.
- **Node hosting**: run `node dist/codex-admin/server/server.mjs` (honours `PORT`).
