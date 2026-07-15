export type ChatLocale = "en" | "ar";
export type PersonaMode = "creative" | "balanced" | "precise";

export type ChatMessageInput = {
  sender: "bot" | "user";
  text: string;
};

export type ChatRequest = {
  message: string;
  mode?: PersonaMode;
  locale?: ChatLocale;
  history?: ChatMessageInput[];
};

export type ChatResponse = {
  reply: string;
  intent: ChatIntent;
  shouldCaptureLead: boolean;
  source?: "rules" | "llm" | "llm_fallback";
};

export type ChatIntent =
  | "value"
  | "services"
  | "pricing"
  | "timeline"
  | "can_build"
  | "case_studies"
  | "technology"
  | "team"
  | "process"
  | "contact"
  | "out_of_scope"
  | "general";

type Service = {
  name: string;
  summary: string;
  value: string;
};

type CaseStudy = {
  industry: string;
  title: string;
  summary: string;
};

type ProductOffer = {
  name: string;
  bestFor: string;
  outcome: string;
};

export const chatbotKnowledge = {
  company: {
    name: "Trimindes AI",
    positioning:
      "Trimindes AI builds custom AI automation, analytics, LLM integrations, and AI-enhanced web and mobile products for business operations.",
  },
  services: [
    {
      name: "Custom AI Automation",
      summary:
        "Automates repetitive or complex workflows with AI-assisted decisioning, integrations, and operational guardrails.",
      value:
        "It can reduce manual work, shorten response times, improve consistency, and free teams to focus on higher-value work.",
    },
    {
      name: "AI-Powered Analytics and Dashboards",
      summary:
        "Turns operational data into dashboards, predictive signals, and business intelligence views.",
      value:
        "It helps leaders see bottlenecks, risks, revenue signals, and performance trends earlier.",
    },
    {
      name: "Industry-Specific AI Solutions",
      summary:
        "Designs tailored AI systems for industries such as education, real estate, healthcare, logistics, and finance.",
      value:
        "It maps AI capabilities to the actual workflows and constraints of the client industry.",
    },
    {
      name: "LLM Integration With Existing Systems",
      summary:
        "Connects large language models to CRMs, internal tools, knowledge bases, APIs, and business workflows.",
      value:
        "It lets teams use conversational interfaces and intelligent automation without replacing their existing stack.",
    },
    {
      name: "End-to-End AI Development",
      summary:
        "Supports strategy, product planning, model or workflow design, implementation, testing, deployment, and support.",
      value:
        "It gives clients one technical partner from idea validation through production rollout.",
    },
    {
      name: "Website and Mobile App Development",
      summary:
        "Builds modern web and mobile products with AI capabilities embedded into the user experience.",
      value:
        "It helps businesses ship customer-facing and internal tools that are practical, scalable, and easier to use.",
    },
  ] satisfies Service[],
  industries: ["Education", "Real Estate", "Healthcare", "Logistics", "Finance"],
  technologies: [
    "Python",
    "Laravel",
    "large language models",
    "AI automation frameworks",
    "machine learning pipelines",
    "vector search",
    "API integrations",
    "dashboards",
    "web and mobile application stacks",
  ],
  process: ["Discovery", "MVP", "Testing", "Deployment"],
  productOffers: [
    {
      name: "AI Workflow Automation",
      bestFor: "teams with repetitive operational, support, sales, or back-office workflows",
      outcome:
        "a scoped automation flow that reduces manual work and connects the right systems, data, and approvals.",
    },
    {
      name: "LLM Integration With Existing Systems",
      bestFor: "businesses that want chat, search, document, CRM, or knowledge-base intelligence inside current tools",
      outcome:
        "a production-ready LLM layer with prompts, guardrails, retrieval, integrations, and monitoring.",
    },
    {
      name: "AI Analytics and Decision Dashboards",
      bestFor: "leaders who need earlier visibility into performance, risk, revenue signals, and bottlenecks",
      outcome:
        "dashboards and predictive signals built around the decisions the business needs to make.",
    },
    {
      name: "AI-Enhanced Web and Mobile Products",
      bestFor: "companies building customer-facing or internal digital products with AI at the core",
      outcome:
        "a usable web or mobile product that embeds AI into real workflows instead of treating it as a gimmick.",
    },
  ] satisfies ProductOffer[],
  publicCaseStudies: [
    {
      industry: "Education",
      title: "Intelligent Student Assessment and Curriculum Engine",
      summary:
        "An AI assessment platform that evaluates student performance, identifies learning gaps, and supports personalized lesson planning.",
    },
    {
      industry: "Real Estate",
      title: "Automated Property Syndication and Broker Training Platform",
      summary:
        "A B2B platform for listing normalization, CRM-to-portal syndication, and AI-assisted broker training.",
    },
    {
      industry: "Healthcare",
      title: "Patient Health Scoring and Propensity Modeling Engine",
      summary:
        "A predictive scoring system that analyzes health, retention, and behavioral signals to identify risk and support proactive action.",
    },
    {
      industry: "Logistics",
      title: "Omni-Channel WhatsApp Business Automation Dashboard",
      summary:
        "A customer operations dashboard connecting WhatsApp Business conversations to workflow actions and background tasks.",
    },
    {
      industry: "Finance",
      title: "Real-Time AI Credit Metering and Guardrails",
      summary:
        "A usage and credit infrastructure for AI platforms, including token metering, budget limits, routing, and usage analytics.",
    },
  ] satisfies CaseStudy[],
  engagementModel:
    "Engagements are scoped around the business objective, technical complexity, integrations, data readiness, and support requirements. Pricing can be project-based, retainer-based, or structured around a tailored delivery model after discovery.",
  policy: {
    noPricingNumbers:
      "Do not provide rough estimates, dollar amounts, package prices, or fixed quotes in chat.",
    noFixedTimelines:
      "Do not promise exact project timelines. Explain the high-level process and say timing depends on scope, integrations, data, and delivery requirements.",
    noPrivateProjects:
      "Only discuss public case studies listed in the website knowledge. Do not imply knowledge of confidential or unlisted projects.",
    noDeepTeamDetails:
      "Do not deep dive into team backgrounds, internal operations, hiring structure, or detailed talent capabilities.",
    conditionalBuildAnswers:
      "For custom build questions, answer with conditional confidence and recommend a technical scoping conversation.",
  },
  contact: {
    email: "info@trimindesai.com",
    contactAnchor: "/#contact",
    whatsapp: "",
    social: {
      instagram: "",
      facebook: "",
      linkedin: "",
    },
    pendingWhatsappNote:
      "WhatsApp and social media links will be added as soon as the official accounts are ready.",
  },
} as const;
