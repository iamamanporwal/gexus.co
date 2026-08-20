# Landing page: execution plan

Branch: `redesign/positioning-seo-cms`
Scope: the home page at `/` only
Companion to [`website-plan.md`](./website-plan.md), which holds the full audit

---

## What this covers

The landing page **is** the site right now — one route, five sections. So 66 of
the 73 findings in the audit land on this page. What is deliberately deferred is
only the parts that add new surface:

| Deferred | Why it waits |
|----------|--------------|
| The nine capability and industry routes (S-08) | Needs the copy from pass 4 to exist first, or you write it twice |
| Sanity and User Stories | Additive, and it needs a working route structure to land in |
| `/pricing` | Open question, and not required for a launch-quality landing page |

Everything else — the rebrand, metadata, weight, structure, copy, responsive
behaviour — is in scope here, because it all lives on this one page.

---

## The one structural decision

The page is currently a `position: fixed` scroll-jacked deck with
`overflow: hidden` on `html, body`. That single pattern causes six findings
(S-12, S-21 partly, R-08, R-09, R-20, and the anchor-link problem).

**Keep the deck feel. Drop the fixed container.** You do not have to choose
between the design and the fixes — CSS scroll-snap on the document gives the same
section-by-section snap without taking the page out of normal flow:

```css
/* app/globals.css — replaces html, body { overflow: hidden } */

html {
  /* proximity, not mandatory: mandatory traps users on short screens */
  scroll-snap-type: y proximity;
}

/* Only commit to hard snapping when there is room for a full section */
@media (min-width: 768px) and (min-height: 700px) {
  html { scroll-snap-type: y mandatory; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-snap-type: none; }
}

.section { scroll-snap-align: start; }
```

The background layer then becomes a `position: sticky` or `position: fixed`
element *inside* normal document flow, rather than the whole document being
fixed. Sections keep `min-h-[100svh]` — note `svh`, not `dvh`, which is what
stops the iOS toolbar jump in R-09.

What this buys, in one change: real document scroll, working anchor links,
scroll-to-text-fragment, no iOS clipping, consistent mobile and desktop
behaviour, and landscape phones that can actually scroll a tall section.

---

## Section plan

Five sections today. Seven after, and the two additions are the ones a B2B
landing page cannot ship without.

| # | Section | Component | What changes |
|---|---------|-----------|--------------|
| 1 | Hero | `ContentPanel` overview | Keeps "3D in 3 Clicks" (typo fixed). New subhead from the positioning sentence. Email capture stays. **This is the page's only `h1`.** |
| 2 | Problem | `RetroErrorCards` | Copy rewrite. This section gets *stronger* for the new audience — legacy CAD really is 15+ years old, GPU-hungry and expensive, which is a sharper pitch to a product designer than to a game developer. Replace the a16z game-engine link with a product-design source. |
| 3 | Product | `ProductDeck` | Resolve POS-08: Think → Design → Iterate must tell one story. Today card 1 sells game LODs and card 2 sells CAD tolerances. Pick the product-design framing for all three. |
| 4 | Showcase | `VideoEmbed` | Needs a Gexus video. Until one exists, either cut the section or swap in a silent product capture rather than shipping a Vi3W showcase. |
| 5 | Industries | **new** | Consumer Electronics · Furniture · Automotive · Fashion · Toys. Captures industry intent while the `/for/*` pages are deferred, and becomes the internal-link hub for them later. Cheap to build, and it is the bridge to phase 2. |
| 6 | CTA | `ReleaseOverlay` | Replace "Ship Games 10X Faster". Keep the two-button pattern. |
| 7 | Footer | **new** | Does not exist anywhere in the codebase (S-20). Contact, legal, social, and the internal links that fix S-21. |

---

## Passes

Six passes, each independently shippable and independently verifiable. Run them
in order — later passes touch code earlier ones create.

### Pass 1 — Identity and metadata

**No visual change.** Pure plumbing, and it is where the rebrand happens.

Create `lib/site.ts` as the single source of truth: name, canonical origin,
tagline, description, social URLs (empty for now), analytics ID. Then have every
component and every metadata export read from it. Do not find-and-replace — the
current code hardcodes the domain in eleven places, which is how it acquired
three of them.

| Finding | Change |
|---------|--------|
| N-01 | `Cilcks` → `Clicks` in title and OG title |
| N-03 | 32 Vi3W strings across 11 files → Gexus, via `lib/site.ts` |
| N-02 | Canonical `gexus.co`; the `gexus.in` 301 is a DNS/Vercel setting, not code |
| N-04 | Nav "Home" → `/`, not an absolute external URL |
| N-05, N-07, N-08, N-09 | Company email; package name; delete the stray root `.TXT` files; delete the stale Search Console file |
| S-04, S-05 | `metadataBase` and `alternates.canonical` |
| S-06, S-07 | OG image and Twitter card — **blocked on a source logo** |
| S-01, S-02, S-03 | Delete `public/sitemap.xml` and `public/robots.txt`; add `app/sitemap.ts` and `app/robots.ts` listing only `/` |
| S-14, S-15 | Real manifest icons and a compressed favicon — **blocked on a source logo** |
| S-16 | Rewrite `llms.txt` for product designers |
| S-19 | Drop `dangerouslyAllowSVG` |
| N-10, S-17 | New GA4 property, behind a consent gate — **blocked on a measurement ID** |
| P-12, R-17, R-18 | Remove `swcMinify` and the unused import; ignore `public/` in ESLint; get `npm run lint` green |

**Done when:** `npm run lint` and `npm run build` are both green, the string
`vi3w` appears nowhere outside git history, and the only sitemap entry is `/`.

---

### Pass 2 — Weight

