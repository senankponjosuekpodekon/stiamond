import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("privacy");
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const s3Items = t.raw("s3Items") as string[];
  const s5Items = t.raw("s5Items") as string[];

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
            <ul className="mt-4 space-y-2 text-body text-muted-foreground">
              <li>{t("s2Contact")}</li>
              <li>{t("s2Account")}</li>
              <li>{t("s2Usage")}</li>
              <li>{t("s2Project")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4">{t("s3Title")}</h2>
            <ul className="mt-4 space-y-2 text-body text-muted-foreground">
              {s3Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
            <ul className="mt-4 space-y-2 text-body text-muted-foreground">
              {s5Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-h4">{t("s6Title")}</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {t("s6Body")}{" "}
              <a href="mailto:privacy@stiamond.net" className="text-primary hover:underline">privacy@stiamond.net</a>.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
