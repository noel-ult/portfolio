"use client";

import { Terminal } from "@/components/terminal";

export function ConsoleDrawer(props: { destinations: { id: string; label: string }[]; name: string; role: string }) {
  return <details className="console-drawer js-control" onKeyDown={event => {
    if (event.key === "Escape") {
      event.currentTarget.open = false;
      event.currentTarget.querySelector("summary")?.focus();
    }
  }}>
    <summary aria-label="Toggle command console"><span aria-hidden="true">&gt;_</span> Console</summary>
    <Terminal {...props} />
  </details>;
}
