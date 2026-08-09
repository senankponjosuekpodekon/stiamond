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
  projectType: string;
  message: string;
  createdAt: Date;
};

type Reply = {
  id: string;
  contactMessageId: string;
  senderType: string;
  message: string;
  createdAt: Date;
};

export function ClientConversation({
  contactMessage,
  initialReplies,
  token,
}: {
  contactMessage: ContactMessage;
  initialReplies: Reply[];
  token: string;
}) {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [error, setError] = useState("");

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch(`/api/messages/${token}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send reply");
      }

      setReplies([
        ...replies,
        {
          id: crypto.randomUUID(),
          contactMessageId: contactMessage.id,
          senderType: "client",
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
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h4 font-semibold">Your conversation with Stiamond</h1>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Started on {new Date(contactMessage.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className="rounded-md bg-surface-1 px-2.5 py-0.5 text-caption font-medium text-muted-foreground">
            {contactMessage.projectType}
          </span>
        </div>

        <div className="mt-4 rounded-md bg-surface-1/50 p-4">
          <p className="text-body-sm font-medium text-muted-foreground">Your original message</p>
          <p className="mt-2 text-body text-muted-foreground whitespace-pre-wrap">
            {contactMessage.message}
          </p>
        </div>
      </div>

      {replies.length > 0 && (
        <div className="space-y-3">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className={`flex ${reply.senderType === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  reply.senderType === "client"
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                <div className="mb-1 text-caption opacity-70">
                  {reply.senderType === "admin" ? "Stiamond Team" : "You"}
                  {" · "}
                  {new Date(reply.createdAt).toLocaleString()}
                </div>
                <p className="text-body-sm whitespace-pre-wrap">{reply.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {replies.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-body text-muted-foreground">
            No replies yet. The Stiamond team will respond soon.
          </p>
        </div>
      )}

      <form onSubmit={handleReply} className="space-y-3 rounded-lg border border-border bg-card p-6">
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-2 text-body-sm text-destructive">
            {error}
          </div>
        )}
        <label className="text-body-sm font-medium">Your reply</label>
        <Textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your message..."
          rows={4}
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
