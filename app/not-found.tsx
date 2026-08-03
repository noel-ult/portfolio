"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#09090B] text-white selection:bg-blue-500/30 selection:text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-6 max-w-md relative z-10"
      >
        {/* Animated 404 Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600/30 select-none font-mono tracking-tighter"
        >
          404
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
            The link you followed may be broken, or the page may have been moved or removed.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 active:scale-[0.98]"
            aria-label="Return to Homepage"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </motion.div>

        {/* Minimal terminal prompt footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-[#3F3F46] font-mono pt-6"
        >
          $ cd ~
        </motion.p>
      </motion.div>
    </div>
  );
}
