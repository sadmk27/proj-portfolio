interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-4">
      {children}
    </p>
  );
}
