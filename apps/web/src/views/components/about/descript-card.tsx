import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DescriptionCardProps {
  description: string;
}

export function DescriptionCard({ description }: DescriptionCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="h-full overflow-hidden border-2 group hover:border-primary/50 transition-colors">
      <CardHeader className="px-4 pt-4 pb-2 md:px-6 md:pt-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Quote className="h-5 w-5 text-primary" />
          {t("about.descTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 md:px-6 md:pb-6">
        <p className="text-sm text-muted-foreground leading-relaxed md:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
