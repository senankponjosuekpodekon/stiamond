import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Bot,
  ShoppingBag,
  Megaphone,
  Cloud,
  UserCog,
  ArrowRight,
  Globe,
  Check,
  Mail,
} from "lucide-react";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isFr = locale === "fr";
  return {
    title: isFr ? "Partenariats & Marque Blanche — Stiamond" : "Partnerships & White-Label — Stiamond",
    description: isFr
      ? "Partenaire de livraison fiable pour agences, studios de dev et marques e-commerce. Développement, IA, cloud et publicité en marque blanche."
      : "Reliable delivery partner for agencies, dev studios and e-commerce brands. White-label development, AI, cloud and advertising.",
    robots: { index: false, follow: false },
  };
}

export default async function PartnersPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";

  const t = {
    en: {
      overline: "Partnerships",
      title: "A reliable white-label partner",
      subtitle:
        "For agencies, dev studios and e-commerce brands that need a trusted delivery arm without hiring a team.",
      cta: "Book a call",
      emailCta: "Email hello@stiamond.net",
      whyTitle: "Why work with Stiamond",
      whySubtitle: "One point of contact. Deep technical, marketing and creative coverage.",
      offersTitle: "What we can deliver under your brand",
      proofTitle: "Proof of work",
      proofSubtitle: "Real projects, real clients, real results.",
      stats: [
        { value: "18+", label: "E-commerce stores" },
        { value: "69+", label: "Ad campaigns" },
        { value: "2-4", label: "Weeks average delivery" },
        { value: "1", label: "Single point of contact" },
      ],
      reasons: [
        "Bilingual FR / EN",
        "No handoff delays",
        "Code, design, ads and automation by one person",
        "Clear weekly reporting",
        "Wise / international billing",
      ],
      offers: [
        { icon: Code, title: "White-Label Web Dev", desc: "Custom sites, SaaS and web apps shipped under your agency brand." },
        { icon: Bot, title: "White-Label AI Automation", desc: "n8n agents for customer service, social and internal workflows." },
        { icon: ShoppingBag, title: "White-Label E-commerce", desc: "Shopify / WooCommerce builds, feeds and campaign setups." },
        { icon: Megaphone, title: "White-Label Funnels & Ads", desc: "Systeme.io funnels, Meta/Google/TikTok campaigns and creatives." },
        { icon: Cloud, title: "White-Label Cloud & DevOps", desc: "CI/CD, deployment, Cloudflare and monitoring for your clients." },
        { icon: UserCog, title: "Fractional Lead Tech", desc: "Part-time technical lead for your client projects and teams." },
      ],
    },
    fr: {
      overline: "Partenariats",
      title: "Un partenaire en marque blanche fiable",
      subtitle:
        "Pour agences, studios de dev et marques e-commerce qui ont besoin d'une ressource de livraison de confiance sans recruter une équipe.",
      cta: "Réserver un appel",
      emailCta: "Envoyer un email à hello@stiamond.net",
      whyTitle: "Pourquoi travailler avec Stiamond",
      whySubtitle: "Un seul interlocuteur. Couverture technique, marketing et créative.",
      offersTitle: "Ce qu'on peut livrer sous votre marque",
      proofTitle: "Preuves concrètes",
      proofSubtitle: "Vrais projets, vrais clients, vrais résultats.",
      stats: [
        { value: "18+", label: "Boutiques e-commerce" },
        { value: "69+", label: "Campagnes publicitaires" },
        { value: "2-4", label: "Semaines de livraison moyenne" },
        { value: "1", label: "Seul interlocuteur" },
      ],
      reasons: [
        "Bilingue FR / EN",
        "Pas de perte de temps en transfert",
        "Code, design, pub et automation par la même personne",
        "Reporting hebdomadaire clair",
        "Facturation Wise / internationale",
      ],
      offers: [
        { icon: Code, title: "Web Dev en Marque Blanche", desc: "Sites, SaaS et applications web livrés sous la marque de votre agence." },
        { icon: Bot, title: "Automatisation IA en Marque Blanche", desc: "Agents n8n pour service client, réseaux sociaux et workflows internes." },
        { icon: ShoppingBag, title: "E-commerce en Marque Blanche", desc: "Boutiques Shopify / WooCommerce, flux et campagnes pour vos clients." },
        { icon: Megaphone, title: "Funnels & Pub en Marque Blanche", desc: "Funnels Systeme.io, campagnes Meta/Google/TikTok et créatifs." },
        { icon: Cloud, title: "Cloud & DevOps en Marque Blanche", desc: "CI/CD, déploiement, Cloudflare et monitoring pour vos clients." },
        { icon: UserCog, title: "Lead Tech Fractionnaire", desc: "Lead technique à temps partiel pour vos projets et équipes clients." },
      ],
    },
  }[isFr ? "fr" : "en"];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">{t.overline}</p>
            <h1 className="mt-3 max-w-3xl text-display">{t.title}</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">{t.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="mailto:hello@stiamond.net">
                  {t.emailCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://calendly.com/stiamond" target="_blank" rel="noopener noreferrer">
                  {t.cta}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="text-h2 font-bold text-primary">{s.value}</div>
                <p className="mt-2 text-body-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2">{t.offersTitle}</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.offers.map((o) => (
              <Card key={o.title} className="h-full">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <o.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-h5 font-semibold">{o.title}</h3>
                  <p className="mt-2 text-body text-muted-foreground">{o.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">{t.whyTitle}</p>
            <h2 className="mt-3 text-h2">{t.whyTitle}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">{t.whySubtitle}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {t.reasons.map((r) => (
              <div key={r} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </div>
                <span className="text-body text-muted-foreground">{r}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">
              {isFr ? "Discutons de votre premier projet ensemble" : "Let's talk about your first project together"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              {isFr
                ? "Pas de catalogue public. On définit un modèle de partenariat adapté à votre agence."
                : "No public catalog. We define a partnership model that fits your agency."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <a href="mailto:hello@stiamond.net">
                  <Mail className="mr-2 h-4 w-4" />
                  {t.emailCta}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <a href="https://calendly.com/stiamond" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  {t.cta}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
