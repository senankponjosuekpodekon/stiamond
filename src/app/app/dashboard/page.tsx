import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { invoices, projects, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Receipt, Activity, DollarSign } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  let userId = "";
  let role = "client";
  let projectCount = 0;
  let activeProjects = 0;
  let invoiceCount = 0;
  let pendingInvoices = 0;
  let totalInvoiced = "$0";
  let projectList: { id: string; name: string; status: string }[] = [];
  let invoiceList: { id: string; amount: string; status: string; dueDate: Date | null }[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const [dbUser] = await db
        .select({ id: users.id, role: users.role })
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

      if (!dbUser) {
        redirect("/login");
      }

      userId = dbUser.id;
      role = dbUser.role;

      const projectFilter = role === "admin" ? undefined : eq(projects.userId, userId);
      const invoiceFilter = role === "admin" ? undefined : eq(invoices.userId, userId);

      const allProjects = await db
        .select({ id: projects.id, name: projects.name, status: projects.status })
        .from(projects)
        .where(projectFilter);
      projectList = allProjects;
      projectCount = allProjects.length;
      activeProjects = allProjects.filter((p) => p.status === "active").length;

      const allInvoices = await db
        .select({ id: invoices.id, amount: invoices.amount, status: invoices.status, dueDate: invoices.dueDate })
        .from(invoices)
        .where(invoiceFilter);
      invoiceList = allInvoices;
      invoiceCount = allInvoices.length;
      pendingInvoices = allInvoices.filter((i) => i.status === "pending").length;

      const total = allInvoices.reduce((sum, i) => {
        const value = parseFloat(i.amount.replace(/[^0-9.]/g, "")) || 0;
        return sum + value;
      }, 0);
      totalInvoiced = total > 0 ? `$${total.toLocaleString()}` : "$0";
    } catch {
      // DB not available
    }
  }

  const stats = [
    { icon: Briefcase, label: "Projects", value: projectCount, sub: `${activeProjects} active` },
    { icon: Receipt, label: "Invoices", value: invoiceCount, sub: `${pendingInvoices} pending` },
    { icon: Activity, label: "Active", value: activeProjects, sub: "ongoing" },
    { icon: DollarSign, label: "Total invoiced", value: totalInvoiced, sub: "all time" },
  ];

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-h3">Welcome, {session.user.name}</h1>
          <p className="mt-2 text-body text-muted-foreground">{session.user.email}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span className="text-body-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="mt-4 text-h3 font-bold">{stat.value}</p>
                <p className="text-caption text-muted-foreground">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border border-border">
            <CardContent className="p-6">
              <h2 className="text-h5 font-semibold">Projects</h2>
              {projectList.length === 0 ? (
                <p className="mt-4 text-body text-muted-foreground">No projects yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {projectList.slice(0, 5).map((p) => (
                    <li key={p.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                      <span className="text-body-sm">{p.name}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">{p.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h2 className="text-h5 font-semibold">Invoices</h2>
              {invoiceList.length === 0 ? (
                <p className="mt-4 text-body text-muted-foreground">No invoices yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {invoiceList.slice(0, 5).map((i) => (
                    <li key={i.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                      <span className="text-body-sm">{i.amount}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">{i.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