The most measurable pass. Target: **4.2 MB of assets down under 1.5 MB, and
1031 KB of client JS under 250 KB.**

| Finding | Change |
|---------|--------|
| P-01, P-02 | One optimised logo replaces four files totalling 1.66 MB. Drop `unoptimized`. **Blocked on a source logo** |
| P-06 | Remove `three`, `@react-three/fiber`, `@react-three/drei` — 43 MB installed, zero imports |
| P-03 | One deck video plays at a time; the two behind the top card get `preload="none"` and a poster |
| P-04 | Hero video: `preload="none"`, poster frame, pause when off-screen |
| P-05 | Click-to-play facade for YouTube instead of an eager iframe |
| P-08 | Make the copy sections server components; `"use client"` only where there is real interaction |
| P-09, P-15 | Rewrite or drop the per-frame full-viewport `blur(60px)`; honour `devicePixelRatio` |
| P-11 | Decide on `next-pwa`. Recommendation for a marketing landing page: remove it — it costs 32 KB and risks serving stale copy |
| P-13, P-14 | Subset the fonts; add `sizes` to the `fill` image |

**Done when:** the budget table in the audit's section 4 is met, measured from a
fresh `npm run build`.

---

### Pass 3 — Structure and semantics

| Finding | Change |
|---------|--------|
| S-12, R-08, R-09, R-20 | The scroll-snap conversion above |
| S-09 | One `h1` (the hero). The Problem and Showcase headings become `h2` |
| S-20 | Build the footer |
| S-21 | Add the internal link graph — footer links, and the industries strip |
| S-10 | `Organization` and `SoftwareApplication` JSON-LD |
| S-13 | A real 404 page |
| S-18 | `alt=""` on the decorative background image |

**Done when:** one `h1`, a footer on the page, anchor links work, and the Rich
Results Test passes for both schema types.

---

### Pass 4 — Copy

The section plan above, executed. This is writing, not engineering, and it is the
pass most likely to need a second round.

| Finding | Change |
|---------|--------|
| POS-01 | Replace "Ship Games 10X Faster" |
| POS-02, POS-03, POS-04 | Rewrite the hero and section copy in `lib/data.ts` |
| POS-05 | Retarget keywords and the meta description |
| POS-06 | `llms.txt` audience order — product designers first |
| POS-07 | Replace the a16z game-engine citation |
| POS-08 | Resolve the ProductDeck contradiction |

Draw from `git show 255fe8b:lib/site.ts` — the previous Gexus copy was written for
this exact audience and carries a house style guide in its header comment.

**Done when:** no occurrence of "game" in user-facing copy that is not deliberate,
and the hero subhead traces directly to the positioning sentence.

---

### Pass 5 — Responsive and accessibility

| Finding | Change |
|---------|--------|
| R-01 | `max-w-11xl` / `max-w-25xl` are not real classes — pick real ones or define them in `@theme` |
| R-02 | Define `gradient-blue` or remove it |
| R-03, R-04 | Stop using `mix-blend-difference` and clip-text gradients to carry contrast over video |
| R-05 | One shared `useMediaQuery`, replacing four `window.innerWidth` listeners; no hydration flash |
| R-06 | Mobile menu offset derives from the real nav height |
| R-07 | Escape key, focus trap, body scroll lock, `aria-expanded`, `aria-controls` |
| R-19 | A visible focus style everywhere `focus:outline-none` is used |
| R-10, R-12, R-13, R-14, R-15, R-16 | The layout list |
| R-11 | Make the retro buttons real, or make them non-focusable decoration |
| P-10 | A real `prefers-reduced-motion` path across all ten animations, the canvas loop and the videos |

**Done when:** 320, 360, 390, 414, 768, 1024, 1280, 1920, landscape phone
(844×390) and iPad portrait (768×1024) all check out, and a full keyboard pass
reaches every control with visible focus.

---

### Pass 6 — Verify

- Lighthouse against the section 4 budget, mobile profile
- Core Web Vitals on real hardware, not desktop throttling
- Search Console: verify `gexus.co` only, submit the generated sitemap
- Rich Results Test for both JSON-LD types
- Confirm the `gexus.in` 301 actually resolves to `gexus.co`

---

## Blockers

Three inputs gate parts of this. Everything else can proceed without them.

| Input | Gates | Fallback if it does not arrive |
|-------|-------|-------------------------------|
| **Source logo** (SVG, or the highest-resolution PNG) | P-01, P-02, S-06, S-15, S-14 — the whole asset diet and the OG image | Pass 1 and 2 proceed around it; the four logo findings stay open |
| **GA4 measurement ID for gexus.co** | N-10, S-17 | Strip analytics rather than send Gexus traffic to a Vi3W property |
| **A Gexus video** | Section 4 of the page | Cut the showcase section rather than ship a Vi3W video |

Social and app URLs are not blockers — they become empty fields in
`lib/site.ts`, and filling them in later is one commit touching one file.

---

## Order and effort

| Pass | Depends on | Rough effort |
|------|-----------|--------------|
| 1 Identity and metadata | Logo (partly) | Half a day |
| 2 Weight | Logo (partly), pass 1 | 1 day |
| 3 Structure and semantics | Pass 1 | 1 day |
| 4 Copy | Positioning sentence | 1 to 2 days |
| 5 Responsive and a11y | Pass 3 | 1 to 2 days |
| 6 Verify | All | Half a day |

Roughly **five to six days** for a landing page that is correctly branded,
correctly positioned, structurally sound, and inside budget.

Passes 1 and 4 can run in parallel — one is plumbing and the other is writing.
Pass 5 must come after pass 3, because the scroll-snap conversion rewrites the
containers several of the layout bugs live in; fixing them first means fixing
code that is about to change.
