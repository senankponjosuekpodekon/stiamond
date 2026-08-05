import Link from "next/link";
import { Container } from "@/components/container";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/company" },
    { label: "Vision", href: "/company/vision" },
    { label: "Leadership", href: "/company/leadership" },
    { label: "Careers", href: "/company/careers" },
    { label: "Partners", href: "/company/partners" },
  ],
  Solutions: [
    { label: "AI Engineering", href: "/solutions/ai" },
    { label: "Software Engineering", href: "/solutions/software" },
    { label: "Cloud Infrastructure", href: "/solutions/cloud" },
    { label: "Growth Systems", href: "/solutions/growth" },
    { label: "Automation", href: "/solutions/automation" },
  ],
  Products: [
    { label: "MEDIM", href: "/products/medim" },
    { label: "AI Platform", href: "/products/ai-platform" },
    { label: "APIs", href: "/products/apis" },
    { label: "Developer SDK", href: "/products/sdk" },
    { label: "Marketplace", href: "/products/marketplace" },
  ],
  Resources: [
    { label: "Blog", href: "/resources/blog" },
    { label: "Documentation", href: "/developers" },
    { label: "Research", href: "/resources/research" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-1/50">
      <Container>
        <div className="py-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ai">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-body font-semibold">Stiamond</span>
              </Link>
              <p className="mt-4 max-w-xs text-body-sm text-muted-foreground">
                AI, Software & Cloud Engineering. We build intelligent digital
                systems that accelerate business growth.
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-overline font-semibold uppercase text-muted-foreground">
                  {title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-caption text-muted-foreground">
              © {new Date().getFullYear()} Stiamond. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-caption text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-caption text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/security"
                className="text-caption text-muted-foreground hover:text-foreground"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
