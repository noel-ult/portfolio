"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { User, Brain, Bot, Wrench, Zap, Code2, Cpu, FlaskConical, Terminal, BookOpen } from "lucide-react";
import Link from "next/link";
import principles from "@/data/principles.json";
import skills from "@/data/skills.json";
import { getExperience, getNow, getProjects, getJournalPosts } from "@/lib/content";

const BUILDING_INTERESTS = [
  { label: "Local AI", icon: Brain, color: "#3B82F6" },
  { label: "Robotics", icon: Bot, color: "#22C55E" },
  { label: "Developer Tools", icon: Wrench, color: "#F59E0B" },
  { label: "Automation", icon: Zap, color: "#818CF8" },
  { label: "Practical Software", icon: Code2, color: "#EC4899" },
  { label: "Systems Programming", icon: Cpu, color: "#EF4444" },
  { label: "Machine Learning", icon: FlaskConical, color: "#06B6D4" },
];

export default function AboutPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const experienceList = useMemo(() => getExperience(), []);
  const nowData = useMemo(() => getNow(), []);
  const projectsList = useMemo(() => getProjects(), []);
  const journalList = useMemo(() => getJournalPosts(), []);

  // Distinct skill names list
  const distinctSkills = useMemo(() => {
    const names = Object.values(skills)
      .flat()
      .map((s: { name: string }) => s.name);
    return Array.from(new Set(names));
  }, []);

  // Find related content for selectedTech
  const matchingProjects = selectedTech
    ? projectsList.filter((p) =>
        p.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase())
      )
    : [];

  const matchingJournal = selectedTech
    ? journalList.filter((j) =>
        j.tags.some((t) => t.toLowerCase() === selectedTech.toLowerCase())
      )
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-5xl space-y-16">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6]">
              <User className="w-3.5 h-3.5" />
              Software Engineer & Researcher
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              About Noel Biju
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Detailed background, engineering journey, principles, technology stack dependencies, and development environment.
            </p>
          </div>

          {/* Personal Story & Journey */}
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-white">Personal Story & Journey</h2>
            <div className="space-y-4 text-sm text-[#A1A1AA] leading-relaxed">
              <p>
                My interest in engineering began with a simple question: <span className="text-white">how do systems behave when disconnected from cloud assumptions?</span> Rather than building standard CRUD applications for textbook assignments, I started taking apart backend architectures, local LLMs, and hardware microcontrollers.
              </p>
              <p>
                From building my first pharmacy management system (RyMeds) that won Best S1 Project to architecting a multi-tenant laboratory platform with PostgreSQL Row-Level Security (ETLab+), I learned early on that solid database design and security primitives matter far more than visual polish alone.
              </p>
              <p>
                Today, my focus centers on offline-first AI execution (Ollama, quantized LLaMA/Mistral models), robotics telemetry filtering, and systems programming on Linux.
              </p>
            </div>
          </section>

          {/* Things I Enjoy Building */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">What I Enjoy Building</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {BUILDING_INTERESTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="card p-4 flex items-center gap-3 group hover:border-[#3B82F6] transition-all"
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
                  </div>
                );
              })}
            </div>
          </section>

          {/* Timeline */}
          <section className="space-y-6 border-t border-[#27272A] pt-12">
            <h2 className="text-2xl font-bold text-white">Engineering Timeline</h2>
            <div className="relative space-y-0">
              <div className="absolute left-[88px] top-2 bottom-2 w-px bg-[#27272A]" />

              {experienceList.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 last:pb-0">
                  <div className="w-[76px] shrink-0 text-right">
                    <span className="text-xs font-mono font-semibold text-[#3B82F6]">
                      {item.startDate}
                    </span>
                  </div>
                  <div className="relative shrink-0 flex items-start justify-center w-3 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27272A] border-2 border-[#3B82F6] z-10" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      {item.title}
                      {item.type && (
                        <span className="text-[10px] font-mono text-[#52525B] px-1.5 py-0.5 rounded bg-[#111111] border border-[#27272A]">
                          {item.type}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-[#3B82F6]">{item.company}</div>
                    <div className="text-sm text-[#A1A1AA] leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Principles */}
          <section className="space-y-6 border-t border-[#27272A] pt-12">
            <div>
              <h2 className="text-2xl font-bold text-white">Engineering Principles</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Core beliefs forged through shipping real applications, debugging sensors, and managing production database schemas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {principles.map((p, idx) => (
                <div key={p.id} className="card p-5 space-y-3 bg-[#0d0d0e]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#3B82F6] font-bold">0{idx + 1}</span>
                    <h3 className="text-base font-bold text-white">{p.title}</h3>
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{p.explanation}</p>
                  <div className="pt-2 border-t border-[#1a1a1a] text-xs text-[#52525B]">
                    <span className="text-[#3B82F6] font-mono font-semibold block uppercase text-[10px]">Real Engineering Example</span>
                    <p className="text-[#A1A1AA] italic mt-0.5">{p.realExample}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Tech Stack */}
          <section className="space-y-6 border-t border-[#27272A] pt-12">
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Technology Stack</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Click any technology chip below to filter relevant projects and journal articles using it.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {distinctSkills.map((skillName) => {
                const isSelected = selectedTech === skillName;
                return (
                  <button
                    key={skillName}
                    onClick={() =>
                      setSelectedTech(isSelected ? null : skillName)
                    }
                    className={`skill-chip transition-all text-xs ${
                      isSelected
                        ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-md"
                        : "hover:border-[#3B82F6] hover:text-white"
                    }`}
                  >
                    {skillName}
                  </button>
                );
              })}
            </div>

            {/* Selected Tech Inspector Drawer */}
            {selectedTech && (
              <div className="card p-6 bg-[#09090b] border-[#3B82F6] space-y-4">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <span className="text-sm font-bold text-white font-mono">
                    Showing content related to: <span className="text-[#3B82F6]">{selectedTech}</span>
                  </span>
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="text-xs text-[#52525B] hover:text-white"
                  >
                    Reset Filter
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#52525B] uppercase block">Projects Using {selectedTech}</span>
                    {matchingProjects.length > 0 ? (
                      matchingProjects.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/projects/${p.slug}`}
                          className="block p-2.5 rounded-lg bg-[#111111] border border-[#27272A] text-xs text-white hover:border-[#3B82F6]"
                        >
                          {p.title} →
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-[#52525B]">Used in experimental scripts / course work.</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#52525B] uppercase block">Journal Entries</span>
                    {matchingJournal.length > 0 ? (
                      matchingJournal.map((j) => (
                        <Link
                          key={j.slug}
                          href={`/journal/${j.slug}`}
                          className="block p-2.5 rounded-lg bg-[#111111] border border-[#27272A] text-xs text-white hover:border-[#22C55E]"
                        >
                          {j.title} →
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-[#52525B]">No published articles tagged with this exact term yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Current Setup & Learning */}
          <section className="space-y-6 border-t border-[#27272A] pt-12">
            <h2 className="text-2xl font-bold text-white">Current Setup & Learning</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Learning */}
              <div className="card p-5 space-y-3 bg-[#0d0d0e]">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#3B82F6]" />
                  Active Learning Modules
                </h3>
                <ul className="space-y-2 text-xs text-[#A1A1AA]">
                  {nowData.currentlyLearning.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#3B82F6] font-bold">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dev Setup */}
              {nowData.devSetup && (
                <div className="card p-5 space-y-3 bg-[#0d0d0e]">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#22C55E]" />
                    Development Environment Setup
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#A1A1AA]">
                    <div>
                      <span className="text-[#52525B] block text-[10px] uppercase">Editor</span>
                      <span className="text-white">{nowData.devSetup.editor}</span>
                    </div>
                    <div>
                      <span className="text-[#52525B] block text-[10px] uppercase">Terminal</span>
                      <span className="text-white">{nowData.devSetup.terminal}</span>
                    </div>
                    <div>
                      <span className="text-[#52525B] block text-[10px] uppercase">AI Workflow</span>
                      <span className="text-white">{nowData.devSetup.aiWorkflow}</span>
                    </div>
                    <div>
                      <span className="text-[#52525B] block text-[10px] uppercase">Dual Boot OS</span>
                      <span className="text-white">{nowData.devSetup.os}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
