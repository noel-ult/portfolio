"use client";

import { useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GitBranch } from "lucide-react";
import Link from "next/link";
import { ProjectEvolution } from "@/components/sections/ProjectEvolution";
import { getTimeline } from "@/lib/content";

export default function JourneyPage() {
  const milestoneNodes = useMemo(() => getTimeline(), []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-5xl space-y-16">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6]">
              <GitBranch className="w-3.5 h-3.5" />
              Engineering Roadmap & History
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Project Evolution & Journey
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Visual roadmap depicting the progression from early CRUD applications and PostgreSQL relational schemas to local AI systems and robotics telemetry.
            </p>
          </div>

          {/* Animated Horizontal Timeline Component */}
          <ProjectEvolution />

          {/* Detailed Node Milestones */}
          <div className="space-y-8 pt-8 border-t border-[#27272A]">
            <h2 className="text-2xl font-bold text-white">Detailed Journey Milestones</h2>

            <div className="relative space-y-6">
              <div className="absolute left-[88px] top-2 bottom-2 w-px bg-[#27272A]" />

              {milestoneNodes.map((node, i) => (
                <div key={i} className="flex gap-6 card p-6 bg-[#09090b] hover:border-[#3B82F6] transition-all">
                  <div className="w-[76px] shrink-0 text-right">
                    <span className="text-xs font-mono font-bold text-[#3B82F6] block">
                      {node.year}
                    </span>
                  </div>

                  <div className="relative shrink-0 flex items-start justify-center w-3 mt-1">
                    <div className="w-3 h-3 rounded-full bg-[#111111] border-2 border-[#3B82F6] z-10" />
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white">{node.title}</h3>
                      {node.relatedProject && (
                        <Link
                          href={`/projects/${node.relatedProject}`}
                          className="inline-flex items-center gap-1 text-xs text-[#3B82F6] font-semibold hover:underline font-mono shrink-0"
                        >
                          View Related Project Case Study →
                        </Link>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
