// Hero intro: the name arrives as a signal. Every letter starts as a bit (0/1) and decodes into its glyph
// in scattered order. Letters turn in 3D, mostly top to bottom, some left to right: each turn goes
// edge-on, swaps the face while it is invisible, and comes back with a soft overshoot, so the motion is
// continuous. The node (the full stop) arrives last and the wire launches from it. At rest, now and then
// one letter flips back to a bit and re-locks, so the name keeps receiving signal.
// Bits sit over each letter's own box (CSS ::after), so the name never changes width and the wire's
// anchor never moves.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion } from '@/engine';

gsap.registerPlugin(SplitText, ScrollTrigger);

type Axis = 'rotationX' | 'rotationY';
const bit = () => (Math.random() < 0.5 ? '0' : '1');
// every bit carries one of the section hues, so the name decodes out of multicoloured signal
const HUES = ['#0ae448', '#fec5fb', '#00bae2', '#9d95ff', '#ff8709', '#abff84', '#ff5ce1'];
function face(el: HTMLElement, value: string | null) {
  if (value === null) return el.removeAttribute('data-bit');
  el.style.setProperty('--bit', HUES[(Math.random() * HUES.length) | 0]);
  el.setAttribute('data-bit', value);
}

// One turn: rotate edge-on, swap the face out of sight, rotate back in.
function turn(el: HTMLElement, axis: Axis, next: string | null, last: boolean) {
  const dir = Math.random() < 0.5 ? 1 : -1;
  return gsap.timeline()
    .to(el, { [axis]: 90 * dir, duration: last ? 0.2 : 0.14, ease: 'power2.in' })
    .call(() => face(el, next))
    // immediateRender off: otherwise every letter jumps edge-on (invisible) the moment the timeline is built
    .fromTo(el, { [axis]: -90 * dir }, last
      ? { [axis]: 0, duration: 0.85, ease: 'back.out(1.8)', immediateRender: false }
      : { [axis]: 0, duration: 0.14, ease: 'power2.out', immediateRender: false });
}

// A letter decodes: a couple of bit-to-bit turns, then the turn that lands on its glyph.
function decode(el: HTMLElement, turns: number) {
  const axis: Axis = Math.random() < 0.7 ? 'rotationX' : 'rotationY';
  const tl = gsap.timeline();
  for (let i = 0; i < turns; i++) tl.add(turn(el, axis, bit(), false));
  return tl.add(turn(el, axis, null, true));
}

export function startDecode() {
  onPage(({ intro }) => {
    const name = document.querySelector<HTMLElement>('.hero__name');
    if (!name || prefersReducedMotion()) return;
    const split = SplitText.create(name, { type: 'chars', charsClass: 'dc' });
    const chars = split.chars as HTMLElement[];
    const dot = name.querySelector<HTMLElement>('.hero__dot');
    gsap.set(chars, { transformPerspective: 700, force3D: true });

    // Decode on first load only when the loader hides the swap (desktop), or when the page booted fast
    // enough that nobody has read the name yet; on a slow phone the name simply stays as rendered.
    const loader = document.getElementById('loader');
    const covered = !!loader && !loader.hidden && loader.getClientRects().length > 0;
    const early = performance.now() < 1500 || document.documentElement.classList.contains('is-loaded');
    if (covered || early) {
      chars.forEach((c) => face(c, bit()));
      if (dot) gsap.set(dot, { scale: 0 });
      const order = gsap.utils.shuffle([...chars]);
      const tl = gsap.timeline();
      order.forEach((c, i) => tl.add(decode(c, 1 + (i % 2)), i * 0.06));
      if (dot) tl.to(dot, { scale: 1, duration: 0.7, ease: 'back.out(2.6)' }, '>-0.35');
      intro.add(tl, 0);
    }

    // Idle: while the hero is on screen, a random letter flips to a bit and back every few seconds.
    let next: gsap.core.Tween | null = null;
    const pulse = () => {
      const el = gsap.utils.random(chars);
      const axis: Axis = Math.random() < 0.6 ? 'rotationX' : 'rotationY';
      gsap.timeline().add(turn(el, axis, bit(), false)).add(turn(el, axis, null, true), '+=0.5');
      next = gsap.delayedCall(gsap.utils.random(2.4, 4.2), pulse);
    };
    const st = ScrollTrigger.create({
      trigger: name,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        next?.kill();
        next = self.isActive ? gsap.delayedCall(3, pulse) : null;
      },
    });

    return () => {
      next?.kill();
      st.kill();
      chars.forEach((c) => face(c, null));
      split.revert();
    };
  });
}
