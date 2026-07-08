"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SHA256 } from "@stablelib/sha256";
import { encode } from "@stablelib/utf8";

// ── SHA-256 helper ───────────────────────────────────────────────────────
const sha256 = (text) => {
  const h = new SHA256();
  h.update(encode(text));
  return Array.from(h.digest())
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Count differing hex characters between two equal-length hashes
const countDiffs = (a, b) => {
  let n = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) n++;
  }
  return n;
};

/**
 * HashLiveInputWidget
 *
 * The core "Fingerprint Machine" simulation.
 * Converted from HashAvalancheLab into the new widget format.
 *
 * The learner types freely. The SHA-256 hash updates on every keystroke.
 * Success condition: learner has changed the input from the default.
 *
 * For "final-challenge" mode: successCondition in config defines what to check.
 *   "inputChanged"       — any change
 *   "hashStartsWith:X"  — hash must start with X
 *   "hashEndsWith:X"    — hash must end with X
 */
const HashLiveInputWidget = ({ config, onSuccess, succeeded }) => {
  const initialText = config?.initialText || "Transfer $100 to Alice";
  const successCondition = config?.successCondition || "inputChanged";
  const [input, setInput] = useState(initialText);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const successFiredRef = useRef(false);

  const originalHash = useMemo(() => sha256(initialText), [initialText]);
  const currentHash = useMemo(() => sha256(input), [input]);
  const isChanged = input !== initialText;
  const diffCount = isChanged ? countDiffs(originalHash, currentHash) : 0;

  // Bit visualisation — compare hashes as bits
  const originalBits = useMemo(() =>
    originalHash.split("").flatMap(c => parseInt(c, 16).toString(2).padStart(4, "0").split("").map(Number)),
    [originalHash]
  );
  const currentBits = useMemo(() =>
    currentHash.split("").flatMap(c => parseInt(c, 16).toString(2).padStart(4, "0").split("").map(Number)),
    [currentHash]
  );

  // Check success condition
  useEffect(() => {
    if (successFiredRef.current) return;
    let met = false;
    if (successCondition === "inputChanged") {
      met = isChanged;
    } else if (successCondition.startsWith("hashStartsWith:")) {
      const target = successCondition.split(":")[1];
      met = currentHash.startsWith(target);
    } else if (successCondition.startsWith("hashEndsWith:")) {
      const target = successCondition.split(":")[1];
      met = currentHash.endsWith(target);
    }
    if (met) {
      successFiredRef.current = true;
      setHasSucceeded(true);
      onSuccess?.();
    }
  }, [input, currentHash, isChanged, successCondition, onSuccess]);

  const isFinalChallenge = successCondition !== "inputChanged";

  return (
    <div className="space-y-5 py-4 text-white">

      {/* ── Text input ── */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          disabled={hasSucceeded}
          className={`w-full rounded-xl px-4 py-3 font-mono text-sm border transition-all resize-none focus:outline-none ${
            hasSucceeded
              ? "bg-green-500/10 border-green-500/30 text-green-200 cursor-not-allowed"
              : isChanged
              ? "bg-[#1a1a2e] border-purple-500/40 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20"
              : "bg-[#16161f] border-white/10 text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
          }`}
        />
      </div>

      {/* ── Hash output ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            SHA-256 Fingerprint
          </label>
          {isChanged && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-bold text-purple-400"
            >
              {diffCount}/64 hex chars changed
            </motion.span>
          )}
        </div>

        <div className={`rounded-xl p-4 border font-mono text-xs break-all leading-relaxed transition-all duration-300 ${
          hasSucceeded
            ? "bg-green-500/10 border-green-500/30 text-green-300"
            : isChanged
            ? "bg-purple-500/10 border-purple-500/30 text-purple-200"
            : "bg-[#16161f] border-white/5 text-gray-500"
        }`}>
          {currentHash}
        </div>
      </div>

      {/* ── Bit visualisation ── */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          256 bits — each square is one bit
        </label>
        <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(64, 1fr)" }}>
          {currentBits.map((bit, i) => {
            const changed = isChanged && currentBits[i] !== originalBits[i];
            return (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: changed
                    ? hasSucceeded ? "#22c55e" : "#a855f7"
                    : bit === 1 ? "#4b5563" : "#1f2937"
                }}
                transition={{ duration: 0.08, delay: changed ? i * 0.002 : 0 }}
                className="aspect-square rounded-[1px]"
              />
            );
          })}
        </div>
        {isChanged && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center mt-2 font-semibold text-purple-400"
          >
            {Math.round((diffCount / 64) * 100)}% of all bits changed — from one edit
          </motion.p>
        )}
      </div>

      {/* ── Final challenge status ── */}
      {isFinalChallenge && (
        <div className={`rounded-xl px-4 py-3 border text-xs font-mono ${
          hasSucceeded
            ? "bg-green-500/10 border-green-500/30 text-green-300"
            : "bg-white/5 border-white/5 text-gray-600"
        }`}>
          {successCondition.startsWith("hashStartsWith:") && (
            <>Target: hash must start with <span className="text-white font-bold">&ldquo;{successCondition.split(":")[1]}&rdquo;</span>
            {" "}&mdash; current: <span className={currentHash.startsWith(successCondition.split(":")[1]) ? "text-green-400" : "text-red-400"}>
              &ldquo;{currentHash.slice(0, successCondition.split(":")[1].length)}&rdquo;
            </span></>
          )}
        </div>
      )}

      {/* ── Success message ── */}
      <AnimatePresence>
        {hasSucceeded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center"
          >
            <p className="text-lg font-extrabold text-green-300 mb-1">
              {isFinalChallenge ? "Challenge complete! 🎉" : "You discovered it! ✓"}
            </p>
            <p className="text-xs text-green-400/70">
              {isFinalChallenge
                ? "You found the target hash."
                : "One character. 256 bits scrambled. This is the Avalanche Effect."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HashLiveInputWidget;
