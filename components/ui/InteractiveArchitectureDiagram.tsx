"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Sparkles, CheckCircle2 } from "lucide-react";

interface NodeItem {
  id: string;
  name: string;
  subtext: string;
  detail: string;
}

const DEFAULT_NODES: NodeItem[] = [
  {
    id: "react",
    name: "React 18 Dashboard",
    subtext: "Frontend Client",
    detail: "Handles user prompt input, interval charts, SSE streaming data rendering, and dark-theme state management.",
  },
  {
    id: "fastapi",
    name: "FastAPI Engine",
    subtext: "REST & SSE Middleware",
    detail: "Low-overhead Python 3.11 service proxying real-time tokens via Server-Sent Events to client components.",
  },
  {
    id: "auth",
    name: "Authentication / RLS",
    subtext: "Security Policy",
    detail: "Validates local JWT session tokens and scopes PostgreSQL Row-Level Security parameters before execution.",
  },
  {
    id: "db",
    name: "PostgreSQL / SQLite",
    subtext: "Persistence Layer",
    detail: "Stores transactional session histories, user settings, and normalized metadata with ACID guarantees.",
  },
  {
    id: "llm",
    name: "Local Ollama LLM",
    subtext: "Quantized Inference (Q4_K_M)",
    detail: "Runs GGUF models (LLaMA 3.1 8B / Mistral 7B) on host CPU RAM with zero cloud network calls.",
  },
  {
    id: "response",
    name: "Streamed Response",
    subtext: "UI Rendering Output",
    detail: "Token stream parsed dynamically in real-time, feeding formatted markdown and code blocks back to user.",
  },
];

export function InteractiveArchitectureDiagram({
  customNodes,
}: {
  customNodes?: NodeItem[];
}) {
  const nodes = customNodes && customNodes.length > 0 ? customNodes : DEFAULT_NODES;
  const [activeNode, setActiveNode] = useState<NodeItem>(nodes[0]);

  return (
    <div className="card p-6 bg-[#09090b] border-[#27272A] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1a1a1a] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#3B82F6] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive System Flow Diagram
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Click any node below to inspect its operational role in the pipeline.
          </p>
        </div>
        <div className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded border border-[#22C55E]/20 self-start sm:self-auto">
          ● Live Animated Flow
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative py-4 overflow-x-auto">
        <svg
          viewBox="0 0 900 160"
          className="w-full min-w-[700px] h-auto overflow-visible select-none"
          aria-label="Interactive Architecture Diagram"
        >
          {/* Animated signal pulses across connecting lines */}
          {nodes.map((_, i) => {
            if (i === nodes.length - 1) return null;
            const x1 = 70 + i * 140;
            const x2 = 70 + (i + 1) * 140;
            return (
              <g key={`line-${i}`}>
                {/* Background path line */}
                <line
                  x1={x1 + 60}
                  y1="70"
                  x2={x2 - 60}
                  y2="70"
                  stroke="#27272A"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Animated signal dot */}
                <motion.circle
                  cx={x1 + 60}
                  cy="70"
                  r="3.5"
                  fill="#3B82F6"
                  animate={{
                    cx: [x1 + 60, x2 - 60],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                />
                {/* Direction arrow */}
                <polygon
                  points={`${x2 - 64},66 ${x2 - 58},70 ${x2 - 64},74`}
                  fill="#3B82F6"
                  opacity="0.8"
                />
              </g>
            );
          })}

          {/* Node SVG Boxes */}
          {nodes.map((node, i) => {
            const x = 70 + i * 140;
            const isSelected = activeNode.id === node.id;
            return (
              <g
                key={node.id}
                onClick={() => setActiveNode(node)}
                className="cursor-pointer group"
              >
                {/* Outer halo shadow */}
                <rect
                  x={x - 55}
                  y="30"
                  width="110"
                  height="80"
                  rx="12"
                  fill={isSelected ? "#3B82F6" : "#111111"}
                  fillOpacity={isSelected ? "0.15" : "0.8"}
                  stroke={isSelected ? "#3B82F6" : "#27272A"}
                  strokeWidth={isSelected ? "2" : "1"}
                  className="transition-all duration-300 group-hover:stroke-[#3B82F6]"
                />

                {/* Node Step Number Badge */}
                <circle
                  cx={x - 40}
                  cy="45"
                  r="9"
                  fill={isSelected ? "#3B82F6" : "#18181B"}
                  stroke={isSelected ? "#3B82F6" : "#27272A"}
                />
                <text
                  x={x - 40}
                  y="46"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#ffffff" : "#A1A1AA"}
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fontWeight="bold"
                >
                  {i + 1}
                </text>

                {/* Node Title */}
                <text
                  x={x}
                  y="66"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="var(--font-mono)"
                >
                  {node.name.split(" ")[0]}
                </text>
                <text
                  x={x}
                  y="80"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#A1A1AA"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                >
                  {node.name.split(" ").slice(1).join(" ").slice(0, 14)}
                </text>

                {/* Subtext */}
                <text
                  x={x}
                  y="96"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#3B82F6" : "#52525B"}
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                >
                  {node.subtext.slice(0, 16)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Inspector Details Box */}
      <motion.div
        key={activeNode.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 bg-[#111114] border-[#3B82F6]/30 space-y-2"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
          <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
          <span>Selected Node: {activeNode.name}</span>
          <span className="text-[#52525B]">({activeNode.subtext})</span>
        </div>
        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          {activeNode.detail}
        </p>
      </motion.div>
    </div>
  );
}
