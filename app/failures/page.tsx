import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertTriangle, CheckCircle2, ShieldAlert, Wrench } from "lucide-react";
import failures from "@/data/failures.json";

export default function FailuresPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-5xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EF4444]/30 bg-[#EF4444]/10 text-xs font-mono text-[#EF4444]">
              <AlertTriangle className="w-3.5 h-3.5" />
              Transparent Engineering Log
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Failure Log & Post-Mortems
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              A transparent log of real engineering mistakes, root-cause analyses, immediate fixes, and operational lessons.
            </p>
          </div>

          {/* Grid of Incidents */}
          <div className="grid md:grid-cols-2 gap-6">
            {failures.map((item, idx) => (
              <div key={item.id} className="card p-6 space-y-5 bg-[#09090b] border-[#27272A] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#EF4444] bg-[#EF4444]/10 px-2.5 py-1 rounded border border-[#EF4444]/20 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Incident Post-Mortem #0{idx + 1}
                    </span>
                  </div>

                  {/* Incident */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-wider block font-semibold">
                      Incident Summary
                    </span>
                    <h2 className="text-lg font-bold text-white leading-snug">
                      {item.whatHappened}
                    </h2>
                  </div>

                  {/* Cause */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-wider block font-semibold">
                      Root Cause
                    </span>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      {item.why}
                    </p>
                  </div>

                  {/* Fix */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#3B82F6] uppercase tracking-wider block font-semibold">
                      Engineering Fix
                    </span>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      {item.fix}
                    </p>
                  </div>
                </div>

                {/* Lesson */}
                <div className="pt-4 border-t border-[#1a1a1a] space-y-1">
                  <span className="text-[10px] font-mono text-[#22C55E] uppercase tracking-wider block font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    Operational Lesson
                  </span>
                  <p className="text-xs text-white font-medium italic leading-relaxed">
                    &quot;{item.lesson}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
