import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Stiamond account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-h3 font-bold">Stiamond</span>
          </Link>
          <h1 className="mt-6 text-h3">Welcome back</h1>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form className="space-y-6">
              <div>
                <label className="text-body-sm font-medium">Email</label>
                <Input type="email" placeholder="you@company.com" className="mt-2" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-body-sm font-medium">Password</label>
                  <Link href="/auth/forgot-password" className="text-caption text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input type="password" placeholder="••••••••" className="mt-2" />
              </div>
              <Button variant="primary" size="lg" className="w-full">
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-caption">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button variant="outline" size="lg" className="w-full">
              <Mail className="h-4 w-4" />
              Continue with Email
            </Button>

            <p className="mt-6 text-center text-body-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
