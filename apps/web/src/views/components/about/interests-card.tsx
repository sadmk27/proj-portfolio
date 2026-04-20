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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          {t("about.Interests-title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
            {interest}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
