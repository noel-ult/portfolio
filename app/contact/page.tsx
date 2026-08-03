"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Download, Copy, Check, MessageSquare } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { getSettings, getNow } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export default function DedicatedContactPage() {
  const [copied, setCopied] = useState(false);

  const settings = useMemo(() => getSettings(), []);
  const nowData = useMemo(() => getNow(), []);

  const copyEmail = () => {
    navigator.clipboard.writeText(settings.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-3xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 text-xs font-mono text-[#22C55E]">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct Communication
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Contact & Availability
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-xl leading-relaxed">
              If you&apos;re building practical offline AI systems, robotics platforms, or backend software, let&apos;s connect.
            </p>
          </div>

          {/* Email Highlight Card */}
          <div className="card p-8 space-y-4 text-center bg-[#09090b] border-[#3B82F6]/30">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#52525B] uppercase tracking-wider font-semibold">
              <Mail className="w-4 h-4 text-[#3B82F6]" />
              Direct Email Address
            </div>
            <div className="flex items-center justify-center gap-3">
              <a
                href={`mailto:${settings.email}`}
                className="text-2xl sm:text-3xl font-bold text-white hover:text-[#3B82F6] transition-colors"
              >
                {settings.email}
              </a>
              <button
                onClick={copyEmail}
                className="p-2.5 rounded-xl bg-[#111111] border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#3B82F6] transition-all"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-[#22C55E]" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-[#22C55E] font-mono">
                Copied email address to clipboard!
              </p>
            )}
          </div>

          {/* Contact Parameters Grid */}
          <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* LinkedIn */}
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 space-y-2 hover:border-[#0A66C2] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Professional Network</span>
                <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-[#0A66C2]">LinkedIn Profile →</span>
            </a>

            {/* GitHub */}
            <a
              href={settings.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_github', 'contact_page')}
              className="card p-5 space-y-2 hover:border-white transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Open Source Code</span>
                <SiGithub className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-[#3B82F6]">GitHub Profile →</span>
            </a>

            {/* Resume */}
            <a
              href={settings.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('download_resume', 'contact_page')}
              className="card p-5 space-y-2 hover:border-[#3B82F6] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Curriculum Vitae</span>
                <Download className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-[#3B82F6]">Download Resume PDF →</span>
            </a>

            {/* Current Timezone */}
            <div className="card p-5 space-y-2">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Current Timezone</span>
              <span className="text-sm font-bold text-[#3B82F6]">{nowData.timezone}</span>
            </div>

            {/* Response Time */}
            <div className="card p-5 space-y-2">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Typical Response Time</span>
              <span className="text-sm font-bold text-[#22C55E]">{nowData.responseTime}</span>
            </div>

            {/* Availability */}
            <div className="card p-5 space-y-2">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Current Availability</span>
              <span className="text-sm font-bold text-[#F59E0B] leading-tight block">{nowData.availableFor}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
