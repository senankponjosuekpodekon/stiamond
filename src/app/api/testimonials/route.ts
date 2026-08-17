import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ testimonials: [] });
  }

  try {
    const items = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.status, "published"))
      .orderBy(asc(testimonials.sortOrder), asc(testimonials.createdAt));
    return NextResponse.json({ testimonials: items });
  } catch {
    return NextResponse.json({ testimonials: [] });
  }
}
