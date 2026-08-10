import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Zap, Check, ArrowRight, MessageSquare, Share2, Bot, BarChart } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Automation Agents — Customer Service & Social Media | Stiamond",
    description: "Automate customer service and social media management with n8n AI agents. Live in production. Built and deployed by Stiamond.",
  };
}

export default async function AutomationSolutionPage() {
  const features = [
    "AI-powered customer service agent — 24/7 responses on your website",
    "Social media management — 360° automation across platforms",
    "Workflow orchestration with n8n — 200+ integrations",
    "AI triggers — smart automation based on customer behavior",
    "Real-time monitoring and analytics dashboards",
    "Multi-channel — WhatsApp, email, web chat, social media",
    "Custom business logic — tailored to your processes",
    "Seamless integration with your existing tools and CRM",
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: "Customer Service Automation",
      description: "An AI agent that handles customer questions 24/7 on your website, WhatsApp, or email. Escalates complex cases to your team.",
    },
    {
      icon: Share2,
      title: "Social Media 360°",
      description: "An n8n agent that manages your social media end-to-end — content scheduling, posting, engagement, and analytics reporting.",
    },
    {
      icon: Bot,
      title: "Business Process Automation",
      description: "Automate repetitive workflows — invoicing, data entry, lead qualification, email sequences, and reporting.",
    },
    {
      icon: BarChart,
      title: "Data Pipelines",
      description: "Connect your tools and automate data flow — from CRM to analytics, from orders to accounting, from leads to follow-up.",
    },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Zap className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 max-w-3xl text-display">
              AI Automation Agents — Automate your customer service and social media
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              n8n-powered AI agents that handle customer service, social media management,
              and business workflows. Already running in production for real clients.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  Start automating
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">Use Cases</p>
            <h2 className="mt-3 text-h2">What you can automate</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              From customer service to social media to back-office workflows.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div key={uc.title} className="rounded-lg border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <uc.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-h5 font-semibold">{uc.title}</h3>
                <p className="mt-2 text-body text-muted-foreground">{uc.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">Features</p>
            <h2 className="mt-3 text-h2">What&apos;s included</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
                <span className="text-body-sm">{f}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="rounded-lg border border-border bg-surface-1/40 p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-h3">Proven in production</h2>
                <p className="mt-4 text-body-lg text-muted-foreground">
                  An n8n AI agent managing 360° social media for a real e-commerce brand —
                  content scheduling, posting, engagement, and analytics. Live and running.
                </p>
                <p className="mt-4 text-body text-muted-foreground">
                  Pricing: <strong className="text-foreground">$1,500–$4,000</strong> (local) /{" "}
                  <strong className="text-foreground">$3,000–$6,000</strong> (international).
                  Timeline: 2–4 weeks.
                </p>
                <div className="mt-8">
                  <Button variant="primary" asChild>
                    <Link href="/contact">
                      Start your automation project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="text-h2 font-bold text-primary">24/7</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">Customer service uptime</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="text-h2 font-bold text-primary">200+</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">Integrations available</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="text-h2 font-bold text-primary">360°</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">Social media coverage</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="text-h2 font-bold text-primary">Live</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">In production</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
