import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";

declare global {
  var drizzle: PlanetScaleDatabase | undefined;
}
