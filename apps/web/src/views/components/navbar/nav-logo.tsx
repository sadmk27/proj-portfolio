import { Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";

export function NavLogo() {
  const { t } = useTranslation();

  return (
    <a
      href="#home"
      className="flex items-center gap-2 font-bold cursor-pointer hover:opacity-80 transition-opacity"
    >
      <Terminal className="h-6 w-6 text-primary" />
      <span className="hidden sm:inline-block md:hidden xl:inline-block">
        {t("common.portfolio")}
      </span>
    </a>
  );
}
