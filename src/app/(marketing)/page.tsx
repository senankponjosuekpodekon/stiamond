import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getLocaleFromHeaders } from "@/lib/seo";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import {
  Cpu,
  Cloud,
  Code,
  TrendingUp,
  Zap,
  ArrowRight,
  Brain,
  Server,
  Workflow,
  User,
  Layers,
  FlaskConical,
  MessageSquare,
  GraduationCap,
  Banknote,
  Store,
} from "lucide-react";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const isFr = locale === "fr";
  
  return {
    title: isFr
      ? "Stiamond — Studio Web, E-commerce & Automatisation IA"
      : "Stiamond — Web, E-commerce & AI Automation Studio",
    description: isFr
      ? "Stiamond conçoit des sites web, boutiques en ligne, campagnes publicitaires et agents d'automatisation IA pour PME et entrepreneurs. Basé à Cotonou, clients dans le monde entier."
      : "Stiamond builds websites, online stores, ad campaigns, and AI automation agents for SMBs and entrepreneurs. Based in Cotonou, working with clients worldwide.",
    alternates: {
      languages: {
        en: "https://stiamond.net",
        fr: "https://stiamond.net/fr",
        "x-default": "https://stiamond.net",
      },
    },
    openGraph: {
      locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: [isFr ? "en_US" : "fr_FR"],
      title: isFr
        ? "Stiamond — Studio Web, E-commerce & Automatisation IA"
        : "Stiamond — Web, E-commerce & AI Automation Studio",
      description: isFr
        ? "Sites web, boutiques en ligne, campagnes publicitaires et automatisation IA. Une personne couvre développement, design, marketing et automatisation."
        : "Websites, online stores, ad campaigns, and AI automation. One person covering development, design, marketing, and automation.",
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations("home");

  const pillars = [
    {
      icon: Code,
      title: t("pillars.software.title"),
      description: t("pillars.software.description"),
      href: "/solutions/software",
    },
    {
      icon: Brain,
      title: t("pillars.ai.title"),
      description: t("pillars.ai.description"),
      href: "/solutions/ai",
    },
    {
      icon: Cloud,
      title: t("pillars.cloud.title"),
      description: t("pillars.cloud.description"),
      href: "/solutions/cloud",
    },
    {
      icon: TrendingUp,
      title: t("pillars.growth.title"),
      description: t("pillars.growth.description"),
      href: "/solutions/growth",
    },
  ];

  const stats = [
    { value: "18+", label: t("stats.stores") },
    { value: "69+", label: t("stats.campaigns") },
    { value: "Live", label: t("stats.agent") },
    { value: "1", label: t("stats.direct") },
  ];

  const products = [
    { icon: Cpu, name: "MEDIM", description: t("products.medim") },
    { icon: Brain, name: "AI Platform", description: t("products.aiPlatform") },
    { icon: Zap, name: "Automation", description: t("products.automation") },
    { icon: Server, name: "APIs", description: t("products.apis") },
  ];

  const values = [
    { icon: User, title: t("values.security.title"), description: t("values.security.description") },
    { icon: TrendingUp, title: t("values.scale.title"), description: t("values.scale.description") },
    { icon: Layers, title: t("values.composable.title"), description: t("values.composable.description") },
  ];

  const labProjects = [
    { icon: TrendingUp, name: "Trading OS", description: t("lab.tradingOs") },
    { icon: GraduationCap, name: "Learning OS", description: t("lab.learningOs") },
    { icon: MessageSquare, name: "Conversational AI Agent", description: t("lab.conversationalAgent") },
    { icon: Banknote, name: "Banking Platform", description: t("lab.bankingPlatform") },
    { icon: Store, name: "Digital Marketplace", description: t("lab.marketplace") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <Container>
          <div className="flex flex-col items-center py-16 text-center sm:py-20 md:py-32 lg:py-40">
            <FadeIn delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-4 py-1.5 text-caption font-medium text-muted-foreground">
                <span className="flex h-2 w-2 rounded-full bg-accent" />
                {t("badge")}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="max-w-4xl text-display">
                {t.rich("title", {
                  highlight: (chunks) => <span className="text-gradient">{chunks}</span>,
                })}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
                {t("subtitle")}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contact">
                    {t("ctaPrimary")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/solutions">{t("ctaSecondary")}</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface-1/40">
        <Container>
          <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-h2 font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-body-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">
              {t("pillars.overline")}
            </p>
            <h2 className="mt-3 text-h2">{t("pillars.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("pillars.subtitle")}
            </p>
          </div>

          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <Link href={pillar.href}>
                  <Card className="group h-full hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                    <CardHeader>
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                        <pillar.icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="mt-4 text-h5">{pillar.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {pillar.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Products */}
      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">
              {t("products.overline")}
            </p>
            <h2 className="mt-3 text-h2">{t("products.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("products.subtitle")}
            </p>
          </div>

          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <StaggerItem key={product.name}>
                <Card className="group h-full hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <product.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-h5 font-semibold">{product.name}</h3>
                    <p className="mt-2 text-body-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/products">
                {t("products.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-overline font-semibold uppercase text-accent">
                {t("values.overline")}
              </p>
              <h2 className="mt-3 text-h2">{t("values.title")}</h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                {t("values.subtitle")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
              {values.map((value) => (
                <div key={value.title} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <value.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-body font-semibold">{value.title}</h3>
                  <p className="mt-2 text-body-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stiamond Lab — R&D projects */}
      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">
              {t("lab.overline")}
            </p>
            <h2 className="mt-3 text-h2">{t("lab.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("lab.subtitle")}
            </p>
          </div>

          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {labProjects.map((project) => (
              <StaggerItem key={project.name}>
                <Card className="h-full border-dashed">
                  <CardContent className="pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-2 text-muted-foreground">
                      <project.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-h5 font-semibold">{project.name}</h3>
                    <p className="mt-2 text-body-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-caption font-medium text-muted-foreground/60">
                      <FlaskConical className="h-3 w-3" />
                      R&D Internal
                    </span>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container size="md">
          <div className="text-center">
            <p className="text-overline font-semibold uppercase text-accent">
              {t("philosophy.overline")}
            </p>
            <h2 className="mt-3 text-h2">{t("philosophy.title")}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {t("philosophy.subtitle")}
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3">
            {[
              { icon: Cpu, label: t("philosophy.research") },
              { icon: Code, label: t("philosophy.prototypes") },
              { icon: Workflow, label: t("philosophy.services") },
              { icon: TrendingUp, label: t("philosophy.caseStudies") },
              { icon: Zap, label: t("philosophy.productsStep") },
              { icon: Cloud, label: t("philosophy.platform") },
              { icon: Server, label: t("philosophy.ecosystem") },
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <div className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5">
                  <step.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  <span className="text-body-sm font-medium">{step.label}</span>
                </div>
                {i < 6 && (
                  <div className="h-5 w-px bg-border" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link href="/contact">
                  {t("cta.getInTouch")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white/30 text-primary-foreground hover:bg-white/10"
              >
                <Link href="/pricing">{t("cta.viewPricing")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
