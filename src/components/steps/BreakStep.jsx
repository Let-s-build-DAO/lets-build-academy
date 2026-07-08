"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronRight, AlertTriangle } from "lucide-react";
import HashLiveInputWidget from "../widgets/HashLiveInputWidget";
import NonceScrubberWidget from "../widgets/NonceScrubberWidget";
import HashForgeWidget from "../widgets/HashForgeWidget";

const WIDGETS = {
  "hash-live-input": HashLiveInputWidget,
  "nonce-scrubber": NonceScrubberWidget,
  "hash-forge": HashForgeWidget,
};

/**
 * BreakStep
 *
 * Beat 2 of 4: "Break"
 * An interactive sandbox where the learner acts on their intuition and watches it fail.
 * They must complete the widget's success condition to continue.
 */
const BreakStep = ({ step, lesson, onComplete, onOpenAtlas }) => {
  const [success, setSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false); // Controls the reveal of "why did this fail?"

  const Widget = WIDGETS[step.config.widget];

  if (!Widget) {
    return <div className="p-8 text-red-500">Error: Widget &apos;{step.config.widget}&apos; not found.</div>;
  }

  const handleSuccess = () => {
    setSuccess(true);
    // Slight delay to let them observe the completion before opening Atlas
    setTimeout(() => {
      if (step.reveal) {
        onOpenAtlas(step.reveal);
      }
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full text-white pb-36">
      
      {/* Header */}
      <div className="px-6 pt-8 pb-4 shrink-0">
        <div className="mb-6">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-red-500/15 text-red-400">
            2. The Test
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
        <div className="bg-[#16161f] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <Widget 
            config={step.config} 
            onSuccess={handleSuccess} 
            isSuccess={success} 
          />
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/90 to-transparent pt-10 pb-8 px-6 pointer-events-none">
        <div className="max-w-2xl mx-auto flex gap-3 pointer-events-auto">
          <button
            onClick={() => onOpenAtlas()}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            title="Ask Atlas"
          >
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </button>

          <motion.button
            whileHover={success ? { scale: 1.02 } : {}}
            whileTap={success ? { scale: 0.98 } : {}}
            onClick={success ? onComplete : undefined}
            disabled={!success}
            className={`flex-1 h-12 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              success
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {success ? "Continue to next step" : "Complete the task above"} 
            {success && <ChevronRight className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BreakStep;
