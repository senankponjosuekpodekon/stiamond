import { Container } from "@/components/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Stiamond collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <Container>
      <div className="py-20 md:py-28">
        <h1 className="text-h1">Privacy Policy</h1>
        <p className="mt-4 text-body-sm text-muted-foreground">Last updated: August 2026</p>

        <div className="mt-12 max-w-3xl space-y-8">
          <section>
            <h2 className="text-h4">1. Introduction</h2>
            <p className="mt-4 text-body text-muted-foreground">
              Stiamond (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
              This policy explains how we collect, use, and safeguard your personal data
              when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-h4">2. Data We Collect</h2>
            <p className="mt-4 text-body text-muted-foreground">
              We collect the following types of data:
            </p>
            <ul className="mt-4 space-y-2 text-body text-muted-foreground">
              <li><strong className="text-foreground">Contact data:</strong> name, email, company, phone number when you submit forms.</li>
              <li><strong className="text-foreground">Account data:</strong> email, password (hashed), profile information.</li>
              <li><strong className="text-foreground">Usage data:</strong> pages visited, browser type, IP address, timestamps.</li>
              <li><strong className="text-foreground">Project data:</strong> information you share about your projects and requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4">3. How We Use Your Data</h2>
            <ul className="mt-4 space-y-2 text-body text-muted-foreground">
              <li>To provide and maintain our services</li>
              <li>To respond to your inquiries and provide support</li>
              <li>To send project updates and relevant communications</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4">4. Data Storage & Security</h2>
            <p className="mt-4 text-body text-muted-foreground">
              Your data is stored in encrypted PostgreSQL databases hosted on Neon,
              with edge delivery via Cloudflare. We use industry-standard encryption
              (TLS 1.3 in transit, AES-256 at rest) and follow OWASP security practices.
              Access is restricted via RBAC and audit logging.
            </p>
          </section>

          <section>
            <h2 className="text-h4">5. Your Rights</h2>
            <p className="mt-4 text-body text-muted-foreground">
              Under GDPR and similar regulations, you have the right to:
            </p>
            <ul className="mt-4 space-y-2 text-body text-muted-foreground">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4">6. Contact</h2>
            <p className="mt-4 text-body text-muted-foreground">
              For privacy inquiries, contact us at{" "}
              <a href="mailto:privacy@stiamond.net" className="text-primary hover:underline">privacy@stiamond.net</a>.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
