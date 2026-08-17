import { getTranslations } from "next-intl/server";
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

  const cases = [
    {
      client: t("c1.client"),
      sector: t("c1.sector"),
      title: t("c1.title"),
      summary: t("c1.summary"),
      metrics: [
        { label: t("c1.metrics.speed"), value: t("c1.metrics.speedValue") },
        { label: t("c1.metrics.time"), value: t("c1.metrics.timeValue") },
        { label: t("c1.metrics.compliance"), value: t("c1.metrics.complianceValue") },
      ],
    },
    {
      client: t("c2.client"),
      sector: t("c2.sector"),
      title: t("c2.title"),
      summary: t("c2.summary"),
      metrics: [
        { label: t("c2.metrics.perf"), value: t("c2.metrics.perfValue") },
        { label: t("c2.metrics.downtime"), value: t("c2.metrics.downtimeValue") },
        { label: t("c2.metrics.cost"), value: t("c2.metrics.costValue") },
      ],
    },
    {
      client: t("c3.client"),
      sector: t("c3.sector"),
      title: t("c3.title"),
      summary: t("c3.summary"),
      metrics: [
        { label: t("c3.metrics.traffic"), value: t("c3.metrics.trafficValue") },
        { label: t("c3.metrics.timeline"), value: t("c3.metrics.timelineValue") },
        { label: t("c3.metrics.conversion"), value: t("c3.metrics.conversionValue") },
      ],
    },
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
          <div className="space-y-12">
            {cases.map((c) => (
              <div key={c.title} className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <span className="rounded-md bg-surface-1 px-3 py-1 text-caption font-medium text-muted-foreground">
                    {c.client} · {c.sector}
                  </span>
                  <h2 className="mt-4 text-h3">{c.title}</h2>
                  <p className="mt-4 text-body text-muted-foreground">{c.summary}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border bg-card p-4 text-center lg:text-left">
                      <div className="text-h5 font-bold text-primary">{m.value}</div>
                      <div className="mt-1 text-caption text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
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
