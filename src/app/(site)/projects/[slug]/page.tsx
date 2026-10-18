import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { PageHeading, PageBreadcrumbs } from "@/components/page-heading";
import { ProjectPreview } from "@/components/project-preview";
import { ProjectReadme } from "@/components/project-readme";
import { Arrow } from "@/components/portfolio";
import { getProject, getReadme } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 0;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return pageMetadata("Project not found", "This project is not in the portfolio.", `/projects/${slug}`, false);
  return pageMetadata(project.title, project.summary, `/projects/${project.slug}`);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  if (project.slug !== slug) permanentRedirect(`/projects/${project.slug}`);
  const repository = project.repository;
  const markdown = repository ? await getReadme(repository) : null;
  const details = [["The problem", project.problem], ["My contribution", project.contribution], ["The approach", project.approach], ["Outcome & lessons", project.outcome]].filter(([, text]) => text);
  const homepage = repository?.homepage;
  return <div className="inner-page"><PageBreadcrumbs title={project.title} path={`/projects/${project.slug}`} parent={{ label: "Projects", href: "/projects" }} /><PageHeading title={project.title} eyebrow={project.featured ? "Featured project" : "From the workbench"} introduction={project.summary} parent={{ label: "Projects", href: "/projects" }} />
    <div className="project-resource-row">{repository ? <><a className="button button-primary" href={repository.sourceUrl}>View source on GitHub<Arrow /></a>{homepage ? <a className="text-link" href={homepage}>Visit project website<Arrow /></a> : null}<p className="entry-meta">Last code update <time dateTime={repository.pushedAt}>{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(repository.pushedAt))}</time>{repository.stars ? ` · ${repository.stars} GitHub stars` : ""}</p></> : <p className="entry-meta">A selected student project</p>}</div>
    {project.technologies?.length ? <ul className="tag-list detail-technologies" aria-label="Project technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul> : null}
    {details.length || project.preview ? <div className={`project-detail-grid${project.preview ? " with-preview" : ""}`}><div>{details.map(([heading, text]) => <section className="project-detail-section" key={heading} aria-label={heading}><h2>{heading}</h2><p>{text}</p></section>)}</div>{project.preview ? <ProjectPreview kind={project.preview} /> : null}</div> : null}
    {repository ? <section className="page-section" aria-labelledby="documentation-heading"><div className="documentation-heading"><h2 id="documentation-heading">From the repository</h2><a className="text-link" href={`${repository.sourceUrl}#readme`}>Read on GitHub<Arrow /></a></div>{markdown ? <ProjectReadme markdown={markdown} repository={repository} /> : <div className="readme-unavailable"><p>The source repository is the best place to explore this project’s files and latest documentation.</p><a className="text-link" href={repository.sourceUrl}>Explore {repository.name} on GitHub<Arrow /></a></div>}</section> : null}
    <div className="page-endnote"><p>Keep exploring.</p><Link className="text-link" href="/projects#library">Back to the project library<Arrow /></Link></div>
  </div>;
}
