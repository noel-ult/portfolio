"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import experience from "@/data/experience.json";

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" aria-label="Experience" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="space-y-4">
            <div className="section-label">
              <span>—</span>
              Experience
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Work & Engineering Journey
            </h2>
          </motion.div>

          {/* Experience cards */}
          <div className="space-y-4">
            {experience.map((exp) => (
              <motion.article
                key={exp.id}
                variants={staggerItem}
                className="card p-6 md:p-8 space-y-5"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider font-mono">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#A1A1AA]">
                      <span className="font-medium text-white">{exp.institution}</span>
                    </div>
                  </div>
                  <div className="shrink-0 space-y-1 text-sm text-[#A1A1AA]">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#3B82F6]">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>
                  </div>
                </div>

                {/* Summary & Details */}
                <div className="space-y-2">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {exp.summary}
                  </p>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">
                    {exp.details}
                  </p>
                </div>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
                    <h4 className="text-xs font-semibold text-[#52525B] uppercase tracking-wider font-mono">
                      Key Outcomes & Proof
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#A1A1AA]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
