// The SVG the wire driver (motion/wire.ts) draws into. Paths and nodes are filled on the client.
export default function Wire() {
  return (
    <svg className="wire" aria-hidden="true" focusable="false">
      {/* stops are written by the driver: each section's hue over its own vertical span */}
      <defs><linearGradient id="wire-hue" className="wire__hue" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1" /></defs>
      <path className="wire__trace" />
      <path className="wire__live" />
      <g className="wire__nodes" />
      <rect className="wire__packet" x="-3" y="-3" width="6" height="6" />
      <rect className="wire__packet" x="-3" y="-3" width="6" height="6" />
      <rect className="wire__packet" x="-3" y="-3" width="6" height="6" />
      <rect className="wire__head" x="-5" y="-5" width="10" height="10" />
    </svg>
  );
}
