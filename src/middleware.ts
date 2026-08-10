import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isOnApp = pathname.startsWith("/app") || pathname.startsWith("/dashboard");
  const isOnAdmin = pathname.startsWith("/admin");
  const isLoggedIn = !!req.auth;

  if ((isOnApp || isOnAdmin) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/app/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
