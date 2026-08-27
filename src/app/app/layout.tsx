import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Briefcase, Receipt, LogOut, User } from "lucide-react";

export const runtime = "nodejs";

export default async function AppLayout({
  children,
}: {
  children: ReactNode;
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

  const nav = [
    { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/app/projects", label: "Projects", icon: Briefcase },
    { href: "/app/invoices", label: "Invoices", icon: Receipt },
    { href: "/app/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-surface-1/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/" className="text-body font-semibold">
            Stiamond Digital
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-body-sm font-medium text-muted-foreground transition-colors hover:bg-surface-1 hover:text-foreground"
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border p-4">
          <div className="mb-4 text-body-sm text-muted-foreground">
            {session.user.name}
            {isAdmin && (
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">
                Admin
              </span>
            )}
          </div>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-2 text-body-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-sticky flex h-16 items-center justify-between border-b border-border bg-background/90 px-6 backdrop-blur-lg lg:hidden">
          <span className="text-body font-semibold">Client Portal</span>
          <span className="text-body-sm text-muted-foreground">{session.user.name}</span>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
