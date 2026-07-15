import { NextResponse } from "next/server";
import { ChatMessageInput, ChatRequest } from "@/lib/chatbot/knowledge";
import { generateHybridChatbotReply } from "@/lib/chatbot/hybrid";
import { isRateLimited } from "@/lib/chatbot/rateLimit";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_ITEMS = 20;

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function sanitizeHistory(history: unknown): ChatMessageInput[] | undefined {
  if (!Array.isArray(history)) return undefined;

  return history
    .slice(-MAX_HISTORY_ITEMS)
    .filter(
      (item): item is ChatMessageInput =>
        !!item &&
        typeof item === "object" &&
        (item.sender === "bot" || item.sender === "user") &&
        typeof item.text === "string"
    )
    .map((item) => ({
      sender: item.sender,
      text: item.text.slice(0, MAX_MESSAGE_LENGTH),
    }));
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Partial<ChatRequest>;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error: "Message is too long.",
        },
        { status: 400 }
      );
    }

    const response = await generateHybridChatbotReply({
      message,
      mode: body.mode,
      locale: body.locale,
      history: sanitizeHistory(body.history),
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to generate a chatbot response.",
      },
      { status: 500 }
    );
  }
}
