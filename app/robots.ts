import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * The sitemap URL derives from `site.url`, so it cannot point at a domain we no
 * longer own. The static file this replaced pointed at vi3w.in.
 *
 * AI crawlers are allowed deliberately: this is a product people discover
 * through assistants as much as through search. Removing an agent from this list
 * is how you opt out later.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "*",
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "CCBot",
          "PerplexityBot",
          "ClaudeBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
