import Image from "next/image";
import Link from "next/link";
import { PageHeading, PageBreadcrumbs } from "@/components/page-heading";
import { StructuredData } from "@/components/structured-data";
import { Arrow, TextLinks } from "@/components/portfolio";
import { portfolio } from "@/content/portfolio";
import { dateRange } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const description = "Meet Noel Biju, a computer science undergraduate in Kerala building web applications, local AI tools, and computer vision experiments.";
export const metadata = pageMetadata("About", description, "/about");

export default function AboutPage() {
  const { profile, skills, education, achievements, contact } = portfolio;
  return <div className="inner-page"><PageBreadcrumbs title="About" path="/about" /><StructuredData data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: absoluteUrl("/about"), mainEntity: { "@type": "Person", "@id": absoluteUrl("/#noel-biju"), name: profile.name, url: absoluteUrl("/"), image: absoluteUrl(profile.photo!.src), description: profile.introduction, sameAs: contact.links.map(link => link.url) } }} />
    <PageHeading title="About me" eyebrow="The person behind the projects" introduction={profile.introduction} />
    <section className="about-page-grid" aria-labelledby="background-heading"><div className="about-page-portrait"><Image src={profile.photo!.src} alt={profile.photo!.alt} width={1200} height={1600} sizes="(max-width: 760px) 100vw, 45vw" priority /></div><div className="about-page-copy"><p className="hero-eyebrow">{profile.location}</p><h2 id="background-heading">I like finding out<br />how things work.</h2><p>{profile.biography}</p><p className="availability"><span className="brand-dot" aria-hidden="true" />{profile.availability}</p><a className="text-link" href={profile.resumeUrl}>Read my résumé (PDF)<Arrow /></a><Link className="text-link" href="/experience">Explore my experience<Arrow /></Link></div></section>
    <section className="page-section two-column-section" aria-labelledby="skills-heading"><h2 id="skills-heading">Skills & tools</h2><ul className="skills-list">{skills.map(skill => <li key={skill.name}><span>{skill.name}</span><span className="skill-context">{skill.category}</span></li>)}</ul></section>
    <section className="page-section two-column-section" aria-labelledby="education-heading"><h2 id="education-heading">Education</h2><div>{education.map(entry => <article key={entry.id} className="timeline-entry"><p className="entry-meta">{dateRange(entry.startDate, entry.endDate)}</p><h3>{entry.qualification}</h3><p className="organization">{entry.institution}</p><p>{entry.focus}</p></article>)}</div></section>
    <section className="page-section two-column-section" aria-labelledby="recognition-heading"><h2 id="recognition-heading">Recognition</h2><div>{achievements.map(entry => <article key={entry.id} className="timeline-entry"><h3>{entry.name}</h3>{entry.issuer ? <p className="entry-meta">{entry.issuer}</p> : null}{entry.description ? <p>{entry.description}</p> : null}<TextLinks links={entry.verificationLink ? [entry.verificationLink] : []} /></article>)}</div></section>
  </div>;
}
