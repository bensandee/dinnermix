import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { databaseUrl } from "./config";

// create database connection
const connection = postgres(databaseUrl);

export const database = drizzle(connection);
