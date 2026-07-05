import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ message: "Message is too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "chrisalexiev@icloud.com";
  const from = process.env.CONTACT_FROM || "BuzzWeight <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not configured");
    return NextResponse.json(
      { message: "Contact is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const html = `
    <h2>New BuzzWeight contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[BuzzWeight] ${subject}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", res.status, detail);
      return NextResponse.json({ message: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}
