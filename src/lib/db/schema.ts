import {
  int,
  text,
  mysqlSchema,
  varchar,
  primaryKey,
  datetime,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const schema = mysqlSchema("dinnermix");

export const userSchema = schema.table("user", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 80 }).notNull(),
  email: varchar("email", { length: 120 }).notNull(),
  lastLogin: datetime("lastLogin"),
});

export const recipeSchema = schema.table("recipe", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).unique().notNull(),
  description: text("description"),
  url: varchar("url", { length: 400 }),
  prepCount: int("prepCount").notNull().default(0),
  userId: int("userId")
    .references(() => userSchema.id)
    .notNull(),
});
export const selectUserSchema = createSelectSchema(userSchema);
export const insertUserSchema = createInsertSchema(userSchema);

export const recipeHistory = schema.table(
  "recipe_owner",
  {
    recipeId: int("recipeId")
      .notNull()
      .references(() => recipeSchema.id),
    userId: int("userId")
      .notNull()
      .references(() => userSchema.id),
    datePrepared: datetime("datePrepared").notNull(),
  },
  (table) => {
    return { pkf: primaryKey(table.recipeId, table.userId) };
  },
);

export const selectRecipeSchema = createSelectSchema(recipeSchema);
export const insertRecipeSchema = createInsertSchema(recipeSchema);
