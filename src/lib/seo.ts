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

  return {
    title: page.title,
    description: page.description,
    alternates: {
      languages: {
        en: "https://stiamond.net",
        fr: "https://stiamond.net/fr",
        "x-default": "https://stiamond.net",
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
