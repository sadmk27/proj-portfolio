import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as schema from "./schema";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5433/portfolio";

export const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

// Export everything from schema
export * from "./schema";
export { schema };
