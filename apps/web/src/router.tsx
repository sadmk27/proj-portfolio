import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getQueryClient } from "./lib/query-client";
import { type i18n } from "i18next";
import defaultI18nInstance from "./lib/i18n";

export function getRouter(i18n: i18n = defaultI18nInstance) {
  const queryClient = getQueryClient();

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
      i18n: i18n,
      session: undefined!,
    },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
