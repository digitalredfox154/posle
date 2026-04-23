import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  bigint,
} from "drizzle-orm/mysql-core";

// ─── Users (OAuth / Manus auth) ─────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Clients (SMS-auth based) ────────────────────────────────────────────────
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  name: text("name"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

// ─── SMS Codes ───────────────────────────────────────────────────────────────
export const smsCodes = mysqlTable("sms_codes", {
  id: int("id").autoincrement().primaryKey(),
  phone: varchar("phone", { length: 20 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  attempts: int("attempts").default(0).notNull(),
  blocked: boolean("blocked").default(false).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SmsCode = typeof smsCodes.$inferSelect;

// ─── Pets ────────────────────────────────────────────────────────────────────
export const pets = mysqlTable("pets", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  species: mysqlEnum("species", ["dog", "cat", "other"]).default("dog").notNull(),
  breed: varchar("breed", { length: 100 }),
  birthYear: int("birthYear"),
  photoUrl: text("photoUrl"),
  photoKey: text("photoKey"),
  notes: text("notes"),
  allergies: text("allergies"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Pet = typeof pets.$inferSelect;
export type InsertPet = typeof pets.$inferInsert;

// ─── Visits (diary entries) ──────────────────────────────────────────────────
export const visits = mysqlTable("visits", {
  id: int("id").autoincrement().primaryKey(),
  petId: int("petId").notNull(),
  clientId: int("clientId").notNull(),
  visitDate: timestamp("visitDate").notNull(),
  serviceType: varchar("serviceType", { length: 100 }),
  beforePhotoUrl: text("beforePhotoUrl"),
  beforePhotoKey: text("beforePhotoKey"),
  afterPhotoUrl: text("afterPhotoUrl"),
  afterPhotoKey: text("afterPhotoKey"),
  masterNotes: text("masterNotes"),
  cosmeticsUsed: text("cosmeticsUsed"),
  behaviorNotes: text("behaviorNotes"),
  homeCareTips: text("homeCareTips"),
  nextVisitSuggestion: text("nextVisitSuggestion"),
  published: boolean("published").default(false).notNull(),
  yclientsBookingId: varchar("yclientsBookingId", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Visit = typeof visits.$inferSelect;
export type InsertVisit = typeof visits.$inferInsert;

// ─── Subscription Plans ──────────────────────────────────────────────────────
export const subscriptionPlans = mysqlTable("subscription_plans", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  priceKopecks: int("priceKopecks").notNull(),
  intervalMonths: int("intervalMonths").default(1).notNull(),
  features: text("features"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

// ─── Client Subscriptions ────────────────────────────────────────────────────
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  planId: int("planId").notNull(),
  status: mysqlEnum("status", ["active", "paused", "cancelled", "expired"]).default("active").notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  nextBillingAt: timestamp("nextBillingAt").notNull(),
  cancelledAt: timestamp("cancelledAt"),
  pausedUntil: timestamp("pausedUntil"),
  pauseCount: int("pauseCount").default(0).notNull(),
  paymentToken: text("paymentToken"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;

// ─── Payment History ─────────────────────────────────────────────────────────
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  subscriptionId: int("subscriptionId").notNull(),
  clientId: int("clientId").notNull(),
  amountKopecks: int("amountKopecks").notNull(),
  status: mysqlEnum("status", ["pending", "success", "failed"]).default("pending").notNull(),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;

// ─── Master Users ────────────────────────────────────────────────────────────
export const masterUsers = mysqlTable("master_users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  twoFactorSecret: text("twoFactorSecret"),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false).notNull(),
  name: text("name"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MasterUser = typeof masterUsers.$inferSelect;

// ─── Client Sessions (JWT-based, stored for revocation) ──────────────────────
export const clientSessions = mysqlTable("client_sessions", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  sessionToken: varchar("sessionToken", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
