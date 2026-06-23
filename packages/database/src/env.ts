import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

function findWorkspaceRoot(startDir: string) {
  let dir = startDir;

  while (dir !== path.dirname(dir)) {
    const packageJsonPath = path.join(dir, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf8"),
      ) as {
        workspaces?: unknown;
      };

      if (packageJson.workspaces) {
        return dir;
      }
    }

    dir = path.dirname(dir);
  }

  return path.resolve(currentDir, "../../..");
}

export const workspaceRoot = findWorkspaceRoot(currentDir);

export function loadDatabaseEnv() {
  const envName = process.env.DATABASE_ENV ?? process.env.APP_ENV;
  const envFiles = [
    ".env",
    envName ? `.env.${envName}` : null,
    ".env.local",
    envName ? `.env.${envName}.local` : null,
  ].filter(Boolean) as string[];

  for (const envFile of envFiles) {
    dotenv.config({
      path: path.join(workspaceRoot, envFile),
      override: envFile !== ".env",
    });
  }
}
