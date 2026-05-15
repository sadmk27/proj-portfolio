import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const betterAuthURL =
  import.meta.env.VITE_BETTER_AUTH_URL ?? import.meta.env.BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: `${betterAuthURL}/api/auth`,
  plugins: [adminClient()],
});
