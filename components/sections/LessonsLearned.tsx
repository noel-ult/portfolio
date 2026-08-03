"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const PRINCIPLES = [
  {
    title: "Simple code usually wins",
    rationale: "Simple code is easier to debug, easier to maintain and easier to explain to someone joining the project later.",
  },
  {
    title: "Building is easier than maintaining",
    rationale: "Shipping the first prototype takes days, but maintaining state consistency, handling edge cases, and supporting dependencies takes months.",
  },
  {
    title: "Every bug teaches something deep",
    rationale: "System failures reveal invalid assumptions about memory, network boundaries, timing, or concurrency that documentation alone rarely highlights.",
  },
  {
    title: "Documentation saves future engineers",
    rationale: "Writing down architectural decisions, schemas, and trade-offs prevents context loss and saves hours when revisiting codebase months later.",
  },
  {
    title: "Small improvements compound quickly",
    rationale: "Refactoring one component, cleaning one database query, and writing one test per day transforms a fragile codebase into a resilient platform.",
  },
  {
    title: "Read error messages completely",
    rationale: "The exact line number, call stack, and root failure reason are almost always present in the un-truncated trace if you take time to read it.",
  },
  {
    title: "Sleep on hard technical problems",
    rationale: "Stepping away from the keyboard allows subconscious pattern recognition to resolve complex bugs far faster than brute-force midnight sessions.",
  },
  {
    title: "The best tool is the one you understand",
    rationale: "Reaching for familiar, transparent primitives yields reliable results faster than introducing heavy frameworks with opaque abstraction layers.",
  },
];

export function LessonsLearned() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="lessons" className="section-padding" aria-label="Engineering Principles" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10"
        >
          {/* Header - Renamed title */}
          <motion.div variants={staggerItem} className="space-y-3">
            <div className="section-label">
              <span>—</span>
              Principles
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Engineering Principles
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base max-w-xl leading-relaxed">
              Core beliefs forged through building software, debugging hardware, and refining real-world applications.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRINCIPLES.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="card p-5 flex flex-col justify-between space-y-3 group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#3B82F6] font-mono text-xs shrink-0 font-bold">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-[#A1A1AA] leading-relaxed pt-2 border-t border-[#1a1a1a]">
                  {item.rationale}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
