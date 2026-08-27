import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id: string; role: string };
        token.id = u.id;
        (token as any).role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const t = token as any;
        (session.user as any).id = t.id as string;
        (session.user as any).role = t.role as string;
      }
      return session;
    },
  },
};
