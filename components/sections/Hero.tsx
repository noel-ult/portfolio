"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ChevronDown, Compass, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { trackEvent } from "@/lib/analytics";

const ROLES = [
  "Building Practical AI",
  "Robotics & Embedded C++",
  "Developer Tools & Linux",
  "Offline Machine Learning",
];

const CODE_SNIPPETS = [
  { code: "ollama run llama3.1:8b", lang: "bash" },
  { code: "import torch\nfrom transformers import AutoModel", lang: "python" },
  { code: "const ai = new Ollama({ model: 'mistral' })", lang: "ts" },
  { code: "ros2 run robot_pkg controller", lang: "bash" },
  { code: "@app.post('/api/chat')\nasync def chat(req: ChatRequest):", lang: "python" },
  { code: "docker run -p 11434:11434 ollama/ollama", lang: "bash" },
];

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 dot-grid opacity-40"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 80%)",
        }}
      />
      {CODE_SNIPPETS.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[#3B82F6] whitespace-pre select-none pointer-events-none"
          style={{
            opacity: 0.035,
            left: `${[8, 72, 15, 78, 5, 60][i]}%`,
            top: `${[15, 20, 55, 60, 80, 75][i]}%`,
            transform: `rotate(${[-8, 5, -3, 7, -6, 4][i]}deg)`,
            fontSize: "11px",
            lineHeight: "1.6",
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(59,130,246,0.12), transparent 70%)",
        }}
      />
    </div>
  );
}

function RoleAnimator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[1.2em] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="gradient-text-accent inline-block"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-12"
      aria-label="Introduction"
    >
      <AnimatedGrid />

      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl"
        >
          {/* Balanced Profile Photo Avatar */}
          <motion.div variants={staggerItem} className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-2.5 bg-gradient-to-b from-[#3B82F6] via-[#27272A] to-[#111111] shadow-xl shadow-[#3B82F6]/20 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-[#18181B] bg-[#09090b]">
                  <Image
                    src="/images/profile.jpg"
                    alt="Noel Biju"
                    fill
                    sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 288px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#111111] border-2 border-[#18181B] flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-[#22C55E] animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={staggerItem} className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
              <span className="gradient-text">Noel Biju</span>
            </h1>
            <div className="text-xl sm:text-2xl font-semibold text-[#3B82F6] font-mono">
              Software Engineer
            </div>
            <div className="text-lg sm:text-xl font-medium text-white max-w-xl mx-auto">
              Building practical AI, robotics and developer tools.
            </div>
          </motion.div>

          {/* Role Animator */}
          <motion.div
            variants={staggerItem}
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#A1A1AA]"
          >
            <RoleAnimator />
          </motion.div>

          {/* Body */}
          <motion.div
            variants={staggerItem}
            className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl leading-relaxed space-y-2"
          >
            <p>
              I enjoy building software that runs locally, respects privacy, and solves practical problems.
            </p>
            <p className="text-white font-medium">
              Recently I&apos;ve been exploring offline AI, robotics and machine learning.
            </p>
          </motion.div>

          {/* Buttons: Projects, Resume, GitHub, Contact */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2563EB] transition-colors duration-150 group shadow-lg shadow-[#3B82F6]/20 font-mono"
            >
              Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('download_resume', 'hero_button')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm font-semibold hover:text-white hover:border-[#52525B] transition-all duration-150 font-mono"
            >
              <Download className="w-4 h-4 text-[#3B82F6]" />
              Resume
            </a>

            <a
              href="https://github.com/Ultra2021"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_github', 'hero_button')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm font-semibold hover:text-white hover:border-[#52525B] transition-all duration-150 font-mono"
              aria-label="GitHub profile"
            >
              <SiGithub className="w-4 h-4" />
              GitHub
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm font-semibold hover:text-white hover:border-[#52525B] transition-all duration-150 font-mono"
            >
              <Mail className="w-4 h-4 text-[#22C55E]" />
              Contact
            </Link>
          </motion.div>

          {/* Current Focus */}
          <motion.div variants={staggerItem} className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/30 bg-[#111111]/90 text-xs font-mono text-[#A1A1AA]">
              <Compass className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-[#3B82F6] font-semibold">Current Focus:</span>
              <span className="text-white font-medium">Offline AI • Computer Vision • Robotics</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#3F3F46] cursor-pointer hover:text-[#52525B] transition-colors"
            onClick={() =>
              document
                .getElementById("about-snapshot")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ChevronDown className="w-5 h-5 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
