import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Stiamond account.",
};

export default function RegisterPage() {
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
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-body-sm font-medium">First name</label>
                  <Input placeholder="John" className="mt-2" />
                </div>
                <div>
                  <label className="text-body-sm font-medium">Last name</label>
                  <Input placeholder="Doe" className="mt-2" />
                </div>
              </div>
              <div>
                <label className="text-body-sm font-medium">Email</label>
                <Input type="email" placeholder="you@company.com" className="mt-2" />
              </div>
              <div>
                <label className="text-body-sm font-medium">Password</label>
                <Input type="password" placeholder="••••••••" className="mt-2" />
              </div>
              <Button variant="primary" size="lg" className="w-full">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-body-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
