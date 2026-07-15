import {
  ChatIntent,
  ChatLocale,
  ChatRequest,
  ChatResponse,
  PersonaMode,
  chatbotKnowledge,
} from "./knowledge";

const defaultMode: PersonaMode = "balanced";
const defaultLocale: ChatLocale = "en";

const intentMatchers: Record<ChatIntent, string[]> = {
  value: [
    "value",
    "benefit",
    "help",
    "help my business",
    "add value",
    "improve",
    "growth",
    "roi",
    "efficiency",
    "automate",
    "automate my business",
    "lead qualification",
    "lead scoring",
    "sales automation",
    "real estate business",
    "real estate team",
    "education business",
    "healthcare business",
    "logistics business",
    "finance business",
    "قيمة",
    "فائدة",
    "يساعد",
    "تحسين",
    "نمو",
    "كفاءة",
    "أتمتة أعمالي",
    "عقارات",
    "تعليم",
    "رعاية صحية",
    "لوجستية",
    "مالية",
  ],
  services: [
    "service",
    "offer",
    "what do you do",
    "solution",
    "capability",
    "provide",
    "specialize",
    "خدمة",
    "خدمات",
    "ماذا تقدمون",
    "حلول",
    "إمكانيات",
    "تخصص",
  ],
  pricing: [
    "price",
    "pricing",
    "cost",
    "quote",
    "budget",
    "estimate",
    "how much",
    "$",
    "سعر",
    "تسعير",
    "تكلفة",
    "عرض سعر",
    "ميزانية",
    "تقدير",
    "كم يكلف",
    "كم السعر",
  ],
  timeline: [
    "timeline",
    "time",
    "duration",
    "how long",
    "deadline",
    "weeks",
    "months",
    "take",
    "جدول زمني",
    "وقت",
    "مدة",
    "كم يستغرق",
    "موعد نهائي",
    "أسابيع",
    "أشهر",
  ],
  can_build: [
    "can you build",
    "could you build",
    "can we build",
    "possible",
    "build a",
    "build an",
    "create a",
    "create an",
    "develop a",
    "develop an",
    "make a",
    "make an",
    "هل يمكنكم بناء",
    "هل تستطيعون تطوير",
    "ممكن تعملوا",
    "هل يمكن إنشاء",
    "هل يمكنكم تطوير",
  ],
  case_studies: [
    "case study",
    "case studies",
    "project",
    "portfolio",
    "previous",
    "past work",
    "examples",
    "done before",
    "show me",
    "دراسة حالة",
    "دراسات حالة",
    "مشروع",
    "أعمال سابقة",
    "أمثلة",
    "نماذج أعمال",
  ],
  technology: [
    "technology",
    "tech stack",
    "stack",
    "python",
    "laravel",
    "framework",
    "tools",
    "llm",
    "model",
    "whatsapp api",
    "تقنية",
    "تقنيات",
    "التقنية المستخدمة",
    "أدوات",
    "نموذج لغوي",
  ],
  team: [
    "team",
    "founder",
    "developer",
    "background",
    "experience",
    "talent",
    "engineer",
    "فريق",
    "مؤسس",
    "مطور",
    "خبرة",
    "مهندس",
  ],
  process: [
    "process",
    "steps",
    "methodology",
    "workflow",
    "discovery",
    "mvp",
    "testing",
    "deployment",
    "عملية",
    "خطوات",
    "منهجية",
    "سير العمل",
    "اكتشاف",
    "اختبار",
    "نشر",
  ],
  contact: [
    "contact",
    "email",
    "whatsapp",
    "call",
    "meeting",
    "schedule",
    "talk",
    "reach",
    "تواصل",
    "اتصال",
    "بريد إلكتروني",
    "واتساب",
    "اجتماع",
    "موعد",
    "كيف أتواصل",
  ],
  out_of_scope: [
    "weather",
    "news",
    "politics",
    "medical advice",
    "legal advice",
    "investment advice",
    "طقس",
    "أخبار",
    "سياسة",
    "استشارة طبية",
    "استشارة قانونية",
    "نصيحة استثمارية",
  ],
  general: [],
};

function normalize(input: string) {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}

function detectIntent(message: string): ChatIntent {
  const text = normalize(message);
  const orderedIntents: ChatIntent[] = [
    "pricing",
    "timeline",
    "can_build",
    "contact",
    "case_studies",
    "technology",
    "process",
    "services",
    "value",
    "team",
    "out_of_scope",
  ];

  return (
    orderedIntents.find((intent) => intentMatchers[intent].some((token) => text.includes(token))) ??
    "general"
  );
}

