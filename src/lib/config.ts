type PostgresConfiguration = {
  url: string;
};

export type Configuration = {
  postgresConfiguration: PostgresConfiguration;
  resourcePath: string;
  isDevelopment: boolean;
};

export const configuration: Configuration = {
  postgresConfiguration: { url: process.env["DATABASE_URL"] as string },
  resourcePath: process.env["RESOURCE_PATH"] ?? "resources",
  isDevelopment: process.env["NODE_ENV"] === "development",
};
