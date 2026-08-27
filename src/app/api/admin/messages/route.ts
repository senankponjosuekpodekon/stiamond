import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ conversations: [] });
    }

    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));

    const replies = await db
      .select()
      .from(messageReplies)
      .orderBy(asc(messageReplies.createdAt));

    const conversations = messages.map((msg) => {
      const msgReplies = replies.filter((r) => r.contactMessageId === msg.id);
      const lastReplyAt = msgReplies.length > 0
        ? msgReplies[msgReplies.length - 1].createdAt
        : msg.createdAt;
      const hasUnreadClientReplies = msgReplies.some(
        (r) => r.senderType === "client" && !r.isRead
      );
      return {
        ...msg,
        metadata: (msg.metadata as Record<string, unknown> | null) ?? null,
        replies: msgReplies,
        lastReplyAt,
        hasUnread: !msg.isRead || hasUnreadClientReplies,
        replyCount: msgReplies.length,
      };
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    logger.apiError("/api/admin/messages", "GET", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { messageIds, replyIds } = body as {
      messageIds?: string[];
      replyIds?: string[];
    };

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ message: "Database not configured" }, { status: 503 });
    }

    if (messageIds && messageIds.length > 0) {
      for (const id of messageIds) {
        await db
          .update(contactMessages)
          .set({ isRead: true })
          .where(eq(contactMessages.id, id));
      }
    }

    if (replyIds && replyIds.length > 0) {
      for (const id of replyIds) {
        await db
          .update(messageReplies)
          .set({ isRead: true })
          .where(eq(messageReplies.id, id));
      }
    }

    return NextResponse.json({ message: "Marked as read" });
  } catch (error) {
    logger.apiError("/api/admin/messages", "PATCH", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
