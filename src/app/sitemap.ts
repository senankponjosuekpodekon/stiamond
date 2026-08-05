import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stiamond.net";

  const routes = [
    "",
    "/company",
    "/solutions",
    "/services",
    "/products",
    "/industries",
    "/resources",
    "/pricing",
    "/contact",
    "/developers",
    "/case-studies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
