import type { VercelRequest, VercelResponse } from "@vercel/node";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = (req.body ?? {}) as ContactPayload;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing required fields: name, email, message"
    });
  }

  return res.status(200).json({
    ok: true,
    received: {
      name,
      email,
      messageLength: message.length
    }
  });
}
