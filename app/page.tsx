"use client";

import { useState, useEffect, useRef, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { Check, Star, ArrowRight, ArrowLeft, Sparkles, Cpu, Activity, Menu, X, Globe, ArrowUp, Copy, Facebook, Instagram, Linkedin, BarChart3, Folder, Settings, HeartPulse, GraduationCap, Building2, Truck, Landmark, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LightHeroBackground from "@/components/LightHeroBackground";
import Chatbot, { PersonaMode } from "@/components/Chatbot";
import { Component as TypewriterTestimonial } from "@/components/ui/typewriter-testimonial";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { RoadmapProcess } from "@/components/ui/roadmap-process";
import StarField from "@/components/StarField";
import InteractiveHUD from "@/components/InteractiveHUD";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";

const showcaseKeys = ["healthcare", "education", "realEstate", "logistics", "finance"] as const;
type ShowcaseKey = (typeof showcaseKeys)[number];
const contactIndustryKeys = ["education", "realEstate", "finance", "logistics"] as const;
type ContactIndustryKey = (typeof contactIndustryKeys)[number];
const contactGoalKeys = ["llmAutomation", "predictiveAnalytics", "b2bIntegration", "aiChatbots"] as const;
type ContactGoalKey = (typeof contactGoalKeys)[number];
const contactScaleKeys = ["initialPilot", "enterpriseDeployment"] as const;
type ContactScaleKey = (typeof contactScaleKeys)[number];
type WrittenTextProps = {
  text: string;
  as?: "p" | "h3";
  className?: string;
  style?: CSSProperties;
  delay?: number;
  speed?: number;
};

function WrittenText({ text, as = "p", className = "", style, delay = 0, speed = 16 }: WrittenTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setIsInView(false);
    setVisibleCount(0);
  }, [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!isInView) return;

    const characters = Array.from(text);
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const writeNext = () => {
      index += 1;
      setVisibleCount(index);

      if (index < characters.length) {
        timeout = setTimeout(writeNext, speed);
      }
    };

    timeout = setTimeout(writeNext, delay);
    return () => clearTimeout(timeout);
  }, [delay, isInView, speed, text]);

  const characters = Array.from(text);
  const visibleText = characters.slice(0, visibleCount).join("");
  const isWriting = isInView && visibleCount < characters.length;
  const sharedClassName = `relative block ${className}`;
  const content = (
    <>
      <span aria-hidden="true" className="invisible whitespace-pre-wrap">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-pre-wrap">
        {visibleText}
        {isWriting && (
          <span
            className="ml-0.5 inline-block h-[0.9em] w-px translate-y-[0.1em] animate-blink"
            style={{ backgroundColor: "currentColor" }}
          />
        )}
      </span>
    </>
  );

  if (as === "h3") {
    return (
      <h3 ref={(node) => { ref.current = node; }} className={sharedClassName} style={style} aria-label={text}>
        {content}
      </h3>
    );
  }

  return (
    <p ref={(node) => { ref.current = node; }} className={sharedClassName} style={style} aria-label={text}>
      {content}
    </p>
  );
}

type ShowcaseInterfaceProps = {
  showcaseKey: ShowcaseKey;
  label: string;
  color: string;
  stats: string[];
  showcaseLabel: string;
  lightMode?: boolean;
  locale?: string;
};

