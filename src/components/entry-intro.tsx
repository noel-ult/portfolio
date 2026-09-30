"use client";

import { useEffect, useRef } from "react";
import { createEntryRoom } from "@/lib/entry-room";

const SESSION_KEY = "impossible-room-entry-v1";
const OPEN_DURATION = 1450;

export function EntryIntro({ name }: { name: string }) {
  const overlay = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const enterRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = overlay.current;
    const heading = document.querySelector<HTMLElement>(".hero-name-solid");
    const stage = root?.querySelector<HTMLDivElement>(".entry-stage");
    const enter = root?.querySelector<HTMLButtonElement>(".entry-enter");
    const skip = root?.querySelector<HTMLButtonElement>(".entry-skip");
    const main = document.getElementById("main");
    const shell = root?.closest<HTMLElement>(".page-shell");
    if (!root || !heading || !stage || !enter || !skip || !main || !shell) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const colors = matchMedia("(forced-colors: active)");
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "seen"; } catch { /* Storage is optional. */ }
    if (seen || motion.matches || colors.matches || location.hash || scrollY > 20 || document.hidden || !document.fonts || !heading.animate) return;

    let finished = false;
    let active = false;
    let opening = false;
    let frame = 0;
    let openingAt = 0;
    let previousTime = 0;
    let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
    let renderer: ReturnType<typeof createEntryRoom>;
    const animations = new Set<Animation>();
    const listeners = new AbortController();
    const inertElements: { element: HTMLElement; previous: boolean }[] = [];
    const previousFocus = document.activeElement;
    let touchId: number | undefined;
    root.dataset.state = "preparing";

    // Every exit path restores the same document, even halfway through a reveal.
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
      enter.removeAttribute("aria-disabled");
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
          // An already queued frame can have a timestamp just before the click.
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
    enterRef.current = () => {
      if (!active || finished || opening || !renderer) return;
      try {
        opening = true;
        openingAt = performance.now();
        root.dataset.state = "opening";
        renderer.release();
        // Skip remains usable throughout the reveal; repeated Enter presses are ignored.
        enter.setAttribute("aria-disabled", "true");
        shell.dataset.entryActive = "opening";
        document.querySelectorAll(".hero-enter, .site-header").forEach(element => {
          animate(element, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300, delay: 1150 });
        });
        cleanupTimer = setTimeout(() => finish(), OPEN_DURATION + 250);
        wake();
      } catch { finish(); }
    };

    const start = () => {
      if (finished) return;
      if (motion.matches || colors.matches || location.hash || scrollY > 20 || document.hidden) { finish(false, false); return; }
      try {
        renderer = createEntryRoom(stage);
        if (!renderer) { finish(false, false); return; }
        enter.removeAttribute("aria-disabled");
        root.dataset.touch = String(matchMedia("(pointer: coarse)").matches);
        root.dataset.state = "exploring";
        // Inert only siblings: an inert ancestor would disable the entrance itself.
        Array.from(shell.children).forEach(element => {
          if (element === root || !(element instanceof HTMLElement)) return;
          inertElements.push({ element, previous: element.inert });
          element.inert = true;
        });
        shell.dataset.entryActive = "exploring";
        active = true;
        clearTimeout(preparationTimer);
        root.hidden = false;
        renderer.arrive(performance.now());
        renderer.draw(performance.now(), 16);
        enter.focus({ preventScroll: true });
        wake();
      } catch { finish(false, false); }
    };

    const signal = listeners.signal;
    const bypass = () => finish(active, active);
    const visibility = () => { if (document.hidden) finish(active, false); };
    const keyboard = (event: KeyboardEvent) => {
      if (!active) return;
      if (event.key === "Escape") { event.preventDefault(); finish(); }
      else if (event.key === "Tab") {
        const contentSkip = document.querySelector<HTMLAnchorElement>(".skip-link");
        const controls: HTMLElement[] = contentSkip ? [contentSkip, skip, enter] : [skip, enter];
        const index = controls.indexOf(document.activeElement as HTMLElement);
        event.preventDefault();
        controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus({ preventScroll: true });
      }
    };
    const move = (event: PointerEvent) => {
      if (!active || opening || !renderer || (event.pointerType !== "mouse" && event.pointerId !== touchId)) return;
      renderer.move(event.clientX, event.clientY);
      wake();
    };
    stage.addEventListener("pointerdown", event => {
      if (!active || opening || !renderer || !event.isPrimary || event.button !== 0) return;
      if (event.pointerType !== "mouse") { touchId = event.pointerId; stage.setPointerCapture(event.pointerId); }
      renderer.move(event.clientX, event.clientY);
      wake();
    }, { signal });
    stage.addEventListener("pointermove", move, { signal });
    const leave = () => { renderer?.relax(); wake(); };
    stage.addEventListener("pointerleave", event => { if (event.pointerType === "mouse") leave(); }, { signal });
    const release = (event: PointerEvent) => {
      if (event.pointerId !== touchId) return;
      touchId = undefined;
      leave();
    };
    stage.addEventListener("pointerup", release, { signal });
    stage.addEventListener("pointercancel", release, { signal });
    stage.addEventListener("lostpointercapture", release, { signal });
    window.addEventListener("keydown", keyboard, { signal });
    window.addEventListener("wheel", bypass, { passive: true, signal });
    window.addEventListener("scroll", bypass, { passive: true, signal });
    window.addEventListener("hashchange", bypass, { signal });
    window.addEventListener("resize", bypass, { signal });
    document.addEventListener("visibilitychange", visibility, { signal });
    motion.addEventListener("change", bypass, { signal });
    colors.addEventListener("change", bypass, { signal });
    document.fonts.ready.then(start).catch(() => finish(false, false));
    return () => {
      finish(false, false);
      finishRef.current = () => {};
      enterRef.current = () => {};
    };
  }, [name]);

  return <div ref={overlay} className="entry-intro" hidden role="dialog" aria-modal="true" aria-labelledby="entry-title" aria-describedby="entry-description">
    <div className="entry-underlay" aria-hidden="true" />
    <div className="entry-stage" aria-hidden="true">
      <div className="entry-room">
        <div className="room-plane room-back">
          <span className="room-back-caption">A different perspective</span>
          <div className="room-title"><span>STEP</span><span>INSIDE<span className="room-title-dot">.</span></span></div>
          <span className="room-back-name">{name}</span>
        </div>
        <div className="room-plane room-left"><span>{name}</span></div>
        <div className="room-plane room-right"><span>PORTFOLIO</span></div>
        <div className="room-plane room-ceiling"><span>LOOK<br />CLOSER.</span></div>
        <div className="room-plane room-floor"><span>THINK<br /><i>BEYOND.</i></span></div>
      </div>
    </div>
    <div className="entry-topline">
      <p className="entry-label" id="entry-title">{name}<span>Personal portfolio</span></p>
      <button className="entry-skip" type="button" onClick={() => finishRef.current()}>Skip intro <span aria-hidden="true">↗</span></button>
    </div>
    <div className="entry-invitation">
      <button className="entry-enter" type="button" onClick={() => enterRef.current()}><span>Enter portfolio</span><span className="entry-enter-arrow" aria-hidden="true">↗</span></button>
      <p className="entry-prompt" id="entry-description"><span className="entry-pointer-copy">Move your pointer. Change your perspective.</span><span className="entry-touch-copy">Drag to look around. Tap to enter.</span></p>
    </div>
    <div className="entry-bottomline" aria-hidden="true"><span>Nothing interesting stays inside the lines.</span><span>Come on in ↗</span></div>
  </div>;
}
