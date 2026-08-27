import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { invoices, projects, siteSettings, users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Printer } from "lucide-react";
import { PaymentSection } from "./payment-section";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface InvoicePageProps {
  params: Promise<{ id: string }>;
}

export default async function InvoiceDetailPage({ params }: InvoicePageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const { id } = await params;

  const [dbUser] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!dbUser) redirect("/login");

  const conditions = [eq(invoices.id, id)];
  if (dbUser.role !== "admin") {
    conditions.push(eq(invoices.userId, dbUser.id));
  }

  const [invoice] = await db
    .select({
      id: invoices.id,
      amount: invoices.amount,
      status: invoices.status,
      paymentMethod: invoices.paymentMethod,
      paidAt: invoices.paidAt,
      dueDate: invoices.dueDate,
      createdAt: invoices.createdAt,
      projectId: invoices.projectId,
    })
    .from(invoices)
    .where(and(...conditions))
    .limit(1);

  if (!invoice) notFound();

  let paymentSettings: {
    bank: { enabled: boolean; details: string };
    crypto: { enabled: boolean; details: string };
    mobile: { enabled: boolean; details: string };
    other: { enabled: boolean; details: string };
    stripe: { enabled: boolean; details: string };
  } = { bank: { enabled: false, details: "" }, crypto: { enabled: false, details: "" }, mobile: { enabled: false, details: "" }, other: { enabled: false, details: "" }, stripe: { enabled: false, details: "" } };

  if (process.env.DATABASE_URL) {
    try {
      const [setting] = await db
        .select({ value: siteSettings.value })
        .from(siteSettings)
        .where(eq(siteSettings.key, "payment_methods"))
        .limit(1);
      if (setting?.value) {
        paymentSettings = JSON.parse(setting.value) as typeof paymentSettings;
      }
    } catch {
      // ignore
    }
  }

  let projectName: string | null = null;
  if (invoice.projectId) {
    const [project] = await db
      .select({ name: projects.name })
      .from(projects)
      .where(eq(projects.id, invoice.projectId))
      .limit(1);
    projectName = project?.name ?? null;
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl print:max-w-none">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <h1 className="text-h3">Invoice</h1>
          <Button onClick={() => typeof window !== "undefined" && window.print()} variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print / Save as PDF
          </Button>
        </div>

        <Card className="border border-border print:border-none print:shadow-none">
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="h-6 w-6" />
                  <span className="text-h4 font-semibold">Stiamond</span>
                </div>
                <p className="mt-1 text-body-sm text-muted-foreground">
                  Intelligent software for ambitious teams
                </p>
              </div>
              <div className="text-right">
                <p className="text-caption text-muted-foreground">Invoice #{invoice.id.slice(0, 8).toUpperCase()}</p>
                <p className="text-caption text-muted-foreground">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-caption uppercase text-muted-foreground">Bill to</p>
                <p className="mt-1 text-body font-semibold">{session.user.name}</p>
                <p className="text-body-sm text-muted-foreground">{session.user.email}</p>
              </div>
              <div>
                <p className="text-caption uppercase text-muted-foreground">Status</p>
                <p className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-1 text-body-sm font-medium text-primary">
                  {invoice.status}
                </p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-body-sm font-semibold">Description</th>
                    <th className="px-4 py-3 text-right text-body-sm font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-4 text-body-sm">
                      {projectName ? `Project: ${projectName}` : "Professional services"}
                    </td>
                    <td className="px-4 py-4 text-right text-body-sm font-semibold">{invoice.amount}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-muted">
                  <tr>
                    <td className="px-4 py-3 text-right text-body-sm font-semibold">Total</td>
                    <td className="px-4 py-3 text-right text-body font-bold">{invoice.amount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {invoice.dueDate && (
              <p className="mt-6 text-body-sm text-muted-foreground">
                Due date: <span className="font-medium text-foreground">{new Date(invoice.dueDate).toLocaleDateString()}</span>
              </p>
            )}

            <PaymentSection
              invoiceId={invoice.id}
              status={invoice.status}
              paymentMethod={invoice.paymentMethod}
              methods={paymentSettings}
              stripeConfigured={Boolean(process.env.STRIPE_SECRET_KEY)}
            />

            <div className="mt-10 border-t border-border pt-6 text-center text-caption text-muted-foreground">
              Thank you for your business. Questions? Contact hello@stiamond.net
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
