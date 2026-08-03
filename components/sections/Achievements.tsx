"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import achievements from "@/data/achievements.json";

export function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="section-padding" aria-label="Milestones" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10"
        >
          {/* Header - Renamed title */}
          <motion.div variants={staggerItem} className="space-y-4">
            <div className="section-label">
              <span>—</span>
              Achievements
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Milestones
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base max-w-lg leading-relaxed">
              Awards, scholarships, entrepreneurship programs, and research milestones — with the story behind each one.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                variants={staggerItem}
                className="card p-5 space-y-3 group flex flex-col justify-between"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{ach.icon}</span>
                    <div className="space-y-1">
                      <div className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors">{ach.title}</div>
                      {ach.project && (
                        <div className="text-xs font-mono text-[#3B82F6]">{ach.project}</div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{ach.story}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                  <span className="tag text-[10px]">{ach.category}</span>
                  <span className="text-[10px] text-[#52525B] font-mono">{ach.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
