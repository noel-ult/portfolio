import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Briefcase, Calendar, CheckCircle2, ArrowLeft, Bot, Cpu } from "lucide-react";
import Link from "next/link";
import { getExperience } from "@/lib/content";

export default function ExperiencePage() {
  const experienceList = getExperience();
  const internship = experienceList.find((e) => e.id === "robotics-internship");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-4xl space-y-12">
          {/* Back link */}
          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to About Page
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6]">
              <Briefcase className="w-3.5 h-3.5" />
              Professional Experience & Internships
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Work Experience & Internship Log
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Hands-on engineering roles, hardware sensor calibration responsibilities, software implementations, and operational reflections.
            </p>
          </div>

          {/* Internship Focus Case */}
          {internship && (
            <div className="card p-8 space-y-8 bg-[#09090b] border-[#3B82F6]/30">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#27272A] pb-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#3B82F6] uppercase tracking-wider font-semibold">
                    {internship.type} Focus
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {internship.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#3B82F6]">
                    {internship.company}
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono text-[#52525B]">
                  <div className="flex items-center gap-1.5 text-[#3B82F6]">
                    <Calendar className="w-3.5 h-3.5" />
                    {internship.startDate} - {internship.endDate}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#3B82F6]" />
                  Responsibilities & Hand-On Tasks
                </h3>
                <ul className="space-y-2 text-sm text-[#A1A1AA]">
                  {internship.achievements.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Learned */}
              <div className="space-y-3 pt-4 border-t border-[#1a1a1a]">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#F59E0B]" />
                  Skills & Tools Applied
                </h3>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <span key={skill} className="skill-chip text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 pt-4 border-t border-[#1a1a1a] text-sm text-[#A1A1AA]">
                <h3 className="text-base font-bold text-white">Engineering Reflections & Lessons</h3>
                <p className="leading-relaxed">
                  {internship.description}
                </p>
              </div>
            </div>
          )}

          {/* Full Journey Cards */}
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl font-bold text-white">Complete Timeline Records</h2>
            <div className="space-y-4">
              {experienceList.map((item) => (
                <div key={item.id} className="card p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#3B82F6]">{item.type}</span>
                    <span className="text-[#52525B]">{item.startDate} - {item.endDate}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs font-mono text-[#3B82F6]">{item.company}</p>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
