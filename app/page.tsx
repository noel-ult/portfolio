import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProjectEvolution } from "@/components/sections/ProjectEvolution";
import { ArrowRight, User, FolderKanban, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { getFeaturedProjects, getJournalPosts } from "@/lib/content";
import { constructMetadata, generateJSONLD } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata = constructMetadata();

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const latestJournal = getJournalPosts()[0];
  const jsonLd = generateJSONLD();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen">
        {/* 1. Hero */}
        <Hero />

        {/* 2. About Preview */}
        <section id="about-snapshot" className="section-padding py-16 border-t border-[#27272A]/50">
          <div className="container-wide max-w-4xl space-y-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 card p-8 bg-[#0d0d0e]">
              <div className="space-y-2 max-w-xl">
                <div className="section-label">
                  <span>—</span>
                  About Preview
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Practical Systems Engineering & Local AI
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Exploring offline AI inference, robotics sensors, PostgreSQL relational schemas, and developer tools.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2563EB] transition-colors shrink-0 font-mono shadow-md"
              >
                Read Story & Stack
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Project Evolution Roadmap */}
        <div className="section-divider" aria-hidden="true" />
        <ProjectEvolution />

        {/* 4. Featured Projects (4) */}
        <section id="projects-snapshot" className="section-padding py-16 border-t border-[#27272A]/50">
          <div className="container-wide space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="section-label">
                  <span>—</span>
                  Engineering Work
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Featured Projects
                </h2>
                <p className="text-sm text-[#A1A1AA] max-w-lg leading-relaxed">
                  Documented with empirical evidence, system architecture, and operational lessons.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#27272A] text-sm text-[#3B82F6] font-semibold hover:border-[#3B82F6] transition-colors shrink-0 font-mono"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {featuredProjects.map((p) => (
                <div key={p.slug} className="card p-6 flex flex-col justify-between space-y-4 group bg-[#09090b]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#52525B]">
                      <span className="text-[#3B82F6] font-bold">{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                      {p.tagline || p.description}
                    </p>
                  </div>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#3B82F6] font-semibold hover:underline pt-2 border-t border-[#1a1a1a] font-mono"
                  >
                    Read Engineering Case Study →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. GitHub Snapshot */}
        <section id="github-snapshot" className="section-padding py-16 border-t border-[#27272A]/50">
          <div className="container-wide">
            <div className="card p-8 bg-[#09090b] flex flex-col md:flex-row items-center justify-between gap-6 border-[#3B82F6]/30">
              <div className="space-y-2 max-w-xl">
                <div className="section-label">
                  <span>—</span>
                  Open Source
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  GitHub Codebase & Activity
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Inspect production codebases, repository metrics, commits, and language distributions.
                </p>
              </div>
              <Link
                href="/github"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] border border-[#27272A] text-white text-sm font-semibold hover:border-[#3B82F6] transition-colors shrink-0 font-mono"
              >
                Open GitHub Dashboard →
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Latest Journal Entry */}
        {latestJournal && (
          <section id="journal-snapshot" className="section-padding py-16 border-t border-[#27272A]/50">
            <div className="container-wide max-w-4xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="section-label">
                    <span>—</span>
                    Technical Notebook
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Latest Journal Entry</h2>
                </div>
                <Link
                  href="/journal"
                  className="text-xs font-mono text-[#22C55E] hover:underline shrink-0"
                >
                  View All Journal Notes →
                </Link>
              </div>

              <div className="card p-6 bg-[#09090b] border-[#22C55E]/30 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#52525B] font-mono">
                  <span className="text-[#22C55E] font-semibold">Article</span>
                  <span>{formatDate(latestJournal.date)}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{latestJournal.title}</h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{latestJournal.summary}</p>
                <div className="pt-2">
                  <Link
                    href={`/journal/${latestJournal.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-[#22C55E] font-semibold hover:underline font-mono"
                  >
                    Read Journal Note →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 7. Contact */}
        <section id="contact-snapshot" className="section-padding py-16 border-t border-[#27272A]/50">
          <div className="container-wide text-center space-y-6 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Direct Communication</h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Building an offline AI tool, robotics system, or backend service? Connect directly.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2563EB] transition-colors shadow-lg shadow-[#3B82F6]/20 font-mono"
              >
                Go to Contact Page →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
