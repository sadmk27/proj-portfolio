interface InfoNoteProps {
  message: string;
  icon?: string;
}

export function InfoNote({ message, icon }: InfoNoteProps) {
  return (
    <div
      className="flex items-start gap-2.5 bg-muted 
        border border-border rounded-md px-4 py-3 
        text-sm text-muted-foreground leading-relaxed"
    >
      <i
        className={`ti ${icon} text-base flex-shrink-0 mt-0.5`}
        aria-hidden="true"
      />
      {message}
    </div>
  );
}
