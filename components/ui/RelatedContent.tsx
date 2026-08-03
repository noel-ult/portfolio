"use client";

import Link from "next/link";
import { FolderKanban, BookOpen, Layers, Award, ArrowRight } from "lucide-react";
import projects from "@/data/projects.json";
import journal from "@/data/journal.json";
import certificates from "@/data/certificates.json";
import skills from "@/data/skills.json";

interface RelatedContentProps {
  currentSlug?: string;
  category?: string;
}

export function RelatedContent({ currentSlug, category }: RelatedContentProps) {
  const relatedProjects = projects
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 2);

  const relatedJournal = journal
    .filter((j) => j.slug !== currentSlug)
    .slice(0, 2);

  const relatedCert = certificates.slice(0, 2);

  return (
    <div className="space-y-6 pt-12 border-t border-[#27272A] mt-16">
      <div className="space-y-1">
        <h3 className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
          Explore Related Engineering Context
        </h3>
        <p className="text-sm font-bold text-white">Recommended Projects, Articles & Credentials</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Related Projects */}
        <div className="card p-4 space-y-3 bg-[#0d0d0e]">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white">
            <FolderKanban className="w-3.5 h-3.5 text-[#3B82F6]" />
            Related Projects
          </div>
          <div className="space-y-2">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="block p-2.5 rounded-lg bg-[#111111] hover:border-[#3B82F6] border border-[#27272A] transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                  {p.title}
                </div>
                <div className="text-[10px] text-[#52525B] truncate mt-0.5">{p.hook}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Journal Articles */}
        <div className="card p-4 space-y-3 bg-[#0d0d0e]">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white">
            <BookOpen className="w-3.5 h-3.5 text-[#22C55E]" />
            Related Journal Entries
          </div>
          <div className="space-y-2">
            {relatedJournal.map((j) => (
              <Link
                key={j.id}
                href={`/journal/${j.slug}`}
                className="block p-2.5 rounded-lg bg-[#111111] hover:border-[#22C55E] border border-[#27272A] transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-[#22C55E] transition-colors">
                  {j.title}
                </div>
                <div className="text-[10px] text-[#52525B] truncate mt-0.5">{j.excerpt}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Certificates */}
        <div className="card p-4 space-y-3 bg-[#0d0d0e]">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            Verified Credentials
          </div>
          <div className="space-y-2">
            {relatedCert.map((c) => (
              <Link
                key={c.id}
                href="/certificates"
                className="block p-2.5 rounded-lg bg-[#111111] hover:border-[#F59E0B] border border-[#27272A] transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                  {c.title}
                </div>
                <div className="text-[10px] text-[#52525B] truncate mt-0.5">{c.issuer}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
