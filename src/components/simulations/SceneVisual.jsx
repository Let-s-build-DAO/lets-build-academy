"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Scenes map to specific lesson topics.
// Each scene animates its own SVG elements based on executionState.
const SceneVisual = ({ sceneType, executionState, selectedOption }) => {
  const isFailure = executionState === "failure" || executionState === "revealed";
  const isSuccess = executionState === "success";
  const isRunning = executionState === "running";

  switch (sceneType) {
    case "hash-avalanche":
      return <HashAvalancheScene isRunning={isRunning} isSuccess={isSuccess} isFailure={isFailure} />;
    case "wallet-attack":
      return <WalletAttackScene isRunning={isRunning} isSuccess={isSuccess} isFailure={isFailure} />;
    case "block-tamper":
      return <BlockTamperScene isRunning={isRunning} isSuccess={isSuccess} isFailure={isFailure} />;
    case "pow-race":
      return <PowRaceScene isRunning={isRunning} isSuccess={isSuccess} isFailure={isFailure} />;
    case "mempool":
      return <MempoolScene isRunning={isRunning} isSuccess={isSuccess} isFailure={isFailure} />;
    default:
      return <DefaultScene />;
  }
};

// ── HASH AVALANCHE SCENE ──────────────────────────────────────────────────
const HashAvalancheScene = ({ isRunning, isSuccess, isFailure }) => {
  const input1 = "Hello, World!";
  const input2 = "Hello, world!";
  const hash1 = "a591a6d40bf42040...";
  const hash2 = "315f5bdb76d078c4...";

  return (
    <svg viewBox="0 0 480 180" className="w-full h-full">
      {/* Input box 1 */}
      <rect x="20" y="60" width="130" height="40" rx="8" fill="#1e2030" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="85" y="85" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="monospace">{input1}</text>
      <text x="85" y="50" textAnchor="middle" fill="#64748b" fontSize="9">Input A</text>

      {/* Input box 2 */}
      <rect x="20" y="120" width="130" height="40" rx="8" fill="#1e2030" stroke={isFailure ? "#ef4444" : "#3b82f6"} strokeWidth="1.5" />
      <text x="85" y="145" textAnchor="middle" fill={isFailure ? "#fca5a5" : "#93c5fd"} fontSize="11" fontFamily="monospace">{input2}</text>
      <text x="85" y="115" textAnchor="middle" fill="#64748b" fontSize="9">Input B (1 char changed)</text>

      {/* Arrow + SHA-256 box */}
      <text x="175" y="88" fill="#6366f1" fontSize="10" fontFamily="monospace">──── SHA-256 ────▶</text>
      <text x="175" y="148" fill="#6366f1" fontSize="10" fontFamily="monospace">──── SHA-256 ────▶</text>

      {/* Output hash 1 */}
      <rect x="315" y="60" width="150" height="40" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
      <text x="390" y="85" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="monospace">{hash1}</text>

      {/* Output hash 2 */}
      <rect x="315" y="120" width="150" height="40" rx="8" fill="#0f172a"
        stroke={isSuccess ? "#22c55e" : isFailure ? "#ef4444" : "#334155"} strokeWidth="1.5" />
      <text x="390" y="145" textAnchor="middle"
        fill={isSuccess ? "#86efac" : isFailure ? "#fca5a5" : "#475569"} fontSize="9" fontFamily="monospace">
        {isRunning ? "computing..." : isSuccess || isFailure ? hash2 : "???"}
      </text>

      {/* Avalanche label */}
      {(isSuccess || isFailure) && (
        <text x="240" y="175" textAnchor="middle" fill={isSuccess ? "#22c55e" : "#ef4444"} fontSize="9">
          {isSuccess ? "✓ Avalanche Effect confirmed" : "✗ Outputs are completely different"}
        </text>
      )}

      {/* Running pulse */}
      {isRunning && (
        <motion.circle cx="240" cy="100" r="5" fill="#6366f1"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }} />
      )}
    </svg>
  );
};

