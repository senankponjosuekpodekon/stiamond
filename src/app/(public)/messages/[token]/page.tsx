import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ClientConversation } from "./client-conversation";

export const runtime = "nodejs";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!token) notFound();

  let contactMsg: (typeof contactMessages.$inferSelect) | null = null;
  let replies: (typeof messageReplies.$inferSelect)[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const [msg] = await db
        .select()
        .from(contactMessages)
        .where(eq(contactMessages.replyToken, token))
        .limit(1);

      if (!msg) notFound();
      contactMsg = msg;

      replies = await db
        .select()
        .from(messageReplies)
        .where(eq(messageReplies.contactMessageId, msg.id))
        .orderBy(asc(messageReplies.createdAt));
    } catch {
      notFound();
    }
  }

  if (!contactMsg) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-surface-1/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-h4 font-bold">Stiamond</Link>
          <span className="text-body-sm text-muted-foreground">Conversation</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <ClientConversation
          contactMessage={contactMsg}
          initialReplies={replies}
          token={token}
        />
      </main>
    </div>
  );
}
