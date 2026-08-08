import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Eye, ArrowRight, Heart, Lightbulb, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description: "Stiamond — AI, Software & Cloud Engineering company. Our mission, vision, and team.",
};

const values = [
  { icon: Lightbulb, title: "Innovation", description: "We push boundaries with AI-first thinking and emerging technologies." },
  { icon: ShieldCheck, title: "Integrity", description: "Transparent processes, honest communication, and ethical AI practices." },
  { icon: Heart, title: "Excellence", description: "We hold ourselves to the highest standards in everything we ship." },
  { icon: Globe, title: "Impact", description: "We build systems that create measurable value for businesses worldwide." },
];

const milestones = [
  { year: "2024", title: "Founded", description: "Stiamond established with a vision to democratize AI engineering." },
  { year: "2024", title: "First Products", description: "Launched MEDIM and AI Platform prototypes." },
  { year: "2025", title: "Platform Expansion", description: "Grew to 4 pillars: Software, AI, Cloud, and Growth systems." },
  { year: "2026", title: "Global Reach", description: "Edge-deployed infrastructure serving clients across 3 continents." },
];

export default function CompanyPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">About Us</p>
            <h1 className="mt-3 max-w-3xl text-display">Engineering the future of intelligent software</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              Stiamond is an AI & software company that builds products, platforms, and
              infrastructure for the next generation of digital businesses.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Target className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-h3">Our Mission</h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                To empower businesses with AI-powered software, cloud infrastructure, and
                growth systems that are accessible, scalable, and secure. We turn complex
                technical challenges into elegant, composable solutions.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Eye className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-h3">Our Vision</h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                A world where every business — regardless of size — can leverage
                enterprise-grade AI, software, and cloud systems. We envision a composable
                ecosystem where innovation compounds through research, products, and platform.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-1/40 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">Our Values</p>
            <h2 className="mt-3 text-h2">What drives us</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="h-full">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <value.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="mt-4 text-h5">{value.title}</CardTitle>
                  <CardDescription className="mt-2">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-semibold uppercase text-accent">Milestones</p>
            <h2 className="mt-3 text-h2">Our journey</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <div key={m.title} className="border-l-2 border-primary/20 pl-6">
                <div className="text-h5 font-bold text-primary">{m.year}</div>
                <h3 className="mt-2 text-body font-semibold">{m.title}</h3>
                <p className="mt-1 text-body-sm text-muted-foreground">{m.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-border bg-primary px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="text-h2 text-primary-foreground">Want to join our mission?</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-primary-foreground/80">
              We&apos;re always looking for talented engineers, designers, and thinkers.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/company/careers">
                  View Careers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
