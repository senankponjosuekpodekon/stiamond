import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

export const runtime = "nodejs";

export default async function AdminMessagesPage() {
  let messages: typeof contactMessages.$inferSelect[] = [];

  if (process.env.DATABASE_URL) {
    try {
      messages = await db.select().from(contactMessages);
    } catch {
      // DB not available
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3">Contact Messages</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Messages submitted through the contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-body text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      {msg.firstName} {msg.lastName}
                    </span>
                    <span className="rounded-md bg-surface-1 px-2.5 py-0.5 text-caption font-medium text-muted-foreground">
                      {msg.projectType}
                    </span>
                  </div>
                  {msg.company && (
                    <div className="text-body-sm text-muted-foreground">{msg.company}</div>
                  )}
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-body-sm text-primary hover:underline"
                  >
                    {msg.email}
                  </a>
                </div>
                <time className="text-caption text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="mt-4 text-body text-muted-foreground">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
