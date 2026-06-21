import { BottomSheet } from "./bottom-sheet";

interface PhoneFrameProps {
  children: React.ReactNode;
  drawerTitle?: string;
  drawerDescription?: string;
}

export function PhoneFrame({
  children,
  drawerTitle,
  drawerDescription,
}: PhoneFrameProps) {
  const hasDrawer = Boolean(drawerTitle);

  return (
    <div className="relative w-full">
      {/* Phone shell */}
      <div className="group relative rounded-[2rem] border-[5px] border-muted-foreground/25 bg-background overflow-hidden shadow-sm">
        {/* Notch */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-2.5">
          <div className="w-14 h-2 rounded-full bg-muted-foreground/20" />
        </div>
        {/* Screen */}
        <div className="aspect-[9/19] overflow-hidden">{children}</div>
        {hasDrawer && (
          <BottomSheet title={drawerTitle!} description={drawerDescription} />
        )}
        {/* Home indicator */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute -right-[7px] top-20 w-[5px] h-12 rounded-r-sm bg-muted-foreground/20" />
      <div className="absolute -left-[7px] top-14 w-[5px] h-9 rounded-l-sm bg-muted-foreground/20" />
      <div className="absolute -left-[7px] top-28 w-[5px] h-9 rounded-l-sm bg-muted-foreground/20" />
    </div>
  );
}
