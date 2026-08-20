# Gexus website: audit and rebuild plan

Branch: `redesign/positioning-seo-cms`
Audited against commit `e5ef825` (the vi3w.online code as imported)
Date: 2026-08-20

73 findings, 5 critical. Every one was verified against the code, the build output,
or the prerendered HTML. File references are `path:line`. IDs are stable so they
can be quoted in commits and issues.

One entry, S-11, was checked and cleared rather than fixed; it is kept in place so
it is not raised again. The landing-page execution plan lives separately in
[`landing-page-plan.md`](./landing-page-plan.md).

---

## Phase 0 decisions (locked 2026-08-20)

| Decision | Answer |
|----------|--------|
| **Brand** | **Gexus.** The imported code is Vi3W-branded throughout, so this is a rebrand, not a casing cleanup. |
| **Canonical domain** | **`gexus.co`.** `gexus.in` 301-redirects into it. Only `gexus.co` goes in Search Console. |
| **Product** | A design tool for product designers and for UI/UX on hardware, aimed specifically at consumer electronics and concept design. |
| **Capabilities** | Industrial Design, Product Visualization, Prototyping, User Experience Design |
| **Industries** | Consumer Electronics, Furniture, Automotive, Fashion, Toys |
| **Route depth** | 9 pages: 4 capability + 5 industry. Not the 20-way cross. |
| **Tagline** | Keep **"3D in 3 Clicks"** — with the `Cilcks` typo fixed (N-01). |
| **Social properties** | Being renamed to Gexus; URLs to follow. Until then they live behind one config object so swapping them is a one-line change. |

### Working positioning sentence

Drafted from the answers above, for phase 3 to derive headlines from:

> Gexus is a browser-based design tool for product teams: industrial design,
> visualization, prototyping and hardware UX in one place, built for the people
> shaping consumer electronics.

One note on the tagline: "3D in 3 Clicks" carries ease and speed, which lands
well on the home page and on concept design. It undersells precision on the
Prototyping and Industrial Design pages, so let those pages carry their own
headlines rather than repeating it.

### Rebrand scope

Measured: **32 `Vi3W` occurrences across 11 files**, plus six external URLs
pointing at Vi3W properties.

| Files with Vi3W strings | Count |
|---|---|
| `components/Navigation.tsx` | 7 |
| `public/sitemap.xml` | 5 |
| `app/layout.tsx` | 5 |
| `public/llms.txt` | 4 |
| `public/humans.txt` | 3 |
| `public/manifest.json` | 2 |
| `lib/data.ts` | 2 |
| `public/robots.txt` | 1 |
| `package.json` | 1 |
| `components/VideoEmbed.tsx` | 1 |
| `components/ReleaseOverlay.tsx` | 1 |

External URLs needing Gexus equivalents: `app.vi3w.in`, `discord.gg/TTWcRfvM9z`,
`discord.com/invite/TTWcRfvM9z`, `github.com/iamamanporwal/VI3W3D`,
`wellfound.com/company/vi3w-1`, and the YouTube embed `oGOkx7cuwvo`.

Do this as **one `lib/site.ts` config object** that every component reads, not a
find-and-replace. The current code hardcodes the same domain in eleven places,
which is exactly how it ended up with three of them.

---

## 0. The short version

Four things are wrong at the same time, and they compound:

1. **The product the site sells is not the product being built.** Every headline,
   keyword and CTA sells game-asset generation. The product is a browser-based
   design tool for product designers and hardware UX, aimed at consumer
   electronics. The primary CTA literally reads "Ship Games 10X Faster".
2. **The site is branded for the wrong company.** The brand is Gexus; the code
   says Vi3W in 32 places across 11 files, and three different domains
   (`vi3w.online`, `vi3w.in`, `gexus.co`) each claim to be the canonical home.
   Search engines are being given contradictory instructions.
3. **There is exactly one indexable URL.** The whole site is one scroll-jacked
   `/`. It cannot rank for more than one intent, and the sitemap advertises four
   pages that do not exist.
