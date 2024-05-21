import type { Config } from "drizzle-kit";
import "dotenv/config";
import { configuration } from "@/lib/config";

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  verbose: true,
  dbCredentials: {
    url: configuration.postgresConfiguration.url,
  },
} satisfies Config;
