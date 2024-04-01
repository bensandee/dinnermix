import type { Config } from "drizzle-kit";
import "dotenv/config";

if (process.env.DATABASE_URL == null) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}
export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  verbose: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
