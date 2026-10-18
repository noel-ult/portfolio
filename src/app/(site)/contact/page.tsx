import { PageHeading, PageBreadcrumbs } from "@/components/page-heading";
import { Arrow, TextLinks } from "@/components/portfolio";
import { portfolio } from "@/content/portfolio";
import { emailUrl } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Contact", "Contact Noel Biju about software and AI internships, collaborations, and project ideas. Find email, GitHub, LinkedIn, and résumé.", "/contact");

export default function ContactPage() {
  const { contact, profile } = portfolio;
  return <div className="inner-page contact-page"><PageBreadcrumbs title="Contact" path="/contact" /><PageHeading title="Let’s talk" eyebrow="Open to a good conversation" introduction={contact.invitation} />
    <section className="contact-route-grid" aria-labelledby="email-heading"><div><h2 id="email-heading" className="hero-eyebrow">Send a note</h2><a className="contact-route-email" href={emailUrl(contact.email)}>{contact.email}<Arrow /></a><p className="availability"><span className="brand-dot" aria-hidden="true" />{profile.availability}</p></div><div className="contact-route-links"><h2>Find me elsewhere</h2><TextLinks links={contact.links} /><a className="text-link" href={profile.resumeUrl}>View résumé (PDF)<Arrow /></a><p className="entry-meta">Based in {profile.location}</p></div></section>
  </div>;
}
