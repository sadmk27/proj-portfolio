import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const betterAuthURL =
  import.meta.env.VITE_BETTER_AUTH_URL ?? import.meta.env.BETTER_AUTH_URL;
const baseURL =
  typeof window === "undefined"
    ? betterAuthURL
    : (betterAuthURL ?? window.location.origin);

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient()],
});
