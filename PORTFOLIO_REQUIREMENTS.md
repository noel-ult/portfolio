# Portfolio Requirements

## 1. Purpose

Create a personal portfolio that helps a visitor quickly understand who the owner is, what they can do, what they have built or contributed to, and how to contact them.

The portfolio is a single-page website. Its sections are reachable through in-page navigation. The implementation should use this document as the source of requirements when the owner later asks an AI model to build or update the site.

## 2. Project constraints

- Build within the existing Next.js App Router project using TypeScript and Tailwind CSS.
- Include animation support using CSS animations/transitions or a compatible React motion library. The implementation can choose the specific approach.
- Treat this as a fresh portfolio implementation. Do not reuse the previous portfolio's components, page content, data, or assets.
- Keep portfolio content in one clearly named, easy-to-edit data source, separate from the page markup.
- Keep content rendering data-driven so projects, experience entries, skills, and links can be added or removed by editing that data source.
- Do not invent personal details, qualifications, employers, project outcomes, metrics, dates, or URLs. Use content the owner provides. Where information is missing, leave an explicit placeholder or omit the optional item.
- Do not render a link unless its destination is provided and valid. Do not display empty sections.
- Keep the website static unless the owner requests a backend or dynamic feature.

## 3. Required technology stack

- Next.js App Router and React for the website.
- TypeScript for application code and portfolio content types.
- Tailwind CSS for styling utilities.
- Animation support for appropriate page or interaction states, implemented with CSS or a compatible motion library.
- Any additional dependency must be compatible with the installed Next.js and React versions and must serve a concrete portfolio requirement.

## 4. Required page structure

### Header and navigation

- Show the owner's name or a clearly marked name placeholder.
- Provide in-page links to About, Projects, Experience, and Contact.
- Keep navigation usable on narrow screens and keyboard accessible.
- Include a skip link to the main content.

### Introduction

- Show the owner's name, role or area of focus, and a short introduction.
- Include links to the Projects and Contact sections.
- Show a résumé link only when a résumé URL or file is provided.

### About and skills

- Provide a concise biography covering relevant background, interests, and professional direction.
- List skills and tools the owner can substantiate. Skills may be grouped by category when useful.
- Do not imply expertise from a technology appearing in a project unless the owner confirms it as a skill.

### Projects

- Feature the owner's strongest and most relevant projects first.
- Each project entry should support:
  - Project name and short summary.
  - The problem or need addressed.
  - The owner's role and specific contribution.
  - Approach or notable implementation details.
  - Technologies used.
  - Outcome, evidence, or lesson learned, when supplied.
  - Project status or date, when useful and known.
  - Optional live project, source repository, or related links.
- Do not claim measurable results unless the owner supplies evidence for them.
- Omit empty project fields instead of showing blank labels.
- Project detail routes are not required for the first version.

### Experience and education

- List relevant employment, internships, volunteering, leadership, or other practical experience in reverse chronological order when dates are known.
- Each entry should support role, organization, dates, location if relevant, responsibilities, and concrete outcomes.
- Include education with institution, qualification or program, dates, and relevant focus when the owner supplies those details.
- Experience and education entries are optional when the owner has no relevant information to include.

### Achievements and certifications

- Provide a section for awards, achievements, and certifications when the owner supplies them.
- Each item should support its name, issuing organization, date, and optional verification link.
- Do not include unverifiable claims or certificates that have not been supplied.
- Hide the section when it has no entries.

### Contact

- Provide a clear invitation to contact the owner.
- Support an email address and professional profile links such as GitHub, LinkedIn, or other owner-selected profiles.
- Render only contact methods with real values. Do not substitute fake addresses or profile URLs.
- A contact form is not required. Do not add one unless a working submission service is also requested and configured.

### Footer

- Show the owner's name and a current copyright year.
- Include a link back to the top of the page.
- Do not include social links in the footer unless those destinations are supplied.

