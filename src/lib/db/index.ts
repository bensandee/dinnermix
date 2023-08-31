import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// create database connection
const connection = postgres(process.env.DATABASE_URL as string);

export const database = drizzle(connection);
