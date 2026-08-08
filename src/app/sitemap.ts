import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stiamond.net";

  const routes = [
    "",
    "/company",
    "/solutions",
    "/solutions/software",
    "/solutions/ai",
    "/solutions/cloud",
    "/solutions/growth",
    "/products",
    "/industries",
    "/pricing",
    "/contact",
    "/docs",
    "/developers",
    "/blog",
    "/case-studies",
    "/client-portal",
    "/privacy",
    "/terms",
    "/security",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
