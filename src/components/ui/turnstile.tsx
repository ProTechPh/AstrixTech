"use client";

import { forwardRef } from "react";
import {
  Turnstile as ReactTurnstile,
  type TurnstileInstance,
  type TurnstileProps as ReactTurnstileProps,
} from "@marsidev/react-turnstile";

export interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: (errorCode?: string) => void;
  onExpire?: () => void;
  className?: string;
  theme?: "dark" | "light" | "auto";
  action?: string;
  id?: string;
}

/** Default Cloudflare always-passing dummy sitekey for local development */
const FALLBACK_SITE_KEY = "1x00000000000000000000AA";

export const TurnstileWidget = forwardRef<
  TurnstileInstance | undefined,
  TurnstileWidgetProps
>(function TurnstileWidget(
  { onSuccess, onError, onExpire, className, theme = "dark", action, id },
  ref
) {
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || FALLBACK_SITE_KEY;

  return (
    <div className={className ?? "min-h-[65px] flex items-center"}>
      <ReactTurnstile
        ref={ref}
        id={id}
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme,
          action,
          size: "normal",
        }}
      />
    </div>
  );
});

export type { TurnstileInstance };
