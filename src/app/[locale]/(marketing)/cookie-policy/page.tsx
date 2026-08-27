import { Container } from "@/components/container";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isFr = locale === "fr";
  return {
    title: isFr ? "Politique de cookies" : "Cookie Policy",
    description: isFr
      ? "Politique de cookies de Stiamond Digital"
      : "Stiamond Digital cookie policy",
    robots: { index: false, follow: false },
  };
}

export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";

  return (
    <section className="py-20">
      <Container>
        <article className="prose mx-auto max-w-3xl">
          <h1>{isFr ? "Politique de cookies" : "Cookie Policy"}</h1>
          <p>
            {isFr
              ? "Dernière mise à jour : 27 août 2026"
              : "Last updated: August 27, 2026"}
          </p>

          <h2>{isFr ? "Qu'est-ce qu'un cookie" : "What are cookies"}</h2>
          <p>
            {isFr
              ? "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils nous aident à faire fonctionner, sécuriser et améliorer l'expérience utilisateur."
              : "Cookies are small text files stored on your device when you visit a website. They help us operate, secure and improve the user experience."}
          </p>

          <h2>{isFr ? "Cookies utilisés" : "Cookies we use"}</h2>
          <ul>
            <li>
              <strong>{isFr ? "Nécessaires" : "Necessary"}</strong>
              {isFr
                ? " : authentification, session et sécurité (NextAuth, Cloudflare)."
                : " : authentication, session and security (NextAuth, Cloudflare)."}
            </li>
            <li>
              <strong>{isFr ? "Analytiques" : "Analytics"}</strong>
              {isFr
                ? " : Google Analytics et PostHog pour comprendre l'utilisation du site."
                : " : Google Analytics and PostHog to understand website usage."}
            </li>
            <li>
              <strong>{isFr ? "Marketing" : "Marketing"}</strong>
              {isFr
                ? " : Google Tag Manager pour la mesure et l'optimisation des campagnes."
                : " : Google Tag Manager for measurement and campaign optimization."}
            </li>
          </ul>

          <h2>{isFr ? "Vos choix" : "Your choices"}</h2>
          <p>
            {isFr
              ? "Vous pouvez gérer ou refuser les cookies via les paramètres de votre navigateur. Notez que certains cookies nécessaires ne peuvent pas être désactivés sans affecter le fonctionnement du site."
              : "You can manage or decline cookies through your browser settings. Please note that some necessary cookies cannot be disabled without affecting site functionality."}
          </p>

          <h2>{isFr ? "Contact" : "Contact"}</h2>
          <p>
            {isFr
              ? "Pour toute question, contactez hello@stiamond.net."
              : "For any question, contact hello@stiamond.net."}
          </p>
        </article>
      </Container>
    </section>
  );
}