function cta(locale: ChatLocale) {
  const { email, contactAnchor, whatsapp, social, pendingWhatsappNote } = chatbotKnowledge.contact;
  const availableSocials = [
    social.linkedin ? `LinkedIn: ${social.linkedin}` : "",
    social.instagram ? `Instagram: ${social.instagram}` : "",
    social.facebook ? `Facebook: ${social.facebook}` : "",
  ].filter(Boolean);

  if (locale === "ar") {
    if (whatsapp) {
      return `أفضل خطوة تالية هي إرسال ملخص قصير عن مشروعك عبر واتساب: ${whatsapp}. يمكنك أيضًا التواصل عبر البريد الإلكتروني ${email}.`;
    }
    return `أفضل خطوة تالية هي مشاركة ملخص قصير عن مشروعك عبر نموذج التواصل (${contactAnchor}) أو عبر البريد الإلكتروني ${email}. سيتم إضافة رقم واتساب وحسابات التواصل الاجتماعي فور جاهزية الحسابات الرسمية.`;
  }

  if (whatsapp) {
    return `The best next step is to send a short project brief on WhatsApp: ${whatsapp}. You can also email ${email}.`;
  }

  if (availableSocials.length > 0) {
    return `The best next step is to share a short project brief through the contact form (${contactAnchor}) or email ${email}. You can also follow up through ${availableSocials.join(", ")}.`;
  }

  return `The best next step is to share a short project brief through the contact form (${contactAnchor}) or email ${email}. You can also look for Trimindes AI on LinkedIn, Instagram, and Facebook for updates. ${pendingWhatsappNote}`;
}

function tuneTone(reply: string, mode: PersonaMode, locale: ChatLocale) {
  if (mode === "precise") {
    return reply;
  }

  if (mode === "creative") {
    if (locale === "ar") {
      return `${reply}\n\nإذا شاركتني سير العمل الذي تريد تحسينه، يمكنني مساعدتك في تشكيل أول فكرة أتمتة قبل التحدث مع الفريق.`;
    }
    return `${reply}\n\nIf you share the workflow you want to improve, I can help shape the first automation idea before you speak with the team.`;
  }

  return reply;
}

function formatServiceList() {
  return chatbotKnowledge.services
    .map((service) => `- ${service.name}: ${service.summary}\n  Business value: ${service.value}`)
    .join("\n");
}

function formatCaseStudies() {
  return chatbotKnowledge.publicCaseStudies
    .map((project) => `- ${project.industry}: ${project.title}. ${project.summary}`)
    .join("\n");
}

function formatProductOffers() {
  return chatbotKnowledge.productOffers
    .map((offer) => `- ${offer.name}: ${offer.outcome}`)
    .join("\n");
}

function formatServiceListArabic() {
  return chatbotKnowledge.services
    .map((service) => `- ${service.name}: ${service.summary}\n  القيمة للأعمال: ${service.value}`)
    .join("\n");
}

function formatCaseStudiesArabic() {
  return chatbotKnowledge.publicCaseStudies
    .map((project) => `- ${project.industry}: ${project.title}. ${project.summary}`)
    .join("\n");
}

