"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Progress } from "antd";
import { ArrowRight, Zap, Target, ArrowUpRight } from "lucide-react";

const TrackCard = ({ course, userId }) => {
  const isEnrolled = course.progress !== undefined;
  const progress = course.progress || 0;
  
  // Builder identity/level mapped visually based on progress
  const isActive = isEnrolled && progress > 0 && progress < 100;
  const isComplete = progress === 100;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative bg-[#16161f]/80 backdrop-blur-md border rounded-3xl p-6 overflow-hidden flex flex-col transition-all duration-300 ${
        isActive 
          ? "border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)]" 
          : "border-white/5 hover:border-white/10"
      }`}
    >
      {/* Background glow for active tracks */}
      {isActive && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Header section */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
            {isComplete ? (
              <Target className="w-6 h-6 text-green-400" />
            ) : isActive ? (
              <Zap className="w-6 h-6 text-indigo-400" />
            ) : (
              <span className="text-xl font-black text-white/40">
                {course.title.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1.5">
              {course.version === "4.0" || course.version === "2.0" ? "V2 Engine" : "Legacy"}
            </span>
            <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">
              {course.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 relative z-10">
        {course.description || "Interactive journey exploring core concepts."}
      </p>

      {/* Footer / Progression */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto relative z-10">
        {isEnrolled ? (
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className={isComplete ? "text-green-400" : "text-indigo-400"}>
                  {isComplete ? "Mastered" : "In Progress"}
                </span>
                <span className="text-white/60">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    isComplete ? "bg-green-500" : "bg-gradient-to-r from-indigo-600 to-purple-500"
                  }`}
                />
              </div>
            </div>
            
            <Link href={`/user/tracks/${course.id}`}>
              <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0 group">
                <ArrowRight className={`w-4 h-4 ${isActive ? "text-indigo-400 group-hover:text-indigo-300" : "text-gray-400 group-hover:text-white"}`} />
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span>{course.lessons?.length || 0} UNITS</span>
              <span>•</span>
              <span>{course.timeframe || "Self-paced"}</span>
            </div>
            
            <Link href={`/user/tracks/${course.id}`}>
              <button className="px-4 h-9 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-sm font-bold transition-colors flex items-center gap-2">
                Start Track
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TrackCard;
