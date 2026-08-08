import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Code2, BookOpen, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developers",
  description: "Developer resources — API docs, SDKs, code examples, and tools.",
};

const resources = [
  {
    icon: Code2,
    title: "API Reference",
    description: "Full REST and GraphQL API documentation with examples.",
    href: "/docs",
  },
  {
    icon: Terminal,
    title: "SDKs & Libraries",
    description: "Official SDKs for JavaScript, Python, and Go.",
    href: "/docs",
  },
  {
    icon: BookOpen,
    title: "Guides & Tutorials",
    description: "Step-by-step guides for common integration patterns.",
    href: "/docs",
  },
  {
    icon: Github,
    title: "Open Source",
    description: "Explore our open-source projects and contributions.",
    href: "https://github.com/senankponjosuekpodekon/stiamond",
  },
];

const codeExample = `import { Stiamond } from "@stiamond/sdk";

const client = new Stiamond({
  apiKey: process.env.STIAMOND_API_KEY,
});

const result = await client.ai.complete({
  model: "stiamond-pro",
  prompt: "Explain quantum computing",
});

console.log(result.text);`;

export default function DevelopersPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-16 md:py-20">
            <p className="text-overline font-semibold uppercase text-accent">Developers</p>
            <h1 className="mt-3 text-h1">Build with Stiamond</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
              APIs, SDKs, and tools to integrate AI, cloud, and software capabilities
              into your applications.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {resources.map((res) => (
              <Link key={res.title} href={res.href}>
                <Card className="group h-full hover:border-primary/30 hover:shadow-md">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <res.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-h5 font-semibold">{res.title}</h2>
                      <p className="mt-1 text-body-sm text-muted-foreground">{res.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-body-sm font-medium text-primary">
                        Explore
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-h3">Quick start</h2>
            <p className="mt-2 text-body text-muted-foreground">
              Install the SDK and make your first API call in minutes.
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-surface-3" />
                  <div className="h-3 w-3 rounded-full bg-surface-3" />
                  <div className="h-3 w-3 rounded-full bg-surface-3" />
                </div>
                <span className="ml-2 text-caption text-muted-foreground">quick-start.ts</span>
              </div>
              <pre className="overflow-x-auto p-4 text-body-sm leading-relaxed">
                <code className="font-mono text-muted-foreground">{codeExample}</code>
              </pre>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
