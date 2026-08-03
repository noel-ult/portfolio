import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Clock, BookOpen, Brain, FlaskConical, Target, Music, Cpu, Terminal, CheckCircle2 } from "lucide-react";
import { getNow } from "@/lib/content";

export default function NowPage() {
  const nowData = getNow();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-4xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#818CF8]/30 bg-[#818CF8]/10 text-xs font-mono text-[#818CF8]">
                  <Clock className="w-3.5 h-3.5" />
                  Derek Sivers Inspired Focus Page
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  What I&apos;m Doing Now
                </h1>
              </div>
              <div className="text-xs font-mono text-[#52525B]">
                Last Updated: <span className="text-white font-semibold">{nowData.lastUpdated}</span>
              </div>
            </div>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              A real-time snapshot of my active software projects, research experiments, reading list, hardware setup, and focus playlist dynamically loaded from JSON.
            </p>
          </div>

          {/* Core Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Currently Building */}
            <div className="card p-6 space-y-4 bg-[#09090b]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#3B82F6]" />
                Currently Building
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA]">
                {nowData.currentlyBuilding.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Currently Learning */}
            <div className="card p-6 space-y-4 bg-[#09090b]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#22C55E]" />
                Currently Learning
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA]">
                {nowData.currentlyLearning.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Experiment */}
            <div className="card p-6 space-y-3 bg-[#09090b] border-[#F59E0B]/30">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#F59E0B]" />
                Active Engineering Experiment
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {nowData.currentExperiment}
              </p>
            </div>

            {/* Current Goal */}
            <div className="card p-6 space-y-3 bg-[#09090b] border-[#EC4899]/30">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[#EC4899]" />
                Primary Strategic Goal
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {nowData.currentGoal}
              </p>
            </div>

            {/* Currently Reading */}
            <div className="card p-6 space-y-4 bg-[#09090b]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#818CF8]" />
                Currently Reading Books
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA]">
                {nowData.currentlyReading.map((book, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#818CF8] font-bold font-mono">📖</span>
                    {book}
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Playlist / Focus Audio */}
            <div className="card p-6 space-y-4 bg-[#09090b]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Music className="w-4 h-4 text-[#EC4899]" />
                Current Focus Playlist
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA]">
                {nowData.playlist.map((track, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#EC4899] font-mono">🎧</span>
                    {track}
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Hardware */}
            <div className="card p-6 space-y-4 bg-[#09090b]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#3B82F6]" />
                Current Hardware Equipment
              </h2>
              <ul className="space-y-2 text-xs text-[#A1A1AA] font-mono">
                {nowData.hardware.map((hw, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3B82F6] font-bold">›</span>
                    {hw}
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Software */}
            <div className="card p-6 space-y-4 bg-[#09090b]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#22C55E]" />
                Current Software Stack
              </h2>
              <ul className="space-y-2 text-xs text-[#A1A1AA] font-mono">
                {nowData.software.map((sw, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#22C55E] font-bold">›</span>
                    {sw}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
