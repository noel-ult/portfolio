"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const PRINCIPLES = [
  {
    text: "I prefer solving one real problem well instead of building ten demo projects.",
    emphasis: "one real problem",
  },
  {
    text: "I like understanding systems before reaching for libraries.",
    emphasis: "understanding systems",
  },
  {
    text: "I value maintainable code over clever code.",
    emphasis: "maintainable code",
  },
  {
    text: "Privacy matters — that's why I'm interested in offline AI.",
    emphasis: "Privacy matters",
  },
  {
    text: "Good documentation is part of good engineering.",
    emphasis: "Good documentation",
  },
  {
    text: "Every project should teach me something new.",
    emphasis: "something new",
  },
];

export function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" className="section-padding" aria-label="Engineering philosophy" ref={ref}>
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
              Philosophy
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              How I like to build
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRINCIPLES.map((principle, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="card p-5 group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {principle.text.split(principle.emphasis).map((part, j) => (
                    <span key={j}>
                      {part}
                      {j < principle.text.split(principle.emphasis).length - 1 && (
                        <span className="text-white font-medium">{principle.emphasis}</span>
                      )}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
