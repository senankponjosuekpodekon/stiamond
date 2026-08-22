import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

type PostData = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: Date;
  readingTime: string;
  isMdx: boolean;
};

async function getPost(slug: string): Promise<PostData | null> {
  // Source 1: MDX files
  const mdxPost = getPostBySlug(slug);
  if (mdxPost) {
    return {
      title: mdxPost.title,
      excerpt: mdxPost.excerpt,
      content: mdxPost.content,
      tags: mdxPost.tags,
      date: new Date(mdxPost.date),
      readingTime: mdxPost.readingTime,
      isMdx: true,
    };
  }

  // Source 2: DB
  if (process.env.DATABASE_URL) {
    try {
      const [result] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);
      if (result && result.status === "published") {
        const tags = result.tags ? result.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
        const date = result.publishedAt || result.createdAt;
        const words = result.content.split(/\s+/).length;
        return {
          title: result.title,
          excerpt: result.excerpt,
          content: result.content,
          tags,
          date: new Date(date),
          readingTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
          isMdx: false,
        };
      }
    } catch {
      // DB not available
    }
  }

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <Container size="md">
      <article className="py-20 md:py-28">
        <Link href="/blog" className="inline-flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          {t("backToBlog")}
        </Link>

        <div className="mt-8 flex items-center gap-3 text-caption text-muted-foreground">
          <time>{post.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-4 text-h1">{post.title}</h1>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg mt-12 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-h3 prose-h3:text-h4 prose-a:text-primary prose-code:rounded prose-code:bg-surface-1 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-body-sm prose-code:before:content-none prose-code:after:content-none">
          {post.isMdx ? (
            <MDXRemote source={post.content} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Button variant="outline" size="lg" asChild>
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
