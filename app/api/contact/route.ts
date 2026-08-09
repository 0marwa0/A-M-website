import { NextResponse } from "next/server";

const CONTACT_EMAIL = "marwajawad19@gmail.com";
const MAX_FIELD_LENGTH = 4000;

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  industry?: unknown;
  goal?: unknown;
  scale?: unknown;
  message?: unknown;
  recommendedStart?: unknown;
};

function asTrimmedString(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as ContactRequest;
    const name = asTrimmedString(body.name, 120);
    const email = asTrimmedString(body.email, 220);
    const industry = asTrimmedString(body.industry, 120);
    const goal = asTrimmedString(body.goal, 160);
    const scale = asTrimmedString(body.scale, 160);
    const message = asTrimmedString(body.message);
    const recommendedStart = asTrimmedString(body.recommendedStart);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const subject = "Initiate Project Discussion";
    const text = [
      "New project discussion request from TRI MINDS website.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Industry Focus: ${industry || "Not selected"}`,
      `Primary Goal: ${goal || "Not selected"}`,
      `Scale: ${scale || "Not selected"}`,
      "",
      "Message:",
      message,
      "",
      `Recommended Start: ${recommendedStart || "Not selected"}`,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#10172d">
        <h2 style="margin:0 0 16px">New project discussion request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Industry Focus:</strong> ${escapeHtml(industry || "Not selected")}</p>
        <p><strong>Primary Goal:</strong> ${escapeHtml(goal || "Not selected")}</p>
        <p><strong>Scale:</strong> ${escapeHtml(scale || "Not selected")}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        <p><strong>Recommended Start:</strong> ${escapeHtml(recommendedStart || "Not selected")}</p>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "TRI MINDS <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        subject,
        reply_to: email,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || "Unable to send email." },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send contact request." },
      { status: 500 }
    );
  }
}
