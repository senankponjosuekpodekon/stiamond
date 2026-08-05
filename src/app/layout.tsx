import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          jetbrainsMono.variable,
          "font-sans antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
