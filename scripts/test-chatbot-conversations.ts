import { generateChatbotReply } from "../lib/chatbot/engine";
import { generateHybridChatbotReply } from "../lib/chatbot/hybrid";
import { ChatIntent, ChatLocale, PersonaMode } from "../lib/chatbot/knowledge";
import { buildSystemPrompt } from "../lib/chatbot/prompt";

type ConversationCase = {
  name: string;
  message: string;
  locale?: ChatLocale;
  mode?: PersonaMode;
  expectedIntent: ChatIntent;
  expectedLead?: boolean;
  mustInclude?: string[];
  mustNotMatch?: RegExp[];
  expectArabicReply?: boolean;
};

const pricingLeakPatterns = [
  /\$\s?\d/i,
  /\b2,?999\b/i,
  /\b7,?999\b/i,
  /\brough estimate\b/i,
  /\bpackage price\b/i,
];

const fixedTimelinePatterns = [
  /\b4\s*(to|-|–)\s*8\s*weeks\b/i,
  /\b4\s*weeks\b/i,
  /\b8\s*weeks\b/i,
  /\bguaranteed\b/i,
  /\bguarantee\b/i,
];

const hardPromisePatterns = [
  /\bdefinitely\b/i,
  /\bguaranteed\b/i,
  /\bwe can deliver\b/i,
  /\bno problem\b/i,
];

const cases: ConversationCase[] = [
  {
    name: "English services question routes to services",
    message: "What services do you offer?",
    expectedIntent: "services",
    expectedLead: true,
    mustInclude: ["Custom AI Automation", "LLM"],
  },
  {
    name: "English business value question routes to value",
    message: "How can AI help my real estate business?",
    expectedIntent: "value",
    expectedLead: true,
    mustInclude: ["workflow", "What industry"],
  },
  {
    name: "English pricing question never leaks numbers",
    message: "How much does an AI chatbot cost?",
    expectedIntent: "pricing",
    expectedLead: true,
    mustInclude: ["case by case"],
    mustNotMatch: [...pricingLeakPatterns, ...fixedTimelinePatterns],
  },
  {
    name: "English timeline question avoids fixed duration",
    message: "How long will it take?",
    expectedIntent: "timeline",
    expectedLead: true,
    mustInclude: ["depends on scope"],
    mustNotMatch: fixedTimelinePatterns,
  },
  {
    name: "English custom build answer is conditional",
    message: "Can you build a WhatsApp automation system?",
    expectedIntent: "can_build",
    expectedLead: true,
    mustInclude: ["workflow", "integrations", "data"],
    mustNotMatch: hardPromisePatterns,
  },
  {
    name: "English team answer stays high level",
    message: "Tell me about your team backgrounds and internal operations",
    expectedIntent: "team",
    expectedLead: true,
    mustInclude: ["formal B2B"],
    mustNotMatch: [/resume/i, /salary/i, /internal roadmap/i],
  },
  {
    name: "English case studies answer uses public projects only",
    message: "Show me previous projects",
    expectedIntent: "case_studies",
    expectedLead: false,
    mustInclude: ["public case studies", "Education", "Real Estate"],
    mustNotMatch: [/confidential client/i, /NDA client/i],
  },
  {
    name: "English out-of-scope question stays scoped",
    message: "Can you give me investment advice?",
    expectedIntent: "out_of_scope",
    expectedLead: false,
    mustInclude: ["focused on Trimindes AI"],
  },
  {
    name: "Arabic pricing question routes to pricing",
    message: "كم تكلفة بناء شات بوت؟",
    locale: "ar",
    expectedIntent: "pricing",
    expectedLead: true,
    expectArabicReply: true,
    mustNotMatch: pricingLeakPatterns,
  },
  {
    name: "Arabic timeline question routes to timeline",
    message: "كم يستغرق تنفيذ المشروع؟",
    locale: "ar",
    expectedIntent: "timeline",
    expectedLead: true,
    expectArabicReply: true,
    mustNotMatch: fixedTimelinePatterns,
  },
  {
    name: "Arabic contact question routes to contact",
    message: "كيف أتواصل معكم؟",
    locale: "ar",
    expectedIntent: "contact",
    expectedLead: true,
    expectArabicReply: true,
  },
  {
    name: "Arabic technology question routes to technology",
    message: "ما هي التقنيات المستخدمة؟",
    locale: "ar",
    expectedIntent: "technology",
    expectedLead: false,
    expectArabicReply: true,
  },
  {
    name: "Arabic case study question routes to case studies",
    message: "هل لديكم أمثلة أو مشاريع سابقة؟",
    locale: "ar",
    expectedIntent: "case_studies",
    expectedLead: false,
    expectArabicReply: true,
    mustNotMatch: [/confidential/i, /NDA/i],
  },
];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function hasArabicText(input: string) {
  return /[\u0600-\u06FF]/.test(input);
}

