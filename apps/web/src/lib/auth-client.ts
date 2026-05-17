import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const baseURL = import.meta.env.DEV
  ? `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/api/auth`
  : import.meta.env.VITE_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient()],
});
