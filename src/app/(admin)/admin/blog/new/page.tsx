"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;
    const status = formData.get("status") as string;

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, excerpt, content, tags, status }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to create post");
        setLoading(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-h3">New Blog Post</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Write a new article. Markdown is supported in the content field.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-body-sm text-destructive">
            {error}
          </div>
        )}

        <div>
          <label className="text-body-sm font-medium">Title</label>
          <Input name="title" placeholder="My Awesome Post" className="mt-2" required />
        </div>

        <div>
          <label className="text-body-sm font-medium">Slug</label>
          <Input name="slug" placeholder="my-awesome-post (auto-generated if empty)" className="mt-2" />
          <p className="mt-1 text-caption text-muted-foreground">
            URL: /blog/[slug]
          </p>
        </div>

        <div>
          <label className="text-body-sm font-medium">Excerpt</label>
          <Input name="excerpt" placeholder="Short summary of the post..." className="mt-2" required />
        </div>

        <div>
          <label className="text-body-sm font-medium">Tags</label>
          <Input name="tags" placeholder="AI, Cloud, Software (comma-separated)" className="mt-2" />
        </div>

        <div>
          <label className="text-body-sm font-medium">Content (Markdown)</label>
          <textarea
            name="content"
            rows={16}
            placeholder="# My Post&#10;&#10;Write your content here..."
            className="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
          />
        </div>

        <div>
          <label className="text-body-sm font-medium">Status</label>
          <select
            name="status"
            className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
