import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { Container } from "@/components/container";
import { Globe } from "lucide-react";
import ContactForm from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("contact");
}

export default function ContactPage() {
  return (
    <>
      <ContactForm />
      <section className="border-t border-border bg-surface-1/40 py-12">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <Globe className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-body font-semibold">International payments via Wise</h3>
              <p className="mt-1 text-body-sm text-muted-foreground">
                USD · EUR · GBP · CAD accepted. Based in Cotonou (UTC+1), available for European and US/Canada time zones.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
