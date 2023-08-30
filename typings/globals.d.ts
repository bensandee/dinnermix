import { MySql2Database } from "drizzle-orm/mysql2";

declare global {
  var drizzle: MySql2Database | undefined;
}
