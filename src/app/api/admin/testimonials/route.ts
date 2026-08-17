import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ testimonials: [] });
  }

  try {
    const items = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.sortOrder), asc(testimonials.createdAt));
    return NextResponse.json({ testimonials: items });
  } catch {
    return NextResponse.json({ testimonials: [] });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { clientName, clientRole, clientCompany, projectType, quoteEn, quoteFr, rating, status, sortOrder } = body;

    if (!clientName || !quoteEn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [item] = await db
      .insert(testimonials)
      .values({
        clientName,
        clientRole: clientRole || null,
        clientCompany: clientCompany || null,
        projectType: projectType || null,
        quoteEn,
        quoteFr: quoteFr || null,
        rating: rating || 5,
        status: status || "draft",
        sortOrder: sortOrder || 0,
      })
      .returning();

    return NextResponse.json({ testimonial: item }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
