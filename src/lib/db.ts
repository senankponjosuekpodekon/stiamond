import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      console.error("DB: DATABASE_URL is not set");
      throw new Error("DATABASE_URL is not set");
    }
    try {
      const sql = neon(process.env.DATABASE_URL);
      _db = drizzle(sql);
      console.log("DB: client initialized successfully");
    } catch (error) {
      console.error("DB: failed to initialize client", error);
      throw error;
    }
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return Reflect.get(getDb(), prop);
  },
});
