"use client";

import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import nowData from "@/data/now.json";

const TECH = ["Next.js", "TypeScript", "Tailwind", "Framer Motion"];

export function Footer() {
  return (
    <footer className="border-t border-[#27272A] mt-24">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md border border-[#27272A] flex items-center justify-center">
                <span className="text-[10px] font-bold gradient-text-accent">NB</span>
              </div>
              <span className="text-sm font-semibold text-white">Noel Biju</span>
            </div>
            <p className="text-xs text-[#52525B]">
              CS Undergrad · Offline AI & Systems Engineering
            </p>
          </div>

          {/* Center — exact required stack & deployment metrics */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-1.5 flex-wrap justify-center text-xs text-[#A1A1AA]">
              <span className="text-[#52525B]">Built with</span>
              {TECH.map((t, i) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="text-[#A1A1AA] hover:text-white transition-colors cursor-default font-medium">
                    {t}
                  </span>
                  {i < TECH.length - 1 && (
                    <span className="text-[#27272A] text-xs">·</span>
                  )}
                </span>
              ))}
              <span className="text-[#52525B] ml-1">· Hosted on Vercel</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-[#52525B] font-mono">
              <span>Version: {nowData.portfolioVersion}</span>
              <span>·</span>
              <span>Last Deployment: {nowData.lastPortfolioUpdate}</span>
            </div>
          </div>

          {/* Right — social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Ultra2021"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-white transition-colors duration-150"
              aria-label="GitHub"
            >
              <SiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/noel-biju-788b81332"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-white transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:noelbiju2552@gmail.com"
              className="text-[#A1A1AA] hover:text-white transition-colors duration-150"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex items-center justify-center gap-1 text-xs text-[#52525B] font-mono">
          <span>Copyright © {new Date().getFullYear()} Noel Biju. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
