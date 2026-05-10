import i18n from "@/lib/i18n";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
}

if (i18n.isInitialized) {
  hydrate();
} else {
  i18n.on("initialized", hydrate);
}
