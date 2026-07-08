"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SHA256 } from "@stablelib/sha256";
import { encode } from "@stablelib/utf8";

const sha256 = (text) => {
  const h = new SHA256();
  h.update(encode(text));
  return Array.from(h.digest())
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * NonceScrubberWidget
 *
 * The "Proof of Work" simulation.
 * A slider controls the nonce (0–99999). The hash of (blockData + nonce) updates live.
 * When the hash meets the difficulty target (starts with N zeros), success fires.
 *
 * This teaches: trial and error, no shortcut, easy-to-verify asymmetry.
 */
const NonceScrubberWidget = ({ config, onSuccess, succeeded }) => {
  const blockData = config?.blockData || "Block #1 | Prev: 0000000000000000 | Tx: Alice→Bob $50";
  const targetPrefix = config?.targetPrefix || "0000";
  const maxNonce = config?.maxNonce || 99999;

  const [nonce, setNonce] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const successFiredRef = useRef(false);
  const searchRef = useRef(null);

  const hashInput = `${blockData}:nonce=${nonce}`;
  const currentHash = useMemo(() => sha256(hashInput), [hashInput]);
  const meetsTarget = currentHash.startsWith(targetPrefix);

  // Check success
  useEffect(() => {
    if (meetsTarget && !successFiredRef.current) {
      successFiredRef.current = true;
      setHasSucceeded(true);
      onSuccess?.();
    }
  }, [meetsTarget, onSuccess]);

  // Auto-search simulation (for demonstration)
  const startAutoSearch = useCallback(() => {
    if (isSearching || hasSucceeded) return;
    setIsSearching(true);
    let current = nonce;

    const tick = () => {
      if (successFiredRef.current) { setIsSearching(false); return; }
      const step = Math.floor(Math.random() * 50) + 10;
      current = Math.min(current + step, maxNonce);
      setNonce(current);
      setAttemptsCount((a) => a + step);
      if (current >= maxNonce) {
        setIsSearching(false);
        return;
      }
      searchRef.current = requestAnimationFrame(tick);
    };

    searchRef.current = requestAnimationFrame(tick);
  }, [isSearching, hasSucceeded, nonce, maxNonce]);

  const stopSearch = useCallback(() => {
    if (searchRef.current) cancelAnimationFrame(searchRef.current);
    setIsSearching(false);
  }, []);

  useEffect(() => () => { if (searchRef.current) cancelAnimationFrame(searchRef.current); }, []);

  const handleSlider = (e) => {
    if (hasSucceeded) return;
    const val = Number(e.target.value);
    setNonce(val);
    setAttemptsCount((a) => a + 1);
  };

  return (
    <div className="space-y-5 py-4 text-white">

      {/* Block data display */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Block Data (fixed)
        </label>
        <div className="bg-[#16161f] border border-white/5 rounded-xl px-4 py-3 font-mono text-xs text-gray-400 leading-relaxed">
          {blockData}
        </div>
      </div>

      {/* Nonce display + slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Nonce
          </label>
          <motion.span
            key={nonce}
            initial={{ opacity: 0.4, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xl font-mono font-extrabold tabular-nums ${
              hasSucceeded ? "text-green-400" : meetsTarget ? "text-green-400" : "text-white"
            }`}
          >
            {nonce.toLocaleString()}
          </motion.span>
        </div>

        <input
          type="range"
          min={0}
          max={maxNonce}
          value={nonce}
          onChange={handleSlider}
          disabled={hasSucceeded}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-purple-500 disabled:opacity-50"
          style={{ background: `linear-gradient(to right, #a855f7 ${(nonce/maxNonce)*100}%, #1f2937 ${(nonce/maxNonce)*100}%)` }}
        />
        <div className="flex justify-between text-xs text-gray-700 mt-1 font-mono">
          <span>0</span>
          <span>{maxNonce.toLocaleString()}</span>
        </div>
      </div>

      {/* Hash output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            SHA-256 Hash
          </label>
          <span className="text-xs text-gray-600">
            Target: starts with <span className="font-mono text-amber-400 font-bold">&ldquo;{targetPrefix}&rdquo;</span>
          </span>
        </div>

        <div className={`rounded-xl p-4 border font-mono text-xs break-all leading-relaxed transition-all duration-100 ${
          hasSucceeded || meetsTarget
            ? "bg-green-500/10 border-green-500/40 text-green-300"
            : "bg-[#16161f] border-white/5 text-gray-500"
        }`}>
          {/* Highlight the prefix */}
          <span className={`font-bold ${meetsTarget ? "text-green-400" : "text-red-400"}`}>
            {currentHash.slice(0, targetPrefix.length)}
          </span>
          <span>{currentHash.slice(targetPrefix.length)}</span>
        </div>
      </div>

      {/* Attempts counter */}
      <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
        <span className="text-xs text-gray-500">Attempts so far</span>
        <motion.span
          key={attemptsCount}
          initial={{ scale: 1.2, color: "#a855f7" }}
          animate={{ scale: 1, color: "#9ca3af" }}
          className="font-mono text-sm font-bold"
        >
          {attemptsCount.toLocaleString()}
        </motion.span>
      </div>

      {/* Auto-search controls */}
      {!hasSucceeded && (
        <div className="flex gap-3">
          <button
            onClick={isSearching ? stopSearch : startAutoSearch}
            className={`flex-1 h-11 rounded-xl font-bold text-sm transition-all ${
              isSearching
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                : "bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30"
            }`}
          >
            {isSearching ? "⏹ Stop searching" : "▶ Auto-search (watch it try)"}
          </button>
        </div>
      )}

      {/* Insight callout */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
        <span className="font-bold text-gray-400">The insight: </span>
        There is no mathematical shortcut. Every nonce must be hashed and checked individually.
        Bitcoin does this <span className="text-white font-bold">~300 quintillion times per second</span> across all miners.
        Verification takes a single hash.
      </div>

      {/* Success */}
      <AnimatePresence>
        {hasSucceeded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center"
          >
            <p className="text-lg font-extrabold text-green-300 mb-1">Found it! 🎉</p>
            <p className="text-xs text-green-400/70">
              Nonce <span className="font-mono font-bold">{nonce.toLocaleString()}</span> produces a valid hash.
              You just mined a block.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NonceScrubberWidget;
