# gexus.co

Marketing site for Gexus: AI-assisted CAD in the browser. Next.js 16 (App Router), Tailwind CSS v4, fully static.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (every route is prerendered)
npm run lint
```

## Where things live

- `lib/site.ts`: brand, SEO title/description/keywords, and every outbound link. Edit copy targets here, not in components.
- `app/page.tsx`: the landing page, composed from `components/sections/*`, one file per section of the design.
- `app/layout.tsx`: fonts (self-hosted via `next/font`) and site-wide metadata.
- `components/StructuredData.tsx`: JSON-LD (Organization, WebSite, SoftwareApplication).
- `app/opengraph-image.tsx`, `app/icon.svg`, `app/manifest.ts`, `app/robots.ts`, `app/sitemap.ts`: generated SEO assets.
- `public/images/`: artwork cropped from the design export. The UI chrome the design baked into its images (cards, icons, lists) is rebuilt in HTML/CSS so it is responsive and readable by search engines.
- `public/llms.txt`: product summary for AI assistants.

## To do

- Swap `site.keywords` for the researched keyword list.
- Set `links.demo` when the 1-minute demo video exists; the hero link switches from "See how it works" to "Watch 1 min demo".
- Ask for 2x exports of the artwork; the design export is 1506px wide, so images are soft on retina screens.
