import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "FAQ — Questions fréquentes | Stiamond"
      : "FAQ — Frequently Asked Questions | Stiamond",
    description: isFr
      ? "Questions courantes sur le travail avec Stiamond : clients internationaux, méthodes de paiement, délais de projet et mode de collaboration."
      : "Common questions about working with Stiamond: international clients, payment methods, project timelines, and how we work.",
    alternates: {
      languages: {
        en: "https://stiamond.net/faq",
        fr: "https://stiamond.net/fr/faq",
        "x-default": "https://stiamond.net/faq",
      },
    },
  };
}

export default async function FAQPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";

  const faqs = isFr ? [
    {
      q: "Travaillez-vous avec des clients hors du Bénin ?",
      a: "Oui. Je travaille avec des clients francophones et anglophones partout dans le monde — à distance. Basé à Cotonou (UTC+1), je suis bien positionné pour les fuseaux horaires européens (1-2h de décalage) et disponible pour les clients US/Canada avec des appels planifiés.",
    },
    {
      q: "Quels moyens de paiement acceptez-vous ?",
      a: "Paiements internationaux via Wise (USD, EUR, GBP, CAD acceptés). Les clients locaux peuvent payer par mobile money ou virement bancaire. Le paiement est généralement divisé : 50% à l'avance, 50% à la livraison, ou par étapes pour les projets plus importants.",
    },
    {
      q: "Proposez-vous des échéanciers de paiement ?",
      a: "Oui. Pour les projets supérieurs à 3 000$, j'propose un paiement par étapes (ex. 30% à l'avance, 40% à mi-parcours, 30% à la livraison). Des abonnements mensuels sont également disponibles pour le travail continu comme la gestion publicitaire ou la maintenance.",
    },
    {
      q: "Combien de temps prend un projet typique ?",
      a: "Cela dépend du périmètre : une landing page prend 1-2 semaines, une boutique e-commerce 2-4 semaines, une application web sur mesure 3-6 semaines, et un agent d'automatisation IA 2-4 semaines. Vous aurez un calendrier clair avant de commencer.",
    },
    {
      q: "Travaillez-vous seul ou avec une équipe ?",
      a: "Je travaille seul pour l'instant — et c'est un avantage pour vous. Vous communiquez directement avec la personne qui construit votre projet, pas un account manager. Au fur et à mesure que le volume augmente, je prévois d'intégrer des développeurs freelance pour l'exécution pendant que je gère la stratégie et les relations clients.",
    },
    {
      q: "Quelles technologies utilisez-vous ?",
      a: "Frontend : React, Vue.js, Next.js, TailwindCSS, Flutter. Backend : Laravel, NestJS, Node.js, PostgreSQL. CMS : WordPress, Shopify, WooCommerce. Automatisation : n8n, Systeme.io. Déploiement : Cloudflare, VPS, pipelines CI/CD.",
    },
    {
      q: "Pouvez-vous gérer mes campagnes publicitaires ?",
      a: "Oui. J'ai géré 69+ campagnes publicitaires sur Meta (Facebook/Instagram), Google et TikTok. Cela inclut la production créative, le ciblage d'audience, l'optimisation du budget et le reporting de performance.",
    },
    {
      q: "Qu'est-ce qu'un agent IA n8n ?",
      a: "Un agent n8n est un workflow d'automatisation propulsé par l'IA. Il peut gérer le service client 24h/24, gérer la publication et l'engagement sur les réseaux sociaux, automatiser des processus métier et connecter plus de 200 outils. J'ai un agent en production pour une vraie marque e-commerce.",
    },
    {
      q: "Construisez-vous des funnels Systeme.io ?",
      a: "Oui. Je construis des tunnels de vente complets sur Systeme.io — landing pages, séquences email, intégration de paiement et automatisation. Idéal pour les coachs, formateurs et entrepreneurs digitaux qui veulent vendre des formations ou services en ligne.",
    },
    {
      q: "Quelle est la différence entre Core et Lab ?",
      a: "Core correspond à ce que je livre aux clients aujourd'hui — sites web, boutiques, campagnes publicitaires, agents d'automatisation. Lab est où je construis mes propres produits en R&D — comme un système de trading, une plateforme d'apprentissage et une plateforme bancaire. Les projets Lab ne sont pas encore disponibles comme services clients.",
    },
    {
      q: "Offrez-vous de la maintenance après le projet ?",
      a: "Oui. J'propose des abonnements de maintenance mensuels pour les mises à jour, correctifs de sécurité, surveillance des performances et petites modifications. C'est optionnel — vous n'êtes jamais bloqué.",
    },
    {
      q: "Comment commence-t-on ?",
      a: "Simple : envoyez un message via le formulaire de contact ou le chat. Parlez-moi de votre projet, de votre calendrier et de votre budget. Je réponds sous 24h avec les prochaines étapes, et on planifie un appel si nécessaire.",
    },
  ] : [
    {
      q: "Do you work with clients outside Benin?",
      a: "Yes. I work with French and English-speaking clients worldwide — remotely. Based in Cotonou (UTC+1), I'm well-positioned for European time zones (1-2h difference) and available for US/Canada clients with scheduled calls.",
    },
    {
      q: "What payment methods do you accept?",
      a: "International payments via Wise (USD, EUR, GBP, CAD accepted). Local clients can pay via mobile money or bank transfer. Payment is typically split: 50% upfront, 50% on delivery, or milestone-based for larger projects.",
    },
    {
      q: "Do you offer payment plans?",
      a: "Yes. For projects above $3,000, I offer milestone-based payments (e.g., 30% upfront, 40% at midpoint, 30% on delivery). Monthly retainers are also available for ongoing work like ad management or maintenance.",
    },
    {
      q: "How long does a typical project take?",
      a: "It depends on scope: a landing page takes 1-2 weeks, an e-commerce store 2-4 weeks, a custom web app 3-6 weeks, and an AI automation agent 2-4 weeks. You'll get a clear timeline before we start.",
    },
    {
      q: "Do you work alone or with a team?",
      a: "I work alone for now — and that's an advantage for you. You communicate directly with the person building your project, not an account manager. As volume grows, I plan to bring on freelance developers for execution while I handle strategy and client relationships.",
    },
    {
      q: "What technologies do you use?",
      a: "Frontend: React, Vue.js, Next.js, TailwindCSS, Flutter. Backend: Laravel, NestJS, Node.js, PostgreSQL. CMS: WordPress, Shopify, WooCommerce. Automation: n8n, Systeme.io. Deployment: Cloudflare, VPS, CI/CD pipelines.",
    },
    {
      q: "Can you manage my ad campaigns?",
      a: "Yes. I've managed 69+ ad campaigns across Meta (Facebook/Instagram), Google, and TikTok. This includes creative production, audience targeting, budget optimization, and performance reporting.",
    },
    {
      q: "What is an n8n AI agent?",
      a: "An n8n agent is an automation workflow powered by AI. It can handle customer service 24/7, manage social media posting and engagement, automate business processes, and connect 200+ tools. I have a live agent running in production for a real e-commerce brand.",
    },
    {
      q: "Do you build Systeme.io funnels?",
      a: "Yes. I build complete sales funnels on Systeme.io — landing pages, email sequences, payment integration, and automation. Ideal for coaches, trainers, and digital entrepreneurs who want to sell online courses or services.",
    },
    {
      q: "What's the difference between Core and Lab?",
      a: "Core is what I deliver to clients right now — websites, stores, ad campaigns, automation agents. Lab is where I build my own products in R&D — things like a trading system, a learning platform, and a banking platform. Lab projects are not available as client services yet.",
    },
    {
      q: "Do you offer maintenance after the project?",
      a: "Yes. I offer monthly maintenance retainers for updates, security patches, performance monitoring, and small changes. This is optional — you're never locked in.",
    },
    {
      q: "How do we start?",
      a: "Simple: send a message through the contact form or chat widget. Tell me about your project, timeline, and budget. I'll reply within 24 hours with next steps, and we schedule a call if needed.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <HelpCircle className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 max-w-3xl text-display">
              {isFr ? "Questions fréquentes" : "Frequently Asked Questions"}
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {isFr
                ? "Tout ce que vous devez savoir sur le travail avec Stiamond — clients internationaux, paiements, délais et mode de collaboration."
                : "Everything you need to know about working with Stiamond — international clients, payments, timelines, and how we work."}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container size="md">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-lg border border-border bg-card p-6 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between text-body font-semibold">
                  {faq.q}
                  <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-4 text-body text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-border bg-surface-1/40 p-8 text-center">
            <h2 className="text-h3">
              {isFr ? "D'autres questions ?" : "Still have questions?"}
            </h2>
            <p className="mt-2 text-body text-muted-foreground">
              {isFr
                ? "Envoyez un message et je réponds sous 24h."
                : "Send a message and I'll reply within 24 hours."}
            </p>
            <div className="mt-6">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  {isFr ? "Me contacter" : "Get in touch"}
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