function buildEnglishReply(intent: ChatIntent) {
  switch (intent) {
    case "value":
      return `AI adds the most value when it is tied to a concrete business workflow, not just added as a feature.\n\nTrimindes AI usually starts by finding one high-friction process, then shaping the right offer around it: automation, LLM integration, analytics, or an AI-enhanced web/mobile product.\n\nCommon value paths include reducing manual work, improving response time, increasing decision quality, surfacing risks or revenue signals earlier, and creating a smoother customer experience.\n\nWhat industry are you in, and which workflow currently costs your team the most time or missed opportunity?`;
    case "services":
      return `Trimindes AI provides these core services:\n${formatServiceList()}\n\nThe offers we most often shape into a project are:\n${formatProductOffers()}\n\nWhich area is closest to what you want to buy or explore: automation, LLM integration, analytics, or an AI-powered app?`;
    case "pricing":
      return `Pricing is scoped case by case because AI work depends on integrations, data readiness, complexity, security requirements, user workflows, and support needs.\n\nI cannot provide rough estimates, package prices, or dollar amounts in chat. The fastest way to get to a useful proposal is to identify the workflow, systems involved, data sources, users, and desired business outcome.\n\nBefore you contact the team, what are you trying to build: automation, LLM integration, analytics/dashboarding, or an AI-powered product?`;
    case "timeline":
      return `The delivery path is usually: ${chatbotKnowledge.process.join(" -> ")}.\n\nI cannot promise a fixed timeline in chat. Timing depends on scope, integrations, data quality, review cycles, compliance needs, and deployment requirements.\n\nTo understand the likely delivery shape, what systems or data sources would this solution need to connect with?`;
    case "can_build":
      return `Yes, if the request is aligned with custom AI workflows, automation, dashboards, LLM integrations, or AI-powered web/mobile products, Trimindes AI is well positioned to explore it.\n\nI would avoid making a hard technical promise without more context. To scope it properly, the team would need to understand the workflow, required integrations, data sources, user roles, security constraints, and success criteria.\n\nWhat should the system do first for the user, and what existing tools or data should it connect to?`;
    case "case_studies":
      return `I can discuss the public case studies listed on the site:\n${formatCaseStudies()}\n\nI cannot reference confidential or unlisted projects.`;
    case "technology":
      return `Trimindes AI works with technologies such as ${chatbotKnowledge.technologies.join(", ")}.\n\nThe exact stack should be selected after understanding the product goals, integrations, data flow, security requirements, and deployment environment.\n\nWhat stack or tools does your business already use today?`;
    case "team":
      return `Trimindes AI has a multidisciplinary team focused on AI automation, engineering, product, design, and business implementation.\n\nDetailed team backgrounds, internal operations, and specific talent capabilities are usually shared through formal B2B conversations rather than public chat. ${cta("en")}`;
    case "process":
      return `The high-level process is: ${chatbotKnowledge.process.join(" -> ")}.\n\nDiscovery clarifies the business goal and constraints. The MVP focuses on the highest-value workflow. Testing validates quality and reliability. Deployment brings the solution into the real operating environment.\n\nFor your case, what business outcome would make the MVP worth buying?`;
    case "contact":
      return cta("en");
    case "out_of_scope":
      return `I am focused on Trimindes AI services, AI automation, public projects, and project scoping. For topics outside that scope, it is better to use a specialist source.`;
    case "general":
    default:
      return `I can help with Trimindes AI services, how AI could add value to your business, public case studies, technologies, process, and how to start a project discussion.\n\nWhat industry are you in, and what workflow or business problem are you trying to improve?`;
  }
}

