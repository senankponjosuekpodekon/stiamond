import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Lightbulb, Clock, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("mentorship");
}

export default async function MentorshipPage() {
  const t = await getTranslations("mentorship");

  const offers = [
    {
      icon: Lightbulb,
      name: t("diagnostic.name"),
      tagline: t("diagnostic.tagline"),
      description: t("diagnostic.description"),
      features: t.raw("diagnostic.features") as string[],
      duration: t("diagnostic.duration"),
      price: t("diagnostic.price"),
    },
    {
      icon: Clock,
      name: t("consultation.name"),
      tagline: t("consultation.tagline"),
      description: t("consultation.description"),
      features: t.raw("consultation.features") as string[],
      duration: t("consultation.duration"),
      price: t("consultation.price"),
    },
    {
      icon: GraduationCap,
      name: t("formation.name"),
      tagline: t("formation.tagline"),
      description: t("formation.description"),
      features: t.raw("formation.features") as string[],
      duration: t("formation.duration"),
      price: t("formation.price"),
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
          <div className="grid gap-8 lg:grid-cols-3">
            {offers.map((offer) => (
              <Card key={offer.name} className="group h-full hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <offer.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-6 text-h4 font-bold">{offer.name}</h2>
                  <p className="mt-1 text-body-sm font-medium text-primary">{offer.tagline}</p>
                  <p className="mt-4 text-body text-muted-foreground">{offer.description}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-h3 font-bold">{offer.price}</span>
                    <span className="text-body-sm text-muted-foreground">{offer.duration}</span>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-body-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2">{t("approach.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("approach.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {(t.raw("approach.items") as { title: string; description: string }[]).map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-body font-semibold">{item.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
