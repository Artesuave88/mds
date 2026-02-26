import cors from "cors";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  RESEND_API_KEY: z.string().min(1),
  TO_EMAIL: z.string().email(),
  FROM_EMAIL: z.string().min(1)
});

const envResult = envSchema.safeParse({
  PORT: process.env.PORT ?? "3001",
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  TO_EMAIL: process.env.TO_EMAIL,
  FROM_EMAIL: process.env.FROM_EMAIL
});

if (!envResult.success) {
  const invalid = envResult.error.issues.map((issue) => issue.path.join(".")).join(", ");
  console.error(`[api] Invalid environment configuration: ${invalid}`);
  process.exit(1);
}

const env = envResult.data;

const app = express();
const resend = new Resend(env.RESEND_API_KEY);

const allowedOrigins = new Set(["http://localhost:5173", "http://127.0.0.1:5173"]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json({ limit: "100kb" }));

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Too many requests. Please try again later."
  }
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120, "Name is too long."),
  email: z.string().trim().email("Please provide a valid email address."),
  timeline: z.string().trim().min(1, "Timeline is required.").max(120, "Timeline is too long."),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(5000, "Message is too long."),
  website: z
    .union([z.literal(""), z.string().trim().url("Website must be a valid URL.")])
    .optional()
    .default(""),
  honeypot: z.string().optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required." })
  })
});

function mapFieldErrors(error: z.ZodError) {
  const flattened = error.flatten().fieldErrors;
  return Object.fromEntries(
    Object.entries(flattened)
      .filter(([, messages]) => Array.isArray(messages) && messages.length > 0)
      .map(([key, messages]) => [key, messages?.[0] ?? "Invalid value"]) 
  );
}

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

app.post("/contact", contactLimiter, async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body ?? {});

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Validation failed.",
      fieldErrors: mapFieldErrors(parsed.error)
    });
  }

  const payload = parsed.data;

  if (payload.honeypot.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  try {
    const emailResult = await resend.emails.send({
      to: env.TO_EMAIL,
      from: env.FROM_EMAIL,
      replyTo: [payload.email],
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

    if (emailResult.error) {
      console.error("[api] Failed to deliver contact email.");
      return res.status(502).json({
        ok: false,
        error: "Failed to deliver message. Please try again shortly."
      });
    }

    console.info(`[api] Contact message accepted from ${req.ip}`);

    return res.status(200).json({
      ok: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    console.error("[api] Failed to deliver contact email.");

    return res.status(502).json({
      ok: false,
      error: "Failed to deliver message. Please try again shortly."
    });
  }
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    ok: false,
    error: "Not found."
  });
});

app.listen(env.PORT, () => {
  console.info(`[api] Listening on port ${env.PORT}`);
});
