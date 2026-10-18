import Link from "next/link";
import { PageHeading, PageBreadcrumbs } from "@/components/page-heading";
import { Arrow, BulletList } from "@/components/portfolio";
import { portfolio } from "@/content/portfolio";
import { chronological, dateRange } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Experience", "Noel Biju’s advanced robotics internship, applied engineering experience, and award-winning student projects.", "/experience");

export default function ExperiencePage() {
  return <div className="inner-page"><PageBreadcrumbs title="Experience" path="/experience" /><PageHeading title="Experience" eyebrow="Learning by doing" introduction="From sensor systems and hardware integration to the software projects I build alongside my degree." />
    <section className="page-section two-column-section" aria-labelledby="experience-heading"><h2 id="experience-heading">In the field</h2><div>{chronological(portfolio.experience).map(entry => <article key={entry.id} className="timeline-entry"><p className="entry-meta">{dateRange(entry.startDate, entry.endDate)} · {entry.location}</p><h3>{entry.role}</h3><p className="organization">{entry.organization}</p><p>{entry.summary}</p><BulletList items={entry.responsibilities} label="Responsibilities" /><BulletList items={entry.outcomes} label="Outcomes" /></article>)}</div></section>
    <section className="page-section two-column-section" aria-labelledby="applied-heading"><h2 id="applied-heading">Built at college</h2><div>{portfolio.projects.filter(project => ["etlab-plus", "rymeds"].includes(project.id)).map(project => <article className="timeline-entry" key={project.id}><p className="entry-meta">{project.outcome}</p><h3>{project.title}</h3><p>{project.summary}</p><Link className="text-link" href={`/projects/${project.id}`}>Read the project<Arrow /></Link></article>)}</div></section>
    <div className="page-endnote"><p>There’s more behind each build.</p><Link className="text-link" href="/projects">Explore the projects<Arrow /></Link></div>
  </div>;
}
