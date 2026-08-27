"use server";

import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function selectPaymentMethod(
  invoiceId: string,
  method: "bank" | "crypto" | "stripe",
  paid: boolean
) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("Service unavailable");
  }

  const [invoice] = await db
    .select({ userId: invoices.userId, status: invoices.status })
    .from(invoices)
    .where(eq(invoices.id, invoiceId))
    .limit(1);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  if (invoice.status === "paid") {
    throw new Error("Invoice already paid");
  }

  const newStatus = paid ? "awaiting_payment" : "pending";
  const paidAt = paid ? new Date() : null;

  await db
    .update(invoices)
    .set({
      paymentMethod: method,
      status: newStatus,
      paidAt,
    })
    .where(eq(invoices.id, invoiceId));
}
