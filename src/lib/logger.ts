type ErrorContext = Record<string, unknown>;

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
  },

  warn(message: string, context?: ErrorContext) {
    console.warn(JSON.stringify({ level: "warn", message, context, timestamp: new Date().toISOString() }));
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
  },
};
