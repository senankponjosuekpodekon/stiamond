"use server";

import { db } from "@/lib/db";
import { invoices, projects, users } from "@/lib/db/schema";
import { sendInvoiceNotification } from "@/lib/email";
import { logger } from "@/lib/logger";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createInvoice(formData: FormData) {
  const userId = formData.get("userId") as string;
  const projectId = (formData.get("projectId") as string) || null;
  const amount = formData.get("amount") as string;
  const dueDate = formData.get("dueDate") as string;
  const status = (formData.get("status") as string) || "pending";

  if (!userId || !amount) {
    throw new Error("Client and amount are required");
  }

  const [client] = await db
    .select({ email: users.email, firstName: users.firstName, lastName: users.lastName })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!client) {
    throw new Error("Client not found");
  }

  let projectName: string | null = null;

  if (projectId) {
    const [project] = await db
      .select({ name: projects.name })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);
    projectName = project?.name ?? null;
  }

  const [inserted] = await db
    .insert(invoices)
    .values({
      userId,
      projectId,
      amount,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
    })
    .returning({ id: invoices.id });

  const baseUrl = process.env.AUTH_URL || "http://localhost:3000";
  const invoiceUrl = `${baseUrl}/app/invoices/${inserted.id}`;

  try {
    await sendInvoiceNotification({
      to: client.email,
      clientName: `${client.firstName} ${client.lastName}`,
      amount,
      dueDate,
      status,
      projectName,
      invoiceUrl,
    });
  } catch (error) {
    logger.error("Invoice email failed", error, { userId, invoiceId: inserted.id });
  }

  redirect("/admin/invoices");
}

export async function markInvoiceAsPaid(formData: FormData) {
  const id = formData.get("id") as string;
  const method = (formData.get("method") as string) || "manual";

  if (!id) {
    throw new Error("Invoice ID is required");
  }

  const [invoice] = await db
    .select({ id: invoices.id })
    .from(invoices)
    .where(eq(invoices.id, id))
    .limit(1);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  await db
    .update(invoices)
    .set({
      status: "paid",
      paymentMethod: method,
      paidAt: new Date(),
    })
    .where(eq(invoices.id, id));
}
