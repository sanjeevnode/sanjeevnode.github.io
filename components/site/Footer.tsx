export default function Footer() {
  return (
    <footer className="footer">
      <div className="fw footer__row">
        <nav className="footer__links" aria-label="Footer">
          <a href="mailto:me.sanjeevks@gmail.com">Email me</a>
          <a href="https://github.com/sanjeevnode" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/sanjeevnode" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/resume">CV</a>
          <a href="/projects">All projects</a>
          <a href="/privacy-and-policy">Privacy policy</a>
        </nav>
        <p className="footer__small">
          Designed and engineered by Sanjeev Singh, {new Date().getFullYear()}. Set in Archivo and JetBrains Mono.
        </p>
      </div>
      {/* SVG text stretched to exactly the content width, so the mark spans edge to edge in any font */}
      <svg className="footer__mark" viewBox="0 0 1000 68" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="mark-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#9d95ff" />
            <stop offset="0.22" stopColor="#f7bdf8" />
            <stop offset="0.4" stopColor="#fec5fb" />
            <stop offset="0.62" stopColor="#ff8709" />
            <stop offset="0.82" stopColor="#abff84" />
            <stop offset="1" stopColor="#0ae448" />
          </linearGradient>
        </defs>
        <text x="0" y="66" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#mark-grad)">SANJEEVNODE.IN</text>
      </svg>
    </footer>
  );
}
