import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { ShieldCheck, Lock, Eye, Bug, FileCheck, Server } from "lucide-react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("security");
}

export default function SecurityPage() {
  const t = useTranslations("security");

  const practices = [
    { icon: Lock, title: t("practices.encryption.title"), description: t("practices.encryption.description") },
    { icon: ShieldCheck, title: t("practices.rbac.title"), description: t("practices.rbac.description") },
    { icon: Eye, title: t("practices.audit.title"), description: t("practices.audit.description") },
    { icon: Bug, title: t("practices.scanning.title"), description: t("practices.scanning.description") },
    { icon: FileCheck, title: t("practices.compliance.title"), description: t("practices.compliance.description") },
    { icon: Server, title: t("practices.infrastructure.title"), description: t("practices.infrastructure.description") },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">{t("overline")}</p>
            <h1 className="mt-3 max-w-3xl text-display">{t("title")}</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <div key={p.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <p.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2 className="mt-4 text-body font-semibold">{p.title}</h2>
                <p className="mt-2 text-body-sm text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20">
        <Container size="md">
          <h2 className="text-h3">{t("disclosure.title")}</h2>
          <p className="mt-4 text-body text-muted-foreground">
            {t("disclosure.body")}{" "}
            <a href="mailto:security@stiamond.net" className="text-primary hover:underline">security@stiamond.net</a>.
            {t("disclosure.commitment")}
          </p>
        </Container>
      </section>
    </>
  );
}
