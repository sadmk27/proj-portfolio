import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "./section-label";
import { Button } from "@/components/ui/button";
import { Download, File } from "lucide-react";

interface FileDownloadRowProps {
  label: string;
  fileName: string;
  size: string;
  downloadLabel: string;
  href: string;
  downloadName?: string;
}

export function FileDownloadRow({
  label,
  fileName,
  size,
  downloadLabel,
  href,
  downloadName,
}: FileDownloadRowProps) {
  return (
    <section className="mb-10">
      <SectionLabel>{label}</SectionLabel>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
              <File />
            </div>
            <div>
              <p className="text-sm font-medium">{fileName}</p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">{size}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={href} download={downloadName ?? ""}>
              <Download />
              {downloadLabel}
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
