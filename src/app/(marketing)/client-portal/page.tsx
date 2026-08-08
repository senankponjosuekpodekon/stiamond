import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, LayoutDashboard, FileText, CreditCard } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Access your Stiamond client dashboard.",
};

const features = [
  { icon: LayoutDashboard, title: "Project Dashboard", description: "Track progress, milestones, and deliverables in real time." },
  { icon: FileText, title: "Documents", description: "Access contracts, proposals, and project documentation." },
  { icon: CreditCard, title: "Invoices", description: "View and download invoices, payment history, and receipts." },
];

export default function ClientPortalPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Lock className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 text-display">Client Portal</h1>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-muted-foreground">
              Secure access to your projects, documents, and invoices.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-md">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-h5 font-semibold">Sign in to your portal</h2>
                <p className="mt-2 text-body-sm text-muted-foreground">
                  Enter your credentials to access your dashboard.
                </p>
                <form className="mt-6 space-y-4">
                  <div>
                    <label className="text-body-sm font-medium">Email</label>
                    <Input type="email" placeholder="you@company.com" className="mt-2" />
                  </div>
                  <div>
                    <label className="text-body-sm font-medium">Password</label>
                    <Input type="password" placeholder="••••••••" className="mt-2" />
                  </div>
                  <Button variant="primary" size="lg" asChild className="w-full">
                    <Link href="/login">
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </form>
                <p className="mt-6 text-center text-body-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-medium text-primary hover:underline">
                    Request access
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
            <h2 className="text-h3">What you get</h2>
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
