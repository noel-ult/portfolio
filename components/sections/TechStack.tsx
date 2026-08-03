"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/animations";
import skills from "@/data/skills.json";

const CATEGORIES = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "ai", label: "AI & ML" },
  { key: "databases", label: "Databases" },
  { key: "developerTools", label: "Developer Tools" },
  { key: "operatingSystems", label: "Operating Systems" },
  { key: "currentlyLearning", label: "Currently Learning" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  languages: "#3B82F6",
  frameworks: "#818CF8",
  backend: "#22C55E",
  frontend: "#F59E0B",
  ai: "#EC4899",
  databases: "#06B6D4",
  developerTools: "#A1A1AA",
  operatingSystems: "#EF4444",
  currentlyLearning: "#34D399",
};

interface SkillItem {
  name: string;
  projectSlug?: string | null;
}

export function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="section-padding" aria-label="Technology Stack" ref={ref}>
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
              Tech Stack
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Technology Stack
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base max-w-lg leading-relaxed">
              No arbitrary percentage bars. Organized by engineering discipline with links to live case studies utilizing each tool.
            </p>
          </motion.div>

          {/* 9 Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const items = (skills as unknown as Record<string, SkillItem[]>)[cat.key] ?? [];
              const color = CATEGORY_COLORS[cat.key] ?? "#A1A1AA";
              return (
                <motion.div key={cat.key} variants={staggerItem} className="card p-5 space-y-3">
                  <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#1a1a1a] pb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                    />
                    {cat.label}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {items.map((skill, idx) => (
                      skill.projectSlug ? (
                        <Link
                          key={`${cat.key}-${skill.name}-${idx}`}
                          href={`/projects/${skill.projectSlug}`}
                          className="skill-chip hover:border-[#3B82F6] hover:text-white transition-all inline-flex items-center gap-1 group"
                          title={`View project using ${skill.name}`}
                        >
                          <span>{skill.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-[#52525B] group-hover:text-[#3B82F6] transition-colors" />
                        </Link>
                      ) : (
                        <span
                          key={`${cat.key}-${skill.name}-${idx}`}
                          className="skill-chip cursor-default"
                        >
                          {skill.name}
                        </span>
                      )
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
