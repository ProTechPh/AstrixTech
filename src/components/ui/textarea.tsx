import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors",
        "hover:border-white/20 focus-visible:border-highlight/60 focus-visible:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-400/60 aria-invalid:focus-visible:outline-red-500/40",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
