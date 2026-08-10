import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createIntlMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Let next-intl handle locale routing first
  const intlResponse = intlMiddleware(req);
  
  // Then check auth for protected routes
  const isOnApp = pathname.startsWith("/app") || pathname.startsWith("/dashboard");
  const isOnAdmin = pathname.startsWith("/admin");
  const isLoggedIn = !!req.auth;

  if ((isOnApp || isOnAdmin) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Return intl response if it exists (handles locale prefixing/redirects)
  if (intlResponse) return intlResponse;

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and Next.js internals
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/app/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
