import Image from "next/image";
import Link from "next/link";
import { ArtworkStage } from "@/components/artwork-stage";
import { ProjectStories } from "@/components/project-stories";
import { Arrow, Section, TextLinks } from "@/components/portfolio";
import { portfolio } from "@/content/portfolio";
import { getProjectCatalog } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";

// Cache GitHub data once; render from it directly so page caching cannot delay discovery.
export const revalidate = 0;
export const metadata = pageMetadata("Software & AI Portfolio", portfolio.profile.introduction, "/");

export default async function Home() {
  const { profile, contact } = portfolio;
  const catalog = await getProjectCatalog();
  const latest = catalog.projects.filter(project => project.repository && !project.featured).slice(0, 3);
  return <>
    <section className="intro" aria-labelledby="intro-heading">
      <ArtworkStage /><div className="intro-copy">
        <p className="hero-eyebrow">Personal portfolio · {profile.location}</p>
        <div className="hero-name"><h1 id="intro-heading" className="hero-name-solid">{profile.name}</h1></div>
        <div className="hero-description has-portrait">
          <p className="intro-role">{profile.role}</p>
          <div className="hero-bio"><p className="introduction">{profile.introduction}</p><p className="entry-meta">{profile.availability}</p>
            <div className="intro-actions flex flex-wrap gap-x-8 gap-y-3"><Link className="button button-primary" href="/projects">Explore projects<Arrow /></Link><Link className="button button-secondary" href="/contact">Get in touch<Arrow /></Link><a className="text-link" href={profile.resumeUrl}>View résumé (PDF)<Arrow /></a></div>
            <div className="hero-socials"><TextLinks links={contact.links} /></div>
          </div>
          {profile.photo ? <figure className="hero-portrait"><div className="portrait-image"><Image src={profile.photo.src} alt={profile.photo.alt} width={1200} height={1600} priority sizes="(max-width: 760px) 100vw, 30vw" /></div><figcaption><span>Behind the work</span><span aria-hidden="true">↗</span></figcaption></figure> : null}
        </div>
      </div><a className="hero-scroll" href="#selected-work"><span>Scroll to selected work</span><Arrow direction="up" /></a>
    </section>
    <Section id="selected-work" title="Selected work"><p className="section-intro">Two small questions, turned into working software.</p><ProjectStories projects={catalog.featured} /><Link className="text-link" href="/projects">Explore all projects<Arrow /></Link></Section>
    <Section id="latest-work" title="On the workbench"><div className="section-intro-row"><p className="section-intro">Recent work from my public GitHub repositories.</p><Link className="text-link" href="/projects#library">View project library<Arrow /></Link></div><div className="latest-projects">{latest.map(project => <article key={project.id}><p className="entry-meta">{project.repository?.language ?? "Software"}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}<Arrow /></Link></h3><p>{project.summary}</p></article>)}</div></Section>
    <section className="home-about"><p className="hero-eyebrow">A little about me</p><h2>Curiosity.<br />Then code.</h2><div><p>{profile.biography}</p><Link className="text-link" href="/about">More about me<Arrow /></Link></div></section>
  </>;
}
