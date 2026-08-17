import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavLinks } from "./nav-links";
import type { Metadata } from "next";

export const runtime = "nodejs";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  let isAdmin = false;

  if (process.env.DATABASE_URL) {
    try {
      const [user] = await db
        .select({ role: users.role })
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

      isAdmin = user?.role === "admin";
    } catch {
      isAdmin = false;
    }
  }

  if (!isAdmin) {
    redirect("/app/dashboard");
  }

  return (
    <div className="min-h-screen bg-surface-1/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="text-body font-semibold">Admin Panel</span>
        </div>
        <NavLinks />
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-body-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-sticky flex h-16 items-center justify-between border-b border-border bg-background/90 px-6 backdrop-blur-lg">
          <h1 className="text-body font-semibold">Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-body-sm text-muted-foreground">
              {session.user.name}
            </span>
            <form action="/api/auth/signout" method="post">
              <button type="submit" className="text-body-sm font-medium text-muted-foreground hover:text-foreground">
                Sign out
              </button>
            </form>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
