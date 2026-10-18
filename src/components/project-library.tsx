"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { Arrow } from "@/components/portfolio";
import type { CatalogProject } from "@/lib/github";

const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener("projectfilters", callback);
  return () => { window.removeEventListener("popstate", callback); window.removeEventListener("projectfilters", callback); };
};
const clientSnapshot = () => window.location.search;
const serverSnapshot = () => "";
const clientReady = () => true;
const serverReady = () => false;

function ProjectCard({ project }: { project: CatalogProject }) {
  const repository = project.repository;
  return <article className="library-project">
    <div className="library-project-top"><span>{repository?.language ?? "Student project"}</span>{repository && repository.stars > 0 ? <span aria-label={`${repository.stars} GitHub stars`}>☆ {repository.stars}</span> : null}</div>
    <h3><Link href={`/projects/${project.slug}`}>{project.title}<Arrow /></Link></h3><p>{project.summary}</p>
    <div className="library-project-bottom">{repository ? <time dateTime={repository.pushedAt}>Updated {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(repository.pushedAt))}</time> : <span>From my selected work</span>}<Link href={`/projects/${project.slug}`} aria-label={`Read about ${project.title}`}>Explore ↗</Link></div>
  </article>;
}

export function ProjectLibrary({ projects, syncedAt, source }: { projects: CatalogProject[]; syncedAt: string; source: "github" | "snapshot" }) {
  const search = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const params = new URLSearchParams(search);
  const query = params.get("q") ?? "";
  const language = params.get("language") ?? "all";
  const [limit, setLimit] = useState(12);
  const field = useRef<HTMLInputElement>(null);
  const languages = [...new Set(projects.map(project => project.repository?.language).filter((item): item is string => !!item))].sort();
  const filtered = projects.filter(project => (language === "all" || project.repository?.language === language) && `${project.title} ${project.summary} ${project.technologies?.join(" ") ?? ""} ${project.repository?.topics.join(" ") ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()));
  const update = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (!value || value === "all") url.searchParams.delete(key); else url.searchParams.set(key, value);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event("projectfilters"));
    setLimit(12);
  };
  return <>
    <div className="library-toolbar"><div className="library-search"><label htmlFor="project-search">Search projects</label><div><input ref={field} id="project-search" type="search" placeholder="Name, technology, or idea…" value={query} disabled={!ready} onChange={event => update("q", event.target.value)} />{query ? <button type="button" className="search-clear" aria-label="Clear project search" onClick={() => { update("q", ""); field.current?.focus(); }}>×</button> : null}</div></div><div className="library-language"><label htmlFor="project-language">Language</label><select id="project-language" disabled={!ready} value={language} onChange={event => update("language", event.target.value)}><option value="all">All languages</option>{languages.map(item => <option key={item} value={item}>{item}</option>)}</select></div></div>
    <div className="library-status"><p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{query || language !== "all" ? " found" : " in the library"}</p><p>{source === "github" ? "Synced from GitHub" : "Saved GitHub snapshot"} · <time dateTime={syncedAt}>{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(syncedAt))}</time></p></div>
    {filtered.length ? <><div className="library-grid">{filtered.slice(0, limit).map(project => <ProjectCard key={project.id} project={project} />)}</div>{filtered.length > limit ? <button className="load-more button" type="button" disabled={!ready} onClick={() => setLimit(value => value + 12)}>Load more projects ({filtered.length - limit} remaining)<Arrow /></button> : null}</> : <div className="library-empty"><h3>No projects match just yet.</h3><p>Try a different search or choose all languages.</p><button className="button" type="button" onClick={() => { const url = new URL(window.location.href); url.search = ""; window.history.replaceState(null, "", url); window.dispatchEvent(new Event("projectfilters")); setLimit(12); field.current?.focus(); }}>Clear filters<Arrow /></button></div>}
    <noscript><p className="preview-nojs">Search needs JavaScript. All projects are listed below.</p><div className="library-grid">{projects.slice(12).map(project => <ProjectCard key={project.id} project={project} />)}</div></noscript>
    <p className="library-source-note">Public repositories refresh hourly on the next visit. <a href="https://github.com/noel-ult">Visit GitHub for the latest changes ↗</a></p>
  </>;
}
