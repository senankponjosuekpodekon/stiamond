import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("blog");
}

type BlogPostItem = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: Date;
  readingTime: string;
};

export default async function BlogPage() {
  const t = useTranslations("blog");

  const allPosts: BlogPostItem[] = [];

  // Source 1: MDX files
  try {
    const mdxPosts = getAllPosts();
    for (const p of mdxPosts) {
      allPosts.push({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        tags: p.tags,
        date: new Date(p.date),
        readingTime: p.readingTime,
      });
    }
  } catch {
    // MDX read failed
  }

  // Source 2: DB published posts
  if (process.env.DATABASE_URL) {
    try {
      const dbPosts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"))
        .orderBy(desc(blogPosts.publishedAt));

      for (const p of dbPosts) {
        // Skip if already exists from MDX (same slug)
        if (allPosts.some((x) => x.slug === p.slug)) continue;
        const tags = p.tags ? p.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
        const date = p.publishedAt || p.createdAt;
        const words = p.content.split(/\s+/).length;
        allPosts.push({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          tags,
          date: new Date(date),
          readingTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
        });
      }
    } catch {
      // DB not available
    }
  }

  // Sort all by date descending
  allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

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
          {allPosts.length === 0 ? (
            <p className="text-body-lg text-muted-foreground">{t("noPosts")}</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {allPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-caption text-muted-foreground">
                    <time>{post.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-3 text-h4 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="mt-3 text-body text-muted-foreground">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
