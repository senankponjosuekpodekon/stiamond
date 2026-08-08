import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("blog");
}

export default function BlogPage() {
  const t = useTranslations("blog");
  const posts = getAllPosts();

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
          {posts.length === 0 ? (
            <p className="text-body-lg text-muted-foreground">{t("noPosts")}</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-caption text-muted-foreground">
                    <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-3 text-h4 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="mt-3 text-body text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
