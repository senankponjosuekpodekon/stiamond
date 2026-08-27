"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      currentPassword: (form.elements.namedItem("currentPassword") as HTMLInputElement).value,
      newPassword: (form.elements.namedItem("newPassword") as HTMLInputElement).value,
      confirm: (form.elements.namedItem("confirm") as HTMLInputElement).value,
    };

    if (data.newPassword !== data.confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update password");
      setSuccess("Password updated successfully");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <Input name="currentPassword" type="password" placeholder="Current password" required />
      <Input name="newPassword" type="password" placeholder="New password" required />
      <Input name="confirm" type="password" placeholder="Confirm new password" required />
      {error && <p className="text-body-sm text-red-500">{error}</p>}
      {success && <p className="text-body-sm text-green-600">{success}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}
