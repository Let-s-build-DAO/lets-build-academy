"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

const CourseCompleteScreen = ({ courseTitle, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 backdrop-blur-md p-6"
      role="dialog"
      aria-labelledby="course-complete-title"
      aria-modal="true"
    >
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-gray-200 p-10 shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple/10 flex items-center justify-center">
          <Trophy className="w-8 h-8 text-purple" aria-hidden />
        </div>
        <h2
          id="course-complete-title"
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Course complete
        </h2>
        <p className="text-gray mb-8 leading-relaxed">
          You finished{" "}
          <span className="font-semibold text-gray-900">{courseTitle}</span>.
          Every concept you solved builds real blockchain intuition.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/user/courses"
            className="lesson-focus flex items-center justify-center gap-2 bg-purple hover:bg-purple/90 text-white px-8 py-3.5 rounded-2xl font-bold min-h-[52px] transition-colors shadow-md shadow-purple/20"
          >
            Back to courses <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="lesson-focus flex items-center justify-center gap-2 text-gray hover:text-purple font-semibold py-3 min-h-[44px] transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden /> Review from the start
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCompleteScreen;