// ── WALLET ATTACK SCENE ───────────────────────────────────────────────────
const WalletAttackScene = ({ isRunning, isSuccess, isFailure }) => {
  return (
    <svg viewBox="0 0 480 180" className="w-full h-full">
      {/* Contract */}
      <rect x="160" y="40" width="160" height="100" rx="10" fill="#1e2030"
        stroke={isFailure ? "#ef4444" : isSuccess ? "#22c55e" : "#334155"} strokeWidth="2" />
      <text x="240" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Contract</text>
      <text x="240" y="80" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">withdraw()</text>

      {/* Balance */}
      <text x="240" y="105" textAnchor="middle" fontSize="20" fontWeight="black"
        fill={isFailure ? "#ef4444" : "#22c55e"} fontFamily="monospace">
        {isFailure ? "0 ETH" : isRunning ? "..." : "10 ETH"}
      </text>
      <text x="240" y="125" textAnchor="middle" fill="#475569" fontSize="9">balance</text>

      {/* Attacker */}
      <circle cx="60" cy="90" r="28" fill={isFailure ? "#450a0a" : "#0f172a"}
        stroke={isFailure ? "#ef4444" : "#334155"} strokeWidth="2" />
      <text x="60" y="86" textAnchor="middle" fill={isFailure ? "#fca5a5" : "#64748b"} fontSize="18">👤</text>
      <text x="60" y="128" textAnchor="middle" fill={isFailure ? "#ef4444" : "#64748b"} fontSize="9">Attacker</text>

      {/* User */}
      <circle cx="420" cy="90" r="28" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="420" y="86" textAnchor="middle" fill="#64748b" fontSize="18">🧑</text>
      <text x="420" y="128" textAnchor="middle" fill="#64748b" fontSize="9">Alice</text>

      {/* Attack arrow */}
      {isRunning && (
        <motion.line x1="90" y1="90" x2="158" y2="90" stroke="#6366f1" strokeWidth="2" strokeDasharray="4"
          animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 0.5 }} />
      )}
      {isFailure && (
        <>
          <line x1="90" y1="90" x2="158" y2="90" stroke="#ef4444" strokeWidth="2" />
          <text x="124" y="82" textAnchor="middle" fill="#ef4444" fontSize="8">RE-ENTER</text>
          <text x="240" y="160" textAnchor="middle" fill="#ef4444" fontSize="9">⚠ Reentrancy attack — funds drained</text>
        </>
      )}
      {isSuccess && (
        <>
          <text x="240" y="160" textAnchor="middle" fill="#22c55e" fontSize="9">✓ State updated before call — attack blocked</text>
          <line x1="90" y1="90" x2="158" y2="90" stroke="#334155" strokeWidth="1.5" strokeDasharray="4" />
          <text x="124" y="82" textAnchor="middle" fill="#475569" fontSize="8">BLOCKED</text>
        </>
      )}
    </svg>
  );
};

// ── BLOCK TAMPER SCENE ────────────────────────────────────────────────────
const BlockTamperScene = ({ isRunning, isSuccess, isFailure }) => {
  const blockColor = (idx) => {
    if (isFailure && idx > 0) return "#ef4444";
    if (isSuccess) return "#22c55e";
    return "#6366f1";
  };
  return (
    <svg viewBox="0 0 480 180" className="w-full h-full">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={30 + i * 150} y="50" width="120" height="80" rx="8"
            fill="#1e2030" stroke={blockColor(i)} strokeWidth={isFailure && i > 0 ? 2 : 1.5} />
          <text x={90 + i * 150} y="72" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
            Block #{i + 1}
          </text>
          <text x={90 + i * 150} y="95" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">
            {i === 0 && isFailure ? "Alice→Bob: 5 BTC*" : i === 0 ? "Alice→Bob: 5 BTC" : `prev_hash: ${i === 1 ? "0xa1b2..." : "0xc3d4..."}`}
          </text>
          <text x={90 + i * 150} y="115" textAnchor="middle"
            fill={isFailure && i > 0 ? "#ef4444" : "#374151"} fontSize="8" fontFamily="monospace">
            {isFailure && i > 0 ? "INVALID ✗" : "valid ✓"}
          </text>
          {i < 2 && (
            <text x={155 + i * 150} y="93" fill="#475569" fontSize="14">→</text>
          )}
        </g>
      ))}
      {isFailure && (
        <text x="240" y="165" textAnchor="middle" fill="#ef4444" fontSize="9">
          Block 1 tampered — chain invalidated from Block 2 onward
        </text>
      )}
    </svg>
  );
};

