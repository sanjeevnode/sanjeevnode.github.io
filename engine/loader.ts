// First-load sequence. Progress follows REAL work (fonts + critical images), with a floor so it
// reads as intentional and a ceiling so it never becomes a usability problem.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

let format = (p: number) => String(Math.round(p)).padStart(3, '0');
export const setLoaderFormat = (fn: (p: number) => string) => { format = fn; };
let exit: ((root: HTMLElement) => gsap.core.Timeline) | null = null;
export const setLoaderExit = (fn: (root: HTMLElement) => gsap.core.Timeline) => { exit = fn; };

const MIN = 0.7; // seconds
const MAX = 1.1; // seconds; with a ~0.8 s exit the whole loader stays under 2.6 s
const SEEN = 'sn-loaded'; // the counter plays once per session; later hard loads just lift the panel

function criticalAssets(): Promise<unknown>[] {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-critical], [data-intro] img'));
  return [document.fonts.ready, ...imgs.map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {})))];
}

export async function runLoader(): Promise<void> {
  const root = document.getElementById('loader');
  if (!root || root.hidden) return;
  if (root.getClientRects().length === 0) return finish(root); // hidden by CSS (phones)
  // Booted late: the CSS bail-out already cleared (or is clearing) the screen, so just finish.
  if (performance.now() > 1800) { await wait(Math.max(0, 2.8 - performance.now() / 1000)); return finish(root); }
  root.style.animation = 'none';
  let seen = false;
  try { seen = sessionStorage.getItem(SEEN) === '1'; sessionStorage.setItem(SEEN, '1'); } catch {}
  if (prefersReducedMotion() || seen) {
    await Promise.race([Promise.all(criticalAssets()), wait(seen ? 0.6 : MAX)]);
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  const count = root.querySelector<HTMLElement>('[data-loader-count]');
  const bar = root.querySelector<HTMLElement>('[data-loader-bar]');
  const tasks = criticalAssets();
  let done = 0;
  const shown = { v: 0 };
  const target = { v: 0 };
  tasks.forEach((t) => t.then(() => { done++; target.v = (done / tasks.length) * 100; }));
  const start = performance.now();

  await new Promise<void>((resolve) => {
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      const timeCap = Math.min(100, (elapsed / MIN) * 100);
      const goal = elapsed > MAX ? 100 : Math.min(target.v, timeCap);
      shown.v += (goal - shown.v) * Math.min(1, 0.14 * gsap.ticker.deltaRatio()); // same pace at any frame rate
      if (goal === 100 && shown.v > 99.5) shown.v = 100;
      if (count) count.textContent = format(shown.v);
      if (bar) bar.style.transform = `scaleX(${shown.v / 100})`;
      if (shown.v === 100) { gsap.ticker.remove(tick); resolve(); }
    };
    gsap.ticker.add(tick);
  });

  if (exit) { await exit(root); return finish(root); }
  await gsap.to(root, { autoAlpha: 0, duration: 0.5, ease: ease.soft });
  finish(root);
}

// Hide rather than remove: React owns the loader node.
function finish(root: HTMLElement) {
  root.hidden = true;
  document.documentElement.classList.add('is-loaded');
}

const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
