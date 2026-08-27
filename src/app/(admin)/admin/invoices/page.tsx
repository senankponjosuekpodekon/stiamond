import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminInvoicesPage() {
  let invoiceList: {
    id: string;
    amount: string;
    status: string;
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
