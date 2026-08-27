import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const [contactMsg] = await db
      .select({ id: contactMessages.id })
      .from(contactMessages)
      .where(eq(contactMessages.replyToken, token))
      .limit(1);

    if (!contactMsg) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await db
      .update(contactMessages)
      .set({ lastClientActivityAt: new Date() })
      .where(eq(contactMessages.id, contactMsg.id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
