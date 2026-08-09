import { useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const runtime = "nodejs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!process.env.DATABASE_URL) return { title: "Post not found" };
  try {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    if (!post) return { title: "Post not found" };
    return { title: post.title, description: post.excerpt };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = useTranslations("blog");

  let post: typeof blogPosts.$inferSelect | null = null;

  if (process.env.DATABASE_URL) {
    try {
      const [result] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);
      if (result && result.status === "published") {
        post = result;
      }
    } catch {
      // DB not available
    }
  }

  if (!post) notFound();

  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const date = post.publishedAt || post.createdAt;
  const words = post.content.split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  return (
    <Container size="md">
      <article className="py-20 md:py-28">
        <Link href="/blog" className="inline-flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          {t("backToBlog")}
        </Link>

        <div className="mt-8 flex items-center gap-3 text-caption text-muted-foreground">
          <time>{new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span>·</span>
          <span>{readingTime}</span>
        </div>

        <h1 className="mt-4 text-h1">{post.title}</h1>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg mt-12 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-h3 prose-h3:text-h4 prose-a:text-primary prose-code:rounded prose-code:bg-surface-1 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-body-sm prose-code:before:content-none prose-code:after:content-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              {t("allPosts")}
            </Link>
          </Button>
        </div>
      </article>
    </Container>
  );
}
