import { Link as IntlLink } from "@/i18n/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/container";

export function Footer() {
  const t = useTranslations("footer");

  const footerLinks = [
    {
      title: t("company"),
      links: [
        { label: t("about"), href: "/company" },
        { label: t("pricing"), href: "/pricing" },
        { label: t("contact"), href: "/contact" },
        { label: t("clientPortal"), href: "/client-portal" },
      ],
    },
    {
      title: t("solutions"),
      links: [
        { label: t("softwareEngineering"), href: "/solutions/software" },
        { label: t("automation"), href: "/solutions/automation" },
        { label: t("ai"), href: "/solutions/ai" },
        { label: t("creative"), href: "/solutions/creative" },
        { label: t("cloud"), href: "/solutions/cloud" },
        { label: t("growthSystems"), href: "/solutions/growth" },
      ],
    },
    {
      title: t("products"),
      links: [
        { label: t("allProducts"), href: "/products" },
        { label: t("industries"), href: "/industries" },
      ],
    },
    {
      title: t("resources"),
      links: [
        { label: t("blog"), href: "/blog" },
        { label: t("faq"), href: "/faq" },
        { label: t("mentorship"), href: "/mentorship" },
        { label: t("documentation"), href: "/docs", nonLocale: true },
        { label: t("caseStudies"), href: "/case-studies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface-1/50">
      <Container>
        <div className="py-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <IntlLink href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Stiamond Digital"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-body font-semibold">Stiamond Digital</span>
              </IntlLink>
              <p className="mt-4 max-w-xs text-body-sm text-muted-foreground">
                {t("tagline")}
              </p>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-overline font-semibold uppercase text-muted-foreground">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.nonLocale ? (
                        <Link
                          href={link.href}
                          className="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <IntlLink
                          href={link.href}
                          className="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </IntlLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-caption text-muted-foreground">
              © {new Date().getFullYear()} Stiamond Digital. {t("rights")}
            </p>
            <div className="flex items-center gap-6">
              <IntlLink
                href="/privacy"
                className="text-caption text-muted-foreground hover:text-foreground"
              >
                {t("privacy")}
              </IntlLink>
              <IntlLink
                href="/terms"
                className="text-caption text-muted-foreground hover:text-foreground"
              >
                {t("terms")}
              </IntlLink>
              <IntlLink
                href="/security"
                className="text-caption text-muted-foreground hover:text-foreground"
              >
                {t("security")}
              </IntlLink>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
