"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EntryIntro } from "@/components/entry-intro";
import { clearEntryHandoff, hasEntryHandoff } from "@/lib/entry-navigation";

type IntroProps = {
  name: string;
  location?: string;
  notes: { thought: string; project: string; symbol: "hand" | "change" }[];
};

export function HomeEntrance({ children, ...intro }: IntroProps & { children: React.ReactNode }) {
  const pathname = usePathname();
  return <EntranceFrame key={pathname} enabled={pathname === "/"} intro={intro}>{children}</EntranceFrame>;
}

function EntranceFrame({ children, enabled, intro }: { children: React.ReactNode; enabled: boolean; intro: IntroProps }) {
  const [entered, setEntered] = useState(() => enabled && hasEntryHandoff());
  const contentRef = useRef<HTMLDivElement>(null);
  const active = enabled && !entered;

  useEffect(() => {
    if (enabled) clearEntryHandoff();
    const content = contentRef.current;
    if (!content) return;
    content.inert = active;
    if (active) {
      window.scrollTo(0, 0);
      document.querySelector<HTMLButtonElement>(".homepage-entrance .entry-surface")?.focus({ preventScroll: true });
    }
    return () => { content.inert = false; };
  }, [active, enabled]);

  const enter = useCallback(() => {
    setEntered(true);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      contentRef.current?.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
    });
  }, []);

  return <>
    {active ? <div className="homepage-entrance" role="dialog" aria-modal="true" aria-labelledby="entry-title"><EntryIntro {...intro} embedded onEntered={enter} /></div> : null}
    <div className="entrance-content" ref={contentRef}>{children}</div>
  </>;
}