function ShowcaseInterface({ showcaseKey, label, color, stats, showcaseLabel, lightMode = false, locale = "en" }: ShowcaseInterfaceProps) {
  const isArabic = locale === "ar";
  const fallbackStats = stats.length > 0 ? stats : ["Telemetry", "Automation", "Guardrails"];
  const waveform = [36, 58, 44, 72, 63, 86, 48, 78, 54, 91, 68, 74, 47, 82, 61, 88];

  let liveHeader = isArabic ? "لوحة العمليات الحية" : "Live operations surface";
  let liveStatus = isArabic ? "مباشر" : "Streaming";
  let metricItems = fallbackStats.slice(0, 3).map((stat, index) => ({
    label: stat,
    val: index === 0 ? "3.75k" : index === 1 ? "92%" : "4.05",
  }));
  let workflowHeader = isArabic ? "مخطط سير العمل" : "Workflow map";
  let workflowNodes = [
    { left: "14%", top: "24%", label: isArabic ? "المدخلات" : "Input" },
    { left: "48%", top: "18%", label: isArabic ? "التخزين" : "Cache" },
    { left: "76%", top: "34%", label: isArabic ? "النموذج" : "LLM" },
    { left: "34%", top: "62%", label: isArabic ? "القواعد" : "Rules" },
    { left: "68%", top: "70%", label: isArabic ? "الربط" : "API" },
  ];
  let decisionTitle = isArabic ? "سجل القرارات" : "Decision log";
  let decisionLatency = isArabic ? "١٣ مللي/ث" : "13ms";
  let decisionLogs = isArabic
    ? ["تطابق ذاكرة التخزين الدلالية", "اجتياز سياسة الميزانية", "إدراج الإجراء في قائمة التنفيذ"]
    : ["Semantic cache hit", "Budget policy passed", "Worker action queued"];
  let screenshotLabels = isArabic ? ["العمليات", "المخاطر", "الميزانية"] : ["Ops", "Risk", "Spend"];
  let guardrailTitle = isArabic ? "مؤشر الأمان والضوابط" : "Guardrail cockpit";

  if (showcaseKey === "education") {
    liveHeader = isArabic ? "متابعة أداء الطلاب والتقييم اللحظي" : "Live Student Analytics & Adaptive Grading";
    liveStatus = isArabic ? "نشط ومباشر" : "Streaming";
    metricItems = isArabic
      ? [
          { label: "الطلاب النشطون", val: "1,420" },
          { label: "معدل الإتقان", val: "96.4%" },
          { label: "اختبارات مصححة", val: "4,850+" },
        ]
      : [
          { label: "Active Students", val: "1,420" },
          { label: "Academic Mastery", val: "96.4%" },
          { label: "Auto-graded Tasks", val: "4,850+" },
        ];
    workflowHeader = isArabic ? "مسار التقييم والتعلم التكيفي" : "Adaptive Learning Workflow";
    workflowNodes = isArabic
      ? [
          { left: "10%", top: "24%", label: "الواجبات" },
          { left: "44%", top: "18%", label: "تحليل الفهم" },
          { left: "74%", top: "34%", label: "خطة مخصصة" },
          { left: "30%", top: "62%", label: "تقرير المعلم" },
          { left: "66%", top: "70%", label: "بوابة ولي الأمر" },
        ]
      : [
          { left: "10%", top: "24%", label: "Student Work" },
          { left: "44%", top: "18%", label: "AI Diagnosis" },
          { left: "74%", top: "34%", label: "Custom Track" },
          { left: "30%", top: "62%", label: "Teacher View" },
          { left: "66%", top: "70%", label: "Parent Sync" },
        ];
    decisionTitle = isArabic ? "سجل التصحيح والتنبيهات الذكية" : "Live AI Grading & Alert Feed";
    decisionLatency = isArabic ? "فوري" : "Live";
    decisionLogs = isArabic
      ? [
          "تم تصحيح اختبار منتصف الفصل: أحمد المنصوري (96%)",
          "توليد خطة مراجعة مخصصة: سارة خالد",
          "تنبيه المعلم: ارتفاع فهم وحدة الجبر بنسبة 18%",
        ]
      : [
          "Auto-graded Midterm Quiz: Ahmed Al-Mansoor (96%)",
          "Generated Adaptive Revision Plan: Sarah Khalid",
          "Teacher Alert: +18% Algebra Unit Comprehension",
        ];
    screenshotLabels = isArabic
      ? ["جدول الدرجات", "كراف التقدم", "تحليل الفجوات"]
      : ["Grade Sheet", "Growth Chart", "Gap Matrix"];
    guardrailTitle = isArabic ? "مؤشرات دقة وموثوقية النظام" : "AI Accuracy & Standards Index";
  } else if (showcaseKey === "realEstate") {
    liveHeader = isArabic ? "مصفوفة إدارة الأصول وتحليل العوائد العقارية" : "Real Estate Asset Matrix & Yield Analytics";
    liveStatus = isArabic ? "نشط ومباشر" : "Streaming";
    metricItems = isArabic
      ? [
          { label: "نسبة الإشغال", val: "96.2%" },
          { label: "متوسط العائد الصافي", val: "11.4%" },
          { label: "اختصار زمن الصفقات", val: "-42%" },
        ]
      : [
          { label: "Occupancy Rate", val: "96.2%" },
          { label: "Avg Net Yield", val: "11.4%" },
          { label: "Closing Velocity", val: "-42%" },
        ];
    workflowHeader = isArabic ? "مخطط التقييم ومطابقة المستثمرين" : "Appraisal & Deal Pipeline";
    workflowNodes = isArabic
      ? [
          { left: "10%", top: "24%", label: "حصر الأصول" },
          { left: "44%", top: "18%", label: "تسعير المتر الذكي" },
          { left: "74%", top: "34%", label: "توليد الفرص" },
          { left: "30%", top: "62%", label: "إغلاق الصفقات" },
          { left: "66%", top: "70%", label: "بوابة المستثمر" },
        ]
      : [
          { left: "10%", top: "24%", label: "Asset Intake" },
          { left: "44%", top: "18%", label: "Smart /SqM" },
          { left: "74%", top: "34%", label: "Deal Match" },
          { left: "30%", top: "62%", label: "Closing" },
          { left: "66%", top: "70%", label: "Investor Hub" },
        ];
    decisionTitle = isArabic ? "سجل إغلاق الصفقات والتقييم اللحظي" : "Live Deal Execution & Valuation Feed";
    decisionLatency = isArabic ? "فوري" : "Live";
    decisionLogs = isArabic
      ? [
          "إتمام صفقة تمويل استثماري: المركز اللوجستي (24.5M ر.س)",
          "تحديث التقييم الآلي: برج الواجهة (+6.4% نمو رأسمالي)",
          "تنبيه ذكي: فرصة استحواذ ذات عائد يتجاوز 12% في شمال الرياض",
        ]
      : [
          "Executed Deal: Logistics Hub ($6.5M)",
          "Appraisal Updated: Commercial Tower (+6.4% Cap Growth)",
          "Yield Alert: Prime Acquisition Opportunity >12% Net",
        ];
    screenshotLabels = isArabic
      ? ["مصفوفة الصفقات", "توزيع العوائد", "خريطة الأسعار"]
      : ["Deal Pipeline", "Yield Curve", "Valuation Heatmap"];
    guardrailTitle = isArabic ? "مؤشرات جودة التقييم والسيولة" : "Valuation & Liquidity Index";
  } else if (showcaseKey === "healthcare") {
    liveHeader = isArabic ? "نظرة عامة — مرحباً د. أحمد | ملخص أداء المنشأة" : "Overview — Welcome Dr. Ahmed | Facility Performance";
    liveStatus = isArabic ? "نشط ومباشر" : "Streaming";
    metricItems = isArabic
      ? [
          { label: "إجمالي المرضى", val: "3,842" },
          { label: "المنومين", val: "128" },
          { label: "المواعيد", val: "56" },
        ]
      : [
          { label: "Total Patients", val: "3,842" },
          { label: "Inpatients", val: "128" },
          { label: "Appointments", val: "56" },
        ];
    workflowHeader = isArabic ? "مسار الفرز والرعاية الذكية" : "AI Clinical Triage & Care Track";
    workflowNodes = isArabic
      ? [
          { left: "10%", top: "24%", label: "استقبال المريض" },
          { left: "44%", top: "18%", label: "الفرز والتشخيص" },
          { left: "74%", top: "34%", label: "خطة العلاج" },
          { left: "30%", top: "62%", label: "متابعة المنومين" },
          { left: "66%", top: "70%", label: "الملف الطبي" },
        ]
      : [
          { left: "10%", top: "24%", label: "Admission" },
          { left: "44%", top: "18%", label: "AI Diagnosis" },
          { left: "74%", top: "34%", label: "Care Track" },
          { left: "30%", top: "62%", label: "Inpatient View" },
          { left: "66%", top: "70%", label: "EMR Portal" },
        ];
    decisionTitle = isArabic ? "تنبيهات النظام والمتابعة السريرية" : "Live Clinical Alerts & Monitoring Feed";
    decisionLatency = isArabic ? "فوري" : "Live";
    decisionLogs = isArabic
      ? [
          "5 حالات تحتاج متابعة سريرية عاجلة (قسم الطوارئ)",
          "12 موعد استشارة اقترب موعده اليوم",
          "3 نتائج مخبرية جديدة جاهزة للمعاينة الفورية",
        ]
      : [
          "5 Urgent critical cases requiring follow-up (ER)",
          "12 Approaching consultations today",
          "3 New lab test results ready for clinical review",
        ];
    screenshotLabels = isArabic
      ? ["سجلات المرضى", "توزيع الحالات", "المؤشرات الحيوية"]
      : ["Patient Records", "Case Distribution", "Clinical Vitals"];
    guardrailTitle = isArabic ? "مؤشرات جودة الرعاية والأمان الطبي" : "Clinical Quality & Safety Index";
  }

  const panelClass = lightMode
    ? "border-[#d8cbb8]/80 bg-[#fffdf8]/90 shadow-[0_28px_80px_-24px_rgba(61,43,22,0.42)] backdrop-blur-xl"
    : "border-white/12 bg-[#060a1c]/90 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl";
  const smallPanelClass = lightMode
    ? "border-[#d8cbb8]/80 bg-[#faf6ed]/92 shadow-[0_20px_50px_-22px_rgba(61,43,22,0.45)] backdrop-blur-xl"
    : "border-white/[0.14] bg-[#070d24]/95 shadow-2xl backdrop-blur-xl";
  const modulePanelClass = lightMode
    ? "border-[#d8cbb8]/70 bg-[#faf6ed]/85 shadow-sm"
    : "border-white/10 bg-white/[0.035] shadow-inner";
  const mutedTextClass = lightMode ? "text-[#25304a]/68" : "text-white/45";
  const softTextClass = lightMode ? "text-[#25304a]/75" : "text-white/65";
  const strongTextClass = lightMode ? "text-[#10172d]" : "text-white";

  return (
    <motion.div
      key={showcaseKey}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 22%, ${color}24, transparent 34%), radial-gradient(circle at 70% 76%, ${color}14, transparent 36%)`,
        }}
      />

      <motion.div
        className={`absolute left-[2%] top-[3%] h-[60%] w-[78%] rounded-[30px] sm:rounded-[36px] border p-3.5 sm:p-4.5 backdrop-blur-xl sm:left-[4%] sm:h-[64%] ${panelClass}`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-full gap-3">
          <div className={`hidden w-8 shrink-0 flex-col items-center gap-2 rounded-2xl py-2.5 sm:flex ${lightMode ? "bg-[#f1e6d7]/70 border border-[#d8cbb8]/40" : "bg-white/[0.04] border border-white/5"}`}>
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                key={`${showcaseKey}-rail-${item}`}
                className="h-2.5 w-2.5 rounded-full transition-all duration-300"
                style={{ background: item === 1 ? color : lightMode ? "rgba(20,33,67,0.18)" : "rgba(255,255,255,0.16)" }}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span
                className="rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-sm"
                style={{
                  background: lightMode ? `${color}18` : `${color}22`,
                  border: `1px solid ${color}66`,
                  color,
                }}
              >
                {label}
              </span>
              <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.22em] sm:inline ${mutedTextClass}`}>
                {showcaseLabel}
              </span>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[1.35fr_0.85fr]">
              {showcaseKey === "education" ? (
                /* ─── Education Dedicated Data Table & Graphs ─── */
                <div className={`flex min-h-0 flex-col rounded-[24px] border p-3 ${modulePanelClass}`}>
                  <div className={`mb-2.5 flex items-center justify-between text-[10px] font-bold uppercase ${lightMode ? "text-[#25304a]/80" : "text-white/70"}`}>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: color }} />
                      {isArabic ? "جدول بيانات وتقييم الطلاب" : "Live Student Assessment Table"}
                    </span>
                    <span className="text-[8.5px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: `${color}20`, color }}>
                      {isArabic ? "مباشر" : "Live Sync"}
                    </span>
                  </div>

                  {/* Student Table */}
                  <div className="flex-1 overflow-hidden rounded-2xl border border-[#d8cbb8]/40 dark:border-white/10">
                    <table className="w-full text-left text-[10px] border-collapse" dir={isArabic ? "rtl" : "ltr"}>
                      <thead>
                        <tr className={`${lightMode ? "bg-[#efe5d5]/80 text-[#25304a]/90" : "bg-white/[0.07] text-white/80"} border-b border-[#d8cbb8]/40 dark:border-white/10 font-bold text-[9px]`}>
                          <th className="py-1.5 px-2.5">{isArabic ? "الطالب" : "Student"}</th>
                          <th className="py-1.5 px-2">{isArabic ? "المادة" : "Subject"}</th>
                          <th className="py-1.5 px-2 text-center">{isArabic ? "الدرجة" : "Score"}</th>
                          <th className="py-1.5 px-2.5">{isArabic ? "التقييم الذكي" : "AI Status"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d8cbb8]/30 dark:divide-white/5">
                        {[
                          {
                            name: isArabic ? "أحمد المنصوري" : "Ahmed Al-Mansoor",
                            subject: isArabic ? "رياضيات متقدمة" : "Adv. Math",
                            score: "96%",
                            status: isArabic ? "إتقان تام" : "Mastery",
                            badge: "⭐",
                            scoreColor: "#10B981",
                          },
                          {
                            name: isArabic ? "سارة خالد" : "Sarah Khalid",
                            subject: isArabic ? "فيزياء حديثة" : "Physics",
                            score: "88%",
                            status: isArabic ? "تقدم ملحوظ" : "+14% Growth",
                            badge: "📈",
                            scoreColor: color,
                          },
                          {
                            name: isArabic ? "عمر الحربي" : "Omar Al-Harbi",
                            subject: isArabic ? "لغة إنجليزية" : "English",
                            score: "92%",
                            status: isArabic ? "اجتاز الاختبار" : "Passed Test",
                            badge: "🎯",
                            scoreColor: "#10B981",
                          },
                          {
                            name: isArabic ? "مريم الدوسري" : "Mariam Al-Dawsari",
                            subject: isArabic ? "كيمياء عامة" : "Chemistry",
                            score: "95%",
                            status: isArabic ? "مستوى متقدم" : "Advanced Track",
                            badge: "🚀",
                            scoreColor: "#10B981",
                          },
                        ].map((student, idx) => (
                          <motion.tr
                            key={student.name}
                            initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                            className={`${lightMode ? "hover:bg-white/80" : "hover:bg-white/[0.04]"} transition-colors`}
                          >
                            <td className="py-1.5 px-2.5 font-bold whitespace-nowrap">
                              <span className={strongTextClass}>{student.name}</span>
                            </td>
                            <td className="py-1.5 px-2 whitespace-nowrap">
                              <span className={softTextClass}>{student.subject}</span>
                            </td>
                            <td className="py-1.5 px-2 text-center font-mono font-black whitespace-nowrap" style={{ color: student.scoreColor }}>
                              {student.score}
                            </td>
                            <td className="py-1.5 px-2.5 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] font-bold ${lightMode ? "bg-[#f3eadc] text-[#25304a]" : "bg-white/[0.08] text-white/85"}`}>
                                <span>{student.badge}</span>
                                <span>{student.status}</span>
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {metricItems.map((metric, index) => (
                      <div key={`${showcaseKey}-metric-${index}`} className={`rounded-xl px-2.5 py-1.5 border border-[#d8cbb8]/40 dark:border-white/10 ${lightMode ? "bg-white/80 shadow-sm" : "bg-white/[0.04]"}`}>
                        <p className={`truncate text-[8.5px] font-bold uppercase tracking-wider ${lightMode ? "text-[#25304a]/70" : "text-white/50"}`}>{metric.label}</p>
                        <motion.p
                          className={`mt-0.5 text-sm font-black ${strongTextClass}`}
                          animate={{ opacity: [0.75, 1, 0.75] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.35 }}
                        >
                          {metric.val}
                        </motion.p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : showcaseKey === "realEstate" ? (
                /* ─── Real Estate Dedicated Asset Matrix & Deal Pipeline ─── */
                <div className={`flex min-h-0 flex-col rounded-[24px] border p-3 ${modulePanelClass}`}>
                  <div className={`mb-2.5 flex items-center justify-between text-[10px] font-bold uppercase ${lightMode ? "text-[#25304a]/80" : "text-white/70"}`}>
                    <span className="flex items-center gap-1.5 font-extrabold">
                      <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: color }} />
                      {isArabic ? "مصفوفة الأصول العقارية ونسب الإشغال" : "Asset Portfolio & Occupancy Matrix"}
                    </span>
                    <span className="text-[8.5px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: `${color}20`, color }}>
                      {isArabic ? "تحديث مباشر" : "Live Deal Sync"}
                    </span>
                  </div>

                  {/* Real Estate Property Matrix Table */}
                  <div className="flex-1 overflow-hidden rounded-2xl border border-[#d8cbb8]/40 dark:border-white/10">
                    <table className="w-full text-left text-[10px] border-collapse" dir={isArabic ? "rtl" : "ltr"}>
                      <thead>
                        <tr className={`${lightMode ? "bg-[#efe5d5]/80 text-[#25304a]/90" : "bg-white/[0.07] text-white/80"} border-b border-[#d8cbb8]/40 dark:border-white/10 font-bold text-[8.5px]`}>
                          <th className="py-1.5 px-2">{isArabic ? "الأصل العقاري" : "Asset / Sector"}</th>
                          <th className="py-1.5 px-1.5 text-center">{isArabic ? "المساحة" : "Area"}</th>
                          <th className="py-1.5 px-1.5 text-center">{isArabic ? "سعر المتر" : "Price/m²"}</th>
                          <th className="py-1.5 px-2 text-center">{isArabic ? "نسبة الإشغال" : "Occupancy"}</th>
                          <th className="py-1.5 px-2 text-center">{isArabic ? "العائد الصافي" : "Net Yield"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d8cbb8]/30 dark:divide-white/5">
                        {[
                          {
                            name: isArabic ? "برج الواجهة" : "Al-Wajiha Tower",
                            type: isArabic ? "تجاري" : "Commercial",
                            area: "4,200 م²",
                            areaEn: "4.2k m²",
                            sqmPrice: "18.5k",
                            occ: 98.5,
                            roi: "11.8%",
                            badge: "⭐",
                            status: isArabic ? "إشغال ممتاز" : "Prime",
                            roiColor: "#10B981",
                          },
                          {
                            name: isArabic ? "مجمع الفلل الذكية" : "Smart Villas",
                            type: isArabic ? "سكني" : "Residential",
                            area: "8,600 م²",
                            areaEn: "8.6k m²",
                            sqmPrice: "7.2k",
                            occ: 94.0,
                            roi: "9.2%",
                            badge: "📈",
                            status: isArabic ? "طلب متزايد" : "Growth",
                            roiColor: color,
                          },
                          {
                            name: isArabic ? "المركز اللوجستي" : "Logistics Hub",
                            type: isArabic ? "صناعي" : "Industrial",
                            area: "12,000 م²",
                            areaEn: "12k m²",
                            sqmPrice: "4.8k",
                            occ: 100,
                            roi: "12.6%",
                            badge: "🚀",
                            status: isArabic ? "إشغال كامل" : "Full",
                            roiColor: "#10B981",
                          },
                          {
                            name: isArabic ? "مكاتب الابتكار" : "Tech Offices",
                            type: isArabic ? "إداري" : "Offices",
                            area: "3,100 م²",
                            areaEn: "3.1k m²",
                            sqmPrice: "14.2k",
                            occ: 92.5,
                            roi: "10.4%",
                            badge: "💡",
                            status: isArabic ? "إشغال مستقر" : "Stable",
                            roiColor: "#38BDF8",
                          },
                        ].map((prop, idx) => (
                          <motion.tr
                            key={prop.name}
                            initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                            className={`${lightMode ? "hover:bg-white/80" : "hover:bg-white/[0.04]"} transition-colors`}
                          >
                            <td className="py-1.5 px-2 whitespace-nowrap">
                              <div className="font-bold">
                                <span className={strongTextClass}>{prop.name}</span>
                              </div>
                              <span className={`text-[8px] font-medium ${mutedTextClass}`}>{prop.type}</span>
                            </td>
                            <td className="py-1.5 px-1.5 text-center font-mono text-[9px] font-semibold whitespace-nowrap">
                              <span className={softTextClass}>{isArabic ? prop.area : prop.areaEn}</span>
                            </td>
                            <td className="py-1.5 px-1.5 text-center font-mono text-[9px] font-bold whitespace-nowrap">
                              <span className={strongTextClass}>{prop.sqmPrice} {isArabic ? "ر.س" : "SAR"}</span>
                            </td>
                            <td className="py-1.5 px-2 text-center whitespace-nowrap">
                              <div className="inline-flex flex-col items-center">
                                <span className="font-mono text-[9px] font-bold text-[#10B981]">{prop.occ}%</span>
                                <div className={`w-10 h-1 rounded-full overflow-hidden ${lightMode ? "bg-[#d8cbb8]/40" : "bg-white/10"} mt-0.5`}>
                                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${prop.occ}%` }} />
                                </div>
                              </div>
                            </td>
                            <td className="py-1.5 px-2 text-center whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] font-black ${lightMode ? "bg-[#f3eadc] text-[#25304a]" : "bg-white/[0.08] text-white/85"}`}>
                                <span>{prop.badge}</span>
                                <span className="font-mono" style={{ color: prop.roiColor }}>{prop.roi}</span>
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Real Estate KPI Strip */}
                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {metricItems.map((metric, index) => (
                      <div key={`${showcaseKey}-metric-${index}`} className={`rounded-xl px-2.5 py-1.5 border border-[#d8cbb8]/40 dark:border-white/10 ${lightMode ? "bg-white/80 shadow-sm" : "bg-white/[0.04]"}`}>
                        <p className={`truncate text-[8.5px] font-bold uppercase tracking-wider ${lightMode ? "text-[#25304a]/70" : "text-white/50"}`}>{metric.label}</p>
                        <motion.p
                          className={`mt-0.5 text-sm font-black ${strongTextClass}`}
                          animate={{ opacity: [0.75, 1, 0.75] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.35 }}
                        >
                          {metric.val}
                        </motion.p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : showcaseKey === "healthcare" ? (
                /* ─── Healthcare Dedicated Patient Roster & Triage Table ─── */
                <div className={`flex min-h-0 flex-col rounded-[24px] border p-3 ${modulePanelClass}`}>
                  <div className={`mb-2.5 flex items-center justify-between text-[10px] font-bold uppercase ${lightMode ? "text-[#25304a]/80" : "text-white/70"}`}>
                    <span className="flex items-center gap-1.5 font-extrabold">
                      <span className="h-2 w-2 rounded-full animate-pulse bg-[#00D2FF]" />
                      {isArabic ? "قائمة المرضى والمتابعة السريرية" : "Live Patients Roster & Triage"}
                    </span>
                    <span className="text-[8.5px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#00D2FF]/15 text-[#00D2FF]">
                      {isArabic ? "مباشر" : "Live Sync"}
                    </span>
                  </div>

                  {/* Patient Table */}
                  <div className="flex-1 overflow-hidden rounded-2xl border border-[#d8cbb8]/40 dark:border-white/10">
                    <table className="w-full text-left text-[10px] border-collapse" dir={isArabic ? "rtl" : "ltr"}>
                      <thead>
                        <tr className={`${lightMode ? "bg-[#efe5d5]/80 text-[#25304a]/90" : "bg-white/[0.07] text-white/80"} border-b border-[#d8cbb8]/40 dark:border-white/10 font-bold text-[8.5px]`}>
                          <th className="py-1.5 px-2">{isArabic ? "المريض" : "Patient"}</th>
                          <th className="py-1.5 px-1.5 text-center">{isArabic ? "العمر" : "Age"}</th>
                          <th className="py-1.5 px-1.5 text-center">{isArabic ? "الجنس" : "Gender"}</th>
                          <th className="py-1.5 px-2 text-center">{isArabic ? "الحالة" : "Risk"}</th>
                          <th className="py-1.5 px-2 text-center">{isArabic ? "آخر زيارة" : "Last Visit"}</th>
                          <th className="py-1.5 px-1.5 text-center">{isArabic ? "الإجراء" : "Action"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d8cbb8]/30 dark:divide-white/5">
                        {[
                          {
                            name: isArabic ? "فاطمة علي" : "Fatima Ali",
                            gender: isArabic ? "أنثى" : "Female",
                            avatar: "👩‍💼",
                            age: "67",
                            status: isArabic ? "عالية" : "High",
                            statusColor: "#EF4444",
                            statusBg: "#EF444418",
                            date: "2025-08-21",
                          },
                          {
                            name: isArabic ? "محمد حسن" : "Mohamed Hassan",
                            gender: isArabic ? "ذكر" : "Male",
                            avatar: "👨‍💼",
                            age: "45",
                            status: isArabic ? "متوسطة" : "Medium",
                            statusColor: "#F59E0B",
                            statusBg: "#F59E0B18",
                            date: "2025-08-20",
                          },
                          {
                            name: isArabic ? "سارة أحمد" : "Sarah Ahmed",
                            gender: isArabic ? "أنثى" : "Female",
                            avatar: "👩",
                            age: "29",
                            status: isArabic ? "منخفضة" : "Low",
                            statusColor: "#10B981",
                            statusBg: "#10B98118",
                            date: "2025-08-19",
                          },
                          {
                            name: isArabic ? "عبدالله يوسف" : "Abdullah Yousef",
                            gender: isArabic ? "ذكر" : "Male",
                            avatar: "👨",
                            age: "72",
                            status: isArabic ? "عالية" : "High",
                            statusColor: "#EF4444",
                            statusBg: "#EF444418",
                            date: "2025-08-18",
                          },
                          {
                            name: isArabic ? "نورة خالد" : "Noura Khalid",
                            gender: isArabic ? "أنثى" : "Female",
                            avatar: "👩‍🦰",
                            age: "53",
                            status: isArabic ? "متوسطة" : "Medium",
                            statusColor: "#F59E0B",
                            statusBg: "#F59E0B18",
                            date: "2025-08-17",
                          },
                        ].map((patient, idx) => (
                          <motion.tr
                            key={patient.name}
                            initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                            className={`${lightMode ? "hover:bg-white/80" : "hover:bg-white/[0.04]"} transition-colors`}
                          >
                            <td className="py-1 px-2 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px]">{patient.avatar}</span>
                                <span className={`font-bold text-[9.5px] ${strongTextClass}`}>{patient.name}</span>
                              </div>
                            </td>
                            <td className="py-1 px-1.5 text-center font-mono text-[9px] font-semibold whitespace-nowrap">
                              <span className={softTextClass}>{patient.age}</span>
                            </td>
                            <td className="py-1 px-1.5 text-center text-[8.5px] whitespace-nowrap">
                              <span className={mutedTextClass}>{patient.gender}</span>
                            </td>
                            <td className="py-1 px-2 text-center whitespace-nowrap">
                              <span
                                className="inline-block px-2 py-0.5 rounded-full text-[8px] font-bold"
                                style={{ background: patient.statusBg, color: patient.statusColor }}
                              >
                                {patient.status}
                              </span>
                            </td>
                            <td className="py-1 px-2 text-center font-mono text-[8px] whitespace-nowrap">
                              <span className={softTextClass}>{patient.date}</span>
                            </td>
                            <td className="py-1 px-1.5 text-center whitespace-nowrap">
                              <button
                                type="button"
                                className={`px-2 py-0.5 rounded text-[8px] font-semibold transition-colors ${
                                  lightMode ? "bg-[#efe5d5] hover:bg-[#e4d7c3] text-[#25304a]" : "bg-white/10 hover:bg-white/20 text-white"
                                }`}
                              >
                                {isArabic ? "عرض" : "View"}
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Healthcare Top Stats Strip */}
                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {[
                      { label: isArabic ? "إجمالي المرضى" : "Total Patients", val: "3,842", change: "+12.5%" },
                      { label: isArabic ? "المنومين" : "Inpatients", val: "128", change: "+8.3%" },
                      { label: isArabic ? "المواعيد" : "Appointments", val: "56", change: "-3.2%" },
                    ].map((metric, index) => (
                      <div key={`health-kpi-${index}`} className={`rounded-xl px-2.5 py-1.5 border border-[#d8cbb8]/40 dark:border-white/10 ${lightMode ? "bg-white/80 shadow-sm" : "bg-white/[0.04]"}`}>
                        <div className="flex items-center justify-between">
                          <p className={`truncate text-[8px] font-bold uppercase tracking-wider ${lightMode ? "text-[#25304a]/70" : "text-white/50"}`}>{metric.label}</p>
                          <span className={`text-[7.5px] font-mono font-bold ${metric.change.startsWith("+") ? "text-[#10B981]" : "text-[#EF4444]"}`}>{metric.change}</span>
                        </div>
                        <motion.p
                          className={`mt-0.5 text-sm font-black ${strongTextClass}`}
                          animate={{ opacity: [0.75, 1, 0.75] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.35 }}
                        >
                          {metric.val}
                        </motion.p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* ─── Default Generic Surface ─── */
                <div className={`flex min-h-0 flex-col rounded-[24px] border p-3 ${modulePanelClass}`}>
                  <div className={`mb-3 flex items-center justify-between text-[10px] font-semibold uppercase ${lightMode ? "text-[#25304a]/62" : "text-white/50"}`}>
                    <span className="truncate">{liveHeader}</span>
                    <motion.span
                      style={{ color }}
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >
                      {liveStatus}
                    </motion.span>
                  </div>
                  <div className={`relative flex min-h-0 flex-1 items-end gap-1.5 overflow-hidden rounded-2xl px-2 pb-2 ${lightMode ? "bg-[#f1e6d7]/45" : "bg-white/[0.03]"}`}>
                    {waveform.map((height, index) => (
                      <motion.span
                        key={`${showcaseKey}-wave-${index}`}
                        className="flex-1 rounded-full"
                        style={{
                          background: `linear-gradient(180deg, ${color}, rgba(255,255,255,0.08))`,
                        }}
                        animate={{ height: [`${Math.max(22, height - 22)}%`, `${height}%`, `${Math.max(18, height - 14)}%`] }}
                        transition={{
                          duration: 2.2 + index * 0.08,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.04,
                        }}
                      />
                    ))}
                    <motion.div
                      className="absolute inset-y-2 w-12 rounded-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${color}20, transparent)` }}
                      animate={{ left: ["-18%", "108%"] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {metricItems.map((metric, index) => (
                      <div key={`${showcaseKey}-metric-${index}`} className={`rounded-xl px-2 py-2 ${lightMode ? "bg-white/75 shadow-sm" : "bg-white/[0.04]"}`}>
                        <p className={`truncate text-[9px] uppercase ${lightMode ? "text-[#25304a]/55" : "text-white/40"}`}>{metric.label}</p>
                        <motion.p
                          className={`mt-1 text-sm font-bold ${strongTextClass}`}
                          animate={{ opacity: [0.66, 1, 0.66] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.35 }}
                        >
                          {metric.val}
                        </motion.p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── Right Column: Interactive Graphs / Charts ─── */}
              <div className="hidden min-h-0 flex-col gap-2.5 sm:flex">
                {showcaseKey === "education" ? (
                  <>
                    {/* Subject Mastery Bar Chart */}
                    <div className={`relative flex-1 overflow-hidden rounded-[22px] border p-3 ${lightMode ? "border-[#d8cbb8]/70 bg-white/75 shadow-sm" : "border-white/10 bg-white/[0.045]"}`}>
                      <div className="mb-2 flex items-center justify-between">
                        <p className={`text-[9.5px] font-extrabold uppercase tracking-[0.14em] ${mutedTextClass}`}>
                          {isArabic ? "كراف استيعاب المواد" : "Subject Mastery Graph"}
                        </p>
                        <span className="text-[9px] font-mono font-black" style={{ color }}>96.4% avg</span>
                      </div>
                      <div className="space-y-1.5" dir={isArabic ? "rtl" : "ltr"}>
                        {[
                          { name: isArabic ? "الرياضيات" : "Math", pct: 96, color: "#10B981" },
                          { name: isArabic ? "الفيزياء" : "Physics", pct: 88, color },
                          { name: isArabic ? "الكيمياء" : "Chemistry", pct: 95, color: "#38BDF8" },
                          { name: isArabic ? "اللغات" : "Languages", pct: 92, color: "#F59E0B" },
                        ].map((item) => (
                          <div key={item.name} className="text-[9px]">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className={`font-semibold ${softTextClass}`}>{item.name}</span>
                              <span className="font-mono font-bold" style={{ color: item.color }}>{item.pct}%</span>
                            </div>
                            <div className={`h-1.5 w-full rounded-full overflow-hidden ${lightMode ? "bg-[#d8cbb8]/35" : "bg-white/10"}`}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: `linear-gradient(90deg, ${item.color}bb, ${item.color})` }}
                                initial={{ width: "0%" }}
                                animate={{ width: `${item.pct}%` }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weekly Learning Curve Sparkline */}
                    <div className={`flex flex-col justify-between rounded-[20px] border p-2.5 ${modulePanelClass}`}>
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className={mutedTextClass}>{isArabic ? "منحنى التطور الأكاديمي" : "Academic Growth Curve"}</span>
                        <span className="font-mono font-black text-[#10B981] px-1.5 py-0.5 rounded-full bg-[#10B981]/10">+24.4% ↑</span>
                      </div>
                      <svg className="w-full h-8 mt-1" viewBox="0 0 160 36" fill="none">
                        <defs>
                          <linearGradient id={`grad-edu-${showcaseKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 30 Q 30 26, 60 18 T 110 12 T 160 4 L 160 36 L 0 36 Z"
                          fill={`url(#grad-edu-${showcaseKey})`}
                        />
                        <path
                          d="M0 30 Q 30 26, 60 18 T 110 12 T 160 4"
                          stroke={color}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <circle cx="160" cy="4" r="3" fill={color} />
                      </svg>
                    </div>
                  </>
                ) : showcaseKey === "realEstate" ? (
                  <>
                    {/* Multi-Sector Portfolio Allocation & Yield Graph */}
                    <div className={`relative flex-1 overflow-hidden rounded-[22px] border p-3 ${lightMode ? "border-[#d8cbb8]/70 bg-white/75 shadow-sm" : "border-white/10 bg-white/[0.045]"}`}>
                      <div className="mb-2 flex items-center justify-between">
                        <p className={`text-[9.5px] font-extrabold uppercase tracking-[0.14em] ${mutedTextClass}`}>
                          {isArabic ? "توزيع المحفظة والعوائد الصافية" : "Sector Allocation & Net Yields"}
                        </p>
                        <span className="text-[9px] font-mono font-black" style={{ color }}>11.4% avg</span>
                      </div>

                      {/* Multi-Segment Allocation Bar */}
                      <div className="mb-2">
                        <div className="flex h-2 w-full overflow-hidden rounded-full gap-0.5 bg-black/10 dark:bg-white/10 p-0.5">
                          <div className="h-full rounded-l-full bg-[#10B981]" style={{ width: "42%" }} title="Commercial: 42%" />
                          <div className="h-full bg-[#8B56FF]" style={{ width: "28%" }} title="Residential: 28%" />
                          <div className="h-full bg-[#38BDF8]" style={{ width: "20%" }} title="Industrial: 20%" />
                          <div className="h-full rounded-r-full bg-[#F59E0B]" style={{ width: "10%" }} title="Offices: 10%" />
                        </div>
                      </div>

                      {/* Sector Rows */}
                      <div className="space-y-1.5" dir={isArabic ? "rtl" : "ltr"}>
                        {[
                          { name: isArabic ? "عقارات تجارية" : "Commercial", share: "42%", yield: "11.8%", color: "#10B981" },
                          { name: isArabic ? "مجمعات سكنية" : "Residential", share: "28%", yield: "9.2%", color: "#8B56FF" },
                          { name: isArabic ? "مرافق لوجستية" : "Industrial", share: "20%", yield: "12.6%", color: "#38BDF8" },
                          { name: isArabic ? "أبراج إدارية" : "Offices", share: "10%", yield: "10.4%", color: "#F59E0B" },
                        ].map((item) => (
                          <div key={item.name} className="flex items-center justify-between text-[8.5px] py-0.5 px-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
                              <span className={`font-semibold ${softTextClass}`}>{item.name}</span>
                              <span className={`font-mono text-[8px] ${mutedTextClass}`}>({item.share})</span>
                            </div>
                            <span className="font-mono font-black" style={{ color: item.color }}>
                              {item.yield} {isArabic ? "صافي" : "Net"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cumulative Net Rental Income Yield Curve */}
                    <div className={`flex flex-col justify-between rounded-[20px] border p-2.5 ${modulePanelClass}`}>
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className={mutedTextClass}>{isArabic ? "نمو التدفقات الإيجارية الصافية" : "Net Cashflow Growth"}</span>
                        <span className="font-mono font-black text-[#10B981] px-1.5 py-0.5 rounded-full bg-[#10B981]/10">+28.6% ↑</span>
                      </div>
                      <svg className="w-full h-8 mt-1" viewBox="0 0 160 36" fill="none">
                        <defs>
                          <linearGradient id={`grad-real-${showcaseKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B56FF" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#8B56FF" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 32 Q 35 28, 70 20 T 115 10 T 160 3 L 160 36 L 0 36 Z"
                          fill={`url(#grad-real-${showcaseKey})`}
                        />
                        <path
                          d="M0 32 Q 35 28, 70 20 T 115 10 T 160 3"
                          stroke="#8B56FF"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <circle cx="160" cy="3" r="3" fill="#8B56FF" />
                      </svg>
                    </div>
                  </>
                ) : showcaseKey === "healthcare" ? (
                  <>
                    {/* Case Distribution & 6-Month Trend */}
                    <div className={`relative flex-1 overflow-hidden rounded-[22px] border p-3 ${lightMode ? "border-[#d8cbb8]/70 bg-white/75 shadow-sm" : "border-white/10 bg-white/[0.045]"}`}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <p className={`text-[9.5px] font-extrabold uppercase tracking-[0.14em] ${mutedTextClass}`}>
                          {isArabic ? "توزيع الحالات والاتجاه الشهري" : "Case Distribution & 6M Trend"}
                        </p>
                        <span className="text-[9px] font-mono font-bold text-[#00D2FF]">3,842 {isArabic ? "حالة" : "total"}</span>
                      </div>

                      {/* 4 Status Pills */}
                      <div className="grid grid-cols-2 gap-1 mb-2" dir={isArabic ? "rtl" : "ltr"}>
                        {[
                          { name: isArabic ? "مستقرة" : "Stable", pct: "45%", color: "#10B981" },
                          { name: isArabic ? "مراقبة" : "Monitor", pct: "30%", color: "#F59E0B" },
                          { name: isArabic ? "حرجة" : "Critical", pct: "15%", color: "#EF4444" },
                          { name: isArabic ? "متعافية" : "Recovered", pct: "10%", color: "#38BDF8" },
                        ].map((item) => (
                          <div key={item.name} className="flex items-center justify-between px-1.5 py-0.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-[8px]">
                            <div className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
                              <span className={softTextClass}>{item.name}</span>
                            </div>
                            <span className="font-mono font-bold" style={{ color: item.color }}>{item.pct}</span>
                          </div>
                        ))}
                      </div>

                      {/* 6-Month Trend Chart */}
                      <div className="mt-1">
                        <div className="flex items-center justify-between text-[7.5px] mb-0.5">
                          <span className={mutedTextClass}>{isArabic ? "اتجاه الحالات (مارس - أغسطس)" : "6-Month Trend (Mar - Aug)"}</span>
                          <span className="font-mono font-bold text-[#10B981]">+12.5% ↑</span>
                        </div>
                        <svg className="w-full h-7" viewBox="0 0 160 30" fill="none">
                          <defs>
                            <linearGradient id={`grad-health-${showcaseKey}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 26 Q 30 22, 60 16 T 110 8 T 160 2 L 160 30 L 0 30 Z"
                            fill={`url(#grad-health-${showcaseKey})`}
                          />
                          <path
                            d="M0 26 Q 30 22, 60 16 T 110 8 T 160 2"
                            stroke="#00D2FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle cx="160" cy="2" r="2.5" fill="#00D2FF" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom 3 Clinical Metrics */}
                    <div className={`grid grid-cols-3 gap-1 rounded-[20px] border p-2 ${modulePanelClass}`}>
                      {[
                        { label: isArabic ? "إشغال الأسرة" : "Bed Occupancy", val: "78.4%", change: "+4.2%" },
                        { label: isArabic ? "مدة الإقامة" : "Avg Stay", val: "3.6 " + (isArabic ? "يوم" : "d"), change: "-0.8%" },
                        { label: isArabic ? "إعادة الدخول" : "Readmission", val: "12.7%", change: "+1.3%" },
                      ].map((item, idx) => (
                        <div key={`health-sub-${idx}`} className="text-center">
                          <p className={`text-[7.5px] truncate font-semibold ${mutedTextClass}`}>{item.label}</p>
                          <p className={`text-[10px] font-mono font-black mt-0.5 ${strongTextClass}`}>{item.val}</p>
                          <span className={`text-[7px] font-mono ${item.change.startsWith("+") && idx !== 2 ? "text-[#10B981]" : idx === 1 ? "text-[#10B981]" : "text-[#F59E0B]"}`}>{item.change}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`relative flex-1 overflow-hidden rounded-[22px] border p-3 ${lightMode ? "border-[#d8c7aa]/60 bg-white/58" : "border-white/10 bg-white/[0.045]"}`}>
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${mutedTextClass}`}>
                        {workflowHeader}
                      </p>
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 160" aria-hidden="true">
                        <motion.path
                          d="M32 48 C78 22 112 36 154 54 S184 92 150 116 S78 122 58 94"
                          fill="none"
                          stroke={color}
                          strokeWidth="1.4"
                          strokeDasharray="5 6"
                          animate={{ strokeDashoffset: [0, -44] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          opacity="0.68"
                        />
                      </svg>
                      {workflowNodes.map((node, index) => (
                        <motion.div
                          key={`${showcaseKey}-node-${node.label}`}
                          className={`absolute grid h-9 px-2 place-items-center rounded-xl border text-[8px] font-semibold text-center leading-tight shadow-sm ${
                            lightMode
                              ? "border-[#d8c7aa]/70 bg-[#fbf8f1]/95 text-[#25304a]/78"
                              : "border-white/10 bg-[#07101D]/95 text-white/65"
                          }`}
                          style={{ left: node.left, top: node.top }}
                          animate={{ scale: [1, 1.08, 1], boxShadow: [`0 0 0 ${color}00`, `0 0 18px ${color}44`, `0 0 0 ${color}00`] }}
                          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}
                        >
                          {node.label}
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid h-20 grid-cols-3 gap-2">
                      {[82, 64, 91].map((height, index) => (
                        <div key={`${showcaseKey}-module-${index}`} className={`flex items-end rounded-xl border p-1.5 ${modulePanelClass}`}>
                          <motion.span
                            className="block w-full rounded-lg"
                            style={{ background: `${color}${index % 2 === 0 ? "88" : "55"}` }}
                            animate={{ height: [`${Math.max(32, height - 24)}%`, `${height}%`, `${Math.max(28, height - 10)}%`] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.25 }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`absolute left-[2%] top-[64%] hidden w-[48%] rounded-[26px] border p-3.5 sm:block ${smallPanelClass}`}
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider ${mutedTextClass}`}>
          <span>{decisionTitle}</span>
          <span className="font-mono font-bold" style={{ color }}>{decisionLatency}</span>
        </div>
        {decisionLogs.map((item, index) => (
          <motion.div
            key={`${showcaseKey}-log-${item}`}
            className={`mb-1.5 flex items-center gap-2 text-[10px] last:mb-0 ${softTextClass}`}
            animate={{ opacity: [0.45, 1, 0.62] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.42 }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            <span className="truncate">{item}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute right-[2%] top-[10%] hidden h-[60%] w-[27%] sm:block">
        {screenshotLabels.map((item, index) => (
          <motion.div
            key={`${showcaseKey}-shot-${item}`}
            className={`absolute left-0 right-0 rounded-[22px] border p-3.5 backdrop-blur-md ${
              lightMode
                ? "border-[#d8cbb8]/80 bg-white/88 shadow-[0_18px_44px_-24px_rgba(61,43,22,0.48)]"
                : "border-white/[0.12] bg-[#080B18]/92 shadow-2xl"
            }`}
            style={{ top: `${index * 27}%` }}
            animate={{ y: [0, index % 2 === 0 ? -7 : 7, 0], rotate: [0, index % 2 === 0 ? -1 : 1, 0] }}
            transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mb-2.5 flex items-center justify-between">
              <p className={`text-[10px] font-bold uppercase tracking-[0.14em] ${lightMode ? "text-[#25304a]/72" : "text-white/60"}`}>
                {item}
              </p>
              <span className="h-2 w-2 rounded-full shadow-sm" style={{ background: color }} />
            </div>
            <div className="space-y-2">
              {[68, 48, 82].map((width, barIndex) => (
                <div key={`${showcaseKey}-shot-${item}-${barIndex}`} className={`h-1.5 overflow-hidden rounded-full ${lightMode ? "bg-[#d8cbb8]/40" : "bg-white/10"}`}>
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: barIndex === 1 ? lightMode ? "rgba(20,33,67,0.42)" : "rgba(255,255,255,0.62)" : color }}
                    animate={{ width: [`${Math.max(20, width - 24)}%`, `${width}%`, `${Math.max(18, width - 9)}%`] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: barIndex * 0.22 + index * 0.18 }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={`absolute bottom-[2%] right-[9%] hidden w-[37%] rounded-[26px] border p-3.5 sm:block ${
          lightMode
            ? "border-[#d8cbb8]/80 bg-white/88 shadow-[0_18px_44px_-24px_rgba(61,43,22,0.48)]"
            : "border-white/[0.12] bg-[#07101D]/95 shadow-2xl"
        }`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] ${lightMode ? "text-[#25304a]/72" : "text-white/60"}`}>
          <span className="truncate">{guardrailTitle}</span>
          <motion.span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: color }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
        {[78, 55, 88].map((width, index) => (
          <div key={`${showcaseKey}-guardrail-${index}`} className="mb-2 last:mb-0">
            <div className={`h-1.5 rounded-full overflow-hidden ${lightMode ? "bg-[#d8cbb8]/40" : "bg-white/10"}`}>
              <motion.span
                className="block h-full rounded-full"
                style={{ background: color }}
                animate={{ width: [`${Math.max(20, width - 18)}%`, `${width}%`, `${Math.max(18, width - 5)}%`] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.25 }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

const showcaseVisuals: Record<ShowcaseKey, { color: string }> = {
  education: {
    color: "#E44CFF",
  },
  realEstate: {
    color: "#8B56FF",
  },
  healthcare: {
    color: "#2EDAA2",
  },
  logistics: {
    color: "#5861F2",
  },
  finance: {
    color: "#4EF0FF",
  },
};

export default function Home() {
  const { locale, setLocale, t } = useI18n();
  const [mode, setMode] = useState<PersonaMode>("balanced");
  const [wordIndex, setWordIndex] = useState(0);
  const [activeShowcaseKey, setActiveShowcaseKey] = useState<ShowcaseKey>("healthcare");
  const [contactIndustry, setContactIndustry] = useState<ContactIndustryKey>("education");
  const [contactGoal, setContactGoal] = useState<ContactGoalKey>("llmAutomation");
  const [contactScale, setContactScale] = useState<ContactScaleKey>("initialPilot");
  const [contactName, setContactName] = useState("");
  const [contactEmailAddress, setContactEmailAddress] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitStatus, setContactSubmitStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lightHero = true;

  const rawWords = t("hero.words");
  const words = Array.isArray(rawWords) ? rawWords : ["Business", "Future", "Growth", "Workflows", "Success"];

  const customerShowcases = showcaseKeys.map((key) => {
    const stats = t(`customers.showcases.${key}.stats`);
    const rawFeatures = t(`customers.showcases.${key}.features`);

    return {
      key,
      label: t(`customers.industries.${key}`),
      title: t(`customers.showcases.${key}.title`),
      body: t(`customers.showcases.${key}.body`),
      tag: t(`customers.showcases.${key}.tag`),
      meta: t(`customers.showcases.${key}.meta`),
      features: Array.isArray(rawFeatures) ? rawFeatures : [],
      stats: Array.isArray(stats) ? stats : [],
      ...showcaseVisuals[key],
    };
  });
  const activeShowcase =
    customerShowcases.find((showcase) => showcase.key === activeShowcaseKey) ?? customerShowcases[0];
  const contactIndustries = contactIndustryKeys.map((key) => ({
    key,
    label: t(`contact.configurator.industries.${key}`),
  }));
  const contactGoals = contactGoalKeys.map((key) => ({
    key,
    label: t(`contact.configurator.goals.${key}`),
  }));
  const contactScales = contactScaleKeys.map((key) => ({
    key,
    label: t(`contact.configurator.scales.${key}`),
  }));
  const selectedIndustryLabel =
    contactIndustries.find((option) => option.key === contactIndustry)?.label ?? contactIndustries[0]?.label;
  const selectedGoalLabel =
    contactGoals.find((option) => option.key === contactGoal)?.label ?? contactGoals[0]?.label;
  const selectedScaleLabel =
    contactScales.find((option) => option.key === contactScale)?.label ?? contactScales[0]?.label;
  const projectDiscussionEmail = "marwajawad19@gmail.com";

  const getContactEmailHref = (body: string) =>
    `mailto:${projectDiscussionEmail}?subject=${encodeURIComponent("Initiate Project Discussion")}&body=${encodeURIComponent(body)}`;

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSubmitStatus("sending");

    const recommendedStart = `${selectedScaleLabel || "Selected scale"} - ${t("contact.configurator.nextStepText")}`;
    const emailBody = [
      "New project discussion request from TRI MINDS website.",
      "",
      `Name: ${contactName.trim() || "Not provided"}`,
      `Email: ${contactEmailAddress.trim() || "Not provided"}`,
      `Industry Focus: ${selectedIndustryLabel || "Not selected"}`,
      `Primary Goal: ${selectedGoalLabel || "Not selected"}`,
      `Scale: ${selectedScaleLabel || "Not selected"}`,
      "",
      "Message:",
      contactMessage.trim() || "Not provided",
      "",
      `Recommended Start: ${recommendedStart}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmailAddress,
          industry: selectedIndustryLabel,
          goal: selectedGoalLabel,
          scale: selectedScaleLabel,
          message: contactMessage,
          recommendedStart,
        }),
      });

      if (response.ok) {
        setContactSubmitStatus("sent");
        setContactName("");
        setContactEmailAddress("");
        setContactMessage("");
        return;
      }
    } catch {
      // Fall back to the visitor's mail app below when direct delivery is unavailable.
    }

    setContactSubmitStatus("fallback");
    window.location.href = getContactEmailHref(emailBody);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const communityMembers = [
    {
      name: "Syed Muhammad Haris",
      role: "CEO",
      orbit: 450,
      initialAngle: 0,
      duration: 60,
      badgeWidth: "14rem",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Malik Murtaza",
      role: "CTO",
      orbit: 450,
      initialAngle: 90,
      duration: 60,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Haseeb Arshad",
      role: "Sales Manager",
      orbit: 450,
      initialAngle: 180,
      duration: 60,
      badgeWidth: "14.5rem",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Saffuan Mushtaq",
      role: "Developer",
      orbit: 450,
      initialAngle: 270,
      duration: 60,
      badgeWidth: "13.5rem",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Sarah Chen",
      role: "Designer",
      orbit: 340,
      initialAngle: 45,
      duration: 50,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "James Wilson",
      role: "Product Lead",
      orbit: 340,
      initialAngle: 135,
      duration: 50,
      badgeWidth: "14rem",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Emily Parker",
      role: "Marketing",
      orbit: 340,
      initialAngle: 225,
      duration: 50,
      badgeWidth: "13.5rem",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Alex Kumar",
      role: "Engineer",
      orbit: 340,
      initialAngle: 315,
      duration: 50,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
  ];

  const floatingAvatars = [
    {
      orbit: 220,
      initialAngle: 0,
      duration: 40,
      size: "50px",
      image:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 72,
      duration: 40,
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 144,
      duration: 40,
      size: "48px",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 216,
      duration: 40,
      size: "50px",
      image:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 288,
      duration: 40,
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 530,
      initialAngle: 30,
      duration: 70,
      size: "46px",
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 530,
      initialAngle: 150,
      duration: 70,
      size: "48px",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 530,
      initialAngle: 270,
      duration: 70,
      size: "46px",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
  ];

  const orbitDots = [
    { left: "35%", top: "32%" },
    { left: "62%", top: "28%" },
    { left: "26%", top: "57%" },
    { left: "50%", top: "68%" },
    { left: "72%", top: "70%" },
    { left: "20%", top: "78%" },
    { left: "58%", top: "46%" },
  ];

  // Get active theme colors for global elements
  const getGlobalThemeStyles = (activeMode: PersonaMode, isLightHero: boolean) => {
    if (isLightHero) {
      return {
        "--theme-primary": "#142143",
        "--theme-secondary": "#b27a4f",
        "--theme-glow": "rgba(20, 33, 67, 0.28)",
        "--theme-gradient": "linear-gradient(to right, #101b39, #213c67)",
        "--theme-glow-border": "rgba(28, 39, 76, 0.24)",
        "--theme-nav-border": "rgba(112, 93, 67, 0.2)",
        background: "#060816",
      } as React.CSSProperties;
    }

    switch (activeMode) {
      case "creative":
        return {
          "--theme-primary": "#E44CFF",
          "--theme-secondary": "#7B4CFF",
          "--theme-glow": "rgba(228, 76, 255, 0.5)",
          "--theme-gradient": "linear-gradient(to right, #E44CFF, #7B4CFF)",
          "--theme-glow-border": "rgba(228, 76, 255, 0.3)",
          "--theme-nav-border": "rgba(228, 76, 255, 0.2)",
          background: "#060816",
        } as React.CSSProperties;
      case "precise":
        return {
          "--theme-primary": "#4EF0FF",
          "--theme-secondary": "#10B981",
          "--theme-glow": "rgba(78, 240, 255, 0.5)",
          "--theme-gradient": "linear-gradient(to right, #4EF0FF, #10B981)",
          "--theme-glow-border": "rgba(78, 240, 255, 0.3)",
          "--theme-nav-border": "rgba(78, 240, 255, 0.2)",
          background: "#060816",
        } as React.CSSProperties;
      case "balanced":
      default:
        return {
          "--theme-primary": "#E44CFF",
          "--theme-secondary": "#5861F2",
          "--theme-glow": "rgba(228, 76, 255, 0.5)",
          "--theme-gradient": "linear-gradient(to right, #E44CFF, #5861F2)",
          "--theme-glow-border": "rgba(228, 76, 255, 0.3)",
          "--theme-nav-border": "rgba(228, 76, 255, 0.12)",
          background: "#060816",
        } as React.CSSProperties;
    }
  };

  const footerEmail = t("footer.email");
  const footerQuickLinks = [
    { label: t("footer.links.home"), href: "#home" },
    { label: t("footer.links.caseStudies"), href: "#customers" },
    { label: t("footer.links.gallery"), href: "#community" },
    { label: t("footer.links.blogs"), href: "#services" },
    { label: t("footer.links.about"), href: "#about" },
  ];
  const footerInfoLinks = [
    { label: t("footer.links.terms"), href: "#" },
    { label: t("footer.links.privacy"), href: "#" },
    { label: t("footer.links.cookies"), href: "#" },
  ];
  const footerSocialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591438306752", Icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/trimindesai/", Icon: Instagram },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/triminds-ai/", Icon: Linkedin },
  ];
  const lightHeroInk = lightHero ? "#10172d" : undefined;
  const lightHeroMutedInk = lightHero ? "rgba(37, 48, 74, 0.78)" : undefined;
  const lightHeroSoftInk = lightHero ? "rgba(37, 48, 74, 0.72)" : undefined;
  const lightHeroWarmInk = lightHero ? "#5c4329" : undefined;
  const activeShowcaseThemeColor = lightHero ? "#9A6847" : activeShowcase.color;
  const getContactOptionStyle = (isActive: boolean): CSSProperties => lightHero
    ? {
        background: isActive ? "rgba(255, 255, 255, 0.78)" : "rgba(250, 246, 237, 0.62)",
        borderColor: isActive ? "rgba(154, 104, 71, 0.72)" : "rgba(198, 173, 137, 0.58)",
        boxShadow: isActive ? "0 14px 30px -22px rgba(61,43,22,0.72)" : "none",
        color: isActive ? "#10172d" : "rgba(37,48,74,0.78)",
      }
    : {
        background: isActive ? "rgba(228, 76, 255, 0.24)" : "rgba(255, 255, 255, 0.03)",
        borderColor: isActive ? "rgba(228, 76, 255, 0.7)" : "rgba(255, 255, 255, 0.1)",
        boxShadow: isActive ? "0 0 18px rgba(228, 76, 255, 0.28)" : "none",
        color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)",
      };
  const lightInputClassName = "h-[58px] w-full rounded-[14px] border border-[#c6ad89]/60 bg-[#fbf8f1]/85 px-5 py-4 text-lg leading-none text-[#10172d] outline-none transition-all duration-300 placeholder:text-[#25304a]/45 focus:border-[#9A6847]/75 focus:bg-white/70 focus:ring-2 focus:ring-[#9A6847]/20";
  const lightTextareaClassName = "min-h-[142px] w-full resize-y rounded-[14px] border border-[#c6ad89]/60 bg-[#fbf8f1]/85 px-5 py-4 text-lg leading-relaxed text-[#10172d] outline-none transition-all duration-300 placeholder:text-[#25304a]/45 focus:border-[#9A6847]/75 focus:bg-white/70 focus:ring-2 focus:ring-[#9A6847]/20";
  const lightInputStyle: CSSProperties | undefined = lightHero
    ? {
        backgroundColor: "rgba(251, 248, 241, 0.85)",
        color: "#10172d",
        WebkitTextFillColor: "#10172d",
        caretColor: "#10172d",
      }
    : undefined;
  const primaryCtaStyle = lightHero
    ? {
        background: "linear-gradient(135deg, #101b39, #213c67)",
        boxShadow: "0 18px 38px -24px rgba(61,43,22,0.78)",
        color: "#fff",
      }
    : {
        background: "var(--theme-gradient)",
        boxShadow: "0 0 34px var(--theme-glow-border)",
        color: "#fff",
      };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        lightHero ? "text-[#10172d]" : "text-white"
      }`}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={getGlobalThemeStyles(mode, lightHero)}
    >
      {/* Logo Intro Video Preloader */}
      {/* <Preloader /> */}
      {/* Persistent star-field background — visible from services section onward */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <StarField bgColor="#060816" />
      </div>
      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-4 px-4 sm:px-6 md:px-8"
            : `top-4 border-b border-white/5 ${
                lightHero 
                  ? "bg-black/40 backdrop-blur-md" 
                  : "bg-black/70 backdrop-blur-md"
              }`
        }`}
      >
        <div
          className={`mx-auto w-full max-w-6xl flex justify-between items-center transition-all duration-500 ${
            scrolled
              ? lightHero
                ? "rounded-full border bg-[#faf6ed]/82 backdrop-blur-xl px-6 py-2.5 shadow-[0_18px_44px_-24px_rgba(61,43,22,0.38)]"
                : "rounded-full border bg-slate-900/40 backdrop-blur-xl px-6 py-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),_0_0_20px_rgba(228,76,255,0.15)]"
              : "px-6 py-2.5"
          }`}
          style={{
            borderColor: scrolled ? "var(--theme-nav-border)" : "transparent",
          }}
        >
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <div 
              className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-1 group"
              style={{ WebkitTextStroke: "0.4px white" }}
            >
              <span 
                className="bg-clip-text text-transparent transition-all duration-1000 group-hover:drop-shadow-[0_0_8px_var(--theme-glow)]"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #142143, #9A6847)"
                    : mode === "creative"
                    ? "linear-gradient(to right, #E44CFF, #9F56FF)"
                    : mode === "precise"
                    ? "linear-gradient(to right, #4EF0FF, #2EDAA2)"
                    : "linear-gradient(to right, #4EF0FF, #5861F2)"
                }}
              >
                TRI
              </span>
              <span
                className={`transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                  lightHero
                    ? "text-[#10172d] group-hover:from-[#10172d] group-hover:to-[#9A6847]"
                    : "text-white group-hover:from-white group-hover:to-gray-300"
                }`}
              >
                MINDS
              </span>
            </div>
          </Link>
          <div
            className="hidden lg:flex items-center gap-8 text-[16px] font-medium"
          >
            <a
              href="#services"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.solutions")}
            </a>
            <Link
              href="/about-us"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.about")}
            </Link>
            <a
              href="#packages"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.pricing")}
            </a>
            <a
              href="#contact"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.contact")}
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm transition-all duration-300 ${
                scrolled && lightHero
                  ? "border-[#c6ad89] bg-white/80 text-[#121a31] hover:bg-white"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
              }`}
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            >
              <Globe className="w-4 h-4" />
              {locale === "en" ? "العربية" : "English"}
            </button>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.05]"
              style={{
                background: "var(--theme-gradient)",
                boxShadow: "0 0 15px var(--theme-glow-border)",
                color: "#fff",
              }}
            >
              {t("nav.cta")}
            </a>
          </div>
          <div className="flex lg:hidden items-center gap-3">
            <button
              className={`p-2 rounded-xl border text-sm transition-all duration-300 ${
                scrolled && lightHero
                  ? "border-[#c6ad89] bg-white/80 text-[#121a31] hover:bg-white"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
              }`}
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded-xl border transition-all duration-300 ${
                scrolled && lightHero
                  ? "border-[#c6ad89] bg-white/80 text-[#121a31] hover:bg-white"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`absolute left-4 right-4 top-full mt-2 rounded-2xl border backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-4 lg:hidden z-40 ${
                lightHero
                  ? "border-[#c6ad89]/45 bg-[#faf6ed]/92"
                  : "border-[#E44CFF]/20 bg-slate-900/80"
              }`}
            >
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
              >
                {t("nav.solutions")}
              </a>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
              >
                {t("nav.about")}
              </Link>
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
              >
                {t("nav.pricing")}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
              >
                {t("nav.contact")}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 mt-2"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: "0 0 15px var(--theme-glow-border)",
                  color: "#fff",
                }}
              >
                {t("nav.cta")}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden min-h-screen pt-32 pb-16"
      >
        {/* Cinematic cosmic background */}
        <LightHeroBackground />

        <div className="max-w-5xl mx-auto relative w-full z-10 flex flex-col items-center justify-center">
          
          {/* Main Column: Text content & Action items */}
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
            {/* Glowing badge */}
            <div
              className={`inline-flex items-center gap-2 px-12 py-2.5 backdrop-blur-[2px] text-[10px] md:text-xs font-bold tracking-widest uppercase ${
                lightHero
                  ? "bg-gradient-to-r from-transparent via-white/90 to-transparent text-[#10172d]"
                  : "bg-gradient-to-r from-transparent via-white/15 to-transparent text-white"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  lightHero ? "bg-[#142143]" : "bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF]"
                }`}
              />
              {t("hero.badge.first")} · {t("hero.badge.second")} · {t("hero.badge.third")}
            </div>

            {/* Headline with rotating words */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight w-full ${
                lightHero ? "text-[#10172d]" : "text-white"
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("hero.heading")}{" "}
              <span className="relative inline-block min-w-[140px] sm:min-w-[180px] md:min-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute left-0 right-0 bg-clip-text text-transparent select-none whitespace-nowrap"
                    style={{
                      backgroundImage: lightHero
                        ? "linear-gradient(to right, #10172d, #9A6847, #152143)"
                        : mode === "creative"
                        ? "linear-gradient(to right, #E44CFF, #9F56FF, #7B4CFF)"
                        : mode === "precise"
                        ? "linear-gradient(to right, #4EF0FF, #2EDAA2, #10B981)"
                        : "linear-gradient(to right, #E44CFF, #5861F2, #4EF0FF)"
                    }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Layout Spacer utilizing the longest word to prevent layout shift */}
                <span className="opacity-0 pointer-events-none select-none">
                  {words.reduce((a, b) => a.length > b.length ? a : b, "")}
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p
              className={`text-sm sm:text-base md:text-xl max-w-3xl leading-relaxed font-medium ${
                lightHero ? "text-[#10172d]" : "text-gray-300"
              }`}
              style={{ color: lightHero ? "#10172d" : undefined }}
            >
              {t("hero.subheading")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full pt-4">
              <a
                href="#contact"
                className="group relative w-full sm:w-auto text-center px-10 py-4 rounded-full font-semibold text-sm text-white overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_var(--theme-glow)]"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: `0 0 20px var(--theme-glow-border)`,
                  color: "#fff",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("hero.cta2")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#about"
                className={`group w-full sm:w-auto text-center px-10 py-4 rounded-full font-semibold text-sm border backdrop-blur-md transition-all duration-300 hover:scale-[1.05] ${
                  lightHero
                    ? "border-[#17213a]/35 bg-white/45 text-[#10172d] hover:border-[#17213a]/60 hover:bg-white/70"
                    : "border-white/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                }`}
                style={{ color: lightHeroInk }}
              >
                {locale === "ar" ? "تعرف على طريقتنا" : "How It Works"}
              </a>
            </div>

            {/* Performance Stats */}
            <div
              className={`pt-8 mt-6 grid grid-cols-3 gap-6 md:gap-12 border-t w-full max-w-3xl text-center ${
                lightHero ? "border-[#8a6640]/80" : "border-white/10"
              }`}
            >
              {[
                { val: t("hero.stats.clients.value"), label: t("hero.stats.clients.label") },
                { val: t("hero.stats.revenue.value"), label: t("hero.stats.revenue.label") },
                { val: t("hero.stats.loyalty.value"), label: t("hero.stats.loyalty.label") },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span
                    className={`text-2xl md:text-3xl font-extrabold font-mono ${
                      lightHero ? "text-[#5c4329]" : "text-white"
                    }`}
                    style={{ color: lightHeroWarmInk }}
                  >
                    {stat.val}
                  </span>
                  <span
                    className={`text-[10px] md:text-xs uppercase tracking-wider mt-2 font-semibold ${
                      lightHero ? "text-[#4a3f33]" : "text-gray-400"
                    }`}
                    style={{ color: lightHero ? "#4a3f33" : undefined }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className={`relative z-10 overflow-hidden py-20 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {lightHero && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,255,255,0.78),transparent_32%),radial-gradient(circle_at_76%_38%,rgba(204,174,128,0.16),transparent_36%),linear-gradient(180deg,#f7f3ea_0%,#f5efe3_78%,#f7f3ea_100%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full border border-[#c6ad89]/20" />
            <div className="pointer-events-none absolute -right-24 bottom-28 h-80 w-80 rounded-full border border-[#142143]/10" />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("services.heading")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                }}
              >
                {t("services.headingHighlight")}
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                lightHero ? "text-[#25304a]/78" : "text-gray-400"
              }`}
              style={{ color: lightHeroMutedInk }}
            >
              {t("services.subheading")}
            </p>
          </div>

          <StaggerTestimonials
            services={[
              {
                tempId: 0,
                title: t("services.items.automation.title"),
                description: t("services.items.automation.description"),
                features: t("services.items.automation.features"),
                accentColor: lightHero ? "#142143" : "#E44CFF",
                accentColor2: lightHero ? "#9A6847" : "#7B4CFF",
              },
              {
                tempId: 1,
                title: t("services.items.analytics.title"),
                description: t("services.items.analytics.description"),
                features: t("services.items.analytics.features"),
                accentColor: lightHero ? "#9A6847" : "#8B56FF",
                accentColor2: lightHero ? "#142143" : "#5861F2",
              },
              {
                tempId: 2,
                title: t("services.items.industry.title"),
                description: t("services.items.industry.description"),
                features: t("services.items.industry.features"),
                accentColor: lightHero ? "#142143" : "#5861F2",
                accentColor2: lightHero ? "#8a6640" : "#5BA8F7",
              },
              {
                tempId: 3,
                title: t("services.items.llm.title"),
                description: t("services.items.llm.description"),
                features: t("services.items.llm.features"),
                accentColor: lightHero ? "#9A6847" : "#5BA8F7",
                accentColor2: lightHero ? "#213c67" : "#4ECFFC",
              },
              {
                tempId: 4,
                title: t("services.items.endToEnd.title"),
                description: t("services.items.endToEnd.description"),
                features: t("services.items.endToEnd.features"),
                accentColor: lightHero ? "#213c67" : "#4ECFFC",
                accentColor2: lightHero ? "#9A6847" : "#4EF0FF",
              },
              {
                tempId: 5,
                title: t("services.items.webMobile.title"),
                description: t("services.items.webMobile.description"),
                features: t("services.items.webMobile.features"),
                accentColor: lightHero ? "#8a6640" : "#4EF0FF",
                accentColor2: lightHero ? "#142143" : "#ACA0FB",
              },
            ]}
            lightMode={lightHero}
          />
        </div>
      </section>

      {/* Customer / Portfolio Showcase Section */}
      <section
        id="customers"
        className={`relative z-10 overflow-hidden py-20 px-4 sm:px-6 ${
          lightHero ? "bg-[#fbf9f4]" : ""
        }`}
      >
        {/* Ambient background decoration */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 78% 38%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #fbf9f4 0%, #f5efe3 78%, #fbf9f4 100%)"
              : "radial-gradient(ellipse 55% 40% at 50% 60%, rgba(228,76,255,0.06) 0%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#10172d] dark:text-white">
              {t("customers.heading")}{" "}
              <span className="text-[#10172d] dark:text-white">
                {t("customers.headingHighlight")}
              </span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#25304a]/75 dark:text-slate-300 max-w-2xl mx-auto">
              {t("customers.subheading")}
            </p>
            {/* Golden decorative accent line */}
            <div className="w-20 h-1 bg-[#D97706] rounded-full mx-auto mt-4 mb-6" />
          </div>

          {/* Top Filter Tabs / Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <button
              type="button"
              onClick={() => setActiveShowcaseKey("healthcare")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 ${
                activeShowcaseKey === "healthcare"
                  ? "bg-[#0F172A] text-white shadow-md"
                  : "bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t("customers.all")}</span>
            </button>

            {customerShowcases.map(({ key, label }) => {
              const isActive = activeShowcaseKey === key;
              const iconsMap: Record<string, React.ReactNode> = {
                healthcare: <HeartPulse className="w-4 h-4" />,
                education: <GraduationCap className="w-4 h-4" />,
                realEstate: <Building2 className="w-4 h-4" />,
                logistics: <Truck className="w-4 h-4" />,
                finance: <Landmark className="w-4 h-4" />,
              };
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveShowcaseKey(key)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-md"
                      : "bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                  }`}
                >
                  {iconsMap[key]}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Carousel Card Container */}
          <div className="relative">
            {/* Floating Carousel Navigation Arrow - Left */}
            <button
              type="button"
              onClick={() => {
                const curIdx = showcaseKeys.indexOf(activeShowcaseKey);
                const nextIdx = (curIdx - 1 + showcaseKeys.length) % showcaseKeys.length;
                setActiveShowcaseKey(showcaseKeys[nextIdx]);
              }}
              aria-label="Previous Showcase"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-white/15 shadow-xl flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Floating Carousel Navigation Arrow - Right */}
            <button
              type="button"
              onClick={() => {
                const curIdx = showcaseKeys.indexOf(activeShowcaseKey);
                const nextIdx = (curIdx + 1) % showcaseKeys.length;
                setActiveShowcaseKey(showcaseKeys[nextIdx]);
              }}
              aria-label="Next Showcase"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-white/15 shadow-xl flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Card Body */}
            <div className="overflow-hidden rounded-[32px] md:rounded-[36px] border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#070e24]/95 p-5 sm:p-7 md:p-9 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.07)] backdrop-blur-md">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Project Details & Action Card (Left side in LTR / Start side in RTL) */}
                <div className="lg:col-span-5 flex flex-col justify-center px-1 sm:px-4" dir={locale === "ar" ? "rtl" : "ltr"}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeShowcase.key}
                      initial={{ opacity: 0, x: locale === "ar" ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: locale === "ar" ? -15 : 15 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {/* Category Pill */}
                      <div className="mb-3.5">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/90 dark:border-white/15 bg-slate-50/90 dark:bg-white/5 text-xs font-bold text-slate-800 dark:text-white shadow-sm">
                          {activeShowcase.key === "healthcare" ? <HeartPulse className="w-3.5 h-3.5 text-[#00D2FF]" /> : activeShowcase.key === "education" ? <GraduationCap className="w-3.5 h-3.5 text-[#E44CFF]" /> : activeShowcase.key === "realEstate" ? <Building2 className="w-3.5 h-3.5 text-[#8B56FF]" /> : activeShowcase.key === "logistics" ? <Truck className="w-3.5 h-3.5 text-[#5861F2]" /> : <Landmark className="w-3.5 h-3.5 text-[#4EF0FF]" />}
                          <span>{activeShowcase.label}</span>
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white leading-tight mb-3.5">
                        {activeShowcase.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {activeShowcase.body}
                      </p>

                      {/* Feature Checklist */}
                      <div className="space-y-3 mb-7">
                        {activeShowcase.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black mt-0.5">
                              ✓
                            </span>
                            <span className="leading-snug">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="pt-1">
                        <a
                          href="#contact"
                          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] dark:bg-white dark:text-[#0F172A] dark:hover:bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
                        >
                          <span>{t("customers.viewProject")}</span>
                          <span className={locale === "ar" ? "rotate-180 inline-block" : "inline-block"}>➔</span>
                        </a>
                      </div>

                      {/* Pagination Dots */}
                      <div className="flex items-center justify-center gap-2 pt-8">
                        <button
                          type="button"
                          onClick={() => {
                            const curIdx = showcaseKeys.indexOf(activeShowcaseKey);
                            const nextIdx = (curIdx - 1 + showcaseKeys.length) % showcaseKeys.length;
                            setActiveShowcaseKey(showcaseKeys[nextIdx]);
                          }}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-white px-1 text-sm font-mono transition-colors"
                        >
                          &lt;
                        </button>
                        {customerShowcases.map((sc) => (
                          <button
                            key={sc.key}
                            type="button"
                            onClick={() => setActiveShowcaseKey(sc.key)}
                            aria-label={sc.label}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              activeShowcaseKey === sc.key
                                ? "w-6 bg-amber-500"
                                : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400"
                            }`}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const curIdx = showcaseKeys.indexOf(activeShowcaseKey);
                            const nextIdx = (curIdx + 1) % showcaseKeys.length;
                            setActiveShowcaseKey(showcaseKeys[nextIdx]);
                          }}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-white px-1 text-sm font-mono transition-colors"
                        >
                          &gt;
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mockup Dashboard Display (Right side in LTR / Left side in RTL) */}
                <div className="lg:col-span-7 relative min-h-[420px] md:min-h-[460px]">
                  <AnimatePresence mode="wait">
                    <ShowcaseInterface
                      key={activeShowcase.key}
                      showcaseKey={activeShowcase.key}
                      label={activeShowcase.label}
                      color={activeShowcaseThemeColor}
                      stats={activeShowcase.stats}
                      showcaseLabel={t("customers.showcaseLabel")}
                      lightMode={lightHero}
                      locale={locale}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Integration Process — Roadmap */}
      <section
        id="about"
        className={`relative z-10 overflow-hidden py-20 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 78% 42%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #f7f3ea 0%, #f5efe3 78%, #f7f3ea 100%)"
              : "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(78,240,255,0.05) 0%, transparent 70%)",
          }}
        />
        {lightHero && (
          <>
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[6%] top-28 hidden h-[420px] w-[420px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            {/* Kicker */}
            <p
              className="text-xs font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: lightHero ? "#9A6847" : "#4EF0FF" }}
            >
              {t("about.kicker")}
            </p>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("about.heading")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                }}
              >
                {t("about.headingHighlight")}
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                lightHero ? "text-[#25304a]/78" : "text-gray-400"
              }`}
              style={{ color: lightHeroMutedInk }}
            >
              {t("about.subheading")}
            </p>
          </div>

          {/* Nodes */}
          <RoadmapProcess lightMode={lightHero} />

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.05]"
              style={{
                background: lightHero
                  ? "linear-gradient(135deg, #101b39, #213c67)"
                  : "linear-gradient(135deg, #E44CFF, #5861F2)",
                boxShadow: lightHero
                  ? "0 18px 38px -24px rgba(61,43,22,0.78)"
                  : "0 0 30px rgba(228,76,255,0.35)",
                color: "#fff",
              }}
            >
              {t("about.cta")}
              <svg className={`w-4 h-4 transition-transform duration-300 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section
        id="packages"
        className={`relative z-10 overflow-hidden py-24 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 76% 34%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #f7f3ea 0%, #f5efe3 76%, #f7f3ea 100%)"
              : "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(88,97,242,0.06) 0%, transparent 70%)",
          }}
        />
        {lightHero && (
          <>
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[5%] top-16 hidden h-[440px] w-[440px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("packages.heading")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #5861F2, #4EF0FF)",
                }}
              >
                {t("packages.headingHighlight")}
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                lightHero ? "text-[#25304a]/78" : "text-gray-400"
              }`}
              style={{ color: lightHeroMutedInk }}
            >
              {t("packages.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: t("packages.starter.name"),
                price: t("packages.starter.price"),
                period: t("packages.starter.period"),
                description: t("packages.starter.description"),
                features: t("packages.starter.features"),
                popular: false,
                cta: t("packages.starter.cta"),
              },
              {
                name: t("packages.professional.name"),
                price: t("packages.professional.price"),
                period: t("packages.professional.period"),
                description: t("packages.professional.description"),
                features: t("packages.professional.features"),
                popular: true,
                popularText: t("packages.professional.popular"),
                cta: t("packages.professional.cta"),
              },
              {
                name: t("packages.enterprise.name"),
                price: t("packages.enterprise.price"),
                period: t("packages.enterprise.period"),
                description: t("packages.enterprise.description"),
                features: t("packages.enterprise.features"),
                popular: false,
                cta: t("packages.enterprise.cta"),
              },
            ].map((pkg, index) => {
              const isPopular = Boolean(pkg.popular);
              const packageCtaBase = lightHero
                ? {
                    border: "1px solid rgba(154, 104, 71, 0.32)",
                    background: "rgba(255, 255, 255, 0.62)",
                    color: "#10172d",
                    boxShadow: "none",
                  }
                : {
                    border: "1px solid rgba(228, 76, 255, 0.3)",
                    background: "rgba(228, 76, 255, 0.05)",
                    color: "#fff",
                    boxShadow: "none",
                  };
              const packageCtaActive = lightHero
                ? {
                    background: "linear-gradient(135deg, #101b39, #213c67)",
                    boxShadow: "0 18px 38px -24px rgba(61,43,22,0.78)",
                    color: "#fff",
                  }
                : {
                    background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: "0 0 25px rgba(228, 76, 255, 0.35)",
                    color: "#fff",
                  };

              return (
              <div
                key={index}
                className="relative p-8 rounded-2xl transition-all duration-500 hover:scale-[1.03] flex flex-col justify-between"
                style={{
                  background: lightHero
                    ? isPopular ? "rgba(255, 255, 255, 0.86)" : "rgba(250, 246, 237, 0.76)"
                    : isPopular ? "rgba(228, 76, 255, 0.08)" : "rgba(24, 27, 53, 0.35)",
                  backdropFilter: "blur(20px)",
                  border: lightHero
                    ? isPopular ? "2px solid rgba(154, 104, 71, 0.45)" : "1px solid rgba(198, 173, 137, 0.58)"
                    : isPopular ? "2px solid rgba(228, 76, 255, 0.45)" : "1px solid rgba(88, 97, 242, 0.2)",
                  boxShadow: lightHero
                    ? isPopular
                      ? "0 24px 58px -34px rgba(61,43,22,0.72), 0 0 0 1px rgba(255,255,255,0.55) inset"
                      : "0 18px 44px -30px rgba(61,43,22,0.58)"
                    : isPopular
                      ? "0 10px 40px rgba(228, 76, 255, 0.15), 0 0 30px rgba(228, 76, 255, 0.1)"
                      : "0 10px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div>
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span
                        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                        style={{
                          background: lightHero
                            ? "linear-gradient(135deg, #101b39, #9A6847)"
                            : "linear-gradient(135deg, #E44CFF, #5861F2)",
                          boxShadow: lightHero
                            ? "0 14px 28px -18px rgba(61,43,22,0.78)"
                            : "0 0 15px rgba(228, 76, 255, 0.5)",
                        }}
                      >
                        {pkg.popularText}
                      </span>
                    </div>
                  )}
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      lightHero ? "text-[#10172d]" : "text-white"
                    }`}
                    style={{ color: lightHeroInk }}
                  >
                    {pkg.name}
                  </h3>
                  <div className="mb-5 flex items-baseline">
                    <span
                      className="text-4xl font-extrabold bg-clip-text text-transparent"
                      style={{
                        backgroundImage: lightHero
                          ? "linear-gradient(to right, #10172d, #9A6847)"
                          : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                      }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`ml-2 text-sm ${
                        lightHero ? "text-[#6f604f]" : "text-gray-400"
                      }`}
                      style={{ color: lightHero ? "#6f604f" : undefined }}
                    >
                      {pkg.period}
                    </span>
                  </div>
                  <p
                    className={`mb-6 text-sm leading-relaxed ${
                      lightHero ? "text-[#25304a]/72" : "text-gray-400"
                    }`}
                    style={{ color: lightHero ? "rgba(37,48,74,0.72)" : undefined }}
                  >
                    {pkg.description}
                  </p>
                  <ul className="space-y-3.5 mb-8">
                    {Array.isArray(pkg.features) && pkg.features.map((feature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className={`flex items-start text-sm ${
                          lightHero ? "text-[#25304a]/82" : "text-gray-300"
                        }`}
                        style={{ color: lightHero ? "rgba(37,48,74,0.82)" : undefined }}
                      >
                        <Check
                          className="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0"
                          style={{
                            color: lightHero ? "#9A6847" : "#4EF0FF",
                            filter: lightHero ? "none" : "drop-shadow(0 0 6px rgba(78,240,255,0.6))",
                          }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="w-full text-center py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={isPopular ? packageCtaActive : packageCtaBase}
                  onMouseEnter={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.background = packageCtaActive.background;
                      e.currentTarget.style.boxShadow = packageCtaActive.boxShadow;
                      e.currentTarget.style.color = packageCtaActive.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.background = packageCtaBase.background;
                      e.currentTarget.style.boxShadow = packageCtaBase.boxShadow;
                      e.currentTarget.style.color = packageCtaBase.color;
                    }
                  }}
                >
                  {pkg.cta}
                </a>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        id="community"
        className={`relative z-10 overflow-hidden py-24 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {lightHero && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_76%_36%,rgba(154,104,71,0.14),transparent_36%),linear-gradient(180deg,#f7f3ea_0%,#f5efe3_76%,#f7f3ea_100%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-24 top-28 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[5%] top-16 hidden h-[460px] w-[460px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Heading - Outside the visual container */}
          <div className="text-center mb-16">
            <p
              className={`text-sm uppercase tracking-[0.35em] mb-4 ${
                lightHero ? "text-[#6f604f]" : "text-gray-300"
              }`}
              style={{ color: lightHero ? "#6f604f" : undefined }}
            >
              {t("community.kicker")}
            </p>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("community.title")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                }}
              >
                {t("community.highlight")}
              </span>
            </h2>
          </div>

          <div
            className="relative overflow-hidden px-6 py-16 md:px-12"
          >
            <div className="absolute inset-0">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1060px] h-[1060px] md:w-[1200px] md:h-[1200px] rounded-full"
                style={{ border: lightHero ? "1px solid rgba(154, 104, 71, 0.20)" : "1px solid rgba(228, 76, 255, 0.15)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1040px] md:h-[1040px] rounded-full"
                style={{ border: lightHero ? "1px solid rgba(20, 33, 67, 0.12)" : "1px solid rgba(228, 76, 255, 0.12)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] md:w-[810px] md:h-[810px] rounded-full"
                style={{ border: lightHero ? "1px solid rgba(154, 104, 71, 0.16)" : "1px solid rgba(228, 76, 255, 0.11)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[590px] md:h-[590px] rounded-full"
                style={{ border: lightHero ? "1px solid rgba(20, 33, 67, 0.10)" : "1px solid rgba(228, 76, 255, 0.1)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: lightHero
                    ? "radial-gradient(circle at center, rgba(154, 104, 71, 0.12), transparent 55%)"
                    : "radial-gradient(circle at center, rgba(228, 76, 255, 0.08), transparent 55%)",
                }}
              />
              {orbitDots.map((dot, index) => (
                <div
                  key={index}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: dot.left,
                    top: dot.top,
                    opacity: 0.7,
                    background: lightHero ? "#9A6847" : "#FFFFFF",
                    boxShadow: lightHero ? "0 0 12px rgba(154,104,71,0.32)" : "0 0 12px rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>

            <div className="relative h-[1120px] md:h-[1290px]">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <button
                  className="px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-[1.05]"
                  style={{
                    background: lightHero
                      ? "linear-gradient(135deg, #101b39, #213c67)"
                      : "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: lightHero
                      ? "0 18px 38px -24px rgba(61,43,22,0.78)"
                      : "0 0 30px rgba(228, 76, 255, 0.4)",
                    color: "#fff",
                  }}
                >
                  {t("community.cta")}
                </button>
              </div>

              {communityMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="absolute left-1/2 top-1/2 orbital-item"
                  style={{
                    animation: `orbit ${member.duration}s linear infinite`,
                    animationDelay: `${-(member.initialAngle / 360) * member.duration
                      }s`,
                    width: `${member.orbit * 2}px`,
                    height: `${member.orbit * 2}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 rounded-full px-3 py-2 absolute top-0 left-1/2"
                    style={{
                      width: member.badgeWidth,
                      animation: `counter-rotate ${member.duration}s linear infinite`,
                      animationDelay: `${-(member.initialAngle / 360) * member.duration
                        }s`,
                      transform: "translate(-50%, -50%)",
                      background: lightHero ? "rgba(255, 255, 255, 0.76)" : "rgba(24, 27, 53, 0.8)",
                      backdropFilter: "blur(16px)",
                      border: lightHero ? "1px solid rgba(198, 173, 137, 0.62)" : "1px solid rgba(228, 76, 255, 0.3)",
                      boxShadow: lightHero
                        ? "0 18px 38px -24px rgba(61,43,22,0.72)"
                        : "0 0 20px rgba(228, 76, 255, 0.2)",
                    }}
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ border: lightHero ? "2px solid rgba(154, 104, 71, 0.45)" : "2px solid rgba(228, 76, 255, 0.5)" }}
                      />
                      <span
                        className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full"
                        style={{
                          background: lightHero ? "#9A6847" : "#4EF0FF",
                          boxShadow: lightHero ? "0 0 10px rgba(154,104,71,0.45)" : "0 0 10px rgba(78, 240, 255, 0.8)",
                        }}
                      />
                    </div>
                    <div className="leading-tight text-left">
                      <div
                        className={`text-sm font-semibold ${
                          lightHero ? "text-[#10172d]" : "text-white"
                        }`}
                        style={{ color: lightHeroInk }}
                      >
                        {member.name}
                      </div>
                      <div
                        className="text-[11px]"
                        style={{ color: lightHero ? "#9A6847" : "#E44CFF" }}
                      >
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {floatingAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 orbital-item"
                  style={{
                    animation: `orbit ${avatar.duration}s linear infinite`,
                    animationDelay: `${-(avatar.initialAngle / 360) * avatar.duration
                      }s`,
                    width: `${avatar.orbit * 2}px`,
                    height: `${avatar.orbit * 2}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="rounded-full p-1 absolute top-0 left-1/2"
                    style={{
                      animation: `counter-rotate ${avatar.duration}s linear infinite`,
                      animationDelay: `${-(avatar.initialAngle / 360) * avatar.duration
                        }s`,
                      transform: "translate(-50%, -50%)",
                      border: lightHero ? "1px solid rgba(198, 173, 137, 0.62)" : "1px solid rgba(228, 76, 255, 0.3)",
                      background: lightHero ? "rgba(255, 255, 255, 0.70)" : "rgba(24, 27, 53, 0.6)",
                      backdropFilter: "blur(12px)",
                      boxShadow: lightHero
                        ? "0 14px 30px -22px rgba(61,43,22,0.72)"
                        : "0 0 20px rgba(228, 76, 255, 0.15)",
                    }}
                  >
                    <img
                      src={avatar.image}
                      alt="Community member"
                      className="rounded-full object-cover"
                      style={{ width: avatar.size, height: avatar.size }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`relative z-10 overflow-hidden px-6 py-24 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 76% 38%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #f7f3ea 0%, #f5efe3 72%, #f7f3ea 100%)"
              : "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(228,76,255,0.08) 0%, transparent 72%)",
          }}
        />
        {lightHero && (
          <>
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[6%] top-24 hidden h-[440px] w-[440px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative mx-auto max-w-7xl">
          <form
            className="space-y-10"
            onSubmit={handleContactSubmit}
          >
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-8">
                <div>
                  <p
                    className={`mb-4 text-sm font-bold uppercase tracking-[0.22em] ${
                      lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                    }`}
                    style={{ color: lightHero ? "#9A6847" : undefined }}
                  >
                    {t("contact.configurator.kicker")}
                  </p>
                  <h2
                    className={`text-4xl font-semibold leading-tight tracking-tight md:text-5xl ${
                      lightHero ? "text-[#10172d]" : "text-white"
                    }`}
                    style={{ color: lightHeroInk }}
                  >
                    {t("contact.configurator.title")}
                  </h2>
                </div>

                <div className="space-y-7">
                  <div>
                    <h3
                      className={`mb-3 text-xl font-semibold ${
                        lightHero ? "text-[#10172d]" : "text-white"
                      }`}
                      style={{ color: lightHeroInk }}
                    >
                      {t("contact.configurator.industryLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactIndustries.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactIndustry === option.key}
                          onClick={() => setContactIndustry(option.key)}
                          className={`min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                            lightHero ? "focus:ring-[#9A6847]/35" : "focus:ring-[#E44CFF]/40"
                          }`}
                          style={getContactOptionStyle(contactIndustry === option.key)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`mb-3 text-xl font-semibold ${
                        lightHero ? "text-[#10172d]" : "text-white"
                      }`}
                      style={{ color: lightHeroInk }}
                    >
                      {t("contact.configurator.goalLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactGoals.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactGoal === option.key}
                          onClick={() => setContactGoal(option.key)}
                          className={`min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                            lightHero ? "focus:ring-[#9A6847]/35" : "focus:ring-[#E44CFF]/40"
                          }`}
                          style={getContactOptionStyle(contactGoal === option.key)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`mb-3 text-xl font-semibold ${
                        lightHero ? "text-[#10172d]" : "text-white"
                      }`}
                      style={{ color: lightHeroInk }}
                    >
                      {t("contact.configurator.scaleLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactScales.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactScale === option.key}
                          onClick={() => setContactScale(option.key)}
                          className={`min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                            lightHero ? "focus:ring-[#9A6847]/35" : "focus:ring-[#E44CFF]/40"
                          }`}
                          style={getContactOptionStyle(contactScale === option.key)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label
                      className={`mb-2 block text-base font-bold ${
                        lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                      }`}
                      style={{ color: lightHero ? "#9A6847" : undefined }}
                    >
                      {t("contact.configurator.nameLabel")}
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(event) => setContactName(event.target.value)}
                      className={lightInputClassName}
                      style={lightInputStyle}
                      placeholder={t("contact.configurator.namePlaceholder")}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`mb-2 block text-base font-bold ${
                        lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                      }`}
                      style={{ color: lightHero ? "#9A6847" : undefined }}
                    >
                      {t("contact.configurator.emailLabel")}
                    </label>
                    <input
                      type="email"
                      value={contactEmailAddress}
                      onChange={(event) => setContactEmailAddress(event.target.value)}
                      className={lightInputClassName}
                      style={lightInputStyle}
                      placeholder={t("contact.configurator.emailPlaceholder")}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`mb-2 block text-base font-bold ${
                        lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                      }`}
                      style={{ color: lightHero ? "#9A6847" : undefined }}
                    >
                      {t("contact.configurator.messageLabel")}
                    </label>
                    <textarea
                      value={contactMessage}
                      onChange={(event) => setContactMessage(event.target.value)}
                      className={lightTextareaClassName}
                      style={lightInputStyle}
                      placeholder={t("contact.configurator.messagePlaceholder")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="relative min-h-[560px] overflow-visible py-8 pr-8 sm:pr-12">
                <motion.div
                  className={`absolute right-10 top-16 z-0 h-[500px] w-[calc(100%-3rem)] max-w-xl -rotate-[8deg] rounded-[2rem] border backdrop-blur-md ${
                    lightHero
                      ? "border-[#d8c7aa]/55 bg-white/46 shadow-[0_18px_44px_-30px_rgba(61,43,22,0.45)]"
                      : "border-white/[0.12] bg-[#4EF0FF]/[0.06] shadow-[0_0_35px_rgba(228,76,255,0.10)]"
                  }`}
                  animate={{ y: [0, 10, 0], rotate: [-8, -6, -8] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className={`absolute right-0 top-0 z-[1] h-[500px] w-[calc(100%-3rem)] max-w-xl rotate-[6deg] rounded-[2rem] border backdrop-blur-md ${
                    lightHero
                      ? "border-[#c6ad89]/58 bg-[#fbf8f1]/62 shadow-[0_18px_44px_-30px_rgba(61,43,22,0.52)]"
                      : "border-[#4EF0FF]/30 bg-white/[0.08] shadow-[0_0_35px_rgba(78,240,255,0.12)]"
                  }`}
                  animate={{ y: [0, -8, 0], rotate: [6, 4, 6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className={`relative z-10 ml-auto mr-5 mt-7 min-h-[500px] max-w-xl rounded-[2rem] border p-6 backdrop-blur-2xl md:mr-8 md:p-8 ${
                    lightHero
                      ? "border-[#d8c7aa]/70 bg-white/78 shadow-[0_24px_58px_-34px_rgba(61,43,22,0.72)]"
                      : "border-white/[0.18] bg-white/[0.08] shadow-[0_0_55px_rgba(78,240,255,0.12)]"
                  }`}
                  animate={{
                    y: [0, -6, 0],
                    boxShadow: lightHero
                      ? [
                          "0 24px 58px -34px rgba(61,43,22,0.62)",
                          "0 28px 66px -34px rgba(61,43,22,0.78)",
                          "0 24px 58px -34px rgba(61,43,22,0.62)",
                        ]
                      : [
                          "0 0 45px rgba(78,240,255,0.10)",
                          "0 0 70px rgba(228,76,255,0.16)",
                          "0 0 45px rgba(78,240,255,0.10)",
                        ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <h3
                    className={`text-3xl font-semibold tracking-tight ${
                      lightHero ? "text-[#10172d]" : "text-white"
                    }`}
                    style={{ color: lightHeroInk }}
                  >
                    {t("contact.configurator.blueprintTitle")}
                  </h3>

                  <div className={`relative mt-8 overflow-hidden rounded-2xl border ${
                    lightHero
                      ? "border-[#c6ad89]/30 bg-gradient-to-b from-[#fbf8f2] to-[#f4ede0]/80 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_12px_30px_-15px_rgba(61,43,22,0.15)]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}>
                    <svg
                      viewBox="0 0 740 260"
                      className="w-full h-auto select-none"
                      preserveAspectRatio="xMidYMid meet"
                      aria-hidden="true"
                    >
                      <defs>
                        {/* Custom Arrow Markers */}
                        <marker
                          id="bp-arrow-brown"
                          markerWidth="7"
                          markerHeight="7"
                          refX="5"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 7 3.5, 0 7"
                            fill={lightHero ? "#9A6847" : "#AC9BFB"}
                          />
                        </marker>
                        <marker
                          id="bp-arrow-blue"
                          markerWidth="7"
                          markerHeight="7"
                          refX="5"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 7 3.5, 0 7"
                            fill={lightHero ? "#1E293B" : "#4EF0FF"}
                          />
                        </marker>

                        {/* Subtle Card Glow Filters */}
                        <filter id="bp-glow-center" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor={lightHero ? "rgba(154,104,71,0.22)" : "rgba(78,240,255,0.25)"} />
                        </filter>
                        <filter id="bp-card-shadow" x="-10%" y="-10%" width="120%" height="120%">
                          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.06)" />
                        </filter>
                      </defs>

                      {/* Animated Input Connection Flow Lines */}
                      {[
                        "M 70 52 C 120 52, 130 115, 175 125",
                        "M 70 130 L 175 130",
                        "M 70 208 C 120 208, 130 145, 175 135",
                      ].map((path, idx) => (
                        <g key={`input-flow-${idx}`}>
                          <path
                            d={path}
                            fill="none"
                            stroke={lightHero ? "rgba(154,104,71,0.20)" : "rgba(255,255,255,0.12)"}
                            strokeWidth="3"
                          />
                          <motion.path
                            d={path}
                            fill="none"
                            stroke={lightHero ? "rgba(154,104,71,0.75)" : "rgba(172,160,251,0.85)"}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="6 10"
                            markerEnd="url(#bp-arrow-brown)"
                            animate={{ strokeDashoffset: [0, -32] }}
                            transition={{ duration: 3.2 + idx * 0.3, repeat: Infinity, ease: "linear" }}
                          />
                        </g>
                      ))}

                      {/* Connection Line: Step 1 -> Step 2 */}
                      <g>
                        <line
                          x1="262"
                          y1="130"
                          x2="310"
                          y2="130"
                          stroke={lightHero ? "rgba(154,104,71,0.25)" : "rgba(255,255,255,0.15)"}
                          strokeWidth="3"
                        />
                        <motion.line
                          x1="262"
                          y1="130"
                          x2="310"
                          y2="130"
                          stroke={lightHero ? "rgba(154,104,71,0.85)" : "rgba(172,160,251,0.95)"}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="6 8"
                          markerEnd="url(#bp-arrow-brown)"
                          animate={{ strokeDashoffset: [0, -28] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                        />
                      </g>

                      {/* Connection Lines: Step 2 -> Output Cards */}
                      {[
                        "M 416 120 C 445 110, 445 78, 478 78",
                        "M 416 140 C 445 150, 445 182, 478 182",
                      ].map((path, idx) => (
                        <g key={`mid-out-flow-${idx}`}>
                          <path
                            d={path}
                            fill="none"
                            stroke={lightHero ? "rgba(30,41,59,0.20)" : "rgba(78,240,255,0.18)"}
                            strokeWidth="3"
                          />
                          <motion.path
                            d={path}
                            fill="none"
                            stroke={lightHero ? "rgba(30,41,59,0.80)" : "rgba(78,240,255,0.85)"}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="6 10"
                            markerEnd="url(#bp-arrow-blue)"
                            animate={{ strokeDashoffset: [0, -32] }}
                            transition={{ duration: 2.8 + idx * 0.4, repeat: Infinity, ease: "linear" }}
                          />
                        </g>
                      ))}

                      {/* Connection Lines: Output Cards -> Endpoints */}
                      {[
                        { d: "M 560 65 C 595 55, 605 45, 638 45", delay: 0 },
                        { d: "M 560 88 C 595 95, 605 102, 638 102", delay: 0.15 },
                        { d: "M 560 172 C 595 162, 605 158, 638 158", delay: 0.3 },
                        { d: "M 560 195 C 595 205, 605 215, 638 215", delay: 0.45 },
                      ].map((conn, idx) => (
                        <g key={`end-flow-${idx}`}>
                          <path
                            d={conn.d}
                            fill="none"
                            stroke={lightHero ? "rgba(30,41,59,0.15)" : "rgba(255,255,255,0.10)"}
                            strokeWidth="2.5"
                          />
                          <motion.path
                            d={conn.d}
                            fill="none"
                            stroke={lightHero ? "rgba(30,41,59,0.65)" : "rgba(78,240,255,0.70)"}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="5 8"
                            animate={{ strokeDashoffset: [0, -26] }}
                            transition={{ duration: 3 + idx * 0.2, repeat: Infinity, ease: "linear" }}
                          />
                        </g>
                      ))}

                      {/* Left: 3 Input Data Stream Nodes */}
                      {[
                        { cy: 52, label: "DB" },
                        { cy: 130, label: "API" },
                        { cy: 208, label: "DOC" },
                      ].map((pod, idx) => (
                        <motion.g
                          key={`input-pod-${idx}`}
                          animate={{ scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75] }}
                          transition={{ duration: 3.2, repeat: Infinity, delay: idx * 0.25, ease: "easeInOut" }}
                        >
                          <rect
                            x="20"
                            y={pod.cy - 24}
                            width="48"
                            height="48"
                            rx="14"
                            fill={lightHero ? "#ffffff" : "rgba(255,255,255,0.06)"}
                            stroke={lightHero ? "rgba(154,104,71,0.35)" : "rgba(255,255,255,0.15)"}
                            strokeWidth="1.5"
                            filter="url(#bp-card-shadow)"
                          />
                          <circle
                            cx="44"
                            cy={pod.cy}
                            r="11"
                            fill="none"
                            stroke={lightHero ? "#9A6847" : "#AC9BFB"}
                            strokeWidth="4"
                          />
                          <circle
                            cx="44"
                            cy={pod.cy}
                            r="4"
                            fill={lightHero ? "#9A6847" : "#AC9BFB"}
                          />
                        </motion.g>
                      ))}

                      {/* Step 1: Document Processing Card */}
                      <motion.g
                        filter="url(#bp-card-shadow)"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <rect
                          x="180"
                          y="90"
                          width="80"
                          height="80"
                          rx="20"
                          fill={lightHero ? "#ffffff" : "rgba(255,255,255,0.08)"}
                          stroke={lightHero ? "#1E293B" : "rgba(255,255,255,0.30)"}
                          strokeWidth="2"
                        />
                        {/* Document Content Lines */}
                        <rect x="202" y="112" width="36" height="5" rx="2.5" fill={lightHero ? "#1E293B" : "#ffffff"} />
                        <rect x="202" y="127" width="26" height="5" rx="2.5" fill={lightHero ? "#9A6847" : "#AC9BFB"} />
                        <rect x="202" y="142" width="32" height="5" rx="2.5" fill={lightHero ? "#1E293B" : "#ffffff"} opacity="0.6" />
                      </motion.g>

                      {/* Step 2: Central AI Brain / Neural Core */}
                      <motion.g
                        filter="url(#bp-glow-center)"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: "365px 130px" }}
                      >
                        <rect
                          x="315"
                          y="75"
                          width="100"
                          height="110"
                          rx="24"
                          fill={lightHero ? "rgba(255,255,255,0.95)" : "rgba(78,240,255,0.08)"}
                          stroke={lightHero ? "#9A6847" : "#4EF0FF"}
                          strokeWidth="2.5"
                        />
                        {/* Neural Graph Elements */}
                        <circle cx="348" cy="130" r="8" fill={lightHero ? "#9A6847" : "#4EF0FF"} />
                        <circle cx="382" cy="106" r="8" fill={lightHero ? "#1E293B" : "#E44CFF"} />
                        <circle cx="382" cy="154" r="8" fill={lightHero ? "#1E293B" : "#E44CFF"} />

                        <line x1="354" y1="126" x2="376" y2="110" stroke={lightHero ? "#1E293B" : "#ffffff"} strokeWidth="2.5" />
                        <line x1="354" y1="134" x2="376" y2="150" stroke={lightHero ? "#1E293B" : "#ffffff"} strokeWidth="2.5" />
                        <line x1="382" y1="114" x2="382" y2="146" stroke={lightHero ? "rgba(154,104,71,0.6)" : "#4EF0FF"} strokeWidth="2" strokeDasharray="3 3" />
                      </motion.g>

                      {/* Step 3: Top Output Card (Analytics & KPI) */}
                      <motion.g
                        filter="url(#bp-card-shadow)"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      >
                        <rect
                          x="480"
                          y="40"
                          width="78"
                          height="76"
                          rx="18"
                          fill={lightHero ? "#ffffff" : "rgba(255,255,255,0.08)"}
                          stroke={lightHero ? "#1E293B" : "rgba(255,255,255,0.30)"}
                          strokeWidth="2"
                        />
                        {/* Analytics Bar Chart */}
                        <rect x="498" y="76" width="8" height="22" rx="3" fill={lightHero ? "#9A6847" : "#AC9BFB"} />
                        <rect x="514" y="60" width="8" height="38" rx="3" fill={lightHero ? "#1E293B" : "#4EF0FF"} />
                        <rect x="530" y="70" width="8" height="28" rx="3" fill={lightHero ? "#9A6847" : "#AC9BFB"} opacity="0.8" />
                      </motion.g>

                      {/* Step 3: Bottom Output Card (Workflow / Folder) */}
                      <motion.g
                        filter="url(#bp-card-shadow)"
                        animate={{ y: [0, 2, 0] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      >
                        <rect
                          x="480"
                          y="144"
                          width="78"
                          height="76"
                          rx="18"
                          fill={lightHero ? "#ffffff" : "rgba(255,255,255,0.08)"}
                          stroke={lightHero ? "#1E293B" : "rgba(255,255,255,0.30)"}
                          strokeWidth="2"
                        />
                        {/* Folder / Workflow Icon */}
                        <path
                          d="M 498 174 L 507 165 L 522 165 L 527 174 L 542 174 C 545 174, 546 176, 546 178 L 546 198 C 546 201, 544 203, 542 203 L 498 203 C 495 203, 494 201, 494 198 L 494 178 C 494 176, 496 174, 498 174 Z"
                          fill="none"
                          stroke={lightHero ? "#1E293B" : "#ffffff"}
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                        />
                      </motion.g>

                      {/* Step 4: Output Delivery Targets (Endpoints) */}
                      {[
                        { cy: 45, icon: "sun" },
                        { cy: 102, icon: "cpu" },
                        { cy: 158, icon: "activity" },
                        { cy: 215, icon: "check" },
                      ].map((target, idx) => (
                        <motion.g
                          key={`target-endpoint-${idx}`}
                          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2.8, repeat: Infinity, delay: idx * 0.2, ease: "easeInOut" }}
                        >
                          <circle
                            cx="665"
                            cy={target.cy}
                            r="20"
                            fill={lightHero ? "#ffffff" : "rgba(255,255,255,0.06)"}
                            stroke={lightHero ? "rgba(30,41,59,0.35)" : "rgba(255,255,255,0.20)"}
                            strokeWidth="1.5"
                            filter="url(#bp-card-shadow)"
                          />
                          {target.icon === "sun" && (
                            <circle cx="665" cy={target.cy} r="6" fill={lightHero ? "#D97706" : "#4EF0FF"} />
                          )}
                          {target.icon === "cpu" && (
                            <rect x="659" y={target.cy - 6} width="12" height="12" rx="2" fill={lightHero ? "#1E293B" : "#E44CFF"} />
                          )}
                          {target.icon === "activity" && (
                            <circle cx="665" cy={target.cy} r="6" fill={lightHero ? "#9A6847" : "#AC9BFB"} />
                          )}
                          {target.icon === "check" && (
                            <circle cx="665" cy={target.cy} r="5" fill={lightHero ? "#10B981" : "#10B981"} />
                          )}
                        </motion.g>
                      ))}
                    </svg>
                  </div>

                  <div
                    className={`mt-10 text-base leading-relaxed ${
                      lightHero ? "text-[#25304a]/78" : "text-white/72"
                    }`}
                    style={{ color: lightHeroMutedInk }}
                  >
                    <motion.div
                      key={`next-step-${contactScale}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className={`rounded-2xl border px-5 py-4 ${
                        lightHero
                          ? "border-[#d8c7aa]/60 bg-white/62"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <p
                        className={`mb-1 text-xs font-bold uppercase tracking-[0.18em] ${
                          lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                        }`}
                        style={{ color: lightHero ? "#9A6847" : undefined }}
                      >
                        {t("contact.configurator.nextStepLabel")}
                      </p>
                      <p>
                        <span
                          className={`font-semibold ${
                            lightHero ? "text-[#10172d]" : "text-white"
                          }`}
                          style={{ color: lightHeroInk }}
                        >
                          {selectedScaleLabel}:
                        </span>{" "}
                        {t("contact.configurator.nextStepText")}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={contactSubmitStatus === "sending"}
                className="group relative inline-flex min-h-16 items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 text-lg font-semibold text-white transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_45px_var(--theme-glow)] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
                style={primaryCtaStyle}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {contactSubmitStatus === "sending"
                    ? t("contact.configurator.status.sending")
                    : t("contact.configurator.submit")}
                  <ArrowRight className="h-6 w-6 -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:rotate-[225deg]" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
            {contactSubmitStatus !== "idle" && contactSubmitStatus !== "sending" && (
              <p
                aria-live="polite"
                className={`text-center text-sm font-semibold ${
                  lightHero ? "text-[#25304a]/78" : "text-white/72"
                }`}
                style={{ color: lightHeroMutedInk }}
              >
                {contactSubmitStatus === "sent"
                  ? t("contact.configurator.status.sent")
                  : t("contact.configurator.status.fallback")}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 overflow-hidden px-6 pb-12 pt-20 md:pt-24 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {lightHero && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.68),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(154,104,71,0.12),transparent_34%),linear-gradient(180deg,#f7f3ea_0%,#f5efe3_100%)]" />
            <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
          </>
        )}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: lightHero
              ? "linear-gradient(90deg, transparent, rgba(154,104,71,0.32), rgba(20,33,67,0.20), transparent)"
              : "linear-gradient(90deg, transparent, rgba(228,76,255,0.28), rgba(78,240,255,0.2), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_0.9fr_0.8fr]">
            <div>
              <p
                className={`mb-6 text-sm font-bold uppercase tracking-[0.18em] ${
                  lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#9A6847" : undefined }}
              >
                {t("footer.kicker")}
              </p>
              <h2
                className={`max-w-xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl ${
                  lightHero ? "text-[#10172d]" : "text-white"
                }`}
                style={{ color: lightHeroInk }}
              >
                {t("footer.headline")}
              </h2>

              <a
                href="#contact"
                className="group relative mt-10 inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-base font-semibold text-white transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_var(--theme-glow)]"
                style={primaryCtaStyle}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t("footer.cta")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              <div className="mt-12">
                <p
                  className={`mb-4 text-sm font-bold uppercase tracking-[0.18em] ${
                    lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                  }`}
                  style={{ color: lightHero ? "#9A6847" : undefined }}
                >
                  {t("footer.emailLabel")}
                </p>
                <div
                  className={`inline-flex min-h-14 max-w-full items-center gap-3 rounded-full border px-5 backdrop-blur-md ${
                    lightHero
                      ? "border-[#d8c7aa]/60 bg-white/68 text-[#10172d] shadow-[0_14px_30px_-22px_rgba(61,43,22,0.62)]"
                      : "border-white/10 bg-white/[0.06] text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.03)]"
                  }`}
                  style={{ color: lightHeroInk }}
                >
                  <a
                    href={`mailto:${footerEmail}`}
                    className="truncate text-sm font-semibold md:text-base"
                  >
                    {footerEmail}
                  </a>
                  <button
                    type="button"
                    aria-label="Copy email address"
                    onClick={() => navigator.clipboard?.writeText(footerEmail)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                      lightHero
                        ? "border-[#c6ad89]/55 bg-[#f5efe3]/72 text-[#10172d] hover:bg-white"
                        : "border-white/10 bg-white/[0.04] text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <nav aria-label="Footer quick links" className="lg:pt-2">
              <h3
                className={`mb-6 text-sm font-bold uppercase tracking-[0.18em] ${
                  lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#9A6847" : undefined }}
              >
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-5">
                {footerQuickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        lightHero ? "text-[#25304a]/78 hover:text-[#9A6847]" : "text-white/[0.82] hover:text-[#4EF0FF]"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer information links" className="lg:pt-2">
              <h3
                className={`mb-6 text-sm font-bold uppercase tracking-[0.18em] ${
                  lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#9A6847" : undefined }}
              >
                {t("footer.information")}
              </h3>
              <ul className="space-y-5">
                {footerInfoLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        lightHero ? "text-[#25304a]/78 hover:text-[#9A6847]" : "text-white/[0.82] hover:text-[#4EF0FF]"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={`mt-24 border-t pt-12 ${lightHero ? "border-[#c6ad89]/40" : "border-white/10"}`}>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <p
                className={`text-sm font-semibold uppercase tracking-[0.12em] ${
                  lightHero ? "text-[#6f604f]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#6f604f" : undefined }}
              >
                {t("footer.copyright")}
              </p>

              <div className="flex items-center gap-5">
                {footerSocialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`transition-colors duration-200 ${
                      lightHero ? "text-[#25304a]/78 hover:text-[#9A6847]" : "text-white/88 hover:text-[#4EF0FF]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Chatbot */}
      <Chatbot activeMode={mode} onModeChange={setMode} lightMode={lightHero} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 left-8 md:left-10 z-40 w-[52px] h-[52px] rounded-full flex items-center justify-center border border-white/10 bg-slate-950/65 backdrop-blur-md text-white hover:text-[#4EF0FF] transition-all shadow-xl hover:scale-105"
            style={{
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px var(--theme-glow-border)",
            }}
            aria-label="Scroll to top"
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 52 52">
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--theme-primary)" />
                  <stop offset="100%" stopColor="var(--theme-secondary, #4EF0FF)" />
                </linearGradient>
              </defs>
              <circle
                cx="26"
                cy="26"
                r="22"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="26"
                cy="26"
                r="22"
                stroke="url(#progress-gradient)"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray="138.2"
                strokeDashoffset={138.2 - (scrollProgress / 100) * 138.2}
                strokeLinecap="round"
                transform="rotate(-90 26 26)"
                className="transition-all duration-100"
              />
            </svg>
            <ArrowUp className="w-5 h-5 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div >
  );
}
