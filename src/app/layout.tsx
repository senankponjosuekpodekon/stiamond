import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { AnalyticsProvider } from "@/components/analytics";
import { headers } from "next/headers";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";
import "./globals.css";

const messagesMap = { en, fr };

type Locale = "en" | "fr";

async function getLocale(): Promise<Locale> {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") || "";
  const cookieLocale = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("stiamond-locale="))
    ?.split("=")[1] as Locale | undefined;
  if (cookieLocale && cookieLocale in messagesMap) return cookieLocale;

  const acceptLang = headerStore.get("accept-language") || "";
  const browserLang = acceptLang.split(",")[0].trim().split("-")[0].toLowerCase();
  if (browserLang === "fr") return "fr";

  return "en";
}

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = (messagesMap[locale] as Record<string, unknown>).metadata as Record<string, { title: string; description: string }>;
  const site = meta.site;
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  const altLocale = locale === "fr" ? "en_US" : "fr_FR";

  return {
    metadataBase: new URL("https://stiamond.net"),
    title: {
      default: site.title,
      template: `%s — Stiamond`,
    },
    description: site.description,
    keywords: [
      "AI engineering",
      "software development",
      "cloud infrastructure",
      "automation",
      "digital growth",
      "Stiamond",
      "ingénierie IA",
      "développement logiciel",
      "infrastructure cloud",
      "croissance digitale",
    ],
    authors: [{ name: "Stiamond" }],
    creator: "Stiamond",
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [altLocale],
      url: "https://stiamond.net",
      siteName: "Stiamond",
      title: site.title,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      languages: {
        en: "https://stiamond.net",
        fr: "https://stiamond.net/fr",
        "x-default": "https://stiamond.net",
      },
    },
  };
}

const themeScript = `
(function() {
  const theme = localStorage.getItem('stiamond-theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (theme === 'dark' || (!theme && system)) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = messagesMap[locale];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="alternate" hrefLang="en" href="https://stiamond.net" />
        <link rel="alternate" hrefLang="fr" href="https://stiamond.net/fr" />
        <link rel="alternate" hrefLang="x-default" href="https://stiamond.net" />
      </head>
      <body
        className={cn(
          poppins.variable,
          jetbrainsMono.variable,
          "font-sans antialiased"
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
