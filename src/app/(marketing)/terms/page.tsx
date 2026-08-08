import { Container } from "@/components/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Stiamond's services.",
};

export default function TermsPage() {
  return (
    <Container>
      <div className="py-20 md:py-28">
        <h1 className="text-h1">Terms of Service</h1>
        <p className="mt-4 text-body-sm text-muted-foreground">Last updated: August 2026</p>

        <div className="mt-12 max-w-3xl space-y-8">
          <section>
            <h2 className="text-h4">1. Acceptance of Terms</h2>
            <p className="mt-4 text-body text-muted-foreground">
              By accessing or using Stiamond&apos;s website and services, you agree to be
              bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-h4">2. Services</h2>
            <p className="mt-4 text-body text-muted-foreground">
              Stiamond provides AI engineering, software engineering, cloud infrastructure,
              and growth systems services. Specific deliverables, timelines, and pricing
              are defined in individual project agreements.
            </p>
          </section>

          <section>
            <h2 className="text-h4">3. Intellectual Property</h2>
            <p className="mt-4 text-body text-muted-foreground">
              All custom work delivered to clients is transferred upon full payment,
              unless otherwise specified in the project agreement. Stiamond retains
              ownership of its proprietary tools, frameworks, and platform components.
            </p>
          </section>

          <section>
            <h2 className="text-h4">4. Payment</h2>
            <p className="mt-4 text-body text-muted-foreground">
              Payment terms are defined per project agreement. Invoices are due within 30
              days of issuance. Late payments may incur interest charges as permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-h4">5. Confidentiality</h2>
            <p className="mt-4 text-body text-muted-foreground">
              Both parties agree to keep confidential all proprietary information shared
              during the course of engagement. This obligation survives termination of
              the agreement.
            </p>
          </section>

          <section>
            <h2 className="text-h4">6. Limitation of Liability</h2>
            <p className="mt-4 text-body text-muted-foreground">
              Stiamond&apos;s liability is limited to the fees paid for the specific project
              giving rise to the claim. We are not liable for indirect, incidental, or
              consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-h4">7. Contact</h2>
            <p className="mt-4 text-body text-muted-foreground">
              For legal inquiries, contact us at{" "}
              <a href="mailto:legal@stiamond.net" className="text-primary hover:underline">legal@stiamond.net</a>.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
