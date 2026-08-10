import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingCart, GraduationCap, Presentation, Banknote, HeartPulse, Building2 } from "lucide-react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("industries");
}

export default async function IndustriesPage() {
  const t = await getTranslations("industries");

  const industries = [
    {
      icon: ShoppingCart,
      title: t("retail.title"),
      description: t("retail.description"),
      useCases: t.raw("retail.useCases") as string[],
    },
    {
      icon: GraduationCap,
      title: t("education.title"),
      description: t("education.description"),
      useCases: t.raw("education.useCases") as string[],
    },
    {
      icon: Presentation,
      title: t("coaching.title"),
      description: t("coaching.description"),
      useCases: t.raw("coaching.useCases") as string[],
    },
    {
      icon: Banknote,
      title: t("finance.title"),
      description: t("finance.description"),
      useCases: t.raw("finance.useCases") as string[],
    },
    {
      icon: HeartPulse,
      title: t("healthcare.title"),
      description: t("healthcare.description"),
      useCases: t.raw("healthcare.useCases") as string[],
    },
    {
      icon: Building2,
      title: t("realEstate.title"),
      description: t("realEstate.description"),
      useCases: t.raw("realEstate.useCases") as string[],
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Card key={industry.title} className="group h-full hover:border-primary/30 hover:shadow-md">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <industry.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="mt-4 text-h5">{industry.title}</CardTitle>
                  <CardDescription className="mt-2">{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {industry.useCases.map((uc) => (
                      <span key={uc} className="rounded-md border border-border bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                        {uc}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
