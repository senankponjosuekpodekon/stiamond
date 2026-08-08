import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-surface-1/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="text-body font-semibold">Stiamond</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {[
            { label: "Overview", href: "/app/dashboard" },
            { label: "Projects", href: "/app/projects" },
            { label: "Invoices", href: "/app/invoices" },
            { label: "Documents", href: "/app/documents" },
            { label: "Settings", href: "/app/settings" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-body-sm font-medium text-muted-foreground transition-colors hover:bg-surface-1 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-caption font-semibold">
              {session.user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-body-sm font-medium">{session.user?.name}</div>
              <div className="truncate text-caption text-muted-foreground">{session.user?.email}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-sticky flex h-16 items-center justify-between border-b border-border bg-background/90 px-6 backdrop-blur-lg">
          <h1 className="text-body font-semibold">Dashboard</h1>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="text-body-sm font-medium text-muted-foreground hover:text-foreground">
              Sign out
            </button>
          </form>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
