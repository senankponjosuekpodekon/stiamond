import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createIntlMiddleware(routing);

const protectedPaths = ["/app", "/dashboard", "/admin"];

const nonLocalePaths = ["/login", "/register", "/docs", "/developers", "/messages"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check auth for protected routes
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isLoggedIn = !!req.auth;

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // For protected and non-locale routes, don't apply locale routing
  if (isProtected || nonLocalePaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Let next-intl handle locale routing for marketing pages
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Match all paths except: api, _next, _vercel, static files
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
