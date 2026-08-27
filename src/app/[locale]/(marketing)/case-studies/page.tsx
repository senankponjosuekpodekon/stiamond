import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { TestimonialsSection } from "@/components/testimonials-section";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("caseStudies");
}

export default async function CaseStudiesPage() {
  const t = await getTranslations("caseStudies");

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">{t("overline")}</p>
            <h1 className="mt-3 max-w-3xl text-display">{t("title")}</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      <section className="py-20 md:py-28">
        <Container>
          <div className="mt-16 text-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                {t("startProject")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
