import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Code2, BookOpen, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("developers");
}

export default async function DevelopersPage() {
  const t = await getTranslations("developers");

  const resources = [
    { icon: Code2, title: "Our Stack", description: "Next.js, React, Vue, Laravel, NestJS, Flutter, TailwindCSS, Drizzle ORM.", href: "/docs" },
    { icon: Terminal, title: "Automation & AI", description: "n8n agents, workflow orchestration, and AI-powered automation in production.", href: "/solutions" },
    { icon: BookOpen, title: "How We Work", description: "Agile process, CI/CD, deployment strategy, and project management.", href: "/docs" },
    { icon: Github, title: "Open Source", description: "We build in the open. Explore our projects and contributions.", href: "https://github.com/senankponjosuekpodekon" },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-16 md:py-20">
            <p className="text-overline font-semibold uppercase text-accent">{t("overline")}</p>
            <h1 className="mt-3 text-h1">{t("title")}</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
              {t("subtitle")}
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
                        {t("explore")}
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
    </>
  );
}
