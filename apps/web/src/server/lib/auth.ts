import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db, schema } from "@portfolio/database";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin } from "better-auth/plugins/admin";

export const auth = betterAuth({
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

  plugins: [admin(), tanstackStartCookies()],
});
