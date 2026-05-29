import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface InterestsCardProps {
  interests: string[];
}

export function InterestsCard({ interests }: InterestsCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="h-full border-2 group hover:border-primary/50 transition-colors">
      <CardHeader className="px-4 pt-4 pb-2 md:px-6 md:pt-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Heart className="h-5 w-5 text-primary" />
          {t("about.interestsTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 px-4 pb-4 md:px-6 md:pb-6">
        {interests.map((interest) => (
          <Badge
            key={interest}
            variant="secondary"
            className="gap-1 px-2.5 py-1 text-xs md:px-3"
          >
            {interest}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
