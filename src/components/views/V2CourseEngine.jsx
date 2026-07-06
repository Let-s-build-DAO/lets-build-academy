"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "../../firebase/config";

import ScenarioMultipleChoice from "../interactions/ScenarioMultipleChoice";
import ProgressiveReveal from "../interactions/ProgressiveReveal";
import ExperientialFactorization from "../interactions/ExperientialFactorization";
import InteractiveCodeScenario from "../interactions/InteractiveCodeScenario";
import HashAvalancheLab from "../interactions/HashAvalancheLab";
import HashVisual from "../simulations/HashVisual";
import BlockChainVisual from "../simulations/BlockChainVisual";
import LogicPuzzle from "../simulations/LogicPuzzle";
import BinaryHexVisual from "../simulations/BinaryHexVisual";
import LessonPlayerShell from "../lesson/LessonPlayerShell";
import CourseCompleteScreen from "../lesson/CourseCompleteScreen";

const db = getFirestore(firebase_app);

const SIMULATION_TYPES = new Set([
  "blockchain",
  "puzzle",
  "LiveSimulation",
  "Experiential",
]);

const V2CourseEngine = ({ data, userId, courseId }) => {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const router = useRouter();

  const lessons = data?.lessons || [];
  const currentLesson = lessons[lessonIndex];
  const totalLessons = lessons.length;

  useEffect(() => {
    const loadProgress = async () => {
      if (!userId || !courseId || !totalLessons) {
        setProgressLoaded(true);
        return;
      }
      try {
        const snap = await getDoc(
          doc(db, `courses/${courseId}/enrolledStudents`, userId)
        );
        if (snap.exists()) {
          const last = snap.data().lastLesson || 1;
          const idx = Math.min(Math.max(last - 1, 0), totalLessons - 1);
          setLessonIndex(idx);
        }
      } catch (err) {
        console.error("Error loading progress:", err);
      }
      setProgressLoaded(true);
    };
    loadProgress();
  }, [userId, courseId, totalLessons]);

  useEffect(() => {
    if (!progressLoaded || !userId || !courseId || !totalLessons) return;

    const progressPct = Math.round(((lessonIndex + 1) / totalLessons) * 100);
    const save = async () => {
      try {
        await setDoc(
          doc(db, `courses/${courseId}/enrolledStudents`, userId),
          {
            progress: progressPct,
            lastLesson: lessonIndex + 1,
            lastUpdated: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Error saving progress:", err);
      }
    };
    save();
  }, [lessonIndex, progressLoaded, userId, courseId, totalLessons]);

  const handleNext = useCallback(() => {
    if (lessonIndex < totalLessons - 1) {
      setLessonIndex((prev) => prev + 1);
    } else {
      setShowComplete(true);
    }
  }, [lessonIndex, totalLessons]);

  const handlePrevious = useCallback(() => {
    if (lessonIndex > 0) {
      setLessonIndex((prev) => prev - 1);
    }
  }, [lessonIndex]);

  const handleRestart = () => {
    setLessonIndex(0);
    setShowComplete(false);
  };

  const readAloudText = [
    currentLesson?.body,
    currentLesson?.instruction,
    currentLesson?.interactionData?.scenario,
    currentLesson?.interactionData?.question,
  ]
    .filter(Boolean)
    .join(" ");

  const renderHashPuzzle = () => (
    <div className="h-full max-h-full flex flex-col overflow-hidden px-4 sm:px-6 lg:px-8 pt-2 pb-0 max-w-3xl mx-auto w-full">
      <div className="shrink-0 text-center mb-3">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">
          {currentLesson.title}
        </h1>
        <p className="text-xs text-purple font-semibold">{currentLesson.subtitle}</p>
      </div>
      <HashVisual
        compact
        challengePrefix={currentLesson.challengePrefix}
        prompt={currentLesson.interactionData?.prompt}
        onComplete={handleNext}
      />
    </div>
  );

  const renderInteraction = () => {
    if (!currentLesson) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500 p-8">
          No lessons in this course yet.
        </div>
      );
    }

    switch (currentLesson.interactionType) {
      case "HashAvalanche":
        return (
          <HashAvalancheLab lesson={currentLesson} onComplete={handleNext} />
        );
      case "ICS":
        return (
          <InteractiveCodeScenario 
            lesson={currentLesson} 
            onComplete={handleNext} 
            onPrevious={handlePrevious}
            lessonIndex={lessonIndex}
            totalLessons={totalLessons}
          />
        );
      case "SMC":
        return (
          <ScenarioMultipleChoice lesson={currentLesson} onComplete={handleNext} />
        );
      case "ProgressiveReveal":
        return (
          <ProgressiveReveal lesson={currentLesson} onComplete={handleNext} />
        );
      default:
        if (currentLesson.interactionType === "hash") {
          return renderHashPuzzle();
        }
        if (SIMULATION_TYPES.has(currentLesson.interactionType)) {
          return (
            <div className="h-full max-h-full overflow-hidden px-4 sm:px-6 lg:px-8 pt-2 pb-4 max-w-3xl mx-auto w-full">
              <div className="shrink-0 text-center mb-3">
                <h1 className="text-lg font-bold text-gray-900">{currentLesson.title}</h1>
                {currentLesson.subtitle && (
                  <p className="text-xs text-purple font-semibold">{currentLesson.subtitle}</p>
                )}
              </div>
              {currentLesson.interactionType === "blockchain" && (
                <BlockChainVisual onComplete={handleNext} />
              )}
              {currentLesson.interactionType === "puzzle" && (
                <LogicPuzzle puzzle={currentLesson.puzzleData} onSolve={handleNext} />
              )}
              {currentLesson.interactionType === "LiveSimulation" &&
                currentLesson.interactionData?.simulationConfig?.type === "binary-to-hex" && (
                  <BinaryHexVisual
                    config={currentLesson.interactionData.simulationConfig}
                    onComplete={handleNext}
                  />
                )}
              {currentLesson.interactionType === "Experiential" && (
                <ExperientialFactorization
                  puzzle={currentLesson.interactionData?.puzzle}
                  onSolve={handleNext}
                />
              )}
            </div>
          );
        }
        return (
          <div className="flex items-center justify-center h-full p-8">
            <div className="max-w-md text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {currentLesson.title}
              </h2>
              <p className="text-gray mb-6 text-sm">
                This interaction is not available yet.
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="lesson-focus bg-purple hover:bg-purple/90 text-white px-8 py-3 rounded-2xl font-bold min-h-[52px] shadow-md shadow-purple/20"
              >
                Continue
              </button>
            </div>
          </div>
        );
    }
  };

  if (!progressLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple/5 via-gray-50 to-white z-50 flex items-center justify-center">
        <div
          className="w-10 h-10 border-4 border-purple/20 border-t-purple rounded-full animate-spin"
          role="status"
          aria-label="Loading lesson"
        />
      </div>
    );
  }

  // ICS is self-contained with its own Brilliant-style chrome
  if (currentLesson?.interactionType === "ICS") {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple/5 via-gray-50 to-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={lessonIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {renderInteraction()}
          </motion.div>
        </AnimatePresence>
        {showComplete && (
          <CourseCompleteScreen
            courseTitle={data?.title}
            onRestart={handleRestart}
          />
        )}
      </div>
    );
  }

  return (
    <LessonPlayerShell
      courseTitle={data?.title}
      lessonTitle={currentLesson?.title}
      lessonSubtitle={currentLesson?.subtitle}
      lessonIndex={lessonIndex}
      totalLessons={totalLessons}
      onExit={() => router.push("/user/courses")}
      readAloudText={readAloudText}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={lessonIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="min-h-full"
        >
          {renderInteraction()}
        </motion.div>
      </AnimatePresence>

      {showComplete && (
        <CourseCompleteScreen
          courseTitle={data?.title}
          onRestart={handleRestart}
        />
      )}
    </LessonPlayerShell>
  );
};

export default V2CourseEngine;
