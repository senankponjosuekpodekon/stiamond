import { db } from "@/lib/db";
import { projects, users } from "@/lib/db/schema";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createInvoice } from "../actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewInvoicePage() {
  let clients: { id: string; name: string }[] = [];
  let projectList: { id: string; name: string }[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const allUsers = await db.select({ id: users.id, firstName: users.firstName, lastName: users.lastName }).from(users);
      clients = allUsers.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
      }));

      const allProjects = await db.select({ id: projects.id, name: projects.name }).from(projects);
      projectList = allProjects;
    } catch {
      // DB not available
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-h3">New Invoice</h1>
        <p className="mt-2 text-body text-muted-foreground">Create an invoice for a client.</p>

        <form action={createInvoice} className="mt-8 space-y-6">
          <div>
            <label className="text-body-sm font-medium">Client</label>
            <select
              name="userId"
              required
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-body-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-body-sm font-medium">Project (optional)</label>
            <select
              name="projectId"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-body-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">None</option>
              {projectList.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-body-sm font-medium">Amount</label>
            <Input name="amount" type="text" placeholder="1 500 $" required className="mt-2" />
          </div>

          <div>
            <label className="text-body-sm font-medium">Due date</label>
            <Input name="dueDate" type="date" className="mt-2" />
          </div>

          <div>
            <label className="text-body-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue="pending"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-body-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary">
              Create Invoice
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/invoices">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
