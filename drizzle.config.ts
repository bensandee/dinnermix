import type { Config } from "drizzle-kit";
import "dotenv/config";
import { databaseUrl } from "@/lib/db/config";

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  verbose: true,
  dbCredentials: {
    url: databaseUrl,
  },
} satisfies Config;
