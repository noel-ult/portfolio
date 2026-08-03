"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { searchPlatformContent } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query || query.trim().length === 0) return [];
    return searchPlatformContent(query);
  }, [query]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-4xl space-y-10">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6]">
              <Search className="w-3.5 h-3.5" />
              Fuse.js Indexed Platform Search
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Search Personal Platform
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed">
              Find case studies, research journal entries, verified credentials, technologies, and experience records.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3B82F6]" />
            <input
              type="text"
              placeholder="Search across all projects, journal write-ups, tech stack, and certificates..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length > 2) trackEvent("search_query", e.target.value);
              }}
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-[#111111] border border-[#27272A] text-base text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#3B82F6] shadow-lg font-medium"
              autoFocus
              aria-label="Global platform search input"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white"
                aria-label="Clear search query"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Results Display */}
          {query ? (
            <div className="space-y-6">
              <div className="text-xs font-mono text-[#52525B]">
                Found <span className="text-[#3B82F6] font-bold">{searchResults.length}</span> matching results for &quot;{query}&quot;:
              </div>

              <div className="space-y-3">
                {searchResults.map((item, idx: number) => {
                  const rec = item as Record<string, unknown>;
                  const metaText = String(rec.category || rec.issuer || rec.date || "");
                  const subText = String(rec.tagline || rec.summary || rec.description || "");

                  return (
                    <Link
                      key={idx}
                      href={item.link || "#"}
                      className="card p-5 flex items-center justify-between hover:border-[#3B82F6] transition-all group bg-[#09090b]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span className="text-[#3B82F6] uppercase font-bold px-2 py-0.5 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                            {item.type}
                          </span>
                          {metaText && <span className="text-[#52525B]">{metaText}</span>}
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                          {item.title}
                        </h3>
                        {subText && (
                          <p className="text-xs text-[#A1A1AA] line-clamp-1">
                            {subText}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#52525B] group-hover:text-[#3B82F6] shrink-0" />
                    </Link>
                  );
                })}

                {searchResults.length === 0 && (
                  <div className="card p-12 text-center text-[#A1A1AA] space-y-2">
                    <p>No results found for &quot;{query}&quot;.</p>
                    <p className="text-xs text-[#52525B]">Try searching for terms like &quot;PostgreSQL&quot;, &quot;Ollama&quot;, &quot;Robotics&quot;, or &quot;C++&quot;.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card p-8 bg-[#09090b] space-y-4">
              <h3 className="text-xs font-mono font-semibold text-[#52525B] uppercase tracking-wider">
                Popular Search Terms
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Ollama", "PostgreSQL", "Local AI", "Robotics", "FastAPI", "C++", "Next.js", "Sensors"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="skill-chip text-xs hover:border-[#3B82F6] hover:text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
