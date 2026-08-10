import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Rocket, GitBranch, Cloud, Workflow, Database } from "lucide-react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("docs");
}

export default async function DocsPage() {
  const t = await getTranslations("docs");

  const sections = [
    {
      icon: Code,
      title: "Our Stack",
      description: "Next.js, React, Vue, Laravel, NestJS, Flutter, TailwindCSS, PostgreSQL, Neon, Cloudflare.",
    },
    {
      icon: Workflow,
      title: "Automation & AI",
      description: "n8n agents, workflow orchestration, AI-powered triggers, and 200+ integrations for business processes.",
    },
    {
      icon: GitBranch,
      title: "Process",
      description: "Agile iterations, continuous deployment, Git-based version control, and weekly progress reviews.",
    },
    {
      icon: Rocket,
      title: "Deployment",
      description: "CI/CD pipelines, VPS management, Cloudflare deployment, and automated testing before each release.",
    },
    {
      icon: Cloud,
      title: "Infrastructure",
      description: "Serverless architecture, edge deployment, managed PostgreSQL (Neon), and Cloudflare Workers.",
    },
    {
      icon: Database,
      title: "Data & Marketing",
      description: "Google Analytics, Search Console, Meta Ads, TikTok Ads, Systeme.io funnels, and conversion tracking.",
    },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-16 md:py-20">
            <p className="text-overline font-semibold uppercase text-accent">{t("overline")}</p>
            <h1 className="mt-3 text-h1">How we work</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
              The tools, processes, and infrastructure behind every project we deliver.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Card key={section.title} className="h-full">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <section.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-4 text-h5 font-semibold">{section.title}</h2>
                  <p className="mt-2 text-body-sm text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
