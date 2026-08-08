import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Eye, ArrowRight, Heart, Lightbulb, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("company");
}

export default function CompanyPage() {
  const t = useTranslations("company");

  const values = [
    { icon: Lightbulb, title: t("values.innovation.title"), description: t("values.innovation.description") },
    { icon: ShieldCheck, title: t("values.integrity.title"), description: t("values.integrity.description") },
    { icon: Heart, title: t("values.excellence.title"), description: t("values.excellence.description") },
    { icon: Globe, title: t("values.impact.title"), description: t("values.impact.description") },
  ];

  const milestones = [
    { year: t("milestones.m1.year"), title: t("milestones.m1.title"), description: t("milestones.m1.description") },
    { year: t("milestones.m2.year"), title: t("milestones.m2.title"), description: t("milestones.m2.description") },
    { year: t("milestones.m3.year"), title: t("milestones.m3.title"), description: t("milestones.m3.description") },
    { year: t("milestones.m4.year"), title: t("milestones.m4.title"), description: t("milestones.m4.description") },
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
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Target className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-h3">{t("mission.title")}</h2>
              <p className="mt-4 text-body-lg text-muted-foreground">{t("mission.description")}</p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Eye className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-h3">{t("vision.title")}</h2>
              <p className="mt-4 text-body-lg text-muted-foreground">{t("vision.description")}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">{t("values.overline")}</p>
            <h2 className="mt-3 text-h2">{t("values.title")}</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="h-full">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <value.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="mt-4 text-h5">{value.title}</CardTitle>
                  <CardDescription className="mt-2">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">{t("milestones.overline")}</p>
            <h2 className="mt-3 text-h2">{t("milestones.title")}</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <div key={m.title} className="border-l-2 border-primary/20 pl-6">
                <div className="text-h5 font-bold text-primary">{m.year}</div>
                <h3 className="mt-2 text-body font-semibold">{m.title}</h3>
                <p className="mt-1 text-body-sm text-muted-foreground">{m.description}</p>
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
                <Link href="/company/careers">
                  {t("cta.viewCareers")}
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