function buildArabicReply(intent: ChatIntent) {
  switch (intent) {
    case "value":
      return `يقدم الذكاء الاصطناعي أكبر قيمة عندما يرتبط بسير عمل تجاري محدد، وليس مجرد ميزة إضافية.\n\nمن مسارات القيمة الشائعة: تقليل العمل اليدوي، تحسين زمن الاستجابة، رفع جودة القرارات، الكشف المبكر عن المخاطر أو فرص الإيرادات، وتحسين تجربة العملاء.\n\nعلى سبيل المثال، في قطاع العقارات قد يعني ذلك أتمتة مزامنة القوائم بين نظام CRM والمنصات، أو محاكاة تدريب الوسطاء، أو تأهيل العملاء المحتملين، أو أتمتة المستندات والمتابعة. وتنطبق نفس الفكرة على القطاعات الأخرى: تحديد سير العمل، وتحديد الخطوة الأكثر احتكاكًا، وأتمتة الجزء ذي الأثر التجاري القابل للقياس.\n\nإذا شاركتني مجال عملك وسير العمل الذي تريد تحسينه، يمكنني اقتراح أفضل نقطة بداية.`;
    case "services":
      return `تقدم Trimindes AI الخدمات الأساسية التالية:\n${formatServiceListArabic()}\n\nإذا أخبرتني بمجال عملك وسير العمل الذي تريد تحسينه، يمكنني توجيهك إلى الخدمة الأنسب.`;
    case "pricing":
      return `يتم تحديد الأسعار لكل مشروع على حدة لأن عمل الذكاء الاصطناعي يعتمد على التكاملات، جاهزية البيانات، التعقيد، متطلبات الأمان، سير عمل المستخدمين، واحتياجات الدعم.\n\nلا يمكنني تقديم تقديرات تقريبية أو أسعار حزم أو مبالغ محددة في المحادثة. يمكن أن يكون التعاقد على أساس المشروع، أو اشتراك دوري، أو نموذج مخصص بعد مرحلة الاكتشاف.\n\n${cta("ar")}`;
    case "timeline":
      return `مسار التسليم عادة هو: ${chatbotKnowledge.process.join(" -> ")}.\n\nلا يمكنني تحديد مدة زمنية ثابتة في المحادثة. يعتمد التوقيت على نطاق العمل، التكاملات، جودة البيانات، دورات المراجعة، متطلبات الامتثال، ومتطلبات النشر. بعد مرحلة الاكتشاف، يمكن للفريق تقديم خطة وجدول زمني واقعي.`;
    case "can_build":
      return `نعم، إذا كان الطلب متوافقًا مع سير عمل الذكاء الاصطناعي المخصص، الأتمتة، لوحات المعلومات، تكامل نماذج اللغة الكبيرة، أو منتجات الويب/الجوال المدعومة بالذكاء الاصطناعي، فإن Trimindes AI في موقع جيد لاستكشاف ذلك.\n\nأفضل عدم تقديم وعد تقني قاطع دون مزيد من السياق. لتحديد النطاق بشكل صحيح، يحتاج الفريق إلى فهم سير العمل، التكاملات المطلوبة، مصادر البيانات، أدوار المستخدمين، القيود الأمنية، ومعايير النجاح.\n\n${cta("ar")}`;
    case "case_studies":
      return `يمكنني الحديث عن دراسات الحالة العامة المدرجة على الموقع:\n${formatCaseStudiesArabic()}\n\nلا يمكنني الإشارة إلى مشاريع سرية أو غير مدرجة.`;
    case "technology":
      return `تعمل Trimindes AI بتقنيات مثل ${chatbotKnowledge.technologies.join("، ")}.\n\nيتم اختيار الحزمة التقنية الدقيقة بعد فهم أهداف المنتج، التكاملات، تدفق البيانات، متطلبات الأمان، وبيئة النشر.`;
    case "team":
      return `تمتلك Trimindes AI فريقًا متعدد التخصصات يركز على أتمتة الذكاء الاصطناعي، الهندسة، المنتج، التصميم، وتنفيذ الأعمال.\n\nعادة ما تتم مشاركة تفاصيل خلفيات الفريق والعمليات الداخلية وقدرات المواهب المحددة من خلال محادثات B2B رسمية وليس عبر المحادثة العامة. ${cta("ar")}`;
    case "process":
      return `المسار العام للعملية هو: ${chatbotKnowledge.process.join(" -> ")}.\n\nمرحلة الاكتشاف توضح الهدف التجاري والقيود. مرحلة MVP تركز على سير العمل الأعلى قيمة. مرحلة الاختبار تتحقق من الجودة والموثوقية. مرحلة النشر تُدخل الحل إلى بيئة التشغيل الفعلية.`;
    case "contact":
      return cta("ar");
    case "out_of_scope":
      return `أنا مختص بخدمات Trimindes AI، أتمتة الذكاء الاصطناعي، المشاريع العامة، وتحديد نطاق المشاريع. بالنسبة للمواضيع خارج هذا النطاق، من الأفضل الرجوع إلى مصدر متخصص.`;
    case "general":
    default:
      return `يمكنني مساعدتك بخصوص خدمات Trimindes AI، وكيف يمكن للذكاء الاصطناعي أن يضيف قيمة لعملك، ودراسات الحالة العامة، والتقنيات المستخدمة، والعملية، وكيفية بدء نقاش حول مشروعك.\n\nما هو مجال عملك، وما سير العمل أو المشكلة التجارية التي تريد تحسينها؟`;
  }
}

function shouldCaptureLead(intent: ChatIntent) {
  return ["pricing", "can_build", "contact", "timeline", "services", "value", "team"].includes(intent);
}

export function generateChatbotReply(request: ChatRequest): ChatResponse {
  const message = request.message?.trim() ?? "";
  const mode = request.mode ?? defaultMode;
  const locale = request.locale ?? defaultLocale;
  const intent = detectIntent(message);
  const baseReply = locale === "ar" ? buildArabicReply(intent) : buildEnglishReply(intent);

  return {
    reply: tuneTone(baseReply, mode, locale),
    intent,
    shouldCaptureLead: shouldCaptureLead(intent),
  };
}
