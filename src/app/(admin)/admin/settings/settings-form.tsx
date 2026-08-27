"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Check, Loader2 } from "lucide-react";

type PaymentMethodConfig = {
  bank: { enabled: boolean; details: string };
  crypto: { enabled: boolean; details: string };
  mobile: { enabled: boolean; details: string };
  other: { enabled: boolean; details: string };
  stripe: { enabled: boolean; details: string };
};

export function SettingsForm({
  defaults,
}: {
  defaults: {
    contact_email: string;
    contact_phone: string;
    contact_location: string;
    payment_methods: string;
  };
}) {
  const [email, setEmail] = useState(defaults.contact_email);
  const [phone, setPhone] = useState(defaults.contact_phone);
  const [location, setLocation] = useState(defaults.contact_location);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodConfig>(() => {
    try {
      const parsed = JSON.parse(defaults.payment_methods || "{}") as Partial<PaymentMethodConfig>;
      return {
        bank: { enabled: parsed.bank?.enabled ?? false, details: parsed.bank?.details ?? "" },
        crypto: { enabled: parsed.crypto?.enabled ?? false, details: parsed.crypto?.details ?? "" },
        mobile: { enabled: parsed.mobile?.enabled ?? false, details: parsed.mobile?.details ?? "" },
        other: { enabled: parsed.other?.enabled ?? false, details: parsed.other?.details ?? "" },
        stripe: { enabled: parsed.stripe?.enabled ?? false, details: parsed.stripe?.details ?? "" },
      };
    } catch {
      return {
        bank: { enabled: false, details: "" },
        crypto: { enabled: false, details: "" },
        mobile: { enabled: false, details: "" },
        other: { enabled: false, details: "" },
        stripe: { enabled: false, details: "" },
      };
    }
  });
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
            payment_methods: JSON.stringify(paymentMethods),
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

      <div className="space-y-4">
        <h3 className="text-body-sm font-semibold">Payment methods</h3>
        {(["bank", "crypto", "stripe"] as const).map((method) => (
          <div key={method} className="space-y-2 rounded-lg border border-border p-4">
            <label className="flex items-center gap-2 text-body-sm font-medium">
              <input
                type="checkbox"
                checked={paymentMethods[method].enabled}
                onChange={(e) =>
                  setPaymentMethods((prev) => ({
                    ...prev,
                    [method]: { ...prev[method], enabled: e.target.checked },
                  }))
                }
                className="h-4 w-4 rounded border-border"
              />
              <span className="capitalize">{method}</span>
            </label>
            <Input
              value={paymentMethods[method].details}
              onChange={(e) =>
                setPaymentMethods((prev) => ({
                  ...prev,
                  [method]: { ...prev[method], details: e.target.value },
                }))
              }
              placeholder={
                method === "stripe"
                  ? "Stripe publishable key"
                  : `Instructions for ${method} payment`
              }
              className="mt-2"
            />
          </div>
        ))}
      </div>

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
