"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ChevronRight } from "lucide-react";
import { announceLesson } from "../lesson/LessonPlayerShell";

const LogicPuzzle = ({ puzzle, onSolve, dark = false }) => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const shell = dark
    ? "bg-[#18181f] border-white/[0.06]"
    : "bg-white border-gray-100";

  const handleCheck = () => {
    if (selected === null) return;

    const correct = selected === puzzle.correctIndex;
    setIsCorrect(correct);
    setShowExplanation(true);
    announceLesson(correct ? "Correct!" : "Not quite. Read the explanation.");
  };

  return (
    <div
      className={`w-full rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border shadow-2xl relative overflow-hidden ${shell}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 ${dark ? "bg-purple/50" : "bg-purple opacity-50"}`}
      />

      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div>
          <h3
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}
          >
            Conceptual Challenge
          </h3>
          <p
            className={`font-medium text-sm mt-1 ${dark ? "text-gray-500" : "text-gray-400"}`}
          >
            Select the most logically sound answer.
          </p>
        </div>
        <div
          className={`w-12 h-12 border rounded-2xl flex items-center justify-center ${dark ? "bg-purple/10 border-purple/20" : "bg-purple/5 border-purple/10"}`}
        >
          <HelpCircle className="text-purple w-6 h-6" aria-hidden />
        </div>
      </div>

      <div className="space-y-6">
        <div
          className={`p-6 sm:p-8 rounded-2xl border relative ${dark ? "bg-[#0f0f14] border-white/[0.04]" : "bg-gray-50/50 border-gray-100"}`}
        >
          <p
            className={`text-base sm:text-lg font-semibold leading-relaxed ${dark ? "text-gray-200" : "text-gray-800"}`}
          >
            {puzzle.question}
          </p>
        </div>

        <div className="grid gap-3" role="radiogroup" aria-label="Answer options">
          {puzzle.options.map((option, idx) => {
            const isSelected = selected === idx;
            let optClass = dark
              ? "border-white/[0.06] bg-[#141418] hover:border-white/10 text-gray-300"
              : "border-gray-100 hover:border-purple/20 text-gray-500";

            if (isSelected) {
              if (isCorrect === true) {
                optClass = dark
                  ? "border-emerald-600/50 bg-emerald-950/30 text-emerald-100"
                  : "border-green-500 bg-green-50/50 text-green-700";
              } else if (isCorrect === false) {
                optClass = dark
                  ? "border-red-800/40 bg-red-950/20 text-red-200"
                  : "border-red-500 bg-red-50/50 text-red-700";
              } else {
                optClass = dark
                  ? "border-purple-500/50 bg-purple-950/20 text-white"
                  : "border-purple bg-purple/5 text-purple";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => {
                  if (isCorrect !== true) {
                    setSelected(idx);
                    setIsCorrect(null);
                    setShowExplanation(false);
                  }
                }}
                className={`lesson-focus w-full min-h-[52px] text-left p-4 sm:p-5 rounded-2xl border-2 transition-all font-medium text-sm ${optClass}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex-1">{option}</span>
                  {isSelected && isCorrect === true && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isSelected && isCorrect === false && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div
            className={`p-5 rounded-2xl border ${isCorrect ? (dark ? "bg-emerald-950/20 border-emerald-800/30" : "bg-green-50 border-green-200") : dark ? "bg-red-950/20 border-red-800/30" : "bg-red-50 border-red-200"}`}
            role="status"
          >
            <p
              className={`text-sm leading-relaxed ${isCorrect ? (dark ? "text-emerald-200" : "text-green-700") : dark ? "text-red-200" : "text-red-700"}`}
            >
              {puzzle.explanation}
            </p>
          </div>
        )}

        {!showExplanation ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={selected === null}
            className={`lesson-focus w-full min-h-[52px] py-4 rounded-2xl font-bold text-base transition-all ${
              selected === null
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple hover:bg-purple/90 text-white shadow-md shadow-purple/20"
            }`}
          >
            Check
          </button>
        ) : (
          <div className="space-y-3">
            <div
              className={`inline-flex text-sm font-bold px-4 py-2 rounded-2xl ${
                isCorrect
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-900/50 text-amber-200"
              }`}
            >
              {isCorrect ? "Nice! ✓" : "Not quite"}
            </div>
            <button
              type="button"
              onClick={() => isCorrect && onSolve?.()}
              disabled={!isCorrect}
              className={`lesson-focus w-full min-h-[52px] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors ${
                isCorrect
                  ? "bg-purple hover:bg-purple/90 text-white shadow-md shadow-purple/20"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue <ChevronRight className="w-4 h-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogicPuzzle;
