"use client";

import { useEffect, useRef } from "react";
import { createEntryThread } from "@/lib/entry-thread";
import { EntryThreadArt } from "@/components/entry-thread-art";

const SESSION_KEY = "line-of-thought-entry-v1";
const OPEN_DURATION = 1100;
const RUSH_DURATION = 1200;
const RUSH_HOLD = 260;
const TAP_THRESHOLD = 8;
// The story completes in just under four seconds. Keep the interaction available,
// but never let it trap visitors or rendered crawlers behind the overlay.
const IDLE_EXIT_DELAY = 4300;
type EntryNote = { thought: string; project: string; symbol: "hand" | "change" };

export function EntryIntro({ name, location, notes }: {
  name: string;
  location?: string;
  notes: EntryNote[];
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const enterRef = useRef<(detail: number) => void>(() => {});

  useEffect(() => {
    const root = overlay.current;
    const stage = root?.querySelector<HTMLElement>(".entry-stage");
    const surface = root?.querySelector<HTMLButtonElement>(".entry-surface");
    const skip = root?.querySelector<HTMLButtonElement>(".entry-skip");
    const main = document.getElementById("main");
    const shell = root?.closest<HTMLElement>(".page-shell");
    if (!root || !stage || !surface || !skip || !main || !shell || document.documentElement.dataset.entry !== "boot") return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const colors = matchMedia("(forced-colors: active)");
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "seen"; } catch { /* Storage is optional. */ }
    const replay = new URLSearchParams(window.location.search).get("intro") === "1";
    if ((seen && !replay) || motion.matches || colors.matches || window.location.hash || scrollY > 20 || document.hidden || !stage.animate) {
      delete document.documentElement.dataset.entry;
      return;
    }

    let finished = false;
    let active = false;
    let opening = false;
    let rushing = false;
    let startedAt = 0;
    let rushedAt = 0;
    let rushedFrom = 0;
    let frame = 0;
    let frameFallback: ReturnType<typeof setTimeout> | undefined;
    let openingAt = 0;
    let previousTime = 0;
    let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
    let idleExitTimer: ReturnType<typeof setTimeout> | undefined;
    let renderer: ReturnType<typeof createEntryThread> = null;
    let pointer: { id: number; x: number; y: number } | undefined;
    let suppressClick = false;
    const animations = new Set<Animation>();
    const listeners = new AbortController();
    const inertElements: { element: HTMLElement; previous: boolean }[] = [];
    const previousFocus = document.activeElement;
    const initialViewport = { width: innerWidth, height: innerHeight };
    root.dataset.state = "preparing";

    const finish = (remember = active, focusMain = active) => {
      if (finished) return;
      finished = true;
      clearTimeout(cleanupTimer);
      clearTimeout(idleExitTimer);
      clearTimeout(frameFallback);
      cancelAnimationFrame(frame);
      frame = 0;
      listeners.abort();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      renderer?.dispose();
      renderer = null;
      inertElements.forEach(({ element, previous }) => { element.inert = previous; });
      delete shell.dataset.entryActive;
      delete document.documentElement.dataset.entry;
      delete document.documentElement.dataset.entryRequested;
      root.hidden = true;
      root.dataset.state = "finished";
      surface.removeAttribute("aria-disabled");
      if (remember) {
        try { sessionStorage.setItem(SESSION_KEY, "seen"); } catch { /* Storage is optional. */ }
      }
      if (focusMain) main.focus({ preventScroll: true });
      else if (active && root.contains(document.activeElement) && previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
    finishRef.current = () => finish();

    const schedule = () => {
      frame = requestAnimationFrame(tick);
      frameFallback = setTimeout(() => {
        if (!frame || finished) return;
        cancelAnimationFrame(frame);
        frame = 0;
        tick(performance.now());
      }, 80);
    };
    const tick = (time: number) => {
      clearTimeout(frameFallback);
      frame = 0;
      if (finished || !renderer) return;
      try {
        if (opening) {
          const progress = Math.max(0, Math.min(1, (time - openingAt) / OPEN_DURATION));
          renderer.open(progress);
          if (progress === 1) { finish(); return; }
        } else {
          const rushElapsed = time - rushedAt;
          const rushProgress = Math.max(0, Math.min(1, rushElapsed / RUSH_DURATION));
          const storyTime = rushing ? startedAt + rushedFrom + (3900 - rushedFrom) * (rushProgress * rushProgress * (3 - 2 * rushProgress)) : time;
          const moving = renderer.draw(storyTime, Math.min(32, time - (previousTime || time - 16)));
          if (rushing && rushElapsed >= RUSH_DURATION + RUSH_HOLD) startOpening();
          else if (!moving && !rushing) { previousTime = time; return; }
        }
        previousTime = time;
        schedule();
      } catch { finish(); }
    };
    const wake = () => {
      if (!frame && !finished) { previousTime = 0; schedule(); }
    };
    const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, { fill: "both", easing: "cubic-bezier(.22,1,.36,1)", ...options });
      animations.add(animation);
    };
    const startOpening = () => {
      if (!active || finished || opening || !renderer) return;
      try {
        opening = true;
        openingAt = performance.now();
        root.dataset.state = "opening";
        renderer.release();
        animations.forEach(animation => animation.cancel());
        animations.clear();
        surface.setAttribute("aria-disabled", "true");
        shell.dataset.entryActive = "opening";
        document.querySelectorAll(".hero-enter, .site-header").forEach(element => {
          animate(element, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, delay: 650 });
        });
        cleanupTimer = setTimeout(() => finish(), OPEN_DURATION + 250);
      } catch { finish(); }
    };
    enterRef.current = detail => {
      // A tap during the hand still shows the project change and the name.
      if (!active || finished || opening || rushing || !renderer || (detail > 0 && suppressClick)) return;
      clearTimeout(idleExitTimer);
      const elapsed = performance.now() - startedAt;
      if (elapsed < 3900) {
        rushing = true;
        rushedAt = performance.now();
        rushedFrom = Math.max(0, elapsed);
        root.dataset.state = "sequencing";
        surface.setAttribute("aria-disabled", "true");
        wake();
      } else {
        startOpening();
        wake();
      }
    };

    const start = () => {
      if (finished) return;
      if (motion.matches || colors.matches || window.location.hash || scrollY > 20 || document.hidden) { finish(false, false); return; }
      try {
        const earlyEntryRequested = document.documentElement.dataset.entryRequested === "true";
        delete document.documentElement.dataset.entryRequested;
        // The parser already placed the stage over the page before first paint.
        renderer = createEntryThread(root);
        if (!renderer) { finish(false, false); return; }
        root.dataset.touch = String(matchMedia("(pointer: coarse)").matches);
        root.dataset.keyboard = "false";
        root.dataset.state = "exploring";
        document.documentElement.dataset.entry = "active";
        Array.from(shell.children).forEach(element => {
          if (element === root || !(element instanceof HTMLElement)) return;
          inertElements.push({ element, previous: element.inert });
          element.inert = true;
        });
        shell.dataset.entryActive = "exploring";
        active = true;
        startedAt = performance.now();
        renderer.arrive(startedAt);
        renderer.draw(startedAt, 16);
        surface.focus({ preventScroll: true });
        wake();
        idleExitTimer = setTimeout(() => {
          if (!finished && active && !rushing && !opening) startOpening();
        }, IDLE_EXIT_DELAY);
        if (earlyEntryRequested) enterRef.current(0);
      } catch { finish(active, active); }
    };

    const signal = listeners.signal;
    const bypass = () => finish(active, active);
    const keyboard = (event: KeyboardEvent) => {
      if (!active) return;
      root.dataset.keyboard = "true";
      if (event.key === "Escape") { event.preventDefault(); finish(); }
      else if (event.key === "Tab") {
        const contentSkip = document.querySelector<HTMLAnchorElement>(".skip-link");
        const controls: HTMLElement[] = contentSkip ? [surface, skip, contentSkip] : [surface, skip];
        const index = controls.indexOf(document.activeElement as HTMLElement);
        event.preventDefault();
        controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus({ preventScroll: true });
      }
    };
    surface.addEventListener("pointerdown", event => {
      if (!event.isPrimary) { suppressClick = true; return; }
      if (!active || opening || !renderer || event.button !== 0) return;
      root.dataset.keyboard = "false";
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      suppressClick = false;
      surface.setPointerCapture(event.pointerId);
      renderer.move(event.clientX, event.clientY);
      wake();
    }, { signal });
    surface.addEventListener("pointermove", event => {
      if (!active || opening || !renderer || (event.pointerType !== "mouse" && event.pointerId !== pointer?.id)) return;
      if (pointer && event.pointerId === pointer.id && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > TAP_THRESHOLD) suppressClick = true;
      renderer.move(event.clientX, event.clientY);
      wake();
    }, { signal });
    surface.addEventListener("pointerup", event => {
      if (event.pointerId !== pointer?.id) return;
      if (Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > TAP_THRESHOLD) suppressClick = true;
      pointer = undefined;
      // Touch browsers can suppress the compatibility click after a prior drag.
      // A valid pointer release enters directly; any later click is deduplicated.
      if (event.pointerType === "touch" && !suppressClick) enterRef.current(1);
    }, { signal });
    const cancelPointer = () => { if (pointer) { suppressClick = true; pointer = undefined; } };
    surface.addEventListener("pointercancel", cancelPointer, { signal });
    surface.addEventListener("lostpointercapture", cancelPointer, { signal });
    surface.addEventListener("pointerleave", event => {
      if (event.pointerType === "mouse" && !pointer && !opening) { renderer?.relax(); wake(); }
    }, { signal });
    window.addEventListener("keydown", keyboard, { signal });
    window.addEventListener("wheel", bypass, { passive: true, signal });
    window.addEventListener("scroll", bypass, { passive: true, signal });
    window.addEventListener("hashchange", bypass, { signal });
    window.addEventListener("pageshow", event => { if (event.persisted) finish(false, false); }, { signal });
    window.addEventListener("resize", () => {
      if (innerWidth !== initialViewport.width || innerHeight !== initialViewport.height) bypass();
    }, { signal });
    document.addEventListener("visibilitychange", () => { if (document.hidden) finish(active, false); }, { signal });
    motion.addEventListener("change", bypass, { signal });
    colors.addEventListener("change", bypass, { signal });
    start();
    return () => {
      finish(false, false);
      finishRef.current = () => {};
      enterRef.current = () => {};
    };
  }, [name]);

  return <div ref={overlay} className="entry-intro" data-chapter="hand" role="dialog" aria-modal="true" aria-labelledby="entry-title" aria-describedby="entry-description">
    <div className="entry-stage" data-chapter="hand">
      <div className="entry-brand"><p id="entry-title">{name}<span aria-hidden="true">.</span></p><span>Software & AI</span></div>
      <div className="entry-story">{notes.map(note => <div className={`entry-chapter entry-chapter-${note.symbol}`} key={note.symbol}><p className="entry-thought">{note.thought}</p><p className="entry-project">{note.project}</p></div>)}<div className="entry-chapter entry-chapter-name"><p className="entry-thought">Ideas take shape.</p><p className="entry-project">Curiosity → experiments → useful software</p></div></div>
      <div className="entry-footer"><span className="entry-location">{location}</span><p className="entry-hint" id="entry-description"><span className="entry-pointer-copy">Move to bend the line. Click anywhere to enter.</span><span className="entry-touch-copy">Drag to bend the line. Tap anywhere to enter.</span></p><span className="entry-footer-label" aria-hidden="true">A line of thought</span></div>
    </div>
    <EntryThreadArt />
    <button className="entry-surface" type="button" aria-label={`Enter ${name}’s portfolio`} aria-describedby="entry-description" onClick={event => enterRef.current(event.detail)} />
    <button className="entry-skip" type="button" onClick={() => finishRef.current()}>Skip intro ↗</button>
  </div>;
}
