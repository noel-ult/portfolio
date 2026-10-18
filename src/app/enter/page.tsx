import { EntryIntro } from "@/components/entry-intro";
import { portfolio } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("A line of thought", "An interactive introduction to Noel Biju’s software and AI portfolio. Click or tap anywhere to enter.", "/enter", false);

export default function EntrancePage() {
  const { profile, projects } = portfolio;
  return <main className="entry-page" id="main"><div className="entry-reveal" aria-hidden="true"><p className="hero-eyebrow">Software & AI · Kerala, India</p><p className="entry-reveal-name">Noel Biju</p></div><EntryIntro name={profile.name} location={profile.location} notes={projects.flatMap(project => project.entryNote ? [{ thought: project.entryNote.thought, project: project.entryNote.label ?? project.title, symbol: project.entryNote.symbol }] : [])} /></main>;
}
