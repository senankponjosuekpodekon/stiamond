import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { desc, asc } from "drizzle-orm";
import { MessagesView } from "./messages-view";

export const runtime = "nodejs";

export default async function AdminMessagesPage() {
  let conversations: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string | null;
    projectType: string;
    message: string;
    replyToken: string | null;
    isRead: boolean;
    createdAt: Date;
    replies: Array<{
      id: string;
      contactMessageId: string;
      senderType: string;
      message: string;
      isRead: boolean;
      createdAt: Date;
    }>;
  }> = [];

  if (process.env.DATABASE_URL) {
    try {
      const messages = await db
        .select()
        .from(contactMessages)
        .orderBy(desc(contactMessages.createdAt));

      const replies = await db
        .select()
        .from(messageReplies)
        .orderBy(asc(messageReplies.createdAt));

      conversations = messages.map((msg) => ({
        ...msg,
        replies: replies.filter((r) => r.contactMessageId === msg.id),
      }));
    } catch {
      // DB not available
    }
  }

  return <MessagesView initialConversations={conversations} />;
}
