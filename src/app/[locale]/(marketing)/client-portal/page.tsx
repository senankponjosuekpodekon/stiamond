import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, LayoutDashboard, FileText, CreditCard } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...generatePageMetadata("clientPortal"),
    robots: { index: false, follow: false },
  };
}

export default async function ClientPortalPage() {
  const t = await getTranslations("clientPortal");

  const features = [
    { icon: LayoutDashboard, title: t("features.dashboard.title"), description: t("features.dashboard.description") },
    { icon: FileText, title: t("features.documents.title"), description: t("features.documents.description") },
    { icon: CreditCard, title: t("features.invoices.title"), description: t("features.invoices.description") },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Lock className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 text-display">{t("title")}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-md">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-h5 font-semibold">{t("signIn")}</h2>
                <p className="mt-2 text-body-sm text-muted-foreground">
                  {t("signInDesc")}
                </p>
                <form className="mt-6 space-y-4">
                  <div>
                    <label className="text-body-sm font-medium">{t("email")}</label>
                    <Input type="email" placeholder="you@company.com" className="mt-2" />
                  </div>
                  <div>
                    <label className="text-body-sm font-medium">{t("password")}</label>
                    <Input type="password" placeholder="••••••••" className="mt-2" />
                  </div>
                  <Button variant="primary" size="lg" asChild className="w-full">
                    <Link href="/login">
                      {t("signInBtn")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </form>
                <p className="mt-6 text-center text-body-sm text-muted-foreground">
                  {t("noAccount")}{" "}
                  <Link href="/register" className="font-medium text-primary hover:underline">
                    {t("requestAccess")}
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h3">{t("whatYouGet")}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <f.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-body font-semibold">{f.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
