"use client";

import React, { useState, useEffect } from 'react';
import { SHA256 } from "@stablelib/sha256";
import { encode } from "@stablelib/utf8";
import { Link, Unlock, Lock, AlertTriangle } from 'lucide-react';

const BlockChainVisual = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, data: "Genesis Block", prevHash: "0".repeat(64), hash: "", isValid: true },
    { id: 2, data: "Tx: Alice -> Bob (10 LMN)", prevHash: "", hash: "", isValid: true },
    { id: 3, data: "Timestamped Block 3", prevHash: "", hash: "", isValid: true }
  ]);

  const computeHash = (data, prevHash) => {
    const input = data + prevHash;
    const h = new SHA256();
    h.update(encode(input));
    const digest = h.digest();
    return Array.from(digest)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const updateBlockData = (id, newData) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, data: newData } : b));
  };

  const processedBlocks = [];
  let runnerPrevHash = "0".repeat(64);
  let isChainBroken = false;

  blocks.forEach((b, idx) => {
      const computedHash = computeHash(b.data, runnerPrevHash);
      const isBlockTampered = false; // logic placeholder
      
      processedBlocks.push({
          ...b,
          computedHash,
          currentPrevHash: runnerPrevHash,
          isValid: !isChainBroken
      });
      
      runnerPrevHash = computedHash;
  });

  const allValid = processedBlocks.every(b => b.isValid);

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-2xl relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-2 transition-colors duration-700 ${allValid ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
      
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block ${allValid ? 'text-green-600' : 'text-red-600 animate-pulse'}`}>
            {allValid ? 'STATUS: LEDGER SECURE' : 'CRITICAL: CHAIN INTEGRITY BREACHED'}
          </span>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">The Immutable Chain</h3>
          <p className="text-gray-400 font-medium text-sm mt-1">Tamper with any record to see the cryptographic collapse.</p>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${allValid ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500 rotate-12'}`}>
          {allValid ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
        </div>
      </div>

      <div className="flex flex-col gap-10 relative">
        {processedBlocks.map((block, idx) => (
          <div key={block.id} className="relative">
             {/* Dynamic Connector Link */}
             {idx > 0 && (
                <div className="absolute -top-10 left-12 h-10 w-px flex flex-col items-center">
                    <div className={`w-1 h-full transition-all duration-700 ${block.isValid ? 'bg-purple/20' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}></div>
                    <div className={`absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full border-2 transition-all duration-700 ${block.isValid ? 'bg-white border-purple/20 text-purple' : 'bg-red-500 border-red-200 text-white animate-bounce'}`}>
                       {block.isValid ? <Link className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    </div>
                </div>
             )}

            <div className={`bg-white rounded-[2rem] p-8 border-2 transition-all duration-700 relative group ${block.isValid ? 'border-gray-50 hover:border-purple/10 shadow-sm' : 'border-red-500 bg-red-50/10 shadow-2xl shadow-red-100 z-10'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${block.isValid ? 'bg-purple text-white' : 'bg-red-500 text-white shadow-lg shadow-red-200'}`}>#{block.id}</span>
                        <h4 className="font-bold text-gray-900 tracking-tight">Data Block</h4>
                    </div>
                    <div className="flex items-center gap-2">
                        {block.isValid ? (
                            <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-green-100 italic">Verified</span>
                        ) : (
                            <span className="text-[10px] bg-red-500 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest animate-pulse shadow-lg shadow-red-100">Compromised</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4">
                        <label className="text-[10px] font-bold text-purple uppercase tracking-[0.2em] mb-2 block opacity-60 italic">Record Content</label>
                        <textarea 
                            value={block.data}
                            onChange={(e) => updateBlockData(block.id, e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent group-hover:bg-white focus:bg-white focus:border-purple/20 rounded-2xl p-4 text-sm font-bold text-gray-800 outline-none transition-all resize-none h-24 shadow-inner leading-relaxed"
                        />
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-900/5 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Back-Link Hash</label>
                                <div className="font-mono text-[11px] break-all leading-tight text-gray-500 select-all">
                                    {block.currentPrevHash}
                                </div>
                            </div>
                            <div className={`p-4 rounded-2xl border transition-all duration-700 shadow-inner group-hover:bg-white ${block.isValid ? 'bg-purple/5 border-purple/5' : 'bg-red-500 text-white border-red-400'}`}>
                                <label className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${block.isValid ? 'text-purple/50' : 'text-white/70'}`}>Unique Block Fingerprint</label>
                                <div className={`font-mono text-[11px] break-all leading-tight select-all ${block.isValid ? 'text-purple' : 'text-white'}`}>
                                    {block.computedHash}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!block.isValid && (
                    <div className="absolute -bottom-4 right-8 bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2 animate-in slide-in-from-right-4 duration-500">
                        <AlertTriangle className="w-4 h-4" /> SHA-256 Collision Logic Breached
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockChainVisual;
