"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Wrench, ShieldAlert, CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import failures from "@/data/failures.json";

export function ThingsIveBroken() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="broken" className="section-padding" aria-label="Failure Log" ref={ref}>
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
              Honesty Corner
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Failure Log
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base max-w-xl leading-relaxed">
              Real engineering mistakes, root-cause diagnoses, solutions, and operational lessons.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {failures.map((item, i) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="card p-6 space-y-4 flex flex-col justify-between group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/20 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Failure #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* What Happened */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-wider block font-semibold">
                      What Happened
                    </span>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {item.whatHappened}
                    </p>
                  </div>

                  {/* Why */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-wider block font-semibold">
                      Why It Happened
                    </span>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      {item.why}
                    </p>
                  </div>

                  {/* Fix */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#3B82F6] uppercase tracking-wider block font-semibold">
                      The Fix
                    </span>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      {item.fix}
                    </p>
                  </div>
                </div>

                {/* Lesson */}
                <div className="pt-3 border-t border-[#1a1a1a] space-y-1">
                  <span className="text-[10px] font-mono text-[#22C55E] uppercase tracking-wider block font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Key Lesson
                  </span>
                  <p className="text-xs text-white font-medium italic">
                    &quot;{item.lesson}&quot;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
