"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flag, Volume2, CheckCircle2, XCircle, Eye, ChevronRight, ChevronLeft, Zap, Fingerprint, FileText, Cpu } from "lucide-react";

const MAX_STRIKES = 5;

// ── HTML/Framer Motion Rich Scenes ──────────────────────────────────────────
const SceneVisual = ({ sceneType, executionState }) => {
  const isFailure = executionState === "failure" || executionState === "revealed";
  const isSuccess = executionState === "success";
  const isRunning = executionState === "running";
  const isRevealed = isSuccess || isFailure;

  if (sceneType === "hash-avalanche") {
    return (
      <div className="relative w-full h-full flex items-center justify-between px-6 font-sans">
        
        {/* ── 1. The Inputs (Left) ── */}
        <div className="flex flex-col gap-4 relative z-10 w-24">
          <motion.div 
            initial={{ x: 0, opacity: 1 }}
            animate={isRunning ? { x: 50, opacity: 0, scale: 0.8 } : { x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-3 border border-gray-200 flex flex-col items-center justify-center relative"
          >
            <FileText className="w-6 h-6 text-indigo-500 mb-1" />
            <span className="text-[10px] font-bold text-gray-700 text-center">Hello, World!</span>
          </motion.div>

          {isRevealed && (
            <motion.div 
              initial={{ x: 0, opacity: 0, y: -20 }}
              animate={{ x: 0, opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-3 border-2 border-purple-400 flex flex-col items-center justify-center relative"
            >
              <FileText className="w-6 h-6 text-purple-500 mb-1" />
              <span className="text-[10px] font-bold text-gray-700 text-center">Hello, <span className="text-purple-600 underline">w</span>orld!</span>
            </motion.div>
          )}
        </div>

        {/* ── 2. The Engine (Center) ── */}
        <div className="relative z-20 flex flex-col items-center">
          <motion.div
            animate={
              isRunning 
                ? { scale: [1, 1.1, 1], boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" } 
                : { scale: 1, boxShadow: "0 0 0px rgba(139, 92, 246, 0)" }
            }
            transition={{ duration: 0.6, repeat: isRunning ? Infinity : 0 }}
            className="w-32 h-32 rounded-3xl bg-gray-900 border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
          >
            {/* Glassmorphic inner layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-md" />
            
            <Cpu className={`w-10 h-10 mb-2 transition-colors duration-300 ${isRunning ? 'text-purple-400' : 'text-gray-500'}`} />
            <span className="text-xs font-bold tracking-widest text-white/80 z-10">SHA-256</span>
            
            {/* Scanning line effect */}
            <AnimatePresence>
              {isRunning && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_10px_#a855f7] z-20"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── 3. The Outputs (Right) ── */}
        <div className="flex flex-col gap-4 relative z-10 w-28">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={isRunning ? { x: 0, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-green-50 rounded-xl shadow-lg p-3 border border-green-200 flex flex-col items-center justify-center"
          >
            <Fingerprint className="w-8 h-8 text-green-500 mb-1" />
            <span className="text-[8px] font-mono text-green-700 text-center break-all">a591a6d4...</span>
          </motion.div>

          <AnimatePresence>
            {isRevealed && (
              <motion.div 
                initial={{ x: -50, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className={`bg-white rounded-xl shadow-lg p-3 border-2 flex flex-col items-center justify-center ${isSuccess ? 'border-green-400' : 'border-purple-400'}`}
              >
                <Fingerprint className={`w-8 h-8 mb-1 ${isSuccess ? 'text-green-500' : 'text-purple-500'}`} />
                <span className={`text-[8px] font-mono text-center break-all ${isSuccess ? 'text-green-700' : 'text-purple-700'}`}>315f5bdb...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Connecting Lines ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.path 
            d="M 120 70 L 160 70" 
            stroke={isRunning ? "#a855f7" : "#334155"} 
            strokeWidth="2" strokeDasharray="4" 
            animate={isRunning ? { strokeDashoffset: [0, -20] } : {}}
            transition={{ repeat: Infinity, ease: "linear", duration: 0.5 }}
          />
          <path d="M 320 70 L 360 70" stroke="#334155" strokeWidth="2" />
          {isRevealed && (
            <>
              <path d="M 120 130 L 160 130" stroke="#a855f7" strokeWidth="2" />
              <path d="M 320 130 L 360 130" stroke="#a855f7" strokeWidth="2" />
            </>
          )}
        </svg>

      </div>
    );
  }

  // Fallback for other scenes
  return (
    <div className="flex items-center justify-center text-gray-500 text-sm h-full w-full">
      <div className="animate-pulse">Loading {sceneType} simulation...</div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────
const InteractiveCodeScenario = ({ lesson, onComplete, onPrevious, lessonIndex = 0, totalLessons = 1 }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [executionState, setExecutionState] = useState("idle");
  const [strikes, setStrikes] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [showWhy, setShowWhy] = useState(false);

  const selectedOption = lesson?.options?.find((o) => o.id === selectedId);
  const correctOption = lesson?.options?.find((o) => o.isCorrect);
  const isSuccess = executionState === "success";
  const isAutoRevealed = executionState === "revealed";
  const isRunning = executionState === "running";
  const isLocked = isSuccess || isAutoRevealed;
  const progress = ((lessonIndex) / totalLessons) * 100;

  const handleCheck = () => {
    if (!selectedId || isRunning) return;
    setExecutionState("running");
    
    // Simulate processing time for better motion flow
    setTimeout(() => {
      if (selectedOption.isCorrect) {
        setLastResult({ isCorrect: true, option: selectedOption });
        setExecutionState("success");
      } else {
        const newStrikes = strikes + 1;
        setStrikes(newStrikes);
        setLastResult({ isCorrect: false, option: selectedOption });
        setExecutionState(newStrikes >= MAX_STRIKES ? "revealed" : "failure");
      }
    }, 1500); // Increased delay to show off the animation
  };

  const handleRetry = () => {
    setSelectedId(null);
    setExecutionState("idle");
    setLastResult(null);
  };

  return (
    <div className="fixed inset-0 bg-[#0b0b0f] z-[50] flex flex-col overflow-hidden font-sans">

      {/* ── Progress bar ── */}
      <div className="h-1.5 w-full bg-white/5 shrink-0">
        <motion.div className="h-full bg-green-500 rounded-r-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "circOut" }} />
      </div>

      {/* ── Nav bar ── */}
      <div className="h-14 flex items-center justify-between px-6 shrink-0 border-b border-white/5">
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={onComplete} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors" title="Exit Course">
            <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </button>
          
          {/* Back Button - Always rendered so layout is stable, disabled if on first lesson */}
          <button 
            onClick={lessonIndex > 0 ? onPrevious : undefined} 
            disabled={lessonIndex === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              lessonIndex > 0 ? "hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer" : "text-gray-700 cursor-not-allowed"
            }`} 
            title="Previous Step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase ml-2">Lesson {lessonIndex + 1}</span>
        </div>

        {/* Strike dots */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5 text-gray-400" />
          <div className="flex items-center gap-1.5">
            {Array.from({ length: MAX_STRIKES }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < strikes
                  ? strikes >= MAX_STRIKES ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : strikes >= 3 ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" : "bg-orange-400 shadow-[0_0_8px_#fb923c]"
                  : "bg-gray-700"
              }`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-2xl mx-auto px-6 py-8 pb-48 flex flex-col gap-8">

          {/* Lesson title */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{lesson?.title}</h1>
            <p className="text-base text-gray-400 font-medium">{lesson?.subtitle}</p>
          </motion.div>

          {/* ── SCENE VISUAL (hero) ── */}
          <motion.div 
            layoutId="scene-container"
            className="bg-[#12121a] rounded-[2rem] border border-white/10 overflow-hidden h-[240px] flex items-center justify-center relative shadow-2xl"
          >
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
            <SceneVisual sceneType={lesson?.sceneConfig?.type} executionState={executionState} />
          </motion.div>

          {/* ── QUESTION AREA ── */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {lesson?.scenario}
            </p>
            <p className="text-white font-bold text-lg leading-snug">
              {lesson?.question}
            </p>
          </motion.div>

          {/* ── OPTION CARDS ── */}
          {!isLocked && (
            <div className="grid gap-3">
              {lesson?.options?.map((option, i) => {
                const isSelected = selectedId === option.id;
                const isFailed = lastResult && !lastResult.isCorrect && lastResult.option.id === option.id && executionState === "failure";
                
                return (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    key={option.id}
                    onClick={() => { setSelectedId(option.id); setExecutionState("idle"); setLastResult(null); }}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 group ${
                      isFailed
                        ? "border-red-500/50 bg-red-500/10"
                        : isSelected
                        ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                        : "border-white/10 bg-[#161622] hover:bg-[#1c1c2a] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isFailed ? "bg-red-500/20 text-red-400" :
                        isSelected ? "bg-purple-500 text-white" : "bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white"
                      }`}>
                        {option.id}
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${
                        isFailed ? "text-red-200" : isSelected ? "text-white" : "text-gray-300"
                      }`}>
                        {option.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Failure feedback */}
          <AnimatePresence>
            {executionState === "failure" && lastResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                    <div>
                      <p className="text-base font-bold text-red-400 mb-1">Not quite</p>
                      <p className="text-sm text-red-200/80 leading-relaxed">{lastResult.option?.failureReason}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auto-revealed: show correct option highlighted */}
          {isAutoRevealed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {lesson?.options?.map((option) => (
                <div key={option.id} className={`w-full p-5 rounded-2xl border-2 ${
                  option.isCorrect
                    ? "border-amber-500/50 bg-amber-500/10"
                    : "border-white/5 bg-[#161622] opacity-50"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      option.isCorrect ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-gray-500"
                    }`}>{option.id}</div>
                    <span className={`text-base font-medium leading-relaxed ${option.isCorrect ? "text-amber-100" : "text-gray-500"}`}>
                      {option.text}
                    </span>
                    {option.isCorrect && <Eye className="w-5 h-5 text-amber-400 shrink-0 ml-auto" />}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Why panel (Success / Revealed) */}
          <AnimatePresence>
            {(isSuccess || isAutoRevealed) && showWhy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`rounded-3xl p-6 border ${isSuccess ? "bg-green-500/10 border-green-500/20" : "bg-amber-500/10 border-amber-500/20"}`}>
                  <h3 className={`text-lg font-bold mb-3 ${isSuccess ? "text-green-400" : "text-amber-400"}`}>
                    Here&apos;s why
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${isSuccess ? "text-green-100" : "text-amber-100"}`}>
                    {correctOption?.successExplanation}
                  </p>
                  {lesson?.revealText && (
                    <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {lesson.revealText}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* ── BOTTOM BAR (fixed) ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/95 to-transparent pt-12 pb-6 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Not yet answered */}
          {!isLocked && (
            <div className="flex flex-col gap-3">
              {executionState === "failure" && (
                <button onClick={handleRetry} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors py-2">
                  Try a different answer
                </button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheck}
                disabled={!selectedId || isRunning}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${
                  !selectedId || isRunning
                    ? "bg-white/5 text-white/20 cursor-not-allowed shadow-none"
                    : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25"
                }`}
              >
                {isRunning ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Cpu className="w-5 h-5 text-white/80" />
                    </motion.div>
                    Processing...
                  </span>
                ) : "Check Answer"}
              </motion.button>
            </div>
          )}

          {/* Success state */}
          {isSuccess && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-green-500 text-white font-bold px-5 py-3 rounded-2xl w-max shadow-lg shadow-green-500/20">
                <CheckCircle2 className="w-5 h-5" />
                Correct!
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowWhy(!showWhy)}
                  className="flex-1 py-4 rounded-2xl font-bold text-base bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {showWhy ? "Hide Explanation" : "Why?"}
                </button>
                <button
                  onClick={onComplete}
                  className="flex-[2] py-4 rounded-2xl font-bold text-base bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 transition-all hover:gap-3"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Auto-revealed state */}
          {isAutoRevealed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-amber-500 text-white font-bold px-5 py-3 rounded-2xl w-max shadow-lg shadow-amber-500/20">
                <Eye className="w-5 h-5" />
                Answer Revealed
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowWhy(!showWhy)}
                  className="flex-1 py-4 rounded-2xl font-bold text-base bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {showWhy ? "Hide Explanation" : "Why?"}
                </button>
                <button
                  onClick={onComplete}
                  className="flex-[2] py-4 rounded-2xl font-bold text-base bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all hover:gap-3"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeScenario;
