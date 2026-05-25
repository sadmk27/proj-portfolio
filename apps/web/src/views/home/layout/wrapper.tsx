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
        "w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col gap-2",
        className,
      )}
    >
      <SectionTitle title={title} />
      <div className="mt-8 md:mt-12 flex flex-col gap-6">{children}</div>
    </section>
  );
}
