"use client";

import React, { useState, useEffect } from 'react';
import { SHA256 } from "@stablelib/sha256";
import { encode } from "@stablelib/utf8";
import { Copy, RefreshCw, Zap } from 'lucide-react';

const HashVisual = ({ challengePrefix = "" }) => {
  const [input, setInput] = useState("");
  const [currentHash, setCurrentHash] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [nonce, setNonce] = useState(0);

  const computeHash = (text) => {
    const data = encode(text);
    const h = new SHA256();
    h.update(data);
    const digest = h.digest();
    return Array.from(digest)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  useEffect(() => {
    const h = computeHash(input);
    setCurrentHash(h);
    
    if (challengePrefix && h.startsWith(challengePrefix)) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [input, challengePrefix]);

  const handleMining = () => {
    let currentNonce = nonce;
    let found = false;
    for (let i = 0; i < 1000; i++) {
        currentNonce++;
        const testInput = input + currentNonce;
        const testHash = computeHash(testInput);
        if (challengePrefix && testHash.startsWith(challengePrefix)) {
            setInput(input + currentNonce);
            setNonce(currentNonce);
            found = true;
            break;
        }
    }
    if (!found) setNonce(currentNonce);
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-purple opacity-50"></div>
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">The Hashing Engine</h3>
          <p className="text-gray-400 font-medium text-sm mt-1">Experience the deterministic nature of SHA-256.</p>
        </div>
        <div className="w-12 h-12 bg-purple/5 border border-purple/10 rounded-2xl flex items-center justify-center">
          <Zap className="text-purple w-6 h-6" />
        </div>
      </div>

      <div className="space-y-10">
        <div className="relative group">
          <label className="text-[10px] font-bold text-purple uppercase tracking-[0.2em] mb-3 block opacity-70">Message Input</label>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-40 bg-gray-50 border-2 border-transparent group-hover:bg-white group-focus-within:bg-white group-focus-within:border-purple/20 rounded-3xl p-6 text-gray-800 font-mono text-lg shadow-inner focus:outline-none transition-all resize-none leading-relaxed"
              placeholder="Start typing to generate a hash..."
            />
            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-300 pointer-events-none tracking-widest">DETECTION: ACTIVE</div>
          </div>
        </div>

        <div className="relative scale-100 transition-transform duration-500">
          <label className="text-[10px] font-bold text-purple uppercase tracking-[0.2em] mb-3 block opacity-70">SHA-256 Fingerprint</label>
          <div className={`w-full p-8 rounded-3xl font-mono text-xl sm:text-2xl break-all transition-all duration-700 shadow-2xl relative overflow-hidden flex items-center justify-center min-h-[140px] text-center ${isSuccess ? 'bg-green-500 text-white shadow-green-200' : 'bg-gray-900 text-gray-300 shadow-gray-200'}`}>
            {currentHash || "0".repeat(64)}
            {isSuccess && (
               <div className="absolute inset-0 bg-green-400 animate-pulse opacity-20"></div>
            )}
          </div>
          
          {isSuccess && (
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-xl animate-bounce z-10 border-4 border-white">
              <Zap className="w-6 h-6 fill-current" />
            </div>
          )}
        </div>

        {challengePrefix && (
          <div className={`p-8 rounded-[2rem] border-2 transition-all duration-500 relative group overflow-hidden ${isSuccess ? 'bg-green-50 border-green-200' : 'bg-purple/5 border-purple/10'}`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div>
                <span className="text-[10px] font-bold text-purple uppercase tracking-widest">Computational Goal</span>
                <p className="text-xl font-bold text-gray-900 mt-1">Mine a <span className="text-purple">"{challengePrefix}"</span> Prefix</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Nonce sequence is currently at: {nonce}</p>
              </div>
              <button
                onClick={handleMining}
                disabled={isSuccess}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-xl shrink-0 ${isSuccess ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-purple text-white hover:shadow-purple/30'}`}
              >
                <RefreshCw className={`w-4 h-4 ${!isSuccess && 'group-hover:rotate-180 transition-transform duration-500'}`} /> 
                {isSuccess ? 'Goal Achieved' : 'Brute Force Nonce'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex gap-4">
        <button 
            onClick={() => { navigator.clipboard.writeText(currentHash); toast.success("Fingerprint secured!"); }}
            className="flex-1 border border-gray-100 bg-gray-50 text-gray-500 font-bold py-5 rounded-[2rem] hover:bg-purple/5 hover:text-purple hover:border-purple/10 transition-all flex items-center justify-center gap-3 group"
        >
            <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" /> Copy Fingerprint
        </button>
      </div>
    </div>
  );
};

export default HashVisual;
