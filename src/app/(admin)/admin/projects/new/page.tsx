import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createProject } from "../actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  let clients: { id: string; name: string }[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const allUsers = await db
        .select({ id: users.id, firstName: users.firstName, lastName: users.lastName })
        .from(users);
      clients = allUsers.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
      }));
    } catch {
      // DB not available
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-h3">New Project</h1>
        <p className="mt-2 text-body text-muted-foreground">Assign a project to a client.</p>

        <form action={createProject} className="mt-8 space-y-6">
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
            <label className="text-body-sm font-medium">Project name</label>
            <Input name="name" type="text" placeholder="E-commerce redesign" required className="mt-2" />
          </div>

          <div>
            <label className="text-body-sm font-medium">Description</label>
            <textarea
              name="description"
              rows={4}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-body-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Scope, deliverables, notes..."
            />
          </div>

          <div>
            <label className="text-body-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue="active"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-body-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary">
              Create Project
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/projects">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
