import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for AI, software, and cloud engineering services.",
};

const plans = [
  {
    name: "Starter",
    description: "For small projects and MVPs.",
    price: "$2,500",
    period: "/project",
    features: [
      "1 engineering pillar",
      "Up to 40 hours",
      "Project-based delivery",
      "Email support",
      "30-day warranty",
    ],
    cta: "Start a Project",
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For scaling businesses that need ongoing engineering.",
    price: "$8,000",
    period: "/month",
    features: [
      "Up to 3 engineering pillars",
      "Up to 160 hours/month",
      "Dedicated engineer",
      "Priority support",
      "Quarterly roadmap",
      "90-day warranty",
    ],
    cta: "Scale with Us",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large teams and complex systems.",
    price: "Custom",
    period: "",
    features: [
      "All 4 engineering pillars",
      "Unlimited hours",
      "Dedicated team",
      "24/7 support",
      "SLA guarantee",
      "On-site available",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28 text-center">
            <p className="text-overline font-semibold uppercase text-accent">Pricing</p>
            <h1 className="mt-3 max-w-3xl mx-auto text-display">Simple, transparent pricing</h1>
            <p className="mt-6 max-w-2xl mx-auto text-body-lg text-muted-foreground">
              Choose the plan that fits your stage. No hidden fees, no surprises.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? "border-primary shadow-md" : ""}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-h5">{plan.name}</CardTitle>
                    {plan.highlighted && (
                      <span className="rounded-full bg-primary px-3 py-1 text-caption font-semibold text-primary-foreground">
                        Popular
                      </span>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-h2 font-bold">{plan.price}</span>
                    <span className="text-body-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-body-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlighted ? "primary" : "outline"}
                    size="lg"
                    asChild
                    className="mt-8 w-full"
                  >
                    <Link href="/contact">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-h3">Frequently asked questions</h2>
          </div>
          <div className="mt-12 space-y-8">
            {[
              { q: "What's included in the hours?", a: "Engineering, design, code review, testing, and deployment. Meetings and planning are included." },
              { q: "Can I switch plans?", a: "Yes, you can upgrade or downgrade anytime. Changes take effect on the next billing cycle." },
              { q: "Do you offer custom pricing?", a: "For Enterprise clients, we tailor pricing based on scope, team size, and SLA requirements." },
              { q: "What technologies do you use?", a: "Next.js, TypeScript, Python, Go, Cloudflare, AWS, and modern AI/ML frameworks." },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-body font-semibold">{faq.q}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
