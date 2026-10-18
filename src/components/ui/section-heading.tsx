import type { ReactNode } from "react";

import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  children?: ReactNode;
};

/**
 * Shared heading block for page sections: small eyebrows, large display
 * titles, and optional supporting copy.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center"
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-highlight/60" />
        <p className="font-mono text-[11px] tracking-[0.3em] text-highlight uppercase">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-tight text-balance uppercase sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
