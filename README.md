# Advaitam — Landing Page (Hero → Philosophy → Projects)

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## What's included
- `src/components/Navbar.tsx` — sticky navbar, transparent over the hero, morphs into a
  blurred glass pill on scroll, animated underlines, full-screen mobile menu.
- `src/components/Hero.tsx` — full-bleed hero with staggered headline animation and a
  scroll rail.
- `src/components/Philosophy.tsx` — "Beyond Real Estate. We Create Legacies." with the
  4 pillars, animated in on scroll.
- `src/components/Projects.tsx` — "Our Projects" carousel, **expanded to 6 slides**
  (Advaitam 17, Enclave, Resorts, Ridge, Meadows, Springs), snap-scrolling, arrow
  controls, and live dot indicators.
- `src/lib/projects.ts` — the 6 project entries — edit this to rename or swap images.

## Run it locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000. `npm run build` requires normal internet access
(it fetches Cormorant Garamond / Manrope from Google Fonts at build time via
`next/font/google`).

## Swapping images
All imagery currently points to Unsplash placeholder URLs (configured as an allowed
remote pattern in `next.config.ts`). Replace the `image` fields in
`src/lib/projects.ts` and the `src` in `Hero.tsx` with your own photography — ideally
1600px+ wide for the hero and 1200px+ for project cards.

## Notes
- Numbering in the hero rail (01/03) reflects the 3 built sections (Home, Philosophy,
  Projects) — update if you add more sections later.
- Reduced-motion is respected globally (`globals.css`).
- All interactive elements have visible keyboard focus states.
