import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLogo } from "@/views/components/navbar/nav-logo";
import { NavLinks } from "@/views/components/navbar/nav-links";
import { NavActions } from "@/views/components/navbar/nav-actions";
import { useState } from "react";

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto h-16 px-4 flex items-center justify-between gap-4 md:gap-8">
        {/* Left Section: Branding */}
        <div className="flex justify-start flex-shrink-0">
          <NavLogo />
        </div>

        {/* Center Section: Navigation (Desktop only) */}
        <div className="hidden md:flex justify-center flex-1 min-w-0">
          <NavLinks />
        </div>

        {/* Right Section: Actions (Desktop only) or Burger (Mobile only) */}
        <div className="flex items-center justify-end gap-3 flex-shrink-0">
          {/* Desktop Actions */}
          <div className="hidden md:flex">
            <NavActions />
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label={t("common.openMenu")}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] flex flex-col"
              >
                <SheetHeader className="text-left pb-6 border-b">
                  <SheetTitle>{t("common.menu")}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col py-6 gap-8 overflow-y-auto flex-1">
                  <div className="px-2">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2 uppercase tracking-wider">
                      {t("common.navigation")}
                    </h3>
                    <NavLinks
                      orientation="vertical"
                      onItemClick={() => setIsOpen(false)}
                    />
                  </div>

                  <div className="mt-auto px-2 pt-6 border-t space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2 uppercase tracking-wider">
                        {t("common.settings")}
                      </h3>
                      <NavActions
                        showProfile={true}
                        forceShowProfile={true}
                        className="flex flex-row justify-between items-center w-full px-2"
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
