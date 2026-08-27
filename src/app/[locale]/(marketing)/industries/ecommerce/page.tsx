import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, TrendingUp, Megaphone, Bot, Mail, CreditCard, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "E-commerce — Stiamond"
      : "E-commerce — Stiamond",
    description: isFr
      ? "Boutiques Shopify et WooCommerce, publicités Meta/Google/TikTok, Google Merchant Center et agents IA pour le service client. 18+ boutiques livrées."
      : "Shopify and WooCommerce stores, Meta/Google/TikTok ads, Google Merchant Center, and AI customer service agents. 18+ stores delivered.",
    alternates: {
      languages: {
        en: "https://stiamond.net/industries/ecommerce",
        fr: "https://stiamond.net/fr/industries/ecommerce",
        "x-default": "https://stiamond.net/industries/ecommerce",
      },
    },
  };
}

export default async function EcommercePage() {
  const locale = await getLocale();
  const isFr = locale === "fr";

  const stats = isFr
    ? [
        { value: "18+", label: "Boutiques e-commerce livrées" },
        { value: "69+", label: "Campagnes publicitaires gérées" },
        { value: "2-4", label: "Semaines pour une boutique" },
        { value: "1", label: "Seul interlocuteur du début à la fin" },
      ]
    : [
        { value: "18+", label: "E-commerce stores delivered" },
        { value: "69+", label: "Ad campaigns managed" },
        { value: "2-4", label: "Weeks for a full store" },
        { value: "1", label: "Single point of contact" },
      ];

  const useCases = isFr
    ? [
        {
          icon: ShoppingBag,
          title: "Setup Shopify & WooCommerce",
          description: "Boutique clé en main : produits, paiements, livraison, analytics, SEO produit.",
        },
        {
          icon: Megaphone,
          title: "Campagnes Meta, Google, TikTok",
          description: "Structure de campagnes, ciblage, créatifs et optimisation continue.",
        },
        {
          icon: CreditCard,
          title: "Google Merchant Center",
          description: "Flux produits, Shopping, Performance Max pour e-commerce.",
        },
        {
          icon: Bot,
          title: "Agent IA service client",
          description: "Réponses automatiques 24/7, relances et FAQ via n8n connecté à votre boutique.",
        },
      ]
    : [
        {
          icon: ShoppingBag,
          title: "Shopify & WooCommerce Setup",
          description: "Full store build: products, payments, shipping, analytics, product SEO.",
        },
        {
          icon: Megaphone,
          title: "Meta, Google & TikTok Campaigns",
          description: "Campaign structure, targeting, creative, and ongoing optimization.",
        },
        {
          icon: CreditCard,
          title: "Google Merchant Center",
          description: "Product feeds, Shopping, and Performance Max for e-commerce.",
        },
        {
          icon: Bot,
          title: "AI Customer Service Agent",
          description: "24/7 automated replies, follow-ups, and FAQ via n8n connected to your store.",
        },
      ];

  const process = isFr
    ? [
        { step: "01", title: "Audit", desc: "Boutique, concurrence, mots-clés, opportunités." },
        { step: "02", title: "Setup", desc: "Choix de la stack, import, design, paiements." },
        { step: "03", title: "Lancement", desc: "Tests, SEO, campagnes, mise en ligne." },
        { step: "04", title: "Scale", desc: "Optimisation conversion, ads, automatisation." },
      ]
    : [
        { step: "01", title: "Audit", desc: "Store, competition, keywords, opportunities." },
        { step: "02", title: "Setup", desc: "Stack choice, import, design, payments." },
        { step: "03", title: "Launch", desc: "Testing, SEO, campaigns, go-live." },
        { step: "04", title: "Scale", desc: "Conversion optimization, ads, automation." },
      ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">
              {isFr ? "Industrie" : "Industry"}
            </p>
            <h1 className="mt-3 max-w-3xl text-display">
              {isFr
                ? "E-commerce : boutiques, publicités et agents IA"
                : "E-commerce: stores, ads, and AI agents"}
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {isFr
                ? "Shopify, WooCommerce, Meta/Google/TikTok, Google Merchant Center et agents IA. Vous travaillez avec une seule personne du setup à la croissance."
                : "Shopify, WooCommerce, Meta/Google/TikTok, Google Merchant Center, and AI agents. Work with one person from setup to scale."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  {isFr ? "Démarrer un projet e-commerce" : "Start an e-commerce project"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">{isFr ? "Voir les tarifs" : "See pricing"}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
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
            <p className="text-overline font-semibold uppercase text-accent">
              {isFr ? "Ce que je livre" : "What I deliver"}
            </p>
            <h2 className="mt-3 text-h2">
              {isFr ? "Un seul interlocuteur pour toute la chaîne" : "One contact for the full chain"}
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <Card key={uc.title} className="h-full">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <uc.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-h5 font-semibold">{uc.title}</h3>
                  <p className="mt-2 text-body text-muted-foreground">{uc.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">
              {isFr ? "Processus" : "Process"}
            </p>
            <h2 className="mt-3 text-h2">
              {isFr ? "De l'audit à la croissance en 4 étapes" : "From audit to growth in 4 steps"}
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.step} className="relative rounded-lg border border-border bg-card p-6">
                <span className="text-overline font-bold text-primary">{p.step}</span>
                <h3 className="mt-2 text-h5 font-semibold">{p.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">
              {isFr ? "Voyez les résultats" : "See the results"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              {isFr
                ? "Lisez les retours de clients sur des boutiques, des refontes et des campagnes."
                : "Read client feedback on stores, redesigns, and ad campaigns."}
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/case-studies">
                  {isFr ? "Voir les témoignages" : "See testimonials"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
