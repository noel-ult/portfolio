"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, GitFork, ExternalLink, Activity, Clock, Terminal, GitCommit, FileText, BookOpen } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { staggerContainer, staggerItem } from "@/lib/animations";
import Link from "next/link";
import projectsData from "@/data/projects.json";

const GITHUB_USERNAME = "Ultra2021";

// Prioritized repo list required by prompt: AI Buddy, ETLab+, RyMeds, AI Study Coach, DevOps
const FEATURED_REPOS = [
  {
    name: "offline-ai-assistant",
    title: "AI Buddy / Local AI Assistant",
    readmePreview: "Offline conversational AI environment running quantized LLaMA 3.1 & Mistral models on local CPU via FastAPI SSE endpoints.",
    slug: "local-ai-assistant",
  },
  {
    name: "etlab-plus",
    title: "ETLab+",
    readmePreview: "Multi-tenant laboratory workflow platform for engineering colleges with PostgreSQL Row-Level Security isolation.",
    slug: "etlab-plus",
  },
  {
    name: "rymeds",
    title: "RyMeds",
    readmePreview: "ACID-compliant pharmacy inventory and POS counter transaction billing system built with Node.js and PostgreSQL.",
    slug: "rymeds",
  },
  {
    name: "ai-study-coach",
    title: "AI Study Coach",
    readmePreview: "Privacy-first study interval logger paired with local LLM recommendation engine for cognitive retention tracking.",
    slug: "ai-study-coach",
  },
  {
    name: "devops-config",
    title: "DevOps & Infrastructure",
    readmePreview: "Reproducible multi-container orchestration stack using Docker Compose and GitHub Actions for Linux dev environments.",
    slug: "devops-environment",
  },
];

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  size: number;
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=15`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function ProjectRepoCard({
  featuredInfo,
  apiRepo,
}: {
  featuredInfo: (typeof FEATURED_REPOS)[0];
  apiRepo?: GitHubRepo;
}) {
  const projectObj = projectsData.find((p) => p.slug === featuredInfo.slug);
  const langColor = apiRepo?.language ? LANG_COLORS[apiRepo.language] ?? "#3B82F6" : "#3B82F6";
  const repoUrl = apiRepo?.html_url || `https://github.com/${GITHUB_USERNAME}/${featuredInfo.name}`;
  const techChips = projectObj?.tags || [apiRepo?.language || "TypeScript"];

  return (
    <motion.article
      className="card p-6 space-y-5 block group relative overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top Bar */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SiGithub className="w-4 h-4 text-[#3B82F6] shrink-0" />
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white group-hover:text-[#3B82F6] transition-colors flex items-center gap-1.5"
            >
              {featuredInfo.title}
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>
          </div>
          <p className="text-xs text-[#A1A1AA]">
            {apiRepo?.description || projectObj?.hook || "Production repository with case study documentation."}
          </p>
        </div>
        <span className="shrink-0 text-xs font-mono text-[#52525B] px-2 py-0.5 rounded bg-[#111111] border border-[#27272A]">
          {apiRepo ? timeAgo(apiRepo.pushed_at) : "Active"}
        </span>
      </div>

      {/* README Preview Box */}
      <div className="card p-3.5 bg-[#0a0a0b] border-[#27272A] space-y-1.5 font-mono text-xs text-[#A1A1AA]">
        <div className="flex items-center gap-1.5 text-[10px] text-[#52525B] uppercase tracking-wider font-semibold">
          <FileText className="w-3 h-3 text-[#3B82F6]" />
          README Preview
        </div>
        <p className="line-clamp-2 text-xs text-[#A1A1AA] leading-relaxed italic">
          &quot;{featuredInfo.readmePreview}&quot;
        </p>
      </div>

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-1.5">
        {techChips.map((tech, idx) => (
          <span key={`${featuredInfo.slug}-${tech}-${idx}`} className="skill-chip text-[11px] py-0.5">
            {tech}
          </span>
        ))}
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-2 border-t border-[#1a1a1a] font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: langColor }}
            />
            {apiRepo?.language || "Code"}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-[#F59E0B]" />
            {apiRepo?.stargazers_count ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3 text-[#A1A1AA]" />
            {apiRepo?.forks_count ?? 0}
          </span>
        </div>

        <Link
          href={`/projects/${featuredInfo.slug}`}
          className="text-xs text-[#3B82F6] hover:underline font-sans font-medium"
        >
          View Case Study →
        </Link>
      </div>
    </motion.article>
  );
}

export function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: repos } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchGitHubRepos,
    enabled: inView,
  });

  // Filter out empty repositories (size === 0)
  const validRepos = useMemo(() => {
    if (!repos) return [];
    return repos.filter((r) => r.size > 0);
  }, [repos]);

  return (
    <section id="github" className="section-padding" aria-label="GitHub Activity" ref={ref}>
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
              GitHub
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  GitHub Activity
                </h2>
                <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-xl">
                  Project-focused repository showcases prioritizing core engineering codebases. Non-empty repositories synced from{" "}
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B82F6] hover:underline font-mono"
                  >
                    @{GITHUB_USERNAME}
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>

          {/* Project-Focused Repos Grid */}
          <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-4">
            {FEATURED_REPOS.map((item) => {
              const matchedApiRepo = validRepos.find(
                (r) => r.name.toLowerCase() === item.name.toLowerCase()
              );
              return (
                <ProjectRepoCard
                  key={item.name}
                  featuredInfo={item}
                  apiRepo={matchedApiRepo}
                />
              );
            })}
          </motion.div>

          {/* View all on GitHub */}
          <motion.div variants={staggerItem} className="flex justify-center pt-2">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:text-white hover:border-[#52525B] transition-all duration-150 font-semibold"
            >
              <SiGithub className="w-4 h-4 text-[#3B82F6]" />
              View Complete GitHub Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
