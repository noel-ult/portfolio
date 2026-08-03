"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Command, Menu, X, Search } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { getNavigation, getSettings } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const nav = useMemo(() => getNavigation(), []);
  const settings = useMemo(() => getSettings(), []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < 80 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex justify-center"
            style={{ paddingTop: scrolled ? "12px" : "24px" }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <nav
              className="w-full mx-4"
              style={{ maxWidth: "1400px" }}
            >
              <div
                className="flex items-center justify-between px-4 h-12 rounded-2xl transition-all duration-300"
                style={{
                  background: scrolled
                    ? "rgba(9,9,11,0.88)"
                    : "transparent",
                  backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
                  border: scrolled
                    ? "1px solid rgba(39,39,42,0.8)"
                    : "1px solid transparent",
                  boxShadow: scrolled
                    ? "0 4px 24px rgba(0,0,0,0.4)"
                    : "none",
                }}
              >
                {/* Logo */}
                <Link
                  href="/"
                  className="flex items-center gap-2 group"
                  aria-label="Home"
                >
                  <div className="w-7 h-7 rounded-lg border border-[#27272A] flex items-center justify-center group-hover:border-[#3B82F6] transition-colors duration-200">
                    <span className="text-xs font-bold gradient-text-accent">NB</span>
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    {settings.name}
                  </span>
                </Link>

                {/* Desktop Dynamic Navigation Items */}
                <div className="hidden lg:flex items-center gap-1">
                  {nav.items.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                          isActive
                            ? "text-white bg-white/10 font-bold"
                            : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                  {/* Search Link Button */}
                  <Link
                    href="/search"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#3B82F6] transition-all duration-150 text-xs font-mono"
                    aria-label="Open platform search page"
                  >
                    <Search className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span className="hidden sm:inline">Search</span>
                  </Link>

                  {/* Ctrl+K Command Palette Trigger */}
                  <button
                    className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#3B82F6]/50 transition-all duration-150 text-xs font-mono"
                    onClick={() => {
                      document.dispatchEvent(
                        new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
                      );
                    }}
                    aria-label="Open global search palette"
                  >
                    <Command className="w-3 h-3 text-[#3B82F6]" />
                    <span>Ctrl K</span>
                  </button>

                  {/* GitHub */}
                  <a
                    href={settings.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('click_github', 'navbar')}
                    className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-all duration-150"
                    aria-label="GitHub profile"
                  >
                    <SiGithub className="w-4 h-4" />
                  </a>

                  {/* Resume */}
                  <a
                    href={settings.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('download_resume', 'navbar')}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors duration-150 font-mono"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Resume
                  </a>

                  {/* Mobile menu toggle */}
                  <button
                    className="lg:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-all duration-150"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                  >
                    {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-4 right-4 rounded-2xl border border-[#27272A] overflow-hidden max-h-[80vh] overflow-y-auto"
              style={{ background: "rgba(17,17,17,0.98)" }}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 space-y-1">
                {nav.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm ${
                      pathname === link.href
                        ? "text-white bg-white/10 font-bold"
                        : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/search"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left px-4 py-2.5 rounded-xl text-sm text-[#3B82F6] font-semibold"
                >
                  🔍 Platform Search
                </Link>
                <div className="h-px my-2 bg-[#27272A]" />
                <a
                  href={settings.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('download_resume', 'mobile_menu')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-all duration-150 font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download Resume PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
