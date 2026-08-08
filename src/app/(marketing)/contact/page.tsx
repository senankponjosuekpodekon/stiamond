import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Stiamond for your next AI, software, or cloud project.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">Contact</p>
            <h1 className="mt-3 max-w-3xl text-display">Let&apos;s build something intelligent</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              Tell us about your project. We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="text-h4">Get in touch</h2>
              <p className="mt-4 text-body text-muted-foreground">
                Whether you have a specific project in mind or just want to explore
                possibilities, we&apos;re here to help.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-body-sm font-medium">Email</div>
                    <a href="mailto:hello@stiamond.net" className="text-body-sm text-muted-foreground hover:text-foreground">
                      hello@stiamond.net
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Phone className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-body-sm font-medium">Phone</div>
                    <a href="tel:+10000000000" className="text-body-sm text-muted-foreground hover:text-foreground">
                      +1 (000) 000-0000
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <MapPin className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-body-sm font-medium">Location</div>
                    <span className="text-body-sm text-muted-foreground">Remote · Global</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="text-body-sm font-medium">First name</label>
                        <Input placeholder="John" className="mt-2" />
                      </div>
                      <div>
                        <label className="text-body-sm font-medium">Last name</label>
                        <Input placeholder="Doe" className="mt-2" />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="text-body-sm font-medium">Email</label>
                        <Input type="email" placeholder="john@company.com" className="mt-2" />
                      </div>
                      <div>
                        <label className="text-body-sm font-medium">Company</label>
                        <Input placeholder="Company Inc." className="mt-2" />
                      </div>
                    </div>
                    <div>
                      <label className="text-body-sm font-medium">Project type</label>
                      <select className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <option>AI Engineering</option>
                        <option>Software Engineering</option>
                        <option>Cloud Infrastructure</option>
                        <option>Growth Systems</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-body-sm font-medium">Message</label>
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={5}
                        className="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <Button variant="primary" size="lg" className="w-full">
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
