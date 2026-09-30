---
version: alpha
name: "Afterimage"
description: "A cinematic portfolio with an interactive impossible-room entrance and inline project stories."
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

The portfolio introduces itself as an impossible typographic room. Five native 3D planes form an ivory ceiling and floor, ember side walls, and a dark doorway reading “STEP INSIDE.” The owner’s name is part of the architecture. Pointer movement or touch changes the viewpoint; Enter unfolds the walls outward and expands the doorway into the portfolio.

The owner rejected the restrained membrane entrance and requested a more unusual replacement. This direction makes the entire viewport the interactive object. The underlying portfolio retains its typography-led composition. PORTFOLIO_REQUIREMENTS.md and src/content/portfolio.ts govern content. Noel’s supplied résumé provides profile facts; verified public GitHub repositories provide source links. The owner authorized replacing noel-ult/portfolio and preparing publication on Vercel; indexing is enabled. No personal facts or project claims are invented.

## Colors

The main portfolio uses ink black, pale silver headings, muted gray supporting text, and ember orange for active navigation, arrows, and the contact underline. The entrance reuses the same tokens as physical materials: pale silver for ceiling/floor and orange for walls. Its local --entry-paper/--entry-dark aliases map directly to --ink/--paper; wall shading is derived with color-mix, not independent palette values. There is no light project band or solid orange contact band. CSS :root in src/app/globals.css is canonical; these tokens mirror it. Tailwind maps paper, ink, accent, and body font to those values.

## Typography

Locally bundled Barlow Condensed 800 for the name and section/project headings; Space Grotesk 400/500 for readable 16–18px body copy; monospace only for short utility labels. The name uses clamp(100px, 16.7vw, 270px) on desktop, with responsive sizes and natural wrapping. Decorative architectural lettering is hidden from assistive technology; native text provides sharp perspective without raster textures. The page has one native h1.

## Layout

The compact header overlays the opening and becomes fixed after the hero, without moving content. Section anchors reserve space for the fixed header. The hero contains a full-width name, then role, introduction, and Noel’s supplied photograph in three desktop columns. Tablet places the portrait alongside the text; mobile stacks role, photograph, and introduction. Natural content height reserves space for links and the scroll cue. A wider crop accompanies About. Images reserve their aspect ratio before loading.

Projects form a vertical list. Titles, summaries, contributions, and valid links remain easy to find. Details expand inline; the first project begins open. About and Experience share two quiet desktop columns, stacked on mobile. Contact closes on black with a large heading and ember underline.

PageRadar and Choru Vaari Kodukkam lead selected work, each with a compact interactive interface beside its project story. Previews sit outside disclosures so they stay visible when the story is closed. Below 1,000px, text and preview stack. The original four résumé projects follow in the existing list.

## Elevation & Depth

A static smoky backdrop adds atmosphere to the hero at 55% opacity. All information remains native HTML. No sculpture, floating hardware, acrylic bar, slab, or decorative artwork controls may return. The header uses an opaque dark surface after becoming fixed. Project interfaces use bounded frames; the surrounding portfolio stays open and has no cards or shadows.

## Shapes

Open composition, square controls, restrained dividing rules, and a small wordmark dot. Links receive visible focus rings. The active section is indicated by both a moving underline and aria-current.

## Components

SiteHeader owns native anchor navigation, the active section, and the moving underline. PageMotion enhances server-rendered visible content with Web Animations API and IntersectionObserver; no animation dependency is added.

ProjectStories renders native details/summary disclosures. Each project is independent. Opening and closing animate measured height over 360ms; resizing, repeated clicks, preference changes, and unmounting cancel or settle animation safely. Missing optional details do not create empty headings or false controls. Complete notes are accessible without JavaScript.

ProjectPreview renders two local demonstrations, explicitly labelled with sample updates or example inputs. PageRadar uses the public repository’s demo fixtures: native buttons select an update, pressed states expose selection, and a live comparison region shows before/after text. Choru Vaari uses labelled native range inputs and the repository’s rice/capacity formula and verdict thresholds; Reset sample restores the initial values. It does not request a camera or analyze images. Controls enable after hydration; without JavaScript they remain disabled with an explanatory note. Project copy and links remain available. Each instance owns unique comparison and input IDs.

Preview colors are scoped to the product frames in src/app/globals.css. PageRadar inherits portfolio surface/text tokens, adding #A7F3D0 on #0C2924 for additions and #FECACA on #2C181B for previous content. Choru Vaari preserves the source project’s #F8F8F8, #050505, #128EEF, and #F5009F palette. Pink carries the large calculated result on black; small labels remain black on white for contrast. These product-specific colors do not alter the portfolio theme. The previews use native HTML and a small decorative SVG plate, with no new dependencies or external embeds.

ArtworkStage uses public/art/studio-atmosphere.webp as a static decorative backdrop. The console and technical project tabs are removed from the page. Semantic sections and existing data-driven optional collections remain.

EntryIntro owns the temporary dialog, native Enter and Skip buttons, session eligibility, focus, and cleanup. The renderer in src/lib/entry-room.ts coordinates CSS perspective, five transform-preserving planes, pointer easing, a finite arrival move, and the architectural exit. There are no new dependencies, raster assets, or WebGL context. Interaction updates compositor transforms through refs instead of React renders; drawing stops when the room settles.

## Do's and Don'ts

- Lead with the owner's role, strongest work, and personal contribution.
- Keep body text readable and controls usable on touch and keyboard.
- Use animation to introduce or connect content; do not block navigation.
- Do not restore the sculpture, slab, console, fake project screenshots, metrics, or invented links.
- Keep the page readable when animation, JavaScript, or session storage is unavailable.

## Motion and accessibility

A finite 1,100ms arrival rotates the room into view, then waits for deliberate entry. Pointer movement or touch dragging tilts the room with eased follow-through. Motion stops after settling. Enter performs a short anticipation movement, folds the four surrounding planes outward, and expands the back plane into the viewport over 1,450ms. Supporting portfolio content appears during the final 300ms. Skip or Escape immediately restores the page. There is no sound, simulated loading, or mandatory pointer gesture.

Entry runs once per tab session with the optional impossible-room-entry-v1 sessionStorage flag, written on completion or navigation bypass. Section URLs, restored scroll positions, reduced motion, forced colors, initially hidden tabs, unsupported rendering, or preparation exceeding 800ms bypass the entrance. The server-rendered page remains visible without JavaScript. Wheel or scrolling exits without preventing natural navigation. Resize, hash navigation, preference changes, and hiding the tab settle the entrance safely.

During the entrance, underlying page siblings are temporarily inert and the entrance is a labelled dialog. Enter receives initial focus; Tab cycles through the site skip-to-content link, Skip intro, and Enter portfolio. Completion restores prior inert states, moves focus to main after deliberate entry, and cancels every frame, animation, timer, and listener. Skip remains available during the exit. All room styles are released on completion.

Section headings reveal once over 450ms. Body text remains visible. Active navigation moves over 180ms; arrows pass through links over 180ms. Project indicators rotate and titles shift 8px during disclosure. Reduced motion disables entry, reveals, animated expansion, transitions, and smooth scrolling. Focus and color contrast target WCAG AA. The entrance adds finite and interaction-driven 3D motion; the portfolio has no idle animation, custom cursor, scroll hijacking, or backend.
