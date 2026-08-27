import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id: string };
        token.id = u.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const t = token as { id?: string };
        (session.user as { id?: string }).id = t.id as string;
      }
      return session;
    },
  },
};
