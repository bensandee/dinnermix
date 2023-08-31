import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  verbose: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
