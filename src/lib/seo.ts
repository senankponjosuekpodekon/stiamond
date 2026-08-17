import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";

const messagesMap = { en, fr };

type Locale = "en" | "fr";

export async function generatePageMetadata(
  namespace: string
): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const meta = (messagesMap[locale] as Record<string, unknown>).metadata as Record<string, { title: string; description: string }>;
  const page = meta[namespace];

  const routeMap: Record<string, string> = {
    home: "",
    solutions: "/solutions",
    solutionsAi: "/solutions/ai",
    solutionsCloud: "/solutions/cloud",
    solutionsGrowth: "/solutions/growth",
    solutionsSoftware: "/solutions/software",
    products: "/products",
    industries: "/industries",
    pricing: "/pricing",
    company: "/company",
    contact: "/contact",
    caseStudies: "/case-studies",
    clientPortal: "/client-portal",
    blog: "/blog",
    privacy: "/privacy",
    terms: "/terms",
    security: "/security",
    docs: "/docs",
    developers: "/developers",
    faq: "/faq",
    automation: "/solutions/automation",
    creative: "/solutions/creative",
    mentorship: "/mentorship",
  };

  const route = routeMap[namespace] ?? "";

  return {
    title: page.title,
    description: page.description,
    alternates: {
      languages: {
        en: `https://stiamond.net${route}`,
        fr: `https://stiamond.net/fr${route}`,
        "x-default": `https://stiamond.net${route}`,
      },
    },
    openGraph: {
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: [locale === "fr" ? "en_US" : "fr_FR"],
      title: page.title,
      description: page.description,
    },
  };
}
