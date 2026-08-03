"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Brain, Bot, Wrench, Zap, Code2, Cpu, FlaskConical } from "lucide-react";
import experience from "@/data/experience.json";

const BUILDING_INTERESTS = [
  { label: "Local AI", icon: Brain, color: "#3B82F6" },
  { label: "Robotics", icon: Bot, color: "#22C55E" },
  { label: "Developer Tools", icon: Wrench, color: "#F59E0B" },
  { label: "Automation", icon: Zap, color: "#818CF8" },
  { label: "Practical Software", icon: Code2, color: "#EC4899" },
  { label: "Systems Programming", icon: Cpu, color: "#EF4444" },
  { label: "Machine Learning", icon: FlaskConical, color: "#06B6D4" },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" aria-label="About me" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* What I Enjoy Building */}
          <motion.div variants={staggerItem} className="space-y-6">
            <div className="section-label">
              <span>—</span>
              About
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              What I Enjoy Building
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {BUILDING_INTERESTS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="card p-4 flex items-center gap-3 group"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-medium text-[#A1A1AA] group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Why I Build */}
          <motion.div variants={staggerItem} className="space-y-4 max-w-2xl">
            <h3 className="text-lg font-semibold text-white">Why I build</h3>
            <div className="space-y-3 text-[#A1A1AA] text-sm leading-relaxed">
              <p>
                I like understanding how systems work under the hood. Not in a &quot;read the documentation&quot; way,
                but by taking components apart and re-architecting them from first principles.
              </p>
              <p>
                I focus on practical engineering where software meets real hardware constraints — local AI that runs on 
                your own machine, embedded sensors operating under physical noise, and multi-tenant backends engineered 
                for database isolation.
              </p>
            </div>
          </motion.div>

          {/* Timeline - Replaced with exact required journey */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Engineering Timeline</h3>
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-[88px] top-2 bottom-2 w-px bg-[#27272A]" />

              {experience.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="flex gap-6 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  {/* Year/Period */}
                  <div className="w-[76px] shrink-0 text-right">
                    <span className="text-xs font-mono font-semibold text-[#3B82F6]">
                      {item.period}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative shrink-0 flex items-start justify-center w-3 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27272A] border-2 border-[#3B82F6] z-10" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      {item.title}
                      {item.type && (
                        <span className="text-[10px] font-mono text-[#52525B] px-1.5 py-0.5 rounded bg-[#111111] border border-[#27272A]">
                          {item.type}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-[#3B82F6] font-medium">
                      {item.institution}
                    </div>
                    <div className="text-sm text-[#A1A1AA] leading-relaxed">
                      {item.summary} {item.details}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
