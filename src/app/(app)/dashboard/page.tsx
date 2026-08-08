import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, CreditCard, Activity } from "lucide-react";

const stats = [
  { icon: FolderKanban, label: "Active Projects", value: "0" },
  { icon: FileText, label: "Documents", value: "0" },
  { icon: CreditCard, label: "Pending Invoices", value: "0" },
  { icon: Activity, label: "Updates This Week", value: "0" },
];

export default function AppDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3">Welcome back</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Here&apos;s an overview of your account.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-body-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </CardHeader>
            <CardContent>
              <div className="text-h3 font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-h5">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-muted-foreground">
            No recent activity. Your projects and updates will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
