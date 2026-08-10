import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Palette, Filter, Check, ArrowRight, Image, Film, Mail } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Creative & Marketing — Design, Video, Funnels | Stiamond",
    description: "Ad creatives, short-form video, Systeme.io funnels, and marketing strategy. One person covering design, video, and marketing automation.",
  };
}

export default async function CreativeSolutionPage() {
  const services = [
    {
      icon: Image,
      title: "Ad Creatives",
      description: "Scroll-stopping visual ads for Meta, TikTok, and Google. Product photography, graphic design, and performance-oriented creatives.",
    },
    {
      icon: Film,
      title: "Short-Form Video",
      description: "Video ads and social media content produced with CapCut. Short-form video outperforms static in 2026 — and we know how to make it convert.",
    },
    {
      icon: Filter,
      title: "Systeme.io Funnels",
      description: "Complete sales funnels — landing pages, email sequences, payment integration, and automation. Built for coaches, trainers, and digital entrepreneurs.",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Automated email sequences, newsletter campaigns, and lead nurturing flows. Integrated with your funnel and CRM.",
    },
  ];

  const features = [
    "Ad creatives for Meta, TikTok, and Google",
    "Short-form video production (CapCut, mobile-first)",
    "Systeme.io funnel setup — landing pages, checkout, email",
    "Email automation sequences",
    "Brand identity and visual consistency",
    "A/B testing on creatives and copy",
    "Conversion-optimized landing pages",
    "Content calendar and social media strategy",
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Palette className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 max-w-3xl text-display">
              Creative & Marketing — Design, video, and funnels that convert
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              Ad creatives, short-form video, Systeme.io funnels, and email automation.
              The creative side of what most agencies split across a designer, a videographer,
              and a media buyer — handled by one person.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  Start a project
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
            <p className="text-overline font-semibold uppercase text-accent">Services</p>
            <h2 className="mt-3 text-h2">What we create</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              From ad creatives to complete sales funnels — everything your marketing needs.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="rounded-lg border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <s.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-h5 font-semibold">{s.title}</h3>
                <p className="mt-2 text-body text-muted-foreground">{s.description}</p>
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
                <h2 className="text-h3">Why this matters</h2>
                <p className="mt-4 text-body-lg text-muted-foreground">
                  Most clients work with 3-4 different providers for design, video, ads, and funnels.
                  With Stiamond, it&apos;s one person who understands your brand across all channels —
                  ensuring visual consistency and message alignment everywhere.
                </p>
                <p className="mt-4 text-body text-muted-foreground">
                  69+ ad campaigns managed across Meta, Google, and TikTok. Real results, real data.
                </p>
                <div className="mt-8">
                  <Button variant="primary" asChild>
                    <Link href="/contact">
                      Start your creative project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="text-h2 font-bold text-primary">69+</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">Ad campaigns</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="text-h2 font-bold text-primary">3</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">Ad platforms</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="text-h2 font-bold text-primary">1</div>
                  <div className="mt-1 text-body-sm text-muted-foreground">Interlocutor</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
