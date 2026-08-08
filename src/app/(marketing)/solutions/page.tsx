import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Brain, Cloud, TrendingUp, Zap, Server, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description: "AI Engineering, Software Engineering, Cloud Infrastructure, and Growth Systems.",
};

const solutions = [
  {
    icon: Code,
    title: "Software Engineering",
    description: "Custom software, web platforms, and SaaS products built with modern architecture.",
    features: ["Custom Web Apps", "SaaS Platforms", "API Design", "Microservices"],
    href: "/solutions/software",
  },
  {
    icon: Brain,
    title: "AI Engineering",
    description: "LLM integration, RAG systems, AI agents, and intelligent automation pipelines.",
    features: ["LLM Integration", "RAG Systems", "AI Agents", "Model Fine-tuning"],
    href: "/solutions/ai",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable cloud architecture, DevOps, CI/CD, and infrastructure as code.",
    features: ["Cloud Architecture", "DevOps & CI/CD", "Kubernetes", "Edge Deployment"],
    href: "/solutions/cloud",
  },
  {
    icon: TrendingUp,
    title: "Growth Systems",
    description: "SEO, content strategy, marketing automation, and data-driven growth engines.",
    features: ["SEO Engineering", "Marketing Automation", "Analytics", "Content Systems"],
    href: "/solutions/growth",
  },
];

const capabilities = [
  { icon: Zap, title: "Automation", description: "Workflow automation and process orchestration." },
  { icon: Server, title: "APIs", description: "Developer-first APIs for AI, data, and infrastructure." },
  { icon: Workflow, title: "Integration", description: "Seamless integration with existing systems and tools." },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">Solutions</p>
            <h1 className="mt-3 max-w-3xl text-display">Four pillars of engineering excellence</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              We combine deep technical expertise with strategic thinking to deliver
              systems that scale — from prototype to production to platform.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {solutions.map((sol) => (
              <Card key={sol.title} className="group h-full hover:border-primary/30 hover:shadow-md">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <sol.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="mt-4 text-h4">{sol.title}</CardTitle>
                  <CardDescription className="mt-2 text-body">{sol.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sol.features.map((f) => (
                      <span key={f} className="rounded-md border border-border bg-surface-1 px-3 py-1 text-caption font-medium text-muted-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link href={sol.href} className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:gap-2.5 transition-all">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">Capabilities</p>
            <h2 className="mt-3 text-h2">Beyond the pillars</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Cross-cutting capabilities that enhance every solution we deliver.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <cap.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-body font-semibold">{cap.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">Ready to engineer your next system?</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              Let&apos;s discuss how our solutions can accelerate your business.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  Get in Touch
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
