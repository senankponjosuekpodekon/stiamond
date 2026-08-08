import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

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
  const t = await getTranslations({ locale, namespace: `metadata.${namespace}` });

  return {
    title: t("title"),
    description: t("description"),
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
      title: t("title"),
      description: t("description"),
    },
  };
}
