"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SHA256 } from "@stablelib/sha256";
import { encode } from "@stablelib/utf8";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Fingerprint } from "lucide-react";
import { announceLesson } from "../lesson/LessonPlayerShell";

const sha = (text) => {
  const h = new SHA256();
  h.update(encode(text));
  return Array.from(h.digest())
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const shortHash = (h) => `${h.slice(0, 8)}…${h.slice(-8)}`;

const countDiffChars = (a, b) => {
  const len = Math.min(a.length, b.length);
  let n = 0;
  for (let i = 0; i < len; i++) if (a[i] !== b[i]) n++;
  return n + Math.abs(a.length - b.length);
};

/**
 * Single-screen avalanche lesson — no scroll, learn by tampering + MCQ.
 */
const HashAvalancheLab = ({ lesson, onComplete }) => {
  const data = lesson.interactionData || {};
  const original =
    data.originalText || "Transfer $100 to Alice";
  const tampered =
    data.tamperedText || "Transfer $100 to AlIce";
  const {
    question = "You change one character, then hash again. What happens?",
    options = [],
    correctId,
    explanation,
  } = data;

  const [isTampered, setIsTampered] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const activeText = isTampered ? tampered : original;
  const hashOriginal = useMemo(() => sha(original), [original]);
  const hashActive = useMemo(() => sha(activeText), [activeText]);
  const diffCount = isTampered ? countDiffChars(hashOriginal, hashActive) : 0;

  const isCorrect = selectedId === correctId;

  const handleCheck = () => {
    if (!selectedId) return;
    setChecked(true);
    announceLesson(isCorrect ? "Correct!" : "Not quite — read why.");
  };

  const handleTamper = () => {
    if (!isTampered) {
      setIsTampered(true);
      announceLesson(
        "Fingerprint changed completely. One letter, entirely new hash."
      );
    } else {
      setIsTampered(false);
      setChecked(false);
      setSelectedId(null);
      setShowWhy(false);
    }
  };

  return (
    <div className="h-full max-h-full flex flex-col overflow-hidden px-4 sm:px-6 lg:px-8 pt-2 pb-0">
      {/* Header — compact */}
      <div className="shrink-0 text-center mb-3 sm:mb-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-purple font-semibold mt-0.5">
          {lesson.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-gray mt-2 max-w-lg mx-auto leading-snug">
          Prove a document wasn&apos;t altered—without sending the file. Send only its{" "}
          <strong className="text-purple">hash</strong> (fingerprint).
        </p>
      </div>

      {/* Live demo — fits without scroll */}
      <div className="shrink-0 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3 items-stretch mb-3 sm:mb-4">
        <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-3 sm:p-4">
          <p className="text-[10px] font-bold text-gray uppercase tracking-wider mb-1">
            Document
          </p>
          <p className="font-mono text-xs sm:text-sm text-gray-900 break-all leading-snug">
            {activeText}
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center text-purple">
          <Fingerprint className="w-5 h-5" aria-hidden />
          <span className="text-[10px] font-bold mt-1">SHA-256</span>
        </div>

        <div
          className={`rounded-xl border-2 p-3 sm:p-4 transition-colors duration-500 ${
            isTampered
              ? "border-purple bg-purple/5"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <p className="text-[10px] font-bold text-gray uppercase tracking-wider mb-1">
            Fingerprint
          </p>
          <p
            className={`font-mono text-xs sm:text-sm break-all leading-snug transition-colors ${
              isTampered ? "text-purple font-bold" : "text-gray-600"
            }`}
          >
            {shortHash(hashActive)}
          </p>
          <AnimatePresence>
            {isTampered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-[10px] sm:text-xs text-purple font-bold mt-2"
              >
                {diffCount} of 64 hex characters changed — from 1 letter edit
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="shrink-0 flex justify-center mb-3 sm:mb-4">
        <button
          type="button"
          onClick={handleTamper}
          className="lesson-focus min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-bold bg-purple text-white hover:bg-purple/90 shadow-md shadow-purple/20 transition-colors"
        >
          {isTampered ? "↩ Restore original" : "✎ Tamper one letter"}
        </button>
      </div>

      {/* Question + options — compact */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <p className="text-sm font-semibold text-gray-900 text-center mb-2 leading-snug shrink-0">
          {question}
        </p>

        <div className="flex-1 min-h-0 overflow-y-auto lesson-scrollbar space-y-2 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-2 sm:overflow-visible">
          {options.map((opt) => {
            const selected = selectedId === opt.id;
            const showResult = checked;
            const isOptCorrect = opt.id === correctId;

            let cls =
              "border-gray-200 bg-white hover:border-purple/30 hover:bg-purple/5";
            if (showResult && isOptCorrect)
              cls = "border-green-500 bg-green-50";
            else if (showResult && selected && !isOptCorrect)
              cls = "border-red-300 bg-red-50 opacity-80";
            else if (selected) cls = "border-purple bg-purple/5";

            return (
              <button
                key={opt.id}
                type="button"
                disabled={checked}
                onClick={() => setSelectedId(opt.id)}
                className={`lesson-focus w-full min-h-[44px] text-left px-3 py-2.5 sm:py-3 rounded-xl border-2 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${cls}`}
              >
                <span
                  className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold ${
                    showResult && isOptCorrect
                      ? "bg-green-600 text-white"
                      : selected
                        ? "bg-purple text-white"
                        : "bg-gray-100 text-gray"
                  }`}
                >
                  {opt.id}
                </span>
                <span className="text-gray-900 leading-snug">{opt.text}</span>
                {showResult && isOptCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto shrink-0" />
                )}
                {showResult && selected && !isOptCorrect && (
                  <XCircle className="w-4 h-4 text-red-500 ml-auto shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {checked && showWhy && explanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="shrink-0 mt-2 p-3 rounded-xl bg-purple/5 border border-purple/10 text-xs text-gray leading-relaxed overflow-hidden"
            >
              {explanation}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 pt-3 pb-4 sm:pb-5 border-t border-gray-100 mt-2">
        {!checked ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={!selectedId || !isTampered}
            className={`lesson-focus w-full min-h-[48px] rounded-xl font-bold text-sm transition-all ${
              !selectedId || !isTampered
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple text-white hover:bg-purple/90 shadow-md shadow-purple/20"
            }`}
          >
            {!isTampered
              ? "Tamper the document first"
              : !selectedId
                ? "Pick an answer"
                : "Check"}
          </button>
        ) : (
          <div className="space-y-2">
            <div
              className={`inline-flex text-xs font-bold px-3 py-1.5 rounded-xl ${
                isCorrect
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              {isCorrect ? "Nice! ✓" : "Not quite"}
            </div>
            <div className="flex gap-2">
              {explanation && (
                <button
                  type="button"
                  onClick={() => setShowWhy(!showWhy)}
                  className="lesson-focus flex-1 min-h-[48px] rounded-xl font-bold text-sm bg-gray-100 text-gray hover:bg-gray-200"
                >
                  Why?
                </button>
              )}
              <button
                type="button"
                onClick={onComplete}
                className="lesson-focus flex-[2] min-h-[48px] rounded-xl font-bold text-sm bg-purple text-white hover:bg-purple/90"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HashAvalancheLab;
