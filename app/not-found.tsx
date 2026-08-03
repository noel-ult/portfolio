import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Escaped Into Production",
  description: "This page escaped into production and cannot be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#09090B]">
      <div className="text-center space-y-6 max-w-md">
        {/* 404 */}
        <div className="text-8xl font-bold gradient-text-accent opacity-30 select-none font-mono">
          404
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-white">
            Looks like this page escaped into production.
          </h1>
          <p className="text-[#A1A1AA] text-sm leading-relaxed">
            Either the URL is mistyped, or I haven&apos;t built this part of the system yet. Probably breaking something interesting.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2563EB] transition-colors"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>

        {/* Terminal hint */}
        <p className="text-xs text-[#3F3F46] font-mono pt-4">
          $ cd ~
        </p>
      </div>
    </div>
  );
}
