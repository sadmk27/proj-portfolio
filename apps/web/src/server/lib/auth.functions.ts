import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "./auth";
import type { UserRole } from "./auth.types";

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    return session;
  },
);

export const ensureSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    return session;
  },
);

export const ensureAdminSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session || session.user.role !== ("ADMIN" as UserRole)) {
      throw new Error("Unauthorized: Admin access required");
    }

    return session;
  },
);
