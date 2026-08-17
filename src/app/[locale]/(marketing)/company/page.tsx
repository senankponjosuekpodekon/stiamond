import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Eye, ArrowRight, Heart, Lightbulb, ShieldCheck, Globe, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("company");
}

export default async function CompanyPage() {
  const t = await getTranslations("company");
  const locale = await getLocale();
  const isFr = locale === "fr";

  const values = [
    { icon: Lightbulb, title: t("values.innovation.title"), description: t("values.innovation.description") },
    { icon: ShieldCheck, title: t("values.integrity.title"), description: t("values.integrity.description") },
    { icon: Heart, title: t("values.excellence.title"), description: t("values.excellence.description") },
    { icon: Globe, title: t("values.impact.title"), description: t("values.impact.description") },
  ];

  const milestones = isFr ? [
    { year: "2020—2024", title: "Premiers projets", description: "Construction de sites web, boutiques e-commerce et campagnes publicitaires pour des clients locaux. Développement autodidacte via les CMS." },
    { year: "2024", title: "Epitech Coding Academy", description: "Formalisation des compétences full-stack — React, Vue, Laravel, NestJS et architecture moderne." },
    { year: "2025", title: "Lancement de Stiamond", description: "Fondation de Stiamond avec deux piliers : Core (travail client) et Lab (produits R&D). Premier agent IA livré en production." },
    { year: "2026", title: "Croissance & Expansion", description: "Expansion vers les clients internationaux. Certification Google Marketing, certification Data et Master en cours." },
  ] : [
    { year: "2020—2024", title: "First Projects", description: "Built websites, e-commerce stores, and ad campaigns for local clients. Self-taught development through CMS platforms." },
    { year: "2024", title: "Epitech Coding Academy", description: "Formalized full-stack development skills — React, Vue, Laravel, NestJS, and modern architecture." },
    { year: "2025", title: "Stiamond Launched", description: "Founded Stiamond with two pillars: Core (client work) and Lab (R&D products). First AI agent delivered in production." },
    { year: "2026", title: "Growth & Expansion", description: "Expanding to international clients. Google Marketing certification, Data certification, and Master's degree in progress." },
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

      <section className="border-y border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <User className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-h3">{isFr ? "Rencontrer le fondateur" : "Meet the founder"}</h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                {isFr
                  ? "Stiamond est un studio solo dirigé par Senankpon Josué Kpodekon — développeur full-stack, stratège marketing et expert en automatisation IA. Vous travaillez directement avec la personne qui construit votre projet, pas un account manager."
                  : "Stiamond is a solo studio led by Senankpon Josué Kpodekon — full-stack developer, marketing strategist, and AI automation expert. You work directly with the person who builds your project, not an account manager."}
              </p>
              <div className="mt-8">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/company/team">
                    {isFr ? "Lire l'histoire complète" : "Read the full story"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-h3 font-bold text-primary">18+</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">
                    {isFr ? "Boutiques e-commerce créées" : "E-commerce stores built"}
                  </div>
                </div>
                <div>
                  <div className="text-h3 font-bold text-primary">69+</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">
                    {isFr ? "Campagnes publicitaires gérées" : "Ad campaigns managed"}
                  </div>
                </div>
                <div>
                  <div className="text-h3 font-bold text-primary">6</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">
                    {isFr ? "Piliers : Dev, Auto, Créatif, IA, Growth, Cloud" : "Pillars: Dev, Auto, Creative, AI, Growth, Cloud"}
                  </div>
                </div>
                <div>
                  <div className="text-h3 font-bold text-primary">1</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">
                    {isFr ? "Contact direct — le fondateur" : "Direct contact — the founder"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">
              {isFr ? "Construisons quelque chose ensemble" : "Let's build something together"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              {isFr
                ? "Vous travaillerez directement avec moi, du premier appel à la livraison finale."
                : "You'll work directly with me from first call to final delivery."}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  {isFr ? "Démarrer un projet" : "Start a project"}
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
