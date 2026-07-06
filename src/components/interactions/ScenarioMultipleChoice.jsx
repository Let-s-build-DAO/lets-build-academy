"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { announceLesson } from "../lesson/LessonPlayerShell";

const ScenarioMultipleChoice = ({ lesson, onComplete }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const {
    scenario,
    options = [],
    correctId,
    explanation,
    question = "What happens next?",
  } = lesson.interactionData || {};

  const isCorrect = selectedId === correctId;

  const handleSelect = (id) => {
    if (isRevealed) return;
    setSelectedId(id);
    setIsRevealed(true);
    announceLesson(
      id === correctId
        ? "Correct! Nice work."
        : "Not quite. Review the explanation and continue when ready."
    );
  };

  const handleContinue = () => {
    setSelectedId(null);
    setIsRevealed(false);
    setShowWhy(false);
    onComplete();
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 pb-4 max-w-3xl lg:max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
            {lesson.title}
          </h1>
          {lesson.subtitle && (
            <p className="text-sm text-purple font-semibold mb-4">{lesson.subtitle}</p>
          )}
          <p className="text-base sm:text-lg text-gray leading-relaxed max-w-2xl mx-auto">
            {scenario}
          </p>
          <p className="mt-5 text-base sm:text-lg font-semibold text-gray-900 leading-relaxed max-w-2xl mx-auto">
            {question}
          </p>
        </div>

        <div className="space-y-3" role="listbox" aria-label="Answer choices">
          {options.map((option, index) => {
            const isSelected = selectedId === option.id;
            const optionCorrect = option.id === correctId;
            const showStatus = isRevealed;

            let cardClass =
              "border-gray-200 bg-white hover:border-purple/30 hover:bg-purple/5 shadow-sm";
            let icon = null;

            if (showStatus) {
              if (optionCorrect) {
                cardClass =
                  "border-green-500 bg-green-50 shadow-md shadow-green-100";
                icon = (
                  <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" aria-hidden />
                );
              } else if (isSelected && !optionCorrect) {
                cardClass = "border-red-300 bg-red-50 opacity-80";
                icon = (
                  <XCircle className="w-6 h-6 text-red-500 shrink-0" aria-hidden />
                );
              } else {
                cardClass = "border-gray-100 bg-gray-50 opacity-50";
              }
            } else if (isSelected) {
              cardClass =
                "border-purple bg-purple/5 shadow-md shadow-purple/10";
            }

            return (
              <motion.button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(option.id)}
                disabled={isRevealed}
                className={`lesson-focus w-full min-h-[56px] text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 ${cardClass}`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm ${
                      showStatus && optionCorrect
                        ? "bg-green-600 text-white"
                        : showStatus && isSelected
                          ? "bg-red-100 text-red-600"
                          : isSelected
                            ? "bg-purple text-white"
                            : "bg-gray-100 text-gray"
                    }`}
                    aria-hidden
                  >
                    {option.id}
                  </div>
                  <span
                    className={`text-sm sm:text-base font-medium leading-relaxed ${
                      showStatus && optionCorrect
                        ? "text-green-900"
                        : "text-gray-900"
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
                {icon}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {isRevealed && showWhy && explanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-6"
            >
              <div className="p-5 sm:p-6 rounded-2xl bg-purple/5 border border-purple/10">
                <p className="text-xs font-bold text-purple uppercase tracking-widest mb-2">
                  The why
                </p>
                <p className="text-sm sm:text-base text-gray leading-relaxed">
                  {explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-5 sm:pb-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          {!isRevealed ? (
            <p className="text-center text-sm text-gray py-3">
              Tap an answer to check your reasoning
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div
                className={`inline-flex text-sm font-bold px-4 py-2 rounded-2xl ${
                  isCorrect
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
                role="status"
              >
                {isCorrect ? "Nice! ✓" : "Not quite — read why"}
              </div>
              <div className="flex gap-3">
                {explanation && (
                  <button
                    type="button"
                    onClick={() => setShowWhy(!showWhy)}
                    className="lesson-focus flex-1 min-h-[52px] py-3.5 rounded-2xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray transition-colors"
                  >
                    Why?
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleContinue}
                  className="lesson-focus flex-[2] min-h-[52px] py-3.5 rounded-2xl font-bold text-sm bg-purple hover:bg-purple/90 text-white shadow-md shadow-purple/20 transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioMultipleChoice;
