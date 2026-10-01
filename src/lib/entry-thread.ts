type Point = { x: number; y: number };
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const POINTS = 720;

/** The same continuous stroke moves through three ideas, then opens the page. */
export function createEntryThread(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>(".entry-stage");
  const svg = root.querySelector<SVGSVGElement>(".entry-thread");
  const line = svg?.querySelector<SVGPathElement>(".entry-thread-line");
  const tip = svg?.querySelector<SVGCircleElement>(".entry-thread-tip");
  if (!stage || !svg || !line || !tip || !CSS.supports("clip-path", "polygon(0 0, 100% 0, 100% 100%)")) return null;
  const width = root.clientWidth;
  const height = root.clientHeight;
  const narrow = width <= 760;
  const scale = Math.min(width * (narrow ? .95 : .88) / 1000, height * .64 / 560);
  const origin = { x: (width - 1000 * scale) / 2, y: height * .45 - 280 * scale };
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const sample = (selector: string, hand = false) => {
    const path = svg.querySelector<SVGPathElement>(selector);
    if (!path?.getTotalLength || !path.getPointAtLength) throw new Error("SVG geometry unavailable");
    const length = path.getTotalLength();
    if (!Number.isFinite(length) || length <= 0) throw new Error("Invalid thread geometry");
    return Array.from({ length: POINTS }, (_, index) => {
      const point = path.getPointAtLength(length * index / (POINTS - 1));
      const extraScale = hand && narrow ? 1.2 : 1;
      return {
        x: index === 0 ? -40 : index === POINTS - 1 ? width + 40 : origin.x + (430 + (point.x - 430) * extraScale) * scale,
        y: origin.y + (260 + (point.y - 260) * extraScale) * scale,
      };
    });
  };
  const hand = sample(".thread-shape-hand", true);
  const change = sample(".thread-shape-change");
  const name = sample(narrow ? ".thread-shape-name-mobile" : ".thread-shape-name");
  let arrivalAt = 0;
  let pointer: Point | undefined;
  let pointerStrength = 0;
  const offsets = Array.from({ length: POINTS }, () => ({ x: 0, y: 0, vx: 0, vy: 0 }));
  let drawn: Point[] = hand;
  let exitPoints: Point[] = hand;
  let visibleCount = POINTS;
  let chapter = "";
  const radius = Math.min(width * .22, 180);
  const displacement = narrow ? 26 : 38;

  const paint = (points: Point[], visible = 1) => {
    const count = Math.max(2, Math.ceil((POINTS - 1) * clamp(visible)) + 1);
    visibleCount = count;
    // Sampled paths keep correspondence stable while morphing. Rounded joins keep
    // the monoline lettering sharp without allocating spline objects every frame.
    line.setAttribute("d", points.slice(0, count).map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" "));
    const head = points[count - 1];
    tip.setAttribute("cx", String(head.x));
    tip.setAttribute("cy", String(head.y));
    tip.style.opacity = visible < 1 ? "1" : "0";
  };
  const label = (value: string) => {
    if (chapter === value) return;
    chapter = value;
    stage.dataset.chapter = value;
    root.dataset.chapter = value;
  };
  const interpolate = (from: Point[], to: Point[], progress: number) => from.map((point, index) => ({
    x: mix(point.x, to[index].x, progress), y: mix(point.y, to[index].y, progress),
  }));

  return {
    arrive(time: number) { arrivalAt = time; label("hand"); paint(hand, .02); },
    move(x: number, y: number) { pointer = { x, y }; },
    relax() { pointer = undefined; },
    draw(time: number, delta: number) {
      const elapsed = time - arrivalAt;
      let base: Point[];
      if (elapsed < 1400) { base = hand; label("hand"); }
      else if (elapsed < 2200) { base = interpolate(hand, change, ease((elapsed - 1400) / 800)); label("change"); }
      else if (elapsed < 2950) { base = change; label("change"); }
      else { base = interpolate(change, name, ease((elapsed - 2950) / 950)); label("name"); }
      const dt = Math.min(delta, 32) / 1000;
      pointerStrength += ((pointer ? 1 : 0) - pointerStrength) * (1 - Math.exp(-delta / 90));
      let moving = false;
      drawn = base.map((point, index) => {
        let targetX = 0;
        let targetY = 0;
        if (pointer && pointerStrength > .001) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.pow(1 - clamp(distance / radius), 2) * displacement * pointerStrength;
          targetX = dx / Math.max(distance, 1) * influence;
          targetY = (distance < 1 ? 1 : dy / distance) * influence;
        }
        const offset = offsets[index];
        // Damped springs give the thread weight and a clean settling point.
        offset.vx += ((targetX - offset.x) * 210 - offset.vx * 26) * dt;
        offset.vy += ((targetY - offset.y) * 210 - offset.vy * 26) * dt;
        offset.x += offset.vx * dt;
        offset.y += offset.vy * dt;
        if (Math.abs(offset.x - targetX) + Math.abs(offset.y - targetY) + Math.abs(offset.vx) + Math.abs(offset.vy) > .08) moving = true;
        return { x: point.x + offset.x, y: point.y + offset.y };
      });
      paint(drawn, ease(elapsed / 950));
      return elapsed < 3900 || moving || Math.abs(pointerStrength - (pointer ? 1 : 0)) > .001;
    },
    release() {
      // Early taps pull only the stroke that is already visible, without completing
      // the whole drawing in a flash before the transition.
      exitPoints = Array.from({ length: POINTS }, (_, index) => {
        const position = index * (visibleCount - 1) / (POINTS - 1);
        const before = drawn[Math.floor(position)];
        const after = drawn[Math.min(visibleCount - 1, Math.ceil(position))];
        return { x: mix(before.x, after.x, position % 1), y: mix(before.y, after.y, position % 1) };
      });
    },
    open(progress: number) {
      if (progress < .3) {
        const pull = ease(progress / .3);
        paint(exitPoints.map((point, index) => ({
          x: mix(point.x, -30 + (width + 60) * index / (POINTS - 1), pull),
          y: mix(point.y, height * .45, pull),
        })));
      } else if (progress < .48) {
        const turn = ease((progress - .3) / .18);
        paint(exitPoints.map((_, index) => ({
          x: mix(-30 + (width + 60) * index / (POINTS - 1), 0, turn),
          y: mix(height * .45, -30 + (height + 60) * index / (POINTS - 1), turn),
        })));
      } else {
        const sweep = ease((progress - .48) / .52);
        const edge = sweep * width;
        stage.style.clipPath = `polygon(${edge}px 0, 100% 0, 100% 100%, ${edge}px 100%)`;
        paint(exitPoints.map((_, index) => ({ x: edge, y: -30 + (height + 60) * index / (POINTS - 1) })));
      }
      svg.style.opacity = String(1 - ease((progress - .9) / .1));
    },
    dispose() {
      stage.style.removeProperty("clip-path");
      delete stage.dataset.chapter;
      delete root.dataset.chapter;
      svg.style.removeProperty("opacity");
      svg.removeAttribute("viewBox");
      line.removeAttribute("d");
      tip.removeAttribute("cx");
      tip.removeAttribute("cy");
      tip.removeAttribute("style");
    },
  };
}
