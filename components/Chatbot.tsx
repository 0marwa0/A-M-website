"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export default function Chatbot() {
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when component mounts or locale changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: t("chatbot.welcome"),
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [locale]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botText = t("chatbot.responses.default");
      const cleanText = text.toLowerCase();

      // Check keywords for matching responses (English and Arabic)
      if (
        cleanText.includes("service") ||
        cleanText.includes("offer") ||
        cleanText.includes("what do you do") ||
        cleanText.includes("خدمة") ||
        cleanText.includes("خدمات") ||
        cleanText.includes("شغل") ||
        cleanText.includes("تقدم")
      ) {
        botText = t("chatbot.responses.q1");
      } else if (
        cleanText.includes("time") ||
        cleanText.includes("duration") ||
        cleanText.includes("how long") ||
        cleanText.includes("integrate") ||
        cleanText.includes("integration") ||
        cleanText.includes("وقت") ||
        cleanText.includes("مدة") ||
        cleanText.includes("تستغرق") ||
        cleanText.includes("دمج") ||
        cleanText.includes("تكامل")
      ) {
        botText = t("chatbot.responses.q2");
      } else if (
        cleanText.includes("contact") ||
        cleanText.includes("email") ||
        cleanText.includes("phone") ||
        cleanText.includes("reach") ||
        cleanText.includes("touch") ||
        cleanText.includes("تواصل") ||
        cleanText.includes("اتصال") ||
        cleanText.includes("بريد") ||
        cleanText.includes("ايميل") ||
        cleanText.includes("رقم")
      ) {
        botText = t("chatbot.responses.q3");
      } else if (
        cleanText.includes("price") ||
        cleanText.includes("pricing") ||
        cleanText.includes("cost") ||
        cleanText.includes("how much") ||
        cleanText.includes("سعر") ||
        cleanText.includes("أسعار") ||
        cleanText.includes("اسعار") ||
        cleanText.includes("تكلفة") ||
        cleanText.includes("بكم")
      ) {
        botText = t("chatbot.responses.q4");
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const isRtl = locale === "ar";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[90vw] sm:w-[400px] h-[75vh] max-h-[580px] min-h-[400px] p-[1px] bg-gradient-to-tr from-[#E44CFF]/30 via-white/10 to-[#4EF0FF]/30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(79,70,229,0.25)] mb-4"
          >
            <div
              className="w-full h-full bg-[#060816]/95 backdrop-blur-2xl flex flex-col rounded-2xl overflow-hidden"
              dir={isRtl ? "rtl" : "ltr"}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#E44CFF] via-[#8B5CF6] to-[#5861F2] flex items-center justify-center shadow-[0_0_15px_rgba(228,76,255,0.35)]">
                    <Bot className="w-5 h-5 text-white" />
                    <span
                      className={`absolute bottom-0 ${
                        isRtl ? "left-0" : "right-0"
                      } w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#060816]`}
                    >
                      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1">
                      {t("chatbot.title")}
                    </h3>
                    <p className="text-[10px] text-white/50 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {t("chatbot.status")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-sm shadow-md leading-relaxed whitespace-pre-wrap transition-all duration-300 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-[#E44CFF] via-[#8B5CF6] to-[#5861F2] text-white rounded-2xl rounded-tr-none hover:shadow-[0_0_15px_rgba(228,76,255,0.2)]"
                          : "bg-white/[0.03] border border-white/10 text-white/90 rounded-2xl rounded-tl-none hover:border-white/20"
                      } ${
                        isRtl
                          ? msg.sender === "user"
                            ? "rounded-tr-none rounded-tl-2xl text-right"
                            : "rounded-tl-none rounded-tr-2xl text-right"
                          : ""
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-white/30 mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start"
                  >
                    <div
                      className={`flex items-center gap-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none shadow-sm ${
                        isRtl ? "rounded-tl-none rounded-tr-2xl" : ""
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="px-4 py-2 bg-white/[0.01] border-t border-white/[0.05] overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none py-3">
                <button
                  onClick={() => handleSend(t("chatbot.quickQuestions.q1"))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/80 hover:text-white hover:border-[#4EF0FF]/50 hover:bg-gradient-to-r hover:from-[#4EF0FF]/10 hover:to-[#5861F2]/10 hover:shadow-[0_0_15px_rgba(78,240,255,0.15)] transition-all duration-300 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#4EF0FF]" />
                  {t("chatbot.quickQuestions.q1")}
                </button>
                <button
                  onClick={() => handleSend(t("chatbot.quickQuestions.q2"))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/80 hover:text-white hover:border-[#E44CFF]/50 hover:bg-gradient-to-r hover:from-[#E44CFF]/10 hover:to-[#8B5CF6]/10 hover:shadow-[0_0_15px_rgba(228,76,255,0.15)] transition-all duration-300 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E44CFF]" />
                  {t("chatbot.quickQuestions.q2")}
                </button>
                <button
                  onClick={() => handleSend(t("chatbot.quickQuestions.q3"))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/80 hover:text-white hover:border-[#4EF0FF]/50 hover:bg-gradient-to-r hover:from-[#4EF0FF]/10 hover:to-[#5861F2]/10 hover:shadow-[0_0_15px_rgba(78,240,255,0.15)] transition-all duration-300 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#4EF0FF]" />
                  {t("chatbot.quickQuestions.q3")}
                </button>
                <button
                  onClick={() => handleSend(t("chatbot.quickQuestions.q4"))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/80 hover:text-white hover:border-[#E44CFF]/50 hover:bg-gradient-to-r hover:from-[#E44CFF]/10 hover:to-[#8B5CF6]/10 hover:shadow-[0_0_15px_rgba(228,76,255,0.15)] transition-all duration-300 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E44CFF]" />
                  {t("chatbot.quickQuestions.q4")}
                </button>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t("chatbot.inputPlaceholder")}
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5861F2] focus:ring-1 focus:ring-[#5861F2] focus:shadow-[0_0_15px_rgba(88,97,242,0.25)] transition-all duration-300"
                />
                <button
                  type="submit"
                  className="group w-10 h-10 rounded-xl bg-gradient-to-r from-[#E44CFF] to-[#5861F2] flex items-center justify-center text-white shrink-0 hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(228,76,255,0.4)] transition-all duration-300 shadow-[0_0_10px_rgba(228,76,255,0.2)] cursor-pointer"
                >
                  <Send
                    className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isRtl ? "rotate-180 group-hover:-translate-x-0.5" : ""
                    }`}
                  />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#E44CFF] to-[#5861F2] flex items-center justify-center text-white shadow-[0_0_25px_rgba(228,76,255,0.45)] hover:shadow-[0_0_35px_rgba(228,76,255,0.65)] transition-all duration-300 cursor-pointer border border-white/20 z-10"
      >
        {/* Pulsing ring behind button */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E44CFF] to-[#5861F2] opacity-40 animate-ping pointer-events-none scale-105" />
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
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
