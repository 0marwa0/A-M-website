import { ChatMessageInput, ChatRequest } from "./knowledge";

type OpenAIResponseOutputText = {
  type?: string;
  text?: string;
};

type OpenAIResponseOutputMessage = {
  type?: string;
  role?: string;
  content?: OpenAIResponseOutputText[];
};

type OpenAIResponseBody = {
  output_text?: string;
  output?: OpenAIResponseOutputMessage[];
};

function toOpenAIInput(history: ChatMessageInput[] | undefined, message: string) {
  const priorMessages = (history ?? [])
    .slice(-8)
    .filter((item) => item.text.trim())
    .map((item) => ({
      role: item.sender === "bot" ? "assistant" : "user",
      content: item.text,
    }));

  const lastMessage = priorMessages[priorMessages.length - 1];
  if (!lastMessage || lastMessage.role !== "user" || lastMessage.content !== message) {
    priorMessages.push({
      role: "user",
      content: message,
    });
  }

  return priorMessages;
}

function extractText(body: OpenAIResponseBody) {
  if (body.output_text) {
    return body.output_text.trim();
  }

  const text = body.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text ?? "")
    .join("")
    .trim();

  return text || "";
}

export async function generateOpenAIReply({
  request,
  systemPrompt,
}: {
  request: ChatRequest;
  systemPrompt: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_CHATBOT_MODEL || "gpt-5.4-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...toOpenAIInput(request.history, request.message),
      ],
      max_output_tokens: 420,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const body = (await response.json()) as OpenAIResponseBody;
  return extractText(body) || null;
}