4. **It is heavy for what it shows.** 1.03 MB of client JS, 4.2 MB of static
   assets, a 950 KB GIF used as a 36 px logo, and four autoplaying MP4s.

The single highest-leverage structural decision: **the fixed, scroll-jacked deck
is the root cause of the SEO ceiling.** `html, body { overflow: hidden }` plus a
`position: fixed` scroll container means there is no document scroll, no anchor
targets, and no way to split content across URLs. Everything in section 3 is
downstream of changing that.

---

## 1. Identity and naming

| ID | Issue | Where | Severity |
|----|-------|-------|----------|
| N-01 | **Typo in the page title: "3D in 3 Cilcks".** This is the `<title>` and the OpenGraph title, so it is the text in every search result and every shared link. | `app/layout.tsx:20`, `app/layout.tsx:25` | Critical |
| N-02 | **Three conflicting domains.** `vi3w.online` in the OG url and package name; `vi3w.in` in robots, sitemap, llms.txt, humans.txt and every nav link; `gexus.co` as the git remote. **Resolved: `gexus.co` is canonical, `gexus.in` 301s into it.** | `app/layout.tsx:28`, `package.json:2`, `public/robots.txt:29`, `public/sitemap.xml`, `public/llms.txt:24`, `public/humans.txt:19`, `components/Navigation.tsx:12,53,54` | Critical |
| N-03 | **The whole site is branded Vi3W, and the brand is Gexus.** 32 occurrences across 11 files, plus six external URLs pointing at Vi3W properties. Supersedes the original "pick one casing" reading of this finding. See the rebrand scope table above. | 11 files, see scope table | Critical |
| N-04 | Nav "Home" points to an absolute external URL with a mixed-case host (`https://www.Vi3W.in`) instead of `/`. Costs a full page load to go home, and hosts are case-sensitive on some CDNs. | `components/Navigation.tsx:12` | High |
| N-05 | A personal Gmail address is published as the company contact. | `public/humans.txt:4` | Medium |
| N-06 | The GitHub link targets a repo named `VI3W3D`; confirm that is the intended public repo. | `components/Navigation.tsx:13` | Low |
| N-07 | Package name is `vi3w.online`, which pins the old domain into the lockfile. | `package.json:2` | Low |
| N-08 | Stray root docs: `Correction.txt` (0 bytes), `DOCUMENTATION.TXT`, `MobileDesign.txt`. Uppercase `.TXT` in the repo root. | repo root | Low |
| N-09 | The Search Console verification file belongs to the old property. | `public/google8210939ea59801f1.html` | Medium |
| N-10 | GA property `G-60495EYSG4` is hardcoded; confirm it matches the canonical domain or the data lands in the wrong property. | `app/layout.tsx:44,52` | Medium |

**Decision needed before any of this can be fixed:** one canonical origin.
Everything else derives from it. Recommendation: pick the domain you will still
own in three years, set it once as `metadataBase`, and generate every other URL
from that one constant.

---

## 2. Positioning: game assets to product design

This is the largest body of work, and it is copy, not code. The site currently
targets game developers throughout.

| ID | Current copy | Where |
|----|-------------|-------|
| POS-01 | "Ship Games 10X Faster" — the primary CTA headline of the entire site | `components/ReleaseOverlay.tsx:12` |
| POS-02 | "Get a game-ready 3D model in seconds—low-poly" | `lib/data.ts:42` |
| POS-03 | "From indie game assets to enterprise-scale digital twins" | `lib/data.ts:33` |
| POS-04 | Prompt copy: "game-ready, low poly, optimized for unity" | `lib/data.ts:26` |
| POS-05 | Keywords include "Game Development" and "Metaverse" | `app/layout.tsx:22` |
| POS-06 | llms.txt lists "Game Developers (Indie, Mobile, AAA)" first and "Product Designers" last, and sells "Game-Ready Exports" | `public/llms.txt` |
| POS-07 | The a16z citation is "Unbundling the game engine", which frames the company as game infrastructure | `components/ContentPanel.tsx` |
| POS-08 | **The product deck contradicts itself.** Card 1 sells game topology ("LOD levels", "mesh topology for deformation"); card 2 sells manufacturing ("manufacturable geometry with exact tolerances", "export to CAD formats"). Two different products in one component. | `components/ProductDeck.tsx:32,42` |

