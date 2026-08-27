import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Brain, Cloud, Rocket, Database } from "lucide-react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("docs");
}

const iconMap: Record<string, typeof Code> = {
  gettingStarted: Rocket,
  software: Code,
  ai: Brain,
  cloud: Cloud,
  api: Database,
};

const sectionKeys = ["gettingStarted", "software", "ai", "cloud", "api"];

export default async function DocsPage() {
  const t = await getTranslations("docs");
  const sections = t.raw("sections") as Record<
    string,
    { title: string; description: string; links: string[] }
  >;

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-16 md:py-20">
            <p className="text-overline font-semibold uppercase text-accent">{t("overline")}</p>
            <h1 className="mt-3 text-h1">{t("title")}</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">{t("subtitle")}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectionKeys.map((key) => {
              const section = sections[key];
              const Icon = iconMap[key] || Rocket;
              return (
                <Card key={key} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h2 className="mt-4 text-h5 font-semibold">{section.title}</h2>
                    <p className="mt-2 text-body-sm text-muted-foreground">{section.description}</p>
                    {section.links && (
                      <ul className="mt-4 space-y-1.5">
                        {section.links.map((link) => (
                          <li key={link} className="text-body-sm text-muted-foreground">
                            · {link}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
