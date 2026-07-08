"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import firebase_app from "../../firebase/config";

import BaitStep from "../steps/BaitStep";
import BreakStep from "../steps/BreakStep";
import ModelStep from "../steps/ModelStep";
import ProveStep from "../steps/ProveStep";

import AtlasPanel from "../atlas/AtlasPanel";
import CourseCompleteScreen from "../lesson/CourseCompleteScreen";

import { X, ChevronLeft, Zap } from "lucide-react";

const db = getFirestore(firebase_app);

// Map step type → component
const STEP_COMPONENTS = {
  bait: BaitStep,
  break: BreakStep,
  model: ModelStep,
  prove: ProveStep,
};

const MAX_STRIKES = 5;

/**
 * LessonJourneyEngine
 *
 * The core learning loop for LB Academy.
 * Navigates through step-based lessons instead of flat A/B/C options.
 *
 * Data shape expected on `data.lessons[n]`:
 * {
 *   title: string,
 *   steps: [
 *     { type: "hook"|"simulation"|"explanation"|"final-challenge"|..., ...stepConfig },
 *     ...
 *   ]
 * }
 */
const LessonJourneyEngine = ({ data, userId, courseId }) => {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [atlasOpen, setAtlasOpen] = useState(false);
  const [atlasMessage, setAtlasMessage] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const router = useRouter();

  const lessons = data?.lessons || [];
  const currentLesson = lessons[lessonIndex];
  const steps = currentLesson?.steps || [];
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;
  const totalLessons = lessons.length;

  // Calculate overall progress (across all lessons + steps)
  const totalStepsGlobal = lessons.reduce((acc, l) => acc + (l.steps?.length || 1), 0);
  const completedStepsGlobal = lessons
    .slice(0, lessonIndex)
    .reduce((acc, l) => acc + (l.steps?.length || 1), 0) + stepIndex;
  const progressPct = Math.round((completedStepsGlobal / Math.max(totalStepsGlobal, 1)) * 100);

  // ── Load saved progress ──────────────────────────────────────────
  useEffect(() => {
    const loadProgress = async () => {
      if (!userId || !courseId || !totalLessons) { setProgressLoaded(true); return; }
      try {
        const snap = await getDoc(doc(db, `courses/${courseId}/enrolledStudents`, userId));
        if (snap.exists()) {
          const d = snap.data();
          const li = Math.min(Math.max((d.lastLesson || 1) - 1, 0), totalLessons - 1);
          setLessonIndex(li);
          setStepIndex(d.lastStep || 0);
        }
      } catch (err) {
        console.error("Error loading progress:", err);
      }
      setProgressLoaded(true);
    };
    loadProgress();
  }, [userId, courseId, totalLessons]);

  // ── Save progress ────────────────────────────────────────────────
  useEffect(() => {
    if (!progressLoaded || !userId || !courseId) return;
    const save = async () => {
      try {
        await setDoc(
          doc(db, `courses/${courseId}/enrolledStudents`, userId),
          { progress: progressPct, lastLesson: lessonIndex + 1, lastStep: stepIndex, lastUpdated: serverTimestamp() },
          { merge: true }
        );
      } catch (err) {
        console.error("Error saving progress:", err);
      }
    };
    save();
  }, [lessonIndex, stepIndex, progressLoaded, userId, courseId, progressPct]);

  // ── Navigation ────────────────────────────────────────────────────
  const goNextStep = useCallback(() => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((s) => s + 1);
    } else if (lessonIndex < totalLessons - 1) {
      setLessonIndex((l) => l + 1);
      setStepIndex(0);
      setStrikes(0);
    } else {
      setShowComplete(true);
    }
  }, [stepIndex, totalSteps, lessonIndex, totalLessons]);

  const goPrevStep = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
    } else if (lessonIndex > 0) {
      const prevLesson = lessons[lessonIndex - 1];
      setLessonIndex((l) => l - 1);
      setStepIndex((prevLesson?.steps?.length || 1) - 1);
    }
  }, [stepIndex, lessonIndex, lessons]);

  const handleStrike = useCallback(() => {
    setStrikes((s) => Math.min(s + 1, MAX_STRIKES));
  }, []);

  const canGoBack = stepIndex > 0 || lessonIndex > 0;

  if (!progressLoaded) {
    return (
      <div className="fixed inset-0 bg-[#0b0b0f] z-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentLesson || !currentStep) {
    return (
      <div className="fixed inset-0 bg-[#0b0b0f] z-50 flex items-center justify-center text-gray-500">
        No lesson content found.
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[currentStep.type] || ModelStep;

  return (
    <div className="journey-engine fixed inset-0 bg-[#0b0b0f] z-50 flex flex-col overflow-hidden font-sans text-white">

      {/* ── Progress bar ─────────────────────────────────────────── */}
      <div className="h-1 w-full bg-white/5 shrink-0">
        <motion.div
          className="h-full bg-green-500 rounded-r-full"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* ── Top navigation ───────────────────────────────────────── */}
      <div className="h-14 flex items-center justify-between px-5 shrink-0 border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Exit */}
          <button
            onClick={() => router.push("/user/courses")}
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            title="Exit"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          {/* Back */}
          <button
            onClick={goPrevStep}
            disabled={!canGoBack}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              canGoBack
                ? "hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                : "text-gray-700 cursor-not-allowed"
            }`}
            title="Previous step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="h-5 w-px bg-white/10" />

          {/* Breadcrumb */}
          <span className="text-xs font-semibold text-gray-500 tracking-wider">
            {currentLesson.title}
          </span>
        </div>

        {/* Strike dots */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <div className="flex items-center gap-1.5">
            {Array.from({ length: MAX_STRIKES }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < strikes
                    ? strikes >= MAX_STRIKES
                      ? "bg-red-500 shadow-[0_0_6px_#ef4444]"
                      : strikes >= 3
                      ? "bg-amber-400 shadow-[0_0_6px_#fbbf24]"
                      : "bg-orange-400"
                    : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step counter */}
        <span className="text-xs font-semibold text-gray-600 tabular-nums">
          {stepIndex + 1} / {totalSteps}
        </span>
      </div>

      {/* ── Main Canvas Area (Fluid Layout) ────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lessonIndex}-${stepIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-1 min-w-0 overflow-hidden relative"
          >
            <StepComponent
              step={currentStep}
              lesson={currentLesson}
              lessonIndex={lessonIndex}
              stepIndex={stepIndex}
              strikes={strikes}
              onStrike={handleStrike}
              onComplete={goNextStep}
              onOpenAtlas={(msg) => {
                if (typeof msg === 'string') {
                  setAtlasMessage(msg);
                }
                setAtlasOpen(true);
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Atlas panel container */}
        <AnimatePresence>
          {atlasOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 384, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="shrink-0 border-l border-white/5 bg-[#0f0f1a] relative z-20 shadow-2xl overflow-hidden"
            >
              <AtlasPanel
                onClose={() => setAtlasOpen(false)}
                lessonTitle={currentLesson.title}
                stepType={currentStep.type}
                stepContext={currentStep}
                userId={userId}
                lessonId={`${courseId}-${lessonIndex}`}
                initialMessage={atlasMessage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Atlas floating button ─────────────────────────────────── */}
      <motion.button
        onClick={() => setAtlasOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-8 right-6 w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 transition-colors z-30"
        title="Ask Atlas"
      >
        <span className="text-2xl">✦</span>
      </motion.button>

      {/* ── Course complete screen ───────────────────────────────── */}
      {showComplete && (
        <CourseCompleteScreen
          courseTitle={data?.title}
          onRestart={() => { setLessonIndex(0); setStepIndex(0); setShowComplete(false); }}
        />
      )}
    </div>
  );
};

export default LessonJourneyEngine;
