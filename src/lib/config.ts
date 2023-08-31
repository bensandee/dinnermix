type PostgresConfiguration = {
  url: string;
};

export type Configuration = {
  postgresConfiguration: PostgresConfiguration;
};

export const configuration: Configuration = {
  postgresConfiguration: { url: process.env["DATABASE_URL"] as string },
};
