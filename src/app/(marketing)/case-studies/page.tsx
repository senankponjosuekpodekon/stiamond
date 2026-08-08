import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Clock, Shield } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real projects, real results. See how Stiamond helps clients build and scale.",
};

const caseStudies = [
  {
    slug: "healthcare-ai-platform",
    client: "MedTech Startup",
    sector: "Healthcare",
    title: "AI-powered medical intelligence platform",
    summary: "Built a HIPAA-compliant AI platform that processes medical literature 10x faster than manual review.",
    metrics: [
      { icon: TrendingUp, label: "Processing speed", value: "10x faster" },
      { icon: Clock, label: "Time to market", value: "4 months" },
      { icon: Shield, label: "Compliance", value: "HIPAA ready" },
    ],
    tags: ["AI", "Healthcare", "RAG"],
  },
  {
    slug: "fintech-cloud-migration",
    client: "FinTech Scale-up",
    sector: "Finance",
    title: "Cloud migration with zero downtime",
    summary: "Migrated a monolithic PHP application to a composable cloud architecture without service interruption.",
    metrics: [
      { icon: TrendingUp, label: "Performance", value: "3x improvement" },
      { icon: Clock, label: "Downtime", value: "0 hours" },
      { icon: Shield, label: "Cost reduction", value: "40% lower" },
    ],
    tags: ["Cloud", "Finance", "Migration"],
  },
  {
    slug: "retail-growth-engine",
    client: "E-commerce Brand",
    sector: "Retail",
    title: "Data-driven growth engine",
    summary: "Implemented marketing automation and SEO infrastructure that tripled organic traffic in 6 months.",
    metrics: [
      { icon: TrendingUp, label: "Organic traffic", value: "3x increase" },
      { icon: Clock, label: "Timeline", value: "6 months" },
      { icon: Shield, label: "Conversion rate", value: "+45%" },
    ],
    tags: ["Growth", "Retail", "SEO"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">Case Studies</p>
            <h1 className="mt-3 max-w-3xl text-display">Real projects, real results</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              We don&apos;t just build software. We deliver measurable business outcomes.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-8">
            {caseStudies.map((cs) => (
              <Card key={cs.slug} className="overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3">
                        <span className="rounded-md bg-primary/8 px-2.5 py-1 text-caption font-medium text-primary">
                          {cs.sector}
                        </span>
                        <span className="text-caption text-muted-foreground">{cs.client}</span>
                      </div>
                      <h2 className="mt-4 text-h3">{cs.title}</h2>
                      <p className="mt-4 text-body text-muted-foreground">{cs.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cs.tags.map((tag) => (
                          <span key={tag} className="rounded-md bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {cs.metrics.map((metric) => (
                        <div key={metric.label} className="flex items-center gap-3 rounded-lg border border-border bg-surface-1/40 p-4">
                          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/8 text-primary">
                            <metric.icon className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <div>
                            <div className="text-body-sm font-semibold">{metric.value}</div>
                            <div className="text-caption text-muted-foreground">{metric.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                Start your project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
