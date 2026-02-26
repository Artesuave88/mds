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
  timeline: z.string().trim().min(1, "Timeline is required.").max(120, "Timeline is too long."),
  message: z.string().trim().min(20, "Message must be at least 20 characters.").max(5000, "Message is too long."),
  website: z
    .union([z.literal(""), z.string().trim().url("Website must be a valid URL.")])
    .optional()
    .default(""),
  honeypot: z.string().optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required." })
  })
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

  const resend = new Resend(envResult.data.RESEND_API_KEY);
  const submittedAt = new Date().toISOString();
  const source = request.headers.get("origin") || "Unknown";

  const details = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Timeline: ${payload.timeline}`,
    `Website: ${payload.website || "Not provided"}`,
    `Consent: ${payload.consent ? "Yes" : "No"}`,
    `Source: ${source}`,
    `Submitted: ${submittedAt}`
  ];

  try {
    const result = await resend.emails.send({
      to: [envResult.data.TO_EMAIL],
      from: envResult.data.FROM_EMAIL,
      replyTo: payload.email,
      subject: `New website inquiry: ${payload.name}`,
      text: [...details, "", "Message:", payload.message].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;max-width:700px">
          <h2 style="margin:0 0 12px">New Website Inquiry</h2>
          <p style="margin:0 0 16px;color:#475569">You received a new contact submission.</p>
          <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
            <tbody>
              <tr><td style="padding:6px 0;font-weight:600">Name</td><td style="padding:6px 0">${escapeHtml(payload.name)}</td></tr>
              <tr><td style="padding:6px 0;font-weight:600">Email</td><td style="padding:6px 0">${escapeHtml(payload.email)}</td></tr>
              <tr><td style="padding:6px 0;font-weight:600">Timeline</td><td style="padding:6px 0">${escapeHtml(payload.timeline)}</td></tr>
              <tr><td style="padding:6px 0;font-weight:600">Website</td><td style="padding:6px 0">${escapeHtml(payload.website || "Not provided")}</td></tr>
              <tr><td style="padding:6px 0;font-weight:600">Consent</td><td style="padding:6px 0">Yes</td></tr>
              <tr><td style="padding:6px 0;font-weight:600">Source</td><td style="padding:6px 0">${escapeHtml(source)}</td></tr>
              <tr><td style="padding:6px 0;font-weight:600">Submitted</td><td style="padding:6px 0">${escapeHtml(submittedAt)}</td></tr>
            </tbody>
          </table>
          <h3 style="margin:0 0 8px">Message</h3>
          <pre style="margin:0;white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px">${escapeHtml(payload.message)}</pre>
        </div>
      `
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
