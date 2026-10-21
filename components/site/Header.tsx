'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { startScroll, stopScroll } from '@/engine';

const NAV = [
  { id: 'systems', label: 'Systems' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    stopScroll();
    const links = Array.from((menu.current?.querySelectorAll<HTMLElement>('a') ?? []));
    links[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); }
      if (e.key !== 'Tab' || links.length === 0) return;
      // trap focus between the menu links and the close button
      const ring = [btn.current!, ...links];
      const i = ring.indexOf(document.activeElement as HTMLElement);
      const next = ring[(i + (e.shiftKey ? -1 : 1) + ring.length) % ring.length];
      e.preventDefault();
      next.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); startScroll(); };
  }, [open]);

  const current = (id: string) => (path === '/projects' && id === 'work' ? 'page' : undefined);
  // Anchor clicks inside the open menu close it after the jump.
  const close = () => setOpen(false);

  return (
    <header className="frame">
      <a href="/" className="brand">
        sanjeevnode<span className="brand__tld">.in</span>
      </a>
      <nav className="nav" aria-label="Primary">
        <ul>
          {NAV.map((n) => (
            <li key={n.id}>
              <a className="nav__link" href={`/#${n.id}`} data-spy-link={n.id} aria-current={current(n.id)}>{n.label}</a>
            </li>
          ))}
          <li>
            <a className="nav__link nav__cv" href="/resume" aria-current={path === '/resume' ? 'page' : undefined}>CV</a>
          </li>
        </ul>
      </nav>
      <button
        ref={btn}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <div id="menu" ref={menu} className="menu" hidden={!open}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ '--i': i } as React.CSSProperties}>
              <a href={`/#${n.id}`} onClick={close}>{n.label}</a>
            </li>
          ))}
          <li style={{ '--i': NAV.length } as React.CSSProperties}><a href="/projects">All projects</a></li>
          <li style={{ '--i': NAV.length + 1 } as React.CSSProperties}><a href="/resume">CV</a></li>
        </ul>
        <a className="menu__mail" href="mailto:me.sanjeevks@gmail.com">me.sanjeevks@gmail.com</a>
      </div>
    </header>
  );
}
