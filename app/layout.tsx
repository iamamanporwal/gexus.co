import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { site } from '@/lib/site'
import { RevealObserver } from '@/components/RevealObserver'

// Variable font: one file covering every weight we use, latin only.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'AI CAD software',
    'generative design',
    'topology optimization',
    'design for manufacturing',
    'engineering simulation',
    'text to CAD',
    'Gexus',
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    title: site.title,
    description: site.description,
    images: [{ url: '/images/hero-lattice.webp', width: 1710, height: 682, alt: site.tagline }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/images/hero-lattice.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
}

export const viewport: Viewport = {
  themeColor: '#F1F1F1',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

/**
 * Structured data. Kept to things that are actually true of the page: who
 * publishes it, what the product is, and what the site is. No review or
 * rating markup, since there is nothing real to back it.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.legalName,
      url: site.url,
      description: site.description,
      logo: { '@type': 'ImageObject', url: `${site.url}/favicon.svg` },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${site.url}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.url}/#software`,
      name: site.name,
      applicationCategory: 'DesignApplication',
      applicationSubCategory: 'Computer Aided Design',
      operatingSystem: 'Web',
      description: site.description,
      url: site.url,
      publisher: { '@id': `${site.url}/#organization` },
      featureList: [
        'Describe a part in plain language and generate manufacturable geometry',
        'Topology optimization aware of real material behaviour',
        'Built in stress analysis',
        'Design for manufacturing checks against machines you already own',
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Without scripting the reveal observer never runs, so make sure the
            content is painted anyway. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal-group]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-[13px] focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
