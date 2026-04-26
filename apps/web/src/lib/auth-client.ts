import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: window.location.origin, // Fallback for client side
  plugins: [adminClient()],
});
