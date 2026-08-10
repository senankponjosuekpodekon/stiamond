"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

type Locale = "en" | "fr";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    startTransition(() => {
      const segments = pathname.split("/").filter(Boolean);
      if (segments[0] === "en" || segments[0] === "fr") {
        segments.shift();
      }
      const pathWithoutLocale = segments.length > 0 ? `/${segments.join("/")}` : "/";
      const newPath = newLocale === "en" ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;
      router.push(newPath);
    });
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={cn(
          "rounded px-1.5 py-0.5 text-caption font-medium transition-colors disabled:opacity-50",
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
        disabled={isPending}
        className={cn(
          "rounded px-1.5 py-0.5 text-caption font-medium transition-colors disabled:opacity-50",
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
