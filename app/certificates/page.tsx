"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, X, Award, ExternalLink, ShieldCheck, CheckCircle2, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { getCertificates, Certificate } from "@/lib/content";

export default function CertificatesArchivePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificatesList = useMemo(() => getCertificates(), []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(certificatesList.map((c) => c.category)))];
  }, [certificatesList]);

  const filtered = useMemo(() => {
    return certificatesList.filter((c) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.issuer.toLowerCase().includes(search.toLowerCase()) ||
        c.credentialId.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "All" || c.category === category;
      return matchesSearch && matchesCat;
    });
  }, [certificatesList, search, category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-6xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-xs font-mono text-[#F59E0B]">
              <Award className="w-3.5 h-3.5" />
              Verified Credentials Archive
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Certifications & Accreditations
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Complete archive of verified certificates, IEEE robotics internship credentials, NPTEL academic qualifications, and IBM AI accreditations.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                type="text"
                placeholder="Search by certificate title, issuer, or credential ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#111111] border border-[#27272A] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#F59E0B] transition-colors"
                aria-label="Search certificates"
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
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                    category === cat
                      ? "bg-[#F59E0B] text-black font-bold shadow-sm"
                      : "border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#52525B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((cert) => (
              <div
                key={cert.credentialId}
                className="card p-6 space-y-4 flex flex-col justify-between group hover:border-[#F59E0B] transition-all cursor-pointer bg-[#09090b]"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#52525B]">
                    <span className="text-[#F59E0B] font-semibold">{cert.category}</span>
                    <span>{cert.issueDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-[#3B82F6] font-semibold font-mono">{cert.issuer}</p>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#52525B]">
                  <span className="truncate max-w-[180px]">ID: {cert.credentialId}</span>
                  <span className="text-[#F59E0B] group-hover:underline">Preview →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Preview */}
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="card p-6 max-w-lg w-full bg-[#0d0d0e] border-[#F59E0B] space-y-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#F59E0B] uppercase font-bold">
                      {selectedCert.category}
                    </span>
                    <h2 className="text-xl font-bold text-white">{selectedCert.title}</h2>
                    <p className="text-xs font-mono text-[#3B82F6]">{selectedCert.issuer}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1 rounded text-[#52525B] hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-[#A1A1AA] leading-relaxed">
                  <p>{selectedCert.description}</p>
                  <div className="p-3 rounded-lg bg-[#111111] border border-[#27272A] font-mono space-y-1 text-[#52525B]">
                    <div>Issue Date: <span className="text-white">{selectedCert.issueDate}</span></div>
                    <div>Credential ID: <span className="text-white">{selectedCert.credentialId}</span></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {selectedCert.verificationUrl && (
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F59E0B] text-black text-xs font-bold hover:bg-[#D97706] transition-colors"
                    >
                      Verify Credential Online
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-xs text-[#52525B] hover:text-white font-mono"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
