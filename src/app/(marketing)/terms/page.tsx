import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("terms");
}

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <Container>
      <div className="py-20 md:py-28">
        <h1 className="text-h1">{t("title")}</h1>
        <p className="mt-4 text-body-sm text-muted-foreground">{t("lastUpdated")}</p>

        <div className="mt-12 max-w-3xl space-y-8">
          <section>
            <h2 className="text-h4">{t("s1Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s1Body")}
            </p>
          </section>

          <section>
            <h2 className="text-h4">{t("s2Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s2Body")}
            </p>
          </section>

          <section>
            <h2 className="text-h4">{t("s3Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s3Body")}
            </p>
          </section>

          <section>
            <h2 className="text-h4">{t("s4Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s4Body")}
            </p>
          </section>

          <section>
            <h2 className="text-h4">{t("s5Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s5Body")}
            </p>
          </section>

          <section>
            <h2 className="text-h4">{t("s6Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s6Body")}
            </p>
          </section>

          <section>
            <h2 className="text-h4">{t("s7Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s7Body")}{" "}
              <a href="mailto:legal@stiamond.net" className="text-primary hover:underline">legal@stiamond.net</a>.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
