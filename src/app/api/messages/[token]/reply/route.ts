import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";
import { sendReplyEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();
    const { message } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const [contactMsg] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.replyToken, token))
      .limit(1);

    if (!contactMsg) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    await db.insert(messageReplies).values({
      contactMessageId: contactMsg.id,
      senderType: "client",
      message: message.trim(),
    });

    const baseUrl = process.env.AUTH_URL || "http://localhost:3000";
    const conversationUrl = `${baseUrl}/messages/${token}`;

    try {
      await sendReplyEmail({
        to: process.env.CONTACT_TO_EMAIL || "hello@stiamond.net",
        recipientName: "Stiamond Team",
        senderName: `${contactMsg.firstName} ${contactMsg.lastName}`,
        message: message.trim(),
        conversationUrl,
        isClientEmail: false,
      });
    } catch (emailError) {
      logger.error("Client reply: failed to send email to admin", emailError, { token });
    }

    logger.info("Client reply sent", { contactMsgId: contactMsg.id, token });

    return NextResponse.json({ message: "Reply sent successfully" }, { status: 200 });
  } catch (error) {
    logger.apiError("/api/messages/[token]/reply", "POST", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
