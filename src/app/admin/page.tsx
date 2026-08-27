import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts, users } from "@/lib/db/schema";
import { count } from "drizzle-orm";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Briefcase, Shield } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = session.user as { id: string; name: string; email: string; role: string };

  if (user.role !== "admin") {
    return (
      <section className="py-20 text-center">
        <h1 className="text-h3">Accès refusé</h1>
        <p className="mt-4 text-muted-foreground">Vous n&apos;avez pas les droits administrateur.</p>
      </section>
    );
  }

  const [userCount] = await db.select({ value: count() }).from(users).catch(() => [{ value: 0 }]);
  const [postCount] = await db.select({ value: count() }).from(blogPosts).catch(() => [{ value: 0 }]);

  const stats = [
    { label: "Utilisateurs", value: Number(userCount?.value ?? 0), icon: Users },
    { label: "Articles", value: Number(postCount?.value ?? 0), icon: FileText },
    { label: "Projets", value: 0, icon: Briefcase },
    { label: "Rôle", value: user.role, icon: Shield },
  ];

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="space-y-2">
          <h1 className="text-display">Tableau de bord</h1>
          <p className="text-body text-muted-foreground">
            Connecté en tant que {user.name} ({user.email})
          </p>
        </div>
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span className="text-body-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="mt-4 text-h3 font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
