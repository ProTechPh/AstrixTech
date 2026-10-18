import { site } from "@/config/site";
import type { ContactFormValues } from "@/lib/validations";

export type DeliveryResult = {
  /** true when a provider accepted the message. */
  delivered: boolean;
  /** Which provider handled (or was expected to handle) the message. */
  provider: "resend" | "smtp" | "none";
};

const toArray = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

/**
 * Sends the contact message through the first configured provider:
 *
 * 1. Resend         — set RESEND_API_KEY
 * 2. SMTP (nodemailer) — set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD
 * 3. Fallback       — log the submission server-side so nothing is lost while
 *                     email delivery is being configured.
 *
 * All credentials live in environment variables. See .env.example.
 */
export async function sendContactEmail(
  payload: ContactFormValues,
  meta: { ip: string | null; userAgent: string | null }
): Promise<DeliveryResult> {
  const submittedAt = new Date().toISOString();
  const to = toArray(process.env.CONTACT_EMAIL_TO);
  const from = process.env.SMTP_FROM ?? "AstrixTech Contact <onboarding@resend.dev>";

  const subject = `New inquiry: ${payload.service} — ${payload.fullName}`;
  const text = [
    `Submitted: ${submittedAt}`,
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "—"}`,
    `Service: ${payload.service}`,
    `IP: ${meta.ip ?? "unknown"}`,
    `User-Agent: ${meta.userAgent ?? "unknown"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  // 1) Resend
  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.length > 0 ? to : [site.email],
        reply_to: payload.email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend delivery failed:", detail);
      throw new Error("Email provider rejected the message.");
    }
    return { delivered: true, provider: "resend" };
  }

  // 2) SMTP
  if (process.env.SMTP_HOST) {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          }
        : undefined,
    });

    await transport.sendMail({
      from,
      to: to.length > 0 ? to : site.email,
      replyTo: payload.email,
      subject,
      text,
    });
    return { delivered: true, provider: "smtp" };
  }

  // 3) Not configured — log server-side so submissions aren't silently lost.
  console.warn(
    "[contact] No email provider configured. Set RESEND_API_KEY or SMTP_HOST. Submission logged instead."
  );
  console.info(`[contact] ${subject}\n${text}`);
  return { delivered: false, provider: "none" };
}
