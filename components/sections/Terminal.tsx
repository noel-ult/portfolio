"use client";

import { useRef, useState, KeyboardEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const COMMANDS: Record<string, string[] | (() => string[])> = {
  help: [
    "Available commands:",
    "  help         — show this help",
    "  whoami       — about me",
    "  projects     — what I've built",
    "  skills       — tools I use",
    "  experience   — work history",
    "  now          — what I'm doing right now",
    "  github       — my GitHub profile",
    "  contact      — how to reach me",
    "  resume       — download my CV",
    "  coffee       — ☕",
    "  motivation   — why I do this",
    "  joke         — engineering humor",
    "  history      — show command history",
    "  clear        — clear terminal",
  ],
  whoami: [
    "noel biju",
    "─────────────────────────────────────",
    "CS undergrad from Kerala, India",
    "Interested in: local AI, robotics, developer tools",
    "Editor: VS Code",
    "Terminal: Windows Terminal + MSYS2",
    "OS: Windows 11 + Arch Linux (dual boot)",
    "AI workflow: Ollama locally, Claude when stuck",
    "Favorite git command: git status",
    "Current goal: become an AI engineer who",
    "  understands the systems underneath",
    "",
    "I like building things that work offline.",
  ],
  projects: [
    "projects",
    "─────────────────────────────────────",
    "1. AI Study Coach",
    "   Study tracker with local LLM recommendations",
    "   github.com/Ultra2021/ai-study-coach",
    "",
    "2. Local AI Assistant",
    "   Fully offline — no cloud, no data leakage",
    "   github.com/Ultra2021/offline-ai-assistant",
    "",
    "3. ETLab+                    🏆 Best S3 Project",
    "   Lab management for engineering colleges",
    "   github.com/Ultra2021/etlab-plus",
    "",
    "4. RyMeds                    🏆 Best S1 Project",
    "   Pharmacy management system",
    "   github.com/Ultra2021/rymeds",
  ],
  skills: [
    "tools I use",
    "─────────────────────────────────────",
    "Languages  : Python, C, C++, SQL, JS, TS",
    "AI/ML      : Ollama, LLaMA, Mistral, MATLAB",
    "Backend    : FastAPI, Node.js, Express",
    "Frontend   : React, Next.js, Tailwind CSS",
    "Databases  : PostgreSQL, SQLite, Supabase",
    "Tools      : Git, VS Code, Docker, Linux",
    "Learning   : PyTorch, ROS2, CUDA, Rust",
  ],
  experience: [
    "experience",
    "─────────────────────────────────────",
    "",
    "PROFESSIONAL INTERNSHIP",
    "─────────────────────────────────────",
    "Role     : Advanced Robotics Summer Internship",
    "Where    : IEEE Sensors Council Kerala Chapter",
    "At       : Luminar Technolab, Kochi",
    "When     : June 2026 (2 weeks)",
    "",
    "Wired up sensors, built a line follower,",
    "debugged an IMU with a loose connection.",
    "Learned that hardware doesn't care about",
    "your elegant code.",
    "",
    "SCHOLARSHIP PROGRAM",
    "─────────────────────────────────────",
    "Program  : TinkerHub Scholarship Program",
    "Selected : Through Useless Projects 2.0 Hackathon",
    "When     : Dec 2025 – May 2026 (6 months)",
    "",
    "Learning, mentorship, project building,",
    "and community participation.",
    "Not employment — a scholarship earned",
    "through a hackathon.",
  ],
  now: [
    "what I'm doing right now",
    "─────────────────────────────────────",
    "Learning   : PyTorch, ROS2, CUDA basics, Rust",
    "Building   : AI Study Coach, this portfolio",
    "Reading    : Designing Data-Intensive Applications",
    "Exploring  : Can useful AI run on a Raspberry Pi?",
    "Obsession  : Making AI work offline on normal hardware",
    "Goal       : Become an AI engineer who actually",
    "             understands the systems underneath",
  ],
  github: [
    "GitHub — Ultra2021",
    "─────────────────────────────────────",
    "github.com/Ultra2021",
    "",
    "Opening in new tab...",
  ],
  contact: [
    "contact",
    "─────────────────────────────────────",
    "Email   : noelbiju2552@gmail.com",
    "Phone   : +91 6282808068",
    "LinkedIn: linkedin.com/in/noel-biju-788b81332",
    "GitHub  : github.com/Ultra2021",
    "",
    "Best way to reach me: email.",
    "I read everything, even if it takes",
    "a day or two to reply.",
  ],
  resume: [
    "resume",
    "─────────────────────────────────────",
    "Opening resume.pdf...",
  ],
  coffee: [
    "☕",
    "",
    "Current coffee status: necessary",
    "Preferred: black, no sugar",
    "Cups today: lost count",
    "",
    "Best debugging fuel there is.",
  ],
  motivation: [
    "why I do this",
    "─────────────────────────────────────",
    "Honestly? I just like building things.",
    "",
    "There's something satisfying about",
    "taking a problem, breaking it into",
    "smaller pieces, and writing code",
    "until it works.",
    "",
    "No inspirational quote here.",
    "Just curiosity and stubbornness.",
  ],
  joke: [
    "// engineering humor",
    "",
    "A SQL query walks into a bar,",
    "walks up to two tables and asks...",
    "\"Can I JOIN you?\"",
    "",
    "// I'm sorry",
  ],
};

interface HistoryEntry {
  type: "input" | "output" | "error";
  content: string;
}

export function Terminal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-200px" });
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", content: "Welcome. This is Noel's portfolio terminal." },
    { type: "output", content: 'Type "help" to see what you can do.' },
    { type: "output", content: "" },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: HistoryEntry[] = [
      ...history,
      { type: "input", content: `$ ${cmd}` },
    ];

    if (trimmed === "clear") {
      setHistory([{ type: "output", content: 'Type "help" for commands.' }]);
      return;
    }

    if (trimmed === "github") {
      window.open("https://github.com/Ultra2021", "_blank");
    }
    if (trimmed === "resume") {
      window.open("/resume.pdf", "_blank");
    }

    if (trimmed === "history") {
      if (cmdHistory.length === 0) {
        newHistory.push({ type: "output", content: "No commands yet. You're the first." });
      } else {
        newHistory.push({ type: "output", content: "command history" });
        newHistory.push({ type: "output", content: "─────────────────────────────────────" });
        cmdHistory.slice(0, 10).forEach((c, i) => {
          newHistory.push({ type: "output", content: `  ${i + 1}. ${c}` });
        });
      }
    } else {
      const output = COMMANDS[trimmed];
      if (output) {
        const lines = typeof output === "function" ? output() : output;
        lines.forEach((line) =>
          newHistory.push({ type: "output", content: line })
        );
      } else if (trimmed) {
        newHistory.push({
          type: "error",
          content: `command not found: ${trimmed}`,
        });
        newHistory.push({
          type: "output",
          content: 'Try "help" — I promise there are fun ones.',
        });
      }
    }

    newHistory.push({ type: "output", content: "" });
    setHistory(newHistory);
    setCmdHistory((prev) => [cmd, ...prev.filter((c) => c !== cmd)]);
    setHistIdx(-1);
    scrollToBottom();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx]);
    }
  };

  return (
    <section id="terminal" className="section-padding" aria-label="Interactive terminal" ref={ref}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-6"
        >
          <motion.div variants={staggerItem} className="space-y-2">
            <div className="section-label">
              <span>—</span>
              Terminal
            </div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <TerminalIcon className="w-7 h-7 text-[#22C55E]" />
              Interactive terminal
            </h2>
            <p className="text-sm text-[#52525B]">
              Try &quot;whoami&quot;, &quot;coffee&quot;, or &quot;motivation&quot;.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="terminal max-w-3xl">
            {/* Title bar */}
            <div className="terminal-header">
              <div className="terminal-dot bg-[#EF4444]" />
              <div className="terminal-dot bg-[#F59E0B]" />
              <div className="terminal-dot bg-[#22C55E]" />
              <span className="ml-2 text-xs text-[#52525B]">
                noel@portfolio — bash
              </span>
            </div>

            {/* Output */}
            <div
              className="p-4 h-72 overflow-y-auto space-y-0.5"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((entry, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed whitespace-pre ${
                    entry.type === "input"
                      ? "text-[#3B82F6]"
                      : entry.type === "error"
                      ? "text-[#EF4444]"
                      : "text-[#A1A1AA]"
                  }`}
                >
                  {entry.content || "\u00A0"}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-[#27272A]">
              <span className="text-[#22C55E] text-sm shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-sm text-white outline-none caret-[#3B82F6]"
                placeholder="type a command…"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