function runCase(testCase: ConversationCase) {
  const response = generateChatbotReply({
    message: testCase.message,
    locale: testCase.locale ?? "en",
    mode: testCase.mode ?? "balanced",
    history: [],
  });

  assert(
    response.intent === testCase.expectedIntent,
    `${testCase.name}: expected intent "${testCase.expectedIntent}", got "${response.intent}"`
  );

  if (typeof testCase.expectedLead === "boolean") {
    assert(
      response.shouldCaptureLead === testCase.expectedLead,
      `${testCase.name}: expected shouldCaptureLead ${testCase.expectedLead}, got ${response.shouldCaptureLead}`
    );
  }

  for (const text of testCase.mustInclude ?? []) {
    assert(
      response.reply.toLowerCase().includes(text.toLowerCase()),
      `${testCase.name}: reply must include "${text}". Reply: ${response.reply}`
    );
  }

  for (const pattern of testCase.mustNotMatch ?? []) {
    assert(!pattern.test(response.reply), `${testCase.name}: reply matched forbidden pattern ${pattern}`);
  }

  if (testCase.expectArabicReply) {
    assert(hasArabicText(response.reply), `${testCase.name}: expected Arabic text in reply. Reply: ${response.reply}`);
  }
}

async function runHybridFallbackCase() {
  const originalApiKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;

  try {
    const servicesResponse = await generateHybridChatbotReply({
      message: "What services do you offer?",
      locale: "en",
      mode: "balanced",
      history: [],
    });

    assert(
      servicesResponse.source === "llm_fallback",
      `Hybrid fallback: expected source "llm_fallback", got "${servicesResponse.source}"`
    );
    assert(servicesResponse.intent === "services", `Hybrid fallback: expected services intent`);

    const pricingResponse = await generateHybridChatbotReply({
      message: "How much does it cost?",
      locale: "en",
      mode: "balanced",
      history: [],
    });

    assert(
      pricingResponse.source === "llm_fallback",
      `Hybrid fallback pricing: expected source "llm_fallback", got "${pricingResponse.source}"`
    );
    assert(pricingResponse.intent === "pricing", `Hybrid fallback pricing: expected pricing intent`);
  } finally {
    if (originalApiKey) {
      process.env.OPENAI_API_KEY = originalApiKey;
    }
  }
}

function runSystemPromptCase() {
  const prompt = buildSystemPrompt({
    intent: "pricing",
    locale: "en",
    mode: "balanced",
  });

  assert(prompt.includes("Conversation funnel:"), "System prompt should include the sales conversation funnel");
  assert(prompt.includes("Productized offers:"), "System prompt should include productized offers");
  assert(prompt.includes("info@trimindesai.com"), "System prompt should include the direct contact email");
  assert(prompt.includes("LinkedIn"), "System prompt should mention LinkedIn as a social channel");
  assert(prompt.includes("Instagram"), "System prompt should mention Instagram as a social channel");
  assert(prompt.includes("Facebook"), "System prompt should mention Facebook as a social channel");
  assert(
    prompt.includes("Do not invent WhatsApp, Instagram, Facebook, or LinkedIn URLs"),
    "System prompt should forbid invented social URLs"
  );
}

async function main() {
  for (const testCase of cases) {
    runCase(testCase);
    console.log(`PASS ${testCase.name}`);
  }

  await runHybridFallbackCase();
  console.log("PASS hybrid fallback without OPENAI_API_KEY");
  runSystemPromptCase();
  console.log("PASS sales funnel system prompt");
  console.log(`\n${cases.length + 2} chatbot conversation tests passed.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