### Useful asset

The Gexus copy that this repo replaced is **already written for exactly the new
positioning** — AI-native CAD, manufacturability, tolerances, topology
optimisation, stress validation. It is preserved in commit `255fe8b` at
`lib/site.ts`, with a house style guide in its header comment. Recover it with:

```bash
git show 255fe8b:lib/site.ts
```

Treat it as a copy deck to draw from rather than starting from a blank page.

### The locked audience

Product designers, and UI/UX designers working on hardware — specifically
consumer electronics and concept design. Not game developers, and not the
generic "3D artist" market the current copy chases.

### Keyword targets, mapped to routes

The current site targets "text to 3D" and "AI 3D generation", which competes in a
crowded game-asset market against far larger budgets. The locked taxonomy is a
better keyword map because each cell is a real, separable search intent:

| Route | Primary intent |
|-------|----------------|
| `/` | browser based product design software · 3D design in the browser |
| `/industrial-design` | industrial design software online · industrial design tool |
| `/product-visualization` | product visualization software · product rendering in browser |
| `/prototyping` | digital prototyping tool · rapid prototyping software |
| `/ux-design` | hardware UX design tool · device UI design software |
| `/for/consumer-electronics` | consumer electronics design software · device concept design |
| `/for/furniture` | furniture design software online |
| `/for/automotive` | automotive concept design tool |
| `/for/fashion` | 3D fashion design software |
| `/for/toys` | toy design software |

Nine pages plus the home page, not the 20-way capability x industry cross. Twenty
pages of near-identical copy is the doorway-page pattern Google demotes, and it is
more copy than can be written well in one pass. Add crossed pages later only where
a real customer story justifies one — which is a further argument for building
User Stories (section 6) before expanding the taxonomy.

---

## 3. SEO

