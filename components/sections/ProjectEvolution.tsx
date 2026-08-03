"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, GitCommit, Layers, Cpu, Shield, Database, Sparkles, Bot, Brain } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const STAGES = [
  {
    step: "01",
    title: "RyMeds",
    category: "Project",
    description: "Built my first large software project for pharmacy inventory & billing.",
    icon: Layers,
    color: "#3B82F6",
  },
  {
    step: "02",
    title: "CRUD",
    category: "Milestone",
    description: "Mastered transactional persistence, REST methods, and data integrity.",
    icon: Database,
    color: "#60A5FA",
  },
  {
    step: "03",
    title: "PostgreSQL",
    category: "Database",
    description: "Deep dive into SQL schemas, ACID compliance, and concurrency locking.",
    icon: Database,
    color: "#38BDF8",
  },
  {
    step: "04",
    title: "Authentication",
    category: "Security",
    description: "Engineered JWT authorization and database Row-Level Security (RLS).",
    icon: Shield,
    color: "#818CF8",
  },
  {
    step: "05",
    title: "ETLab+",
    category: "Project",
    description: "Built multi-tenant institution lab manager. Won Best S3 Project.",
    icon: Layers,
    color: "#A78BFA",
  },
  {
    step: "06",
    title: "Offline AI Assistant",
    category: "AI Stack",
    description: "Discovered Ollama. Benchmarked LLaMA 3.1 & Mistral 4-bit CPU inference.",
    icon: Brain,
    color: "#F472B6",
  },
  {
    step: "07",
    title: "Robotics",
    category: "Hardware",
    description: "IEEE internship: sensor calibration, complementary filtering, embedded C.",
    icon: Bot,
    color: "#34D399",
  },
  {
    step: "08",
    title: "AI Study Coach",
    category: "Active Focus",
    description: "Integrated offline LLMs with real-time learning analytics.",
    icon: Sparkles,
    color: "#FBBF24",
  },
  {
    step: "09",
    title: "Future (Edge AI)",
    category: "Vision",
    description: "Deploying local vision models and LLMs directly on low-power ARM robotics.",
    icon: Cpu,
    color: "#EC4899",
  },
];

export function ProjectEvolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="evolution" className="section-padding overflow-hidden" aria-label="Project Evolution" ref={ref}>
      <div className="container-wide space-y-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-4"
        >
          <div className="section-label">
            <span>—</span>
            Engineering Roadmap
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Project Evolution
              </h2>
              <p className="text-[#A1A1AA] text-base sm:text-lg max-w-xl leading-relaxed mt-2">
                A horizontal timeline mapping how each project forced me to learn deeper software engineering abstractions.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#52525B]">
              <GitCommit className="w-4 h-4 text-[#3B82F6]" />
              <span>Scroll horizontally to view progression</span>
            </div>
          </div>
        </motion.div>

        {/* Animated Horizontal Roadmap */}
        <div className="relative pt-4 pb-6">
          <div className="overflow-x-auto pb-6 scrollbar-none custom-scrollbar">
            <div className="flex items-stretch gap-4 min-w-[1200px] px-2">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="relative flex-1 min-w-[220px] max-w-[260px] card p-5 flex flex-col justify-between group"
                    whileHover={{ y: -4 }}
                  >
                    {/* Glowing top line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                      style={{ background: stage.color }}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#52525B]">
                          {stage.step}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                          style={{
                            background: `${stage.color}15`,
                            color: stage.color,
                            border: `1px solid ${stage.color}30`,
                          }}
                        >
                          {stage.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${stage.color}18` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: stage.color }} />
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors leading-tight">
                          {stage.title}
                        </h3>
                      </div>

                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    {/* Connection arrow for non-last items */}
                    {i < STAGES.length - 1 && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#111111] border border-[#27272A] flex items-center justify-center text-[#52525B] group-hover:text-[#3B82F6] group-hover:border-[#3B82F6] transition-colors">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
