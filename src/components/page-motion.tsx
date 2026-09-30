"use client";

import { useEffect } from "react";

export function PageMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const revealed = new WeakSet<Element>();
    let observer: IntersectionObserver | undefined;
    const finish = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const observe = () => {
      if (preference.matches || !window.IntersectionObserver) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || revealed.has(entry.target)) return;
          observer?.unobserve(entry.target); revealed.add(entry.target);
          if (!entry.target.animate) return;
          const animation = entry.target.animate([{ transform: "translateY(18px)", clipPath: "inset(0 0 100% 0)" }, { transform: "translateY(0)", clipPath: "inset(0 0 0 0)" }], { duration: 450, easing: "cubic-bezier(.22,1,.36,1)" });
          animations.add(animation);
          animation.finished.then(() => { animations.delete(animation); animation.cancel(); }).catch(() => {});
        });
      }, { threshold: .2 });
      document.querySelectorAll(".content-section h2").forEach(heading => { if (!revealed.has(heading)) observer?.observe(heading); });
    };
    const change = () => { finish(); observer?.disconnect(); observe(); };
    observe(); preference.addEventListener("change", change);
    return () => { finish(); observer?.disconnect(); preference.removeEventListener("change", change); };
  }, []);
  return null;
}
