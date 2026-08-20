import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Vi3W - 3D in 3 Cilcks",
  description: "Vi3W is a spatial foundation model that translates intent into geometry. Generate production-ready 3D assets for Unity, Unreal Engine 5, and React Three Fiber in seconds.",
  keywords: ["Text to 3D", "AI 3D Generation", "Spatial Foundation Model", "Vi3W", "3D Assets", "Game Development", "AR", "VR", "Metaverse"],
  openGraph: {
    title: "Vi3W - 3D in 3 Cilcks",
    description: "Generate production-ready 3D assets from text. Logic, topology, and physics included.",
    type: "website",
    url: "https://vi3w.online",
  }
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-60495EYSG4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-60495EYSG4');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
