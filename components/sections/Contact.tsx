"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Download, Copy, Check, Clock, Globe, Shield, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { staggerContainer, staggerItem } from "@/lib/animations";
import nowData from "@/data/now.json";

const EMAIL = "noelbiju2552@gmail.com";

const LINKS = [
  {
    Icon: SiGithub,
    label: "GitHub",
    value: "Ultra2021",
    href: "https://github.com/Ultra2021",
    color: "#ffffff",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    value: "noelbiju",
    href: "https://www.linkedin.com/in/noel-biju-788b81332",
    color: "#0A66C2",
  },
  {
    Icon: Download,
    label: "Resume",
    value: "Download CV",
    href: "/resume.pdf",
    color: "#3B82F6",
  },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="section-padding" aria-label="Contact" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10 max-w-3xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="space-y-4">
            <div className="section-label justify-center">
              <span>—</span>
              Contact
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Say Hello
            </h2>
            <p className="text-[#A1A1AA] text-lg leading-relaxed">
              If you&apos;re building something practical in local AI, robotics, or systems engineering, I&apos;d like to talk.
            </p>
          </motion.div>

          {/* Email card */}
          <motion.div variants={staggerItem}>
            <div className="card p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#52525B] uppercase tracking-wider font-semibold justify-center font-mono">
                <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
                Primary Communication Channel
              </div>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-xl sm:text-2xl font-bold text-white hover:text-[#3B82F6] transition-colors"
                >
                  {EMAIL}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg text-[#52525B] hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#22C55E]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#22C55E] font-mono"
                >
                  Email address copied to clipboard!
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Metadata Fields Required by Prompt: Current Focus, Last Updated, Portfolio Version, Timezone, Response Time, Available For */}
          <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left font-mono text-xs">
            <div className="card p-4 space-y-1">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Current Focus</span>
              <span className="text-white text-xs leading-snug block line-clamp-2">{nowData.currentFocus}</span>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Timezone</span>
              <span className="text-[#3B82F6] text-xs font-semibold block">{nowData.timezone}</span>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Response Time</span>
              <span className="text-[#22C55E] text-xs font-semibold block">{nowData.responseTime}</span>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Portfolio Version</span>
              <span className="text-white text-xs block">{nowData.portfolioVersion}</span>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Last Updated</span>
              <span className="text-white text-xs block">{nowData.lastPortfolioUpdate}</span>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-[#52525B] uppercase tracking-wider block text-[10px]">Available For</span>
              <span className="text-[#F59E0B] text-xs block truncate">{nowData.availableFor}</span>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-3 gap-3"
          >
            {LINKS.map(({ Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 flex flex-col items-center gap-2 group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                aria-label={label}
              >
                <Icon
                  className="w-5 h-5 transition-colors duration-200"
                  style={{ color }}
                />
                <span className="text-xs font-medium text-[#A1A1AA] group-hover:text-white transition-colors">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Status */}
          <motion.div variants={staggerItem}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27272A] text-xs font-mono text-[#A1A1AA]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              Kerala, India · Open to AI Engineering Collaborations
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
