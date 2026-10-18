import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:bg-highlight hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset] active:bg-primary/90",
        outline:
          "border border-white/20 bg-white/[0.02] text-foreground hover:border-highlight/60 hover:bg-white/[0.06] hover:text-white active:bg-white/[0.03]",
        ghost:
          "text-muted hover:text-foreground hover:bg-white/[0.06] active:bg-white/[0.03]",
        link: "text-highlight uppercase underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        default: "h-11 px-6",
        lg: "h-12 px-8 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