| ID | Issue | Where | Severity |
|----|-------|-------|----------|
| S-01 | **The sitemap advertises four URLs that do not exist.** It lists `/product`, `/use-cases/game-development`, `/use-cases/3d-design` and `/pricing`. The build output has exactly one route: `/`. Every one of those is a soft 404 handed straight to Google. | `public/sitemap.xml` | Critical |
| S-02 | The sitemap is static with a hardcoded `lastmod` of 2026-02-17, so it is already stale and will never update. Should be `app/sitemap.ts`. | `public/sitemap.xml` | High |
| S-03 | robots.txt points the sitemap at the wrong domain. Should be `app/robots.ts` deriving from one constant. | `public/robots.txt:29` | High |
| S-04 | **No `metadataBase`.** Without it, OG and Twitter image URLs resolve relative and Next emits a build warning. | `app/layout.tsx:19` | High |
| S-05 | No canonical URL (`alternates.canonical`). With three domains in play, this is what actually prevents duplicate-content splitting. | `app/layout.tsx:19` | High |
| S-06 | **No OG image at all.** Every share on LinkedIn, X, Slack and WhatsApp renders as bare text. | `app/layout.tsx:24-29` | High |
| S-07 | No Twitter card metadata. | `app/layout.tsx:19` | Medium |
| S-08 | **One route for the entire site.** No amount of on-page work lets a single URL rank for several intents. This is the ceiling. | `app/page.tsx` | Critical |
| S-09 | **Three `<h1>` elements on one page** — the heading is rendered inside the sections loop, so every section with a title emits an `h1`: "3D in 3 Clicks.", "No More Mouse Marathon", "Your Ideas to Reality, Faster!". One `h1`, the rest `h2`. | `components/ContentPanel.tsx:139` | High |
| S-20 | **There is no footer.** No footer component exists anywhere in the codebase, so the site has no legal links, no contact, no navigation for crawlers to follow, and no place for the trust signals a B2B design tool is judged on. | — | High |
| S-21 | **Zero internal links on the entire site.** Every `href` is outbound (a16z, Discord, the app subdomain). Nothing links to another page, so there is no internal link graph at all — which also means the nine new routes will launch orphaned unless this is fixed with them. | `components/`, `app/` | High |
| S-10 | No structured data. No `Organization`, no `SoftwareApplication`, no `FAQPage`. This is the cheapest available win for AI-search surfaces. | — | High |
| S-11 | ~~Key copy missing from the prerendered HTML.~~ **Checked and cleared, 2026-08-20.** An earlier read of this was wrong. `next/dynamic` server-renders by default in the App Router, so the `dynamic()` sections are prerendered normally: `Create the things`, `Ship Games 10X Faster`, all three deck card summaries and the retro-card copy are all present in `.next/server/app/index.html`. Recorded here so it is not raised again. | `components/ContentPanel.tsx:13-22` | Not an issue |
| S-12 | `html, body { overflow: hidden }` plus a fixed scroll container means there is no document scroll. Breaks in-page anchors, scroll-to-text-fragment, reader modes and "jump to" search features. | `app/globals.css:18`, `app/page.tsx:23` | High |
| S-13 | No custom 404 page; the default `_not-found` ships. | — | Low |
| S-14 | **The PWA manifest is broken.** Both icon entries point at `/pwa-icon.png`, which does not exist in `public/`. No `start_url`, `scope`, `id` or maskable icon. | `public/manifest.json` | Medium |
| S-15 | The favicon is a 432 KB PNG. | `app/icon.png` | Medium |
| S-16 | llms.txt is well structured but describes the wrong audience and the wrong product. Worth keeping and rewriting. | `public/llms.txt` | Medium |
| S-17 | Analytics fires before any consent. No consent gate for GDPR or India's DPDP Act. | `app/layout.tsx:41-56` | Medium |
| S-18 | A decorative image carries `alt="Background"`. Decorative images take `alt=""`. | `components/ContentPanel.tsx:111` | Low |
| S-19 | `dangerouslyAllowSVG: true` is enabled but there are no SVGs in `public/`. Remove the risk. | `next.config.ts:27` | Low |

---

## 4. Weight

Measured: **1031 KB of client JS** across chunks, **4.2 MB** in `public/`.

| ID | Issue | Cost | Where |
|----|-------|------|-------|
| P-01 | **A 950 KB animated GIF is the logo, rendered at 36x36 px, with `unoptimized` set** so Next cannot touch it. Worst single asset on the site. | 950 KB | `components/Navigation.tsx:26-32`, `public/logo.gif` |
| P-02 | **Four separate logo files ship**: `app/icon.png` 432 KB, `logo.gif` 950 KB, `FAVICON.png` 178 KB, `logo.png` 155 KB. | 1.66 MB | `public/`, `app/` |
| P-03 | **All three product-deck videos autoplay at once**, including the two hidden behind the top card. | 1.8 MB | `components/ProductDeck.tsx:172` |
| P-04 | The hero video has no `preload` attribute, so browsers fetch it eagerly and in full. | 756 KB | `components/VideoBackground.tsx:52` |
| P-05 | The YouTube iframe loads eagerly rather than behind a click-to-play facade. | ~1 MB third-party | `components/VideoEmbed.tsx:14` |
| P-06 | **`three` (38 MB), `@react-three/fiber` and `@react-three/drei` (5 MB) are dependencies with zero imports anywhere in the source.** `ReleaseScene` uses a plain 2D canvas. They are tree-shaken out of the client bundle, so this is not page weight — it is install time, CI time, lockfile size and audit surface. | 43 MB installed | `package.json:11-13` |
| P-07 | 110 KB of polyfills ship in a site that targets WebGL-capable browsers. | 110 KB | build output |
| P-08 | **Every component is `"use client"`, including the page itself.** All the static marketing copy is hydrated for no reason. Nothing is a server component. | — | `app/page.tsx:1` |
| P-09 | `ReleaseScene` sets `ctx.filter = 'blur(60px)'` and redraws three 60 px-wide strokes across the full viewport **every frame** in a rAF loop, plus a `mousemove` handler. A full-viewport per-frame blur is one of the most expensive things you can ask a 2D canvas to do. | CPU / battery | `components/ReleaseScene.tsx:80-88` |
| P-10 | **No `prefers-reduced-motion` handling anywhere**, against roughly ten infinite CSS animations, a rAF canvas loop, Framer Motion springs and four autoplaying videos. | accessibility | `app/globals.css`, all components |
| P-11 | `next-pwa` on a marketing site adds `sw.js` plus workbox, and brings stale-content risk for the exact pages you most want fresh. | 32 KB + risk | `next.config.ts:2-11` |
| P-12 | `swcMinify` is a no-op in Next 16. | — | `next.config.ts:7` |
| P-13 | Two full Google Font families (Inter and JetBrains Mono), full latin subsets. | ~2 files | `app/layout.tsx:6-16` |
| P-14 | A `fill` image with no `sizes` prop, so the largest candidate is served. | — | `components/ContentPanel.tsx:111-116` |
| P-15 | The canvas ignores `devicePixelRatio`, so it renders blurry on every retina display. | quality | `components/ReleaseScene.tsx:24-27` |

