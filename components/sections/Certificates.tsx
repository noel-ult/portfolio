"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Award, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatDateShort } from "@/lib/utils";
import certificates from "@/data/certificates.json";

type Certificate = (typeof certificates)[0];

const FEATURED_CERTS = certificates.filter((c) => c.featured);

export function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="section-padding" aria-label="Certificates" ref={ref}>
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
              Certificates
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  Selected Certifications
                </h2>
                <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
                  Key professional credentials and technical coursework from IEEE, MathWorks, NASSCOM, Intel, and IIT Bombay.
                </p>
              </div>
              <Link
                href="/certificates"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] border border-[#27272A] text-sm text-[#3B82F6] font-semibold hover:border-[#3B82F6] transition-colors shrink-0"
              >
                View Complete Archive
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Featured Cards Grid */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FEATURED_CERTS.map((cert) => (
              <motion.div
                key={cert.id}
                className="card p-5 space-y-3 flex flex-col justify-between group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        color: "#3B82F6",
                      }}
                    >
                      {cert.issuer[0]}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                      <Award className="w-3 h-3" />
                      Featured
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#3B82F6] font-medium">{cert.issuer}</p>
                  </div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] text-[#52525B]">
                  <span className="tag text-[10px] py-0">{cert.category}</span>
                  <span className="font-mono">{formatDateShort(cert.issueDate)}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View Archive Footer Link */}
          <motion.div variants={staggerItem} className="flex justify-center pt-2">
            <Link
              href="/certificates"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:text-white hover:border-[#52525B] transition-all duration-150 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
              Explore All {certificates.length} Certifications in Archive →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
