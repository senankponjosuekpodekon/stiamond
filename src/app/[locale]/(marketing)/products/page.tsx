import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Brain, Zap, Server, TrendingUp, GraduationCap, MessageSquare, Banknote, Store, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("products");
}

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const homeT = await getTranslations("home");

  const labProjects = [
    { icon: TrendingUp, name: "Trading OS", description: homeT("lab.tradingOs") },
    { icon: GraduationCap, name: "Learning OS", description: homeT("lab.learningOs") },
    { icon: MessageSquare, name: "Conversational AI Agent", description: homeT("lab.conversationalAgent") },
    { icon: Banknote, name: "Banking Platform", description: homeT("lab.bankingPlatform") },
    { icon: Store, name: "Digital Marketplace", description: homeT("lab.marketplace") },
  ];

  const products = [
    {
      icon: Zap,
      name: "Automation",
      tagline: t("automation.tagline"),
      description: t("automation.description"),
      features: t.raw("automation.features") as string[],
      status: t("status.live"),
    },
    {
      icon: Cpu,
      name: "MEDIM",
      tagline: t("medim.tagline"),
      description: t("medim.description"),
      features: t.raw("medim.features") as string[],
      status: t("status.inDevelopment"),
    },
    {
      icon: Brain,
      name: "AI Platform",
      tagline: t("aiPlatform.tagline"),
      description: t("aiPlatform.description"),
      features: t.raw("aiPlatform.features") as string[],
      status: t("status.inDevelopment"),
    },
    {
      icon: Server,
      name: "APIs",
      tagline: t("apis.tagline"),
      description: t("apis.description"),
      features: t.raw("apis.features") as string[],
      status: t("status.planned"),
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
          <div className="grid gap-8 lg:grid-cols-2">
            {products.map((product) => (
              <Card key={product.name} className="group h-full overflow-hidden hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <product.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="rounded-full border border-border bg-surface-1 px-3 py-1 text-caption font-medium text-muted-foreground">
                      {product.status}
                    </span>
                  </div>
                  <h2 className="mt-6 text-h4 font-bold">{product.name}</h2>
                  <p className="mt-1 text-body-sm font-medium text-primary">{product.tagline}</p>
                  <p className="mt-4 text-body text-muted-foreground">{product.description}</p>
                  <ul className="mt-6 space-y-2">
                    {product.features.map((f) => (
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
            <p className="text-overline font-semibold uppercase text-accent">{homeT("lab.overline")}</p>
            <h2 className="mt-3 text-h2">{homeT("lab.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">{homeT("lab.subtitle")}</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {labProjects.map((project) => (
              <Card key={project.name} className="h-full border-dashed">
                <CardContent className="pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <project.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-h5 font-bold">{project.name}</h3>
                  <p className="mt-2 text-body text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
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
                  {t("cta.requestAccess")}
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
