"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

type ContactMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string | null;
  projectType: string;
  message: string;
  replyToken: string | null;
  createdAt: Date;
};

type Reply = {
  id: string;
  contactMessageId: string;
  senderType: string;
  message: string;
  createdAt: Date;
};

export function MessageConversation({
  message,
  replies,
}: {
  message: ContactMessage;
  replies: Reply[];
}) {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [localReplies, setLocalReplies] = useState<Reply[]>(replies);
  const [error, setError] = useState("");

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/messages/${message.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send reply");
      }

      setLocalReplies([
        ...localReplies,
        {
          id: crypto.randomUUID(),
          contactMessageId: message.id,
          senderType: "admin",
          message: replyText.trim(),
          createdAt: new Date(),
        },
      ]);
      setReplyText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-medium">
              {message.firstName} {message.lastName}
            </span>
            <span className="rounded-md bg-surface-1 px-2.5 py-0.5 text-caption font-medium text-muted-foreground">
              {message.projectType}
            </span>
          </div>
          {message.company && (
            <div className="text-body-sm text-muted-foreground">{message.company}</div>
          )}
          <a
            href={`mailto:${message.email}`}
            className="text-body-sm text-primary hover:underline"
          >
            {message.email}
          </a>
        </div>
        <time className="text-caption text-muted-foreground">
          {new Date(message.createdAt).toLocaleDateString()}
        </time>
      </div>

      <div className="mt-4 rounded-md bg-surface-1/50 p-4">
        <p className="text-body-sm font-medium text-muted-foreground">Original message</p>
        <p className="mt-2 text-body text-muted-foreground">{message.message}</p>
      </div>

      {localReplies.length > 0 && (
        <div className="mt-4 space-y-3">
          {localReplies.map((reply) => (
            <div
              key={reply.id}
              className={`flex ${reply.senderType === "admin" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  reply.senderType === "admin"
                    ? "bg-primary text-white"
                    : "bg-surface-1 text-foreground"
                }`}
              >
                <div className="mb-1 text-caption opacity-70">
                  {reply.senderType === "admin" ? "Stiamond Team" : `${message.firstName} ${message.lastName}`}
                  {" · "}
                  {new Date(reply.createdAt).toLocaleString()}
                </div>
                <p className="text-body-sm whitespace-pre-wrap">{reply.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleReply} className="mt-4 space-y-3">
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-2 text-body-sm text-destructive">
            {error}
          </div>
        )}
        <Textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply..."
          rows={3}
          disabled={sending}
        />
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="sm" disabled={sending || !replyText.trim()}>
            <Send className="h-3.5 w-3.5" />
            {sending ? "Sending..." : "Send reply"}
          </Button>
        </div>
      </form>
    </div>
  );
}
