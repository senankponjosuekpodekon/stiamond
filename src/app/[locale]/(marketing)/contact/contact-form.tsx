"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contactEmail, setContactEmail] = useState("hello@stiamond.net");
  const [contactPhone, setContactPhone] = useState("+229 00 00 00 00");
  const [contactLocation, setContactLocation] = useState("Remote · Global");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          if (data.settings.contact_email) setContactEmail(data.settings.contact_email);
          if (data.settings.contact_phone) setContactPhone(data.settings.contact_phone);
          if (data.settings.contact_location) setContactLocation(data.settings.contact_location);
        }
      })
      .catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccess(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: t("email"), value: contactEmail },
    { icon: Phone, label: t("phone"), value: contactPhone },
    { icon: MapPin, label: t("location"), value: contactLocation },
  ];

  if (success) {
    return (
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 text-h3">{t("form.success")}</h2>
            <p className="mt-2 text-body text-muted-foreground">
              {t("form.successDesc")}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container>
          <div className="py-20 md:py-28">
            <p className="text-overline font-semibold uppercase text-accent">{t("overline")}</p>
            <h1 className="mt-3 max-w-3xl text-display">{t("title")}</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="text-h3">{t("getInTouch")}</h2>
              <p className="mt-4 text-body text-muted-foreground">
                {t("getInTouchDesc")}
              </p>
              <div className="mt-8 space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <info.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-caption text-muted-foreground">{info.label}</div>
                      <div className="text-body-sm font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="text-body-sm font-medium">{t("form.firstName")}</label>
                    <Input id="firstName" {...register("firstName")} required className="mt-2" />
                    {errors.firstName && (
                      <p className="mt-1 text-caption text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="text-body-sm font-medium">{t("form.lastName")}</label>
                    <Input id="lastName" {...register("lastName")} required className="mt-2" />
                    {errors.lastName && (
                      <p className="mt-1 text-caption text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-body-sm font-medium">{t("form.email")}</label>
                    <Input id="email" {...register("email")} type="email" required className="mt-2" />
                    {errors.email && (
                      <p className="mt-1 text-caption text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="text-body-sm font-medium">{t("form.company")}</label>
                    <Input id="company" {...register("company")} className="mt-2" />
                  </div>
                </div>
                <div>
                  <label htmlFor="projectType" className="text-body-sm font-medium">{t("form.projectType")}</label>
                  <select
                    id="projectType"
                    {...register("projectType")}
                    required
                    className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">{t("form.selectType")}</option>
                    <option value="web">{t("form.typeWeb")}</option>
                    <option value="ecommerce">{t("form.typeEcommerce")}</option>
                    <option value="automation">{t("form.typeAutomation")}</option>
                    <option value="creative">{t("form.typeCreative")}</option>
                    <option value="growth">{t("form.typeGrowth")}</option>
                    <option value="other">{t("form.typeOther")}</option>
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-caption text-destructive">{errors.projectType.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="text-body-sm font-medium">{t("form.message")}</label>
                  <textarea
                    id="message"
                    {...register("message")}
                    required
                    rows={5}
                    placeholder={t("form.messagePlaceholder")}
                    className="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  {errors.message && (
                    <p className="mt-1 text-caption text-destructive">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" variant="primary" size="lg" disabled={loading || isSubmitting} className="w-full sm:w-auto">
                  {loading || isSubmitting ? t("form.sending") : t("form.send")}
                  {!loading && !isSubmitting && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