### Budget to hold after the work

| Metric | Now | Target |
|--------|-----|--------|
| Client JS, first load | ~1031 KB | < 250 KB |
| Largest single asset | 950 KB | < 200 KB |
| `public/` total | 4.2 MB | < 1.5 MB |
| LCP, mobile 4G | unmeasured | < 2.5 s |
| CLS | unmeasured | < 0.1 |
| Lighthouse SEO | unmeasured | 100 |

---

## 5. Frontend, visuals and screen sizes

| ID | Issue | Where | Severity |
|----|-------|-------|----------|
| R-01 | **`md:max-w-11xl lg:max-w-25xl` are not real Tailwind classes** and no `@theme` block defines them, so both are silently dropped and desktop cards fall back to `max-w-[90vw]`. The desktop card sizing you wrote has never applied. | `components/ProductDeck.tsx:126` | High |
| R-02 | **`gradient-blue` is applied but never defined** in any stylesheet. Dead class; the retro title bar is a flat `#000080` instead of the intended gradient. | `components/RetroErrorCards.tsx:46` | Medium |
| R-03 | **`mix-blend-difference` over playing video.** Text contrast becomes a function of whatever frame is behind it, and it disappears entirely against mid-grey. Fails WCAG contrast unpredictably. | `components/ContentPanel.tsx:130,236` | High |
| R-04 | Gradient clip-text headings (`text-transparent bg-clip-text`) lower effective contrast and render invisible if `background-clip: text` fails. | `components/ContentPanel.tsx:139`, `components/ProductDeck.tsx:243` | Medium |
| R-05 | **Four separate `window.innerWidth` resize listeners** doing the same job: one per deck card (three) plus one in the retro cards. All start `isMobile = false`, so mobile gets a desktop-layout flash on hydration. Should be one shared `matchMedia` hook. | `components/ProductDeck.tsx:83-88`, `components/RetroErrorCards.tsx:88-93` | Medium |
| R-06 | Mobile menu offsets are magic numbers (`top-[72px] md:top-[112px]`) that do not derive from the real nav height, so the dropdown sits wrong whenever nav padding changes. | `components/Navigation.tsx:78` | Medium |
| R-07 | **The mobile menu has no Escape handler, no focus trap, no body scroll lock, and the toggle has no `aria-expanded` or `aria-controls`.** Keyboard and screen-reader users cannot operate or escape it. | `components/Navigation.tsx:70-73` | High |
| R-08 | Scroll snap is applied only at `md` and up, so mobile and desktop use fundamentally different scroll models and need separate QA. | `app/page.tsx:24` | Medium |
| R-09 | `100dvh` plus a fixed overlay plus `body { overflow: hidden }` is the classic iOS Safari combination for content jumping and clipping as the toolbar collapses. | `app/page.tsx:23`, `app/globals.css:18` | High |
| R-10 | Retro cards on mobile: `pt-64 pb-48` (16rem / 12rem) around absolutely positioned cards translated +/-36 inside `min-h-[500px]`. Cards overlap and clip on small screens. | `components/RetroErrorCards.tsx:110` | High |
| R-11 | **Dead controls.** `OK`, `RETRY`, `ABORT` and the window close button are real `<button>` elements that do nothing, and they flee on hover. Keyboard users can focus four controls that have no effect. | `components/RetroErrorCards.tsx:47-56,70-79` | Medium |
| R-12 | `gap-32` (8rem) on mobile inside a `100dvh` section pushes content out of the viewport on short screens. | `components/ContentPanel.tsx:98` | Medium |
| R-13 | `md:` is 768 px, so iPad portrait gets the desktop layout with `md:pl-12 md:pr-24` and the two-column split at its tightest. | `components/ContentPanel.tsx:96` | Medium |
| R-14 | The bottom progress pills are `flex-wrap` and will wrap over the centred arrow button on narrow screens. | `components/ContentPanel.tsx:208+` | Medium |
| R-15 | The card number overlay at `text-[120px] md:text-[180px]` can overflow its card. | `components/ProductDeck.tsx:186` | Low |
| R-16 | `scrollToSection` wraps modulo, so pressing the down arrow on the last section smooth-scrolls the entire deck back to the top. | `components/ContentPanel.tsx:65` | Medium |
| R-17 | Unused `Link` import. | `components/ReleaseScene.tsx:4` | Low |
| R-18 | **`npm run lint` currently fails**: one error (`require()` in `next.config.ts:2`) plus 86 warnings, almost all from linting the generated `public/sw.js` and workbox bundles. ESLint should ignore `public/`. | `next.config.ts:2`, `eslint.config.mjs` | High |
| R-19 | `focus:outline-none` is applied with no replacement focus style, so keyboard focus is invisible. | `components/ProductDeck.tsx:135` | High |
| R-20 | Landscape phones: sections are `min-h-[100dvh]` with vertically centred content, so heading plus email form plus description exceeds the viewport and gets awkwardly cut by the snap. | `components/ContentPanel.tsx:96` | Medium |

