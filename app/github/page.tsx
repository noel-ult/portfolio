"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, X, Star, GitFork, ExternalLink, Activity, Clock, GitCommit, Users, Layers, ShieldCheck, Flame } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import projectsData from "@/data/projects.json";

const GITHUB_USERNAME = "Ultra2021";

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

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

async function fetchUser(): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
  if (!res.ok) throw new Error("Failed user fetch");
  return res.json();
}

async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
  if (!res.ok) throw new Error("Failed repos fetch");
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

export default function GitHubDashboardPage() {
  const [search, setSearch] = useState("");

  const { data: user } = useQuery({
    queryKey: ["github-dashboard-user"],
    queryFn: fetchUser,
  });

  const { data: repos } = useQuery({
    queryKey: ["github-dashboard-repos"],
    queryFn: fetchRepos,
  });

  // Filter non-empty repositories
  const validRepos = useMemo(() => {
    if (!repos) return [];
    return repos.filter((r) => r.size > 0);
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return validRepos.filter(
      (r) =>
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(search.toLowerCase())) ||
        (r.language && r.language.toLowerCase().includes(search.toLowerCase()))
    );
  }, [validRepos, search]);

  // Language Breakdown
  const langCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    validRepos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6);
  }, [validRepos]);

  const totalLangRepos = langCounts.reduce((sum, [, count]) => sum + count, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-6xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6]">
              <SiGithub className="w-3.5 h-3.5" />
              GitHub Engineering Dashboard
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  GitHub Codebases & Activity
                </h1>
                <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
                  Real-time repository statistics, contribution overview, language breakdowns, and commit activity for{" "}
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

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] transition-colors shrink-0 font-mono shadow-md"
              >
                <SiGithub className="w-4 h-4" />
                Follow on GitHub
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
            <div className="card p-5 space-y-1 bg-[#09090b]">
              <span className="text-[#52525B] text-[10px] uppercase tracking-wider block">Public Repos</span>
              <span className="text-2xl font-bold text-white">{user?.public_repos ?? "12+"}</span>
            </div>
            <div className="card p-5 space-y-1 bg-[#09090b]">
              <span className="text-[#52525B] text-[10px] uppercase tracking-wider block">Followers</span>
              <span className="text-2xl font-bold text-white">{user?.followers ?? "8+"}</span>
            </div>
            <div className="card p-5 space-y-1 bg-[#09090b]">
              <span className="text-[#52525B] text-[10px] uppercase tracking-wider block">Total Stars</span>
              <span className="text-2xl font-bold text-[#F59E0B]">
                {validRepos.reduce((sum, r) => sum + r.stargazers_count, 0)}
              </span>
            </div>
            <div className="card p-5 space-y-1 bg-[#09090b]">
              <span className="text-[#52525B] text-[10px] uppercase tracking-wider block">Code Status</span>
              <span className="text-2xl font-bold text-[#22C55E]">Active</span>
            </div>
          </div>

          {/* Language Breakdown */}
          {langCounts.length > 0 && (
            <div className="card p-6 space-y-4 bg-[#0d0d0e]">
              <h3 className="text-xs font-mono font-semibold text-[#A1A1AA] uppercase tracking-wider">
                Language Distribution
              </h3>
              <div className="flex h-3 rounded-full overflow-hidden bg-[#1a1a1a]">
                {langCounts.map(([lang, count]) => (
                  <div
                    key={lang}
                    style={{
                      width: `${(count / totalLangRepos) * 100}%`,
                      background: LANG_COLORS[lang] ?? "#8b8b8b",
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#A1A1AA]">
                {langCounts.map(([lang, count]) => (
                  <span key={lang} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: LANG_COLORS[lang] ?? "#8b8b8b" }}
                    />
                    {lang}
                    <span className="text-[#52525B]">({Math.round((count / totalLangRepos) * 100)}%)</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Repository Search & Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272A] pb-4">
              <h2 className="text-2xl font-bold text-white">Repository Catalog</h2>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
                <input
                  type="text"
                  placeholder="Search repository..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-[#111111] border border-[#27272A] text-xs text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRepos.map((repo) => {
                const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#8b8b8b" : "#8b8b8b";
                return (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card p-5 space-y-4 flex flex-col justify-between group hover:border-[#3B82F6]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white group-hover:text-[#3B82F6] transition-colors truncate">
                          {repo.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#52525B] shrink-0" />
                      </div>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-xs text-[#A1A1AA] font-mono">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor }} />
                        {repo.language || "Code"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#F59E0B]" />
                        {repo.stargazers_count}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
