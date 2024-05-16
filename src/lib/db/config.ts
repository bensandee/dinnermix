if (process.env.DATABASE_URL === undefined) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

export const databaseUrl = process.env.DATABASE_URL;
