import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { MessageConversation } from "./message-conversation";

export const runtime = "nodejs";

export default async function AdminMessagesPage() {
  let messages: (typeof contactMessages.$inferSelect)[] = [];
  const repliesMap: Record<string, (typeof messageReplies.$inferSelect)[]> = {};

  if (process.env.DATABASE_URL) {
    try {
      messages = await db.select().from(contactMessages);

      if (messages.length > 0) {
        const allReplies = await db
          .select()
          .from(messageReplies)
          .orderBy(asc(messageReplies.createdAt));

        for (const reply of allReplies) {
          const key = reply.contactMessageId;
          if (!repliesMap[key]) repliesMap[key] = [];
          repliesMap[key].push(reply);
        }
      }
    } catch {
      // DB not available
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3">Contact Messages</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Messages submitted through the contact form. Reply directly to clients.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-body text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <MessageConversation
              key={msg.id}
              message={msg}
              replies={repliesMap[msg.id] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
