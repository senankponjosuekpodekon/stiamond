import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("blog");
}

export default async function BlogPage() {
  const t = useTranslations("blog");

  let posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    tags: string | null;
    publishedAt: Date | null;
  }> = [];

  if (process.env.DATABASE_URL) {
    try {
      posts = await db
        .select({
          slug: blogPosts.slug,
          title: blogPosts.title,
          excerpt: blogPosts.excerpt,
          tags: blogPosts.tags,
          publishedAt: blogPosts.publishedAt,
        })
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"))
        .orderBy(desc(blogPosts.publishedAt));
    } catch {
      // DB not available
    }
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
          {posts.length === 0 ? (
            <p className="text-body-lg text-muted-foreground">{t("noPosts")}</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {posts.map((post) => {
                const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
                const date = post.publishedAt || new Date();
                const words = post.excerpt.split(/\s+/).length;
                const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 text-caption text-muted-foreground">
                      <time>{new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                      <span>·</span>
                      <span>{readingTime}</span>
                    </div>
                    <h2 className="mt-3 text-h4 group-hover:text-primary transition-colors">{post.title}</h2>
                    <p className="mt-3 text-body text-muted-foreground">{post.excerpt}</p>
                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="rounded-md bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
