'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Fake Cursor Component simulating user interaction
const FakeCursor = ({ x, y, clicked, name, fillClass, borderClass, bgClass, duration }) => (
  <div 
    className="absolute z-50 pointer-events-none flex flex-col items-start"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`, 
      transform: clicked ? 'scale(0.8)' : 'scale(1)',
      transition: `left ${duration}ms ease-in-out, top ${duration}ms ease-in-out, transform 150ms ease-out`
    }}
  >
    <div className="relative flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.3))' }}>
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35Z" className={fillClass} stroke="white" strokeWidth="1.5" />
      </svg>
      
      {/* Fast ripple effect on click */}
      {clicked && (
        <div 
          className={`absolute w-8 h-8 rounded-full border-2 ${borderClass} opacity-0`} 
          style={{ animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1) forwards' }}
        />
      )}
    </div>
    {name && (
      <div className={`ml-4 mt-[-6px] px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-md ${bgClass}`}>
        {name}
      </div>
    )}
  </div>
);

// Window A (Top Left)
function WindowA({ reorderActive, toggleActive, isMobile }) {
  return (
    <div 
      className="absolute w-[130px] md:w-[160px] bg-white rounded-[1rem] shadow-[0_12px_32px_rgba(0,0,0,0.08)] p-3 select-none z-30 flex flex-col"
      style={isMobile ? { left: '5%', top: '5%', transform: 'rotate(-5deg)' } : { left: '-15%', top: '-25%', transform: 'rotate(-5deg)' }}
    >
       <div className="flex gap-1.5 mb-3">
         <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
         <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
         <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
       </div>
       
       {/* Effect 2: Drag and Drop Reorder List */}
       <div className="relative h-14 mb-3">
         {/* Item 1 (Top) */}
         <div className={`absolute top-0 left-0 w-full h-5 rounded-md bg-violet-100 border border-violet-200 flex items-center px-2 transition-transform ${reorderActive ? 'translate-y-[140%] duration-1000 ease-in-out z-20' : 'translate-y-0 duration-1500 ease-in-out z-10'}`}>
           <div className="w-1/2 h-1.5 bg-violet-300 rounded-full" />
         </div>
         {/* Item 2 (Bottom) */}
         <div className={`absolute top-[60%] left-0 w-full h-5 rounded-md bg-indigo-50 border border-indigo-100 flex items-center px-2 transition-transform ${reorderActive ? 'translate-y-[-140%] duration-1000 ease-in-out z-10' : 'translate-y-0 duration-1500 ease-in-out z-20'}`}>
           <div className="w-2/3 h-1.5 bg-indigo-200 rounded-full" />
         </div>
       </div>
       
       {/* Effect 3a: Toggle Switch */}
       <div className="h-10 bg-gray-50 border border-gray-100 rounded-lg w-full flex items-center px-2 gap-2 relative">
         <div className={`w-10 h-5 rounded-full flex items-center p-0.5 transition-colors duration-1000 ${toggleActive ? 'bg-green-400' : 'bg-gray-300'}`}>
           <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${toggleActive ? 'translate-x-5 duration-1000 ease-in-out' : 'translate-x-0 duration-1500 ease-in-out'}`} />
         </div>
       </div>
    </div>
  );
}

// Window B (Bottom Right)
function WindowB({ sliderActive, cardSwiped, isMobile }) {
  return (
    <div 
      className="absolute w-[140px] md:w-[170px] bg-white rounded-[1rem] shadow-[0_16px_40px_rgba(0,0,0,0.1)] p-3 select-none z-30 flex flex-col"
      style={isMobile ? { left: '45%', top: '55%', transform: 'rotate(6deg)' } : { left: '85%', top: '65%', transform: 'rotate(6deg)' }}
    >
       <div className="flex gap-1.5 mb-3">
         <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
         <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
         <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
       </div>
       
       {/* Effect 1: Horizontal Slider */}
       <div className="relative h-6 bg-pink-50 rounded-full flex items-center px-1 mb-3">
         <div className={`absolute left-0 h-full bg-pink-200 rounded-full transition-all ${sliderActive ? 'w-[85%] duration-1000 ease-in-out' : 'w-[25%] duration-1500 ease-in-out'}`} />
         <div className={`absolute w-5 h-5 bg-white shadow-sm border border-pink-100 rounded-full transition-all ${sliderActive ? 'left-[75%] duration-1000 ease-in-out' : 'left-[10%] duration-1500 ease-in-out'}`} />
       </div>
       
       {/* Effect 3b: Swipeable Card */}
       <div className="relative h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
         <div className="absolute inset-0 flex items-center justify-end px-3">
           <div className="w-4 h-4 bg-red-400 rounded-full" />
         </div>
         <div className={`absolute inset-0 bg-blue-50 rounded-lg border border-blue-100 flex items-center px-2 transition-transform ${cardSwiped ? 'translate-x-[110%] duration-1000 ease-in-out' : 'translate-x-0 duration-1500 ease-in-out'}`}>
           <div className="w-2/3 h-2 bg-blue-300 rounded-full" />
         </div>
       </div>
    </div>
  );
}

