import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartPulse, Banknote, ShoppingCart, Factory, GraduationCap, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industries we serve with AI, software, and cloud solutions.",
};

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "AI-powered diagnostics, medical imaging, patient management, and clinical decision support systems.",
    useCases: ["AI Diagnostics", "Medical Imaging", "Patient Records", "Telemedicine"],
  },
  {
    icon: Banknote,
    title: "Finance",
    description: "Fraud detection, risk assessment, algorithmic trading, and automated compliance systems.",
    useCases: ["Fraud Detection", "Risk Models", "Trading Bots", "Compliance Automation"],
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-commerce",
    description: "Personalized recommendations, inventory optimization, and AI-driven customer experiences.",
    useCases: ["Recommendation Engines", "Inventory AI", "Dynamic Pricing", "Visual Search"],
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Predictive maintenance, supply chain optimization, and IoT-enabled quality control.",
    useCases: ["Predictive Maintenance", "Supply Chain AI", "Quality Control", "IoT Monitoring"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Personalized learning paths, AI tutoring, and automated assessment systems.",
    useCases: ["AI Tutoring", "Adaptive Learning", "Auto-grading", "Content Generation"],
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Property valuation, market analysis, virtual tours, and intelligent lead management.",
    useCases: ["AI Valuation", "Market Analysis", "Virtual Tours", "Lead Scoring"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">Industries</p>
            <h1 className="mt-3 max-w-3xl text-display">Solutions for every sector</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              We adapt our AI, software, and cloud expertise to the unique challenges
              of each industry we serve.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Card key={ind.title} className="group h-full hover:border-primary/30 hover:shadow-md">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <ind.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="mt-4 text-h5">{ind.title}</CardTitle>
                  <CardDescription className="mt-2">{ind.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {ind.useCases.map((uc) => (
                      <span key={uc} className="rounded-md border border-border bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                        {uc}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
