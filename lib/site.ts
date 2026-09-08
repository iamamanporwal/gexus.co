/**
 * Single source of truth for everything identity shaped: the brand, the
 * canonical origin, and every outbound URL.
 *
 * Before this file existed the domain was hardcoded in eleven places and the
 * codebase had picked up three different ones. Add values here. Never inline
 * a domain, a product name or a link target in a component again.
 */

export const site = {
  name: 'Gexus',
  tagline: '3D in 3 Clicks',

  /**
   * Canonical origin. gexus.in redirects here with a 301, configured at the DNS
   * or Vercel level rather than in application code, so the redirect keeps
   * working even when the app is down.
   */
  url: 'https://gexus.co',

  description:
    'Gexus is a browser based 3D design tool for product teams. Industrial ' +
    'design, product visualization, prototyping and hardware UX in one place, ' +
    'with nothing to install.',

  keywords: [
    'browser based product design',
    '3D design in the browser',
    'industrial design software',
    'product visualization',
    'digital prototyping',
    'hardware UX design',
    'consumer electronics design',
    'concept design',
  ],

  locale: 'en_US',

  /**
   * GA4 measurement ID for gexus.co.
   *
   * Deliberately null. The previous value pointed at a Vi3W property, and
   * sending Gexus traffic to the wrong account is worse than collecting
   * nothing. Analytics stays out of the document while this is null; set it and
   * the scripts come back.
   */
  analyticsId: null as string | null,
} as const

/**
 * Outbound links.
 *
 * The Gexus renames of these are in progress. The URLs below still resolve, so
 * they stay until the new ones land, because a dead LOG IN button is worse than
 * an off brand one. Replace the values here and every link on the site follows.
 */
export const links = {
  app: 'https://app.gexus.co',
  github: 'https://github.com/iamamanporwal/VI3W3D',
  discord: 'https://discord.gg/TTWcRfvM9z',
  careers: 'https://wellfound.com/company/vi3w-1',
} as const

/** Primary navigation. `external` drives target and rel, so callers need no logic. */
export const nav = [
  { name: 'Home', href: '/', external: false },
  { name: 'Github', href: links.github, external: true },
  { name: 'Discord', href: links.discord, external: true },
  { name: 'Careers', href: links.careers, external: true },
] as const
