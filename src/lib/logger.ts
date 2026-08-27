import { db } from "./db";
import { appLogs } from "./db/schema";

type ErrorContext = Record<string, unknown>;

function persist(level: string, message: string, context?: ErrorContext) {
  if (!process.env.DATABASE_URL) return;
  void db
    .insert(appLogs)
    .values({
      level,
      message,
      context: context ?? null,
    })
    .catch(() => {
      // DB may not be ready; fall back to console
    });
}

function formatError(error: unknown): { message: string; stack?: string; cause?: string } {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      cause: error.cause instanceof Error ? error.cause.message : undefined,
    };
  }
  if (typeof error === "string") {
    return { message: error };
  }
  return { message: JSON.stringify(error) };
}

export const logger = {
  info(message: string, context?: ErrorContext) {
    console.log(JSON.stringify({ level: "info", message, context, timestamp: new Date().toISOString() }));
    persist("info", message, context);
  },

  warn(message: string, context?: ErrorContext) {
    console.warn(JSON.stringify({ level: "warn", message, context, timestamp: new Date().toISOString() }));
    persist("warn", message, context);
  },

  error(message: string, error: unknown, context?: ErrorContext) {
    const formatted = formatError(error);
    console.error(JSON.stringify({
      level: "error",
      message,
      error: formatted,
      context,
      timestamp: new Date().toISOString(),
    }));
    persist("error", message, { ...context, error: formatted });
  },

  apiError(route: string, method: string, error: unknown, context?: ErrorContext) {
    const formatted = formatError(error);
    console.error(JSON.stringify({
      level: "error",
      component: "api",
      route,
      method,
      error: formatted,
      context,
      timestamp: new Date().toISOString(),
    }));
    persist("error", `API ${method} ${route}`, { ...context, method, error: formatted });
  },
};
