"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Check, Loader2 } from "lucide-react";

export function SettingsForm({
  defaults,
}: {
  defaults: {
    contact_email: string;
    contact_phone: string;
    contact_location: string;
  };
}) {
  const [email, setEmail] = useState(defaults.contact_email);
  const [phone, setPhone] = useState(defaults.contact_phone);
  const [location, setLocation] = useState(defaults.contact_location);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            contact_email: email,
            contact_phone: phone,
            contact_location: location,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      setter: setEmail,
      placeholder: "hello@stiamond.net",
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      setter: setPhone,
      placeholder: "+1 (555) 000-0000",
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
      setter: setLocation,
      placeholder: "Remote · Global",
    },
  ];

  return (
    <form onSubmit={handleSave} className="max-w-lg space-y-6">
      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-body-sm text-destructive">
          {error}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/5 px-4 py-3 text-body-sm text-green-600">
          <Check className="h-4 w-4" />
          Settings saved successfully.
        </div>
      )}
      {fields.map((field) => (
        <div key={field.label}>
          <label className="flex items-center gap-2 text-body-sm font-medium">
            <field.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            {field.label}
          </label>
          <Input
            value={field.value}
            onChange={(e) => field.setter(e.target.value)}
            placeholder={field.placeholder}
            className="mt-2"
          />
        </div>
      ))}
      <Button type="submit" variant="primary" disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save settings"
        )}
      </Button>
    </form>
  );
}
