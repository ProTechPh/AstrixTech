export interface VerifyTurnstileOptions {
  token: string | null | undefined;
  ip?: string;
  idempotencyKey?: string;
}

export interface VerifyTurnstileResult {
  success: boolean;
  error?: string;
  errorCodes?: string[];
}

/**
 * Validates a Cloudflare Turnstile response token with Cloudflare's siteverify API.
 * Uses official Cloudflare testing keys in development if no secret is provided.
 */
export async function verifyTurnstileToken({
  token,
  ip,
  idempotencyKey,
}: VerifyTurnstileOptions): Promise<VerifyTurnstileResult> {
  const isDev = process.env.NODE_ENV !== "production";
  // Cloudflare's official always-passing dummy secret key for testing:
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY ||
    (isDev ? "1x0000000000000000000000000000000AA" : undefined);

  if (!secretKey) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not configured on the server.");
    return {
      success: false,
      error: "Security verification service is not configured.",
    };
  }

  if (!token) {
    return {
      success: false,
      error: "Please complete the Turnstile security check.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip && ip !== "unknown") {
      formData.append("remoteip", ip);
    }
    if (idempotencyKey) {
      formData.append("idempotency_key", idempotencyKey);
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!res.ok) {
      console.error("[turnstile] Siteverify HTTP error:", res.status);
      return {
        success: false,
        error: "Failed to connect to security verification service.",
      };
    }

    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
      challenge_ts?: string;
      hostname?: string;
    };

    if (data.success) {
      return { success: true };
    }

    console.warn("[turnstile] Verification rejected:", data["error-codes"]);
    return {
      success: false,
      error: "Security verification failed. Please try again.",
      errorCodes: data["error-codes"],
    };
  } catch (err) {
    console.error("[turnstile] Unexpected error during verification:", err);
    return {
      success: false,
      error: "An unexpected error occurred during security verification.",
    };
  }
}
