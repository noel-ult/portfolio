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

The entrance, “A line of thought,” is a single orange stroke on ink black. It draws a hand contour for Choru Vaari, morphs into removal/addition marks for PageRadar, then forms large, connected NOEL BIJU lettering. Pointer movement or touch dragging bends the thread with damped springs. Clicking or tapping anywhere pulls the current drawing taut, turns it into a vertical seam, and sweeps away the entrance to reveal the portfolio.

The owner rejected the photograph-led entrance and requested creative animation ideas. This implements the recommended continuous-line concept. The entrance uses real projects and custom SVG geometry; the owner’s photo belongs to the portfolio hero and About. Main content continues to follow PORTFOLIO_REQUIREMENTS.md and src/content/portfolio.ts, with profile facts from the supplied résumé and verified public GitHub source links. No personal facts, metrics, or project claims are invented.

## Colors

The main portfolio uses ink black, pale silver headings, muted gray supporting text, and ember orange for active navigation, arrows, and the contact underline. The entrance uses orange for the continuous stroke, pale silver for its readable caption, and muted grey for project labels on the existing ink-black background. There are no entrance photographs, generated raster assets, or independent palette values. There is no light project band or solid orange contact band. CSS :root in src/app/globals.css is canonical; these tokens mirror it. Tailwind maps paper, ink, accent, and body font to those values.

## Typography

Locally bundled Barlow Condensed 800 for the portfolio hero and section/project headings; Space Grotesk 400/500 for readable 16–18px body copy; monospace only for short utility labels. The portfolio hero name uses clamp(100px, 16.7vw, 270px) on desktop, with responsive sizes and natural wrapping. The entrance name is an original decorative SVG drawing, with the native owner name labelling the dialog and activation surface. Barlow Condensed carries chapter captions. The page has one native h1.

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

The root layout's tiny inline head script decides entry eligibility before the body paints and sets a CSS gate. The gate shows the server-rendered entrance on the first frame and times out after 10 seconds if hydration never starts. A pre-hydration tap is queued for the entrance, with its own 5-second failure release. EntryIntro owns the temporary dialog, full-screen native activation button, keyboard-only Skip control, focus, inert background, and cleanup. EntryThreadArt owns the connected SVG paths for the hand, change marks, and desktop/mobile name lettering. The renderer in src/lib/entry-thread.ts samples those paths once, morphs corresponding points, adds pointer-driven damped spring displacement, and performs the seam reveal. Mutable pointer data and animation frames stay outside React state. Project entryNote metadata supplies verified chapter text and the hand/change symbol key through the server page. No new dependencies, backend, images, or WebGL are needed.

## Do's and Don'ts

- Lead with the owner's role, strongest work, and personal contribution.
- Keep body text readable and controls usable on touch and keyboard.
- Use animation to introduce or connect content; do not block navigation.
- Do not restore the sculpture, slab, console, fake project screenshots, metrics, or invented links.
- Keep the page readable when animation, JavaScript, or session storage is unavailable.

## Motion and accessibility

The thread draws the hand during the first 950ms, holds until 1,400ms, morphs into the change marks over 800ms, holds those until 2,950ms, then morphs into the name over 950ms. Each chapter uses a short title and verified project caption below the artwork. The sequence plays once, then settles on the name without an idle loop. Mobile uses a connected two-line wordmark and a larger hand contour. Pointer movement or dragging pushes nearby thread points with damped springs; drawing stops when the geometry and interaction settle.

Activation works immediately, including during the drawing sequence. A pointer gesture travelling more than 8px is a drag; releasing it does not enter. Cancellation or multi-touch suppresses unintended activation. A fresh tap anywhere, Enter, Space, or assistive activation accelerates the remaining hand/change/name story over 1,200ms, holds the name briefly, and enters. Taps after the name has settled start the exit immediately; repeat activation is ignored. The 1,100ms exit captures the current drawing, pulls it into a horizontal thread, turns it into a vertical seam at the left edge, then sweeps that seam right to uncover the real page. Supporting hero content reveals during the final 450ms. Escape, keyboard Skip intro, or the site skip-to-content link bypasses immediately. There is no sound or simulated loading.

Entry runs once per tab session using line-of-thought-entry-v1 in optional sessionStorage. The `?intro=1` URL replays it for local review. Section URLs, history restoration, restored scroll positions, reduced motion, forced colours, initially hidden tabs, unsupported SVG geometry, and rendering errors bypass it. A parser-executed inline script sets the entrance gate before the body is parsed; a 10-second watchdog reveals the portfolio if hydration fails. The entrance does not wait for fonts or an image request. Without JavaScript the server-rendered portfolio stays visible. Wheel/scroll exits without preventing navigation. Actual viewport size changes, hash navigation, preference changes, and hiding the tab settle safely. Resize notifications with unchanged dimensions are ignored.

Underlying page siblings are temporarily inert while the labelled entry dialog is active. The full-screen native button receives focus; Tab cycles through it, the keyboard-only Skip intro button, and the site skip-to-content link. Keyboard outlines sit within the viewport and do not appear during pointer use. Completion restores prior inert states, focuses main after deliberate entry, and cancels every frame, animation, timer, and listener. The SVG and stage release animation attributes and styles.

Section headings reveal once over 450ms. Body text remains visible. Active navigation moves over 180ms; arrows pass through links over 180ms. Project indicators rotate and titles shift 8px during disclosure. Reduced motion disables entry, reveals, animated expansion, transitions, and smooth scrolling. Focus and color contrast target WCAG AA. The entrance adds finite and interaction-driven SVG motion; the portfolio has no idle animation, custom cursor, scroll hijacking, or backend.
