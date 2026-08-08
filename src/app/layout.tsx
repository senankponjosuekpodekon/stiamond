import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://stiamond.net"),
  title: {
    default: "Stiamond — AI, Software & Cloud Engineering",
    template: "%s — Stiamond",
  },
  description:
    "Stiamond conçoit des logiciels, des systèmes d'intelligence artificielle et des infrastructures cloud qui accélèrent la croissance des entreprises.",
  keywords: [
    "AI engineering",
    "software development",
    "cloud infrastructure",
    "automation",
    "digital growth",
    "Stiamond",
  ],
  authors: [{ name: "Stiamond" }],
  creator: "Stiamond",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://stiamond.net",
    siteName: "Stiamond",
    title: "Stiamond — AI, Software & Cloud Engineering",
    description:
      "We build AI-powered software, cloud infrastructure and digital growth systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stiamond — AI, Software & Cloud Engineering",
    description:
      "We build AI-powered software, cloud infrastructure and digital growth systems.",
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
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={cn(
          poppins.variable,
          jetbrainsMono.variable,
          "font-sans antialiased"
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
