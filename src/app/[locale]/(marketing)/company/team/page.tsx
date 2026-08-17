import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, GraduationCap, Briefcase, Rocket, Mail, Globe, Brain, TrendingUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Fondateur — Senankpon Josué Kpodekon | Stiamond"
      : "Founder — Senankpon Josué Kpodekon | Stiamond",
    description: isFr
      ? "Développeur full-stack, stratège marketing et expert en automatisation IA. Basé à Cotonou, travaille avec des clients dans le monde entier."
      : "Full-stack developer, marketing strategist, and AI automation expert. Based in Cotonou, working with clients worldwide.",
    alternates: {
      languages: {
        en: "https://stiamond.net/company/team",
        fr: "https://stiamond.net/fr/company/team",
        "x-default": "https://stiamond.net/company/team",
      },
    },
  };
}

export default async function TeamPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";

  const journey = isFr ? [
    {
      icon: GraduationCap,
      title: "Parcours académique",
      items: [
        "Licence en Économie Appliquée",
        "Licence en Linguistique Anglaise",
        "Développement Full-Stack — Epitech Coding Academy",
        "Certification Google Marketing (en cours)",
        "Certification Data Analytics (planifiée)",
        "Master en cours (IAE Lille ou Paris-Saclay)",
      ],
    },
    {
      icon: Code,
      title: "Expertise technique",
      items: [
        "Frontend : React, Vue.js, Next.js, TailwindCSS, Flutter",
        "Backend : Laravel, NestJS, Node.js, PostgreSQL",
        "CMS : WordPress, Shopify, WooCommerce (18+ boutiques)",
        "DevOps : CI/CD, gestion VPS, déploiement Cloudflare",
        "IA & Automatisation : agents n8n, orchestration de workflows",
      ],
    },
    {
      icon: TrendingUp,
      title: "Marketing & Croissance",
      items: [
        "69+ campagnes publicitaires gérées (Meta, Google, TikTok)",
        "SEO engineering et optimisation de conversion",
        "Funnels Systeme.io et automatisation email",
        "Stratégie de contenu et production créative",
        "Analytics : Google Analytics, Search Console, Merchant Center",
      ],
    },
    {
      icon: Rocket,
      title: "Projets R&D (Stiamond Lab)",
      items: [
        "Trading OS — génération de signaux IA sur tous les marchés",
        "Learning OS — plateforme d'apprentissage adaptative",
        "Agent IA conversationnel pour le service client",
        "Plateforme bancaire (transactions, cartes, tontines)",
        "Marketplace de produits digitaux",
      ],
    },
    {
      icon: Briefcase,
      title: "Gestion de projet & Leadership",
      items: [
        "Gestion de projet IT — planification, coordination, livraison",
        "Conseil DSI / CIO — stratégie technique pour entreprises en croissance",
        "Lead Tech — coordination d'équipe, code review, décisions d'architecture",
        "Gestion de prestataires — sélection et coordination de fournisseurs externes",
        "Méthodologie Agile — sprints, rétros et livraison continue",
      ],
    },
  ] : [
    {
      icon: GraduationCap,
      title: "Academic Background",
      items: [
        "Bachelor's in Applied Economics",
        "Bachelor's in English Linguistics",
        "Full-Stack Development — Epitech Coding Academy",
        "Google Marketing Certification (in progress)",
        "Data Analytics Certification (planned)",
        "Master's degree in progress (IAE Lille or Paris-Saclay)",
      ],
    },
    {
      icon: Code,
      title: "Technical Expertise",
      items: [
        "Frontend: React, Vue.js, Next.js, TailwindCSS, Flutter",
        "Backend: Laravel, NestJS, Node.js, PostgreSQL",
        "CMS: WordPress, Shopify, WooCommerce (18+ stores built)",
        "DevOps: CI/CD, VPS management, Cloudflare deployment",
        "AI & Automation: n8n agents, workflow orchestration",
      ],
    },
    {
      icon: TrendingUp,
      title: "Marketing & Growth",
      items: [
        "69+ ad campaigns managed (Meta, Google, TikTok)",
        "SEO engineering and conversion optimization",
        "Systeme.io funnels and email automation",
        "Content strategy and creative production",
        "Analytics: Google Analytics, Search Console, Merchant Center",
      ],
    },
    {
      icon: Rocket,
      title: "R&D Projects (Stiamond Lab)",
      items: [
        "Trading OS — AI signal generation across all markets",
        "Learning OS — adaptive learning platform",
        "Conversational AI agent for customer service",
        "Banking platform (transactions, cards, tontines)",
        "Digital product marketplace",
      ],
    },
    {
      icon: Briefcase,
      title: "Project Management & Leadership",
      items: [
        "IT project management — planning, coordination, delivery",
        "DSI / CIO advisory — technical strategy for growing businesses",
        "Lead Tech — team coordination, code review, architecture decisions",
        "Vendor management — selecting and coordinating external providers",
        "Agile methodology — sprints, retros, and continuous delivery",
      ],
    },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">
              {isFr ? "Fondateur" : "Founder"}
            </p>
            <h1 className="mt-3 max-w-3xl text-display">Senankpon Josué Kpodekon</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {isFr
                ? "Développeur full-stack, stratège marketing et expert en automatisation IA. Basé à Cotonou, Bénin — travaille avec des clients francophones et anglophones dans le monde entier."
                : "Full-stack developer, marketing strategist, and AI automation expert. Based in Cotonou, Benin — working with French and English-speaking clients worldwide."}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Profile card */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-h2 font-bold">JK</span>
                  </div>
                  <h2 className="mt-6 text-center text-h4 font-bold">Josué Kpodekon</h2>
                  <p className="mt-1 text-center text-body-sm text-muted-foreground">
                    {isFr ? "Fondateur & Lead Engineer" : "Founder & Lead Engineer"}
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
                      <Globe className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      {isFr ? "Cotonou, Bénin · Télétravail mondial" : "Cotonou, Benin · Remote worldwide"}
                    </div>
                    <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      {isFr ? "18+ boutiques e-commerce · 69+ campagnes pub" : "18+ e-commerce stores · 69+ ad campaigns"}
                    </div>
                    <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
                      <Brain className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      {isFr ? "Agents IA en production (n8n)" : "AI agents in production (n8n)"}
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/contact">
                        <Mail className="h-4 w-4" />
                        {isFr ? "Me contacter" : "Get in touch"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <h2 className="text-h3">{isFr ? "L'histoire" : "The story"}</h2>
              <div className="mt-6 space-y-4 text-body-lg text-muted-foreground">
                {isFr ? (
                  <>
                    <p>
                      {"J'ai commencé à construire des sites web avec des CMS bien avant toute formation formelle. Ce qui a commencé par de la curiosité s'est transformé en métier — puis en carrière."}
                    </p>
                    <p>
                      {"Après des licences en Économie Appliquée et en Linguistique Anglaise, j'ai rejoint Epitech Coding Academy pour formaliser mes compétences en développement full-stack. La combinaison d'économie, de linguistique et d'ingénierie logicielle m'a donné un angle unique : je ne me contente pas de construire des logiciels — je comprends la logique business derrière et l'audience qu'ils servent."}
                    </p>
                    <p>
                      {"Aujourd'hui, Stiamond est un studio solo qui couvre ce que la plupart des agences répartissent sur 3-4 personnes : "}
                      <strong className="text-foreground">{"développement, design, marketing, automatisation IA et gestion de projet IT"}</strong>
                      {". Vous travaillez directement avec moi — pas un account manager junior. J'assure également des rôles de conseil DSI (CIO) et Lead Tech pour les entreprises qui ont besoin de leadership technique sans un recrutement à temps plein."}
                    </p>
                    <p>
                      {"Je prépare actuellement une certification Google Marketing, puis une certification Data Analytics, et un Master (IAE Lille ou Paris-Saclay) en cours. L'apprentissage continu n'est pas un slogan — c'est le mode de fonctionnement."}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      I started building websites with CMS platforms long before formal training.
                      What began as curiosity turned into a craft — and then into a career.
                    </p>
                    <p>
                      After earning bachelor&apos;s degrees in Applied Economics and English Linguistics,
                      I joined Epitech Coding Academy to formalize my full-stack development skills.
                      The combination of economics, linguistics, and software engineering gave me a
                      unique angle: I don&apos;t just build software — I understand the business logic behind it
                      and the audience it serves.
                    </p>
                    <p>
                      Today, Stiamond is a solo studio that covers what most agencies split across 3-4 people:
                      <strong className="text-foreground"> development, design, marketing, AI automation, and IT project management</strong>.
                      You work directly with me — not a junior account manager. I also take on DSI (CIO) advisory
                      and Lead Tech roles for businesses that need technical leadership without a full-time hire.
                    </p>
                    <p>
                      I&apos;m currently pursuing a Google Marketing certification, with a Data Analytics
                      certification next, and a Master&apos;s degree (IAE Lille or Paris-Saclay) in progress.
                      Continuous learning isn&apos;t a slogan — it&apos;s the workflow.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 rounded-lg border border-border bg-surface-1/40 p-6">
                <p className="text-body font-medium">
                  {isFr
                    ? "« Une seule personne qui couvre développement, créatif, marketing et automatisation. C'est la différence — et c'est pourquoi les clients travaillent directement avec moi. »"
                    : "\u201cOne person who covers development, creative, marketing, and automation. That's the difference — and it's why clients work with me directly.\u201d"}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">
              {isFr ? "Expertise" : "Expertise"}
            </p>
            <h2 className="mt-3 text-h2">
              {isFr ? "Ce que j'apporte" : "What I bring to the table"}
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {journey.map((area) => (
              <Card key={area.title} className="h-full">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <area.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-h5 font-semibold">{area.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-body-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
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
            <h2 className="text-h2 text-primary-foreground">
              {isFr ? "Construisons quelque chose ensemble" : "Let's build something together"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              {isFr
                ? "Vous travaillerez directement avec moi, du premier appel à la livraison finale."
                : "You'll work directly with me from first call to final delivery."}
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  {isFr ? "Démarrer un projet" : "Start a project"}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
