"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

type Testimonial = {
  id: string;
  clientName: string;
  clientRole: string | null;
  clientCompany: string | null;
  projectType: string | null;
  quoteEn: string;
  quoteFr: string | null;
  rating: number;
};

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale() as "en" | "fr";
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setItems(data.testimonials || []))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-overline font-semibold uppercase text-accent">
            {t("overline")}
          </p>
          <h2 className="mt-3 text-h2">{t("title")}</h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const quote = locale === "fr" && item.quoteFr ? item.quoteFr : item.quoteEn;
            return (
              <StaggerItem key={item.id}>
                <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="mt-4 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-body text-muted-foreground">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="font-semibold text-body-sm">{item.clientName}</div>
                    {(item.clientRole || item.clientCompany) && (
                      <div className="text-caption text-muted-foreground">
                        {[item.clientRole, item.clientCompany].filter(Boolean).join(" · ")}
                      </div>
                    )}
                    {item.projectType && (
                      <div className="mt-1 inline-flex rounded-md bg-primary/8 px-2 py-0.5 text-caption font-medium text-primary">
                        {item.projectType}
                      </div>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
