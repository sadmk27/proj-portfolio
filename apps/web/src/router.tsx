import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getQueryClient } from "./lib/query-client";
import i18nGlobal from "./lib/i18n";
import type { i18n } from "i18next";
import type { Theme } from "./theme-provider";

export function getRouter(context?: { i18n?: i18n; theme?: Theme }) {
  const queryClient = getQueryClient();

  const i18nInstance = context?.i18n ?? i18nGlobal;

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
      i18n: i18nInstance,
      lang: i18nInstance.language,
      theme: context?.theme ?? "system",
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
