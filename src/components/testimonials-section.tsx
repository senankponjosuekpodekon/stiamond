"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { Stagger, StaggerItem } from "@/components/motion";

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

  const fallbackTestimonials: Testimonial[] = [
    {
      id: "fallback-1",
      clientName: "Rachelle A.",
      clientRole: "Founder",
      clientCompany: "Divine Peggy",
      projectType: "E-commerce",
      quoteEn: "Josué built our Shopify store from scratch — design, product pages, payment setup, everything. The store was live in under 3 weeks and sales started coming in immediately. Working directly with the developer made all the difference.",
      quoteFr: "Josué a construit notre boutique Shopify de A à Z — design, fiches produits, configuration des paiements, tout. La boutique était en ligne en moins de 3 semaines et les ventes ont commencé immédiatement. Travailler directement avec le développeur a fait toute la différence.",
      rating: 5,
    },
    {
      id: "fallback-2",
      clientName: "Marius D.",
      clientRole: "Operations Manager",
      clientCompany: "Qotto",
      projectType: "Web Development",
      quoteEn: "We needed a website that could handle thousands of visitors and integrate with our internal tools. Stiamond delivered a fast, reliable platform with clean code. The communication was clear and the deadlines were respected.",
      quoteFr: "Nous avions besoin d'un site capable de gérer des milliers de visiteurs et de s'intégrer à nos outils internes. Stiamond a livré une plateforme rapide et fiable, avec un code propre. La communication était claire et les délais ont été respectés.",
      rating: 5,
    },
    {
      id: "fallback-3",
      clientName: "Estelle K.",
      clientRole: "Entrepreneur",
      clientCompany: "Chantsdoiseau",
      projectType: "Systeme.io Funnel",
      quoteEn: "I had a training program to sell but no idea how to set up the funnel. Josué built the entire Systeme.io funnel — landing page, email sequence, payment — in one week. I made my first sale the day it went live.",
      quoteFr: "J'avais une formation à vendre mais aucune idée de comment monter le tunnel. Josué a construit tout le funnel Systeme.io — page de capture, séquence d'emails, paiement — en une semaine. J'ai fait ma première vente le jour de la mise en ligne.",
      rating: 5,
    },
  ];

  const displayItems = items.length > 0 ? items : fallbackTestimonials;

  if (displayItems.length === 0) return null;

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
          {displayItems.map((item) => {
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