// Extracted Interactive Scene to allow dual-rendering for responsive layout
function InteractiveScene({ tick, isMobile }) {
  // Mobile targets are shifted to match the new Window positions on mobile screens
  const targetA_item1      = isMobile ? { x: 14, y: 12 } : { x: -6, y: -18 }; 
  const targetA_item2      = isMobile ? { x: 14, y: 27 } : { x: -6, y: -3 }; 
  const targetA_toggle_off = isMobile ? { x: 10, y: 37 } : { x: -10, y: 7 }; 
  const targetA_toggle_on  = isMobile ? { x: 16, y: 37 } : { x: -4, y: 7 }; 

  const targetB_slider_start = isMobile ? { x: 48, y: 64 } : { x: 88, y: 74 };  
  const targetB_slider_end   = isMobile ? { x: 64, y: 64 } : { x: 104, y: 74 }; 
  const targetB_card_start   = isMobile ? { x: 55, y: 82 } : { x: 95, y: 92 }; 
  const targetB_card_end     = isMobile ? { x: 85, y: 82 } : { x: 125, y: 92 }; 

  let o_pos = targetA_item1;
  let b_pos = targetB_slider_start;
  let o_duration = 2000;
  let b_duration = 2000;
  let o_click = false;
  let b_click = false;

  // --- BOMA Logic Timeline ---
  if (tick >= 4 && tick < 11) {
    b_pos = targetB_slider_end;
    if (tick === 4) b_duration = 1000;
  } else if (tick >= 11 && tick < 19) {
    b_pos = targetA_toggle_off;
    if (tick === 11) b_duration = 2000;
  } else if (tick >= 19 && tick < 25) {
    b_pos = targetA_toggle_on;
    if (tick === 19) b_duration = 1000;
  } else if (tick >= 25) {
    b_pos = targetB_slider_start;
    if (tick === 25) b_duration = 2000;
  }
  
  if (tick >= 3 && tick <= 5) b_click = true;
  if (tick >= 18 && tick <= 20) b_click = true;

  // --- OVUNDAH Logic Timeline ---
  if (tick >= 8 && tick < 13) {
    o_pos = targetA_item2;
    if (tick === 8) o_duration = 1000;
  } else if (tick >= 13 && tick < 19) {
    o_pos = targetB_card_start;
    if (tick === 13) o_duration = 2000;
  } else if (tick >= 19 && tick < 23) {
    o_pos = targetB_card_end;
    if (tick === 19) o_duration = 1000;
  } else if (tick >= 23) {
    o_pos = targetA_item1;
    if (tick === 23) o_duration = 2000;
  }

  if (tick >= 7 && tick <= 9) o_click = true;
  if (tick >= 18 && tick <= 20) o_click = true;

  const sliderActive = (tick >= 4 && tick < 11);
  const reorderActive = (tick >= 8 && tick < 13);
  const toggleActive = (tick >= 19 && tick < 25);
  const cardSwiped = (tick >= 19 && tick < 23);

  return (
    <>
      <WindowA reorderActive={reorderActive} toggleActive={toggleActive} isMobile={isMobile} />
      <WindowB sliderActive={sliderActive} cardSwiped={cardSwiped} isMobile={isMobile} />
      <FakeCursor 
        x={o_pos.x} y={o_pos.y} clicked={o_click} duration={o_duration}
        name="Ovundah" fillClass="fill-violet-500" borderClass="border-violet-500" bgClass="bg-violet-500"
      />
      <FakeCursor 
        x={b_pos.x} y={b_pos.y} clicked={b_click} duration={b_duration}
        name="Boma" fillClass="fill-emerald-500" borderClass="border-emerald-500" bgClass="bg-emerald-500"
      />
    </>
  );
}

export default function HeroSection() {
  const [tick, setTick] = useState(0);

  // Unified global tick engine running at 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => (t + 1) % 31);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-4 md:pt-10 pb-10 md:pb-40 px-6 flex flex-col items-center text-center" style={{ minHeight: '80vh' }}>
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center pointer-events-none mt-0 md:mt-12 w-full">
        
        {/* Desktop Title & Interactive Scene Container */}
        <div className="relative inline-block mb-6 md:mb-10 pointer-events-auto">
          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-[-0.04em] text-[#111111] leading-[0.95] relative z-20 px-8 py-4">
            Learn by<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40196c] to-[#2d124c]">thinking.</span>
          </h1>
          
          {/* Desktop Interactive Scene (Hidden on mobile) */}
          <div className="hidden md:block absolute inset-0 z-30">
            <InteractiveScene tick={tick} isMobile={false} />
          </div>
        </div>

        <p className="text-lg md:text-2xl text-gray-500 font-medium max-w-2xl mb-8 md:mb-12 leading-relaxed pointer-events-auto relative z-20">
          Guided interactive problem solving for Web3 and Smart Contracts. Master the logic behind blockchain architecture.
        </p>

        <div className="flex justify-center w-full pointer-events-auto relative z-20">
          <style>{`
            @keyframes shadow-pulse {
              0% { box-shadow: 0 0 0 0 rgba(64, 25, 108, 0.6); }
              70% { box-shadow: 0 0 0 12px rgba(64, 25, 108, 0); }
              100% { box-shadow: 0 0 0 0 rgba(64, 25, 108, 0); }
            }
          `}</style>
          
          <Link href="/auth" className="inline-block">
            <button 
              className="px-8 py-3.5 bg-[#40196c] hover:bg-[#2d124c] text-white rounded-full font-bold text-base transition-all hover:-translate-y-0.5"
              style={{ animation: 'shadow-pulse 1.5s infinite' }}
            >
              Start Learning
            </button>
          </Link>
        </div>

        {/* Mobile Interactive Scene (Hidden on desktop, placed below button) */}
        <div className="block md:hidden relative mt-8 w-full max-w-[320px] h-[260px] pointer-events-auto z-30 mx-auto">
          <InteractiveScene tick={tick} isMobile={true} />
        </div>
        
      </div>
    </section>
  );
}
