"use client";

import { useEffect, useRef, useState } from "react";

type Destination = { id: string; label: string };

export function SiteHeader({ name, destinations }: { name: string; destinations: Destination[] }) {
  const [active, setActive] = useState("");
  const [sticky, setSticky] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = destinations.map(item => document.getElementById(item.id)).filter((item): item is HTMLElement => !!item);
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector(".intro");
      const headerHeight = header.current?.offsetHeight ?? 80;
      setSticky((hero?.getBoundingClientRect().bottom ?? 0) <= headerHeight);
      const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = atBottom ? sections[sections.length - 1] : sections.filter(section => section.getBoundingClientRect().top <= headerHeight + 65).sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];
      setActive(current?.id ?? "");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [destinations]);

  useEffect(() => {
    const update = () => {
      const link = nav.current?.querySelector<HTMLElement>(`[href="#${active}"]`);
      if (!marker.current) return;
      marker.current.style.opacity = link ? "1" : "0";
      if (link) {
        marker.current.style.width = `${link.offsetWidth}px`;
        marker.current.style.transform = `translateX(${link.offsetLeft}px)`;
      }
    };
    update();
    const observer = new ResizeObserver(update);
    if (nav.current) observer.observe(nav.current);
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) update(); });
    return () => { disposed = true; observer.disconnect(); };
  }, [active]);

  return <header ref={header} className={`site-header ${sticky ? "is-sticky" : ""}`}>
    <a href="#top" className="wordmark" aria-label={`${name}, back to top`}><span className="brand-dot" aria-hidden="true" />{name}</a>
    <nav ref={nav} aria-label="Main navigation">
      {destinations.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>{item.label}</a>)}
      <span ref={marker} className="nav-marker" aria-hidden="true" />
    </nav>
  </header>;
}
