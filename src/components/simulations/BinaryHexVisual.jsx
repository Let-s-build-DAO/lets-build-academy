"use client";

import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle2, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

const BinaryHexVisual = ({ config, onComplete }) => {
  const [bits, setBits] = useState(Array(8).fill(0));
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleBit = (index) => {
    if (isSuccess) return;
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const getDecimal = () => {
    return parseInt(bits.join(''), 2);
  };

  const getHex = () => {
    return getDecimal().toString(16).padStart(2, '0').toLowerCase();
  };

  useEffect(() => {
    if (config?.successCondition) {
      const target = config.successCondition.match(/'([^']+)'/)?.[1];
      if (target && getHex() === target.toLowerCase() && !isSuccess) {
        setIsSuccess(true);
        toast.success("Hexadecimal match confirmed!");
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 2000);
      }
    }
  }, [bits, config, isSuccess, onComplete]);

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 opacity-50"></div>
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Binary / Hex Engine</h3>
          <p className="text-gray-400 font-medium text-sm mt-1">Live base-16 conversion</p>
        </div>
        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center">
          <Settings className="text-blue-500 w-6 h-6 animate-[spin_4s_linear_infinite]" />
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">8-Bit Binary Input</span>
          </div>
          <div className="flex justify-between gap-2">
            {bits.map((bit, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <span className="text-[10px] text-gray-400 font-bold mb-2">2^{7 - idx}</span>
                <button
                  onClick={() => toggleBit(idx)}
                  className={`w-full h-16 rounded-xl flex items-center justify-center text-2xl font-black transition-all duration-300 transform shadow-md
                    ${bit === 1 
                      ? 'bg-blue-500 text-white border-b-4 border-blue-700 shadow-blue-500/30 -translate-y-1' 
                      : 'bg-gray-100 text-gray-400 border-b-4 border-gray-200 hover:bg-gray-200'}
                    ${isSuccess ? 'opacity-80 cursor-not-allowed' : 'hover:scale-105 active:scale-95 active:translate-y-0 active:border-b-0'}
                  `}
                >
                  {bit}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <div className="bg-gray-50 p-6 rounded-3xl relative overflow-hidden group">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base 10 (Decimal)</span>
            <div className="text-5xl font-black text-gray-900 mt-2 font-mono">
              {getDecimal()}
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-200/50 rounded-full blur-2xl group-hover:bg-blue-200/50 transition-colors"></div>
          </div>
          
          <div className={`p-6 rounded-3xl relative overflow-hidden group transition-all duration-500 ${isSuccess ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-100'}`}>
            <span className={`text-xs font-bold uppercase tracking-widest ${isSuccess ? 'text-green-600' : 'text-blue-500'}`}>Base 16 (Hexadecimal)</span>
            <div className={`text-5xl font-black mt-2 font-mono flex items-center gap-4 ${isSuccess ? 'text-green-600' : 'text-blue-600'}`}>
              0x{getHex()}
              {isSuccess && <CheckCircle2 className="w-8 h-8 text-green-500 animate-in zoom-in" />}
            </div>
          </div>
        </div>

        {config?.successCondition && !isSuccess && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center justify-between animate-pulse">
            <span className="text-amber-800 font-bold text-sm">{config.successCondition}</span>
            <ChevronRight className="w-5 h-5 text-amber-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BinaryHexVisual;
