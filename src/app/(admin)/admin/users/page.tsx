import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const runtime = "nodejs";

export default async function AdminUsersPage() {
  let allUsers: typeof users.$inferSelect[] = [];

  if (process.env.DATABASE_URL) {
    try {
      allUsers = await db.select().from(users);
    } catch {
      // DB not available
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3">Users</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Manage registered users and their roles.
        </p>
      </div>

      {allUsers.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-body text-muted-foreground">No users yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead className="border-b border-border bg-surface-1/40">
              <tr>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-1/30">
                  <td className="px-4 py-3 font-medium">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-3 text-body-sm text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-caption font-medium ${
                        user.role === "admin"
                          ? "bg-primary/10 text-primary"
                          : user.role === "client"
                          ? "bg-surface-1 text-muted-foreground"
                          : "bg-surface-1 text-muted-foreground"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
