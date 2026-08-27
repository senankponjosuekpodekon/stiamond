import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { TestimonialsSection } from "@/components/testimonials-section";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("caseStudies");
}

export default async function CaseStudiesPage() {
  const t = await getTranslations("caseStudies");
  const locale = await getLocale();
  const isFr = locale === "fr";

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

      <section className="border-y border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">
              {isFr ? "Impact" : "Impact"}
            </p>
            <h2 className="mt-3 text-h2">
              {isFr ? "Chiffres à l'échelle" : "Numbers at scale"}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {isFr
                ? "Des résultats concrets sur des projets e-commerce, automatisation et growth."
                : "Concrete results from e-commerce, automation, and growth projects."}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "18+", label: isFr ? "Boutiques e-commerce" : "E-commerce stores" },
              { value: "69+", label: isFr ? "Campagnes publicitaires" : "Ad campaigns" },
              { value: "2-4", label: isFr ? "Semaines de livraison moyenne" : "Average delivery weeks" },
              { value: "1", label: isFr ? "Seul interlocuteur" : "Single point of contact" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="text-h2 font-bold text-primary">{s.value}</div>
                <p className="mt-2 text-body-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      <section className="py-20 md:py-28">
        <Container>
          <div className="mt-16 text-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                {t("startProject")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
