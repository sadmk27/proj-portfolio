import { aboutQueryOptions } from "@/queries/about/aboutQueries";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { NavProfileSkeleton } from "@/views/components/navbar/nav-profile-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavProfileProps {
  showText?: boolean;
}

export function NavProfile({ showText = true }: NavProfileProps) {
  const { t } = useTranslation();
  const { data: about, isLoading } = useQuery(aboutQueryOptions);

  if (isLoading) {
    return <NavProfileSkeleton showText={showText} />;
  }

  const name = about?.name ?? t("personal.name");
  const role = about?.role ?? t("personal.role");

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={t("personal.avatar")} />
        <AvatarFallback>{t("common.avatar")}</AvatarFallback>
      </Avatar>
      {showText && (
        <div className="flex flex-col text-left overflow-hidden">
          <span className="text-sm font-semibold truncate max-w-[150px]">
            {name}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {role}
          </span>
        </div>
      )}
    </div>
  );
}
