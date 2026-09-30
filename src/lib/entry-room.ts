const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

/** Five native planes, one camera. Interaction only writes compositor transforms. */
export function createEntryRoom(stage: HTMLDivElement) {
  const room = stage.querySelector<HTMLElement>(".entry-room");
  const back = stage.querySelector<HTMLElement>(".room-back");
  const left = stage.querySelector<HTMLElement>(".room-left");
  const right = stage.querySelector<HTMLElement>(".room-right");
  const ceiling = stage.querySelector<HTMLElement>(".room-ceiling");
  const floor = stage.querySelector<HTMLElement>(".room-floor");
  const title = stage.querySelector<HTMLElement>(".room-title");
  if (!room || !back || !left || !right || !ceiling || !floor || !title || !CSS.supports("transform-style", "preserve-3d")) return null;

  const width = document.documentElement.getBoundingClientRect().width;
  const height = innerHeight;
  const mobile = width <= 760;
  const perspective = mobile ? 600 : 1000;
  const depth = mobile ? 1050 : 1500;
  stage.style.setProperty("--room-depth", `${depth}px`);
  stage.style.setProperty("--room-perspective", `${perspective}px`);
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let arrivalAt = -Infinity;
  let pose = { pitch: 0, yaw: 0, roll: -1.5, z: 0 };
  let exitPose = { ...pose };

  const camera = (pitch: number, yaw: number, roll: number, z = 0) => {
    pose = { pitch, yaw, roll, z };
    room.style.transform = `translate3d(-50%, -50%, ${z}px) rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg)`;
  };

  return {
    arrive(time: number) { arrivalAt = time; },
    move(pointerX: number, pointerY: number) {
      targetX = (clamp(pointerX / width) - .5) * 2;
      targetY = (clamp(pointerY / height) - .5) * 2;
    },
    relax() { targetX = 0; targetY = 0; },
    draw(time: number, delta: number) {
      const follow = 1 - Math.exp(-delta / 150);
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      const arrival = ease((time - arrivalAt) / 1100);
      const entrance = 1 - arrival;
      camera(-y * (mobile ? 4 : 7) + entrance * 9, x * (mobile ? 6 : 11) - entrance * 11, -1.5 - entrance * 8, -entrance * 260);
      return arrival < 1 || Math.abs(x - targetX) + Math.abs(y - targetY) > .001;
    },
    release() { exitPose = { ...pose }; },
    open(progress: number) {
      // A short wind-up precedes the architectural collapse, then the doorway fills the screen.
      const fold = ease((progress - .1) / .8);
      const windup = Math.sin(clamp(progress / .22) * Math.PI);
      camera(exitPose.pitch * (1 - fold), exitPose.yaw * (1 - fold), exitPose.roll * (1 - fold) - windup * 2, exitPose.z * (1 - fold) - windup * 70);
      left.style.transform = `rotateY(${90 + fold * 85}deg)`;
      right.style.transform = `rotateY(${-90 - fold * 85}deg)`;
      ceiling.style.transform = `rotateX(${-90 - fold * 85}deg)`;
      floor.style.transform = `rotateX(${90 + fold * 85}deg)`;
      back.style.transform = `translateZ(${-depth * (1 - fold)}px)`;
      title.style.transform = `scale(${1 + fold * .25})`;
      back.style.opacity = String(1 - ease((progress - .55) / .45));
      room.style.opacity = String(1 - ease((progress - .7) / .3));
    },
    dispose() {
      [room, back, left, right, ceiling, floor, title, stage].forEach(element => element.removeAttribute("style"));
    },
  };
}