// ── POW RACE SCENE ────────────────────────────────────────────────────────
const PowRaceScene = ({ isRunning, isSuccess, isFailure }) => (
  <svg viewBox="0 0 480 180" className="w-full h-full">
    <text x="240" y="30" textAnchor="middle" fill="#475569" fontSize="10">Mining Race — Find nonce where hash starts with 0000</text>
    {/* Miner A */}
    <rect x="40" y="50" width="160" height="80" rx="8" fill="#1e2030" stroke={isSuccess ? "#22c55e" : "#334155"} strokeWidth="1.5" />
    <text x="120" y="72" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Miner A</text>
    <text x="120" y="95" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
      {isRunning ? "nonce: 847,291..." : isSuccess ? "nonce: 847,292 ✓" : "nonce: 0"}
    </text>
    <text x="120" y="115" textAnchor="middle" fill={isSuccess ? "#22c55e" : "#374151"} fontSize="8" fontFamily="monospace">
      {isSuccess ? "0000a1b2c3d4..." : "waiting..."}
    </text>
    {/* Miner B */}
    <rect x="280" y="50" width="160" height="80" rx="8" fill="#1e2030" stroke="#334155" strokeWidth="1.5" />
    <text x="360" y="72" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Miner B</text>
    <text x="360" y="95" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">nonce: 1,204,881...</text>
    <text x="360" y="115" textAnchor="middle" fill="#374151" fontSize="8" fontFamily="monospace">still searching...</text>
    {isRunning && (
      <motion.text x="240" y="160" textAnchor="middle" fill="#6366f1" fontSize="9"
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }}>
        Hashing billions of nonces...
      </motion.text>
    )}
  </svg>
);

// ── MEMPOOL SCENE ─────────────────────────────────────────────────────────
const MempoolScene = ({ isRunning, isSuccess, isFailure }) => (
  <svg viewBox="0 0 480 180" className="w-full h-full">
    <text x="240" y="20" textAnchor="middle" fill="#475569" fontSize="10">Mempool → Validator → Block</text>
    {/* Mempool box */}
    <rect x="20" y="40" width="130" height="120" rx="8" fill="#1e2030" stroke="#334155" strokeWidth="1.5" />
    <text x="85" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Mempool</text>
    {["Tx: 5 gwei", "Tx: 50 gwei ★", "Tx: 2 gwei", "Tx: 30 gwei"].map((tx, i) => (
      <text key={i} x="85" y={78 + i * 18} textAnchor="middle" fill={tx.includes("★") ? "#fbbf24" : "#475569"} fontSize="8" fontFamily="monospace">{tx}</text>
    ))}
    {/* Arrow */}
    <text x="185" y="103" fill="#6366f1" fontSize="20">→</text>
    {/* Validator */}
    <rect x="210" y="60" width="90" height="60" rx="8" fill="#1e2030" stroke={isSuccess ? "#22c55e" : "#334155"} strokeWidth="1.5" />
    <text x="255" y="84" textAnchor="middle" fill="#94a3b8" fontSize="9">Validator</text>
    <text x="255" y="105" textAnchor="middle" fill="#64748b" fontSize="8">picks highest</text>
    {/* Arrow */}
    <text x="318" y="103" fill="#6366f1" fontSize="20">→</text>
    {/* Block */}
    <rect x="345" y="60" width="110" height="60" rx="8" fill="#1e2030" stroke={isSuccess ? "#22c55e" : "#334155"} strokeWidth="1.5" />
    <text x="400" y="84" textAnchor="middle" fill="#94a3b8" fontSize="9">Block</text>
    <text x="400" y="105" textAnchor="middle" fill={isSuccess ? "#fbbf24" : "#374151"} fontSize="8" fontFamily="monospace">
      {isSuccess ? "Tx: 50 gwei ✓" : "..."}
    </text>
  </svg>
);

// ── DEFAULT SCENE ─────────────────────────────────────────────────────────
const DefaultScene = () => (
  <div className="flex items-center justify-center w-full h-full text-white/20 text-sm">
    No scene configured for this lesson.
  </div>
);

export default SceneVisual;
