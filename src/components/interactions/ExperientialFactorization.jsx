"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle2, X } from 'lucide-react';
import { toast } from 'react-toastify';

const ExperientialFactorization = ({ puzzle, onSolve }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const target = puzzle?.target || 91;
  const num1 = parseInt(input1) || 0;
  const num2 = parseInt(input2) || 0;
  const result = num1 * num2;

  useEffect(() => {
    if (result === target && num1 !== 1 && num2 !== 1 && !isSuccess) {
      setIsSuccess(true);
      toast.success("Correct factorization!");
    }
  }, [result, target, num1, num2, isSuccess]);

  const handleContinue = () => {
    if (onSolve) onSolve();
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500 opacity-50"></div>
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Experiential Puzzle</h3>
          <p className="text-gray-400 font-medium text-sm mt-1">Prime Factorization</p>
        </div>
        <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center">
          <Calculator className="text-indigo-500 w-6 h-6" />
        </div>
      </div>

      <div className="space-y-8 text-center">
        <h4 className="text-2xl font-bold text-gray-700 mb-2">Find the prime factors of <span className="text-indigo-600 font-black">{target}</span></h4>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
          Enter two numbers (other than 1) that multiply together to equal the target.
        </p>

        <div className="flex items-center justify-center gap-6 mb-8">
          <input
            type="number"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            disabled={isSuccess}
            placeholder="?"
            className={`w-32 h-32 text-center text-5xl font-black rounded-3xl border-4 transition-all focus:outline-none focus:ring-4
              ${isSuccess ? 'bg-green-50 border-green-200 text-green-600 shadow-inner' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-400 focus:ring-indigo-100 shadow-md hover:border-indigo-300'}
            `}
          />
          
          <X className="w-12 h-12 text-gray-300" />
          
          <input
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            disabled={isSuccess}
            placeholder="?"
            className={`w-32 h-32 text-center text-5xl font-black rounded-3xl border-4 transition-all focus:outline-none focus:ring-4
              ${isSuccess ? 'bg-green-50 border-green-200 text-green-600 shadow-inner' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-400 focus:ring-indigo-100 shadow-md hover:border-indigo-300'}
            `}
          />
        </div>

        <div className={`p-6 rounded-3xl inline-block min-w-[250px] transition-all duration-500 ${isSuccess ? 'bg-green-50 border-2 border-green-200 shadow-lg shadow-green-100' : 'bg-gray-50 border border-gray-100'}`}>
          <span className={`text-xs font-bold uppercase tracking-widest ${isSuccess ? 'text-green-600' : 'text-gray-400'}`}>Current Result</span>
          <div className={`text-5xl font-black mt-2 font-mono flex justify-center items-center gap-4 ${isSuccess ? 'text-green-600' : 'text-gray-900'}`}>
            {result || 0}
            {isSuccess && <CheckCircle2 className="w-8 h-8 text-green-500 animate-in zoom-in" />}
          </div>
        </div>

        {isSuccess && puzzle?.successMessage && (
          <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl animate-in slide-in-from-bottom-4 duration-500">
            <h4 className="font-bold text-indigo-800 mb-2">Success!</h4>
            <p className="text-indigo-700">{puzzle.successMessage}</p>
            <button
              onClick={handleContinue}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-transform active:scale-95"
            >
              Continue Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperientialFactorization;
