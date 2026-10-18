import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { sendContactEmail } from "@/lib/email";
import { contactServerSchema } from "@/lib/validations";

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

  // Schema strips the honeypot/timing fields; unknown keys are dropped.
  const parsed = contactServerSchema.safeParse(body);
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

  const userAgent = request.headers.get("user-agent");

  try {
    const result = await sendContactEmail(parsed.data, { ip, userAgent });
    // In production an undelivered message means a lost inquiry — fail loudly
    // so the visitor knows to email directly instead of silently dropping it.
    // Development keeps the console-log fallback so the flow is testable
    // without configuring a provider.
    if (!result.delivered && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          error:
            "Your message could not be delivered right now. Please try again, or email us directly.",
        },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, provider: result.provider });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return NextResponse.json(
      {
        error:
          "Your message could not be delivered right now. Please try again, or email us directly.",
      },
      { status: 502 }
    );
  }
}
