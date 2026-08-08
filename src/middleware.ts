import createMiddleware from "next-intl/middleware";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isOnApp = pathname.startsWith("/app") || pathname.startsWith("/dashboard");
  const isOnAdmin = pathname.startsWith("/admin");
  const isLoggedIn = !!req.auth;

  if ((isOnApp || isOnAdmin) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/app/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
