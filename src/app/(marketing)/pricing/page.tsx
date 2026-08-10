import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("pricing");
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  const plans = [
    {
      name: t("plans.starter.name"),
      description: t("plans.starter.description"),
      price: t("plans.starter.price"),
      period: t("plans.starter.period"),
      features: t.raw("plans.starter.features") as string[],
      cta: t("plans.starter.cta"),
      popular: false,
    },
    {
      name: t("plans.growth.name"),
      description: t("plans.growth.description"),
      price: t("plans.growth.price"),
      period: t("plans.growth.period"),
      features: t.raw("plans.growth.features") as string[],
      cta: t("plans.growth.cta"),
      popular: true,
    },
    {
      name: t("plans.enterprise.name"),
      description: t("plans.enterprise.description"),
      price: t("plans.enterprise.price"),
      period: t("plans.enterprise.period"),
      features: t.raw("plans.enterprise.features") as string[],
      cta: t("plans.enterprise.cta"),
      popular: false,
    },
  ];

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28 text-center">
            <p className="text-overline font-semibold uppercase text-accent">{t("overline")}</p>
            <h1 className="mt-3 text-display">{t("title")}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-8 ${
                  plan.popular
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-caption font-medium text-primary-foreground">
                    {t("popular")}
                  </span>
                )}
                <h2 className="text-h5 font-semibold">{plan.name}</h2>
                <p className="mt-2 text-body-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-h2 font-bold">{plan.price}</span>
                  <span className="text-body-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </div>
                      <span className="text-body-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  size="lg"
                  asChild
                  className="mt-8 w-full"
                >
                  <Link href="/contact">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Wise badge */}
      <section className="border-y border-border bg-surface-1/40 py-12">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <Globe className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-body font-semibold">International payments via Wise</h3>
              <p className="mt-1 text-body-sm text-muted-foreground">
                USD · EUR · GBP · CAD accepted. Local payments via mobile money or bank transfer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container size="md">
          <h2 className="text-h3">{t("faq.title")}</h2>
          <div className="mt-8 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-body font-semibold">{faq.q}</h3>
                <p className="mt-2 text-body text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
