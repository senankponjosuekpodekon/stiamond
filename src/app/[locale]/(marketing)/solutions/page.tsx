import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Brain, Cloud, TrendingUp, Zap, Server, Workflow, ArrowRight, Palette, Bot } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("solutions");
}

export default async function SolutionsPage() {
  const t = await getTranslations("solutions");

  const solutions = [
    {
      icon: TrendingUp,
      title: t("growth.title"),
      description: t("growth.subtitle"),
      features: t.raw("features.growth") as string[],
      href: "/solutions/growth",
    },
    {
      icon: Code,
      title: t("software.title"),
      description: t("software.subtitle"),
      features: t.raw("features.software") as string[],
      href: "/solutions/software",
    },
    {
      icon: Bot,
      title: t("automation.title"),
      description: t("automation.subtitle"),
      features: t.raw("automation.capabilities.items") as string[],
      href: "/solutions/automation",
    },
    {
      icon: Palette,
      title: t("creative.title"),
      description: t("creative.subtitle"),
      features: t.raw("creative.capabilities.items") as string[],
      href: "/solutions/creative",
    },
    {
      icon: Brain,
      title: t("ai.title"),
      description: t("ai.subtitle"),
      features: t.raw("features.ai") as string[],
      href: "/solutions/ai",
    },
    {
      icon: Cloud,
      title: t("cloud.title"),
      description: t("cloud.subtitle"),
      features: t.raw("features.cloud") as string[],
      href: "/solutions/cloud",
    },
  ];

  const capabilities = [
    { icon: Zap, title: t("capabilities.automation.title"), description: t("capabilities.automation.description") },
    { icon: Server, title: t("capabilities.apis.title"), description: t("capabilities.apis.description") },
    { icon: Workflow, title: t("capabilities.integration.title"), description: t("capabilities.integration.description") },
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
          <div className="grid gap-6 lg:grid-cols-2">
            {solutions.map((sol) => (
              <Card key={sol.title} className="group h-full hover:border-primary/30 hover:shadow-md">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <sol.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="mt-4 text-h4">{sol.title}</CardTitle>
                  <CardDescription className="mt-2 text-body">{sol.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sol.features.map((f) => (
                      <span key={f} className="rounded-md border border-border bg-surface-1 px-3 py-1 text-caption font-medium text-muted-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link href={sol.href} className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:gap-2.5 transition-all">
                    {t("learnMore")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">{t("capabilities.overline")}</p>
            <h2 className="mt-3 text-h2">{t("capabilities.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("capabilities.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <cap.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-body font-semibold">{cap.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">{t("timelines.overline")}</p>
            <h2 className="mt-3 text-h2">{t("timelines.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("timelines.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(t.raw("timelines.items") as { type: string; duration: string; description: string }[]).map((item) => (
              <div key={item.type} className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="text-h3 font-bold text-primary">{item.duration}</div>
                <div className="mt-2 text-body font-semibold">{item.type}</div>
                <p className="mt-2 text-body-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">{t("quality.overline")}</p>
            <h2 className="mt-3 text-h2">{t("quality.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("quality.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {(t.raw("quality.items") as { title: string; description: string }[]).map((item) => (
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
                  {t("cta.getInTouch")}
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
