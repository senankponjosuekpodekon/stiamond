"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type Locale = "en" | "fr";

export function LanguageSwitcher({ className }: { className?: string }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith("stiamond-locale="))
      ?.split("=")[1] as Locale | undefined;
    if (stored) setLocale(stored);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    document.cookie = `stiamond-locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  };

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-caption font-medium text-muted-foreground">EN</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded px-1.5 py-0.5 text-caption font-medium transition-colors",
          locale === "en"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        onClick={() => switchLocale("fr")}
        className={cn(
          "rounded px-1.5 py-0.5 text-caption font-medium transition-colors",
          locale === "fr"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        FR
      </button>
    </div>
  );
}
