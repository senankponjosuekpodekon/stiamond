import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { authConfig } from "@/lib/auth.config";
import { logger } from "@/lib/logger";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          logger.warn("Auth: missing credentials");
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!process.env.DATABASE_URL) {
          logger.error("Auth: DATABASE_URL not set", new Error("Missing DATABASE_URL"));
          return null;
        }

        try {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (!user) {
            logger.warn("Auth: user not found", { email });
            return null;
          }

          const valid = await bcrypt.compare(password, user.passwordHash);
          if (!valid) {
            logger.warn("Auth: invalid password", { email });
            return null;
          }

          logger.info("Auth: login successful", { email, userId: user.id });

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          };
        } catch (error) {
          logger.error("Auth: database error during authorize", error, { email });
          return null;
        }
      },
    }),
  ],
});
