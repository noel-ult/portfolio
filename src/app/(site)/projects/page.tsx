import { PageHeading, PageBreadcrumbs } from "@/components/page-heading";
import { ProjectStories } from "@/components/project-stories";
import { ProjectLibrary } from "@/components/project-library";
import { StructuredData } from "@/components/structured-data";
import { getProjectCatalog } from "@/lib/github";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const revalidate = 0;
export const metadata = pageMetadata("Projects", "Explore Noel Biju’s featured PageRadar and Choru Vaari projects, plus a growing library of public web, AI, and software repositories from GitHub.", "/projects");

export default async function ProjectsPage() {
  const catalog = await getProjectCatalog();
  return <div className="inner-page"><PageBreadcrumbs title="Projects" path="/projects" /><StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Noel Biju’s projects", url: absoluteUrl("/projects"), mainEntity: { "@type": "ItemList", itemListElement: catalog.projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.title, url: absoluteUrl(`/projects/${project.slug}`) })) } }} />
    <PageHeading title="Projects" eyebrow="Experiments that became software" introduction="A few builds in detail, and everything else on the workbench. Web systems, local AI, computer vision, and the occasional unusual question." />
    <section aria-labelledby="featured-heading" className="featured-section"><div className="section-label"><h2 id="featured-heading">Featured work</h2><span>Try the interactive previews</span></div><ProjectStories projects={catalog.featured} /></section>
    <section id="library" className="page-section" aria-labelledby="library-heading"><div className="library-heading"><h2 id="library-heading">The project library</h2><p>Selected student work and public repositories, in order of their latest code update.</p></div><ProjectLibrary projects={catalog.projects} syncedAt={catalog.syncedAt} source={catalog.source} /></section>
  </div>;
}
