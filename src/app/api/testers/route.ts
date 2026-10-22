import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { sendTesterEmail } from "@/lib/email";
import { getAllTesters, saveTesterToExcel, syncTesterToOnlineSheet } from "@/lib/excel";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { testerServerSchema } from "@/lib/validations";

/** In-memory rate limiter: 5 requests per IP per 15-minute window. */
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions from this network. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  // Honeypot: hidden field must be empty. Pretend success to bots.
  const honeypot = (body as { website?: unknown })?.website;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Cloudflare Turnstile verification
  const turnstileToken = (body as { turnstileToken?: string })?.turnstileToken;
  const turnstile = await verifyTurnstileToken({
    token: turnstileToken,
    ip,
  });

  if (!turnstile.success) {
    return NextResponse.json(
      { error: turnstile.error ?? "Security verification failed." },
      { status: 400 }
    );
  }

  const parsed = testerServerSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  const normalizedEmail = parsed.data.email.toLowerCase().trim();

  // Check if this Google Play email is already registered
  const existingTesters = await getAllTesters();
  const alreadyExists = existingTesters.some(
    (item) => item.email.toLowerCase().trim() === normalizedEmail
  );

  if (alreadyExists) {
    return NextResponse.json(
      {
        error: "This Google Play email is already registered on our tester roster.",
        fieldErrors: {
          email: "This email is already registered as a tester.",
        },
        alreadyRegistered: true,
      },
      { status: 409 }
    );
  }

  const userAgent = request.headers.get("user-agent");
  const testerRecord = {
    ...parsed.data,
    email: normalizedEmail,
    registeredAt: new Date().toISOString(),
    ip,
  };

  // 1. Synchronize to live Google Sheet (checks duplicates directly in sheet)
  const syncResult = await syncTesterToOnlineSheet(testerRecord);
  if (syncResult.duplicate) {
    return NextResponse.json(
      {
        error: "This Google Play email is already registered on our tester roster.",
        fieldErrors: {
          email: "This email is already registered as a tester.",
        },
        alreadyRegistered: true,
      },
      { status: 409 }
    );
  }

  // 2. Automatically write directly to local Excel (.xlsx), CSV, and JSON
  await saveTesterToExcel(testerRecord);

  // 3. Optional: Only send email if explicitly enabled in environment variables.
  // By default, this is disabled so you won't be spammed with emails.
  if (process.env.SEND_TESTER_NOTIFICATIONS === "true") {
    try {
      await sendTesterEmail(parsed.data, { ip, userAgent });
    } catch (error) {
      console.warn("[testers] Email notification skipped or failed:", error);
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Your Google Play email has been recorded into the tester roster! We will add you to the Closed Testing track.",
  });
}
