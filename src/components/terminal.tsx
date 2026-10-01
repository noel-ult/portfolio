"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Destination = { id: string; label: string };
export function Terminal({ destinations, name, role }: {
  destinations: Destination[]; name: string; role: string;
}) {
  const help = ["help       Show commands", ...destinations.map(item => `${item.id.padEnd(10)} ${item.label}`), "whoami     Read profile", "clear      Clear output"].join("\n");
  const outputRef = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([help]);
  useEffect(() => {
    const element = outputRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [output]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;
    setCommand("");
    if (value === "clear") { setOutput([]); return; }
    let response: string;
    const destination = destinations.find(item => item.id === value);
    if (value === "help") response = help;
    else if (value === "whoami") response = `${name}\n${role}`;
    else if (destination) {
      response = `Opening ${destination.label.toLowerCase()}…`;
      window.location.hash = destination.id;
      document.getElementById(`${destination.id}-heading`)?.focus({ preventScroll: true });
    } else response = `Unknown command: ${value}. Type help for available commands.`;
    setOutput(previous => [...previous.slice(-11), `$ ${value}\n${response}`]);
  }
  return <div className="terminal">
    <div className="panel-bar"><span>portfolio.shell</span><span className="panel-caption">Interactive terminal</span></div>
    <div ref={outputRef} className="terminal-output" role="log" aria-label="Terminal output" aria-live="polite" tabIndex={0}>
      {output.length ? output.map((entry, index) => <pre key={index}>{entry}</pre>) : <p>Output cleared. Type help to start.</p>}
    </div>
    <form noValidate onSubmit={submit} className="terminal-form js-control">
      <label className="sr-only" htmlFor="terminal-command">Terminal command</label>
      <div className="command-field"><span aria-hidden="true">$</span><input id="terminal-command" value={command} onChange={event => setCommand(event.target.value)} placeholder="Type a command…" autoComplete="off" spellCheck={false} maxLength={80} /></div>
      <button type="submit" disabled={!command.trim()}>Run</button>
    </form>
    <noscript><p className="terminal-fallback">Enable JavaScript for terminal commands. Section links above work without it.</p></noscript>
  </div>;
}
