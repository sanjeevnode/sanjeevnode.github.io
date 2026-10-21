// The signature: one signal line routed through every [data-wire] anchor inside [data-wire-host].
// Driver: scroll position sets how far the signal has travelled (the head sits at 66% of the
// viewport); the idle input is time, which keeps packets flowing along the drawn part.
// Anchors: data-wire="node" (lit square), "tick" (small square), "bend" (turn only).
// data-route="h" on an anchor reaches it horizontally first.
// Colour: each top-level block of the host carries a hue (--c-signal); the line, its nodes, the head and
// the packets take the hue of the section they are passing through.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion } from '@/engine';
import { roundedPath } from './route';

const NS = 'http://www.w3.org/2000/svg';
const STEP = 6; // px between samples of the length table
const SPEED = 220; // px per second for packets in flight

type Node = { rect: SVGRectElement; el: HTMLElement; l: number; lit: boolean };
type Band = { top: number; bottom: number; c: string };

export function startWire() {
  onPage(({ intro }) => {
    const host = document.querySelector<HTMLElement>('[data-wire-host]');
    const svg = host?.querySelector<SVGSVGElement>('svg.wire');
    if (!host || !svg) return;
    const trace = svg.querySelector<SVGPathElement>('.wire__trace')!;
    const live = svg.querySelector<SVGPathElement>('.wire__live')!;
    const head = svg.querySelector<SVGRectElement>('.wire__head')!;
    const packets = Array.from(svg.querySelectorAll<SVGRectElement>('.wire__packet'));
    const layer = svg.querySelector<SVGGElement>('.wire__nodes')!;
    const hue = svg.querySelector<SVGLinearGradientElement>('.wire__hue');
    const still = prefersReducedMotion();

    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let total = 0;
    let hostTop = 0;
    let nodes: Node[] = [];
    let bands: Band[] = [];
    let drawn = 0;
    const colorAt = (y: number) => (bands.find((b) => y < b.bottom) ?? bands[bands.length - 1])?.c || '';
    let started = still;

    const at = (l: number) => {
      const i = Math.min(xs.length - 1, Math.max(0, Math.round(l / STEP)));
      return [xs[i], ys[i]] as const;
    };

    // Length along the route where it first reaches the reading line.
    const target = () => {
      if (still) return total;
      const y = scrollY + innerHeight * 0.66 - hostTop;
      let lo = 0, hi = ys.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (ys[m] < y) lo = m + 1; else hi = m; }
      return lo * STEP;
    };

    function layout() {
      const hr = host!.getBoundingClientRect();
      hostTop = hr.top + scrollY;
      svg!.setAttribute('viewBox', `0 0 ${hr.width} ${hr.height}`);
      const pts = Array.from(host!.querySelectorAll<HTMLElement>('[data-wire]'))
        .filter((el) => el.getClientRects().length > 0)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.left + r.width / 2 - hr.left), y: Math.round(r.top + r.height / 2 - hr.top), h: el.dataset.route === 'h', el };
        });
      if (pts.length < 2) return;

      // Hue bands: one per top-level block, blended over 80 px at each boundary.
      bands = Array.from(host!.children)
        .filter((el): el is HTMLElement => el instanceof HTMLElement && !el.classList.contains('wire-pt'))
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { top: r.top - hr.top, bottom: r.bottom - hr.top, c: getComputedStyle(el).getPropertyValue('--c-signal').trim() };
        })
        .filter((b) => b.bottom > b.top && b.c);
      if (hue && bands.length) {
        hue.setAttribute('y2', String(hr.height));
        hue.replaceChildren(...bands.flatMap((b) => [b.top + 40, b.bottom - 40].map((y) => {
          const stop = document.createElementNS(NS, 'stop');
          stop.setAttribute('offset', String(Math.min(1, Math.max(0, y / hr.height))));
          stop.setAttribute('stop-color', b.c);
          return stop;
        })));
      }
      const d = roundedPath(pts, 22);
      trace.setAttribute('d', d);
      live.setAttribute('d', d);
      total = live.getTotalLength();
      const n = Math.ceil(total / STEP) + 1;
      xs = new Float32Array(n);
      ys = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const p = live.getPointAtLength(Math.min(i * STEP, total));
        xs[i] = p.x; ys[i] = p.y;
      }
      live.style.strokeDasharray = `${total} ${total}`;

      // Nodes: find each anchor's position along the route, searching forward only.
      layer.replaceChildren();
      nodes.forEach((nd) => nd.el.parentElement?.classList.remove('is-lit'));
      nodes = [];
      let from = 0;
      for (const p of pts) {
        const kind = p.el.dataset.wire;
        if (kind === 'bend') continue;
        let best = from, bd = Infinity;
        for (let i = from; i < n; i++) {
          const dd = Math.abs(xs[i] - p.x) + Math.abs(ys[i] - p.y);
          if (dd < bd) { bd = dd; best = i; }
        }
        from = best;
        const s = kind === 'tick' ? 6 : 10;
        const rect = document.createElementNS(NS, 'rect');
        // sit on the drawn line, not the anchor: at a rounded corner the anchor is the corner's
        // vertex, which lies outside the arc
        rect.setAttribute('x', String(xs[best] - s / 2));
        rect.setAttribute('y', String(ys[best] - s / 2));
        rect.setAttribute('width', String(s));
        rect.setAttribute('height', String(s));
        rect.setAttribute('class', `wire__node wire__node--${kind}`);
        rect.style.setProperty('--n', colorAt(p.y));
        layer.append(rect);
        nodes.push({ rect, el: p.el, l: best * STEP, lit: false });
      }
      if (still) drawn = total;
      paint();
    }

    function paint() {
      const d = Math.min(drawn, total);
      live.style.strokeDashoffset = String(total - d);
      const [hx, hy] = at(d);
      head.setAttribute('transform', `translate(${hx} ${hy})`);
      const hc = colorAt(hy);
      if (head.getAttribute('fill') !== hc) head.setAttribute('fill', hc);
      for (const nd of nodes) {
        const on = d >= nd.l - 4;
        if (on === nd.lit) continue;
        nd.lit = on;
        nd.rect.classList.toggle('is-lit', on);
        nd.el.parentElement?.classList.toggle('is-lit', on);
      }
    }

    const tick = (t: number) => {
      if (!total) return;
      if (started) drawn += (target() - drawn) * Math.min(1, 0.08 * gsap.ticker.deltaRatio());
      paint();
      const span = Math.min(drawn, total);
      packets.forEach((p, i) => {
        if (span < 24) { p.style.opacity = '0'; return; }
        const [x, y] = at((t * SPEED + (i * span) / packets.length) % span);
        p.setAttribute('transform', `translate(${x} ${y})`);
        p.setAttribute('stroke', colorAt(y));
        p.style.opacity = '1';
      });
    };

    layout();
    document.fonts.ready.then(layout);
    let pending: gsap.core.Tween | null = null;
    const ro = new ResizeObserver(() => { pending?.kill(); pending = gsap.delayedCall(0.12, layout); });
    ro.observe(host);
    svg.classList.toggle('is-still', still);
    if (!still) {
      intro.add(() => { started = true; }, document.querySelector('.hero__name') ? 1.6 : 0.5);
      gsap.ticker.add(tick);
    }

    return () => {
      ro.disconnect();
      pending?.kill();
      gsap.ticker.remove(tick);
      nodes.forEach((nd) => nd.el.parentElement?.classList.remove('is-lit'));
    };
  });
}
