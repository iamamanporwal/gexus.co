import { links, site, social } from "@/lib/site";

/**
 * JSON-LD for search engines and AI assistants: who we are (Organization), the
 * site (WebSite) and the product (SoftwareApplication, with a free offer so the
 * "free" in the CTAs can surface in results).
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        sameAs: social.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#software`,
        name: site.name,
        url: links.app,
        description: site.description,
        applicationCategory: "DesignApplication",
        applicationSubCategory: "CAD software",
        operatingSystem: "Web browser, Windows, macOS, Linux, iOS, Android",
        publisher: { "@id": `${site.url}/#organization` },
        keywords: site.keywords.join(", "),
        featureList: [
          "Text to CAD",
          "Sketch to CAD",
          "Image to 3D model",
          "AI-assisted refinement of dimensions, materials and details",
          "Export to STEP, STL and GLB",
          "Runs in the browser with no installation",
          "Private workspaces and team collaboration",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free to start. No credit card required.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: every value is a constant from lib/site.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
