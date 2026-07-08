"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";

const HINT_OPENERS = [
  "Before I explain — what do you think is happening here?",
  "Interesting question. Let me ask you something first:",
  "That's a good place to be stuck. Here's a smaller question:",
  "I won't give you the answer directly, but consider this:",
];

/**
 * AtlasPanel
 *
 * The Socratic AI mentor. Slides in from the right.
 * Never gives the direct answer — always responds with a question, hint, or mental model.
 * Context-aware: knows lesson, step type, and previous exchanges.
 */
const AtlasPanel = ({ onClose, lessonTitle, stepType, stepContext, userId, lessonId, initialMessage }) => {
  const [messages, setMessages] = useState([
    {
      role: "atlas",
      content: initialMessage || `I'm Atlas. I won't solve this for you — but I'll help you think through it.\n\nWhat part of **${lessonTitle}** are you wrestling with?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/atlas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: {
            lessonTitle,
            stepType,
            stepPrompt: stepContext?.prompt || stepContext?.config?.task,
            hintLevel,
            userId,
            lessonId,
          },
        }),
      });

      if (!response.ok) throw new Error("Atlas API error");
      const data = await response.json();

      setMessages((m) => [...m, { role: "atlas", content: data.reply }]);
      if (hintLevel < 5) setHintLevel((h) => h + 1);
    } catch (err) {
      // Fallback Socratic response if API isn't set up yet
      const opener = HINT_OPENERS[Math.floor(Math.random() * HINT_OPENERS.length)];
      setMessages((m) => [
        ...m,
        {
          role: "atlas",
          content: `${opener}\n\nIf the input changes, what do you expect to happen to the output — and why?`,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      className="h-full w-full flex flex-col text-white"
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-base">
            ✦
          </div>
          <div>
            <p className="text-sm font-bold text-white">Atlas</p>
            <p className="text-xs text-gray-500">Socratic mentor</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "atlas" && (
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-xs mr-2 mt-1 shrink-0">
                ✦
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-white/5 text-gray-200 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-xs mr-2 shrink-0">
              ✦
            </div>
            <div className="bg-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Hint level indicator */}
      {hintLevel > 0 && (
        <div className="px-4 py-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600">Hint depth:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i < hintLevel ? "bg-indigo-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-6 pt-2 shrink-0 border-t border-white/5">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Atlas anything…"
            rows={2}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-end shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-700 mt-2 text-center">
          Atlas won&apos;t solve it for you — only help you think.
        </p>
      </div>
    </motion.div>
  );
};

export default AtlasPanel;
