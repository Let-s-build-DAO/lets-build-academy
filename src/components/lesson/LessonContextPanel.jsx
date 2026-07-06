"use client";

import React from "react";
import LessonRichText from "./LessonRichText";
import { motion } from "framer-motion";

/** Left context panel for simulation-style lessons */
const LessonContextPanel = ({ lesson }) => {
  if (!lesson) return null;

  return (
    <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200/80 bg-white overflow-y-auto">
      <div className="p-6 lg:p-8">
        <p className="text-[10px] font-bold text-purple uppercase tracking-[0.2em] mb-3">
          Concept
        </p>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-1">
          {lesson.title}
        </h2>
        {lesson.subtitle && (
          <p className="text-sm text-gray-500 mb-5">{lesson.subtitle}</p>
        )}
        {lesson.body && (
          <LessonRichText
            html={lesson.body}
            className="text-sm text-gray-600 leading-relaxed mb-6"
          />
        )}
        {lesson.instruction && (
          <div className="p-4 rounded-2xl bg-purple/5 border border-purple/10">
            <p className="text-[10px] font-bold text-purple uppercase tracking-wider mb-2">
              Your task
            </p>
            <LessonRichText
              html={lesson.instruction}
              className="text-sm font-medium text-gray-700 leading-relaxed"
            />
          </div>
        )}
        {lesson.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonContextPanel;
