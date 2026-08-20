import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Generated, so it can never advertise a page that does not exist.
 *
 * The static file this replaced listed /product, /pricing and two /use-cases
 * routes, none of which were ever built. Four soft 404s handed to Google.
 *
 * Add entries here only when the route exists. As the capability and industry
 * pages land, they go in this array.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
