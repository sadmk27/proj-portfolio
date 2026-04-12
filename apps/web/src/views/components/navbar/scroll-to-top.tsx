import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

const throttle = (callback: (...args: unknown[]) => void, delay: number) => {
  let waiting = false;
  return (...args: unknown[]) => {
    if (!waiting) {
      callback(...args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, delay);
    }
  };
};

export const ScrollToTop = () => {
  const [isVisible, setVisible] = useState(false);

  const throttledToggle = useMemo(
    () =>
      throttle(() => {
        if (window.scrollY > 300) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }, 100),
    [],
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledToggle);
    return () => {
      window.removeEventListener("scroll", throttledToggle);
    };
  }, [throttledToggle]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <Button
        onClick={goToTop}
        className="fixed bottom-8 right-8 rounded-full shadow-lg transition-all hover:scale-110"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    )
  );
};
