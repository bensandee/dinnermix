import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { configuration } from "../config";
import "server-only";

// create database connection
const connection = postgres(configuration.postgresConfiguration.url);

export const database = drizzle(connection);