### Breakpoints to QA

320, 360, 390, 414, 768, 1024, 1280, 1920, plus landscape phone (844x390) and
iPad portrait (768x1024) — the last two are where the current layout is weakest.

### Environment note

The repo requires Node >= 20.9 (Next 16), and this machine's default `node` is
v18.17.1, so builds fail until the newer runtime is on PATH. fnm has 20.20.0 and
22.12.0 installed. Verify the Vercel project's Node version too, or the deploy
fails the same way.

---

## 6. Sanity: User Stories

Publish the content type as **User Stories** and route it at `/stories`. "Blog"
undersells it, and `user-stories` in a URL is longer with no search benefit.
`/stories/[slug]` reads well and stays short.

### Packages

```bash
npm i next-sanity @sanity/image-url
npm i -D @sanity/vision
```

### Shape

```
sanity.config.ts              embedded studio config
sanity/env.ts                 projectId, dataset, apiVersion
sanity/lib/client.ts          createClient, useCdn, stega
sanity/lib/image.ts           urlFor helper
sanity/lib/queries.ts         GROQ, one export per query
sanity/schemaTypes/
  story.ts
  author.ts
  tag.ts
  seo.ts                      reusable object
app/studio/[[...tool]]/page.tsx
app/stories/page.tsx           index, server component
app/stories/[slug]/page.tsx    generateStaticParams + generateMetadata
app/api/revalidate/route.ts    webhook to revalidateTag
```

### Story schema

