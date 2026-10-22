"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, HelpCircle, Loader2, Send, Smartphone, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import { useInteractionTimer } from "@/hooks/use-interaction-timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget, type TurnstileInstance } from "@/components/ui/turnstile";
import {
  testerClientSchema,
  type TesterClientValues,
} from "@/lib/validations";

type Status = "idle" | "submitting" | "success" | "error";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-400">
      {children}
    </p>
  );
}

export function TesterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);
  const reducedMotion = useReducedMotion();
  const getElapsedTime = useInteractionTimer();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TesterClientValues>({
    resolver: zodResolver(testerClientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      deviceModel: "",
      androidVersion: "",
      notes: "",
      website: "",
    },
  });

  const onSubmit = async (values: TesterClientValues) => {
    if (!turnstileToken) {
      setServerError("Please complete the security check.");
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/testers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: getElapsedTime(),
          turnstileToken,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
        fieldErrors?: Record<string, string>;
        alreadyRegistered?: boolean;
      } | null;

      if (!response.ok) {
        if (data?.fieldErrors) {
          for (const [field, message] of Object.entries(data.fieldErrors)) {
            setError(field as keyof TesterClientValues, {
              type: "server",
              message,
            });
          }
        }
        throw new Error(
          data?.error ?? "Something went wrong while submitting your tester registration."
        );
      }

      setSubmittedEmail(values.email);
      setStatus("success");
      reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your tester registration."
      );
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-8 text-center sm:p-10"
        role="status"
      >
        <div className="flex size-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <CheckCircle2 className="size-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground uppercase">
          You&apos;re On the Tester List!
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          We&apos;ve registered <span className="font-mono text-highlight">{submittedEmail}</span> for our Google Play Closed Testing program.
        </p>

        <div className="mt-8 w-full max-w-md rounded-lg border border-white/10 bg-abyss/80 p-5 text-left text-xs leading-relaxed text-muted">
          <p className="font-semibold text-foreground">What happens next?</p>
          <ol className="mt-3 space-y-2.5 list-decimal pl-4 text-muted/90">
            <li>
              We add your email to the <strong className="text-foreground">Google Play Console Closed Testing track</strong>.
            </li>
            <li>
              You&apos;ll receive an invitation link to opt in on Google Play via your Android phone or web browser.
            </li>
            <li>
              Once opted in, you can download the early-access app directly from the Google Play Store and share feedback!
            </li>
          </ol>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Register Another Email
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {serverError && (
        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-400/25 bg-red-400/[0.07] px-4 py-3"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-200">{serverError}</p>
        </motion.div>
      )}

      {/* Honeypot for bot filtering */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <Label htmlFor="fullName">Your Name</Label>
          <Input
            id="fullName"
            className="mt-2"
            autoComplete="name"
            placeholder="Juan Dela Cruz"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          <FieldError id="fullName-error">{errors.fullName?.message}</FieldError>
        </div>

        {/* Google Play Email */}
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Google Play Email</Label>
            <span className="font-mono text-[10px] tracking-wider text-highlight uppercase">Required</span>
          </div>
          <Input
            id="email"
            type="email"
            className="mt-2"
            autoComplete="email"
            placeholder="your-account@gmail.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            {...register("email")}
          />
          <p id="email-hint" className="mt-1.5 text-[11px] leading-tight text-muted">
            Must be the exact Google/Gmail account you use on Google Play Store on Android.
          </p>
          <FieldError id="email-error">{errors.email?.message}</FieldError>
        </div>
      </div>

      {/* Device & Android Version */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="deviceModel" className="flex items-center gap-1.5">
            <Smartphone className="size-3.5 text-muted" aria-hidden="true" />
            Android Device (Optional)
          </Label>
          <Input
            id="deviceModel"
            className="mt-2"
            placeholder="e.g., Samsung Galaxy S23, Pixel 8, Redmi Note"
            aria-invalid={Boolean(errors.deviceModel)}
            aria-describedby={errors.deviceModel ? "deviceModel-error" : undefined}
            {...register("deviceModel")}
          />
          <FieldError id="deviceModel-error">{errors.deviceModel?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="androidVersion" className="flex items-center gap-1.5">
            <HelpCircle className="size-3.5 text-muted" aria-hidden="true" />
            Android OS Version (Optional)
          </Label>
          <Input
            id="androidVersion"
            className="mt-2"
            placeholder="e.g., Android 13, 14, 15"
            aria-invalid={Boolean(errors.androidVersion)}
            aria-describedby={errors.androidVersion ? "androidVersion-error" : undefined}
            {...register("androidVersion")}
          />
          <FieldError id="androidVersion-error">{errors.androidVersion?.message}</FieldError>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <Label htmlFor="notes">Notes or Experience (Optional)</Label>
        <Textarea
          id="notes"
          rows={3}
          className="mt-2"
          placeholder="Any previous beta testing experience, specific devices, or thoughts you'd like to share..."
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "notes-error" : undefined}
          {...register("notes")}
        />
        <FieldError id="notes-error">{errors.notes?.message}</FieldError>
      </div>

      {/* Notice box */}
      <div className="rounded-lg border border-white/8 bg-white/[0.02] p-4 text-xs text-muted leading-relaxed">
        <p>
          <strong className="text-foreground">Privacy Note:</strong> Your email will only be used to grant you closed testing access in the Google Play Console and send you build notifications. We will never share your email with third parties.
        </p>
      </div>

      {/* Cloudflare Turnstile Verification */}
      <div className="pt-1">
        <TurnstileWidget
          ref={turnstileRef}
          id="tester-turnstile"
          action="tester"
          onSuccess={(token) => {
            setTurnstileToken(token);
            setServerError(null);
          }}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
        />
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              Submit Tester Email
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
