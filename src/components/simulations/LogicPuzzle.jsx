"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const LogicPuzzle = ({ puzzle, onSolve }) => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCheck = () => {
    if (selected === null) {
      toast.info("Please select an answer.");
      return;
    }

    const correct = selected === puzzle.correctIndex;
    setIsCorrect(correct);
    setShowExplanation(true);
    
    if (correct && onSolve) {
      // Small delay before proceeding to let user see "Correct!"
      setTimeout(() => onSolve(), 1500);
    }
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-purple opacity-50"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Conceptual Challenge</h3>
          <p className="text-gray-400 font-medium text-sm mt-1">Select the most logically sound conclusion.</p>
        </div>
        <div className="w-12 h-12 bg-purple/5 border border-purple/10 rounded-2xl flex items-center justify-center">
          <HelpCircle className="text-purple w-6 h-6" />
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple/20 group-hover:bg-purple transition-colors"></div>
          <p className="text-xl text-gray-800 font-semibold leading-relaxed">
            {puzzle.question}
          </p>
        </div>

        <div className="grid gap-4">
          {puzzle.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (isCorrect !== true) {
                  setSelected(idx);
                  setIsCorrect(null);
                  setShowExplanation(false);
                }
              }}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 font-bold text-sm relative group ${
                selected === idx
                  ? isCorrect === true
                    ? 'border-green-500 bg-green-50/50 text-green-700'
                    : isCorrect === false
                    ? 'border-red-500 bg-red-50/50 text-red-700'
                    : 'border-purple bg-purple/5 text-purple shadow-lg scale-[1.01]'
                  : 'border-gray-100 hover:border-purple/20 hover:bg-gray-50 text-gray-500 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option}</span>
                <div className="shrink-0 ml-4">
                  {selected === idx ? (
                    isCorrect === true ? <CheckCircle2 className="w-6 h-6 animate-in zoom-in-50 duration-300" /> : 
                    isCorrect === false ? <XCircle className="w-6 h-6 animate-in zoom-in-50 duration-300" /> : 
                    <div className="w-6 h-6 rounded-full bg-purple flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-100 group-hover:border-purple/20 transition-colors"></div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`p-6 rounded-[2rem] border animate-in slide-in-from-bottom-4 duration-500 ${isCorrect ? 'bg-green-50 border-green-200 shadow-lg shadow-green-100' : 'bg-red-50 border-red-200 shadow-lg shadow-red-100'}`}>
            <div className="flex items-start gap-3">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
               </div>
               <div>
                  <h4 className={`font-bold text-base mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Brilliant Reasoning!' : 'Not Quite Right'}
                  </h4>
                  <p className={`text-sm font-medium leading-relaxed ${isCorrect ? 'text-green-700/80' : 'text-red-700/80'}`}>
                    {puzzle.explanation}
                  </p>
               </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={isCorrect === true || selected === null}
          className={`w-full py-5 rounded-[2rem] font-bold text-lg shadow-2xl transition-all active:scale-95 disabled:grayscale-[0.5] ${
            isCorrect === true
              ? 'bg-green-500 text-white cursor-not-allowed'
              : selected === null 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-purple text-white hover:shadow-purple/30 hover:scale-[1.02] transform'
          }`}
        >
          {isCorrect === true ? 'Verified' : 'Verify Response'}
        </button>
      </div>
    </div>
  );
};

export default LogicPuzzle;
