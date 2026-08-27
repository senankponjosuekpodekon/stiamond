"use server";

import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "invoices");

export async function selectPaymentMethod(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("Service unavailable");
  }

  const invoiceId = formData.get("invoiceId") as string;
  const method = formData.get("method") as string;
  const paid = formData.get("paid") === "true";
  const reference = (formData.get("reference") as string) || null;
  const proof = formData.get("proof") as File | null;

  if (!invoiceId || !method) {
    throw new Error("Invoice and method are required");
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

  let paymentProofUrl: string | null = null;

  if (proof && proof.size > 0) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const ext = path.extname(proof.name) || ".bin";
    const filename = `${crypto.randomUUID()}${ext}`;
    const buffer = Buffer.from(await proof.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
    paymentProofUrl = `/uploads/invoices/${filename}`;
  }

  const newStatus = paid ? "awaiting_payment" : "pending";
  const paidAt = paid ? new Date() : null;

  await db
    .update(invoices)
    .set({
      paymentMethod: method,
      paymentReference: reference,
      paymentProofUrl,
      status: newStatus,
      paidAt,
    })
    .where(eq(invoices.id, invoiceId));

  revalidatePath(`/app/invoices/${invoiceId}`);
}
