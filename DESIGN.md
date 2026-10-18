---
version: alpha
name: "Afterimage"
description: "A personal portfolio with a continuous-line entrance and inline project stories."
colors:
  primary: "#FF6B18"
  background: "#090909"
  foreground: "#EEEAE4"
  muted: "#B7B5AF"
  border: "#44433F"
  surface: "#151515"
typography:
  sans:
    fontFamily: "Space Grotesk, Arial, sans-serif"
  display:
    fontFamily: "Barlow Condensed, Impact, sans-serif"
  mono:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, monospace"
spacing:
  section-gap: "80px"
  page-gutter: "clamp(24px, 4.6vw, 88px)"
omitted:
  - section: rounded
    reason: "Content is open and controls are square; the wordmark uses one small circular accent."
  - section: components
    reason: "Shared components are documented below; runtime CSS owns their values."
---

# Afterimage

## Overview

Noel Biju’s software and AI portfolio preserves its ink-black, silver and ember identity. This is a public content site for collaborators and internship recruiters, with a searchable project library. Approved personal facts stay in src/content/portfolio.ts. Public GitHub facts refresh independently; no invented project outcomes, skills or performance metrics belong here.

## Colors

CSS :root in src/app/globals.css is canonical. Existing paper, surface, ink, muted, accent and line tokens map directly to this file’s frontmatter. Tailwind aliases those same variables. No new theme or independent palette is introduced by the page split. Decorative atmosphere uses the existing studio-atmosphere.webp; the photo and résumé remain owner-supplied.

## Typography

Barlow Condensed 800 owns the hero, route and project headings. Space Grotesk 400/500 owns body copy and navigation. Monospace labels are short utilities. Each route has one native h1. Body text remains 16–18px, with restrained utility text and no excessive uppercase paragraphs. Route titles can wrap naturally rather than overflow on phones.

## Layout

The homepage retains its full-width name, role, introduction, portrait, two featured previews and recent GitHub work. About, Projects, project details, Experience and Contact are real, independently crawlable routes. Inner pages share the same gutter, fixed header, breadcrumbs, section rules and footer. Active navigation follows the route with both a visible underline and aria-current=page. Anchor positions reserve header clearance.

The project library uses three columns on desktop, two on tablets and one on phones. Open dividing rules carry the layout; square control frames belong to filtering and the product previews, not decorative card furniture. Load more reveals twelve items at a time. No-JavaScript visitors can read all project links. Project pages pair authored text with a preview where available, followed by safely rendered repository documentation.

## Elevation & Depth

The studio atmosphere is static and decorative. The header has an opaque dark surface. Project previews retain their existing bounded interfaces. There are no sculptures, glass slabs, fake dashboards, custom cursors, synthetic loading screens or unrelated imagery.

## Shapes

Open composition, square native controls, restrained dividing rules and one small brand dot. Visible focus outlines use the accent token. Global scrollbar styles remain standards-based with WebKit fallbacks and system forced-color behavior. The dedicated entrance has no underlying scrollable document.

## Components

SiteHeader owns route navigation; SiteFooter owns replay, contact and back-to-top links. PageHeading and PageBreadcrumbs own route titles and breadcrumb semantics. PageMotion enhances only existing visible headings and resets on route changes; it never gates content.

ProjectStories retains independent native details/summary disclosures. ProjectPreview retains the two labelled, local demonstrations: PageRadar sample updates and Choru Vaari example rice/capacity inputs. They never access cameras, monitor actual sites, or imply live output. Previews remain outside disclosures. Their existing product-specific colors are scoped to their frames and do not change site tokens.

ProjectLibrary owns local search, clear, language, results count and Load more. Query and language live in the URL, and back/forward restores them. The language filter deliberately uses a **native select** with platform-owned popup geometry and keyboard semantics; a custom listbox is unnecessary for this small public catalog. No remote search, mutation, account, modal or form submission is introduced. Empty results provide a clear reset action. Fallback snapshot status is honest and stable.

ProjectReadme renders Markdown as semantic HTML with raw HTML disabled and safe HTTPS links. Images link to the repository resources rather than loading remote tracking assets. Linked badges keep the original outer link; they must never create nested anchors. Code and tables scroll within their own bounded surfaces. Broken documentation requests leave the project story and GitHub source link usable.

## Motion and accessibility

The optional /enter route contains “A line of thought”: a continuous orange stroke draws a hand for Choru Vaari, morphs into PageRadar change marks, then forms Noel Biju. Its sequence takes about four seconds and settles indefinitely. A fresh tap, click, Enter or Space explicitly enters the portfolio; the full surface is a real link, not an invisible div handler. Dragging bends the thread and does not activate navigation. Mouse modifiers retain normal link behavior.

No timer, session-storage flag, wheel, resize, background tab, history event, failed renderer or motion preference can navigate an untouched entrance. Reduced motion and forced colors use a static drawing and the same deliberate link. Without JavaScript the server-rendered link works. The only navigation timeout is a recovery fallback scheduled **after deliberate activation**. Entrance styles and animation mount only at /enter, which is noindex, follow and omitted from the sitemap. The actual homepage and all content routes remain visible immediately for everyone, including crawlers.

Heading reveals are finite, optional enhancements. Reduced motion disables animated reveals, transitions and smooth scrolling. Keyboard focus is visible, never hidden behind the header, and every interactive element is a native link, button, range input, search input, select or disclosure. No-JavaScript visitors retain route links, project stories, contact information and the résumé.

## Do’s and Don’ts

- Lead with Noel’s work, role, verified contribution and readable content.
- Preserve consistent route navigation and useful empty/failure states.
- Keep public GitHub metadata separate from manually curated personal facts.
- Keep /enter deliberate and isolated; never restore a global homepage gate.
- Do not invent project metrics or embed external screenshots as fake product output.
- Preserve readable layout, reduced motion and keyboard/touch behavior at 320px and above.
