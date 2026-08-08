import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Stiamond for your next AI, software, or cloud project.",
};

export default function ContactPage() {
  return <ContactForm />;
}
