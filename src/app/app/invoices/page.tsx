import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { invoices, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ClientInvoicesPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  let invoiceList: { id: string; amount: string; status: string; dueDate: Date | null; createdAt: Date }[] = [];

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

      const filter = dbUser.role === "admin" ? undefined : eq(invoices.userId, dbUser.id);

      invoiceList = await db
        .select({
          id: invoices.id,
          amount: invoices.amount,
          status: invoices.status,
          dueDate: invoices.dueDate,
          createdAt: invoices.createdAt,
        })
        .from(invoices)
        .where(filter);
    } catch {
      // DB not available
    }
  }

  return (
    <Container>
      <div className="space-y-6">
        <h1 className="text-h3">Invoices</h1>
        {invoiceList.length === 0 ? (
          <p className="text-body text-muted-foreground">No invoices found.</p>
        ) : (
          <div className="space-y-4">
            {invoiceList.map((i) => (
              <Card key={i.id} className="border border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-h5 font-semibold">{i.amount}</p>
                      <p className="text-body-sm text-muted-foreground">Created {new Date(i.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {i.dueDate && (
                        <span className="text-body-sm text-muted-foreground">
                          Due {new Date(i.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">{i.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
