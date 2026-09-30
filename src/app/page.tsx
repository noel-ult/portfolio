import Image from "next/image";
import { ArtworkStage } from "@/components/artwork-stage";
import { SiteHeader } from "@/components/site-header";
import { PageMotion } from "@/components/page-motion";
import { EntryIntro } from "@/components/entry-intro";
import { ProjectStories } from "@/components/project-stories";
import { portfolio, previewCopy } from "@/content/portfolio";
import { Arrow, BulletList, Section, TextLinks } from "@/components/portfolio";
import { chronological, dateRange, emailUrl, isPreview, safeUrl, validLinks } from "@/lib/content";

export default function Home() {
  const { profile, projects, skills, experience, education, achievements, contact } = portfolio;
  const showProjects = projects.length > 0 || isPreview;
  const showExperience = experience.length > 0 || education.length > 0 || isPreview;
  const resume = safeUrl(profile.resumeUrl);
  const email = emailUrl(contact.email);
  const contacts = validLinks(contact.links);
  const name = profile.name.replace(/^\[|\]$/g, "");
  const nav = [
    { id: "about", label: "About" },
    ...(showProjects ? [{ id: "projects", label: "Projects" }] : []),
    ...(showExperience ? [{ id: "experience", label: "Experience" }] : []),
    { id: "contact", label: "Contact" },
  ];

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="page-shell" id="top">
      <SiteHeader name={name} destinations={nav} />
      <PageMotion />
      <EntryIntro name={name} />
      <main id="main" tabIndex={-1}>
        <section className="intro" aria-labelledby="intro-heading">
          <ArtworkStage />
          <div className="intro-copy">
          <p className="hero-eyebrow hero-enter">Personal portfolio</p>
          <div className="hero-name">
            <h1 id="intro-heading" className="hero-name-solid">{name}</h1>
          </div>
          <div className={`hero-description${profile.photo ? " has-portrait" : ""}`}>
          <p className="intro-role hero-enter">{profile.role}</p>
          <div className="hero-bio hero-enter"><p className="introduction">{profile.introduction}</p>
          {profile.location || profile.availability ? <p className="entry-meta">{[profile.location, profile.availability].filter(Boolean).join(" · ")}</p> : null}
          <div className="intro-actions flex flex-wrap gap-x-8 gap-y-3">
            {showProjects ? <a className="button button-primary" href="#projects">Explore projects<Arrow /></a> : null}
            <a className="button button-secondary" href="#contact">Get in touch<Arrow /></a>
            {resume ? <a className="text-link" href={resume}>View résumé (PDF)<Arrow /></a> : null}
          </div><div className="hero-socials"><TextLinks links={contacts} /></div></div>
          {profile.photo ? <figure className="hero-portrait hero-enter"><div className="portrait-image"><Image src={profile.photo.src} alt={profile.photo.alt} width={1200} height={1600} priority unoptimized /></div><figcaption><span>Behind the work</span><span aria-hidden="true">↗</span></figcaption></figure> : null}
          </div>
          {isPreview ? <p className="preview-notice hero-enter">{previewCopy.notice}</p> : null}
          </div>
          {showProjects ? <a className="hero-scroll hero-enter" href="#projects"><span>Scroll to selected work</span><Arrow direction="up" /></a> : null}
        </section>
        {showProjects ? <Section id="projects" title="Selected work">
          <ProjectStories projects={projects} />
        </Section> : null}
        <div className="background-grid">
        <Section id="about" title="About">
          {profile.photo ? <div className="about-portrait"><Image src={profile.photo.src} alt="" width={1200} height={1600} unoptimized /></div> : null}
          <div className={skills.length ? "about-grid" : ""}><p className="biography">{profile.biography}</p>
          {skills.length ? <div className="skills"><h3>Skills & tools</h3><ul className="skills-list">{skills.map((skill, index) => <li key={`${skill.name}-${index}`}><span>{skill.name}</span>{skill.category || skill.proficiency ? <span className="skill-context">{[skill.category, skill.proficiency].filter(Boolean).join(" · ")}</span> : null}</li>)}</ul></div> : null}</div>
        </Section>
        {showExperience ? <Section id="experience" title="Experience">
          {chronological(experience).map(entry => <article key={entry.id} className="timeline-entry">
            {entry.startDate || entry.endDate ? <p className="entry-meta">{dateRange(entry.startDate, entry.endDate)}</p> : null}
            <h3>{entry.role}</h3><p className="organization">{entry.organization}{entry.location ? ` · ${entry.location}` : ""}</p>
            {entry.summary ? <p>{entry.summary}</p> : null}
            <BulletList items={entry.responsibilities} label="Responsibilities" /><BulletList items={entry.outcomes} label="Outcomes" />
          </article>)}
          {education.length ? <div className="education"><h3 className="subsection-title">Education</h3>{chronological(education).map(entry => <article key={entry.id} className="timeline-entry">
            {entry.startDate || entry.endDate ? <p className="entry-meta">{dateRange(entry.startDate, entry.endDate)}</p> : null}
            <h4>{entry.qualification}</h4><p className="organization">{entry.institution}</p>{entry.focus ? <p>{entry.focus}</p> : null}
            <TextLinks links={entry.link ? [entry.link] : []} />
          </article>)}</div> : null}
          {!experience.length && !education.length ? <p>{previewCopy.experienceDescription}</p> : null}
        </Section> : null}
        </div>
        {achievements.length ? <Section id="recognition" title="Recognition">{achievements.map(entry => <article key={entry.id} className="timeline-entry"><h3>{entry.name}</h3>{entry.issuer || entry.date ? <p className="entry-meta">{[entry.issuer, entry.date].filter(Boolean).join(" · ")}</p> : null}{entry.description ? <p>{entry.description}</p> : null}<TextLinks links={entry.verificationLink ? [entry.verificationLink] : []} /></article>)}</Section> : null}
        <Section id="contact" title="Let’s talk">
          {!isPreview && contact.invitation ? <p className="contact-invitation">{contact.invitation}</p> : null}
          <div className="contact-details">{email ? <a href={email} className="text-link contact-email">{contact.email}<Arrow /></a> : null}<TextLinks links={contacts} />{!email && !contacts.length ? <p>{previewCopy.contactDescription}</p> : null}</div>
        </Section>
      </main>
      <footer className="site-footer"><p>© {new Date().getFullYear()} {name}</p><a className="text-link" href="#top">Back to top<Arrow direction="up" /></a></footer>
    </div>
  </>;
}
