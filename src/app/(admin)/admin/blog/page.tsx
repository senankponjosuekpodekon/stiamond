import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const runtime = "nodejs";

export default async function AdminBlogPage() {
  let posts: typeof blogPosts.$inferSelect[] = [];

  if (process.env.DATABASE_URL) {
    try {
      posts = await db.select().from(blogPosts);
    } catch {
      // DB not available
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h3">Blog Posts</h2>
          <p className="mt-2 text-body text-muted-foreground">
            Create, edit, and manage your blog content.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-body text-muted-foreground">
            No posts yet. Click &quot;New Post&quot; to create your first article.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead className="border-b border-border bg-surface-1/40">
              <tr>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Title</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-right text-body-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-1/30">
                  <td className="px-4 py-3">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-caption text-muted-foreground">/{post.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-caption font-medium ${
                        post.status === "published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="rounded-md p-2 text-muted-foreground hover:bg-surface-1 hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <form action={`/api/admin/blog/${post.id}`} method="post">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button
                          type="submit"
                          className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
