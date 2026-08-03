"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Award, ArrowRight, GitBranch } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { staggerContainer, staggerItem } from "@/lib/animations";
import projects from "@/data/projects.json";
import Link from "next/link";

type Project = (typeof projects)[0];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

function ArchitectureDiagram({ diagram }: { diagram?: { nodes: string[] } }) {
  if (!diagram || !diagram.nodes) return null;
  const nodes = diagram.nodes;
  const nodeHeight = 36;
  const nodeGap = 16;
  const totalHeight = nodes.length * nodeHeight + (nodes.length - 1) * nodeGap + 32;
  const svgWidth = 320;
  const nodeWidth = 240;
  const startX = (svgWidth - nodeWidth) / 2;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${totalHeight}`}
      className="w-full max-w-xs mx-auto"
      aria-label="Architecture diagram"
    >
      {nodes.map((node, i) => {
        const y = 16 + i * (nodeHeight + nodeGap);
        return (
          <g key={node}>
            {/* Connection line to next node */}
            {i < nodes.length - 1 && (
              <line
                x1={svgWidth / 2}
                y1={y + nodeHeight}
                x2={svgWidth / 2}
                y2={y + nodeHeight + nodeGap}
                stroke="#27272A"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            )}
            {/* Arrow head */}
            {i < nodes.length - 1 && (
              <polygon
                points={`${svgWidth / 2 - 4},${y + nodeHeight + nodeGap - 6} ${svgWidth / 2},${y + nodeHeight + nodeGap} ${svgWidth / 2 + 4},${y + nodeHeight + nodeGap - 6}`}
                fill="#3B82F6"
                opacity="0.6"
              />
            )}
            {/* Node box */}
            <rect
              x={startX}
              y={y}
              width={nodeWidth}
              height={nodeHeight}
              rx="8"
              fill="#111111"
              stroke="#27272A"
              strokeWidth="1"
            />
            {/* Node text */}
            <text
              x={svgWidth / 2}
              y={y + nodeHeight / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#A1A1AA"
              fontSize="11"
              fontFamily="var(--font-mono)"
            >
              {node}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      className="card overflow-hidden group"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            {project.award && (
              <div className="flex items-center gap-1.5 text-[#F59E0B] text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                {project.award}
              </div>
            )}
            <h3 className="text-xl font-bold text-white group-hover:text-[#3B82F6] transition-colors">{project.title}</h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              {project.hook}
            </p>
          </div>
          <span className="shrink-0 text-xs text-[#52525B] font-mono">{project.year}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition-colors"
              aria-label={`${project.title} GitHub repository`}
            >
              <SiGithub className="w-3.5 h-3.5" />
              Source
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-xs text-[#3B82F6] hover:text-white transition-colors font-semibold"
          >
            Full Case Study
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs text-[#A1A1AA] hover:text-white transition-colors ml-auto font-medium"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                Hide Details <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Engineering Breakdown <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-[#1a1a1a]">
              {/* Problem */}
              <div className="space-y-1.5 pt-5">
                <h4 className="text-xs font-semibold text-[#EF4444] uppercase tracking-wider">
                  Problem
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Idea */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                  Idea
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {project.idea}
                </p>
              </div>

              {/* Architecture */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#818CF8] uppercase tracking-wider">
                  Architecture
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {project.architecture}
                </p>
              </div>

              {/* Challenges */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
                  Challenges
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              {/* Lessons */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
                  Lessons
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {project.lessons}
                </p>
              </div>

              {/* Future Improvements */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#EC4899] uppercase tracking-wider">
                  Future Improvements
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {project.futureImprovements || project.futurePlans}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding" aria-label="Projects" ref={ref}>
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
              Projects
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Selected Projects
            </h2>
            <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
              Every project is documented as an engineering case study detailing technical decisions, system architecture, and empirical lessons learned.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activeCategory === cat
                    ? "bg-[#3B82F6] text-white"
                    : "border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#52525B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
