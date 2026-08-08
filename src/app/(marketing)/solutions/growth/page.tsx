import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { TrendingUp, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Systems",
  description: "SEO, content strategy, marketing automation, and data-driven growth engines.",
};

const features = [
  "SEO Engineering",
  "Content Strategy & Systems",
  "Marketing Automation",
  "Analytics & Attribution",
  "Conversion Optimization",
  "A/B Testing Frameworks",
  "Growth Dashboards",
  "Data Pipelines",
];

const stack = ["Google Analytics", "Mixpanel", "PostHog", "Vercel Analytics", "Schema.org", "Lighthouse", "CrUX", "GSC"];

export default function GrowthSolutionPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <TrendingUp className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 max-w-3xl text-display">Growth Systems</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              SEO, content strategy, marketing automation, and data-driven growth
              engines that turn traffic into revenue.
            </p>
            <div className="mt-8">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-h3">What we build</h2>
              <ul className="mt-8 space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                    <span className="text-body">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-h3">Our stack</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {stack.map((tech) => (
                  <span key={tech} className="rounded-lg border border-border bg-surface-1 px-4 py-2 text-body-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