```ts
// sanity/schemaTypes/story.ts
import { defineField, defineType } from 'sanity'

export const story = defineType({
  name: 'story',
  title: 'User Story',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug', type: 'slug',
      options: { source: 'title', maxLength: 72 },
      validation: r => r.required(),
    }),
    // The hook that makes a story a story: who, and what they made.
    defineField({ name: 'customer', type: 'string', title: 'Company or person' }),
    defineField({ name: 'industry', type: 'string' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, validation: r => r.required().max(200) }),
    defineField({
      name: 'coverImage', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', validation: r => r.required() })],
    }),
    defineField({
      name: 'body', type: 'array', of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object', name: 'callout', fields: [
            defineField({ name: 'text', type: 'text' }),
            defineField({ name: 'attribution', type: 'string' }),
          ],
        },
      ],
    }),
    // metric drives the index cards without a second fetch
    defineField({ name: 'metric', type: 'string', description: 'e.g. "6 weeks to 4 days"' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }] }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'customer', media: 'coverImage' },
  },
})
```

### Fetching, with cache tags so the webhook can invalidate precisely

```ts
// sanity/lib/queries.ts
import { groq } from 'next-sanity'

export const STORIES_INDEX = groq`
  *[_type == "story" && defined(slug.current)]
  | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, customer, industry, metric,
    coverImage, publishedAt
  }`

export const STORY_BY_SLUG = groq`
  *[_type == "story" && slug.current == $slug][0]{
    ..., author->{name, role, image}, tags[]->{title, "slug": slug.current}
  }`
```

```ts
// app/stories/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    groq`*[_type == "story" && defined(slug.current)].slug.current`
  )
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const story = await client.fetch(STORY_BY_SLUG, params, {
    next: { tags: [`story:${params.slug}`] },
  })
  if (!story) return {}
  return {
    title: story.seo?.title ?? story.title,
    description: story.seo?.description ?? story.excerpt,
    alternates: { canonical: `/stories/${params.slug}` },
    openGraph: { images: [urlFor(story.coverImage).width(1200).height(630).url()] },
  }
}
```

### Revalidation

One webhook in Sanity, pointed at `POST /api/revalidate`, filtered to
`_type == "story"`. Verify the signature with `parseBody` from
`next-sanity/webhook` and a shared secret, then `revalidateTag('story:' + slug)`
and `revalidateTag('stories')`. Do not use time-based revalidation; it either
wastes builds or serves stale stories.

