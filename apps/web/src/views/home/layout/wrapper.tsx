import { cn } from "@/lib/utils";
import { SectionTitle } from "@/views/components/headers/section-title";
import React from "react";

interface WrapperProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Wrapper({ id, title, children, className }: WrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8",
        className,
      )}
    >
      <SectionTitle title={title} />
      <div className="flex flex-1 flex-col justify-start gap-5 md:gap-6">
        {children}
      </div>
    </section>
  );
}
