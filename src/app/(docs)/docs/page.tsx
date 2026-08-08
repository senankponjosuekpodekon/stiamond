import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Code, Cloud, Brain, Server, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Stiamond documentation — guides, API references, and tutorials.",
};

const sections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Quick start guides, installation, and project setup.",
    links: ["Introduction", "Quick Start", "Project Structure", "Configuration"],
  },
  {
    icon: Code,
    title: "Software Engineering",
    description: "Architecture patterns, code standards, and best practices.",
    links: ["Architecture", "Code Standards", "Testing", "Deployment"],
  },
  {
    icon: Brain,
    title: "AI Engineering",
    description: "LLM integration, RAG systems, and AI agent development.",
    links: ["LLM Integration", "RAG Systems", "AI Agents", "Model Tuning"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Deployment, scaling, and infrastructure management.",
    links: ["Cloud Setup", "CI/CD", "Kubernetes", "Monitoring"],
  },
  {
    icon: Server,
    title: "API Reference",
    description: "REST and GraphQL API documentation.",
    links: ["Authentication", "REST API", "GraphQL", "Webhooks"],
  },
];

export default function DocsPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-16 md:py-20">
            <p className="text-overline font-semibold uppercase text-accent">Documentation</p>
            <h1 className="mt-3 text-h1">Guides, references, and tutorials</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
              Everything you need to build with Stiamond&apos;s products and platforms.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Card key={section.title} className="group h-full hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <section.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-4 text-h5 font-semibold">{section.title}</h2>
                  <p className="mt-2 text-body-sm text-muted-foreground">{section.description}</p>
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link href={`/docs`} className="inline-flex items-center gap-1 text-body-sm text-primary hover:gap-2 transition-all">
                          {link}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
