import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
  var drizzle: PostgresJsDatabase | undefined;
}
