import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ==========================================
// 1. USERS TABLE
// ==========================================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  agentCredits: integer("agentCredits").default(3),
  usageCredits: integer("usageCredits").default(100),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// 2. TOOLS TABLE
// ==========================================
export const tools = pgTable("tools", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  provider: varchar("provider", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 255 }),
  requiresAuth: boolean("requires_auth").default(false),
  authType: varchar("auth_type", { length: 50 }),
  authProvider: varchar("auth_provider", { length: 100 }),
  capabilities: jsonb("capabilities"),
  useCases: jsonb("use_cases"),
  approvalRules: jsonb("approval_rules"),
  config: jsonb("config"),
  riskLevel: varchar("risk_level", { length: 20 }).default("low"),
  canRead: boolean("can_read").default(true),
  canWrite: boolean("can_write").default(false),
  canDelete: boolean("can_delete").default(false),
  canExecute: boolean("can_execute").default(true),
  status: varchar("status", { length: 50 }).default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// 3. AGENTS TABLE
// ==========================================
export const agents = pgTable("agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  prompt: text("prompt"),
  objective: text("objective"),
  instructions: text("instructions"),
  skills: jsonb("skills"),
  tools: jsonb("tools"),
  schedule: jsonb("schedule"),
  outputFormat: text("output_format"),
  config: jsonb("config"),
  status: varchar("status", { length: 50 }).default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// 4. RUNS TABLE
// ==========================================
export const runs = pgTable("runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  agentId: uuid("agent_id").references(() => agents.id, {
    onDelete: "cascade",
  }),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  status: varchar("status", { length: 50 }).default("QUEUED"),
  inputPrompt: text("input_prompt"),
  outputResult: text("output_result"),
  scheduledAt: timestamp("scheduled_at"),
  nextRun: timestamp("next_run"),
  logs: jsonb("logs"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// 5. TEMPLATES TABLE
// ==========================================
export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  description: text("description"),
  prompt: text("prompt"),
  icon: varchar("icon", { length: 100 }),
  iconBg: varchar("icon_bg", { length: 50 }),
  iconColor: varchar("icon_color", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// TYPE EXPORTS
// ==========================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Tool = typeof tools.$inferSelect;
export type NewTool = typeof tools.$inferInsert;

export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;

export type Run = typeof runs.$inferSelect;
export type NewRun = typeof runs.$inferInsert;

export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;