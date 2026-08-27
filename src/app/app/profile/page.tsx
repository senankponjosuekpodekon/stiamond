import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { PasswordForm } from "./password-form";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  let role = "client";

  if (process.env.DATABASE_URL) {
    const [user] = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);
    if (user) role = user.role;
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-h3">Profile</h1>

        <Card className="border border-border">
          <CardContent className="space-y-4 p-6">
            <div>
              <p className="text-body-sm text-muted-foreground">Name</p>
              <p className="text-body font-medium">{session.user.name}</p>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground">Email</p>
              <p className="text-body font-medium">{session.user.email}</p>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground">Role</p>
              <p className="text-body font-medium capitalize">{role}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-6">
            <h2 className="text-h5 font-semibold">Change password</h2>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
