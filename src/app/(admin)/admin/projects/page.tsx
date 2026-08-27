import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Briefcase } from "lucide-react";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  let projectList: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    createdAt: Date;
  }[] = [];

  if (process.env.DATABASE_URL) {
    try {
      projectList = await db.select().from(projects);
    } catch {
      // DB not available
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h3">Projects</h1>
        <Button asChild variant="primary" size="sm">
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {projectList.length === 0 ? (
        <p className="text-body text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projectList.map((project) => (
            <Card key={project.id} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Briefcase className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">
                    {project.status}
                  </span>
                </div>
                <h2 className="mt-4 text-body font-semibold">{project.name}</h2>
                <p className="mt-2 text-body-sm text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-caption text-muted-foreground">
                  Started {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
