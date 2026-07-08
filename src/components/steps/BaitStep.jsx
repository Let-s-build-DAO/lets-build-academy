"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ChevronRight } from "lucide-react";

/**
 * BaitStep
 *
 * Beat 1 of 4: "Bait"
 * Presents a concrete scenario where the naive/intuitive answer feels obviously right.
 * The learner must commit to a prediction (via toggle or options) before continuing.
 */
const BaitStep = ({ step, lesson, onComplete, onOpenAtlas }) => {
  const [response, setResponse] = useState(null);
  const [committed, setCommitted] = useState(false);

  const canCommit = response !== null;

  const handleCommit = () => {
    if (!canCommit) return;
    setCommitted(true);
  };

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto px-6 py-8 pb-36 overflow-y-auto text-white">
      {/* Label */}
      <div className="mb-6">
        <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-amber-500/15 text-amber-400">
          1. The Setup
        </span>
      </div>

      {/* Scenario & Question */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 space-y-4"
      >
        <h2 className="text-2xl font-extrabold leading-snug">
          {step.scenario}
        </h2>
        {step.context && (
          <p className="text-gray-400 text-base leading-relaxed">
            {step.context}
          </p>
        )}
      </motion.div>

      {/* Predictor Widget */}
      {!committed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 space-y-4"
        >
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">
            Make your prediction:
          </p>
          
          <div className="space-y-3">
            {step.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setResponse(opt)}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${
                  response === opt
                    ? "bg-amber-600/20 border-amber-500/50 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "bg-[#16161f] border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Committed state */
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 flex-1"
        >
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your prediction</p>
            <p className="text-white font-medium text-lg">{response}</p>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 mt-4">
            <p className="text-amber-200 text-sm leading-relaxed">
              You&apos;ve locked in your answer. Let&apos;s test it in the sandbox.
            </p>
          </div>
        </motion.div>
      )}

      {/* Bottom action bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/90 to-transparent pt-10 pb-8 px-6">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={onOpenAtlas}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            title="Ask Atlas"
          >
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </button>

          {!committed ? (
            <motion.button
              whileHover={canCommit ? { scale: 1.02 } : {}}
              whileTap={canCommit ? { scale: 0.98 } : {}}
              onClick={handleCommit}
              disabled={!canCommit}
              className={`flex-1 h-12 rounded-2xl font-bold text-base transition-all duration-200 ${
                canCommit
                  ? "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              Lock Prediction
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="flex-1 h-12 rounded-2xl font-bold text-base bg-white hover:bg-gray-100 text-black shadow-lg shadow-white/10 transition-colors flex items-center justify-center gap-2"
            >
              Test it live <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaitStep;
