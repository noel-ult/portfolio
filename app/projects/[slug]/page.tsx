import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Award, CheckCircle2, FileCode, Layers, ShieldAlert, Sparkles, Terminal, GitBranch, Database, Cpu, FolderTree, Server } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/content";
import { InteractiveArchitectureDiagram } from "@/components/ui/InteractiveArchitectureDiagram";
import { RelatedContent } from "@/components/ui/RelatedContent";
import { constructMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return constructMetadata({ title: "Project Not Found" });
  return constructMetadata({
    title: `${project.title} — Engineering Case Study`,
    description: project.tagline || project.description,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const techAll = project.technologies;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-4xl space-y-12">
          {/* Back link */}
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Selected Projects
            </Link>
          </div>

          {/* Hero */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#3B82F6] px-2.5 py-1 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#22C55E] px-2.5 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/20">
                Status: {project.status}
              </span>
              <span className="text-xs font-mono text-[#52525B]">Year: {project.year}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              {project.title}
            </h1>

            <p className="text-xl text-[#A1A1AA] leading-relaxed">
              {project.tagline || project.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] border border-[#27272A] text-white text-sm font-semibold hover:border-[#3B82F6] transition-colors font-mono"
                >
                  <SiGithub className="w-4 h-4 text-[#3B82F6]" />
                  GitHub Codebase
                </a>
              )}
            </div>
          </div>

          {/* Case Study Deep Dive Sections */}
          <div className="space-y-12 text-[#A1A1AA] leading-relaxed">
            
            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B82F6] font-mono text-sm">01.</span> Overview & Description
              </h2>
              <p className="text-base text-[#A1A1AA]">{project.description}</p>
            </section>

            {/* Architecture Diagram */}
            {project.architecture && project.architecture.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#3B82F6] font-mono text-sm">02.</span> System Architecture Diagram
                </h2>
                <p className="text-base text-[#A1A1AA]">{project.architecture[0]}</p>
                <InteractiveArchitectureDiagram />
              </section>
            )}

            {/* Database & API Specifications */}
            {((project.database && project.database.length > 0) || (project.apiEndpoints && project.apiEndpoints.length > 0)) && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#3B82F6] font-mono text-sm">03.</span> Database Schema & API Specifications
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.database && project.database.length > 0 && (
                    <div className="card p-5 bg-[#09090b] border-[#27272A] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#3B82F6]">
                        <Database className="w-4 h-4" />
                        Database Schema Design
                      </div>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">{project.database.join(" ")}</p>
                    </div>
                  )}
                  {project.apiEndpoints && project.apiEndpoints.length > 0 && (
                    <div className="card p-5 bg-[#09090b] border-[#27272A] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#22C55E]">
                        <Server className="w-4 h-4" />
                        API Endpoints
                      </div>
                      <ul className="text-xs text-[#A1A1AA] space-y-1 font-mono">
                        {project.apiEndpoints.map((ep, i) => (
                          <li key={i}>• {ep}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Codebase Folder Structure */}
            {project.folderStructure && project.folderStructure.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#3B82F6] font-mono text-sm">04.</span> Codebase Folder Structure
                </h2>
                <div className="card p-4 bg-[#050505] border-[#27272A] font-mono text-xs text-[#22C55E] overflow-x-auto">
                  <pre><code>{project.folderStructure.join("\n")}</code></pre>
                </div>
              </section>
            )}

            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#3B82F6] font-mono text-sm">05.</span> Visual Evidence & Artifacts
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.screenshots.map((shot, idx) => (
                    <div key={idx} className="card p-4 space-y-3 bg-[#0d0d0e]">
                      <div className="flex items-center justify-between text-xs font-mono text-[#52525B]">
                        <span className="flex items-center gap-1.5 text-[#3B82F6]">
                          <FileCode className="w-3.5 h-3.5" />
                          {shot.title}
                        </span>
                        <span className="uppercase text-[10px]">{shot.type}</span>
                      </div>
                      <div className="h-32 rounded-lg border border-[#27272A] bg-[#050505] p-3 flex flex-col justify-center font-mono text-xs text-[#A1A1AA] overflow-hidden">
                        <div className="space-y-1 text-[#22C55E]">
                          <p>$ {project.slug} --status active</p>
                          <p className="text-[#A1A1AA]">[OK] System pipeline initialized</p>
                        </div>
                      </div>
                      <p className="text-xs text-[#52525B]">{shot.caption}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono text-sm">06.</span> Engineering Challenges
                </h2>
                <div className="card p-5 border-[#F59E0B]/30 bg-[#F59E0B]/5 text-xs text-[#A1A1AA]">
                  {project.challenges.join(" ")}
                </div>
              </section>
            )}

            {/* Lessons */}
            {project.lessons && project.lessons.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#22C55E] font-mono text-sm">07.</span> Key Lessons Learned
                </h2>
                <div className="card p-5 border-[#22C55E]/30 bg-[#22C55E]/5 text-sm text-[#A1A1AA]">
                  {project.lessons.join(" ")}
                </div>
              </section>
            )}

            {/* Tech Stack Chips */}
            <section className="space-y-3 pt-6 border-t border-[#27272A]">
              <h3 className="text-xs font-semibold text-[#52525B] uppercase tracking-wider font-mono">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {techAll.map((tech) => (
                  <span key={tech} className="skill-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Related Content Recommendation */}
            <RelatedContent currentSlug={project.slug} category={project.category} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
