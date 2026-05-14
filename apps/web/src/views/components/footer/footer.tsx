import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  Terminal,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full border-t bg-background">
      <Separator />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8">
        <a href="#">
          <div className="flex items-center gap-3">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">
              {t("common.portfolio")}
            </span>
          </div>
        </a>
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {`©${new Date().getFullYear()}`}{" "}
            <a href="#" className="hover:underline">
              shadcn/studio
            </a>
            {t("footer.description")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#">
            <GithubIcon className="h-6 w-6 text-primary" />
          </a>
          <a href="#">
            <LinkedinIcon className="h-6 w-6 text-primary" />
          </a>
          <a href="#">
            <FacebookIcon className="h-6 w-6 text-primary" />
          </a>
          <a href="#">
            <InstagramIcon className="h-6 w-6 text-primary" />
          </a>
        </div>
      </div>
    </footer>
  );
}
