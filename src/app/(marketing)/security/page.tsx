import { Container } from "@/components/container";
import { ShieldCheck, Lock, Eye, Bug, FileCheck, Server } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Stiamond's security practices and infrastructure.",
};

const practices = [
  { icon: Lock, title: "Encryption", description: "TLS 1.3 in transit, AES-256 at rest. All data encrypted by default." },
  { icon: ShieldCheck, title: "RBAC", description: "Role-based access control with least-privilege principle." },
  { icon: Eye, title: "Audit Logs", description: "Comprehensive logging of all access and modifications." },
  { icon: Bug, title: "Vulnerability Scanning", description: "Regular dependency audits and automated security scanning." },
  { icon: FileCheck, title: "Compliance", description: "GDPR-aligned data handling and OWASP best practices." },
  { icon: Server, title: "Infrastructure", description: "Edge-deployed on Cloudflare. PostgreSQL on Neon with isolation." },
];

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">Security</p>
            <h1 className="mt-3 max-w-3xl text-display">Security by design</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              Security is not an add-on. It&apos;s embedded in every layer of our
              architecture — from code to infrastructure to operations.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <div key={p.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <p.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2 className="mt-4 text-body font-semibold">{p.title}</h2>
                <p className="mt-2 text-body-sm text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-1/40 py-20">
        <Container size="md">
          <h2 className="text-h3">Responsible disclosure</h2>
          <p className="mt-4 text-body text-muted-foreground">
            If you discover a security vulnerability, please report it responsibly to{" "}
            <a href="mailto:security@stiamond.net" className="text-primary hover:underline">security@stiamond.net</a>.
            We commit to acknowledging receipt within 48 hours and providing a fix timeline
            within 72 hours.
          </p>
        </Container>
      </section>
    </>
  );
}
