import { Info } from "lucide-react";

interface InfoNoteProps {
  message: string;
}

export function InfoNote({ message }: InfoNoteProps) {
  return (
    <div
      className="flex items-start gap-2.5 bg-muted 
        border border-border rounded-md px-4 py-3 
        text-sm text-muted-foreground leading-relaxed"
    >
      <Info />
      {message}
    </div>
  );
}