## 5. Content source requirements

The editable portfolio data should support these fields:

- **Profile:** name, role, introduction, biography, location (optional), availability/status (optional), and résumé URL (optional).
- **Skills:** category (optional), skill or tool name, and proficiency only when the owner explicitly provides it.
- **Projects:** stable identifier, title, summary, problem, contribution, approach, technologies, outcome, status/date (optional), and zero or more labeled links.
- **Experience:** stable identifier, role, organization, start/end dates (optional), location (optional), summary, responsibilities, and outcomes.
- **Education:** institution, qualification/program, dates (optional), focus or coursework (optional), and relevant link (optional).
- **Achievements and certifications:** name, issuer (optional), date (optional), description (optional), and verification link (optional).
- **Contact:** short invitation, email (optional), and labeled profile links.

Keep optional values genuinely optional. Empty arrays or missing values must not create empty headings, cards, separators, or links.

## 6. Behavior and navigation

- Navigation links must target existing section IDs and work without client-side JavaScript.
- Calls to action must lead to their corresponding page section or a valid external destination.
- External links that open a new tab must use appropriate `rel` protection.
- Résumé links must point to a provided file or URL and identify the file clearly.
- All visible controls must work; do not include decorative controls that have no action.
- The page must remain usable when any optional content collection is empty or has only one item.
- Animations must not block navigation or content access and must respect the user's reduced-motion preference.

## 7. Accessibility and device support

- Use semantic landmarks and a logical heading hierarchy, with one primary page heading.
- Use descriptive link text and accessible names for navigation and controls.
- Ensure the page can be navigated and operated with a keyboard, with a visible focus indicator.
- Respect `prefers-reduced-motion`; provide a reduced or static experience when requested.
- Maintain readable text and link contrast.
- Support common mobile, tablet, and desktop viewport sizes without horizontal overflow or hidden content.
- Use meaningful alternative text for informative images. Mark purely decorative images so assistive technology can ignore them.

## 8. Search and sharing metadata

- Set the page title and description from owner-approved profile information.
- Provide social sharing metadata using accurate title, description, and image information when those details are available.
- Do not include fabricated structured profile data or social account URLs.
- Keep the site out of search results while it contains placeholders. Allow indexing only after the owner has supplied and reviewed the real content.
- Do not publish a sitemap containing removed or nonexistent routes.

## 9. Privacy and content integrity

- Publish only information the owner intends to make public.
- Do not expose secrets, private contact details, private repository URLs, or unapproved personal information.
- Do not copy personal content or assets from the previous portfolio.
- Preserve accurate project ownership: distinguish individual work from team work and state the owner's contribution clearly.
- Never manufacture testimonials, client names, statistics, awards, credentials, or outcomes.

## 10. Completion criteria

The portfolio is complete when all of the following are true:

- The home route presents the single-page portfolio and its required sections.
- The header links and calls to action target existing sections or valid destinations.
- Profile, project, experience, education, achievement, and contact content is driven from the editable content source.
- Missing optional data does not leave empty sections or broken links.
- No unprovided personal facts or URLs appear as real claims.
- The site works with keyboard navigation and at mobile, tablet, and desktop widths.
- Tailwind CSS is configured and used, and animation behavior respects reduced-motion settings.
- The app builds successfully, linting passes, and TypeScript reports no errors.
- The placeholder version is marked `noindex`; search indexing is enabled only after content review.
- Routes and metadata contain no references to removed portfolio pages or stale profile details.

## 11. Content to supply before publishing

The owner should replace or confirm these items before the site is treated as final:

1. Name, role, introduction, and biography.
2. Skills and tools to list.
3. Projects to feature, including the owner's contribution and any verifiable outcomes.
4. Experience and education details, if applicable.
5. Awards and certifications, if applicable.
6. Public email, profile URLs, résumé URL, and project links to show.
7. Approval to make the supplied information public and enable search indexing.
