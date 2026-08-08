import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post not found" };
    return {
      title: post.title,
      description: post.excerpt,
    };
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Container size="md">
      <article className="py-20 md:py-28">
        <Link href="/blog" className="inline-flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <div className="mt-8 flex items-center gap-3 text-caption text-muted-foreground">
          <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-4 text-h1">{post.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-surface-1 px-2.5 py-1 text-caption font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-lg mt-12 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-h3 prose-h3:text-h4 prose-a:text-primary prose-code:rounded prose-code:bg-surface-1 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-body-sm prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
          </Button>
        </div>
      </article>
    </Container>
  );
}
