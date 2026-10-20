import { z } from "zod";
import { services } from "@/data/services";

export const SERVICE_OPTIONS = [
  ...services.map((s) => s.title),
  "General Inquiry / Other",
] as const;

/**
 * Schema shared by the client form and the API route so client and server
 * validate identically.
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email is too long."),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please select a service.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please provide a little more detail (at least 20 characters).")
    .max(5000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Server-side only fields. Kept out of the public schema so the hidden
 * honeypot field is not advertised in the public contract.
 */
export const contactServerSchema = contactFormSchema.extend({
  /** Bot honeypot — must stay empty. */
  website: z
    .string()
    .max(0)
    .optional()
    .or(z.undefined())
    .catch(undefined),
  /** Milliseconds between page load and submit; bots submit instantly. */
  elapsedMs: z
    .number()
    .int()
    .min(2000, "Form submitted too quickly.")
    .optional(),
});

export type ContactServerValues = z.infer<typeof contactServerSchema>;

/**
 * Client-side schema: identical to the public schema plus the hidden
 * honeypot input it must register.
 */
export const contactClientSchema = contactFormSchema.extend({
  website: z.string().max(0, "Suspicious submission detected.").optional(),
});

export type ContactClientValues = z.infer<typeof contactClientSchema>;

/**
 * Validation schema for Google Play Closed Tester submissions.
 */
export const testerFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name or alias.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid Google Play email address.")
    .max(254, "Email is too long."),
  deviceModel: z
    .string()
    .trim()
    .max(100, "Device name is too long.")
    .optional()
    .or(z.literal("")),
  androidVersion: z
    .string()
    .trim()
    .max(50, "Android version is too long.")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes are too long.")
    .optional()
    .or(z.literal("")),
});

export type TesterFormValues = z.infer<typeof testerFormSchema>;

export const testerServerSchema = testerFormSchema.extend({
  /** Bot honeypot — must stay empty. */
  website: z
    .string()
    .max(0)
    .optional()
    .or(z.undefined())
    .catch(undefined),
  /** Milliseconds between page load and submit; bots submit instantly. */
  elapsedMs: z
    .number()
    .int()
    .min(2000, "Form submitted too quickly.")
    .optional(),
});

export type TesterServerValues = z.infer<typeof testerServerSchema>;

export const testerClientSchema = testerFormSchema.extend({
  website: z.string().max(0, "Suspicious submission detected.").optional(),
});

export type TesterClientValues = z.infer<typeof testerClientSchema>;
