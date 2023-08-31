import { PostgresJsDatabase } from "drizzle-orm/pg-serverless";

declare global {
  var drizzle: PostgresJsDatabase | undefined;
}
