import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactNotification } from "@/lib/email";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      );
    }

    const replyToken = crypto.randomUUID().replace(/-/g, "");

    const forwardedFor = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
    const userAgent = request.headers.get("user-agent") ?? null;

    const metadata = data.metadata as Record<string, unknown> | undefined;

    const [inserted] = await db
      .insert(contactMessages)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company || null,
        projectType: data.projectType,
        message: data.message,
        replyToken,
        metadata: {
          ...metadata,
          ip,
          userAgent,
        } as Record<string, unknown>,
      })
      .returning({ id: contactMessages.id });

    try {
      await sendContactNotification(data);
    } catch (emailError) {
      logger.error("Chat: failed to send notification email", emailError);
    }

    return NextResponse.json(
      { id: inserted.id, replyToken, message: "Chat started" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const [msg] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.replyToken, token))
      .limit(1);

    if (!msg) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const replies = await db
      .select()
      .from(messageReplies)
      .where(eq(messageReplies.contactMessageId, msg.id))
      .orderBy(asc(messageReplies.createdAt));

    return NextResponse.json({
      message: {
        id: msg.id,
        firstName: msg.firstName,
        message: msg.message,
        createdAt: msg.createdAt,
      },
      replies: replies.map((r) => ({
        id: r.id,
        senderType: r.senderType,
        message: r.message,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    logger.apiError("/api/chat", "GET", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
