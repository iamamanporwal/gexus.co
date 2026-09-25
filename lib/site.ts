/**
 * Single source of truth for everything identity shaped: the brand, the
 * canonical origin, SEO copy and every outbound URL.
 *
 * Add values here. Never inline a domain, a product name or a link target in a
 * component.
 */

export const site = {
  name: 'Gexus',
  tagline: '3D CAD in 3 Clicks',

  /**
   * Canonical origin. gexus.in redirects here with a 301, configured at the DNS
   * or Vercel level rather than in application code, so the redirect keeps
   * working even when the app is down.
   */
  url: 'https://gexus.co',

  /** Used for <title>. Leads with the category, then the promise. */
  title: 'Gexus: AI CAD Software | Text, Sketch or Image to 3D CAD in 3 Clicks',

  /** ~155 characters so search results do not truncate it. */
  description:
    'Gexus is AI-assisted CAD in your browser. Turn text, sketches or images ' +
    'into manufacturing-ready 3D models and export STEP, STL or GLB in minutes.',

  /**
   * Placeholder set built from the page copy. Swap in the researched keyword
   * list when it lands; metadata and JSON-LD both read from here.
   */
  keywords: [
    'AI CAD',
    'AI CAD software',
    'text to CAD',
    'sketch to CAD',
    'image to 3D model',
    'AI 3D model generator',
    'online CAD software',
    'browser based CAD',
    'manufacturing-ready 3D models',
    'STEP file generator',
    'STL generator',
    'CAD for makers',
    'CAD for small manufacturers',
    'motor bracket design',
    'enclosure design',
    'robot chassis design',
  ],

  locale: 'en_US',
  themeColor: '#02060a',

  /**
   * GA4 measurement ID for gexus.co. Deliberately null until a Gexus property
   * exists; analytics stays out of the document while this is null.
   */
  analyticsId: null as string | null,
} as const

/**
 * Outbound links. Replace the values here and every link on the site follows.
 */
export const links = {
  app: 'https://app.gexus.co',
  signIn: 'https://app.gexus.co',
  /**
   * The "Watch 1 min demo" link from the design. There is no demo video yet,
   * so while this is null the hero links to the How it works section instead
   * of a dead "#". Set a YouTube or hosted video URL to switch it on.
   */
  demo: null as string | null,
  github: 'https://github.com/iamamanporwal/VI3W3D',
  discord: 'https://discord.gg/TTWcRfvM9z',
  careers: 'https://wellfound.com/company/vi3w-1',
} as const

/**
 * Primary navigation. The design had Product / Solutions / Resources / Pricing
 * pointing at "#"; none of those pages exist, so the nav points at real
 * sections of the page until they do.
 */
export const nav = [
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Use cases', href: '#use-cases' },
  { name: 'Features', href: '#features' },
  { name: 'Compare', href: '#compare' },
] as const

export const social = [
  { name: 'GitHub', href: links.github },
  { name: 'Discord', href: links.discord },
  { name: 'Careers', href: links.careers },
] as const
