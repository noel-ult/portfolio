import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMotion } from "@/components/page-motion";
import { HomeEntrance } from "@/components/home-entrance";
import { portfolio } from "@/content/portfolio";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile, projects } = portfolio;
  return <HomeEntrance name={profile.name} location={profile.location} notes={projects.flatMap(project => project.entryNote ? [{ thought: project.entryNote.thought, project: project.entryNote.label ?? project.title, symbol: project.entryNote.symbol }] : [])}><a className="skip-link" href="#main">Skip to content</a><div className="page-shell" id="top"><SiteHeader /><PageMotion /><main id="main" tabIndex={-1}>{children}</main><SiteFooter /></div></HomeEntrance>;
}
