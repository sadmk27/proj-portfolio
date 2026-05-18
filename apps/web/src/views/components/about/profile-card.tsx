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
      <CardContent className="p-6 h-full flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-muted relative overflow-hidden flex items-center justify-center rounded-xl">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={t("about.imageAlt")}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            />
          ) : (
            <div className="text-muted-foreground text-sm">
              {t("about.noImage")}
            </div>
          )}
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 break-words hyphens-auto leading-tight">
            {name}
          </h3>
          <p className="text-muted-foreground font-medium italic">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
