import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { SettingsForm } from "./settings-form";

export const runtime = "nodejs";

export default async function AdminSettingsPage() {
  const settingsMap: Record<string, string> = {};

  if (process.env.DATABASE_URL) {
    try {
      const settings = await db.select().from(siteSettings);
      for (const s of settings) {
        settingsMap[s.key] = s.value;
      }
    } catch {
      // DB not available
    }
  }

  const defaults = {
    contact_email: settingsMap.contact_email || "hello@stiamond.net",
    contact_phone: settingsMap.contact_phone || "+1 (555) 000-0000",
    contact_location: settingsMap.contact_location || "Remote · Global",
    payment_methods:
      settingsMap.payment_methods ||
      JSON.stringify({
        bank: { enabled: false, details: "" },
        crypto: { enabled: false, details: "" },
        mobile: { enabled: false, details: "" },
        other: { enabled: false, details: "" },
        stripe: { enabled: false, details: "" },
      }),
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3">Site Settings</h2>
        <p className="mt-2 text-body text-muted-foreground">
          Update contact information displayed on the website.
        </p>
      </div>
      <SettingsForm defaults={defaults} />
    </div>
  );
}
