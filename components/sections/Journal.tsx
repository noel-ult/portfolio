"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Code, Terminal, CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatDate } from "@/lib/utils";
import journal from "@/data/journal.json";
import Link from "next/link";

type Article = (typeof journal)[0];

function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.article
      className="card p-6 space-y-4 group flex flex-col justify-between"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[#52525B] font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
            {article.readTime} min read
          </span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Structured Evidence Preview: Problem & Result */}
        <div className="card p-3.5 bg-[#0a0a0b] space-y-2 text-xs">
          <div>
            <span className="text-[10px] font-mono text-[#EF4444] uppercase tracking-wider block font-semibold">
              Problem
            </span>
            <p className="text-[#A1A1AA] line-clamp-1">{article.problem}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#22C55E] uppercase tracking-wider block font-semibold">
              Result
            </span>
            <p className="text-[#A1A1AA] line-clamp-1">{article.result}</p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag text-[10px]">{tag}</span>
          ))}
        </div>

        <Link
          href={`/journal/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs text-[#3B82F6] hover:underline font-semibold font-mono"
        >
          Read Entry
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}

export function Journal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const sorted = [...journal].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="journal" className="section-padding" aria-label="Engineering Journal" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10"
        >
          {/* Header - Renamed title */}
          <motion.div variants={staggerItem} className="space-y-4">
            <div className="section-label">
              <span>—</span>
              Journal
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  Engineering Journal
                </h2>
                <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
                  Technical write-ups documenting real engineering contexts, problems, experiments, code snippets, and lessons learned.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Articles grid */}
          <motion.div
            variants={staggerItem}
            className="grid sm:grid-cols-2 gap-4"
          >
            {sorted.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
