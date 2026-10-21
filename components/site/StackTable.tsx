'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, prefersReducedMotion } from '@/engine';
import { usePage } from '@/engine/next';
import { roundedPath } from '@/motion/route';

export type System = { name: string; where: string; tech: string[] };

const NS = 'http://www.w3.org/2000/svg';

// The routing table: a technology on the left routes edges to every system on the right that uses it.
// At rest it cycles through the busiest technologies while on screen; any interaction takes over.
export default function StackTable({
  groups,
  systems,
  links,
}: {
  groups: { category: string; skills: string[] }[];
  systems: System[];
  links: Record<string, number[]>;
}) {
  const busiest = useMemo(
    () => Object.keys(links).filter((k) => links[k].length >= 2).sort((a, b) => links[b].length - links[a].length),
    [links],
  );
  const [active, setActive] = useState(busiest[0] ?? '');
  const [byUser, setByUser] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const touched = useRef(0);
  const lit = new Set(links[active] ?? []);

  const pick = (skill: string) => {
    touched.current = performance.now();
    setByUser(true);
    setActive(skill);
  };

  // Draw the edges for the active technology (desktop layout only, where the columns sit side by side).
  useEffect(() => {
    const host = root.current, out = svg.current;
    if (!host || !out) return;
    const draw = () => {
      out.replaceChildren();
      if (!matchMedia('(min-width: 1024px)').matches) return;
      const hr = host.getBoundingClientRect();
      out.setAttribute('viewBox', `0 0 ${hr.width} ${hr.height}`);
      const chip = host.querySelector<HTMLElement>(`[data-tech="${CSS.escape(active)}"]`);
      const list = host.querySelector<HTMLElement>('.stack__systems ul');
      if (!chip || !list) return;
      const c = chip.getBoundingClientRect();
      const busX = list.getBoundingClientRect().left - hr.left - 28;
      const x0 = c.right - hr.left + 6, y0 = c.top + c.height / 2 - hr.top;
      const paths = (links[active] ?? []).map((i) => {
        const el = host.querySelector<HTMLElement>(`[data-sys="${i}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const y = r.top + r.height / 2 - hr.top;
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', roundedPath([{ x: x0, y: y0 }, { x: busX, y: y0, h: true }, { x: busX, y }, { x: r.left - hr.left - 10, y, h: true }], 14));
        out.append(p);
        return p;
      }).filter((p): p is SVGPathElement => !!p);
      const dot = document.createElementNS(NS, 'rect');
      dot.setAttribute('x', String(x0 - 4)); dot.setAttribute('y', String(y0 - 4));
      dot.setAttribute('width', '8'); dot.setAttribute('height', '8');
      out.append(dot);
      if (prefersReducedMotion()) return;
      paths.forEach((p) => { const l = p.getTotalLength(); p.style.strokeDasharray = `${l} ${l}`; p.style.strokeDashoffset = String(l); });
      gsap.to(paths, { strokeDashoffset: 0, duration: 0.9, ease: ease.out, stagger: 0.035 });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(host);
    return () => ro.disconnect();
  }, [active, links]);

  // Idle: advance through the busiest technologies while the table is on screen and untouched.
  usePage(() => {
    if (prefersReducedMotion() || busiest.length < 2 || !root.current) return;
    let i = 0;
    let call: gsap.core.Tween | null = null;
    const step = () => {
      if (performance.now() - touched.current > 6000) {
        i = (i + 1) % busiest.length;
        setByUser(false);
        setActive(busiest[i]);
      }
      call = gsap.delayedCall(2.6, step);
    };
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top 75%',
      end: 'bottom 25%',
      onToggle: (self) => {
        call?.kill();
        call = self.isActive ? gsap.delayedCall(2.6, step) : null;
      },
    });
    return () => { st.kill(); call?.kill(); };
  });

  const count = lit.size;
  return (
    <div className="stack fw" ref={root}>
      <div className="stack__groups">
        {groups.map((g) => (
          <div className="stack__group" key={g.category}>
            <h3 className="stack__cat">{g.category}</h3>
            <ul className="stack__chips">
              {g.skills.map((s) => {
                const n = links[s]?.length ?? 0;
                return (
                  <li key={s}>
                    {n > 0 ? (
                      <button
                        type="button"
                        className="chip"
                        data-tech={s}
                        aria-pressed={active === s}
                        aria-controls="stack-systems"
                        onPointerEnter={(e) => e.pointerType === 'mouse' && pick(s)}
                        onFocus={() => pick(s)}
                        onClick={() => pick(s)}
                      >
                        {s}<span className="chip__n tabular">{n}</span>
                      </button>
                    ) : (
                      <span className="chip chip--quiet">{s}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="stack__systems">
        <p className="stack__caption" aria-live={byUser ? 'polite' : 'off'}>
          <span className="stack__active">{active}</span> runs in {count} {count === 1 ? 'system' : 'systems'}
        </p>
        <ul id="stack-systems" data-lenis-prevent>
          {systems.map((s, i) => (
            <li key={`${s.name}-${i}`} data-sys={i} data-on={lit.has(i) || undefined}>
              <span className="sys__name">{s.name}</span>
              <span className="sys__where">{s.where}</span>
            </li>
          ))}
        </ul>
      </div>

      <svg className="stack__edges" ref={svg} aria-hidden="true" focusable="false" />
    </div>
  );
}
