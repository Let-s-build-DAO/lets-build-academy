"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronRight, CheckCircle2 } from "lucide-react";
import HashLiveInputWidget from "../widgets/HashLiveInputWidget";
import NonceScrubberWidget from "../widgets/NonceScrubberWidget";

const WIDGETS = {
  "hash-live-input": HashLiveInputWidget,
  "nonce-scrubber": NonceScrubberWidget,
};

/**
 * ProveStep
 *
 * Beat 4 of 4: "Prove"
 * Select the minimum patch/parameter needed to demonstrate mastery of the model.
 * Closed set of options. No free-typing.
 */
const ProveStep = ({ step, lesson, onComplete, onOpenAtlas }) => {
  const [success, setSuccess] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  const Widget = WIDGETS[step.config.widget];

  if (!Widget) {
    return <div className="p-8 text-red-500">Error: Widget &apos;{step.config.widget}&apos; not found.</div>;
  }

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => setShowReveal(true), 1000);
  };

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto w-full text-white pb-36">

      {/* Header */}
      <div className="px-6 pt-8 pb-4 shrink-0">
        <div className="mb-6 flex justify-between items-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-green-500/15 text-green-400">
            4. Prove It
          </span>
        </div>
        <h2 className="text-2xl font-extrabold leading-snug mb-2">
          {step.task}
        </h2>
        {step.context && (
          <p className="text-gray-400 text-sm leading-relaxed">
            {step.context}
          </p>
        )}
      </div>

      {/* Widget Canvas */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className={`bg-[#16161f] border rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-colors ${
          success ? "border-green-500/30" : "border-white/5"
        }`}>
          <Widget 
            config={step.config} 
            onSuccess={handleSuccess} 
            isSuccess={success} 
          />
        </div>

        {/* Reveal: Mastery Confirmed */}
        <AnimatePresence>
          {showReveal && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-6 bg-green-500/10 border border-green-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-green-400">Mastery demonstrated</h3>
              </div>
              <p className="text-green-100 text-sm leading-relaxed">
                {step.reveal || "You correctly applied the model. Lesson complete."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom action bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/90 to-transparent pt-10 pb-8 px-6 pointer-events-none">
        <div className="max-w-2xl mx-auto flex gap-3 pointer-events-auto">
          <button
            onClick={onOpenAtlas}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            title="Ask Atlas"
          >
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </button>

          <motion.button
            whileHover={showReveal ? { scale: 1.02 } : {}}
            whileTap={showReveal ? { scale: 0.98 } : {}}
            onClick={showReveal ? onComplete : undefined}
            disabled={!showReveal}
            className={`flex-1 h-12 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              showReveal
                ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {showReveal ? "Finish Lesson" : "Patch the system above"} 
            {showReveal && <ChevronRight className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProveStep;
