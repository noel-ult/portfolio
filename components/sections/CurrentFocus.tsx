"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cpu, Bot, Eye } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const BUILDING_CARDS = [
  {
    id: "offline-ai",
    icon: Brain,
    title: "Offline AI Assistant",
    progress: 80,
    challenge: "Improving memory retrieval across long conversations",
    estimated: "September 2026",
    tags: ["Ollama", "LLaMA", "FastAPI", "Python"],
    accent: "#3B82F6",
  },
  {
    id: "robotics-vision",
    icon: Eye,
    title: "Robotics Vision System",
    progress: 45,
    challenge: "Testing OpenCV pipeline under different lighting",
    estimated: "November 2026",
    tags: ["OpenCV", "Python", "MediaPipe", "ROS2"],
    accent: "#22C55E",
  },
  {
    id: "ml-research",
    icon: FlaskConical,
    title: "Machine Learning Research",
    progress: 15,
    challenge: "Searching for meaningful datasets to experiment with",
    estimated: "Ongoing",
    tags: ["PyTorch", "MATLAB", "Research"],
    accent: "#818CF8",
  },
];

import { FlaskConical } from "lucide-react";

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

function BuildingCard({
  card,
}: {
  card: (typeof BUILDING_CARDS)[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });
  const Icon = card.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      className="relative card p-6 space-y-5 overflow-hidden group"
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x} ${mousePos.y}, ${card.accent}0D, transparent 60%)`,
        }}
      />

      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.accent}60, transparent)`,
        }}
      />

      {/* Icon + Title */}
      <div className="flex items-start justify-between gap-3 relative">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: `color-mix(in srgb, ${card.accent} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${card.accent} 25%, transparent)`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: card.accent }} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">{card.title}</h3>
            <span className="text-xs text-[#52525B] font-mono">
              {card.progress === 15 ? "Planning" : `${card.progress}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <ProgressBar progress={card.progress} color={card.accent} />
      </div>

      {/* Current challenge */}
      <div className="space-y-1.5 relative">
        <span className="text-[10px] font-semibold text-[#52525B] uppercase tracking-wider">
          Current challenge
        </span>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">{card.challenge}</p>
      </div>

      {/* Estimated + Tags */}
      <div className="flex items-center justify-between relative">
        <div className="flex flex-wrap gap-1.5">
          {card.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-medium"
              style={{
                background: `color-mix(in srgb, ${card.accent} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${card.accent} 20%, transparent)`,
                color: card.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-[#52525B] font-mono shrink-0 ml-2">
          est. {card.estimated}
        </span>
      </div>
    </motion.div>
  );
}

export function CurrentFocus() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="focus" className="section-padding" aria-label="Currently building" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10"
        >
          <motion.div variants={staggerItem} className="space-y-3">
            <div className="section-label">
              <span>—</span>
              Currently Building
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              What I&apos;m working on right now
            </h2>
            <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
              These are live projects. Progress updates as I go.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {BUILDING_CARDS.map((card) => (
              <BuildingCard key={card.id} card={card} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
