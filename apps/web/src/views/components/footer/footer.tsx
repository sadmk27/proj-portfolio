import { Separator } from "@/components/ui/separator";
import { socialLinkQueryOptions } from "@/queries/social-links/socialLinkQueries";
import { useQuery } from "@tanstack/react-query";
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
  const { data: socialLinks } = useQuery({
    ...socialLinkQueryOptions,
  });
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
          <p className="text-sm text-muted-foreground text-center">
            {t("footer.description", { year: new Date().getFullYear() })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks?.map((link) => {
            const Icon = {
              github: GithubIcon,
              linkedin: LinkedinIcon,
              facebook: FacebookIcon,
              instagram: InstagramIcon,
            }[link.platform.toLowerCase()];
            return Icon ? (
              <a
                href={link.url}
                key={link.id}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-6 w-6" />
              </a>
            ) : null;
          })}
        </div>
      </div>
    </footer>
  );
}
