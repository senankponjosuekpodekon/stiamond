import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQ — Frequently Asked Questions | Stiamond",
    description: "Common questions about working with Stiamond: international clients, payment methods, project timelines, and how we work.",
  };
}

const faqs = [
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

export default async function FAQPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <HelpCircle className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 max-w-3xl text-display">Frequently Asked Questions</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              Everything you need to know about working with Stiamond — international clients,
              payments, timelines, and how we work.
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
            <h2 className="text-h3">Still have questions?</h2>
            <p className="mt-2 text-body text-muted-foreground">
              Send a message and I&apos;ll reply within 24 hours.
            </p>
            <div className="mt-6">
              <Button variant="primary" asChild>
                <Link href="/contact">
                  Get in touch
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
