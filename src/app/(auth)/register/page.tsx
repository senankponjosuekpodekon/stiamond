"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-h3 font-bold">Stiamond</span>
          </Link>
          <h1 className="mt-6 text-h3">Create your account</h1>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Start building with Stiamond today
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-body-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-body-sm font-medium">First name</label>
                  <Input name="firstName" placeholder="John" className="mt-2" required />
                </div>
                <div>
                  <label className="text-body-sm font-medium">Last name</label>
                  <Input name="lastName" placeholder="Doe" className="mt-2" required />
                </div>
              </div>
              <div>
                <label className="text-body-sm font-medium">Email</label>
                <Input name="email" type="email" placeholder="you@company.com" className="mt-2" required />
              </div>
              <div>
                <label className="text-body-sm font-medium">Password</label>
                <Input name="password" type="password" placeholder="••••••••" className="mt-2" required />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-6 text-center text-body-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
