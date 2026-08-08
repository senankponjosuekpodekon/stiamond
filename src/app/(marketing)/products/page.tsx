import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Brain, Zap, Server, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "AI-powered products and platforms built by Stiamond.",
};

const products = [
  {
    icon: Cpu,
    name: "MEDIM",
    tagline: "AI-powered medical intelligence platform",
    description: "Diagnostic assistance, medical imaging analysis, and clinical decision support powered by specialized AI models.",
    features: ["AI Diagnostic Assistance", "Medical Imaging Analysis", "Clinical Decision Support", "HIPAA Compliant"],
    status: "In Development",
  },
  {
    icon: Brain,
    name: "AI Platform",
    tagline: "Multi-model AI gateway with intelligent routing",
    description: "A unified API that routes requests across multiple LLM providers based on cost, latency, and capability requirements.",
    features: ["Multi-model Routing", "Cost Optimization", "Latency-aware", "Fallback & Retry"],
    status: "In Development",
  },
  {
    icon: Zap,
    name: "Automation",
    tagline: "Workflow automation and process orchestration",
    description: "Visual workflow builder with AI-powered automation for business processes, data pipelines, and integrations.",
    features: ["Visual Workflow Builder", "AI-powered Triggers", "200+ Integrations", "Real-time Monitoring"],
    status: "Planned",
  },
  {
    icon: Server,
    name: "APIs",
    tagline: "Developer-first APIs for AI, data, and infrastructure",
    description: "A suite of REST and GraphQL APIs for AI inference, data processing, and cloud infrastructure management.",
    features: ["REST & GraphQL", "AI Inference", "Data Processing", "Infrastructure Management"],
    status: "In Development",
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">Products</p>
            <h1 className="mt-3 max-w-3xl text-display">Technology we build</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              We don&apos;t just deliver services. We create products that compound in value
              over time — each project teaches us something that becomes a feature.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {products.map((product) => (
              <Card key={product.name} className="group h-full overflow-hidden hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <product.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="rounded-full border border-border bg-surface-1 px-3 py-1 text-caption font-medium text-muted-foreground">
                      {product.status}
                    </span>
                  </div>
                  <h2 className="mt-6 text-h4 font-bold">{product.name}</h2>
                  <p className="mt-1 text-body-sm font-medium text-primary">{product.tagline}</p>
                  <p className="mt-4 text-body text-muted-foreground">{product.description}</p>
                  <ul className="mt-6 space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-body-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">Interested in our products?</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              Get early access or learn how these products can integrate with your business.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  Request Access
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
