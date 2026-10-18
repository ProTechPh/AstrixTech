"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Measures accumulated milliseconds the page has been actually visible.
 * Used as lightweight bot-protection telemetry: automated form abuse
 * submits in far less time than a human needs to read the page.
 *
 * Returns a snapshot function so the value is read only at submit time.
 */
export function useInteractionTimer() {
  const accumulated = useRef(0);
  const stretchStarted = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      stretchStarted.current = Date.now();
    };
    const stop = () => {
      if (stretchStarted.current !== null) {
        accumulated.current += Date.now() - stretchStarted.current;
        stretchStarted.current = null;
      }
    };

    const onVisibilityChange = () =>
      document.hidden ? stop() : start();

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", stop);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", stop);
    };
  }, []);

  // Created once; reads the refs only when called (at submit time), never during render.
  const getElapsed = useCallback(() => {
    if (stretchStarted.current !== null && typeof document !== "undefined") {
      return accumulated.current + (Date.now() - stretchStarted.current);
    }
    return accumulated.current;
  }, []);

  return getElapsed;
}
