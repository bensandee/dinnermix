import { Config } from "@planetscale/database";

export type Configuration = {
  planetScaleConfiguration: Config;
};

export const configuration: Configuration = {
  planetScaleConfiguration: { url: process.env["DATABASE_URL"] as string },
};
