import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export const POST: RequestHandler = async ({ request }) => {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return json(
      {
        error: "Missing required fields: name, email, message"
      },
      { status: 400 }
    );
  }

  return json({
    ok: true,
    received: {
      name,
      email,
      messageLength: message.length
    }
  });
};
