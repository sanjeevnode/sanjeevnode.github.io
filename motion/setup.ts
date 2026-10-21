// Global motion for the site: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, onScroll, scrollToTarget, setTransition } from '@/engine';
import { startWire } from './wire';
import { startDecode } from './decode';

export function setupMotion() {
  // Page transition: an ink band routes across left to right carrying the request, then leaves right.
  let dest = '/';
  let holdFrame = 0; // until this time the header stays put (an anchor jump is not reading down)
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest('a');
    if (!a) return;
    const url = new URL(a.href, location.href);
    dest = url.pathname;
    // Same-page anchors (/#work while on /) go through the smooth scroller. A native hash jump
    // bypasses it, so nothing on the way (reveals, wire, header) would hear the scroll.
    const target = url.pathname === location.pathname && url.hash.length > 1 && document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    history.pushState(null, '', url.hash);
    holdFrame = performance.now() + 2000;
    // a beat later, so an open phone menu has closed and released the scroll lock first
    gsap.delayedCall(0.06, () => scrollToTarget(target));
  }, true);
  setTransition({
    leave: (c) => {
      const label = c.querySelector<HTMLElement>('.curtain__label')!;
      label.textContent = `GET ${dest}`;
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(c.querySelector('.curtain__panel'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut })
        .fromTo(label, { xPercent: -40, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.5, ease: ease.out }, 0.3)
        .fromTo(c.querySelector('.curtain__wire'), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: ease.inOut }, 0.35);
    },
    enter: (c) => gsap.timeline()
      .add(() => { c.querySelector('.curtain__label')!.textContent = '200 OK'; })
      .to(c.querySelector('.curtain__label'), { xPercent: 40, autoAlpha: 0, duration: 0.35, ease: ease.inOut }, 0.2)
      .to(c.querySelector('.curtain__panel'), { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.8, ease: ease.inOut }, 0.1)
      .set(c, { autoAlpha: 0 }),
  });

  // The header steps aside while reading down, returns on the way up, and gains a ground once off the hero.
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    const h = document.documentElement.classList;
    h.toggle('frame-away', y > 160 && y > last && performance.now() > holdFrame);
    h.toggle('frame-solid', y > 40);
    last = y;
  });

  // Late layout shifts (fonts, opened rows, images) move every trigger: re-measure when the page height changes.
  let refresh: gsap.core.Tween | null = null;
  new ResizeObserver(() => {
    refresh?.kill();
    refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
  }).observe(document.body);

  // Scroll-spy: the nav marks the section being read.
  onPage(() => {
    const links = Array.from(document.querySelectorAll<HTMLElement>('[data-spy-link]'));
    const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-spy]')).map((sec) => ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        links.forEach((a) => {
          if (a.dataset.spyLink === sec.id) a.toggleAttribute('data-active', self.isActive);
        });
      },
    }));
    return () => {
      triggers.forEach((t) => t.kill());
      links.forEach((a) => a.removeAttribute('data-active'));
    };
  });

  startDecode();
  startWire();
}
