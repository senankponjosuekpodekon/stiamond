import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Code, Cloud, Brain, Server, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("docs");
}

export default function DocsPage() {
  const t = useTranslations("docs");

  const sections = [
    {
      icon: Book,
      title: t("sections.gettingStarted.title"),
      description: t("sections.gettingStarted.description"),
      links: t.raw("sections.gettingStarted.links") as string[],
    },
    {
      icon: Code,
      title: t("sections.software.title"),
      description: t("sections.software.description"),
      links: t.raw("sections.software.links") as string[],
    },
    {
      icon: Brain,
      title: t("sections.ai.title"),
      description: t("sections.ai.description"),
      links: t.raw("sections.ai.links") as string[],
    },
    {
      icon: Cloud,
      title: t("sections.cloud.title"),
      description: t("sections.cloud.description"),
      links: t.raw("sections.cloud.links") as string[],
    },
    {
      icon: Server,
      title: t("sections.api.title"),
      description: t("sections.api.description"),
      links: t.raw("sections.api.links") as string[],
    },
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
