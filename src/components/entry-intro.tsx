"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createEntryThread } from "@/lib/entry-thread";
import { EntryThreadArt } from "@/components/entry-thread-art";

type EntryNote = { thought: string; project: string; symbol: "hand" | "change" };
const OPEN_DURATION = 1100;
const TAP_THRESHOLD = 8;

export function EntryIntro({ name, location, notes }: { name: string; location?: string; notes: EntryNote[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const enterRef = useRef<(detail: number) => void>(() => {});
  const suppressClick = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    const surface = root?.querySelector<HTMLAnchorElement>(".entry-surface");
    if (!root || !surface) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const colors = matchMedia("(forced-colors: active)");
    const listeners = new AbortController();
    const signal = listeners.signal;
    let renderer: ReturnType<typeof createEntryThread> = null;
    let frame = 0;
    let startedAt = performance.now();
    let previousTime = 0;
    let openingAt = 0;
    let rushingAt = 0;
    let rushingFrom = 0;
    let opening = false;
    let rushing = false;
    let navigating = false;
    let requested = false;
    let navigationFallback: ReturnType<typeof setTimeout> | undefined;
    let pointer: { id: number; x: number; y: number } | undefined;
    root.dataset.state = "exploring";
    root.dataset.touch = String(matchMedia("(pointer: coarse)").matches);
    root.dataset.keyboard = "false";

    const navigate = () => {
      if (navigating) return;
      navigating = true;
      clearTimeout(navigationFallback);
      cancelAnimationFrame(frame);
      // This is reachable only after an explicit link, tap, or keyboard activation.
      router.push("/");
    };
    const open = () => {
      if (opening || navigating) return;
      if (!renderer || motion.matches || colors.matches) { navigate(); return; }
      opening = true;
      openingAt = performance.now();
      root.dataset.state = "opening";
      renderer.release();
    };
    const tick = (time: number) => {
      frame = 0;
      if (navigating || !renderer) return;
      try {
        if (opening) {
          const progress = Math.max(0, Math.min(1, (time - openingAt) / OPEN_DURATION));
          renderer.open(progress);
          if (progress === 1) { navigate(); return; }
        } else {
          const rush = Math.max(0, Math.min(1, (time - rushingAt) / 1200));
          const elapsed = rushing ? rushingFrom + (3900 - rushingFrom) * rush * rush * (3 - 2 * rush) : time - startedAt;
          const moving = renderer.draw(startedAt + elapsed, Math.min(32, time - (previousTime || time - 16)));
          if (rushing && time - rushingAt >= 1460) open();
          else if (!moving && !rushing) { previousTime = time; return; }
        }
        previousTime = time;
        frame = requestAnimationFrame(tick);
      } catch {
        renderer?.dispose(); renderer = null;
        root.dataset.state = "static";
        if (requested) navigate();
      }
    };
    const wake = () => { if (!frame && !navigating && !document.hidden) frame = requestAnimationFrame(tick); };
    const prepare = () => {
      cancelAnimationFrame(frame); frame = 0;
      renderer?.dispose(); renderer = null;
      if (motion.matches || colors.matches) {
        const svg = root.querySelector(".entry-thread");
        svg?.setAttribute("viewBox", "0 0 1000 560");
        const path = root.querySelector(".thread-shape-hand")?.getAttribute("d");
        if (path) root.querySelector(".entry-thread-line")?.setAttribute("d", path);
        root.dataset.chapter = "hand";
        root.querySelector<HTMLElement>(".entry-stage")!.dataset.chapter = "hand";
        root.dataset.state = "static";
        return;
      }
      try {
        renderer = createEntryThread(root);
        if (!renderer) { root.dataset.state = "static"; return; }
        startedAt = performance.now(); previousTime = 0;
        renderer.arrive(startedAt); renderer.draw(startedAt, 16);
        root.dataset.state = "exploring";
        wake();
      } catch { root.dataset.state = "static"; }
    };
    enterRef.current = detail => {
      if (requested || (detail > 0 && suppressClick.current)) return;
      requested = true;
      // A stalled frame or animation cannot swallow a deliberate navigation.
      navigationFallback = setTimeout(navigate, 4200);
      surface.setAttribute("aria-busy", "true");
      if (!renderer || motion.matches || colors.matches) { navigate(); return; }
      const elapsed = performance.now() - startedAt;
      if (elapsed < 3900) {
        rushing = true; rushingAt = performance.now(); rushingFrom = elapsed;
        root.dataset.state = "sequencing";
      } else open();
      wake();
    };
    surface.addEventListener("pointerdown", event => {
      suppressClick.current = !event.isPrimary;
      if (!event.isPrimary || event.button !== 0 || requested) return;
      root.dataset.keyboard = "false";
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      surface.setPointerCapture(event.pointerId);
      renderer?.move(event.clientX, event.clientY); wake();
    }, { signal });
    surface.addEventListener("pointermove", event => {
      if (requested || (event.pointerType !== "mouse" && event.pointerId !== pointer?.id)) return;
      if (pointer && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > TAP_THRESHOLD) suppressClick.current = true;
      renderer?.move(event.clientX, event.clientY); wake();
    }, { signal });
    surface.addEventListener("pointerup", event => {
      if (event.pointerId !== pointer?.id) return;
      if (Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > TAP_THRESHOLD) suppressClick.current = true;
      pointer = undefined;
      if (event.pointerType === "touch" && !suppressClick.current) enterRef.current(1);
    }, { signal });
    surface.addEventListener("pointercancel", () => { pointer = undefined; suppressClick.current = true; }, { signal });
    surface.addEventListener("lostpointercapture", () => { if (pointer) { pointer = undefined; suppressClick.current = true; } }, { signal });
    surface.addEventListener("pointerleave", () => { if (!pointer) { renderer?.relax(); wake(); } }, { signal });
    window.addEventListener("keydown", () => { root.dataset.keyboard = "true"; }, { signal });
    // Preference, viewport, and visibility changes only redraw or pause; they never enter.
    window.addEventListener("resize", () => { if (requested) navigate(); else prepare(); }, { signal });
    const preferenceChange = () => { if (requested) navigate(); else prepare(); };
    motion.addEventListener("change", preferenceChange, { signal });
    colors.addEventListener("change", preferenceChange, { signal });
    document.addEventListener("visibilitychange", () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); }, { signal });
    prepare();
    return () => {
      listeners.abort(); clearTimeout(navigationFallback); cancelAnimationFrame(frame); renderer?.dispose();
      enterRef.current = () => {};
      root.dataset.state = "static";
    };
  }, [router]);

  return <section ref={rootRef} className="entry-intro" data-chapter="hand" aria-labelledby="entry-title" aria-describedby="entry-description">
    <div className="entry-stage" data-chapter="hand"><div className="entry-brand"><h1 id="entry-title">{name}<span aria-hidden="true">.</span></h1><span>Software & AI</span></div>
      <div className="entry-story">{notes.map(note => <div className={`entry-chapter entry-chapter-${note.symbol}`} key={note.symbol}><p className="entry-thought">{note.thought}</p><p className="entry-project">{note.project}</p></div>)}<div className="entry-chapter entry-chapter-name"><p className="entry-thought">Ideas take shape.</p><p className="entry-project">Curiosity → experiments → useful software</p></div></div>
      <div className="entry-footer"><span className="entry-location">{location}</span><p className="entry-hint" id="entry-description"><span className="entry-pointer-copy">Move to bend the line. Click anywhere to enter.</span><span className="entry-touch-copy">Drag to bend the line. Tap anywhere to enter.</span></p><span className="entry-footer-label" aria-hidden="true">A line of thought</span></div>
    </div><EntryThreadArt />
    <Link className="entry-surface" href="/" aria-label={`Enter ${name}’s portfolio`} aria-describedby="entry-description" onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); enterRef.current(event.detail); }} onKeyDown={event => { if (event.key === " ") { event.preventDefault(); enterRef.current(0); } }} />
  </section>;
}
