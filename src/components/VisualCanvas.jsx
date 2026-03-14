'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Node for Architectural Primitives
const LegendNode = ({ data, selected }) => (
  <div className={`p-4 rounded-xl shadow-lg border-2 bg-white transition-all ${selected ? 'border-purple ring-2 ring-purple/20' : 'border-gray-100'}`}>
    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple" />
    <div className="flex flex-col items-center gap-2">
      <div className="text-2xl">{data.icon || '📦'}</div>
      <div className="font-black text-xs uppercase tracking-tighter text-black">{data.label}</div>
      <div className="text-[9px] text-gray-500 font-medium uppercase tracking-widest">{data.type}</div>
    </div>
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple" />
  </div>
);

const nodeTypes = {
  architectural: LegendNode,
};

const VisualCanvas = ({ initialNodes = [], onLogicChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
      if (onLogicChange) onLogicChange(nodes, newEdges);
    },
    [edges, nodes, onLogicChange, setEdges]
  );

  const onNodesDelete = useCallback(() => {
    if (onLogicChange) onLogicChange(nodes, edges);
  }, [nodes, edges, onLogicChange]);

  const onNodeDragStop = useCallback(() => {
    if (onLogicChange) onLogicChange(nodes, edges);
  }, [nodes, edges, onLogicChange]);

  return (
    <div className="w-full h-[500px] border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#ddd" gap={20} />
        <Controls />
        <MiniMap 
          nodeColor={(n) => n.selected ? '#40196C' : '#E5E7EB'} 
          maskColor="rgba(0, 0, 0, 0.05)"
          className="!bg-white !rounded-lg !border !border-gray-200"
        />
      </ReactFlow>
      
      {/* Visual Overlay for Aesthetic */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md border border-purple/10 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold text-black uppercase tracking-widest">Logic Engine Active</span>
        </div>
      </div>
    </div>
  );
};

export default VisualCanvas;
