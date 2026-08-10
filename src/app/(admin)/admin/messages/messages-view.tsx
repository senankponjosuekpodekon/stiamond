"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, MailOpen, ChevronLeft, MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Conversation = {
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
};

export function MessagesView({
  initialConversations,
}: {
  initialConversations: Conversation[];
}) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialConversations.length > 0 ? initialConversations[0].id : null
  );
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selected = conversations.find((c) => c.id === selectedId);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.conversations) {
        setConversations(data.conversations);
      }
    } catch {
      // silent fail on poll
    }
  }, []);

  useEffect(() => {
    pollRef.current = setInterval(fetchConversations, 10000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchConversations]);

  const markAsRead = useCallback(
    (conv: Conversation) => {
      const unreadReplyIds = conv.replies
        .filter((r) => r.senderType === "client" && !r.isRead)
        .map((r) => r.id);
      const messageIds = conv.isRead ? [] : [conv.id];

      if (messageIds.length === 0 && unreadReplyIds.length === 0) return;

      fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageIds, replyIds: unreadReplyIds }),
      }).catch(() => {});

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conv.id
            ? {
                ...c,
                isRead: true,
                replies: c.replies.map((r) =>
                  r.senderType === "client" ? { ...r, isRead: true } : r
                ),
              }
            : c
        )
      );
    },
    []
  );

  const handleDelete = async (convId: string) => {
    if (!confirm("Delete this conversation? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/messages/${convId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setConversations((prev) => prev.filter((c) => c.id !== convId));
      if (selectedId === convId) {
        setSelectedId(null);
        setMobileView("list");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const handleSelect = (conv: Conversation) => {
    setSelectedId(conv.id);
    setMobileView("detail");
    markAsRead(conv);
  };

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedId) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/messages/${selectedId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send reply");
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedId
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    id: crypto.randomUUID(),
                    contactMessageId: c.id,
                    senderType: "admin",
                    message: replyText.trim(),
                    isRead: true,
                    createdAt: new Date(),
                  },
                ],
              }
            : c
        )
      );
      setReplyText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const unreadCount = conversations.filter(
    (c) => !c.isRead || c.replies.some((r) => r.senderType === "client" && !r.isRead)
  ).length;

  const formatTime = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = diff / (1000 * 60 * 60);
    if (hours < 1) return "Just now";
    if (hours < 24) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (hours < 168) return d.toLocaleDateString([], { weekday: "short" });
    return d.toLocaleDateString();
  };

  if (conversations.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-h3">Messages</h2>
          <p className="mt-2 text-body text-muted-foreground">
            Conversations with your clients.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <Mail className="mx-auto h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
          <p className="mt-4 text-body text-muted-foreground">No messages yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-h3">Messages</h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-caption font-semibold text-white">
              {unreadCount} new
            </span>
          )}
        </div>
        <span className="text-caption text-muted-foreground">
          Auto-refresh every 10s
        </span>
      </div>

      <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-lg border border-border">
        {/* Conversation list */}
        <div
          className={cn(
            "w-full border-r border-border bg-card md:w-80 lg:w-96",
            mobileView === "detail" && "hidden md:block"
          )}
        >
          <div className="h-full overflow-y-auto">
            {conversations.map((conv) => {
              const hasUnread = !conv.isRead || conv.replies.some(
                (r) => r.senderType === "client" && !r.isRead
              );
              const lastReply = conv.replies[conv.replies.length - 1];
              const lastMessage = lastReply?.message || conv.message;
              const lastSender = lastReply?.senderType || "client";

              return (
                <button
                  key={conv.id}
                  onClick={() => handleSelect(conv)}
                  className={cn(
                    "flex w-full flex-col gap-1 border-b border-border p-4 text-left transition-colors hover:bg-surface-1/50",
                    selectedId === conv.id && "bg-surface-1"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {hasUnread ? (
                        <Mail className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                      ) : (
                        <MailOpen className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                      )}
                      <span className={cn("text-body-sm font-medium truncate", hasUnread && "font-semibold")}>
                        {conv.firstName} {conv.lastName}
                      </span>
                    </div>
                    <span className="shrink-0 text-caption text-muted-foreground">
                      {formatTime(lastReply?.createdAt || conv.createdAt)}
                    </span>
                  </div>
                  <p className="truncate pl-6 text-caption text-muted-foreground">
                    {lastSender === "admin" && "You: "}
                    {lastMessage}
                  </p>
                  <div className="flex items-center gap-2 pl-6">
                    <span className="rounded-md bg-surface-1 px-1.5 py-0.5 text-overline text-muted-foreground">
                      {conv.projectType}
                    </span>
                    {conv.replies.length > 0 && (
                      <span className="flex items-center gap-1 text-overline text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {conv.replies.length}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation detail */}
        <div
          className={cn(
            "flex flex-1 flex-col bg-background",
            mobileView === "list" && "hidden md:flex"
          )}
        >
          {selected ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileView("list")}
                    className="md:hidden"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {selected.firstName} {selected.lastName}
                      </span>
                      <span className="rounded-md bg-surface-1 px-2 py-0.5 text-caption font-medium text-muted-foreground">
                        {selected.projectType}
                      </span>
                    </div>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-body-sm text-primary hover:underline"
                    >
                      {selected.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <time className="text-caption text-muted-foreground">
                    {new Date(selected.createdAt).toLocaleDateString()}
                  </time>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {/* Original message */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg bg-surface-1 px-4 py-3">
                    <div className="mb-1 text-caption opacity-60">
                      {selected.firstName} {selected.lastName} · {formatTime(selected.createdAt)}
                    </div>
                    <p className="text-body-sm whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>

                {/* Replies */}
                {selected.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={cn(
                      "flex",
                      reply.senderType === "admin" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3",
                        reply.senderType === "admin"
                          ? "bg-primary text-white"
                          : "bg-surface-1 text-foreground"
                      )}
                    >
                      <div className="mb-1 text-caption opacity-70">
                        {reply.senderType === "admin" ? "You" : `${selected.firstName} ${selected.lastName}`}
                        {" · "}
                        {formatTime(reply.createdAt)}
                      </div>
                      <p className="text-body-sm whitespace-pre-wrap">{reply.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply form */}
              <div className="border-t border-border p-4">
                {error && (
                  <div className="mb-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-2 text-body-sm text-destructive">
                    {error}
                  </div>
                )}
                <form onSubmit={handleReply} className="flex items-end gap-3">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    rows={2}
                    disabled={sending}
                    className="resize-none"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="icon"
                    disabled={sending || !replyText.trim()}
                    className="h-10 w-10 shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-body text-muted-foreground">
              Select a conversation to view messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
