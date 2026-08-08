"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  };

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
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-7 w-7" strokeWidth={2} />
                      </div>
                      <h2 className="mt-6 text-h4">Message sent!</h2>
                      <p className="mt-2 text-body text-muted-foreground">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="text-body-sm font-medium">First name</label>
                          <Input {...register("firstName")} placeholder="John" className="mt-2" />
                          {errors.firstName && (
                            <p className="mt-1 text-caption text-destructive">{errors.firstName.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-body-sm font-medium">Last name</label>
                          <Input {...register("lastName")} placeholder="Doe" className="mt-2" />
                          {errors.lastName && (
                            <p className="mt-1 text-caption text-destructive">{errors.lastName.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="text-body-sm font-medium">Email</label>
                          <Input {...register("email")} type="email" placeholder="john@company.com" className="mt-2" />
                          {errors.email && (
                            <p className="mt-1 text-caption text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-body-sm font-medium">Company</label>
                          <Input {...register("company")} placeholder="Company Inc." className="mt-2" />
                        </div>
                      </div>
                      <div>
                        <label className="text-body-sm font-medium">Project type</label>
                        <select
                          {...register("projectType")}
                          className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select a type...</option>
                          <option value="ai">AI Engineering</option>
                          <option value="software">Software Engineering</option>
                          <option value="cloud">Cloud Infrastructure</option>
                          <option value="growth">Growth Systems</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.projectType && (
                          <p className="mt-1 text-caption text-destructive">{errors.projectType.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-body-sm font-medium">Message</label>
                        <textarea
                          {...register("message")}
                          placeholder="Tell us about your project..."
                          rows={5}
                          className="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        {errors.message && (
                          <p className="mt-1 text-caption text-destructive">{errors.message.message}</p>
                        )}
                      </div>
                      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
