import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  driver: "mysql2",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  verbose: true,
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
