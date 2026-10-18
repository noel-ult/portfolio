// A deliberate activation on /enter may hand off to / without playing twice.
// This is memory for one client navigation, never a persisted visit/session flag.
let handoff = false;
export function markEntryHandoff() { handoff = true; }
export function hasEntryHandoff() { return handoff; }
export function clearEntryHandoff() { handoff = false; }
