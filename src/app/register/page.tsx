"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { passwordPolicyMessage } from "@/lib/auth/password";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Registration failed");
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className="py-20 md:py-28">
        <div className="mx-auto max-w-md space-y-6">
          <h1 className="text-h3">Create your account</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input name="firstName" placeholder="First name" required />
            <Input name="lastName" placeholder="Last name" required />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <p className="text-caption text-muted-foreground">
              {passwordPolicyMessage}
            </p>
            {error && <p className="text-body-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>
          <p className="text-center text-body-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
