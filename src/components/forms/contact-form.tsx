"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { motion, useReducedMotion } from "motion/react";

import { useInteractionTimer } from "@/hooks/use-interaction-timer";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget, type TurnstileInstance } from "@/components/ui/turnstile";
import {
  contactClientSchema,
  SERVICE_OPTIONS,
  type ContactClientValues,
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

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);
  const reducedMotion = useReducedMotion();
  const getElapsedTime = useInteractionTimer();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactClientValues>({
    resolver: zodResolver(contactClientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      service: undefined,
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactClientValues) => {
    if (!turnstileToken) {
      setServerError("Please complete the security check.");
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: getElapsedTime(),
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          data?.error ?? "Something went wrong while sending your message."
        );
      }

      setStatus("success");
      reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message."
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
        className="flex flex-col items-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-8 py-14 text-center"
        role="status"
      >
        <CheckCircle2 className="size-10 text-emerald-400" aria-hidden="true" />
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thank you for reaching out. We&apos;ve received your message and will
          get back to you by email.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            className="mt-2"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          <FieldError id="fullName-error">{errors.fullName?.message}</FieldError>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-2"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email-error">{errors.email?.message}</FieldError>
        </div>

        {/* Company (optional) */}
        <div>
          <Label htmlFor="company">
            Company <span className="text-muted/60 font-normal">(optional)</span>
          </Label>
          <Input
            id="company"
            className="mt-2"
            autoComplete="organization"
            placeholder="Company name"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            {...register("company")}
          />
          <FieldError id="company-error">{errors.company?.message}</FieldError>
        </div>

        {/* Service */}
        <div>
          <Label htmlFor="service">Service Interested In</Label>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select
                id="service"
                className="mt-2"
                value={field.value}
                onValueChange={field.onChange}
                options={SERVICE_OPTIONS}
                placeholder="Select a service"
                invalid={Boolean(errors.service)}
                describedBy={errors.service ? "service-error" : undefined}
              />
            )}
          />
          <FieldError id="service-error">{errors.service?.message}</FieldError>
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          className="mt-2"
          rows={6}
          placeholder="Tell us about your project, goals, and timeline…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error">{errors.message?.message}</FieldError>
      </div>

      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* Cloudflare Turnstile Verification */}
      <div className="pt-1">
        <TurnstileWidget
          ref={turnstileRef}
          id="contact-turnstile"
          action="contact"
          onSuccess={(token) => {
            setTurnstileToken(token);
            setServerError(null);
          }}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted/70">
          Required fields are validated before sending.
        </p>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="min-w-44"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
