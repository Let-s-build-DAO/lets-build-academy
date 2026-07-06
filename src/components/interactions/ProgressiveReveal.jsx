"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { announceLesson } from "../lesson/LessonPlayerShell";

const ProgressiveReveal = ({ lesson, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const { steps = [] } = lesson.interactionData || {
    steps: [{ text: "<p>This lesson is loading.</p>" }],
  };

  const isLastStep = currentStep >= steps.length - 1;

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      announceLesson(`Step ${currentStep + 2} of ${steps.length}`);
    } else {
      announceLesson("Section complete. Well done.");
      onComplete();
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 pb-4 max-w-3xl lg:max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-snug">
            {lesson.title}
          </h1>
          {lesson.subtitle && (
            <p className="text-sm text-purple font-semibold">{lesson.subtitle}</p>
          )}
          <p className="mt-3 text-xs text-gray font-bold uppercase tracking-widest">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <div className="space-y-4" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-100 lesson-prose text-gray text-sm sm:text-base leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: steps[currentStep].text }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-5 sm:pb-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={handleNextStep}
            className="lesson-focus w-full min-h-[52px] py-3.5 rounded-2xl font-bold text-sm bg-purple hover:bg-purple/90 text-white shadow-md shadow-purple/20 transition-colors active:scale-[0.99]"
          >
            {isLastStep ? "Complete section" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveReveal;
