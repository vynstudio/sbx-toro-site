import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://toromovers.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const anchors = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/#services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/#process`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/#areas`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/#reviews`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/#faq`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  // City SEO landing pages — kept indexed, carried over from the prior site.
  const cities = CITIES.map((c) => ({
    url: `${BASE}${c.href}`,
    priority: 0.9 as const,
    changeFrequency: "monthly" as const,
  }));

  return [...anchors, ...cities].map((p) => ({ ...p, lastModified: now }));
}
