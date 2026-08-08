import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import { routing } from "./routing";

type Locale = "en" | "fr";

async function detectLocale(): Promise<Locale> {
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

export default getRequestConfig(async () => {
  const locale = await detectLocale();
  const validated = routing.locales.includes(locale)
    ? locale
    : routing.defaultLocale;

  return {
    locale: validated,
    messages: (await import(`../../messages/${validated}.json`)).default as Record<string, unknown>,
  };
});
