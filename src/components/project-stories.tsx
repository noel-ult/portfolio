"use client";

import { useEffect, useRef } from "react";
import { type Project, previewCopy } from "@/content/portfolio";
import { TextLinks } from "@/components/portfolio";
import { ProjectPreview } from "@/components/project-preview";

function ProjectStory({ project, initiallyOpen }: { project: Project; initiallyOpen: boolean }) {
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const element = details.current;
    const summary = element?.querySelector("summary");
    if (!element || !summary) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    let desired = element.open;
    const settle = () => {
      animation?.cancel(); animation = undefined;
      element.open = desired;
      element.style.removeProperty("overflow");
    };
    const toggle = (event: MouseEvent) => {
      if (preference.matches || !element.animate) { desired = !element.open; return; }
      event.preventDefault();
      const start = element.getBoundingClientRect().height;
      animation?.cancel();
      desired = !desired;
      element.open = true;
      element.style.overflow = "hidden";
      const end = desired ? element.getBoundingClientRect().height : summary.getBoundingClientRect().height;
      animation = element.animate([{ height: `${start}px` }, { height: `${end}px` }], { duration: 360, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
      animation.onfinish = settle;
    };
    summary.addEventListener("click", toggle);
    window.addEventListener("resize", settle);
    preference.addEventListener("change", settle);
    return () => {
      settle(); summary.removeEventListener("click", toggle);
      window.removeEventListener("resize", settle);
      preference.removeEventListener("change", settle);
    };
  }, []);

  const parts = [["The problem", project.problem], ["The approach", project.approach], ["Outcome & lessons", project.outcome]].filter(([, value]) => value?.trim());
  const technologies = project.technologies?.filter(value => value.trim()) ?? [];
  const hasStory = parts.length > 0 || technologies.length > 0;
  const headingId = `project-${project.id}`;
  const title = <div className="project-heading"><h3 id={headingId}>{project.title}</h3>{hasStory ? <span className="project-toggle" aria-hidden="true">+</span> : null}</div>;
  const introduction = <div className="project-introduction">{project.summary ? <p>{project.summary}</p> : null}{project.contribution?.trim() ? <p className="project-contribution"><span>My contribution</span>{project.contribution}</p> : null}</div>;
  const disclosureTitle = <span className="project-heading"><span className="project-title" aria-hidden="true">{project.title}</span><span className="project-toggle" aria-hidden="true">+</span></span>;
  const disclosureIntroduction = <span className="project-introduction">{project.summary ? <span className="project-summary">{project.summary}</span> : null}{project.contribution?.trim() ? <span className="project-contribution"><span className="project-contribution-label">My contribution</span>{project.contribution}</span> : null}</span>;
  return <article className={`project-story${project.preview ? " has-showcase" : ""}`} aria-labelledby={headingId}>
    <div className="project-copy">
    {project.status || project.date ? <p className="entry-meta">{[project.status, project.date].filter(Boolean).join(" · ")}</p> : null}
    {hasStory ? <><h3 id={headingId} className="visually-hidden">{project.title}</h3><details ref={details} open={initiallyOpen}>
      <summary aria-labelledby={headingId}>{disclosureTitle}{disclosureIntroduction}<span className="story-prompt" aria-hidden="true"><span className="when-closed">Read project story</span><span className="when-open">Close project story</span></span></summary>
      <div className="story-body">{parts.map(([label, value]) => <div className="story-detail" key={label}><h4>{label}</h4><p>{value}</p></div>)}{technologies.length ? <div className="story-detail"><h4>Built with</h4><ul className="tag-list">{technologies.map((technology, index) => <li key={`${technology}-${index}`}>{technology}</li>)}</ul></div> : null}</div>
    </details></> : <>{title}{introduction}</>}
    <div className="project-links"><TextLinks links={project.links} /></div>
    </div>
    {project.preview ? <ProjectPreview kind={project.preview} /> : null}
  </article>;
}

export function ProjectStories({ projects }: { projects: Project[] }) {
  return projects.length ? <div className="project-list">{projects.map((project, index) => <ProjectStory key={project.id} project={project} initiallyOpen={index === 0} />)}</div> : <div className="projects-pending"><span className="pending-mark" aria-hidden="true">↗</span><div><p className="entry-meta">Selected work / pending</p><h3>{previewCopy.projectsTitle}</h3><p>{previewCopy.projectsDescription}</p></div></div>;
}
