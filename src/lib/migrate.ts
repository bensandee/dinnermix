import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

import { config } from "./config";

const main = async () => {
  const connection = await mysql.createConnection(config.connectionString);
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "drizzle" });
};

main()
  .then((text) => {
    console.log(text);
  })
  .catch((err) => {
    console.error(err);
  });
