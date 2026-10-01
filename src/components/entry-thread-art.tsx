const NOEL = "M 40 350 L 40 150 L 120 350 L 120 150 L 120 350 C 140 350 155 350 200 350 C 140 350 140 150 200 150 C 260 150 260 350 200 350 C 235 350 250 350 285 350 L 285 150 L 365 150 L 285 150 L 285 245 L 352 245 L 285 245 L 285 350 L 365 350 C 385 350 395 350 410 350 L 410 150 L 410 350 L 490 350";
const BIJU = "M 565 350 L 565 150 L 615 150 C 675 150 675 245 615 245 L 565 245 L 615 245 C 685 245 685 350 615 350 L 565 350 C 620 380 665 380 705 350 L 705 150 L 705 350 C 730 350 770 350 790 350 Q 840 350 840 300 L 840 150 L 795 150 L 840 150 L 840 300 Q 840 350 790 350 C 825 380 875 380 900 350 L 900 150 L 900 310 Q 900 350 935 350 Q 970 350 970 310 L 970 150 L 970 350";
const transform = (path: string, sx: number, sy: number, x: number, y: number) => path.replace(/(-?\d+)\s+(-?\d+)/g, (_, px, py) => `${Number(px) * sx + x} ${Number(py) * sy + y}`);
const DESKTOP_NAME = `M -40 380 C -20 380 10 350 40 350 ${NOEL.slice(9)} C 525 350 535 350 565 350 ${BIJU.slice(10)} C 990 350 1020 350 1040 350`;
const MOBILE_NAME = `${transform(NOEL, 1.5, .9, 80, -70)} C 930 245 930 275 830 275 L 145 275 Q 132 275 132 300 L 132.25 480 ${transform(BIJU, 1.65, .9, -800, 165).replace(/^M [\d.]+ [\d.]+/, "")} C 825 480 940 480 1040 480`;
const HAND = "M -40 420 C 120 420 200 420 360 420 C 350 380 335 350 310 325 L 255 245 Q 242 223 260 214 Q 274 207 286 223 L 350 284 L 342 110 Q 342 85 359 85 Q 376 85 376 110 L 390 227 L 396 65 Q 396 42 414 42 Q 433 42 433 70 L 434 220 L 454 88 Q 457 64 473 68 Q 490 71 488 89 L 474 240 L 511 157 Q 518 141 532 149 Q 544 158 536 177 L 510 275 Q 499 347 459 387 L 452 420 C 630 420 700 420 1040 420";

/** One unbroken line moves through a hand, a change, and Noel's name. */
export function EntryThreadArt() {
  return <svg className="entry-thread" aria-hidden="true" focusable="false" viewBox="0 0 1000 560">
    <defs>
      <path className="thread-shape-hand" d={HAND} />
      <path className="thread-shape-change" d="M -40 350 C 40 350 90 270 210 270 L 420 270 L 270 270 C 215 270 205 410 380 410 L 580 410 L 550 380 L 580 410 L 550 440 L 580 410 C 605 410 620 340 675 340 L 675 180 L 675 270 L 590 270 L 760 270 L 675 270 L 675 340 C 810 340 890 350 1040 350" />
      <path className="thread-shape-name" d={DESKTOP_NAME} />
      <path className="thread-shape-name-mobile" d={MOBILE_NAME} />
    </defs>
    <path className="entry-thread-line" d={HAND} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle className="entry-thread-tip" r="4" />
  </svg>;
}
