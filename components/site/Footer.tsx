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
      <p className="footer__mark" aria-hidden="true">
        sanjeevnode<span className="footer__tld">.in</span>
      </p>
    </footer>
  );
}
