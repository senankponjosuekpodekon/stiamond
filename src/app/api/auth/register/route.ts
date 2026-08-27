import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/auth/password";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((issue) => issue.message).join(". ") },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, password } = parsed.data;

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);

  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    firstName,
    lastName,
    email: email.toLowerCase(),
    passwordHash,
    role: "client",
  });

  return NextResponse.json({ success: true });
}
