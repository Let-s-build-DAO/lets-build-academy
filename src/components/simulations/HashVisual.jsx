"use client";

import React, { useState, useEffect } from "react";
import { SHA256 } from "@stablelib/sha256";
import { encode } from "@stablelib/utf8";
import { RefreshCw, ArrowRight } from "lucide-react";

/** Compact PoW hash miner — fits one screen inside lesson shell */
const HashVisual = ({
  challengePrefix = "",
  onComplete,
  compact = false,
  prompt,
}) => {
  const [input, setInput] = useState("block-data");
  const [currentHash, setCurrentHash] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [nonce, setNonce] = useState(0);

  const computeHash = (text) => {
    const h = new SHA256();
    h.update(encode(text));
    return Array.from(h.digest())
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  useEffect(() => {
    const h = computeHash(input);
    setCurrentHash(h);
    setIsSuccess(Boolean(challengePrefix && h.startsWith(challengePrefix)));
  }, [input, challengePrefix]);

  const handleMining = () => {
    let currentNonce = nonce;
    for (let i = 0; i < 2000; i++) {
      currentNonce++;
      const testInput = `${input}${currentNonce}`;
      if (computeHash(testInput).startsWith(challengePrefix)) {
        setInput(testInput);
        setNonce(currentNonce);
        return;
      }
    }
    setNonce(currentNonce);
  };

  if (compact) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
        {prompt && (
          <p className="text-xs sm:text-sm text-gray mb-3 leading-snug">{prompt}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-[10px] font-bold text-purple uppercase tracking-wider">
              Block data + nonce
            </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="lesson-focus w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 font-mono text-xs bg-gray-50"
              aria-label="Block data input"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-purple uppercase tracking-wider">
              SHA-256 output
            </label>
            <div
              className={`mt-1 px-3 py-2 rounded-lg font-mono text-[10px] sm:text-xs break-all min-h-[40px] flex items-center ${
                isSuccess ? "bg-green-500 text-white" : "bg-gray-900 text-gray-300"
              }`}
            >
              {currentHash.slice(0, 32)}…
            </div>
          </div>
        </div>

        {challengePrefix && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs text-gray">
              Goal: hash starts with{" "}
              <strong className="text-purple">{challengePrefix}</strong>
            </span>
            <button
              type="button"
              onClick={handleMining}
              disabled={isSuccess}
              className="lesson-focus ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-purple text-white disabled:bg-green-600 min-h-[40px]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isSuccess ? "Solved!" : "Brute-force nonce"}
            </button>
          </div>
        )}

        {isSuccess && onComplete && (
          <button
            type="button"
            onClick={onComplete}
            className="lesson-focus w-full min-h-[44px] rounded-xl font-bold text-sm bg-purple text-white flex items-center justify-center gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  /* Legacy full layout — kept for consensus-demo if needed */
  return (
    <div className="w-full rounded-2xl p-6 border border-gray-200 bg-white shadow-sm">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 font-mono text-sm border rounded-lg p-3 mb-3"
        placeholder="Type to hash..."
      />
      <div className="font-mono text-xs break-all bg-gray-900 text-gray-300 p-3 rounded-lg mb-3">
        {currentHash}
      </div>
      {challengePrefix && (
        <button
          type="button"
          onClick={handleMining}
          className="bg-purple text-white px-4 py-2 rounded-lg text-sm font-bold"
        >
          Mine prefix {challengePrefix}
        </button>
      )}
      {isSuccess && onComplete && (
        <button type="button" onClick={onComplete} className="mt-2 text-purple font-bold">
          Continue
        </button>
      )}
    </div>
  );
};

export default HashVisual;
