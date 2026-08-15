import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface ProfileCardProps {
  name: string;
  role: string;
  imageUrl: string | null;
}

export function ProfileCard({ name, role, imageUrl }: ProfileCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="h-full overflow-hidden border-2 group hover:border-primary/50 transition-colors">
      <CardContent className="p-4 h-full flex flex-col gap-4 sm:flex-row sm:items-center md:p-5 md:flex-row md:gap-5">
        <div className="h-44 w-full bg-muted relative overflow-hidden flex items-center justify-center rounded-lg sm:h-36 sm:w-36 sm:shrink-0 md:h-full md:w-1/2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={t("about.imageAlt")}
              className="object-cover w-full h-full transition-all duration-500 scale-105 group-hover:scale-100"
            />
          ) : (
            <div className="text-muted-foreground text-sm">
              {t("about.noImage")}
            </div>
          )}
        </div>
        <div className="min-w-0 flex flex-col justify-center md:w-1/2">
          <h3 className="text-lg md:text-xl font-bold mb-2 break-words hyphens-auto leading-tight">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground font-medium italic md:text-base">
            {role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
