import { db } from "@/lib/db";
import { blogPosts, contactMessages, users } from "@/lib/db/schema";
import { FileText, Mail, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export const runtime = "nodejs";

export default async function AdminOverview() {
  let postCount = 0;
  let messageCount = 0;
  let userCount = 0;
  let publishedCount = 0;

  if (process.env.DATABASE_URL) {
    try {
      const allPosts = await db.select().from(blogPosts);
      postCount = allPosts.length;
      publishedCount = allPosts.filter((p) => p.status === "published").length;

      const allMessages = await db.select().from(contactMessages);
      messageCount = allMessages.length;

      const allUsers = await db.select().from(users);
      userCount = allUsers.length;
    } catch {
      // DB not available
    }
  }

  const stats = [
    { icon: FileText, label: "Total Posts", value: postCount, sub: `${publishedCount} published` },
    { icon: Mail, label: "Messages", value: messageCount, sub: "from contact form" },
    { icon: Users, label: "Users", value: userCount, sub: "registered" },
    { icon: TrendingUp, label: "Published", value: publishedCount, sub: "live posts" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3">Overview</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Manage your blog, messages, and users.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <stat.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
            </div>
            <div className="mt-4 text-h3 font-bold">{stat.value}</div>
            <div className="text-body-sm text-muted-foreground">{stat.label}</div>
            <div className="mt-1 text-caption text-muted-foreground">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-h5 font-semibold">Quick Actions</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <FileText className="h-4 w-4" />
            New Blog Post
          </Link>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-body-sm font-medium transition-colors hover:bg-surface-1"
          >
            <Mail className="h-4 w-4" />
            View Messages
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-body-sm font-medium transition-colors hover:bg-surface-1"
          >
            <Users className="h-4 w-4" />
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}
