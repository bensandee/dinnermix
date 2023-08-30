export type Configuration = {
  connectionString: string;
};

export const config: Configuration = {
  connectionString: process.env.DATABASE_URL as string,
};
