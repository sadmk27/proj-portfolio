import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db, schema } from "@portfolio/database";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin } from "better-auth/plugins/admin";
import { dash } from "@better-auth/infra";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.BETTER_AUTH_URL;

export const auth = betterAuth({
  baseURL,
  basePath: "/api/auth",
  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
    "http://localhost:3000",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  advanced: {
    crossSubdomainCookies: process.env.NODE_ENV === "production",

    defaultCookieAttributes:
      process.env.NODE_ENV === "production"
        ? {
            sameSite: "none",
            secure: true,
          }
        : {
            sameSite: "lax",
            secure: false,
          },
  },

  plugins: [admin(), dash(), tanstackStartCookies()],
});
