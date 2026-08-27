import { db } from "@/lib/db";
import { appLogs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLogsPage() {
  let logs: {
    id: string;
    level: string;
    message: string;
    context: Record<string, unknown> | null;
    createdAt: Date;
  }[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const rawLogs = await db
        .select({
          id: appLogs.id,
          level: appLogs.level,
          message: appLogs.message,
          context: appLogs.context,
          createdAt: appLogs.createdAt,
        })
        .from(appLogs)
        .orderBy(desc(appLogs.createdAt))
        .limit(200);

      logs = rawLogs.map((l) => ({
        ...l,
        context: (l.context as Record<string, unknown> | null) ?? null,
      }));
    } catch {
      // DB not available
    }
  }

  const levelColor: Record<string, string> = {
    error: "bg-destructive text-white",
    warn: "bg-amber-500 text-white",
    info: "bg-primary/10 text-primary",
  };

  return (
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-h3">Logs</h1>
          <p className="mt-2 text-body text-muted-foreground">
            Last 200 logged events from the application.
          </p>
        </div>

        {logs.length === 0 ? (
          <p className="text-body text-muted-foreground">No logs found.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <Card key={log.id} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={levelColor[log.level] ?? "bg-surface-1 text-muted-foreground"}>
                          {log.level}
                        </Badge>
                        <time className="text-caption text-muted-foreground">
                          {new Date(log.createdAt).toLocaleString()}
                        </time>
                      </div>
                      <p className="mt-2 text-body-sm font-medium">{log.message}</p>
                      {log.context && Object.keys(log.context).length > 0 && (
                        <pre className="mt-2 max-h-40 overflow-auto rounded bg-surface-1 p-2 text-overline text-muted-foreground">
                          {JSON.stringify(log.context, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
