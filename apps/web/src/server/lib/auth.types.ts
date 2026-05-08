import type { getSession } from "better-auth/api";

export type UserRole = "ADMIN" | "CONTRIBUTOR";

export type Session = Awaited<ReturnType<typeof getSession>> & {
  user: {
    role: UserRole;
  };
};
