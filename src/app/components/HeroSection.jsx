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
function WindowA({ reorderActive, toggleActive }) {
  return (
    <div 
      className="absolute w-[130px] md:w-[160px] bg-white rounded-[1rem] shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-gray-100 p-3 select-none z-30 flex flex-col"
      style={{ left: '-15%', top: '-25%', transform: 'rotate(-5deg)' }}
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
function WindowB({ sliderActive, cardSwiped }) {
  return (
    <div 
      className="absolute w-[140px] md:w-[170px] bg-white rounded-[1rem] shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-3 select-none z-30 flex flex-col"
      style={{ left: '85%', top: '85%', transform: 'rotate(6deg)' }}
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

export default function HeroSection() {
  const [tick, setTick] = useState(0);

  // Staggered Tick Engine (runs every 500ms for extremely precise sequence timing)
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => (t + 1) % 27);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Precise coordinates for dragging elements
  const targetA_item1      = { x: -6, y: -18 }; 
  const targetA_item2      = { x: -6, y: -3 }; 
  const targetA_toggle_off = { x: -10, y: 7 }; 
  const targetA_toggle_on  = { x: -4, y: 7 }; 

  const targetB_slider_start = { x: 88, y: 94 };  
  const targetB_slider_end   = { x: 104, y: 94 }; 
  const targetB_card_start   = { x: 95, y: 112 }; 
  const targetB_card_end     = { x: 125, y: 112 }; 

  // Initialize cursor state
  let o_pos = targetA_item1;
  let b_pos = targetB_slider_start;
  let o_duration = 2000;
  let b_duration = 2000;
  let o_click = false;
  let b_click = false;

  // Boma Logic Timeline (Effect 1 & 3a)
  if (tick >= 4 && tick < 11) {
    b_pos = targetB_slider_end;
    if (tick === 4 || tick === 5) b_duration = 1000; // Dragging slider
  } else if (tick >= 11 && tick < 16) {
    b_pos = targetA_toggle_off;
    if (tick >= 11 && tick <= 14) b_duration = 2000; // Traveling to Window A
  } else if (tick >= 16 && tick < 19) {
    b_pos = targetA_toggle_on;
    if (tick === 16 || tick === 17) b_duration = 1000; // Dragging toggle
  } else if (tick >= 19) {
    b_pos = targetB_slider_start;
    b_duration = 2000; // Resetting home
  }
  
  if (tick === 3 || tick === 4 || tick === 5) b_click = true; // Slider drag
  if (tick === 15 || tick === 16 || tick === 17) b_click = true; // Toggle drag

  // Ovundah Logic Timeline (Effect 2 & 3b)
  if (tick >= 8 && tick < 11) {
    o_pos = targetA_item2;
    if (tick === 8 || tick === 9) o_duration = 1000; // Dragging list item
  } else if (tick >= 11 && tick < 16) {
    o_pos = targetB_card_start;
    if (tick >= 11 && tick <= 14) o_duration = 2000; // Traveling to Window B
  } else if (tick >= 16 && tick < 19) {
    o_pos = targetB_card_end;
    if (tick === 16 || tick === 17) o_duration = 1000; // Swiping card
  } else if (tick >= 19) {
    o_pos = targetA_item1;
    o_duration = 2000; // Resetting home
  }

  if (tick === 7 || tick === 8 || tick === 9) o_click = true; // Reorder drag
  if (tick === 15 || tick === 16 || tick === 17) o_click = true; // Card drag

  // UI state bindings (Synced exactly to cursor drags)
  const sliderActive = (tick >= 4 && tick < 19);
  const reorderActive = (tick >= 8 && tick < 19);
  const toggleActive = (tick >= 16 && tick < 19);
  const cardSwiped = (tick >= 16 && tick < 19);

  return (
    <section className="relative pt-32 pb-40 px-6 flex flex-col items-center text-center" style={{ minHeight: '80vh' }}>
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center pointer-events-none mt-12">
        
        {/* Container for text, windows, and multiplayer cursors */}
        <div className="relative inline-block mb-10 pointer-events-auto">
          
          <WindowA reorderActive={reorderActive} toggleActive={toggleActive} />
          
          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-[-0.04em] text-[#111111] leading-[0.95] relative z-20 px-8 py-4">
            Learn by<br />
            <span>thinking.</span>
          </h1>
          
          <WindowB sliderActive={sliderActive} cardSwiped={cardSwiped} />

          {/* Multiplayer Cursors */}
          <FakeCursor 
            x={o_pos.x} y={o_pos.y} clicked={o_click} duration={o_duration}
            name="Ovundah" 
            fillClass="fill-violet-500" borderClass="border-violet-500" bgClass="bg-violet-500"
          />
          <FakeCursor 
            x={b_pos.x} y={b_pos.y} clicked={b_click} duration={b_duration}
            name="Boma" 
            fillClass="fill-emerald-500" borderClass="border-emerald-500" bgClass="bg-emerald-500"
          />
          
        </div>

        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-12 leading-relaxed pointer-events-auto relative z-20">
          Guided interactive problem solving for Web3 and Smart Contracts. Master the logic behind blockchain architecture.
        </p>

        <div className="flex justify-center w-full pointer-events-auto relative z-20">
          <div className="relative w-3/4 sm:w-[220px]">
            {/* Heartbeat impulse ring */}
            <div className="absolute inset-0 bg-[#222222] rounded-[1.25rem] animate-ping opacity-25" style={{ animationDuration: '2s' }} />
            <Link href="/auth" className="relative block w-full">
              <button className="w-full px-8 py-5 bg-[#222222] hover:bg-black text-white rounded-[1.25rem] font-bold text-lg transition-all shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">
                Start Learning
              </button>
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
}
