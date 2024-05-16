import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (process.env.DATABASE_URL === undefined) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}
// create database connection
const connection = postgres(process.env.DATABASE_URL);

export const database = drizzle(connection);
