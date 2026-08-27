import { pgTable, uuid, varchar, timestamp, text, pgEnum, boolean, serial, integer } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "client", "viewer"]);

export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: userRoleEnum("role").default("client").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  tags: varchar("tags", { length: 500 }).default(""),
  status: postStatusEnum("status").default("draft").notNull(),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  packName: varchar("pack_name", { length: 100 }),
  description: text("description"),
  status: varchar("status", { length: 50 }).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  projectId: uuid("project_id").references(() => projects.id),
  amount: varchar("amount", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  projectType: varchar("project_type", { length: 100 }).notNull(),
  message: text("message").notNull(),
  replyToken: varchar("reply_token", { length: 64 }).unique(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messageReplies = pgTable("message_replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  contactMessageId: uuid("contact_message_id").references(() => contactMessages.id).notNull(),
  senderType: varchar("sender_type", { length: 10 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonialStatusEnum = pgEnum("testimonial_status", ["draft", "published"]);

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientName: varchar("client_name", { length: 100 }).notNull(),
  clientRole: varchar("client_role", { length: 100 }),
  clientCompany: varchar("client_company", { length: 200 }),
  projectType: varchar("project_type", { length: 100 }),
  quoteEn: text("quote_en").notNull(),
  quoteFr: text("quote_fr"),
  rating: integer("rating").default(5).notNull(),
  status: testimonialStatusEnum("status").default("draft").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
