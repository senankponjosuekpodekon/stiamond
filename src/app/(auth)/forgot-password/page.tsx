import Link from "next/link";

export const runtime = "nodejs";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="text-h3 font-bold">Stiamond</span>
        </Link>
        <h1 className="mt-6 text-h3">Forgot your password?</h1>
        <p className="mt-4 text-body text-muted-foreground">
          Password reset is not available online. Contact us at{" "}
          <a href="mailto:hello@stiamond.net" className="text-primary hover:underline">
            hello@stiamond.net
          </a>{" "}
          to reset your account.
        </p>
        <p className="mt-6 text-body-sm">
          <Link href="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
