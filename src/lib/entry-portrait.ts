const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

/** One photograph, with an interaction-driven colour lens. No idle animation. */
export function createEntryPortrait(stage: HTMLElement) {
  if (!CSS.supports("mask-image", "radial-gradient(black, transparent)")) return null;
  const bounds = stage.getBoundingClientRect();
  const notes = Array.from(stage.querySelectorAll<HTMLElement>(".entry-note"));
  const noteBounds = notes.map(note => note.getBoundingClientRect());
  const width = bounds.width;
  const height = bounds.height;
  const radius = Math.min(width, height) * (width <= 760 ? .43 : .34);
  let x = width * .5;
  let y = height * .55;
  let targetX = x;
  let targetY = y;
  let arrivalAt = -Infinity;
  let releasedRadius = radius;

  const lens = (size: number) => {
    stage.style.setProperty("--lens-x", `${x}px`);
    stage.style.setProperty("--lens-y", `${y}px`);
    stage.style.setProperty("--lens-radius", `${size}px`);
  };

  return {
    arrive(time: number) { arrivalAt = time; lens(radius); },
    move(pointerX: number, pointerY: number) {
      targetX = clamp((pointerX - bounds.left) / width) * width;
      targetY = clamp((pointerY - bounds.top) / height) * height;
    },
    relax() { targetX = width * .5; targetY = height * .55; },
    draw(time: number, delta: number) {
      const follow = 1 - Math.exp(-delta / 100);
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      lens(radius);
      stage.style.setProperty("--portrait-scale", String(1 + .025 * (1 - ease((time - arrivalAt) / 650))));
      notes.forEach((note, index) => {
        const rect = noteBounds[index];
        const distance = Math.hypot(x + bounds.left - (rect.left + rect.width / 2), y + bounds.top - (rect.top + rect.height / 2));
        note.dataset.near = String(distance < Math.min(width * .3, 320));
      });
      return time - arrivalAt < 650 || Math.abs(x - targetX) + Math.abs(y - targetY) > .1;
    },
    release() { releasedRadius = radius; },
    open(progress: number) {
      // Expand beyond every corner before dissolving into the real hero.
      lens(releasedRadius + (Math.hypot(width, height) * 1.6 - releasedRadius) * ease(progress / .65));
      stage.style.setProperty("--portrait-scale", "1");
      stage.style.opacity = String(1 - ease((progress - .38) / .62));
    },
    dispose() {
      ["--lens-x", "--lens-y", "--lens-radius", "--portrait-scale", "opacity"].forEach(property => stage.style.removeProperty(property));
      notes.forEach(note => { delete note.dataset.near; });
    },
  };
}
