import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import ContactForm from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("contact");
}

export default function ContactPage() {
  return <ContactForm />;
}
