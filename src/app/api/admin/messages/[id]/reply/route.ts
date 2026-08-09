import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { sendReplyEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { message } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const [contactMsg] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, id))
      .limit(1);

    if (!contactMsg) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    let replyToken = contactMsg.replyToken;
    if (!replyToken) {
      replyToken = crypto.randomUUID().replace(/-/g, "");
      await db
        .update(contactMessages)
        .set({ replyToken })
        .where(eq(contactMessages.id, id));
    }

    await db.insert(messageReplies).values({
      contactMessageId: id,
      senderType: "admin",
      message: message.trim(),
      isRead: true,
    });

    await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));

    const baseUrl = process.env.AUTH_URL || "http://localhost:3000";
    const conversationUrl = `${baseUrl}/messages/${replyToken}`;

    try {
      await sendReplyEmail({
        to: contactMsg.email,
        recipientName: `${contactMsg.firstName} ${contactMsg.lastName}`,
        senderName: "Stiamond Team",
        message: message.trim(),
        conversationUrl,
        isClientEmail: true,
      });
    } catch (emailError) {
      logger.error("Admin reply: failed to send email to client", emailError, { contactMsgId: id });
    }

    logger.info("Admin reply sent", { contactMsgId: id, replyToken });

    return NextResponse.json({ message: "Reply sent successfully" }, { status: 200 });
  } catch (error) {
    logger.apiError("/api/admin/messages/[id]/reply", "POST", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
