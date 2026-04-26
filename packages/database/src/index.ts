import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" }); // Load shared env if not already loaded

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/portfolio";

export const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

// Export everything from schema
export * from "./schema";
export { schema };
