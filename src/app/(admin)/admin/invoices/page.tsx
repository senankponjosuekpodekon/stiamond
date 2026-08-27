import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { markInvoiceAsPaid } from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminInvoicesPage() {
  let invoiceList: {
    id: string;
    amount: string;
    status: string;
    paymentMethod: string | null;
    paidAt: Date | null;
    dueDate: Date | null;
    createdAt: Date;
  }[] = [];

  if (process.env.DATABASE_URL) {
    try {
      invoiceList = await db.select().from(invoices);
    } catch {
      // DB not available
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h3">Invoices</h1>
        <Button asChild variant="primary" size="sm">
          <Link href="/admin/invoices/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Invoice
          </Link>
        </Button>
      </div>

      {invoiceList.length === 0 ? (
        <p className="text-body text-muted-foreground">No invoices found.</p>
      ) : (
        <div className="space-y-4">
          {invoiceList.map((invoice) => (
            <Card key={invoice.id} className="border border-border">
              <CardContent className="p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-h5 font-semibold">{invoice.amount}</p>
                    <p className="text-body-sm text-muted-foreground">
                      Created {new Date(invoice.createdAt).toLocaleDateString()}
                      {invoice.paymentMethod && ` · ${invoice.paymentMethod}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {invoice.dueDate && (
                      <span className="text-body-sm text-muted-foreground">
                        Due {new Date(invoice.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">
                      {invoice.status}
                    </span>
                    {invoice.status !== "paid" && (
                      <form action={markInvoiceAsPaid} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={invoice.id} />
                        <Input name="method" placeholder="Method (manual)" defaultValue={invoice.paymentMethod ?? "manual"} className="w-40" />
                        <Button type="submit" variant="outline" size="sm">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark paid
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
