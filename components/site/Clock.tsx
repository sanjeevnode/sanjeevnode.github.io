'use client';
import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

// Local time in Bhopal, so a visitor knows when a reply is likely.
export default function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return <time className="tabular">{now ?? '--:--'}</time>;
}
