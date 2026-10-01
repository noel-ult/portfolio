---
version: alpha
name: "Afterimage"
description: "A personal portfolio with an interactive portrait entrance and inline project stories."
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

The entrance, “Through Noel’s Eyes,” introduces Noel through his supplied mountain photograph, oversized name, and verified work. A broad feathered colour lens follows pointer movement or touch dragging across a muted version of the same photograph. Three open annotations connect curiosity to PageRadar, everyday experimentation to Choru Vaari, and local intelligence to AI Buddy. The whole viewport is a native activation surface: click or tap anywhere to enter.

The owner chose a portrait-led direction expressing curiosity and invention and rejected the previous room entrance. The name sits in the sky and the face remains unobstructed; mobile groups annotations below the portrait’s face. The existing portfolio retains its typography-led composition. PORTFOLIO_REQUIREMENTS.md and src/content/portfolio.ts govern content. Profile facts come from Noel’s supplied résumé, and public GitHub repositories provide source links. No personal facts or project claims are invented.

## Colors

The main portfolio uses ink black, pale silver headings, muted gray supporting text, and ember orange for active navigation, arrows, and the contact underline. The entrance uses the same text and orange accent tokens over the original photograph. Black gradient overlays maintain text contrast while the colour lens preserves the photograph’s natural colours; no alternate portrait asset is generated. There is no light project band or solid orange contact band. CSS :root in src/app/globals.css is canonical; these tokens mirror it. Tailwind maps paper, ink, accent, and body font to those values.

## Typography

Locally bundled Barlow Condensed 800 for the name and section/project headings; Space Grotesk 400/500 for readable 16–18px body copy; monospace only for short utility labels. The name uses clamp(100px, 16.7vw, 270px) on desktop, with responsive sizes and natural wrapping. The entrance name and annotations are native readable text, with semantic labelling for the dialog and full-screen activation button. The page has one native h1.

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

EntryIntro owns the temporary dialog, full-screen native activation button, keyboard-only Skip control, session eligibility, preparation deadline, focus, inert background, and cleanup. The renderer in src/lib/entry-portrait.ts coordinates the photograph’s colour mask, finite arrival scale, proximity emphasis, and expansion/dissolve. Pointer data and animation frames stay outside React state. Project entryNote metadata supplies verified annotation labels from src/content/portfolio.ts through the server page; the supplied profile photo provides the shared image source. No new dependencies or backend are added.

## Do's and Don'ts

- Lead with the owner's role, strongest work, and personal contribution.
- Keep body text readable and controls usable on touch and keyboard.
- Use animation to introduce or connect content; do not block navigation.
- Do not restore the sculpture, slab, console, fake project screenshots, metrics, or invented links.
- Keep the page readable when animation, JavaScript, or session storage is unavailable.

## Motion and accessibility

A finite 650ms arrival settles the portrait from scale 1.025 to 1 while name, thesis, notes, and hint appear in short staggered fades. Activation works throughout arrival. A broad colour lens starts over the portrait and follows pointer movement or dragging with eased movement. Drawing stops after settling; annotations remain readable without interaction. A pointer gesture travelling more than 8px is an exploration drag, and releasing it does not enter. Cancellation or multi-touch suppresses unintended activation. A fresh tap anywhere, Enter, Space, or assistive activation enters; repeat activation is ignored during exit.

Entry expands the colour lens beyond the viewport, fades annotations and name, and dissolves into the existing hero over 850ms. Hero supporting content reveals during the final 250ms. Escape, the keyboard-focusable Skip intro control, or the site’s skip-to-content link bypasses immediately. There is no sound, loading simulation, or idle loop.

Entry runs once per tab session using through-noels-eyes-entry-v1 in optional sessionStorage. Section URLs, restored scroll positions, reduced motion, forced colours, initially hidden tabs, unsupported masking, failed image decoding, and preparation exceeding 800ms bypass it. The photograph must load successfully and local fonts must be ready before activation. Image decoding errors also bypass safely, but a deferred off-document decode promise does not block a photograph whose pixels are already loaded. Without JavaScript, the server-rendered portfolio remains visible. Wheel or scrolling exits without preventing navigation. Resize, hash navigation, preference changes, and hiding the tab settle safely.

Underlying page siblings are temporarily inert while the labelled entry dialog is active. The full-screen native button receives focus; Tab cycles through it, the keyboard-only Skip intro button, and the site skip-to-content link. Focus-visible outlines sit within the viewport. Completion restores prior inert states, focuses main after deliberate entry, and cancels every frame, animation, timer, and listener. No entrance inline animation styles remain.

Section headings reveal once over 450ms. Body text remains visible. Active navigation moves over 180ms; arrows pass through links over 180ms. Project indicators rotate and titles shift 8px during disclosure. Reduced motion disables entry, reveals, animated expansion, transitions, and smooth scrolling. Focus and color contrast target WCAG AA. The entrance adds finite and interaction-driven portrait motion; the portfolio has no idle animation, custom cursor, scroll hijacking, or backend.
