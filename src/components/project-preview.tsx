"use client";

import { useId, useState, useSyncExternalStore } from "react";
import type { Project } from "@/content/portfolio";

// Sample changes from PageRadar's public /demo screen, not live monitoring data.
const changes = [
  { id: "deadline", site: "University admissions", title: "Deadline extended", before: "Applications close 12 January 2027", after: "Applications close 19 January 2027", note: "Seven more days to apply." },
  { id: "price", site: "SaaS pro pricing", title: "Price change", before: "$49 / month", after: "$39 / month", note: "Monthly pricing reduced by $10." },
  { id: "eligibility", site: "Research grant calls", title: "Eligibility updated", before: "Open to final-year students only", after: "Open to all undergraduate students", note: "More students can now apply." },
] as const;

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
function usePreviewReady() {
  return useSyncExternalStore(subscribe, clientReady, serverReady);
}

function PageRadarPreview() {
  const ready = usePreviewReady();
  const comparisonId = useId();
  const [selected, setSelected] = useState<string>(changes[0].id);
  const change = changes.find(item => item.id === selected) ?? changes[0];

  return <div className="radar-preview">
    <div className="preview-appbar"><span className="preview-brand"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m12 12 7-7" /></svg>PageRadar</span><span className="preview-tag">Demo</span></div>
    <div className="radar-content">
      <div className="preview-heading"><h4>What changed?</h4><p>Select an update to compare.</p></div>
      <div className="radar-changes" role="group" aria-label="Sample webpage updates">
        {changes.map(item => <button type="button" key={item.id} disabled={!ready} aria-pressed={selected === item.id} aria-controls={comparisonId} onClick={() => setSelected(item.id)}><span><strong>{item.title}</strong><small>{item.site}</small></span><span aria-hidden="true">↗</span></button>)}
      </div>
      <div className="radar-comparison" id={comparisonId} aria-live="polite" aria-atomic="true">
        <div className="radar-before"><span>Before</span><p><del>{change.before}</del></p></div>
        <div className="radar-after"><span>After</span><p>{change.after}</p></div>
        <p className="radar-note">{change.note}</p>
      </div>
    </div>
  </div>;
}

// Rice / capacity and verdict thresholds follow the project's vaariCalculator.ts.
function vaariVerdict(value: number) {
  if (value < 1.2) return "Oru vaari mathi.";
  if (value < 2.2) return "Rand vaari edukkaam.";
  if (value < 3.4) return `${Math.round(value)} vaari edukkaam.`;
  if (value < 5) return "Nalla vaari aanu.";
  if (value < 7) return "Vaari Master.";
  return "Ithrem choru enthina?";
}

const grains = Array.from({ length: 35 }, (_, i) => ({
  x: 62 + (i % 7) * 27 + (Math.floor(i / 7) % 2) * 10,
  y: 58 + Math.floor(i / 7) * 15,
  angle: (i % 3) * 35 - 35,
}));

function ChoruVaariPreview() {
  const ready = usePreviewReady();
  const fieldId = useId();
  const riceId = `${fieldId}-rice`;
  const capacityId = `${fieldId}-capacity`;
  const [rice, setRice] = useState(576);
  const [capacity, setCapacity] = useState(128);
  const count = rice / capacity;

  return <div className="vaari-preview">
    <div className="preview-appbar"><span className="preview-brand">CHORU VAARI LAB</span><button type="button" className="vaari-reset" disabled={!ready} onClick={() => { setRice(576); setCapacity(128); }}>Reset sample<span aria-hidden="true"> ↺</span></button></div>
    <div className="vaari-content">
      <div className="preview-heading"><h4>Your choru, quantified.</h4><p>One vaari = one handful of rice.</p></div>
      <div className="vaari-report">
        <svg className="vaari-plate" viewBox="0 0 300 190" aria-hidden="true">
          <ellipse className="plate-outline" cx="150" cy="100" rx="135" ry="76" />
          <ellipse className="plate-inner" cx="150" cy="100" rx="113" ry="58" />
          {grains.map((grain, i) => <ellipse key={i} className="rice-grain" cx={grain.x} cy={grain.y} rx="9" ry="4" transform={`rotate(${grain.angle} ${grain.x} ${grain.y})`} opacity={i < Math.ceil(rice / 896 * grains.length) ? 1 : .12} />)}
          <path className="plate-mark" d="M23 15v16M15 23h16M277 159v16M269 167h16" />
        </svg>
        <div className="vaari-estimate"><span>Estimated vaaris</span><output aria-live="polite" aria-atomic="true" htmlFor={`${riceId} ${capacityId}`}>{count.toFixed(2)}<small>handfuls</small></output></div>
      </div>
      <div className="vaari-controls">
        <label htmlFor={riceId}><span>Rice on the plate</span><strong>{rice} g</strong></label>
        <input id={riceId} type="range" disabled={!ready} min="128" max="896" step="16" value={rice} aria-valuetext={`${rice} grams`} onChange={event => setRice(Number(event.target.value))} />
        <label htmlFor={capacityId}><span>Your handful capacity</span><strong>{capacity} g</strong></label>
        <input id={capacityId} type="range" disabled={!ready} min="64" max="192" step="8" value={capacity} aria-valuetext={`${capacity} grams per handful`} onChange={event => setCapacity(Number(event.target.value))} />
      </div>
      <div className="vaari-verdict"><span>Lab verdict</span><p>{vaariVerdict(count)}</p></div>
    </div>
  </div>;
}

export function ProjectPreview({ kind }: { kind: NonNullable<Project["preview"]> }) {
  return <section className={`project-preview preview-${kind}`} aria-label={`${kind === "pageradar" ? "PageRadar" : "Choru Vaari Kodukkam"} interactive preview`}>
    <p className="preview-caption"><span>Interactive preview</span><span>{kind === "pageradar" ? "Sample updates" : "Example inputs"}</span></p>
    {kind === "pageradar" ? <PageRadarPreview /> : <ChoruVaariPreview />}
    <noscript><p className="preview-nojs">Enable JavaScript to try the controls. You can still read the project and open its links.</p></noscript>
  </section>;
}
