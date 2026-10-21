// Orthogonal routing shared by the page wire and the stack table edges.
// Each point is reached vertically first, then horizontally; `h: true` flips that order.
export type RoutePoint = { x: number; y: number; h?: boolean };

export function corners(pts: RoutePoint[]) {
  const out: { x: number; y: number }[] = [];
  for (const p of pts) {
    const a = out[out.length - 1];
    if (a && Math.abs(a.x - p.x) > 0.5 && Math.abs(a.y - p.y) > 0.5) {
      out.push(p.h ? { x: p.x, y: a.y } : { x: a.x, y: p.y });
    }
    out.push({ x: p.x, y: p.y });
  }
  return out;
}

/** SVG path through the corner list with rounded square turns. */
export function roundedPath(pts: RoutePoint[], radius = 18) {
  const v = corners(pts);
  if (v.length < 2) return '';
  let d = `M${v[0].x},${v[0].y}`;
  for (let i = 1; i < v.length - 1; i++) {
    const a = v[i - 1], b = v[i], c = v[i + 1];
    const l1 = Math.hypot(b.x - a.x, b.y - a.y);
    const l2 = Math.hypot(c.x - b.x, c.y - b.y);
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    if (l1 < 1 || l2 < 1 || Math.abs(cross) < 0.5) { d += `L${b.x},${b.y}`; continue; }
    const r = Math.min(radius, l1 / 2, l2 / 2);
    d += `L${b.x - ((b.x - a.x) / l1) * r},${b.y - ((b.y - a.y) / l1) * r}`;
    d += `Q${b.x},${b.y} ${b.x + ((c.x - b.x) / l2) * r},${b.y + ((c.y - b.y) / l2) * r}`;
  }
  const z = v[v.length - 1];
  return `${d}L${z.x},${z.y}`;
}
