"use server";

import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";
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

  await db.insert(invoices).values({
    userId,
    projectId,
    amount,
    status,
    dueDate: dueDate ? new Date(dueDate) : null,
  });

  redirect("/admin/invoices");
}
