# Afterimage implementation

## Approved direction

A cinematic typography-led portfolio for hiring teams. Use the existing empty smoky background, ink black, pale silver, and ember highlights throughout. Keep content sourced from portfolio.ts, with explicit missing-content states and noindex until approval.

## Delivered composition

- Compact native navigation with active-section underline; fixed header after the hero.
- Interactive impossible-room entrance with ivory/orange typographic walls, pointer/touch perspective, and an architectural unfolding exit.
- Readable role and introduction, restrained link treatment, and a next-section cue.
- Vertical project list with visible summaries and personal contributions; complete stories expand inline using native disclosures.
- Quiet About and Experience columns; dark contact finish with ember underline.
- Sculpture, slab, artwork controls, console, cream project band, and orange contact block removed from the page.

## Motion contract

The room rotates into view over 1,100ms and waits for deliberate Enter or Skip. Pointer movement and touch dragging change the viewpoint; animation stops after settling. Enter unfolds the walls and expands the doorway over 1,450ms, introducing supporting content during the final 300ms. Skip, Escape, wheel navigation, scrolling, resizing, hash changes, hiding the tab, or preference changes settle it immediately. It runs once per tab session and bypasses section URLs, restored scroll positions, reduced motion, forced colors, or failed initialization. The labelled dialog temporarily makes underlying content inert and restores focus and interaction on completion. Existing section and disclosure motion remains independent.

## Implementation

Server-render the portfolio content. Use CSS 3D transforms, Web Animations API, and IntersectionObserver for progressive enhancement. The room renderer updates native plane transforms without per-frame React renders. No new animation dependency, API, route, content schema, backend, or credential is required. The hero grows with longer content instead of clipping it.

## Acceptance checks

Build, TypeScript, lint, and DESIGN.md lint. Chromium checks at desktop, tablet, 390px, and 320px; entry timing and interruption, session repeat, direct anchors, active navigation, no-JavaScript use, reduced motion, keyboard focus, loaded assets, and WCAG AA scans. Synthetic project fixtures remain in an isolated temporary copy and exercise independent stories, rapid toggles, resizing, missing fields, and invalid links.
