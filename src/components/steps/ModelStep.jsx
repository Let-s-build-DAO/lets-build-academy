"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";

/**
 * ModelStep
 *
 * Beat 3 of 4: "Model"
 * The abstraction that explains *why* the intuition failed, taught with text/diagram.
 */
const ModelStep = ({ step, lesson, onComplete }) => {
  const [read, setRead] = useState(false);

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto px-6 py-8 pb-36 overflow-y-auto text-white">

      {/* Label */}
      <div className="mb-6">
        <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-blue-500/15 text-blue-400">
          3. The Mental Model
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-white leading-tight">
          {step.title}
        </h2>

        {/* Conceptual body text */}
        <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white max-w-none">
          {step.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Key Concepts / Takeaways */}
        {step.keyConcepts && (
          <div className="bg-[#16161f] border border-white/5 rounded-2xl p-6 mt-8 shadow-xl">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
              Core Abstractions
            </h3>
            <ul className="space-y-3">
              {step.keyConcepts.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: c.replace(/(.*?)( — |:)/, "<strong>$1</strong>$2") }} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Read confirmation */}
        <div className="pt-8">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
              read ? "bg-blue-600 border-blue-500" : "bg-white/5 border-white/20 group-hover:border-white/40"
            }`}>
              {read && <div className="w-2.5 h-2.5 rounded-sm bg-white" />}
            </div>
            <input 
              type="checkbox" 
              className="hidden" 
              checked={read} 
              onChange={(e) => setRead(e.target.checked)} 
            />
            <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
              I understand this model.
            </span>
          </label>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/90 to-transparent pt-10 pb-8 px-6 pointer-events-none">
        <div className="max-w-2xl mx-auto flex justify-end pointer-events-auto">
          <motion.button
            whileHover={read ? { scale: 1.02 } : {}}
            whileTap={read ? { scale: 0.98 } : {}}
            onClick={read ? onComplete : undefined}
            disabled={!read}
            className={`w-full h-12 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              read
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            Prove Mastery <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ModelStep;
