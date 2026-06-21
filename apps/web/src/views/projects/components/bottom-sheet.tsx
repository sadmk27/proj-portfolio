interface BottomSheetProps {
  title: string;
  description?: string;
}

export function BottomSheet({ title, description }: BottomSheetProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 translate-y-full 
        group-hover:translate-y-0 transition-transform duration-300 ease-in-out h-[40%]"
    >
      {/* Fade overlay */}
      <div className="h-16 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Sheet */}
      <div className="bg-background px-3 pt-3 pb-6 h-full">
        {/* Drag handle */}
        <div className="flex justify-center mb-3">
          <div className="w-6 h-0.5 rounded-full bg-muted-foreground/30" />
        </div>
        <p
          className="text-sm font-semibold text-foreground 
                leading-tight line-clamp-1"
        >
          {title}
        </p>
        {description && (
          <p
            className="text-sm text-muted-foreground leading-snug mt-1
                    line-clamp-9"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
