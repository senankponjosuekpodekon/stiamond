import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Brain, Zap, Server, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("products");
}

export default function ProductsPage() {
  const t = useTranslations("products");

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
