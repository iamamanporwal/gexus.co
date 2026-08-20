import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${site.name} - ${site.tagline}`;

export const metadata: Metadata = {
  // Without metadataBase, every OG and Twitter image URL resolves relative and
  // Next warns at build time.
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  // The one signal that stops gexus.co and gexus.in splitting the same page.
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: site.description,
    type: "website",
    url: "/",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        {site.analyticsId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${site.analyticsId}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
