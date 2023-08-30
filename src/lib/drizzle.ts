import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { config } from "./config";

const poolConnection = mysql.createPool(config.connectionString);

let db: ReturnType<typeof drizzle>;

if (process.env.NODE_ENV === "production") {
  console.log("creating new production drizzle connection");
  db = drizzle(poolConnection);
} else {
  if (!global.drizzle) {
    console.log("creating new global drizzle connection");
    global.drizzle = drizzle(poolConnection);
  }
  db = global.drizzle;
}
//await migrate(db, "")
export const drizzleConnection = db;
