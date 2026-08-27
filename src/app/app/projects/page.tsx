import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ClientProjectsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  let projectList: { id: string; name: string; description: string | null; status: string; createdAt: Date }[] = [];

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

      const filter = dbUser.role === "admin" ? undefined : eq(projects.userId, dbUser.id);

      projectList = await db
        .select({
          id: projects.id,
          name: projects.name,
          description: projects.description,
          status: projects.status,
          createdAt: projects.createdAt,
        })
        .from(projects)
        .where(filter);
    } catch {
      // DB not available
    }
  }

  return (
    <Container>
      <div className="space-y-6">
        <h1 className="text-h3">Projects</h1>
        {projectList.length === 0 ? (
          <p className="text-body text-muted-foreground">No projects found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {projectList.map((p) => (
              <Card key={p.id} className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-body font-semibold">{p.name}</h2>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">{p.status}</span>
                  </div>
                  <p className="mt-2 text-body-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-4 text-caption text-muted-foreground">
                    Started {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
