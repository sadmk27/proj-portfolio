import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export function ScrollToTop() {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    )
  );
}
