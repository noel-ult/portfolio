"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, X, FolderKanban, ArrowRight, Award } from "lucide-react";
import Link from "next/link";
import { getProjects, Project } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

const ALL_CATEGORIES = ["All", "AI", "Full Stack", "Robotics", "Software Engineering"];

export default function ProjectsLandingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const projectsList = useMemo(() => {
    return getProjects();
  }, []);

  const filtered = useMemo(() => {
    return projectsList.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCat = category === "All" || p.category.toLowerCase().includes(category.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [projectsList, search, category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-6xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6]">
              <FolderKanban className="w-3.5 h-3.5" />
              Engineering Showcase
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Selected Projects & Case Studies
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Every project is dynamically loaded from structured JSON schema files with real system architecture and codebase trees.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                type="text"
                placeholder="Search by project name, tech stack, or tag…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#111111] border border-[#27272A] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                aria-label="Search projects"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                    category === cat
                      ? "bg-[#3B82F6] text-white shadow-sm"
                      : "border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#52525B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Large Project Cards Grid */}
          <div className="space-y-6">
            {filtered.length === 0 ? (
              <div className="py-20 text-center space-y-2 card p-8">
                <p className="text-[#A1A1AA]">No projects match your current filter parameters.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="text-xs text-[#3B82F6] hover:underline font-mono"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filtered.map((project) => (
                <article
                  key={project.slug}
                  className="card p-8 space-y-6 group hover:border-[#3B82F6]/40 transition-all bg-[#09090b]"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        <span className="text-[#3B82F6] px-2.5 py-0.5 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                          {project.category}
                        </span>
                        <span className="text-[#52525B]">{project.year}</span>
                        <span className="text-[#22C55E] font-semibold flex items-center gap-1 bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                          Status: {project.status}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#3B82F6] transition-colors pt-1">
                        {project.title}
                      </h2>
                      <p className="text-base text-[#A1A1AA] leading-relaxed max-w-3xl">
                        {project.tagline || project.description}
                      </p>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => trackEvent('view_project', project.slug)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] transition-colors shrink-0 font-mono"
                    >
                      Read Full Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1a1a1a]">
                    {project.technologies.map((t) => (
                      <span key={t} className="skill-chip text-[11px] py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
