"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import {
  Home,
  User,
  FolderKanban,
  Briefcase,
  Award,
  BookOpen,
  Mail,
  Download,
  Clock,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useRouter } from "next/navigation";
import {
  getProjects,
  getJournalPosts,
  getCertificates,
  getNavigation,
  getSettings,
} from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const nav = useMemo(() => getNavigation(), []);
  const settings = useMemo(() => getSettings(), []);
  const projects = useMemo(() => getProjects(), []);
  const journal = useMemo(() => getJournalPosts(), []);
  const certificates = useMemo(() => getCertificates(), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  // Base navigation pages dynamically loaded
  const baseCommands: CommandItem[] = nav.items.map((item) => ({
    id: `nav-${item.href}`,
    label: item.label,
    description: `Navigate to ${item.label}`,
    icon: <Home className="w-4 h-4 text-[#3B82F6]" />,
    action: () => navigateTo(item.href),
    category: "Main Navigation",
  }));

  // Project Items
  const projectCommands: CommandItem[] = projects.map((p) => ({
    id: `proj-${p.slug}`,
    label: p.title,
    description: `Case study (${p.category})`,
    icon: <FolderKanban className="w-4 h-4 text-[#3B82F6]" />,
    action: () => {
      trackEvent("view_project", p.slug);
      navigateTo(`/projects/${p.slug}`);
    },
    category: "Projects",
  }));

  // Journal Items
  const journalCommands: CommandItem[] = journal.map((j) => ({
    id: `jour-${j.slug}`,
    label: j.title,
    description: `Article (${j.readingTime} min read)`,
    icon: <BookOpen className="w-4 h-4 text-[#22C55E]" />,
    action: () => {
      trackEvent("view_journal", j.slug);
      navigateTo(`/journal/${j.slug}`);
    },
    category: "Journal Articles",
  }));

  // Certificate Items
  const certCommands: CommandItem[] = certificates.map((c) => ({
    id: `cert-${c.credentialId}`,
    label: c.title,
    description: `Issuer: ${c.issuer}`,
    icon: <Award className="w-4 h-4 text-[#F59E0B]" />,
    action: () => {
      trackEvent("view_certificate", c.credentialId);
      navigateTo("/certificates");
    },
    category: "Certificates",
  }));

  // External Actions
  const externalCommands: CommandItem[] = [
    {
      id: "ext-resume",
      label: "Download Resume PDF",
      description: "Get latest curriculum vitae",
      icon: <Download className="w-4 h-4 text-[#3B82F6]" />,
      action: () => {
        setOpen(false);
        trackEvent("download_resume", "command_palette");
        window.open(settings.resume, "_blank");
      },
      category: "Quick Actions",
    },
    {
      id: "ext-github",
      label: "Open GitHub Profile",
      description: settings.github,
      icon: <SiGithub className="w-4 h-4 text-white" />,
      action: () => {
        setOpen(false);
        trackEvent("click_github", "command_palette");
        window.open(settings.github, "_blank");
      },
      category: "Quick Actions",
    },
  ];

  const allCommands = [
    ...baseCommands,
    ...projectCommands,
    ...journalCommands,
    ...certCommands,
    ...externalCommands,
  ];

  const filtered = allCommands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      (cmd.description?.toLowerCase() ?? "").includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="cmdk-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="cmdk-dialog"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Command label="Global Command Search">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#27272A]">
                <Sparkles className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <Command.Input
                  placeholder="Search projects, certificates, journal, pages…"
                  value={search}
                  onValueChange={(val) => {
                    setSearch(val);
                    if (val.length > 2) trackEvent("search_query", val);
                  }}
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#A1A1AA]"
                />
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#27272A] text-[#A1A1AA] text-xs font-mono">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[380px] overflow-y-auto py-2">
                <Command.Empty className="py-8 text-center text-[#A1A1AA] text-sm">
                  No matching content found for &quot;{search}&quot;.
                </Command.Empty>

                {Object.entries(grouped).map(([category, items]) => (
                  <Command.Group
                    key={category}
                    heading={category}
                    className="[&>[cmdk-group-heading]]:px-4 [&>[cmdk-group-heading]]:py-2 [&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:font-semibold [&>[cmdk-group-heading]]:text-[#3B82F6] [&>[cmdk-group-heading]]:uppercase [&>[cmdk-group-heading]]:tracking-wider"
                  >
                    {items.map((cmd) => (
                      <Command.Item
                        key={cmd.id}
                        value={`${cmd.label} ${cmd.description || ""}`}
                        onSelect={cmd.action}
                        className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg cursor-pointer text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a] aria-selected:bg-[#1a1a1a] aria-selected:text-white transition-colors duration-100 text-sm"
                      >
                        <span className="shrink-0 opacity-80">{cmd.icon}</span>
                        <span className="flex-1 font-medium">{cmd.label}</span>
                        {cmd.description && (
                          <span className="text-xs text-[#52525B] hidden sm:block font-mono">
                            {cmd.description}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#27272A] text-xs text-[#52525B] font-mono">
                <span>Ctrl K global search</span>
                <span>↑↓ to navigate · Enter to open</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
