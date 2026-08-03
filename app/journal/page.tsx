"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, X, BookOpen, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getJournalPosts, JournalPost } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default function JournalListingPage() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");

  const postsList = useMemo(() => {
    return getJournalPosts();
  }, []);

  const allTags = useMemo(() => {
    return ["All", ...Array.from(new Set(postsList.flatMap((j) => j.tags)))];
  }, [postsList]);

  const filtered = useMemo(() => {
    return postsList.filter((j) => {
      const matchesSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.summary.toLowerCase().includes(search.toLowerCase());
      const matchesTag = tag === "All" || j.tags.includes(tag);
      return matchesSearch && matchesTag;
    });
  }, [postsList, search, tag]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-5xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 text-xs font-mono text-[#22C55E]">
              <BookOpen className="w-3.5 h-3.5" />
              Technical Write-Ups & Markdown Notes
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Engineering Journal
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Markdown-driven engineering notebook parsed dynamically with YAML frontmatter metadata.
            </p>
          </div>

          {/* Search & Tag Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                type="text"
                placeholder="Search articles by topic, problem, or technology…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#111111] border border-[#27272A] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                aria-label="Search engineering journal"
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

            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                    tag === t
                      ? "bg-[#22C55E] text-white shadow-sm"
                      : "border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#52525B]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((article) => (
              <article
                key={article.slug}
                className="card p-6 space-y-4 flex flex-col justify-between group bg-[#09090b] border-[#27272A] hover:border-[#22C55E]/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#52525B] font-mono">
                    <span className="flex items-center gap-1 text-[#3B82F6]">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readingTime} min read
                    </span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-[#22C55E] transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((t) => (
                      <span key={t} className="tag text-[10px]">{t}</span>
                    ))}
                  </div>

                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-[#22C55E] hover:underline font-semibold font-mono"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
