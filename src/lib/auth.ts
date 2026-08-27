import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { siteSettings, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { authConfig } from "@/lib/auth.config";
import { logger } from "@/lib/logger";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function getRateLimitKey(email: string) {
  return `login_attempts:${email.toLowerCase()}`;
}

async function getAttempts(email: string) {
  const [row] = await db
    .select({ value: siteSettings.value })
    .from(siteSettings)
    .where(eq(siteSettings.key, getRateLimitKey(email)))
    .limit(1);
  if (!row) return null;
  return JSON.parse(row.value) as { count: number; lastAttempt: number };
}

async function setAttempts(email: string, attempts: { count: number; lastAttempt: number }) {
  const key = getRateLimitKey(email);
  const value = JSON.stringify(attempts);
  await db
    .insert(siteSettings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value },
    });
}

async function clearAttempts(email: string) {
  await db.delete(siteSettings).where(eq(siteSettings.key, getRateLimitKey(email)));
}

async function isRateLimited(email: string) {
  const attempts = await getAttempts(email);
  if (!attempts) return false;
  if (attempts.count >= RATE_LIMIT_MAX) {
    const elapsed = Date.now() - attempts.lastAttempt;
    if (elapsed < RATE_LIMIT_WINDOW_MS) return true;
  }
  return false;
}

export const { handlers, auth, signIn, signOut } = NextAuth(
  Object.assign({}, authConfig, {
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
            if (await isRateLimited(email)) {
              logger.warn("Auth: login rate limited", { email });
              return null;
            }

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
              const previous = await getAttempts(email);
              const attempts =
                previous && Date.now() - previous.lastAttempt < RATE_LIMIT_WINDOW_MS
                  ? previous
                  : { count: 0, lastAttempt: Date.now() };
              attempts.count += 1;
              attempts.lastAttempt = Date.now();
              await setAttempts(email, attempts);
              logger.warn("Auth: invalid password", { email, attempts: attempts.count });
              return null;
            }

            await clearAttempts(email);
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
  })
);
