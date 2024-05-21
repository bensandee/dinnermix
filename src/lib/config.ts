type PostgresConfiguration = {
  url: string;
};

export type Configuration = {
  postgresConfiguration: PostgresConfiguration;
  isDevelopment: boolean;
};

const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl === undefined) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

export const configuration: Configuration = {
  postgresConfiguration: { url: databaseUrl },
  isDevelopment: process.env["NODE_ENV"] === "development",
};
