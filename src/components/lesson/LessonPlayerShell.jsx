"use client";

import React from "react";
import { X, Flag, Volume2, Zap } from "lucide-react";
import { useReadAloud } from "../../hooks/useReadAloud";

/**
 * Inclusive lesson shell — Brilliant-style flow, LB Academy brand colors.
 */
const LessonPlayerShell = ({
  children,
  courseTitle,
  lessonTitle,
  lessonSubtitle,
  lessonIndex,
  totalLessons,
  onExit,
  readAloudText,
  footer,
}) => {
  const { readAloud } = useReadAloud();
  const progressPct = totalLessons
    ? Math.round(((lessonIndex + 1) / totalLessons) * 100)
    : 0;

  const handleReadAloud = () => {
    const text = [lessonTitle, lessonSubtitle, readAloudText]
      .filter(Boolean)
      .join(". ");
    readAloud(text);
  };

  return (
    <div
      className="lesson-player fixed inset-0 z-50 flex items-stretch sm:items-center justify-center bg-gradient-to-br from-purple/5 via-gray-50 to-white p-0 sm:p-6 lg:p-8"
      role="application"
      aria-label={`Lesson: ${lessonTitle}`}
    >
      <div className="w-full max-w-5xl lg:max-w-6xl h-full sm:h-auto sm:max-h-[min(920px,100dvh)] bg-white sm:rounded-3xl border border-gray-200/80 flex flex-col overflow-hidden shadow-xl sm:shadow-2xl">
        {/* Top bar */}
        <header className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shrink-0 border-b border-gray-100 bg-white">
          <button
            type="button"
            onClick={onExit}
            className="lesson-focus w-11 h-11 rounded-full flex items-center justify-center text-gray hover:text-purple hover:bg-purple/5 transition-colors"
            aria-label="Exit lesson and return to courses"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>

          <div
            className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPct}
            aria-label={`Course progress: ${progressPct}%`}
          >
            <div
              className="h-full bg-purple rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div
            className="flex items-center gap-1 text-sm font-bold text-gray tabular-nums shrink-0"
            aria-label={`Lesson ${lessonIndex + 1} of ${totalLessons}`}
          >
            <span className="text-purple">{lessonIndex + 1}</span>
            <span className="text-gray-300">/</span>
            <span>{totalLessons}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              className="lesson-focus w-10 h-10 rounded-xl flex items-center justify-center text-gray hover:text-purple hover:bg-purple/5 transition-colors"
              aria-label="Report an issue with this lesson"
              title="Report issue"
            >
              <Flag className="w-4 h-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={handleReadAloud}
              className="lesson-focus w-10 h-10 rounded-xl flex items-center justify-center text-gray hover:text-purple hover:bg-purple/5 transition-colors"
              aria-label="Read lesson aloud"
              title="Read aloud"
            >
              <Volume2 className="w-4 h-4" aria-hidden />
            </button>
          </div>

          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple/10 text-purple"
            title="Streak — coming soon"
            aria-hidden
          >
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold">0</span>
          </div>
        </header>

        {/* Course label */}
        <div className="px-4 sm:px-6 lg:px-8 pt-3 pb-0 shrink-0">
          <p className="text-[10px] font-bold text-purple uppercase tracking-[0.2em] truncate">
            {courseTitle}
          </p>
        </div>

        {/* Content */}
          <main
            id="lesson-main-content"
            className="flex-1 min-h-0 overflow-hidden lesson-scrollbar flex flex-col"
            tabIndex={-1}
          >
          <span className="sr-only">
            {courseTitle}. Lesson {lessonIndex + 1} of {totalLessons}: {lessonTitle}.
          </span>
          {children}
        </main>

        {footer && (
          <footer className="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-5 sm:pb-6 bg-white border-t border-gray-100">
            {footer}
          </footer>
        )}
      </div>

      <div
        id="lesson-live-region"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </div>
  );
};

export default LessonPlayerShell;

export function announceLesson(message) {
  const el = document.getElementById("lesson-live-region");
  if (el) {
    el.textContent = "";
    requestAnimationFrame(() => {
      el.textContent = message;
    });
  }
}

export function LessonActionBar({
  primaryLabel = "Continue",
  onPrimary,
  primaryDisabled = false,
  primaryVariant = "default",
  secondaryLabel,
  onSecondary,
  feedback,
  feedbackType = "success",
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {feedback && (
        <div
          className={`inline-flex items-center text-sm font-bold px-4 py-2 rounded-2xl ${
            feedbackType === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : feedbackType === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-amber-50 text-amber-800 border border-amber-200"
          }`}
          role="status"
        >
          {feedback}
        </div>
      )}
      <div className="flex gap-3">
        {secondaryLabel && onSecondary && (
          <button
            type="button"
            onClick={onSecondary}
            className="lesson-focus flex-1 min-h-[52px] py-3.5 rounded-2xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray transition-colors"
          >
            {secondaryLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled}
          className={`lesson-focus flex-[2] min-h-[52px] py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed ${
            primaryVariant === "success"
              ? "bg-purple hover:bg-purple/90 text-white shadow-md shadow-purple/20"
              : primaryDisabled
                ? "bg-gray-100 text-gray-400"
                : "bg-purple hover:bg-purple/90 text-white shadow-md shadow-purple/20"
          }`}
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  );
}
