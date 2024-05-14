import {
  text,
  pgTable,
  varchar,
  primaryKey,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userSchema = pgTable("dm_user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  email: varchar("email", { length: 120 }).notNull(),
  lastLogin: timestamp("lastLogin"),
});

export const selectUserSchema = createSelectSchema(userSchema);
export const insertUserSchema = createInsertSchema(userSchema).strict();

export const recipeSchema = pgTable("dm_recipe", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).unique().notNull(),
  description: text("description"),
  url: varchar("url", { length: 400 }),
  ownerId: serial("ownerId")
    .references(() => userSchema.id)
    .notNull(),
});
export const selectRecipeSchema = createSelectSchema(recipeSchema);
export type Recipe = z.infer<typeof selectRecipeSchema>;

export const recipeAttachmentSchema = pgTable("dm_recipe_attachment", {
  id: serial("id").primaryKey(),
  recipeId: serial("recipeId")
    .notNull()
    .references(() => recipeSchema.id),
  uuid: varchar("uuid", { length: 36 }).notNull(),
  contentType: varchar("contentType", { length: 30 }).notNull(),
  filename: varchar("filename", { length: 120 }),
});

export const insertRecipeSchema = createInsertSchema(recipeSchema).strict();
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;

export const recipeHistory = pgTable(
  "dm_recipe_history",
  {
    recipeId: serial("recipeId")
      .notNull()
      .references(() => recipeSchema.id),
    userId: serial("userId")
      .notNull()
      .references(() => userSchema.id),
    preparedOn: timestamp("preparedOn").notNull(),
  },
  (table) => {
    return { pkf: primaryKey({ columns: [table.recipeId, table.userId] }) };
  },
);
