"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner({ locale }: { locale: string }) {
  const [consent, setConsent] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== "undefined" ? localStorage.getItem("stiamond-cookie-consent") : null;
    setConsent(stored);
  }, []);

  const accept = () => {
    localStorage.setItem("stiamond-cookie-consent", "accepted");
    setConsent("accepted");
  };

  const decline = () => {
    localStorage.setItem("stiamond-cookie-consent", "declined");
    setConsent("declined");
  };

  if (!mounted || consent !== null) return null;

  const isFr = locale === "fr";

  return (
    <div
      role="dialog"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-body-sm text-muted-foreground">
          {isFr
            ? "Nous utilisons des cookies pour l'analyse et l'amélioration du site."
            : "We use cookies for analytics and to improve the site."}{" "}
          <Link
            href={`/${locale}/cookie-policy`}
            className="text-primary underline hover:text-foreground"
          >
            {isFr ? "Politique de cookies" : "Cookie Policy"}
          </Link>
          .
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={decline}
            className="rounded-md border border-border px-4 py-2 text-body-sm font-medium transition-colors hover:bg-surface-1"
          >
            {isFr ? "Refuser" : "Decline"}
          </button>
          <button
            onClick={accept}
            className="rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isFr ? "Accepter" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
