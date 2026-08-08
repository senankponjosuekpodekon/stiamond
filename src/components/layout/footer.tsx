import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";

const footerLinks = {
  Company: [
    { label: "About", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Client Portal", href: "/client-portal" },
  ],
  Solutions: [
    { label: "AI Engineering", href: "/solutions/ai" },
    { label: "Software Engineering", href: "/solutions/software" },
    { label: "Cloud Infrastructure", href: "/solutions/cloud" },
    { label: "Growth Systems", href: "/solutions/growth" },
  ],
  Products: [
    { label: "All Products", href: "/products" },
    { label: "Industries", href: "/industries" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "Developers", href: "/developers" },
    { label: "Case Studies", href: "/case-studies" },
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
                <Image
                  src="/logo.png"
                  alt="Stiamond"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
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
