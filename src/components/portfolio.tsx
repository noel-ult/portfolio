import type { ReactNode } from "react";
import type { PortfolioLink, Project } from "@/content/portfolio";
import { validLinks } from "@/lib/content";

export function Arrow({ direction = "right" }: { direction?: "right" | "up" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`arrow ${direction === "up" ? "arrow-up" : ""}`}><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function TextLinks({ links }: { links?: PortfolioLink[] }) {
  const visible = validLinks(links);
  if (!visible.length) return null;
  return <div className="flex flex-wrap gap-x-7 gap-y-3">{visible.map(link => <a className="text-link" key={`${link.label}-${link.url}`} href={link.url}>{link.label}<Arrow /></a>)}</div>;
}

export function Section({ id, title, children }: {
  id: string; title: string; children: ReactNode;
}) {
  return <section id={id} aria-labelledby={`${id}-heading`} className="content-section">
    <h2 id={`${id}-heading`} tabIndex={-1}>{title}</h2>
    <div className="section-content">{children}</div>
  </section>;
}

export function BulletList({ items, label }: { items?: string[]; label: string }) {
  const visible = items?.filter(item => item.trim());
  return visible?.length ? <div className="detail"><h4>{label}</h4><ul className="list-disc space-y-2 pl-5">{visible.map((item, index) => <li key={index}>{item}</li>)}</ul></div> : null;
}

export function ProjectEntry({ project }: { project: Project }) {
  const details = [
    ["The problem", project.problem], ["My contribution", project.contribution],
    ["The approach", project.approach], ["Outcome & lessons", project.outcome],
  ].filter(([, value]) => value?.trim());
  return <article className="project-entry" aria-labelledby={`project-${project.id}`}>
    {project.status || project.date ? <p className="entry-meta">{[project.status, project.date].filter(Boolean).join(" · ")}</p> : null}
    <h3 id={`project-${project.id}`}>{project.title}</h3>
    {project.summary ? <p>{project.summary}</p> : null}
    {details.length ? <details className="project-details"><summary>Read the project story<span aria-hidden="true">+</span></summary><div className="details-body">{details.map(([label, value]) => <div className="detail" key={label}><h4>{label}</h4><p>{value}</p></div>)}</div></details> : null}
    {project.technologies?.filter(Boolean).length ? <ul className="tag-list" aria-label="Project technologies">{project.technologies.filter(Boolean).map(technology => <li key={technology}>{technology}</li>)}</ul> : null}
    <TextLinks links={project.links} />
  </article>;
}
