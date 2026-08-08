import type { Metadata } from "next";
import { headers } from "next/headers";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";

const messagesMap = { en, fr };

type Locale = "en" | "fr";

export async function getLocaleFromHeaders(): Promise<Locale> {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") || "";
  const cookieLocale = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("stiamond-locale="))
    ?.split("=")[1] as Locale | undefined;
  if (cookieLocale === "en" || cookieLocale === "fr") return cookieLocale;

  const acceptLang = headerStore.get("accept-language") || "";
  const browserLang = acceptLang.split(",")[0].trim().split("-")[0].toLowerCase();
  if (browserLang === "fr") return "fr";

  return "en";
}

export async function generatePageMetadata(
  namespace: string
): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
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
