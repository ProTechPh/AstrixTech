"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type SelectProps = {
  /** Wire to react-hook-form state (omit while untouched to show the placeholder). */
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  id?: string;
  /** id of an error paragraph for aria-describedby wiring. */
  describedBy?: string;
  invalid?: boolean;
  className?: string;
};

/**
 * Radix-based select. The native dropdown popup is painted by the OS and
 * largely ignores page styles, so the form uses this fully stylable,
 * keyboard-accessible replacement instead.
 */
function Select({
  value,
  onValueChange,
  options,
  placeholder,
  id,
  describedBy,
  invalid,
  className,
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} required>
      <SelectPrimitive.Trigger
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={
          describedBy ? describedBy : undefined
        }
        className={cn(
          "flex h-11 w-full items-center justify-between gap-3 border border-white/10 bg-white/[0.03] px-3.5 text-sm text-foreground transition-colors",
          "data-[placeholder]:text-muted hover:border-white/20 focus-visible:border-highlight/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight/40",
          "aria-invalid:border-red-400/60 aria-invalid:focus-visible:outline-red-500/40",
          className
        )}
      >
        <span className="truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon aria-hidden="true">
          <ChevronDown className="size-4 shrink-0 text-muted" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-y-auto border border-white/10 bg-surface-raised shadow-2xl shadow-black/50"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option}
                value={option}
                className="relative flex cursor-pointer select-none items-center py-2 pl-3 pr-9 text-sm text-foreground outline-none transition-colors data-[highlighted]:bg-primary/10 data-[highlighted]:text-highlight data-[state=checked]:text-highlight"
              >
                <span className="flex-1 truncate">
                  <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                </span>
                <SelectPrimitive.ItemIndicator className="absolute right-3">
                  <Check className="size-4" aria-hidden="true" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
