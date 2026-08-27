"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "company", href: "/company" },
  { key: "solutions", href: "/solutions" },
  { key: "products", href: "/products" },
  { key: "industries", href: "/industries" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-sticky w-full border-b border-border bg-background/90 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Stiamond Digital"
                width={28}
                height={28}
                className="rounded-md"
                priority
              />
              <span className="text-body font-semibold tracking-tight">
                Stiamond Digital
              </span>
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-body-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">{t("getStarted")}</Link>
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-surface-1 hover:text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[32rem]" : "max-h-0 border-t-0"
        )}
      >
        <Container>
          <nav className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-body font-medium text-muted-foreground transition-colors hover:bg-surface-1 hover:text-foreground"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-3 py-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
