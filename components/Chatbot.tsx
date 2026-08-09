"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, Sparkles, Zap, Scale, Target, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Meteors } from "@/components/ui/meteors";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

interface ChatApiResponse {
  reply: string;
  intent: string;
  shouldCaptureLead: boolean;
}

export type PersonaMode = "creative" | "balanced" | "precise";

interface ChatbotProps {
  activeMode?: PersonaMode;
  onModeChange?: (mode: PersonaMode) => void;
  lightMode?: boolean;
}

export default function Chatbot({ activeMode, onModeChange, lightMode = false }: ChatbotProps = {}) {
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [localMode, setLocalMode] = useState<PersonaMode>("balanced");
  
  const mode = activeMode !== undefined ? activeMode : localMode;
  const setMode = onModeChange !== undefined ? onModeChange : setLocalMode;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get active theme tokens according to the selected mode
  const getThemeColors = (activeMode: PersonaMode) => {
    if (lightMode) {
      return {
        gradient: "from-[#101b39] via-[#213c67] to-[#9A6847]",
        border: "border-[#d8c7aa]/70",
        text: "text-[#9A6847]",
        bgGlow: "rgba(154, 104, 71, 0.18)",
        avatarBg: "from-[#101b39] via-[#213c67] to-[#9A6847]",
        shadow: "shadow-[0_24px_58px_-30px_rgba(61,43,22,0.62)]",
        glowColor: "#9A6847",
        buttonHover: "hover:border-[#9A6847]/45 hover:bg-white/80",
        userBubble: "bg-gradient-to-r from-[#101b39] to-[#213c67] text-white rounded-2xl rounded-tr-none",
        activePulse: "bg-[#9A6847]",
      };
    }

    switch (activeMode) {
      case "creative":
        return {
          gradient: "from-[#E44CFF] via-[#9F56FF] to-[#7B4CFF]",
          border: "border-[#E44CFF]/30",
          text: "text-[#E44CFF]",
          bgGlow: "rgba(228, 76, 255, 0.15)",
          avatarBg: "from-[#E44CFF] to-[#7B4CFF]",
          shadow: "shadow-[0_20px_50px_rgba(228,76,255,0.25)]",
          glowColor: "#E44CFF",
          buttonHover: "hover:border-[#E44CFF]/40 hover:bg-[#E44CFF]/5",
          userBubble: "bg-gradient-to-r from-[#E44CFF] to-[#7B4CFF] text-white rounded-2xl rounded-tr-none",
          activePulse: "bg-[#E44CFF]",
        };
      case "precise":
        return {
          gradient: "from-[#4EF0FF] via-[#2EDAA2] to-[#10B981]",
          border: "border-[#4EF0FF]/30",
          text: "text-[#4EF0FF]",
          bgGlow: "rgba(78, 240, 255, 0.15)",
          avatarBg: "from-[#4EF0FF] to-[#10B981]",
          shadow: "shadow-[0_20px_50px_rgba(78,240,255,0.25)]",
          glowColor: "#4EF0FF",
          buttonHover: "hover:border-[#4EF0FF]/40 hover:bg-[#4EF0FF]/5",
          userBubble: "bg-gradient-to-r from-[#4EF0FF] to-[#10B981] text-white rounded-2xl rounded-tr-none",
          activePulse: "bg-[#4EF0FF]",
        };
      case "balanced":
      default:
        return {
          gradient: "from-[#E44CFF] to-[#5861F2]",
          border: "border-white/10",
          text: "text-[#5861F2]",
          bgGlow: "rgba(88, 97, 242, 0.15)",
          avatarBg: "from-[#E44CFF] to-[#5861F2]",
          shadow: "shadow-[0_20px_50px_rgba(79,70,229,0.15)]",
          glowColor: "#5861F2",
          buttonHover: "hover:border-[#5861F2]/40 hover:bg-[#5861F2]/5",
          userBubble: "bg-gradient-to-r from-[#E44CFF] to-[#5861F2] text-white rounded-2xl rounded-tr-none",
          activePulse: "bg-green-500",
        };
    }
  };

  const theme = getThemeColors(mode);
  const isRtl = locale === "ar";
  const windowClassName = lightMode
    ? "border-[#d8c7aa]/70 bg-[#f7f3ea]/94 text-[#10172d] shadow-[0_24px_58px_-30px_rgba(61,43,22,0.62)]"
    : `${theme.border} bg-[#060816]/90 ${theme.shadow}`;
  const gridClassName = lightMode
    ? "bg-[linear-gradient(to_right,rgba(20,33,67,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,33,67,0.045)_1px,transparent_1px)]"
    : "bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]";
  const headerClassName = lightMode
    ? "border-[#d8c7aa]/60 bg-white/52"
    : "border-white/10 bg-white/[0.03]";
  const stripClassName = lightMode
    ? "border-[#d8c7aa]/50 bg-[#fbf8f1]/66"
    : "border-white/[0.08] bg-white/[0.01]";
  const titleTextClassName = lightMode ? "text-[#10172d]" : "text-white";
  const mutedTextClassName = lightMode ? "text-[#25304a]/62" : "text-white/50";
  const faintTextClassName = lightMode ? "text-[#25304a]/45" : "text-white/40";
  const botBubbleClassName = lightMode
    ? "bg-white/72 border border-[#d8c7aa]/65 backdrop-blur-md text-[#10172d] rounded-2xl rounded-tl-none"
    : "bg-white/[0.04] border border-white/10 backdrop-blur-md text-white/90 rounded-2xl rounded-tl-none";
  const userAvatarClassName = lightMode
    ? "bg-[#fbf8f1]/82 border border-[#d8c7aa]/70 text-[#10172d]"
    : "bg-white/10 border border-white/20 text-white/80";
  const historyClassName = lightMode
    ? "scrollbar-thumb-[#c6ad89]/45"
    : "scrollbar-thumb-white/10";
  const quickChipClassName = lightMode
    ? "border-[#d8c7aa]/60 bg-white/58 text-[#25304a]/78 hover:border-[#9A6847]/45 hover:bg-white/85 hover:text-[#10172d]"
    : `border-white/10 bg-white/5 text-white/70 hover:text-white ${theme.buttonHover}`;
  const inputPromptClassName = lightMode ? "text-[#25304a]/45" : "text-white/30";
  const inputClassName = lightMode
    ? "bg-[#fbf8f1]/82 border-[#d8c7aa]/65 text-[#10172d] placeholder:text-[#25304a]/45 focus:bg-white/72"
    : "bg-white/5 border-white/10 text-white placeholder-white/30 focus:bg-white/[0.07]";
  const lightInputStyle = lightMode
    ? {
        color: "#10172d",
        WebkitTextFillColor: "#10172d",
        caretColor: "#10172d",
      }
    : undefined;

  // Hide the floating tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize/Reset welcome message when component mounts, locale changes, or mode changes
  useEffect(() => {
    const welcomeKey =
      mode === "creative"
        ? "chatbot.welcomeCreative"
        : mode === "precise"
        ? "chatbot.welcomePrecise"
        : "chatbot.welcomeBalanced";

    setMessages([
      {
        id: `welcome-${mode}-${locale}`,
        text: t(welcomeKey) || t("chatbot.welcome"),
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [locale, mode, t]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);


  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          mode,
          locale,
          history: nextMessages.map((message) => ({
            sender: message.sender,
            text: message.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat API request failed");
      }

      const data = (await response.json()) as ChatApiResponse;
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: data.reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const fallbackMessage: Message = {
        id: `bot-error-${Date.now()}`,
        text:
          locale === "ar"
            ? "حدثت مشكلة مؤقتة في المساعد. يمكنك التواصل معنا مباشرة عبر info@trimindesai.com أو نموذج التواصل في الصفحة."
            : "I ran into a temporary issue. You can contact the team directly at info@trimindesai.com or through the contact form on this page.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 35 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-[90vw] sm:w-[420px] h-[80vh] max-h-[640px] min-h-[450px] rounded-3xl border backdrop-blur-2xl flex flex-col overflow-hidden mb-5 ${windowClassName}`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            {/* Cyber Glow Aura behind chat window */}
            <div
              className="absolute inset-0 -z-20 opacity-20 filter blur-[40px] transition-all duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${theme.glowColor} 0%, transparent 70%)`,
              }}
            />

            {/* Cyber Grid Background */}
            <div className={`absolute inset-0 -z-10 bg-[size:20px_20px] pointer-events-none ${lightMode ? "opacity-70" : "opacity-40"} ${gridClassName}`} />

            {/* Meteor background inside chat window */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <Meteors number={12} className={lightMode ? "opacity-10" : "opacity-20"} />
            </div>

            {/* Header */}
            <div className={`p-4 border-b flex items-center justify-between relative ${headerClassName}`}>
              <div className="flex items-center gap-3">
                {/* Glowing Avatar */}
                <div
                  className={`relative w-11 h-11 rounded-full bg-gradient-to-tr ${theme.avatarBg} flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ scale: 0.6, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.6, opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      {mode === "creative" && <Zap className="w-5 h-5 text-white" />}
                      {mode === "balanced" && <Bot className="w-5 h-5 text-white" />}
                      {mode === "precise" && <Target className="w-5 h-5 text-white" />}
                    </motion.div>
                  </AnimatePresence>
                  {/* Pulse Dot */}
                  <span
                    className={`absolute bottom-0 ${
                      isRtl ? "left-0" : "right-0"
                    } w-3 h-3 rounded-full ${theme.activePulse} border-2 transition-colors duration-500 ${
                      lightMode ? "border-[#f7f3ea]" : "border-[#060816]"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 ${
                      isRtl ? "left-0" : "right-0"
                    } w-3 h-3 rounded-full ${theme.activePulse} border-2 animate-ping opacity-75 ${
                      lightMode ? "border-[#f7f3ea]" : "border-[#060816]"
                    }`}
                  />
                </div>
                <div>
                  <h3 className={`text-sm font-bold tracking-wide flex items-center gap-1.5 ${titleTextClassName}`}>
                    {t("chatbot.title")}
                  </h3>
                  <p className={`text-[10px] flex items-center gap-1.5 font-medium mt-0.5 ${mutedTextClassName}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${theme.activePulse} transition-colors duration-500`} />
                    {t("chatbot.status")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center hover:rotate-90 transition-all duration-300 ${
                  lightMode
                    ? "border-[#c6ad89]/55 bg-white/58 text-[#25304a]/72 hover:bg-white hover:text-[#10172d]"
                    : "border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Persona Switcher Tab Row */}
            <div className={`px-4 py-2 border-b flex items-center justify-between gap-2 shrink-0 ${stripClassName}`}>
              <span className={`text-[10px] uppercase font-bold tracking-wider ${faintTextClassName}`}>
                {t("chatbot.modes.title")}
              </span>
              <div
                className={`flex rounded-xl p-1 border relative ${
                  lightMode ? "border-[#d8c7aa]/45 bg-white/58" : "border-white/5 bg-white/[0.04]"
                }`}
              >
                {(["creative", "balanced", "precise"] as const).map((m) => {
                  const isActive = mode === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`relative z-10 px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all duration-300 flex items-center gap-1 capitalize ${
                        isActive
                          ? "text-white shadow-sm"
                          : lightMode
                          ? "text-[#25304a]/55 hover:text-[#10172d]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {m === "creative" && <Zap className="w-3 h-3 text-[#E44CFF]" />}
                      {m === "balanced" && <Scale className="w-3 h-3 text-[#5861F2]" />}
                      {m === "precise" && <Target className="w-3 h-3 text-[#4EF0FF]" />}
                      <span>{t(`chatbot.modes.${m}`)}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeModeIndicator"
                          className={`absolute inset-0 -z-10 rounded-lg bg-gradient-to-r ${getThemeColors(m).gradient}`}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message History */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent ${historyClassName}`}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2.5`}
                    >
                      {/* Avatar for Bot */}
                      {!isUser && (
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-tr ${theme.avatarBg} flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.05)] shrink-0 mt-0.5`}
                        >
                          {mode === "creative" && <Zap className="w-3.5 h-3.5 text-white" />}
                          {mode === "balanced" && <Bot className="w-3.5 h-3.5 text-white" />}
                          {mode === "precise" && <Target className="w-3.5 h-3.5 text-white" />}
                        </div>
                      )}

                      {/* Text Bubble */}
                      <div className="flex flex-col max-w-[78%]">
                        <div
                          className={`px-4 py-2.5 text-sm shadow-md leading-relaxed whitespace-pre-wrap ${
                            isUser
                              ? theme.userBubble
                              : botBubbleClassName
                          } ${
                            isRtl
                              ? isUser
                                ? "rounded-tr-none rounded-tl-2xl text-right"
                                : "rounded-tl-none rounded-tr-2xl text-right"
                              : isUser
                              ? "rounded-tr-none rounded-tl-2xl"
                              : "rounded-tl-none rounded-tr-2xl"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span
                          className={`text-[9px] mt-1 px-1 ${isUser ? "text-right" : "text-left"} ${
                            lightMode ? "text-[#25304a]/42" : "text-white/30"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Avatar for User */}
                      {isUser && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${userAvatarClassName}`}>
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-start gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-tr ${theme.avatarBg} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    {mode === "creative" && <Zap className="w-3.5 h-3.5 text-white" />}
                    {mode === "balanced" && <Bot className="w-3.5 h-3.5 text-white" />}
                    {mode === "precise" && <Target className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`flex items-center gap-1.5 px-4 py-3.5 border rounded-2xl rounded-tl-none shadow-sm ${
                        lightMode ? "border-[#d8c7aa]/65 bg-white/72" : "border-white/10 bg-white/[0.04]"
                      } ${
                        isRtl ? "rounded-tl-none rounded-tr-2xl" : ""
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${lightMode ? "bg-[#9A6847]/70" : "bg-white/50"}`} style={{ animationDelay: "0ms" }} />
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${lightMode ? "bg-[#9A6847]/70" : "bg-white/50"}`} style={{ animationDelay: "150ms" }} />
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${lightMode ? "bg-[#9A6847]/70" : "bg-white/50"}`} style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Chips */}
            <div
              className={`px-4 py-2.5 border-t overflow-x-auto whitespace-nowrap flex gap-2 shrink-0 py-3 scrollbar-none ${
                lightMode ? "border-[#d8c7aa]/45 bg-[#fbf8f1]/58" : "border-white/[0.06] bg-white/[0.01]"
              }`}
            >
              {(["q1", "q2", "q3", "q4"] as const).map((qKey) => (
                <button
                  key={qKey}
                  onClick={() => handleSend(t(`chatbot.quickQuestions.${qKey}`))}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs transition-all duration-300 ${quickChipClassName}`}
                >
                  <Sparkles className={`w-3 h-3 shrink-0 ${lightMode ? "text-[#9A6847]" : "text-[#4EF0FF]"}`} />
                  <span>{t(`chatbot.quickQuestions.${qKey}`)}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className={`p-3 border-t flex items-center gap-2 ${
                lightMode ? "border-[#d8c7aa]/55 bg-white/52" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex-1 relative flex items-center">
                <span className={`absolute left-3 text-xs font-mono select-none pointer-events-none ${inputPromptClassName}`}>
                  {isRtl ? "" : ">"}
                </span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t("chatbot.inputPlaceholder")}
                  className={`w-full border rounded-xl ${
                    isRtl ? "px-4" : "pl-7 pr-4"
                  } py-2.5 text-sm focus:outline-none transition-all duration-300 ${inputClassName}`}
                  style={{
                    borderColor: inputValue.trim() ? theme.glowColor : undefined,
                    boxShadow: inputValue.trim() ? `0 0 10px ${theme.glowColor}20` : undefined,
                    ...lightInputStyle,
                  }}
                />
                {isRtl && (
                  <span className={`absolute right-3 text-xs font-mono select-none pointer-events-none ${inputPromptClassName}`}>
                    {"<"}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className={`w-10 h-10 rounded-xl bg-gradient-to-r ${theme.gradient} flex items-center justify-center text-white shrink-0 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(228,76,255,0.2)]`}
              >
                <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Tooltip Invite */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute bottom-16 mb-2 ${
              isRtl ? "left-0" : "right-0"
            } whitespace-nowrap bg-gradient-to-r ${theme.gradient} text-white text-xs font-semibold py-2 px-4 rounded-2xl shadow-lg border border-white/20 select-none z-[999] cursor-pointer`}
            style={{
              boxShadow: lightMode ? "0 14px 30px -18px rgba(61,43,22,0.72)" : undefined,
            }}
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{isRtl ? "أهلاً بك! كيف يمكنني مساعدتك؟" : "Hi! How can I help you today?"}</span>
            </div>
            {/* Tiny Arrow */}
            <div
              className={`absolute bottom-[-5px] ${isRtl ? "left-6" : "right-6"} w-2.5 h-2.5 rotate-45 border-r border-b border-white/20 ${
                lightMode ? "bg-[#213c67]" : "bg-[#7B4CFF]"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full bg-gradient-to-r ${theme.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-500 cursor-pointer border relative overflow-hidden ${
          lightMode ? "border-[#d8c7aa]/70" : "border-white/20"
        }`}
        style={{
          boxShadow: lightMode
            ? "0 16px 34px -18px rgba(61,43,22,0.82), 0 0 18px rgba(154,104,71,0.26)"
            : `0 0 25px ${theme.glowColor}60`,
        }}
      >
        {/* Pulsing ring around the button */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-25 scale-75" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
