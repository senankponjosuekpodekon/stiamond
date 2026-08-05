import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sparkles,
  Cpu,
  Cloud,
  Code,
  TrendingUp,
  Zap,
  ArrowRight,
  Brain,
  Server,
  Workflow,
} from "lucide-react";

const pillars = [
  {
    icon: Code,
    title: "Software Engineering",
    description:
      "Custom software, web platforms, and SaaS products built with modern architecture.",
    href: "/solutions/software",
  },
  {
    icon: Brain,
    title: "AI Engineering",
    description:
      "LLM integration, RAG systems, AI agents, and intelligent automation pipelines.",
    href: "/solutions/ai",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Scalable cloud architecture, DevOps, CI/CD, and infrastructure as code.",
    href: "/solutions/cloud",
  },
  {
    icon: TrendingUp,
    title: "Growth Systems",
    description:
      "SEO, content strategy, marketing automation, and data-driven growth engines.",
    href: "/solutions/growth",
  },
];

const stats = [
  { value: "5+", label: "Pillars of Expertise" },
  { value: "40+", label: "Pages of Architecture" },
  { value: "100", label: "Lighthouse Target" },
  { value: "5yr", label: "Roadmap Vision" },
];

const products = [
  {
    icon: Sparkles,
    name: "MEDIM",
    description: "AI-powered medical intelligence platform",
  },
  {
    icon: Cpu,
    name: "AI Platform",
    description: "Multi-model AI gateway with intelligent routing",
  },
  {
    icon: Zap,
    name: "Automation",
    description: "Workflow automation and process orchestration",
  },
  {
    icon: Server,
    name: "APIs",
    description: "Developer-first APIs for AI, data, and infrastructure",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <Container>
          <div className="flex flex-col items-center py-24 text-center md:py-32 lg:py-40">
            <Badge variant="ai" className="mb-6 animate-fade-in">
              <Sparkles className="mr-1.5 h-3 w-3" />
              AI-Powered Engineering
            </Badge>

            <h1 className="max-w-4xl text-display animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
              Building the next generation of{" "}
              <span className="text-gradient">intelligent software</span>
            </h1>

            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Stiamond designs AI-powered software, cloud infrastructure, and
              digital growth systems that accelerate business performance.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
              <Button variant="ai" size="lg" asChild>
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/solutions">Explore Solutions</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface-1/50">
        <Container>
          <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-h2 font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="mt-1 text-body-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="primary" className="mb-4">
              Our Expertise
            </Badge>
            <h2 className="text-h2">Four pillars of engineering</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              We combine deep technical expertise with strategic thinking to
              deliver systems that scale.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <Link key={pillar.title} href={pillar.href}>
                <Card className="group h-full hover:-translate-y-1 hover:border-border-strong hover:shadow-md">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4">{pillar.title}</CardTitle>
                    <CardDescription>{pillar.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="border-t border-border bg-surface-1/50 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="ai" className="mb-4">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Products
            </Badge>
            <h2 className="text-h2">Technology we build</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              We don&apos;t just deliver services. We create products that
              compound in value over time.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.name} className="group h-full hover:-translate-y-1 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ai/10 text-ai">
                    <product.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-h5 font-semibold">{product.name}</h3>
                  <p className="mt-2 text-body-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28">
        <Container size="md">
          <div className="text-center">
            <Badge variant="primary" className="mb-4">
              Our Philosophy
            </Badge>
            <h2 className="text-h2">From research to ecosystem</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Every project is an opportunity to learn. Every learning becomes a
              feature. Every feature becomes a product. Every product enriches
              the platform.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4">
            {[
              { icon: Cpu, label: "Research" },
              { icon: Code, label: "Prototypes" },
              { icon: Workflow, label: "Services" },
              { icon: TrendingUp, label: "Case Studies" },
              { icon: Sparkles, label: "Products" },
              { icon: Cloud, label: "Platform" },
              { icon: Server, label: "Ecosystem" },
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <div className="flex items-center gap-3 rounded-full border border-border bg-surface-1 px-6 py-3">
                  <step.icon className="h-5 w-5 text-primary" />
                  <span className="text-body font-medium">{step.label}</span>
                </div>
                {i < 6 && (
                  <div className="h-6 w-px bg-border" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1 px-8 py-16 text-center md:px-16 md:py-24">
            <div className="absolute inset-0 bg-gradient-glow opacity-50" />
            <div className="relative">
              <h2 className="text-h2">Ready to build something intelligent?</h2>
              <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted-foreground">
                Let&apos;s discuss how Stiamond can help you engineer your next
                digital system.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button variant="ai" size="lg" asChild>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
