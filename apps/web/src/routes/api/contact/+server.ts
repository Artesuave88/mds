import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { Resend } from "resend";
import { z } from "zod";
import type { RequestHandler } from "./$types";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  TO_EMAIL: z.string().email(),
  FROM_EMAIL: z.string().min(1)
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120, "Name is too long."),
  email: z.string().trim().email("Please provide a valid email address."),
  timeline: z.string().trim().max(120, "Timeline is too long.").optional().default("Not provided"),
  message: z.string().trim().min(1, "Message is required.").max(5000, "Message is too long."),
  website: z
    .union([z.literal(""), z.string().trim().url("Website must be a valid URL.")])
    .optional()
    .default(""),
  honeypot: z.string().optional().default(""),
  consent: z.boolean().optional().default(true)
});

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

function mapFieldErrors(error: z.ZodError) {
  const flattened = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(flattened)
      .filter(([, messages]) => Array.isArray(messages) && messages.length > 0)
      .map(([field, messages]) => [field, messages?.[0] ?? "Invalid value"])
  );
}

function getClientIp(getClientAddress: () => string, forwardedFor: string | null) {
  try {
    return getClientAddress();
  } catch {
    return forwardedFor?.split(",")[0]?.trim() || "unknown";
  }
}

function isRateLimited(ip: string, now = Date.now()) {
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const existing = rateLimitStore.get(ip);

  if (!existing) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  if (existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const envResult = envSchema.safeParse({
    RESEND_API_KEY: env.RESEND_API_KEY,
    TO_EMAIL: env.TO_EMAIL,
    FROM_EMAIL: env.FROM_EMAIL
  });

  if (!envResult.success) {
    console.error("[api/contact] Missing or invalid environment variables.");
    return json(
      {
        ok: false,
        error: "Contact service is not configured yet."
      },
      { status: 500 }
    );
  }

  const clientIp = getClientIp(getClientAddress, request.headers.get("x-forwarded-for"));
  if (isRateLimited(clientIp)) {
    return json(
      {
        ok: false,
        error: "Too many requests. Please try again later."
      },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json(
      {
        ok: false,
        error: "Invalid JSON payload."
      },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Validation failed.",
        fieldErrors: mapFieldErrors(parsed.error)
      },
      { status: 400 }
    );
  }

  const payload = parsed.data;
  if (payload.honeypot.trim().length > 0) {
    return json({ ok: true });
  }

  if (!payload.consent) {
    return json(
      {
        ok: false,
        error: "Consent is required."
      },
      { status: 400 }
    );
  }

  const resend = new Resend(envResult.data.RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      to: [envResult.data.TO_EMAIL],
      from: envResult.data.FROM_EMAIL,
      replyTo: payload.email,
      subject: `New website inquiry from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Timeline: ${payload.timeline}`,
        `Website: ${payload.website || "Not provided"}`,
        "",
        "Message:",
        payload.message
      ].join("\n")
    });

    if (result.error) {
      console.error("[api/contact] Failed to deliver contact email.");
      return json(
        {
          ok: false,
          error: "Failed to deliver message. Please try again shortly."
        },
        { status: 502 }
      );
    }

    console.info("[api/contact] Message delivered.");
    return json({
      ok: true,
      message: "Message sent successfully."
    });
  } catch {
    console.error("[api/contact] Failed to deliver contact email.");
    return json(
      {
        ok: false,
        error: "Failed to deliver message. Please try again shortly."
      },
      { status: 502 }
    );
  }
};
