import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, CreditCard, Activity } from "lucide-react";

export default function AppDashboard() {
  const t = useTranslations("dashboard");

  const stats = [
    { icon: FolderKanban, label: t("activeProjects"), value: "0" },
    { icon: FileText, label: t("documents"), value: "0" },
    { icon: CreditCard, label: t("pendingInvoices"), value: "0" },
    { icon: Activity, label: t("updates"), value: "0" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3">{t("welcome")}</h2>
        <p className="mt-2 text-body text-muted-foreground">
          {t("overview")}
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
          <CardTitle className="text-h5">{t("recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-muted-foreground">
            {t("noActivity")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
