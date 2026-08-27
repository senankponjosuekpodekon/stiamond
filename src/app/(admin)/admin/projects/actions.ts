"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const packName = (formData.get("packName") as string) || null;
  const description = formData.get("description") as string;
  const status = (formData.get("status") as string) || "active";

  if (!userId || !name) {
    throw new Error("Client and project name are required");
  }

  await db.insert(projects).values({
    userId,
    name,
    packName,
    description,
    status,
  });

  redirect("/admin/projects");
}
