'use client';

import { useState, useRef } from 'react';

export default function InteractiveHeroGraph() {
  const containerRef = useRef(null);
  const [nodes, setNodes] = useState([
    {
      id: 'center',
      x: 50,
      y: 50,
      label: 'Smart Contract',
      icon: '🔗',
      sizeClasses: 'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32',
      iconClasses: 'w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 bg-purple/10 text-purple text-xl sm:text-2xl lg:text-2xl',
      textClasses: 'text-[10px] sm:text-xs lg:text-sm',
      borderClasses: 'border-purple/10',
      animClasses: '',
      zIndex: 20,
    },
    {
      id: 'security',
      x: 88,
      y: 12,
      label: 'Security',
      icon: '🛡️',
      sizeClasses: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28',
      iconClasses: 'w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 bg-black/5 text-black text-lg sm:text-xl lg:text-xl',
      textClasses: 'text-[9px] sm:text-[10px] lg:text-xs',
      borderClasses: 'border-gray-100',
      animClasses: 'animate-[float_4s_ease-in-out_infinite]',
      linePulse: 'animate-[pulse_2s_infinite]',
      zIndex: 10,
    },
    {
      id: 'logic',
      x: 12,
      y: 88,
      label: 'Logic',
      icon: '⚙️',
      sizeClasses: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28',
      iconClasses: 'w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 bg-purple/5 text-purple text-lg sm:text-xl lg:text-xl',
      textClasses: 'text-[9px] sm:text-[10px] lg:text-xs',
      borderClasses: 'border-gray-100',
      animClasses: 'animate-[float_5s_ease-in-out_infinite_0.5s]',
      linePulse: 'animate-[pulse_2s_infinite_0.5s]',
      zIndex: 10,
    },
    {
      id: 'design',
      x: 0,
      y: 50,
      label: 'Design',
      icon: '💡',
      sizeClasses: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
      iconClasses: 'w-6 h-6 sm:w-8 sm:h-8 lg:w-8 lg:h-8 bg-black/5 text-black text-base sm:text-lg lg:text-lg',
      textClasses: 'text-[8px] sm:text-[9px] lg:text-[10px]',
      borderClasses: 'border-gray-100',
      animClasses: 'animate-[float_6s_ease-in-out_infinite_1s]',
      linePulse: 'animate-[pulse_2s_infinite_1s]',
      zIndex: 10,
    },
    {
      id: 'data',
      x: 75,
      y: 90,
      label: 'Data',
      icon: '📊',
      sizeClasses: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
      iconClasses: 'w-6 h-6 sm:w-8 sm:h-8 lg:w-8 lg:h-8 bg-purple/5 text-purple text-base sm:text-lg lg:text-lg',
      textClasses: 'text-[8px] sm:text-[9px] lg:text-[10px]',
      borderClasses: 'border-gray-100',
      animClasses: 'animate-[float_5.5s_ease-in-out_infinite_1.5s]',
      linePulse: 'animate-[pulse_2.5s_infinite_1.5s]',
      zIndex: 10,
    },
    {
      id: 'network',
      x: 15,
      y: 10,
      label: 'Network',
      icon: '🌐',
      sizeClasses: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28',
      iconClasses: 'w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 bg-black/5 text-black text-lg sm:text-xl lg:text-xl',
      textClasses: 'text-[9px] sm:text-[10px] lg:text-xs',
      borderClasses: 'border-gray-100',
      animClasses: 'animate-[float_4.5s_ease-in-out_infinite_0.8s]',
      linePulse: 'animate-[pulse_1.8s_infinite_0.8s]',
      zIndex: 10,
    }
  ]);

  const [draggingId, setDraggingId] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePointerDown = (id, e) => {
    e.target.setPointerCapture(e.pointerId);
    setDraggingId(id);
    setHasInteracted(true);
    e.preventDefault(); // Prevent text selection/scrolling
  };

  const handlePointerMove = (e) => {
    if (!draggingId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newX = ((e.clientX - rect.left) / rect.width) * 100;
    let newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Boundary constraints (allow slight bleeding)
    newX = Math.max(-10, Math.min(110, newX));
    newY = Math.max(-10, Math.min(110, newY));

    setNodes(prev => prev.map(n => n.id === draggingId ? { ...n, x: newX, y: newY } : n));
  };

  const handlePointerUp = (e) => {
    if (draggingId) {
      e.target.releasePointerCapture(e.pointerId);
      setDraggingId(null);
    }
  };

  const centerNode = nodes.find(n => n.id === 'center');
  const otherNodes = nodes.filter(n => n.id !== 'center');

  return (
    <>
      <div 
        ref={containerRef}
        className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md aspect-square flex items-center justify-center lg:mt-0 touch-none mx-auto"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseLeave={handlePointerUp} 
      >
        {/* Interaction Hint */}
        {!hasInteracted && (
          <div className="absolute -top-6 sm:-top-8 lg:-top-10 right-0 lg:-right-10 bg-purple/10 border border-purple/20 text-purple px-4 py-2 text-xs font-bold rounded-full flex items-center gap-2 animate-bounce z-40 pointer-events-none whitespace-nowrap shadow-sm backdrop-blur-sm">
            👆 Drag to explore
          </div>
        )}

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" style={{ minWidth: '100%', minHeight: '100%' }}>
          {otherNodes.map(n => (
            <line 
              key={`line-${n.id}`} 
              x1={`${centerNode.x}%`} 
              y1={`${centerNode.y}%`} 
              x2={`${n.x}%`} 
              y2={`${n.y}%`} 
              stroke="#E5E7EB" 
              strokeWidth="3" 
              className={`${n.linePulse} sm:stroke-4`} 
              strokeDasharray="8 8" 
            />
          ))}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className="absolute"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              zIndex: draggingId === node.id ? 50 : node.zIndex 
            }}
          >
            {/* Centering Wrapper */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Draggable/Animated Node */}
              <div
                onPointerDown={(e) => handlePointerDown(node.id, e)}
                className={`${node.sizeClasses} bg-white rounded-2xl shadow-xl border ${node.borderClasses} flex flex-col items-center justify-center gap-1 lg:gap-2 cursor-grab active:cursor-grabbing transition-transform duration-200 select-none touch-none ${draggingId === node.id ? 'scale-110 shadow-2xl rotate-[3deg]' : `hover:scale-105 ${node.animClasses}`}`}
                style={{
                  // Stop the float animation completely when dragging to ensure immediate response
                  animation: draggingId === node.id ? 'none' : undefined,
                }}
              >
                <div className={`rounded-xl flex items-center justify-center pointer-events-none ${node.iconClasses}`}>{node.icon}</div>
                <span className={`font-bold text-center leading-tight pointer-events-none text-black ${node.textClasses}`}>{node.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
      `}</style>
    </>
  );
}
