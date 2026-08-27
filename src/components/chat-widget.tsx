"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  senderType: string;
  message: string;
  createdAt: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [replyToken, setReplyToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNewReply, setHasNewReply] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore session from localStorage and track cookie banner
  useEffect(() => {
    const saved = localStorage.getItem("stiamond-chat-token");
    if (saved) {
      setReplyToken(saved);
      setStarted(true);
    }
    const updateConsent = () => setCookieConsent(localStorage.getItem("stiamond-cookie-consent"));
    updateConsent();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "stiamond-cookie-consent") updateConsent();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const pollMessages = useCallback(async () => {
    if (!replyToken) return;
    try {
      const res = await fetch(`/api/chat?token=${replyToken}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.replies) {
        const newReplies: ChatMessage[] = data.replies.map((r: ChatMessage) => ({
          id: r.id,
          senderType: r.senderType,
          message: r.message,
          createdAt: r.createdAt,
        }));
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const fresh = newReplies.filter((m) => !existingIds.has(m.id));
          if (fresh.some((m) => m.senderType === "admin")) {
            setHasNewReply(true);
          }
          return [...prev, ...fresh];
        });
      }
    } catch {
      // silent
    }
  }, [replyToken]);

  useEffect(() => {
    if (replyToken) {
      pollMessages();
      pollRef.current = setInterval(pollMessages, 5000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [replyToken, pollMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
      });
    }
  }, [messages]);

  useEffect(() => {
    if (open && scrollRef.current) {
      const el = scrollRef.current;
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
      });
    }
  }, [open]);

  useEffect(() => {
    if (open) setHasNewReply(false);
  }, [open]);

  const updateActivity = useCallback(async () => {
    if (!replyToken) return;
    try {
      await fetch("/api/chat/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: replyToken }),
      });
    } catch {
      // silent
    }
  }, [replyToken]);

  useEffect(() => {
    if (open && replyToken) {
      updateActivity();
      const id = setInterval(updateActivity, 5000);
      return () => clearInterval(id);
    }
  }, [open, replyToken, updateActivity]);

  const handleStartChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || "",
      projectType: "other",
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to start chat");
      }
      const result = await res.json();
      setReplyToken(result.replyToken);
      setStarted(true);
      localStorage.setItem("stiamond-chat-token", result.replyToken);
      setMessages([
        {
          id: "initial",
          senderType: "client",
          message: data.message,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !replyToken) return;
    setLoading(true);
    setError("");

    const message = input.trim();
    setInput("");

    try {
      const res = await fetch(`/api/messages/${replyToken}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send");
      }
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          senderType: "client",
          message,
          createdAt: data.createdAt,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setInput(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed ${cookieConsent ? "bottom-6" : "bottom-24"} right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
        aria-label="Chat"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {hasNewReply && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                !
              </span>
            )}
          </>
        )}
      </button>

      {/* New reply toast */}
      {hasNewReply && !open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed ${cookieConsent ? "bottom-24" : "bottom-40"} right-6 z-50 w-64 rounded-xl border border-border bg-background p-4 shadow-2xl transition-transform hover:scale-105`}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-body-sm font-semibold">New message</p>
              <p className="text-caption text-muted-foreground">Click to open chat</p>
            </div>
          </div>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className={`fixed ${cookieConsent ? "bottom-24" : "bottom-40"} right-6 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl`}>
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-white">
            <MessageCircle className="h-5 w-5" />
            <div>
              <div className="text-body-sm font-semibold">Stiamond Chat</div>
              <div className="text-caption opacity-80">
                {started ? "We typically reply within a few hours" : "Send us a message"}
              </div>
            </div>
          </div>

          {!started ? (
            /* Initial form */
            <div className="flex-1 overflow-y-auto p-4">
              <form onSubmit={handleStartChat} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="firstName"
                    placeholder="First name"
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-body-sm"
                  />
                  <input
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-body-sm"
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-body-sm"
                />
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  required
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm resize-none"
                />
                {error && (
                  <p className="text-caption text-destructive">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-body-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Start conversation
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Conversation view */
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.senderType === "client" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-body-sm",
                        msg.senderType === "client"
                          ? "bg-primary text-white"
                          : "bg-surface-1 text-foreground"
                      )}
                    >
                      {msg.senderType === "admin" && (
                        <div className="mb-0.5 text-caption font-medium opacity-70">
                          Stiamond Team
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.message}</p>
                      <div className="mt-1 text-[10px] opacity-60">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="flex h-full items-center justify-center text-center text-body-sm text-muted-foreground">
                    <div>
                      <MessageCircle className="mx-auto mb-2 h-8 w-8 opacity-30" />
                      <p>Waiting for a reply...</p>
                      <p className="mt-1 text-caption">We&apos;ll notify you here when we respond.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Reply input */}
              <div className="border-t border-border p-3">
                {error && (
                  <p className="mb-2 text-caption text-destructive">{error}</p>
                )}
                <form onSubmit={handleSendReply} className="flex items-end gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-body-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
