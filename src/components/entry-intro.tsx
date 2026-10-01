"use client";

import { useEffect, useRef } from "react";
import { createEntryPortrait } from "@/lib/entry-portrait";

const SESSION_KEY = "through-noels-eyes-entry-v1";
const OPEN_DURATION = 850;
const TAP_THRESHOLD = 8;
type EntryNote = { thought: string; project: string };

export function EntryIntro({ name, photo, location, notes }: {
  name: string;
  photo: { src: string; alt: string };
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
    if (!root || !stage || !surface || !skip || !main || !shell) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const colors = matchMedia("(forced-colors: active)");
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "seen"; } catch { /* Storage is optional. */ }
    if (seen || motion.matches || colors.matches || window.location.hash || scrollY > 20 || document.hidden || !document.fonts || !stage.animate) return;

    let finished = false;
    let active = false;
    let opening = false;
    let frame = 0;
    let openingAt = 0;
    let previousTime = 0;
    let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
    let renderer: ReturnType<typeof createEntryPortrait> = null;
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
      clearTimeout(preparationTimer);
      clearTimeout(cleanupTimer);
      cancelAnimationFrame(frame);
      frame = 0;
      listeners.abort();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      renderer?.dispose();
      renderer = null;
      inertElements.forEach(({ element, previous }) => { element.inert = previous; });
      delete shell.dataset.entryActive;
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
    const preparationTimer = setTimeout(() => finish(false, false), 800);

    const tick = (time: number) => {
      frame = 0;
      if (finished || !renderer) return;
      try {
        if (opening) {
          const progress = Math.max(0, Math.min(1, (time - openingAt) / OPEN_DURATION));
          renderer.open(progress);
          if (progress === 1) { finish(); return; }
        } else if (!renderer.draw(time, Math.min(32, time - (previousTime || time - 16)))) {
          previousTime = time;
          return;
        }
        previousTime = time;
        frame = requestAnimationFrame(tick);
      } catch { finish(); }
    };
    const wake = () => {
      if (!frame && !finished) { previousTime = 0; frame = requestAnimationFrame(tick); }
    };
    const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, { fill: "both", easing: "cubic-bezier(.22,1,.36,1)", ...options });
      animations.add(animation);
    };
    enterRef.current = detail => {
      // Native keyboard/assistive clicks do not depend on pointer history.
      if (!active || finished || opening || !renderer || (detail > 0 && suppressClick)) return;
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
          animate(element, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 250, delay: 600 });
        });
        cleanupTimer = setTimeout(() => finish(), OPEN_DURATION + 250);
        wake();
      } catch { finish(); }
    };

    const start = () => {
      if (finished) return;
      if (motion.matches || colors.matches || window.location.hash || scrollY > 20 || document.hidden) { finish(false, false); return; }
      try {
        // Measure only once the stage has its actual viewport dimensions.
        root.hidden = false;
        renderer = createEntryPortrait(stage);
        if (!renderer) { finish(false, false); return; }
        root.dataset.touch = String(matchMedia("(pointer: coarse)").matches);
        root.dataset.keyboard = "false";
        root.dataset.state = "exploring";
        Array.from(shell.children).forEach(element => {
          if (element === root || !(element instanceof HTMLElement)) return;
          inertElements.push({ element, previous: element.inert });
          element.inert = true;
        });
        shell.dataset.entryActive = "exploring";
        active = true;
        clearTimeout(preparationTimer);
        renderer.arrive(performance.now());
        renderer.draw(performance.now(), 16);
        [".entry-heading", ".entry-thesis", ".entry-notes", ".entry-footer"].forEach((selector, index) => {
          const element = stage.querySelector(selector);
          if (element) animate(element, [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 440, delay: index * 70 });
        });
        surface.focus({ preventScroll: true });
        wake();
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
    window.addEventListener("resize", () => {
      if (innerWidth !== initialViewport.width || innerHeight !== initialViewport.height) bypass();
    }, { signal });
    document.addEventListener("visibilitychange", () => { if (document.hidden) finish(active, false); }, { signal });
    motion.addEventListener("change", bypass, { signal });
    colors.addEventListener("change", bypass, { signal });
    const image = new window.Image();
    const imageReady = new Promise<void>((resolve, reject) => {
      image.addEventListener("load", () => resolve(), { once: true, signal });
      image.addEventListener("error", () => reject(new Error("Portrait unavailable")), { once: true, signal });
    });
    image.src = photo.src;
    // Loaded pixels can paint immediately. Some browsers defer decode() promises
    // for off-document images, so that promise must not hold the entrance closed.
    image.decode().catch(() => finish(active, active));
    Promise.all([document.fonts.ready, imageReady]).then(start).catch(() => finish(false, false));
    return () => {
      finish(false, false);
      finishRef.current = () => {};
      enterRef.current = () => {};
    };
  }, [name, photo.src]);

  return <div ref={overlay} className="entry-intro" hidden role="dialog" aria-modal="true" aria-labelledby="entry-title" aria-describedby="entry-description">
    <div className="entry-stage">
      <div className="entry-photograph" aria-hidden="true" style={{ backgroundImage: `url("${photo.src}")` }} />
      <div className="entry-colour" aria-hidden="true" style={{ backgroundImage: `url("${photo.src}")` }} />
      <div className="entry-shade" aria-hidden="true" />
      <p className="entry-kicker">A curious mind. A builder at heart.</p>
      <div className="entry-heading"><p id="entry-title" className="entry-name">{name}<span aria-hidden="true">.</span></p></div>
      <p className="entry-thesis">Curious about how things work.<br />Driven to build them.</p>
      <div className="entry-notes">{notes.map(note => <p className="entry-note" key={note.project}><span className="entry-thought">{note.thought}</span><span className="entry-project">{note.project}<span aria-hidden="true"> ↗</span></span></p>)}</div>
      <div className="entry-footer"><span className="entry-location">{location}</span><p className="entry-hint" id="entry-description"><span className="entry-pointer-copy">Move to explore. Click anywhere to enter.</span><span className="entry-touch-copy">Drag to explore. Tap anywhere to enter.</span></p><span className="entry-footer-label" aria-hidden="true">Behind the work</span></div>
      <span className="sr-only">{photo.alt}</span>
    </div>
    <button className="entry-surface" type="button" aria-label={`Enter ${name}’s portfolio`} aria-describedby="entry-description" onClick={event => enterRef.current(event.detail)} />
    <button className="entry-skip" type="button" onClick={() => finishRef.current()}>Skip intro ↗</button>
  </div>;
}
