import { generateChatbotReply } from "./engine";
import { generateOpenAIReply } from "./openai";
import { buildSystemPrompt } from "./prompt";
import { ChatIntent, ChatRequest, ChatResponse } from "./knowledge";

const guardedIntents = new Set<ChatIntent>(["out_of_scope"]);

export async function generateHybridChatbotReply(request: ChatRequest): Promise<ChatResponse> {
  const ruleResponse = generateChatbotReply(request);

  if (guardedIntents.has(ruleResponse.intent)) {
    return {
      ...ruleResponse,
      source: "rules",
    };
  }

  try {
    const llmReply = await generateOpenAIReply({
      request,
      systemPrompt: buildSystemPrompt({
        intent: ruleResponse.intent,
        mode: request.mode ?? "balanced",
        locale: request.locale ?? "en",
      }),
    });

    if (!llmReply) {
      return {
        ...ruleResponse,
        source: "llm_fallback",
      };
    }

    return {
      ...ruleResponse,
      reply: llmReply,
      source: "llm",
    };
  } catch (error) {
    return {
      ...ruleResponse,
      source: "llm_fallback",
    };
  }
}
