"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/admin/blog/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.post) {
            setPost(data.post);
          } else {
            setError("Post not found");
          }
          setFetching(false);
        })
        .catch(() => {
          setError("Failed to load post");
          setFetching(false);
        });
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { id } = await params;
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      tags: formData.get("tags") as string,
      status: formData.get("status") as string,
    };

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to update post");
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

  if (fetching) {
    return <p className="text-body text-muted-foreground">Loading...</p>;
  }

  if (!post) {
    return <p className="text-body text-destructive">{error}</p>;
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-h3">Edit Post</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Update the article content and settings.
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
          <Input name="title" defaultValue={post.title} className="mt-2" required />
        </div>

        <div>
          <label className="text-body-sm font-medium">Slug</label>
          <Input name="slug" defaultValue={post.slug} className="mt-2" required />
        </div>

        <div>
          <label className="text-body-sm font-medium">Excerpt</label>
          <Input name="excerpt" defaultValue={post.excerpt} className="mt-2" required />
        </div>

        <div>
          <label className="text-body-sm font-medium">Tags</label>
          <Input name="tags" defaultValue={post.tags} className="mt-2" />
        </div>

        <div>
          <label className="text-body-sm font-medium">Content (Markdown)</label>
          <textarea
            name="content"
            rows={16}
            defaultValue={post.content}
            className="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
          />
        </div>

        <div>
          <label className="text-body-sm font-medium">Status</label>
          <select
            name="status"
            defaultValue={post.status}
            className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
