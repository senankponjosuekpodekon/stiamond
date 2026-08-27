import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stiamond.net";
  const locales = ["en", "fr"] as const;

  const routes = [
    "",
    "/company",
    "/company/team",
    "/solutions",
    "/solutions/software",
    "/solutions/ai",
    "/solutions/cloud",
    "/solutions/creative",
    "/solutions/growth",
    "/solutions/automation",
    "/products",
    "/industries",
    "/industries/ecommerce",
    "/pricing",
    "/contact",
    "/faq",
    "/docs",
    "/blog",
    "/blog/stiamond-digital-nouvelle-adresse-stiamond-net",
    "/case-studies",
    "/mentorship",
    "/client-portal",
    "/privacy",
    "/terms",
    "/security",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const prefix = locale === "en" ? "" : "/fr";
      const url = `${baseUrl}${prefix}${route}`;

      const alternates: Record<string, string> = {
        en: `${baseUrl}${route}`,
        fr: `${baseUrl}/fr${route}`,
        "x-default": `${baseUrl}${route}`,
      };

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
