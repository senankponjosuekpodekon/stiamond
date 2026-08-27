import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { AnalyticsProvider } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import { Providers } from "@/components/providers";
import Script from "next/script";
import "./globals.css";

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
  const t = await getTranslations({ locale, namespace: "metadata.site" });
  const title = t("title");
  const description = t("description");
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  const altLocale = locale === "fr" ? "en_US" : "fr_FR";

  return {
    metadataBase: new URL("https://stiamond.net"),
    verification: {
      google: "x1LHfAoFnYnfk2a8WETx3nd37_MJr9b0c5V-BL60fH8",
    },
    title: {
      default: title,
      template: `%s — Stiamond Digital`,
    },
    description,
    keywords: [
      "AI engineering",
      "software development",
      "cloud infrastructure",
      "automation",
      "digital growth",
      "Stiamond",
      "Stiamond Digital",
      "ingénierie IA",
      "développement logiciel",
      "infrastructure cloud",
      "croissance digitale",
    ],
    authors: [{ name: "Stiamond Digital" }],
    creator: "Stiamond Digital",
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [altLocale],
      url: "https://stiamond.net",
      siteName: "Stiamond Digital",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Stiamond Digital",
  alternateName: "Stiamond",
  url: "https://stiamond.net",
  logo: "https://stiamond.net/icon.svg",
  sameAs: [
    "https://github.com/senankponjosuekpodekon",
    "https://stiamond.net",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressCountry: "BJ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+2290162937964",
    areaServed: ["BJ", "Worldwide"],
    availableLanguage: ["English", "French"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software Engineering",
          description: "Custom software, web platforms, and SaaS products.",
          url: "https://stiamond.net/solutions/software",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Engineering",
          description: "LLM integration, RAG, and AI agents.",
          url: "https://stiamond.net/solutions/ai",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud Infrastructure",
          description: "Scalable cloud architecture, DevOps, and CI/CD.",
          url: "https://stiamond.net/solutions/cloud",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Growth Systems",
          description: "SEO, content, marketing automation, and ads.",
          url: "https://stiamond.net/solutions/growth",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automation",
          description: "Workflow automation and n8n AI agents.",
          url: "https://stiamond.net/solutions/automation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Creative & Content",
          description: "Ad creatives, short videos, and content strategy.",
          url: "https://stiamond.net/solutions/creative",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Stiamond Digital",
  alternateName: "Stiamond",
  url: "https://stiamond.net",
};

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NRRK45V4');`,
          }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VXYL7FDF1P"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VXYL7FDF1P');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRRK45V4" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <Providers>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </Providers>
        <CookieBanner locale={locale} />
      </body>
    </html>
  );
}
