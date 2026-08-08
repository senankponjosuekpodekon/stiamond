import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Code, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("solutionsSoftware");
}

export default function SoftwareSolutionPage() {
  const t = useTranslations("solutions.software");
  const features = [
    t("features.f1"), t("features.f2"), t("features.f3"), t("features.f4"),
    t("features.f5"), t("features.f6"), t("features.f7"), t("features.f8"),
  ];
  const stack = ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "GraphQL", "tRPC", "Prisma"];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Code className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 max-w-3xl text-display">{t("title")}</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
            <div className="mt-8">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  {t("startProject")}
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
              <h2 className="text-h3">{t("whatWeBuild")}</h2>
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
              <h2 className="text-h3">{t("ourStack")}</h2>
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