### Environment variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN          server only, for drafts
SANITY_REVALIDATE_SECRET       server only, webhook signature
```

### SEO wiring for stories

- `Article` JSON-LD per story: `headline`, `datePublished`, `dateModified`,
  `author`, `image`, `publisher`.
- Add `/stories` and every `/stories/[slug]` to the generated sitemap. This is
  the single biggest reason to build this: it turns one indexable URL into one
  per story, on a schedule you control.
- Give every story an OG image derived from `coverImage`.

### Scope discipline

Keep the marketing copy in code for now and put only stories in Sanity. Moving
the homepage into a CMS at the same time as repositioning and restructuring it
means editing the message and the machinery in the same step, which is how
launches slip. Stories are additive and low risk; the homepage is neither.

---

## 7. The plan

### Phase 0. Decide — DONE (2026-08-20)

Answers are in the decisions table at the top of this document: brand is Gexus,
canonical is `gexus.co`, nine routes, tagline stays "3D in 3 Clicks".

One item still open, and it does not block phase 1: the Gexus social and app URLs
are being renamed and will land later. Build them as fields in `lib/site.ts` with
the Vi3W values removed, so filling them in is one commit touching one file.

### Phase 1. Stop the bleeding (about half a day)

Small, safe, independently shippable, disproportionately valuable.

- N-01 fix "Cilcks" — one word, the largest single SEO return on this list
- N-03 **the Vi3W to Gexus rebrand**: 32 strings across 11 files, plus the six
  external URLs. Do it by introducing `lib/site.ts` and having every component
  read from it, so the domain exists in exactly one place afterwards
- N-02 canonical `gexus.co`; configure the `gexus.in` 301 at the DNS or Vercel
  level, not in application code
- S-04, S-05 `metadataBase` and canonical
- S-06, S-07 OG image and Twitter card
- S-01, S-02, S-03 delete the static sitemap and robots; add `app/sitemap.ts` and
  `app/robots.ts` listing only routes that exist
- S-14, S-15 real manifest icons; compress the favicon
- P-01, P-02 one optimised logo; drop the 950 KB GIF and the duplicates
- P-06 remove `three`, `@react-three/fiber`, `@react-three/drei`
- P-12 remove `swcMinify`
- R-17, R-18 fix the lint error, ignore `public/`, make `npm run lint` green
- S-19 remove `dangerouslyAllowSVG`

Exit criteria: `npm run lint` and `npm run build` both green; `public/` under 1.5 MB.

### Phase 2. Restructure for SEO (2 to 3 days)

The structural change everything else depends on.

- Remove `overflow: hidden` and the fixed scroll container; move to normal
  document flow (S-12, R-09)
- S-08 split the deck into the nine locked routes — `/industrial-design`,
  `/product-visualization`, `/prototyping`, `/ux-design`, and
  `/for/{consumer-electronics,furniture,automotive,fashion,toys}` — with `/`
  keeping the hero and the pitch. Route-to-intent table is in section 2
- One `h1` per page, carrying that route's primary intent (S-09)
- Convert the copy sections to server components; keep `"use client"` only where
  there is real interaction (P-08)
- S-20, S-21 build a real footer and an internal link graph, so the new routes do
  not launch orphaned
- Add `Organization` and `SoftwareApplication` JSON-LD (S-10)
- Add a real 404 (S-13)

Exit criteria: every sitemap URL returns 200; the product pitch and the CTA both
appear in `curl` output with JS disabled.

### Phase 3. Reposition the copy (1 to 2 days)

- Rewrite POS-01 through POS-08 for product design
- Resolve the ProductDeck contradiction: one product, one story
- Rewrite `llms.txt` for the real audience (S-16)
- Retarget keywords and the meta description (POS-05)
- Reconsider the a16z game-engine citation (POS-07)
- Mine `git show 255fe8b:lib/site.ts` for usable product-design copy

Exit criteria: no occurrence of "game" in user-facing copy that is not deliberate.

### Phase 4. Weight and responsive (2 to 3 days)

- P-03, P-04 one active video at a time; `preload="none"`, poster frames, pause
  off-screen
- P-05 click-to-play YouTube facade
- P-09, P-15 rewrite or remove the per-frame full-viewport blur; honour
  `devicePixelRatio`
- P-10 a real `prefers-reduced-motion` path
- P-11 decide whether the PWA earns its keep
- R-01, R-02 fix the dead Tailwind classes and the undefined `gradient-blue`
- R-03, R-04 stop relying on blend modes and clip-text for contrast
- R-05 one shared `useMediaQuery`, no hydration flash
- R-07, R-19 accessible mobile menu; visible focus everywhere
- R-06, R-10, R-12 through R-16, R-20 the layout list, then QA at every
  breakpoint above

Exit criteria: the budget table in section 4 is met and every breakpoint is checked.

### Phase 5. Sanity and User Stories (2 to 3 days)

Section 6, in order: schemas, studio, index, detail, webhook, sitemap, JSON-LD.

Exit criteria: publishing in the studio updates the live index within seconds
without a redeploy, and the new URL appears in the sitemap.

### Phase 6. Verify (ongoing)

- Search Console for the canonical domain only; submit the generated sitemap
- Rich Results Test for every structured-data type
- Lighthouse in CI against the section 4 budget
- Re-check Core Web Vitals on real mobile hardware, not just desktop throttling

---

## Sequencing note

Phases 1 and 3 are independent of everything and can run in parallel. Phase 2
blocks phase 5, because stories need a working route structure and a real sitemap
to land in. Phase 4 is best done after phase 2, since the restructure deletes
some of the components the layout bugs live in — fixing them first risks fixing
code you are about to remove.
