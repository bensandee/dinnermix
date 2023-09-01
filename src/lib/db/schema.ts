import {
  integer,
  text,
  pgTable,
  varchar,
  primaryKey,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userSchema = pgTable("dm_user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  email: varchar("email", { length: 120 }).notNull(),
  lastLogin: timestamp("lastLogin"),
});

export const selectUserSchema = createSelectSchema(userSchema);
export const insertUserSchema = createInsertSchema(userSchema);

export const recipeSchema = pgTable("dm_recipe", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).unique().notNull(),
  description: text("description"),
  url: varchar("url", { length: 400 }),
  prepCount: integer("prepCount").notNull().default(0),
  userId: serial("userId")
    .references(() => userSchema.id)
    .notNull(),
});
export const selectRecipeSchema = createSelectSchema(recipeSchema);
export const insertRecipeSchema = createInsertSchema(recipeSchema);

export const recipeHistory = pgTable(
  "dm_recipe_owner",
  {
    recipeId: serial("recipeId")
      .notNull()
      .references(() => recipeSchema.id),
    userId: serial("userId")
      .notNull()
      .references(() => userSchema.id),
    datePrepared: timestamp("datePrepared").notNull(),
  },
  (table) => {
    return { pkf: primaryKey(table.recipeId, table.userId) };
  },
);
