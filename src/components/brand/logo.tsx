import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  /** Renders only the mark, without the wordmark. */
  markOnly?: boolean;
};

/**
 * AstrixTech logo — the orbital "A" mark (circular PNG derived from the
 * brand artwork) with the two-tone wordmark.
 */
export function Logo({ className, markClassName, markOnly }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo-mark.png"
        alt="AstrixTech mark"
        width={64}
        height={64}
        priority
        className={cn("size-7 shrink-0 rounded-full", markClassName)}
      />
      {!markOnly && (
        <span className="font-sans text-lg font-semibold tracking-tight text-foreground">
          Astrix
          <span className="text-highlight">Tech</span>
        </span>
      )}
    </span>
  );
}
