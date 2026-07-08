"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HashForgeWidget — Two-column layout, 3 options max.
 *
 * Left column:  Document with drop slot + draggable options
 * Right column: Hash comparison panel + progress + result
 *
 * One of the options is the original (correct) amount.
 * Every wrong drop plays a buzzer. The correct drop plays a chime.
 * Success fires after trying at least 2 wrong options AND finding the match.
 */

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function playBuzz() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
    setTimeout(() => ctx.close(), 500);
  } catch (e) { /* audio not available */ }
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.4);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch (e) { /* audio not available */ }
}

const HashForgeWidget = ({ config, onSuccess, isSuccess }) => {
  const {
    documentTemplate = "Pay Alice: ___",
    options = ["$500", "$200", "$100"],
    originalAmount = "$100",
  } = config;

  const [slotValue, setSlotValue] = useState(null);
  const [currentHash, setCurrentHash] = useState("");
  const [targetHash, setTargetHash] = useState("");
  const [triedOptions, setTriedOptions] = useState(new Set());
  const [isDragOver, setIsDragOver] = useState(false);
  const [showResult, setShowResult] = useState(null);
  const [foundMatch, setFoundMatch] = useState(false);
  const hasCalledSuccess = useRef(false);

  const wrongOptions = options.filter((o) => o !== originalAmount);
  const MIN_WRONG_TRIES = Math.min(2, wrongOptions.length);

  // Compute target hash from original on mount
  useEffect(() => {
    const doc = documentTemplate.replace("___", originalAmount);
    sha256(doc).then((h) => setTargetHash(h));
  }, [documentTemplate, originalAmount]);

  // Compute hash on each drop
  useEffect(() => {
    if (!slotValue || !targetHash) {
      setCurrentHash("");
      return;
    }
    const doc = documentTemplate.replace("___", slotValue);
    sha256(doc).then((h) => {
      setCurrentHash(h);
      if (h === targetHash) {
        setShowResult("match");
        setFoundMatch(true);
        playChime();
      } else {
        setShowResult("mismatch");
        playBuzz();
        setTimeout(() => setShowResult(null), 1800);
      }
    });
  }, [slotValue, documentTemplate, targetHash]);

  // Track tries
  useEffect(() => {
    if (slotValue && !triedOptions.has(slotValue)) {
      setTriedOptions((prev) => new Set([...prev, slotValue]));
    }
  }, [slotValue]);

  // Fire success
  const wrongTried = [...triedOptions].filter((o) => o !== originalAmount).length;
  useEffect(() => {
    if (wrongTried >= MIN_WRONG_TRIES && foundMatch && !hasCalledSuccess.current) {
      hasCalledSuccess.current = true;
      onSuccess?.();
    }
  }, [wrongTried, foundMatch, MIN_WRONG_TRIES, onSuccess]);

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text/plain", option);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const value = e.dataTransfer.getData("text/plain");
    if (value) setSlotValue(value);
  };

  const targetChars = targetHash.slice(0, 8);
  const hashChars = currentHash.slice(0, 8);
  const isCurrentMatch = currentHash === targetHash;

  return (
    <div className="text-white select-none">

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ══════ LEFT: Document + Options ══════ */}
        <div className="space-y-5">

          {/* Document with drop slot */}
          <div className={`bg-[#1a1a2e] border rounded-2xl p-6 relative overflow-hidden transition-colors duration-300 ${
            showResult === "match" ? "border-emerald-500/40" :
            showResult === "mismatch" ? "border-red-500/40 animate-[shake_0.3s_ease-in-out]" :
            "border-white/10"
          }`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
              Document
            </p>
            <div className="font-mono text-xl flex items-center gap-2 flex-wrap">
              <span className="text-gray-300">{documentTemplate.split("___")[0]}</span>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`inline-flex items-center justify-center min-w-[110px] h-14 px-5 rounded-xl border-2 border-dashed transition-all duration-200 ${
                  isDragOver
                    ? "border-amber-400 bg-amber-500/15 scale-105"
                    : slotValue
                    ? isCurrentMatch
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-red-500/30 bg-red-500/5"
                    : "border-white/20 bg-white/5"
                }`}
              >
                {slotValue ? (
                  <motion.span
                    key={slotValue}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`font-bold text-xl ${isCurrentMatch ? "text-emerald-400" : "text-amber-400"}`}
                  >
                    {slotValue}
                  </motion.span>
                ) : (
                  <span className="text-gray-600 text-sm">Drop amount here</span>
                )}
              </div>

              {documentTemplate.split("___")[1] && (
                <span className="text-gray-300">{documentTemplate.split("___")[1]}</span>
              )}
            </div>

            {/* Result flash badge */}
            <AnimatePresence>
              {showResult === "mismatch" && slotValue && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 right-4 bg-red-500/20 border border-red-500/30 rounded-xl px-3 py-1.5"
                >
                  <span className="text-red-400 text-xs font-bold">✗ Mismatch</span>
                </motion.div>
              )}
              {showResult === "match" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-3 py-1.5"
                >
                  <span className="text-emerald-400 text-xs font-bold">✓ Match!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Draggable options (max 3) */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Drag an amount into the document
            </p>
            <div className="flex gap-3">
              {options.map((opt) => {
                const tried = triedOptions.has(opt);
                const wasMatch = tried && opt === originalAmount;
                return (
                  <motion.div
                    key={opt}
                    draggable
                    onDragStart={(e) => handleDragStart(e, opt)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 text-center px-4 py-4 rounded-xl font-mono font-bold text-lg cursor-grab active:cursor-grabbing border transition-all ${
                      wasMatch
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : tried
                        ? "bg-red-500/10 border-red-500/20 text-red-400/70"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                    }`}
                  >
                    {opt}
                    {wasMatch && <span className="ml-1 text-xs">✓</span>}
                    {tried && !wasMatch && <span className="ml-1 text-xs text-red-400/50">✗</span>}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            {options.map((opt, i) => {
              const tried = triedOptions.has(opt);
              const wasMatch = tried && opt === originalAmount;
              return (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    wasMatch ? "bg-emerald-500" : tried ? "bg-red-500" : "bg-white/10"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* ══════ RIGHT: Hash Comparison Panel ══════ */}
        <div className="space-y-5">
          
          {/* Target hash */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Original hash (target)
            </p>
            <div className="flex gap-1 flex-wrap">
              {targetChars ? targetChars.split("").map((ch, i) => (
                <span
                  key={i}
                  className="w-8 h-9 flex items-center justify-center bg-emerald-600/20 border border-emerald-500/30 rounded-lg font-mono text-base font-bold text-emerald-400"
                >
                  {ch}
                </span>
              )) : Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="w-8 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg font-mono text-base text-gray-600">.</span>
              ))}
              <span className="text-gray-600 font-mono self-center ml-1">...</span>
            </div>
          </div>

          {/* Your attempt hash */}
          <div className={`rounded-2xl p-5 border transition-colors duration-300 ${
            showResult === "match" 
              ? "bg-emerald-500/5 border-emerald-500/30" 
              : showResult === "mismatch" 
              ? "bg-red-500/5 border-red-500/30" 
              : "bg-white/5 border-white/10"
          }`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Your attempt
            </p>
            <div className="flex gap-1 flex-wrap">
              {currentHash ? (
                hashChars.split("").map((ch, i) => {
                  const matches = ch === targetChars[i];
                  return (
                    <motion.span
                      key={`${slotValue}-${i}`}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className={`w-8 h-9 flex items-center justify-center rounded-lg font-mono text-base font-bold border ${
                        matches
                          ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-400"
                          : "bg-red-600/20 border-red-500/30 text-red-400"
                      }`}
                    >
                      {ch}
                    </motion.span>
                  );
                })
              ) : (
                Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="w-8 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg font-mono text-base text-gray-600">?</span>
                ))
              )}
              {currentHash && <span className="text-gray-600 font-mono self-center ml-1">...</span>}
            </div>
          </div>

          {/* Insight panel */}
          <AnimatePresence mode="wait">
            {!currentHash && !isSuccess && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <p className="text-gray-500 text-sm leading-relaxed">
                  Try dragging an amount into the document to see how the hash changes.
                </p>
              </motion.div>
            )}
            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5"
              >
                <p className="text-amber-200 text-sm leading-relaxed">
                  The <strong>only</strong> amount that produces the correct hash is the original: <strong>{originalAmount}</strong>. 
                  Every other amount creates a completely different fingerprint. 
                  You cannot forge a document and keep the same hash &mdash; that is what makes hash functions a trust primitive.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HashForgeWidget;
