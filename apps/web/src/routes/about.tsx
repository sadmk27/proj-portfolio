import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  return <div>{t("about.title")}</div>;
}
